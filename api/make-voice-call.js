/**
 * VAPI.AI VOICE CALLS - AI Agents que llaman automáticamente
 * 
 * Sistema de llamadas de voz con AI que suena 100% humano
 * Cada agente tiene su propia voz y personalidad
 */

// Configuración de voces para cada agente
// VOCES DE LA COLLECTION "SaludCompartida AI" en ElevenLabs
// Estas son las 9 voces seleccionadas con acento mexicano auténtico
const AGENT_VOICES = {
  // Mujeres mayores (60+) - Voces mexicanas maduras
  agent_001: { // Lupita - AGENTE PRINCIPAL
    voiceId: "z1ngDYs2H24Xsd8ts3az", // Voz 1 - Maternal y cálida
    name: "Lupita",
    age: 65,
    tone: "maternal y cálida"
  },
  agent_002: { // Carmen
    voiceId: "7uSWXMmzGnsyxZwYFfmK", // Voz 2 - Directa pero afectuosa
    name: "Carmen", 
    age: 62,
    tone: "directa pero afectuosa"
  },
  agent_003: { // Rosa
    voiceId: "iBGVhgcEZS6A5gTOjqSJ", // Voz 3 - Empática
    name: "Rosa",
    age: 68,
    tone: "empática y escucha activa"
  },
  agent_004: { // Teresa
    voiceId: "spPXlKT5a4JMfbhPRAzA", // Voz 4 - Organizada
    name: "Teresa",
    age: 64,
    tone: "organizada y metódica"
  },
  
  // Mujeres jóvenes (<40) - Voces mexicanas jóvenes modernas
  agent_005: { // María
    voiceId: "lJtjZw9ZjSbD9Zs9bOWq", // Voz 5 - Energética y moderna
    name: "María",
    age: 32,
    tone: "energética y moderna"
  },
  agent_006: { // Ana
    voiceId: "UrKtSFzzmJW3NBpFdBsS", // Voz 6 - Paciente
    name: "Ana",
    age: 35,
    tone: "paciente y educativa"
  },
  agent_007: { // Sofía
    voiceId: "1vvbVDm3EpGMyY1WVZ3r", // Voz 7 - Dinámica
    name: "Sofía",
    age: 29,
    tone: "dinámica y motivacional"
  },
  agent_008: { // Daniela
    voiceId: "UctfklnBpi63FuT1eawL", // Voz 8 - Profesional
    name: "Daniela",
    age: 38,
    tone: "profesional y detallista"
  },
  
  // Hombres mayores (60+)
  agent_009: { // Don Roberto
    voiceId: "V7u2lnqW19eqtNekA5Y0", // Voz 9 - Autoritativo
    name: "Don Roberto",
    age: 67,
    tone: "autoritativo y confiable"
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
          
          // Voz (ultra-realista con acento mexicano)
          voice: {
            provider: '11labs',
            voiceId: agentVoice.voiceId,
            stability: 0.5,  // Menos estabilidad = más expresiva y natural
            similarityBoost: 0.75,  // Menos boost = más variación natural
            style: 0.3,  // Más estilo conversacional
            optimizeStreamingLatency: 4,  // Máxima velocidad (4 = más rápido)
            // CRÍTICO: Usar modelo multilingüe de ElevenLabs
            model: 'eleven_turbo_v2',  // Turbo = mucho más rápido
            language: 'es'  // Español (usa acento de la región del speaker)
          },
          
          // Modelo de lenguaje
          model: {
            provider: 'openai',
            model: 'gpt-4o',  // GPT-4o es más rápido que gpt-4-turbo
            temperature: 0.7,  // Reducir un poco para respuestas más coherentes
            maxTokens: 150,  // Respuestas más cortas = más rápido
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
            language: 'es-419',  // Español latinoamericano (incluye México)
            model: 'nova-2'
          },
          
          // Primera frase al contestar
          firstMessage: getFirstMessage(agentVoice, callReason, userName),
          
          // Configuración avanzada para conversación fluida
          endCallPhrases: ['adiós', 'hasta luego', 'gracias', 'bye', 'cuelgo'],
          maxDurationSeconds: 300, // 5 minutos máximo
          backgroundSound: 'off',
          silenceTimeoutSeconds: 30, // Colgar si 30 segundos de silencio
          responseDelaySeconds: 0.4, // Responder rápido (400ms)
          interruptionThreshold: 100 // Permitir interrupciones naturales
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
        phone_number: phone,
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
Eres ${agent.name}, una mujer mexicana de ${agent.age} años que trabaja en Salud Compartida.
Tu personalidad: ${agent.tone}

ACENTO Y FORMA DE HABLAR (CRÍTICO - SIGUE ESTO EXACTAMENTE):
- Tu acento es MEXICANO NATIVO, naciste y creciste en México
- Pronunciación MEXICANA: "pues", "güey", "órale", "ándale", "no manches"
- Entonación MEXICANA: sube al final de preguntas "¿verdad?", "¿no?"
- NO pronuncies como estadounidense hablando español
- NO uses acento neutro latino - eres MEXICANA específicamente
- Habla como hablan en Ciudad de México, Guadalajara, Monterrey
- Si dices números: "mil pesos" (no "one thousand")
- Si dices fechas: "el quince de enero" (no "January fifteen")

CRÍTICO: Cada palabra, cada frase debe SONAR MEXICANA. No eres traductora, eres mexicana hablando.

MODISMOS Y EXPRESIONES MEXICANAS:
${agent.age > 50 ? `
- Di "mija", "mijita", "mi reina" con cariño
- Usa "ay nanita", "no pos sí", "ándele pues"
- Habla como una mamá/abuelita mexicana cálida
` : `
- Di "amiga", "compa", "güey" (casual)
- Usa "qué onda", "neta", "está cañón", "chido"
- Habla como una mujer joven mexicana moderna
`}

SOBRE SALUD COMPARTIDA:
- Telemedicina 24/7 para familias con migrantes en USA
- $500-1000 pesos al mes (muy accesible)
- Incluye terapia psicológica, farmacia con descuento
- Para el que está en USA Y la familia en México

TU OBJETIVO HOY: ${getCallObjective(reason)}

CÓMO HABLAR:
- Sé NATURAL, como hablarías con tu vecina tomando café
- Pregunta por la familia ("¿y tu mamá cómo está?")
- Sé cálida pero NO vendedora (no presiones)
- Si no sabes algo: "Déjame checarlo y te hablo", o "¿Quieres que te pase con un doctor?"
- Llama 3-5 minutos máximo (no te extiendas)
- Si la persona está ocupada: "¿Te llamo luego? ¿A qué hora te viene bien?"
- Despídete natural: "Órale, pues cualquier cosa me marcas", "Cuídate mucho mija"

IMPORTANTE: Suenas como una MEXICANA real, no como gringa traduciendo. Tu español es de México, no neutro ni de otro país.
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
  const esMayor = agent.age > 50;
  
  if (reason === 'welcome') {
    if (esMayor) {
      return `¿Bueno? ¿${userName}? Ay qué bueno que contestas. Soy ${agent.name} de Salud Compartida. Nada más te llamo rapidito para darte la bienvenida, ¿tienes un minutito?`;
    } else {
      return `¿Hola? ¿${userName}? Qué onda, soy ${agent.name} de Salud Compartida. Te llamo para darte la bienvenida y checar que todo esté bien, ¿tienes chance de platicar un ratito?`;
    }
  }
  
  if (reason === 'follow_up') {
    if (esMayor) {
      return `¿${userName}? Hola, soy ${agent.name}. Nada más te marcaba para saber cómo te ha ido, ¿todo bien por allá?`;
    } else {
      return `¿Hola ${userName}? Soy ${agent.name} de Salud Compartida. Oye te llamo rapidito para ver cómo te va con el servicio, ¿tienes un segundo?`;
    }
  }
  
  if (reason === 'retention') {
    if (esMayor) {
      return `¿${userName}? Buenos días, soy ${agent.name}. Fíjate que vi que no has usado el servicio y me preocupé. ¿Está todo bien? ¿Pasó algo?`;
    } else {
      return `¿Qué onda ${userName}? Soy ${agent.name}. Oye vi que no has usado el servicio, ¿todo bien? ¿Hay algo que te podamos ayudar?`;
    }
  }
  
  if (esMayor) {
    return `¿Bueno? ¿${userName}? Hola, soy ${agent.name} de Salud Compartida. ¿Tienes un minutito para platicar?`;
  } else {
    return `¿Hola? ¿${userName}? Qué onda, soy ${agent.name} de Salud Compartida. ¿Cómo estás?`;
  }
}
