import React from 'react';
import { 
  Home, 
  BookOpen, 
  FileText, 
  Users, 
  UserCheck, 
  Scale, 
  MessageCircle,
  Shield
} from 'lucide-react';
import { useSecureAuth } from '../hooks/useSecureAuth';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  darkMode: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection, darkMode }) => {
  const { user, hasDashboardAccess } = useSecureAuth();
  
  // Solo mostrar dashboard para superadmins
  const showDashboard = user?.role === 'superadmin';
  
  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'training', label: 'Capacitación', icon: BookOpen },
    { id: 'code', label: 'Código de Conducta', icon: FileText },
    { id: 'roles', label: 'Roles y Responsabilidades', icon: UserCheck },
    { id: 'team', label: 'Equipo MINUCST Inside', icon: Users },
    { id: 'legal', label: 'Políticas y Legal', icon: Scale },
    { id: 'contact', label: 'Contacto Interno', icon: MessageCircle },
    // Solo agregar dashboard si es superadmin
    ...(showDashboard ? [{ id: 'dashboard', label: 'Dashboard Admin', icon: Shield }] : [])
  ];

  return (
    <nav className={`shadow-lg sticky top-0 z-50 transition-colors duration-300 ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center space-x-2 px-4 py-4 text-sm font-medium whitespace-nowrap transition-all duration-300 border-b-3 hover:scale-105 ${
                  isActive
                    ? darkMode
                      ? 'text-blue-400 border-blue-400 bg-blue-900/20'
                      : 'text-red-800 border-red-800 bg-red-50'
                    : darkMode
                      ? 'text-gray-300 border-transparent hover:text-blue-300 hover:border-blue-300 hover:bg-blue-900/10'
                      : 'text-gray-600 border-transparent hover:text-red-700 hover:border-red-300 hover:bg-red-25'
                } ${item.id === 'dashboard' ? 'bg-gradient-to-r from-red-900/10 to-yellow-500/10' : ''}`}
              >
                <Icon className={`h-5 w-5 transition-colors duration-300 ${
                  isActive || item.id === 'dashboard'
                    ? darkMode ? 'text-yellow-400' : 'text-yellow-600'
                    : ''
                }`} />
                <span>{item.label}</span>
                {item.id === 'dashboard' && (
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;