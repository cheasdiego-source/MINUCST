import React from 'react';
import { Trophy, Target } from 'lucide-react';

interface ProgressBarProps {
  progress: number;
  darkMode?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, darkMode = false }) => {
  return (
    <div className={`rounded-xl p-4 shadow-lg animate-fade-in-up ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Target className={`h-5 w-5 mr-2 ${darkMode ? 'text-blue-400' : 'text-red-600'}`} />
          <h3 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-red-900'}`}>
            Progreso de Capacitación
          </h3>
        </div>
        {progress === 100 && (
          <Trophy className="h-5 w-5 text-yellow-500 animate-bounce" />
        )}
      </div>
      
      <div className={`w-full bg-gray-200 rounded-full h-3 mb-2 ${darkMode ? 'bg-gray-700' : ''}`}>
        <div 
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {progress}% Completado
        </span>
        <span className={`text-xs font-medium ${
          progress === 100 
            ? 'text-green-600' 
            : darkMode ? 'text-blue-400' : 'text-red-600'
        }`}>
          {progress === 100 ? '¡Completado!' : `${6 - Math.floor(progress / 16.67)} módulos restantes`}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;