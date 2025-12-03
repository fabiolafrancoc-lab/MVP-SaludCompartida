import TopNav from '../components/TopNav'
import Footer from '../components/Footer'

// Página Quienes Somos - Información corporativa
export default function QuienesSomos() {
  return (
    <main className="min-h-screen">
      <TopNav showMenu={true} logoSrc="/saludcompartida-dark-no-tagline.png" />
      
      <section className="relative bg-gradient-to-br from-gray-900 via-background to-gray-900 py-32 md:py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            QUIÉNES SOMOS
          </h1>
        </div>

        {/* Por qué existimos */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-3xl p-10 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6">
              Por qué existimos
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Creemos que la salud no debería depender de dónde naciste ni de cuánto ganas. Creemos que las familias que reciben remesas merecen la misma calidad de atención que cualquier otra. Creemos que cuidar a los tuyos desde lejos no debería ser un acto de heroísmo—debería ser posible.
            </p>
            <p className="text-xl md:text-2xl text-white font-semibold mt-6">
              Por eso creamos SaludCompartida.
            </p>
          </div>
        </div>

        {/* El peso que cargas */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 border-l-4 border-pink-500 rounded-r-3xl p-10 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-pink-400 mb-6">
              El peso que cargas
            </h2>
            <div className="space-y-4 text-lg md:text-xl text-gray-200 leading-relaxed">
              <p>
                Sabemos lo que sientes. No es solo el dinero—es la culpa de no estar ahí.
              </p>
              <p>
                Es la llamada a las 3 de la mañana preguntándote si tu mamá está bien. Es trabajar doble turno mientras te preguntas si tu papá pudo ver al doctor. Es mandar todo lo que puedes y aún así sentir que no alcanza. Es construir una vida aquí con el corazón partido allá.
              </p>
              <p className="text-xl md:text-2xl text-pink-300 font-semibold italic">
                "¿Y si se enferma y yo no estoy?" Esa pregunta te quita el sueño, la concentración, la paz.
              </p>
            </div>
          </div>
        </div>

        {/* Lo que hacemos */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-green-900/40 to-emerald-800/40 border border-green-700/50 rounded-2xl p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-6">
                Lo que hacemos
              </h2>
              <div className="space-y-4 text-lg md:text-xl text-gray-200 leading-relaxed">
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
          <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-700/50 rounded-3xl p-10 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Nuestro compromiso
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-6">
              No vendemos promesas. Construimos acceso real a salud de calidad para millones de personas que el sistema ha olvidado.
            </p>
            <p className="text-2xl md:text-3xl text-white font-bold leading-relaxed">
              No podemos acortar la distancia, pero sí podemos darte la tranquilidad de saber que están cuidados.
            </p>
            <p className="text-2xl md:text-3xl font-bold mt-6 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              Donde está SaludCompartida está tu Corazón.
            </p>
          </div>
        </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
