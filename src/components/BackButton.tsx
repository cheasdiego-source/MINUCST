import React from 'react';
import { ArrowLeft } from 'lucide-react';

const BackButton: React.FC = () => {
  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // If no history, go to official website
      window.location.href = 'https://minucst.org/';
    }
  };

  return (
    <div className="fixed top-4 left-4 z-50 animate-fade-in">
      {/* Main back button */}
      <button
        onClick={handleBack}
        className="flex items-center space-x-2 bg-white/95 backdrop-blur-sm hover:bg-white text-red-900 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        title="Volver a la página anterior"
        type="button"
        aria-label="Volver a la página anterior"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        <span className="text-sm font-medium hidden sm:block">
          Volver
        </span>
      </button>
    </div>
  );
};

export default BackButton;