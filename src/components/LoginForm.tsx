import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle, FileText } from 'lucide-react';
import ExternalLinkBanner from './ExternalLinkBanner';

interface LoginFormProps {
  onLogin: (code: string, name: string, role: string) => boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [isRobot, setIsRobot] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    'Jefe de Comité',
    'Coordinador de Logística',
    'Encargado de Protocolo',
    'Equipo de Prensa',
    'Soporte Técnico',
    'Otro'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isRobot) {
      setError('Por favor, confirma que no eres un robot');
      return;
    }

    if (!acceptedTerms) {
      setError('Debes aceptar los términos y condiciones para continuar');
      return;
    }

    if (!code.trim()) {
      setError('Por favor, ingresa tu código de acceso');
      return;
    }

    // Only require name and role for non-SG users
    if (!code.includes('-SG-') && !code.includes('-SGA-')) {
      if (!name.trim()) {
        setError('Por favor, ingresa tu nombre completo');
        return;
      }
      if (!role.trim()) {
        setError('Por favor, selecciona tu rol');
        return;
      }
    }

    setIsLoading(true);
    setError('');

    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const success = onLogin(code.trim(), name.trim(), role);
    
    if (!success) {
      setError('Código de acceso inválido. Contacta al administrador si el problema persiste.');
    }
    
    setIsLoading(false);
  };

  const isSecretaryGeneral = code.includes('-SG-') || code.includes('-SGA-');

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 flex items-center justify-center p-4">
      {/* Banner for external links */}
      <ExternalLinkBanner />
      
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="bg-white rounded-2xl p-8 max-w-md w-full relative z-10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img 
              src="/minucst_logo_resized.png" 
              alt="Logo MINUCST" 
              className="w-32 h-32 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h1 className="text-2xl font-bold text-red-900 mb-2">MINUCST Inside</h1>
          <p className="text-gray-600">Plataforma Exclusiva de Formación</p>
        </div>

        {/* Terms Modal */}
        {showTerms && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-red-900">Términos y Condiciones</h2>
                  <button
                    onClick={() => setShowTerms(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                    type="button"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <section>
                    <h3 className="text-lg font-bold text-red-900 mb-3">1. Aceptación de Términos</h3>
                    <p>Al acceder a MINUCST Inside, aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo, no debes usar la plataforma.</p>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-red-900 mb-3">2. Uso Autorizado</h3>
                    <p>Esta plataforma está destinada exclusivamente para el staff organizador de MINUCST 2026. El acceso no autorizado está prohibido y puede resultar en acciones legales.</p>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-red-900 mb-3">3. Confidencialidad</h3>
                    <p>Toda la información, materiales y contenidos son confidenciales. No debes compartir, copiar o distribuir ningún material sin autorización expresa.</p>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-red-900 mb-3">4. Propiedad Intelectual</h3>
                    <p>Todos los contenidos están protegidos por derechos de autor y leyes internacionales de propiedad intelectual (DMCA, WIPO).</p>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-red-900 mb-3">5. Responsabilidades del Usuario</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Mantener la confidencialidad de tus credenciales de acceso</li>
                      <li>Usar la plataforma solo para fines autorizados</li>
                      <li>Reportar cualquier uso indebido o violación de seguridad</li>
                      <li>Cumplir con el código de conducta establecido</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-red-900 mb-3">6. Privacidad y Protección de Datos</h3>
                    <p>Cumplimos con GDPR y otras regulaciones internacionales de privacidad. Tus datos personales serán tratados conforme a nuestra política de privacidad.</p>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-red-900 mb-3">7. Limitación de Responsabilidad</h3>
                    <p>MINUCST no será responsable por daños directos, indirectos o consecuenciales derivados del uso de la plataforma.</p>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-red-900 mb-3">8. Modificaciones</h3>
                    <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán notificados a través de la plataforma.</p>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-red-900 mb-3">9. Ley Aplicable</h3>
                    <p>Estos términos se rigen por las leyes internacionales y la jurisdicción de República Dominicana.</p>
                  </section>
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    onClick={() => setShowTerms(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                    type="button"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={() => {
                      setAcceptedTerms(true);
                      setShowTerms(false);
                    }}
                    className="px-6 py-2 bg-red-800 hover:bg-red-900 text-white rounded-lg transition-colors duration-300"
                    type="button"
                  >
                    Aceptar Términos
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código de Acceso Especial
            </label>
            <div className="relative">
              <input
                type={showCode ? 'text' : 'password'}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 pr-12"
                placeholder="MINUCST2026-XXXX-XXXX"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-300"
                disabled={isLoading}
              >
                {showCode ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Name and Role fields for non-SG users */}
          {!isSecretaryGeneral && code && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  placeholder="Tu nombre completo"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rol en el Staff
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  disabled={isLoading}
                >
                  <option value="">Selecciona tu rol</option>
                  {roles.map((roleOption) => (
                    <option key={roleOption} value={roleOption}>
                      {roleOption}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-300">
            <input
              type="checkbox"
              id="robot-check"
              checked={isRobot}
              onChange={(e) => setIsRobot(e.target.checked)}
              className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded transition-all duration-300"
              disabled={isLoading}
            />
            <label htmlFor="robot-check" className="text-sm text-gray-700 flex-1 cursor-pointer">
              No soy un robot
            </label>
            {isRobot && (
              <CheckCircle className="h-5 w-5 text-green-500 animate-fade-in" />
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms-check"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded mt-0.5 transition-all duration-300"
                disabled={isLoading}
              />
              <label htmlFor="terms-check" className="text-sm text-gray-700 flex-1 cursor-pointer">
                Acepto los{' '}
                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="text-red-600 hover:text-red-800 underline font-medium"
                >
                  términos y condiciones
                </button>
                {' '}de la plataforma
              </label>
            </div>
            {acceptedTerms && (
              <div className="flex items-center text-green-600 text-sm">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>Términos aceptados</span>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 animate-fade-in">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !isRobot || !acceptedTerms}
            className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
              isLoading || !isRobot || !acceptedTerms
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-white transform hover:scale-105 shadow-lg hover:shadow-xl'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Verificando acceso...</span>
              </div>
            ) : (
              'Acceder a la Plataforma'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Acceso restringido solo para staff autorizado MINUCST 2026
          </p>
          <p className="text-xs text-gray-400 mt-2">
            © 2026 MINUCST. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;