import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@saludcompartida.app';
const AURA_EMAILS = [
  'contact@saludcompartida.app',
  'stephania.cardenas@anevent.com.mx',
  'stephania.cardenas@auramultiasistencias.com'
];
const THERAPY_EMAILS = [
  'contact@saludcompartida.app',
  'stephania.cardenas@auramultiasistencias.com',
  'administracion@auramultiasistencias.com'
];

// ============================================
// 1️⃣ EMAIL AL MIGRANTE: Suscripción Exitosa
// ============================================
export async function sendMigrantWelcomeEmail(data: {
  migrantName: string;
  migrantEmail: string;
  codigoFamilia: string;
  planName: string;
  planPrice: number;
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.migrantEmail,
      subject: '🎉 ¡Bienvenido a SaludCompartida!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #06B6D4 0%, #EC4899 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .credentials-box { background: white; border-left: 4px solid #06B6D4; padding: 20px; margin: 20px 0; border-radius: 5px; }
            .button { display: inline-block; background: #06B6D4; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>¡Suscripción Exitosa! 🎉</h1>
              <p>Tu familia en México ya puede acceder a servicios de salud</p>
            </div>
            <div class="content">
              <p>Hola <strong>${data.migrantName}</strong>,</p>
              
              <p>¡Gracias por confiar en SaludCompartida! Tu suscripción ha sido procesada exitosamente.</p>
              
              <div class="credentials-box">
                <h3>📋 Tus Credenciales</h3>
                <p><strong>Código de Familia:</strong> <span style="font-size: 24px; color: #06B6D4; font-weight: bold;">${data.codigoFamilia}</span></p>
                <p><strong>Plan:</strong> ${data.planName} - $${data.planPrice}/mes</p>
                <p><strong>Email:</strong> ${data.migrantEmail}</p>
              </div>
              
              <p><strong>⚠️ IMPORTANTE:</strong> Comparte el <strong>Código de Familia</strong> con tus familiares en México para que puedan acceder a los servicios.</p>
              
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">Acceder al Dashboard</a>
              
              <h3>🏥 Servicios Disponibles:</h3>
              <ul>
                <li>✅ Telemedicina 24/7 ilimitada</li>
                <li>✅ Descuentos en farmacias</li>
                <li>✅ Terapia psicológica</li>
                <li>✅ Consultas con especialistas</li>
              </ul>
              
              <p>Si tienes preguntas, contáctanos en <a href="mailto:soporte@saludcompartida.app">soporte@saludcompartida.app</a></p>
              
              <div class="footer">
                <p>SaludCompartida - Cuidamos de tu familia, estés donde estés</p>
                <p>© 2026 SaludCompartida. Todos los derechos reservados.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending migrant welcome email:', error);
    return { success: false, error };
  }
}

// ============================================
// 2️⃣ EMAIL AL USUARIO (México): Notificación por WhatsApp
// ============================================
// NOTA: Los usuarios en México NO tienen email
// Se les notifica por WhatsApp con los siguientes datos:
// - Nombre completo del migrante
// - Apellido paterno del migrante
// - Fecha de nacimiento del usuario
// - Fecha y hora de activación de suscripción
// - Código de familia
// - Número de celular del usuario

export async function sendFamilyMemberWhatsAppData(data: {
  userName: string;
  userLastName: string;
  userBirthDate: string;
  userPhone: string;
  migrantName: string;
  migrantLastName: string;
  codigoFamilia: string;
  activationDate: string;
  activationTime: string;
}) {
  // Este método prepara los datos para WhatsApp
  // El envío real se hace desde WATI
  console.log('📱 Datos preparados para WhatsApp al usuario:', {
    usuario: `${data.userName} ${data.userLastName}`,
    fechaNacimiento: data.userBirthDate,
    telefono: data.userPhone,
    migrante: `${data.migrantName} ${data.migrantLastName}`,
    codigoFamilia: data.codigoFamilia,
    activacion: `${data.activationDate} ${data.activationTime}`
  });
  
  return { 
    success: true, 
    method: 'whatsapp',
    message: `Hola ${data.userName},\n\n` +
      `${data.migrantName} ${data.migrantLastName} se suscribió a SaludCompartida para que tú y tu familia tengan acceso a servicios de salud.\n\n` +
      `📋 Tu información:\n` +
      `• Nombre: ${data.userName} ${data.userLastName}\n` +
      `• Fecha de nacimiento: ${data.userBirthDate}\n` +
      `• Código de Familia: ${data.codigoFamilia}\n` +
      `• Tu número: ${data.userPhone}\n\n` +
      `🎉 Suscripción activada el ${data.activationDate} a las ${data.activationTime}\n\n` +
      `Ya puedes acceder a:\n` +
      `✅ Telemedicina 24/7\n` +
      `✅ Descuentos en farmacias\n` +
      `✅ Terapia psicológica\n` +
      `✅ Consultas con especialistas\n\n` +
      `¡Bienvenido a SaludCompartida!`
  };
}

// ============================================
// 3️⃣ EMAIL A AURA: Notificación Inmediata
// ============================================
export async function sendAuraImmediateNotification(data: {
  migrantName: string;
  migrantLastName: string;
  migrantEmail: string;
  migrantPhone: string;
  migrantState?: string; // ✅ OPCIONAL - No requerido
  principalName: string;
  principalLastName: string;
  principalBirthDate: string;
  principalPhone: string;
  codigoFamilia: string;
  planName: string;
  planPrice: number;
  familyMembersCount: number;
  activationDate: string;
  activationTime: string;
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: AURA_EMAILS,
      subject: `🆕 Nueva Suscripción - ${data.codigoFamilia}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 700px; margin: 0 auto; padding: 20px; }
            .header { background: #1F2937; color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; background: white; }
            th { background: #06B6D4; color: white; padding: 12px; text-align: left; }
            td { padding: 12px; border-bottom: 1px solid #ddd; }
            .alert { background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0; }
            .highlight { background: #E0F7FA; border-left: 4px solid #06B6D4; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🆕 Nueva Suscripción Registrada</h2>
              <p style="margin: 0;">Código: <strong>${data.codigoFamilia}</strong></p>
            </div>
            <div class="content">
              <div class="alert">
                <strong>⚡ NOTIFICACIÓN INMEDIATA</strong><br>
                Esta suscripción acaba de ser procesada.
              </div>
              
              <div class="highlight">
                <strong>🎉 Activación de Suscripción:</strong><br>
                Fecha: <strong>${data.activationDate}</strong><br>
                Hora: <strong>${data.activationTime}</strong>
              </div>
              
              <h3>👤 Datos del Migrante (USA)</h3>
              <table>
                <tr><th>Campo</th><th>Valor</th></tr>
                <tr><td>Nombre</td><td><strong>${data.migrantName}</strong></td></tr>
                <tr><td>Apellido Paterno</td><td><strong>${data.migrantLastName}</strong></td></tr>
                <tr><td>Email</td><td>${data.migrantEmail}</td></tr>
                <tr><td>Teléfono</td><td>${data.migrantPhone}</td></tr>
                ${data.migrantState ? `<tr><td>Estado (USA)</td><td>${data.migrantState}</td></tr>` : ''}
              </table>
              
              <h3>👨‍👩‍👧 Usuario Principal (México) - DATOS COMPLETOS</h3>
              <table>
                <tr><th>Campo</th><th>Valor</th></tr>
                <tr><td>Nombre</td><td><strong>${data.principalName}</strong></td></tr>
                <tr><td>Apellido Paterno</td><td><strong>${data.principalLastName}</strong></td></tr>
                <tr><td>Fecha de Nacimiento</td><td><strong>${data.principalBirthDate}</strong></td></tr>
                <tr><td>Teléfono/Celular</td><td><strong>${data.principalPhone}</strong></td></tr>
                <tr><td>Total Beneficiarios</td><td>${data.familyMembersCount} personas</td></tr>
              </table>
              
              <h3>💳 Plan Contratado</h3>
              <table>
                <tr><th>Campo</th><th>Valor</th></tr>
                <tr><td>Plan</td><td><strong>${data.planName}</strong></td></tr>
                <tr><td>Precio Mensual</td><td><strong>$${data.planPrice} USD</strong></td></tr>
                <tr><td>Código de Familia</td><td><strong style="color: #06B6D4; font-size: 18px;">${data.codigoFamilia}</strong></td></tr>
                <tr><td>Fecha de Activación</td><td><strong>${data.activationDate} ${data.activationTime}</strong></td></tr>
              </table>
              
              <p style="margin-top: 30px; font-size: 12px; color: #666;">
                Este email es automático. Recibirás un resumen diario a las 07:00 y 19:00 hrs.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending Aura immediate notification:', error);
    return { success: false, error };
  }
}

// ============================================
// 4️⃣ EMAIL A AURA: Resumen Diario
// ============================================
export async function sendAuraDailySummary(data: {
  totalSubscribers: number;
  newToday: number;
  activeSubscriptions: number;
  recentSubscriptions: Array<{
    codigoFamilia: string;
    migrantName: string;
    principalName: string;
    principalPhone: string;
    planName: string;
    createdAt: string;
  }>;
}) {
  try {
    const now = new Date();
    const hour = now.getHours();
    const timeLabel = hour === 7 ? '07:00 hrs' : '19:00 hrs';
    
    await resend.emails.send({
      from: FROM_EMAIL,
      to: AURA_EMAILS,
      subject: `📊 Resumen Diario SaludCompartida - ${timeLabel}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 700px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1F2937 0%, #06B6D4 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .stats { display: flex; justify-content: space-around; margin: 30px 0; }
            .stat-card { background: white; padding: 20px; border-radius: 10px; text-align: center; flex: 1; margin: 0 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            .stat-number { font-size: 48px; font-weight: bold; color: #06B6D4; }
            .stat-label { color: #666; margin-top: 10px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; background: white; }
            th { background: #1F2937; color: white; padding: 12px; text-align: left; }
            td { padding: 12px; border-bottom: 1px solid #ddd; }
            .footer { text-align: center; margin-top: 30px; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📊 Resumen Diario</h1>
              <p>${new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p style="font-size: 18px; margin: 0;">${timeLabel}</p>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <div class="stats">
                <div class="stat-card">
                  <div class="stat-number">${data.totalSubscribers}</div>
                  <div class="stat-label">Total Suscriptores</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number" style="color: #22c55e;">${data.newToday}</div>
                  <div class="stat-label">Nuevos Hoy</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number" style="color: #EC4899;">${data.activeSubscriptions}</div>
                  <div class="stat-label">Activos</div>
                </div>
              </div>
              
              ${data.recentSubscriptions.length > 0 ? `
                <h3>📋 Suscripciones Recientes (Últimas 24h)</h3>
                <table>
                  <tr>
                    <th>Código</th>
                    <th>Migrante</th>
                    <th>Beneficiario</th>
                    <th>Teléfono</th>
                    <th>Plan</th>
                  </tr>
                  ${data.recentSubscriptions.map(sub => `
                    <tr>
                      <td><strong>${sub.codigoFamilia}</strong></td>
                      <td>${sub.migrantName}</td>
                      <td>${sub.principalName}</td>
                      <td>${sub.principalPhone}</td>
                      <td>${sub.planName}</td>
                    </tr>
                  `).join('')}
                </table>
              ` : `
                <p style="text-align: center; padding: 40px; background: white; border-radius: 10px;">
                  No hay nuevas suscripciones en las últimas 24 horas.
                </p>
              `}
              
              <div class="footer">
                <p><strong>SaludCompartida</strong></p>
                <p>Este reporte se genera automáticamente a las 07:00 y 19:00 hrs, todos los días.</p>
                <p>© 2026 SaludCompartida. Todos los derechos reservados.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending Aura daily summary:', error);
    return { success: false, error };
  }
}

// ============================================
// 5️⃣ EMAIL A AURA: Sesión de Terapia Agendada
// ============================================
export async function sendTherapySessionNotification(data: {
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  codigoFamilia: string;
  sessionDate: string;
  sessionTime: string;
  therapyType: string;
}) {
  try {
    // Formatear la fecha para mostrarla más legible
    const formattedDate = new Date(data.sessionDate).toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    await resend.emails.send({
      from: FROM_EMAIL,
      to: THERAPY_EMAILS,
      subject: `🧠 Nueva Sesión de Terapia Agendada - ${data.codigoFamilia}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #EC4899; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .alert { background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0; border-radius: 5px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; background: white; }
            th { background: #EC4899; color: white; padding: 12px; text-align: left; }
            td { padding: 12px; border-bottom: 1px solid #ddd; }
            .highlight { background: #FEE2E2; padding: 15px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🧠 Nueva Sesión de Terapia</h2>
              <p style="margin: 0; font-size: 18px;">⏰ Acción Requerida</p>
            </div>
            <div class="content">
              <div class="alert">
                <strong>⚡ NOTIFICACIÓN INMEDIATA</strong><br>
                Un usuario ha agendado una sesión de terapia psicológica.
              </div>
              
              <h3>📋 Detalles de la Sesión</h3>
              <table>
                <tr><th>Campo</th><th>Valor</th></tr>
                <tr><td><strong>👤 Nombre del Paciente</strong></td><td><strong style="font-size: 16px; color: #EC4899;">${data.patientName}</strong></td></tr>
                <tr><td><strong>📱 Teléfono Móvil</strong></td><td><strong style="font-size: 16px;">${data.patientPhone}</strong></td></tr>
                <tr><td><strong>📧 Email</strong></td><td><strong style="font-size: 16px;">${data.patientEmail}</strong></td></tr>
                <tr><td><strong>📅 Fecha</strong></td><td><strong style="font-size: 16px; color: #059669;">${formattedDate}</strong></td></tr>
                <tr><td><strong>⏰ Hora</strong></td><td><strong style="font-size: 16px; color: #059669;">${data.sessionTime}</strong></td></tr>
                <tr><td>🔑 Código Familia</td><td>${data.codigoFamilia}</td></tr>
                <tr><td>🧠 Tipo de Terapia</td><td>${data.therapyType}</td></tr>
              </table>
              
              <div class="highlight">
                <p><strong>📞 Acción Requerida:</strong></p>
                <ol style="margin: 10px 0 0 0; padding-left: 20px;">
                  <li>Confirmar disponibilidad del terapeuta</li>
                  <li>Contactar al paciente:
                    <ul>
                      <li>📱 Teléfono: <strong>${data.patientPhone}</strong></li>
                      <li>📧 Email: <strong>${data.patientEmail}</strong></li>
                    </ul>
                  </li>
                  <li>Enviar link de la sesión virtual</li>
                  <li>Confirmar la cita 24 horas antes</li>
                </ol>
              </div>
              
              <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center;">
                <strong>SaludCompartida</strong><br>
                Este email es automático. Responda para coordinar los detalles.<br>
                © 2026 SaludCompartida. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending therapy session notification:', error);
    return { success: false, error };
  }
}
