import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date for MINUCST 2026 - March 15, 2026
    const targetDate = new Date('2026-03-20T09:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 rounded-xl p-4 shadow-lg animate-fade-in-up">
      <div className="flex items-center justify-center mb-3">
        <Calendar className="h-5 w-5 mr-2" />
        <h3 className="font-bold text-sm">Inicio del Modelo</h3>
      </div>
      
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-white/20 backdrop-blur rounded-lg p-2">
          <div className="text-lg font-bold">{timeLeft.days}</div>
          <div className="text-xs">Días</div>
        </div>
        <div className="bg-white/20 backdrop-blur rounded-lg p-2">
          <div className="text-lg font-bold">{timeLeft.hours}</div>
          <div className="text-xs">Horas</div>
        </div>
        <div className="bg-white/20 backdrop-blur rounded-lg p-2">
          <div className="text-lg font-bold">{timeLeft.minutes}</div>
          <div className="text-xs">Min</div>
        </div>
        <div className="bg-white/20 backdrop-blur rounded-lg p-2">
          <div className="text-lg font-bold">{timeLeft.seconds}</div>
          <div className="text-xs">Seg</div>
        </div>
      </div>
      
      <div className="flex items-center justify-center mt-3 text-xs">
        <Clock className="h-3 w-3 mr-1" />
        <span>15 de Marzo, 2026</span>
      </div>
    </div>
  );
};

export default Countdown;