import { useNavigate } from 'react-router-dom';import { useNavigate } from 'react-router-dom';import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

import Footer from '../components/Footer';import { useState } from 'react';import { useState, useEffect } from 'react';



export default function PostPrivacy() {import Footer from '../components/Footer';import TopNav from '../components/TopNav';

  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('');



  const scrollToSection = (sectionId) => {export default function PostPrivacy() {export default function PostPrivacy() {

    const element = document.getElementById(sectionId);

    if (element) {  const navigate = useNavigate();  const navigate = useNavigate();

      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setActiveSection(sectionId);  const [activeSection, setActiveSection] = useState('');  const [activeSection, setActiveSection] = useState('');

    }

  };



  const sections = [  const scrollToSection = (sectionId) => {  // Scroll to top when component mounts

    { id: 'intro', title: '1. Introducción' },

    { id: 'responsible', title: '2. Responsable del tratamiento' },    const element = document.getElementById(sectionId);  useEffect(() => {

    { id: 'data-collection', title: '3. Datos que recopilamos' },

    { id: 'purposes', title: '4. Finalidades del tratamiento' },    if (element) {    window.scrollTo(0, 0);

    { id: 'legal-basis', title: '5. Fundamento legal' },

    { id: 'transfers', title: '6. Transferencia de datos' },      element.scrollIntoView({ behavior: 'smooth', block: 'start' });  }, []);

    { id: 'arco-rights', title: '7. Derechos ARCO' },

    { id: 'security', title: '8. Seguridad de datos' },      setActiveSection(sectionId);

    { id: 'cookies', title: '9. Cookies y tecnologías' },

    { id: 'minors', title: '10. Menores de edad' },    }  const scrollToSection = (sectionId) => {

    { id: 'changes', title: '11. Cambios al aviso' }

  ];  };    const element = document.getElementById(sectionId);



  return (    if (element) {

    <div className="min-h-screen bg-white">

      {/* Header - Solo Volver */}  const sections = [      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">    { id: 'intro', title: '1. Introducción' },      setActiveSection(sectionId);

          <img

            src="/saludcompartida logo WT.png"    { id: 'responsible', title: '2. Responsable del tratamiento' },    }

            alt="SaludCompartida"

            className="h-16 cursor-pointer"    { id: 'data-collection', title: '3. Datos que recopilamos' },  };

            onClick={() => navigate('/page4')}

          />    { id: 'purposes', title: '4. Finalidades del tratamiento' },

          <button

            onClick={() => navigate('/page4')}    { id: 'legal-basis', title: '5. Fundamento legal' },  const sections = [

            className="text-gray-600 hover:text-gray-900 font-medium text-lg transition-colors"

          >    { id: 'transfers', title: '6. Transferencia de datos' },    { id: 'intro', title: '1. Introducción' },

            Volver

          </button>    { id: 'arco-rights', title: '7. Derechos ARCO' },    { id: 'responsible', title: '2. Responsable del tratamiento' },

        </div>

      </header>    { id: 'security', title: '8. Seguridad de datos' },    { id: 'data-collection', title: '3. Datos que recopilamos' },



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">    { id: 'cookies', title: '9. Cookies y tecnologías' },    { id: 'purpose', title: '4. Finalidades del tratamiento' },

        {/* Hero Section */}

        <div className="text-center mb-12">    { id: 'minors', title: '10. Menores de edad' },    { id: 'legal-basis', title: '5. Fundamento legal' },

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">

            Política de Privacidad    { id: 'changes', title: '11. Cambios al aviso' }    { id: 'data-transfer', title: '6. Transferencia de datos' },

          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">  ];    { id: 'arco-rights', title: '7. Derechos ARCO' },

            Tu privacidad es fundamental para nosotros. Este aviso describe cómo recopilamos, usamos y protegemos tu información personal.

          </p>    { id: 'security', title: '8. Seguridad de datos' },

          <p className="text-sm text-gray-500 mt-4">

            Última actualización: 7 de noviembre de 2025  return (    { id: 'cookies', title: '9. Cookies y tecnologías' },

          </p>

        </div>    <div className="min-h-screen bg-white">    { id: 'minors', title: '10. Menores de edad' },



        <div className="grid lg:grid-cols-4 gap-8">      {/* Header - Solo Volver */}    { id: 'changes', title: '11. Cambios al aviso' }

          {/* Sidebar - Índice navegable */}

          <div className="lg:col-span-1">      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">  ];

            <div className="bg-gray-50 rounded-xl shadow-lg p-6 sticky top-24 border border-gray-200">

              <h3 className="font-bold text-gray-900 mb-4 text-lg">Índice</h3>        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

              <nav className="space-y-2">

                {sections.map((section) => (          <img  return (

                  <button

                    key={section.id}            src="/saludcompartida logo WT.png"    <div className="min-h-screen bg-white">

                    onClick={() => scrollToSection(section.id)}

                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${            alt="SaludCompartida"      <TopNav internalPage={true} showMenu={true} />

                      activeSection === section.id

                        ? 'bg-purple-100 text-purple-900 font-semibold'            className="h-16 cursor-pointer"

                        : 'text-gray-600 hover:bg-gray-100'

                    }`}            onClick={() => navigate('/page4')}      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                  >

                    {section.title}          />        {/* Botón Volver */}

                  </button>

                ))}          <button        <div className="mb-8">

              </nav>

            </div>            onClick={() => navigate('/page4')}          <button

          </div>

            className="text-gray-600 hover:text-gray-900 font-medium text-lg transition-colors"            onClick={() => navigate('/page4')}

          {/* Contenido principal */}

          <div className="lg:col-span-3 space-y-12">          >            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors"

            

            {/* Sección 1: Introducción */}            Volver          >

            <section id="intro" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">

              <h2 className="text-3xl font-bold text-gray-900 mb-6">          </button>            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                1. Introducción

              </h2>        </div>              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />

              <p className="text-gray-700 mb-4 leading-relaxed">

                SaludCompartida respeta tu privacidad y se compromete a proteger tus datos personales. Este Aviso de Privacidad cumple con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) de México.      </header>            </svg>

              </p>

              <p className="text-gray-700 leading-relaxed">            Volver

                Al usar nuestros servicios, aceptas las prácticas descritas en este aviso.

              </p>      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">          </button>

            </section>

        {/* Hero Section */}        </div>

            {/* Sección 2: Responsable del tratamiento */}

            <section id="responsible" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">        <div className="text-center mb-12">

              <h2 className="text-3xl font-bold text-gray-900 mb-6">

                2. Responsable del tratamiento          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">        {/* Hero Section */}

              </h2>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">            Política de Privacidad        <div className="text-center mb-12">

                <div className="space-y-3 text-gray-700">

                  <p><strong className="text-gray-900">Razón social:</strong> SaludCompartida</p>          </h1>          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">

                  <p><strong className="text-gray-900">Domicilio:</strong> Phoenix, Arizona, Estados Unidos</p>

                  <p><strong className="text-gray-900">Contacto:</strong> <a href="mailto:privacidad@saludcompartida.com" className="text-purple-600 hover:text-purple-700">privacidad@saludcompartida.com</a></p>          <p className="text-lg text-gray-600 max-w-3xl mx-auto">            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                </div>

              </div>            Tu privacidad es fundamental para nosotros. Este aviso describe cómo recopilamos, usamos y protegemos tu información personal.              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />

            </section>

          </p>            </svg>

            {/* Sección 3: Datos que recopilamos */}

            <section id="data-collection" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">          <p className="text-sm text-gray-500 mt-4">          </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">

                3. Datos que recopilamos            Última actualización: 7 de noviembre de 2025          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">

              </h2>

          </p>            Aviso de Privacidad

              <div className="space-y-6">

                {/* Datos de identificación */}        </div>          </h1>

                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 border border-cyan-200">

                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Datos de identificación:</h3>          <p className="text-lg text-gray-600 max-w-3xl mx-auto">

                  <ul className="text-gray-700 text-sm space-y-1">

                    <li>• Nombre completo</li>        <div className="grid lg:grid-cols-4 gap-8">            Tu privacidad es fundamental para nosotros. Conoce cómo protegemos y utilizamos tus datos personales.

                    <li>• Fecha de nacimiento</li>

                    <li>• Número de teléfono</li>          {/* Sidebar - Índice navegable */}          </p>

                    <li>• Correo electrónico</li>

                    <li>• Dirección física</li>          <div className="lg:col-span-1">          <p className="text-sm text-gray-500 mt-4">

                  </ul>

                </div>            <div className="bg-gray-50 rounded-xl shadow-lg p-6 sticky top-24 border border-gray-200">            Última actualización: 7 de noviembre de 2025



                {/* Datos de salud */}              <h3 className="font-bold text-gray-900 mb-4 text-lg">Índice</h3>          </p>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">

                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Datos de salud:</h3>              <nav className="space-y-2">        </div>

                  <ul className="text-gray-700 text-sm space-y-1">

                    <li>• Historial médico</li>                {sections.map((section) => (

                    <li>• Síntomas reportados</li>

                    <li>• Diagnósticos y tratamientos</li>                  <button        <div className="grid lg:grid-cols-4 gap-8">

                    <li>• Recetas médicas</li>

                  </ul>                    key={section.id}          {/* Sidebar - Índice navegable */}

                </div>

                    onClick={() => scrollToSection(section.id)}          <div className="lg:col-span-1">

                {/* Datos de pago */}

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border border-pink-200">                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${            <div className="bg-gray-50 rounded-xl shadow-lg p-6 sticky top-24 border border-gray-200">

                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Datos de pago:</h3>

                  <ul className="text-gray-700 text-sm space-y-1">                      activeSection === section.id              <h3 className="font-bold text-gray-900 mb-4 text-lg">Índice</h3>

                    <li>• Información de tarjeta (procesada por terceros seguros)</li>

                    <li>• Historial de transacciones</li>                        ? 'bg-purple-100 text-purple-900 font-semibold'              <nav className="space-y-2">

                  </ul>

                </div>                        : 'text-gray-600 hover:bg-gray-100'                {sections.map((section) => (

              </div>

            </section>                    }`}                  <button



            {/* Sección 4: Finalidades del tratamiento */}                  >                    key={section.id}

            <section id="purposes" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">

              <h2 className="text-3xl font-bold text-gray-900 mb-6">                    {section.title}                    onClick={() => scrollToSection(section.id)}

                4. Finalidades del tratamiento

              </h2>                  </button>                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${

              <ul className="space-y-3 text-gray-700 text-sm">

                <li className="flex items-start">                ))}                      activeSection === section.id

                  <span className="text-purple-600 mr-2">✓</span>

                  <span>Proporcionar servicios de telemedicina y consultas médicas</span>              </nav>                        ? 'bg-purple-100 text-purple-900 font-semibold'

                </li>

                <li className="flex items-start">            </div>                        : 'text-gray-600 hover:bg-gray-100'

                  <span className="text-purple-600 mr-2">✓</span>

                  <span>Procesar pagos y gestionar suscripciones</span>          </div>                    }`}

                </li>

                <li className="flex items-start">                  >

                  <span className="text-purple-600 mr-2">✓</span>

                  <span>Emitir recetas electrónicas y coordinar con farmacias</span>          {/* Contenido principal */}                    {section.title}

                </li>

                <li className="flex items-start">          <div className="lg:col-span-3 space-y-12">                  </button>

                  <span className="text-purple-600 mr-2">✓</span>

                  <span>Comunicarte información relevante sobre tu salud y suscripción</span>                            ))}

                </li>

                <li className="flex items-start">            {/* Sección 1: Introducción */}              </nav>

                  <span className="text-purple-600 mr-2">✓</span>

                  <span>Mejorar nuestros servicios mediante análisis estadísticos</span>            <section id="intro" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">            </div>

                </li>

              </ul>              <h2 className="text-3xl font-bold text-gray-900 mb-6">          </div>

            </section>

                1. Introducción

            {/* Sección 5: Fundamento legal */}

            <section id="legal-basis" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">              </h2>          {/* Contenido principal */}

              <h2 className="text-3xl font-bold text-gray-900 mb-6">

                5. Fundamento legal              <p className="text-gray-700 mb-4 leading-relaxed">          <div className="lg:col-span-3 space-y-12">

              </h2>

              <p className="text-gray-700 mb-4 leading-relaxed">                SaludCompartida respeta tu privacidad y se compromete a proteger tus datos personales. Este Aviso de Privacidad cumple con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) de México.            

                El tratamiento de tus datos personales se fundamenta en:

              </p>              </p>            {/* Sección 1: Introducción */}

              <ul className="space-y-3 text-gray-700 text-sm">

                <li className="border-l-4 border-purple-500 pl-4">              <p className="text-gray-700 leading-relaxed">            <section id="intro" className="bg-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">

                  Tu consentimiento expreso al registrarte en nuestros servicios

                </li>                Al usar nuestros servicios, aceptas las prácticas descritas en este aviso.              <h2 className="text-3xl font-bold text-gray-900 mb-6">

                <li className="border-l-4 border-purple-500 pl-4">

                  La ejecución del contrato de servicios que celebras con nosotros              </p>                1. Introducción

                </li>

                <li className="border-l-4 border-purple-500 pl-4">            </section>              </h2>

                  El cumplimiento de obligaciones legales aplicables

                </li>              <p className="text-gray-700 mb-4 leading-relaxed">

                <li className="border-l-4 border-purple-500 pl-4">

                  Nuestro interés legítimo en mejorar y personalizar nuestros servicios            {/* Sección 2: Responsable del tratamiento */}                En SaludCompartida, tu privacidad y la protección de tus datos personales son nuestra máxima prioridad. Este aviso de privacidad describe cómo recopilamos, usamos, compartimos y protegemos tu información personal.

                </li>

              </ul>            <section id="responsible" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">              </p>

            </section>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-4">

            {/* Sección 6: Transferencia de datos */}

            <section id="transfers" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">                2. Responsable del tratamiento                <h3 className="font-bold text-gray-900 mb-3">Nuestro compromiso</h3>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">

                6. Transferencia de datos              </h2>                <p className="text-gray-700 text-sm leading-relaxed">

              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed">              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">                  Nos comprometemos a proteger tu información personal y tratarla con la máxima confidencialidad, cumpliendo con todas las leyes aplicables de protección de datos en México y Estados Unidos.

                Podemos transferir tus datos personales a terceros en los siguientes casos:

              </p>                <div className="space-y-3 text-gray-700">                </p>



              <div className="space-y-4">                  <p><strong className="text-gray-900">Razón social:</strong> SaludCompartida</p>              </div>

                <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">

                  <h3 className="font-bold text-gray-900 mb-2">Proveedores de servicios médicos</h3>                  <p><strong className="text-gray-900">Domicilio:</strong> Phoenix, Arizona, Estados Unidos</p>              <p className="text-gray-700 text-sm leading-relaxed">

                  <p className="text-gray-600 text-sm">Doctores, especialistas y personal médico autorizado que proporcionan atención.</p>

                </div>                  <p><strong className="text-gray-900">Contacto:</strong> <a href="mailto:privacidad@saludcompartida.com" className="text-purple-600 hover:text-purple-700">privacidad@saludcompartida.com</a></p>                <strong>Alcance:</strong> Este aviso aplica a todos los usuarios de SaludCompartida, incluyendo tanto a migrantes que contratan el servicio en Estados Unidos como a usuarios que reciben los servicios en México, Centroamérica, Latinoamérica e India.



                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">                </div>              </p>

                  <h3 className="font-bold text-gray-900 mb-2">Farmacias asociadas</h3>

                  <p className="text-gray-600 text-sm">Para procesar descuentos y surtir recetas médicas.</p>              </div>            </section>

                </div>

            </section>

                <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">

                  <h3 className="font-bold text-gray-900 mb-2">Procesadores de pago</h3>            {/* Sección 2: Responsable del tratamiento */}

                  <p className="text-gray-600 text-sm">Servicios como Stripe para procesar transacciones de manera segura.</p>

                </div>            {/* Sección 3: Datos que recopilamos */}            <section id="responsible" className="bg-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">



                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">            <section id="data-collection" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">              <h2 className="text-3xl font-bold text-gray-900 mb-6">

                  <h3 className="font-bold text-gray-900 mb-2">Proveedores tecnológicos</h3>

                  <p className="text-gray-600 text-sm">Servicios de almacenamiento en la nube y comunicaciones (AWS, Twilio, etc.).</p>              <h2 className="text-3xl font-bold text-gray-900 mb-6">                2. Responsable del tratamiento

                </div>

              </div>                3. Datos que recopilamos              </h2>



              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-6 rounded-r-lg">              </h2>              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6">

                <p className="text-yellow-900 font-semibold">

                  Importante: Todos los terceros están obligados contractualmente a proteger tus datos y solo pueden usarlos para los fines autorizados.                <h3 className="font-bold text-gray-900 mb-4 text-lg">SaludCompartida S.A.P.I. de C.V.</h3>

                </p>

              </div>              <div className="space-y-6">                <div className="grid md:grid-cols-2 gap-6">

            </section>

                {/* Datos de identificación */}                  <div>

            {/* Sección 7: Derechos ARCO */}

            <section id="arco-rights" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 border border-cyan-200">                    <p className="text-sm text-gray-600 mb-1">CEO y Representante Legal</p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">

                7. Derechos ARCO                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Datos de identificación:</h3>                    <p className="font-semibold text-gray-900">Fabiola Franco</p>

              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed">                  <ul className="text-gray-700 text-sm space-y-1">                  </div>

                Tienes derecho a:

              </p>                    <li>• Nombre completo</li>                  <div>



              <div className="grid md:grid-cols-2 gap-4 mb-6">                    <li>• Fecha de nacimiento</li>                    <p className="text-sm text-gray-600 mb-1">Correo electrónico</p>

                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-4 border border-cyan-200">

                  <h3 className="font-bold text-gray-900 mb-2">Acceso</h3>                    <li>• Número de teléfono</li>                    <p className="font-semibold text-gray-900">ffranco@saludcompartida.com</p>

                  <p className="text-gray-600 text-sm">Conocer qué datos personales tenemos sobre ti</p>

                </div>                    <li>• Correo electrónico</li>                  </div>



                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">                    <li>• Dirección física</li>                  <div>

                  <h3 className="font-bold text-gray-900 mb-2">Rectificación</h3>

                  <p className="text-gray-600 text-sm">Corregir tus datos si son inexactos</p>                  </ul>                    <p className="text-sm text-gray-600 mb-1">Teléfono de contacto</p>

                </div>

                </div>                    <p className="font-semibold text-gray-900">+1 305 522 7150</p>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 border border-pink-200">

                  <h3 className="font-bold text-gray-900 mb-2">Cancelación</h3>                  </div>

                  <p className="text-gray-600 text-sm">Solicitar que eliminemos tus datos</p>

                </div>                {/* Datos de salud */}                  <div>



                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">                    <p className="text-sm text-gray-600 mb-1">Sitio web</p>

                  <h3 className="font-bold text-gray-900 mb-2">Oposición</h3>

                  <p className="text-gray-600 text-sm">Oponerte al tratamiento de tus datos</p>                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Datos de salud:</h3>                    <p className="font-semibold text-gray-900">saludcompartida.com</p>

                </div>

              </div>                  <ul className="text-gray-700 text-sm space-y-1">                  </div>



              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">                    <li>• Historial médico</li>                </div>

                <p className="text-purple-900 font-semibold">

                  Para ejercer tus derechos: Envía un correo a <a href="mailto:privacidad@saludcompartida.com" className="underline">privacidad@saludcompartida.com</a>                    <li>• Síntomas reportados</li>              </div>

                </p>

              </div>                    <li>• Diagnósticos y tratamientos</li>              <p className="text-gray-700 text-sm mt-6 leading-relaxed">

            </section>

                    <li>• Recetas médicas</li>                SaludCompartida es responsable del tratamiento de tus datos personales y se compromete a proteger tu privacidad de acuerdo con la Ley Federal de Protección de Datos Personales en Posesión de Particulares (México) y regulaciones aplicables en Estados Unidos.

            {/* Sección 8: Seguridad de datos */}

            <section id="security" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">                  </ul>              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">

                8. Seguridad de datos                </div>            </section>

              </h2>

              <p className="text-gray-700 mb-4 leading-relaxed">

                Implementamos medidas de seguridad administrativas, técnicas y físicas para proteger tus datos personales:

              </p>                {/* Datos de pago */}            {/* Sección 3: Datos que recopilamos */}

              <ul className="space-y-2 text-gray-700 text-sm">

                <li>• Encriptación de datos sensibles</li>                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border border-pink-200">            <section id="data-collection" className="bg-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">

                <li>• Acceso restringido solo a personal autorizado</li>

                <li>• Auditorías de seguridad periódicas</li>                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Datos de pago:</h3>              <h2 className="text-3xl font-bold text-gray-900 mb-6">

                <li>• Servidores seguros con certificados SSL</li>

                <li>• Cumplimiento con estándares internacionales de protección de datos</li>                  <ul className="text-gray-700 text-sm space-y-1">                3. Datos personales que recopilamos

              </ul>

            </section>                    <li>• Información de tarjeta (procesada por terceros seguros)</li>              </h2>



            {/* Sección 9: Cookies y tecnologías */}                    <li>• Historial de transacciones</li>              <p className="text-gray-700 mb-6 leading-relaxed">

            <section id="cookies" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">

              <h2 className="text-3xl font-bold text-gray-900 mb-6">                  </ul>                Recopilamos diferentes tipos de información para proporcionar y mejorar nuestros servicios:

                9. Cookies y tecnologías de rastreo

              </h2>                </div>              </p>

              <p className="text-gray-700 mb-4 leading-relaxed">

                Utilizamos cookies y tecnologías similares para:              </div>

              </p>

              <ul className="space-y-2 text-gray-700 text-sm mb-4">            </section>              <div className="space-y-6">

                <li>• Mantener tu sesión activa mientras usas la plataforma</li>

                <li>• Recordar tus preferencias y configuraciones</li>                {/* Datos de identificación */}

                <li>• Analizar el uso de la plataforma para mejorar la experiencia</li>

                <li>• Personalizar el contenido y las recomendaciones</li>            {/* Sección 4: Finalidades del tratamiento */}                <div className="border-l-4 border-cyan-500 pl-6">

              </ul>

              <p className="text-gray-600 text-sm leading-relaxed">            <section id="purposes" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Datos de identificación</h3>

                Puedes configurar tu navegador para rechazar cookies, aunque esto puede limitar algunas funcionalidades de la plataforma.

              </p>              <h2 className="text-3xl font-bold text-gray-900 mb-6">                  <ul className="text-gray-700 text-sm space-y-2">

            </section>

                4. Finalidades del tratamiento                    <li className="flex items-start gap-2">

            {/* Sección 10: Menores de edad */}

            <section id="minors" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">              </h2>                      <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">

              <h2 className="text-3xl font-bold text-gray-900 mb-6">

                10. Protección de menores de edad              <ul className="space-y-3 text-gray-700 text-sm">                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />

              </h2>

              <p className="text-gray-700 mb-4 leading-relaxed">                <li className="flex items-start">                      </svg>

                Los servicios de SaludCompartida pueden ser utilizados por menores de edad bajo la supervisión y consentimiento de un padre o tutor legal.

              </p>                  <span className="text-purple-600 mr-2">✓</span>                      <span><strong>Nombre completo:</strong> Nombre y apellidos del usuario</span>



              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 my-6 rounded-r-lg">                  <span>Proporcionar servicios de telemedicina y consultas médicas</span>                    </li>

                <p className="text-blue-900 font-semibold mb-3">

                  Importante: Si un menor de edad requiere atención médica, el padre o tutor debe proporcionar el consentimiento informado y supervisar el uso del servicio.                </li>                    <li className="flex items-start gap-2">

                </p>

                <p className="text-blue-800 text-sm">                <li className="flex items-start">                      <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">

                  Los datos de salud de menores son tratados con especial cuidado y solo son accesibles por personal médico autorizado y el padre/tutor designado.

                </p>                  <span className="text-purple-600 mr-2">✓</span>                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />

              </div>

            </section>                  <span>Procesar pagos y gestionar suscripciones</span>                      </svg>



            {/* Sección 11: Cambios al aviso */}                </li>                      <span><strong>Número de teléfono:</strong> Para contacto y activación del servicio</span>

            <section id="changes" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">

              <h2 className="text-3xl font-bold text-gray-900 mb-6">                <li className="flex items-start">                    </li>

                11. Cambios a este aviso de privacidad

              </h2>                  <span className="text-purple-600 mr-2">✓</span>                    <li className="flex items-start gap-2">

              <p className="text-gray-700 mb-4 leading-relaxed">

                Nos reservamos el derecho de actualizar este Aviso de Privacidad para reflejar cambios en nuestras prácticas o requisitos legales.                  <span>Emitir recetas electrónicas y coordinar con farmacias</span>                      <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">

              </p>

              <p className="text-gray-700 mb-4 leading-relaxed">                </li>                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />

                Te notificaremos de cambios importantes mediante:

              </p>                <li className="flex items-start">                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />

              <ul className="space-y-2 text-gray-700 text-sm mb-4">

                <li>• Correo electrónico a tu dirección registrada</li>                  <span className="text-purple-600 mr-2">✓</span>                      </svg>

                <li>• Aviso destacado en nuestra plataforma</li>

                <li>• Actualización de la fecha al inicio de este documento</li>                  <span>Comunicarte información relevante sobre tu salud y suscripción</span>                      <span><strong>Correo electrónico:</strong> Para comunicaciones y acceso a la plataforma</span>

              </ul>

              <p className="text-gray-600 text-sm leading-relaxed">                </li>                    </li>

                Te recomendamos revisar periódicamente este aviso para mantenerte informado sobre cómo protegemos tu información.

              </p>                <li className="flex items-start">                  </ul>

            </section>

                  <span className="text-purple-600 mr-2">✓</span>                </div>

          </div>

        </div>                  <span>Mejorar nuestros servicios mediante análisis estadísticos</span>



        {/* Contacto */}                </li>                {/* Datos de salud */}

        <div className="mt-12 text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">

          <h3 className="text-2xl font-bold text-gray-900 mb-4">              </ul>                <div className="bg-red-50 border-l-4 border-red-400 pl-6 py-4 rounded-r-lg">

            ¿Tienes preguntas?

          </h3>            </section>                  <h3 className="font-bold text-red-900 mb-3 text-lg flex items-center gap-2">

          <p className="text-gray-700 mb-6">

            Si tienes dudas sobre este Aviso de Privacidad o deseas ejercer tus derechos ARCO, contáctanos:                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">

          </p>

          <div className="text-center">            {/* Sección 5: Fundamento legal */}                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />

            <a href="mailto:contact@saludcompartida.com" className="text-purple-600 hover:text-purple-700 font-semibold text-lg">

              💬 contact@saludcompartida.com            <section id="legal-basis" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">                    </svg>

            </a>

          </div>              <h2 className="text-3xl font-bold text-gray-900 mb-6">                    Datos sensibles relacionados con la salud

          <p className="text-gray-600 text-sm mt-4">

            Responderemos a tu solicitud en un plazo máximo de 20 días hábiles, de acuerdo con la LFPDPPP.                5. Fundamento legal                  </h3>

          </p>

        </div>              </h2>                  <p className="text-red-800 text-sm mb-3 leading-relaxed">

      </div>

              <p className="text-gray-700 mb-4 leading-relaxed">                    Los siguientes datos de salud son estrictamente confidenciales entre el profesional que brinda la atención y el usuario:

      <Footer />

    </div>                El tratamiento de tus datos personales se fundamenta en:                  </p>

  );

}              </p>                  <ul className="text-red-800 text-sm space-y-1">


              <ul className="space-y-3 text-gray-700 text-sm">                    <li>• Síntomas y motivos de consulta</li>

                <li className="border-l-4 border-purple-500 pl-4">                    <li>• Diagnósticos médicos y psicológicos</li>

                  Tu consentimiento expreso al registrarte en nuestros servicios                    <li>• Antecedentes médicos y familiares</li>

                </li>                    <li>• Recetas y prescripciones médicas</li>

                <li className="border-l-4 border-purple-500 pl-4">                    <li>• Medicamentos actuales y alergias</li>

                  La ejecución del contrato de servicios que celebras con nosotros                    <li>• Expedientes clínicos completos</li>

                </li>                    <li>• Historia psicológica y emocional</li>

                <li className="border-l-4 border-purple-500 pl-4">                    <li>• Resultados y observaciones de consultas</li>

                  El cumplimiento de obligaciones legales aplicables                  </ul>

                </li>                  <div className="bg-white rounded-lg p-4 mt-4">

                <li className="border-l-4 border-purple-500 pl-4">                    <p className="text-red-900 text-sm font-semibold">

                  Nuestro interés legítimo en mejorar y personalizar nuestros servicios                      Protección especial: Estos datos están protegidos bajo confidencialidad profesional conforme a la legislación mexicana.

                </li>                    </p>

              </ul>                  </div>

            </section>                </div>



            {/* Sección 6: Transferencia de datos */}                {/* Datos de familiares */}

            <section id="transfers" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">                <div className="border-l-4 border-purple-500 pl-6">

              <h2 className="text-3xl font-bold text-gray-900 mb-6">                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Datos de familiares usuarios</h3>

                6. Transferencia de datos                  <p className="text-gray-700 text-sm leading-relaxed">

              </h2>                    Información básica de hasta 4 miembros familiares designados como usuarios del servicio (nombre, edad, relación familiar).

              <p className="text-gray-700 mb-6 leading-relaxed">                  </p>

                Podemos transferir tus datos personales a terceros en los siguientes casos:                </div>

              </p>

                {/* Datos de pago */}

              <div className="space-y-4">                <div className="border-l-4 border-pink-500 pl-6">

                <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Datos de pago</h3>

                  <h3 className="font-bold text-gray-900 mb-2">Proveedores de servicios médicos</h3>                  <ul className="text-gray-700 text-sm space-y-2">

                  <p className="text-gray-600 text-sm">Doctores, especialistas y personal médico autorizado que proporcionan atención.</p>                    <li>• Información de tarjeta de crédito/débito (procesada por proveedores seguros)</li>

                </div>                    <li>• Historial de transacciones</li>

                    <li>• Datos de facturación</li>

                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">                  </ul>

                  <h3 className="font-bold text-gray-900 mb-2">Farmacias asociadas</h3>                  <p className="text-gray-600 text-xs mt-3 italic">

                  <p className="text-gray-600 text-sm">Para procesar descuentos y surtir recetas médicas.</p>                    Nota: No almacenamos números completos de tarjetas. Los pagos se procesan mediante plataformas seguras certificadas.

                </div>                  </p>

                </div>

                <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">

                  <h3 className="font-bold text-gray-900 mb-2">Procesadores de pago</h3>                {/* Datos de uso (estadísticos) */}

                  <p className="text-gray-600 text-sm">Servicios como Stripe para procesar transacciones de manera segura.</p>                <div className="bg-gray-50 rounded-xl p-6">

                </div>                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Datos de uso (únicamente estadísticos)</h3>

                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">                    Los siguientes datos se recopilan de forma <strong>anónima y agregada</strong>, sin asociar nombre o identidad individual:

                  <h3 className="font-bold text-gray-900 mb-2">Proveedores tecnológicos</h3>                  </p>

                  <p className="text-gray-600 text-sm">Servicios de almacenamiento en la nube y comunicaciones (AWS, Twilio, etc.).</p>                  <ul className="text-gray-700 text-sm space-y-1">

                </div>                    <li>• Historial de sesiones y frecuencia de uso</li>

              </div>                    <li>• Tipos de consultas solicitadas</li>

                    <li>• Farmacias visitadas y productos comprados con descuento</li>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-6 rounded-r-lg">                    <li>• Datos de conexión (dispositivo, dirección IP, horarios de acceso, navegador)</li>

                <p className="text-yellow-900 font-semibold">                  </ul>

                  Importante: Todos los terceros están obligados contractualmente a proteger tus datos y solo pueden usarlos para los fines autorizados.                </div>

                </p>              </div>

              </div>            </section>

            </section>

            {/* Sección 4: Finalidades del tratamiento */}

            {/* Sección 7: Derechos ARCO */}            <section id="purpose" className="bg-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">

            <section id="arco-rights" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">              <h2 className="text-3xl font-bold text-gray-900 mb-6">

              <h2 className="text-3xl font-bold text-gray-900 mb-6">                4. Finalidades del tratamiento

                7. Derechos ARCO              </h2>

              </h2>              <p className="text-gray-700 mb-6 leading-relaxed">

              <p className="text-gray-700 mb-6 leading-relaxed">                Utilizamos tus datos personales para las siguientes finalidades:

                Tienes derecho a:              </p>

              </p>

              <div className="space-y-6">

              <div className="grid md:grid-cols-2 gap-4 mb-6">                {/* Finalidades primarias */}

                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-4 border border-cyan-200">                <div>

                  <h3 className="font-bold text-gray-900 mb-2">Acceso</h3>                  <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">

                  <p className="text-gray-600 text-sm">Conocer qué datos personales tenemos sobre ti</p>                    <span className="bg-cyan-100 text-cyan-800 text-xs font-semibold px-2.5 py-1 rounded">PRIMARIAS</span>

                </div>                    Prestación de servicios de salud

                  </h3>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">                  <div className="grid md:grid-cols-2 gap-4">

                  <h3 className="font-bold text-gray-900 mb-2">Rectificación</h3>                    <div className="bg-cyan-50 rounded-lg p-4">

                  <p className="text-gray-600 text-sm">Corregir tus datos si son inexactos</p>                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Consultas médicas</h4>

                </div>                      <p className="text-gray-700 text-xs">Proveer consultas de telemedicina con profesionales certificados en México</p>

                    </div>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 border border-pink-200">                    <div className="bg-cyan-50 rounded-lg p-4">

                  <h3 className="font-bold text-gray-900 mb-2">Cancelación</h3>                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Recetas electrónicas</h4>

                  <p className="text-gray-600 text-sm">Solicitar que eliminemos tus datos</p>                      <p className="text-gray-700 text-xs">Gestionar recetas y su uso en farmacias asociadas</p>

                </div>                    </div>

                    <div className="bg-cyan-50 rounded-lg p-4">

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Programa de descuentos</h4>

                  <h3 className="font-bold text-gray-900 mb-2">Oposición</h3>                      <p className="text-gray-700 text-xs">Operar el programa de descuentos en farmacias y servicios médicos</p>

                  <p className="text-gray-600 text-sm">Oponerte al tratamiento de tus datos</p>                    </div>

                </div>                    <div className="bg-cyan-50 rounded-lg p-4">

              </div>                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Sesiones psicológicas</h4>

                      <p className="text-gray-700 text-xs">Facilitar terapia psicológica por videollamada</p>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">                    </div>

                <p className="text-purple-900 font-semibold">                  </div>

                  Para ejercer tus derechos: Envía un correo a <a href="mailto:privacidad@saludcompartida.com" className="underline">privacidad@saludcompartida.com</a>                </div>

                </p>

              </div>                {/* Finalidades secundarias */}

            </section>                <div>

                  <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">

            {/* Sección 8: Seguridad de datos */}                    <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-1 rounded">SECUNDARIAS</span>

            <section id="security" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">                    Mejora y marketing de servicios

              <h2 className="text-3xl font-bold text-gray-900 mb-6">                  </h3>

                8. Seguridad de datos                  <ul className="space-y-3 text-gray-700 text-sm">

              </h2>                    <li className="flex items-start gap-3">

              <p className="text-gray-700 mb-4 leading-relaxed">                      <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                Implementamos medidas de seguridad administrativas, técnicas y físicas para proteger tus datos personales:                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />

              </p>                      </svg>

              <ul className="space-y-2 text-gray-700 text-sm">                      <div>

                <li>• Encriptación de datos sensibles</li>                        <p className="font-medium text-gray-900">Análisis estadístico</p>

                <li>• Acceso restringido solo a personal autorizado</li>                        <p className="text-xs text-gray-600">Monitorear frecuencia y tipo de consumos para mejorar el servicio (sin identificar usuarios individuales)</p>

                <li>• Auditorías de seguridad periódicas</li>                      </div>

                <li>• Servidores seguros con certificados SSL</li>                    </li>

                <li>• Cumplimiento con estándares internacionales de protección de datos</li>                    <li className="flex items-start gap-3">

              </ul>                      <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">

            </section>                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />

                      </svg>

            {/* Sección 9: Cookies y tecnologías */}                      <div>

            <section id="cookies" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">                        <p className="font-medium text-gray-900">Marketing y comunicaciones</p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">                        <p className="text-xs text-gray-600">Enviar información sobre nuevos servicios, promociones y actualizaciones</p>

                9. Cookies y tecnologías de rastreo                      </div>

              </h2>                    </li>

              <p className="text-gray-700 mb-4 leading-relaxed">                    <li className="flex items-start gap-3">

                Utilizamos cookies y tecnologías similares para:                      <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">

              </p>                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />

              <ul className="space-y-2 text-gray-700 text-sm mb-4">                      </svg>

                <li>• Mantener tu sesión activa mientras usas la plataforma</li>                      <div>

                <li>• Recordar tus preferencias y configuraciones</li>                        <p className="font-medium text-gray-900">Desarrollo de productos</p>

                <li>• Analizar el uso de la plataforma para mejorar la experiencia</li>                        <p className="text-xs text-gray-600">Desarrollar nuevos servicios y funcionalidades basados en necesidades identificadas</p>

                <li>• Personalizar el contenido y las recomendaciones</li>                      </div>

              </ul>                    </li>

              <p className="text-gray-600 text-sm leading-relaxed">                  </ul>

                Puedes configurar tu navegador para rechazar cookies, aunque esto puede limitar algunas funcionalidades de la plataforma.                </div>

              </p>

            </section>                {/* Cumplimiento regulatorio */}

                <div>

            {/* Sección 10: Menores de edad */}                  <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">

            <section id="minors" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded">LEGAL</span>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">                    Cumplimiento de requisitos legales

                10. Protección de menores de edad                  </h3>

              </h2>                  <div className="bg-blue-50 rounded-lg p-4">

              <p className="text-gray-700 mb-4 leading-relaxed">                    <p className="text-gray-700 text-sm leading-relaxed">

                Los servicios de SaludCompartida pueden ser utilizados por menores de edad bajo la supervisión y consentimiento de un padre o tutor legal.                      Cumplir con requisitos legales y regulatorios mexicanos, incluyendo la NOM-024 para telemedicina y la Ley Federal de Protección de Datos Personales.

              </p>                    </p>

                  </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 my-6 rounded-r-lg">                </div>

                <p className="text-blue-900 font-semibold mb-3">

                  Importante: Si un menor de edad requiere atención médica, el padre o tutor debe proporcionar el consentimiento informado y supervisar el uso del servicio.                {/* Comunicaciones */}

                </p>                <div>

                <p className="text-blue-800 text-sm">                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Comunicaciones con usuarios</h3>

                  Los datos de salud de menores son tratados con especial cuidado y solo son accesibles por personal médico autorizado y el padre/tutor designado.                  <ul className="text-gray-700 text-sm space-y-2">

                </p>                    <li>• Recordatorios de citas y sesiones programadas</li>

              </div>                    <li>• Información sobre el estado de tu suscripción</li>

            </section>                    <li>• Avisos de cambios en términos, condiciones o políticas</li>

                    <li>• Notificaciones sobre actualizaciones de la plataforma</li>

            {/* Sección 11: Cambios al aviso */}                  </ul>

            <section id="changes" className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">                </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">              </div>

                11. Cambios a este aviso de privacidad            </section>

              </h2>

              <p className="text-gray-700 mb-4 leading-relaxed">            {/* Sección 5: Fundamento legal */}

                Nos reservamos el derecho de actualizar este Aviso de Privacidad para reflejar cambios en nuestras prácticas o requisitos legales.            <section id="legal-basis" className="bg-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">

              </p>              <h2 className="text-3xl font-bold text-gray-900 mb-6">

              <p className="text-gray-700 mb-4 leading-relaxed">                5. Fundamento legal

                Te notificaremos de cambios importantes mediante:              </h2>

              </p>              <p className="text-gray-700 mb-6 leading-relaxed">

              <ul className="space-y-2 text-gray-700 text-sm mb-4">                El tratamiento de tus datos personales se basa en los siguientes fundamentos legales:

                <li>• Correo electrónico a tu dirección registrada</li>              </p>

                <li>• Aviso destacado en nuestra plataforma</li>

                <li>• Actualización de la fecha al inicio de este documento</li>              <div className="grid md:grid-cols-3 gap-6">

              </ul>                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6">

              <p className="text-gray-600 text-sm leading-relaxed">                  <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mb-4">

                Te recomendamos revisar periódicamente este aviso para mantenerte informado sobre cómo protegemos tu información.                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">

              </p>                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />

            </section>                    </svg>

                  </div>

          </div>                  <h3 className="font-bold text-gray-900 mb-2">Consentimiento expreso</h3>

        </div>                  <p className="text-gray-700 text-sm">

                    Al registrarte y usar SaludCompartida, otorgas tu consentimiento para el tratamiento de tus datos según este aviso.

        {/* Contacto */}                  </p>

        <div className="mt-12 text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">                </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">

            ¿Tienes preguntas?                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">

          </h3>                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">

          <p className="text-gray-700 mb-6">                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">

            Si tienes dudas sobre este Aviso de Privacidad o deseas ejercer tus derechos ARCO, contáctanos:                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />

          </p>                    </svg>

          <div className="text-center">                  </div>

            <a href="mailto:contact@saludcompartida.com" className="text-purple-600 hover:text-purple-700 font-semibold text-lg">                  <h3 className="font-bold text-gray-900 mb-2">Ejecución de contrato</h3>

              💬 contact@saludcompartida.com                  <p className="text-gray-700 text-sm">

            </a>                    El procesamiento de datos es necesario para ejecutar el contrato de servicios que aceptas al suscribirte.

          </div>                  </p>

          <p className="text-gray-600 text-sm mt-4">                </div>

            Responderemos a tu solicitud en un plazo máximo de 20 días hábiles, de acuerdo con la LFPDPPP.

          </p>                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6">

        </div>                  <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-4">

      </div>                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />

      <Footer />                    </svg>

    </div>                  </div>

  );                  <h3 className="font-bold text-gray-900 mb-2">Interés legítimo</h3>

}                  <p className="text-gray-700 text-sm">

                    Tenemos un interés legítimo en mejorar nuestros servicios y proteger la seguridad de la plataforma.
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                <p className="text-blue-900 text-sm leading-relaxed">
                  <strong>Cumplimiento normativo:</strong> El tratamiento de datos de salud cumple con las disposiciones especiales de la Ley Federal de Protección de Datos Personales en Posesión de Particulares y las normas aplicables para telemedicina en México.
                </p>
              </div>
            </section>

            {/* Sección 6: Transferencia de datos */}
            <section id="data-transfer" className="bg-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                6. Transferencia de datos
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Para proporcionar nuestros servicios, compartimos tus datos con terceros de confianza bajo estrictos acuerdos de confidencialidad:
              </p>

              <div className="space-y-6">
                {/* Proveedores médicos */}
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                    <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Proveedores de servicios médicos
                  </h3>
                  <ul className="text-gray-700 text-sm space-y-2">
                    <li><strong>Telemedicina:</strong> Médicos y profesionales certificados que proporcionan consultas</li>
                    <li><strong>Farmacias afiliadas:</strong> Red de más de 1,700 ubicaciones para descuentos</li>
                    <li><strong>Psicólogos:</strong> Profesionales titulados para sesiones de terapia</li>
                    <li><strong>Doctores y especialistas:</strong> Para consultas presenciales con descuento</li>
                  </ul>
                </div>

                {/* Procesadores de pago */}
                <div className="border-l-4 border-pink-500 pl-6">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Procesadores de pago</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Utilizamos proveedores de pago certificados y seguros para procesar transacciones. Estos procesadores cumplen con los estándares PCI-DSS para protección de datos financieros.
                  </p>
                </div>

                {/* Infraestructura tecnológica */}
                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Infraestructura tecnológica</h3>
                  <ul className="text-gray-700 text-sm space-y-2">
                    <li><strong>Servidores:</strong> Utilizamos Vercel para hosting del sitio web y AWS para almacenamiento seguro de datos</li>
                    <li><strong>Ubicación:</strong> Nuestros servidores están ubicados en centros de datos certificados en Estados Unidos</li>
                    <li><strong>Seguridad:</strong> Todos los proveedores cumplen con estándares internacionales de seguridad</li>
                  </ul>
                </div>

                {/* Transferencias internacionales */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                  <h3 className="font-bold text-yellow-900 mb-3 text-lg flex items-center gap-2">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Transferencias internacionales
                  </h3>
                  <p className="text-yellow-800 text-sm mb-3 leading-relaxed">
                    Dado que operamos un servicio cross-border entre Estados Unidos y países latinoamericanos, tus datos pueden ser transferidos entre estos países.
                  </p>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-gray-700 text-sm font-medium mb-2">Protecciones implementadas:</p>
                    <ul className="text-gray-600 text-xs space-y-1">
                      <li>• Encriptación de datos en tránsito y en reposo</li>
                      <li>• Contratos de protección de datos con todos los proveedores</li>
                      <li>• Cumplimiento con GDPR para transferencias internacionales</li>
                      <li>• Medidas de seguridad equivalentes en todas las jurisdicciones</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <strong>Importante:</strong> No vendemos, alquilamos ni compartimos tus datos personales con terceros para fines de marketing sin tu consentimiento expreso. Todos nuestros proveedores están obligados contractualmente a proteger tu información y usarla únicamente para los fines autorizados.
                  </p>
                </div>
              </div>
            </section>

            {/* Sección 7: Derechos ARCO */}
            <section id="arco-rights" className="bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
              <h2 className="text-3xl font-bold mb-6">
                7. Tus Derechos ARCO
              </h2>
              <p className="mb-6 leading-relaxed">
                Como titular de datos personales, tienes derecho a conocer, controlar y decidir sobre el uso de tu información:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-bold mb-2 text-lg">Acceso</h3>
                  <p className="text-sm opacity-90">Conocer qué datos personales tenemos sobre ti y para qué los utilizamos</p>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </div>
                  <h3 className="font-bold mb-2 text-lg">Rectificación</h3>
                  <p className="text-sm opacity-90">Corregir información inexacta, incompleta o desactualizada</p>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-bold mb-2 text-lg">Cancelación</h3>
                  <p className="text-sm opacity-90">Solicitar la eliminación de tus datos cuando ya no sean necesarios</p>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-bold mb-2 text-lg">Oposición</h3>
                  <p className="text-sm opacity-90">Oponerte al tratamiento de tus datos para finalidades específicas</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur rounded-xl p-6">
                <h3 className="font-bold text-xl mb-4">¿Cómo ejercer tus derechos?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Envía un correo electrónico</p>
                      <p className="text-sm opacity-90">A: ffranco@saludcompartida.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Incluye la siguiente información</p>
                      <ul className="text-sm opacity-90 space-y-1">
                        <li>• Nombre completo y correo electrónico registrado</li>
                        <li>• Descripción clara del derecho que deseas ejercer</li>
                        <li>• Documentos que acrediten tu identidad</li>
                        <li>• Cualquier elemento que facilite la localización de tus datos</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Responderemos en máximo 20 días hábiles</p>
                      <p className="text-sm opacity-90">Te informaremos sobre la procedencia de tu solicitud y, en su caso, la haremos efectiva dentro de los 15 días hábiles siguientes</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white/10 backdrop-blur rounded-xl p-6">
                <p className="text-sm opacity-90 leading-relaxed">
                  <strong>Revocación de consentimiento:</strong> Puedes revocar tu consentimiento para el tratamiento de tus datos en cualquier momento, sin que esto afecte la legalidad del tratamiento previo. Para revocar tu consentimiento, sigue el mismo procedimiento descrito arriba.
                </p>
              </div>
            </section>

            {/* Sección 8: Seguridad de datos */}
            <section id="security" className="bg-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                8. Seguridad de datos
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Implementamos medidas de seguridad robustas para proteger tus datos personales contra pérdida, acceso no autorizado, alteración o divulgación:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <h3 className="font-bold text-gray-900 text-lg">Encriptación</h3>
                  </div>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• SSL/TLS para datos en tránsito</li>
                    <li>• Encriptación AES-256 para datos en reposo</li>
                    <li>• Protección de contraseñas con algoritmos seguros</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <h3 className="font-bold text-gray-900 text-lg">Control de acceso</h3>
                  </div>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Acceso restringido solo a personal autorizado</li>
                    <li>• Autenticación de dos factores disponible</li>
                    <li>• Monitoreo continuo de actividades sospechosas</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="font-bold text-gray-900 text-lg">Auditorías y respaldos</h3>
                  </div>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Auditorías de seguridad periódicas</li>
                    <li>• Respaldos automáticos regulares</li>
                    <li>• Plan de recuperación ante desastres</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="font-bold text-gray-900 text-lg">Capacitación del personal</h3>
                  </div>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Entrenamiento en protección de datos</li>
                    <li>• Acuerdos de confidencialidad firmados</li>
                    <li>• Protocolo de respuesta ante incidentes</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Conservación de datos</h3>
                <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                  Conservamos tus datos personales solo durante el tiempo necesario para cumplir con las finalidades para las que fueron recopilados:
                </p>
                <ul className="text-gray-700 text-sm space-y-2">
                  <li>• <strong>Datos clínicos:</strong> Mínimo 5 años según regulación mexicana para expedientes médicos electrónicos</li>
                  <li>• <strong>Datos de facturación:</strong> Según requisitos fiscales aplicables</li>
                  <li>• <strong>Datos de cuenta activa:</strong> Durante la vigencia de tu suscripción y hasta 1 año después de la cancelación</li>
                  <li>• <strong>Datos estadísticos anónimos:</strong> Pueden conservarse indefinidamente para análisis e investigación</li>
                </ul>
              </div>

              <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
                <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Notificación de brechas de seguridad
                </h3>
                <p className="text-red-800 text-sm leading-relaxed">
                  En el improbable caso de una brecha de seguridad que comprometa tus datos personales, te notificaremos de inmediato por correo electrónico y a través de la plataforma, junto con las medidas tomadas para mitigar el impacto.
                </p>
              </div>
            </section>

            {/* Sección 9: Cookies y tecnologías */}
            <section id="cookies" className="bg-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                9. Cookies y tecnologías de rastreo
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestra plataforma y entender cómo se utiliza nuestro servicio.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">¿Qué son las cookies?</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web o usas nuestra aplicación. Nos ayudan a recordar tus preferencias y mejorar tu experiencia.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Tipos de cookies que utilizamos</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-cyan-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Cookies esenciales</h4>
                      <p className="text-gray-700 text-xs mb-2">Necesarias para el funcionamiento básico de la plataforma</p>
                      <p className="text-gray-600 text-xs italic">Estas cookies no se pueden desactivar</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Cookies de preferencias</h4>
                      <p className="text-gray-700 text-xs">Recuerdan tus configuraciones y preferencias personalizadas</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Cookies analíticas</h4>
                      <p className="text-gray-700 text-xs">Nos ayudan a entender cómo los usuarios interactúan con nuestra plataforma</p>
                    </div>
                    <div className="bg-pink-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Cookies de seguridad</h4>
                      <p className="text-gray-700 text-xs">Protegen tu cuenta y detectan actividades fraudulentas</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Herramientas de análisis</h3>
                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                    Utilizamos servicios de análisis de terceros (como Google Analytics) para comprender cómo se usa nuestra plataforma. Estos servicios pueden usar cookies para recopilar información anónima sobre:
                  </p>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Páginas visitadas y tiempo de permanencia</li>
                    <li>• Dispositivos y navegadores utilizados</li>
                    <li>• Ubicación geográfica aproximada</li>
                    <li>• Patrones de navegación y clics</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-cyan-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Control de cookies</h3>
                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                    Puedes controlar y administrar las cookies de las siguientes formas:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Configuración del navegador</p>
                        <p className="text-gray-600 text-xs">La mayoría de navegadores permiten bloquear o eliminar cookies desde su configuración</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Preferencias de la plataforma</p>
                        <p className="text-gray-600 text-xs">Puedes ajustar tus preferencias de cookies desde tu cuenta</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Opt-out de análisis</p>
                        <p className="text-gray-600 text-xs">Puedes optar por no participar en Google Analytics instalando su complemento de navegador</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                  <p className="text-yellow-900 text-sm leading-relaxed">
                    <strong>Nota importante:</strong> Bloquear ciertas cookies puede afectar la funcionalidad de la plataforma y tu experiencia de usuario. Las cookies esenciales son necesarias para el funcionamiento del servicio y no pueden desactivarse.
                  </p>
                </div>
              </div>
            </section>

            {/* Sección 10: Menores de edad */}
            <section id="minors" className="bg-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                10. Menores de edad
              </h2>
              
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <svg className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Protección de menores</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      SaludCompartida está comprometida con la protección de la privacidad de los menores de edad. Los servicios médicos pueden ser utilizados por menores, pero con las siguientes condiciones:
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Requisitos para menores de 18 años</h3>
                  <ul className="space-y-3 text-gray-700 text-sm">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-medium">Consentimiento de padres o tutores legales requerido</p>
                        <p className="text-xs text-gray-600 mt-1">El padre, madre o tutor legal debe autorizar el uso del servicio y el tratamiento de datos personales del menor</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-medium">Supervisión parental en consultas</p>
                        <p className="text-xs text-gray-600 mt-1">Se recomienda la presencia de un adulto responsable durante las consultas médicas y psicológicas</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-medium">Protección especial de datos sensibles</p>
                        <p className="text-xs text-gray-600 mt-1">Los datos de salud de menores reciben protección adicional bajo nuestra política de seguridad</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Derechos de los padres o tutores</h3>
                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                    Los padres o tutores legales pueden ejercer los derechos ARCO en nombre del menor en cualquier momento:
                  </p>
                  <ul className="text-gray-700 text-sm space-y-2">
                    <li>• Acceder a toda la información recopilada sobre el menor</li>
                    <li>• Solicitar la rectificación de datos inexactos</li>
                    <li>• Solicitar la cancelación de la cuenta del menor</li>
                    <li>• Oponerse al tratamiento de datos para finalidades específicas</li>
                    <li>• Revocar el consentimiento otorgado previamente</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Limitaciones para menores</h3>
                  <ul className="text-gray-700 text-sm space-y-2">
                    <li>• Los menores de 18 años no pueden contratar directamente la suscripción</li>
                    <li>• Solo pueden ser designados como usuarios beneficiarios por un adulto</li>
                    <li>• Para sesiones de terapia psicológica, se requiere consentimiento específico del tutor</li>
                    <li>• El acceso a ciertos servicios puede requerir autorización parental adicional</li>
                  </ul>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
                  <p className="text-red-900 text-sm leading-relaxed">
                    <strong>Importante:</strong> Si detectamos que hemos recopilado información de un menor sin el consentimiento adecuado de los padres o tutores, eliminaremos esa información de inmediato. Los padres pueden contactarnos en cualquier momento si tienen preocupaciones sobre la privacidad de sus hijos.
                  </p>
                </div>
              </div>
            </section>

            {/* Sección 11: Cambios al aviso */}
            <section id="changes" className="bg-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                11. Cambios al aviso de privacidad
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                SaludCompartida se reserva el derecho de actualizar o modificar este aviso de privacidad en cualquier momento para reflejar cambios en nuestras prácticas de privacidad, servicios o requisitos legales.
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-cyan-50 to-purple-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">¿Cuándo podemos modificar este aviso?</h3>
                  <ul className="text-gray-700 text-sm space-y-2">
                    <li>• Cuando agregamos nuevos servicios o funcionalidades</li>
                    <li>• Para cumplir con nuevas leyes o regulaciones</li>
                    <li>• Para mejorar nuestras prácticas de privacidad y seguridad</li>
                    <li>• Cuando cambian nuestros proveedores de servicios</li>
                    <li>• Para clarificar o ampliar información existente</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Cómo te notificaremos</h3>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    Te informaremos sobre cambios importantes en este aviso mediante:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-cyan-50 rounded-lg p-4 flex items-start gap-3">
                      <svg className="w-6 h-6 text-cyan-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Correo electrónico</p>
                        <p className="text-xs text-gray-600">A la dirección registrada en tu cuenta</p>
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 flex items-start gap-3">
                      <svg className="w-6 h-6 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Notificación en la app</p>
                        <p className="text-xs text-gray-600">Mensaje destacado en la aplicación móvil</p>
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">WhatsApp</p>
                        <p className="text-xs text-gray-600">Mensaje informativo directo</p>
                      </div>
                    </div>
                    <div className="bg-pink-50 rounded-lg p-4 flex items-start gap-3">
                      <svg className="w-6 h-6 text-pink-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Sitio web</p>
                        <p className="text-xs text-gray-600">Aviso destacado en saludcompartida.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                  <h3 className="font-bold text-blue-900 mb-2">Tu aceptación de los cambios</h3>
                  <p className="text-blue-800 text-sm leading-relaxed mb-3">
                    El uso continuado de SaludCompartida después de la publicación de cambios constituye tu aceptación del aviso modificado.
                  </p>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    Si no estás de acuerdo con los cambios, puedes cancelar tu suscripción antes de que los cambios entren en vigor, o ejercer tus derechos ARCO según lo descrito en la sección 7.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Historial de versiones</h3>
                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                    Mantenemos un registro de las versiones anteriores de este aviso de privacidad. Puedes solicitar acceso a versiones previas contactándonos en ffranco@saludcompartida.com
                  </p>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-700"><strong>Versión actual:</strong> 1.0</p>
                    <p className="text-sm text-gray-700"><strong>Fecha de publicación:</strong> 7 de noviembre de 2025</p>
                    <p className="text-sm text-gray-700"><strong>Fecha efectiva:</strong> 7 de noviembre de 2025</p>
                  </div>
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
            ¿Tienes preguntas sobre los términos de servicio?
          </p>
          <button
            onClick={() => navigate('/terms', { state: { from: '/privacy' } })}
            className="text-purple-600 hover:text-purple-700 font-semibold underline"
          >
            Lee nuestros Términos y Condiciones →
          </button>
          <p className="text-sm text-gray-500 mt-6">
            © 2025 SaludCompartida. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}