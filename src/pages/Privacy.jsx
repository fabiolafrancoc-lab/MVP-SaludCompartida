import TopNav from '../components/TopNav'
import Footer from '../components/Footer'
import { useState } from 'react'

// Página de Política de Privacidad para PRESUSCRIPCIÓN
export default function Privacy() {
  const [activeSection, setActiveSection] = useState('')

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(sectionId)
    }
  }

  const sections = [
    { id: 'intro', title: '1. Introducción' },
    { id: 'responsible', title: '2. Responsable del tratamiento' },
    { id: 'data-collection', title: '3. Datos que recopilamos' },
    { id: 'purpose', title: '4. Finalidades del tratamiento' },
    { id: 'legal-basis', title: '5. Fundamento legal' },
    { id: 'data-transfer', title: '6. Transferencia de datos' },
    { id: 'arco-rights', title: '7. Derechos ARCO' },
    { id: 'security', title: '8. Seguridad de datos' },
    { id: 'cookies', title: '9. Cookies y tecnologías' },
    { id: 'minors', title: '10. Menores de edad' },
    { id: 'changes', title: '11. Cambios al aviso' }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-background to-gray-900">
      <TopNav showMenu={true} hideUser={true} />
      
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Política de Privacidad
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
              Tu privacidad es fundamental para nosotros. Este aviso describe cómo recopilamos, usamos y protegemos tu información personal.
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
                          ? 'bg-purple-500/20 text-purple-400 font-semibold border border-purple-500/30'
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
                  1. Introducción
                </h2>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  SaludCompartida respeta tu privacidad y se compromete a proteger tus datos personales. Este Aviso de Privacidad cumple con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) de México.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Al usar nuestros servicios, aceptas las prácticas descritas en este aviso.
                </p>
              </section>

              {/* Sección 2: Responsable */}
              <section id="responsible" className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 p-8">
                <h2 className="text-3xl font-bold text-white mb-6">
                  2. Responsable del tratamiento
                </h2>
                <div className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-6">
                  <p className="text-gray-300 mb-3">
                    <strong className="text-white">Razón social:</strong> SaludCompartida
                  </p>
                  <p className="text-gray-300 mb-3">
                    <strong className="text-white">Domicilio:</strong> Phoenix, Arizona, Estados Unidos
                  </p>
                  <p className="text-gray-300">
                    <strong className="text-white">Contacto:</strong> privacidad@saludcompartida.com
                  </p>
                </div>
              </section>

              {/* Sección 3: Datos que recopilamos */}
              <section id="data-collection" className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 p-8">
                <h2 className="text-3xl font-bold text-white mb-6">
                  3. Datos que recopilamos
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-white mb-2">Datos de identificación:</h3>
                    <ul className="text-gray-300 text-sm space-y-1 ml-4">
                      <li>• Nombre completo</li>
                      <li>• Fecha de nacimiento</li>
                      <li>• Número de teléfono</li>
                      <li>• Correo electrónico</li>
                      <li>• Dirección física</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2">Datos de salud:</h3>
                    <ul className="text-gray-300 text-sm space-y-1 ml-4">
                      <li>• Historial médico</li>
                      <li>• Síntomas reportados</li>
                      <li>• Diagnósticos y tratamientos</li>
                      <li>• Recetas médicas</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2">Datos de pago:</h3>
                    <ul className="text-gray-300 text-sm space-y-1 ml-4">
                      <li>• Información de tarjeta (procesada por terceros seguros)</li>
                      <li>• Historial de transacciones</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Sección 4: Finalidades */}
              <section id="purpose" className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 p-8">
                <h2 className="text-3xl font-bold text-white mb-6">
                  4. Finalidades del tratamiento
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-300 text-sm">Proporcionar servicios de telemedicina y consultas médicas</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-300 text-sm">Procesar pagos y gestionar suscripciones</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-300 text-sm">Emitir recetas electrónicas y coordinar con farmacias</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-300 text-sm">Comunicarte información relevante sobre tu salud y suscripción</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-300 text-sm">Mejorar nuestros servicios mediante análisis estadísticos</p>
                  </div>
                </div>
              </section>

              {/* Sección 7: Derechos ARCO */}
              <section id="arco-rights" className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 p-8">
                <h2 className="text-3xl font-bold text-white mb-6">
                  7. Derechos ARCO
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Tienes derecho a:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-cyan-900/20 border border-cyan-700/30 rounded-xl p-4">
                    <h3 className="font-bold text-cyan-400 mb-2">Acceso</h3>
                    <p className="text-gray-300 text-sm">Conocer qué datos personales tenemos sobre ti</p>
                  </div>
                  <div className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-4">
                    <h3 className="font-bold text-purple-400 mb-2">Rectificación</h3>
                    <p className="text-gray-300 text-sm">Corregir tus datos si son inexactos</p>
                  </div>
                  <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-4">
                    <h3 className="font-bold text-green-400 mb-2">Cancelación</h3>
                    <p className="text-gray-300 text-sm">Solicitar que eliminemos tus datos</p>
                  </div>
                  <div className="bg-orange-900/20 border border-orange-700/30 rounded-xl p-4">
                    <h3 className="font-bold text-orange-400 mb-2">Oposición</h3>
                    <p className="text-gray-300 text-sm">Oponerte al tratamiento de tus datos</p>
                  </div>
                </div>
                <div className="mt-6 bg-gray-700/30 rounded-xl p-4">
                  <p className="text-gray-300 text-sm">
                    <strong className="text-white">Para ejercer tus derechos:</strong> Envía un correo a <a href="mailto:privacidad@saludcompartida.com" className="text-cyan-400 hover:underline">privacidad@saludcompartida.com</a>
                  </p>
                </div>
              </section>

              {/* Sección 8: Seguridad */}
              <section id="security" className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 p-8">
                <h2 className="text-3xl font-bold text-white mb-6">
                  8. Seguridad de datos
                </h2>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Implementamos medidas de seguridad administrativas, técnicas y físicas para proteger tus datos personales:
                </p>
                <ul className="text-gray-300 text-sm space-y-2 ml-4">
                  <li>• Encriptación de datos sensibles</li>
                  <li>• Acceso restringido solo a personal autorizado</li>
                  <li>• Auditorías de seguridad periódicas</li>
                  <li>• Servidores seguros con certificados SSL</li>
                  <li>• Cumplimiento con estándares internacionales de protección de datos</li>
                </ul>
              </section>

              {/* Nota final */}
              <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 p-6">
                <p className="text-gray-300 text-sm text-center">
                  Para ver la política completa de privacidad, contacta a nuestro equipo en <a href="mailto:privacidad@saludcompartida.com" className="text-cyan-400 hover:underline">privacidad@saludcompartida.com</a>
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
