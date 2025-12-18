import TopNav from '../components/TopNav'
import Footer from '../components/Footer'

// Página Visión y Misión - VERSIÓN POST-SUSCRIPCIÓN (vuelve a /page4)
export default function VisionMisionInternal() {
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
            VISIÓN Y MISIÓN
          </h1>
        </div>

        {/* Visión */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-3xl p-10 md:p-12 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-100 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-lg md:text-3xl lg:text-4xl md:text-lg md:text-3xl lg:text-4xl font-bold text-cyan-600">
                  VISIÓN
                </h2>
              </div>
              
              <div className="bg-white border border-cyan-200 rounded-2xl p-8 shadow-sm">
                <p className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl text-gray-900 font-semibold leading-relaxed">
                  "Que ninguna familia que recibe remesas tenga que elegir entre medicinas o comida. Estamos aquí para que cuides a los tuyos desde donde estés."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Misión */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-3xl p-10 md:p-12 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h2 className="text-lg md:text-3xl lg:text-4xl md:text-lg md:text-3xl lg:text-4xl font-bold text-purple-600">
                  MISIÓN
                </h2>
              </div>
              
              <div className="bg-white border border-purple-200 rounded-2xl p-8 shadow-sm">
                <p className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl text-gray-900 font-semibold leading-relaxed">
                  "Convertimos tu esfuerzo en protección real. Por una suscripción mensual, tu familia tiene doctor cuando lo necesita, medicinas a precio justo y la tranquilidad de saber que están cuidados—aunque estés lejos."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tagline final */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12 px-8 bg-gradient-to-r from-cyan-50 via-pink-50 to-purple-50 rounded-3xl border border-cyan-200 shadow-lg">
            <p className="text-lg md:text-3xl lg:text-4xl md:text-lg md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Donde está tu corazón, está SaludCompartida.
            </p>
          </div>
        </div>
        </div>
      </section>

      <Footer internalPage={true} />
    </main>
  )
}
