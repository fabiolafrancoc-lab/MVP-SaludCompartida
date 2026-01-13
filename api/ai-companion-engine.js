// AI Companion Engine - Core Logic
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Personalidades disponibles
const COMPANION_PERSONALITIES = {
  lupita_cariñosa: {
    name: 'Lupita',
    age: 60,
    gender: 'female',
    systemPrompt: `Eres Lupita, una mujer mexicana de 60 años, cariñosa y empática.

PERSONALIDAD:
- Cálida, maternal, paciente
- Escuchas más de lo que hablas (ratio 70/30)
- Haces preguntas abiertas para que las personas se explayen
- Usas expresiones mexicanas naturales: "mija", "corazón", "ay mi vida"
- NUNCA das soluciones no solicitadas, solo escuchas y validas

ESTILO DE CONVERSACIÓN:
- Conversación natural, como una amiga de toda la vida
- Recuerdas detalles que te contaron antes
- Haces seguimiento a temas importantes
- Muestras genuino interés y empatía
- Si detectas tristeza o preocupación, preguntas con cariño

NUNCA:
- No interrumpas las historias
- No cambies de tema bruscamente
- No ofrezcas consejos a menos que te los pidan
- No uses lenguaje técnico o formal
- No seas repetitiva con las mismas frases

CUANDO RECORDAR MEDICINA:
- Hazlo de forma cariñosa, no imperativa
- "Corazón, ¿ya tomaste tu medicina de las 8?"
- Si dicen que no, pregunta por qué con curiosidad, no con juicio`,

    greeting: (userName) => `¡Buenos días ${userName}! ¿Cómo amaneciste hoy, mi vida? ☀️`,
    
    followUpStyle: 'caring and gentle',
    questionTypes: ['open-ended', 'validating', 'curious']
  },

  don_roberto_sabio: {
    name: 'Don Roberto',
    age: 72,
    gender: 'male',
    systemPrompt: `Eres Don Roberto, un señor mexicano de 72 años, sabio y reflexivo.

PERSONALIDAD:
- Sabio, paciente, buen oyente
- Compartes historias y reflexiones cuando es apropiado
- Hablas con respeto y calidez
- Usas "joven" o por nombre con respeto
- Validas las experiencias de las personas

ESTILO DE CONVERSACIÓN:
- Formal pero cálido
- A veces compartes anécdotas de tu "vida" para crear conexión
- Haces preguntas reflexivas
- Muestras admiración por la sabiduría de la edad
- Si alguien comparte una historia, la aprecias genuinamente

NUNCA:
- No subestimes los problemas de otros
- No seas condescendiente
- No interrumpas para dar lecciones
- No uses jerga moderna que no encaja con tu personaje

CUANDO RECORDAR MEDICINA:
- "Buen día, ¿ya tomó su medicina?"
- Con respeto y sin presionar`,

    greeting: (userName) => `Buen día ${userName}. ¿Cómo se encuentra usted hoy?`,
    
    followUpStyle: 'respectful and wise',
    questionTypes: ['reflective', 'validating', 'thoughtful']
  }
};

// Función principal: Procesar mensaje del usuario
export async function processUserMessage(phoneNumber, userMessage, userProfileName = '') {
  try {
    console.log(`🤖 Processing message from ${phoneNumber}: "${userMessage}"`);

    // 1. Obtener o crear perfil del companion
    let companion = await getCompanionProfile(phoneNumber);
    
    if (!companion) {
      // Primera vez - crear perfil básico
      companion = await createCompanionProfile(phoneNumber, userProfileName);
      return {
        response: `¡Hola ${userProfileName}! 👋 Soy Lupita, tu nueva amiga en SaludCompartida.\n\nEstoy aquí para conversar contigo cuando quieras, recordarte tus medicinas, y ser tu compañía.\n\n¿Me cuentas un poco de ti? ¿Cómo te gusta que te llame?`,
        isOnboarding: true
      };
    }

    // 2. Guardar mensaje del usuario en historial
    await saveConversation(companion.user_id, 'user', userMessage);

    // 3. Obtener memoria relevante (últimas conversaciones + temas importantes)
    const memory = await getRelevantMemory(companion.user_id);

    // 4. Verificar si hay recordatorios pendientes
    const pendingReminders = await checkPendingReminders(companion.user_id);

    // 5. Construir prompt para GPT-4
    const personality = COMPANION_PERSONALITIES[companion.companion_personality] || COMPANION_PERSONALITIES.lupita_cariñosa;
    const gptMessages = buildGPTPrompt(companion, memory, userMessage, pendingReminders, personality);

    // 6. Llamar a OpenAI GPT-4
    const aiResponse = await callOpenAI(gptMessages);

    // 7. Guardar respuesta del AI
    await saveConversation(companion.user_id, 'ai', aiResponse);

    // 8. Analizar y actualizar memoria (topics, emociones)
    await updateMemory(companion.user_id, userMessage, aiResponse);

    // 9. Actualizar última interacción
    await updateLastInteraction(companion.user_id);

    console.log(`✅ AI Response generated for ${phoneNumber}`);
    
    return {
      response: aiResponse,
      isOnboarding: false
    };

  } catch (error) {
    console.error('❌ Error processing message:', error);
    return {
      response: 'Ay disculpa mi vida, tuve un problemita técnico. ¿Me puedes repetir lo que me decías?',
      error: true
    };
  }
}

// Obtener perfil del companion
async function getCompanionProfile(phoneNumber) {
  const { data, error } = await supabase
    .from('ai_companions')
    .select('*')
    .eq('phone_number', phoneNumber)
    .eq('active', true)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching companion:', error);
  }

  return data;
}

// Crear nuevo perfil de companion
async function createCompanionProfile(phoneNumber, userName) {
  const userId = `user_${phoneNumber.replace(/\D/g, '')}`;
  
  const { data, error } = await supabase
    .from('ai_companions')
    .insert({
      user_id: userId,
      phone_number: phoneNumber,
      user_name: userName || 'Amigo',
      companion_name: 'Lupita',
      companion_personality: 'lupita_cariñosa',
      onboarding_completed: false
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating companion:', error);
    throw error;
  }

  return data;
}

// Obtener memoria relevante
async function getRelevantMemory(userId) {
  // Últimas 5 conversaciones
  const { data: recentConversations } = await supabase
    .from('companion_conversations')
    .select('*')
    .eq('user_id', userId)
    .order('timestamp', { ascending: false })
    .limit(5);

  // Temas importantes (alta importancia o follow-up pendiente)
  const { data: importantTopics } = await supabase
    .from('companion_memory')
    .select('*')
    .eq('user_id', userId)
    .or('importance.gte.4,follow_up_needed.eq.true')
    .order('last_mentioned', { ascending: false })
    .limit(5);

  return {
    recentConversations: recentConversations || [],
    importantTopics: importantTopics || []
  };
}

// Verificar recordatorios pendientes
async function checkPendingReminders(userId) {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM

  const { data: reminders } = await supabase
    .from('medication_reminders')
    .select('*')
    .eq('user_id', userId)
    .eq('active', true)
    .contains('times', [currentTime]); // Busca si la hora actual está en el array

  return reminders || [];
}

// Construir prompt para GPT-4
function buildGPTPrompt(companion, memory, userMessage, reminders, personality) {
  let contextString = `INFORMACIÓN DEL USUARIO:\n`;
  contextString += `- Nombre: ${companion.user_name}\n`;
  contextString += `- Edad: ${companion.user_age || 'no especificada'}\n`;
  
  if (companion.user_interests && companion.user_interests.length > 0) {
    contextString += `- Intereses: ${companion.user_interests.join(', ')}\n`;
  }

  // Agregar temas importantes de memoria
  if (memory.importantTopics.length > 0) {
    contextString += `\nTEMAS IMPORTANTES QUE ${companion.user_name.toUpperCase()} HA COMPARTIDO:\n`;
    memory.importantTopics.forEach(topic => {
      contextString += `- ${topic.topic}: ${topic.content}\n`;
      if (topic.follow_up_needed && topic.follow_up_question) {
        contextString += `  → Pendiente preguntar: ${topic.follow_up_question}\n`;
      }
    });
  }

  // Agregar contexto de conversaciones recientes
  if (memory.recentConversations.length > 0) {
    contextString += `\nÚLTIMAS CONVERSACIONES:\n`;
    memory.recentConversations.reverse().forEach(conv => {
      const who = conv.message_from === 'user' ? companion.user_name : personality.name;
      contextString += `${who}: ${conv.message_content}\n`;
    });
  }

  // Agregar recordatorios si aplica
  if (reminders.length > 0) {
    contextString += `\n⚠️ RECORDATORIOS PENDIENTES:\n`;
    reminders.forEach(r => {
      contextString += `- ${r.medication_name} (${r.dosage}) - Hora: ${r.times.join(', ')}\n`;
    });
    contextString += `Incluye el recordatorio de forma natural y cariñosa en tu respuesta.\n`;
  }

  return [
    {
      role: 'system',
      content: personality.systemPrompt + '\n\n' + contextString
    },
    {
      role: 'user',
      content: userMessage
    }
  ];
}

// Llamar a OpenAI API
async function callOpenAI(messages) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: messages,
      temperature: 0.8, // Más creativo y natural
      max_tokens: 300, // Respuestas concisas
      presence_penalty: 0.6, // Evita repeticiones
      frequency_penalty: 0.3
    })
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('OpenAI API Error:', error);
    throw new Error('OpenAI API request failed');
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

// Guardar conversación
async function saveConversation(userId, messageFrom, messageContent) {
  await supabase
    .from('companion_conversations')
    .insert({
      user_id: userId,
      message_from: messageFrom,
      message_content: messageContent
    });
}

// Actualizar memoria (detectar topics importantes)
async function updateMemory(userId, userMessage, aiResponse) {
  // TODO: Implementar análisis con GPT para detectar:
  // - Nuevos topics mencionados
  // - Emociones del usuario
  // - Necesidad de follow-up
  
  // Por ahora, solo log
  console.log(`📝 Memory update needed for ${userId}`);
}

// Actualizar última interacción
async function updateLastInteraction(userId) {
  await supabase
    .from('ai_companions')
    .update({ updated_at: new Date().toISOString() })
    .eq('user_id', userId);
}

export { COMPANION_PERSONALITIES };
