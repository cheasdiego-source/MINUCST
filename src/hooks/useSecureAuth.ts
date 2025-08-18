import { useState, useEffect, useCallback } from 'react';
import { User, AuthState } from '../types/auth';
import { authService } from '../services/authService';
import { encryptForStorage, decryptFromStorage } from '../utils/security';

export const useSecureAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true
  });

  const [dashboardToken, setDashboardToken] = useState<string | null>(null);

  // Verificar sesión existente al cargar
  useEffect(() => {
    const encryptedToken = localStorage.getItem('minucst-secure-token');
    if (encryptedToken) {
      const jwtToken = decryptFromStorage(encryptedToken);
      if (jwtToken) {
        const validation = authService.validateJWTToken(jwtToken);
        if (validation.valid && validation.user) {
          setAuthState({
            isAuthenticated: true,
            user: validation.user,
            isLoading: false,
            jwtToken,
            sessionExpiry: new Date(Date.now() + 30 * 60 * 1000) // 30 minutos
          });
        } else {
          localStorage.removeItem('minucst-secure-token');
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Auto-logout cuando expire la sesión
  useEffect(() => {
    if (authState.sessionExpiry) {
      const timeUntilExpiry = authState.sessionExpiry.getTime() - Date.now();
      if (timeUntilExpiry > 0) {
        const timeout = setTimeout(() => {
          logout();
        }, timeUntilExpiry);
        
        return () => clearTimeout(timeout);
      }
    }
  }, [authState.sessionExpiry]);

  // Verificar si necesita CAPTCHA
  const needsCaptcha = useCallback((ip: string = '127.0.0.1'): boolean => {
    return authService.needsCaptcha(ip);
  }, []);

  // Intentar login principal
  const login = useCallback(async (
    code: string, 
    captchaToken?: string,
    acceptedTerms: boolean = false
  ): Promise<{ success: boolean; error?: string; needsCaptcha?: boolean }> => {
    try {
      // Obtener IP del cliente (en producción esto vendría del servidor)
      const clientIP = '127.0.0.1'; // Mock IP
      
      const result = await authService.attemptLogin(
        code, 
        clientIP, 
        '', // honeypot
        captchaToken,
        acceptedTerms
      );
      
      if (result.success && result.jwtToken && result.user) {
        // Cifrar y guardar token
        const encryptedToken = encryptForStorage(result.jwtToken);
        localStorage.setItem('minucst-secure-token', encryptedToken);
        
        setAuthState({
          isAuthenticated: true,
          user: result.user,
          isLoading: false,
          jwtToken: result.jwtToken,
          sessionExpiry: new Date(Date.now() + 30 * 60 * 1000)
        });
        
        return { success: true };
      } else {
        return {
          success: false,
          error: result.error,
          needsCaptcha: result.needsCaptcha
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Error de conexión. Inténtalo de nuevo.'
      };
    }
  }, []);

  // Login secundario para dashboard (solo superadmins)
  const loginDashboard = useCallback(async (
    dashboardPassword: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!authState.jwtToken || !authState.user || authState.user.role !== 'superadmin') {
      return { success: false, error: 'Acceso no autorizado' };
    }

    try {
      const result = await authService.attemptDashboardLogin(
        authState.jwtToken,
        dashboardPassword
      );
      
      if (result.success && result.dashboardToken) {
        setDashboardToken(result.dashboardToken);
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    }
  }, [authState.jwtToken, authState.user]);

  // Verificar acceso al dashboard
  const hasDashboardAccess = useCallback((): boolean => {
    if (!authState.jwtToken || !dashboardToken || !authState.user || authState.user.role !== 'superadmin') {
      return false;
    }
    return authService.validateDashboardAccess(authState.jwtToken, dashboardToken);
  }, [authState.jwtToken, dashboardToken, authState.user]);

  // Cerrar sesión
  const logout = useCallback(() => {
    if (authState.jwtToken) {
      authService.logout(authState.jwtToken);
    }
    
    localStorage.removeItem('minucst-secure-token');
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false
    });
    setDashboardToken(null);
  }, [authState.jwtToken]);

  // Revocar código (solo superadmin con dashboard access)
  const revokeCode = useCallback((code: string): boolean => {
    if (!authState.jwtToken || !dashboardToken) return false;
    return authService.revokeCode(code, authState.jwtToken, dashboardToken);
  }, [authState.jwtToken, dashboardToken]);

  // Obtener datos del dashboard (solo superadmin con dashboard access)
  const getDashboardData = useCallback(() => {
    if (!authState.jwtToken || !dashboardToken) return null;
    return authService.getDashboardData(authState.jwtToken, dashboardToken);
  }, [authState.jwtToken, dashboardToken, authService]);

  // Obtener estadísticas de seguridad (solo superadmin con dashboard access)
  const getSecurityStats = useCallback(() => {
    if (!authState.jwtToken || !dashboardToken) return null;
    return authService.getSecurityStats(authState.jwtToken, dashboardToken);
  }, [authState.jwtToken, dashboardToken, authService]);

  // Renovar sesión
  const renewSession = useCallback(() => {
    if (authState.jwtToken) {
      const validation = authService.validateJWTToken(authState.jwtToken);
      if (validation.valid) {
        setAuthState(prev => ({
          ...prev,
          sessionExpiry: new Date(Date.now() + 30 * 60 * 1000)
        }));
      } else {
        logout();
      }
    }
  }, [authState.jwtToken, logout]);

  return {
    ...authState,
    dashboardToken,
    login,
    loginDashboard,
    logout,
    needsCaptcha,
    revokeCode,
    getDashboardData,
    getSecurityStats,
    renewSession,
    hasDashboardAccess
  };
};