// Función principal para enviar notificaciones post-pago
import { Resend } from 'resend';
import { 
  emailMigranteTemplate, 
  emailUsuarioMexicoTemplate,
  type EmailData 
} from './email-templates';
import {
  sendPostPaymentWhatsApp,
  type WhatsAppData
} from './wati-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface PostPaymentData {
  registration_id: string;
  family_code: string;
  migrant_first_name: string;
  migrant_last_name: string;
  migrant_email: string;
  migrant_phone: string;        // +1XXXXXXXXXX
  family_first_name: string;
  family_last_name: string;
  family_email?: string;        // Opcional
  family_phone: string;         // +52XXXXXXXXXX
  family_companion_assigned: 'lupita' | 'fernanda';
}

/**
 * Envía todas las notificaciones post-pago:
 * - 2 Emails (Resend)
 * - 2 WhatsApp (WATI)
 */
export async function sendPostPaymentNotifications(data: PostPaymentData) {
  console.log('🚀 Iniciando envío de notificaciones post-pago...');
  console.log('📋 Registration ID:', data.registration_id);
  console.log('🔑 Family Code:', data.family_code);

  const results = {
    emailMigrante: { success: false, error: null as any },
    emailUsuario: { success: false, error: null as any },
    whatsappMigrante: { success: false, error: null as any },
    whatsappUsuario: { success: false, error: null as any },
  };

  // Determinar número de teléfono de la compañera
  const companionPhone = '+525599906900'; // TALYNX México

  // Preparar datos para emails
  const emailData: EmailData = {
    migrant_first_name: data.migrant_first_name,
    family_first_name: data.family_first_name,
    family_code: data.family_code,
    family_companion_assigned: data.family_companion_assigned,
    phone_number: companionPhone,
  };

  // Preparar datos para WhatsApp
  const whatsappData: WhatsAppData = {
    migrant_first_name: data.migrant_first_name,
    family_first_name: data.family_first_name,
    family_code: data.family_code,
    family_companion_assigned: data.family_companion_assigned,
    phone_number: companionPhone,
    migrant_phone: data.migrant_phone,
    family_phone: data.family_phone,
  };

  // 1️⃣ EMAIL AL MIGRANTE (USA)
  try {
    console.log('📧 Enviando email a migrante:', data.migrant_email);
    const migranteTemplate = emailMigranteTemplate(emailData);
    
    const emailResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'SaludCompartida <noreply@saludcompartida.app>',
      to: data.migrant_email,
      subject: migranteTemplate.subject,
      html: migranteTemplate.html,
      text: migranteTemplate.text,
    });

    results.emailMigrante = { success: true, error: null };
    console.log('✅ Email migrante enviado:', emailResult.id);
  } catch (error: any) {
    console.error('❌ Error email migrante:', error);
    results.emailMigrante = { success: false, error: error.message };
  }

  // 2️⃣ EMAIL AL USUARIO MÉXICO
  if (data.family_email) {
    try {
      console.log('📧 Enviando email a usuario México:', data.family_email);
      const usuarioTemplate = emailUsuarioMexicoTemplate(emailData);
      
      const emailResult = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'SaludCompartida <noreply@saludcompartida.app>',
        to: data.family_email,
        subject: usuarioTemplate.subject,
        html: usuarioTemplate.html,
        text: usuarioTemplate.text,
      });

      results.emailUsuario = { success: true, error: null };
      console.log('✅ Email usuario enviado:', emailResult.id);
    } catch (error: any) {
      console.error('❌ Error email usuario:', error);
      results.emailUsuario = { success: false, error: error.message };
    }
  } else {
    console.log('⚠️ Email de usuario México no proporcionado, solo enviará WhatsApp');
  }

  // 3️⃣ y 4️⃣ WHATSAPP (Ambos)
  try {
    console.log('📱 Enviando WhatsApp a ambos números...');
    const whatsappResults = await sendPostPaymentWhatsApp(whatsappData);
    
    results.whatsappMigrante = whatsappResults.migrante;
    results.whatsappUsuario = whatsappResults.usuario;
  } catch (error: any) {
    console.error('❌ Error enviando WhatsApp:', error);
    results.whatsappMigrante = { success: false, error: error.message };
    results.whatsappUsuario = { success: false, error: error.message };
  }

  // RESUMEN
  const summary = {
    total: 4,
    exitosos: Object.values(results).filter(r => r.success).length,
    fallidos: Object.values(results).filter(r => !r.success).length,
    details: results,
  };

  console.log('📊 Resumen notificaciones:', {
    '✅ Exitosos': summary.exitosos,
    '❌ Fallidos': summary.fallidos,
    'Email Migrante': results.emailMigrante.success ? '✅' : '❌',
    'Email Usuario': results.emailUsuario.success ? '✅' : '❌',
    'WhatsApp Migrante': results.whatsappMigrante.success ? '✅' : '❌',
    'WhatsApp Usuario': results.whatsappUsuario.success ? '✅' : '❌',
  });

  return summary;
}

/**
 * Función simplificada para llamar desde el webhook de Square
 */
export async function notifyPostPayment(registrationId: string, supabase: any) {
  try {
    // Obtener datos del registro desde Supabase
    const { data: registration, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('id', registrationId)
      .single();

    if (error || !registration) {
      throw new Error(`Registration not found: ${registrationId}`);
    }

    // Enviar notificaciones
    const results = await sendPostPaymentNotifications({
      registration_id: registration.id,
      family_code: registration.family_code,
      migrant_first_name: registration.migrant_first_name,
      migrant_last_name: registration.migrant_last_name,
      migrant_email: registration.migrant_email || '',
      migrant_phone: `${registration.migrant_country_code}${registration.migrant_phone}`,
      family_first_name: registration.family_first_name,
      family_last_name: registration.family_last_name,
      family_email: registration.family_email || undefined,
      family_phone: `${registration.family_country_code}${registration.family_phone}`,
      family_companion_assigned: registration.family_companion_assigned,
    });

    return { success: true, results };
  } catch (error: any) {
    console.error('❌ Error en notifyPostPayment:', error);
    return { success: false, error: error.message };
  }
}
