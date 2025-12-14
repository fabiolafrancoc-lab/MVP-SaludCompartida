import { useNavigate } from 'react-router-dom';import { useNavigate } from 'react-router-dom';import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

import Footer from '../components/Footer';import { useState } from 'react';import { useState, useEffect } from 'react';



export default function PostTerms() {import Footer from '../components/Footer';import TopNav from '../components/TopNav';

  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('');



  const scrollToSection = (sectionId) => {export default function PostTerms() {export default function PostTerms() {

    const element = document.getElementById(sectionId);

    if (element) {  const navigate = useNavigate();  const navigate = useNavigate();

      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setActiveSection(sectionId);  const [activeSection, setActiveSection] = useState('');  const [activeSection, setActiveSection] = useState('');

    }

  };



  const sections = [  const scrollToSection = (sectionId) => {  // Scroll to top when component mounts

    { id: 'intro', title: '1. ¿Qué es SaludCompartida?' },

    { id: 'definitions', title: '2. Definiciones clave' },    const element = document.getElementById(sectionId);  useEffect(() => {

    { id: 'services', title: '3. Descripción de servicios' },

    { id: 'subscription', title: '4. Suscripción y pagos' },    if (element) {    window.scrollTo(0, 0);

    { id: 'usage', title: '5. Uso de la plataforma' },

    { id: 'privacy', title: '6. Privacidad y datos' },      element.scrollIntoView({ behavior: 'smooth', block: 'start' });  }, []);

    { id: 'limitations', title: '7. Limitaciones del servicio' },

    { id: 'responsibilities', title: '8. Responsabilidades' },      setActiveSection(sectionId);

    { id: 'modifications', title: '9. Modificaciones' },

    { id: 'jurisdiction', title: '10. Ley aplicable' }    }  const scrollToSection = (sectionId) => {

  ];

  };    const element = document.getElementById(sectionId);

  return (

    <div className="min-h-screen bg-white">    if (element) {

      {/* Header - Solo Volver */}

      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">  const sections = [      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

          <img    { id: 'intro', title: '1. ¿Qué es SaludCompartida?' },      setActiveSection(sectionId);

            src="/saludcompartida logo WT.png"

            alt="SaludCompartida"    { id: 'definitions', title: '2. Definiciones clave' },    }

            className="h-16 cursor-pointer"

            onClick={() => navigate('/page4')}    { id: 'services', title: '3. Descripción de servicios' },  };

          />

          <button    { id: 'subscription', title: '4. Suscripción y pagos' },

            onClick={() => navigate('/page4')}

            className="text-gray-600 hover:text-gray-900 font-medium text-lg transition-colors"    { id: 'usage', title: '5. Uso de la plataforma' },  const sections = [

          >

            Volver    { id: 'privacy', title: '6. Privacidad y datos' },    { id: 'intro', title: '1. ¿Qué es SaludCompartida?' },

          </button>

        </div>    { id: 'limitations', title: '7. Limitaciones del servicio' },    { id: 'definitions', title: '2. Definiciones clave' },

      </header>

    { id: 'responsibilities', title: '8. Responsabilidades' },    { id: 'services', title: '3. Descripción de servicios' },

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Hero Section */}    { id: 'modifications', title: '9. Modificaciones' },    { id: 'subscription', title: '4. Suscripción y pagos' },

        <div className="text-center mb-12">

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">    { id: 'jurisdiction', title: '10. Ley aplicable' }    { id: 'usage', title: '5. Uso de la plataforma' },

            Términos y Condiciones

          </h1>  ];    { id: 'privacy', title: '6. Privacidad y datos' },

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">

            Lee cuidadosamente estos términos antes de usar SaludCompartida. Al usar nuestro servicio, aceptas estar sujeto a estos términos.    { id: 'limitations', title: '7. Limitaciones del servicio' },

          </p>

          <p className="text-sm text-gray-500 mt-4">  return (    { id: 'responsibilities', title: '8. Responsabilidades' },

            Última actualización: 7 de noviembre de 2025

          </p>    <div className="min-h-screen bg-white">    { id: 'modifications', title: '9. Modificaciones' },

        </div>

      {/* Header - Solo Volver */}    { id: 'jurisdiction', title: '10. Ley aplicable' }

        <div className="grid lg:grid-cols-4 gap-8">

          {/* Sidebar - Índice navegable */}      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">  ];

          <div className="lg:col-span-1">

            <div className="bg-gray-50 rounded-xl shadow-lg p-6 sticky top-24 border border-gray-200">        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

              <h3 className="font-bold text-gray-900 mb-4 text-lg">Índice</h3>

              <nav className="space-y-2">          <img  return (

                {sections.map((section) => (

                  <button            src="/saludcompartida logo WT.png"    <div className="min-h-screen bg-white">

                    key={section.id}

                    onClick={() => scrollToSection(section.id)}            alt="SaludCompartida"      <TopNav internalPage={true} showMenu={true} />

                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${

                      activeSection === section.id            className="h-16 cursor-pointer"

                        ? 'bg-cyan-100 text-cyan-900 font-semibold'

                        : 'text-gray-600 hover:bg-gray-100'            onClick={() => navigate('/page4')}      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                    }`}

                  >          />        {/* Botón Volver */}

                    {section.title}

                  </button>          <button        <div className="mb-8">

                ))}

              </nav>            onClick={() => navigate('/page4')}          <button

            </div>

          </div>            className="text-gray-600 hover:text-gray-900 font-medium text-lg transition-colors"            onClick={() => navigate('/page4')}



          {/* Contenido principal */}          >            className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold transition-colors"

          <div className="lg:col-span-3 space-y-12">

                        Volver          >

            {/* Sección 1: ¿Qué es SaludCompartida? */}

            <section id="intro" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">          </button>            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">

              <h2 className="text-3xl font-bold text-gray-900 mb-6">

                1. ¿Qué es SaludCompartida?        </div>              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />

              </h2>

              <p className="text-gray-700 mb-4 leading-relaxed">      </header>            </svg>

                SaludCompartida es una plataforma digital que ofrece a migrantes y sus familias en México, Centroamérica, Latinoamérica e India acceso a servicios de salud mediante suscripción mensual.

              </p>            Volver

              <p className="text-gray-700 mb-6 leading-relaxed">

                Nuestro servicio incluye consultas de telemedicina, consultas psicológicas y descuentos en farmacias afiliadas.      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">          </button>

              </p>

        {/* Hero Section */}        </div>

              {/* Disclaimer importante */}

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-6 rounded-r-lg">        <div className="text-center mb-12">

                <div className="flex items-start">

                  <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">        {/* Hero Section */}

                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />

                  </svg>            Términos y Condiciones        <div className="text-center mb-12">

                  <div>

                    <p className="font-semibold text-yellow-900 mb-2">          </h1>          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">

                      Importante: NO somos un seguro médico

                    </p>          <p className="text-lg text-gray-600 max-w-3xl mx-auto">            Términos y Condiciones

                    <p className="text-yellow-800 text-sm leading-relaxed">

                      SaludCompartida NO es una póliza de seguro. Proporcionamos servicios de salud preventivos y ambulatorios mediante suscripción mensual. NO cubrimos hospitalización ni emergencias médicas graves.            Lee cuidadosamente estos términos antes de usar SaludCompartida. Al usar nuestro servicio, aceptas estar sujeto a estos términos.          </h1>

                    </p>

                  </div>          </p>          <p className="text-lg text-gray-600 max-w-3xl mx-auto">

                </div>

              </div>          <p className="text-sm text-gray-500 mt-4">            Lee cuidadosamente estos términos antes de usar SaludCompartida. Al usar nuestro servicio, aceptas estar sujeto a estos términos.

            </section>

            Última actualización: 7 de noviembre de 2025          </p>

            {/* Sección 2: Definiciones clave */}

            <section id="definitions" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">          </p>          <p className="text-sm text-gray-500 mt-4">

              <h2 className="text-3xl font-bold text-gray-900 mb-6">

                2. Definiciones clave        </div>            Última actualización: 7 de noviembre de 2025

              </h2>

              <div className="space-y-4">          </p>

                <div className="border-l-4 border-cyan-500 pl-4">

                  <h3 className="font-bold text-gray-900 mb-1">Usuario</h3>        <div className="grid lg:grid-cols-4 gap-8">        </div>

                  <p className="text-gray-700 text-sm">

                    La persona que contrata la suscripción (migrante) y las personas designadas como usuarios del servicio en el país de destino (hasta 4 personas).          {/* Sidebar - Índice navegable */}

                  </p>

                </div>          <div className="lg:col-span-1">        <div className="grid lg:grid-cols-4 gap-8">

                <div className="border-l-4 border-cyan-500 pl-4">

                  <h3 className="font-bold text-gray-900 mb-1">Suscripción</h3>            <div className="bg-gray-50 rounded-xl shadow-lg p-6 sticky top-24 border border-gray-200">          {/* Sidebar - Índice navegable (sticky en desktop) */}

                  <p className="text-gray-700 text-sm">

                    El pago mensual recurrente que da acceso a todos los servicios de SaludCompartida.              <h3 className="font-bold text-gray-900 mb-4 text-lg">Índice</h3>          <div className="lg:col-span-1">

                  </p>

                </div>              <nav className="space-y-2">            <div className="bg-gray-50 rounded-xl shadow-lg p-6 sticky top-24 border border-gray-200">

                <div className="border-l-4 border-cyan-500 pl-4">

                  <h3 className="font-bold text-gray-900 mb-1">Servicios</h3>                {sections.map((section) => (              <h3 className="font-bold text-gray-900 mb-4 text-lg">Índice</h3>

                  <p className="text-gray-700 text-sm">

                    El conjunto de beneficios de salud que proporciona SaludCompartida, incluyendo telemedicina, descuentos en farmacias y acceso con descuento a atención médica presencial.                  <button              <nav className="space-y-2">

                  </p>

                </div>                    key={section.id}                {sections.map((section) => (

                <div className="border-l-4 border-cyan-500 pl-4">

                  <h3 className="font-bold text-gray-900 mb-1">Plataforma</h3>                    onClick={() => scrollToSection(section.id)}                  <button

                  <p className="text-gray-700 text-sm">

                    El sitio web, aplicación móvil y sistema WhatsApp a través del cual se accede a los servicios de SaludCompartida.                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${                    key={section.id}

                  </p>

                </div>                      activeSection === section.id                    onClick={() => scrollToSection(section.id)}

              </div>

            </section>                        ? 'bg-cyan-100 text-cyan-900 font-semibold'                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${



            {/* Sección 3: Descripción de servicios */}                        : 'text-gray-600 hover:bg-gray-100'                      activeSection === section.id

            <section id="services" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">

              <h2 className="text-3xl font-bold text-gray-900 mb-6">                    }`}                        ? 'bg-cyan-100 text-cyan-900 font-semibold'

                3. Descripción de servicios

              </h2>                  >                        : 'text-gray-600 hover:bg-gray-100'

              

              <div className="space-y-6">                    {section.title}                    }`}

                {/* Telemedicina */}

                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 border border-cyan-200">                  </button>                  >

                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Telemedicina 24/7</h3>

                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">                ))}                    {section.title}

                    Consultas médicas ilimitadas por videollamada, teléfono o WhatsApp con profesionales certificados en México.

                  </p>              </nav>                  </button>

                  <ul className="text-gray-600 text-sm space-y-1">

                    <li>• Atención médica general</li>            </div>                ))}

                    <li>• Prescripción electrónica cuando sea permitido</li>

                    <li>• Orientación sobre síntomas y tratamientos</li>          </div>              </nav>

                    <li>• Recomendación de atención presencial cuando sea necesario</li>

                  </ul>            </div>

                </div>

          {/* Contenido principal */}          </div>

                {/* Descuentos en Farmacias */}

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-pink-200">          <div className="lg:col-span-3 space-y-12">

                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Descuentos en Farmacias</h3>

                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">                      {/* Contenido principal */}

                    Acceso a descuentos de 40-75% en más de 1,700 farmacias afiliadas.

                  </p>            {/* Sección 1: ¿Qué es SaludCompartida? */}          <div className="lg:col-span-3 space-y-12">

                  <ul className="text-gray-600 text-sm space-y-1">

                    <li>• Red de más de 1,700 ubicaciones</li>            <section id="intro" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">            

                    <li>• Descuentos aplicables con receta electrónica</li>

                    <li>• Medicamentos autorizados (excluyendo controlados)</li>              <h2 className="text-3xl font-bold text-gray-900 mb-6">            {/* Sección 1: Introducción */}

                  </ul>

                </div>                1. ¿Qué es SaludCompartida?            <section id="intro" className="bg-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">



                {/* Terapia Psicológica */}              </h2>              <h2 className="text-3xl font-bold text-gray-900 mb-6">

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">

                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Terapia Psicológica</h3>              <p className="text-gray-700 mb-4 leading-relaxed">                1. ¿Qué es SaludCompartida?

                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">

                    Acceso a sesiones de terapia psicológica con profesionales certificados.                SaludCompartida es una plataforma digital que ofrece a migrantes y sus familias en México, Centroamérica, Latinoamérica e India acceso a servicios de salud mediante suscripción mensual.              </h2>

                  </p>

                  <ul className="text-gray-600 text-sm space-y-1">              </p>              <p className="text-gray-700 mb-4 leading-relaxed">

                    <li>• Sesiones individuales por videollamada</li>

                    <li>• Profesionales con cédula certificada</li>              <p className="text-gray-700 mb-6 leading-relaxed">                SaludCompartida es una plataforma digital que ofrece a migrantes y sus familias en México, Centroamérica, Latinoamérica e India acceso a servicios de salud mediante suscripción mensual. 

                    <li>• Tratamiento de ansiedad, depresión, estrés</li>

                  </ul>                Nuestro servicio incluye consultas de telemedicina, consultas psicológicas y descuentos en farmacias afiliadas.              </p>

                </div>

              </div>              </p>              <p className="text-gray-700 mb-6 leading-relaxed">

            </section>

                Nuestro servicio incluye consultas de telemedicina, consultas psicológicas y descuentos en farmacias afiliadas. Proporcionamos orientación médica profesional, posibilidad de prescripción electrónica según normativa vigente, e incentivos económicos para la adquisición de medicamentos.

            {/* Sección 4: Suscripción y pagos */}

            <section id="subscription" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">              {/* Disclaimer importante */}              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">

                4. Suscripción y pagos              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-6 rounded-r-lg">

              </h2>

                <div className="flex items-start">              {/* Disclaimer importante */}

              <div className="space-y-6">

                <div className="bg-gradient-to-r from-cyan-50 to-purple-50 rounded-xl p-6 border border-cyan-200">                  <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-6 rounded-r-lg">

                  <p className="text-gray-700 mb-4 leading-relaxed">

                    <strong className="text-gray-900">Plan mensual:</strong> $12 USD/mes por cobertura para hasta 4 personas.                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />                <div className="flex items-start">

                  </p>

                  <p className="text-gray-700 mb-4 leading-relaxed">                  </svg>                  <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">

                    <strong className="text-gray-900">Renovación automática:</strong> Tu suscripción se renueva automáticamente cada mes hasta que la canceles.

                  </p>                  <div>                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />

                  <p className="text-gray-700 mb-4 leading-relaxed">

                    <strong className="text-gray-900">Métodos de pago:</strong> Aceptamos tarjetas de crédito/débito procesadas a través de proveedores seguros como Stripe.                    <p className="font-semibold text-yellow-900 mb-2">                  </svg>

                  </p>

                  <p className="text-gray-700 leading-relaxed">                      Importante: NO somos un seguro médico                  <div>

                    <strong className="text-gray-900">Cancelación:</strong> Puedes cancelar en cualquier momento. El servicio permanecerá activo hasta el final del período pagado.

                  </p>                    </p>                    <p className="font-semibold text-yellow-900 mb-2">

                </div>

                    <p className="text-yellow-800 text-sm leading-relaxed">                      Importante: NO somos un seguro médico

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">

                  <p className="text-yellow-900 font-semibold">                      SaludCompartida NO es una póliza de seguro. Proporcionamos servicios de salud preventivos y ambulatorios mediante suscripción mensual. NO cubrimos hospitalización ni emergencias médicas graves.                    </p>

                    Importante: No ofrecemos reembolsos por períodos parciales. Si cancelas, el servicio estará disponible hasta el final del mes pagado.

                  </p>                    </p>                    <p className="text-yellow-800 text-sm leading-relaxed">

                </div>

              </div>                  </div>                      SaludCompartida NO es una póliza de seguro. Proporcionamos servicios de salud preventivos y ambulatorios mediante suscripción mensual. NO cubrimos hospitalización ni emergencias médicas graves.

            </section>

                </div>                    </p>

            {/* Sección 5: Uso de la plataforma */}

            <section id="usage" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">              </div>                  </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">

                5. Uso aceptable de la plataforma            </section>                </div>

              </h2>

              </div>

              <div className="space-y-6">

                <div>            {/* Sección 2: Definiciones clave */}

                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Te comprometes a:</h3>

                  <ul className="space-y-2 text-gray-700 text-sm">            <section id="definitions" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">              <p className="text-gray-700 leading-relaxed">

                    <li>• Proporcionar información precisa y actualizada</li>

                    <li>• Usar el servicio solo para fines legales y personales</li>              <h2 className="text-3xl font-bold text-gray-900 mb-6">                Al usar SaludCompartida, aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo con alguna parte de estos términos, no debes usar nuestro servicio.

                    <li>• No compartir tu cuenta con terceros no autorizados</li>

                    <li>• Seguir las indicaciones médicas proporcionadas</li>                2. Definiciones clave              </p>

                    <li>• Respetar al personal médico y de soporte</li>

                  </ul>              </h2>            </section>

                </div>

              <div className="space-y-4">

                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">

                  <h3 className="font-bold text-red-900 mb-3">Usos prohibidos:</h3>                <div className="border-l-4 border-cyan-500 pl-4">            {/* Sección 2: Definiciones */}

                  <ul className="space-y-1 text-red-800 text-sm">

                    <li>• Uso fraudulento de códigos de descuento</li>                  <h3 className="font-bold text-gray-900 mb-1">Usuario</h3>            <section id="definitions" className="bg-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">

                    <li>• Consultas para obtener prescripciones indebidas</li>

                    <li>• Abuso del servicio de telemedicina</li>                  <p className="text-gray-700 text-sm">              <h2 className="text-3xl font-bold text-gray-900 mb-6">

                    <li>• Intentos de vulnerar la seguridad de la plataforma</li>

                  </ul>                    La persona que contrata la suscripción (migrante) y las personas designadas como usuarios del servicio en el país de destino (hasta 4 personas).                2. Definiciones clave

                </div>

              </div>                  </p>              </h2>

            </section>

                </div>              <div className="space-y-4">

            {/* Sección 6: Privacidad y datos */}

            <section id="privacy" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">                <div className="border-l-4 border-cyan-500 pl-4">                <div className="border-l-4 border-cyan-500 pl-4">

              <h2 className="text-3xl font-bold text-gray-900 mb-6">

                6. Privacidad y protección de datos                  <h3 className="font-bold text-gray-900 mb-1">Suscripción</h3>                  <h3 className="font-bold text-gray-900 mb-1">Usuario</h3>

              </h2>

              <p className="text-gray-700 mb-4 leading-relaxed">                  <p className="text-gray-700 text-sm">                  <p className="text-gray-700 text-sm">

                El uso de nuestros servicios está sujeto a nuestra Política de Privacidad, que forma parte integral de estos términos.

              </p>                    El pago mensual recurrente que da acceso a todos los servicios de SaludCompartida.                    La persona que contrata la suscripción (migrante) y las personas designadas como usuarios del servicio en el país de destino (hasta 4 personas).

              <ul className="space-y-2 text-gray-700 text-sm">

                <li>• Cumplimos con la Ley Federal de Protección de Datos Personales (LFPDPPP)</li>                  </p>                  </p>

                <li>• Tus datos médicos están encriptados y protegidos</li>

                <li>• Solo personal autorizado accede a tu información</li>                </div>                </div>

                <li>• Puedes ejercer tus derechos ARCO en cualquier momento</li>

              </ul>                <div className="border-l-4 border-cyan-500 pl-4">                <div className="border-l-4 border-cyan-500 pl-4">

            </section>

                  <h3 className="font-bold text-gray-900 mb-1">Servicios</h3>                  <h3 className="font-bold text-gray-900 mb-1">Suscripción</h3>

            {/* Sección 7: Limitaciones del servicio */}

            <section id="limitations" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">                  <p className="text-gray-700 text-sm">                  <p className="text-gray-700 text-sm">

              <h2 className="text-3xl font-bold text-gray-900 mb-6">

                7. Limitaciones del servicio                    El conjunto de beneficios de salud que proporciona SaludCompartida, incluyendo telemedicina, descuentos en farmacias y acceso con descuento a atención médica presencial.                    El pago mensual recurrente que da acceso a todos los servicios de SaludCompartida.

              </h2>

                  </p>                  </p>

              <div className="space-y-6">

                <div>                </div>                </div>

                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Servicios NO cubiertos:</h3>

                  <ul className="space-y-2 text-gray-700 text-sm">                <div className="border-l-4 border-cyan-500 pl-4">                <div className="border-l-4 border-cyan-500 pl-4">

                    <li>• Emergencias médicas que requieran atención inmediata presencial</li>

                    <li>• Cirugías y procedimientos invasivos</li>                  <h3 className="font-bold text-gray-900 mb-1">Plataforma</h3>                  <h3 className="font-bold text-gray-900 mb-1">Servicios</h3>

                    <li>• Prescripción de medicamentos controlados</li>

                    <li>• Tratamientos experimentales o no aprobados</li>                  <p className="text-gray-700 text-sm">                  <p className="text-gray-700 text-sm">

                    <li>• Atención médica fuera de México</li>

                  </ul>                    El sitio web, aplicación móvil y sistema WhatsApp a través del cual se accede a los servicios de SaludCompartida.                    El conjunto de beneficios de salud que proporciona SaludCompartida, incluyendo telemedicina, descuentos en farmacias y acceso con descuento a atención médica presencial.

                </div>

                  </p>                  </p>

                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">

                  <p className="text-red-900 font-semibold">                </div>                </div>

                    Importante: SaludCompartida no reemplaza la atención médica de emergencia. En caso de emergencia, llama al 911 o acude al hospital más cercano.

                  </p>              </div>                <div className="border-l-4 border-cyan-500 pl-4">

                </div>

              </div>            </section>                  <h3 className="font-bold text-gray-900 mb-1">Plataforma</h3>

            </section>

                  <p className="text-gray-700 text-sm">

            {/* Sección 8: Responsabilidades */}

            <section id="responsibilities" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">            {/* Sección 3: Descripción de servicios */}                    El sitio web, aplicación móvil y sistema WhatsApp a través del cual se accede a los servicios de SaludCompartida.

              <h2 className="text-3xl font-bold text-gray-900 mb-6">

                8. Responsabilidades y limitación de responsabilidad            <section id="services" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">                  </p>

              </h2>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">                </div>

              <div className="space-y-6">

                <div>                3. Descripción de servicios              </div>

                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Responsabilidad del usuario:</h3>

                  <p className="text-gray-700 text-sm leading-relaxed">              </h2>            </section>

                    Eres responsable de proporcionar información médica precisa y seguir las indicaciones médicas recibidas.

                  </p>              

                </div>

              <div className="space-y-6">            {/* Sección 3: Descripción de servicios */}

                <div>

                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Responsabilidad de SaludCompartida:</h3>                {/* Telemedicina */}            <section id="services" className="bg-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">

                  <p className="text-gray-700 text-sm leading-relaxed">

                    Nos esforzamos por proporcionar servicios de calidad, pero no garantizamos resultados médicos específicos.                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 border border-cyan-200">              <h2 className="text-3xl font-bold text-gray-900 mb-6">

                  </p>

                </div>                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Telemedicina 24/7</h3>                3. Descripción de servicios



                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">              </h2>

                  <p className="text-blue-900 text-sm leading-relaxed">

                    <strong>Limitación de responsabilidad:</strong> SaludCompartida no será responsable por daños indirectos, incidentales o consecuentes derivados del uso del servicio, excepto donde la ley lo prohíba.                    Consultas médicas ilimitadas por videollamada, teléfono o WhatsApp con profesionales certificados en México.              

                  </p>

                </div>                  </p>              <div className="space-y-6">

              </div>

            </section>                  <ul className="text-gray-600 text-sm space-y-1">                {/* Telemedicina */}



            {/* Sección 9: Modificaciones */}                    <li>• Atención médica general</li>                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6">

            <section id="modifications" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">

              <h2 className="text-3xl font-bold text-gray-900 mb-6">                    <li>• Prescripción electrónica cuando sea permitido</li>                  <div className="flex items-start gap-4">

                9. Modificaciones al servicio y términos

              </h2>                    <li>• Orientación sobre síntomas y tratamientos</li>                    <svg className="w-8 h-8 text-cyan-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

              <p className="text-gray-700 mb-4 leading-relaxed">

                Nos reservamos el derecho de:                    <li>• Recomendación de atención presencial cuando sea necesario</li>                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />

              </p>

              <ul className="space-y-2 text-gray-700 text-sm mb-6">                  </ul>                    </svg>

                <li>• Modificar o discontinuar servicios con previo aviso</li>

                <li>• Actualizar estos términos y condiciones</li>                </div>                    <div>

                <li>• Cambiar los precios de suscripción (notificando con 30 días de anticipación)</li>

              </ul>                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Telemedicina 24/7</h3>

              <p className="text-gray-700 text-sm leading-relaxed">

                <strong>Notificación de cambios:</strong> Te notificaremos por correo electrónico sobre cambios importantes. El uso continuado del servicio después de los cambios constituye aceptación de los nuevos términos.                {/* Descuentos en Farmacias */}                      <p className="text-gray-700 text-sm mb-3 leading-relaxed">

              </p>

            </section>                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-pink-200">                        Consultas médicas ilimitadas por videollamada, teléfono o WhatsApp con profesionales certificados en México. Las consultas están disponibles en días y horarios establecidos por SaludCompartida.



            {/* Sección 10: Ley aplicable */}                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Descuentos en Farmacias</h3>                      </p>

            <section id="jurisdiction" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">

              <h2 className="text-3xl font-bold text-gray-900 mb-6">                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">                      <ul className="text-gray-600 text-sm space-y-1">

                10. Ley aplicable y jurisdicción

              </h2>                    Acceso a descuentos de 40-75% en más de 1,700 farmacias afiliadas.                        <li>• Atención médica general</li>

              <p className="text-gray-700 mb-4 leading-relaxed">

                Estos términos se rigen por las leyes de los Estados Unidos Mexicanos.                  </p>                        <li>• Prescripción electrónica cuando sea permitido</li>

              </p>

              <p className="text-gray-700 mb-4 leading-relaxed">                  <ul className="text-gray-600 text-sm space-y-1">                        <li>• Orientación sobre síntomas y tratamientos</li>

                Cualquier disputa relacionada con estos términos será resuelta en los tribunales competentes de México.

              </p>                    <li>• Red de más de 1,700 ubicaciones</li>                        <li>• Recomendación de atención presencial cuando sea necesario</li>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">

                <h3 className="font-bold text-gray-900 mb-2 text-lg">Resolución de disputas:</h3>                    <li>• Descuentos aplicables con receta electrónica</li>                      </ul>

                <p className="text-gray-700 text-sm leading-relaxed">

                  Antes de iniciar cualquier procedimiento legal, te comprometemos a intentar resolver cualquier disputa mediante negociación directa con nuestro equipo de soporte.                    <li>• Medicamentos autorizados (excluyendo controlados)</li>                    </div>

                </p>

              </div>                  </ul>                  </div>

            </section>

                </div>                </div>

          </div>

        </div>



        {/* Contacto */}                {/* Terapia Psicológica */}                {/* Descuentos en Farmacias */}

        <div className="mt-12 text-center bg-gradient-to-r from-cyan-50 to-purple-50 rounded-2xl p-8 border border-cyan-200">

          <h3 className="text-2xl font-bold text-gray-900 mb-4">                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">

            ¿Preguntas sobre estos términos?

          </h3>                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Terapia Psicológica</h3>                  <div className="flex items-start gap-4">

          <p className="text-gray-700 mb-6">

            Si tienes dudas o necesitas aclaraciones, nuestro equipo está aquí para ayudarte.                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">                    <svg className="w-8 h-8 text-pink-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">                    Acceso a sesiones de terapia psicológica con profesionales certificados.                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />

            <a href="mailto:legal@saludcompartida.com" className="text-cyan-600 hover:text-cyan-700 font-semibold">

              📧 legal@saludcompartida.com                  </p>                    </svg>

            </a>

            <span className="hidden md:inline text-gray-400">|</span>                  <ul className="text-gray-600 text-sm space-y-1">                    <div>

            <a href="mailto:contacto@saludcompartida.com" className="text-cyan-600 hover:text-cyan-700 font-semibold">

              💬 contacto@saludcompartida.com                    <li>• Sesiones individuales por videollamada</li>                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Descuentos en Farmacias</h3>

            </a>

          </div>                    <li>• Profesionales con cédula certificada</li>                      <p className="text-gray-700 text-sm mb-3 leading-relaxed">

        </div>

      </div>                    <li>• Tratamiento de ansiedad, depresión, estrés</li>                        Acceso a descuentos de 40-75% en más de 1,700 farmacias afiliadas, cubriendo el 95% del territorio mexicano.



      <Footer />                  </ul>                      </p>

    </div>

  );                </div>                      <ul className="text-gray-600 text-sm space-y-1">

}

              </div>                        <li>• Red de más de 1,700 ubicaciones</li>

            </section>                        <li>• Descuentos aplicables con receta electrónica</li>

                        <li>• Medicamentos autorizados (excluyendo controlados)</li>

            {/* Sección 4: Suscripción y pagos */}                        <li>• Productos adicionales con descuento disponibles</li>

            <section id="subscription" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">                      </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">                    </div>

                4. Suscripción y pagos                  </div>

              </h2>                </div>



              <div className="space-y-6">                {/* Terapia Psicológica */}

                <div className="bg-gradient-to-r from-cyan-50 to-purple-50 rounded-xl p-6 border border-cyan-200">                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">

                  <p className="text-gray-700 mb-4 leading-relaxed">                  <div className="flex items-start gap-4">

                    <strong className="text-gray-900">Plan mensual:</strong> $12 USD/mes por cobertura para hasta 4 personas.                    <svg className="w-8 h-8 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                  </p>                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />

                  <p className="text-gray-700 mb-4 leading-relaxed">                    </svg>

                    <strong className="text-gray-900">Renovación automática:</strong> Tu suscripción se renueva automáticamente cada mes hasta que la canceles.                    <div>

                  </p>                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Sesiones Psicológicas</h3>

                  <p className="text-gray-700 mb-4 leading-relaxed">                      <p className="text-gray-700 text-sm mb-3 leading-relaxed">

                    <strong className="text-gray-900">Métodos de pago:</strong> Aceptamos tarjetas de crédito/débito procesadas a través de proveedores seguros como Stripe.                        Una sesión psicológica semanal por videollamada con profesionales titulados y registrados en México (duración máxima: 50 minutos).

                  </p>                      </p>

                  <p className="text-gray-700 leading-relaxed">                      <ul className="text-gray-600 text-sm space-y-1">

                    <strong className="text-gray-900">Cancelación:</strong> Puedes cancelar en cualquier momento. El servicio permanecerá activo hasta el final del período pagado.                        <li>• Apoyo psicológico y emocional</li>

                  </p>                        <li>• Citas programadas según disponibilidad</li>

                </div>                        <li>• Consentimiento requerido para menores</li>

                        <li>• Confidencialidad profesional garantizada</li>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">                      </ul>

                  <p className="text-yellow-900 font-semibold">                    </div>

                    Importante: No ofrecemos reembolsos por períodos parciales. Si cancelas, el servicio estará disponible hasta el final del mes pagado.                  </div>

                  </p>                </div>

                </div>

              </div>                {/* Acceso con descuento */}

            </section>                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6">

                  <div className="flex items-start gap-4">

            {/* Sección 5: Uso de la plataforma */}                    <svg className="w-8 h-8 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

            <section id="usage" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />

              <h2 className="text-3xl font-bold text-gray-900 mb-6">                    </svg>

                5. Uso aceptable de la plataforma                    <div>

              </h2>                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Doctores y Especialistas</h3>

                      <p className="text-gray-700 text-sm mb-3 leading-relaxed">

              <div className="space-y-6">                        Acceso con descuento a consultas presenciales con médicos generales, especialistas y estudios médicos ambulatorios.

                <div>                      </p>

                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Te comprometes a:</h3>                      <ul className="text-gray-600 text-sm space-y-1">

                  <ul className="space-y-2 text-gray-700 text-sm">                        <li>• Consultas presenciales con descuento</li>

                    <li>• Proporcionar información precisa y actualizada</li>                        <li>• Acceso a especialistas</li>

                    <li>• Usar el servicio solo para fines legales y personales</li>                        <li>• Exámenes médicos ambulatorios</li>

                    <li>• No compartir tu cuenta con terceros no autorizados</li>                        <li>• Red en crecimiento constante</li>

                    <li>• Seguir las indicaciones médicas proporcionadas</li>                      </ul>

                    <li>• Respetar al personal médico y de soporte</li>                    </div>

                  </ul>                  </div>

                </div>                </div>

              </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">

                  <h3 className="font-bold text-red-900 mb-3">Usos prohibidos:</h3>              {/* Exclusiones importantes */}

                  <ul className="space-y-1 text-red-800 text-sm">              <div className="bg-red-50 border-l-4 border-red-400 p-6 mt-6 rounded-r-lg">

                    <li>• Uso fraudulento de códigos de descuento</li>                <div className="flex items-start">

                    <li>• Consultas para obtener prescripciones indebidas</li>                  <svg className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">

                    <li>• Abuso del servicio de telemedicina</li>                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />

                    <li>• Intentos de vulnerar la seguridad de la plataforma</li>                  </svg>

                  </ul>                  <div>

                </div>                    <p className="font-semibold text-red-900 mb-2">

              </div>                      NO incluido en el servicio:

            </section>                    </p>

                    <ul className="text-red-800 text-sm space-y-1">

            {/* Sección 6: Privacidad y datos */}                      <li>• Hospitalización</li>

            <section id="privacy" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">                      <li>• Cirugías</li>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">                      <li>• Emergencias médicas graves</li>

                6. Privacidad y protección de datos                      <li>• Tratamientos especializados de largo plazo</li>

              </h2>                    </ul>

              <p className="text-gray-700 mb-4 leading-relaxed">                  </div>

                El uso de nuestros servicios está sujeto a nuestra Política de Privacidad, que forma parte integral de estos términos.                </div>

              </p>              </div>

              <ul className="space-y-2 text-gray-700 text-sm">            </section>

                <li>• Cumplimos con la Ley Federal de Protección de Datos Personales (LFPDPPP)</li>

                <li>• Tus datos médicos están encriptados y protegidos</li>            {/* Sección 4: Suscripción y pagos */}

                <li>• Solo personal autorizado accede a tu información</li>            <section id="subscription" className="bg-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">

                <li>• Puedes ejercer tus derechos ARCO en cualquier momento</li>              <h2 className="text-3xl font-bold text-gray-900 mb-6">

              </ul>                4. Suscripción y pagos

            </section>              </h2>



            {/* Sección 7: Limitaciones del servicio */}              <div className="space-y-6">

            <section id="limitations" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">                <div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Costo del servicio</h3>

                7. Limitaciones del servicio                  <div className="bg-gradient-to-r from-cyan-50 to-purple-50 rounded-xl p-6">

              </h2>                    <p className="text-gray-700 mb-4 leading-relaxed">

                      El costo de la suscripción mensual varía entre <span className="font-bold text-cyan-700">$12 a $18 USD</span> dependiendo del plan elegido y el país de destino del servicio.

              <div className="space-y-6">                    </p>

                <div>                    <div className="grid md:grid-cols-2 gap-4 text-sm">

                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Servicios NO cubiertos:</h3>                      <div className="bg-white rounded-lg p-4">

                  <ul className="space-y-2 text-gray-700 text-sm">                        <p className="font-semibold text-gray-900 mb-1">Plan Básico LATAM</p>

                    <li>• Emergencias médicas que requieran atención inmediata presencial</li>                        <p className="text-gray-600">$12/mes - Servicios esenciales</p>

                    <li>• Cirugías y procedimientos invasivos</li>                      </div>

                    <li>• Prescripción de medicamentos controlados</li>                      <div className="bg-white rounded-lg p-4">

                    <li>• Tratamientos experimentales o no aprobados</li>                        <p className="font-semibold text-gray-900 mb-1">Plan Premium LATAM</p>

                    <li>• Atención médica fuera de México</li>                        <p className="text-gray-600">$18/mes - Servicios completos</p>

                  </ul>                      </div>

                </div>                    </div>

                  </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">                </div>

                  <p className="text-red-900 font-semibold">

                    Importante: SaludCompartida no reemplaza la atención médica de emergencia. En caso de emergencia, llama al 911 o acude al hospital más cercano.                <div>

                  </p>                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Cobertura familiar</h3>

                </div>                  <p className="text-gray-700 mb-3 leading-relaxed">

              </div>                    Cada suscripción cubre hasta 4 usuarios familiares en el país de destino. El migrante que contrata designa un usuario principal quien puede agregar hasta 3 personas adicionales sin necesidad de informar a SaludCompartida.

            </section>                  </p>

                </div>

            {/* Sección 8: Responsabilidades */}

            <section id="responsibilities" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">                <div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Renovación automática</h3>

                8. Responsabilidades y limitación de responsabilidad                  <p className="text-gray-700 mb-3 leading-relaxed">

              </h2>                    La suscripción se renueva automáticamente cada mes hasta que el usuario cancele el servicio. El cargo se realizará al método de pago registrado en la misma fecha de cada mes.

                  </p>

              <div className="space-y-6">                </div>

                <div>

                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Responsabilidad del usuario:</h3>                <div>

                  <p className="text-gray-700 text-sm leading-relaxed">                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Cancelación</h3>

                    Eres responsable de proporcionar información médica precisa y seguir las indicaciones médicas recibidas.                  <p className="text-gray-700 mb-3 leading-relaxed">

                  </p>                    Puedes cancelar tu suscripción en cualquier momento desde la plataforma o contactando a nuestro equipo. La cancelación será efectiva al final del período de facturación actual. No se realizarán cargos adicionales después de la cancelación.

                </div>                  </p>

                </div>

                <div>

                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Responsabilidad de SaludCompartida:</h3>                <div>

                  <p className="text-gray-700 text-sm leading-relaxed">                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Política de reembolsos</h3>

                    Nos esforzamos por proporcionar servicios de calidad, pero no garantizamos resultados médicos específicos.                  <p className="text-gray-700 mb-3 leading-relaxed">

                  </p>                    Los pagos son no reembolsables excepto en casos donde SaludCompartida no haya podido proporcionar los servicios contratados por causas atribuibles a la plataforma. Las solicitudes de reembolso deben presentarse dentro de los 7 días posteriores al cargo.

                </div>                  </p>

                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">

                  <p className="text-blue-900 text-sm leading-relaxed">                <div>

                    <strong>Limitación de responsabilidad:</strong> SaludCompartida no será responsable por daños indirectos, incidentales o consecuentes derivados del uso del servicio, excepto donde la ley lo prohíba.                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Métodos de pago aceptados</h3>

                  </p>                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">

                </div>                    <div className="bg-gray-50 rounded-lg p-3 text-center">

              </div>                      <p className="font-medium text-gray-900">Tarjeta de crédito</p>

            </section>                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 text-center">

            {/* Sección 9: Modificaciones */}                      <p className="font-medium text-gray-900">Tarjeta de débito</p>

            <section id="modifications" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">                    </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">                    <div className="bg-gray-50 rounded-lg p-3 text-center">

                9. Modificaciones al servicio y términos                      <p className="font-medium text-gray-900">Apps de pago</p>

              </h2>                    </div>

              <p className="text-gray-700 mb-4 leading-relaxed">                    <div className="bg-gray-50 rounded-lg p-3 text-center">

                Nos reservamos el derecho de:                      <p className="font-medium text-gray-900">Apps de remesas</p>

              </p>                    </div>

              <ul className="space-y-2 text-gray-700 text-sm mb-6">                  </div>

                <li>• Modificar o discontinuar servicios con previo aviso</li>                </div>

                <li>• Actualizar estos términos y condiciones</li>              </div>

                <li>• Cambiar los precios de suscripción (notificando con 30 días de anticipación)</li>            </section>

              </ul>

              <p className="text-gray-700 text-sm leading-relaxed">            {/* Sección 5: Uso de la plataforma */}

                <strong>Notificación de cambios:</strong> Te notificaremos por correo electrónico sobre cambios importantes. El uso continuado del servicio después de los cambios constituye aceptación de los nuevos términos.            <section id="usage" className="bg-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">

              </p>              <h2 className="text-3xl font-bold text-gray-900 mb-6">

            </section>                5. Uso de la plataforma

              </h2>

            {/* Sección 10: Ley aplicable */}

            <section id="jurisdiction" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">              <div className="space-y-6">

              <h2 className="text-3xl font-bold text-gray-900 mb-6">                <div>

                10. Ley aplicable y jurisdicción                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Requisitos para usar el servicio</h3>

              </h2>                  <ul className="space-y-2 text-gray-700">

              <p className="text-gray-700 mb-4 leading-relaxed">                    <li className="flex items-start gap-2">

                Estos términos se rigen por las leyes de los Estados Unidos Mexicanos.                      <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">

              </p>                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />

              <p className="text-gray-700 mb-4 leading-relaxed">                      </svg>

                Cualquier disputa relacionada con estos términos será resuelta en los tribunales competentes de México.                      <span>Tener una suscripción activa</span>

              </p>                    </li>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">                    <li className="flex items-start gap-2">

                <h3 className="font-bold text-gray-900 mb-2 text-lg">Resolución de disputas:</h3>                      <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">

                <p className="text-gray-700 text-sm leading-relaxed">                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />

                  Antes de iniciar cualquier procedimiento legal, te comprometemos a intentar resolver cualquier disputa mediante negociación directa con nuestro equipo de soporte.                      </svg>

                </p>                      <span>Acceso a smartphone con WhatsApp</span>

              </div>                    </li>

            </section>                    <li className="flex items-start gap-2">

                      <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">

          </div>                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />

        </div>                      </svg>

                      <span>Conexión a internet</span>

        {/* Contacto */}                    </li>

        <div className="mt-12 text-center bg-gradient-to-r from-cyan-50 to-purple-50 rounded-2xl p-8 border border-cyan-200">                    <li className="flex items-start gap-2">

          <h3 className="text-2xl font-bold text-gray-900 mb-4">                      <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">

            ¿Preguntas sobre estos términos?                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />

          </h3>                      </svg>

          <p className="text-gray-700 mb-6">                      <span>Proporcionar información veraz y actualizada</span>

            Si tienes dudas o necesitas aclaraciones, nuestro equipo está aquí para ayudarte.                    </li>

          </p>                  </ul>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">                </div>

            <a href="mailto:legal@saludcompartida.com" className="text-cyan-600 hover:text-cyan-700 font-semibold">

              📧 legal@saludcompartida.com                <div className="bg-gradient-to-r from-green-50 to-cyan-50 rounded-xl p-6">

            </a>                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Activación en 30 segundos</h3>

            <span className="hidden md:inline text-gray-400">|</span>                  <p className="text-gray-700 leading-relaxed">

            <a href="mailto:contacto@saludcompartida.com" className="text-cyan-600 hover:text-cyan-700 font-semibold">                    Después de completar tu suscripción, recibirás un código de activación por WhatsApp en menos de 30 segundos. Este código permite el acceso inmediato a todos los servicios de la plataforma.

              💬 contacto@saludcompartida.com                  </p>

            </a>                </div>

          </div>

        </div>                <div>

      </div>                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Responsabilidades del usuario</h3>

                  <ul className="space-y-2 text-gray-700 text-sm">

      <Footer />                    <li>• Mantener la confidencialidad de tu cuenta y contraseña</li>

    </div>                    <li>• Proporcionar información médica precisa y completa</li>

  );                    <li>• Usar los servicios de forma apropiada y legal</li>

}                    <li>• Seguir las indicaciones y recomendaciones médicas</li>

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
            <section id="privacy" className="bg-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                6. Privacidad y datos
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                La protección de tus datos personales y de salud es una prioridad para SaludCompartida. Cumplimos con todas las regulaciones aplicables de protección de datos.
              </p>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border border-purple-200">
                <p className="text-gray-700 leading-relaxed">
                  Para información detallada sobre cómo recopilamos, usamos y protegemos tus datos personales, consulta nuestro{' '}
                  <button
                    onClick={() => navigate('/post-privacy')}
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
            <section id="limitations" className="bg-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">
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
            <section id="responsibilities" className="bg-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">
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
            <section id="modifications" className="bg-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">
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
            <section id="jurisdiction" className="bg-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">
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
            onClick={() => navigate('/post-privacy')}
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