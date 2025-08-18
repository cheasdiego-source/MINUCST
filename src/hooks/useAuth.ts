import { useState, useEffect, useCallback } from 'react';
import { User, AuthState } from '../types/user';

const VALID_CODES = {
  'MINUCST2026-SG-DIEGO': {
    id: 'diego-cheas',
    name: 'Diego Emmanuel Cheas López',
    email: 'dcheas.secretario@minucst.org',
    role: 'secretary-general' as const
  },
  'MINUCST2026-SGA-NATASHA': {
    id: 'natasha-guzman',
    name: 'Natasha Leonela Guzmán Mauricio',
    email: 'nguzman.adjunta@minucst.org',
    role: 'assistant-secretary' as const
  },
  'MINUCST2026-STAFF-001': {
    id: 'staff-001',
    name: 'Ana Sofía Martínez',
    email: 'am.capacitacion@minucst.org',
    role: 'committee-chair' as const
  },
  'MINUCST2026-STAFF-002': {
    id: 'staff-002',
    name: 'Roberto Jiménez',
    email: 'rj.logistica@minucst.org',
    role: 'logistics' as const
  },
  'MINUCST2026-STAFF-003': {
    id: 'staff-003',
    name: 'Isabella Torres',
    email: 'it.protocolo@minucst.org',
    role: 'protocol' as const
  },
  'MINUCST2026-STAFF-004': {
    id: 'staff-004',
    name: 'Diego Fernández',
    email: 'df.comunicaciones@minucst.org',
    role: 'press' as const
  }
};

// Tiempo de inactividad en milisegundos (5 minutos)
const INACTIVITY_TIMEOUT = 5 * 60 * 1000;

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true
  });

  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null);

  // Función para limpiar la sesión y recargar la página
  const clearSessionAndReload = useCallback(() => {
    localStorage.removeItem('minucst-user');
    localStorage.removeItem('session-timestamp');
    
    // Limpiar cualquier timer activo
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    
    // Recargar la página después de un breve delay para asegurar que se limpie el estado
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }, [inactivityTimer]);

  // Función para resetear el timer de inactividad
  const resetInactivityTimer = useCallback(() => {
    // Limpiar timer existente
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }

    // Solo establecer timer si el usuario está autenticado
    if (authState.isAuthenticated) {
      // Actualizar timestamp de última actividad
      localStorage.setItem('session-timestamp', Date.now().toString());
      
      // Establecer nuevo timer
      const newTimer = setTimeout(() => {
        console.log('Sesión cerrada por inactividad');
        clearSessionAndReload();
      }, INACTIVITY_TIMEOUT);
      
      setInactivityTimer(newTimer);
    }
  }, [authState.isAuthenticated, inactivityTimer, clearSessionAndReload]);

  // Eventos que indican actividad del usuario
  const userActivityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

  // Configurar listeners de actividad
  useEffect(() => {
    if (authState.isAuthenticated) {
      // Agregar listeners para detectar actividad
      userActivityEvents.forEach(event => {
        document.addEventListener(event, resetInactivityTimer, true);
      });

      // Inicializar timer
      resetInactivityTimer();

      return () => {
        // Limpiar listeners
        userActivityEvents.forEach(event => {
          document.removeEventListener(event, resetInactivityTimer, true);
        });
        
        // Limpiar timer
        if (inactivityTimer) {
          clearTimeout(inactivityTimer);
        }
      };
    }
  }, [authState.isAuthenticated, resetInactivityTimer]);

  // Verificar sesión existente al cargar
  useEffect(() => {
    const savedUser = localStorage.getItem('minucst-user');
    const sessionTimestamp = localStorage.getItem('session-timestamp');
    
    if (savedUser && sessionTimestamp) {
      try {
        const user = JSON.parse(savedUser);
        const lastActivity = parseInt(sessionTimestamp);
        const now = Date.now();
        
        // Verificar si la sesión ha expirado
        if (now - lastActivity > INACTIVITY_TIMEOUT) {
          console.log('Sesión expirada por inactividad');
          clearSessionAndReload();
          return;
        }
        
        setAuthState({
          isAuthenticated: true,
          user,
          isLoading: false
        });
      } catch {
        clearSessionAndReload();
        return;
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, [clearSessionAndReload]);

  const login = (code: string, customName?: string, customRole?: string): boolean => {
    const userInfo = VALID_CODES[code as keyof typeof VALID_CODES];
    if (userInfo) {
      const user: User = {
        ...userInfo,
        // Override name and role for non-SG users if provided
        name: (code.includes('-SG-') || code.includes('-SGA-')) ? userInfo.name : (customName || userInfo.name),
        role: (code.includes('-SG-') || code.includes('-SGA-')) ? userInfo.role : (customRole || userInfo.role) as any,
        progress: {},
        totalProgress: 0
      };
      
      // Load existing progress if available
      const savedProgress = localStorage.getItem(`progress-${user.id}`);
      if (savedProgress) {
        try {
          const progress = JSON.parse(savedProgress);
          user.progress = progress.progress || {};
          user.totalProgress = progress.totalProgress || 0;
        } catch {
          // Ignore parsing errors
        }
      }

      setAuthState({
        isAuthenticated: true,
        user,
        isLoading: false
      });
      
      localStorage.setItem('minucst-user', JSON.stringify(user));
      localStorage.setItem('session-timestamp', Date.now().toString());
      return true;
    }
    return false;
  };

  const logout = () => {
    console.log('Cerrando sesión manualmente');
    clearSessionAndReload();
  };

  const updateProgress = (courseId: string, watchTime: number, totalTime: number, completed: boolean) => {
    if (!authState.user) return;

    const updatedProgress = {
      ...authState.user.progress,
      [courseId]: {
        completed,
        watchTime,
        totalTime,
        completedAt: completed ? new Date().toISOString() : undefined
      }
    };

    // Calculate total progress
    const totalCourses = 6; // Total number of courses
    const completedCourses = Object.values(updatedProgress).filter(p => p.completed).length;
    const totalProgress = Math.round((completedCourses / totalCourses) * 100);

    const updatedUser = {
      ...authState.user,
      progress: updatedProgress,
      totalProgress
    };

    setAuthState(prev => ({
      ...prev,
      user: updatedUser
    }));

    // Save to localStorage
    localStorage.setItem('minucst-user', JSON.stringify(updatedUser));
    localStorage.setItem(`progress-${updatedUser.id}`, JSON.stringify({
      progress: updatedProgress,
      totalProgress
    }));

    // Actualizar timestamp de actividad al actualizar progreso
    localStorage.setItem('session-timestamp', Date.now().toString());
  };

  return {
    ...authState,
    login,
    logout,
    updateProgress
  };
};