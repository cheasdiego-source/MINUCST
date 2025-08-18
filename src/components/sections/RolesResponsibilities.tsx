import React, { useState } from 'react';
import { UserCheck, Crown, Users, Truck, Camera, Settings, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';

const RolesResponsibilities = () => {
  const [expandedRole, setExpandedRole] = useState<number | null>(null);

  const roles = [
    {
      icon: Crown,
      title: 'Secretarios Generales',
      color: 'from-red-800 to-red-900',
      description: 'Liderazgo estratégico y supervisión general del evento',
      functions: [
        'Coordinación general de todas las actividades del modelo',
        'Toma de decisiones estratégicas y resolución de conflictos de alto nivel',
        'Representación oficial ante medios y autoridades',
        'Supervisión de la calidad académica y protocolo diplomático'
      ],
      requirements: [
        'Experiencia previa en modelos de Naciones Unidas (mínimo 3 años)',
        'Habilidades excepcionales de liderazgo y comunicación',
        'Conocimiento profundo de protocolo diplomático internacional',
        'Disponibilidad completa durante el evento'
      ],
      contacts: ['sg1@minucst.org', 'sg2@minucst.org']
    },
    {
      icon: Users,
      title: 'Jefes de Comité',
      color: 'from-yellow-600 to-yellow-800',
      description: 'Dirección académica y moderación de comités especializados',
      functions: [
        'Moderación de debates y procedimientos parlamentarios',
        'Evaluación del desempeño de delegados',
        'Mantenimiento del orden y protocolo en sesiones',
        'Coordinación con el equipo de apoyo del comité'
      ],
      requirements: [
        'Experiencia como delegado o staff en modelos anteriores',
        'Conocimiento especializado en el tema del comité asignado',
        'Habilidades de moderación y manejo de grupos',
        'Capacidad de tomar decisiones bajo presión'
      ],
      contacts: ['comites@minucst.org']
    },
    {
      icon: Truck,
      title: 'Coordinadores de Logística',
      color: 'from-red-600 to-red-800',
      description: 'Gestión operativa y logística integral del evento',
      functions: [
        'Coordinación de espacios, equipos y recursos materiales',
        'Gestión de alimentación, transporte y alojamiento',
        'Supervisión de montaje y desmontaje de espacios',
        'Atención a necesidades especiales de participantes'
      ],
      requirements: [
        'Experiencia en gestión de eventos o logística',
        'Habilidades organizacionales excepcionales',
        'Capacidad de trabajo bajo presión',
        'Disponibilidad para horarios extendidos'
      ],
      contacts: ['logistica@minucst.org']
    },
    {
      icon: MessageCircle,
      title: 'Encargados de Protocolo',
      color: 'from-yellow-500 to-yellow-700',
      description: 'Ceremonial, etiqueta diplomática y eventos especiales',
      functions: [
        'Organización de ceremonias de apertura y clausura',
        'Coordinación de eventos sociales y culturales',
        'Implementación de protocolo diplomático oficial',
        'Gestión de invitados especiales y autoridades'
      ],
      requirements: [
        'Conocimiento de protocolo y etiqueta internacional',
        'Experiencia en organización de eventos formales',
        'Habilidades de coordinación y atención al detalle',
        'Presentación personal impecable'
      ],
      contacts: ['protocolo@minucst.org']
    },
    {
      icon: Camera,
      title: 'Equipo de Prensa y Comunicación',
      color: 'from-red-700 to-red-900',
      description: 'Comunicación, medios y documentación audiovisual',
      functions: [
        'Cobertura fotográfica y audiovisual del evento',
        'Gestión de redes sociales y comunicación externa',
        'Producción de contenido multimedia y boletines',
        'Coordinación con medios de comunicación'
      ],
      requirements: [
        'Habilidades en fotografía, video o comunicación digital',
        'Experiencia en manejo de redes sociales',
        'Capacidad de trabajo en tiempo real',
        'Equipo técnico propio (cámara, laptop, etc.)'
      ],
      contacts: ['prensa@minucst.org', 'comunicacion@minucst.org']
    },
    {
      icon: Settings,
      title: 'Soporte Técnico',
      color: 'from-yellow-600 to-yellow-800',
      description: 'Infraestructura tecnológica y soporte digital',
      functions: [
        'Mantenimiento de equipos audiovisuales y tecnológicos',
        'Soporte técnico en salas de comité',
        'Gestión de plataformas digitales y sistemas',
        'Resolución de problemas técnicos en tiempo real'
      ],
      requirements: [
        'Conocimientos técnicos en audiovisuales y sistemas',
        'Experiencia en soporte técnico o IT',
        'Capacidad de resolución rápida de problemas',
        'Disponibilidad para guardias técnicas'
      ],
      contacts: ['soporte@minucst.org']
    }
  ];

  const toggleExpand = (index: number) => {
    setExpandedRole(expandedRole === index ? null : index);
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl font-bold text-red-900 mb-4 flex items-center justify-center">
            <UserCheck className="h-10 w-10 mr-4 text-yellow-600" />
            Roles y Responsabilidades
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estructura organizacional y funciones específicas de cada rol dentro del staff MINUCST 2026
          </p>
        </div>

        {/* Roles Cards */}
        <div className="space-y-6">
          {roles.map((role, index) => {
            const Icon = role.icon;
            const isExpanded = expandedRole === index;
            
            return (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div 
                  className={`bg-gradient-to-r ${role.color} p-6 cursor-pointer hover:opacity-90 transition-opacity duration-300`}
                  onClick={() => toggleExpand(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-white/20 backdrop-blur w-12 h-12 rounded-xl flex items-center justify-center mr-4 hover:scale-110 transition-transform duration-300">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{role.title}</h3>
                        <p className="text-white/80">{role.description}</p>
                      </div>
                    </div>
                    <div className="text-white hover:scale-110 transition-transform duration-300">
                      {isExpanded ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-8 bg-white animate-slide-down">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Functions */}
                      <div>
                        <h4 className="text-lg font-bold text-red-900 mb-4">Funciones Principales</h4>
                        <ul className="space-y-3">
                          {role.functions.map((func, funcIndex) => (
                            <li key={funcIndex} className="flex items-start hover:bg-gray-50 p-2 rounded transition-colors duration-300">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-700">{func}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Requirements */}
                      <div>
                        <h4 className="text-lg font-bold text-red-900 mb-4">Requisitos Específicos</h4>
                        <ul className="space-y-3">
                          {role.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-start hover:bg-gray-50 p-2 rounded transition-colors duration-300">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-700">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Contacts */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h4 className="text-lg font-bold text-red-900 mb-4">Contactos Directos</h4>
                      <div className="flex flex-wrap gap-3">
                        {role.contacts.map((contact, contactIndex) => (
                          <a
                            key={contactIndex}
                            href={`mailto:${contact}`}
                            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105"
                          >
                            {contact}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Organizational Chart CTA */}
        <div className="mt-12 bg-gradient-to-r from-red-900 to-red-800 text-white rounded-2xl p-8 text-center animate-fade-in-up">
          <h2 className="text-2xl font-bold mb-4">¿Necesitas más información?</h2>
          <p className="text-gray-100 mb-6">
            Consulta el organigrama completo o contacta directamente con coordinación general
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-red-900 font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105">
              Descargar Organigrama
            </button>
            <button className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-red-900 font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105">
              Contactar Coordinación
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">© 2026 MINUCST. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default RolesResponsibilities;