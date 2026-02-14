"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, Heart, Phone, CreditCard, AlertCircle, Building, Users, Clock, FileText, HelpCircle, CheckCircle, MapPin, Globe } from 'lucide-react';
import Link from 'next/link';

// Componente de Acordeón reutilizable
const Accordion = ({ title, icon: Icon, children, isOpen, onToggle, iconColor = "text-teal-400" }) => (
  <div className="border-b border-gray-700/50 last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-4 px-2 text-left hover:bg-gray-800/30 transition-colors rounded-lg"
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl bg-gray-800/80 flex items-center justify-center ${iconColor}`}>
          <Icon size={20} />
        </div>
        <span className="font-medium text-white text-base">{title}</span>
      </div>
      <div className="text-gray-400">
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
    </button>
    {isOpen && (
      <div className="px-2 pb-5 pt-2 animate-fadeIn">
        <div className="bg-gray-800/40 rounded-xl p-4 text-gray-300 text-sm leading-relaxed">
          {children}
        </div>
      </div>
    )}
  </div>
);

// Tarjeta de punto clave (resumen visual)
const KeyPoint = ({ icon: Icon, title, description, color }) => (
  <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-4 border border-gray-700/30">
    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-3`}>
      <Icon size={24} className="text-white" />
    </div>
    <h3 className="font-semibold text-white text-sm mb-1">{title}</h3>
    <p className="text-gray-400 text-xs leading-relaxed">{description}</p>
  </div>
);

export default function TerminosCondiciones() {
  const [openSection, setOpenSection] = useState(null);
  const [showFullTerms, setShowFullTerms] = useState(false);
  const [language, setLanguage] = useState('es'); // 'es' para español

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white font-sans">
      {/* Patrón de fondo sutil */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Header */}
      <header className="relative px-5 pt-8 pb-6 border-b border-gray-800/50">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 mb-4 text-sm text-gray-400 hover:text-teal-400 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Volver al inicio
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
            <FileText size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Términos del Servicio</h1>
            <p className="text-xs text-gray-400">SaludCompartida</p>
          </div>
        </div>
        
        {/* Mensaje de confianza */}
        <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-4 flex items-start gap-3">
          <Shield className="text-teal-400 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-teal-100 text-sm font-medium mb-1">
              Tu confianza es lo primero
            </p>
            <p className="text-gray-400 text-xs leading-relaxed">
              Queremos que entiendas cómo funciona SaludCompartida. Aquí explicamos todo de forma clara y sencilla.
            </p>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="relative px-5 py-6">
        
        {/* SECCIÓN 1: Lo más importante (visual) */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle size={18} className="text-teal-400" />
            Lo más importante
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            <KeyPoint 
              icon={Heart}
              title="No es seguro médico"
              description="Es un servicio que te conecta con doctores y descuentos en farmacias"
              color="bg-gradient-to-br from-rose-500 to-rose-600"
            />
            <KeyPoint 
              icon={CreditCard}
              title="Pagas mensual"
              description="$12-18 USD al mes. Puedes cancelar cuando quieras"
              color="bg-gradient-to-br from-teal-500 to-teal-600"
            />
            <KeyPoint 
              icon={Users}
              title="Hasta 4 personas"
              description="Tu suscripción cubre a tu familia en México"
              color="bg-gradient-to-br from-blue-500 to-blue-600"
            />
            <KeyPoint 
              icon={MapPin}
              title="Servicio en México"
              description="Los doctores y farmacias están en México. El pago es desde EE.UU."
              color="bg-gradient-to-br from-amber-500 to-amber-600"
            />
          </div>
        </section>

        {/* SECCIÓN 2: Quiénes somos */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Building size={18} className="text-teal-400" />
            ¿Quiénes participan?
          </h2>
          
          <div className="space-y-3">
            {/* SaludCompartida */}
            <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/5 rounded-2xl p-4 border border-teal-500/20">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <Globe size={20} className="text-teal-400" />
                </div>
                <div>
                  <p className="text-teal-300 text-sm font-semibold">SaludCompartida</p>
                  <p className="text-gray-500 text-xs">Tech Solution Services FVR LLC • Florida, EE.UU.</p>
                </div>
              </div>
              <div className="ml-13 space-y-2">
                <p className="text-gray-300 text-sm leading-relaxed">
                  <strong className="text-white">Plataforma tecnológica</strong> que te permite contratar y pagar tu suscripción desde Estados Unidos.
                </p>
                <div className="bg-gray-800/40 rounded-lg p-3 mt-2">
                  <p className="text-gray-400 text-xs font-medium mb-2">¿Qué hacemos?</p>
                  <div className="space-y-1.5 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                      <span>Manejamos la app y el sitio web</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                      <span>Procesamos tu pago mensual de forma segura</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                      <span>Te damos soporte y atención al cliente</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                      <span>Coordinamos que tu familia reciba los servicios</span>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 mt-2">
                  <p className="text-amber-200/90 text-xs">
                    <strong>Importante:</strong> SaludCompartida NO es hospital, clínica, ni aseguradora. No damos consultas médicas.
                  </p>
                </div>
              </div>
            </div>

            {/* NUEVO MÉTODO */}
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-2xl p-4 border border-green-500/20">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Heart size={20} className="text-green-400" />
                </div>
                <div>
                  <p className="text-green-300 text-sm font-semibold">NUEVO MÉTODO</p>
                  <p className="text-gray-500 text-xs">Proveedor de servicios de salud • México</p>
                </div>
              </div>
              <div className="ml-13 space-y-2">
                <p className="text-gray-300 text-sm leading-relaxed">
                  <strong className="text-white">Empresa mexicana independiente</strong> que organiza y entrega los servicios de salud a tu familia.
                </p>
                <div className="bg-gray-800/40 rounded-lg p-3 mt-2">
                  <p className="text-gray-400 text-xs font-medium mb-2">¿Qué hacen ellos?</p>
                  <div className="space-y-1.5 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span>Tienen convenios con doctores, clínicas y farmacias</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span>Verifican que todos tengan licencia para ejercer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span>Coordinan las consultas y servicios en México</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span>Cumplen con las leyes de salud mexicanas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Aviso de independencia */}
            <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30">
              <div className="flex items-start gap-3">
                <AlertCircle size={18} className="text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    <strong className="text-white">Son empresas independientes.</strong> SaludCompartida y NUEVO MÉTODO no son la misma empresa ni tienen los mismos dueños. Trabajan juntas para darte el servicio, cada una con su responsabilidad.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 3: Acordeones con detalles */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FileText size={18} className="text-teal-400" />
            Detalles del servicio
          </h2>
          
          <div className="bg-gray-800/30 rounded-2xl overflow-hidden border border-gray-700/30">
            
            <Accordion 
              title="¿Qué incluye mi suscripción?"
              icon={CheckCircle}
              isOpen={openSection === 'servicios'}
              onToggle={() => toggleSection('servicios')}
              iconColor="text-green-400"
            >
              <div className="space-y-3">
                <p>Tu plan mensual puede incluir:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-400" />
                    <span>Consultas médicas por teléfono o video (24/7)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-400" />
                    <span>Descuentos del 40-75% en farmacias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-400" />
                    <span>Consultas presenciales con descuento</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-400" />
                    <span>Estudios de laboratorio con descuento</span>
                  </div>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mt-3">
                  <p className="text-amber-200 text-xs">
                    <strong>Importante:</strong> No cubre emergencias graves ni hospitalizaciones. En una emergencia, llama al 911 o ve a urgencias.
                  </p>
                </div>
              </div>
            </Accordion>

            <Accordion 
              title="¿Cómo funciona el pago?"
              icon={CreditCard}
              isOpen={openSection === 'pago'}
              onToggle={() => toggleSection('pago')}
              iconColor="text-blue-400"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-teal-400">1</div>
                  <p>Pagas en <strong>dólares (USD)</strong> desde Estados Unidos</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-teal-400">2</div>
                  <p>El cobro es <strong>automático cada mes</strong> en tu tarjeta</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-teal-400">3</div>
                  <p>Si tu banco cobra comisiones extra, esas van por tu cuenta</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-teal-400">4</div>
                  <p>Si subimos el precio, te avisamos antes</p>
                </div>
              </div>
            </Accordion>

            <Accordion 
              title="¿Cómo cancelo?"
              icon={AlertCircle}
              isOpen={openSection === 'cancelar'}
              onToggle={() => toggleSection('cancelar')}
              iconColor="text-amber-400"
            >
              <div className="space-y-3">
                <p><strong>Puedes cancelar cuando quieras.</strong> Es fácil:</p>
                <div className="space-y-2 ml-4">
                  <p>• Desde la app o el sitio web</p>
                  <p>• Contactando a servicio al cliente</p>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-3 mt-3">
                  <p className="text-gray-300 text-xs">
                    Al cancelar, ya no te cobramos el siguiente mes. Tu servicio sigue activo hasta que termine el mes que ya pagaste.
                  </p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mt-2">
                  <p className="text-blue-200 text-xs">
                    <strong>Nota:</strong> Borrar la app de tu teléfono NO cancela la suscripción. Debes cancelarla directamente.
                  </p>
                </div>
              </div>
            </Accordion>

            <Accordion 
              title="¿Puedo pedir un reembolso?"
              icon={CreditCard}
              isOpen={openSection === 'reembolso'}
              onToggle={() => toggleSection('reembolso')}
              iconColor="text-purple-400"
            >
              <div className="space-y-3">
                <p><strong>Primer mes:</strong></p>
                <p className="ml-4">Tienes 48 horas después del primer cobro para pedir devolución completa, siempre que tu familia no haya usado servicios caros como consultas o estudios.</p>
                
                <p className="mt-3"><strong>Meses siguientes:</strong></p>
                <p className="ml-4">Los pagos mensuales normalmente no se devuelven, excepto si hubo un error nuestro (como cobrarte dos veces).</p>
                
                <p className="mt-3"><strong>¿Cómo pedir reembolso?</strong></p>
                <p className="ml-4">Escríbenos con tu nombre, email, fecha del cobro, y los últimos 4 dígitos de tu tarjeta.</p>
              </div>
            </Accordion>

            <Accordion 
              title="¿Quién es responsable de qué?"
              icon={Building}
              isOpen={openSection === 'responsabilidad'}
              onToggle={() => toggleSection('responsabilidad')}
              iconColor="text-teal-400"
            >
              <div className="space-y-4">
                <div className="bg-blue-500/10 rounded-lg p-3">
                  <p className="text-blue-300 text-xs font-medium mb-1">Tech Solution Services (nosotros):</p>
                  <p className="text-gray-300 text-xs">Manejamos la app, cobramos tu suscripción, y damos soporte al cliente. No damos consultas médicas.</p>
                </div>
                
                <div className="bg-green-500/10 rounded-lg p-3">
                  <p className="text-green-300 text-xs font-medium mb-1">NUEVO MÉTODO y doctores en México:</p>
                  <p className="text-gray-300 text-xs">Dan los servicios de salud. Son responsables de las consultas, diagnósticos y tratamientos.</p>
                </div>
                
                <div className="bg-amber-500/10 rounded-lg p-3">
                  <p className="text-amber-300 text-xs font-medium mb-1">Tú (el que paga):</p>
                  <p className="text-gray-300 text-xs">Dar información correcta, mantener tus datos actualizados, y explicar a tu familia cómo usar el servicio.</p>
                </div>
              </div>
            </Accordion>

            <Accordion 
              title="Tus datos personales"
              icon={Shield}
              isOpen={openSection === 'privacidad'}
              onToggle={() => toggleSection('privacidad')}
              iconColor="text-indigo-400"
            >
              <div className="space-y-3">
                <p>Protegemos tu información personal y de salud:</p>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-teal-400" />
                    <span>Usamos sistemas seguros para guardar datos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-teal-400" />
                    <span>Solo compartimos lo necesario con doctores y farmacias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-teal-400" />
                    <span>Cumplimos con las leyes de protección de datos</span>
                  </div>
                </div>
                <p className="text-gray-400 text-xs mt-3">
                  Lee nuestro Aviso de Privacidad completo para más detalles.
                </p>
              </div>
            </Accordion>

            <Accordion 
              title="Derechos de usuarios en México"
              icon={Users}
              isOpen={openSection === 'derechos'}
              onToggle={() => toggleSection('derechos')}
              iconColor="text-rose-400"
            >
              <div className="space-y-3">
                <p>Si usas los servicios de salud en México, tienes derecho a:</p>
                <div className="space-y-2 mt-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-teal-400 flex-shrink-0 mt-0.5" />
                    <span>Recibir información clara sobre qué incluye tu plan</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-teal-400 flex-shrink-0 mt-0.5" />
                    <span>Ser atendido por doctores con licencia válida</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-teal-400 flex-shrink-0 mt-0.5" />
                    <span>Trato digno y respetuoso</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-teal-400 flex-shrink-0 mt-0.5" />
                    <span>Que tu información de salud sea confidencial</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-teal-400 flex-shrink-0 mt-0.5" />
                    <span>Presentar quejas ante PROFECO o autoridades de salud</span>
                  </div>
                </div>
              </div>
            </Accordion>

          </div>
        </section>

        {/* SECCIÓN 4: Versión legal completa */}
        <section className="mb-8">
          <button
            onClick={() => setShowFullTerms(!showFullTerms)}
            className="w-full bg-gray-800/40 hover:bg-gray-800/60 border border-gray-700/30 rounded-2xl p-4 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-700/50 flex items-center justify-center">
                <FileText size={18} className="text-gray-400" />
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-medium">Versión legal completa</p>
                <p className="text-gray-500 text-xs">En inglés y español</p>
              </div>
            </div>
            <ChevronDown size={20} className={`text-gray-400 transition-transform ${showFullTerms ? 'rotate-180' : ''}`} />
          </button>
          
          {showFullTerms && (
            <div className="mt-4 bg-gray-900/60 rounded-2xl p-4 border border-gray-700/30 animate-fadeIn">
              <div className="space-y-4 text-xs text-gray-400 leading-relaxed max-h-96 overflow-y-auto">
                <div className="sticky top-0 bg-gray-900/95 py-2 border-b border-gray-700/30 mb-4">
                  <p className="text-white font-medium">A. MASTER TERMS & CONDITIONS</p>
                  <p className="text-gray-500">(Account Holder pays in the US – Florida law)</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-300 font-medium mb-1">1. Provider identity and scope</p>
                    <p>Tech Solution Services FVR LLC ("Company", "we", "us") is a limited liability company organized under the laws of the State of Florida, United States of America, and operates the digital health access platform "SaludCompartida" (the "Platform").</p>
                    <p className="mt-2">The contractual relationship under these Terms & Conditions ("Terms") exists between the Company and the Account Holder (the person who pays for the subscription), regardless of the country where the Beneficiaries receive the health services.</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-300 font-medium mb-1">2. Nature of the service</p>
                    <p>SaludCompartida is a digital access and coordination platform that connects Beneficiaries located in Mexico with NUEVO MÉTODO and other Providers for the delivery of medical and health-related services.</p>
                    <p className="mt-2">The Company does not itself provide medical care and is not a hospital, clinic, insurance company or health insurer, and does not guarantee any medical outcome.</p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700/30">
                    <p className="text-white font-medium mb-2">Ver documento completo:</p>
                    <a 
                      href="#" 
                      className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      <FileText size={14} />
                      <span>Descargar PDF completo</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* SECCIÓN 5: Ayuda */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-teal-500/20 to-blue-500/10 rounded-2xl p-5 border border-teal-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/30 flex items-center justify-center">
                <HelpCircle size={24} className="text-teal-300" />
              </div>
              <div>
                <p className="text-white font-semibold">¿Tienes preguntas?</p>
                <p className="text-gray-400 text-xs">Estamos aquí para ayudarte</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <a 
                href="https://wa.me/17869648040?text=Hola,%20tengo%20preguntas%20sobre%20los%20términos" 
                className="flex items-center gap-3 bg-green-500/20 hover:bg-green-500/30 rounded-xl p-3 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">WhatsApp</p>
                  <p className="text-gray-400 text-xs">Respuesta rápida</p>
                </div>
              </a>
              
              <div className="flex items-center gap-3 bg-gray-800/40 rounded-xl p-3">
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                  <FileText size={18} className="text-gray-300" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">contact@saludcompartida.com</p>
                  <p className="text-gray-400 text-xs">Escríbenos</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer con fecha de actualización */}
        <footer className="text-center py-6 border-t border-gray-800/50">
          <p className="text-gray-500 text-xs">
            Última actualización: Febrero 2026
          </p>
          <p className="text-gray-600 text-xs mt-1">
            Tech Solution Services FVR LLC • Florida, EE.UU.
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 mt-4 text-teal-400 hover:text-teal-300 text-sm transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Volver al inicio
          </Link>
        </footer>

      </main>

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
