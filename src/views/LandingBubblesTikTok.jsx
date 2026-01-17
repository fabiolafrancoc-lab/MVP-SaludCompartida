'use client';

import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingBubblesTikTok() {
  const navigate = useNavigate();
  const [showLogo, setShowLogo] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [logoPhase, setLogoPhase] = useState('entering'); // entering, full, receding
  const bubblesContainerRef = useRef(null);

  const testimonials = [
    { text: "Hace 3 días que estoy con vómitos; ir al centro médico y tener que esperar 4 horas no puedo, pierdo mi trabajo.", author: "Paulina, Juárez", type: "mexico" },
    { text: "Llamé a mi mamá llorando porque su azúcar está muy alta. No sé cómo ayudarla desde aquí.", author: "Sandra, Dallas", type: "usa" },
    { text: "Las medicinas para la presión de mi mamá cuestan $800 pesos. Apenas le alcanza para comer.", author: "Carmen, Puebla", type: "mexico" },
    { text: "Mi papá se cayó y no pude estar ahí. Solo puedo mandar dinero y rezar.", author: "Carolina, Miami", type: "usa" },
    { text: "Me siento culpable trabajando aquí mientras mi mamá está enferma allá sola.", author: "Fernando, Atlanta", type: "usa" },
    { text: "Mi hijo tiene fiebre alta. La consulta privada $500, el IMSS 3 horas de espera. Estoy desesperada.", author: "Luisa, Guadalajara", type: "mexico" },
    { text: "No he visto a mis hijos en 3 años. Cuando hablan de que les duele algo, me rompe el corazón.", author: "María, New York", type: "usa" },
    { text: "Mando dinero, pero quisiera estar ahí para llevar a mi mamá al doctor personalmente.", author: "David, Seattle", type: "usa" },
  ];

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const getRandomPosition = () => {
    const container = bubblesContainerRef.current;
    if (!container) return { x: 0, y: 0 };
    
    const maxX = container.offsetWidth - 320;
    const maxY = container.offsetHeight - 160;
    const minY = 20;
    
    return {
      x: Math.max(10, Math.random() * maxX),
      y: Math.max(minY, Math.random() * maxY)
    };
  };

  useEffect(() => {
    let bubbleElements = [];
    const container = bubblesContainerRef.current;
    if (!container) return;

    const shuffled = shuffleArray(testimonials);
    let bubbleIndex = 0;
    const bubbleInterval = 180; // RÁPIDO: 180ms vs 450ms
    const totalBubbles = 20; // Menos burbujas para que el logo aparezca cuando quedan 3-4
    let bubblesCreated = 0;

    const createBubbleInterval = setInterval(() => {
      if (bubbleIndex >= totalBubbles || showLogo) {
        clearInterval(createBubbleInterval);
        return;
      }

      bubblesCreated++;

      const testimonial = shuffled[bubbleIndex % shuffled.length];
      const pos = getRandomPosition();
      
      const bubble = document.createElement('div');
      bubble.className = `absolute bg-white border-2 border-gray-800 rounded-xl p-3 max-w-[300px] text-xs leading-tight text-gray-900 shadow-lg transition-all duration-200 ${
        testimonial.type === 'usa' ? 'border-l-4 border-l-cyan-500' : 'border-l-4 border-l-pink-500'
      }`;
      bubble.style.left = pos.x + 'px';
      bubble.style.top = pos.y + 'px';
      bubble.style.opacity = '0';
      bubble.style.transform = 'translateY(10px) scale(0.95)';
      
      bubble.innerHTML = `
        ${testimonial.text}
        <span class="block mt-1 text-[10px] font-semibold opacity-70">—${testimonial.author}</span>
      `;
      
      container.appendChild(bubble);
      bubbleElements.push(bubble);

      setTimeout(() => {
        bubble.style.opacity = '0.8';
        bubble.style.transform = 'translateY(0) scale(1)';
      }, 20);

      setTimeout(() => {
        bubble.style.opacity = '1';
        bubble.style.transform = 'scale(1.05)';
        bubble.style.boxShadow = '0 6px 30px rgba(236, 72, 153, 0.5)';
      }, 40);

      setTimeout(() => {
        bubble.style.opacity = '0.8';
        bubble.style.transform = 'scale(1)';
        bubble.style.boxShadow = '0 3px 15px rgba(0, 0, 0, 0.1)';
      }, 800);

      // Cuando quedan 3-4 burbujas, mostrar el logo INMEDIATAMENTE
      if (bubblesCreated >= totalBubbles - 3) {
        setShowLogo(true);
        // Esperar solo 2 segundos y mostrar beneficios
        setTimeout(() => {
          setShowSolution(true);
        }, 2000);
      }

      bubbleIndex++;
    }, bubbleInterval);

    // Auto-scroll ELIMINADO - solo animación de burbujas y logo
    const handleUserScroll = () => {
      // No hacer nada con scroll
    };

    window.addEventListener('wheel', handleUserScroll);
    window.addEventListener('touchmove', handleUserScroll);

    return () => {
      clearInterval(createBubbleInterval);
      window.removeEventListener('wheel', handleUserScroll);
      window.removeEventListener('touchmove', handleUserScroll);
      bubbleElements.forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      {/* Reality Screen */}
      <div className={`fixed top-0 w-full h-screen overflow-hidden transition-all duration-1000 ${
        showLogo ? 'blur-xl opacity-20' : ''
      }`}>
        {/* Header MÁS GRANDE Y DESTACADO */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[2000] max-w-[95%] bg-gray-900/95 px-8 py-5 rounded-2xl backdrop-blur-lg shadow-2xl">
          <div className="text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl font-extrabold text-white text-center mb-2">
            ¿Sientes lo mismo?
          </div>
          <div className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl text-white/80 text-center">
            Miles viven esto cada día
          </div>
        </div>

        {/* Bubbles Container - EMPIEZAN MÁS ABAJO */}
        <div 
          ref={bubblesContainerRef}
          className="w-full h-full relative pt-48"
        />
      </div>

      {/* LOGO - Background oscuro igual al inicio */}
      {showLogo && !showSolution && (
        <div className="fixed inset-0 z-[3000] bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center animate-fadeInFast">
          <div className="text-center px-4">
            <h1 className="text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl font-black text-white mb-6 animate-logoZoom" style={{
              textShadow: '0 0 60px rgba(6, 182, 212, 0.6)'
            }}>
              SaludCompartida
            </h1>
            <p className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl text-cyan-400 font-light italic">
              Te ayudamos a cuidar donde está tu corazón
            </p>
          </div>
        </div>
      )}

      {/* Beneficios - MÁS RÁPIDO para TikTok */}
      {showSolution && (
        <div className="fixed inset-0 z-[3000] bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center px-6 py-12 animate-fadeInFaster">
          <div className="max-w-4xl w-full text-left space-y-4">
            {/* Logo arriba */}
            <div className="text-center mb-8">
              <h1 className="text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl font-black text-white mb-2">
                SaludCompartida
              </h1>
              <p className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl text-cyan-400 font-light italic">
                Te ayudamos a cuidar donde está tu corazón
              </p>
            </div>

            {/* Beneficios - Líneas limpias, SIN ICONOS */}
            <div className="space-y-4 text-white">
              <div className="border-l-4 border-cyan-400 pl-5 py-2 animate-slideInLeft" style={{animationDelay: '0.1s'}}>
                <h3 className="text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl font-bold mb-1">Telemedicina 24/7</h3>
                <p className="text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl text-white/80">Acceso inmediato a médicos profesionales</p>
              </div>

              <div className="border-l-4 border-pink-400 pl-5 py-2 animate-slideInLeft" style={{animationDelay: '0.2s'}}>
                <h3 className="text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl font-bold mb-1">Receta Electrónica</h3>
                <p className="text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl text-white/80">Recibe tu prescripción digital de ser necesario</p>
              </div>

              <div className="border-l-4 border-purple-400 pl-5 py-2 animate-slideInLeft" style={{animationDelay: '0.3s'}}>
                <h3 className="text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl font-bold mb-1">Descuento en Farmacias</h3>
                <p className="text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl text-white/80">Hasta 60% de ahorro en medicamentos</p>
              </div>

              <div className="border-l-4 border-yellow-400 pl-5 py-2 animate-slideInLeft" style={{animationDelay: '0.4s'}}>
                <h3 className="text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl font-bold mb-1">Terapia Psicológica</h3>
                <p className="text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl text-white/80">Una sesión semanal con psicólogos certificados</p>
              </div>

              <div className="border-l-4 border-green-400 pl-5 py-2 animate-slideInLeft" style={{animationDelay: '0.5s'}}>
                <h3 className="text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl font-bold mb-1">Hasta 4 Miembros</h3>
                <p className="text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl text-white/80">Cuida hasta 4 personas con un solo plan</p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-10">
              <button
                onClick={() => navigate('/')}
                className="px-12 py-5 bg-gradient-to-r from-cyan-500 to-pink-500 text-white text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl font-black rounded-full shadow-2xl hover:scale-105 transition-all uppercase animate-pulse"
              >
                Cuidar Ahora
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInFast {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInFaster {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes logoZoom {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeInFast {
          animation: fadeInFast 0.5s ease-out;
        }

        .animate-fadeInFaster {
          animation: fadeInFaster 0.3s ease-out;
        }

        .animate-logoZoom {
          animation: logoZoom 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
