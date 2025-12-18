import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Footer from '../components/Footer';

export default function PostTerms() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

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
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <img
            src="/saludcompartida logo WT.png"
            alt="SaludCompartida"
            className="h-16 cursor-pointer"
            onClick={() => navigate('/page4')}
          />
          <button
            onClick={() => navigate('/page4')}
            className="text-gray-600 hover:text-gray-900 font-medium text-2xl transition-colors"
          >
            Volver
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-2xl font-bold text-gray-900 mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            Lee cuidadosamente estos términos antes de usar SaludCompartida. Al usar nuestro servicio, aceptas estar sujeto a estos términos.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Última actualización: 7 de noviembre de 2025
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl shadow-lg p-6 sticky top-24 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 text-2xl">Índice</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      activeSection === section.id
                        ? 'bg-cyan-100 text-cyan-900 font-semibold'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-12">
            <section id="intro" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                1. ¿Qué es SaludCompartida?
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                SaludCompartida es una plataforma digital que ofrece a migrantes y sus familias en México, Centroamérica, Latinoamérica e India acceso a servicios de salud mediante suscripción mensual.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Nuestro servicio incluye consultas de telemedicina, consultas psicológicas y descuentos en farmacias afiliadas.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-6 rounded-r-lg">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-yellow-900 mb-2">
                      Importante: NO somos un seguro médico
                    </p>
                    <p className="text-yellow-800 text-sm leading-relaxed">
                      SaludCompartida NO es una póliza de seguro. Proporcionamos servicios de salud preventivos y ambulatorios mediante suscripción mensual. NO cubrimos hospitalización ni emergencias médicas graves.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="definitions" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                2. Definiciones clave
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-cyan-500 pl-4">
                  <h3 className="font-bold text-gray-900 mb-1">Usuario</h3>
                  <p className="text-gray-700 text-sm">
                    La persona que contrata la suscripción (migrante) y las personas designadas como usuarios del servicio en el país de destino (hasta 4 personas).
                  </p>
                </div>
                <div className="border-l-4 border-cyan-500 pl-4">
                  <h3 className="font-bold text-gray-900 mb-1">Suscripción</h3>
                  <p className="text-gray-700 text-sm">
                    El pago mensual recurrente que da acceso a todos los servicios de SaludCompartida.
                  </p>
                </div>
                <div className="border-l-4 border-cyan-500 pl-4">
                  <h3 className="font-bold text-gray-900 mb-1">Servicios</h3>
                  <p className="text-gray-700 text-sm">
                    El conjunto de beneficios de salud que proporciona SaludCompartida, incluyendo telemedicina, descuentos en farmacias y acceso con descuento a atención médica presencial.
                  </p>
                </div>
                <div className="border-l-4 border-cyan-500 pl-4">
                  <h3 className="font-bold text-gray-900 mb-1">Plataforma</h3>
                  <p className="text-gray-700 text-sm">
                    El sitio web, aplicación móvil y sistema WhatsApp a través del cual se accede a los servicios de SaludCompartida.
                  </p>
                </div>
              </div>
            </section>

            <section id="services" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                3. Descripción de servicios
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 border border-cyan-200">
                  <h3 className="font-bold text-gray-900 mb-2 text-2xl">Telemedicina 24/7</h3>
                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                    Consultas médicas ilimitadas por videollamada, teléfono o WhatsApp con profesionales certificados en México.
                  </p>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Atención médica general</li>
                    <li>• Prescripción electrónica cuando sea permitido</li>
                    <li>• Orientación sobre síntomas y tratamientos</li>
                    <li>• Recomendación de atención presencial cuando sea necesario</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-pink-200">
                  <h3 className="font-bold text-gray-900 mb-2 text-2xl">Descuentos en Farmacias</h3>
                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                    Acceso a descuentos de 40-75% en más de 1,700 farmacias afiliadas.
                  </p>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Red de más de 1,700 ubicaciones</li>
                    <li>• Descuentos aplicables con receta electrónica</li>
                    <li>• Medicamentos autorizados (excluyendo controlados)</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                  <h3 className="font-bold text-gray-900 mb-2 text-2xl">Terapia Psicológica</h3>
                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                    Acceso a sesiones de terapia psicológica con profesionales certificados.
                  </p>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Sesiones individuales por videollamada</li>
                    <li>• Profesionales con cédula certificada</li>
                    <li>• Tratamiento de ansiedad, depresión, estrés</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="subscription" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                4. Suscripción y pagos
              </h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-cyan-50 to-purple-50 rounded-xl p-6 border border-cyan-200">
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    <strong className="text-gray-900">Plan mensual:</strong> $12 USD/mes por cobertura para hasta 4 personas.
                  </p>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    <strong className="text-gray-900">Renovación automática:</strong> Tu suscripción se renueva automáticamente cada mes hasta que la canceles.
                  </p>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    <strong className="text-gray-900">Métodos de pago:</strong> Aceptamos tarjetas de crédito/débito procesadas a través de proveedores seguros como Stripe.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">Cancelación:</strong> Puedes cancelar en cualquier momento. El servicio permanecerá activo hasta el final del período pagado.
                  </p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                  <p className="text-yellow-900 font-semibold">
                    Importante: No ofrecemos reembolsos por períodos parciales. Si cancelas, el servicio estará disponible hasta el final del mes pagado.
                  </p>
                </div>
              </div>
            </section>

            <section id="usage" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                5. Uso aceptable de la plataforma
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-2xl">Te comprometes a:</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Proporcionar información precisa y actualizada</li>
                    <li>• Usar el servicio solo para fines legales y personales</li>
                    <li>• No compartir tu cuenta con terceros no autorizados</li>
                    <li>• Seguir las indicaciones médicas proporcionadas</li>
                    <li>• Respetar al personal médico y de soporte</li>
                  </ul>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
                  <h3 className="font-bold text-red-900 mb-3">Usos prohibidos:</h3>
                  <ul className="space-y-1 text-red-800 text-sm">
                    <li>• Uso fraudulento de códigos de descuento</li>
                    <li>• Consultas para obtener prescripciones indebidas</li>
                    <li>• Abuso del servicio de telemedicina</li>
                    <li>• Intentos de vulnerar la seguridad de la plataforma</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="privacy" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                6. Privacidad y protección de datos
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                El uso de nuestros servicios está sujeto a nuestra Política de Privacidad, que forma parte integral de estos términos.
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Cumplimos con la Ley Federal de Protección de Datos Personales (LFPDPPP)</li>
                <li>• Tus datos médicos están encriptados y protegidos</li>
                <li>• Solo personal autorizado accede a tu información</li>
                <li>• Puedes ejercer tus derechos ARCO en cualquier momento</li>
              </ul>
            </section>

            <section id="limitations" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                7. Limitaciones del servicio
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-2xl">Servicios NO cubiertos:</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Emergencias médicas que requieran atención inmediata presencial</li>
                    <li>• Cirugías y procedimientos invasivos</li>
                    <li>• Prescripción de medicamentos controlados</li>
                    <li>• Tratamientos experimentales o no aprobados</li>
                    <li>• Atención médica fuera de México</li>
                  </ul>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
                  <p className="text-red-900 font-semibold">
                    Importante: SaludCompartida no reemplaza la atención médica de emergencia. En caso de emergencia, llama al 911 o acude al hospital más cercano.
                  </p>
                </div>
              </div>
            </section>

            <section id="responsibilities" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                8. Responsabilidades y limitación de responsabilidad
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-2xl">Responsabilidad del usuario:</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Eres responsable de proporcionar información médica precisa y seguir las indicaciones médicas recibidas.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-2xl">Responsabilidad de SaludCompartida:</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Nos esforzamos por proporcionar servicios de calidad, pero no garantizamos resultados médicos específicos.
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                  <p className="text-blue-900 text-sm leading-relaxed">
                    <strong>Limitación de responsabilidad:</strong> SaludCompartida no será responsable por daños indirectos, incidentales o consecuentes derivados del uso del servicio, excepto donde la ley lo prohíba.
                  </p>
                </div>
              </div>
            </section>

            <section id="modifications" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                9. Modificaciones al servicio y términos
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Nos reservamos el derecho de:
              </p>
              <ul className="space-y-2 text-gray-700 text-sm mb-6">
                <li>• Modificar o discontinuar servicios con previo aviso</li>
                <li>• Actualizar estos términos y condiciones</li>
                <li>• Cambiar los precios de suscripción (notificando con 30 días de anticipación)</li>
              </ul>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>Notificación de cambios:</strong> Te notificaremos por correo electrónico sobre cambios importantes. El uso continuado del servicio después de los cambios constituye aceptación de los nuevos términos.
              </p>
            </section>

            <section id="jurisdiction" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                10. Ley aplicable y jurisdicción
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Estos términos se rigen por las leyes de los Estados Unidos Mexicanos.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Cualquier disputa relacionada con estos términos será resuelta en los tribunales competentes de México.
              </p>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2 text-2xl">Resolución de disputas:</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Antes de iniciar cualquier procedimiento legal, te comprometemos a intentar resolver cualquier disputa mediante negociación directa con nuestro equipo de soporte.
                </p>
              </div>
            </section>

          </div>
        </div>

        <div className="mt-12 text-center bg-gradient-to-r from-cyan-50 to-purple-50 rounded-2xl p-8 border border-cyan-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Preguntas sobre estos términos?
          </h3>
          <p className="text-gray-700 mb-6">
            Si tienes dudas o necesitas aclaraciones, nuestro equipo está aquí para ayudarte.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
            <a href="mailto:legal@saludcompartida.com" className="text-cyan-600 hover:text-cyan-700 font-semibold">
              📧 legal@saludcompartida.com
            </a>
            <span className="hidden md:inline text-gray-400">|</span>
            <a href="mailto:contacto@saludcompartida.com" className="text-cyan-600 hover:text-cyan-700 font-semibold">
              💬 contacto@saludcompartida.com
            </a>
          </div>
        </div>
      </div>

      <Footer variant="light" internalPage={true} />
    </div>
  );
}
