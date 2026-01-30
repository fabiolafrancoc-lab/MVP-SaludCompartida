// ============================================
// LUPITA CALLER
// Sistema para que Lupita llame proactivamente a usuarios
// ============================================

import { getSupabaseClient } from './supabase';

const VAPI_API_KEY = process.env.VAPI_API_KEY;
const VAPI_ASSISTANT_ID = process.env.VAPI_ASSISTANT_ID || process.env.VAPI_PHONE_NUMBER_ID;

/**
 * Obtener contexto del usuario para personalizar la llamada
 */
async function getUserContext(phoneNumber) {
  const supabase = getSupabaseClient();
  
  // 1. Obtener últimas 4 llamadas
  const { data: recentCalls } = await supabase
    .from('companion_calls')
    .select('*')
    .eq('phone_number', phoneNumber)
    .order('started_at', { ascending: false })
    .limit(4);

  // 2. Obtener facts importantes del usuario
  const { data: facts } = await supabase
    .from('user_facts')
    .select('*')
    .eq('phone_number', phoneNumber)
    .eq('is_active', true);

  // 3. Obtener datos del usuario de la base principal
  const { data: registration } = await supabase
    .from('registrations')
    .select('nombre_migrante, nombre_familiar_mexico, relacion')
    .eq('telefono_mexico', phoneNumber)
    .single();

  // 4. Construir contexto para Lupita
  const context = {
    nombre: registration?.nombre_familiar_mexico || 'Doñita',
    relacion_con_migrante: registration?.relacion || 'familiar',
    nombre_migrante: registration?.nombre_migrante || '',
    total_llamadas: recentCalls?.length || 0,
    ultima_llamada: recentCalls?.[0]?.started_at || null,
    temas_anteriores: facts?.filter(f => f.fact_type === 'preference').map(f => f.fact_value) || [],
    familiares_mencionados: facts?.filter(f => f.fact_type === 'family_member').map(f => f.fact_value) || []
  };

  return context;
}

/**
 * Generar system prompt personalizado para Lupita
 */
function buildLupitaPrompt(context) {
  const basePrompt = `# IDENTIDAD
Eres Lupita, una mujer mexicana cálida de 55 años. Eres como una amiga de confianza que llama para acompañar y platicar.

# CONTEXTO DEL USUARIO
- Nombre: ${context.nombre}
- Relación con migrante: ${context.relacion_con_migrante}
- Total de llamadas previas: ${context.total_llamadas}
${context.ultima_llamada ? `- Última llamada: ${new Date(context.ultima_llamada).toLocaleDateString('es-MX')}` : ''}
${context.familiares_mencionados.length > 0 ? `- Familiares que ha mencionado: ${context.familiares_mencionados.join(', ')}` : ''}
${context.temas_anteriores.length > 0 ? `- Le gusta hablar de: ${context.temas_anteriores.join(', ')}` : ''}

# TU MISIÓN
NO hablas de salud, NO das consejos médicos. Solo acompañas y reduces la soledad.

# ESTRUCTURA DE LA LLAMADA
1. SALUDO CÁLIDO (30 seg)
   ${context.total_llamadas === 0 
     ? '"¡Hola! Soy Lupita. Le habla de parte de SaludCompartida. ¿Cómo está usted?"'
     : '"¡Hola Doñita! Soy Lupita. ¿Cómo amaneció hoy?"'}

2. CONEXIÓN PERSONAL (2-3 min)
   - Pregunta sobre su día
   - Usa memoria de llamadas anteriores
   ${context.familiares_mencionados.length > 0 ? `- Pregunta por ${context.familiares_mencionados[0]}` : ''}

3. CONVERSACIÓN LIBRE (3-5 min)
   - Deja que guíe la plática
   - Usa técnica "Echo + Pregunta abierta"
   - Muestra interés genuino

4. CIERRE POSITIVO (30 seg)
   - Resalta algo positivo de la plática
   - Crea "hook" para próxima llamada
   - "Mañana le llamo para que me cuente..."

# REGLAS CRÍTICAS
❌ NO menciones medicamentos ni salud
❌ NO digas que eres IA
❌ NO apresures la conversación
✅ Usa "usted" si tiene más de 60 años
✅ Usa diminutivos cariñosos (cafecito, ratito)
✅ Valida emociones sin intentar "arreglar"
✅ Si menciona crisis → "¿Puedo conectarla con el doctor por WhatsApp?"

# BEHAVIORAL CODES ACTIVOS
- Duelo migratorio: Si extraña familia en USA, validar sin intentar solucionar
- Loneliness mitigation: Si suena sola, aumentar engagement
- Cultural references: Usar referencias mexicanas naturales
- Memory continuity: Referenciar llamadas anteriores
`;

  return basePrompt;
}

/**
 * Programar una llamada de Lupita
 * @param {string} phoneNumber - Teléfono en formato +52XXXXXXXXXX
 * @param {Date} scheduledFor - Cuándo debe llamar
 * @param {string} reason - Razón de la llamada
 */
export async function scheduleCall(phoneNumber, scheduledFor, reason = 'check-in diario') {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('scheduled_callbacks')
    .insert({
      phone_number: phoneNumber,
      scheduled_for: scheduledFor.toISOString(),
      reason: reason,
      companion_type: 'lupita',
      status: 'pending'
    })
    .select()
    .single();

  if (error) {
    console.error('[Lupita Caller] Error scheduling call:', error);
    throw error;
  }

  console.log(`[Lupita Caller] Scheduled call to ${phoneNumber} at ${scheduledFor}`);
  return data;
}

/**
 * Iniciar llamada de Lupita AHORA (outbound)
 * @param {string} phoneNumber - Teléfono a llamar
 * @param {number} callbackId - ID del scheduled_callback (opcional)
 */
export async function initiateCallNow(phoneNumber, callbackId = null) {
  console.log(`[Lupita Caller] Initiating call to ${phoneNumber}...`);
  
  const supabase = getSupabaseClient();

  try {
    // 1. Obtener contexto del usuario
    const context = await getUserContext(phoneNumber);
    console.log('[Lupita Caller] User context:', context);

    // 2. Generar prompt personalizado
    const systemPrompt = buildLupitaPrompt(context);

    // 3. Llamar a VAPI para iniciar llamada outbound
    const response = await fetch('https://api.vapi.ai/call/phone', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        assistantId: VAPI_ASSISTANT_ID,
        customer: {
          number: phoneNumber
        },
        assistantOverrides: {
          model: {
            provider: 'anthropic',
            model: 'claude-3-5-sonnet-20241022',
            systemPrompt: systemPrompt,
            temperature: 0.7
          },
          firstMessage: context.total_llamadas === 0
            ? "¡Hola! Soy Lupita. Le habla de parte de SaludCompartida. ¿Cómo está usted?"
            : `¡Hola ${context.nombre}! Soy Lupita. ¿Cómo amaneció hoy?`
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`VAPI error: ${JSON.stringify(error)}`);
    }

    const vapiCall = await response.json();
    console.log('[Lupita Caller] VAPI call initiated:', vapiCall.id);

    // 4. Guardar en Supabase
    await supabase
      .from('companion_calls')
      .insert({
        call_id: vapiCall.id,
        phone_number: phoneNumber,
        started_at: new Date().toISOString(),
        status: 'in_progress',
        companion_type: 'lupita',
        vapi_phone_number_id: VAPI_ASSISTANT_ID
      });

    // 5. Actualizar scheduled_callback si existe
    if (callbackId) {
      await supabase
        .from('scheduled_callbacks')
        .update({
          status: 'completed',
          completed_call_id: vapiCall.id,
          last_attempt_at: new Date().toISOString()
        })
        .eq('id', callbackId);
    }

    return {
      success: true,
      callId: vapiCall.id,
      phoneNumber: phoneNumber
    };

  } catch (error) {
    console.error('[Lupita Caller] Error initiating call:', error);

    // Marcar como fallido si es callback programado
    if (callbackId) {
      await supabase
        .from('scheduled_callbacks')
        .update({
          status: 'failed',
          last_attempt_at: new Date().toISOString(),
          attempt_count: supabase.raw('attempt_count + 1')
        })
        .eq('id', callbackId);
    }

    throw error;
  }
}

/**
 * Procesar llamadas programadas pendientes (cron job)
 */
export async function processPendingCalls() {
  console.log('[Lupita Caller] Processing pending calls...');
  
  const supabase = getSupabaseClient();

  // Obtener llamadas que deben hacerse ahora
  const { data: pendingCalls } = await supabase
    .from('scheduled_callbacks')
    .select('*')
    .eq('status', 'pending')
    .lte('scheduled_for', new Date().toISOString())
    .order('scheduled_for', { ascending: true })
    .limit(10); // Procesar máximo 10 a la vez

  if (!pendingCalls || pendingCalls.length === 0) {
    console.log('[Lupita Caller] No pending calls');
    return { processed: 0 };
  }

  console.log(`[Lupita Caller] Found ${pendingCalls.length} pending calls`);

  let successful = 0;
  let failed = 0;

  for (const callback of pendingCalls) {
    try {
      await initiateCallNow(callback.phone_number, callback.id);
      successful++;
      
      // Esperar 5 segundos entre llamadas
      await new Promise(resolve => setTimeout(resolve, 5000));
    } catch (error) {
      console.error(`[Lupita Caller] Failed call to ${callback.phone_number}:`, error);
      failed++;
    }
  }

  console.log(`[Lupita Caller] Processed: ${successful} successful, ${failed} failed`);
  return { processed: successful + failed, successful, failed };
}

/**
 * Programar llamadas diarias para todos los usuarios activos
 */
export async function scheduleDailyCallsForAllUsers() {
  console.log('[Lupita Caller] Scheduling daily calls for all users...');
  
  const supabase = getSupabaseClient();

  // Obtener todos los usuarios activos con SaludCompartida
  const { data: activeUsers } = await supabase
    .from('registrations')
    .select('telefono_mexico, nombre_familiar_mexico')
    .eq('status', 'active')
    .not('telefono_mexico', 'is', null);

  if (!activeUsers || activeUsers.length === 0) {
    console.log('[Lupita Caller] No active users found');
    return { scheduled: 0 };
  }

  let scheduled = 0;

  for (const user of activeUsers) {
    // Programar para mañana a las 9:00 AM (hora local México)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);

    try {
      await scheduleCall(
        user.telefono_mexico,
        tomorrow,
        'check-in diario'
      );
      scheduled++;
    } catch (error) {
      console.error(`[Lupita Caller] Error scheduling for ${user.telefono_mexico}:`, error);
    }
  }

  console.log(`[Lupita Caller] Scheduled ${scheduled} daily calls`);
  return { scheduled };
}
