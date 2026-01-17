'use client';

import TopNav from '../components/TopNav'
import Footer from '../components/Footer'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Página de Términos y Condiciones para PRESUSCRIPCIÓN
export default function Terms() {
  const navigate = useNavigate()
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
        {/* Botón Volver */}
        <div className="max-w-7xl mx-auto mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Volver</span>
          </button>
        </div>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-base md:text-2xl lg:text-3xl md:text-lg md:text-3xl lg:text-4xl font-bold mb-6 text-white">
              Términos y Condiciones
            </h1>
            <p className="text-lg md:text-3xl lg:text-4xl text-gray-300 max-w-3xl mx-auto mb-4">
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
                <h3 className="font-bold text-white mb-4 text-base md:text-2xl lg:text-3xl">Índice</h3>
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
                <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-white mb-6">
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
                <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-white mb-6">
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
                <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-white mb-6">
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
                        <h3 className="font-bold text-white mb-2 text-base md:text-2xl lg:text-3xl">Telemedicina 24/7</h3>
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
                        <h3 className="font-bold text-white mb-2 text-base md:text-2xl lg:text-3xl">Descuentos en Farmacias</h3>
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
                        <h3 className="font-bold text-white mb-2 text-base md:text-2xl lg:text-3xl">Terapia Psicológica</h3>
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

              {/* Sección 4: Suscripción y pagos */}
              <section id="subscription" className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 p-8">
                <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-white mb-6">
                  4. Suscripción y pagos
                </h2>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="font-bold text-white mb-2">Plan mensual:</h3>
                    <p className="text-sm">$12 USD/mes por cobertura para hasta 4 personas.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2">Renovación automática:</h3>
                    <p className="text-sm">Tu suscripción se renueva automáticamente cada mes hasta que la canceles.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2">Métodos de pago:</h3>
                    <p className="text-sm">Aceptamos tarjetas de crédito/débito procesadas a través de proveedores seguros como Stripe.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2">Cancelación:</h3>
                    <p className="text-sm">Puedes cancelar en cualquier momento. El servicio permanecerá activo hasta el final del período pagado.</p>
                  </div>
                  <div className="bg-orange-900/20 border border-orange-700/30 rounded-xl p-4 mt-4">
                    <p className="text-sm text-orange-300">
                      <strong>Importante:</strong> No ofrecemos reembolsos por períodos parciales. Si cancelas, el servicio estará disponible hasta el final del mes pagado.
                    </p>
                  </div>
                </div>
              </section>

              {/* Sección 5: Uso de la plataforma */}
              <section id="usage" className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 p-8">
                <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-white mb-6">
                  5. Uso aceptable de la plataforma
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-300">Te comprometes a:</p>
                  <ul className="space-y-2 text-gray-300 text-sm ml-4">
                    <li>• Proporcionar información precisa y actualizada</li>
                    <li>• Usar el servicio solo para fines legales y personales</li>
                    <li>• No compartir tu cuenta con terceros no autorizados</li>
                    <li>• Seguir las indicaciones médicas proporcionadas</li>
                    <li>• Respetar al personal médico y de soporte</li>
                  </ul>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-4 mt-4">
                    <h3 className="font-bold text-red-400 mb-2">Usos prohibidos:</h3>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• Uso fraudulento de códigos de descuento</li>
                      <li>• Consultas para obtener prescripciones indebidas</li>
                      <li>• Abuso del servicio de telemedicina</li>
                      <li>• Intentos de vulnerar la seguridad de la plataforma</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Sección 6: Privacidad y datos */}
              <section id="privacy" className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 p-8">
                <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-white mb-6">
                  6. Privacidad y protección de datos
                </h2>
                <p className="text-gray-300 mb-4">
                  El uso de nuestros servicios está sujeto a nuestra <a href="/privacy" className="text-cyan-400 hover:underline font-semibold">Política de Privacidad</a>, que forma parte integral de estos términos.
                </p>
                <div className="space-y-3 text-gray-300 text-sm">
                  <p>• Cumplimos con la Ley Federal de Protección de Datos Personales (LFPDPPP)</p>
                  <p>• Tus datos médicos están encriptados y protegidos</p>
                  <p>• Solo personal autorizado accede a tu información</p>
                  <p>• Puedes ejercer tus derechos ARCO en cualquier momento</p>
                </div>
              </section>

              {/* Sección 7: Limitaciones del servicio */}
              <section id="limitations" className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 p-8">
                <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-white mb-6">
                  7. Limitaciones del servicio
                </h2>
                <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-6 mb-4">
                  <h3 className="font-bold text-red-400 mb-3">Servicios NO cubiertos:</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Emergencias médicas que requieran atención inmediata presencial</li>
                    <li>• Cirugías y procedimientos invasivos</li>
                    <li>• Prescripción de medicamentos controlados</li>
                    <li>• Tratamientos experimentales o no aprobados</li>
                    <li>• Atención médica fuera de México</li>
                  </ul>
                </div>
                <p className="text-gray-300 text-sm">
                  <strong className="text-white">Importante:</strong> SaludCompartida no reemplaza la atención médica de emergencia. En caso de emergencia, llama al 911 o acude al hospital más cercano.
                </p>
              </section>

              {/* Sección 8: Responsabilidades */}
              <section id="responsibilities" className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 p-8">
                <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-white mb-6">
                  8. Responsabilidades y limitación de responsabilidad
                </h2>
                <div className="space-y-4 text-gray-300 text-sm">
                  <div>
                    <h3 className="font-bold text-white mb-2">Responsabilidad del usuario:</h3>
                    <p>Eres responsable de proporcionar información médica precisa y seguir las indicaciones médicas recibidas.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2">Responsabilidad de SaludCompartida:</h3>
                    <p>Nos esforzamos por proporcionar servicios de calidad, pero no garantizamos resultados médicos específicos.</p>
                  </div>
                  <div className="bg-gray-700/30 rounded-xl p-4">
                    <p>
                      <strong className="text-white">Limitación de responsabilidad:</strong> SaludCompartida no será responsable por daños indirectos, incidentales o consecuentes derivados del uso del servicio, excepto donde la ley lo prohíba.
                    </p>
                  </div>
                </div>
              </section>

              {/* Sección 9: Modificaciones */}
              <section id="modifications" className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 p-8">
                <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-white mb-6">
                  9. Modificaciones al servicio y términos
                </h2>
                <div className="space-y-4 text-gray-300">
                  <p>Nos reservamos el derecho de:</p>
                  <ul className="space-y-2 text-sm ml-4">
                    <li>• Modificar o discontinuar servicios con previo aviso</li>
                    <li>• Actualizar estos términos y condiciones</li>
                    <li>• Cambiar los precios de suscripción (notificando con 30 días de anticipación)</li>
                  </ul>
                  <div className="bg-cyan-900/20 border border-cyan-700/30 rounded-xl p-4">
                    <p className="text-sm">
                      <strong className="text-cyan-400">Notificación de cambios:</strong> Te notificaremos por correo electrónico sobre cambios importantes. El uso continuado del servicio después de los cambios constituye aceptación de los nuevos términos.
                    </p>
                  </div>
                </div>
              </section>

              {/* Sección 10: Ley aplicable */}
              <section id="jurisdiction" className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 p-8">
                <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-white mb-6">
                  10. Ley aplicable y jurisdicción
                </h2>
                <div className="space-y-4 text-gray-300 text-sm">
                  <p>
                    Estos términos se rigen por las leyes de los Estados Unidos Mexicanos.
                  </p>
                  <p>
                    Cualquier disputa relacionada con estos términos será resuelta en los tribunales competentes de México.
                  </p>
                  <div className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-4">
                    <h3 className="font-bold text-purple-400 mb-2">Resolución de disputas:</h3>
                    <p>
                      Antes de iniciar cualquier procedimiento legal, te comprometemos a intentar resolver cualquier disputa mediante negociación directa con nuestro equipo de soporte.
                    </p>
                  </div>
                </div>
              </section>

              {/* Sección de contacto final */}
              <div className="bg-gradient-to-r from-cyan-900/40 to-purple-900/40 backdrop-blur-md rounded-xl border border-cyan-700/30 p-8 text-center">
                <h3 className="text-base md:text-2xl lg:text-3xl font-bold text-white mb-4">¿Preguntas sobre estos términos?</h3>
                <p className="text-gray-300 mb-6">
                  Si tienes dudas o necesitas aclaraciones, nuestro equipo está aquí para ayudarte.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <a 
                    href="mailto:legal@saludcompartida.com"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                  >
                    📧 legal@saludcompartida.com
                  </a>
                  <a 
                    href="mailto:contacto@saludcompartida.com"
                    className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                  >
                    💬 contacto@saludcompartida.com
                  </a>
                </div>
              </div>

              {/* Nota final eliminada - documento completo */}

            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
