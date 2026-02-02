// =============================================================================
// SALUDCOMPARTIDA - EMAIL TEMPLATES PARA RESEND
// =============================================================================
// Archivo: lib/email-templates.ts
// Descripción: Templates HTML y funciones para enviar emails post-pago Square
// =============================================================================

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// =============================================================================
// TIPOS DE DATOS REQUERIDOS DE SUPABASE
// =============================================================================
// ✅ CONECTADO CON TABLA: registrations
// ✅ Campos verificados con estructura actual de Supabase
// =============================================================================

interface MigrantEmailData {
  // De tabla: registrations
  migrant_email: string;           // registrations.migrant_email
  migrant_code: string;            // registrations.migrant_code (6 dígitos alfanuméricos)
  migrant_first_name?: string;     // registrations.migrant_first_name (opcional)
  
  // De tabla: ai_companions (via assigned_companion_id)
  companion_name: string;          // "Lupita" o "Fernanda"
}

interface FamilyEmailData {
  // De tabla: registrations
  family_primary_email: string;    // registrations.family_primary_email
  family_first_name: string;       // registrations.family_first_name
  family_code: string;             // registrations.family_code (6 dígitos alfanuméricos)
  migrant_first_name: string;      // registrations.migrant_first_name
  
  // De tabla: ai_companions (via assigned_companion_id)
  companion_name: string;          // "Lupita" o "Fernanda"
}

// =============================================================================
// TEMPLATE 1: EMAIL PARA MIGRANTE (USA) - "El Que Nunca Olvida"
// =============================================================================

function getMigrantEmailTemplate(data: MigrantEmailData): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>¡Tu familia ya está protegida! - SaludCompartida</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f1f5f9; padding: 20px; }
    .email-container { max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1); }
    .header-bar { height: 6px; background: linear-gradient(90deg, #06B6D4, #0891b2, #f59e0b, #EC4899); }
    .logo-section { text-align: center; padding: 28px 20px 22px; background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%); }
    .logo-img { height: 48px; width: auto; }
    .quote-section { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 28px; text-align: center; }
    .quote-icon { margin-bottom: 15px; }
    .quote-icon svg { width: 32px; height: 32px; color: #fbbf24; }
    .quote-text { font-size: 1.2rem; color: #f1f5f9; line-height: 1.7; font-style: italic; }
    .quote-text strong { color: #fbbf24; font-weight: 600; }
    .success-section { padding: 38px 28px 28px; text-align: center; background: #ffffff; }
    .success-icon { width: 90px; height: 90px; background: linear-gradient(135deg, #06B6D4 0%, #0891b2 100%); border-radius: 50%; margin: 0 auto 22px; display: flex; align-items: center; justify-content: center; box-shadow: 0 15px 35px rgba(6, 182, 212, 0.35); }
    .success-icon svg { width: 44px; height: 44px; color: white; }
    .success-title { font-size: 1.8rem; color: #0f172a; margin-bottom: 8px; font-weight: 700; }
    .success-subtitle { font-size: 1.05rem; color: #64748b; }
    .gratitude-section { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); margin: 0 22px; border-radius: 16px; padding: 24px; border-left: 5px solid #f59e0b; }
    .gratitude-header { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
    .gratitude-header svg { width: 22px; height: 22px; color: #92400e; }
    .gratitude-title { font-size: 0.8rem; color: #92400e; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; }
    .gratitude-messages { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
    .gratitude-msg { padding: 8px 16px; border-radius: 25px; font-size: 0.9rem; }
    .gratitude-msg.child { background: #fff; color: #1e40af; font-family: 'Comic Sans MS', cursive; }
    .gratitude-msg.elder { background: linear-gradient(135deg, #1e293b, #334155); color: #fbbf24; font-style: italic; font-family: Georgia, serif; }
    .realtime-section { background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); margin: 26px 22px; border-radius: 16px; padding: 22px; border: 1px solid #10b981; text-align: center; }
    .realtime-badge { display: inline-flex; align-items: center; gap: 8px; background: #10b981; color: white; padding: 6px 16px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; margin-bottom: 14px; }
    .realtime-dot { width: 8px; height: 8px; background: #fff; border-radius: 50%; }
    .realtime-text { font-size: 1rem; color: #065f46; line-height: 1.6; }
    .realtime-text strong { color: #047857; }
    .code-section { background: #f8fafc; margin: 0 22px; border-radius: 16px; padding: 26px; text-align: center; }
    .code-header { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 14px; }
    .code-header svg { width: 18px; height: 18px; color: #64748b; }
    .code-label { font-size: 0.75rem; color: #64748b; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
    .code-value { font-size: 2.2rem; font-weight: 800; font-family: 'Courier New', monospace; letter-spacing: 6px; color: #06B6D4; background: white; padding: 18px 32px; border-radius: 12px; display: inline-block; border: 3px dashed #06B6D4; }
    .code-instruction { font-size: 0.88rem; color: #64748b; margin-top: 14px; line-height: 1.5; }
    .benefits-section { background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); margin: 26px 22px; border-radius: 16px; padding: 24px; border: 1px solid #0ea5e9; }
    .benefits-header { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
    .benefits-header svg { width: 20px; height: 20px; color: #0369a1; }
    .benefits-title { font-size: 0.85rem; color: #0369a1; font-weight: 700; text-transform: uppercase; }
    .benefit-item { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 14px; padding-bottom: 14px; border-bottom: 1px solid rgba(14, 165, 233, 0.2); }
    .benefit-item:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
    .benefit-icon { width: 32px; height: 32px; background: linear-gradient(135deg, #06B6D4, #0891b2); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .benefit-icon svg { width: 16px; height: 16px; color: white; }
    .benefit-text { font-size: 0.95rem; color: #0c4a6e; line-height: 1.5; }
    .benefit-text strong { color: #075985; }
    .companion-section { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); margin: 26px 22px; border-radius: 16px; padding: 28px; text-align: center; border: 1px solid #f59e0b; }
    .companion-name { font-size: 1.5rem; font-weight: 700; color: #92400e; margin-bottom: 4px; }
    .companion-role { font-size: 0.95rem; color: #a16207; margin-bottom: 18px; }
    .companion-quote { font-size: 1.05rem; color: #78350f; font-style: italic; line-height: 1.6; }
    .cta-section { padding: 28px 22px; text-align: center; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #06B6D4 0%, #0891b2 100%); color: white; padding: 16px 36px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 1rem; }
    .divider { height: 1px; background: linear-gradient(90deg, transparent, #e2e8f0, transparent); margin: 0 50px; }
    .footer { background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%); padding: 32px 28px; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer-tagline { font-size: 1.15rem; color: #334155; margin-bottom: 6px; }
    .footer-tagline strong { color: #06B6D4; }
    .footer-sub { font-size: 1rem; color: #64748b; font-style: italic; }
    .footer-contact { font-size: 0.82rem; color: #94a3b8; margin-top: 22px; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header-bar"></div>
    
    <div class="logo-section">
      <img src="https://saludcompartida.com/images/saludcompartida-transp_light-bg-no-tagline.png" alt="SaludCompartida" class="logo-img">
    </div>
    
    <div class="quote-section">
      <div class="quote-icon">
        <svg viewBox="0 0 24 24" fill="#fbbf24"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
      </div>
      <p class="quote-text">
        La distancia se mide en kilómetros...<br>
        pero el <strong>amor</strong> se mide en lo que haces por los tuyos.
      </p>
    </div>
    
    <div class="success-section">
      <div class="success-icon">
        <svg viewBox="0 0 24 24" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
      </div>
      <h1 class="success-title">Hoy Cambiaste Su Vida</h1>
      <p class="success-subtitle">Tu familia ahora tiene acceso a salud... gracias a ti</p>
    </div>
    
    <div class="gratitude-section">
      <div class="gratitude-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="#92400e" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        <span class="gratitude-title">Mensajes de tu familia</span>
      </div>
      <div class="gratitude-messages">
        <span class="gratitude-msg child">"Grasias papá"</span>
        <span class="gratitude-msg child">"te kiero mamá"</span>
        <span class="gratitude-msg elder">"Dios te bendiga, mijo"</span>
        <span class="gratitude-msg child">"gracias tio"</span>
        <span class="gratitude-msg elder">"Estamos orgullosos de ti"</span>
      </div>
    </div>
    
    <div class="realtime-section">
      <div class="realtime-badge">
        <span class="realtime-dot"></span>
        EN ESTE MOMENTO
      </div>
      <p class="realtime-text">
        <strong>Tu familia en México está recibiendo su propio código de acceso</strong> para que desde ahora empiece a utilizar los beneficios de SaludCompartida.
      </p>
    </div>
    
    <div class="code-section">
      <div class="code-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <span class="code-label">Tu código de acceso</span>
      </div>
      <div class="code-value">${data.migrant_code}</div>
      <p class="code-instruction">Guarda este código. Con él puedes ver los ahorros de tu familia.</p>
    </div>
    
    <div class="benefits-section">
      <div class="benefits-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="#0369a1" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <span class="benefits-title">Tu familia en México ahora tiene</span>
      </div>
      <div class="benefit-item">
        <div class="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2"/></svg></div>
        <span class="benefit-text"><strong>Videollamadas médicas 24/7</strong> — Atención cuando más lo necesiten</span>
      </div>
      <div class="benefit-item">
        <div class="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg></div>
        <span class="benefit-text"><strong>Descuentos en farmacias</strong> — Hasta 75% en medicinas</span>
      </div>
      <div class="benefit-item">
        <div class="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg></div>
        <span class="benefit-text"><strong>Terapia semanal</strong> — Para quien más lo necesite</span>
      </div>
      <div class="benefit-item">
        <div class="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg></div>
        <span class="benefit-text"><strong>Seguimiento mensual</strong> — A sus ahorros en salud</span>
      </div>
    </div>
    
    <div class="companion-section">
      <p class="companion-name">${data.companion_name}</p>
      <p class="companion-role">cuidará a tu familia</p>
      <p class="companion-quote">"Estaré al pendiente de ellos, como si fueran mi propia familia."</p>
    </div>
    
    <div class="cta-section">
      <a href="https://saludcompartida.app/login" class="cta-button">Seguimiento Mensual de Ahorro y Bienestar →</a>
    </div>
    
    <div class="divider"></div>
    
    <div class="footer">
      <p class="footer-tagline"><strong>SaludCompartida</strong>, ¿dónde está tu corazón?</p>
      <p class="footer-sub">En 30 segundos, donde más lo necesitan.</p>
      <p class="footer-contact">¿Preguntas? contact@saludcompartida.com</p>
    </div>
  </div>
</body>
</html>
`;
}

// =============================================================================
// TEMPLATE 2: EMAIL PARA USUARIO MÉXICO - "El Regalo de Amor"
// =============================================================================

function getFamilyEmailTemplate(data: FamilyEmailData): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>¡Tienes un regalo especial! - SaludCompartida</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f1f5f9; padding: 20px; }
    .email-container { max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1); }
    .header-gift { background: linear-gradient(135deg, #EC4899 0%, #be185d 50%, #9d174d 100%); padding: 40px 20px 50px; text-align: center; }
    .gift-icon { width: 100px; height: 100px; background: white; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
    .gift-icon svg { width: 50px; height: 50px; color: #EC4899; }
    .header-title { font-size: 1.6rem; color: white; font-weight: 700; margin-bottom: 8px; text-shadow: 0 2px 10px rgba(0,0,0,0.2); }
    .header-subtitle { font-size: 1.1rem; color: rgba(255,255,255,0.9); }
    .logo-section { text-align: center; padding: 25px 20px 20px; background: white; margin-top: -25px; border-radius: 25px 25px 0 0; }
    .logo-img { height: 44px; width: auto; }
    .from-section { background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%); margin: 0 22px; border-radius: 20px; padding: 28px; text-align: center; border: 2px solid #f9a8d4; }
    .from-label { display: inline-flex; align-items: center; gap: 8px; background: white; padding: 6px 16px; border-radius: 20px; font-size: 0.75rem; color: #9d174d; font-weight: 600; text-transform: uppercase; margin-bottom: 15px; }
    .from-label svg { width: 14px; height: 14px; }
    .from-name { font-size: 1.6rem; color: #831843; font-weight: 700; margin-bottom: 12px; }
    .from-message { font-size: 1.15rem; color: #9d174d; font-style: italic; line-height: 1.6; }
    .distance-section { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); margin: 25px 22px; border-radius: 16px; padding: 25px; text-align: center; }
    .distance-icons { display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 18px; }
    .flag-circle { width: 54px; height: 54px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.3); overflow: hidden; background: white; }
    .flag-circle svg { width: 80px; height: 54px; }
    .distance-line { flex: 1; max-width: 80px; height: 2px; background: linear-gradient(90deg, #06B6D4, #EC4899); }
    .distance-text { font-size: 1rem; color: #f1f5f9; line-height: 1.6; }
    .distance-text strong { color: #fbbf24; }
    .code-section { background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); margin: 0 22px; border-radius: 20px; padding: 28px; text-align: center; border: 2px solid #10b981; }
    .code-badge { display: inline-flex; align-items: center; gap: 8px; background: #10b981; color: white; padding: 6px 16px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; margin-bottom: 18px; }
    .code-badge svg { width: 14px; height: 14px; }
    .code-value { font-size: 2.4rem; font-weight: 800; font-family: 'Courier New', monospace; letter-spacing: 8px; color: #059669; background: white; padding: 20px 35px; border-radius: 16px; display: inline-block; border: 3px dashed #10b981; }
    .code-instruction { font-size: 0.9rem; color: #065f46; margin-top: 16px; line-height: 1.5; }
    .benefits-section { padding: 30px 22px; }
    .benefits-title { display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 1rem; color: #0f172a; font-weight: 700; margin-bottom: 20px; text-transform: uppercase; }
    .benefits-title svg { width: 22px; height: 22px; color: #06B6D4; }
    .benefits-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .benefit-card { background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 20px 16px; text-align: center; border: 1px solid #e2e8f0; }
    .benefit-card-icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; }
    .benefit-card-icon.cyan { background: linear-gradient(135deg, #06B6D4, #0891b2); }
    .benefit-card-icon.amber { background: linear-gradient(135deg, #f59e0b, #d97706); }
    .benefit-card-icon.rose { background: linear-gradient(135deg, #EC4899, #be185d); }
    .benefit-card-icon.emerald { background: linear-gradient(135deg, #10b981, #059669); }
    .benefit-card-icon svg { width: 24px; height: 24px; color: white; }
    .benefit-card-title { font-size: 0.85rem; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
    .benefit-card-desc { font-size: 0.78rem; color: #64748b; line-height: 1.4; }
    .companion-section { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); margin: 0 22px; border-radius: 20px; padding: 28px; text-align: center; border: 2px solid #f59e0b; }
    .companion-intro { font-size: 0.85rem; color: #92400e; margin-bottom: 8px; }
    .companion-name { font-size: 1.6rem; font-weight: 700; color: #78350f; margin-bottom: 6px; }
    .companion-role { font-size: 0.95rem; color: #a16207; margin-bottom: 18px; }
    .companion-quote { font-size: 1.05rem; color: #78350f; font-style: italic; line-height: 1.6; background: white; padding: 18px 20px; border-radius: 12px; }
    .surprise-section { background: linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%); margin: 25px 22px; border-radius: 20px; padding: 28px; text-align: center; border: 2px dashed #d946ef; }
    .surprise-icon { width: 50px; height: 50px; background: linear-gradient(135deg, #d946ef, #a855f7); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; }
    .surprise-icon svg { width: 26px; height: 26px; color: white; }
    .surprise-title { font-size: 1.1rem; color: #86198f; font-weight: 700; margin-bottom: 8px; }
    .surprise-text { font-size: 0.95rem; color: #a21caf; margin-bottom: 18px; line-height: 1.5; }
    .surprise-button { display: inline-block; background: linear-gradient(135deg, #d946ef, #a855f7); color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 0.95rem; }
    .cta-section { padding: 28px 22px; text-align: center; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #06B6D4 0%, #0891b2 100%); color: white; padding: 18px 36px; border-radius: 14px; text-decoration: none; font-weight: 700; font-size: 1.05rem; }
    .divider { height: 1px; background: linear-gradient(90deg, transparent, #e2e8f0, transparent); margin: 0 50px; }
    .footer { background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%); padding: 35px 28px; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer-tagline { font-size: 1.15rem; color: #334155; margin-bottom: 6px; }
    .footer-tagline strong { color: #06B6D4; }
    .footer-sub { font-size: 1rem; color: #64748b; font-style: italic; }
    .footer-contact { font-size: 0.82rem; color: #94a3b8; margin-top: 22px; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header-gift">
      <div class="gift-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="#EC4899" stroke-width="2"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>
      </div>
      <h1 class="header-title">¡Tienes un Regalo Especial!</h1>
      <p class="header-subtitle">Alguien que te ama pensó en ti</p>
    </div>
    
    <div class="logo-section">
      <img src="https://saludcompartida.com/images/saludcompartida-transp_light-bg-no-tagline.png" alt="SaludCompartida" class="logo-img">
    </div>
    
    <div class="from-section">
      <div class="from-label">
        <svg viewBox="0 0 24 24" fill="#9d174d"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        Con mucho cariño de
      </div>
      <p class="from-name">${data.migrant_first_name}</p>
      <p class="from-message">"Aunque estoy lejos, quiero que estés bien. Te quiero mucho y pienso en ti todos los días."</p>
    </div>
    
    <div class="distance-section">
      <div class="distance-icons">
        <div class="flag-circle">
          <svg viewBox="0 0 190 100"><rect width="190" height="100" fill="#bf0a30"/><rect y="7.69" width="190" height="7.69" fill="#fff"/><rect y="23.07" width="190" height="7.69" fill="#fff"/><rect y="38.46" width="190" height="7.69" fill="#fff"/><rect y="53.84" width="190" height="7.69" fill="#fff"/><rect y="69.23" width="190" height="7.69" fill="#fff"/><rect y="84.61" width="190" height="7.69" fill="#fff"/><rect width="76" height="53.84" fill="#002868"/><g fill="#fff"><polygon points="9,5 10.5,9.5 15,9.5 11.5,12.5 13,17 9,14 5,17 6.5,12.5 3,9.5 7.5,9.5" transform="scale(0.5) translate(6,6)"/><polygon points="9,5 10.5,9.5 15,9.5 11.5,12.5 13,17 9,14 5,17 6.5,12.5 3,9.5 7.5,9.5" transform="scale(0.5) translate(22,6)"/><polygon points="9,5 10.5,9.5 15,9.5 11.5,12.5 13,17 9,14 5,17 6.5,12.5 3,9.5 7.5,9.5" transform="scale(0.5) translate(38,6)"/><polygon points="9,5 10.5,9.5 15,9.5 11.5,12.5 13,17 9,14 5,17 6.5,12.5 3,9.5 7.5,9.5" transform="scale(0.5) translate(54,6)"/><polygon points="9,5 10.5,9.5 15,9.5 11.5,12.5 13,17 9,14 5,17 6.5,12.5 3,9.5 7.5,9.5" transform="scale(0.5) translate(70,6)"/><polygon points="9,5 10.5,9.5 15,9.5 11.5,12.5 13,17 9,14 5,17 6.5,12.5 3,9.5 7.5,9.5" transform="scale(0.5) translate(86,6)"/><polygon points="9,5 10.5,9.5 15,9.5 11.5,12.5 13,17 9,14 5,17 6.5,12.5 3,9.5 7.5,9.5" transform="scale(0.5) translate(14,18)"/><polygon points="9,5 10.5,9.5 15,9.5 11.5,12.5 13,17 9,14 5,17 6.5,12.5 3,9.5 7.5,9.5" transform="scale(0.5) translate(30,18)"/><polygon points="9,5 10.5,9.5 15,9.5 11.5,12.5 13,17 9,14 5,17 6.5,12.5 3,9.5 7.5,9.5" transform="scale(0.5) translate(46,18)"/><polygon points="9,5 10.5,9.5 15,9.5 11.5,12.5 13,17 9,14 5,17 6.5,12.5 3,9.5 7.5,9.5" transform="scale(0.5) translate(62,18)"/><polygon points="9,5 10.5,9.5 15,9.5 11.5,12.5 13,17 9,14 5,17 6.5,12.5 3,9.5 7.5,9.5" transform="scale(0.5) translate(78,18)"/><polygon points="9,5 10.5,9.5 15,9.5 11.5,12.5 13,17 9,14 5,17 6.5,12.5 3,9.5 7.5,9.5" transform="scale(0.5) translate(6,30)"/><polygon points="9,5 10.5,9.5 15,9.5 11.5,12.5 13,17 9,14 5,17 6.5,12.5 3,9.5 7.5,9.5" transform="scale(0.5) translate(22,30)"/><polygon points="9,5 10.5,9.5 15,9.5 11.5,12.5 13,17 9,14 5,17 6.5,12.5 3,9.5 7.5,9.5" transform="scale(0.5) translate(38,30)"/><polygon points="9,5 10.5,9.5 15,9.5 11.5,12.5 13,17 9,14 5,17 6.5,12.5 3,9.5 7.5,9.5" transform="scale(0.5) translate(54,30)"/><polygon points="9,5 10.5,9.5 15,9.5 11.5,12.5 13,17 9,14 5,17 6.5,12.5 3,9.5 7.5,9.5" transform="scale(0.5) translate(70,30)"/><polygon points="9,5 10.5,9.5 15,9.5 11.5,12.5 13,17 9,14 5,17 6.5,12.5 3,9.5 7.5,9.5" transform="scale(0.5) translate(86,30)"/></g></svg>
        </div>
        <div class="distance-line"></div>
        <div class="flag-circle">
          <svg viewBox="0 0 190 100"><rect width="63.33" height="100" fill="#006847"/><rect x="63.33" width="63.33" height="100" fill="#fff"/><rect x="126.66" width="63.33" height="100" fill="#ce1126"/><g transform="translate(95,50)"><ellipse cx="0" cy="0" rx="12" ry="10" fill="#6d4c1d"/><circle cx="-8" cy="-8" r="5" fill="#6d4c1d"/><path d="M-14,-8 L-18,-7 L-14,-6 Z" fill="#f8b32c"/><path d="M-18,-7 Q-22,-5 -20,-3" stroke="#4a7c59" stroke-width="1.5" fill="none"/><path d="M-5,-5 Q-15,-20 -25,-15 Q-15,-12 -8,-8" fill="#6d4c1d"/><path d="M5,-5 Q15,-20 25,-15 Q15,-12 8,-8" fill="#6d4c1d"/><path d="M0,10 L-8,22 L0,18 L8,22 Z" fill="#6d4c1d"/><ellipse cx="0" cy="12" rx="8" ry="4" fill="#4a7c59"/><ellipse cx="-6" cy="8" rx="3" ry="5" fill="#4a7c59"/><ellipse cx="6" cy="6" rx="3" ry="5" fill="#4a7c59"/><ellipse cx="0" cy="18" rx="15" ry="4" fill="#0077be" opacity="0.6"/></g></svg>
        </div>
      </div>
      <p class="distance-text">
        Aunque hay miles de kilómetros entre ustedes,<br>
        <strong>${data.migrant_first_name}</strong> encontró la forma de cuidarte.
      </p>
    </div>
    
    <div class="code-section">
      <div class="code-badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>
        Tu código personal
      </div>
      <div class="code-value">${data.family_code}</div>
      <p class="code-instruction">Este código es solo tuyo. Úsalo para acceder a todos tus beneficios de salud.</p>
    </div>
    
    <div class="benefits-section">
      <div class="benefits-title">
        <svg viewBox="0 0 24 24" fill="#06B6D4"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
        Ahora puedes usar
      </div>
      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-card-icon cyan"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2"/></svg></div>
          <p class="benefit-card-title">Médico 24/7</p>
          <p class="benefit-card-desc">Videollamadas ilimitadas cuando lo necesites</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-card-icon amber"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg></div>
          <p class="benefit-card-title">Farmacias</p>
          <p class="benefit-card-desc">Hasta 75% de descuento en medicinas</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-card-icon rose"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg></div>
          <p class="benefit-card-title">Terapia</p>
          <p class="benefit-card-desc">Apoyo emocional para quien lo necesite</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-card-icon emerald"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg></div>
          <p class="benefit-card-title">Bienestar</p>
          <p class="benefit-card-desc">Seguimiento mensual de tu salud</p>
        </div>
      </div>
    </div>
    
    <div class="companion-section">
      <p class="companion-intro">Muy pronto te llamará</p>
      <p class="companion-name">${data.companion_name}</p>
      <p class="companion-role">Tu acompañante de salud</p>
      <p class="companion-quote">"Hola ${data.family_first_name}, soy ${data.companion_name}. Voy a estar al pendiente de ti y de tu familia. ¡Pronto platicamos!"</p>
    </div>
    
    <div class="surprise-section">
      <div class="surprise-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>
      </div>
      <p class="surprise-title">¿Quieres darle una sorpresa?</p>
      <p class="surprise-text">Envíale un mensaje de agradecimiento a ${data.migrant_first_name}.<br>¡Le alegrará el día!</p>
      <a href="https://wa.me/?text=%C2%A1Gracias%20por%20mi%20regalo%20de%20SaludCompartida!%20Te%20quiero%20mucho%20%F0%9F%92%95" class="surprise-button">Enviar Mensaje 💕</a>
    </div>
    
    <div class="cta-section">
      <a href="https://saludcompartida.app/login" class="cta-button">Acceder a Mis Servicios →</a>
    </div>
    
    <div class="divider"></div>
    
    <div class="footer">
      <p class="footer-tagline"><strong>SaludCompartida</strong>, ¿dónde está tu corazón?</p>
      <p class="footer-sub">En 30 segundos, donde más lo necesitan.</p>
      <p class="footer-contact">¿Preguntas? contact@saludcompartida.com</p>
    </div>
  </div>
</body>
</html>
`;
}

// =============================================================================
// FUNCIONES DE ENVÍO CON RESEND
// =============================================================================

/**
 * Envía email de confirmación al migrante (USA)
 */
export async function sendMigrantEmail(data: MigrantEmailData) {
  try {
    const response = await resend.emails.send({
      from: 'SaludCompartida <hola@saludcompartida.com>',
      to: data.migrant_email,
      subject: '💜 Aunque estés lejos... tu familia está cuidada',
      html: getMigrantEmailTemplate(data),
    });
    
    console.log('✅ Email enviado al migrante:', response);
    return { success: true, data: response };
  } catch (error) {
    console.error('❌ Error enviando email al migrante:', error);
    return { success: false, error };
  }
}

/**
 * Envía email de bienvenida al usuario en México
 */
export async function sendFamilyEmail(data: FamilyEmailData) {
  try {
    const response = await resend.emails.send({
      from: 'SaludCompartida <hola@saludcompartida.com>',
      to: data.family_primary_email,
      subject: `🎁 ${data.migrant_first_name} te acaba de dar un regalo especial`,
      html: getFamilyEmailTemplate(data),
    });
    
    console.log('✅ Email enviado al usuario México:', response);
    return { success: true, data: response };
  } catch (error) {
    console.error('❌ Error enviando email al usuario México:', error);
    return { success: false, error };
  }
}

/**
 * Envía ambos emails después de pago exitoso
 */
export async function sendPostPaymentEmails(
  migrantData: MigrantEmailData,
  familyData: FamilyEmailData
) {
  const results = await Promise.allSettled([
    sendMigrantEmail(migrantData),
    sendFamilyEmail(familyData),
  ]);
  
  return {
    migrant: results[0],
    family: results[1],
  };
}

// =============================================================================
// EJEMPLO DE USO EN WEBHOOK DE SQUARE
// =============================================================================

/*
// En: app/api/webhooks/square/route.ts

import { sendPostPaymentEmails } from '@/lib/email-templates';
import { supabase } from '@/lib/supabase';

async function handlePaymentCompleted(payment: any) {
  // 1. Obtener datos del registro
  const { data: registration } = await supabase
    .from('registrations')
    .select(`
      *,
      ai_companions (companion_name)
    `)
    .eq('square_payment_id', payment.id)
    .single();
  
  if (!registration) return;
  
  // 2. Enviar emails
  await sendPostPaymentEmails(
    {
      migrant_email: registration.migrant_email,
      migrant_code: registration.migrant_code,
      companion_name: registration.ai_companions.companion_name,
    },
    {
      family_primary_email: registration.family_primary_email,
      family_first_name: registration.family_first_name,
      family_code: registration.family_code,
      migrant_first_name: registration.migrant_first_name,
      companion_name: registration.ai_companions.companion_name,
    }
  );
}
*/
