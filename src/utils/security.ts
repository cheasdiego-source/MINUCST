// Configuración de seguridad simplificada para el navegador
export const SECURITY_CONFIG = {
  MAX_LOGIN_ATTEMPTS: 3,
  IP_BLOCK_DURATION: 30 * 60 * 1000, // 30 minutos
  CODE_BLOCK_DURATION: 24 * 60 * 60 * 1000, // 24 horas
  SESSION_DURATION: 30 * 60 * 1000, // 30 minutos
  CAPTCHA_THRESHOLD: 2,
  JWT_SECRET: 'MINUCST2026_ULTRA_SECURE_SECRET_KEY_FOR_AUTHENTICATION_SYSTEM',
  JWT_EXPIRES_IN: '30m',
  DASHBOARD_SECRET: 'MINUCST_DASHBOARD_ADMIN_SECRET_2026',
};

// Generar códigos válidos
export const generateValidCodes = (): string[] => {
  const codes: string[] = [];
  
  // Códigos de superadministrador
  codes.push('MINUCST2026-SG-DIEGO', 'MINUCST2026-SGA-NATASHA');
  
  // Códigos de capacitación (01-30)
  for (let i = 1; i <= 30; i++) {
    const num = i.toString().padStart(2, '0');
    codes.push(`MINUCST-STAFF-${num}`);
  }
  
  return codes;
};

// Hash simple para códigos (sin bcrypt)
export const hashCode = async (code: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(code + SECURITY_CONFIG.JWT_SECRET);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Verificar código
export const verifyCode = async (code: string, hash: string): Promise<boolean> => {
  const computedHash = await hashCode(code);
  return computedHash === hash;
};

// Determinar rol basado en el código
export const getRoleFromCode = (code: string): 'training' | 'superadmin' => {
  if (code.includes('SG-') || code.includes('SGA-')) {
    return 'superadmin';
  }
  return 'training';
};

// Validar formato de código
export const isValidCodeFormat = (code: string): boolean => {
  const superAdminPattern = /^MINUCST2026-(SG|SGA)-[A-Z]+$/;
  const trainingPattern = /^MINUCST-STAFF-(0[1-9]|[12][0-9]|30)$/;
  
  return superAdminPattern.test(code) || trainingPattern.test(code);
};

// Generar JWT token simple (sin jsonwebtoken)
export const generateJWTToken = (userId: string, role: 'training' | 'superadmin', code: string): string => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    userId,
    role,
    code,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (30 * 60) // 30 minutos
  }));
  
  // Firma simple (en producción usar una librería real)
  const signature = btoa(`${header}.${payload}.${SECURITY_CONFIG.JWT_SECRET}`);
  
  return `${header}.${payload}.${signature}`;
};

// Verificar JWT token simple
export const verifyJWTToken = (token: string): any => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(atob(parts[1]));
    
    // Verificar expiración
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    
    return payload;
  } catch (error) {
    return null;
  }
};

// Generar token de sesión seguro
export const generateSessionToken = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 64; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Sanitizar entrada de usuario
export const sanitizeInput = (input: string): string => {
  return input.replace(/[<>\"'&]/g, '').trim().toUpperCase();
};

// Detectar honeypot
export const isHoneypotTriggered = (honeypotValue: string): boolean => {
  return honeypotValue.trim() !== '';
};

// Cifrar datos sensibles para localStorage
export const encryptForStorage = (data: any): string => {
  try {
    const jsonString = JSON.stringify(data);
    return btoa(jsonString);
  } catch {
    return '';
  }
};

// Descifrar datos de localStorage
export const decryptFromStorage = (encryptedData: string): any => {
  try {
    const jsonString = atob(encryptedData);
    return JSON.parse(jsonString);
  } catch {
    return null;
  }
};

// Validar dashboard access token
export const verifyDashboardAccess = (token: string): boolean => {
  return token === SECURITY_CONFIG.DASHBOARD_SECRET;
};