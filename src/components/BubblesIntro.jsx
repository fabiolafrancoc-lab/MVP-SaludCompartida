import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BubblesIntro = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleBubbles, setVisibleBubbles] = useState([]);

  // Cada slide tiene una pregunta principal + múltiples bubbles de dolor real
  // MUCHAS bubbles para crear sensación abrumadora de desprotección y ansiedad
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
        "Mi esposa me necesitaba y yo a 3,000 km"
      ]
    },
    {
      question: "¿Te despiertas con miedo pensando 'y si algo les pasa'?",
      bubbles: [
        "¿Y si mi mamá se cae y está sola en casa?",
        "¿Y si necesitan un doctor a las 3 AM?",
        "¿Y si tienen una emergencia y no contestan?",
        "¿Y si se enferman y no tienen dinero?",
        "No puedo dormir pensando en ellos",
        "Cada llamada perdida me da pánico",
        "¿Y si pasa algo y me entero después?",
        "Vivo con ansiedad 24/7"
      ]
    },
    {
      question: "¿Las medicinas son demasiado caras para tu familia?",
      bubbles: [
        "Mi papá necesita medicina de $800 al mes",
        "Las pastillas de presión cuestan $600",
        "No alcanzan para el tratamiento completo",
        "Tienen que partir las pastillas a la mitad",
        "Eligen entre comer o comprar medicina",
        "Me piden $1,200 cada mes para farmacias",
        "Las inyecciones de insulina son carísimas",
        "Dejan de tomar su medicina porque no hay dinero",
        "Gastan todo en medicinas y no les alcanza",
        "Necesito mandar $300 extra cada semana"
      ]
    },
    {
      question: "¿Trabajas 12 horas al día y aún no alcanza?",
      bubbles: [
        "Trabajo doble turno y aún no es suficiente",
        "Hago dos trabajos pero siempre piden más",
        "Mando $500 cada semana y nunca alcanza",
        "Sacrifico mi vida aquí y siento que no sirve",
        "Me rompo la espalda y ellos siguen sin doctor",
        "Trabajo hasta enfermarme y no les puedo dar más",
        "Ya no sé qué más hacer para ayudarlos",
        "Me siento impotente desde esta distancia"
      ]
    },
    {
      question: "¿Te duele no estar ahí cuando más te necesitan?",
      bubbles: [
        "Mi mamá lloró por teléfono 'te necesito aquí'",
        "No pude ir al funeral de mi abuela",
        "Mi hijo me pregunta '¿cuándo vienes papá?'",
        "Mi hermana estaba sola en el hospital",
        "Se sienten abandonados y yo también",
        "Extraño abrazarlos todos los días",
        "No estuve cuando más me necesitaban",
        "Perdí momentos que nunca volverán"
      ]
    },
    {
      question: "¿Te angustia pensar en una emergencia médica?",
      bubbles: [
        "¿Qué pasa si tienen un accidente?",
        "¿De dónde saco $5,000 de un día para otro?",
        "No tienen seguro ni ahorros",
        "Una ambulancia cuesta $2,000 pesos",
        "¿Y si necesitan cirugía urgente?",
        "Los hospitales piden todo por adelantado",
        "Tengo terror de que pase algo grave",
        "Una emergencia los deja en la ruina",
        "¿Qué hago si pasa algo esta noche?",
        "Vivo con miedo constante"
      ]
    },
    {
      question: "¿Sientes que el dinero que mandas se va en doctores y medicinas?",
      bubbles: [
        "Cada mes $600 en consultas",
        "$800 en medicinas mensuales",
        "$400 en análisis de laboratorio",
        "Una consulta son $500 pesos",
        "Los estudios médicos son carísimos",
        "Se gasta todo en salud y no les alcanza para nada",
        "Mando dinero y se acaba en 2 días",
        "Siempre están enfermos, siempre gastando"
      ]
    },
    {
      question: "NO ESTÁS SOLO - 4,253 familias ya lo solucionaron",
      bubbles: [
        "Ahora duermen tranquilos",
        "Sus familias tienen doctor 24/7",
        "Ahorran $250 al mes en medicinas",
        "Ya no viven con miedo",
        "Por solo $12 al mes",
        "Tú también puedes protegerlos",
        "SaludCompartida es la solución",
        "Únete hoy, protégelos ahora"
      ]
    }
  ];

  useEffect(() => {
    if (currentSlide < slides.length) {
      // Resetear bubbles visibles
      setVisibleBubbles([]);
      
      // TIMING VARIABLE: Primeras bubbles lentas, luego se aceleran hasta congestionar
      const currentSlideBubbles = slides[currentSlide].bubbles;
      currentSlideBubbles.forEach((_, index) => {
        let delay;
        
        if (index < 3) {
          // Primeras 3 bubbles: LENTAS (800ms) - construyendo tensión
          delay = index * 800;
        } else if (index < 6) {
          // Siguientes 3: MEDIA velocidad (500ms) - acelerando
          delay = (3 * 800) + ((index - 3) * 500);
        } else {
          // Resto: BOMBARDEO RÁPIDO (150ms) - congestión total
          delay = (3 * 800) + (3 * 500) + ((index - 6) * 150);
        }
        
        setTimeout(() => {
          setVisibleBubbles(prev => [...prev, currentSlideBubbles[index]]);
        }, delay);
      });

      // Calcular tiempo total considerando la velocidad variable
      const slowBubbles = Math.min(3, currentSlideBubbles.length);
      const mediumBubbles = Math.min(3, Math.max(0, currentSlideBubbles.length - 3));
      const fastBubbles = Math.max(0, currentSlideBubbles.length - 6);
      
      const totalTime = (slowBubbles * 800) + (mediumBubbles * 500) + (fastBubbles * 150) + 2500;
      
      const timer = setTimeout(() => {
        if (currentSlide < slides.length - 1) {
          setCurrentSlide(currentSlide + 1);
        } else {
          onComplete();
        }
      }, totalTime);

      return () => clearTimeout(timer);
    }
  }, [currentSlide, onComplete, slides]);

  const handleTap = () => {
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
        {/* Pregunta principal arriba - fija */}
        <div className="text-center mb-6 md:mb-8 max-w-3xl">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-white leading-tight">
            {slides[currentSlide].question}
          </h2>
        </div>

        {/* Bubbles tipo chat - aparecen desde abajo como mensajes bombardeando */}
        <div className="w-full max-w-4xl flex-1 overflow-y-auto space-y-2 md:space-y-3 px-4 scrollbar-hide">
          {visibleBubbles.map((bubble, index) => (
            <div
              key={index}
              className="animate-message-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Burbujas estilo chat de WhatsApp/iMessage */}
              <div className={`
                ${currentSlide === slides.length - 1 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600' 
                  : 'bg-gradient-to-r from-gray-700 to-gray-800'
                }
                rounded-2xl md:rounded-3xl p-3 md:p-4 shadow-lg
                max-w-[85%] ${index % 2 === 0 ? 'ml-0' : 'ml-auto'}
                border-l-4 ${currentSlide === slides.length - 1 ? 'border-cyan-400' : 'border-red-500'}
              `}>
                <p className="text-white text-sm md:text-base font-semibold leading-tight">
                  {bubble}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje especial en último slide - LA ÚNICA SOLUCIÓN */}
        {currentSlide === slides.length - 1 && visibleBubbles.length > 5 && (
          <div className="mt-4 md:mt-6 text-center animate-bounce-slow">
            <p className="text-cyan-400 text-xl md:text-3xl font-black mb-1">
              ✨ SaludCompartida ✨
            </p>
            <p className="text-white text-base md:text-xl font-bold">
              La única solución que necesitas
            </p>
          </div>
        )}

        {/* Indicador de tap */}
        {currentSlide < slides.length - 1 && (
          <p className="text-white/40 text-sm mt-8 animate-pulse">
            Toca para continuar
          </p>
        )}
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes message-slide-up {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-progress {
          animation: progress 4s linear;
        }
        .animate-message-slide-up {
          animation: message-slide-up 0.3s ease-out forwards;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default BubblesIntro;
