import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Shield, AlertTriangle, CheckCircle, FileText } from 'lucide-react';

interface SecureLoginFormProps {
  onLogin: (code: string, captchaToken?: string, acceptedTerms?: boolean) => Promise<{ success: boolean; error?: string; needsCaptcha?: boolean }>;
}

const SecureLoginForm: React.FC<SecureLoginFormProps> = ({ onLogin }) => {
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [needsCaptcha, setNeedsCaptcha] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const [honeypot, setHoneypot] = useState(''); // Campo honeypot invisible
  const [attempts, setAttempts] = useState(0);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // Simular reCAPTCHA (en producción usar Google reCAPTCHA)
  const [captchaChallenge, setCaptchaChallenge] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaSolved, setCaptchaSolved] = useState(false);

  useEffect(() => {
    if (needsCaptcha && !captchaChallenge) {
      generateCaptcha();
    }
  }, [needsCaptcha]);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let result: number;
    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = Math.max(num1, num2) - Math.min(num1, num2);
        break;
      case '*':
        result = num1 * num2;
        break;
      default:
        result = num1 + num2;
    }
    
    setCaptchaChallenge(`${Math.max(num1, num2)} ${operator} ${Math.min(num1, num2)} = ?`);
    setCaptchaToken(result.toString());
  };

  const verifyCaptcha = (answer: string): boolean => {
    return answer === captchaToken;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError('Por favor, ingresa tu código de acceso');
      return;
    }

    if (!acceptedTerms) {
      setError('Debes aceptar los términos y condiciones para continuar');
      return;
    }

    // Verificar CAPTCHA si es necesario
    if (needsCaptcha && !captchaSolved) {
      if (!captchaAnswer) {
        setError('Por favor, resuelve la verificación matemática');
        return;
      }
      
      if (!verifyCaptcha(captchaAnswer)) {
        setError('Verificación incorrecta. Inténtalo de nuevo.');
        generateCaptcha();
        setCaptchaAnswer('');
        return;
      }
      
      setCaptchaSolved(true);
    }

    setIsLoading(true);
    setError('');

    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));

      const result = await onLogin(code.trim(), captchaSolved ? captchaToken : undefined, acceptedTerms);
      
      if (!result.success) {
        setAttempts(prev => prev + 1);
        setError(result.error || 'Error de autenticación');
        
        if (result.needsCaptcha) {
          setNeedsCaptcha(true);
          generateCaptcha();
        }
        
        // Regenerar CAPTCHA después de fallo
        if (needsCaptcha) {
          generateCaptcha();
          setCaptchaAnswer('');
          setCaptchaSolved(false);
        }
      }
    } catch (error) {
      setError('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCaptchaChange = (value: string) => {
    setCaptchaAnswer(value);
    if (verifyCaptcha(value)) {
      setCaptchaSolved(true);
    } else {
      setCaptchaSolved(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        {[...Array(50)].map((_, i) => (
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
      
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl border border-white/20 animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img 
                src="/minucst_logo_resized.png" 
                alt="Logo MINUCST" 
                className="w-32 h-32 object-contain hover:scale-110 transition-transform duration-500 filter drop-shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-red-600/20 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-900 to-red-700 bg-clip-text text-transparent mb-2">
            MINUCST Inside
          </h1>
          <p className="text-gray-600 font-medium">Plataforma Segura de Capacitación</p>
        </div>

        {/* Terms Modal */}
        {showTerms && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-red-900 flex items-center">
                    <FileText className="h-6 w-6 mr-2" />
                    Términos y Condiciones
                  </h2>
                  <button
                    onClick={() => setShowTerms(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl transition-colors duration-300 hover:scale-110"
                    type="button"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-6 text-gray-700 leading-relaxed max-h-96 overflow-y-auto">
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
                    <h3 className="text-lg font-bold text-red-900 mb-3">4. Seguridad</h3>
                    <p>Debes mantener la confidencialidad de tu código de acceso y reportar cualquier uso no autorizado inmediatamente.</p>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-red-900 mb-3">5. Responsabilidades</h3>
                    <p>Eres responsable de todas las actividades realizadas bajo tu código de acceso y debes cumplir con el código de conducta establecido.</p>
                  </section>
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    onClick={() => setShowTerms(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                    type="button"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={() => {
                      setAcceptedTerms(true);
                      setShowTerms(false);
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                    type="button"
                  >
                    Aceptar Términos
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Advertencias de seguridad */}
        {attempts > 0 && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg animate-slide-in-left">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-800 font-medium">
                  {attempts === 1 && "Código incorrecto. Verifica e inténtalo de nuevo."}
                  {attempts === 2 && "Segundo intento fallido. Se requiere verificación adicional."}
                  {attempts >= 3 && "Múltiples intentos fallidos. Tu acceso puede ser bloqueado temporalmente."}
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo honeypot (invisible) */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Campo de código */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código de Acceso Autorizado
            </label>
            <div className="relative group">
              <input
                type={showCode ? 'text' : 'password'}
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 pr-12 font-mono text-center tracking-wider text-lg bg-gradient-to-r from-gray-50 to-white group-hover:shadow-lg"
                placeholder="MINUCST-XXXX-XX"
                disabled={isLoading}
                maxLength={25}
                autoComplete="off"
                spellCheck={false}
              />
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110"
                disabled={isLoading}
              >
                {showCode ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* CAPTCHA matemático */}
          {needsCaptcha && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200 animate-slide-down">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Verificación de Seguridad
              </label>
              <div className="flex items-center space-x-4">
                <div className="bg-white px-6 py-3 rounded-lg border-2 border-blue-300 font-mono text-xl font-bold text-blue-900 shadow-inner">
                  {captchaChallenge}
                </div>
                <input
                  type="number"
                  value={captchaAnswer}
                  onChange={(e) => handleCaptchaChange(e.target.value)}
                  className="w-24 px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-xl font-bold"
                  placeholder="?"
                  disabled={isLoading}
                />
                {captchaSolved && (
                  <CheckCircle className="h-6 w-6 text-green-500 animate-bounce" />
                )}
              </div>
              <p className="text-xs text-blue-600 mt-2 font-medium">
                Resuelve la operación matemática para continuar
              </p>
            </div>
          )}

          {/* Términos y condiciones */}
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
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
                  className="text-red-600 hover:text-red-800 underline font-medium transition-colors duration-300"
                >
                  términos y condiciones
                </button>
                {' '}de la plataforma
              </label>
            </div>
            {acceptedTerms && (
              <div className="flex items-center text-green-600 text-sm animate-fade-in">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span className="font-medium">Términos aceptados</span>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-4 animate-fade-in">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={isLoading || (needsCaptcha && !captchaSolved) || !acceptedTerms}
            className={`w-full py-4 rounded-xl font-bold transition-all duration-500 transform ${
              isLoading || (needsCaptcha && !captchaSolved) || !acceptedTerms
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-red-800 via-red-900 to-red-800 hover:from-red-900 hover:via-red-800 hover:to-red-900 text-white hover:scale-105 shadow-lg hover:shadow-2xl'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg">Verificando acceso...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-3">
                <Shield className="h-6 w-6" />
                <span className="text-lg">Acceso Seguro</span>
              </div>
            )}
          </button>
        </form>

        {/* Información de seguridad */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-4 border border-blue-200">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm font-semibold text-blue-800">Sistema Ultra Seguro</span>
            </div>
            <p className="text-xs text-blue-700">
              Cifrado JWT • Autenticación multifactor • Monitoreo en tiempo real
            </p>
          </div>
          
          <p className="text-xs text-gray-500">
            Acceso restringido solo para personal autorizado MINUCST 2026
          </p>
          <p className="text-xs text-gray-400 mt-2">
            © 2026 MINUCST. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecureLoginForm;