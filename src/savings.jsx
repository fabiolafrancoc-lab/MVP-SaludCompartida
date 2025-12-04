import { useNavigate } from 'react-router-dom';
import { DollarSign } from 'lucide-react';
import TopNav from './components/TopNav';
import Footer from './components/Footer';

export default function Savings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <TopNav showMenu={true} hideUser={true} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="relative bg-gradient-to-r from-cyan-600 to-pink-600 rounded-3xl overflow-hidden shadow-2xl mb-12 border border-cyan-500/30">
          <div className="relative z-10 px-8 py-16 text-white text-center">
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <DollarSign className="w-8 h-8 text-cyan-600" />
              </div>
              <span className="text-2xl font-bold bg-white text-cyan-600 px-6 py-2 rounded-full shadow-lg">
                AHORRA MILES AL AÑO
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Mis Ahorros
            </h1>

            <p className="text-2xl md:text-3xl font-bold mb-8">
              Descubre todo lo que puedes ahorrar con SaludCompartida
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-cyan-900/40 to-teal-900/40 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/30 shadow-xl">
            <div className="bg-cyan-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Telemedicina</h3>
            <p className="text-4xl font-black text-cyan-400 mb-2">$9,600</p>
            <p className="text-gray-300">Ahorro anual en consultas médicas 24/7</p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-md rounded-2xl p-8 border border-purple-500/30 shadow-xl">
            <div className="bg-purple-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Terapia</h3>
            <p className="text-4xl font-black text-purple-400 mb-2">$14,400</p>
            <p className="text-gray-300">Ahorro anual con 2 sesiones/mes al 50% OFF</p>
          </div>

          <div className="bg-gradient-to-br from-pink-900/40 to-orange-900/40 backdrop-blur-md rounded-2xl p-8 border border-pink-500/30 shadow-xl">
            <div className="bg-pink-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Compras Hogar</h3>
            <p className="text-4xl font-black text-pink-400 mb-2">$18,900</p>
            <p className="text-gray-300">Ahorro anual en productos del hogar</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-12 mb-12 border border-cyan-500/30 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-8">
            Resumen de Ahorros Totales
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <p className="text-cyan-400 mb-2">Telemedicina</p>
              <p className="text-3xl font-black text-white">$9,600</p>
            </div>
            <div className="text-center">
              <p className="text-purple-400 mb-2">Terapia</p>
              <p className="text-3xl font-black text-white">$14,400</p>
            </div>
            <div className="text-center">
              <p className="text-pink-400 mb-2">Compras Hogar</p>
              <p className="text-3xl font-black text-white">$18,900</p>
            </div>
          </div>

          <div className="border-t-4 border-cyan-500/40 pt-6 text-center">
            <p className="text-white/90 text-xl mb-2">Total Anual:</p>
            <p className="text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              $42,900
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-600 to-pink-600 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Todo esto por solo $1,500 al año
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Una inversión mínima para ahorros máximos en salud y bienestar
          </p>
          <button
            onClick={() => navigate('/page3')}
            className="bg-white text-cyan-600 px-8 py-4 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-white/50 transition-all transform hover:scale-105 inline-block"
          >
            Contratar Ahora
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
