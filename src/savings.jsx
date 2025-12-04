import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from './components/TopNav';
import Footer from './components/Footer';

export default function Savings() {
  const navigate = useNavigate();
  const [displaySavings, setDisplaySavings] = useState(0);
  const totalSavings = 2825; // MXN para 3 meses
  const totalSavingsUSD = 141; // USD para 3 meses ($500 anuales / 12 * 3)

  useEffect(() => {
    let start = 0;
    const increment = totalSavings / 60;
    const timer = setInterval(() => {
      start += increment;
      if (start >= totalSavings) {
        setDisplaySavings(totalSavings);
        clearInterval(timer);
      } else {
        setDisplaySavings(Math.floor(start));
      }
    }, 20);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <TopNav showMenu={true} hideUser={true} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero con contador y foto */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Contador de ahorros */}
          <div className="bg-gradient-to-br from-cyan-900/40 to-purple-900/40 backdrop-blur-md rounded-3xl p-12 border border-cyan-500/30 shadow-2xl flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-white mb-4">Has Ahorrado en 3 Meses:</h2>
            <div className="text-7xl md:text-8xl font-black bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent mb-4">
              MX${displaySavings.toLocaleString()}
            </div>
            <p className="text-3xl font-bold text-gray-300">USD ${totalSavingsUSD}</p>
            <div className="mt-6 bg-cyan-500/20 rounded-xl p-4">
              <p className="text-lg text-cyan-300 font-semibold">
                💰 Ahorro hasta el <span className="text-2xl font-black">75%</span>
              </p>
            </div>
          </div>

          {/* Imagen */}
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="/momhappy.jpeg" 
              alt="Familia feliz ahorrando" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Desglose de ahorros */}
        <div className="mb-16">
          <h2 className="text-4xl font-black text-white text-center mb-12">
            Desglose de tus Ahorros
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Videollamadas con Doctor */}
            <div className="bg-gradient-to-br from-cyan-900/40 to-teal-900/40 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/30 shadow-xl">
              <div className="bg-cyan-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Videollamadas con Doctor</h3>
              <p className="text-4xl font-black text-cyan-400 mb-2">MX$1,106</p>
              <p className="text-xl font-semibold text-cyan-300 mb-3">USD $55</p>
              <p className="text-gray-300">2 consultas en 3 meses</p>
              <div className="mt-4 bg-cyan-500/10 rounded-lg p-3">
                <p className="text-sm text-cyan-200">Proyección anual: <span className="font-black">MX$4,424 (USD $221)</span></p>
              </div>
            </div>

            {/* Sesiones Semanales con Psicólogo */}
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-md rounded-2xl p-8 border border-purple-500/30 shadow-xl">
              <div className="bg-purple-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Sesiones Semanales con Psicólogo</h3>
              <p className="text-4xl font-black text-purple-400 mb-2">MX$1,476</p>
              <p className="text-xl font-semibold text-purple-300 mb-3">USD $74</p>
              <p className="text-gray-300">4 sesiones en 3 meses</p>
              <div className="mt-4 bg-purple-500/10 rounded-lg p-3">
                <p className="text-sm text-purple-200">Proyección anual: <span className="font-black">MX$5,904 (USD $295)</span></p>
              </div>
            </div>

            {/* Ahorro en Productos del Hogar */}
            <div className="bg-gradient-to-br from-pink-900/40 to-orange-900/40 backdrop-blur-md rounded-2xl p-8 border border-pink-500/30 shadow-xl">
              <div className="bg-pink-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Ahorro en Productos del Hogar</h3>
              <p className="text-4xl font-black text-pink-400 mb-2">MX$1,696</p>
              <p className="text-xl font-semibold text-pink-300 mb-3">USD $85</p>
              <p className="text-gray-300">Compras mensuales con descuento</p>
              <div className="mt-4 bg-pink-500/10 rounded-lg p-3">
                <p className="text-sm text-pink-200">Proyección anual: <span className="font-black">MX$6,784 (USD $339)</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Proyección Anual */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-12 mb-16 border border-cyan-500/30 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-8">
            Proyección de Ahorro Anual
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <p className="text-cyan-400 mb-2 text-lg">Videollamadas con Doctor</p>
              <p className="text-3xl font-black text-white">MX$4,424</p>
              <p className="text-xl text-gray-400">USD $221</p>
            </div>
            <div className="text-center">
              <p className="text-purple-400 mb-2 text-lg">Sesiones con Psicólogo</p>
              <p className="text-3xl font-black text-white">MX$5,904</p>
              <p className="text-xl text-gray-400">USD $295</p>
            </div>
            <div className="text-center">
              <p className="text-pink-400 mb-2 text-lg">Productos del Hogar</p>
              <p className="text-3xl font-black text-white">MX$6,784</p>
              <p className="text-xl text-gray-400">USD $339</p>
            </div>
          </div>

          <div className="border-t-4 border-cyan-500/40 pt-8 text-center">
            <p className="text-white/90 text-2xl mb-4">Total Ahorro Anual:</p>
            <p className="text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent mb-4">
              MX$17,112
            </p>
            <p className="text-4xl font-bold text-white">USD $855</p>
          </div>
        </div>

        {/* Consejos para maximizar ahorros */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-12">
            💡 Maximiza tus Ahorros
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-cyan-500/30">
              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Usa Telemedicina Primero</h4>
                  <p className="text-gray-300">
                    Consulta por videollamada antes de ir al doctor. <span className="text-cyan-400 font-bold">Ahorra hasta MX$2,356/mes</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-purple-500/30">
              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Compras del Hogar</h4>
                  <p className="text-gray-300">
                    Aprovecha los descuentos en productos del hogar. <span className="text-purple-400 font-bold">Ahorra ~MX$2,140/mes</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-pink-500/30">
              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 text-pink-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Sesiones de Terapia</h4>
                  <p className="text-gray-300">
                    Invierte en salud mental con sesiones semanales. <span className="text-pink-400 font-bold">MX$2,216/mes</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-3xl p-16 text-center shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Contratar SaludCompartida
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Todo por solo <span className="font-black text-3xl">USD $500</span> al año
          </p>
          <button
            onClick={() => navigate('/page3')}
            className="bg-white text-cyan-600 px-12 py-5 rounded-2xl text-2xl font-bold shadow-2xl hover:shadow-white/50 transition-all transform hover:scale-105"
          >
            Contratar Ahora
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
