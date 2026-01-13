// Enviar mensajes de WhatsApp usando Meta Business API
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, templateName, components } = req.body;

    // Validar datos
    if (!to || !templateName) {
      return res.status(400).json({ 
        error: 'Faltan datos requeridos: to, templateName' 
      });
    }

    // Credenciales de Meta WhatsApp Business API
    const accessToken = process.env.META_WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = process.env.META_WHATSAPP_PHONE_NUMBER_ID;

    if (!accessToken || !phoneNumberId) {
      console.error('❌ Faltan credenciales de Meta WhatsApp en variables de entorno');
      return res.status(500).json({ 
        error: 'Configuración de WhatsApp incompleta',
        missingVars: {
          accessToken: !accessToken,
          phoneNumberId: !phoneNumberId
        }
      });
    }

    // Formatear número (quitar espacios, guiones, etc)
    const cleanNumber = to.replace(/\D/g, '');
    
    // Construir payload para Meta API
    const payload = {
      messaging_product: 'whatsapp',
      to: cleanNumber,
      type: 'template',
      template: {
        name: templateName,
        language: {
          code: 'es' // Español
        },
        components: components || []
      }
    };

    console.log('📱 Enviando WhatsApp via Meta API...');
    console.log('To:', cleanNumber);
    console.log('Template:', templateName);

    // Enviar mensaje a Meta WhatsApp API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Error de Meta API:', data);
      return res.status(response.status).json({
        success: false,
        error: data.error?.message || 'Error al enviar WhatsApp',
        details: data
      });
    }

    console.log('✅ WhatsApp enviado:', data.messages?.[0]?.id);

    return res.status(200).json({
      success: true,
      messageId: data.messages?.[0]?.id,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error enviando WhatsApp:', error);
    
    return res.status(500).json({
      success: false,
      error: error.message || 'Error al enviar mensaje de WhatsApp'
    });
  }
}
