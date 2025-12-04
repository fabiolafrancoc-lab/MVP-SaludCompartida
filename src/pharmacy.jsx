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
        </div>

        {/* Sección de Código QR */}
        <div className="bg-gradient-to-br from-cyan-900/40 to-purple-900/40 backdrop-blur-md rounded-2xl p-8 mb-16 border border-cyan-500/30 shadow-xl">
          <h2 className="text-3xl font-black text-white mb-8 text-center">
            Obtén tu Código QR de Descuentos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center">
              <div className="bg-white p-6 rounded-2xl inline-block mb-4 shadow-2xl">
                <div className="w-48 h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
                  <svg className="w-32 h-32 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-400 text-sm italic">Tu código QR personal</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-500/20 p-3 rounded-xl flex-shrink-0">
                  <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Recíbelo por WhatsApp</h3>
                  <p className="text-gray-300">Te enviaremos tu código QR personalizado directamente a tu WhatsApp</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-500/20 p-3 rounded-xl flex-shrink-0">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">O usa tu Tarjeta Digital</h3>
                  <p className="text-gray-300">También puedes presentar tu tarjeta digital de SaludCompartida</p>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
                <p className="text-cyan-300 font-semibold text-center">
                  💡 Presenta tu código QR o tarjeta en cualquiera de nuestras +1,700 farmacias afiliadas
                </p>
              </div>
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
            ¿Listo para Contratar SaludCompartida?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Obtén acceso inmediato a todos tus descuentos y beneficios
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
