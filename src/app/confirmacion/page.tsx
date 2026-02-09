'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rzmdekjegbdgitqekjee.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

interface RegistrationData {
  migrant_first_name?: string;
  migrant_last_name?: string;
  family_first_name?: string;
  plan_type?: string;
  amount_paid?: number;
  migrant_code?: string;
  family_code?: string;
  companion_assigned?: string;
}

function ConfirmacionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registrationId = searchParams.get('id');
  
  const [showConfetti, setShowConfetti] = useState(true);
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [migrantCode, setMigrantCode] = useState('Cargando...');
  const [familyCode, setFamilyCode] = useState('Cargando...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRegistrationData = async () => {
      if (!registrationId) {
        console.error('No registration ID provided');
        setLoading(false);
        return;
      }

      try {
        // Cargar datos REALES desde Supabase
        const { data, error } = await supabase
          .from('registrations')
          .select('*')
          .eq('id', registrationId)
          .single();

        if (error || !data) {
          console.error('Error cargando registro:', error);
          setLoading(false);
          return;
        }

        console.log('✅ Datos cargados desde Supabase:', data);
        
        setRegistrationData(data);
        setMigrantCode(data.migrant_code || 'SC-ERROR');
        setFamilyCode(data.family_code || 'SC-ERROR');
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setLoading(false);
      }
    };

    loadRegistrationData();

    // Ocultar confetti después de 6 segundos
    const timer = setTimeout(() => setShowConfetti(false), 6000);
    return () => clearTimeout(timer);
  }, [registrationId]);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif&display=swap');

        :root {
          --bg-dark: #0a0a0a;
          --bg-light: #1a1a2E;
          --cyan: #06B6D4;
          --magenta: #EC4899;
          --green: #10B981;
          --gold: #F59E0B;
          --navy-card: #16162a;
          --text-primary: #FFFFFF;
          --text-secondary: rgba(255, 255, 255, 0.75);
          --text-muted: rgba(255, 255, 255, 0.5);
        }

        .serif {
          font-family: 'Instrument Serif', Georgia, serif;
        }

        /* Confetti Animation */
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1000;
          overflow: hidden;
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          opacity: 0;
          animation: confetti-fall 4s ease-out forwards;
        }

        @keyframes confetti-fall {
          0% {
            opacity: 1;
            transform: translateY(-100px) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) rotate(720deg);
          }
        }

        /* Navigation */
        .nav {
          position: sticky;
          top: 0;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 100;
          padding: 16px 20px;
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

        .nav-login-button {
          background: linear-gradient(135deg, var(--cyan), var(--magenta));
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 20px rgba(6, 182, 212, 0.3);
        }

        .nav-login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(6, 182, 212, 0.5);
        }

        /* Success Page */
        .success-page {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Success Header */
        .success-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .success-icon {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, var(--green), #059669);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          animation: pulse-success 2s ease-in-out infinite;
          box-shadow: 0 0 40px rgba(16, 185, 129, 0.4);
        }

        .success-icon svg {
          width: 50px;
          height: 50px;
          color: white;
        }

        @keyframes pulse-success {
          0%, 100% { transform: scale(1); box-shadow: 0 0 40px rgba(16, 185, 129, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 60px rgba(16, 185, 129, 0.6); }
        }

        .success-title {
          font-size: 42px;
          font-weight: 400;
          margin-bottom: 12px;
          background: linear-gradient(135deg, var(--green) 0%, var(--cyan) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .success-subtitle {
          font-size: 20px;
          color: var(--text-secondary);
        }

        /* Gratitude Section - HANDWRITTEN SIGNATURES */
        .gratitude-section {
          width: 100%;
          max-width: 900px;
          margin-bottom: 48px;
          padding: 40px 20px;
          background: linear-gradient(135deg, rgba(22, 22, 42, 0.8), rgba(10, 10, 10, 0.9));
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .gratitude-intro {
          text-align: center;
          color: var(--text-muted);
          font-size: 16px;
          margin-bottom: 32px;
          font-style: italic;
        }

        .signatures-cloud {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 12px 20px;
          min-height: 320px;
          padding: 20px;
        }

        .signature {
          display: inline-block;
          padding: 4px 12px;
          transition: transform 0.3s ease;
          cursor: default;
        }

        .signature:hover {
          transform: scale(1.15) !important;
        }

        /* Niños - Comic Sans, colores de lapicero */
        .sig-child {
          font-family: 'Comic Sans MS', 'Marker Felt', cursive;
          font-size: 20px;
        }

        .sig-1 { color: #60A5FA; transform: rotate(-5deg); }
        .sig-2 { color: #1E3A5F; transform: rotate(3deg); font-size: 18px; }
        .sig-3 { color: #DC2626; transform: rotate(-2deg); font-size: 24px; }
        .sig-4 { color: #7C3AED; transform: rotate(4deg); }
        .sig-5 { color: #059669; transform: rotate(-6deg); font-size: 22px; }
        .sig-6 { color: #60A5FA; transform: rotate(2deg); font-size: 19px; }
        .sig-7 { color: #EC4899; transform: rotate(-3deg); font-size: 21px; }
        .sig-8 { color: #1E3A5F; transform: rotate(5deg); font-size: 17px; }
        .sig-17 { color: #DC2626; transform: rotate(-4deg); font-size: 20px; }
        .sig-18 { color: #7C3AED; transform: rotate(3deg); font-size: 23px; }
        .sig-21 { color: #059669; transform: rotate(-2deg); font-size: 18px; }
        .sig-22 { color: #60A5FA; transform: rotate(4deg); font-size: 22px; }

        /* Adultos mayores - Brush Script, cursiva elegante */
        .sig-elder {
          font-family: 'Brush Script MT', 'Segoe Script', cursive;
          font-size: 26px;
        }

        .sig-9 { color: #A78BFA; transform: rotate(2deg); }
        .sig-10 { color: #34D399; transform: rotate(-3deg); font-size: 24px; }
        .sig-11 { color: #F472B6; transform: rotate(4deg); }
        .sig-12 { color: #60A5FA; transform: rotate(-2deg); font-size: 28px; }
        .sig-13 { color: #FCD34D; transform: rotate(3deg); font-size: 25px; }
        .sig-14 { color: #A78BFA; transform: rotate(-4deg); }
        .sig-15 { color: #34D399; transform: rotate(2deg); font-size: 23px; }
        .sig-16 { color: #F472B6; transform: rotate(-3deg); font-size: 27px; }
        .sig-19 { color: #60A5FA; transform: rotate(3deg); font-size: 24px; }
        .sig-20 { color: #FCD34D; transform: rotate(-2deg); font-size: 26px; }
        .sig-23 { color: #A78BFA; transform: rotate(4deg); font-size: 25px; }
        .sig-24 { color: #34D399; transform: rotate(-3deg); }

        /* Codes Section */
        .codes-section {
          width: 100%;
          max-width: 600px;
          margin-bottom: 40px;
        }

        .codes-title {
          text-align: center;
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 24px;
          color: var(--text-primary);
        }

        .code-card {
          background: var(--navy-card);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .code-card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .code-card-flag {
          font-size: 32px;
        }

        .code-card-info h3 {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .code-card-info p {
          font-size: 14px;
          color: var(--text-muted);
        }

        .code-display {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          margin-bottom: 16px;
        }

        .code-label {
          font-size: 12px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .code-value {
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: 6px;
        }

        .code-value.cyan {
          color: var(--cyan);
          text-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
        }

        .code-value.magenta {
          color: var(--magenta);
          text-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
        }

        .code-sent {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: var(--green);
          font-size: 14px;
        }

        .code-sent svg {
          width: 18px;
          height: 18px;
        }

        /* Next Steps */
        .next-steps {
          width: 100%;
          max-width: 600px;
          margin-bottom: 40px;
        }

        .next-steps-title {
          text-align: center;
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 24px;
          color: var(--text-primary);
        }

        .step-item {
          display: flex;
          gap: 16px;
          padding: 20px;
          background: var(--navy-card);
          border-radius: 16px;
          margin-bottom: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .step-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 24px;
        }

        .step-icon.whatsapp { background: linear-gradient(135deg, #25D366, #128C7E); }
        .step-icon.phone { background: linear-gradient(135deg, var(--magenta), #BE185D); }
        .step-icon.check { background: linear-gradient(135deg, var(--green), #059669); }

        .step-content h4 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .step-content p {
          font-size: 14px;
          color: var(--text-muted);
        }

        .companion-name {
          color: var(--magenta);
          font-weight: 600;
        }

        /* CTA Button */
        .cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: linear-gradient(135deg, var(--cyan), #0891B2);
          color: white;
          font-size: 18px;
          font-weight: 700;
          padding: 18px 48px;
          border-radius: 16px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(6, 182, 212, 0.3);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(6, 182, 212, 0.4);
        }

        /* Responsive */
        @media (max-width: 640px) {
          .success-title { font-size: 28px; }
          .code-value { font-size: 24px; letter-spacing: 4px; }
          .signatures-cloud { gap: 8px 14px; min-height: 280px; }
          .signature { padding: 2px 8px; }
          .sig-child { font-size: 16px !important; }
          .sig-elder { font-size: 20px !important; }
          .cta-button { width: 100%; padding: 16px 24px; font-size: 16px; }
        }
      `}</style>

      <div className="min-h-screen" style={{ 
        background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a2E 100%)',
        fontFamily: "'DM Sans', -apple-system, sans-serif",
        color: '#FFFFFF'
      }}>
        {/* Confetti */}
        {showConfetti && (
          <div className="confetti-container">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  backgroundColor: ['#06B6D4', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6'][Math.floor(Math.random() * 5)],
                  borderRadius: Math.random() > 0.5 ? '50%' : '0',
                }}
              />
            ))}
          </div>
        )}

        {/* Navigation */}
        <nav className="nav">
          <div className="nav-inner">
            <Image 
              src="/saludcompartida-dark-no-tagline.png" 
              alt="SaludCompartida" 
              width={180}
              height={36}
              className="nav-logo"
            />
            <button 
              className="nav-login-button"
              onClick={() => router.push('/dashboard/login.html')}
            >
              Ya Tengo Mi Código/Login
            </button>
          </div>
        </nav>

        <div className="success-page">
          {/* Success Header */}
          <div className="success-header">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h1 className="success-title serif">¡Gracias por confiar en SaludCompartida!</h1>
            <p className="success-subtitle">Tu familia en México puede usar todos los beneficios en 30 segundos</p>
          </div>

          {/* EMOTIONAL GRATITUDE SECTION - HANDWRITTEN SIGNATURES */}
          <div className="gratitude-section">
            <p className="gratitude-intro">Tu familia te lo agradece...</p>
            
            <div className="signatures-cloud">
              {/* Solo 6 firmas máximo */}
              <span className="signature sig-child sig-1">Gracias papá</span>
              <span className="signature sig-elder sig-2">Gracias, mijo</span>
              <span className="signature sig-child sig-3">te quiero mamá</span>
              <span className="signature sig-elder sig-4">Dios te bendiga</span>
              <span className="signature sig-child sig-5">Grasias Papa</span>
              <span className="signature sig-elder sig-6">Mil gracias, mijita</span>
            </div>
          </div>

          {/* Codes Section */}
          <div className="codes-section">
            <h2 className="codes-title">Tus códigos de acceso</h2>
            
            {/* Code for Migrant */}
            <div className="code-card">
              <div className="code-card-header">
                <span className="code-card-flag">🇺🇸</span>
                <div className="code-card-info">
                  <h3>Para ti ({registrationData?.migrant_first_name || 'Titular'})</h3>
                  <p>Tu código personal</p>
                </div>
              </div>
              <div className="code-display">
                <div className="code-label">Tu código de acceso</div>
                <div className="code-value cyan">{migrantCode}</div>
              </div>
              <div className="code-sent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Enviado a tu WhatsApp y email
              </div>
            </div>

            {/* Code for Family */}
            <div className="code-card">
              <div className="code-card-header">
                <span className="code-card-flag">🇲🇽</span>
                <div className="code-card-info">
                  <h3>Para tu familia ({registrationData?.family_first_name || 'en México'})</h3>
                  <p>Acceso a telemedicina, farmacia y compañía</p>
                </div>
              </div>
              <div className="code-display">
                <div className="code-label">Código de tu familia</div>
                <div className="code-value magenta">{familyCode}</div>
              </div>
              <div className="code-sent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Enviado por WhatsApp a México
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="next-steps">
            <h3 className="next-steps-title">¿Qué sigue?</h3>
            
            <div className="step-item">
              <div className="step-icon whatsapp">📱</div>
              <div className="step-content">
                <h4>Mail y WhatsApp enviados</h4>
                <p>Tu familia en México recibirá su código e instrucciones para empezar a disfrutar SaludCompartida</p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-icon phone">📞</div>
              <div className="step-content">
                <h4>Llamada de bienvenida</h4>
                <p>En las próximas 24 horas, <span className="companion-name">Lupita</span> llamará a tu familia para presentarse. Lupita está para acompañar a tus seres queridos cuando tú no estás</p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-icon check">✓</div>
              <div className="step-content">
                <h4>Servicios disponibles ahora</h4>
                <p>Telemedicina, descuentos en farmacia, terapia semanal y compañía para tu familia, donde está tu corazón</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a2E 100%)',
        color: '#FFFFFF'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255,255,255,0.1)',
            borderTopColor: '#06B6D4',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Cargando confirmación...</p>
        </div>
      </div>
    }>
      <ConfirmacionContent />
    </Suspense>
  );
}
