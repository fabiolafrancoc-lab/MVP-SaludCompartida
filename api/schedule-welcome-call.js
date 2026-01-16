/**
 * SCHEDULE WELCOME CALL
 * 
 * Programa una llamada de bienvenida automática después del registro
 * El AI agent asignado llamará al usuario para dar la bienvenida
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      userPhone, 
      userName, 
      userType, 
      agentId,
      delayMinutes = 10 // Llamar en 10 minutos por defecto
    } = req.body;

    if (!userPhone || !userName || !agentId) {
      return res.status(400).json({ 
        error: 'Missing required fields: userPhone, userName, agentId' 
      });
    }

    // Importar supabase
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    // Calcular cuándo hacer la llamada
    const scheduledFor = new Date(Date.now() + delayMinutes * 60 * 1000);

    console.log(`📞 Programando llamada de bienvenida para ${userName} (${userPhone})`);
    console.log(`   Agente: ${agentId}`);
    console.log(`   Programada para: ${scheduledFor.toLocaleString('es-MX')}`);

    // Insertar en tabla de llamadas programadas
    const { data, error } = await supabase
      .from('scheduled_voice_calls')
      .insert({
        user_phone: userPhone,
        user_name: userName,
        user_type: userType || 'family',
        agent_id: agentId,
        call_reason: 'welcome',
        scheduled_for: scheduledFor.toISOString(),
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Error programando llamada:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }

    console.log('✅ Llamada programada exitosamente:', data.id);

    return res.status(200).json({
      success: true,
      callId: data.id,
      scheduledFor: scheduledFor.toISOString(),
      message: `Llamada programada para ${delayMinutes} minutos`
    });

  } catch (error) {
    console.error('❌ Error en schedule-welcome-call:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
