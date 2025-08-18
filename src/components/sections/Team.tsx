import React from 'react';
import { Users, Mail, Award } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Diego Emmanuel Cheas López',
      position: 'Secretario General',
      department: 'Dirección Ejecutiva',
      bio: 'Estudiante de 6to de Secundaria, apasionado con el debate, la argumentación, la negociación y el liderazgo. Con experiencia en más de 15 modelos de Naciones Unidas.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'dcheas.secretario@minucst.org',
      achievements: ['15+ Modelos MUN', 'Liderazgo Estudiantil', 'Debate Avanzado']
    },
    {
      name: 'Natasha Leonela Guzmán Mauricio',
      position: 'Secretaria General Adjunta',
      department: 'Dirección Ejecutiva',
      bio: 'Estudiante de 6to de Secundaria, apasionada con el debate, la retórica, la persuasión y negociación. Con experiencia en más de 15 modelos de Naciones Unidas.',
      image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'nguzman.adjunta@minucst.org',
      achievements: ['15+ Modelos MUN', 'Retórica Avanzada', 'Persuasión Diplomática']
    },
    {
      name: 'Ana Sofía Martínez',
      position: 'Directora de Capacitación',
      department: 'Desarrollo Académico',
      bio: 'Especialista en pedagogía diplomática y desarrollo de competencias internacionales. Líder en innovación educativa para simulacros de organismos multilaterales.',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'am.capacitacion@minucst.org',
      achievements: ['MSc Educación', 'Innovación Pedagógica', 'Experta en MUN']
    },
    {
      name: 'Roberto Jiménez',
      position: 'Coordinador de Logística',
      department: 'Operaciones',
      bio: 'Ingeniero industrial con especialización en gestión de eventos internacionales. Ha coordinado la logística de más de 50 eventos diplomáticos de gran escala.',
      image: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'rj.logistica@minucst.org',
      achievements: ['Ing. Industrial', '50+ Eventos', 'Gestión Internacional']
    },
    {
      name: 'Isabella Torres',
      position: 'Jefa de Protocolo',
      department: 'Relaciones Institucionales',
      bio: 'Especialista en protocolo diplomático internacional y ceremonial de Estado. Formación en la Escuela Diplomática y experiencia en misiones consulares.',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'it.protocolo@minucst.org',
      achievements: ['Protocolo Diplomático', 'Escuela Diplomática', 'Ceremonial Estado']
    },
    {
      name: 'Diego Fernández',
      position: 'Director de Comunicaciones',
      department: 'Medios y Difusión',
      bio: 'Comunicador social especializado en diplomacia pública y relaciones internacionales. Experto en estrategias de comunicación para organizaciones multilaterales.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'df.comunicaciones@minucst.org',
      achievements: ['Comunicación Social', 'Diplomacia Pública', 'Estrategia Digital']
    }
  ];

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl font-bold text-red-900 mb-4 flex items-center justify-center">
            <Users className="h-10 w-10 mr-4 text-yellow-600" />
            Equipo MINUCST Inside
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conoce al equipo que lidera la formación y coordinación de uno de los modelos más importantes de República Dominicana y del Caribe
          </p>
        </div>

        {/* Team Members */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-red-900 mb-1 group-hover:text-red-700 transition-colors duration-300">{member.name}</h3>
                    <p className="text-yellow-700 font-semibold mb-1">{member.position}</p>
                    <p className="text-gray-500 text-sm">{member.department}</p>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-red-900 mb-2 flex items-center">
                      <Award className="h-4 w-4 mr-1" />
                      Logros Destacados
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {member.achievements.map((achievement, achIndex) => (
                        <span
                          key={achIndex}
                          className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full hover:bg-yellow-200 transition-colors duration-300"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center text-red-700 hover:text-red-900 transition-colors duration-300 font-medium group-hover:scale-105 transform"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    {member.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-2xl p-8 mb-8 animate-fade-in-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Nuestra Misión</h2>
            <p className="text-xl text-gray-100 leading-relaxed max-w-4xl mx-auto">
              Formar a la próxima generación de líderes diplomáticos a través de una experiencia educativa 
              transformadora que combine excelencia académica, protocolo internacional y valores éticos sólidos.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <h3 className="text-lg font-bold mb-3">Excelencia</h3>
              <p className="text-gray-100 text-sm">
                Mantenemos los más altos estándares académicos y profesionales
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <h3 className="text-lg font-bold mb-3">Innovación</h3>
              <p className="text-gray-100 text-sm">
                Incorporamos metodologías pedagógicas de vanguardia
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <h3 className="text-lg font-bold mb-3">Compromiso</h3>
              <p className="text-gray-100 text-sm">
                Dedicación total al desarrollo personal y profesional
              </p>
            </div>
          </div>
        </div>

        {/* Contact Team CTA */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center animate-fade-in-up">
          <h2 className="text-2xl font-bold text-red-900 mb-4">¿Quieres conocer más sobre nuestro equipo?</h2>
          <p className="text-gray-600 mb-6">
            Nuestros coordinadores están disponibles para resolver tus dudas y brindarte orientación personalizada
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
              Agendar Reunión
            </button>
            <button className="border-2 border-yellow-500 text-yellow-700 hover:bg-yellow-500 hover:text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105">
              Directorio Completo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;