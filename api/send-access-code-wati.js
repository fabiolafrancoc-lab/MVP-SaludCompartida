/**
 * SEND ACCESS CODES - WATI Integration
 * 
 * Envía códigos de acceso por WhatsApp después del registro
 * Usa WATI.io en lugar de Twilio
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      phone, 
      accessCode, 
      userName, 
      countryCode = '+52',
      userType = 'family' // 'migrant' o 'family'
    } = req.body;

    if (!phone || !accessCode || !userName) {
      return res.status(400).json({ 
        error: 'Missing required fields: phone, accessCode, userName' 
      });
    }

    // Formatear número (WATI acepta con o sin +)
    let formattedPhone = phone.replace(/\D/g, ''); // Remover no-numéricos
    
    if (!formattedPhone.startsWith('+')) {
      // Agregar código de país si no está
      const prefix = countryCode.startsWith('+') ? countryCode : `+${countryCode}`;
      formattedPhone = `${prefix}${formattedPhone}`;
    }

    console.log(`📱 Enviando código de acceso por WhatsApp a: ${formattedPhone}`);

    // Construir mensaje personalizado
    const message = `¡Hola ${userName}! 🎉

Bienvenido/a a *Salud Compartida*.

🔑 *Tu código de acceso:* ${accessCode}

*¿Cómo usar tu código?*
1️⃣ Guarda este código en un lugar seguro
2️⃣ Úsalo cuando necesites atención médica
3️⃣ Proporciona el código al doctor cuando llames

*Servicios disponibles:*
🏥 Telemedicina 24/7
💊 Descuentos en farmacias
🧠 Terapia psicológica
🩺 Atención médica inmediata

¿Tienes dudas? Responde a este mensaje y te ayudamos.

¡Gracias por confiar en nosotros! 💚

_Equipo Salud Compartida_`;

    // Enviar a través de WATI
    const watiResponse = await fetch(`${process.env.NEXT_PUBLIC_URL || 'https://saludcompartida.app'}/api/send-whatsapp-wati`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone: formattedPhone,
        message: message
      })
    });

    const watiData = await watiResponse.json();

    if (!watiResponse.ok) {
      console.error('❌ Error enviando WhatsApp:', watiData.error);
      
      // Si falla WhatsApp, registrar pero no fallar la operación
      return res.status(200).json({
        success: false,
        whatsapp_sent: false,
        error: watiData.error,
        message: 'WhatsApp no pudo ser enviado, pero el registro fue exitoso'
      });
    }

    console.log('✅ WhatsApp enviado exitosamente via WATI');

    return res.status(200).json({
      success: true,
      whatsapp_sent: true,
      messageId: watiData.messageId,
      provider: 'WATI',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error en send-access-code:', error);
    
    // No fallar el registro completo si falla el WhatsApp
    return res.status(200).json({
      success: false,
      whatsapp_sent: false,
      error: error.message,
      message: 'WhatsApp no pudo ser enviado, pero el registro fue exitoso'
    });
  }
}
