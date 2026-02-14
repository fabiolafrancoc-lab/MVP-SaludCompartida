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
  migrant_email: string;           // registrations.migrant_email (para el botón "Enviar Mensaje")
  
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
      <img src="https://saludcompartida.app/saludcompartida-transp%20light-bg-no-tagline.png" alt="SaludCompartida" class="logo-img">
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
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>¡Tienes un Regalo Especial!</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0f172a;">
  
  <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 20px;">
    <tr>
      <td align="center">
        
        <!-- Container principal -->
        <table width="500" cellpadding="0" cellspacing="0" style="max-width: 100%; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.5);">
          
          <!-- Header gradient bar -->
          <tr>
            <td style="height: 6px; background: linear-gradient(90deg, #06B6D4, #0891b2, #f59e0b, #EC4899);"></td>
          </tr>
          
          <!-- Logo -->
          <tr>
            <td style="text-align: center; padding: 28px 20px 22px; background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);">
              <img src="https://saludcompartida.com/images/saludcompartida-transp_light-bg-no-tagline.png" alt="SaludCompartida" style="height: 48px; width: auto;">
            </td>
          </tr>
          
          <!-- Gift announcement -->
          <tr>
            <td style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 32px 28px; text-align: center;">
              <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 50%; margin: 0 auto 18px; box-shadow: 0 10px 25px rgba(245, 158, 11, 0.4);">
                <table width="100%" height="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" valign="middle">
                      <!-- Gift SVG -->
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="8" width="18" height="4" rx="1"/>
                        <path d="M12 8v13"/>
                        <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/>
                        <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>
                      </svg>
                    </td>
                  </tr>
                </table>
              </div>
              <h1 style="font-size: 1.7rem; color: #92400e; font-weight: 700; margin: 0 0 8px;">¡Tienes un Regalo Especial!</h1>
              <p style="font-size: 1.1rem; color: #b45309; margin: 0;">Alguien que te ama pensó en ti</p>
            </td>
          </tr>
          
          <!-- Sender section -->
          <tr>
            <td style="background: #ffffff; padding: 28px; text-align: center;">
              <p style="font-size: 0.85rem; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px;">Con mucho cariño de</p>
              <p style="font-size: 1.6rem; color: #0f172a; font-weight: 700; margin: 0 0 18px;">${data.migrant_first_name}</p>
              <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 16px; padding: 20px; position: relative;">
                <p style="font-size: 1.05rem; color: #334155; line-height: 1.6; font-style: italic; margin: 0;">
                  "Aunque estoy lejos, quiero que estés bien. Te quiero mucho y pienso en ti todos los días."
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Distance + Instructions section -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 26px 28px; text-align: center;">
              <p style="font-size: 1.1rem; color: #e2e8f0; line-height: 1.7; margin: 0 0 20px;">
                Aunque hay miles de kilómetros entre ustedes, <strong style="color: #06B6D4;">${data.migrant_first_name}</strong> encontró la forma de cuidarte.
              </p>
              
              <!-- Instrucciones de acceso -->
              <div style="background: rgba(6, 182, 212, 0.15); border: 2px solid #06B6D4; border-radius: 16px; padding: 20px; text-align: left;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="padding-bottom: 16px;">
                      <!-- Smartphone SVG -->
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 8px;">
                        <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
                        <path d="M12 18h.01"/>
                      </svg>
                      <span style="font-size: 0.9rem; color: #06B6D4; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Cómo empezar</span>
                    </td>
                  </tr>
                </table>
                
                <p style="font-size: 1rem; color: #ffffff; line-height: 1.8; margin: 0;">
                  <strong style="color: #10B981;">1.</strong> Ingresa ahora mismo a:<br>
                  <a href="https://www.saludcompartida.com" style="color: #06B6D4; font-weight: 700; text-decoration: none; font-size: 1.1rem;">www.saludcompartida.com</a>
                </p>
                
                <p style="font-size: 1rem; color: #ffffff; line-height: 1.8; margin: 16px 0 0;">
                  <strong style="color: #10B981;">2.</strong> Haz clic arriba a la derecha donde dice <span style="background: #06B6D4; color: #0f172a; padding: 3px 10px; border-radius: 6px; font-weight: 700;">"Ya Tengo Mi Código"</span>
                </p>
                
                <p style="font-size: 1rem; color: #ffffff; line-height: 1.8; margin: 16px 0 0;">
                  <strong style="color: #10B981;">3.</strong> Ingresa el código de abajo y empieza a disfrutar de los servicios de SaludCompartida
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Code section -->
          <tr>
            <td style="background: #f8fafc; padding: 28px; text-align: center;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom: 16px;">
                    <!-- Lock SVG -->
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 8px;">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <span style="font-size: 0.85rem; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Tu código personal</span>
                  </td>
                </tr>
              </table>
              <div style="font-size: 2.4rem; font-weight: 800; color: #0f172a; letter-spacing: 6px; background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%); padding: 18px 30px; border-radius: 14px; border: 3px dashed #06B6D4; display: inline-block; font-family: 'Consolas', 'Monaco', monospace;">
                ${data.family_code}
              </div>
              <p style="font-size: 0.95rem; color: #64748b; line-height: 1.5; margin: 14px 0 0;">
                Este código es solo tuyo. Úsalo para acceder a todos tus beneficios de salud.
              </p>
            </td>
          </tr>
          
          <!-- Benefits section - SIN FARMACIAS, CON SVG -->
          <tr>
            <td style="padding: 28px; background: #ffffff;">
              <p style="text-align: center; font-size: 1.15rem; color: #0f172a; font-weight: 700; margin: 0 0 22px;">Ahora puedes usar</p>
              
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <!-- Médico 24/7 -->
                  <td width="50%" style="padding: 8px; vertical-align: top;">
                    <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 14px; padding: 20px 16px; text-align: center; border: 1px solid #e2e8f0;">
                      <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #06B6D4 0%, #0891b2 100%); border-radius: 12px; margin: 0 auto 12px; box-shadow: 0 4px 12px rgba(6, 182, 212, 0.25);">
                        <table width="100%" height="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" valign="middle">
                              <!-- Video camera SVG -->
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m22 8-6 4 6 4V8Z"/>
                                <rect width="14" height="12" x="2" y="6" rx="2" ry="2"/>
                              </svg>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <p style="font-size: 0.95rem; font-weight: 700; color: #0f172a; margin: 0 0 4px;">Médico 24/7</p>
                      <p style="font-size: 0.8rem; color: #64748b; line-height: 1.4; margin: 0;">Videollamadas ilimitadas cuando lo necesites</p>
                    </div>
                  </td>
                  
                  <!-- Terapia -->
                  <td width="50%" style="padding: 8px; vertical-align: top;">
                    <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 14px; padding: 20px 16px; text-align: center; border: 1px solid #e2e8f0;">
                      <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #EC4899 0%, #db2777 100%); border-radius: 12px; margin: 0 auto 12px; box-shadow: 0 4px 12px rgba(236, 72, 153, 0.25);">
                        <table width="100%" height="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" valign="middle">
                              <!-- Brain SVG -->
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
                                <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
                                <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
                              </svg>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <p style="font-size: 0.95rem; font-weight: 700; color: #0f172a; margin: 0 0 4px;">Terapia</p>
                      <p style="font-size: 0.8rem; color: #64748b; line-height: 1.4; margin: 0;">Apoyo emocional para quien lo necesite</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <!-- Bienestar -->
                  <td colspan="2" style="padding: 8px;">
                    <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 14px; padding: 20px 16px; text-align: center; border: 1px solid #e2e8f0;">
                      <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #10B981 0%, #059669 100%); border-radius: 12px; margin: 0 auto 12px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);">
                        <table width="100%" height="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" valign="middle">
                              <!-- Chart/Activity SVG -->
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                              </svg>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <p style="font-size: 0.95rem; font-weight: 700; color: #0f172a; margin: 0 0 4px;">Bienestar</p>
                      <p style="font-size: 0.8rem; color: #64748b; line-height: 1.4; margin: 0;">Seguimiento mensual de tu salud</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Lupita section -->
          <tr>
            <td style="background: linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%); padding: 28px; text-align: center; border-top: 1px solid #e9d5ff;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <div style="display: inline-block; background: linear-gradient(135deg, #EC4899 0%, #db2777 100%); color: white; padding: 8px 18px; border-radius: 25px; font-size: 0.8rem; font-weight: 700; margin-bottom: 18px; letter-spacing: 0.5px;">
                      <!-- Sparkles SVG inline -->
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle; margin-right: 6px;">
                        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
                      </svg>
                      MUY PRONTO TE LLAMARÁ
                    </div>
                  </td>
                </tr>
              </table>
              
              <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #EC4899 0%, #db2777 100%); border-radius: 50%; margin: 0 auto 16px; box-shadow: 0 10px 25px rgba(236, 72, 153, 0.35);">
                <table width="100%" height="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" valign="middle">
                      <!-- Heart Handshake SVG -->
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                        <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/>
                        <path d="m18 15-2-2"/>
                        <path d="m15 18-2-2"/>
                      </svg>
                    </td>
                  </tr>
                </table>
              </div>
              
              <p style="font-size: 1.3rem; color: #831843; font-weight: 700; margin: 0 0 4px;">${data.companion_name}</p>
              <p style="font-size: 0.95rem; color: #9d174d; margin: 0 0 16px;">Tu acompañante de salud</p>
              
              <div style="background: #ffffff; border-radius: 16px; padding: 18px; font-size: 1rem; color: #334155; line-height: 1.6; font-style: italic; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
                <p style="margin: 0;">"Hola ${data.family_first_name}, soy ${data.companion_name}. Voy a estar al pendiente de ti y de tu familia. ¡Pronto platicamos!"</p>
              </div>
            </td>
          </tr>
          
          <!-- Thank you CTA -->
          <tr>
            <td style="background: #ffffff; padding: 28px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="font-size: 1rem; color: #334155; margin: 0 0 16px; line-height: 1.5;">
                ¿Quieres darle una sorpresa?<br>
                <strong style="color: #0f172a;">Envíale un mensaje de agradecimiento a ${data.migrant_first_name}. ¡Le alegrará el día!</strong>
              </p>
              <a href="mailto:${data.migrant_email}?subject=Gracias por mi regalo de SaludCompartida&body=Querido/a ${data.migrant_first_name},%0A%0AGracias por pensar en mí..." style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 1rem; box-shadow: 0 8px 20px rgba(245, 158, 11, 0.35);">
                <!-- Mail SVG -->
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 8px;">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                Enviar Mensaje
              </a>
            </td>
          </tr>
          
          <!-- CTA Acceder -->
          <tr>
            <td style="padding: 0 28px 28px; text-align: center; background: #ffffff;">
              <a href="https://saludcompartida.com" style="display: inline-block; background: linear-gradient(135deg, #06B6D4 0%, #0891b2 100%); color: white; padding: 16px 36px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 1rem; box-shadow: 0 10px 25px rgba(6, 182, 212, 0.35);">
                Acceder a Mis Servicios
                <!-- Arrow Right SVG -->
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-left: 8px;">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%); padding: 32px 28px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="font-size: 1.15rem; color: #334155; margin: 0 0 22px; line-height: 1.5;">
                <strong style="color: #06B6D4;">SaludCompartida</strong> está donde está tu corazón.
              </p>
              <p style="font-size: 0.82rem; color: #94a3b8; margin: 0;">
                ¿Preguntas? contact@saludcompartida.com
              </p>
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
  
</body>
</html>`;
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
      from: 'SaludCompartida <noreply@saludcompartida.app>',
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
      from: 'SaludCompartida <noreply@saludcompartida.app>',
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
 * Envía email de notificación al equipo Aura con todos los datos
 */
export async function sendAuraNotificationEmail(registration: any) {
  try {
    const auraEmails = [
      'ffranco@saludcompartida.com',
      'contact@saludcompartida.app',
      'stephania.cardenas@anevent.com.mx'
    ];

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; padding: 20px; }
    .container { max-width: 650px; margin: 0 auto; background: white; border-radius: 12px; padding: 32px; box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
    .header { background: linear-gradient(135deg, #06B6D4, #EC4899); padding: 24px; border-radius: 8px; margin-bottom: 24px; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .header p { color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px; }
    .section { margin-bottom: 28px; }
    .section-title { font-size: 16px; font-weight: 700; color: #1e293b; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #e2e8f0; }
    .data-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
    .data-label { font-weight: 600; color: #64748b; font-size: 13px; }
    .data-value { color: #1e293b; font-size: 14px; font-weight: 500; }
    .code-box { background: linear-gradient(135deg, #ecfdf5, #d1fae5); border: 2px solid #10b981; border-radius: 8px; padding: 16px; text-align: center; margin: 12px 0; }
    .code-label { font-size: 11px; color: #047857; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
    .code-value { font-size: 28px; font-family: 'Courier New', monospace; font-weight: 800; color: #059669; letter-spacing: 4px; }
    .highlight { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 6px; margin: 16px 0; }
    .highlight strong { color: #92400e; }
    .footer { margin-top: 32px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center; color: #94a3b8; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Nueva Suscripción Registrada</h1>
      <p>Pago procesado exitosamente en Square</p>
    </div>

    <div class="section">
      <div class="section-title">💳 Información del Pago</div>
      <div class="data-row">
        <span class="data-label">ID Registro:</span>
        <span class="data-value">${registration.id}</span>
      </div>
      <div class="data-row">
        <span class="data-label">Monto Pagado:</span>
        <span class="data-value">$12.00 USD</span>
      </div>
      <div class="data-row">
        <span class="data-label">Fecha de Pago:</span>
        <span class="data-value">${new Date(registration.payment_completed_at || Date.now()).toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}</span>
      </div>
      <div class="data-row">
        <span class="data-label">Estado:</span>
        <span class="data-value" style="color: #10b981; font-weight: 700;">ACTIVO ✓</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">👤 Migrante (EE.UU.)</div>
      <div class="data-row">
        <span class="data-label">Nombre:</span>
        <span class="data-value">${registration.migrant_first_name} ${registration.migrant_last_name}</span>
      </div>
      <div class="data-row">
        <span class="data-label">Email:</span>
        <span class="data-value">${registration.migrant_email}</span>
      </div>
      <div class="data-row">
        <span class="data-label">Teléfono:</span>
        <span class="data-value">${registration.migrant_phone}</span>
      </div>
      
      <div class="code-box">
        <div class="code-label">Código de Acceso Migrante</div>
        <div class="code-value">${registration.migrant_code}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">👨‍👩‍👧 Familia (México)</div>
      <div class="data-row">
        <span class="data-label">Nombre:</span>
        <span class="data-value">${registration.family_first_name} ${registration.family_last_name}</span>
      </div>
      <div class="data-row">
        <span class="data-label">Email:</span>
        <span class="data-value">${registration.family_primary_email}</span>
      </div>
      <div class="data-row">
        <span class="data-label">WhatsApp:</span>
        <span class="data-value">${registration.family_whatsapp}</span>
      </div>
      
      <div class="code-box">
        <div class="code-label">Código de Acceso Familia</div>
        <div class="code-value">${registration.family_code}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">💜 Acompañante Asignada</div>
      <div class="highlight">
        <strong>${registration.family_companion_assigned === 'lupita' ? 'Lupita 🌸' : 'Fernanda 🦋'}</strong> llamará en las próximas 24 horas
      </div>
    </div>

    <div class="footer">
      <p><strong>SaludCompartida</strong> - Sistema de Notificaciones</p>
      <p>Este email fue enviado automáticamente después del pago en Square</p>
    </div>
  </div>
</body>
</html>
    `;

    const response = await resend.emails.send({
      from: 'SaludCompartida Notificaciones <noreply@saludcompartida.app>',
      to: auraEmails,
      subject: `🎉 Nueva suscripción: ${registration.migrant_first_name} → ${registration.family_first_name}`,
      html: htmlContent,
    });
    
    console.log('✅ Email de notificación enviado a Aura:', response);
    return { success: true, data: response };
  } catch (error) {
    console.error('❌ Error enviando email a Aura:', error);
    return { success: false, error };
  }
}

/**
 * Envía todos los emails después de pago exitoso (3 emails)
 */
export async function sendPostPaymentEmails(
  migrantData: MigrantEmailData,
  familyData: FamilyEmailData,
  registrationData?: any
) {
  const emailPromises = [
    sendMigrantEmail(migrantData),
    sendFamilyEmail(familyData),
  ];

  // Agregar email de notificación a Aura si hay datos completos
  if (registrationData) {
    emailPromises.push(sendAuraNotificationEmail(registrationData));
  }

  const results = await Promise.allSettled(emailPromises);
  
  return {
    migrant: results[0],
    family: results[1],
    aura: results[2] || { status: 'fulfilled', value: { success: false, error: 'No registration data' } },
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
