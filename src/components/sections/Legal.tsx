import React, { useState } from 'react';
import { Scale, Download, Shield, Globe, FileText, AlertTriangle, CheckCircle, Eye } from 'lucide-react';
import { useTrainingData } from '../../hooks/useTrainingData';

const Legal = () => {
  const [selectedDocument, setSelectedDocument] = useState<number | null>(null);
  const { documents: legalDocuments } = useTrainingData();

  const downloadDocument = (doc: any) => {
    const content = `${doc.title}
${'='.repeat(doc.title.length)}

Última actualización: ${doc.lastUpdated}
Tamaño: ${doc.size}

${doc.content}

© 2026 MINUCST. Todos los derechos reservados.
Este documento es parte de la documentación legal oficial de MINUCST Inside.
Para consultas legales: legal@minucst.org
`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/\s+/g, '_').toLowerCase()}_minucst_2026.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (!legalDocuments || legalDocuments.length === 0) {
    return (
      <div className="py-12 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-900 mb-4">Políticas y Marco Legal</h1>
            <p className="text-gray-600">Cargando documentos legales...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-900 mb-4 flex items-center justify-center leading-tight">
            <Scale className="h-10 w-10 mr-4 text-yellow-600" aria-hidden="true" />
            Políticas y Marco Legal
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Documentación legal completa que garantiza el cumplimiento con estándares internacionales 
            y protege los derechos de todos los usuarios de la plataforma
          </p>
          <div className="mt-6 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <CheckCircle className="h-4 w-4 mr-2" aria-hidden="true" />
            Cumplimiento Internacional Certificado
          </div>
        </div>

        {/* Document Modal */}
        {selectedDocument !== null && legalDocuments[selectedDocument] && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="document-modal-title">
            <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1 pr-4">
                    <h2 id="document-modal-title" className="text-2xl sm:text-3xl font-bold text-red-900 mb-2">
                      {legalDocuments[selectedDocument].title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {legalDocuments[selectedDocument].description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Última actualización: {legalDocuments[selectedDocument].lastUpdated}</span>
                      <span>Tamaño: {legalDocuments[selectedDocument].size}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedDocument(null)}
                    className="text-gray-400 hover:text-gray-600 text-3xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg p-2"
                    type="button"
                    aria-label="Cerrar documento"
                  >
                    ×
                  </button>
                </div>
                
                {/* Document Content */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6 max-h-96 overflow-y-auto border border-gray-200">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-mono">
                    {legalDocuments[selectedDocument].content}
                  </pre>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <button
                    onClick={() => downloadDocument(legalDocuments[selectedDocument])}
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                    type="button"
                  >
                    <Download className="h-5 w-5" aria-hidden="true" />
                    <span>Descargar PDF</span>
                  </button>
                  <button
                    onClick={() => setSelectedDocument(null)}
                    className="bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    type="button"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Legal Documents Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {legalDocuments.map((doc, index) => {
            const iconMap: { [key: string]: any } = {
              'Shield': Shield,
              'FileText': FileText,
              'Globe': Globe,
              'Eye': Eye
            };
            const Icon = iconMap[doc.icon] || FileText;
            
            return (
              <article 
                key={doc.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up group border border-gray-100"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`bg-gradient-to-r ${doc.color} p-6 sm:p-8`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <div className="bg-white/20 backdrop-blur w-12 h-12 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                          {doc.title}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-4 text-white/90 text-sm">
                        <span>Actualizado: {doc.lastUpdated}</span>
                        <span>Tamaño: {doc.size}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed text-base">
                    {doc.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" aria-hidden="true" />
                      <span className="text-sm font-semibold text-green-600">
                        Vigente y Actualizado
                      </span>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => setSelectedDocument(index)}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
                        type="button"
                        aria-label={`Ver documento ${doc.title}`}
                      >
                        <Eye className="h-4 w-4" aria-hidden="true" />
                        <span>Ver</span>
                      </button>
                      <button 
                        onClick={() => downloadDocument(doc)}
                        className="p-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
                        type="button"
                        aria-label={`Descargar ${doc.title} como PDF`}
                      >
                        <Download className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Compliance Section */}
        <div className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-2xl p-8 sm:p-12 mb-8 animate-fade-in-up">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Cumplimiento Internacional</h2>
            <p className="text-lg text-gray-100 leading-relaxed max-w-4xl mx-auto">
              Nuestra plataforma cumple con los más estrictos estándares legales y de privacidad a nivel mundial, 
              garantizando la protección de datos y derechos de todos nuestros usuarios.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <Shield className="h-8 w-8 mx-auto mb-3 text-yellow-400" aria-hidden="true" />
              <h4 className="font-bold mb-2">GDPR</h4>
              <p className="text-sm text-gray-200">Cumplimiento total con regulaciones europeas</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <Globe className="h-8 w-8 mx-auto mb-3 text-yellow-400" aria-hidden="true" />
              <h4 className="font-bold mb-2">DMCA</h4>
              <p className="text-sm text-gray-200">Protección de propiedad intelectual</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <Eye className="h-8 w-8 mx-auto mb-3 text-yellow-400" aria-hidden="true" />
              <h4 className="font-bold mb-2">WCAG 2.1</h4>
              <p className="text-sm text-gray-200">Accesibilidad universal garantizada</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <CheckCircle className="h-8 w-8 mx-auto mb-3 text-yellow-400" aria-hidden="true" />
              <h4 className="font-bold mb-2">ISO 27001</h4>
              <p className="text-sm text-gray-200">Seguridad de información certificada</p>
            </div>
          </div>
        </div>

        {/* Contact Legal Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center animate-fade-in-up">
          <h2 className="text-2xl font-bold text-red-900 mb-4">¿Necesitas Asesoría Legal?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nuestro equipo legal está disponible para resolver cualquier consulta sobre políticas, 
            cumplimiento normativo o derechos de usuario.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:legal@minucst.org"
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <FileText className="h-5 w-5" aria-hidden="true" />
              <span>Contactar Equipo Legal</span>
            </a>
            <a
              href="mailto:privacy@minucst.org"
              className="inline-flex items-center justify-center space-x-2 border-2 border-yellow-500 text-yellow-700 hover:bg-yellow-500 hover:text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              <Shield className="h-5 w-5" aria-hidden="true" />
              <span>Consultas de Privacidad</span>
            </a>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="mt-8 bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-400 p-6 rounded-r-xl animate-fade-in-up">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" aria-hidden="true" />
            <div>
              <h3 className="font-bold text-yellow-800 mb-2">Aviso Legal Importante</h3>
              <p className="text-yellow-700 leading-relaxed">
                Estos documentos constituyen acuerdos legalmente vinculantes. Al usar la plataforma MINUCST Inside, 
                aceptas cumplir con todas las políticas aquí establecidas. Para consultas específicas sobre 
                interpretación legal, contacta a nuestro departamento legal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;