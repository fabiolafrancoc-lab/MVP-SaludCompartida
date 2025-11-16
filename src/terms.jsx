import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Terms() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Determinar desde dónde vino el usuario
  const fromPage = location.state?.from || '/page4';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <img
            src="/saludcompartida logo WT.png"
            alt="SaludCompartida"
            className="h-16 cursor-pointer"
            onClick={() => navigate('/')}
          />
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate(fromPage);
            }}
            className="text-gray-600 hover:text-gray-900 font-medium text-lg"
          >
            Volver
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Lee cuidadosamente estos términos antes de usar SaludCompartida. Al usar nuestro servicio, aceptas estar sujeto a estos términos.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Última actualización: 7 de noviembre de 2025
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Índice navegable (sticky en desktop) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Índice</h3>
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

          {/* Contenido principal */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Sección 1: Introducción */}
            <section id="intro" className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                1. ¿Qué es SaludCompartida?
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                SaludCompartida es una plataforma digital que ofrece a migrantes y sus familias en México, Centroamérica, Latinoamérica e India acceso a servicios de salud mediante suscripción mensual. 
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Nuestro servicio incluye consultas de telemedicina, consultas psicológicas y descuentos en farmacias afiliadas. Proporcionamos orientación médica profesional, posibilidad de prescripción electrónica según normativa vigente, e incentivos económicos para la adquisición de medicamentos.
              </p>

              {/* Disclaimer importante */}
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

              <p className="text-gray-700 leading-relaxed">
                Al usar SaludCompartida, aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo con alguna parte de estos términos, no debes usar nuestro servicio.
              </p>
            </section>

            {/* Sección 2: Definiciones */}
            <section id="definitions" className="bg-white rounded-xl shadow-lg p-8">
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

            {/* Sección 3: Descripción de servicios */}
            <section id="services" className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                3. Descripción de servicios
              </h2>
              
              <div className="space-y-6">
                {/* Telemedicina */}
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <svg className="w-8 h-8 text-cyan-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Telemedicina 24/7</h3>
                      <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                        Consultas médicas ilimitadas por videollamada, teléfono o WhatsApp con profesionales certificados en México. Las consultas están disponibles en días y horarios establecidos por SaludCompartida.
                      </p>
                      <ul className="text-gray-600 text-sm space-y-1">
                        <li>• Atención médica general</li>
                        <li>• Prescripción electrónica cuando sea permitido</li>
                        <li>• Orientación sobre síntomas y tratamientos</li>
                        <li>• Recomendación de atención presencial cuando sea necesario</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Descuentos en Farmacias */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <svg className="w-8 h-8 text-pink-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Descuentos en Farmacias</h3>
                      <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                        Acceso a descuentos de 40-75% en más de 1,700 farmacias afiliadas, cubriendo el 95% del territorio mexicano.
                      </p>
                      <ul className="text-gray-600 text-sm space-y-1">
                        <li>• Red de más de 1,700 ubicaciones</li>
                        <li>• Descuentos aplicables con receta electrónica</li>
                        <li>• Medicamentos autorizados (excluyendo controlados)</li>
                        <li>• Productos adicionales con descuento disponibles</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Terapia Psicológica */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <svg className="w-8 h-8 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Sesiones Psicológicas</h3>
                      <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                        Una sesión psicológica semanal por videollamada con profesionales titulados y registrados en México (duración máxima: 50 minutos).
                      </p>
                      <ul className="text-gray-600 text-sm space-y-1">
                        <li>• Apoyo psicológico y emocional</li>
                        <li>• Citas programadas según disponibilidad</li>
                        <li>• Consentimiento requerido para menores</li>
                        <li>• Confidencialidad profesional garantizada</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Acceso con descuento */}
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <svg className="w-8 h-8 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Doctores y Especialistas</h3>
                      <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                        Acceso con descuento a consultas presenciales con médicos generales, especialistas y estudios médicos ambulatorios.
                      </p>
                      <ul className="text-gray-600 text-sm space-y-1">
                        <li>• Consultas presenciales con descuento</li>
                        <li>• Acceso a especialistas</li>
                        <li>• Exámenes médicos ambulatorios</li>
                        <li>• Red en crecimiento constante</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exclusiones importantes */}
              <div className="bg-red-50 border-l-4 border-red-400 p-6 mt-6 rounded-r-lg">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-red-900 mb-2">
                      NO incluido en el servicio:
                    </p>
                    <ul className="text-red-800 text-sm space-y-1">
                      <li>• Hospitalización</li>
                      <li>• Cirugías</li>
                      <li>• Emergencias médicas graves</li>
                      <li>• Tratamientos especializados de largo plazo</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección 4: Suscripción y pagos */}
            <section id="subscription" className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                4. Suscripción y pagos
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Costo del servicio</h3>
                  <div className="bg-gradient-to-r from-cyan-50 to-purple-50 rounded-xl p-6">
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      El costo de la suscripción mensual varía entre <span className="font-bold text-cyan-700">$12 a $18 USD</span> dependiendo del plan elegido y el país de destino del servicio.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="bg-white rounded-lg p-4">
                        <p className="font-semibold text-gray-900 mb-1">Plan Básico LATAM</p>
                        <p className="text-gray-600">$12/mes - Servicios esenciales</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <p className="font-semibold text-gray-900 mb-1">Plan Premium LATAM</p>
                        <p className="text-gray-600">$18/mes - Servicios completos</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Cobertura familiar</h3>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    Cada suscripción cubre hasta 4 usuarios familiares en el país de destino. El migrante que contrata designa un usuario principal quien puede agregar hasta 3 personas adicionales sin necesidad de informar a SaludCompartida.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Renovación automática</h3>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    La suscripción se renueva automáticamente cada mes hasta que el usuario cancele el servicio. El cargo se realizará al método de pago registrado en la misma fecha de cada mes.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Cancelación</h3>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    Puedes cancelar tu suscripción en cualquier momento desde la plataforma o contactando a nuestro equipo. La cancelación será efectiva al final del período de facturación actual. No se realizarán cargos adicionales después de la cancelación.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Política de reembolsos</h3>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    Los pagos son no reembolsables excepto en casos donde SaludCompartida no haya podido proporcionar los servicios contratados por causas atribuibles a la plataforma. Las solicitudes de reembolso deben presentarse dentro de los 7 días posteriores al cargo.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Métodos de pago aceptados</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className="font-medium text-gray-900">Tarjeta de crédito</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className="font-medium text-gray-900">Tarjeta de débito</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className="font-medium text-gray-900">Apps de pago</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className="font-medium text-gray-900">Apps de remesas</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección 5: Uso de la plataforma */}
            <section id="usage" className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                5. Uso de la plataforma
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Requisitos para usar el servicio</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Tener una suscripción activa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Acceso a smartphone con WhatsApp</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Conexión a internet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Proporcionar información veraz y actualizada</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-cyan-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Activación en 30 segundos</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Después de completar tu suscripción, recibirás un código de activación por WhatsApp en menos de 30 segundos. Este código permite el acceso inmediato a todos los servicios de la plataforma.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Responsabilidades del usuario</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Mantener la confidencialidad de tu cuenta y contraseña</li>
                    <li>• Proporcionar información médica precisa y completa</li>
                    <li>• Usar los servicios de forma apropiada y legal</li>
                    <li>• Seguir las indicaciones y recomendaciones médicas</li>
                    <li>• Actualizar tu información de contacto y pago</li>
                    <li>• Notificar cualquier uso no autorizado de tu cuenta</li>
                  </ul>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
                  <h3 className="font-bold text-red-900 mb-3">Prohibiciones</h3>
                  <p className="text-red-800 text-sm mb-3">Está estrictamente prohibido:</p>
                  <ul className="space-y-1 text-red-800 text-sm">
                    <li>• Compartir tu cuenta con personas no autorizadas</li>
                    <li>• Usar el servicio para fines fraudulentos</li>
                    <li>• Proporcionar información falsa o engañosa</li>
                    <li>• Revender o transferir tu suscripción</li>
                    <li>• Usar recetas para terceros no autorizados</li>
                    <li>• Intentar acceder a sistemas sin autorización</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Sección 6: Privacidad y datos */}
            <section id="privacy" className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                6. Privacidad y datos
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                La protección de tus datos personales y de salud es una prioridad para SaludCompartida. Cumplimos con todas las regulaciones aplicables de protección de datos.
              </p>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Para información detallada sobre cómo recopilamos, usamos y protegemos tus datos personales, consulta nuestro{' '}
                  <button
                    onClick={() => navigate('/privacy', { state: { from: '/terms', originalFrom: fromPage } })}
                    className="text-purple-700 font-semibold hover:text-purple-900 underline"
                  >
                    Aviso de Privacidad
                  </button>
                  .
                </p>
              </div>
              <div className="space-y-4 text-gray-700 text-sm">
                <p>
                  <strong>Datos que recopilamos:</strong> Información de identificación (nombre, teléfono, email) y datos de salud necesarios para proporcionar los servicios.
                </p>
                <p>
                  <strong>Uso de datos:</strong> Utilizamos tus datos exclusivamente para prestación de servicios de salud, cumplimiento legal y mejora de la plataforma.
                </p>
                <p>
                  <strong>Compartición de datos:</strong> Compartimos información únicamente con proveedores médicos necesarios para la prestación del servicio, bajo estrictos acuerdos de confidencialidad.
                </p>
              </div>
            </section>

            {/* Sección 7: Limitaciones del servicio */}
            <section id="limitations" className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                7. Limitaciones del servicio
              </h2>

              <div className="space-y-6">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                  <h3 className="font-bold text-yellow-900 mb-3">NO somos un seguro médico</h3>
                  <p className="text-yellow-800 text-sm leading-relaxed mb-3">
                    SaludCompartida es un servicio de salud mediante suscripción. NO somos una compañía de seguros ni una póliza de seguro médico.
                  </p>
                  <p className="text-yellow-800 text-sm font-medium">
                    Este servicio NO reemplaza un seguro médico tradicional.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Servicios NO cubiertos</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-50 rounded-lg p-4">
                      <h4 className="font-semibold text-red-900 mb-2 text-sm">Hospitalización</h4>
                      <p className="text-red-800 text-xs">No cubrimos internamiento hospitalario ni cirugías mayores</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4">
                      <h4 className="font-semibold text-red-900 mb-2 text-sm">Emergencias graves</h4>
                      <p className="text-red-800 text-xs">Para emergencias médicas, acude al servicio de urgencias más cercano</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4">
                      <h4 className="font-semibold text-red-900 mb-2 text-sm">Tratamientos especializados</h4>
                      <p className="text-red-800 text-xs">Tratamientos de alta especialidad requieren atención presencial</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4">
                      <h4 className="font-semibold text-red-900 mb-2 text-sm">Condiciones preexistentes graves</h4>
                      <p className="text-red-800 text-xs">Algunas condiciones pueden requerir atención fuera de la plataforma</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Alcance del servicio</h3>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    SaludCompartida se enfoca en servicios preventivos y ambulatorios:
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Orientación médica y diagnóstico inicial</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Recetas para condiciones comunes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Descuentos para adquisición de medicamentos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Apoyo psicológico y emocional</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Disponibilidad de red</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    La disponibilidad de farmacias afiliadas y doctores puede variar por región. Trabajamos continuamente para expandir nuestra red de proveedores. SaludCompartida no garantiza disponibilidad inmediata en todas las ubicaciones.
                  </p>
                </div>
              </div>
            </section>

            {/* Sección 8: Responsabilidades y exenciones */}
            <section id="responsibilities" className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                8. Responsabilidades y exenciones
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Responsabilidad del usuario</h3>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    El usuario reconoce que la telemedicina puede tener limitaciones inherentes y acepta la responsabilidad de buscar atención presencial cuando así lo requiera su condición. El usuario debe:
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Proporcionar información médica completa y precisa</li>
                    <li>• Seguir las indicaciones médicas proporcionadas</li>
                    <li>• Buscar atención de emergencia cuando sea necesario</li>
                    <li>• Usar responsablemente las recetas y medicamentos</li>
                    <li>• Informar sobre efectos adversos o complicaciones</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Limitaciones de responsabilidad de SaludCompartida</h3>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    SaludCompartida actúa como intermediario entre usuarios y proveedores de servicios de salud. Nuestra responsabilidad se limita a:
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Proporcionar acceso a la plataforma y sus servicios</li>
                    <li>• Verificar credenciales de proveedores médicos</li>
                    <li>• Facilitar comunicación entre usuarios y profesionales</li>
                    <li>• Procesar pagos y gestionar suscripciones</li>
                  </ul>
                  <p className="text-gray-700 mt-4 text-sm leading-relaxed">
                    SaludCompartida NO se hace responsable por:
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm mt-2">
                    <li>• Diagnósticos o tratamientos proporcionados por profesionales</li>
                    <li>• Resultados de los servicios médicos</li>
                    <li>• Uso indebido de recetas o medicamentos</li>
                    <li>• Decisiones médicas tomadas por los profesionales</li>
                    <li>• Acceso no autorizado por terceros debido a negligencia del usuario</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Casos de fuerza mayor</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    SaludCompartida no será responsable por interrupciones del servicio causadas por eventos fuera de nuestro control razonable, incluyendo:
                  </p>
                  <ul className="text-gray-600 text-sm mt-3 space-y-1">
                    <li>• Desastres naturales</li>
                    <li>• Fallas de infraestructura de internet o telecomunicaciones</li>
                    <li>• Cambios regulatorios que afecten la prestación del servicio</li>
                    <li>• Pandemias o emergencias de salud pública</li>
                    <li>• Actos de gobierno o autoridades competentes</li>
                  </ul>
                  <p className="text-gray-700 text-sm mt-4 leading-relaxed">
                    En estos casos, trabajaremos para restaurar el servicio lo antes posible y comunicaremos actualizaciones a los usuarios.
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                  <p className="text-blue-900 text-sm leading-relaxed">
                    <strong>Obligación de medio:</strong> SaludCompartida encuadra el servicio como obligación de medio y no de resultado, conforme a los estándares de la práctica médica y psicológica mexicana.
                  </p>
                </div>
              </div>
            </section>

            {/* Sección 9: Modificaciones de términos */}
            <section id="modifications" className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                9. Modificaciones de términos
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                SaludCompartida se reserva el derecho de modificar estos términos y condiciones en cualquier momento para reflejar cambios en nuestros servicios, requisitos legales o mejoras en la plataforma.
              </p>
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 mb-4">
                <h3 className="font-bold text-gray-900 mb-3">Notificación de cambios</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Te notificaremos sobre cambios importantes en los términos mediante:
                </p>
                <ul className="text-gray-700 text-sm mt-3 space-y-1">
                  <li>• Correo electrónico a la dirección registrada</li>
                  <li>• Notificación en la aplicación móvil</li>
                  <li>• Mensaje de WhatsApp</li>
                  <li>• Aviso destacado en nuestro sitio web</li>
                </ul>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                El uso continuado del servicio después de la notificación de cambios constituye tu aceptación de los términos modificados. Si no estás de acuerdo con los cambios, puedes cancelar tu suscripción antes de que entren en vigor.
              </p>
            </section>

            {/* Sección 10: Ley aplicable y jurisdicción */}
            <section id="jurisdiction" className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                10. Ley aplicable y jurisdicción
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Legislación aplicable</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Estos términos y condiciones se rigen por las leyes de México y Estados Unidos, según corresponda a la prestación del servicio cross-border. Específicamente:
                  </p>
                  <ul className="text-gray-700 text-sm mt-3 space-y-1">
                    <li>• Servicios médicos: Legislación mexicana de salud (NOM-024 para telemedicina)</li>
                    <li>• Protección de datos: Ley Federal de Protección de Datos Personales en Posesión de Particulares (México)</li>
                    <li>• Transacciones financieras: Regulaciones estadounidenses aplicables</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Resolución de conflictos</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    En caso de controversia o desacuerdo relacionado con estos términos o el uso del servicio:
                  </p>
                  <ol className="text-gray-700 text-sm space-y-2">
                    <li><strong>1. Contacto directo:</strong> Primero intenta resolver el problema contactando a nuestro equipo de soporte</li>
                    <li><strong>2. Mediación:</strong> Si no se resuelve, ambas partes acuerdan intentar mediación antes de proceder legalmente</li>
                    <li><strong>3. Jurisdicción:</strong> Para disputas no resueltas, las partes se someten a los tribunales competentes de Ciudad de México, México</li>
                  </ol>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Separabilidad</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Si alguna disposición de estos términos es considerada inválida o inaplicable, las disposiciones restantes continuarán en pleno vigor y efecto.
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* Consultas Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate('/contact');
            }}
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ¿Tienes Consultas?
          </button>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center border-t border-gray-200 pt-8">
          <p className="text-gray-600 mb-4">
            ¿Tienes preguntas sobre privacidad y protección de datos?
          </p>
          <button
            onClick={() => navigate('/privacy', { state: { from: '/terms', originalFrom: fromPage } })}
            className="text-cyan-600 hover:text-cyan-700 font-semibold underline"
          >
            Lee nuestro Aviso de Privacidad →
          </button>
          <p className="text-sm text-gray-500 mt-6">
            © 2025 SaludCompartida. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}