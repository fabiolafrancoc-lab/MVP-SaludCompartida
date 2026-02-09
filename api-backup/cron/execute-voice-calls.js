/**
 * CRON JOB: Execute Scheduled Voice Calls
 * 
 * Se ejecuta cada 5 minutos para hacer las llamadas programadas
 * 
 * Setup en Vercel:
 * 1. Crear archivo vercel.json en la raíz:
 * {
 *   "crons": [{
 *     "path": "/api/cron/execute-voice-calls",
 *     "schedule": "*/5 * * * *"
 *   }]
 * }
 */

module.exports = async function handler(req, res) {
  // Verificar que solo Vercel Cron puede ejecutar esto
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('🔄 Ejecutando cron job de llamadas programadas...');

    // Importar supabase
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    // Obtener llamadas pendientes que ya deberían ejecutarse
    const { data: pendingCalls, error } = await supabase
      .from('scheduled_voice_calls')
      .select('*')
      .eq('status', 'pending')
      .lte('scheduled_for', new Date().toISOString())
      .order('scheduled_for', { ascending: true })
      .limit(5); // Máximo 5 llamadas por ejecución

    if (error) {
      console.error('❌ Error obteniendo llamadas:', error);
      return res.status(500).json({ error: error.message });
    }

    if (!pendingCalls || pendingCalls.length === 0) {
      console.log('✅ No hay llamadas pendientes');
      return res.json({ 
        success: true, 
        message: 'No pending calls',
        executed: 0 
      });
    }

    console.log(`📞 Ejecutando ${pendingCalls.length} llamadas...`);

    const results = [];

    // Ejecutar cada llamada
    for (const call of pendingCalls) {
      try {
        console.log(`  → Llamando a ${call.user_name} (${call.user_phone})`);

        // Hacer la llamada a través de Vapi
        const callResponse = await fetch(`${process.env.NEXT_PUBLIC_URL || 'https://saludcompartida.app'}/api/make-voice-call`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phone: call.user_phone,
            agentId: call.agent_id,
            callReason: call.call_reason,
            userName: call.user_name,
            userContext: {
              userType: call.user_type
            }
          })
        });

        const callData = await callResponse.json();

        if (callData.success) {
          // Actualizar estado a "calling"
          await supabase
            .from('scheduled_voice_calls')
            .update({
              status: 'calling',
              vapi_call_id: callData.callId,
              call_started_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('id', call.id);

          results.push({
            id: call.id,
            phone: call.user_phone,
            status: 'calling',
            vapiCallId: callData.callId
          });

          console.log(`  ✅ Llamada iniciada: ${callData.callId}`);
        } else {
          // Marcar como fallida
          await supabase
            .from('scheduled_voice_calls')
            .update({
              status: 'failed',
              summary: callData.error || 'Unknown error',
              updated_at: new Date().toISOString()
            })
            .eq('id', call.id);

          results.push({
            id: call.id,
            phone: call.user_phone,
            status: 'failed',
            error: callData.error
          });

          console.log(`  ❌ Llamada falló: ${callData.error}`);
        }

        // Esperar 2 segundos entre llamadas para no saturar
        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (callError) {
        console.error(`  ❌ Error en llamada ${call.id}:`, callError);
        
        await supabase
          .from('scheduled_voice_calls')
          .update({
            status: 'failed',
            summary: callError.message,
            updated_at: new Date().toISOString()
          })
          .eq('id', call.id);

        results.push({
          id: call.id,
          phone: call.user_phone,
          status: 'failed',
          error: callError.message
        });
      }
    }

    console.log(`✅ Cron job completado. ${results.length} llamadas ejecutadas`);

    return res.json({
      success: true,
      executed: results.length,
      results: results
    });

  } catch (error) {
    console.error('❌ Error en cron job:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
