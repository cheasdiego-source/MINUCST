import React from 'react';

function App() {
  // Sitio bloqueado permanentemente
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      display: 'flex',
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
      </div>
    </div>
  );
}

export default App;