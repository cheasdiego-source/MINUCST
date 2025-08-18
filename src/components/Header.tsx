import React from 'react';
import { Users, Moon, Sun, LogOut } from 'lucide-react';
import Countdown from './Countdown';
import ProgressBar from './ProgressBar';
import { useSecureAuth } from '../hooks/useSecureAuth';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  setActiveSection: (section: string) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode, setActiveSection, onLogout }) => {
  const { user } = useSecureAuth();

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      onLogout();
    }
  };

  return (
    <header className={`shadow-2xl transition-all duration-300 ${
      darkMode 
        ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-r from-red-900 to-red-800 text-white'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-4 cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => setActiveSection('home')}
          >
            <div className="flex items-center">
              <img 
                src="/minucst_logo_resized.png" 
                alt="Logo MINUCST" 
                className="w-25 h-20 object-contain hover:scale-150 transition-transform duration-300 mr-4"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white hover:text-yellow-200 transition-colors duration-300">
                MINUCST Inside
              </h1>
              <p className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-blue-200' : 'text-yellow-200'
              }`}>
                Plataforma Exclusiva de Formación
              </p>
            </div>
          </div>

          {/* Center - Countdown */}
          <div className="hidden lg:block">
            <Countdown />
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Progress Bar */}
            {user && (
              <div className="hidden md:block">
                <ProgressBar progress={user.totalProgress} darkMode={darkMode} />
              </div>
            )}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                darkMode 
                  ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                  : 'bg-yellow-500 hover:bg-yellow-600 text-red-900'
              }`}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <div className={`flex items-center space-x-2 transition-colors duration-300 ${
              darkMode ? 'text-blue-200' : 'text-yellow-200'
            }`}>
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium hidden sm:block">
                {user?.role === 'superadmin' ? 'Superadministrador' : 'Staff de Capacitación'}
              </span>
            </div>

            {user && (
              <button
                onClick={handleLogout}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  darkMode 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-red-700 hover:bg-red-800 text-white'
                }`}
                title="Cerrar Sesión"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-medium hidden sm:block">Cerrar Sesión</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Progress and Countdown */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
          <div className="lg:hidden">
            <Countdown />
          </div>
          {user && (
            <div className="md:hidden">
              <ProgressBar progress={user.totalProgress} darkMode={darkMode} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;