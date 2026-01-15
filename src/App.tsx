import React from 'react';

function App() {
  // Bloqueo inmediato
  React.useEffect(() => {
    window.close();
    window.location.href = 'about:blank';
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ff0000',
      fontFamily: 'monospace',
      fontSize: '24px'
    }}>
      <h1>BLOQUEADO</h1>
    </div>
  );
}

export default App;