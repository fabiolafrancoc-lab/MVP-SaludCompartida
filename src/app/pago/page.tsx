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
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSending, setContactSending] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

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
        // TEMPORAL: Hardcoded mientras Vercel actualiza env vars
        const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID || 'sq0idp-TDgOgQ1CmhJqDdCqulhnIw';
        const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || 'L9W263XHC7876';

        console.log('🔵 Iniciando Square Payments...');
        console.log('App ID:', appId);
        console.log('Location ID:', locationId);
        console.log('Usando fallback?', !process.env.NEXT_PUBLIC_SQUARE_APP_ID);

        if (!appId || !locationId) {
          throw new Error(
            'Square no está configurado correctamente. Falta APPLICATION_ID o LOCATION_ID.'
          );
        }

        // Asegurarnos de que el SDK exista
        if (!window.Square || typeof window.Square.payments !== 'function') {
          console.log('⏳ Cargando Square SDK...');

          await new Promise<void>((resolve, reject) => {
            const existing = document.querySelector<HTMLScriptElement>(
              'script[src="https://web.squarecdn.com/v1/square.js"]'
            );
            if (existing) {
              existing.onload = () => resolve();
              existing.onerror = () => reject(new Error('Error cargando Square SDK'));
              return;
            }

            const script = document.createElement('script');
            script.src = 'https://web.squarecdn.com/v1/square.js';
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Error cargando Square SDK'));
            document.head.appendChild(script);
          });

          if (!window.Square || typeof window.Square.payments !== 'function') {
            throw new Error('Square SDK no disponible después de cargar el script.');
          }
        }

        console.log('✅ Square SDK disponible, creando payments…');

        const payments = window.Square.payments(appId, locationId);
        if (!payments) {
          throw new Error('Square.payments devolvió un valor inválido.');
        }

        const cardInstance = await payments.card({
          style: {
            input: {
              color: '#000000',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontSize: '16px'
            }
          }
        });

        console.log('✅ Card instance creado');
        await cardInstance.attach('#card-container');
        console.log('✅ Card adjuntado al DOM');

        setCard(cardInstance);
      } catch (err: any) {
        console.error('❌ Error inicializando Square:', err);
        setError(
          `Error al cargar el formulario de pago: ${
            err?.message || 'Error desconocido'
          }. Por favor recarga la página.`
        );
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

          // 🎯 ENVIAR EMAILS CON RESEND (Migrante + Usuario México)
          // ✅ Conectado a Supabase para obtener todos los datos
          // ✅ Usa templates diseñados "El Que Nunca Olvida" + "El Regalo de Amor"
          try {
            console.log('📧 [SQUARE] Pago completado. Enviando emails de bienvenida...');
            const emailResponse = await fetch('/api/send-notifications', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: 'payment_success',
                registrationId: registrationId
              })
            });

            const emailResult = await emailResponse.json();
            
            if (emailResult.success) {
              console.log('✅ [RESEND] Emails enviados exitosamente:', emailResult);
            } else {
              console.warn('⚠️ [RESEND] Error enviando emails (no crítico):', emailResult.error);
            }
          } catch (emailError) {
            console.error('⚠️ [RESEND] Error en llamada a /api/send-notifications:', emailError);
            // No bloqueamos el flujo si el email falla
          }

          // Redirigir a confirmación
          router.push(`/confirmacion?id=${registrationId}`);
        } else {
          // Mostrar el error específico de Square con más detalles
          const errorMsg = result.error || 'Error procesando el pago';
          const errorCode = result.errorCode ? ` (Código: ${result.errorCode})` : '';
          console.error('❌ [SQUARE] Error del servidor:', result);
          throw new Error(`${errorMsg}${errorCode}`);
        }
      } else {
        const tokenErrors = tokenResult.errors || [];
        const errorMsg = tokenErrors.map((e: any) => e.message).join(', ') || 'Error al tokenizar la tarjeta. Verifica los datos.';
        console.error('❌ [SQUARE] Error de tokenización:', tokenResult);
        throw new Error(errorMsg);
      }
    } catch (err: any) {
      console.error('Error en el pago:', err);
      setError(err.message || 'Error procesando el pago. Intenta nuevamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Enviar formulario de contacto
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSending(true);

    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contactForm,
          subject: '💳 Consulta sobre el cobro - Página de Pago',
          source: 'payment_page'
        })
      });

      if (response.ok) {
        setContactSuccess(true);
        setTimeout(() => {
          setShowContactModal(false);
          setContactSuccess(false);
          setContactForm({ name: '', email: '', message: '' });
        }, 2000);
      } else {
        alert('Error al enviar el mensaje. Por favor intenta nuevamente.');
      }
    } catch (error) {
      alert('Error al enviar el mensaje. Por favor intenta nuevamente.');
    } finally {
      setContactSending(false);
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
        /* GLOBAL STYLES - FONDO OSCURO FORZADO      */
        /* ========================================== */
        :global(html) {
          background: #0a0a0a;
        }

        :global(body) {
          font-family: 'DM Sans', -apple-system, sans-serif;
          background: #111827;
          color: #FFFFFF;
          min-height: 100vh;
          margin: 0;
          padding: 0;
        }

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
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Dancing+Script:wght@400;600;700&display=swap');

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

        /* Main Layout */
        .payment-page {
          min-height: 100vh;
          padding: 100px 20px 60px;
          background: #111827;
          position: relative;
        }

        .serif {
          font-family: 'Instrument Serif', Georgia, serif;
        }

        .handwritten {
          font-family: 'Dancing Script', cursive;
        }

        /* Loading Screen */
        .loading-screen {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #0a0a0a;
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

        /* Emotional Section - Testimonials */
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
          font-size: 2rem;
          font-weight: 400;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .emotional-subtitle {
          font-size: 1.125rem;
          color: var(--text-secondary);
          margin-bottom: 32px;
        }

        /* Family Signatures */
        .signatures-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          margin-top: 32px;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .signature-card {
          background: rgba(14, 165, 233, 0.05);
          border: 2px solid rgba(14, 165, 233, 0.15);
          border-radius: 16px;
          padding: 24px 28px;
          min-width: 260px;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .signature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .signature-card:hover {
          border-color: rgba(14, 165, 233, 0.4);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(14, 165, 233, 0.15);
        }

        .signature-card:hover::before {
          opacity: 1;
        }

        .signature-text {
          font-size: 1.5rem;
          color: var(--text-primary);
          margin-bottom: 16px;
          line-height: 1.4;
          font-weight: 600;
        }

        .signature-name {
          font-size: 1rem;
          color: var(--cyan);
          font-weight: 500;
          font-style: italic;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .signature-icon {
          width: 18px;
          height: 18px;
          color: var(--cyan);
          opacity: 0.9;
          transition: all 0.3s ease;
        }

        .signature-card:hover .signature-icon {
          opacity: 1;
          transform: scale(1.15);
          filter: drop-shadow(0 0 8px rgba(14, 165, 233, 0.6));
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

        /* ========================================== */}
        /* FORMULARIO DE TARJETA - SQUARE SECTION    */
        /* Square renderiza TODO en #card-container  */
        /* ========================================== */
        
        .card-form-section {
          margin-bottom: 24px;
        }

        .card-form-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Contenedor principal de Square */
        #card-container {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 16px;
          min-height: 120px;
          transition: all 0.3s ease;
        }

        #card-container:focus-within {
          border-color: var(--cyan);
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.2);
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

        /* Contact Button */
        .contact-button {
          background: rgba(14, 165, 233, 0.1);
          border: 1px solid rgba(14, 165, 233, 0.3);
          color: var(--cyan);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .contact-button:hover {
          background: rgba(14, 165, 233, 0.2);
          border-color: var(--cyan);
        }

        .contact-button svg {
          width: 14px;
          height: 14px;
        }

        /* Contact Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: #16162a;
          border: 1px solid rgba(14, 165, 233, 0.2);
          border-radius: 20px;
          padding: 32px;
          max-width: 500px;
          width: 100%;
          position: relative;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: var(--text-muted);
          width: 32px;
          height: 32px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .modal-title {
          font-size: 24px;
          font-weight: 600;
          color: white;
          margin-bottom: 8px;
        }

        .modal-subtitle {
          font-size: 14px;
          color: var(--text-muted);
          margin-bottom: 24px;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .form-input,
        .form-textarea {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 12px;
          font-size: 14px;
          color: white;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.3s ease;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: var(--cyan);
          background: rgba(0, 0, 0, 0.4);
        }

        .form-textarea {
          min-height: 100px;
          resize: vertical;
        }

        .form-submit {
          background: linear-gradient(135deg, var(--cyan), #0891B2);
          color: white;
          border: none;
          padding: 14px 24px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 8px;
        }

        .form-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(14, 165, 233, 0.3);
        }

        .form-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .success-message {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: var(--green);
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .success-message svg {
          width: 18px;
          height: 18px;
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              className="contact-button"
              onClick={() => setShowContactModal(true)}
              type="button"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              ¿Consultas sobre el cobro?
            </button>
            <div className="nav-secure">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Pago Seguro
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="payment-page">
        {/* Family Signatures Section */}
        <div className="emotional-section">
          <h1 className="emotional-title serif">Tu familia te está esperando, {registrationData?.migrant_first_name}</h1>
          <p className="emotional-subtitle">Ellos te lo agradecen desde el corazón</p>
          
          <div className="signatures-container">
            <div className="signature-card">
              <div className="signature-text handwritten">"Te queremos Mijo"</div>
              <div className="signature-name">
                ~ Mamá 
                <svg className="signature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <div className="signature-card">
              <div className="signature-text handwritten">"Te extrañamos mucho papá"</div>
              <div className="signature-name">
                ~ {registrationData?.family_first_name || 'Tu familia'}
                <svg className="signature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <div className="signature-card">
              <div className="signature-text handwritten">"Te queremos papá"</div>
              <div className="signature-name">
                ~ Los niños
                <svg className="signature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
              </div>
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
            {/* Square renderiza TODO aquí (tarjeta, fecha, CVV) */}
            {/* ====================================== */}
            <div className="card-form-section">
              <label className="card-form-label">Información de pago</label>
              {/* Square renderiza su iframe COMPLETO aquí */}
              <div id="card-container"></div>
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

      {/* Contact Modal */}
      {showContactModal && (
        <div className="modal-overlay" onClick={() => setShowContactModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setShowContactModal(false)}
              type="button"
            >
              ✕
            </button>
            
            <h2 className="modal-title">¿Consultas sobre el cobro?</h2>
            <p className="modal-subtitle">
              Responderemos a tu email lo antes posible
            </p>

            {contactSuccess ? (
              <div className="success-message">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                ¡Mensaje enviado! Te responderemos pronto.
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label className="form-label">Nombre completo</label>
                  <input 
                    type="text"
                    className="form-input"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    required
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input 
                    type="email"
                    className="form-input"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    required
                    placeholder="tu@email.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Tu consulta</label>
                  <textarea 
                    className="form-textarea"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    required
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                <button 
                  type="submit" 
                  className="form-submit"
                  disabled={contactSending}
                >
                  {contactSending ? 'Enviando...' : 'Enviar consulta'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

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
