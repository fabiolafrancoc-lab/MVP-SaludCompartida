'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

// Square Web Payments SDK types
declare global {
  interface Window {
    Square: any;
  }
}

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rzmdekjegbdgitqekjee.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// Generar código de familia
function generateFamilyCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Determinar companion
function determineCompanion(fechaNacimiento: string): 'lupita' | 'fernanda' {
  const birthDate = new Date(fechaNacimiento);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  return age >= 55 ? 'lupita' : 'fernanda';
}

function RegistroSimpleContent() {
  const router = useRouter();
  
  const [step, setStep] = useState(1); // 1=datos, 2=pago
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [squareLoaded, setSquareLoaded] = useState(false);
  const [error, setError] = useState('');
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const [card, setCard] = useState<any>(null);
  const [registrationId, setRegistrationId] = useState('');
  
  const [formData, setFormData] = useState({
    // Migrante USA
    migrant_first_name: '',
    migrant_last_name: '',
    migrant_mother_last_name: '',
    migrant_sex: '',
    migrant_birthdate: '',
    migrant_email: '',
    migrant_phone: '',
    // Familia México
    family_first_name: '',
    family_last_name: '',
    family_mother_last_name: '',
    family_sex: '',
    family_birthdate: '',
    family_email: '',
    family_phone: '',
    terms_accepted: false,
  });

  // Cargar Square cuando pasamos a step 2
  useEffect(() => {
    if (step !== 2) return;

    const loadSquareSDK = async () => {
      try {
        if (!window.Square) {
          const script = document.createElement('script');
          script.src = 'https://web.squarecdn.com/v1/square.js';
          script.async = false;
          script.onload = () => {
            console.log('✅ Square SDK cargado');
            setTimeout(() => initializeSquare(), 500);
          };
          script.onerror = () => {
            setError('Error cargando el sistema de pago. Recarga la página.');
          };
          document.body.appendChild(script);
        } else {
          initializeSquare();
        }
      } catch (error) {
        console.error('Error cargando Square SDK:', error);
      }
    };

    const initializeSquare = async () => {
      try {
        if (!window.Square) return;

        const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
        const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

        if (!appId || !locationId) {
          setError('Sistema de pago no configurado');
          return;
        }

        const payments = window.Square.payments(appId, locationId);
        const cardInstance = await payments.card();
        await cardInstance.attach('#card-container');
        
        setCard(cardInstance);
        setSquareLoaded(true);
        console.log('✅ Square listo');
      } catch (error) {
        console.error('❌ Error inicializando Square:', error);
        setError('Error iniciando sistema de pago');
      }
    };

    loadSquareSDK();
  }, [step]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Submit datos de registro
  const handleSubmitDatos = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Validaciones
      if (!formData.terms_accepted) {
        throw new Error('Debes aceptar los términos');
      }

      // Generar código y companion
      const codigoFamilia = generateFamilyCode();
      const companion = determineCompanion(formData.family_birthdate);

      // Guardar en Supabase
      const { data, error: dbError } = await supabase
        .from('registrations')
        .insert([{
          // Migrante
          migrant_first_name: formData.migrant_first_name,
          migrant_last_name: formData.migrant_last_name,
          migrant_mother_last_name: formData.migrant_mother_last_name,
          migrant_sex: formData.migrant_sex,
          migrant_birthdate: formData.migrant_birthdate,
          migrant_email: formData.migrant_email,
          migrant_phone: formData.migrant_phone,
          // Familia
          family_first_name: formData.family_first_name,
          family_last_name: formData.family_last_name,
          family_mother_last_name: formData.family_mother_last_name,
          family_sex: formData.family_sex,
          family_birthdate: formData.family_birthdate,
          family_email: formData.family_email,
          family_phone: formData.family_phone,
          // Sistema
          family_code: codigoFamilia,
          family_companion_assigned: companion,
          status: 'pending_payment',
          terms_accepted: true,
          terms_accepted_at: new Date().toISOString(),
        }])
        .select()
        .single();

      if (dbError) throw dbError;

      setRegistrationId(data.id);
      setStep(2); // Ir a pago
    } catch (err: any) {
      console.error('Error en registro:', err);
      setError(err.message || 'Error guardando datos');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Procesar pago
  const handlePayment = async () => {
    if (!card) {
      setError('El sistema de pago no está listo');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Tokenizar tarjeta
      const result = await card.tokenize();
      
      if (result.status === 'OK') {
        // Enviar al backend
        const response = await fetch('/api/square-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sourceId: result.token,
            amount: 1200,
            currency: 'USD',
            description: 'SaludCompartida - Plan Familiar',
            registrationId: registrationId,
          }),
        });

        const data = await response.json();

        if (data.success) {
          // Actualizar registro
          await supabase
            .from('registrations')
            .update({
              status: 'active',
              square_payment_id: data.data.id,
              payment_completed_at: new Date().toISOString(),
            })
            .eq('id', registrationId);

          // Redirigir
          router.push(`/dashboard?nuevo=true`);
        } else {
          throw new Error(data.error || 'Error procesando pago');
        }
      } else {
        setError('Verifica los datos de tu tarjeta');
        setIsSubmitting(false);
      }
    } catch (err: any) {
      console.error('❌ Error en pago:', err);
      setError(err.message || 'Error procesando el pago');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <nav className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Image 
            src="/saludcompartida-dark-no-tagline.png" 
            alt="SaludCompartida" 
            width={180} 
            height={40}
            className="h-10 w-auto"
          />
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        
        {/* STEP 1: Formulario de Registro */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Registro Familiar
            </h1>
            <p className="text-gray-600 mb-8">
              $12/mes - Telemedicina + Descuentos + Terapia
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmitDatos} className="space-y-8">
              {/* Migrante USA */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-cyan-500">
                  👤 Persona en USA (quien paga)
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="migrant_first_name"
                      value={formData.migrant_first_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Apellido Paterno *
                    </label>
                    <input
                      type="text"
                      name="migrant_last_name"
                      value={formData.migrant_last_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Apellido Materno
                    </label>
                    <input
                      type="text"
                      name="migrant_mother_last_name"
                      value={formData.migrant_mother_last_name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sexo *
                    </label>
                    <select
                      name="migrant_sex"
                      value={formData.migrant_sex}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    >
                      <option value="">Selecciona</option>
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de Nacimiento *
                    </label>
                    <input
                      type="date"
                      name="migrant_birthdate"
                      value={formData.migrant_birthdate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="migrant_email"
                      value={formData.migrant_email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono USA *
                    </label>
                    <input
                      type="tel"
                      name="migrant_phone"
                      value={formData.migrant_phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Familia México */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-pink-500">
                  👨‍👩‍👧‍👦 Familiar en México (quien usa)
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="family_first_name"
                      value={formData.family_first_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Apellido Paterno *
                    </label>
                    <input
                      type="text"
                      name="family_last_name"
                      value={formData.family_last_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Apellido Materno
                    </label>
                    <input
                      type="text"
                      name="family_mother_last_name"
                      value={formData.family_mother_last_name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sexo *
                    </label>
                    <select
                      name="family_sex"
                      value={formData.family_sex}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Selecciona</option>
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de Nacimiento *
                    </label>
                    <input
                      type="date"
                      name="family_birthdate"
                      value={formData.family_birthdate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="family_email"
                      value={formData.family_email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono México *
                    </label>
                    <input
                      type="tel"
                      name="family_phone"
                      value={formData.family_phone}
                      onChange={handleChange}
                      placeholder="55 1234 5678"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Términos */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="terms_accepted"
                  checked={formData.terms_accepted}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
                <label className="text-sm text-gray-600">
                  Acepto los <a href="/terminos" className="text-cyan-600 hover:underline">Términos y Condiciones</a>
                </label>
              </div>

              {/* Botón */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold py-4 text-lg rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Guardando...' : 'Continuar al Pago →'}
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: Pago */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Completa tu Pago
            </h1>
            <p className="text-gray-600 mb-8">
              $12/mes - Plan Familiar
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Square Card Container */}
            <div className="mb-6">
              {!squareLoaded && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center gap-2 text-gray-500">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Cargando formulario de pago...</span>
                  </div>
                </div>
              )}
              
              <div 
                id="card-container" 
                ref={cardContainerRef}
                className={`border-2 border-gray-200 rounded-lg p-4 min-h-[120px] ${squareLoaded ? 'block' : 'hidden'}`}
              />
            </div>

            {/* Botón de pago */}
            <button
              onClick={handlePayment}
              disabled={isSubmitting || !squareLoaded}
              className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold py-4 text-lg rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Procesando...' : 'Pagar $12.00 USD / mes'}
            </button>

            {/* Seguridad */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <p className="text-xs text-gray-600">
                    <strong>Pago seguro con Square.</strong> Tus datos están protegidos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function RegistroJanPage() {
  return (
    <Suspense fallback={<div style={{ padding: '100px 20px', textAlign: 'center', color: 'white' }}>Cargando...</div>}>
      <RegistroSimpleContent />
    </Suspense>
  );
}
