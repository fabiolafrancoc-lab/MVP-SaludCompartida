import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, Heart, Phone, CreditCard, AlertCircle, Building, Users, Clock, FileText, HelpCircle, CheckCircle, MapPin, Globe } from 'lucide-react';

const Accordion = ({ title, icon: Icon, children, isOpen, onToggle, iconColor = "text-teal-400" }) => (
  <div className="border-b border-gray-700/50 last:border-b-0">
    <button onClick={onToggle} className="w-full flex items-center justify-between py-4 px-2 text-left hover:bg-gray-800/30 transition-colors rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl bg-gray-800/80 flex items-center justify-center ${iconColor}`}>
          <Icon size={20} />
        </div>
        <span className="font-medium text-white text-base">{title}</span>
      </div>
      <div className="text-gray-400">{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</div>
    </button>
    {isOpen && (
      <div className="px-2 pb-5 pt-2 animate-fadeIn">
        <div className="bg-gray-800/40 rounded-xl p-4 text-gray-300 text-sm leading-relaxed">{children}</div>
      </div>
    )}
  </div>
);

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

  const toggleSection = (section) => setOpenSection(openSection === section ? null : section);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white font-sans">
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      </div>

      <header className="relative px-5 pt-8 pb-6 border-b border-gray-800/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
            <FileText size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Términos del Servicio</h1>
            <p className="text-xs text-gray-400">SaludCompartida</p>
          </div>
        </div>
        <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-4 flex items-start gap-3">
          <Shield className="text-teal-400 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-teal-100 text-sm font-medium mb-1">Tu confianza es lo primero</p>
            <p className="text-gray-400 text-xs leading-relaxed">Queremos que entiendas cómo funciona SaludCompartida. Aquí explicamos todo de forma clara y sencilla.</p>
          </div>
        </div>
      </header>

      <main className="relative px-5 py-6">
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle size={18} className="text-teal-400" />Lo más importante
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <KeyPoint icon={Heart} title="No es seguro médico" description="Es un servicio que te conecta con doctores y descuentos en farmacias" color="bg-gradient-to-br from-rose-500 to-rose-600" />
            <KeyPoint icon={CreditCard} title="Pagas mensual" description="$12-18 USD al mes. Puedes cancelar cuando quieras" color="bg-gradient-to-br from-teal-500 to-teal-600" />
            <KeyPoint icon={Users} title="Hasta 4 personas" description="Tu suscripción cubre a tu familia en México" color="bg-gradient-to-br from-blue-500 to-blue-600" />
            <KeyPoint icon={MapPin} title="Servicio en México" description="Los doctores y farmacias están en México. El pago es desde EE.UU." color="bg-gradient-to-br from-amber-500 to-amber-600" />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Building size={18} className="text-teal-400" />¿Quiénes participan?
          </h2>
          <div className="space-y-3">
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
                <p className="text-gray-300 text-sm leading-relaxed"><strong className="text-white">Plataforma tecnológica</strong> que te permite contratar y pagar tu suscripción desde Estados Unidos.</p>
                <div className="bg-gray-800/40 rounded-lg p-3 mt-2">
                  <p className="text-gray-400 text-xs font-medium mb-2">¿Qué hacemos?</p>
                  <div className="space-y-1.5 text-xs text-gray-400">
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-400" /><span>Manejamos la app y el sitio web</span></div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-400" /><span>Procesamos tu pago mensual de forma segura</span></div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-400" /><span>Te damos soporte y atención al cliente</span></div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-400" /><span>Coordinamos que tu familia reciba los servicios</span></div>
                  </div>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 mt-2">
                  <p className="text-amber-200/90 text-xs"><strong>Importante:</strong> SaludCompartida NO es hospital, clínica, ni aseguradora. No damos consultas médicas.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FileText size={18} className="text-teal-400" />Detalles del servicio
          </h2>
          <div className="bg-gray-800/30 rounded-2xl overflow-hidden border border-gray-700/30">
            <Accordion title="¿Qué incluye mi suscripción?" icon={CheckCircle} isOpen={openSection === 'servicios'} onToggle={() => toggleSection('servicios')} iconColor="text-green-400">
              <div className="space-y-3">
                <p>Tu plan mensual puede incluir:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-teal-400" /><span>Consultas médicas por teléfono o video (24/7)</span></div>
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-teal-400" /><span>Descuentos del 40-75% en farmacias</span></div>
                </div>
              </div>
            </Accordion>
            <Accordion title="¿Cómo funciona el pago?" icon={CreditCard} isOpen={openSection === 'pago'} onToggle={() => toggleSection('pago')} iconColor="text-blue-400">
              <p>Pagas en dólares (USD) desde Estados Unidos. El cobro es automático cada mes.</p>
            </Accordion>
          </div>
        </section>

        <footer className="text-center py-6 border-t border-gray-800/50">
          <p className="text-gray-500 text-xs">Última actualización: Febrero 2026</p>
          <p className="text-gray-600 text-xs mt-1">Tech Solution Services FVR LLC • Florida, EE.UU.</p>
        </footer>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
      `}</style>
    </div>
  );
}
