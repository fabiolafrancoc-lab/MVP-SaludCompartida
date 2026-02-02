'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rzmdekjegbdgitqekjee.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

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

  // Cargar datos del registro desde Supabase DIRECTAMENTE
  useEffect(() => {
    if (!registrationId) {
      router.push('/registro-jan');
      return;
    }

    const loadRegistration = async () => {
      try {
        const { data, error } = await supabase
          .from('registrations')
          .select('*')
          .eq('id', registrationId)
          .single();

        if (error || !data) {
          console.error('Error cargando registro:', error);
          router.push('/registro-jan');
          return;
        }

        setUserData(data);
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
          
          // Actualizar registro en Supabase DIRECTAMENTE
          const { error: updateError } = await supabase
            .from('registrations')
            .update({
              status: 'active',
              square_payment_id: data.data.id,
              payment_completed_at: new Date().toISOString(),
            })
            .eq('id', registrationId);

          if (updateError) {
            console.error('Error actualizando registro:', updateError);
          }

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
    <>
      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; background: #111827; }
        .page-container { min-height: 100vh; background: #111827; }
        .nav { background: #111827; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 12px 0; position: sticky; top: 0; z-index: 100; }
        .nav-inner { max-width: 800px; margin: 0 auto; padding: 0 20px; display: flex; align-items: center; justify-content: space-between; }
        .btn-back { color: #06B6D4; cursor: pointer; transition: color 0.2s; font-size: 14px; background: none; border: 2px solid #06B6D4; padding: 8px 16px; border-radius: 8px; font-weight: 600; }
        .btn-back:hover { background: #06B6D4; color: white; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .title { font-family: 'DM Serif Display', serif; font-size: 32px; font-weight: 700; color: white; margin-bottom: 8px; text-align: center; }
        .subtitle { color: rgba(255,255,255,0.7); margin-bottom: 32px; text-align: center; font-size: 16px; }
        .plan-card { background: linear-gradient(135deg, rgba(6,182,212,0.1), rgba(236,72,153,0.1)); border-radius: 20px; padding: 24px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 24px; }
        .plan-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .plan-title { font-weight: 700; color: white; font-size: 18px; }
        .plan-price { font-size: 32px; font-weight: 700; color: #06B6D4; }
        .plan-price-small { font-size: 16px; color: rgba(255,255,255,0.6); }
        .plan-features { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
        .plan-feature { display: flex; align-items: center; gap: 12px; }
        .plan-feature-icon { font-size: 20px; }
        .plan-feature-text { color: rgba(255,255,255,0.9); font-size: 14px; }
        .plan-divider { margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1); }
        .plan-user { color: rgba(255,255,255,0.5); font-size: 12px; margin-bottom: 6px; }
        .plan-user-name { color: white; font-weight: 600; font-size: 16px; margin-bottom: 4px; }
        .plan-user-email { color: rgba(255,255,255,0.7); font-size: 14px; }
        .payment-card { background: #1F2937; border-radius: 16px; padding: 28px 24px; border: 1px solid rgba(255,255,255,0.1); }
        .payment-header { margin-bottom: 20px; text-align: center; }
        .payment-title { font-size: 18px; font-weight: 700; color: white; margin-bottom: 4px; }
        .payment-subtitle { font-size: 14px; color: rgba(255,255,255,0.6); }
        .error-box { margin-bottom: 16px; padding: 14px; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); border-radius: 12px; }
        .error-text { color: #FCA5A5; font-size: 14px; }
        .loading-box { text-align: center; padding: 32px 0; }
        .loading-text { display: inline-flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.6); }
        #card-container { border: 2px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 16px; min-height: 120px; background: rgba(255,255,255,0.05); }
        .btn-pay { width: 100%; background: linear-gradient(135deg, #EC4899, #DB2777); color: white; font-weight: 700; padding: 18px; font-size: 18px; border-radius: 12px; border: none; cursor: pointer; transition: all 0.3s; box-shadow: 0 8px 32px rgba(236,72,153,0.3); }
        .btn-pay:hover:not(:disabled) { box-shadow: 0 12px 40px rgba(236,72,153,0.4); transform: translateY(-2px); }
        .btn-pay:disabled { opacity: 0.6; cursor: not-allowed; }
        .security-box { margin-top: 20px; padding: 16px; background: rgba(6,182,212,0.1); border-radius: 12px; border: 1px solid rgba(6,182,212,0.2); }
        .security-content { display: flex; align-items: flex-start; gap: 12px; }
        .security-icon { width: 20px; height: 20px; color: #06B6D4; flex-shrink: 0; margin-top: 2px; }
        .security-text { font-size: 12px; color: rgba(255,255,255,0.8); line-height: 1.5; }
        .terms-text { margin-top: 16px; font-size: 12px; text-align: center; color: rgba(255,255,255,0.5); }
        .terms-link { color: #06B6D4; text-decoration: none; }
        .terms-link:hover { text-decoration: underline; }
        .modal { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 16px; backdrop-filter: blur(4px); }
        .modal-content { background: #1F2937; border-radius: 20px; padding: 40px 32px; max-width: 400px; width: 100%; text-align: center; border: 1px solid rgba(255,255,255,0.1); }
        .modal-icon { width: 80px; height: 80px; background: linear-gradient(135deg, #10B981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; animation: pulse 1.5s ease-in-out infinite; }
        .modal-icon svg { width: 40px; height: 40px; color: white; }
        .modal-title { font-size: 24px; font-weight: 700; color: white; margin-bottom: 8px; }
        .modal-text { color: rgba(255,255,255,0.7); font-size: 14px; }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
      `}</style>
      <div className="page-container">
      {/* Header */}
      <nav className="nav">
        <div className="nav-inner">
          <Image 
            src="/saludcompartida-dark-no-tagline.png" 
            alt="SaludCompartida" 
            width={140} 
            height={36}
            style={{ height: '36px', width: 'auto' }}
          />
          <button
            onClick={() => router.back()}
            className="btn-back"
          >
            ← Volver
          </button>
        </div>
      </nav>

      {/* Modal de éxito */}
      {showSuccess && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="modal-title">¡Pago Exitoso!</h3>
            <p className="modal-text">Preparando tu cuenta...</p>
          </div>
        </div>
      )}

      <div className="container">
        <h1 className="title">Completa tu Suscripción</h1>
        <p className="subtitle">Último paso para activar tu plan familiar</p>

        {/* Plan */}
        <div className="plan-card">
          <div className="plan-header">
            <h3 className="plan-title">Plan Familiar</h3>
            <span className="plan-price">$12<span className="plan-price-small">/mes</span></span>
          </div>
          
          <div className="plan-features">
            <div className="plan-feature">
              <span className="plan-feature-icon">🩺</span>
              <span className="plan-feature-text">Telemedicina 24/7 ilimitada</span>
            </div>
            <div className="plan-feature">
              <span className="plan-feature-icon">💊</span>
              <span className="plan-feature-text">Hasta 75% de descuento en farmacias</span>
            </div>
            <div className="plan-feature">
              <span className="plan-feature-icon">🧠</span>
              <span className="plan-feature-text">Terapia psicológica incluida</span>
            </div>
            <div className="plan-feature">
              <span className="plan-feature-icon">💜</span>
              <span className="plan-feature-text">{userData.family_companion_assigned === 'lupita' ? 'Lupita' : 'Fernanda'} - Tu compañera de vida</span>
            </div>
          </div>

          {/* Datos del usuario */}
          {userData.migrant_first_name && (
            <div className="plan-divider">
              <p className="plan-user">Titular de la suscripción:</p>
              <p className="plan-user-name">
                {userData.migrant_first_name} {userData.migrant_last_name}
              </p>
              <p className="plan-user-email">{userData.migrant_email}</p>
            </div>
          )}
        </div>

        {/* Formulario de pago */}
        <div className="payment-card">
          <div className="payment-header">
            <h2 className="payment-title">💳 Información de Pago</h2>
            <p className="payment-subtitle">Pago seguro procesado por Square</p>
          </div>

          {/* Error */}
          {error && (
            <div className="error-box">
              <p className="error-text">⚠️ {error}</p>
            </div>
          )}

          {/* Square Card Container */}
          <div style={{ marginBottom: '20px' }}>
            {!squareLoaded && (
              <div className="loading-box">
                <div className="loading-text">
                  <svg className="spin" style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24">
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Cargando formulario de pago...</span>
                </div>
              </div>
            )}
            
            <div 
              id="card-container" 
              ref={cardContainerRef}
              style={{ display: squareLoaded ? 'block' : 'none' }}
            />
          </div>

          {/* Botón de pago */}
          <button
            onClick={handlePayment}
            disabled={isProcessing || !squareLoaded}
            className="btn-pay"
          >
            {isProcessing ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <svg className="spin" style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24">
                  <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Procesando pago...
              </span>
            ) : (
              '✓ Pagar $12.00 USD / mes'
            )}
          </button>

          {/* Seguridad */}
          <div className="security-box">
            <div className="security-content">
              <svg className="security-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <div>
                <p className="security-text">
                  <strong>🔒 Pago 100% seguro.</strong> Tus datos están protegidos con encriptación bancaria. 
                  SaludCompartida nunca almacena información de tu tarjeta.
                </p>
              </div>
            </div>
          </div>

          {/* Términos */}
          <p className="terms-text">
            Al completar el pago, aceptas nuestros{' '}
            <a href="/terminos" className="terms-link">Términos y Condiciones</a>
            {' '}y{' '}
            <a href="/privacidad" className="terms-link">Política de Privacidad</a>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default function PagoPage() {
  return (
    <Suspense fallback={<div style={{ padding: '100px 20px', textAlign: 'center', color: 'white' }}>Cargando...</div>}>
      <PagoContent />
    </Suspense>
  );
}
