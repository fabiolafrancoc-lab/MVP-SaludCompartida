/**
 * API Endpoint: Notificar a administración sobre nueva reserva de terapia
 * Se ejecuta automáticamente cuando un usuario agenda una cita con psicólogo
 * 
 * Destinatarios:
 * - TO: administracion@auramultiasistencias.com
 * - CC: stephania.cardenas@anevent.com.mx, stephania.cardenas@auramultiasistencias.com
 */

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Use POST.' });
  }

  try {
    const {
      sessionFor,
      patientName,
      patientPhone,
      patientEmail,
      contactName,
      contactPhone,
      contactEmail,
      relationship,
      date,
      time,
      concerns,
      bookingId
    } = req.body;

    // Validaciones básicas
    if (!patientName || !date || !time) {
      return res.status(400).json({
        success: false,
        error: 'Faltan datos requeridos: patientName, date, time'
      });
    }

    // Formatear fecha
    const formatearFecha = (fechaStr) => {
      try {
        const fecha = new Date(fechaStr);
        return fecha.toLocaleDateString('es-MX', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      } catch (e) {
        return fechaStr;
      }
    };

    const fechaFormateada = formatearFecha(date);
    const esParaOtraPersona = sessionFor === 'other';

    // Construir el email HTML
    const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Reserva de Terapia</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
  <div style="max-width: 700px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 26px;">
        📅 Nueva Reserva de Terapia Psicológica
      </h1>
      <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 14px;">
        ${esParaOtraPersona ? '👥 Sesión para otra persona (familiar)' : '✅ Sesión para el usuario que agenda'}
      </p>
    </div>

    <!-- Tipo de Sesión -->
    ${esParaOtraPersona ? `
    <div style="padding: 20px 30px; background-color: #fef3c7; border-left: 4px solid #f59e0b;">
      <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 600;">
        ⚠️ Cita agendada por un familiar para otra persona
      </p>
    </div>
    ` : ''}

    <!-- Información del Paciente -->
    <div style="padding: 30px;">
      <h2 style="color: #111827; font-size: 18px; margin: 0 0 20px 0; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
        👤 Información del Paciente (Asistirá a terapia)
      </h2>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; color: #6b7280; font-size: 14px; width: 40%;">
            <strong>Nombre Completo:</strong>
          </td>
          <td style="padding: 12px 0; color: #111827; font-size: 14px; font-weight: 600;">
            ${patientName}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">
            <strong>Teléfono:</strong>
          </td>
          <td style="padding: 12px 0; color: #111827; font-size: 14px;">
            ${patientPhone || 'No proporcionado'}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">
            <strong>Email:</strong>
          </td>
          <td style="padding: 12px 0; color: #111827; font-size: 14px;">
            ${patientEmail || 'No proporcionado'}
          </td>
        </tr>
        ${esParaOtraPersona && relationship ? `
        <tr>
          <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">
            <strong>Parentesco:</strong>
          </td>
          <td style="padding: 12px 0; color: #111827; font-size: 14px;">
            ${relationship}
          </td>
        </tr>
        ` : ''}
      </table>
    </div>

    ${esParaOtraPersona ? `
    <!-- Información del Contacto -->
    <div style="padding: 0 30px 30px 30px;">
      <h2 style="color: #111827; font-size: 18px; margin: 0 0 20px 0; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
        📞 Información de Contacto (Quien agenda)
      </h2>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; color: #6b7280; font-size: 14px; width: 40%;">
            <strong>Nombre:</strong>
          </td>
          <td style="padding: 12px 0; color: #111827; font-size: 14px;">
            ${contactName || 'No proporcionado'}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">
            <strong>Teléfono:</strong>
          </td>
          <td style="padding: 12px 0; color: #111827; font-size: 14px;">
            ${contactPhone || 'No proporcionado'}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">
            <strong>Email:</strong>
          </td>
          <td style="padding: 12px 0; color: #111827; font-size: 14px;">
            ${contactEmail || 'No proporcionado'}
          </td>
        </tr>
      </table>
    </div>
    ` : ''}

    <!-- Detalles de la Sesión -->
    <div style="padding: 0 30px 30px 30px;">
      <h2 style="color: #111827; font-size: 18px; margin: 0 0 20px 0; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
        🕐 Detalles de la Sesión
      </h2>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; color: #6b7280; font-size: 14px; width: 40%;">
            <strong>Fecha:</strong>
          </td>
          <td style="padding: 12px 0; color: #059669; font-size: 15px; font-weight: 700;">
            ${fechaFormateada}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">
            <strong>Hora:</strong>
          </td>
          <td style="padding: 12px 0; color: #059669; font-size: 15px; font-weight: 700;">
            ${time} hrs
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">
            <strong>Tipo de sesión:</strong>
          </td>
          <td style="padding: 12px 0; color: #111827; font-size: 14px;">
            Sesión Individual
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">
            <strong>Modalidad:</strong>
          </td>
          <td style="padding: 12px 0; color: #111827; font-size: 14px;">
            Videollamada
          </td>
        </tr>
      </table>
    </div>

    ${concerns ? `
    <!-- Motivos de Consulta -->
    <div style="padding: 0 30px 30px 30px;">
      <h2 style="color: #111827; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">
        💭 Motivos de Consulta
      </h2>
      <div style="background-color: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
        <p style="margin: 0; color: #7f1d1d; font-size: 14px; line-height: 1.6;">
          ${concerns}
        </p>
      </div>
    </div>
    ` : ''}

    <!-- Acción Requerida -->
    <div style="padding: 20px 30px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-top: 3px solid #f59e0b;">
      <h3 style="color: #92400e; margin: 0 0 10px 0; font-size: 16px;">
        ⚠️ Acción Requerida
      </h3>
      <p style="color: #78350f; margin: 0; font-size: 14px; line-height: 1.6;">
        <strong>IMPORTANTE:</strong> Contactar ${esParaOtraPersona ? 'ambos números (paciente y contacto)' : 'al paciente'} <strong>24 horas antes</strong> para:
      </p>
      <ul style="color: #78350f; margin: 10px 0 0 0; padding-left: 20px; font-size: 14px;">
        <li>Confirmar asistencia a la sesión</li>
        <li>Enviar link de videollamada</li>
        <li>Verificar disponibilidad técnica (cámara, micrófono, internet)</li>
      </ul>
    </div>

    ${bookingId ? `
    <!-- ID de Reserva -->
    <div style="padding: 20px 30px; background-color: #f9fafb; text-align: center;">
      <p style="color: #6b7280; font-size: 12px; margin: 0;">
        ID de Reserva: <strong style="color: #111827;">#${bookingId}</strong>
      </p>
    </div>
    ` : ''}

    <!-- Footer -->
    <div style="background-color: #111827; padding: 20px; text-align: center;">
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
        Notificación automática del sistema de reservas
      </p>
      <p style="color: #9ca3af; font-size: 12px; margin: 5px 0 0 0;">
        © ${new Date().getFullYear()} Salud Compartida - Asistencia Psicológica
      </p>
    </div>

  </div>
</body>
</html>
    `;

    // Enviar email con Resend
    const emailData = await resend.emails.send({
      from: 'Salud Compartida - Reservas <noreply@saludcompartida.app>',
      to: ['administracion@auramultiasistencias.com'],
      cc: ['stephania.cardenas@anevent.com.mx', 'stephania.cardenas@auramultiasistencias.com'],
      subject: `📅 Nueva Reserva de Terapia: ${patientName} - ${fechaFormateada} a las ${time}`,
      html: htmlContent,
      reply_to: patientEmail || 'support@saludcompartida.app'
    });

    console.log('✅ Notificación de reserva de terapia enviada:', emailData.id);

    return res.status(200).json({
      success: true,
      message: 'Notificación enviada correctamente a administración',
      emailId: emailData.id,
      recipients: {
        to: 'administracion@auramultiasistencias.com',
        cc: ['stephania.cardenas@anevent.com.mx', 'stephania.cardenas@auramultiasistencias.com']
      }
    });

  } catch (error) {
    console.error('❌ Error enviando notificación de reserva de terapia:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
