/**
 * Script para enviar códigos de acceso a usuarios registrados hace 3 días
 * Ejecutar manualmente o configurar como tarea programada (cron job)
 * 
 * Uso: node scripts/send-access-codes.js
 */

import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Error: Variables de entorno de Supabase no configuradas');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Obtiene usuarios registrados hace exactamente 3 días
 */
async function getEligibleUsers() {
  try {
    // Calcular fecha de hace 3 días
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    threeDaysAgo.setHours(0, 0, 0, 0);
    
    const fourDaysAgo = new Date();
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);
    fourDaysAgo.setHours(0, 0, 0, 0);

    console.log(`📅 Buscando registros entre ${fourDaysAgo.toISOString()} y ${threeDaysAgo.toISOString()}`);

    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .gte('created_at', fourDaysAgo.toISOString())
      .lt('created_at', threeDaysAgo.toISOString())
      .is('codes_sent', null); // Solo usuarios que no han recibido códigos

    if (error) {
      console.error('❌ Error obteniendo usuarios:', error);
      return [];
    }

    console.log(`✅ Encontrados ${data?.length || 0} registros elegibles`);
    return data || [];
  } catch (error) {
    console.error('❌ Error en getEligibleUsers:', error);
    return [];
  }
}

/**
 * Envía email con código de acceso al migrante
 */
async function sendMigrantCode(registration) {
  const message = `Hola ${registration.migrant_first_name},

¡Excelentes noticias! Has sido seleccionado para participar en el programa piloto de SaludCompartida. 🎉

Tu código de acceso es: ${registration.migrant_access_code}

🔗 **Activa tu cuenta ahora:**
👉 https://prototype.saludcompartida.com

Ingresa con tu código para empezar a disfrutar de:
✅ Telemedicina 24/7 para tu familiar en México
✅ Descuentos de 40-75% en medicamentos
✅ Sesiones de terapia psicológica semanales
✅ 30 días completamente GRATIS

📱 **Guarda este código:** ${registration.migrant_access_code}
Lo necesitarás para acceder a todos tus servicios de salud.

⏰ **¡Activa tu cuenta hoy!**
Los 30 días gratis comienzan desde tu primer acceso.

¿Dudas? Escríbenos a contact@saludcompartida.com

¡Bienvenido oficialmente a la familia SaludCompartida! 💙
Equipo SaludCompartida`;

  try {
    const response = await fetch('https://prototype.saludcompartida.com/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: registration.migrant_email,
        subject: '🎉 ¡Felicidades! Has sido seleccionado - SaludCompartida',
        message: message,
        type: 'access-code-approved'
      })
    });

    if (response.ok) {
      console.log(`✅ Código enviado al migrante: ${registration.migrant_email}`);
      return true;
    } else {
      console.error(`❌ Error enviando email al migrante: ${registration.migrant_email}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error en sendMigrantCode:`, error);
    return false;
  }
}

/**
 * Envía email con código de acceso al familiar
 */
async function sendFamilyCode(registration) {
  const message = `Hola ${registration.family_first_name},

¡Excelentes noticias! Has sido seleccionado para participar en el programa piloto de SaludCompartida. 🎉

${registration.migrant_first_name} ${registration.migrant_last_name} (Migrante en USA) te registró para que puedas utilizar los beneficios de SaludCompartida sin costo durante 30 días.

Tu código de acceso es: ${registration.family_access_code}

🔗 **Activa tu cuenta ahora:**
👉 https://prototype.saludcompartida.com

Para acceder debes ingresar el código en el link indicado arriba. Te registras y una vez registrado podrás empezar a utilizar los servicios inmediatamente. ¡Empieza a ahorrar! Empieza a utilizar SaludCompartida.

📱 **Guarda este código:** ${registration.family_access_code}
Lo necesitarás para acceder a todos tus servicios de salud.

🏥 **Tus beneficios incluyen:**
✅ Telemedicina 24/7 - Consulta médicos cuando lo necesites
✅ Descuentos de 40-75% en medicamentos
✅ Terapia psicológica semanal
✅ 30 días completamente GRATIS

⏰ **¡Activa tu cuenta hoy!**
Los 30 días gratis comienzan desde tu primer acceso.

¿Dudas? Escríbenos a contact@saludcompartida.com

¡Estamos para cuidarte! 💙
Equipo SaludCompartida`;

  try {
    const response = await fetch('https://prototype.saludcompartida.com/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: registration.family_email,
        subject: '🎉 ¡Felicidades! Has sido seleccionado - SaludCompartida',
        message: message,
        type: 'access-code-approved'
      })
    });

    if (response.ok) {
      console.log(`✅ Código enviado al familiar: ${registration.family_email}`);
      return true;
    } else {
      console.error(`❌ Error enviando email al familiar: ${registration.family_email}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error en sendFamilyCode:`, error);
    return false;
  }
}

/**
 * Marca el registro como procesado
 */
async function markAsSent(registrationId) {
  try {
    const { error } = await supabase
      .from('registrations')
      .update({ 
        codes_sent: true,
        codes_sent_at: new Date().toISOString()
      })
      .eq('id', registrationId);

    if (error) {
      console.error('❌ Error marcando como enviado:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('❌ Error en markAsSent:', error);
    return false;
  }
}

/**
 * Función principal
 */
async function main() {
  console.log('🚀 Iniciando proceso de envío de códigos de acceso...\n');
  
  // Obtener usuarios elegibles
  const users = await getEligibleUsers();
  
  if (users.length === 0) {
    console.log('ℹ️  No hay usuarios elegibles para enviar códigos hoy.');
    return;
  }

  console.log(`\n📧 Procesando ${users.length} registros...\n`);

  let successCount = 0;
  let errorCount = 0;

  // Procesar cada usuario
  for (const user of users) {
    console.log(`\n📝 Procesando: ${user.migrant_first_name} ${user.migrant_last_name}`);
    
    // Enviar emails
    const migrantSent = await sendMigrantCode(user);
    const familySent = await sendFamilyCode(user);

    // Si ambos se enviaron exitosamente, marcar como procesado
    if (migrantSent && familySent) {
      const marked = await markAsSent(user.id);
      if (marked) {
        successCount++;
        console.log(`✅ Registro completado para ID: ${user.id}`);
      } else {
        errorCount++;
        console.log(`⚠️  Emails enviados pero error al marcar como procesado: ${user.id}`);
      }
    } else {
      errorCount++;
      console.log(`❌ Error procesando registro ID: ${user.id}`);
    }

    // Pausa de 1 segundo entre envíos para no sobrecargar
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 RESUMEN DEL PROCESO:');
  console.log('='.repeat(50));
  console.log(`✅ Exitosos: ${successCount}`);
  console.log(`❌ Errores: ${errorCount}`);
  console.log(`📧 Total procesados: ${users.length}`);
  console.log('='.repeat(50) + '\n');
}

// Ejecutar script
main().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
