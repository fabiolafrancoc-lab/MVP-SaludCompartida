import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from './components/TopNav';
import Footer from './components/Footer';

export default function Pharmacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <TopNav showMenu={true} hideUser={true} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-full mb-6 shadow-lg shadow-cyan-500/50">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="text-white">Descuentos en</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              Farmacias
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
            <span className="font-bold text-cyan-400">40% a 75% de descuento</span> en medicamentos y productos de farmacia
          </p>

          {/* Badges de farmacias */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/40 px-6 py-3 rounded-xl">
              <span className="text-lg font-bold text-white">Farmacias del Ahorro</span>
            </div>
            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/40 px-6 py-3 rounded-xl">
              <span className="text-lg font-bold text-white">Farmacias Guadalajara</span>
            </div>
            <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/40 px-6 py-3 rounded-xl">
              <span className="text-lg font-bold text-white">Farmacias Benavides</span>
            </div>
          </div>
        </div>

        {/* CATEGORÍAS DE PRODUCTOS */}
        <div className="mb-16">
          <h2 className="text-4xl font-black text-white mb-12 text-center">
            Descuentos en Todo lo que Necesitas
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* PRODUCTOS FARMACÉUTICOS */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-cyan-500/30 hover:border-cyan-400 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-cyan-500/20 p-4 rounded-xl">
                  <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Productos Farmacéuticos</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-cyan-400 font-black text-xl">✓</span> 
                  <span className="font-semibold">Medicamentos con receta</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-cyan-400 font-black text-xl">✓</span> 
                  <span className="font-semibold">Medicamentos de libre venta</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-cyan-400 font-black text-xl">✓</span> 
                  <span className="font-semibold">Vitaminas y suplementos</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-cyan-400 font-black text-xl">✓</span> 
                  <span className="font-semibold">Material de curación</span>
                </li>
              </ul>
            </div>

            {/* PRODUCTOS NO FARMACÉUTICOS */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-pink-500/30 hover:border-pink-400 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-pink-500/20 p-4 rounded-xl">
                  <svg className="w-12 h-12 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Productos del Hogar</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-pink-400 font-black text-xl">✓</span> 
                  <span className="font-semibold">Cosméticos y maquillaje</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-pink-400 font-black text-xl">✓</span> 
                  <span className="font-semibold">Productos de higiene</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-pink-400 font-black text-xl">✓</span> 
                  <span className="font-semibold">Bebidas y snacks</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <span className="text-pink-400 font-black text-xl">✓</span> 
                  <span className="font-semibold">Pañales, leche y mucho más!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA para obtener descuentos */}
        <div className="bg-gradient-to-r from-cyan-600 to-pink-600 rounded-3xl p-12 text-center shadow-2xl mb-16">
          <h2 className="text-4xl font-black text-white mb-6">
            ¿Listo para ahorrar hasta 75%?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Obtén tu tarjeta de descuentos y empieza a ahorrar en todas tus compras
          </p>
          <button
            onClick={() => navigate('/page3')}
            className="bg-white text-cyan-600 px-12 py-6 rounded-2xl text-2xl font-bold shadow-2xl hover:shadow-white/50 transition-all transform hover:scale-105"
          >
            Obtener Mi Tarjeta
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
