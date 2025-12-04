import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import TopNav from './components/TopNav';
import Footer from './components/Footer';

export default function Therapy() {
  const navigate = useNavigate();
  const [currentPhrase, setCurrentPhrase] = useState(0);

  const phrases = [
    { text: "Tu salud mental importa", color: "#FFFFFF" },
    { text: "Cuida tu mente, cuida tu vida", color: "#FFFFFF" },
    { text: "Terapia accesible para todos", color: "#FFFFFF" }
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
          <div className="relative z-10 px-12 py-16 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-500/30 rounded-full p-3 shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-black text-white">
                SESIONES POR VIDEOLLAMADA
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Terapia Psicológica
            </h1>

            <div className="text-3xl md:text-4xl font-black mb-8 transition-all duration-500" style={{ color: phrases[currentPhrase].color }}>
              {phrases[currentPhrase].text}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
                <div className="bg-white rounded-lg p-2">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold">Beneficio Incluido</p>
                  <p className="text-2xl font-black">Una sesión semanal incluida</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
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
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
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

        <div className="text-center">
          <button
            onClick={() => navigate('/registro')}
            className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105 inline-block"
          >
            Contratar Ahora
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
