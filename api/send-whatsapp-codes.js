// Enviar códigos de acceso por WhatsApp usando Twilio
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappFrom = process.env.TWILIO_WHATSAPP_NUMBER; // whatsapp:+15558390419

const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      migrantPhone, 
      familyPhone, 
      migrantCode, 
      familyCode, 
      migrantName,
      familyName 
    } = req.body;

    console.log('📱 Enviando códigos por WhatsApp...');
    console.log('Migrante:', migrantPhone, migrantCode);
    console.log('Familiar:', familyPhone, familyCode);

    let migrantSid = null;
    let familySid = null;

    // Enviar código al migrante
    if (migrantPhone && migrantCode) {
      const migrantMessage = await client.messages.create({
        from: whatsappFrom,
        to: `whatsapp:${migrantPhone}`,
        body: `🎉 ¡Bienvenido a SaludCompartida, ${migrantName || 'Usuario'}!

Tu código de acceso es: *${migrantCode}*

Ingresa en: https://saludcompartida.app/registro

Con este código podrás:
✅ Acceder a telemedicina 24/7
✅ Gestionar la salud de tu ser querido en México
✅ Ahorrar en medicamentos

¡Gracias por cuidar la salud de tu familia! 💙`
      });

      migrantSid = migrantMessage.sid;
      console.log('✅ WhatsApp enviado al migrante:', migrantSid);
    }

    // Enviar código al familiar en México
    if (familyPhone && familyCode) {
      const familyMessage = await client.messages.create({
        from: whatsappFrom,
        to: `whatsapp:${familyPhone}`,
        body: `🎉 ¡Hola ${familyName || 'Usuario'}!

${migrantName || 'Tu familiar'} te ha inscrito en SaludCompartida.

Tu código de acceso es: *${familyCode}*

Ingresa en: https://saludcompartida.app/registro

Ahora tienes acceso a:
✅ Telemedicina 24/7
✅ Descuentos en farmacias
✅ Terapia psicológica

¡Tu familia está cuidando de tu salud! 💙`
      });

      familySid = familyMessage.sid;
      console.log('✅ WhatsApp enviado al familiar:', familySid);
    }

    return res.status(200).json({ 
      success: true,
      message: 'Códigos enviados por WhatsApp',
      migrantSid: migrantSid,
      familySid: familySid
    });

  } catch (error) {
    console.error('❌ Error enviando WhatsApp:', error);
    return res.status(500).json({ 
      error: 'Error al enviar WhatsApp',
      details: error.message 
    });
  }
}
