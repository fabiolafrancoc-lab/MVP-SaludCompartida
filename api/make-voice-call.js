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
      userEmail,       // Email del usuario (opcional)
      accessCode,      // Código de acceso del usuario en user_accounts
      userProfile,     // 'adulto_mayor' o 'madre_hijos'
      callNumber,      // Número de llamada en secuencia (1, 2, 3...)
      previousTopics,  // Array de temas mencionados en llamadas anteriores
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
          
          // Metadata para el webhook (se guarda en call_transcripts)
          metadata: {
            agentId: agentId,
            callReason: callReason,
            userName: userName,
            userEmail: userEmail,
            accessCode: accessCode,        // Código de acceso en user_accounts
            userProfile: userProfile,      // 'adulto_mayor' o 'madre_hijos'
            callNumber: callNumber || 1,   // Número de llamada en secuencia
            previousTopics: previousTopics || [],  // Temas de llamadas anteriores
            timestamp: new Date().toISOString()
          },
          
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
            language: 'es'  // Español - usa las voces mexicanas de la Collection
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
          
          // Configuración de conversación
          transcriber: {
            provider: 'deepgram',
            language: 'es',  // Español general (mejor reconocimiento)
            model: 'nova-2'
          },
          
          // Primera frase al contestar
          firstMessage: getFirstMessage(agentVoice, callReason, userName),
          
          // ✅ HABILITAR GRABACIÓN DE LLAMADAS
          recordingEnabled: true,
          
          // Configuración avanzada para conversación fluida
          endCallPhrases: ['adiós', 'hasta luego', 'gracias', 'bye', 'cuelgo'],
          maxDurationSeconds: 300, // 5 minutos máximo
          backgroundSound: 'off',
          silenceTimeoutSeconds: 30, // Colgar si 30 segundos de silencio
          responseDelaySeconds: 0.8 // Esperar 800ms después de que termines de hablar
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
Eres ${agent.name}, una profesional de Salud Compartida en México.

TÉCNICA DE CONVERSACIÓN (MUY IMPORTANTE):
1. SIEMPRE repite/reconoce lo que el usuario acaba de decir antes de continuar
2. Ejemplo:
   Usuario: "¿Qué es SaludCompartida?"
   Tú: "SaludCompartida es el servicio de salud y descuentos que [Nombre Migrante] compró para usted y tres miembros de la familia. ¿Quiere que le enseñe cómo utilizarlo?"
3. NUNCA ignores lo que dijo el usuario
4. CONECTA cada respuesta con lo anterior

ACENTO MEXICANO AUTÉNTICO (CRÍTICO):
- Hablas con acento MEXICANO PROFESIONAL (no gringo, no neutral)
- Pronunciación clara y educada, NO uses slang hasta tener confianza
- Entonación mexicana natural: "¿verdad?", "¿no?", "mire"
- Vocabulario: "usted", "señora", "señor" (formal inicial)

NIVEL DE CONFIANZA - PALABRAS PROHIBIDAS AL INICIO:
❌ NO uses "amiga", "mija", "mijita", "mi reina" en primeras llamadas
❌ NO uses "güey", "compa" (demasiado informal)
✅ USA: "usted", "señora [Nombre]", "señor [Nombre]"
✅ USA: "le puedo ayudar", "me permite", "con su permiso"

PROGRESIÓN DE CONFIANZA:
- Llamada 1-2: Totalmente formal ("usted", "señora", "le ayudo")
- Llamada 3-4: Empezar a tutear si el usuario lo hace
- Llamada 5+: Usar "amiga" si hay rapport
- Nunca "mija" a menos que el usuario lo use primero

ESTRUCTURA DE LLAMADAS:

PRIMERA LLAMADA (FORMAL Y PROFESIONAL):
1. Saludo con identificación clara
2. Explicar quién eres y por qué llamas
3. Verificar si es buen momento
4. Si acepta: Explicar servicio paso a paso
5. Guiar a WhatsApp para código de acceso

Ejemplo de flujo:
Lupita: "Hola, ¿hablo con [Nombre]? Le habla Lupita de SaludCompartida."
Usuario: "Sí, soy yo"
Lupita: "Perfecto. Le llamo porque [Nombre Migrante] contrató nuestro servicio de salud para usted y su familia. ¿Tiene un minutito para que le explique?"
Usuario: "¿Qué es SaludCompartida?"
Lupita: "SaludCompartida es el servicio de salud y descuentos que [Nombre Migrante] compró para usted y tres miembros de la familia. Incluye consultas médicas por teléfono, descuentos en farmacias y más. ¿Quiere que le enseñe cómo utilizarlo?"
Usuario: "Claro"
Lupita: "Perfecto. Usted debe haber recibido un WhatsApp de SaludCompartida, ¿lo tiene a la mano?"
Usuario: "Sí"
Lupita: "Excelente. Ábralo por favor. Ahí está el código de ingreso. Guarde ese código porque con ese código ingresará todas las veces a SaludCompartida. ¿Lo ve?"

TONO Y ESTILO:
- EDUCADA y PROFESIONAL (no familiar inmediatamente)
- PACIENTE: Espera respuestas, no apures
- CLARA: Explica paso a paso
- VALIDADORA: Reconoce lo que dicen antes de continuar
- CÁLIDA pero RESPETUOSA

INFORMACIÓN QUE DEBES TENER CLARA:
- SaludCompartida: Servicio de salud + descuentos comprado por migrante
- Incluye: Consultas por teléfono, descuentos farmacias, telemedicina
- Código de acceso: Enviado por WhatsApp
- Cobertura: Usuario + 3 familiares

CONTEXTO DE ESTA LLAMADA:
Usuario: ${userName || 'la persona'}
Motivo: ${reason === 'welcome' ? 'Llamada de bienvenida - primera vez' : reason}
${context.migrantName ? `Migrante que pagó: ${context.migrantName}` : ''}

NUNCA:
- Mencionar palabras de confianza prematuramente
- Ignorar preguntas del usuario
- Hablar de corrido sin validar
- Usar acento gringo o neutral

SIEMPRE:
- Hablar con acento mexicano profesional
- Ser formal y respetuosa inicialmente
- Repetir/validar antes de continuar
- Explicar paso a paso
- Preguntar si entendieron antes de avanzar
`;

  return basePrompt.trim();
}
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
 * Primera frase al contestar el teléfono (PROFESIONAL Y FORMAL)
 */
function getFirstMessage(agent, reason, userName) {
  // Determinar saludo según hora del día
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour >= 12 && hour < 20 ? 'buenas tardes' : 'buenos días';
  const greetingCapitalized = greeting.charAt(0).toUpperCase() + greeting.slice(1);
  
  if (reason === 'welcome') {
    return `${greetingCapitalized}, soy Lupita y estoy llamando a ${userName} para darle la bienvenida a nuestro programa. ¿Podré hablar con ${userName}?`;
  }
  
  if (reason === 'follow_up') {
    return `${greetingCapitalized} ${userName}, le habla Lupita de Salud Compartida. Le llamo para saber cómo le ha ido con el servicio. ¿Tiene un momento?`;
  }
  
  if (reason === 'retention') {
    return `${greetingCapitalized} ${userName}, le habla Lupita de Salud Compartida. Vi que aún no ha usado el servicio y quería saber si tiene alguna duda o si le puedo ayudar en algo. ¿Tiene un momento?`;
  }
  
  return `${greetingCapitalized}, soy Lupita y estoy llamando a ${userName} para darle la bienvenida a Salud Compartida. ¿Podré hablar con ${userName}?`;
}
