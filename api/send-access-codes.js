/**
 * API Endpoint para enviar códigos de acceso automáticamente
 * Se puede llamar desde un cron job o Vercel Cron
 * 
 * GET /api/send-access-codes
 */

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Use verified domain from env variable, fallback to .app (verified in Resend)
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@saludcompartida.app';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

// Validar variables de entorno
if (!SUPABASE_URL || !SUPABASE_KEY || !RESEND_API_KEY) {
  console.error('❌ Variables de entorno no configuradas');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const resend = new Resend(RESEND_API_KEY);

export default async function handler(req, res) {
  // Solo permitir GET y agregar seguridad con token
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Seguridad: Verificar token de autorización
  const authToken = req.headers.authorization?.replace('Bearer ', '');
  const expectedToken = process.env.CRON_SECRET || 'your-secret-token-here';
  
  if (authToken !== expectedToken) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  try {
    console.log('🚀 Iniciando envío automático de códigos...');

    // Calcular fecha de hace 3 días
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    threeDaysAgo.setHours(0, 0, 0, 0);
    
    const fourDaysAgo = new Date();
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);
    fourDaysAgo.setHours(0, 0, 0, 0);

    // Obtener usuarios registrados hace 3 días que no han recibido códigos
    const { data: users, error: fetchError } = await supabase
      .from('registrations')
      .select('*')
      .gte('created_at', fourDaysAgo.toISOString())
      .lt('created_at', threeDaysAgo.toISOString())
      .is('codes_sent', null);

    if (fetchError) {
      console.error('❌ Error obteniendo usuarios:', fetchError);
      return res.status(500).json({ error: 'Error obteniendo usuarios', details: fetchError });
    }

    if (!users || users.length === 0) {
      console.log('ℹ️  No hay usuarios elegibles hoy');
      return res.status(200).json({ 
        message: 'No hay usuarios elegibles para enviar códigos hoy',
        processed: 0
      });
    }

    console.log(`📧 Procesando ${users.length} registros...`);

    const results = {
      total: users.length,
      success: 0,
      errors: 0,
      details: []
    };

    // Procesar cada usuario
    for (const user of users) {
      try {
        // Email al migrante
        const migrantEmail = await resend.emails.send({
          from: `SaludCompartida <${FROM_EMAIL}>`,
          to: user.migrant_email,
          subject: '🎉 ¡Felicidades! Has sido seleccionado - SaludCompartida',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Hola ${user.migrant_first_name},</h2>
              
              <p>¡Excelentes noticias! Has sido seleccionado para participar en el programa piloto de SaludCompartida. 🎉</p>
              
              <p><strong>Tu familiar ${user.family_first_name} ${user.family_last_name} en México</strong> ahora tiene acceso a servicios de salud de alta calidad.</p>
              
              <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Tu código de acceso es:</h3>
                <p style="font-size: 24px; font-weight: bold; color: #0066cc; text-align: center;">${user.migrant_access_code}</p>
              </div>
              
              <h3>🔗 Activa tu cuenta ahora:</h3>
              <p><a href="https://prototype.saludcompartida.com" style="color: #0066cc;">👉 https://prototype.saludcompartida.com</a></p>
              
              <h3>Servicios disponibles para tu familiar en México:</h3>
              <ul>
                <li>✅ Telemedicina 24/7 - Doctor disponible cuando lo necesite</li>
                <li>✅ Descuentos de 40-75% en medicamentos</li>
                <li>✅ Sesiones de terapia psicológica semanales</li>
                <li>✅ 30 días completamente GRATIS</li>
              </ul>
              
              <p><strong>📱 Guarda este código:</strong> ${user.migrant_access_code}<br>
              Con tu código puedes gestionar la suscripción y monitorear los beneficios que tu familiar está usando.</p>
              
              <p><strong>⏰ ¡Activa tu cuenta hoy!</strong><br>
              Los 30 días gratis comienzan desde el primer acceso.</p>
              
              <hr style="margin: 30px 0;">
              
              <p style="color: #666;">¿Dudas? Escríbenos a contact@saludcompartida.com</p>
              
              <p>¡Gracias por cuidar a tu familia! 💙<br>
              <strong>Equipo SaludCompartida</strong></p>
            </div>
          `
        });

        // Email al familiar
        const familyEmail = await resend.emails.send({
          from: `SaludCompartida <${FROM_EMAIL}>`,
          to: user.family_email,
          subject: '🎉 ¡Felicidades! Has sido seleccionado - SaludCompartida',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Hola ${user.family_first_name},</h2>
              
              <p>¡Excelentes noticias! Has sido seleccionado para participar en el programa piloto de SaludCompartida. 🎉</p>
              
              <p><strong>${user.migrant_first_name} ${user.migrant_last_name}</strong> (migrante en Estados Unidos) te compró la suscripción para que puedas utilizar los beneficios de SaludCompartida sin costo durante 30 días.</p>
              
              <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Tu código de acceso es:</h3>
                <p style="font-size: 24px; font-weight: bold; color: #0066cc; text-align: center;">${user.family_access_code}</p>
              </div>
              
              <h3>🔗 Activa tu cuenta ahora:</h3>
              <p><a href="https://prototype.saludcompartida.com" style="color: #0066cc;">👉 https://prototype.saludcompartida.com</a></p>
              
              <p>Para acceder debes ingresar el código en el link indicado arriba. Te registras y una vez registrado podrás empezar a utilizar los servicios inmediatamente.</p>
              
              <p><strong>📱 Guarda este código:</strong> ${user.family_access_code}<br>
              Lo necesitarás para acceder a todos tus servicios de salud.</p>
              
              <h3>🏥 Tus beneficios incluyen:</h3>
              <ul>
                <li><strong>✅ Telemedicina 24/7</strong> - Consulta médicos cuando lo necesites, desde tu celular</li>
                <li><strong>✅ Descuentos de 40-75% en medicamentos</strong> - Ahorra en todas tus medicinas</li>
                <li><strong>✅ Terapia psicológica semanal</strong> - Cuida tu salud mental con profesionales</li>
                <li><strong>✅ 30 días completamente GRATIS</strong> - Sin pagos, sin compromisos</li>
              </ul>
              
              <p><strong>⏰ ¡Activa tu cuenta hoy!</strong><br>
              Los 30 días gratis comienzan desde tu primer acceso. ¡Empieza a ahorrar y a cuidar tu salud!</p>
              
              <hr style="margin: 30px 0;">
              
              <p style="color: #666;">¿Dudas? Escríbenos a contact@saludcompartida.com</p>
              
              <p>¡Estamos para cuidarte! 💙<br>
              <strong>Equipo SaludCompartida</strong></p>
            </div>
          `
        });

        // Marcar como enviado
        const { error: updateError } = await supabase
          .from('registrations')
          .update({ 
            codes_sent: true,
            codes_sent_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (updateError) {
          throw new Error(`Error actualizando registro: ${updateError.message}`);
        }

        results.success++;
        results.details.push({
          id: user.id,
          migrant: user.migrant_email,
          family: user.family_email,
          status: 'success'
        });

        console.log(`✅ Códigos enviados: ${user.migrant_email} y ${user.family_email}`);

      } catch (error) {
        results.errors++;
        results.details.push({
          id: user.id,
          migrant: user.migrant_email,
          family: user.family_email,
          status: 'error',
          error: error.message
        });
        console.error(`❌ Error procesando usuario ${user.id}:`, error);
      }

      // Pausa para no sobrecargar
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('📊 Proceso completado:', results);

    return res.status(200).json({
      message: 'Proceso completado',
      ...results
    });

  } catch (error) {
    console.error('❌ Error fatal:', error);
    return res.status(500).json({ 
      error: 'Error en el proceso',
      details: error.message 
    });
  }
}
