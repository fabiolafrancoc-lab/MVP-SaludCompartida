// ============================================================================
// META WHATSAPP BUSINESS API - Envío de Templates
// ============================================================================
// Documentación: https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages
// Templates creados en: https://business.facebook.com/wa/manage/message-templates/
// ============================================================================

const META_API_VERSION = 'v21.0';
const META_GRAPH_API_URL = `https://graph.facebook.com/${META_API_VERSION}`;

interface WhatsAppTemplateParams {
  to: string;              // Número en formato E.164: "+1XXXXXXXXXX" o "+52XXXXXXXXXX"
  templateName: string;    // Nombre del template en Meta
  languageCode: string;    // "es_MX" o "en_US"
  components?: Array<{
    type: string;
    parameters: Array<{
      type: string;
      text: string;
    }>;
  }>;
}

/**
 * Envía un template de WhatsApp vía Meta Business API
 */
async function sendWhatsAppTemplate(params: WhatsAppTemplateParams) {
  const accessToken = process.env.META_WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.META_WHATSAPP_PHONE_NUMBER_ID;

  if (!accessToken || !phoneNumberId) {
    throw new Error('Meta WhatsApp credentials not configured. Check META_WHATSAPP_ACCESS_TOKEN and META_WHATSAPP_PHONE_NUMBER_ID in .env');
  }

  const url = `${META_GRAPH_API_URL}/${phoneNumberId}/messages`;

  const payload = {
    messaging_product: 'whatsapp',
    to: params.to,
    type: 'template',
    template: {
      name: params.templateName,
      language: {
        code: params.languageCode
      },
      ...(params.components && { components: params.components })
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Meta WhatsApp API Error:', data);
      return { 
        success: false, 
        error: data.error?.message || 'Unknown error',
        details: data 
      };
    }

    console.log('✅ WhatsApp template sent:', params.templateName, 'to', params.to);
    return { success: true, data };

  } catch (error: any) {
    console.error('❌ Error sending WhatsApp template:', error);
    return { 
      success: false, 
      error: error.message,
      details: error 
    };
  }
}

// ============================================================================
// FUNCIONES ESPECÍFICAS POR TEMPLATE
// ============================================================================

/**
 * 1. Envía código de verificación al MIGRANTE (español)
 */
export async function sendMigrantCode(phone: string, code: string) {
  return await sendWhatsAppTemplate({
    to: phone,
    templateName: 'login_codigo_migrante_espanol',
    languageCode: 'es_MX',
    components: [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: code }  // {{1}} = migrant_code
        ]
      }
    ]
  });
}

/**
 * 2. Envía mensaje de bienvenida al MIGRANTE
 */
export async function sendMigrantWelcome(
  phone: string, 
  migrantName: string, 
  userName: string, 
  companionName: string
) {
  return await sendWhatsAppTemplate({
    to: phone,
    templateName: 'bienvenida_migrante_usa',
    languageCode: 'es_MX',
    components: [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: migrantName },    // {{migrant_name}}
          { type: 'text', text: userName },       // {{user_name}}
          { type: 'text', text: companionName }   // {{companion_name}}
        ]
      }
    ]
  });
}

/**
 * 3. Envía código de verificación al USUARIO México
 */
export async function sendUserCode(phone: string, code: string) {
  return await sendWhatsAppTemplate({
    to: phone,
    templateName: 'login_codigo_usuario',
    languageCode: 'es_MX',
    components: [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: code }  // {{1}} = family_code
        ]
      }
    ]
  });
}

/**
 * 4. Envía mensaje de bienvenida al USUARIO México
 */
export async function sendUserWelcome(
  phone: string,
  userName: string,
  migrantName: string,
  companionName: string
) {
  return await sendWhatsAppTemplate({
    to: phone,
    templateName: 'bienvenida_usuario_mex',
    languageCode: 'es_MX',
    components: [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: userName },       // {{user_name}}
          { type: 'text', text: migrantName },    // {{migrant_name}}
          { type: 'text', text: companionName }   // {{companion_name}}
        ]
      }
    ]
  });
}

/**
 * 5. Envía solicitud de permiso de llamada de la compañera al USUARIO
 */
export async function sendCompanionCallRequest(
  phone: string,
  userName: string,
  companionName: string,
  migrantName: string
) {
  return await sendWhatsAppTemplate({
    to: phone,
    templateName: 'solicitud_permiso_llamada_usuario_companion',
    languageCode: 'es_MX',
    components: [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: userName },       // {{user_name}}
          { type: 'text', text: companionName },  // {{companion_name}}
          { type: 'text', text: migrantName }     // {{migrant_name}}
        ]
      }
    ]
  });
}

// ============================================================================
// FUNCIÓN PRINCIPAL: Envía secuencia completa post-pago
// ============================================================================

export interface PostPaymentWhatsAppData {
  migrant_phone: string;      // +1XXXXXXXXXX
  migrant_first_name: string;
  migrant_code: string;
  
  family_phone: string;       // +52XXXXXXXXXX
  family_first_name: string;
  family_code: string;
  
  companion_name: string;     // "Lupita" o "Fernanda"
}

/**
 * Envía la secuencia completa de WhatsApp después del pago exitoso:
 * 
 * MIGRANTE (USA):
 *   1. Código de acceso
 *   2. Mensaje de bienvenida
 * 
 * USUARIO (México):
 *   1. Código de acceso
 *   2. Mensaje de bienvenida
 *   3. [FUTURO] Solicitud de permiso para llamada de compañera
 */
export async function sendPostPaymentWhatsApp(data: PostPaymentWhatsAppData) {
  console.log('📱 [META WHATSAPP] Iniciando secuencia post-pago...');
  console.log('📱 [META WHATSAPP] Migrante:', data.migrant_phone);
  console.log('📱 [META WHATSAPP] Usuario:', data.family_phone);
  console.log('📱 [META WHATSAPP] Compañera:', data.companion_name);

  const results = {
    migrant: {
      code: { success: false, data: null as any, error: null as any },
      welcome: { success: false, data: null as any, error: null as any }
    },
    user: {
      code: { success: false, data: null as any, error: null as any },
      welcome: { success: false, data: null as any, error: null as any }
    }
  };

  // =========================================================================
  // SECUENCIA MIGRANTE (USA)
  // =========================================================================
  
  try {
    // 1. Código de acceso
    console.log('📱 [META] → Enviando código al migrante...');
    results.migrant.code = await sendMigrantCode(data.migrant_phone, data.migrant_code);
    
    if (results.migrant.code.success) {
      console.log('✅ [META] Código enviado al migrante');
      
      // Delay de 2 segundos antes del mensaje de bienvenida
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 2. Mensaje de bienvenida
      console.log('📱 [META] → Enviando bienvenida al migrante...');
      results.migrant.welcome = await sendMigrantWelcome(
        data.migrant_phone,
        data.migrant_first_name,
        data.family_first_name,
        data.companion_name
      );
      
      if (results.migrant.welcome.success) {
        console.log('✅ [META] Bienvenida enviada al migrante');
      } else {
        console.error('❌ [META] Error enviando bienvenida al migrante:', results.migrant.welcome.error);
      }
    } else {
      console.error('❌ [META] Error enviando código al migrante:', results.migrant.code.error);
    }
  } catch (error) {
    console.error('❌ [META] Error en secuencia migrante:', error);
  }

  // =========================================================================
  // SECUENCIA USUARIO MÉXICO
  // =========================================================================
  
  try {
    // 1. Código de acceso
    console.log('📱 [META] → Enviando código al usuario México...');
    results.user.code = await sendUserCode(data.family_phone, data.family_code);
    
    if (results.user.code.success) {
      console.log('✅ [META] Código enviado al usuario');
      
      // Delay de 2 segundos antes del mensaje de bienvenida
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 2. Mensaje de bienvenida
      console.log('📱 [META] → Enviando bienvenida al usuario México...');
      results.user.welcome = await sendUserWelcome(
        data.family_phone,
        data.family_first_name,
        data.migrant_first_name,
        data.companion_name
      );
      
      if (results.user.welcome.success) {
        console.log('✅ [META] Bienvenida enviada al usuario');
      } else {
        console.error('❌ [META] Error enviando bienvenida al usuario:', results.user.welcome.error);
      }
    } else {
      console.error('❌ [META] Error enviando código al usuario:', results.user.code.error);
    }
  } catch (error) {
    console.error('❌ [META] Error en secuencia usuario:', error);
  }

  // =========================================================================
  // RESUMEN DE RESULTADOS
  // =========================================================================
  
  console.log('📊 [META WHATSAPP] Resumen de envíos:');
  console.log('   Migrante - Código:', results.migrant.code.success ? '✅' : '❌');
  console.log('   Migrante - Bienvenida:', results.migrant.welcome.success ? '✅' : '❌');
  console.log('   Usuario - Código:', results.user.code.success ? '✅' : '❌');
  console.log('   Usuario - Bienvenida:', results.user.welcome.success ? '✅' : '❌');

  return results;
}
