import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MicroLanding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showServices, setShowServices] = useState(false);

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
    // Animación de pasos: más rápida para formato corto
    const stepTimers = [
      setTimeout(() => setCurrentStep(1), 700),
      setTimeout(() => setCurrentStep(2), 1400),
      setTimeout(() => setCurrentStep(3), 2100),
      setTimeout(() => setShowServices(true), 2600),
      setTimeout(() => {
        // Después de mostrar servicios, redirigir a la página principal para comprar
        setTimeout(() => navigate('/'), 3000);
      }, 5600)
    ];

    return () => stepTimers.forEach(timer => clearTimeout(timer));
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black">
      {/* Header con navegación completa */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
              <img 
                src="/saludcompartida-transp dark-bg-no-tagline copy 2.jpg" 
                alt="SaludCompartida" 
                className="h-10 md:h-12 w-auto group-hover:opacity-80 transition-opacity"
              />
            </div>
            
            {/* Navegación Desktop */}
            <nav className="hidden lg:flex items-center gap-6">
              <button
                onClick={() => navigate('/quienes-somos')}
                className="text-sm font-medium text-white/90 hover:text-cyan-400 transition-colors"
              >
                Quiénes Somos
              </button>
              <button
                onClick={() => navigate('/beneficios')}
                className="text-sm font-medium text-white/90 hover:text-cyan-400 transition-colors"
              >
                Nuestros Servicios
              </button>
              <button
                onClick={() => navigate('/savings')}
                className="text-sm font-medium text-white/90 hover:text-cyan-400 transition-colors"
              >
                Mis Ahorros
              </button>
              <button
                onClick={() => navigate('/account')}
                className="text-sm font-medium text-white/90 hover:text-cyan-400 transition-colors"
              >
                Mi Cuenta
              </button>
              <button
                onClick={() => navigate('/blog')}
                className="text-sm font-medium text-white/90 hover:text-cyan-400 transition-colors"
              >
                Blog
              </button>
            </nav>
            
            {/* Botón Volver */}
            <button
              onClick={() => navigate('/')}
              className="text-white/90 hover:text-cyan-400 font-medium text-sm md:text-base transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver
            </button>
          </div>
        </div>
      </header>

      {/* Step Animation Section - MÁS COMPACTO */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 pt-24">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-3 text-center">
          Así de simple es <span className="text-cyan-400">cuidar</span>
          <br className="hidden md:block" /> a los que están lejos
        </h1>
        <p className="text-base md:text-lg text-white/80 mb-10 text-center max-w-2xl">
          SaludCompartida está donde está tu corazón
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
                      currentStep === index + 1 ? 'animate-pulse scale-105' : ''
                    }`}>
                      {index + 1}
                    </div>

                {/* Step Content - COMPACTO */}
                <div className="flex-grow bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-cyan-400 text-base md:text-lg font-black">PASO {index + 1}</span>
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
        <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-12 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 text-center">
            Todo Incluido en Tu Plan
          </h2>
          <p className="text-base md:text-lg text-cyan-400 italic mb-10 text-center max-w-2xl">
            SaludCompartida está donde está tu corazón
          </p>

          {/* Service Flow - SIN ICONOS, COMPACTO */}
          <div className="relative max-w-3xl w-full">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {/* Service 1: Videollamada por WhatsApp 24/7 */}
              <div className="bg-white/8 backdrop-blur-lg rounded-2xl p-5 border-2 border-cyan-400/30 hover:bg-white/12 hover:scale-105 transition-all duration-300 shadow-xl">
                <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                  1. Videollamada por WhatsApp 24/7
                </h3>
                <p className="text-sm md:text-base text-white/80">
                  Doctores y especialistas por WhatsApp en cualquier momento — sin esperas
                </p>
              </div>

              {/* Service 2: Receta Digital */}
              <div className="bg-white/8 backdrop-blur-lg rounded-2xl p-5 border-2 border-pink-400/30 hover:bg-white/12 hover:scale-105 transition-all duration-300 shadow-xl">
                <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                  2. Receta Digital
                </h3>
                <p className="text-sm md:text-base text-white/80">
                  Enviada al instante • Lista para usar en farmacias
                </p>
              </div>

              {/* Service 3: Descuento Farmacias */}
              <div className="bg-white/8 backdrop-blur-lg rounded-2xl p-5 border-2 border-purple-400/30 hover:bg-white/12 hover:scale-105 transition-all duration-300 shadow-xl">
                <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                  3. Descuento en Farmacias
                </h3>
                <p className="text-sm md:text-base text-white/80">
                  Hasta 75% de ahorro en remedios y productos de farmacia (pañal, leche, refresco)
                </p>
              </div>

              {/* Service 4: Terapia */}
              <div className="bg-white/8 backdrop-blur-lg rounded-2xl p-5 border-2 border-yellow-400/30 hover:bg-white/12 hover:scale-105 transition-all duration-300 shadow-xl">
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
              {/* High-end inline SVG badge */}
              <div className="w-24 h-24 rounded-full shadow-2xl bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center">
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1">
                      <stop offset="0%" stopColor="#FFD166" />
                      <stop offset="100%" stopColor="#FFB703" />
                    </linearGradient>
                  </defs>
                  <circle cx="36" cy="36" r="34" fill="url(#g1)" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
                  <path d="M36 18L42 30H30L36 18Z" fill="white" opacity="0.9" />
                  <text x="36" y="46" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1a1a">4</text>
                  <text x="36" y="58" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1a1a1a">PERSONAS</text>
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-10 bg-white/10 backdrop-blur-md rounded-xl p-4 border-2 border-white/12 max-w-xl">
            <p className="text-lg md:text-xl font-bold text-white text-center">
              SaludCompartida cuida hasta cuatro personas que están lejos. Cuidamos donde está tu corazón.
            </p>
          </div>

          {/* CTA Button para ir a la página de compra */}
          <div className="mt-10">
            <button
              onClick={() => navigate('/')}
              className="px-8 md:px-12 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 text-white text-xl md:text-2xl font-black rounded-full shadow-2xl hover:scale-105 transition-all duration-200 uppercase"
            >
              VER PLANES
            </button>
          </div>
        </div>
      )}

      {/* Footer completo */}
      <footer className="bg-black border-t border-white/10 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo y tagline */}
            <div className="col-span-1 md:col-span-1">
              <img 
                src="/saludcompartida-transp dark-bg-no-tagline copy 2.jpg" 
                alt="SaludCompartida" 
                className="h-12 mb-4"
              />
              <p className="text-sm text-white/60 italic">
                Donde está tu corazón, está SaludCompartida
              </p>
            </div>

            {/* Columna: Servicios */}
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Servicios</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate('/telemedicine')}
                    className="text-sm text-white/70 hover:text-cyan-400 transition-colors text-left"
                  >
                    Telemedicina
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/pharmacy')}
                    className="text-sm text-white/70 hover:text-cyan-400 transition-colors text-left"
                  >
                    Descuentos en Farmacias
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/therapy')}
                    className="text-sm text-white/70 hover:text-cyan-400 transition-colors text-left"
                  >
                    Terapia Psicológica
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/savings')}
                    className="text-sm text-white/70 hover:text-cyan-400 transition-colors text-left"
                  >
                    Mis Ahorros
                  </button>
                </li>
              </ul>
            </div>

            {/* Columna: Nosotros */}
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Nosotros</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate('/quienes-somos')}
                    className="text-sm text-white/70 hover:text-cyan-400 transition-colors text-left"
                  >
                    Quiénes Somos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/mision-y-valores')}
                    className="text-sm text-white/70 hover:text-cyan-400 transition-colors text-left"
                  >
                    Misión y Valores
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/nuestros-pilares')}
                    className="text-sm text-white/70 hover:text-cyan-400 transition-colors text-left"
                  >
                    Nuestros Pilares
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/blog')}
                    className="text-sm text-white/70 hover:text-cyan-400 transition-colors text-left"
                  >
                    Blog
                  </button>
                </li>
              </ul>
            </div>

            {/* Columna: Soporte */}
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Soporte</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate('/contacto')}
                    className="text-sm text-white/70 hover:text-cyan-400 transition-colors text-left"
                  >
                    Contacto
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/account')}
                    className="text-sm text-white/70 hover:text-cyan-400 transition-colors text-left"
                  >
                    Mi Cuenta
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/privacy')}
                    className="text-sm text-white/70 hover:text-cyan-400 transition-colors text-left"
                  >
                    Política de Privacidad
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/terms')}
                    className="text-sm text-white/70 hover:text-cyan-400 transition-colors text-left"
                  >
                    Términos y Condiciones
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Línea divisora */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-white/50">
                © 2025 SaludCompartida. Todos los derechos reservados.
              </p>
              <p className="text-sm text-white/60 font-medium">
                SaludCompartida · Cuidando lo que más importa
              </p>
            </div>
          </div>
        </div>
      </footer>

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
