'use client';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Footer from '../components/Footer';

export default function ConfirmacionTerms() {
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
            onClick={() => navigate('/confirmacion')}
          />
          <button
            onClick={() => navigate('/confirmacion')}
            className="text-gray-600 hover:text-gray-900 font-medium text-base md:text-2xl lg:text-3xl transition-colors"
          >
            Volver
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-base md:text-2xl lg:text-3xl text-gray-600 max-w-3xl mx-auto">
            Lee cuidadosamente estos términos antes de usar SaludCompartida. Al usar nuestro servicio, aceptas estar sujeto a estos términos.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Última actualización: 7 de noviembre de 2025
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl shadow-lg p-6 sticky top-24 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 text-base md:text-2xl lg:text-3xl">Índice</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={'w-full text-left px-3 py-2 rounded-lg text-sm transition-all ' + (
                      activeSection === section.id
                        ? 'bg-cyan-100 text-cyan-900 font-semibold'
                        : 'text-gray-600 hover:bg-gray-100'
                    )}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-12">
            <section id="intro" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
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
                    <p className="font-bold text-yellow-900 mb-2">Importante: No somos un seguro médico</p>
                    <p className="text-yellow-800 text-sm">
                      SaludCompartida NO es un seguro de gastos médicos. No cubrimos hospitalizaciones, cirugías, ni tratamientos especializados. Somos un servicio de telemedicina, orientación psicológica y descuentos en medicamentos.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="definitions" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                2. Definiciones clave
              </h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-200">
                  <h3 className="font-bold text-gray-900 mb-2">Usuario o Suscriptor</h3>
                  <p className="text-gray-700 text-sm">La persona que contrata el servicio de SaludCompartida y paga la suscripción mensual.</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                  <h3 className="font-bold text-gray-900 mb-2">Familiar Beneficiario</h3>
                  <p className="text-gray-700 text-sm">Hasta 4 personas designadas por el suscriptor que pueden acceder a los servicios de telemedicina.</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-bold text-gray-900 mb-2">Telemedicina</h3>
                  <p className="text-gray-700 text-sm">Consultas médicas remotas realizadas por videollamada con médicos certificados disponibles 24/7.</p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
                  <h3 className="font-bold text-gray-900 mb-2">Receta Electrónica</h3>
                  <p className="text-gray-700 text-sm">Documento digital emitido por el médico durante la consulta que puede usarse en farmacias afiliadas.</p>
                </div>
              </div>
            </section>

            <section id="services" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                3. Descripción de servicios
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Tu suscripción a SaludCompartida incluye:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                  <div className="bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Telemedicina 24/7</h3>
                    <p className="text-gray-700 text-sm">Consultas ilimitadas con médicos generales por videollamada en cualquier momento del día o noche.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Consultas Psicológicas</h3>
                    <p className="text-gray-700 text-sm">2 sesiones mensuales con terapeutas certificados para apoyo emocional y salud mental.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-pink-50 p-4 rounded-lg border border-pink-200">
                  <div className="bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Descuentos en Farmacias</h3>
                    <p className="text-gray-700 text-sm">Hasta 85% de descuento en más de 68,000 farmacias afiliadas en México y Estados Unidos.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">4</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Cobertura Familiar</h3>
                    <p className="text-gray-700 text-sm">Agrega hasta 4 familiares que también pueden usar telemedicina y descuentos en farmacias.</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="subscription" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                4. Suscripción y pagos
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-base md:text-2xl lg:text-3xl">4.1 Costo y renovación</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• La suscripción tiene un costo de <strong>$25 USD mensuales</strong></li>
                    <li>• Se renueva automáticamente cada mes en la fecha de contratación</li>
                    <li>• Los pagos se procesan mediante tarjeta de crédito o débito</li>
                    <li>• Puedes cancelar en cualquier momento sin penalización</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-base md:text-2xl lg:text-3xl">4.2 Política de reembolsos</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• No ofrecemos reembolsos parciales del mes en curso</li>
                    <li>• Si cancelas, mantienes acceso hasta el final del período pagado</li>
                    <li>• Los reembolsos solo aplican en caso de cargos duplicados o errores del sistema</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-base md:text-2xl lg:text-3xl">4.3 Cambios de precio</h3>
                  <p className="text-gray-700 text-sm">
                    Nos reservamos el derecho de modificar el precio de la suscripción. Te notificaremos con 30 días de anticipación antes de aplicar cualquier cambio.
                  </p>
                </div>
              </div>
            </section>

            <section id="usage" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                5. Uso de la plataforma
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Compromisos del usuario:</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      <span>Proporcionar información veraz y actualizada</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      <span>Mantener la confidencialidad de tu código de acceso</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      <span>No compartir tu cuenta con personas no autorizadas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      <span>Usar el servicio de manera responsable y legal</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      <span>Respetar a los profesionales de la salud durante las consultas</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Prohibiciones:</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✗</span>
                      <span>Usar la plataforma para actividades ilegales</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✗</span>
                      <span>Intentar hackear o comprometer la seguridad del sistema</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✗</span>
                      <span>Acosar o amenazar al personal médico</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✗</span>
                      <span>Revender o comercializar tu suscripción</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="privacy" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                6. Privacidad y protección de datos
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Tu privacidad es nuestra prioridad. Recopilamos y procesamos tu información personal de acuerdo con nuestra Política de Privacidad y la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) de México.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 my-6 rounded-r-lg">
                <p className="text-blue-900 font-semibold mb-2">
                  Lee nuestra Política de Privacidad completa
                </p>
                <p className="text-blue-800 text-sm">
                  Para más detalles sobre cómo manejamos tus datos, consulta nuestro Aviso de Privacidad.
                </p>
              </div>
            </section>

            <section id="limitations" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                7. Limitaciones del servicio
              </h2>
              <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6 rounded-r-lg">
                <p className="text-red-900 font-bold mb-3">⚠️ Servicios que NO cubrimos:</p>
                <ul className="space-y-2 text-red-800 text-sm">
                  <li>• Emergencias médicas (llama al 911)</li>
                  <li>• Hospitalizaciones o cirugías</li>
                  <li>• Tratamientos oncológicos</li>
                  <li>• Diálisis o hemodiálisis</li>
                  <li>• Enfermedades crónicas preexistentes de alto costo</li>
                  <li>• Medicamentos controlados (solo orientación)</li>
                </ul>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">
                Nuestros médicos pueden orientarte, emitir recetas para medicamentos comunes y derivarte a especialistas cuando sea necesario, pero no sustituyen atención médica presencial en casos graves.
              </p>
            </section>

            <section id="responsibilities" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                8. Responsabilidades y limitación de responsabilidad
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">8.1 Responsabilidad de SaludCompartida</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    Nos comprometemos a:
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Proporcionar acceso a médicos certificados</li>
                    <li>• Mantener la plataforma funcionando adecuadamente</li>
                    <li>• Proteger tu información personal</li>
                    <li>• Procesar tus pagos de manera segura</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">8.2 Limitación de responsabilidad</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    SaludCompartida NO se hace responsable por diagnósticos incorrectos, tratamientos inadecuados o cualquier daño derivado del uso del servicio. Los médicos son profesionales independientes y cada uno es responsable de su práctica médica.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">8.3 Responsabilidad del usuario</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Eres responsable de seguir las indicaciones médicas, acudir a atención presencial cuando sea necesario y proporcionar información precisa durante las consultas.
                  </p>
                </div>
              </div>
            </section>

            <section id="modifications" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                9. Modificaciones a los términos
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Podemos actualizar estos Términos y Condiciones periódicamente. Te notificaremos de cambios importantes mediante:
              </p>
              <ul className="space-y-2 text-gray-700 text-sm mb-4">
                <li>• Correo electrónico a tu dirección registrada</li>
                <li>• Aviso en la plataforma al iniciar sesión</li>
                <li>• Actualización de la fecha en este documento</li>
              </ul>
              <p className="text-gray-700 text-sm leading-relaxed">
                Si continúas usando el servicio después de los cambios, se considera que aceptas los nuevos términos.
              </p>
            </section>

            <section id="jurisdiction" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                10. Ley aplicable y jurisdicción
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Estos términos se rigen por las leyes de los Estados Unidos Mexicanos y los Estados Unidos de América.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Cualquier disputa derivada de estos términos será resuelta mediante arbitraje o en los tribunales competentes de Phoenix, Arizona, Estados Unidos, o Ciudad de México, México, según corresponda.
              </p>
            </section>
          </div>
        </div>

        <div className="mt-12 text-center bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 border border-cyan-200">
          <h3 className="text-base md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            ¿Tienes preguntas sobre estos términos?
          </h3>
          <p className="text-gray-700 mb-6">
            Si tienes dudas o necesitas aclaraciones, contáctanos:
          </p>
          <div className="text-center">
            <a href="mailto:contact@saludcompartida.com" className="text-cyan-600 hover:text-cyan-700 font-semibold text-base md:text-2xl lg:text-3xl">
              💬 contact@saludcompartida.com
            </a>
          </div>
        </div>
      </div>

      <Footer variant="light" confirmacionPage={true} />
    </div>
  );
}
