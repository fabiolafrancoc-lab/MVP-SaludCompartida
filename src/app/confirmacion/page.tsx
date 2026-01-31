'use client';

import { useState, useEffect } from 'react';

export default function PaymentSuccessPage() {
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [migrantCode, setMigrantCode] = useState('');
  const [familyCode, setFamilyCode] = useState('');
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Recuperar datos del registro
    const data = sessionStorage.getItem('registrationData');
    if (data) {
      const parsed = JSON.parse(data);
      setRegistrationData(parsed);
      setMigrantCode(parsed.migrant_code || 'XXXXXX');
      setFamilyCode(parsed.family_code || 'XXXXXX');
    }

    // Ocultar confetti después de 5 segundos
    setTimeout(() => setShowConfetti(false), 5000);
  }, []);

  return (
    <>
      <style jsx global>{`
        :root {
          --bg-dark: #0a0a0a;
          --bg-light: #1a1a2E;
          --cyan: #0EA5E9;
          --magenta: #EC4899;
          --green: #10B981;
          --gold: #F59E0B;
          --navy-card: #16162a;
          --text-primary: #FFFFFF;
          --text-secondary: rgba(255, 255, 255, 0.75);
          --text-muted: rgba(255, 255, 255, 0.5);
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
          overflow-x: hidden;
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
          animation: confetti-fall 4s ease-out forwards;
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        /* Nav */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 16px 20px;
          background: #0a0a0a;
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

        .nav-login-btn {
          background: var(--cyan);
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s;
        }

        .nav-login-btn:hover {
          background: #0284C7;
          transform: translateY(-1px);
        }

        /* Success Page */
        .success-page {
          min-height: 100vh;
          padding: 100px 20px 60px;
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
          animation: pulse-success 2s infinite;
        }

        @keyframes pulse-success {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
          }
          50% {
            box-shadow: 0 0 0 20px rgba(16, 185, 129, 0);
          }
        }

        .success-icon svg {
          width: 50px;
          height: 50px;
          color: white;
        }

        .success-title {
          font-size: 36px;
          margin-bottom: 12px;
        }

        .success-subtitle {
          font-size: 18px;
          color: var(--text-secondary);
        }

        /* Gratitude Section - HANDWRITTEN SIGNATURES */
        .gratitude-section {
          width: 100%;
          max-width: 950px;
          margin-bottom: 48px;
          padding: 40px 20px;
          text-align: center;
        }

        .gratitude-intro {
          font-size: 16px;
          color: var(--text-muted);
          margin-bottom: 40px;
        }

        .signatures-cloud {
          position: relative;
          min-height: 320px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 8px 16px;
          padding: 20px;
        }

        .signature {
          display: inline-block;
          padding: 4px 12px;
          animation: float-signature 0.6s ease-out forwards;
          opacity: 0;
          white-space: nowrap;
          cursor: default;
          transition: transform 0.2s ease;
        }

        .signature:hover {
          transform: scale(1.1) rotate(var(--rotation, 0deg)) !important;
        }

        @keyframes float-signature {
          to {
            opacity: 1;
            transform: rotate(var(--rotation, 0deg));
          }
        }

        /* Child handwriting - big, messy, crayon-like */
        .sig-child {
          font-family: 'Comic Sans MS', 'Chalkboard', 'Marker Felt', cursive;
          font-weight: bold;
          letter-spacing: 0.5px;
        }

        /* Elder handwriting - cursive, pen-like */
        .sig-elder {
          font-family: 'Brush Script MT', 'Segoe Script', 'Bradley Hand', cursive;
          font-style: italic;
          letter-spacing: 0.5px;
        }

        /* COLORES DE LAPICERO / PLUMA - Realistas */
        /* Azules (bolígrafo común) */
        .sig-1 { font-size: 26px; color: #2563EB; --rotation: -3deg; animation-delay: 0.05s; }
        .sig-2 { font-size: 22px; color: #1D4ED8; --rotation: 4deg; animation-delay: 0.1s; }
        
        /* Rojo (lapicero rojo) */
        .sig-3 { font-size: 28px; color: #DC2626; --rotation: -2deg; animation-delay: 0.15s; }
        .sig-4 { font-size: 24px; color: #B91C1C; --rotation: 5deg; animation-delay: 0.2s; }
        
        /* Verde (pluma verde) */
        .sig-5 { font-size: 30px; color: #16A34A; --rotation: -4deg; animation-delay: 0.25s; }
        .sig-6 { font-size: 20px; color: #15803D; --rotation: 2deg; animation-delay: 0.3s; }
        
        /* Morado (pluma morada) */
        .sig-7 { font-size: 25px; color: #7C3AED; --rotation: -1deg; animation-delay: 0.35s; }
        .sig-8 { font-size: 23px; color: #6D28D9; --rotation: 3deg; animation-delay: 0.4s; }
        
        /* Rosa/Magenta (pluma rosa) */
        .sig-9 { font-size: 27px; color: #DB2777; --rotation: -5deg; animation-delay: 0.45s; }
        .sig-10 { font-size: 21px; color: #BE185D; --rotation: 1deg; animation-delay: 0.5s; }
        
        /* Azul oscuro (tinta elegante) */
        .sig-11 { font-size: 28px; color: #1E40AF; --rotation: -2deg; animation-delay: 0.55s; }
        .sig-12 { font-size: 26px; color: #1E3A8A; --rotation: 4deg; animation-delay: 0.6s; }
        
        /* Negro (pluma fuente) */
        .sig-13 { font-size: 24px; color: #374151; --rotation: -3deg; animation-delay: 0.65s; }
        .sig-14 { font-size: 30px; color: #1F2937; --rotation: 2deg; animation-delay: 0.7s; }
        
        /* Turquesa */
        .sig-15 { font-size: 22px; color: #0891B2; --rotation: -1deg; animation-delay: 0.75s; }
        .sig-16 { font-size: 29px; color: #0E7490; --rotation: 5deg; animation-delay: 0.8s; }
        
        /* Naranja (marcador) */
        .sig-17 { font-size: 25px; color: #EA580C; --rotation: -4deg; animation-delay: 0.85s; }
        .sig-18 { font-size: 32px; color: #C2410C; --rotation: 1deg; animation-delay: 0.9s; }
        
        /* Café (tinta sepia) */
        .sig-19 { font-size: 26px; color: #92400E; --rotation: -2deg; animation-delay: 0.95s; }
        .sig-20 { font-size: 24px; color: #78350F; --rotation: 3deg; animation-delay: 1.0s; }
        
        /* Más azules */
        .sig-21 { font-size: 23px; color: #3B82F6; --rotation: -3deg; animation-delay: 1.05s; }
        .sig-22 { font-size: 28px; color: #2563EB; --rotation: 2deg; animation-delay: 1.1s; }
        
        /* Más rojos */
        .sig-23 { font-size: 27px; color: #EF4444; --rotation: -1deg; animation-delay: 1.15s; }
        .sig-24 { font-size: 20px; color: #DC2626; --rotation: 4deg; animation-delay: 1.2s; }
        
        /* Más verdes */
        .sig-25 { font-size: 29px; color: #22C55E; --rotation: -5deg; animation-delay: 1.25s; }
        .sig-26 { font-size: 22px; color: #16A34A; --rotation: 1deg; animation-delay: 1.3s; }
        
        /* Más morados */
        .sig-27 { font-size: 26px; color: #8B5CF6; --rotation: -2deg; animation-delay: 1.35s; }
        .sig-28 { font-size: 24px; color: #7C3AED; --rotation: 3deg; animation-delay: 1.4s; }

        /* Codes Section */
        .codes-section {
          width: 100%;
          max-width: 600px;
          margin-bottom: 40px;
        }

        .codes-title {
          text-align: center;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--cyan);
          margin-bottom: 20px;
        }

        .code-card {
          background: var(--navy-card);
          border: 2px solid rgba(14, 165, 233, 0.3);
          border-radius: 20px;
          padding: 28px;
          margin-bottom: 16px;
        }

        .code-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .code-card-flag {
          font-size: 28px;
        }

        .code-card-info h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 2px;
        }

        .code-card-info p {
          font-size: 13px;
          color: var(--text-muted);
        }

        .code-display {
          background: rgba(14, 165, 233, 0.1);
          border: 1px dashed var(--cyan);
          border-radius: 12px;
          padding: 16px;
          text-align: center;
        }

        .code-label {
          font-size: 11px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .code-value {
          font-size: 32px;
          font-weight: 700;
          font-family: 'SF Mono', 'Consolas', monospace;
          color: var(--cyan);
          letter-spacing: 3px;
        }

        .code-sent {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
          font-size: 13px;
          color: var(--green);
        }

        .code-sent svg {
          width: 16px;
          height: 16px;
        }

        /* Next Steps */
        .next-steps {
          width: 100%;
          max-width: 600px;
          background: var(--navy-card);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 28px;
          margin-bottom: 40px;
        }

        .next-steps-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 20px;
          text-align: center;
        }

        .step-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 20px;
        }

        .step-item:last-child {
          margin-bottom: 0;
        }

        .step-number {
          width: 32px;
          height: 32px;
          background: var(--magenta);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .step-content h4 {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .step-content p {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .step-content strong {
          color: var(--cyan);
        }

        /* Step Highlight - 30 segundos */
        .step-highlight {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 24px;
          padding: 16px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 12px;
        }

        .highlight-icon {
          font-size: 24px;
        }

        .step-highlight p {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 0;
        }

        .step-highlight strong {
          color: var(--green);
        }

        /* CTA */
        .cta-section {
          text-align: center;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 40px;
          background: var(--cyan);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(14, 165, 233, 0.4);
        }

        .cta-secondary {
          display: block;
          margin-top: 16px;
          font-size: 14px;
          color: var(--text-muted);
        }

        .cta-secondary a {
          color: var(--cyan);
          text-decoration: none;
        }

        /* WhatsApp floating */
        .whatsapp-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #25D366;
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .whatsapp-badge svg {
          width: 14px;
          height: 14px;
        }
      `}</style>

      {/* Confetti */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: ['#EC4899', '#0EA5E9', '#10B981', '#F59E0B', '#A78BFA'][Math.floor(Math.random() * 5)],
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
              }}
            />
          ))}
        </div>
      )}

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-inner">
          <img 
            src="/saludcompartida-dark-no-tagline.png" 
            alt="SaludCompartida" 
            className="nav-logo"
          />
          <a href="/login" className="nav-login-btn">
            Ya Tengo Mi Código / Login
          </a>
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
          <h1 className="success-title serif">¡Pago exitoso!</h1>
          <p className="success-subtitle">Tu familia en México ya está protegida</p>
        </div>

        {/* EMOTIONAL GRATITUDE SECTION - HANDWRITTEN SIGNATURES */}
        <div className="gratitude-section">
          <p className="gratitude-intro">Esto es lo que las familias quieren decirte...</p>
          
          <div className="signatures-cloud">
            {/* Niños - letra grande, desordenada, errores de ortografía */}
            <span className="signature sig-child sig-1">Gracias papá</span>
            <span className="signature sig-child sig-2">gracias mami</span>
            <span className="signature sig-child sig-3">Grasias Papa</span>
            <span className="signature sig-child sig-4">te quiero mamá</span>
            <span className="signature sig-child sig-5">GRACIAS TÍO</span>
            <span className="signature sig-child sig-6">gracias tía</span>
            <span className="signature sig-child sig-7">Te extraño papi</span>
            <span className="signature sig-child sig-8">grasias tia</span>
            <span className="signature sig-child sig-9">Gracias abuelita</span>
            <span className="signature sig-child sig-10">te kiero tio</span>
            
            {/* Adultos mayores - letra cursiva elegante */}
            <span className="signature sig-elder sig-11">Gracias, mijo</span>
            <span className="signature sig-elder sig-12">Bendiciones, mijita</span>
            <span className="signature sig-elder sig-13">Gracias, mi niño</span>
            <span className="signature sig-elder sig-14">Dios te bendiga, hija</span>
            <span className="signature sig-elder sig-15">Mil gracias, sobrino</span>
            <span className="signature sig-elder sig-16">Te quiero mucho, sobrina</span>
            <span className="signature sig-elder sig-17">Gracias por no olvidarnos</span>
            <span className="signature sig-elder sig-18">Que Dios te lo pague</span>
            <span className="signature sig-elder sig-19">Siempre en mi corazón</span>
            <span className="signature sig-elder sig-20">Gracias por cuidarnos</span>
            
            {/* Más variedad */}
            <span className="signature sig-child sig-21">ya no me duele</span>
            <span className="signature sig-child sig-22">Gracias Papito</span>
            <span className="signature sig-elder sig-23">Bendito seas, hijo</span>
            <span className="signature sig-child sig-24">tenkiu mama</span>
            <span className="signature sig-elder sig-25">Gracias mi niña</span>
            <span className="signature sig-child sig-26">eres el mejor tio</span>
            <span className="signature sig-elder sig-27">Te recordamos siempre</span>
            <span className="signature sig-child sig-28">gracias por la mesina</span>
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
                <h3>Para ti (Titular)</h3>
                <p>Acceso al panel de ahorros y seguimiento</p>
              </div>
            </div>
            <div className="code-display">
              <div className="code-label">Tu código de acceso</div>
              <div className="code-value">{migrantCode}</div>
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
                <h3>Para {registrationData?.family_first_name || 'tu familiar'} en México</h3>
                <p>Acceso completo a todos los servicios</p>
              </div>
            </div>
            <div className="code-display">
              <div className="code-label">Código de acceso familiar</div>
              <div className="code-value">{familyCode}</div>
            </div>
            <div className="code-sent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Enviado a su WhatsApp
              <span className="whatsapp-badge">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="next-steps">
          <h3 className="next-steps-title">¿Qué sigue?</h3>
          
          <div className="step-item">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Tu familiar recibe WhatsApp ahora</h4>
              <p>En los próximos segundos, {registrationData?.family_first_name || 'tu familiar'} recibirá su código y las instrucciones.</p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Ingresa el código en "Ya Tengo Mi Código / Login"</h4>
              <p>{registrationData?.family_first_name || 'Tu familiar'} debe ingresar el código que recibió por email y WhatsApp en el botón <strong>"Ya Tengo Mi Código / Login"</strong> para empezar a utilizar los beneficios de SaludCompartida.</p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>{registrationData?.family_companion_assigned === 'lupita' ? 'Lupita' : 'Fernanda'} llamará pronto</h4>
              <p>Nuestra compañera se presentará y explicará todos los beneficios.</p>
            </div>
          </div>

          <div className="step-highlight">
            <span className="highlight-icon">⚡</span>
            <p>¿Ves? <strong>En tan solo 30 segundos</strong> tus seres queridos ya pueden empezar a ahorrar.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="cta-section">
          <a href="/login" className="cta-button">
            Ya Tengo Mi Código / Login
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <p className="cta-secondary">
            ¿Tienes dudas? <a href="mailto:hola@saludcompartida.com">Contáctanos</a>
          </p>
        </div>
      </div>
    </>
  );
}
