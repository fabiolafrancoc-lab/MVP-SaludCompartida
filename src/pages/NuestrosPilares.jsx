import TopNav from '../components/TopNav'
import Footer from '../components/Footer'

// Página Nuestros Pilares - Información corporativa
export default function NuestrosPilares() {
  return (
    <main className="min-h-screen">
      <TopNav showMenu={true} hideUser={true} />
      
      <section className="relative bg-gradient-to-br from-gray-900 via-background to-gray-900 py-32 md:py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-lg md:text-base font-bold mb-6 text-white">
            NUESTROS PILARES
          </h1>
          <p className="text-base md:text-lg text-gray-300">
            Los valores fundamentales que guían nuestra misión
          </p>
        </div>

        {/* Pilares Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Pilar 1 */}
            <div className="bg-gradient-to-br from-green-900/40 to-emerald-800/40 border border-green-700/50 rounded-3xl p-10 relative overflow-hidden group hover:scale-105 transition-transform">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-base font-bold text-green-400">
                    01
                  </h3>
                </div>
                <h2 className="text-lg md:text-base font-bold text-white mb-4">
                  Equidad al Acceso de Salud
                </h2>
                <p className="text-lg md:text-base text-gray-200 leading-relaxed">
                  Atención médica de calidad para tu familia, sin importar dónde vivan o cuánto ganen
                </p>
              </div>
            </div>

            {/* Pilar 2 */}
            <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-700/50 rounded-3xl p-10 relative overflow-hidden group hover:scale-105 transition-transform">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-base font-bold text-cyan-400">
                    02
                  </h3>
                </div>
                <h2 className="text-lg md:text-base font-bold text-white mb-4">
                  Integración de Segmentos Desprotegidos
                </h2>
                <p className="text-lg md:text-base text-gray-200 leading-relaxed">
                  Servimos a quienes el sistema ha ignorado—las familias que trabajan duro y merecen ser atendidas
                </p>
              </div>
            </div>

            {/* Pilar 3 */}
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-700/50 rounded-3xl p-10 relative overflow-hidden group hover:scale-105 transition-transform">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-base font-bold text-purple-400">
                    03
                  </h3>
                </div>
                <h2 className="text-lg md:text-base font-bold text-white mb-4">
                  Precio Justo
                </h2>
                <p className="text-lg md:text-base text-gray-200 leading-relaxed">
                  Salud accesible sin sorpresas, sin letra chiquita, sin que tengas que elegir entre comer o curarte
                </p>
              </div>
            </div>

            {/* Pilar 4 */}
            <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 border border-orange-700/50 rounded-3xl p-10 relative overflow-hidden group hover:scale-105 transition-transform">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-base font-bold text-orange-400">
                    04
                  </h3>
                </div>
                <h2 className="text-lg md:text-base font-bold text-white mb-4">
                  Modelo Sostenible
                </h2>
                <p className="text-lg md:text-base text-gray-200 leading-relaxed">
                  Un servicio sólido que estará aquí hoy, mañana y siempre que tu familia lo necesite
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje final */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="text-center py-12 px-8 bg-gradient-to-r from-cyan-500/10 via-pink-500/10 to-purple-500/10 rounded-3xl border border-cyan-500/30">
            <p className="text-base md:text-base font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Donde está tu corazón, está SaludCompartida.
            </p>
          </div>
        </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
