import TopNav from '../components/TopNav'
import Footer from '../components/Footer'

// Página Visión y Misión - Información corporativa
export default function VisionMision() {
  return (
    <main className="min-h-screen">
      <TopNav showMenu={true} hideUser={true} />
      
      <section className="relative bg-gradient-to-br from-gray-900 via-background to-gray-900 py-32 md:py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl font-bold mb-6 text-white">
            VISIÓN Y MISIÓN
          </h1>
        </div>

        {/* Visión */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-700/50 rounded-3xl p-10 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-lg md:text-3xl lg:text-4xl md:text-lg md:text-3xl lg:text-4xl font-bold text-cyan-400">
                  VISIÓN
                </h2>
              </div>
              
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-8">
                <p className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl text-white font-semibold leading-relaxed">
                  "Que ninguna familia que recibe remesas tenga que elegir entre medicinas o comida. Estamos aquí para que cuides a los tuyos desde donde estés."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Misión */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-700/50 rounded-3xl p-10 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h2 className="text-lg md:text-3xl lg:text-4xl md:text-lg md:text-3xl lg:text-4xl font-bold text-purple-400">
                  MISIÓN
                </h2>
              </div>
              
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-8">
                <p className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl text-white font-semibold leading-relaxed">
                  "Convertimos tu esfuerzo en protección real. Por una suscripción mensual, tu familia tiene doctor cuando lo necesita, medicinas a precio justo y la tranquilidad de saber que están cuidados—aunque estés lejos."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tagline final */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12 px-8 bg-gradient-to-r from-cyan-500/10 via-pink-500/10 to-purple-500/10 rounded-3xl border border-cyan-500/30">
            <p className="text-lg md:text-3xl lg:text-4xl md:text-lg md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
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
