import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Footer from '../components/Footer';

export default function Page3Terms() {
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
            onClick={() => navigate('/page3')}
          />
          <button
            onClick={() => navigate('/page3')}
            className="text-gray-600 hover:text-gray-900 font-medium text-lg transition-colors"
          >
            Volver
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 border border-gray-200">
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

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <div className="prose prose-lg max-w-none">
                <section id="intro" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-cyan-500">
                    1. ¿Qué es SaludCompartida?
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    SaludCompartida es una plataforma digital que conecta a inmigrantes en Estados Unidos con servicios de salud para sus familias en países de América Latina, especialmente México.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>No somos un seguro médico.</strong> Somos un servicio de suscripción que facilita el acceso a:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Telemedicina con doctores certificados 24/7</li>
                    <li>Sesiones con terapeutas y psicólogos licenciados</li>
                    <li>Descuentos significativos en farmacias asociadas</li>
                    <li>Herramientas para gestionar ahorros en salud</li>
                  </ul>
                </section>

                <section id="definitions" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-cyan-500">
                    2. Definiciones clave
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Usuario Migrante</h3>
                      <p className="text-gray-700">Persona que reside en Estados Unidos y contrata el servicio para sus familiares.</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Beneficiario</h3>
                      <p className="text-gray-700">Familiar del Usuario Migrante que recibe los servicios de salud en su país de origen.</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Plataforma</h3>
                      <p className="text-gray-700">Aplicación web y móvil de SaludCompartida.</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Servicios</h3>
                      <p className="text-gray-700">Telemedicina, terapia, descuentos en farmacias y gestión de ahorros.</p>
                    </div>
                  </div>
                </section>

                <section id="services" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-cyan-500">
                    3. Descripción de servicios
                  </h2>
                  
                  <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Telemedicina 24/7</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Consultas médicas por videollamada con doctores certificados</li>
                    <li>Disponible las 24 horas, los 7 días de la semana</li>
                    <li>Diagnósticos preliminares y orientación médica</li>
                    <li>No reemplaza atención médica de emergencia presencial</li>
                  </ul>

                  <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Terapia y Salud Mental</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Sesiones con psicólogos y terapeutas licenciados</li>
                    <li>Apoyo emocional y herramientas de bienestar</li>
                    <li>Sesiones programadas según disponibilidad</li>
                  </ul>

                  <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Descuentos en Farmacias</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Ahorros de hasta 70% en medicamentos</li>
                    <li>Red de farmacias asociadas en constante expansión</li>
                    <li>Tarjeta digital de descuento disponible en la app</li>
                  </ul>

                  <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Gestión de Ahorros</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Herramientas para calcular y visualizar ahorros acumulados</li>
                    <li>Comparación de costos: con vs. sin SaludCompartida</li>
                    <li>Reportes mensuales de impacto económico</li>
                  </ul>
                </section>

                <section id="subscription" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-cyan-500">
                    4. Suscripción y pagos
                  </h2>
                  
                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Costo de Suscripción</h3>
                    <p className="text-gray-700 mb-2"><strong>$12 USD/mes</strong> por familia (hasta 5 miembros)</p>
                    <p className="text-sm text-gray-600">La suscripción se renueva automáticamente cada mes.</p>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">Métodos de Pago</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Tarjetas de crédito/débito (Visa, Mastercard, American Express)</li>
                    <li>Procesamiento seguro mediante Square</li>
                    <li>Cobro automático mensual en la fecha de suscripción</li>
                  </ul>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">Cancelación</h3>
                  <p className="text-gray-700 mb-2">
                    Puedes cancelar tu suscripción en cualquier momento desde tu cuenta. 
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>No hay penalidades por cancelación</li>
                    <li>El acceso continúa hasta el final del período pagado</li>
                    <li>No se otorgan reembolsos por meses parciales</li>
                  </ul>
                </section>

                <section id="usage" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-cyan-500">
                    5. Uso de la plataforma
                  </h2>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Responsabilidades del Usuario</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Proporcionar información veraz y actualizada</li>
                    <li>Mantener la confidencialidad de tu cuenta</li>
                    <li>Usar los servicios de manera legal y ética</li>
                    <li>No compartir códigos de acceso con terceros no autorizados</li>
                  </ul>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">Conducta Prohibida</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Uso fraudulento o abuso del servicio</li>
                    <li>Compartir información falsa o engañosa</li>
                    <li>Intentar vulnerar la seguridad de la plataforma</li>
                    <li>Reventa o uso comercial no autorizado</li>
                  </ul>
                </section>

                <section id="privacy" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-cyan-500">
                    6. Privacidad y datos
                  </h2>
                  <p className="text-gray-700 mb-4">
                    La recopilación y uso de tus datos personales está regulado por nuestra{' '}
                    <button
                      onClick={() => navigate('/page3-privacy')}
                      className="text-cyan-600 font-semibold hover:underline"
                    >
                      Política de Privacidad
                    </button>.
                  </p>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 mb-2">Compromiso de Seguridad</h3>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      <li>Encriptación de extremo a extremo</li>
                      <li>Cumplimiento con HIPAA y regulaciones locales</li>
                      <li>Nunca vendemos tus datos a terceros</li>
                      <li>Controles de acceso estrictos</li>
                    </ul>
                  </div>
                </section>

                <section id="limitations" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-cyan-500">
                    7. Limitaciones del servicio
                  </h2>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
                    <h3 className="font-bold text-gray-900 mb-3">⚠️ Advertencias Importantes</h3>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      <li><strong>No somos un seguro médico:</strong> No cubrimos gastos médicos directos</li>
                      <li><strong>No sustituimos emergencias:</strong> En caso de emergencia, llama al 911 o acude al hospital más cercano</li>
                      <li><strong>Diagnósticos preliminares:</strong> Las consultas por telemedicina son orientativas, no definitivas</li>
                      <li><strong>Disponibilidad:</strong> Sujeto a disponibilidad de profesionales y farmacias</li>
                    </ul>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">Exclusiones</h3>
                  <p className="text-gray-700 mb-2">SaludCompartida NO cubre:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Cirugías o procedimientos médicos invasivos</li>
                    <li>Atención médica presencial o visitas a domicilio</li>
                    <li>Costo de medicamentos (solo descuentos)</li>
                    <li>Tratamientos experimentales o no aprobados</li>
                    <li>Emergencias médicas que requieran hospitalización</li>
                  </ul>
                </section>

                <section id="responsibilities" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-cyan-500">
                    8. Responsabilidades
                  </h2>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">De SaludCompartida</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Mantener la plataforma operativa y segura</li>
                    <li>Conectarte con profesionales certificados</li>
                    <li>Proteger tus datos personales</li>
                    <li>Proporcionar soporte técnico</li>
                  </ul>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">Del Usuario</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Seguir recomendaciones médicas de profesionales locales</li>
                    <li>Verificar la compatibilidad de medicamentos</li>
                    <li>Usar el servicio de manera responsable</li>
                    <li>Mantener información actualizada</li>
                  </ul>
                </section>

                <section id="modifications" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-cyan-500">
                    9. Modificaciones
                  </h2>
                  <p className="text-gray-700 mb-4">
                    SaludCompartida se reserva el derecho de modificar estos términos en cualquier momento.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Te notificaremos por correo electrónico con 30 días de anticipación</li>
                    <li>El uso continuado del servicio implica aceptación de los nuevos términos</li>
                    <li>Puedes cancelar si no estás de acuerdo con los cambios</li>
                  </ul>
                </section>

                <section id="jurisdiction" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-cyan-500">
                    10. Ley aplicable
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Estos términos se rigen por las leyes de los Estados Unidos y el estado de California.
                  </p>
                  <p className="text-gray-700">
                    Cualquier disputa será resuelta mediante arbitraje en California, Estados Unidos.
                  </p>
                </section>

                <div className="mt-12 pt-8 border-t-2 border-gray-200">
                  <p className="text-center text-gray-600 mb-4">
                    ¿Tienes preguntas sobre estos términos?
                  </p>
                  <p className="text-center">
                    <a href="mailto:legal@saludcompartida.com" className="text-cyan-600 font-semibold hover:underline text-lg">
                      legal@saludcompartida.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer variant="light" />
    </div>
  );
}
