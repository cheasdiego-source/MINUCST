import React, { useState } from 'react';
import { FileText, CheckCircle, AlertTriangle, Users, Shield, Heart } from 'lucide-react';

const CodeOfConduct = () => {
  const [accepted, setAccepted] = useState(false);
  const [signature, setSignature] = useState('');

  const principles = [
    {
      icon: Heart,
      title: 'Respeto y Convivencia',
      description: 'Promovemos un ambiente inclusivo, diverso y respetuoso donde cada miembro del staff se sienta valorado y escuchado.',
      details: [
        'Trato cortés y profesional en todas las interacciones',
        'Respeto por la diversidad cultural, religiosa y personal',
        'Comunicación constructiva y libre de discriminación',
        'Apoyo mutuo y colaboración efectiva'
      ]
    },
    {
      icon: Shield,
      title: 'Confidencialidad',
      description: 'Mantenemos la más estricta confidencialidad sobre información sensible, estrategias organizacionales y datos personales.',
      details: [
        'Protección de información interna del evento',
        'Discreción absoluta sobre deliberaciones y decisiones',
        'Manejo responsable de datos de participantes',
        'No divulgación de información privilegiada'
      ]
    },
    {
      icon: CheckCircle,
      title: 'Compromiso con la Excelencia',
      description: 'Nos comprometemos a mantener los más altos estándares de calidad y profesionalismo en todas nuestras actividades.',
      details: [
        'Puntualidad y responsabilidad en todas las actividades',
        'Preparación adecuada para roles asignados',
        'Búsqueda continua de mejora y aprendizaje',
        'Representación digna de la organización'
      ]
    },
    {
      icon: Users,
      title: 'Uso Responsable de Recursos',
      description: 'Utilizamos de manera eficiente y responsable todos los recursos materiales y tecnológicos puestos a nuestra disposición.',
      details: [
        'Uso apropiado de equipos y tecnología',
        'Conservación de materiales y suministros',
        'Optimización de recursos financieros',
        'Cuidado de instalaciones y espacios'
      ]
    }
  ];

  const handleAcceptance = () => {
    if (signature.trim() && accepted) {
      alert('Código de Conducta aceptado exitosamente. Tu compromiso ha sido registrado.');
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl font-bold text-red-900 mb-4 flex items-center justify-center">
            <FileText className="h-10 w-10 mr-4 text-yellow-600" />
            Código de Conducta
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Principios y valores que guían nuestro comportamiento profesional y ético
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-400 p-6 mb-8 rounded-r-lg animate-fade-in-up">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1" />
            <div>
              <h3 className="font-bold text-yellow-800 mb-2">Cumplimiento Obligatorio</h3>
              <p className="text-yellow-700">
                Este código de conducta es de cumplimiento obligatorio para todos los miembros del staff. 
                Su incumplimiento puede resultar en medidas disciplinarias, incluyendo la separación del equipo organizador.
              </p>
            </div>
          </div>
        </div>

        {/* Principles */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 w-12 h-12 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-red-900" />
                  </div>
                  <h3 className="text-xl font-bold text-red-900">{principle.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{principle.description}</p>
                
                <ul className="space-y-3">
                  {principle.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Reporting Section */}
        <div className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-2xl p-8 mb-8 animate-fade-in-up">
          <h2 className="text-2xl font-bold mb-4">Canales de Reporte</h2>
          <p className="mb-6 text-gray-100">
            Si observas algún comportamiento que no cumple con este código, puedes reportarlo de manera confidencial:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
              <h4 className="font-bold mb-2">Email Confidencial</h4>
              <p className="text-sm text-gray-200">etica@minucst.org</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
              <h4 className="font-bold mb-2">Formulario Anónimo</h4>
              <p className="text-sm text-gray-200">Portal interno disponible 24/7</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
              <h4 className="font-bold mb-2">Coordinador de Ética</h4>
              <p className="text-sm text-gray-200">Contacto directo disponible</p>
            </div>
          </div>
        </div>

        {/* Digital Signature */}
        <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in-up">
          <h2 className="text-2xl font-bold text-red-900 mb-6">Aceptación Digital</h2>
          
          <div className="mb-6 p-6 bg-gray-50 rounded-lg">
            <p className="text-gray-700 leading-relaxed">
              Al firmar digitalmente este documento, confirmo que he leído, entendido y acepto cumplir 
              con todos los principios y normas establecidos en este Código de Conducta. Me comprometo 
              a mantener los más altos estándares de comportamiento profesional y ético durante mi 
              participación en MINUCST 2026.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo (Firma Digital)
              </label>
              <input
                type="text"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                placeholder="Escriba su nombre completo como firma digital"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="acceptance"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="acceptance" className="ml-3 block text-sm text-gray-700">
                Acepto y me comprometo a cumplir con este Código de Conducta
              </label>
            </div>

            <button
              onClick={handleAcceptance}
              disabled={!accepted || !signature.trim()}
              className={`w-full py-4 rounded-lg font-bold transition-all duration-300 ${
                accepted && signature.trim()
                  ? 'bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-white transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Firmar y Aceptar Código de Conducta
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

export default CodeOfConduct;