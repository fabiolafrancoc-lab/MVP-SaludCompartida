import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MicroLanding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showServices, setShowServices] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  const steps = [
    {
      icon: '📞',
      title: 'Presiona "Llama Ahora"',
      description: 'En cualquier momento del día o noche',
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      icon: '💬',
      title: 'Describe tu problema',
      description: 'Un médico profesional te atiende de inmediato',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: '🏥',
      title: 'Recibe diagnóstico + receta',
      description: 'Todo en menos de 5 minutos',
      color: 'from-pink-400 to-pink-600'
    }
  ];

  useEffect(() => {
    // Animación de pasos: 3 segundos cada uno
    const stepTimers = [
      setTimeout(() => setCurrentStep(1), 3000),
      setTimeout(() => setCurrentStep(2), 6000),
      setTimeout(() => setCurrentStep(3), 9000),
      setTimeout(() => setShowServices(true), 10000),
      setTimeout(() => setShowPrice(true), 11500),
      setTimeout(() => setShowCTA(true), 13000)
    ];

    return () => stepTimers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Step Animation Section */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 text-center">
          Salud en <span className="text-cyan-400">30 Segundos</span>
        </h1>
        <p className="text-lg md:text-2xl text-white/80 mb-16 text-center max-w-3xl">
          Así de simple es cuidar a tu familia
        </p>

        {/* Steps Timeline */}
        <div className="relative max-w-5xl w-full">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`mb-12 transition-all duration-1000 transform ${
                currentStep > index 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-[-100px]'
              }`}
            >
              <div className="flex items-center gap-6">
                {/* Step Number */}
                <div className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl md:text-4xl font-bold text-white shadow-2xl ${
                  currentStep === index + 1 ? 'animate-pulse scale-110' : ''
                }`}>
                  {step.icon}
                </div>

                {/* Step Content */}
                <div className="flex-grow bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-cyan-400 text-xl font-black">PASO {index + 1}</span>
                    {currentStep > index && (
                      <span className="text-green-400 text-2xl">✓</span>
                    )}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-base md:text-lg text-white/70">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className={`ml-8 md:ml-10 w-1 h-12 bg-gradient-to-b from-cyan-400 to-transparent transition-all duration-1000 ${
                  currentStep > index ? 'opacity-100' : 'opacity-0'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Services Circle Section */}
      {showServices && (
        <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center px-4 py-20 animate-fadeIn">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 text-center">
            Todo Incluido en Tu Plan
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-16 text-center max-w-3xl">
            Cierra el círculo completo de salud para tu familia
          </p>

          {/* Service Flow Circle */}
          <div className="relative max-w-4xl w-full">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Service 1: Telemedicina */}
              <div className="group relative bg-white/20 backdrop-blur-lg rounded-3xl p-8 border-3 border-white/40 hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-2xl">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  📞
                </div>
                <h3 className="text-3xl font-black text-white mb-3">
                  1. Telemedicina
                </h3>
                <p className="text-lg text-white/90">
                  Doctor en línea 24/7 • Diagnóstico inmediato • Sin esperas
                </p>
                <div className="absolute -bottom-4 -right-4 text-8xl opacity-20 group-hover:opacity-40 transition-opacity">
                  →
                </div>
              </div>

              {/* Service 2: E-Receta */}
              <div className="group relative bg-white/20 backdrop-blur-lg rounded-3xl p-8 border-3 border-white/40 hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-2xl">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  📋
                </div>
                <h3 className="text-3xl font-black text-white mb-3">
                  2. E-Prescripción
                </h3>
                <p className="text-lg text-white/90">
                  Receta digital enviada al instante • Lista para usar en farmacias
                </p>
                <div className="absolute -bottom-4 -right-4 text-8xl opacity-20 group-hover:opacity-40 transition-opacity">
                  →
                </div>
              </div>

              {/* Service 3: Farmacia */}
              <div className="group relative bg-white/20 backdrop-blur-lg rounded-3xl p-8 border-3 border-white/40 hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-2xl">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  💊
                </div>
                <h3 className="text-3xl font-black text-white mb-3">
                  3. Descuento Farmacias
                </h3>
                <p className="text-lg text-white/90">
                  Hasta 60% de ahorro • Red de 5,000+ farmacias • México completo
                </p>
                <div className="absolute -bottom-4 -right-4 text-8xl opacity-20 group-hover:opacity-40 transition-opacity">
                  +
                </div>
              </div>

              {/* Service 4: Terapia */}
              <div className="group relative bg-white/20 backdrop-blur-lg rounded-3xl p-8 border-3 border-white/40 hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-2xl">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  🧠
                </div>
                <h3 className="text-3xl font-black text-white mb-3">
                  4. Terapia Psicológica
                </h3>
                <p className="text-lg text-white/90">
                  1 sesión semanal • Psicólogos certificados • Salud mental importa
                </p>
              </div>
            </div>

            {/* Center Badge */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
              <div className="bg-yellow-400 text-gray-900 rounded-full w-32 h-32 flex items-center justify-center shadow-2xl animate-pulse">
                <div className="text-center">
                  <div className="text-4xl font-black">4</div>
                  <div className="text-sm font-bold">Miembros</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-white/25 backdrop-blur-md rounded-2xl p-6 border-2 border-white/50 max-w-2xl">
            <p className="text-2xl font-bold text-white text-center">
              ✅ Protege hasta 4 personas con un solo plan
            </p>
          </div>
        </div>
      )}

      {/* Price Shock Section */}
      {showPrice && (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center px-4 py-20 animate-fadeIn">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-12 text-center">
            ¿Cuánto cuesta toda esta tranquilidad?
          </h2>

          {/* Giant Price */}
          <div className="text-center mb-16">
            <div className="text-9xl md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4 animate-pulse">
              $12
            </div>
            <div className="text-4xl md:text-6xl font-bold text-white/80">
              al mes
            </div>
          </div>

          {/* Price Comparisons */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mb-16">
            <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 backdrop-blur-md rounded-2xl p-8 border-2 border-cyan-400/30 text-center hover:scale-105 transition-all">
              <div className="text-6xl mb-4">🌮</div>
              <div className="text-2xl font-bold text-white mb-2">
                2 kilos de tortillas
              </div>
              <div className="text-lg text-white/70">
                Lo que gastas en una semana
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-8 border-2 border-purple-400/30 text-center hover:scale-105 transition-all">
              <div className="text-6xl mb-4">☕</div>
              <div className="text-2xl font-bold text-white mb-2">
                1 café al día
              </div>
              <div className="text-lg text-white/70">
                Un pequeño sacrificio
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-8 border-2 border-pink-400/30 text-center hover:scale-105 transition-all">
              <div className="text-6xl mb-4">💤</div>
              <div className="text-2xl font-bold text-white mb-2">
                Tranquilidad sin culpa
              </div>
              <div className="text-lg text-white/70">
                No tiene precio
              </div>
            </div>
          </div>

          <div className="bg-yellow-400/20 backdrop-blur-md rounded-3xl p-8 border-3 border-yellow-400/50 max-w-3xl">
            <p className="text-3xl font-black text-yellow-300 text-center mb-4">
              💡 Piénsalo así:
            </p>
            <p className="text-xl text-white text-center leading-relaxed">
              Una sola consulta privada en México = $500-800 pesos<br/>
              Una emergencia sin plan = $2,000-5,000 pesos<br/>
              <span className="text-2xl font-black text-cyan-400">
                Tu paz mental durante 12 meses = $144 USD
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Emotional CTA Section */}
      {showCTA && (
        <div className="min-h-screen bg-gradient-to-br from-red-600 via-pink-600 to-orange-500 flex flex-col items-center justify-center px-4 py-20 animate-fadeIn relative overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-9xl animate-bounce">⚠️</div>
            <div className="absolute bottom-20 right-20 text-9xl animate-bounce delay-100">⏰</div>
            <div className="absolute top-1/2 left-1/4 text-9xl animate-pulse">💔</div>
          </div>

          <div className="relative z-10 max-w-5xl text-center">
            {/* Main Headline with Guilt */}
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-tight drop-shadow-2xl">
              ¿Cuánto vale la tranquilidad<br/>
              de saber que están <span className="text-yellow-300">protegidos?</span>
            </h2>

            {/* Pain Point */}
            <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 md:p-12 border-3 border-white/30 mb-12">
              <p className="text-2xl md:text-4xl text-white font-bold leading-relaxed mb-6">
                Mientras lees esto, tu familia en México<br className="hidden md:block"/>
                podría estar esperando <span className="text-red-300">horas en el IMSS...</span>
              </p>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                ¿O pagando una consulta privada que<br className="hidden md:block"/>
                cuesta lo mismo que 3 meses de SaludCompartida?
              </p>
            </div>

            {/* Urgency Message */}
            <div className="bg-yellow-400/90 backdrop-blur-md rounded-2xl p-6 mb-12 border-3 border-yellow-300 shadow-2xl animate-pulse">
              <p className="text-2xl md:text-3xl font-black text-gray-900 flex items-center justify-center gap-4">
                <span className="text-4xl">⏰</span>
                Cada día que pasa sin protección es un día de riesgo
              </p>
              <p className="text-xl md:text-2xl font-bold text-gray-800 mt-3">
                ¿Y si hoy los necesitan?
              </p>
            </div>

            {/* Main CTA Button */}
            <button
              onClick={() => navigate('/')}
              className="group relative inline-block px-12 md:px-20 py-6 md:py-8 bg-white text-red-600 text-2xl md:text-4xl font-black rounded-full shadow-2xl hover:bg-yellow-300 hover:text-gray-900 hover:scale-110 transition-all duration-300 uppercase tracking-wider mb-8 animate-bounce"
            >
              <span className="relative z-10 flex items-center gap-4">
                🚨 SÍ, QUIERO CUIDARLAS AHORA
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <p className="text-lg md:text-xl text-white/90 font-bold mb-8">
              (Antes de que sea demasiado tarde)
            </p>

            {/* Benefits Strip */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 text-sm md:text-base">
              <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/40 text-white font-bold">
                ✅ Activación inmediata
              </div>
              <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/40 text-white font-bold">
                ✅ Sin permanencia
              </div>
              <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/40 text-white font-bold">
                ✅ Cancela cuando quieras
              </div>
              <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/40 text-white font-bold">
                ✅ Protección desde el día 1
              </div>
            </div>

            {/* Secondary Link */}
            <div className="text-center">
              <a
                href="/telemedicine"
                className="text-lg md:text-xl text-white/60 hover:text-white underline transition-colors"
              >
                No estoy listo todavía → Ver más información
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }
      `}</style>
    </div>
  );
}
