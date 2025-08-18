interface PDFDocument {
  title: string;
  content: string;
  lastUpdated: string;
  size: string;
}

export const generateBeautifulPDF = (doc: PDFDocument): void => {
  try {
    // Create formatted content for text download
    const content = `${doc.title}
${'='.repeat(doc.title.length)}

Última actualización: ${doc.lastUpdated}
Tamaño: ${doc.size}

${doc.content}

© 2026 MINUCST. Todos los derechos reservados.
Este documento es confidencial y está destinado exclusivamente para el staff de MINUCST 2026.`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/\s+/g, '_').toLowerCase()}_minucst.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating document:', error);
    throw error;
  }
};