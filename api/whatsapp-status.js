// Webhook para status callbacks de WhatsApp
// Twilio enviará aquí los updates de estado de los mensajes enviados
// Estados: queued, sent, delivered, read, failed, undelivered

export default async function handler(req, res) {
  // Solo aceptar POST de Twilio
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extraer datos del status callback
    const {
      MessageSid,      // ID del mensaje
      MessageStatus,   // Estado: queued, sent, delivered, read, failed, undelivered
      To,              // Número destino
      From,            // Tu número de WhatsApp Business
      ErrorCode,       // Código de error (si aplica)
      ErrorMessage,    // Mensaje de error (si aplica)
    } = req.body;

    console.log('📊 Status update de WhatsApp:', {
      messageSid: MessageSid,
      status: MessageStatus,
      to: To,
      from: From,
      errorCode: ErrorCode,
      errorMessage: ErrorMessage,
    });

    // Manejar diferentes estados
    switch (MessageStatus) {
      case 'sent':
        console.log(`✅ Mensaje ${MessageSid} enviado a ${To}`);
        break;
      
      case 'delivered':
        console.log(`✅ Mensaje ${MessageSid} entregado a ${To}`);
        break;
      
      case 'read':
        console.log(`👀 Mensaje ${MessageSid} leído por ${To}`);
        break;
      
      case 'failed':
      case 'undelivered':
        console.error(`❌ Mensaje ${MessageSid} falló:`, {
          errorCode: ErrorCode,
          errorMessage: ErrorMessage,
          to: To,
        });
        // Aquí puedes:
        // 1. Guardar el error en Supabase
        // 2. Enviar notificación a admin
        // 3. Intentar reenvío por email
        break;
      
      default:
        console.log(`📌 Estado desconocido: ${MessageStatus}`);
    }

    // Aquí puedes guardar el estado en Supabase:
    // - Actualizar tabla de mensajes
    // - Registrar entrega de códigos de acceso
    // - Marcar si el código fue leído

    res.status(200).json({ 
      success: true, 
      received: true,
      status: MessageStatus 
    });

  } catch (error) {
    console.error('❌ Error procesando status callback:', error);
    res.status(500).json({ 
      error: 'Error processing status callback',
      message: error.message 
    });
  }
}
