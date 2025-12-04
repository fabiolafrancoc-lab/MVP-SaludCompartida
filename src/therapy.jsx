import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import { WhatsAppIconGreen } from './components/WhatsAppIcons';

export default function Therapy() {
  const navigate = useNavigate();
  const [currentPhrase, setCurrentPhrase] = useState(0);

  const phrases = [
    { text: "Tu salud mental importa", color: "#9B59B6" },
    { text: "Cuida tu mente, cuida tu vida", color: "#E91E63" },
    { text: "Terapia accesible para todos", color: "#8E44AD" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <TopNav showMenu={true} hideUser={true} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="relative bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl overflow-hidden shadow-2xl mb-12 border border-purple-500/30">
          <div className="relative z-10 px-8 py-16 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <span className="text-2xl font-bold bg-white text-purple-600 px-6 py-2 rounded-full shadow-lg">
                SESIONES POR VIDEOLLAMADA
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Terapia Psicológica
            </h1>

            <div className="text-3xl md:text-4xl font-bold mb-8 transition-all duration-500" style={{ color: phrases[currentPhrase].color }}>
              {phrases[currentPhrase].text}
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <div className="bg-white rounded-lg p-2">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold">50% de Descuento</p>
                  <p className="text-2xl font-black">$600 por sesión</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <div className="bg-white rounded-lg p-2">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold">Profesionales</p>
                  <p className="text-2xl font-black">Psicólogos Certificados</p>
                </div>
              </div>
            </div>

            <button onClick={() => navigate('/page3')} className="w-full md:w-auto bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105">
              Contratar SaludCompartida
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-purple-500/30">
            <div className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white font-black text-xl">1</div>
            <h3 className="text-xl font-bold text-white mb-3">Contrata SaludCompartida</h3>
            <p className="text-gray-300">Obtén acceso inmediato a psicólogos certificados</p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-pink-500/30">
            <div className="bg-pink-500 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white font-black text-xl">2</div>
            <h3 className="text-xl font-bold text-white mb-3">Agenda tu Sesión</h3>
            <p className="text-gray-300">Contacta al terapeuta y agenda una cita</p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-cyan-500/30">
            <div className="bg-cyan-500 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white font-black text-xl">3</div>
            <h3 className="text-xl font-bold text-white mb-3">Recibe Apoyo</h3>
            <p className="text-gray-300">Conéctate por videollamada y comienza tu proceso</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">¿Listo para Contratar SaludCompartida?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Invierte en tu salud mental y accede a terapia profesional a mitad de precio</p>
          <button onClick={() => navigate('/page3')} className="bg-white text-purple-600 px-8 py-4 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-white/50 transition-all transform hover:scale-105 inline-block">Contratar Ahora</button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
