// Funciones para enviar WhatsApp vía WATI

export interface WhatsAppData {
  migrant_first_name: string;
  family_first_name: string;
  family_code: string;
  family_companion_assigned: 'lupita' | 'fernanda';
  phone_number: string;      // Número para llamar a compañera (ej: "+52 55 9990 6900")
  migrant_phone: string;      // +1XXXXXXXXXX
  family_phone: string;       // +52XXXXXXXXXX
}

/**
 * Envía WhatsApp de bienvenida al migrante en USA
 */
export async function sendWhatsAppMigrante(data: WhatsAppData) {
  const companionName = data.family_companion_assigned === 'lupita' ? 'Lupita' : 'Fernanda';
  
  try {
    const response = await fetch(
      `${process.env.WATI_API_URL}/api/v1/sendTemplateMessage`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.WATI_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          whatsappNumber: data.migrant_phone,
          template_name: 'bienvenida_migrante',
          broadcast_name: 'Post-Pago Migrante',
          parameters: [
            { name: '1', value: data.migrant_first_name },
            { name: '2', value: data.family_first_name },
            { name: '3', value: companionName },
            { name: '4', value: data.family_code },
            { name: '5', value: data.phone_number },
          ]
        })
      }
    );

    const result = await response.json();
    
    if (!response.ok) {
      console.error('❌ Error enviando WhatsApp migrante:', result);
      return { success: false, error: result };
    }

    console.log('✅ WhatsApp enviado a migrante:', data.migrant_phone);
    return { success: true, data: result };
    
  } catch (error: any) {
    console.error('❌ Error en sendWhatsAppMigrante:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Envía WhatsApp de bienvenida al usuario en México
 */
export async function sendWhatsAppUsuarioMexico(data: WhatsAppData) {
  const companionName = data.family_companion_assigned === 'lupita' ? 'Lupita' : 'Fernanda';
  
  try {
    const response = await fetch(
      `${process.env.WATI_API_URL}/api/v1/sendTemplateMessage`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.WATI_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          whatsappNumber: data.family_phone,
          template_name: 'bienvenida_usuario_mexico',
          broadcast_name: 'Post-Pago Usuario México',
          parameters: [
            { name: '1', value: data.family_first_name },
            { name: '2', value: data.migrant_first_name },
            { name: '3', value: companionName },
            { name: '4', value: data.family_code },
            { name: '5', value: data.phone_number },
          ]
        })
      }
    );

    const result = await response.json();
    
    if (!response.ok) {
      console.error('❌ Error enviando WhatsApp usuario:', result);
      return { success: false, error: result };
    }

    console.log('✅ WhatsApp enviado a usuario México:', data.family_phone);
    return { success: true, data: result };
    
  } catch (error: any) {
    console.error('❌ Error en sendWhatsAppUsuarioMexico:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Envía ambos WhatsApp (migrante + usuario México)
 */
export async function sendPostPaymentWhatsApp(data: WhatsAppData) {
  console.log('📱 Enviando WhatsApp post-pago...');
  
  const results = {
    migrante: await sendWhatsAppMigrante(data),
    usuario: await sendWhatsAppUsuarioMexico(data),
  };

  console.log('📊 Resultados WhatsApp:', {
    migrante: results.migrante.success ? '✅' : '❌',
    usuario: results.usuario.success ? '✅' : '❌',
  });

  return results;
}
