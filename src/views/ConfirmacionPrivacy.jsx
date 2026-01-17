'use client';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Footer from '../components/Footer';

export default function ConfirmacionPrivacy() {
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
    { id: 'intro', title: '1. Introducción' },
    { id: 'responsible', title: '2. Responsable del tratamiento' },
    { id: 'data-collection', title: '3. Datos que recopilamos' },
    { id: 'purposes', title: '4. Finalidades del tratamiento' },
    { id: 'legal-basis', title: '5. Fundamento legal' },
    { id: 'transfers', title: '6. Transferencia de datos' },
    { id: 'arco-rights', title: '7. Derechos ARCO' },
    { id: 'security', title: '8. Seguridad de datos' },
    { id: 'cookies', title: '9. Cookies y tecnologías' },
    { id: 'minors', title: '10. Menores de edad' },
    { id: 'changes', title: '11. Cambios al aviso' }
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
            Política de Privacidad
          </h1>
          <p className="text-base md:text-2xl lg:text-3xl text-gray-600 max-w-3xl mx-auto">
            Tu privacidad es fundamental para nosotros. Este aviso describe cómo recopilamos, usamos y protegemos tu información personal.
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
                        ? 'bg-purple-100 text-purple-900 font-semibold'
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
                1. Introducción
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                SaludCompartida respeta tu privacidad y se compromete a proteger tus datos personales. Este Aviso de Privacidad cumple con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) de México.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Al usar nuestros servicios, aceptas las prácticas descritas en este aviso.
              </p>
            </section>

            <section id="responsible" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                2. Responsable del tratamiento
              </h2>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <div className="space-y-3 text-gray-700">
                  <p><strong className="text-gray-900">Razón social:</strong> SaludCompartida</p>
                  <p><strong className="text-gray-900">Domicilio:</strong> Phoenix, Arizona, Estados Unidos</p>
                  <p><strong className="text-gray-900">Contacto:</strong> <a href="mailto:privacidad@saludcompartida.com" className="text-purple-600 hover:text-purple-700">privacidad@saludcompartida.com</a></p>
                </div>
              </div>
            </section>

            <section id="data-collection" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                3. Datos que recopilamos
              </h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 border border-cyan-200">
                  <h3 className="font-bold text-gray-900 mb-3 text-base md:text-2xl lg:text-3xl">Datos de identificación:</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Nombre completo</li>
                    <li>• Fecha de nacimiento</li>
                    <li>• Número de teléfono</li>
                    <li>• Correo electrónico</li>
                    <li>• Dirección física</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                  <h3 className="font-bold text-gray-900 mb-3 text-base md:text-2xl lg:text-3xl">Datos de salud:</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Historial médico</li>
                    <li>• Síntomas reportados</li>
                    <li>• Diagnósticos y tratamientos</li>
                    <li>• Recetas médicas</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border border-pink-200">
                  <h3 className="font-bold text-gray-900 mb-3 text-base md:text-2xl lg:text-3xl">Datos de pago:</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Información de tarjeta (procesada por terceros seguros)</li>
                    <li>• Historial de transacciones</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="purposes" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                4. Finalidades del tratamiento
              </h2>
              <ul className="space-y-3 text-gray-700 text-sm">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span>Proporcionar servicios de telemedicina y consultas médicas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span>Procesar pagos y gestionar suscripciones</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span>Emitir recetas electrónicas y coordinar con farmacias</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span>Comunicarte información relevante sobre tu salud y suscripción</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span>Mejorar nuestros servicios mediante análisis estadísticos</span>
                </li>
              </ul>
            </section>

            <section id="legal-basis" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                5. Fundamento legal
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                El tratamiento de tus datos personales se fundamenta en:
              </p>
              <ul className="space-y-3 text-gray-700 text-sm">
                <li className="border-l-4 border-purple-500 pl-4">
                  Tu consentimiento expreso al registrarte en nuestros servicios
                </li>
                <li className="border-l-4 border-purple-500 pl-4">
                  La ejecución del contrato de servicios que celebras con nosotros
                </li>
                <li className="border-l-4 border-purple-500 pl-4">
                  El cumplimiento de obligaciones legales aplicables
                </li>
                <li className="border-l-4 border-purple-500 pl-4">
                  Nuestro interés legítimo en mejorar y personalizar nuestros servicios
                </li>
              </ul>
            </section>

            <section id="transfers" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                6. Transferencia de datos
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Podemos transferir tus datos personales a terceros en los siguientes casos:
              </p>

              <div className="space-y-4">
                <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
                  <h3 className="font-bold text-gray-900 mb-2">Proveedores de servicios médicos</h3>
                  <p className="text-gray-600 text-sm">Doctores, especialistas y personal médico autorizado que proporcionan atención.</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <h3 className="font-bold text-gray-900 mb-2">Farmacias asociadas</h3>
                  <p className="text-gray-600 text-sm">Para procesar descuentos y surtir recetas médicas.</p>
                </div>

                <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                  <h3 className="font-bold text-gray-900 mb-2">Procesadores de pago</h3>
                  <p className="text-gray-600 text-sm">Servicios como Stripe para procesar transacciones de manera segura.</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-bold text-gray-900 mb-2">Proveedores tecnológicos</h3>
                  <p className="text-gray-600 text-sm">Servicios de almacenamiento en la nube y comunicaciones (AWS, Twilio, etc.).</p>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-6 rounded-r-lg">
                <p className="text-yellow-900 font-semibold">
                  Importante: Todos los terceros están obligados contractualmente a proteger tus datos y solo pueden usarlos para los fines autorizados.
                </p>
              </div>
            </section>

            <section id="arco-rights" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                7. Derechos ARCO
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Tienes derecho a:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-4 border border-cyan-200">
                  <h3 className="font-bold text-gray-900 mb-2">Acceso</h3>
                  <p className="text-gray-600 text-sm">Conocer qué datos personales tenemos sobre ti</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                  <h3 className="font-bold text-gray-900 mb-2">Rectificación</h3>
                  <p className="text-gray-600 text-sm">Corregir tus datos si son inexactos</p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 border border-pink-200">
                  <h3 className="font-bold text-gray-900 mb-2">Cancelación</h3>
                  <p className="text-gray-600 text-sm">Solicitar que eliminemos tus datos</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <h3 className="font-bold text-gray-900 mb-2">Oposición</h3>
                  <p className="text-gray-600 text-sm">Oponerte al tratamiento de tus datos</p>
                </div>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                <p className="text-purple-900 font-semibold">
                  Para ejercer tus derechos: Envía un correo a <a href="mailto:privacidad@saludcompartida.com" className="underline">privacidad@saludcompartida.com</a>
                </p>
              </div>
            </section>

            <section id="security" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                8. Seguridad de datos
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Implementamos medidas de seguridad administrativas, técnicas y físicas para proteger tus datos personales:
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Encriptación de datos sensibles</li>
                <li>• Acceso restringido solo a personal autorizado</li>
                <li>• Auditorías de seguridad periódicas</li>
                <li>• Servidores seguros con certificados SSL</li>
                <li>• Cumplimiento con estándares internacionales de protección de datos</li>
              </ul>
            </section>

            <section id="cookies" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                9. Cookies y tecnologías de rastreo
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Utilizamos cookies y tecnologías similares para:
              </p>
              <ul className="space-y-2 text-gray-700 text-sm mb-4">
                <li>• Mantener tu sesión activa mientras usas la plataforma</li>
                <li>• Recordar tus preferencias y configuraciones</li>
                <li>• Analizar el uso de la plataforma para mejorar la experiencia</li>
                <li>• Personalizar el contenido y las recomendaciones</li>
              </ul>
              <p className="text-gray-600 text-sm leading-relaxed">
                Puedes configurar tu navegador para rechazar cookies, aunque esto puede limitar algunas funcionalidades de la plataforma.
              </p>
            </section>

            <section id="minors" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                10. Protección de menores de edad
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Los servicios de SaludCompartida pueden ser utilizados por menores de edad bajo la supervisión y consentimiento de un padre o tutor legal.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 my-6 rounded-r-lg">
                <p className="text-blue-900 font-semibold mb-3">
                  Importante: Si un menor de edad requiere atención médica, el padre o tutor debe proporcionar el consentimiento informado y supervisar el uso del servicio.
                </p>
                <p className="text-blue-800 text-sm">
                  Los datos de salud de menores son tratados con especial cuidado y solo son accesibles por personal médico autorizado y el padre/tutor designado.
                </p>
              </div>
            </section>

            <section id="changes" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                11. Cambios a este aviso de privacidad
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Nos reservamos el derecho de actualizar este Aviso de Privacidad para reflejar cambios en nuestras prácticas o requisitos legales.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Te notificaremos de cambios importantes mediante:
              </p>
              <ul className="space-y-2 text-gray-700 text-sm mb-4">
                <li>• Correo electrónico a tu dirección registrada</li>
                <li>• Aviso destacado en nuestra plataforma</li>
                <li>• Actualización de la fecha al inicio de este documento</li>
              </ul>
              <p className="text-gray-600 text-sm leading-relaxed">
                Te recomendamos revisar periódicamente este aviso para mantenerte informado sobre cómo protegemos tu información.
              </p>
            </section>

          </div>
        </div>

        <div className="mt-12 text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
          <h3 className="text-base md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            ¿Tienes preguntas?
          </h3>
          <p className="text-gray-700 mb-6">
            Si tienes dudas sobre este Aviso de Privacidad o deseas ejercer tus derechos ARCO, contáctanos:
          </p>
          <div className="text-center">
            <a href="mailto:contact@saludcompartida.com" className="text-purple-600 hover:text-purple-700 font-semibold text-base md:text-2xl lg:text-3xl">
              💬 contact@saludcompartida.com
            </a>
          </div>
          <p className="text-gray-600 text-sm mt-4">
            Responderemos a tu solicitud en un plazo máximo de 20 días hábiles, de acuerdo con la LFPDPPP.
          </p>
        </div>
      </div>

      <Footer variant="light" confirmacionPage={true} />
    </div>
  );
}
