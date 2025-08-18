import React from 'react';
import { Award, Shield, Globe, Star } from 'lucide-react';

interface HomeProps {
  setActiveSection: (section: string) => void;
}

const Home: React.FC<HomeProps> = ({ setActiveSection }) => {
  const features = [
    {
      icon: Award,
      title: 'Excelencia Académica',
      description: 'Formación de primer nivel para alcanzar estándares internacionales'
    },
    {
      icon: Shield,
      title: 'Ambiente Seguro',
      description: 'Plataforma protegida bajo leyes internacionales de privacidad'
    },
    {
      icon: Globe,
      title: 'Estándares Diplomáticos',
      description: 'Protocolos y procedimientos alineados con la ONU'
    },
    {
      icon: Star,
      title: 'Equipo Élite',
      description: 'Staff seleccionado para crear una experiencia memorable'
    }
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-900 via-red-800 to-red-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
              Bienvenidos a{' '}
              <span className="text-yellow-400 animate-pulse">MINUCST Inside</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed animate-fade-in-up animation-delay-200">
              La plataforma exclusiva de formación para el staff organizador del modelo MINUCST 2026
            </p>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8 animate-fade-in-up animation-delay-400">
              <p className="text-lg leading-relaxed">
                Aquí fortalecemos nuestras habilidades, alineamos valores y consolidamos el compromiso 
                para hacer de esta edición una experiencia memorable y de excelencia. Este espacio está 
                protegido y regulado bajo las leyes internacionales de propiedad intelectual, privacidad 
                y conducta ética, garantizando un ambiente seguro y profesional para todo el equipo.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
              <button 
                onClick={() => setActiveSection('training')}
                className="bg-yellow-500 hover:bg-yellow-600 text-red-900 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Comenzar Capacitación
              </button>
              <button 
                onClick={() => setActiveSection('training')}
                className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-red-900 font-bold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105"
              >
                Ver Recursos
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-red-900 mb-4 animate-fade-in-up">¿Por qué MINUCST Inside?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Una plataforma diseñada específicamente para formar líderes diplomáticos del futuro
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 animate-fade-in-up group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-red-900" />
                  </div>
                  <h3 className="text-xl font-bold text-red-900 mb-4 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2 animate-fade-in-up">
              <div className="text-4xl font-bold text-red-800 animate-count-up">30+</div>
              <div className="text-yellow-600 font-semibold">Miembros del Staff</div>
            </div>
            <div className="space-y-2 animate-fade-in-up animation-delay-200">
              <div className="text-4xl font-bold text-red-800 animate-count-up">25+</div>
              <div className="text-yellow-600 font-semibold">Módulos de Capacitación</div>
            </div>
            <div className="space-y-2 animate-fade-in-up animation-delay-400">
              <div className="text-4xl font-bold text-red-800 animate-count-up">8</div>
              <div className="text-yellow-600 font-semibold">Semanas de Preparación</div>
            </div>
            <div className="space-y-2 animate-fade-in-up animation-delay-600">
              <div className="text-4xl font-bold text-red-800 animate-count-up">100%</div>
              <div className="text-yellow-600 font-semibold">Compromiso con la Excelencia</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;