import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingBubbles() {
  const navigate = useNavigate();
  const [showSolution, setShowSolution] = useState(false);
  const bubblesContainerRef = useRef(null);
  const [currentHighlightedBubble, setCurrentHighlightedBubble] = useState(null);

  const testimonials = [
    { text: "Hace 3 días que estoy con vómitos; ir al centro médico y tener que esperar 4 horas no puedo, pierdo mi trabajo.", author: "Paulina, Juárez", type: "mexico" },
    { text: "Llamé a mi mamá llorando porque su azúcar está muy alta. No sé cómo ayudarla desde aquí.", author: "Sandra, Dallas", type: "usa" },
    { text: "Mando $300 dólares al mes. La mitad se va en consultas y medicinas que ni sé si necesitan.", author: "Miguel, Chicago", type: "usa" },
    { text: "Las medicinas para la presión de mi mamá cuestan $800 pesos. Apenas le alcanza para comer.", author: "Carmen, Puebla", type: "mexico" },
    { text: "Mi papá se cayó y no pude estar ahí. Solo puedo mandar dinero y rezar.", author: "Carolina, Miami", type: "usa" },
    { text: "Llevo dos semanas con infección de garganta, pero el doctor más barato cobra $600. Prefiero aguantarme.", author: "Rosa, Oaxaca", type: "mexico" },
    { text: "Me siento culpable trabajando aquí mientras mi mamá está enferma allá sola.", author: "Fernando, Atlanta", type: "usa" },
    { text: "Mi hijo tiene fiebre alta. La consulta privada $500, el IMSS 3 horas de espera. Estoy desesperada.", author: "Luisa, Guadalajara", type: "mexico" },
    { text: "No he visto a mis hijos en 3 años. Cuando hablan de que les duele algo, me rompe el corazón.", author: "María, New York", type: "usa" },
    { text: "Mi abuela necesita estudios del corazón. El cardiólogo nos dio cita para dentro de 4 meses.", author: "Ana, Monterrey", type: "mexico" },
    { text: "Mi esposo me llamó a las 3 AM. Nuestro hijo tenía fiebre de 40. Me sentí tan impotente.", author: "Gabriela, Boston", type: "usa" },
    { text: "Me duele el estómago desde hace semanas, pero el doctor está a 2 horas en camión.", author: "Pedro, Veracruz", type: "mexico" },
    { text: "Mando dinero, pero quisiera estar ahí para llevar a mi mamá al doctor personalmente.", author: "David, Seattle", type: "usa" },
    { text: "El dentista me cobró $3,000 pesos por una extracción. Ese era el dinero de la luz.", author: "Susana, Querétaro", type: "mexico" },
    { text: "Extraño abrazar a mis padres. Solo puedo preguntarles por teléfono si están bien.", author: "Isabel, Denver", type: "usa" }
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
    
    const maxX = container.offsetWidth - 360;
    const maxY = container.offsetHeight - 180;
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
    const bubbleInterval = 450;
    const totalBubbles = 60;

    const createBubbleInterval = setInterval(() => {
      if (bubbleIndex >= totalBubbles || showSolution) {
        clearInterval(createBubbleInterval);
        return;
      }

      const testimonial = shuffled[bubbleIndex % shuffled.length];
      const pos = getRandomPosition();
      
      const bubble = document.createElement('div');
      bubble.className = `absolute bg-white border-2 border-gray-800 rounded-xl p-4 max-w-[340px] text-sm leading-relaxed text-gray-900 shadow-lg transition-all duration-400 ${
        testimonial.type === 'usa' ? 'border-l-4 border-l-cyan-500' : 'border-l-4 border-l-pink-500'
      }`;
      bubble.style.left = pos.x + 'px';
      bubble.style.top = pos.y + 'px';
      bubble.style.opacity = '0';
      bubble.style.transform = 'translateY(20px) scale(0.95)';
      
      bubble.innerHTML = `
        ${testimonial.text}
        <span class="block mt-2 text-xs font-semibold opacity-70">—${testimonial.author}</span>
      `;
      
      container.appendChild(bubble);
      bubbleElements.push(bubble);

      setTimeout(() => {
        bubble.style.opacity = '0.75';
        bubble.style.transform = 'translateY(0) scale(1)';
      }, 50);

      // Highlight effect
      setTimeout(() => {
        if (currentHighlightedBubble) {
          currentHighlightedBubble.style.opacity = '0.75';
          currentHighlightedBubble.style.transform = 'scale(1)';
          currentHighlightedBubble.style.zIndex = '1';
        }
        bubble.style.opacity = '1';
        bubble.style.transform = 'scale(1.05)';
        bubble.style.boxShadow = '0 8px 40px rgba(236, 72, 153, 0.6)';
        bubble.style.zIndex = '100';
        setCurrentHighlightedBubble(bubble);
      }, 100);

      setTimeout(() => {
        bubble.style.opacity = '0.75';
        bubble.style.transform = 'scale(1)';
        bubble.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
      }, 2500);

      bubbleIndex++;
    }, bubbleInterval);

    // Auto-scroll and trigger solution
    let scrollPosition = 0;
    const scrollSpeed = 0.4;
    const maxScroll = 2000;
    const breakingPoint = 1800;
    let userScrolled = false;

    const autoScroll = () => {
      if (scrollPosition < maxScroll && !userScrolled && !showSolution) {
        scrollPosition += scrollSpeed;
        window.scrollTo(0, scrollPosition);
        
        if (scrollPosition >= breakingPoint) {
          setShowSolution(true);
        }
        
        requestAnimationFrame(autoScroll);
      }
    };

    const scrollTimer = setTimeout(() => {
      autoScroll();
    }, 1500);

    const handleUserScroll = () => {
      userScrolled = true;
      if (window.scrollY >= breakingPoint) {
        setShowSolution(true);
      }
    };

    window.addEventListener('wheel', handleUserScroll);
    window.addEventListener('touchmove', handleUserScroll);

    return () => {
      clearInterval(createBubbleInterval);
      clearTimeout(scrollTimer);
      window.removeEventListener('wheel', handleUserScroll);
      window.removeEventListener('touchmove', handleUserScroll);
      bubbleElements.forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="min-h-[350vh] bg-gradient-to-br from-gray-800 to-gray-900">
      {/* Reality Screen */}
      <div className={`fixed top-0 w-full h-screen overflow-hidden transition-all duration-800 ${
        showSolution ? 'blur-lg opacity-30 scale-95' : ''
      }`}>
        {/* Header */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-[2000] max-w-[90%] bg-gray-800/95 px-10 py-5 rounded-2xl backdrop-blur-lg shadow-2xl">
          <div className="text-3xl font-extrabold text-white text-center mb-2">
            ¿Sientes lo mismo?
          </div>
          <div className="text-2xl text-white/80 text-center">
            Miles de familias viven esto cada día
          </div>
        </div>

        {/* Bubbles Container */}
        <div 
          ref={bubblesContainerRef}
          className="w-full h-full relative pt-44"
        />
      </div>

      {/* Solution Section */}
      {showSolution && (
        <div 
          className="absolute top-[200vh] w-full min-h-[150vh] bg-gradient-to-br from-cyan-500 via-cyan-600 to-pink-500 flex flex-col items-center justify-center px-5 py-20 z-[3000]"
          style={{
            animation: 'breakThrough 1.5s ease-out'
          }}
        >
          <div className="max-w-6xl text-center text-white">
            {/* Logo appearing from background */}
            <div className="text-2xl font-black mb-10 drop-shadow-2xl animate-scaleIn">
              SaludCompartida
            </div>

            <div className="text-3xl font-light mb-16 drop-shadow-lg">
              Protegiendo a tu familia desde aquí,<br/>
              cuidando su salud desde allá
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border-2 border-white/40 hover:bg-white/25 hover:scale-105 transition-all">
                <div className="text-2xl font-bold mb-4">Telemedicina 24/7</div>
                <div className="text-2xl opacity-95">
                  Acceso inmediato a médicos profesionales, cualquier hora del día
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border-2 border-white/40 hover:bg-white/25 hover:scale-105 transition-all">
                <div className="text-2xl font-bold mb-4">Descuento en Farmacias</div>
                <div className="text-2xl opacity-95">
                  Ahorra hasta 60% en medicamentos en toda la red
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border-2 border-white/40 hover:bg-white/25 hover:scale-105 transition-all">
                <div className="text-2xl font-bold mb-4">Terapia Psicológica</div>
                <div className="text-2xl opacity-95">
                  Una sesión semanal con psicólogos certificados
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border-2 border-white/40 hover:bg-white/25 hover:scale-105 transition-all">
                <div className="text-2xl font-bold mb-4">Hasta 4 Miembros</div>
                <div className="text-2xl opacity-95">
                  Protege hasta 4 personas con un solo plan
                </div>
              </div>
            </div>

            {/* Protection Message */}
            <div className="bg-white/25 backdrop-blur-md rounded-3xl p-12 border-3 border-white/50 mb-16">
              <div className="text-3xl font-extrabold mb-6">
                Medicina Privada de Calidad
              </div>
              <div className="text-2xl leading-relaxed opacity-98 mb-4">
                Ya no envíes dinero sin saber en qué se usa.<br/>
                Ya no te desveles preocupándote por los costos.<br/>
                Ya no dejes que esperen horas para ser atendidos.<br/><br/>
                <strong>Protege a los que más quieres con acceso inmediato a salud de calidad, desde donde estés.</strong>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-black/30 backdrop-blur-md rounded-3xl p-12 border-3 border-white/60">
              <div className="text-2xl font-black mb-5 leading-tight">
                Deja de preocuparte.<br/>
                Empieza a proteger.
              </div>
              <div className="text-2xl font-normal mb-10 opacity-95">
                Tu familia merece tranquilidad. Tú mereces dormir en paz.
              </div>
              <button
                onClick={() => navigate('/como-funciona')}
                className="inline-block px-16 py-6 bg-white text-cyan-600 text-2xl font-extrabold rounded-full shadow-2xl hover:bg-gray-50 hover:scale-110 transition-all uppercase tracking-wide"
              >
                Sí, Quiero Cuidarlas Ahora
              </button>
              <div className="mt-8 text-3xl opacity-90 italic">
                Protección inmediata desde el primer día
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes breakThrough {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(100px);
          }
          60% {
            opacity: 0.5;
            transform: scale(1.1) translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes scaleIn {
          0% {
            opacity: 0;
            transform: scale(0.5) translateZ(-1000px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateZ(0);
          }
        }

        .animate-scaleIn {
          animation: scaleIn 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}
