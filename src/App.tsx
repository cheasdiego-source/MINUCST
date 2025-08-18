import React, { useState } from 'react';
import { useSecureAuth } from './hooks/useSecureAuth';
import SecureLoginForm from './components/SecureLoginForm';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import DashboardLoginModal from './components/DashboardLoginModal';
import Header from './components/Header';
import Navigation from './components/Navigation';
import BackButton from './components/BackButton';
import Home from './components/sections/Home';
import Training from './components/sections/Training';
import CodeOfConduct from './components/sections/CodeOfConduct';
import RolesResponsibilities from './components/sections/RolesResponsibilities';
import Team from './components/sections/Team';
import Legal from './components/sections/Legal';
import Contact from './components/sections/Contact';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [showDashboardLogin, setShowDashboardLogin] = useState(false);
  const { 
    isAuthenticated, 
    isLoading, 
    user, 
    jwtToken, 
    login, 
    loginDashboard, 
    logout, 
    hasDashboardAccess 
  } = useSecureAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 to-red-800 flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        <div className="text-white text-center">
          <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-2xl font-bold mb-2">Cargando plataforma segura...</p>
          <p className="text-gray-200">Verificando credenciales y permisos</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <BackButton />
        <SecureLoginForm onLogin={login} />
      </>
    );
  }

  // Manejar acceso al dashboard
  const handleDashboardAccess = () => {
    if (user?.role === 'superadmin') {
      setShowDashboardLogin(true);
    }
  };

  // Manejar login del dashboard
  const handleDashboardLogin = async (password: string) => {
    const result = await loginDashboard(password);
    if (result.success) {
      setShowDashboardLogin(false);
      setActiveSection('dashboard');
    }
    return result;
  };

  // Mostrar dashboard si está activo y el usuario tiene acceso
  if (activeSection === 'dashboard' && user?.role === 'superadmin' && hasDashboardAccess()) {
    return (
      <>
        <BackButton />
        <SuperAdminDashboard 
          jwtToken={jwtToken!} 
          onLogout={logout}
          onBack={() => setActiveSection('home')}
        />
      </>
    );
  }

  // Interceptar navegación al dashboard
  const handleSetActiveSection = (section: string) => {
    if (section === 'dashboard') {
      handleDashboardAccess();
    } else {
      setActiveSection(section);
    }
  };

  // Interface para usuarios de capacitación
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <Home setActiveSection={handleSetActiveSection} />;
      case 'training':
        return <Training />;
      case 'code':
        return <CodeOfConduct />;
      case 'roles':
        return <RolesResponsibilities />;
      case 'team':
        return <Team />;
      case 'legal':
        return <Legal />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setActiveSection={handleSetActiveSection} />;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Back Button para enlaces externos */}
      <BackButton />
      
      {/* Dashboard Login Modal */}
      <DashboardLoginModal
        isOpen={showDashboardLogin}
        onClose={() => setShowDashboardLogin(false)}
        onLogin={handleDashboardLogin}
      />
      
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        setActiveSection={handleSetActiveSection}
        onLogout={logout}
      />
      <Navigation 
        activeSection={activeSection} 
        setActiveSection={handleSetActiveSection} 
        darkMode={darkMode} 
      />
      <main className="transition-all duration-700 ease-in-out">
        {renderActiveSection()}
        
        {/* Copyright Footer */}
        <footer className={`py-6 text-center border-t transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-600'
        }`}>
          <p className="text-sm">
            © 2026 MINUCST. Todos los derechos reservados.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;