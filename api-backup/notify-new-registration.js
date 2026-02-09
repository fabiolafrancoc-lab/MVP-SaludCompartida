/**
 * API Endpoint: Notificar nueva suscripción pagada
 * Se ejecuta automáticamente después de un pago exitoso en Square
 * Envía email a fabiola.franco@bopidea.com con datos del usuario
 */

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { 
      registrationId,
      nombreCompleto,
      sexo,
      fechaNacimiento,
      fechaActivacion,
      email,
      telefono,
      planType,
      amount
    } = req.body;

    // Validar campos requeridos
    if (!registrationId || !nombreCompleto || !fechaActivacion) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos',
        required: ['registrationId', 'nombreCompleto', 'fechaActivacion']
      });
    }

    // Formatear fechas para presentación
    const formatearFecha = (fecha) => {
      if (!fecha) return 'No proporcionado';
      try {
        const date = new Date(fecha);
        return date.toLocaleDateString('es-MX', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'America/Mexico_City'
        });
      } catch (e) {
        return fecha;
      }
    };

    const fechaActivacionFormateada = formatearFecha(fechaActivacion);
    const fechaNacimientoFormateada = formatearFecha(fechaNacimiento);

    // Construir el email HTML
    const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Suscripción - Salud Compartida</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">
        🎉 Nueva Suscripción Activada
      </h1>
      <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 14px;">
        Salud Compartida - Usuario en México
      </p>
    </div>

    <!-- Body -->
    <div style="padding: 30px;">
      <p style="color: #333; font-size: 16px; margin-bottom: 20px;">
        Se ha registrado un nuevo usuario con pago exitoso:
      </p>

      <!-- Información del Usuario -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 0; color: #6b7280; font-weight: 600; width: 40%;">
            Nombre Completo:
          </td>
          <td style="padding: 12px 0; color: #111827; font-weight: 500;">
            ${nombreCompleto}
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 0; color: #6b7280; font-weight: 600;">
            Sexo:
          </td>
          <td style="padding: 12px 0; color: #111827;">
            ${sexo || 'No proporcionado'}
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 0; color: #6b7280; font-weight: 600;">
            Fecha de Nacimiento:
          </td>
          <td style="padding: 12px 0; color: #111827;">
            ${fechaNacimientoFormateada}
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 0; color: #6b7280; font-weight: 600;">
            📅 Fecha de Activación:
          </td>
          <td style="padding: 12px 0; color: #059669; font-weight: 600;">
            ${fechaActivacionFormateada}
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 0; color: #6b7280; font-weight: 600;">
            Email:
          </td>
          <td style="padding: 12px 0; color: #111827;">
            ${email || 'No proporcionado'}
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 0; color: #6b7280; font-weight: 600;">
            Teléfono:
          </td>
          <td style="padding: 12px 0; color: #111827;">
            ${telefono || 'No proporcionado'}
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 0; color: #6b7280; font-weight: 600;">
            Plan:
          </td>
          <td style="padding: 12px 0; color: #111827;">
            ${planType || 'mensual'}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #6b7280; font-weight: 600;">
            Monto:
          </td>
          <td style="padding: 12px 0; color: #111827; font-weight: 600;">
            $${amount || '12.00'} USD
          </td>
        </tr>
      </table>

      <!-- ID de Registro -->
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
          ID de Registro
        </p>
        <p style="margin: 5px 0 0 0; color: #111827; font-family: 'Courier New', monospace; font-size: 14px; font-weight: 600;">
          #${registrationId}
        </p>
      </div>

      <!-- Call to Action -->
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px; border-radius: 8px; text-align: center; margin-top: 30px;">
        <p style="color: #ffffff; margin: 0; font-size: 14px;">
          Esta información ha sido enviada automáticamente desde Salud Compartida
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 12px; margin: 0;">
        Este es un email automático. Por favor no responder.
      </p>
      <p style="color: #6b7280; font-size: 12px; margin: 5px 0 0 0;">
        © ${new Date().getFullYear()} Salud Compartida - Todos los derechos reservados
      </p>
    </div>

  </div>
</body>
</html>
    `;

    // Enviar email con Resend a proveedores de asistencia
    const data = await resend.emails.send({
      from: 'Salud Compartida <noreply@saludcompartida.app>',
      to: ['stephania.cardenas@anevent.com.mx', 'stephania.cardenas@auramultiasistencias.com'],
      subject: `✅ Nueva Suscripción: ${nombreCompleto} - ID #${registrationId}`,
      html: htmlContent,
      reply_to: 'support@saludcompartida.app'
    });

    console.log('✅ Email de notificación enviado:', data);

    return res.status(200).json({ 
      success: true, 
      message: 'Notificación enviada correctamente',
      emailId: data.id
    });

  } catch (error) {
    console.error('❌ Error enviando notificación:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
