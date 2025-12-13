import React, { useState, useEffect } from 'react';
import { FireIcon } from './CustomIcons';

const BubblesSolucion = () => {
  const [visibleBubbles, setVisibleBubbles] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const bubblesSolution = [
    { text: "María dejó de preocuparse por su mamá en Guadalajara", gradient: "from-cyan-500 to-blue-500", icon: "✓" },
    { text: "Carlos ahorra $250/mes en medicinas para sus papás", gradient: "from-green-500 to-emerald-500", icon: "💰" },
    { text: "Ana habla con un doctor a las 2 AM cuando su tía se sintió mal", gradient: "from-purple-500 to-pink-500", icon: "🏥" },
    { text: "José ya no se siente culpable, su familia está protegida 24/7", gradient: "from-blue-500 to-cyan-500", icon: "❤️" },
    { text: "Laura's mom ya tiene terapia todas las semanas", gradient: "from-pink-500 to-rose-500", icon: "🧠" },
    { text: "4,253 familias ya usan SaludCompartida", gradient: "from-indigo-500 to-purple-500", icon: "👨‍👩‍👧‍👦" },
    { text: "Doctor respondió en 3 minutos a medianoche", gradient: "from-cyan-600 to-blue-600", icon: "⚡" },
    { text: "$12 al mes cambia todo para tu familia", gradient: "from-green-600 to-teal-600", icon: "🎯" }
  ];

  useEffect(() => {
    // Mostrar las primeras 4 bubbles de a una
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < 4) {
        setVisibleBubbles(prev => [...prev, bubblesSolution[index]]);
        index++;
      } else {
        clearInterval(intervalId);
        // Después de 4 bubbles, mostrar todas las demás rápido
        setTimeout(() => {
          setShowAll(true);
        }, 1000);
      }
    }, 2000); // Cada 2 segundos

    return () => clearInterval(intervalId);
  }, []);

  const allBubbles = showAll ? bubblesSolution : visibleBubbles;

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
            Historias reales de familias como la tuya
          </h3>
          <p className="text-base md:text-lg text-gray-400">
            Miles de personas ya cuidan a su familia desde EE.UU.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {allBubbles.map((bubble, index) => (
            <div
              key={index}
              className={`
                transform transition-all duration-500 ease-out
                ${showAll ? 'animate-fade-in' : 'animate-slide-up'}
                hover:scale-105
              `}
              style={{ animationDelay: showAll ? `${index * 100}ms` : '0ms' }}
            >
              <div className={`
                bg-gradient-to-r ${bubble.gradient} 
                rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl
                hover:shadow-2xl transition-shadow
              `}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl md:text-3xl flex-shrink-0">{bubble.icon}</span>
                  <p className="text-white text-sm md:text-base font-semibold leading-snug">
                    {bubble.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showAll && (
          <div className="mt-8 md:mt-12 text-center">
            <p className="text-white/60 text-xs md:text-sm animate-pulse flex items-center justify-center gap-2">
              <FireIcon className="w-4 h-4" />
              Más de 100 familias se unieron esta semana
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default BubblesSolucion;
