import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, AlertTriangle } from 'lucide-react';

interface DashboardLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (password: string) => Promise<{ success: boolean; error?: string }>;
}

const DashboardLoginModal: React.FC<DashboardLoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setError('Por favor, ingresa la contraseña del dashboard');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
      
      const result = await onLogin(password);
      
      if (result.success) {
        setPassword('');
        setAttempts(0);
        onClose();
      } else {
        setAttempts(prev => prev + 1);
        setError(result.error || 'Contraseña incorrecta');
        
        // Bloqueo temporal después de 3 intentos
        if (attempts >= 2) {
          setError('Demasiados intentos fallidos. Acceso bloqueado temporalmente.');
          setTimeout(() => {
            setAttempts(0);
            setError('');
          }, 60000); // 1 minuto de bloqueo
        }
      }
    } catch (error) {
      setError('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-200 animate-slide-down">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-red-900 to-red-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-red-900 mb-2">Acceso al Dashboard</h2>
            <p className="text-gray-600">Autenticación adicional requerida</p>
          </div>

          {/* Security Warning */}
          {attempts > 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-800">
                    {attempts === 1 && "Contraseña incorrecta. Verifica e inténtalo de nuevo."}
                    {attempts === 2 && "Segundo intento fallido. Un intento más y el acceso será bloqueado."}
                    {attempts >= 3 && "Acceso bloqueado temporalmente por seguridad."}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña del Dashboard
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 pr-12"
                  placeholder="Ingresa la contraseña de administrador"
                  disabled={isLoading || attempts >= 3}
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-300"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading || !password.trim() || attempts >= 3}
                className={`flex-1 py-3 rounded-lg font-bold transition-all duration-300 ${
                  isLoading || !password.trim() || attempts >= 3
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-white transform hover:scale-105'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verificando...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Acceder</span>
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Security Info */}
          <div className="mt-6 text-center">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center justify-center mb-1">
                <Shield className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-xs font-semibold text-blue-800">Doble Autenticación</span>
              </div>
              <p className="text-xs text-blue-700">
                Capa adicional de seguridad para proteger datos sensibles
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLoginModal;