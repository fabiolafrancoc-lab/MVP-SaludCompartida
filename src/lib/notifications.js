// lib/notifications.js - Helper para enviar notificaciones

/**
 * Envía un mensaje de WhatsApp usando la API de Twilio
 * ⚠️ TEMPORALMENTE DESHABILITADO - Esperando configuración de WhatsApp Business
 * @param {string} phoneNumber - Número de teléfono (10 dígitos sin +52)
 * @param {string} message - Mensaje a enviar
 * @returns {Promise<{success: boolean, messageSid?: string, error?: string}>}
 */
export async function sendWhatsAppMessage(phoneNumber, message) {
  // DESHABILITADO TEMPORALMENTE - Descomentar cuando WhatsApp Business esté configurado
  console.log('📱 WhatsApp deshabilitado temporalmente. Mensaje que se enviaría:', message.substring(0, 50) + '...');
  return {
    success: false,
    disabled: true,
    error: 'WhatsApp temporalmente deshabilitado - Esperando configuración de WhatsApp Business'
  };
  
  /* DESCOMENTAR CUANDO WHATSAPP BUSINESS ESTÉ LISTO:
  try {
    const response = await fetch('/api/send-whatsapp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: phoneNumber,
        message: message
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Error al enviar WhatsApp');
    }

    return data;
  } catch (error) {
    console.error('Error en sendWhatsAppMessage:', error);
    return {
      success: false,
      error: error.message
    };
  }
  */
}

/**
 * Envía un SMS usando la API de Twilio
 * ⚠️ TEMPORALMENTE DESHABILITADO - Esperando configuración de Twilio
 * @param {string} phoneNumber - Número de teléfono (10 dígitos sin +52)
 * @param {string} message - Mensaje a enviar
 * @returns {Promise<{success: boolean, messageSid?: string, error?: string}>}
 */
export async function sendSMS(phoneNumber, message) {
  // DESHABILITADO TEMPORALMENTE - Descomentar cuando Twilio esté completamente configurado
  console.log('📩 SMS deshabilitado temporalmente. Mensaje que se enviaría:', message.substring(0, 50) + '...');
  return {
    success: false,
    disabled: true,
    error: 'SMS temporalmente deshabilitado - Esperando configuración completa de Twilio'
  };
  
  /* DESCOMENTAR CUANDO TWILIO ESTÉ COMPLETAMENTE CONFIGURADO:
  try {
    const response = await fetch('/api/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: phoneNumber,
        message: message
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Error al enviar SMS');
    }

    return data;
  } catch (error) {
    console.error('Error en sendSMS:', error);
    return {
      success: false,
      error: error.message
    };
  }
  */
}

/**
 * Envía notificación de confirmación de cita (WhatsApp + SMS de respaldo)
 * ⚠️ Actualmente solo envía por email - WhatsApp/SMS deshabilitados temporalmente
 * @param {object} appointmentData - Datos de la cita
 */
export async function sendAppointmentConfirmation(appointmentData) {
  const { phone, firstName, date, time, type = 'telemedicina' } = appointmentData;
  
  const message = `
Hola ${firstName} 👋

Tu cita de ${type} ha sido confirmada exitosamente.

📅 Fecha: ${date}
⏰ Hora: ${time}

Te contactaremos 24 horas antes para:
• Confirmar tu asistencia
• Enviarte el link de videollamada

¿Necesitas reprogramar? Responde a este mensaje o llámanos al 55 2998 4922 702.

Gracias por confiar en SaludCompartida 💙
  `.trim();

  // Intentar WhatsApp primero (actualmente deshabilitado)
  const whatsappResult = await sendWhatsAppMessage(phone, message);
  
  if (whatsappResult.success) {
    console.log('✅ WhatsApp enviado exitosamente');
    return { success: true, method: 'whatsapp', ...whatsappResult };
  }

  // WhatsApp deshabilitado - retornar success con nota
  console.log('ℹ️ WhatsApp/SMS deshabilitados. Usar email para confirmaciones.');
  return { 
    success: true, 
    method: 'disabled',
    message: 'SMS/WhatsApp temporalmente deshabilitados. Usar email para confirmaciones.',
    disabled: true
  };
}

/**
 * Envía código de acceso al usuario
 * ⚠️ Actualmente solo funciona por email - WhatsApp/SMS deshabilitados temporalmente
 * @param {string} phone - Teléfono del usuario
 * @param {string} accessCode - Código de acceso generado
 * @param {string} firstName - Nombre del usuario
 */
export async function sendAccessCode(phone, accessCode, firstName) {
  const message = `
¡Bienvenido a SaludCompartida, ${firstName}! 🎉

Tu código de acceso es:

🔑 ${accessCode}

Ingresa con tu código en:
👉 saludcompartida.com/prototype

Guarda este código en un lugar seguro. Lo necesitarás para acceder a todos tus servicios de salud.

¿Dudas? Escríbenos a contact@saludcompartida.com

¡Estamos para cuidarte! 💙
  `.trim();

  // WhatsApp/SMS deshabilitados temporalmente
  console.log('ℹ️ Código de acceso:', accessCode, '- WhatsApp/SMS deshabilitados, enviar por email');
  
  return { 
    success: true, 
    method: 'disabled',
    message: 'SMS/WhatsApp temporalmente deshabilitados. Código enviado por email.',
    disabled: true
  };
}

/**
 * Envía recordatorio 24hrs antes de la cita
 * ⚠️ Actualmente deshabilitado - usar email para recordatorios
 */
export async function send24HourReminder(appointmentData) {
  const { phone, firstName, date, time, meetingLink } = appointmentData;
  
  const message = `
Hola ${firstName} 👋

¡Tu cita es mañana!

📅 ${date}
⏰ ${time}

🔗 Link de videollamada:
${meetingLink}

💡 Tip: Prueba tu conexión 10 minutos antes.

¿Necesitas reprogramar? Responde ahora o llámanos al 55 2998 4922 702.

Nos vemos pronto 💙
SaludCompartida
  `.trim();

  // WhatsApp/SMS deshabilitados temporalmente
  console.log('ℹ️ Recordatorio de cita - WhatsApp/SMS deshabilitados, enviar por email');
  
  return { 
    success: true, 
    method: 'disabled',
    message: 'SMS/WhatsApp temporalmente deshabilitados. Enviar recordatorio por email.',
    disabled: true
  };
}
