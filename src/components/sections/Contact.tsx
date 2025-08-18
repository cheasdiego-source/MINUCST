import React, { useState } from 'react';
import { MessageCircle, Mail, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    priority: 'normal',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensaje enviado exitosamente. Recibirás una respuesta en tu correo electrónico en las próximas 24-48 horas.');
    setFormData({
      name: '',
      email: '',
      role: '',
      priority: 'normal',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl font-bold text-red-900 mb-4 flex items-center justify-center">
            <MessageCircle className="h-10 w-10 mr-4 text-yellow-600" />
            Contacto Interno
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Canal exclusivo de comunicación para el staff organizador MINUCST 2026
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-red-900 mb-6">Formulario de Contacto</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Institucional *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    placeholder="tu.email@minucst.org"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rol en el Staff
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  >
                    <option value="">Selecciona tu rol</option>
                    <option value="secretario-general">Secretario General</option>
                    <option value="jefe-comite">Jefe de Comité</option>
                    <option value="logistica">Coordinador de Logística</option>
                    <option value="protocolo">Encargado de Protocolo</option>
                    <option value="prensa">Equipo de Prensa</option>
                    <option value="soporte">Soporte Técnico</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prioridad
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">Alta</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asunto *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  placeholder="Describe brevemente tu consulta"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  placeholder="Describe detalladamente tu consulta, problema o sugerencia..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <Send className="h-5 w-5 mr-2" />
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-gradient-to-r from-red-900 to-red-800 text-white rounded-2xl p-8 text-center animate-fade-in-up">
          <h2 className="text-2xl font-bold mb-4">Información de Contacto</h2>
          <p className="text-gray-100 mb-6 max-w-2xl mx-auto">
            Para consultas generales o soporte técnico, puedes contactarnos directamente
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:soporte@minucst.org"
              className="bg-yellow-500 hover:bg-yellow-600 text-red-900 font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center hover:scale-105"
            >
              <Mail className="h-5 w-5 mr-2" />
              soporte@minucst.org
            </a>
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

export default Contact;