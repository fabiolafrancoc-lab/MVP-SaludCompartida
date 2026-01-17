'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BubblesIntro = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleBubbles, setVisibleBubbles] = useState([]);

  // SOLO 2 PREGUNTAS con MUCHAS bubbles que crean el efecto de "cientos de casos"
  const slides = [
    {
      question: "¿Te sientes culpable por estar lejos de tu familia?",
      bubbles: [
        "Mi hijo se fracturó el brazo y no pude ir",
        "Nació mi segundo hijo y no estuve ahí",
        "Mi mamá estuvo hospitalizada 5 días sola",
        "Me perdí la graduación de mi hija",
        "Mi papá tuvo una crisis y yo aquí trabajando",
        "No pude abrazar a mi hermana cuando perdió su bebé",
        "Mi abuela falleció y llegué tarde al funeral",
        "Mi esposa me necesitaba y yo a 3,000 km",
        "No estuve cuando mi hijo dio sus primeros pasos",
        "Mi mamá se cayó y tardé 2 días en enterarme",
        "Perdí el cumpleaños 15 de mi hija",
        "No pude despedirme de mi tío antes de morir",
        "Mi hermano estuvo solo en el hospital",
        "No vi crecer a mis hijos",
        "Cada día me siento más lejos de ellos",
        "Ya no me reconocen cuando voy",
        "Mi familia sufre y yo no puedo hacer nada",
        "Trabajo para darles mejor vida pero no estoy",
        "Siento que los abandoné",
        "No puedo dormir por la culpa"
      ]
    },
    {
      question: "Trabajo dos turnos y el dinero que envío a casa no es suficiente",
      bubbles: [
        "Trabajo 12 horas diarias y no alcanza",
        "Hago dos trabajos pero siempre piden más",
        "Mando $500 cada semana y se acaba en 3 días",
        "Me rompo la espalda y ellos siguen sin doctor",
        "Trabajo hasta enfermarme pero no les puedo dar más",
        "Ya vendí todo lo que tenía aquí",
        "No tengo vida, solo trabajo y trabajo",
        "Duermo 4 horas para hacer más dinero",
        "Sacrifiqué mi salud por mandarles dinero",
        "No veo a mis amigos, solo trabajo",
        "Los fines de semana también trabajo",
        "No he tomado vacaciones en 3 años",
        "Me enfermé del estrés y no puedo parar",
        "Cada llamada es pidiendo más dinero",
        "Las medicinas cuestan $800 al mes",
        "Los doctores cobran $500 por consulta",
        "Los análisis cuestan $400 cada uno",
        "Una emergencia son $5,000 pesos mínimo",
        "Nunca alcanza para todo lo que necesitan",
        "Me siento impotente desde aquí"
      ]
    }
  ];

  useEffect(() => {
    if (currentSlide < slides.length) {
      // MOSTRAR TODO AL MISMO TIEMPO - pregunta y todas las bubbles aparecen juntas
      const currentSlideBubbles = slides[currentSlide].bubbles;
      
      // Mostrar todas las bubbles inmediatamente
      setVisibleBubbles(currentSlideBubbles);

      // Avanzar automáticamente después de 8 segundos (tiempo para leer algunas y ver el efecto)
      const timer = setTimeout(() => {
        if (currentSlide < slides.length - 1) {
          setCurrentSlide(currentSlide + 1);
        } else {
          onComplete();
        }
      }, 8000); // 8 segundos por slide

      return () => clearTimeout(timer);
    }
  }, [currentSlide, onComplete, slides]);

  const handleTap = () => {
    // Permitir avanzar manualmente si el usuario quiere
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-50 overflow-hidden cursor-pointer"
      onClick={handleTap}
    >
      {/* Botón "Ya estoy suscrito" */}
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate('/page3');
          }}
          className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold text-xs md:text-sm hover:bg-white/30 transition-all"
        >
          Ya estoy suscrito →
        </button>
      </div>

      {/* Progress bar */}
      <div className="fixed top-4 left-4 right-20 md:left-1/4 md:right-1/4 z-40 flex gap-1">
        {slides.map((_, index) => (
          <div 
            key={index} 
            className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden"
          >
            <div 
              className={`h-full bg-white transition-all duration-300 ${
                index < currentSlide ? 'w-full' : 
                index === currentSlide ? 'w-full animate-progress' : 'w-0'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="h-full flex flex-col items-center justify-start px-4 md:px-8 pt-20 pb-8 overflow-hidden">
        {/* Pregunta principal arriba - fija y grande */}
        <div className="text-center mb-6 md:mb-8 max-w-4xl z-10 relative">
          <h2 className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl lg:text-base md:text-2xl lg:text-3xl font-black text-white leading-tight drop-shadow-2xl">
            {slides[currentSlide].question}
          </h2>
        </div>

        {/* Mar de bubbles - aparecen TODAS al mismo tiempo creando efecto abrumador */}
        <div className="w-full max-w-6xl flex-1 overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 px-4 scrollbar-hide opacity-90">
          {visibleBubbles.map((bubble, index) => (
            <div
              key={index}
              className="animate-fade-in-instant"
              style={{ 
                animationDelay: `${index * 30}ms`, // Aparecen muy rápido una tras otra
                opacity: index > 8 ? '0.6' : '0.9' // Las de atrás más transparentes
              }}
            >
              {/* Bubbles pequeñas tipo chat - difíciles de leer todas pero se ve que hay MUCHAS */}
              <div className="bg-gradient-to-r from-gray-700/80 to-gray-800/80 rounded-xl md:rounded-2xl p-2 md:p-3 shadow-lg border-l-2 border-red-500/50 backdrop-blur-sm">
                <p className="text-white text-xs md:text-sm font-medium leading-tight line-clamp-3">
                  {bubble}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes fade-in-instant {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-progress {
          animation: progress 8s linear;
        }
        .animate-fade-in-instant {
          animation: fade-in-instant 0.2s ease-out forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BubblesIntro;
