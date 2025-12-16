import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from './components/TopNav';
import Footer from './components/Footer';

export default function Home() {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0);
  const [savings, setSavings] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (savings < 432) {
      const timer = setTimeout(() => setSavings(prev => Math.min(prev + 18, 432)), 80);
      return () => clearTimeout(timer);
    }
  }, [savings]);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setActiveStep(prev => (prev >= 3 ? 1 : prev + 1));
    }, 1500);
    return () => clearInterval(stepTimer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      
      {/* TopNav */}
      <TopNav 
        hideUser={true}
        showMenu={true}
        logoSrc="/saludcompartida-transp dark-bg-no-tagline copy 2.jpg"
      />

      {/* Urgency Banner - DESTACADO EN ROJO */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 py-6 px-4 mt-16 border-y-4 border-red-400 shadow-2xl shadow-red-900/50">
        <div className="flex items-center justify-center gap-3 text-center">
          <svg className="w-8 h-8 animate-pulse text-yellow-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="font-black text-white">
            <span className="text-xl md:text-3xl block md:inline">
              AHORA MISMO, <span className="text-yellow-300 animate-pulse">{1847 + counter}</span> FAMILIAS
            </span>
            <span className="text-lg md:text-2xl block md:inline md:ml-2 mt-1 md:mt-0">
              ENFRENTAN UNA EMERGENCIA MÉDICA SIN RECURSOS
            </span>
          </p>
          <svg className="w-8 h-8 animate-pulse text-yellow-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <section className="w-full px-4 sm:px-6 pt-8 sm:pt-12 pb-6 sm:pb-8">
        <div className="w-full max-w-4xl mx-auto text-left">
          <p className="text-white font-bold tracking-widest uppercase mb-4 text-xs sm:text-sm">La Solución</p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black mb-4 w-full">
            <span className="text-cyan-400 block">SaludCompartida</span>
          </h1>
          <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent w-full">
            Una App. Tu Familia Cuidada. $12/Mes
          </h2>
        </div>
      </section>

      {/* Problem Context - Compacto */}
      <section className="w-full px-4 sm:px-6 pb-6 sm:pb-8">
        <div className="w-full max-w-5xl mx-auto">
          <div className="w-full bg-gray-800/50 border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <div className="bg-red-500/20 border border-red-500/40 rounded-xl px-4 py-2 flex-shrink-0">
                  <span className="text-2xl sm:text-3xl font-black text-red-400">$576</span>
                  <span className="text-gray-400 text-xs sm:text-sm ml-1">USD/año</span>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm w-full max-w-md text-center sm:text-left leading-relaxed">
                  Gasto promedio en consultas y medicamentos—adicional al IMSS, sin contar hospitalizaciones.
                </p>
              </div>
              <div className="bg-green-500/20 border border-green-500/40 rounded-xl px-4 py-2 text-center flex-shrink-0">
                <p className="text-gray-400 text-xs">Tu ahorro anual</p>
                <span className="text-xl sm:text-2xl font-black text-green-400">${savings}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 30 Segundos - Línea Horizontal Compacta */}
      <section className="w-full px-4 sm:px-6 py-6 sm:py-8 bg-gray-800/30">
        <div className="w-full max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-white">
            <span className="text-cyan-400">30 Segundos</span> para Cuidar a tu Familia
          </h3>
          
          {/* Timeline en una sola línea */}
          <div className="relative flex items-center justify-between w-full">
            
            {/* Línea de fondo */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 -translate-y-1/2 mx-8 sm:mx-16">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 via-cyan-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${(activeStep / 3) * 100}%` }}
                />
              </div>
              
              {/* Step 1 */}
              <div className={`relative z-10 flex flex-col items-center transition-all duration-300 ${activeStep >= 1 ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center border-3 transition-all duration-300 ${activeStep >= 1 ? 'bg-green-500/30 border-green-500' : 'bg-gray-800 border-gray-600'}`}>
                  <span className="text-xl font-black text-green-400">$12</span>
                </div>
                <p className="text-sm font-bold text-white mt-2 text-center">Compras</p>
              </div>

              {/* Arrow 1 */}
              <svg className={`w-6 h-6 relative z-10 ${activeStep >= 2 ? 'text-cyan-400' : 'text-gray-600'} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>

              {/* Step 2 */}
              <div className={`relative z-10 flex flex-col items-center transition-all duration-300 ${activeStep >= 2 ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center border-3 transition-all duration-300 ${activeStep >= 2 ? 'bg-cyan-500/30 border-cyan-500' : 'bg-gray-800 border-gray-600'}`}>
                  <svg className="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <p className="text-sm font-bold text-white mt-2 text-center">30 segundos</p>
                <p className="text-xs font-bold text-white text-center">Tú y tu ser querido reciben un WhatsApp</p>
              </div>

              {/* Arrow 2 */}
              <svg className={`w-6 h-6 relative z-10 ${activeStep >= 3 ? 'text-pink-400' : 'text-gray-600'} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>

              {/* Step 3 */}
              <div className={`relative z-10 flex flex-col items-center transition-all duration-300 ${activeStep >= 3 ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center border-3 transition-all duration-300 ${activeStep >= 3 ? 'bg-pink-500/30 border-pink-500 animate-pulse' : 'bg-gray-800 border-gray-600'}`}>
                  <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-white mt-2 text-center">¡Listo!</p>
              </div>
            </div>
            
            <p className="text-center text-white font-bold text-base sm:text-lg mt-4">Así de simple. Así de rápido.</p>
          </div>
        </section>

        {/* ¿Qué obtienes? - Dos bloques lado a lado */}
      <section className="w-full px-4 sm:px-6 py-8 sm:py-10">
        <div className="w-full max-w-5xl mx-auto">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-2 text-white">
            ¿Qué obtienes con
          </h3>
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-center mb-6 sm:mb-8 text-cyan-400">
            SaludCompartida?
          </h3>
          
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Izquierda: Para Ti - Migrante */}
              <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/40 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-cyan-500/20">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-cyan-400">Para Ti</h4>
                    <p className="text-gray-400 text-xs">Migrante en EE.UU.</p>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-200 text-sm">Ve cuánto ha ahorrado tu familia</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-200 text-sm">Notificaciones cuando usen el servicio</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-200 text-sm">Comunidad y blog de salud</span>
                  </li>
                  <li className="flex items-center gap-2 bg-cyan-500/10 rounded-lg p-2 -mx-1 mt-2">
                    <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white text-sm font-semibold">Hasta 4 familiares cubiertos</span>
                  </li>
                </ul>
              </div>

              {/* Derecha: Para Tu Familia */}
              <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 border border-pink-500/40 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-pink-500/20">
                  <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-pink-400">Para Tu Familia</h4>
                    <p className="text-gray-400 text-xs">en México</p>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 bg-pink-500/10 rounded-lg p-2 -mx-1">
                    <svg className="w-4 h-4 text-pink-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white text-sm font-semibold">Videollamadas médicas 24/7 ilimitadas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-pink-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-200 text-sm">Descuentos <span className="text-pink-400 font-bold">hasta 75%</span> en farmacias</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-pink-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-200 text-sm">Terapeutas y psicólogos certificados</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-pink-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-200 text-sm">Estado de cuenta con tus ahorros</span>
                  </li>
                </ul>
                
                <p className="text-gray-500 text-xs mt-3 italic">
                  Próximamente: descuentos en especialistas y exámenes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Compacto */}
      <section className="w-full px-4 sm:px-6 py-8 sm:py-10">
        <div className="w-full max-w-3xl mx-auto">
          <div className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-xl sm:rounded-2xl p-6 md:p-8 text-center text-white">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                Tú trabajas duro <span className="text-yellow-400 font-black">"aquí"</span>. Nosotros los cuidamos <span className="text-yellow-400 font-black">"allá"</span>.
              </h2>
              
              <div className="my-4 inline-flex items-center gap-2 sm:gap-3 bg-white/10 rounded-xl px-3 sm:px-4 py-2">
                <span className="text-cyan-200/60 line-through font-bold text-sm sm:text-base">$576/año</span>
                <span className="text-xl sm:text-2xl font-black">$12/mes</span>
              </div>
              
              <p className="text-xs sm:text-sm mb-4 text-white font-bold italic leading-relaxed">
                Donde está tu corazón, está SaludCompartida.
              </p>
              
              <button 
                onClick={() => navigate('/registro')}
                className="w-full sm:w-auto bg-fuchsia-500 text-white font-bold py-3 px-6 sm:px-8 rounded-xl hover:bg-fuchsia-600 transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base"
              >
                Cuida a tu FAMILIA ahora
              </button>
              
              <p className="text-xs text-white/80 font-semibold mt-4 w-full max-w-lg mx-auto leading-relaxed">
                SaludCompartida es un servicio que provee acceso a médicos autorizados, psicólogos y descuento en medicamentos en México; NO ES UN SEGURO.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
