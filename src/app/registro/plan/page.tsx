'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, CreditCard, Shield, Clock, Users } from 'lucide-react';
import { formatUSD } from '@/lib/utils';

const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 12,
    priceDisplay: '$12',
    badge: '',
    features: [
      'Telemedicina 24/7 ilimitada',
      'Descuentos en farmacias (hasta 80%)',
      'Chat médico por WhatsApp',
      '1-4 familiares incluidos',
      'Historial médico digital',
      'Recetas electrónicas'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 18,
    priceDisplay: '$18',
    badge: 'Más Popular',
    features: [
      'Todo lo del plan Basic',
      'Terapia psicológica (2 sesiones/mes)',
      'Descuentos en especialistas',
      'Exámenes de laboratorio',
      'Consultas prioritarias',
      'Descuentos en estudios'
    ]
  }
];

export default function PlanPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [familyCount, setFamilyCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Verificar que vengan los datos anteriores
    const datosMigrante = sessionStorage.getItem('sc_datos_migrante');
    const datosFamilia = sessionStorage.getItem('sc_datos_familia');

    if (!datosMigrante || !datosFamilia) {
      router.push('/');
      return;
    }

    // Calcular número de familiares
    const familia = JSON.parse(datosFamilia);
    const count = 1 + (familia.usuariosAdicionales?.length || 0);
    setFamilyCount(count);
  }, [router]);

  const selectedPlanData = PLANS.find(p => p.id === selectedPlan);
  const monthlyCharge = selectedPlanData?.price || 0;
  const totalToday = monthlyCharge; // Primer mes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Recuperar todos los datos del registro
      const registroInicial = JSON.parse(sessionStorage.getItem('sc_registro_inicial') || '{}');
      const datosMigrante = JSON.parse(sessionStorage.getItem('sc_datos_migrante') || '{}');
      const datosFamilia = JSON.parse(sessionStorage.getItem('sc_datos_familia') || '{}');

      // Preparar datos completos
      const registrationData = {
        suscriptor: {
          nombre: datosMigrante.nombreCompleto,
          email: datosMigrante.email,
          telefono: datosMigrante.telefonoUS,
          estadoUSA: datosMigrante.estadoUS
        },
        usuarioPrincipal: datosFamilia.usuarioPrincipal,
        usuariosAdicionales: datosFamilia.usuariosAdicionales || [],
        plan: {
          id: selectedPlan,
          name: selectedPlanData?.name || '',
          price: monthlyCharge
        }
      };

      console.log('Enviando registro:', registrationData);

      // Llamar a la API de registro
      const response = await fetch('/api/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear el registro');
      }

      console.log('Registro exitoso:', data);

      // Guardar información del registro
      sessionStorage.setItem('sc_registration_id', data.registrationId);
      sessionStorage.setItem('sc_codigo_familia', data.codigoFamilia);

      // Redirigir a Square checkout si existe URL
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        // Si no hay checkout URL (desarrollo), ir al dashboard
        router.push(`/dashboard?nuevo=true&codigo=${data.codigoFamilia}`);
      }
    } catch (err) {
      console.error('Error en registro:', err);
      setError(err instanceof Error ? err.message : 'Error al procesar el registro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header con Progress */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-sc-gray">SaludCompartida</h1>
            <span className="text-sm text-gray-600">Paso 4 de 4</span>
          </div>
          
          {/* Progress Bar */}
          <div className="flex gap-2">
            <div className="flex-1 h-2 bg-sc-cyan rounded-full"></div>
            <div className="flex-1 h-2 bg-sc-cyan rounded-full"></div>
            <div className="flex-1 h-2 bg-sc-cyan rounded-full"></div>
            <div className="flex-1 h-2 bg-sc-cyan rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-sc-gray mb-3">
            Elige tu plan
          </h2>
          <p className="text-xl text-gray-600">
            Protección de salud para {familyCount} {familyCount === 1 ? 'persona' : 'personas'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Plans Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {PLANS.map(plan => {
              const isSelected = selectedPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`card-sc cursor-pointer transition-all ${
                    isSelected 
                      ? 'ring-4 ring-sc-cyan shadow-2xl scale-105' 
                      : 'hover:shadow-xl hover:scale-102'
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-sc-orange text-white px-4 py-1 rounded-full text-sm font-semibold">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-sc-gray mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold text-sc-cyan">{plan.priceDisplay}</span>
                      <span className="text-gray-600">/mes</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          isSelected ? 'text-sc-cyan' : 'text-green-500'
                        }`} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Select Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      isSelected
                        ? 'bg-sc-cyan text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isSelected ? (
                      <span className="flex items-center justify-center gap-2">
                        <Check className="w-5 h-5" />
                        Plan Seleccionado
                      </span>
                    ) : (
                      'Seleccionar Plan'
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Summary Box */}
          <div className="max-w-2xl mx-auto card-sc bg-gradient-to-br from-sc-cyan to-blue-600 text-white">
            <h3 className="text-2xl font-bold mb-6">Resumen del Pedido</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-blue-100">Plan seleccionado:</span>
                <span className="font-semibold text-xl">{selectedPlanData?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">Personas incluidas:</span>
                <span className="font-semibold">{familyCount}</span>
              </div>
              <div className="h-px bg-white/20 my-4"></div>
              <div className="flex justify-between items-center text-2xl">
                <span>Cargo mensual:</span>
                <span className="font-bold">{formatUSD(monthlyCharge)}/mes</span>
              </div>
              <div className="flex justify-between items-center text-3xl">
                <span>Total hoy:</span>
                <span className="font-bold">{formatUSD(totalToday)}</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex justify-center gap-6 mb-6 pt-6 border-t border-white/20">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Pago Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm">Cancela cuando quieras</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="text-sm">1247+ Familias</span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-sc-cyan py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isLoading ? (
                'Procesando...'
              ) : (
                <>
                  <CreditCard className="w-6 h-6" />
                  Pagar {formatUSD(totalToday)}
                </>
              )}
            </button>

            <p className="text-center text-sm text-blue-100 mt-4">
              Al continuar, aceptas nuestros términos y condiciones
            </p>
          </div>

          {/* Back Button */}
          <div className="text-center mt-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-outline"
              disabled={isLoading}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a editar datos de familia
            </button>
          </div>
        </form>

        {/* Payment Methods */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">Métodos de pago aceptados:</p>
          <div className="flex justify-center gap-6 items-center flex-wrap">
            <div className="text-gray-400 font-semibold">Visa</div>
            <div className="text-gray-400 font-semibold">Mastercard</div>
            <div className="text-gray-400 font-semibold">American Express</div>
            <div className="text-gray-400 font-semibold">Apple Pay</div>
            <div className="text-gray-400 font-semibold">Google Pay</div>
          </div>
        </div>
      </main>
    </div>
  );
}
