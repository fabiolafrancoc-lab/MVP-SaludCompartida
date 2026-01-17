import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

/**
 * FUNCIÓN PROPIETARIA #1: Agendar Telemedicina
 * 
 * Permite a los AI agents agendar citas de telemedicina directamente
 * desde la conversación telefónica.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      phone_number,
      user_email, 
      preferred_date,
      preferred_time,
      reason,
      urgency_level = 'normal' // low, normal, high, emergency
    } = req.body;

    console.log('📅 Agendando telemedicina:', { phone_number, preferred_date, reason });

    // 1. Buscar usuario en base de datos
    const { data: user, error: userError } = await supabase
      .from('registrations')
      .select('*')
      .or(`migrant_phone.eq.${phone_number.replace(/\D/g, '')},family_phone.eq.${phone_number.replace(/\D/g, '')}`)
      .single();

    if (userError) {
      console.error('❌ Usuario no encontrado:', userError);
      return res.status(404).json({ 
        success: false,
        message: 'No encontramos tu registro. ¿Puedes verificar tu número?' 
      });
    }

    // 2. Crear registro de cita
    const { data: appointment, error: appointmentError } = await supabase
      .from('telemedicine_appointments')
      .insert({
        user_email: user.migrant_email || user.family_email,
        phone_number: phone_number,
        preferred_date: preferred_date,
        preferred_time: preferred_time,
        reason: reason,
        urgency_level: urgency_level,
        status: 'pending', // pending, confirmed, completed, cancelled
        created_via: 'ai_voice_call',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (appointmentError) {
      console.error('❌ Error al crear cita:', appointmentError);
      return res.status(500).json({ 
        success: false,
        message: 'Hubo un error al agendar. Intenta de nuevo.' 
      });
    }

    // 3. Enviar confirmación por WhatsApp (si está disponible)
    if (process.env.WATI_ENDPOINT) {
      try {
        await fetch(`${process.env.WATI_ENDPOINT}/api/v1/sendSessionMessage/${phone_number}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.WATI_API_TOKEN}`
          },
          body: JSON.stringify({
            messageText: `✅ *Cita Agendada*\n\n📅 Fecha: ${preferred_date}\n🕐 Hora: ${preferred_time}\n📝 Motivo: ${reason}\n\nTe confirmaremos pronto. ID: ${appointment.id}`
          })
        });
      } catch (whatsappError) {
        console.warn('⚠️ No se pudo enviar WhatsApp:', whatsappError);
      }
    }

    return res.status(200).json({
      success: true,
      message: `Perfecto, agendé tu cita para ${preferred_date} a las ${preferred_time}. Te enviaré confirmación por WhatsApp.`,
      appointment_id: appointment.id,
      confirmation_code: appointment.id.substring(0, 8).toUpperCase()
    });

  } catch (error) {
    console.error('❌ Error en schedule-telemedicine:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Error al procesar la solicitud',
      error: error.message 
    });
  }
}
