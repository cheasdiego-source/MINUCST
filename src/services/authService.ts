import { User, LoginAttempt, SessionData, JWTPayload } from '../types/auth';
import { 
  generateValidCodes, 
  hashCode, 
  verifyCode, 
  getRoleFromCode, 
  isValidCodeFormat,
  sanitizeInput,
  isHoneypotTriggered,
  generateJWTToken,
  verifyJWTToken,
  SECURITY_CONFIG 
} from '../utils/security';

class AuthService {
  private users: Map<string, User> = new Map();
  private sessions: Map<string, SessionData> = new Map();
  private loginAttempts: Map<string, LoginAttempt[]> = new Map();
  private blockedIPs: Map<string, Date> = new Map();
  private blockedCodes: Map<string, Date> = new Map();
  private hashedCodes: Map<string, string> = new Map();
  private dashboardSessions: Set<string> = new Set();
  private initialized: boolean = false;

  constructor() {
    this.initializeUsers();
  }

  private async initializeUsers() {
    if (this.initialized) return;
    
    const validCodes = generateValidCodes();
    
    for (const code of validCodes) {
      const hashedCode = await hashCode(code);
      const user: User = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        code: code,
        role: getRoleFromCode(code),
        isActive: false,
        isBlocked: false,
        createdAt: new Date()
      };
      
      this.users.set(code, user);
      this.hashedCodes.set(code, hashedCode);
    }
    
    this.initialized = true;
  }

  // Verificar si IP está bloqueada
  private isIPBlocked(ip: string): boolean {
    const blockTime = this.blockedIPs.get(ip);
    if (!blockTime) return false;
    
    if (Date.now() > blockTime.getTime()) {
      this.blockedIPs.delete(ip);
      return false;
    }
    
    return true;
  }

  // Verificar si código está bloqueado
  private isCodeBlocked(code: string): boolean {
    const blockTime = this.blockedCodes.get(code);
    if (!blockTime) return false;
    
    if (Date.now() > blockTime.getTime()) {
      this.blockedCodes.delete(code);
      return false;
    }
    
    return true;
  }

  // Obtener intentos de login para IP
  private getLoginAttempts(ip: string): LoginAttempt[] {
    return this.loginAttempts.get(ip) || [];
  }

  // Registrar intento de login
  private recordLoginAttempt(ip: string, code: string, success: boolean) {
    const attempts = this.getLoginAttempts(ip);
    attempts.push({
      ip,
      code,
      timestamp: new Date(),
      success
    });

    if (attempts.length > 10) {
      attempts.shift();
    }

    this.loginAttempts.set(ip, attempts);
  }

  // Contar intentos fallidos recientes
  private getRecentFailedAttempts(ip: string): number {
    const attempts = this.getLoginAttempts(ip);
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    
    return attempts.filter(attempt => 
      !attempt.success && attempt.timestamp > oneHourAgo
    ).length;
  }

  // Verificar si necesita reCAPTCHA
  public needsCaptcha(ip: string): boolean {
    return this.getRecentFailedAttempts(ip) >= SECURITY_CONFIG.CAPTCHA_THRESHOLD;
  }

  // Bloquear IP
  private blockIP(ip: string) {
    const blockUntil = new Date(Date.now() + SECURITY_CONFIG.IP_BLOCK_DURATION);
    this.blockedIPs.set(ip, blockUntil);
  }

  // Bloquear código
  private blockCode(code: string) {
    const blockUntil = new Date(Date.now() + SECURITY_CONFIG.CODE_BLOCK_DURATION);
    this.blockedCodes.set(code, blockUntil);
  }

  // Intentar login principal
  public async attemptLogin(
    code: string, 
    ip: string, 
    honeypot: string = '',
    captchaToken?: string,
    acceptedTerms: boolean = false
  ): Promise<{ 
    success: boolean; 
    jwtToken?: string; 
    user?: User; 
    error?: string; 
    needsCaptcha?: boolean 
  }> {
    
    if (!acceptedTerms) {
      return { success: false, error: 'Debe aceptar los términos y condiciones' };
    }

    if (isHoneypotTriggered(honeypot)) {
      return { success: false, error: 'Acceso denegado' };
    }

    const sanitizedCode = sanitizeInput(code);

    if (!isValidCodeFormat(sanitizedCode)) {
      this.recordLoginAttempt(ip, sanitizedCode, false);
      return { success: false, error: 'Código de acceso inválido' };
    }

    if (this.isIPBlocked(ip)) {
      return { success: false, error: 'Acceso temporalmente bloqueado' };
    }

    if (this.isCodeBlocked(sanitizedCode)) {
      return { success: false, error: 'Código temporalmente bloqueado' };
    }

    if (this.needsCaptcha(ip) && !captchaToken) {
      return { success: false, needsCaptcha: true, error: 'Verificación requerida' };
    }

    const hashedCode = this.hashedCodes.get(sanitizedCode);
    if (!hashedCode) {
      this.recordLoginAttempt(ip, sanitizedCode, false);
      this.handleFailedAttempt(ip, sanitizedCode);
      return { success: false, error: 'Código de acceso inválido' };
    }

    const isValidCode = await verifyCode(sanitizedCode, hashedCode);
    if (!isValidCode) {
      this.recordLoginAttempt(ip, sanitizedCode, false);
      this.handleFailedAttempt(ip, sanitizedCode);
      return { success: false, error: 'Código de acceso inválido' };
    }

    const user = this.users.get(sanitizedCode);
    if (!user || user.isBlocked) {
      this.recordLoginAttempt(ip, sanitizedCode, false);
      return { success: false, error: 'Acceso denegado' };
    }

    user.isActive = true;
    user.lastActivity = new Date();
    this.users.set(sanitizedCode, user);

    this.recordLoginAttempt(ip, sanitizedCode, true);
    const jwtToken = generateJWTToken(user.id, user.role, sanitizedCode);
    
    const sessionData: SessionData = {
      userId: user.id,
      role: user.role,
      createdAt: new Date(),
      lastActivity: new Date(),
      jwtToken
    };
    
    this.sessions.set(jwtToken, sessionData);
    
    setTimeout(() => {
      this.sessions.delete(jwtToken);
    }, SECURITY_CONFIG.SESSION_DURATION);

    return { 
      success: true, 
      jwtToken, 
      user: { ...user, code: '' }
    };
  }

  // Manejar intento fallido
  private handleFailedAttempt(ip: string, code: string) {
    const failedAttempts = this.getRecentFailedAttempts(ip);
    
    if (failedAttempts >= SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS) {
      this.blockIP(ip);
      if (this.users.has(code)) {
        this.blockCode(code);
      }
    }
  }

  // Validar JWT token
  public validateJWTToken(token: string): { valid: boolean; user?: User; payload?: JWTPayload } {
    const payload = verifyJWTToken(token) as JWTPayload;
    if (!payload) {
      return { valid: false };
    }

    const session = this.sessions.get(token);
    if (!session) {
      return { valid: false };
    }

    const now = new Date();
    const sessionAge = now.getTime() - session.lastActivity.getTime();
    
    if (sessionAge > SECURITY_CONFIG.SESSION_DURATION) {
      this.sessions.delete(token);
      return { valid: false };
    }

    session.lastActivity = now;
    this.sessions.set(token, session);

    const user = Array.from(this.users.values()).find(u => u.id === payload.userId);
    if (!user || !user.isActive || user.isBlocked) {
      this.sessions.delete(token);
      return { valid: false };
    }

    return { valid: true, user, payload };
  }

  // Login secundario para dashboard
  public async attemptDashboardLogin(
    jwtToken: string,
    dashboardPassword: string
  ): Promise<{ success: boolean; dashboardToken?: string; error?: string }> {
    
    const validation = this.validateJWTToken(jwtToken);
    if (!validation.valid || !validation.user || validation.user.role !== 'superadmin') {
      return { success: false, error: 'Acceso no autorizado' };
    }

    if (dashboardPassword !== 'MINUCST_DASHBOARD_2026') {
      return { success: false, error: 'Credenciales de dashboard incorrectas' };
    }

    const dashboardToken = `dashboard_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`;
    this.dashboardSessions.add(dashboardToken);

    setTimeout(() => {
      this.dashboardSessions.delete(dashboardToken);
    }, SECURITY_CONFIG.SESSION_DURATION);

    return { success: true, dashboardToken };
  }

  // Validar acceso al dashboard
  public validateDashboardAccess(jwtToken: string, dashboardToken: string): boolean {
    const validation = this.validateJWTToken(jwtToken);
    if (!validation.valid || !validation.user || validation.user.role !== 'superadmin') {
      return false;
    }

    return this.dashboardSessions.has(dashboardToken);
  }

  // Cerrar sesión
  public logout(jwtToken: string): boolean {
    const session = this.sessions.get(jwtToken);
    if (session) {
      const user = Array.from(this.users.values()).find(u => u.id === session.userId);
      if (user) {
        user.isActive = false;
        this.users.set(user.code, user);
      }
    }
    
    this.sessions.delete(jwtToken);
    return true;
  }

  // Revocar código
  public revokeCode(
    code: string, 
    adminJwtToken: string, 
    dashboardToken: string
  ): boolean {
    if (!this.validateDashboardAccess(adminJwtToken, dashboardToken)) {
      return false;
    }

    const user = this.users.get(code);
    if (user) {
      user.isBlocked = true;
      user.isActive = false;
      user.blockedUntil = new Date(Date.now() + SECURITY_CONFIG.CODE_BLOCK_DURATION);
      this.users.set(code, user);
      
      for (const [token, session] of this.sessions.entries()) {
        if (session.userId === user.id) {
          this.sessions.delete(token);
        }
      }
      
      return true;
    }
    
    return false;
  }

  // Obtener datos del dashboard
  public getDashboardData(adminJwtToken: string, dashboardToken: string) {
    if (!this.validateDashboardAccess(adminJwtToken, dashboardToken)) {
      return null;
    }

    const trainingUsers = Array.from(this.users.values())
      .filter(user => user.role === 'training')
      .map(user => ({
        id: user.id,
        code: user.code,
        status: this.isUserOnline(user.id) ? 'online' : 'offline',
        progress: this.getUserProgress(user.id),
        lastAction: user.lastActivity ? 'Última actividad' : 'Sin actividad',
        lastActionTime: user.lastActivity || user.createdAt,
        isActive: user.isActive,
        isBlocked: user.isBlocked
      }));

    return {
      users: trainingUsers,
      totalUsers: trainingUsers.length,
      activeUsers: trainingUsers.filter(u => u.status === 'online' && u.isActive).length,
      completionRate: this.calculateCompletionRate(trainingUsers)
    };
  }

  private isUserOnline(userId: string): boolean {
    for (const session of this.sessions.values()) {
      if (session.userId === userId) {
        const sessionAge = Date.now() - session.lastActivity.getTime();
        if (sessionAge < SECURITY_CONFIG.SESSION_DURATION) {
          return true;
        }
      }
    }
    return false;
  }

  private getUserProgress(userId: string): number {
    return Math.floor(Math.random() * 101);
  }

  private calculateCompletionRate(users: any[]): number {
    if (users.length === 0) return 0;
    const completed = users.filter(u => u.progress === 100).length;
    return Math.round((completed / users.length) * 100);
  }

  public getSecurityStats(adminJwtToken: string, dashboardToken: string) {
    if (!this.validateDashboardAccess(adminJwtToken, dashboardToken)) {
      return null;
    }

    return {
      blockedIPs: Array.from(this.blockedIPs.entries()).map(([ip, until]) => ({ ip, until })),
      blockedCodes: Array.from(this.blockedCodes.entries()).map(([code, until]) => ({ code, until })),
      recentAttempts: Array.from(this.loginAttempts.values()).flat().slice(-50),
      activeSessions: this.sessions.size,
      dashboardSessions: this.dashboardSessions.size
    };
  }
}

export const authService = new AuthService();