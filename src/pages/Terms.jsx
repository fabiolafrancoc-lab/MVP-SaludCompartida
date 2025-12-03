import TopNav from '../components/TopNav'
import Footer from '../components/Footer'
import { useState } from 'react'

// Página de Términos y Condiciones para PRESUSCRIPCIÓN
export default function Terms() {
  const [activeSection, setActiveSection] = useState('')

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(sectionId)
    }
  }

  const sections = [
    { id: 'intro', title: '1. ¿Qué es SaludCompartida?' },
    { id: 'definitions', title: '2. Definiciones clave' },
    { id: 'services', title: '3. Descripción de servicios' },
    { id: 'subscription', title: '4. Suscripción y pagos' },
    { id: 'usage', title: '5. Uso de la plataforma' },
    { id: 'privacy', title: '6. Privacidad y datos' },
    { id: 'limitations', title: '7. Limitaciones del servicio' },
    { id: 'responsibilities', title: '8. Responsabilidades' },
    { id: 'modifications', title: '9. Modificaciones' },
    { id: 'jurisdiction', title: '10. Ley aplicable' }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-background to-gray-900">
      <TopNav showMenu={true} hideUser={true} />
      
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Términos y Condiciones
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
              Lee cuidadosamente estos términos antes de usar SaludCompartida. Al usar nuestro servicio, aceptas estar sujeto a estos términos.
            </p>
            <p className="text-sm text-gray-400">
              Última actualización: 7 de noviembre de 2025
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Índice navegable */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 p-6 sticky top-28">
                <h3 className="font-bold text-white mb-4 text-lg">Índice</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        activeSection === section.id
                          ? 'bg-cyan-500/20 text-cyan-400 font-semibold border border-cyan-500/30'
                          : 'text-gray-300 hover:bg-gray-700/50'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Contenido principal */}
            <div className="lg:col-span-3 space-y-8">
              
              {/* Sección 1: Introducción */}
              <section id="intro" className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 p-8">
                <h2 className="text-3xl font-bold text-white mb-6">
                  1. ¿Qué es SaludCompartida?
                </h2>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  SaludCompartida es una plataforma digital que ofrece a migrantes y sus familias en México, Centroamérica, Latinoamérica e India acceso a servicios de salud mediante suscripción mensual.
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Nuestro servicio incluye consultas de telemedicina, consultas psicológicas y descuentos en farmacias afiliadas.
                </p>

                {/* Disclaimer importante */}
                <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-6 my-6 rounded-r-lg">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-semibold text-yellow-200 mb-2">
                        Importante: NO somos un seguro médico
                      </p>
                      <p className="text-yellow-300 text-sm leading-relaxed">
                        SaludCompartida NO es una póliza de seguro. Proporcionamos servicios de salud preventivos y ambulatorios mediante suscripción mensual. NO cubrimos hospitalización ni emergencias médicas graves.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sección 2: Definiciones */}
              <section id="definitions" className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 p-8">
                <h2 className="text-3xl font-bold text-white mb-6">
                  2. Definiciones clave
                </h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-cyan-500 pl-4">
                    <h3 className="font-bold text-white mb-1">Usuario</h3>
                    <p className="text-gray-300 text-sm">
                      La persona que contrata la suscripción (migrante) y las personas designadas como usuarios del servicio en el país de destino (hasta 4 personas).
                    </p>
                  </div>
                  <div className="border-l-4 border-cyan-500 pl-4">
                    <h3 className="font-bold text-white mb-1">Suscripción</h3>
                    <p className="text-gray-300 text-sm">
                      El pago mensual recurrente que da acceso a todos los servicios de SaludCompartida.
                    </p>
                  </div>
                  <div className="border-l-4 border-cyan-500 pl-4">
                    <h3 className="font-bold text-white mb-1">Servicios</h3>
                    <p className="text-gray-300 text-sm">
                      El conjunto de beneficios de salud que proporciona SaludCompartida, incluyendo telemedicina, descuentos en farmacias y acceso con descuento a atención médica presencial.
                    </p>
                  </div>
                  <div className="border-l-4 border-cyan-500 pl-4">
                    <h3 className="font-bold text-white mb-1">Plataforma</h3>
                    <p className="text-gray-300 text-sm">
                      El sitio web, aplicación móvil y sistema WhatsApp a través del cual se accede a los servicios de SaludCompartida.
                    </p>
                  </div>
                </div>
              </section>

              {/* Sección 3: Descripción de servicios */}
              <section id="services" className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 p-8">
                <h2 className="text-3xl font-bold text-white mb-6">
                  3. Descripción de servicios
                </h2>
                
                <div className="space-y-6">
                  {/* Telemedicina */}
                  <div className="bg-cyan-900/20 border border-cyan-700/30 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <svg className="w-8 h-8 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <h3 className="font-bold text-white mb-2 text-lg">Telemedicina 24/7</h3>
                        <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                          Consultas médicas ilimitadas por videollamada, teléfono o WhatsApp con profesionales certificados en México.
                        </p>
                        <ul className="text-gray-400 text-sm space-y-1">
                          <li>• Atención médica general</li>
                          <li>• Prescripción electrónica cuando sea permitido</li>
                          <li>• Orientación sobre síntomas y tratamientos</li>
                          <li>• Recomendación de atención presencial cuando sea necesario</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Descuentos en Farmacias */}
                  <div className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <svg className="w-8 h-8 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <div>
                        <h3 className="font-bold text-white mb-2 text-lg">Descuentos en Farmacias</h3>
                        <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                          Acceso a descuentos de 40-75% en más de 1,700 farmacias afiliadas.
                        </p>
                        <ul className="text-gray-400 text-sm space-y-1">
                          <li>• Red de más de 1,700 ubicaciones</li>
                          <li>• Descuentos aplicables con receta electrónica</li>
                          <li>• Medicamentos autorizados (excluyendo controlados)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Terapia Psicológica */}
                  <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <svg className="w-8 h-8 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h3 className="font-bold text-white mb-2 text-lg">Terapia Psicológica</h3>
                        <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                          Acceso a sesiones de terapia psicológica con profesionales certificados.
                        </p>
                        <ul className="text-gray-400 text-sm space-y-1">
                          <li>• Sesiones individuales por videollamada</li>
                          <li>• Profesionales con cédula certificada</li>
                          <li>• Tratamiento de ansiedad, depresión, estrés</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Nota final */}
              <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 p-6">
                <p className="text-gray-300 text-sm text-center">
                  Para ver los términos completos, contacta a nuestro equipo de soporte.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
