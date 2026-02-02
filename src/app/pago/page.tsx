'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const [error, setError] = useState('');
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [card, setCard] = useState<any>(null);

  // Cargar datos del registro desde Supabase
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

        setRegistrationData(data);
      } catch (err) {
        console.error('Error:', err);
        router.push('/registro-jan');
      }
    };

    loadRegistration();
  }, [registrationId, router]);

  // Inicializar Square Web Payments SDK
  useEffect(() => {
    if (!registrationData) return;

    const initSquarePayments = async () => {
      try {
        // Verificar que Square SDK esté cargado
        if (!window.Square) {
          const script = document.createElement('script');
          script.src = 'https://web.squarecdn.com/v1/square.js';
          script.async = true;
          script.onload = () => initSquarePayments();
          document.head.appendChild(script);
          return;
        }

        const payments = window.Square.payments(
          process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID,
          process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
        );

        // Inicializar campos individuales de Square
        const cardNumber = await payments.card({
          style: {
            input: {
              color: '#FFFFFF',
              fontFamily: '"DM Sans", -apple-system, sans-serif',
              fontSize: '16px',
              '::placeholder': {
                color: 'rgba(255, 255, 255, 0.4)'
              }
            }
          }
        });
        await cardNumber.attach('#sq-card-number');

        const expirationDate = await payments.card({
          style: {
            input: {
              color: '#FFFFFF',
              fontFamily: '"DM Sans", -apple-system, sans-serif',
              fontSize: '16px',
              '::placeholder': {
                color: 'rgba(255, 255, 255, 0.4)'
              }
            }
          }
        });
        await expirationDate.attach('#sq-expiration-date');

        const cvv = await payments.card({
          style: {
            input: {
              color: '#FFFFFF',
              fontFamily: '"DM Sans", -apple-system, sans-serif',
              fontSize: '16px',
              '::placeholder': {
                color: 'rgba(255, 255, 255, 0.4)'
              }
            }
          }
        });
        await cvv.attach('#sq-cvv');

        // Opcional: Postal Code
        const postalCode = await payments.card({
          style: {
            input: {
              color: '#FFFFFF',
              fontFamily: '"DM Sans", -apple-system, sans-serif',
              fontSize: '16px',
              '::placeholder': {
                color: 'rgba(255, 255, 255, 0.4)'
              }
            }
          }
        });
        await postalCode.attach('#sq-postal-code');

        // Guardar referencia del card para tokenización
        setCard(cardNumber);

      } catch (err) {
        console.error('Error inicializando Square:', err);
        setError('Error al cargar el formulario de pago. Por favor recarga la página.');
      }
    };

    initSquarePayments();
  }, [registrationData]);

  // Procesar pago
  const handlePayment = async () => {
    if (!card || isProcessing) return;

    setIsProcessing(true);
    setError('');

    try {
      // Tokenizar la tarjeta con Square
      const tokenResult = await card.tokenize();
      
      if (tokenResult.status === 'OK') {
        const token = tokenResult.token;

        // Llamar al endpoint de backend para procesar el pago
        const response = await fetch('/api/square-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sourceId: token,
            amount: 1200, // $12.00 USD en centavos
            currency: 'USD',
            registrationId: registrationId,
            idempotencyKey: `payment_${registrationId}_${Date.now()}`
          })
        });

        const result = await response.json();

        if (result.success) {
          // Actualizar estado en Supabase
          await supabase
            .from('registrations')
            .update({
              payment_status: 'completed',
              payment_id: result.data.id,
              updated_at: new Date().toISOString()
            })
            .eq('id', registrationId);

          // Redirigir a confirmación
          router.push(`/confirmacion?id=${registrationId}`);
        } else {
          throw new Error(result.error || 'Error procesando el pago');
        }
      } else {
        throw new Error('Error al tokenizar la tarjeta. Verifica los datos.');
      }
    } catch (err: any) {
      console.error('Error en el pago:', err);
      setError(err.message || 'Error procesando el pago. Intenta nuevamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!registrationData) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p style={{ marginTop: '20px', color: 'rgba(255,255,255,0.6)' }}>
          Cargando información...
        </p>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        /* ========================================== */
        /* ARQUITECTURA DE DISEÑO                     */
        /* ========================================== */
        /* 
         * Square maneja: Card Number, Expiration, CVV
         * Nosotros manejamos: Layout, emocional messaging, trust badges
         * 
         * Flujo:
         * 1. Usuario ve resumen emocional ("Tu familia te está esperando")
         * 2. Left column: Order summary con beneficios
         * 3. Right column: Formulario de pago (iframes de Square)
         * 4. Square tokeniza → Backend procesa → Confirmación
         */

        /* Google Fonts */
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');

        /* CSS Variables */
        :root {
          --bg-dark: #0a0a0a;
          --navy-card: rgba(15, 23, 42, 0.6);
          --cyan: #0EA5E9;
          --magenta: #EC4899;
          --green: #10B981;
          --text-primary: #FFFFFF;
          --text-secondary: #E5E7EB;
          --text-muted: #9CA3AF;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'DM Sans', -apple-system, sans-serif;
          background: linear-gradient(180deg, #0a0a0a 0%, #1a1a2E 100%);
          background-attachment: fixed;
          color: var(--text-primary);
          min-height: 100vh;
        }

        .serif {
          font-family: 'Instrument Serif', Georgia, serif;
        }

        /* Loading Screen */
        .loading-screen {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--bg-dark);
          color: white;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255,255,255,0.1);
          border-top-color: var(--cyan);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Navigation */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 16px 20px;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          height: 36px;
        }

        .nav-secure {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--green);
        }

        .nav-secure svg {
          width: 16px;
          height: 16px;
        }

        /* Main Layout */
        .payment-page {
          min-height: 100vh;
          padding: 100px 20px 60px;
        }

        /* Emotional Section - "Tu familia te está esperando" */
        .emotional-section {
          text-align: center;
          margin-bottom: 48px;
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .emotional-title {
          font-size: 2.5rem;
          font-weight: 400;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .emotional-subtitle {
          font-size: 1.125rem;
          color: var(--text-secondary);
        }

        /* Family Waiting Avatar */
        .family-waiting {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-top: 32px;
        }

        .family-member {
          text-align: center;
        }

        .family-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--cyan), var(--magenta));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          margin: 0 auto 12px;
          box-shadow: 0 8px 32px rgba(14, 165, 233, 0.3);
        }

        .family-name {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .family-relation {
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        /* Payment Container - Two Columns */
        .payment-container {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          gap: 32px;
        }

        @media (min-width: 768px) {
          .payment-container {
            grid-template-columns: 1fr 400px;
          }
        }

        /* Order Summary Card */
        .order-summary {
          background: var(--navy-card);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 32px;
          animation: fadeInUp 0.6s ease-out 0.1s both;
        }

        .order-title {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--cyan);
          margin-bottom: 24px;
        }

        .order-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .order-item:last-child {
          border-bottom: none;
        }

        .order-item-name {
          font-size: 16px;
          color: var(--text-primary);
        }

        .order-item-detail {
          font-size: 13px;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .order-item-price {
          font-size: 18px;
          font-weight: 700;
          color: var(--green);
        }

        .order-total {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 2px solid rgba(14, 165, 233, 0.3);
        }

        .order-total-label {
          font-size: 14px;
          color: var(--text-muted);
        }

        .order-total-price {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .order-total-period {
          font-size: 1rem;
          font-weight: 400;
          color: var(--text-muted);
        }

        /* Benefits List */
        .benefits-list {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
        }

        .benefit-icon {
          width: 20px;
          height: 20px;
          color: var(--green);
          flex-shrink: 0;
        }

        .benefit-text {
          font-size: 14px;
          color: var(--text-secondary);
        }

        /* Payment Card - FORMULARIO PRINCIPAL */
        .payment-card {
          background: var(--navy-card);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 32px;
          animation: fadeInUp 0.6s ease-out 0.2s both;
        }

        .payment-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .payment-title {
          font-size: 1.75rem;
          font-weight: 400;
          margin-bottom: 8px;
        }

        .payment-subtitle {
          font-size: 14px;
          color: var(--text-muted);
        }

        /* User Summary dentro del Payment Card */
        .user-summary {
          background: rgba(14, 165, 233, 0.05);
          border: 1px solid rgba(14, 165, 233, 0.2);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .user-summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
        }

        .user-summary-label {
          font-size: 13px;
          color: var(--text-muted);
        }

        .user-summary-value {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .user-summary-divider {
          height: 1px;
          background: rgba(14, 165, 233, 0.2);
          margin: 12px 0;
        }

        /* ========================================== */
        /* FORMULARIO DE TARJETA - SQUARE SECTION    */
        /* Estos campos son renderizados por Square  */
        /* ========================================== */
        
        .card-form-section {
          margin-bottom: 24px;
        }

        .card-form-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Contenedores individuales de Square */
        #sq-card-number,
        #sq-expiration-date,
        #sq-cvv,
        #sq-postal-code {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 14px 16px;
          min-height: 50px;
          transition: all 0.3s ease;
        }

        #sq-card-number:focus-within,
        #sq-expiration-date:focus-within,
        #sq-cvv:focus-within,
        #sq-postal-code:focus-within {
          border-color: var(--cyan);
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.2);
        }

        /* Grid para Expiration y CVV lado a lado */
        .card-details-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 16px;
        }

        .card-field-group {
          display: flex;
          flex-direction: column;
        }

        /* ========================================== */
        /* FIN SECCIÓN SQUARE                         */
        /* ========================================== */

        /* Pay Button */
        .pay-button {
          width: 100%;
          padding: 18px 32px;
          background: linear-gradient(135deg, var(--green), #059669);
          color: white;
          border: none;
          border-radius: 14px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
        }

        .pay-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(16, 185, 129, 0.4);
        }

        .pay-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .pay-button svg {
          width: 22px;
          height: 22px;
        }

        /* Error Message */
        .error-message {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 12px;
          padding: 14px 16px;
          margin-bottom: 20px;
          color: #F87171;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Security Badges */
        .security-badges {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .security-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-muted);
        }

        .security-badge svg {
          width: 16px;
          height: 16px;
          color: var(--green);
        }

        /* Guarantee Section */
        .guarantee {
          text-align: center;
          margin-top: 24px;
          padding: 20px;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 16px;
        }

        .guarantee-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--green);
          margin-bottom: 4px;
        }

        .guarantee-text {
          font-size: 13px;
          color: var(--text-secondary);
        }

        /* Footer */
        .footer {
          text-align: center;
          padding: 40px 20px;
          color: var(--text-muted);
          font-size: 13px;
        }

        .footer a {
          color: var(--cyan);
          text-decoration: none;
        }

        .footer a:hover {
          text-decoration: underline;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .payment-page {
            padding: 80px 16px 40px;
          }

          .emotional-title {
            font-size: 1.75rem;
          }

          .payment-container {
            grid-template-columns: 1fr;
          }

          .order-summary {
            order: 2;
          }

          .payment-card {
            order: 1;
          }

          .security-badges {
            flex-wrap: wrap;
            gap: 16px;
          }
        }
      `}</style>

      {/* NAVIGATION */}
      <nav className="nav">
        <div className="nav-inner">
          <img 
            src="/saludcompartida-dark-no-tagline.png" 
            alt="SaludCompartida" 
            className="nav-logo" 
          />
          <div className="nav-secure">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Pago Seguro
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="payment-page">
        {/* Emotional Section */}
        <div className="emotional-section">
          <h1 className="emotional-title serif">Tu familia te está esperando</h1>
          <p className="emotional-subtitle">En unos segundos, estarán protegidos</p>
          
          <div className="family-waiting">
            <div className="family-member">
              <div className="family-avatar">👵</div>
              <div className="family-name">{registrationData?.family_first_name || 'Tu familiar'}</div>
              <div className="family-relation">Usuario principal</div>
            </div>
          </div>
        </div>

        <div className="payment-container">
          {/* Order Summary - Left Column */}
          <div className="order-summary">
            <h2 className="order-title">Tu suscripción</h2>
            
            <div className="order-item">
              <div>
                <div className="order-item-name">SaludCompartida Familiar</div>
                <div className="order-item-detail">Hasta 4 usuarios en México</div>
              </div>
              <div className="order-item-price">$12</div>
            </div>

            <div className="order-item">
              <div>
                <div className="order-item-name">✓ Telemedicina 24/7</div>
                <div className="order-item-detail">Doctores ilimitados</div>
              </div>
            </div>

            <div className="order-item">
              <div>
                <div className="order-item-name">✓ Descuentos en farmacias</div>
                <div className="order-item-detail">40-75% en 1,700+ sucursales</div>
              </div>
            </div>

            <div className="order-item">
              <div>
                <div className="order-item-name">✓ Terapia psicológica</div>
                <div className="order-item-detail">Sesiones incluidas</div>
              </div>
            </div>

            <div className="order-item">
              <div>
                <div className="order-item-name">
                  ✓ Compañía {registrationData?.companion_assigned === 'lupita' ? '👵 Lupita' : '👩 Fernanda'}
                </div>
                <div className="order-item-detail">Llamadas de acompañamiento</div>
              </div>
            </div>

            <div className="order-total">
              <div className="order-total-label">Total mensual</div>
              <div className="order-total-price">
                $12 <span className="order-total-period">/mes</span>
              </div>
            </div>

            <div className="benefits-list">
              <div className="benefit-item">
                <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span className="benefit-text">Cancela cuando quieras, sin penalidad</span>
              </div>
              <div className="benefit-item">
                <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span className="benefit-text">Activación inmediata vía WhatsApp</span>
              </div>
              <div className="benefit-item">
                <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span className="benefit-text">Sin copagos ni deducibles</span>
              </div>
            </div>
          </div>

          {/* Payment Card - Right Column (FORMULARIO) */}
          <div className="payment-card">
            <div className="payment-header">
              <h2 className="payment-title serif">Completa tu pago</h2>
              <p className="payment-subtitle">Pago seguro procesado por Square</p>
            </div>

            {/* User Summary */}
            <div className="user-summary">
              <div className="user-summary-row">
                <span className="user-summary-label">Titular (USA)</span>
                <span className="user-summary-value">{registrationData?.migrant_first_name || 'Nombre'}</span>
              </div>
              <div className="user-summary-divider"></div>
              <div className="user-summary-row">
                <span className="user-summary-label">Usuario en México</span>
                <span className="user-summary-value">{registrationData?.family_first_name || 'Familiar'}</span>
              </div>
              <div className="user-summary-row">
                <span className="user-summary-label">Compañía asignada</span>
                <span className="user-summary-value" style={{ color: '#EC4899' }}>
                  {registrationData?.companion_assigned === 'lupita' ? '👵 Lupita' : '👩 Fernanda'}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            {/* ====================================== */}
            {/* SQUARE PAYMENT FORM                   */}
            {/* Los iframes de Square se renderizan aquí */}
            {/* ====================================== */}
            <div className="card-form-section">
              <label className="card-form-label">Número de tarjeta</label>
              {/* Square renderiza su iframe aquí */}
              <div id="sq-card-number"></div>

              <div className="card-details-row">
                <div className="card-field-group">
                  <label className="card-form-label">Vencimiento</label>
                  {/* Square renderiza su iframe aquí */}
                  <div id="sq-expiration-date"></div>
                </div>
                <div className="card-field-group">
                  <label className="card-form-label">CVV</label>
                  {/* Square renderiza su iframe aquí */}
                  <div id="sq-cvv"></div>
                </div>
              </div>

              {/* Código Postal (opcional, para validación AVS) */}
              <label className="card-form-label" style={{ marginTop: '16px' }}>Código Postal</label>
              <div id="sq-postal-code"></div>
            </div>
            {/* ====================================== */}
            {/* FIN SQUARE PAYMENT FORM               */}
            {/* ====================================== */}

            {/* Pay Button */}
            <button 
              className="pay-button"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                'Procesando...'
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                    <line x="1" y1="10" x2="23" y2="10"/>
                  </svg>
                  Pagar $12.00 USD
                </>
              )}
            </button>

            {/* Security Badges */}
            <div className="security-badges">
              <div className="security-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                SSL Seguro
              </div>
              <div className="security-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Encriptado
              </div>
              <div className="security-badge">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 3h18v18H3V3zm16.5 9c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm-9 0c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5z"/>
                </svg>
                Square
              </div>
            </div>

            {/* Guarantee */}
            <div className="guarantee">
              <div className="guarantee-title">✓ Garantía de satisfacción</div>
              <div className="guarantee-text">
                Si no estás satisfecho en los primeros 30 días, te devolvemos tu dinero.
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 SaludCompartida. Todos los derechos reservados.</p>
        <p style={{ marginTop: '8px' }}>
          <a href="/terminos">Términos y Condiciones</a> · <a href="/privacidad">Privacidad</a>
        </p>
      </footer>
    </>
  );
}

export default function PagoPage() {
  return (
    <Suspense fallback={
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p style={{ marginTop: '20px', color: 'rgba(255,255,255,0.6)' }}>
          Cargando información...
        </p>
      </div>
    }>
      <PagoContent />
    </Suspense>
  );
}
