// Templates de emails para Resend

export interface EmailData {
  migrant_first_name: string;
  family_first_name: string;
  family_code: string;
  companion_assigned: 'lupita' | 'fernanda';
  phone_number: string; // Número de teléfono para llamar a la compañera
}

// ============================================
// EMAIL 1: MIGRANTE EN USA (Titular/Suscriptor)
// ============================================
export const emailMigranteTemplate = (data: EmailData) => {
  const companionName = data.companion_assigned === 'lupita' ? 'Lupita' : 'Fernanda';
  const companionAge = data.companion_assigned === 'lupita' ? '55+' : '25-54';
  
  return {
    subject: `¡Bienvenido a SaludCompartida! ${data.family_first_name} ahora tiene a ${companionName}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background: white;
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 32px;
    }
    .logo {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #00D9FF 0%, #00B8D9 100%);
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      margin-bottom: 16px;
    }
    h1 {
      color: #0a0a0a;
      font-size: 28px;
      margin-bottom: 8px;
    }
    .subtitle {
      color: #666;
      font-size: 16px;
    }
    .code-box {
      background: linear-gradient(135deg, rgba(0, 217, 255, 0.1) 0%, rgba(0, 184, 217, 0.05) 100%);
      border: 2px solid #00D9FF;
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      margin: 32px 0;
    }
    .code-label {
      font-size: 14px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    .code-value {
      font-size: 36px;
      font-weight: 700;
      color: #00D9FF;
      letter-spacing: 6px;
      font-family: 'Courier New', monospace;
    }
    .info-box {
      background: #f8f9fa;
      border-left: 4px solid #00D9FF;
      border-radius: 8px;
      padding: 20px;
      margin: 24px 0;
    }
    .info-title {
      font-weight: 600;
      color: #0a0a0a;
      margin-bottom: 8px;
      font-size: 18px;
    }
    .info-text {
      color: #555;
      margin: 8px 0;
    }
    .steps {
      margin: 32px 0;
    }
    .step {
      display: flex;
      gap: 16px;
      margin-bottom: 20px;
      align-items: start;
    }
    .step-number {
      width: 32px;
      height: 32px;
      background: #00D9FF;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      flex-shrink: 0;
    }
    .step-content {
      flex: 1;
    }
    .step-title {
      font-weight: 600;
      color: #0a0a0a;
      margin-bottom: 4px;
    }
    .step-text {
      color: #555;
      font-size: 14px;
    }
    .cta-button {
      display: inline-block;
      background: #00D9FF;
      color: white;
      padding: 16px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      margin: 24px 0;
      text-align: center;
    }
    .footer {
      text-align: center;
      color: #999;
      font-size: 12px;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #eee;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">💚</div>
      <h1>¡Pago Exitoso!</h1>
      <p class="subtitle">Tu familia ya tiene acceso a SaludCompartida</p>
    </div>

    <p>Hola <strong>${data.migrant_first_name}</strong>,</p>
    
    <p>Tu pago fue procesado exitosamente. <strong>${data.family_first_name}</strong> en México ahora tiene acceso a ${companionName}, su compañera de confianza especializada en adultos ${companionAge} años.</p>

    <div class="code-box">
      <div class="code-label">Código Familiar</div>
      <div class="code-value">${data.family_code}</div>
      <p style="margin-top: 12px; color: #666; font-size: 14px;">
        Comparte este código con ${data.family_first_name}
      </p>
    </div>

    <div class="info-box">
      <div class="info-title">📞 ${data.family_first_name} puede llamar ahora mismo</div>
      <p class="info-text">
        Número: <strong>${data.phone_number}</strong><br>
        Al llamar, ${companionName} pedirá el código <strong>${data.family_code}</strong> para identificarse.
      </p>
    </div>

    <div class="steps">
      <h2 style="font-size: 20px; margin-bottom: 24px;">¿Qué sigue?</h2>
      
      <div class="step">
        <div class="step-number">1</div>
        <div class="step-content">
          <div class="step-title">${data.family_first_name} recibe WhatsApp</div>
          <div class="step-text">Le llegará un mensaje con su código de acceso y cómo usar el servicio.</div>
        </div>
      </div>

      <div class="step">
        <div class="step-number">2</div>
        <div class="step-content">
          <div class="step-title">Primera llamada en minutos</div>
          <div class="step-text">${companionName} se presentará y comenzará a construir una relación de confianza.</div>
        </div>
      </div>

      <div class="step">
        <div class="step-number">3</div>
        <div class="step-content">
          <div class="step-title">Accede a tu dashboard</div>
          <div class="step-text">Monitorea las llamadas, ahorros médicos y el bienestar de ${data.family_first_name}.</div>
        </div>
      </div>
    </div>

    <center>
      <a href="https://saludcompartida.app/login" class="cta-button">
        Acceder a Mi Dashboard
      </a>
    </center>

    <div class="footer">
      <p>
        <strong>SaludCompartida</strong><br>
        Conectando familias a través de las fronteras<br>
        <a href="https://saludcompartida.app" style="color: #00D9FF;">saludcompartida.app</a>
      </p>
      <p style="margin-top: 16px;">
        Si tienes preguntas, responde a este email o escríbenos a<br>
        <a href="mailto:soporte@saludcompartida.app" style="color: #00D9FF;">soporte@saludcompartida.app</a>
      </p>
    </div>
  </div>
</body>
</html>
    `,
    text: `
¡Hola ${data.migrant_first_name}!

Tu pago fue procesado exitosamente. ${data.family_first_name} en México ahora tiene acceso a ${companionName}.

CÓDIGO FAMILIAR: ${data.family_code}

${data.family_first_name} puede llamar ahora mismo a: ${data.phone_number}

¿Qué sigue?
1. ${data.family_first_name} recibe WhatsApp con instrucciones
2. ${companionName} llamará pronto para presentarse
3. Accede a tu dashboard en: https://saludcompartida.app/login

Gracias por confiar en SaludCompartida.
    `
  };
};

// ============================================
// EMAIL 2: USUARIO EN MÉXICO (Beneficiario)
// ============================================
export const emailUsuarioMexicoTemplate = (data: EmailData) => {
  const companionName = data.companion_assigned === 'lupita' ? 'Lupita' : 'Fernanda';
  const companionDescription = data.companion_assigned === 'lupita' 
    ? 'especializada en adultos mayores de 55 años' 
    : 'especializada en adultos de 25 a 54 años';
  
  return {
    subject: `¡${data.migrant_first_name} te regaló a ${companionName}! 🎁`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background: white;
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 32px;
    }
    .logo {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #00D9FF 0%, #00B8D9 100%);
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      margin-bottom: 16px;
    }
    h1 {
      color: #0a0a0a;
      font-size: 28px;
      margin-bottom: 8px;
    }
    .subtitle {
      color: #666;
      font-size: 16px;
    }
    .gift-box {
      background: linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(219, 39, 119, 0.05) 100%);
      border: 2px solid #EC4899;
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      margin: 32px 0;
    }
    .gift-emoji {
      font-size: 48px;
      margin-bottom: 12px;
    }
    .gift-text {
      font-size: 18px;
      color: #333;
      font-weight: 600;
    }
    .code-box {
      background: linear-gradient(135deg, rgba(0, 217, 255, 0.1) 0%, rgba(0, 184, 217, 0.05) 100%);
      border: 2px solid #00D9FF;
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      margin: 32px 0;
    }
    .code-label {
      font-size: 14px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    .code-value {
      font-size: 36px;
      font-weight: 700;
      color: #00D9FF;
      letter-spacing: 6px;
      font-family: 'Courier New', monospace;
    }
    .call-box {
      background: linear-gradient(135deg, #00D9FF 0%, #00B8D9 100%);
      color: white;
      border-radius: 12px;
      padding: 32px;
      text-align: center;
      margin: 32px 0;
    }
    .call-title {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 16px;
    }
    .phone-number {
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 2px;
      margin: 16px 0;
    }
    .call-note {
      font-size: 14px;
      opacity: 0.9;
      margin-top: 16px;
    }
    .info-box {
      background: #f8f9fa;
      border-left: 4px solid #00D9FF;
      border-radius: 8px;
      padding: 20px;
      margin: 24px 0;
    }
    .footer {
      text-align: center;
      color: #999;
      font-size: 12px;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #eee;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">💚</div>
      <h1>¡Tienes un regalo!</h1>
      <p class="subtitle">De parte de ${data.migrant_first_name}</p>
    </div>

    <div class="gift-box">
      <div class="gift-emoji">🎁</div>
      <p class="gift-text">
        ${data.migrant_first_name} acaba de activar SaludCompartida para ti
      </p>
    </div>

    <p>Hola <strong>${data.family_first_name}</strong>,</p>
    
    <p>Te presentamos a <strong>${companionName}</strong>, tu compañera de confianza ${companionDescription}. Ella estará disponible para ti cuando la necesites.</p>

    <div class="code-box">
      <div class="code-label">Tu Código Personal</div>
      <div class="code-value">${data.family_code}</div>
      <p style="margin-top: 12px; color: #666; font-size: 14px;">
        Menciona este código cuando llames
      </p>
    </div>

    <div class="call-box">
      <div class="call-title">📞 Llama cuando quieras</div>
      <div class="phone-number">${data.phone_number}</div>
      <p class="call-note">
        ✓ Gratis para ti<br>
        ✓ Disponible 24/7<br>
        ✓ Conversaciones privadas y confidenciales
      </p>
    </div>

    <div class="info-box">
      <p><strong>¿Qué puedes hacer con ${companionName}?</strong></p>
      <ul style="margin: 12px 0; padding-left: 20px;">
        <li>Hablar sobre tu salud y bienestar</li>
        <li>Recibir recordatorios de medicamentos</li>
        <li>Encontrar clínicas cerca de ti</li>
        <li>Pedir citas médicas</li>
        <li>Compañía cuando te sientas solo/a</li>
      </ul>
    </div>

    <p style="margin-top: 32px; padding: 20px; background: #fffbeb; border-radius: 8px; border-left: 4px solid #f59e0b;">
      <strong>💡 Tip:</strong> ${companionName} te llamará pronto para presentarse. También puedes llamarla tú primero cuando quieras.
    </p>

    <div class="footer">
      <p>
        <strong>SaludCompartida</strong><br>
        Un regalo de amor de ${data.migrant_first_name}<br>
        <a href="https://saludcompartida.app" style="color: #00D9FF;">saludcompartida.app</a>
      </p>
      <p style="margin-top: 16px;">
        Si tienes dudas, responde a este email<br>
        o escríbenos a <a href="mailto:soporte@saludcompartida.app" style="color: #00D9FF;">soporte@saludcompartida.app</a>
      </p>
    </div>
  </div>
</body>
</html>
    `,
    text: `
¡Hola ${data.family_first_name}!

${data.migrant_first_name} acaba de activar SaludCompartida para ti. 

Te presentamos a ${companionName}, tu compañera de confianza.

TU CÓDIGO PERSONAL: ${data.family_code}

Llama cuando quieras a: ${data.phone_number}
(Menciona tu código: ${data.family_code})

¿Qué puedes hacer con ${companionName}?
- Hablar sobre tu salud y bienestar
- Recibir recordatorios de medicamentos
- Encontrar clínicas cerca de ti
- Pedir citas médicas
- Compañía cuando te sientas solo/a

${companionName} te llamará pronto para presentarse.

Un regalo de amor de ${data.migrant_first_name}
    `
  };
};
