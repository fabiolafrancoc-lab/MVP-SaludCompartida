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

      // Cuando quedan 3-4 burbujas, mostrar el logo
      if (bubblesCreated >= totalBubbles - 3) {
        setTimeout(() => {
          setShowLogo(true);
          // Logo toma control: fase entering
          setTimeout(() => {
            setLogoPhase('full');
            // Después de estar en full, retrocede
            setTimeout(() => {
              setLogoPhase('receding');
              setTimeout(() => {
                setShowSolution(true);
              }, 800);
            }, 2000);
          }, 1500);
        }, 500);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
      {/* Reality Screen */}
      <div className={`fixed top-0 w-full h-screen overflow-hidden transition-all duration-1000 ${
        showLogo ? 'blur-xl opacity-20' : ''
      }`}>
        {/* Header MÁS COMPACTO */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-[2000] max-w-[90%] bg-gray-800/95 px-6 py-3 rounded-xl backdrop-blur-lg shadow-2xl">
          <div className="text-2xl font-extrabold text-white text-center mb-1">
            ¿Sientes lo mismo?
          </div>
          <div className="text-sm text-white/80 text-center">
            Miles viven esto cada día
          </div>
        </div>

        {/* Bubbles Container */}
        <div 
          ref={bubblesContainerRef}
          className="w-full h-full relative pt-32"
        />
      </div>

      {/* LOGO CINEMATOGRÁFICO - Desde el fondo hacia adelante */}
      {showLogo && (
        <div className={`fixed inset-0 z-[3000] flex items-center justify-center transition-all duration-1000 ${
          logoPhase === 'entering' ? 'logo-entering' : logoPhase === 'full' ? 'logo-full' : 'logo-receding'
        }`}>
          <div className="text-center">
            <h1 className={`font-black text-white transition-all duration-1000 ${
              logoPhase === 'entering' ? 'text-[120px] md:text-[180px]' : 
              logoPhase === 'full' ? 'text-[150px] md:text-[220px]' : 
              'text-6xl md:text-7xl'
            }`} style={{
              textShadow: '0 0 80px rgba(6, 182, 212, 0.8), 0 0 40px rgba(236, 72, 153, 0.6)',
              letterSpacing: logoPhase === 'full' ? '0.05em' : '0.02em'
            }}>
              SaludCompartida
            </h1>
          </div>
        </div>
      )}

      {/* Solution Section - Beneficios sin iconos */}
      {showSolution && (
        <div 
          className="fixed inset-0 z-[2500] bg-gradient-to-br from-cyan-500 via-cyan-600 to-pink-500 flex flex-col items-center justify-center px-4 py-12 animate-fadeInFast"
        >
          <div className="max-w-5xl text-center text-white">
            {/* Logo pequeño arriba */}
            <div className="text-4xl md:text-5xl font-black mb-8 drop-shadow-2xl">
              SaludCompartida
            </div>

            <div className="text-xl md:text-2xl font-light mb-10 drop-shadow-lg">
              Protegiendo a tu familia desde aquí,<br className="hidden md:block"/>
              cuidando su salud desde allá
            </div>

            {/* Services Grid COMPACTO SIN ICONOS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10 text-xs md:text-sm">
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/40 hover:bg-white/30 transition-all">
                <div className="font-bold mb-1">Telemedicina 24/7</div>
                <div className="opacity-90">Acceso inmediato</div>
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/40 hover:bg-white/30 transition-all">
                <div className="font-bold mb-1">Descuento Farmacias</div>
                <div className="opacity-90">Hasta 60% ahorro</div>
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/40 hover:bg-white/30 transition-all">
                <div className="font-bold mb-1">Terapia Psicológica</div>
                <div className="opacity-90">1 sesión semanal</div>
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/40 hover:bg-white/30 transition-all">
                <div className="font-bold mb-1">Hasta 4 Miembros</div>
                <div className="opacity-90">Un solo plan</div>
              </div>
            </div>

            {/* CTA Section COMPACTO */}
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 md:p-8 border-2 border-white/60">
              <div className="text-2xl md:text-4xl font-black mb-3 leading-tight">
                Deja de preocuparte.<br/>
                Empieza a proteger.
              </div>
              <div className="text-base md:text-lg font-normal mb-6 opacity-95">
                Tu familia merece tranquilidad
              </div>
              <button
                onClick={() => navigate('/como-funciona')}
                className="inline-block px-8 md:px-12 py-4 md:py-5 bg-white text-cyan-600 text-lg md:text-xl font-extrabold rounded-full shadow-2xl hover:bg-gray-50 hover:scale-105 transition-all uppercase tracking-wide"
              >
                Proteger Ahora
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Efecto cinematográfico: Logo desde el fondo */
        .logo-entering {
          background: radial-gradient(circle, rgba(0,0,0,0.95) 0%, rgba(0,0,0,1) 100%);
          animation: logoEnter 1.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .logo-full {
          background: radial-gradient(circle, rgba(0,0,0,0.98) 0%, rgba(0,0,0,1) 100%);
        }

        .logo-receding {
          background: transparent;
          pointer-events: none;
          animation: logoRecede 0.8s ease-out;
        }

        @keyframes logoEnter {
          0% {
            opacity: 0;
            transform: perspective(1000px) translateZ(-2000px) scale(0.3);
          }
          60% {
            opacity: 0.8;
            transform: perspective(1000px) translateZ(-100px) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: perspective(1000px) translateZ(0) scale(1);
          }
        }

        @keyframes logoRecede {
          0% {
            opacity: 1;
            transform: perspective(1000px) translateZ(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: perspective(1000px) translateZ(-1000px) scale(0.5);
          }
        }

        @keyframes fadeInFast {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeInFast {
          animation: fadeInFast 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
