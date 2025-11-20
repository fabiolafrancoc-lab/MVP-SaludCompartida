import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BubblesIntro = ({ onComplete, onSkipToLogin }) => {
  const navigate = useNavigate();
  const [currentBubble, setCurrentBubble] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const bubbles = [
    { text: "¿Te sientes culpable por estar lejos de tu familia?", gradient: "from-blue-500 to-cyan-500" },
    { text: "¿Te preocupa que se enfermen y no puedas ayudar?", gradient: "from-cyan-500 to-teal-500" },
    { text: "¿Las medicinas son demasiado caras para ellos?", gradient: "from-teal-500 to-green-500" },
    { text: "¿Tienes miedo de las emergencias médicas?", gradient: "from-purple-500 to-pink-500" },
    { text: "¿Quisieras darles más pero el dinero no alcanza?", gradient: "from-pink-500 to-rose-500" },
    { text: "Te ofrecemos una solución", gradient: "from-indigo-600 to-purple-600" },
    { text: "Doctor 24/7 por WhatsApp", gradient: "from-cyan-600 to-blue-600" },
    { text: "40-75% descuento en medicinas", gradient: "from-green-600 to-emerald-600" },
    { text: "Terapia psicológica semanal", gradient: "from-purple-600 to-pink-600" },
    { text: "Solo $12 al mes • Hasta 4 personas", gradient: "from-blue-600 to-cyan-600" }
  ];

  useEffect(() => {
    if (showAll) {
      // Cuando se muestran todas, esperamos un momento y completamos
      const timer = setTimeout(() => {
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (currentBubble < 5) {
      // Primeras 5 bubbles: 1.5 segundos cada una
      const timer = setTimeout(() => {
        setCurrentBubble(currentBubble + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (currentBubble === 5) {
      // Después de la 5ta, mostrar todas rápido
      const timer = setTimeout(() => {
        setShowAll(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentBubble, showAll, onComplete]);

  const visibleBubbles = showAll ? bubbles : bubbles.slice(0, currentBubble + 1);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-50 overflow-y-auto">
      {/* Botón "Ya estoy suscrito" flotante en la esquina superior derecha */}
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
        <button
          onClick={() => navigate('/page3')}
          className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold text-sm md:text-base hover:bg-white/20 transition-all duration-300 border border-white/30 shadow-lg"
        >
          Ya estoy suscrito →
        </button>
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6">
        <div className="max-w-lg md:max-w-2xl w-full space-y-3 md:space-y-4">
          {visibleBubbles.map((bubble, index) => (
            <div
              key={index}
              className={`
                transform transition-all duration-500 ease-out
                ${index === currentBubble && !showAll ? 'scale-100 opacity-100' : 'scale-95 opacity-70'}
                ${showAll ? 'animate-pulse' : ''}
              `}
            >
              <div className={`
                bg-gradient-to-r ${bubble.gradient} 
                rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl
                ${index === currentBubble && !showAll ? 'ring-2 md:ring-4 ring-white/50' : ''}
              `}>
                <p className="text-white text-base md:text-xl lg:text-2xl font-bold text-center leading-relaxed">
                  {bubble.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {showAll && (
          <div className="mt-6 md:mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-white/60 text-xs md:text-sm">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              <span>Cargando solución completa...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BubblesIntro;
