/**
 * API Endpoint: Enviar reporte acumulado de suscripciones
 * Se puede ejecutar manualmente o programarse para envíos periódicos
 * Genera un reporte con TODAS las suscripciones activas del período
 */

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Aceptar GET para consultas manuales o POST para automático
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    // Parámetros opcionales para filtrar por fecha
    const { 
      startDate, 
      endDate,
      sendEmail = true 
    } = req.method === 'GET' ? req.query : req.body;

    // Por defecto: últimos 30 días
    const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const end = endDate || new Date().toISOString();

    // Consultar todas las suscripciones del período
    const { data: registrations, error } = await supabase
      .from('registrations')
      .select('*')
      .gte('created_at', start)
      .lte('created_at', end)
      .eq('payment_method', 'Square') // Solo pagos exitosos
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error consultando Supabase:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Error consultando base de datos',
        details: error.message 
      });
    }

    if (!registrations || registrations.length === 0) {
      return res.status(200).json({ 
        success: true, 
        message: 'No hay registros en el período especificado',
        count: 0,
        startDate: start,
        endDate: end
      });
    }

    console.log(`📊 Encontradas ${registrations.length} suscripciones activas`);

    // Formatear datos para el reporte
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

    const formatearFechaCorta = (fecha) => {
      if (!fecha) return 'N/A';
      try {
        const date = new Date(fecha);
        return date.toLocaleDateString('es-MX', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
      } catch (e) {
        return 'N/A';
      }
    };

    // Generar filas de la tabla HTML
    const generarFilasTabla = () => {
      return registrations.map((reg, index) => `
        <tr style="border-bottom: 1px solid #e5e7eb; ${index % 2 === 0 ? 'background-color: #f9fafb;' : ''}">
          <td style="padding: 12px 8px; text-align: center; color: #6b7280; font-size: 14px;">
            ${index + 1}
          </td>
          <td style="padding: 12px 8px; color: #111827; font-size: 14px; font-weight: 500;">
            ${reg.migrant_first_name || 'N/A'} ${reg.migrant_last_name || ''}
          </td>
          <td style="padding: 12px 8px; text-align: center; color: #111827; font-size: 14px;">
            ${reg.migrant_gender || 'N/A'}
          </td>
          <td style="padding: 12px 8px; text-align: center; color: #111827; font-size: 14px;">
            ${formatearFechaCorta(reg.migrant_birth_date)}
          </td>
          <td style="padding: 12px 8px; text-align: center; color: #059669; font-size: 14px; font-weight: 600;">
            ${formatearFechaCorta(reg.created_at)}
          </td>
          <td style="padding: 12px 8px; color: #111827; font-size: 13px;">
            ${reg.migrant_email || 'N/A'}
          </td>
          <td style="padding: 12px 8px; text-align: center; color: #111827; font-size: 14px;">
            ${reg.migrant_phone || 'N/A'}
          </td>
          <td style="padding: 12px 8px; text-align: center; color: #111827; font-size: 14px; font-weight: 600;">
            $${reg.amount || '12.00'}
          </td>
        </tr>
      `).join('');
    };

    // Calcular totales
    const totalUsuarios = registrations.length;
    const totalIngresos = registrations.reduce((sum, reg) => sum + (parseFloat(reg.amount) || 12.00), 0);

    // Construir email HTML
    const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reporte Acumulado - Salud Compartida</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
  <div style="max-width: 1200px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px;">
        📊 Reporte de Suscripciones Activas
      </h1>
      <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">
        Salud Compartida - Período: ${formatearFecha(start)} - ${formatearFecha(end)}
      </p>
    </div>

    <!-- Resumen Ejecutivo -->
    <div style="padding: 30px; background-color: #f9fafb;">
      <div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
        
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px; border-radius: 10px; min-width: 200px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 14px; opacity: 0.9;">Total Usuarios</p>
          <p style="margin: 10px 0 0 0; font-size: 36px; font-weight: bold;">${totalUsuarios}</p>
        </div>

        <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 20px; border-radius: 10px; min-width: 200px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 14px; opacity: 0.9;">Ingresos Totales</p>
          <p style="margin: 10px 0 0 0; font-size: 36px; font-weight: bold;">$${totalIngresos.toFixed(2)}</p>
          <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.8;">USD</p>
        </div>

      </div>
    </div>

    <!-- Tabla de Usuarios -->
    <div style="padding: 30px; overflow-x: auto;">
      <h2 style="color: #111827; font-size: 20px; margin-bottom: 20px;">
        👥 Listado Completo de Usuarios
      </h2>
      
      <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb;">
        <thead>
          <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            <th style="padding: 12px 8px; color: #ffffff; font-size: 14px; text-align: center;">#</th>
            <th style="padding: 12px 8px; color: #ffffff; font-size: 14px; text-align: left;">Nombre Completo</th>
            <th style="padding: 12px 8px; color: #ffffff; font-size: 14px; text-align: center;">Sexo</th>
            <th style="padding: 12px 8px; color: #ffffff; font-size: 14px; text-align: center;">Fecha Nacimiento</th>
            <th style="padding: 12px 8px; color: #ffffff; font-size: 14px; text-align: center;">Fecha Activación</th>
            <th style="padding: 12px 8px; color: #ffffff; font-size: 14px; text-align: left;">Email</th>
            <th style="padding: 12px 8px; color: #ffffff; font-size: 14px; text-align: center;">Teléfono</th>
            <th style="padding: 12px 8px; color: #ffffff; font-size: 14px; text-align: center;">Monto</th>
          </tr>
        </thead>
        <tbody>
          ${generarFilasTabla()}
        </tbody>
      </table>
    </div>

    <!-- Nota para Proveedor -->
    <div style="padding: 30px; background-color: #fffbeb; border-top: 3px solid #f59e0b;">
      <h3 style="color: #92400e; margin: 0 0 10px 0; font-size: 16px;">
        📋 Información para Proveedores
      </h3>
      <p style="color: #78350f; margin: 0; font-size: 14px; line-height: 1.6;">
        Este listado incluye todos los usuarios con suscripciones activas y pagos exitosos en México.
        Estos usuarios tienen acceso a servicios de <strong>telemedicina</strong> y <strong>descuentos en farmacia</strong>.
        Todos los pagos fueron procesados exitosamente a través de Square.
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 12px; margin: 0;">
        Reporte generado automáticamente el ${formatearFecha(new Date().toISOString())}
      </p>
      <p style="color: #6b7280; font-size: 12px; margin: 5px 0 0 0;">
        © ${new Date().getFullYear()} Salud Compartida - Sistema de Reportes
      </p>
    </div>

  </div>
</body>
</html>
    `;

    // Enviar email si está habilitado (a proveedores de asistencia)
    let emailResult = null;
    if (sendEmail === true || sendEmail === 'true') {
      emailResult = await resend.emails.send({
        from: 'Salud Compartida Reportes <noreply@saludcompartida.app>',
        to: ['stephania.cardenas@anevent.com.mx', 'stephania.cardenas@auramultiasistencias.com'],
        subject: `📊 Reporte Acumulado: ${totalUsuarios} Suscripciones Activas (${formatearFechaCorta(start)} - ${formatearFechaCorta(end)})`,
        html: htmlContent,
        reply_to: 'support@saludcompartida.app'
      });

      console.log('✅ Reporte acumulado enviado:', emailResult);
    }

    // Responder con datos
    return res.status(200).json({
      success: true,
      message: sendEmail ? 'Reporte generado y enviado correctamente' : 'Reporte generado (sin enviar email)',
      report: {
        startDate: start,
        endDate: end,
        totalUsuarios,
        totalIngresos: totalIngresos.toFixed(2),
        registrations: registrations.map(reg => ({
          id: reg.id,
          nombre: `${reg.migrant_first_name || ''} ${reg.migrant_last_name || ''}`.trim(),
          sexo: reg.migrant_gender,
          fechaNacimiento: reg.migrant_birth_date,
          fechaActivacion: reg.created_at,
          email: reg.migrant_email,
          telefono: reg.migrant_phone,
          monto: reg.amount
        }))
      },
      emailId: emailResult?.id
    });

  } catch (error) {
    console.error('❌ Error generando reporte acumulado:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
