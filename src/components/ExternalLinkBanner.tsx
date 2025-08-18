import React, { useState, useEffect } from 'react';
import { Globe, X } from 'lucide-react';

const ExternalLinkBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [referrerDomain, setReferrerDomain] = useState<string>('');

  useEffect(() => {
    // Check if coming from external link
    const referrer = document.referrer;
    const urlParams = new URLSearchParams(window.location.search);
    const fromExternal = urlParams.get('from') === 'external' || urlParams.get('ref');
    
    // Check if banner was already dismissed in this session
    const dismissed = sessionStorage.getItem('external-banner-dismissed');
    
    if ((referrer || fromExternal) && !dismissed) {
      setShowBanner(true);
      
      if (referrer) {
        try {
          const referrerUrl = new URL(referrer);
          setReferrerDomain(referrerUrl.hostname);
        } catch {
          setReferrerDomain('sitio web externo');
        }
      } else {
        setReferrerDomain('enlace externo');
      }
    }
  }, []);

  const handleDismiss = () => {
    setShowBanner(false);
    // Save in sessionStorage to not show again in this session
    sessionStorage.setItem('external-banner-dismissed', 'true');
  };

  if (!showBanner) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 p-3 shadow-lg animate-slide-down">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Globe className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          <div className="flex-1">
            <p className="text-sm font-medium">
              Has accedido desde {referrerDomain}
            </p>
            <p className="text-xs opacity-90">
              Esta es la plataforma interna de capacitación MINUCST Inside
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDismiss}
            className="text-red-900 hover:text-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg p-1"
            title="Cerrar aviso"
            type="button"
            aria-label="Cerrar aviso de enlace externo"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExternalLinkBanner;