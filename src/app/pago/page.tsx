'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

// Square Web Payments SDK types
declare global {
  interface Window {
    Square: any;
  }
}

function PagoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registrationId = searchParams.get('id');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [squareLoaded, setSquareLoaded] = useState(false);
  const [error, setError] = useState('');
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const [card, setCard] = useState<any>(null);
  const [userData, setUserData] = useState<any>({});

  // Cargar datos del registro desde Supabase
  useEffect(() => {
    if (!registrationId) {
      router.push('/registro-jan');
      return;
    }

    const loadRegistration = async () => {
      try {
        const response = await fetch(`/api/registro?id=${registrationId}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          router.push('/registro-jan');
        }
      } catch (err) {
        console.error('Error cargando registro:', err);
        router.push('/registro-jan');
      }
    };

    loadRegistration();
  }, [registrationId, router]);

  // Cargar Square Web Payments SDK
  useEffect(() => {
    if (!userData.migrant_first_name) return;

    const loadSquareSDK = async () => {
      try {
        if (!window.Square) {
          const script = document.createElement('script');
          // Producción
          script.src = 'https://web.squarecdn.com/v1/square.js';
          script.async = false;
          script.onload = () => {
            console.log('✅ Square SDK cargado');
            setTimeout(() => initializeSquare(), 500);
          };
          script.onerror = () => {
            console.error('❌ Error cargando Square SDK');
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
        if (!window.Square) {
          console.error('❌ window.Square no disponible');
          return;
        }

        const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
        const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

        if (!appId || !locationId) {
          console.error('❌ Square credentials missing');
          setError('Sistema de pago no configurado');
          return;
        }

        console.log('🔄 Inicializando Square Payments...');
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
  }, [userData]);

  // Procesar pago
  const handlePayment = async () => {
    if (!card) {
      setError('El sistema de pago no está listo');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Tokenizar tarjeta
      const result = await card.tokenize();
      
      if (result.status === 'OK') {
        console.log('✅ Token generado');
        
        // Enviar al backend
        const response = await fetch('/api/square-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sourceId: result.token,
            amount: 1200, // $12.00 en centavos
            currency: 'USD',
            description: 'SaludCompartida - Plan Familiar Mensual',
            registrationId: registrationId,
          }),
        });

        const data = await response.json();

        if (data.success) {
          console.log('✅ Pago exitoso:', data.data.id);
          
          // Actualizar registro en Supabase
          await fetch('/api/registro', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: registrationId,
              status: 'active',
              square_payment_id: data.data.id,
              payment_completed_at: new Date().toISOString(),
            }),
          });

          // Enviar notificaciones
          await fetch('/api/send-notifications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ registration_id: registrationId }),
          });

          setShowSuccess(true);
          
          // Redirigir a confirmación
          setTimeout(() => {
            router.push(`/confirmacion?id=${registrationId}`);
          }, 2000);
        } else {
          throw new Error(data.error || 'Error procesando pago');
        }
      } else {
        console.error('❌ Error tokenizando:', result.errors);
        setError('Verifica los datos de tu tarjeta');
        setIsProcessing(false);
      }
    } catch (err: any) {
      console.error('❌ Error en pago:', err);
      setError(err.message || 'Error procesando el pago');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <nav className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Image 
            src="/saludcompartida-dark-no-tagline.png" 
            alt="SaludCompartida" 
            width={180} 
            height={40}
            className="h-10 w-auto"
          />
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            ← Volver
          </button>
        </div>
      </nav>

      {/* Modal de éxito */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-pulse">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h3>
            <p className="text-gray-600">Preparando tu cuenta...</p>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Columna izquierda - Resumen */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Completa tu Suscripción
            </h1>
            <p className="text-gray-400 mb-6">
              Un paso más para proteger a tu familia
            </p>

            {/* Mensajes de familias */}
            <div className="bg-gray-800/50 rounded-2xl p-6 mb-6 border border-gray-700">
              <p className="text-cyan-400 text-sm font-medium mb-4">
                Esto es lo que las familias quieren decirte...
              </p>
              <div className="grid grid-cols-2 gap-3">
                {['Gracias papá', 'gracias mami', 'Grasias tío', 'te kiero tía', 'ya no me duele', 'gracias abuelita'].map((msg, i) => (
                  <div key={i} className="bg-gray-700/50 rounded-lg p-3 text-center">
                    <p className="text-white text-sm font-handwriting">{msg}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">Plan Familiar</h3>
                <span className="text-2xl font-bold text-cyan-400">$12<span className="text-sm text-gray-400">/mes</span></span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400">🩺</span>
                  <span className="text-gray-300 text-sm">Telemedicina 24/7</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400">💊</span>
                  <span className="text-gray-300 text-sm">Hasta 75% en farmacias</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400">🧠</span>
                  <span className="text-gray-300 text-sm">Terapia incluida</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400">💜</span>
                  <span className="text-gray-300 text-sm">{userData.family_companion_assigned === 'lupita' ? 'Lupita' : 'Fernanda'} - Tu acompañante</span>
                </div>
              </div>

              {/* Datos del usuario */}
              {userData.migrant_first_name && (
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <p className="text-gray-400 text-xs mb-1">Suscripción para:</p>
                  <p className="text-white font-medium">
                    {userData.migrant_first_name} {userData.migrant_last_name}
                  </p>
                  <p className="text-gray-400 text-sm">{userData.migrant_email}</p>
                </div>
              )}
            </div>
          </div>

          {/* Columna derecha - Formulario de pago */}
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Información de Pago</h2>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
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
                disabled={isProcessing || !squareLoaded}
                className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold py-4 text-lg rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isProcessing ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Procesando...
                  </span>
                ) : (
                  'Pagar $12.00 USD / mes'
                )}
              </button>

              {/* Seguridad */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-600">
                      <strong>Pago seguro con Square.</strong> Tus datos están protegidos con encriptación de nivel bancario. 
                      SaludCompartida nunca almacena información de tu tarjeta.
                    </p>
                  </div>
                </div>
              </div>

              {/* Términos */}
              <p className="mt-4 text-xs text-center text-gray-500">
                Al completar el pago, aceptas nuestros{' '}
                <a href="/terminos" className="text-cyan-600 hover:underline">Términos</a>
                {' '}y{' '}
                <a href="/privacidad" className="text-cyan-600 hover:underline">Privacidad</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PagoPage() {
  return (
    <Suspense fallback={<div style={{ padding: '100px 20px', textAlign: 'center', color: 'white' }}>Cargando...</div>}>
      <PagoContent />
    </Suspense>
  );
}
