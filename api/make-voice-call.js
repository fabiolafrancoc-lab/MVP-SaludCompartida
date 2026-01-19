/**
 * VAPI.AI VOICE CALLS - AI Agents que llaman automáticamente
 * 
 * Sistema de llamadas de voz con AI que suena 100% humano
 * Cada agente tiene su propia voz y personalidad
 */

// Configuración de voces para cada agente
const AGENT_VOICES = {
  // Mujeres mayores (60+)
  agent_001: { // Lupita
    voiceId: "ThT5KcBeYPX3keUQqHPh",
    name: "Lupita",
    age: 65,
    tone: "maternal y cálida"
  },
  agent_002: { // Carmen
    voiceId: "EXAVITQu4vr4xnSDxMaL",
    name: "Carmen", 
    age: 62,
    tone: "directa pero afectuosa"
  },
  agent_003: { // Rosa
    voiceId: "21m00Tcm4TlvDq8ikWAM",
    name: "Rosa",
    age: 68,
    tone: "empática y escucha activa"
  },
  agent_004: { // Teresa
    voiceId: "AZnzlk1XvdvUeBnXmlld",
    name: "Teresa",
    age: 64,
    tone: "organizada y metódica"
  },
  
  // Mujeres jóvenes (<40)
  agent_005: { // María
    voiceId: "pNInz6obpgDQGcFmaJgB",
    name: "María",
    age: 32,
    tone: "energética y moderna"
  },
  agent_006: { // Ana
    voiceId: "EXAVITQu4vr4xnSDxMaL",
    name: "Ana",
    age: 35,
    tone: "paciente y educativa"
  },
  agent_007: { // Sofía
    voiceId: "XB0fDUnXU5powFXDhCwa",
    name: "Sofía",
    age: 29,
    tone: "dinámica y motivacional"
  },
  agent_008: { // Daniela
    voiceId: "ThT5KcBeYPX3keUQqHPh",
    name: "Daniela",
    age: 38,
    tone: "profesional y detallista"
  },
  
  // Hombres mayores (60+)
  agent_009: { // Don Roberto
    voiceId: "VR6AewLTigWG4xSOukaG",
    name: "Don Roberto",
    age: 67,
    tone: "autoritativo y confiable"
  },
  agent_010: { // Don Miguel
    voiceId: "pqHfZKP75CvOlQylNhV4",
    name: "Don Miguel",
    age: 63,
    tone: "amigable y práctico"
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      phone,           // Número a llamar
      agentId,         // ID del agente asignado
      callReason,      // "welcome", "follow-up", "retention", etc.
      userName,        // Nombre del usuario
      userContext = {} // Info adicional del usuario
    } = req.body;

    if (!phone || !agentId) {
      return res.status(400).json({ 
        error: 'Missing required fields: phone, agentId' 
      });
    }

    const VAPI_API_KEY = process.env.VAPI_API_KEY;
    const VAPI_PHONE_NUMBER_ID = process.env.VAPI_PHONE_NUMBER_ID || '9aafdbd3-9d61-49f5-929a-51bb2323419f';
    
    if (!VAPI_API_KEY) {
      return res.status(500).json({
        error: 'Vapi.ai not configured',
        instructions: 'Add VAPI_API_KEY to Vercel environment variables'
      });
    }

    // Obtener configuración del agente
    const agentVoice = AGENT_VOICES[agentId];
    
    if (!agentVoice) {
      return res.status(400).json({ error: 'Invalid agent ID' });
    }

    console.log(`📞 Iniciando llamada de ${agentVoice.name} a ${phone}`);

    // Construir prompt según el motivo de la llamada
    const systemPrompt = buildSystemPrompt(agentVoice, callReason, userName, userContext);

    // Crear llamada con Vapi.ai
    const vapiResponse = await fetch('https://api.vapi.ai/call/phone', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Número desde el cual llamar (provisto por Vapi)
        phoneNumberId: VAPI_PHONE_NUMBER_ID,
        
        // A quién llamar (formato E164)
        customer: {
          number: phone
        },
        
        // Configuración del asistente inline
        assistant: {
          name: agentVoice.name,
          
          // Voz (ultra-realista)
          voice: {
            provider: '11labs',
            voiceId: agentVoice.voiceId,
            stability: 0.6,
            similarityBoost: 0.85,
            optimizeStreamingLatency: 3
          },
          
          // Modelo de lenguaje
          model: {
            provider: 'openai',
            model: 'gpt-4-turbo',
            temperature: 0.7,
            systemPrompt: systemPrompt,
            messages: [
              {
                role: 'system',
                content: systemPrompt
              }
            ]
          },
          
          // Configuración de conversación
          transcriber: {
            provider: 'deepgram',
            language: 'es',
            model: 'nova-2'
          },
          
          // Primera frase al contestar
          firstMessage: getFirstMessage(agentVoice, callReason, userName),
          
          // Configuración avanzada
          endCallPhrases: ['adiós', 'hasta luego', 'gracias', 'bye'],
          maxDurationSeconds: 600, // 10 minutos máximo
          backgroundSound: 'off'
        }
        
        // NOTA: Las tools/functions deben configurarse en el Assistant creado en Vapi Dashboard
        // No se pueden incluir inline en llamadas ad-hoc
      })
    });

    const vapiData = await vapiResponse.json();

    if (!vapiResponse.ok) {
      console.error('❌ Error de Vapi.ai:', vapiData);
      return res.status(vapiResponse.status).json({
        success: false,
        error: vapiData.message || 'Error iniciando llamada',
        details: vapiData
      });
    }

    console.log(`✅ Llamada iniciada: ${vapiData.id}`);

    // Guardar en base de datos para tracking y análisis
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    const { data: callLog, error: logError } = await supabase
      .from('ai_voice_calls')
      .insert({
        vapi_call_id: vapiData.id,
        phone_number: normalizedPhone,
        agent_id: agentId,
        agent_name: agentVoice.name,
        call_reason: callReason,
        initiated_at: new Date().toISOString(),
        status: 'initiated'
      });

    if (logError) {
      console.error('⚠️ Error guardando llamada en DB:', logError);
      // NO FALLAR - la llamada ya se inició en Vapi exitosamente
    } else {
      console.log('📊 Llamada registrada en DB para tracking');
    }

    return res.status(200).json({
      success: true,
      callId: vapiData.id,
      agent: {
        id: agentId,
        name: agentVoice.name,
        age: agentVoice.age
      },
      status: 'calling',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error haciendo llamada:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * Construye el system prompt según el agente y motivo de llamada
 */
function buildSystemPrompt(agent, reason, userName, context) {
  const basePrompt = `
Eres ${agent.name}, una agente de Salud Compartida de ${agent.age} años.
Tu personalidad es ${agent.tone}.

SOBRE SALUD COMPARTIDA:
- Servicio de telemedicina y terapia para familias con migrantes
- $500-1000 MXN/mes
- Atención 24/7
- Descuentos en farmacias

TU OBJETIVO EN ESTA LLAMADA: ${getCallObjective(reason)}

IMPORTANTE:
- Habla de forma natural y humana
- Usa "mija", "mi amor" si eres mayor
- Usa "amiga", "compa" si eres joven
- Pregunta cómo está la familia
- Sé cálida y empática
- Si no sabes algo, ofrece transferir a un doctor
- Duración ideal: 3-5 minutos
- Despídete naturalmente cuando se resuelva el objetivo
`;

  return basePrompt;
}

/**
 * Objetivo de la llamada según el motivo
 */
function getCallObjective(reason) {
  const objectives = {
    welcome: 'Dar la bienvenida al nuevo usuario, confirmar que recibió su código de acceso, y explicar cómo usar el servicio',
    follow_up: 'Hacer seguimiento post-registro, preguntar si tiene dudas, y recordar que puede usar el servicio cuando lo necesite',
    retention: 'Prevenir cancelación, entender por qué no ha usado el servicio, y ofrecer ayuda personalizada',
    appointment: 'Confirmar cita próxima y recordar detalles importantes',
    feedback: 'Pedir feedback sobre experiencia con el servicio y detectar oportunidades de mejora'
  };
  
  return objectives[reason] || objectives.welcome;
}

/**
 * Primera frase al contestar el teléfono
 */
function getFirstMessage(agent, reason, userName) {
  if (reason === 'welcome') {
    return `¡Hola ${userName}! Soy ${agent.name} de Salud Compartida. ¿Cómo estás? Te llamo para darte la bienvenida.`;
  }
  
  if (reason === 'follow_up') {
    return `Hola ${userName}, soy ${agent.name}. ¿Tienes un minutito? Quiero saber cómo te va con el servicio.`;
  }
  
  if (reason === 'retention') {
    return `${userName}, buenos días. Soy ${agent.name} de Salud Compartida. Noté que no has usado el servicio, ¿está todo bien?`;
  }
  
  return `¡Hola ${userName}! Soy ${agent.name} de Salud Compartida. ¿Cómo estás?`;
}
