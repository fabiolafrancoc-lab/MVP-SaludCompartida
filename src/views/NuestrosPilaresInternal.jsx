'use client';

import TopNav from '../components/TopNav'
import Footer from '../components/Footer'

// Página Nuestros Pilares - VERSIÓN POST-SUSCRIPCIÓN (vuelve a /page4)
export default function NuestrosPilaresInternal() {
  return (
    <main className="min-h-screen bg-white">
      <TopNav 
        internalPage={true}
        showBackButton={true}
        logoSrc="/saludcompartida logo WT.png"
      />
      
      <section className="relative bg-white py-32 md:py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
            NUESTROS PILARES
          </h1>
          <p className="text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl text-gray-700">
            Los valores fundamentales que guían nuestra misión
          </p>
        </div>

        {/* Pilares Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Pilar 1 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-10 relative overflow-hidden group hover:scale-105 transition-transform shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl font-bold text-green-600">
                    01
                  </h3>
                </div>
                <h2 className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Equidad al Acceso de Salud
                </h2>
                <p className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl text-gray-700 leading-relaxed">
                  Atención médica de calidad para tu familia, sin importar dónde vivan o cuánto ganen
                </p>
              </div>
            </div>

            {/* Pilar 2 */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-3xl p-10 relative overflow-hidden group hover:scale-105 transition-transform shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-100 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl font-bold text-cyan-600">
                    02
                  </h3>
                </div>
                <h2 className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Integración de Segmentos Desprotegidos
                </h2>
                <p className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl text-gray-700 leading-relaxed">
                  Servimos a quienes el sistema ha ignorado—las familias que trabajan duro y merecen ser atendidas
                </p>
              </div>
            </div>

            {/* Pilar 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-3xl p-10 relative overflow-hidden group hover:scale-105 transition-transform shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl font-bold text-purple-600">
                    03
                  </h3>
                </div>
                <h2 className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Precio Justo
                </h2>
                <p className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl text-gray-700 leading-relaxed">
                  Salud accesible sin sorpresas, sin letra chiquita, sin que tengas que elegir entre comer o curarte
                </p>
              </div>
            </div>

            {/* Pilar 4 */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-3xl p-10 relative overflow-hidden group hover:scale-105 transition-transform shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl font-bold text-orange-600">
                    04
                  </h3>
                </div>
                <h2 className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Modelo Sostenible
                </h2>
                <p className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl text-gray-700 leading-relaxed">
                  Un servicio sólido que estará aquí hoy, mañana y siempre que tu familia lo necesite
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje final */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="text-center py-12 px-8 bg-gradient-to-r from-cyan-50 via-pink-50 to-purple-50 rounded-3xl border border-cyan-200 shadow-lg">
            <p className="text-lg md:text-3xl lg:text-4xl md:text-lg md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Donde está tu corazón, está SaludCompartida.
            </p>
          </div>
        </div>

        {/* Botón Volver inferior */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              window.location.href = '/page4';
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </button>
        </div>
        </div>
      </section>

      <Footer variant="light" internalPage={true} />
    </main>
  )
}
