import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingBubblesSimple() {
  const navigate = useNavigate();
  const [showSolution, setShowSolution] = useState(false);
  const [bubbles, setBubbles] = useState([]);

  const testimonials = [
    { text: "Hace 3 días que estoy con vómitos; ir al centro médico y tener que esperar 4 horas no puedo.", author: "Paulina, Juárez", type: "mexico" },
    { text: "Llamé a mi mamá llorando porque su azúcar está muy alta. No sé cómo ayudarla desde aquí.", author: "Sandra, Dallas", type: "usa" },
    { text: "Mando $300 dólares al mes. La mitad se va en consultas y medicinas.", author: "Miguel, Chicago", type: "usa" },
    { text: "Las medicinas para la presión de mi mamá cuestan $800 pesos. Apenas le alcanza para comer.", author: "Carmen, Puebla", type: "mexico" },
    { text: "Mi papá se cayó y no pude estar ahí. Solo puedo mandar dinero y rezar.", author: "Carolina, Miami", type: "usa" },
    { text: "Me siento culpable trabajando aquí mientras mi mamá está enferma allá sola.", author: "Fernando, Atlanta", type: "usa" },
    { text: "Mi hijo tiene fiebre alta. La consulta privada $500, el IMSS 3 horas de espera.", author: "Luisa, Guadalajara", type: "mexico" },
    { text: "No he visto a mis hijos en 3 años. Cuando hablan de que les duele algo, me rompe el corazón.", author: "María, New York", type: "usa" },
  ];

  useEffect(() => {
    const newBubbles = [];
    for (let i = 0; i < 30; i++) {
      const testimonial = testimonials[i % testimonials.length];
      newBubbles.push({
        id: i,
        ...testimonial,
        left: Math.random() * 70 + 5,
        top: Math.random() * 80 + 10,
        delay: i * 400
      });
    }
    setBubbles(newBubbles);

    // Auto-scroll y mostrar solución
    setTimeout(() => {
      window.scrollTo({ top: 800, behavior: 'smooth' });
    }, 2000);

    setTimeout(() => {
      setShowSolution(true);
    }, 8000);
  }, []);

  return (
    <div className="min-h-[300vh] bg-gradient-to-br from-gray-800 to-gray-900 relative">
      {/* Header */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 max-w-[90%] bg-gray-800/95 px-10 py-5 rounded-2xl backdrop-blur-lg shadow-2xl">
        <div className="text-4xl font-extrabold text-white text-center mb-2">
          ¿Sientes lo mismo?
        </div>
        <div className="text-lg text-white/80 text-center">
          Miles de familias viven esto cada día
        </div>
      </div>

      {/* Bubbles Container */}
      <div className={`fixed top-0 w-full h-screen overflow-hidden transition-all duration-800 ${
        showSolution ? 'blur-lg opacity-30 scale-95' : ''
      }`}>
        <div className="w-full h-full relative pt-44">
          {bubbles.map((bubble) => (
            <div
              key={bubble.id}
              className={`absolute bg-white border-2 ${
                bubble.type === 'usa' ? 'border-l-4 border-l-cyan-500' : 'border-l-4 border-l-pink-500'
              } border-gray-800 rounded-xl p-4 max-w-[340px] text-sm leading-relaxed text-gray-900 shadow-lg transition-all duration-700`}
              style={{
                left: `${bubble.left}%`,
                top: `${bubble.top}%`,
                animation: `fadeIn 1s ease-out ${bubble.delay}ms forwards`,
                opacity: 0
              }}
            >
              {bubble.text}
              <span className="block mt-2 text-xs font-semibold opacity-70">
                —{bubble.author}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Solution Section */}
      {showSolution && (
        <div 
          className="absolute top-[150vh] w-full min-h-[150vh] bg-gradient-to-br from-cyan-500 via-cyan-600 to-pink-500 flex flex-col items-center justify-center px-5 py-20 z-[60]"
          style={{ animation: 'slideUp 1.5s ease-out' }}
        >
          <div className="max-w-6xl text-center text-white">
            {/* Logo */}
            <div 
              className="text-8xl font-black mb-10 drop-shadow-2xl"
              style={{ animation: 'scaleIn 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
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
                <div className="text-lg opacity-95">
                  Acceso inmediato a médicos profesionales
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border-2 border-white/40 hover:bg-white/25 hover:scale-105 transition-all">
                <div className="text-2xl font-bold mb-4">Descuento en Farmacias</div>
                <div className="text-lg opacity-95">
                  Ahorra hasta 60% en medicamentos
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border-2 border-white/40 hover:bg-white/25 hover:scale-105 transition-all">
                <div className="text-2xl font-bold mb-4">Terapia Psicológica</div>
                <div className="text-lg opacity-95">
                  Una sesión semanal con psicólogos
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border-2 border-white/40 hover:bg-white/25 hover:scale-105 transition-all">
                <div className="text-2xl font-bold mb-4">Hasta 4 Miembros</div>
                <div className="text-lg opacity-95">
                  Protege hasta 4 personas
                </div>
              </div>
            </div>

            {/* Protection Message */}
            <div className="bg-white/25 backdrop-blur-md rounded-3xl p-12 border-3 border-white/50 mb-16">
              <div className="text-4xl font-extrabold mb-6">
                Medicina Privada de Calidad
              </div>
              <div className="text-2xl leading-relaxed opacity-98">
                Ya no envíes dinero sin saber en qué se usa.<br/>
                Ya no te desveles preocupándote por los costos.<br/>
                <strong>Protege a los que más quieres con acceso inmediato a salud de calidad.</strong>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-black/30 backdrop-blur-md rounded-3xl p-12 border-3 border-white/60">
              <div className="text-5xl font-black mb-5 leading-tight">
                Deja de preocuparte.<br/>
                Empieza a proteger.
              </div>
              <div className="text-2xl font-normal mb-10 opacity-95">
                Tu familia merece tranquilidad. Tú mereces dormir en paz.
              </div>
              <button
                onClick={() => navigate('/')}
                className="inline-block px-16 py-6 bg-white text-cyan-600 text-2xl font-extrabold rounded-full shadow-2xl hover:bg-gray-50 hover:scale-110 transition-all uppercase tracking-wide"
              >
                Protege a Tu Familia Ahora
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 0.85; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes scaleIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
