// Script para verificar configuración de WhatsApp
export default async function handler(req, res) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;

  const config = {
    hasSid: !!accountSid,
    hasToken: !!authToken,
    hasWhatsAppNumber: !!twilioWhatsAppNumber,
    sidPreview: accountSid ? `${accountSid.substring(0, 10)}...` : 'NO DEFINIDO',
    tokenPreview: authToken ? `${authToken.substring(0, 10)}...` : 'NO DEFINIDO',
    whatsappNumber: twilioWhatsAppNumber || 'NO DEFINIDO'
  };

  const allConfigured = config.hasSid && config.hasToken && config.hasWhatsAppNumber;

  return res.status(200).json({
    configured: allConfigured,
    details: config,
    message: allConfigured 
      ? '✅ Todas las variables de Twilio están configuradas'
      : '❌ Faltan variables de entorno de Twilio',
    nextSteps: allConfigured 
      ? [
          '1. Verifica que tu número de Twilio esté en el Sandbox',
          '2. Envía "join <sandbox-word>" desde WhatsApp al número de Twilio',
          '3. Espera la confirmación de Twilio',
          '4. Intenta registrarte de nuevo'
        ]
      : [
          '1. Ve a Vercel Dashboard → Tu proyecto → Settings → Environment Variables',
          '2. Agrega TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_NUMBER',
          '3. Redeploy el proyecto'
        ]
  });
}
