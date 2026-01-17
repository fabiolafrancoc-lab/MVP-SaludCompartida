import TopNav from '../components/TopNav'
import Footer from '../components/Footer'

// Página Quienes Somos - VERSIÓN POST-SUSCRIPCIÓN (vuelve a /page4)
export default function QuienesSomosInternal() {
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
            QUIÉNES SOMOS
          </h1>
        </div>

        {/* Por qué existimos */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-3xl p-10 md:p-12 shadow-lg">
            <h2 className="text-lg md:text-3xl lg:text-4xl md:text-lg md:text-3xl lg:text-4xl font-bold text-cyan-600 mb-6">
              Por qué existimos
            </h2>
            <p className="text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl text-gray-700 leading-relaxed">
              Creemos que la salud no debería depender de dónde naciste ni de cuánto ganas. Creemos que las familias que reciben remesas merecen la misma calidad de atención que cualquier otra. Creemos que cuidar a los tuyos desde lejos no debería ser un acto de heroísmo—debería ser posible.
            </p>
            <p className="text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl text-gray-900 font-semibold mt-6">
              Por eso creamos SaludCompartida.
            </p>
          </div>
        </div>

        {/* El peso que cargas */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-pink-50 to-red-50 border-l-4 border-pink-500 rounded-r-3xl p-10 md:p-12 shadow-lg">
            <h2 className="text-lg md:text-3xl lg:text-4xl md:text-lg md:text-3xl lg:text-4xl font-bold text-pink-600 mb-6">
              El peso que cargas
            </h2>
            <div className="space-y-4 text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl text-gray-700 leading-relaxed">
              <p>
                Sabemos lo que sientes. No es solo el dinero—es la culpa de no estar ahí.
              </p>
              <p>
                Es la llamada a las 3 de la mañana preguntándote si tu mamá está bien. Es trabajar doble turno mientras te preguntas si tu papá pudo ver al doctor. Es mandar todo lo que puedes y aún así sentir que no alcanza. Es construir una vida aquí con el corazón partido allá.
              </p>
              <p className="text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl text-pink-700 font-semibold italic">
                "¿Y si se enferma y yo no estoy?" Esa pregunta te quita el sueño, la concentración, la paz.
              </p>
            </div>
          </div>
        </div>

        {/* Lo que hacemos */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-10 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full blur-3xl"></div>
            <div className="relative">
              <h2 className="text-lg md:text-3xl lg:text-4xl md:text-lg md:text-3xl lg:text-4xl font-bold text-green-600 mb-6">
                Lo que hacemos
              </h2>
              <div className="space-y-4 text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl text-gray-700 leading-relaxed">
                <p>
                  Desarrollamos la tecnología que conecta a tu familia con los mejores proveedores de salud—aquellos que cumplen con los más altos estándares de calidad. Hoy ofrecemos telemedicina 24/7, descuentos en farmacias y acceso a terapeutas y psicólogos certificados.
                </p>
                <p>
                  Pronto incorporaremos descuentos en consultas con doctores generales, especialistas y exámenes médicos ambulatorios, siempre a través de alianzas con proveedores destacados en cada país donde operamos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Nuestro compromiso */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-3xl p-10 md:p-12 text-center shadow-lg">
            <h2 className="text-lg md:text-3xl lg:text-4xl md:text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Nuestro compromiso
            </h2>
            <p className="text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl text-gray-700 leading-relaxed mb-6">
              No vendemos promesas. Construimos acceso real a salud de calidad para millones de personas que el sistema ha olvidado.
            </p>
            <p className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl text-gray-900 font-bold leading-relaxed">
              No podemos acortar la distancia, pero sí podemos darte la tranquilidad de saber que están cuidados.
            </p>
            <p className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl font-bold mt-6 bg-gradient-to-r from-cyan-600 to-pink-600 bg-clip-text text-transparent">
              Donde está SaludCompartida está tu Corazón.
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
