import React, { useEffect, useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface SessionManagerProps {
  isAuthenticated: boolean;
}

const SessionManager: React.FC<SessionManagerProps> = ({ isAuthenticated }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const updateTimeLeft = () => {
      const sessionTimestamp = localStorage.getItem('session-timestamp');
      if (sessionTimestamp) {
        const lastActivity = parseInt(sessionTimestamp);
        const now = Date.now();
        const elapsed = now - lastActivity;
        const remaining = Math.max(0, (5 * 60 * 1000) - elapsed); // 5 minutos en ms
        
        setTimeLeft(remaining);
        
        // Mostrar advertencia cuando queden menos de 60 segundos
        setShowWarning(remaining > 0 && remaining <= 60000);
      }
    };

    // Actualizar cada segundo
    const interval = setInterval(updateTimeLeft, 1000);
    updateTimeLeft(); // Llamada inicial

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  if (!isAuthenticated || !showWarning) return null;

  const secondsLeft = Math.ceil(timeLeft / 1000);

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div className="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 animate-pulse">
        <AlertTriangle className="h-5 w-5 text-yellow-300" />
        <div>
          <p className="font-bold text-sm">Sesión expirando</p>
          <p className="text-xs">
            <Clock className="h-3 w-3 inline mr-1" />
            {secondsLeft} segundos restantes
          </p>
        </div>
      </div>
    </div>
  );
};

export default SessionManager;