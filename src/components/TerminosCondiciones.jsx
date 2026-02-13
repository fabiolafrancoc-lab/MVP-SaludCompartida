"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, Heart, Phone, CreditCard, AlertCircle, Building, Users, FileText, CheckCircle } from 'lucide-react';

const Accordion = ({ title, icon: Icon, children, isOpen, onToggle }) => (
  <div className="border-b border-gray-700/50 last:border-b-0">
    <button onClick={onToggle} className="w-full flex items-center justify-between py-4 px-2 text-left hover:bg-gray-800/30 transition-colors rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gray-800/80 flex items-center justify-center text-teal-400">
          <Icon size={20} />
        </div>
        <span className="font-medium text-white text-base">{title}</span>
      </div>
      <div className="text-gray-400">{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</div>
    </button>
    {isOpen && (
      <div className="px-2 pb-5 pt-2">
        <div className="bg-gray-800/40 rounded-xl p-4 text-gray-300 text-sm leading-relaxed">{children}</div>
      </div>
    )}
  </div>
);

export default function TerminosCondiciones() {
  const [openSection, setOpenSection] = useState(null);
  const toggleSection = (section) => setOpenSection(openSection === section ? null : section);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white font-sans">
      <header className="relative px-5 pt-8 pb-6 border-b border-gray-800/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
            <FileText size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Términos y Condiciones</h1>
            <p className="text-xs text-gray-400">Última actualización: Febrero 2026</p>
          </div>
        </div>
      </header>

      <main className="relative px-5 py-6">
        <div className="bg-gray-800/30 rounded-2xl overflow-hidden border border-gray-700/30">
          
          <Accordion title="1. Aceptación de los Términos" icon={CheckCircle} isOpen={openSection === '1'} onToggle={() => toggleSection('1')}>
            <p>Al acceder y utilizar los servicios de SaludCompartida, aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestros servicios.</p>
          </Accordion>

          <Accordion title="2. Descripción del Servicio" icon={Heart} isOpen={openSection === '2'} onToggle={() => toggleSection('2')}>
            <p className="mb-2">SaludCompartida ofrece los siguientes servicios:</p>
            <ul className="space-y-1 ml-4">
              <li>• Telemedicina 24/7 con doctores certificados</li>
              <li>• Descuentos en farmacias (hasta 75% en medicamentos)</li>
              <li>• Sesiones de terapia psicológica semanal</li>
              <li>• Acompañamiento con Lupita/Fernanda (asistente virtual)</li>
            </ul>
          </Accordion>

          <Accordion title="3. Membresía y Pago" icon={CreditCard} isOpen={openSection === '3'} onToggle={() => toggleSection('3')}>
            <p>La membresía tiene un costo mensual de $12-18 USD, dependiendo del plan seleccionado. El pago se realiza a través de Stripe. La suscripción se renueva automáticamente cada mes hasta que sea cancelada.</p>
          </Accordion>

          <Accordion title="4. Política de Cancelación" icon={AlertCircle} isOpen={openSection === '4'} onToggle={() => toggleSection('4')}>
            <p>Puedes cancelar tu membresía en cualquier momento desde tu cuenta. La cancelación será efectiva al final del período de facturación actual. No ofrecemos reembolsos por períodos parciales.</p>
          </Accordion>

          <Accordion title="5. Uso Apropiado" icon={Users} isOpen={openSection === '5'} onToggle={() => toggleSection('5')}>
            <p className="mb-2">Los servicios de SaludCompartida son para uso personal y familiar. No está permitido:</p>
            <ul className="space-y-1 ml-4">
              <li>• Compartir tu cuenta con terceros no autorizados</li>
              <li>• Usar los servicios para fines comerciales</li>
              <li>• Abusar de los servicios (consultas ilimitadas no significa uso fraudulento)</li>
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
            <p>Para preguntas sobre estos términos, contáctanos en: <a href="mailto:contact@saludcompartida.com" className="text-teal-400 hover:text-teal-300">contact@saludcompartida.com</a></p>
          </Accordion>

        </div>

        <div className="mt-6 text-center">
          <button onClick={() => window.history.back()} className="text-teal-400 hover:text-teal-300 text-sm">← Volver</button>
        </div>
      </main>
    </div>
  );
}
