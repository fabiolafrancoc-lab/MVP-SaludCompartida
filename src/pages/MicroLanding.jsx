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
      title: 'Presiona "Llama Ahora"',
      description: 'En cualquier momento del día o noche',
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      title: 'Describe tu problema',
      description: 'Un médico profesional te atiende de inmediato',
      color: 'from-purple-400 to-purple-600'
    },
    {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Step Animation Section - MÁS COMPACTO */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-3 text-center">
          Salud en <span className="text-cyan-400">30 Segundos</span>
        </h1>
        <p className="text-base md:text-lg text-white/80 mb-10 text-center max-w-2xl">
          Así de simple es cuidar a tu familia
        </p>

        {/* Steps Timeline - MÁS COMPACTO */}
        <div className="relative max-w-3xl w-full">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`mb-8 transition-all duration-1000 transform ${
                currentStep > index 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-[-100px]'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Step Number - SIN ICONO */}
                <div className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-2xl md:text-3xl font-black text-white shadow-xl ${
                  currentStep === index + 1 ? 'animate-pulse scale-110' : ''
                }`}>
                  {index + 1}
                </div>

                {/* Step Content - COMPACTO */}
                <div className="flex-grow bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-cyan-400 text-base md:text-lg font-black">PASO {index + 1}</span>
                    {currentStep > index && (
                      <span className="text-green-400 text-xl">✓</span>
                    )}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/70">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className={`ml-6 md:ml-7 w-1 h-8 bg-gradient-to-b from-cyan-400 to-transparent transition-all duration-1000 ${
                  currentStep > index ? 'opacity-100' : 'opacity-0'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Services Circle Section - MÁS COMPACTO Y OSCURO */}
      {showServices && (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center px-4 py-12 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 text-center">
            Todo Incluido en Tu Plan
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-10 text-center max-w-2xl">
            Cierra el círculo completo de salud para tu familia
          </p>

          {/* Service Flow - SIN ICONOS, COMPACTO */}
          <div className="relative max-w-3xl w-full">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {/* Service 1: Telemedicina */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border-2 border-cyan-400/40 hover:bg-white/15 hover:scale-105 transition-all duration-300 shadow-xl">
                <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                  1. Telemedicina
                </h3>
                <p className="text-sm md:text-base text-white/80">
                  Doctor en línea 24/7 • Diagnóstico inmediato • Sin esperas
                </p>
              </div>

              {/* Service 2: E-Receta */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border-2 border-pink-400/40 hover:bg-white/15 hover:scale-105 transition-all duration-300 shadow-xl">
                <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                  2. E-Prescripción
                </h3>
                <p className="text-sm md:text-base text-white/80">
                  Receta digital enviada al instante • Lista para usar en farmacias
                </p>
              </div>

              {/* Service 3: Farmacia */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border-2 border-purple-400/40 hover:bg-white/15 hover:scale-105 transition-all duration-300 shadow-xl">
                <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                  3. Descuento Farmacias
                </h3>
                <p className="text-sm md:text-base text-white/80">
                  Hasta 60% de ahorro • Red de 5,000+ farmacias • México completo
                </p>
              </div>

              {/* Service 4: Terapia */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border-2 border-yellow-400/40 hover:bg-white/15 hover:scale-105 transition-all duration-300 shadow-xl">
                <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                  4. Terapia Psicológica
                </h3>
                <p className="text-sm md:text-base text-white/80">
                  1 sesión semanal • Psicólogos certificados • Salud mental importa
                </p>
              </div>
            </div>

            {/* Center Badge - MÁS PEQUEÑO */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
              <div className="bg-gradient-to-br from-cyan-400 to-pink-400 text-white rounded-full w-20 h-20 flex items-center justify-center shadow-2xl animate-pulse">
                <div className="text-center">
                  <div className="text-2xl font-black">4</div>
                  <div className="text-[10px] font-bold">Personas</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 bg-white/15 backdrop-blur-md rounded-xl p-4 border-2 border-white/30 max-w-xl">
            <p className="text-lg md:text-xl font-bold text-white text-center">
              ✅ Cuida hasta 4 personas con un solo plan
            </p>
          </div>
        </div>
      )}

      {/* Price Shock Section - MÁS COMPACTO Y OSCURO */}
      {showPrice && (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center px-4 py-12 animate-fadeIn">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-8 text-center">
            ¿Cuánto cuesta toda esta tranquilidad?
          </h2>

          {/* Giant Price - MÁS COMPACTO */}
          <div className="text-center mb-10">
            <div className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-2 animate-pulse">
              $12
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white/80">
              al mes
            </div>
          </div>

          {/* Price Comparisons - SIN ICONOS */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-3xl mb-10">
            <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 backdrop-blur-md rounded-xl p-4 border-2 border-cyan-400/30 text-center hover:scale-105 transition-all">
              <div className="text-base md:text-xl font-bold text-white mb-1">
                2 kilos tortillas
              </div>
              <div className="text-xs md:text-sm text-white/70">
                Una semana
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-md rounded-xl p-4 border-2 border-purple-400/30 text-center hover:scale-105 transition-all">
              <div className="text-base md:text-xl font-bold text-white mb-1">
                1 café diario
              </div>
              <div className="text-xs md:text-sm text-white/70">
                Un mes
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 backdrop-blur-md rounded-xl p-4 border-2 border-pink-400/30 text-center hover:scale-105 transition-all">
              <div className="text-base md:text-xl font-bold text-white mb-1">
                Tranquilidad
              </div>
              <div className="text-xs md:text-sm text-white/70">
                Sin precio
              </div>
            </div>
          </div>

          <div className="bg-yellow-400/20 backdrop-blur-md rounded-2xl p-6 border-2 border-yellow-400/50 max-w-2xl">
            <p className="text-base md:text-lg text-white text-center leading-relaxed">
              Una consulta privada = $500-800 pesos<br/>
              Una emergencia sin plan = $2,000-5,000 pesos<br/>
              <span className="text-xl md:text-2xl font-black text-cyan-400">
                Tu paz mental 12 meses = $144 USD
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Emotional CTA Section - MÁS COMPACTO Y OSCURO */}
      {showCTA && (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center px-4 py-12 animate-fadeIn relative overflow-hidden">
          <div className="relative z-10 max-w-3xl text-center">
            {/* Main Headline with Guilt - MÁS COMPACTO */}
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
              ¿Cuánto vale la tranquilidad<br/>
              de saber que están <span className="text-cyan-400">protegidos?</span>
            </h2>

            {/* Pain Point - COMPACTO */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border-2 border-white/20 mb-8">
              <p className="text-lg md:text-2xl text-white font-bold leading-relaxed mb-4">
                Mientras lees esto, tu familia en México<br className="hidden md:block"/>
                podría estar esperando <span className="text-red-300">horas en el IMSS...</span>
              </p>
              <p className="text-base md:text-lg text-white/90 leading-relaxed">
                ¿O pagando una consulta privada que<br className="hidden md:block"/>
                cuesta lo mismo que 3 meses de SaludCompartida?
              </p>
            </div>

            {/* Urgency Message - COMPACTO */}
            <div className="bg-yellow-400/20 backdrop-blur-md rounded-xl p-4 mb-8 border-2 border-yellow-400/40 shadow-xl animate-pulse">
              <p className="text-lg md:text-xl font-black text-yellow-300 flex items-center justify-center gap-3">
                Cada día sin protección es un día de riesgo
              </p>
              <p className="text-base md:text-lg font-bold text-white mt-2">
                ¿Y si hoy los necesitan?
              </p>
            </div>

            {/* Main CTA Button */}
            <button
              onClick={() => navigate('/')}
              className="group relative inline-block px-10 md:px-16 py-5 md:py-6 bg-gradient-to-r from-cyan-500 to-pink-500 text-white text-xl md:text-3xl font-black rounded-full shadow-2xl hover:scale-110 transition-all duration-300 uppercase tracking-wider mb-6 animate-bounce"
            >
              🚨 SÍ, QUIERO CUIDARLAS AHORA
            </button>

            <p className="text-base md:text-lg text-white/90 font-bold mb-6">
              (Antes de que sea demasiado tarde)
            </p>

            {/* Benefits Strip - COMPACTO */}
            <div className="flex flex-wrap justify-center gap-3 mb-6 text-xs md:text-sm">
              <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-white font-bold">
                ✅ Activación inmediata
              </div>
              <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-white font-bold">
                ✅ Sin permanencia
              </div>
              <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-white font-bold">
                ✅ Cancela cuando quieras
              </div>
            </div>

            {/* Secondary Link */}
            <div className="text-center">
              <a
                href="/telemedicine"
                className="text-sm md:text-base text-white/60 hover:text-white underline transition-colors"
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
