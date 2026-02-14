"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, Heart, Phone, CreditCard, AlertCircle, Building, Users, FileText, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const Accordion = ({ title, icon: Icon, children, isOpen, onToggle }) => (
  <div className="border-b border-white/5 last:border-b-0">
    <button 
      onClick={onToggle} 
      className="w-full flex items-center justify-between py-5 px-4 text-left hover:bg-white/[0.02] transition-all duration-200 group"
    >
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
          <Icon size={20} strokeWidth={2} />
        </div>
        <span className="font-semibold text-white text-[15px] leading-snug">{title}</span>
      </div>
      <div className="text-gray-500 group-hover:text-cyan-400 transition-colors">
        {isOpen ? <ChevronUp size={20} strokeWidth={2} /> : <ChevronDown size={20} strokeWidth={2} />}
      </div>
    </button>
    {isOpen && (
      <div className="px-4 pb-6 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
        <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] rounded-2xl p-5 text-gray-300 text-[14px] leading-relaxed border border-white/[0.05]">
          {children}
        </div>
      </div>
    )}
  </div>
);

export default function TerminosCondiciones() {
  const [openSection, setOpenSection] = useState(null);
  const toggleSection = (section) => setOpenSection(openSection === section ? null : section);

  return (
    <div className="min-h-screen bg-[#0C0B12] text-white font-['Plus_Jakarta_Sans',system-ui,sans-serif]">
      {/* Header */}
      <header className="relative px-5 pt-10 pb-8 border-b border-white/5 bg-gradient-to-b from-[#151422] to-transparent">
        <div className="max-w-3xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 mb-6 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Volver al inicio
          </Link>
          
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <FileText size={24} className="text-white" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Términos y Condiciones
              </h1>
              <p className="text-sm text-gray-400 font-medium">Última actualización: Febrero 2026</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative px-5 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-[#151422] to-[#1A1928] rounded-3xl overflow-hidden border border-white/[0.06] shadow-2xl">
          
          <Accordion title="1. Aceptación de los Términos" icon={CheckCircle} isOpen={openSection === '1'} onToggle={() => toggleSection('1')}>
            <p>Al acceder y utilizar los servicios de SaludCompartida, aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestros servicios.</p>
          </Accordion>

          <Accordion title="2. Descripción del Servicio" icon={Heart} isOpen={openSection === '2'} onToggle={() => toggleSection('2')}>
            <p className="mb-3">SaludCompartida ofrece los siguientes servicios:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>Telemedicina 24/7 con doctores certificados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>Sesiones de terapia psicológica semanal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>Acompañamiento con Lupita/Fernanda (asistente virtual)</span>
              </li>
            </ul>
          </Accordion>

          <Accordion title="3. Membresía y Pago" icon={CreditCard} isOpen={openSection === '3'} onToggle={() => toggleSection('3')}>
            <p>La membresía tiene un costo mensual de $12-18 USD, dependiendo del plan seleccionado. El pago se realiza a través de Stripe. La suscripción se renueva automáticamente cada mes hasta que sea cancelada.</p>
          </Accordion>

          <Accordion title="4. Política de Cancelación" icon={AlertCircle} isOpen={openSection === '4'} onToggle={() => toggleSection('4')}>
            <p>Puedes cancelar tu membresía en cualquier momento desde tu cuenta. La cancelación será efectiva al final del período de facturación actual. No ofrecemos reembolsos por períodos parciales.</p>
          </Accordion>

          <Accordion title="5. Uso Apropiado" icon={Users} isOpen={openSection === '5'} onToggle={() => toggleSection('5')}>
            <p className="mb-3">Los servicios de SaludCompartida son para uso personal y familiar. No está permitido:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Compartir tu cuenta con terceros no autorizados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Usar los servicios para fines comerciales</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Abusar de los servicios (consultas ilimitadas no significa uso fraudulento)</span>
              </li>
            </ul>
          </Accordion>

          <Accordion title="6. Limitación de Responsabilidad" icon={Shield} isOpen={openSection === '6'} onToggle={() => toggleSection('6')}>
            <p>SaludCompartida actúa como intermediario entre tú y los proveedores de servicios de salud. No somos responsables por diagnósticos médicos, tratamientos o decisiones clínicas. Siempre consulta con un profesional de la salud para emergencias médicas.</p>
          </Accordion>

          <Accordion title="7. Privacidad" icon={Shield} isOpen={openSection === '7'} onToggle={() => toggleSection('7')}>
            <p>Tu privacidad es importante para nosotros. Lee nuestra Política de Privacidad para entender cómo recopilamos, usamos y protegemos tu información personal.</p>
          </Accordion>

          <Accordion title="8. Modificaciones" icon={FileText} isOpen={openSection === '8'} onToggle={() => toggleSection('8')}>
            <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos de cambios significativos por correo electrónico. El uso continuado de los servicios después de los cambios constituye tu aceptación de los nuevos términos.</p>
          </Accordion>

          <Accordion title="9. Contacto" icon={Phone} isOpen={openSection === '9'} onToggle={() => toggleSection('9')}>
            <p>Para preguntas sobre estos términos, contáctanos en: <a href="mailto:hola@saludcompartida.app" className="text-cyan-400 hover:text-cyan-300 font-medium underline decoration-cyan-400/30 hover:decoration-cyan-300">hola@saludcompartida.app</a></p>
          </Accordion>

        </div>

        {/* Footer CTA */}
        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/30 transition-all duration-200 text-sm font-semibold"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Volver al inicio
          </Link>
        </div>
      </main>

      {/* Bottom Gradient */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0C0B12] to-transparent pointer-events-none" />
    </div>
  );
}
