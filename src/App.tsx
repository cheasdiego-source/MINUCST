import React, { useEffect, useState } from 'react';

function App() {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Cerrar la ventana/pestaña
          window.close();
          // Si no se puede cerrar, redirigir a página en blanco
          window.location.href = 'about:blank';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ff0000',
      fontFamily: 'monospace',
      fontSize: '24px',
      textAlign: 'center'
    }}>
      <div>
        <h1>ACCESO DENEGADO</h1>
        <p>Este sitio ha sido desactivado permanentemente</p>
        <p>Error 403 - Forbidden</p>
        <div style={{
          marginTop: '40px',
          fontSize: '32px',
          color: '#ff4444',
          fontWeight: 'bold'
        }}>
          <p>Cerrando en: {countdown} segundos</p>
          <div style={{
            width: '200px',
            height: '10px',
            backgroundColor: '#333',
            margin: '20px auto',
            borderRadius: '5px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${(countdown / 10) * 100}%`,
              height: '100%',
              backgroundColor: '#ff0000',
              transition: 'width 1s linear'
            }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;