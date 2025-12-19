import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Sitio completamente bloqueado
const BlockedApp = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      color: '#f00',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'monospace'
    }}>
      <h1>SITIO DESACTIVADO</h1>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <BlockedApp />
    </StrictMode>
  );
}