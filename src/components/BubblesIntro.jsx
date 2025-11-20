import React, { useState, useEffect } from 'react';

const BubblesIntro = ({ onComplete }) => {
  const [currentBubble, setCurrentBubble] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const bubbles = [
    { text: "¿Te sientes culpable por estar lejos de tu familia?", color: "from-red-500 to-pink-500" },
    { text: "¿Te preocupa que se enfermen y no puedas ayudar?", color: "from-orange-500 to-red-500" },
    { text: "¿Las medicinas son demasiado caras para ellos?", color: "from-yellow-500 to-orange-500" },
    { text: "¿Tienes miedo de las emergencias médicas?", color: "from-purple-500 to-pink-500" },
    { text: "¿Quisieras darles más pero el dinero no alcanza?", color: "from-blue-500 to-purple-500" },
    { text: "Te ofrecemos una solución", color: "from-cyan-500 to-blue-500" },
    { text: "Doctor 24/7 por WhatsApp", color: "from-green-500 to-cyan-500" },
    { text: "40-75% descuento en medicinas", color: "from-emerald-500 to-green-500" },
    { text: "Terapia psicológica semanal", color: "from-purple-500 to-pink-500" },
    { text: "Solo $12 al mes • Hasta 4 personas", color: "from-cyan-500 to-blue-500" }
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
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl w-full space-y-4">
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
                bg-gradient-to-r ${bubble.color} 
                rounded-3xl p-6 md:p-8 shadow-2xl
                ${index === currentBubble && !showAll ? 'ring-4 ring-white/50' : ''}
              `}>
                <p className="text-white text-xl md:text-2xl font-bold text-center leading-relaxed">
                  {bubble.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {showAll && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-white/60 text-sm">
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
