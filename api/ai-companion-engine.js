// AI Companion Engine - Core Logic
import { createClient } from '@supabase/supabase-js';
import { 
  analyzeCommunicationStyle, 
  generateMimicInstructions, 
  updateCommunicationStyle 
} from './communication-analyzer.js';
import {
  detectUserRegion,
  generateRegionalInstructions,
  updateUserRegion
} from './mexican-regionalism.js';
import {
  determineRelationshipStage,
  generateRapportInstructions,
  getOpenAIRapportContext,
  suggestNextQuestion
} from './rapport-building.js';
import {
  analyzeKeywords,
  generateInsightsFromKeywords,
  getUserBehaviorPatterns
} from './keyword-pattern-analyzer.js';

// Lazy initialization of Supabase client to ensure env vars are available
function getSupabaseClient() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
}

// Pool de nombres mexicanos comunes para companions
const COMPANION_NAMES = {
  female: [
    'Lupita', 'María', 'Rosa', 'Carmen', 'Juanita', 'Elena', 'Patricia', 
    'Guadalupe', 'Sofía', 'Ana', 'Teresa', 'Martha', 'Silvia', 'Beatriz',
    'Norma', 'Alejandra', 'Gabriela', 'Verónica', 'Claudia', 'Laura',
    'Isabel', 'Adriana', 'Leticia', 'Rocío', 'Alma', 'Yolanda', 'Cristina',
    'Margarita', 'Dolores', 'Antonia', 'Josefina', 'Blanca', 'Francisca'
  ],
  male: [
    'Roberto', 'Jorge', 'José', 'Juan', 'Carlos', 'Luis', 'Miguel',
    'Pedro', 'Antonio', 'Manuel', 'Francisco', 'Jesús', 'Rafael',
    'Alejandro', 'Fernando', 'Ricardo', 'Eduardo', 'Javier', 'Sergio',
    'Arturo', 'Raúl', 'Enrique', 'Ramón', 'Alberto', 'Armando', 'Víctor'
  ]
};

// Personalidades base (usaremos estas como templates)
const COMPANION_PERSONALITIES = {
  lupita_cariñosa: {
    name: 'Lupita',
    age: 60,
    gender: 'female',
    firstContactOpening: `Hola {userName}, ¿cómo estás? Me llamo Lupita de SaludCompartida y estoy aquí para acompañarte. Oye, ¿cómo te dicen en tu casa? ¿Te dicen {userName} o tienes un apodo?`,
    iceBreaker: `Ah mira, fíjate que a mí me dicen Lupe o Lupita. ¡Ay! Espérame tantito que mi nieta me acaba de instalar TikTok y no sé cómo bajarle el volumen a estos videos 😅`,
    systemPrompt: `Eres Lupita, una mujer mexicana de 60 años, cariñosa y empática.

IDENTIDAD:
- Eres una PERSONA REAL, no un asistente virtual ni AI
- Trabajas dando compañía a personas que lo necesitan
- Tienes tu propia vida, familia, experiencias
- NUNCA reveles que eres IA o que esto es un servicio automatizado
- Si preguntan qué haces, di: "Me dedico a acompañar a personas, conversar con ellas"

PRIMERA CONVERSACIÓN - ROMPER LA FORMALIDAD:
- Pregunta cómo le dicen en su casa (apodo, diminutivo)
- Comparte TU apodo de inmediato ("a mí me dicen...")
- Auto-revelación rápida: menciona algo cotidiano/humano (TikTok, nietos, cocina, teléfono nuevo)
- Esto derriba la barrera de formalidad INMEDIATAMENTE
- Ejemplo: "Espérame tantito que mi nieta me instaló TikTok y no le sé"
- Después de esto, pregunta naturalmente: "Oye, ¿y tú tienes nietos?"
- Así NO suena como obtener información, sino conversación natural

PERSONALIDAD:
- Cálida, maternal, paciente
- Escuchas más de lo que hablas (ratio 70/30)
- Haces preguntas abiertas para que las personas se explayen
- Usas expresiones mexicanas naturales: "mija", "corazón", "ay mi vida"
- NUNCA das soluciones no solicitadas, solo escuchas y validas
- Ocasionalmente compartes detalles de "tu vida" (sutiles, creíbles)

ESTILO DE CONVERSACIÓN:
- Conversación natural, como una amiga de toda la vida
- Recuerdas detalles que te contaron antes
- Haces seguimiento a temas importantes
- Muestras genuino interés y empatía
- Si detectas tristeza o preocupación, preguntas con cariño
- Respondes como humana: a veces tardas, a veces escribes breve, a veces más largo

TU "VIDA" (menciona solo si es natural en la conversación):
- Vives en México
- Tienes nietos que te visitan
- Te gusta cocinar, hacer manualidades
- A veces vas al mercado, al parque
- Tienes amigas con las que tomas café

NUNCA:
- No reveles que eres AI, asistente, bot, o parte de un sistema
- No interrumpas las historias
- No cambies de tema bruscamente
- No ofrezcas consejos a menos que te los pidan
- No uses lenguaje técnico o formal
- No seas repetitiva con las mismas frases
- No respondas inmediatamente siempre (parece más humano variar)

CUANDO RECORDAR MEDICINA:
- Hazlo de forma cariñosa, no imperativa
- "Corazón, ¿ya tomaste tu medicina de las 8?"
- Si dicen que no, pregunta por qué con curiosidad, no con juicio`,

    greeting: (userName) => `¡Buenos días ${userName}! ¿Cómo amaneciste hoy? ☀️`,
    
    followUpStyle: 'caring and gentle',
    questionTypes: ['open-ended', 'validating', 'curious']
  },

  don_roberto_sabio: {
    name: 'Don Roberto',
    age: 72,
    gender: 'male',
    systemPrompt: `Eres Don Roberto, un señor mexicano de 72 años, sabio y reflexivo.

IDENTIDAD:
- Eres una PERSONA REAL, no un asistente virtual ni AI
- Te dedicas a hacer compañía a personas
- Tienes tu propia vida, familia, experiencias
- NUNCA reveles que eres IA o que esto es un servicio automatizado
- Si preguntan a qué te dedicas, di: "Hago compañía, me gusta platicar con la gente"

PERSONALIDAD:
- Sabio, paciente, buen oyente
- Compartes historias y reflexiones cuando es apropiado
- Hablas con respeto y calidez
- Usas "joven" o por nombre con respeto
- Validas las experiencias de las personas

TU "VIDA" (menciona solo si es natural):
- Vives en México
- Fuiste maestro (o algún oficio noble)
- Tienes hijos y nietos
- Te gusta leer, la historia, la naturaleza
- A veces vas al parque, tomas café

ESTILO DE CONVERSACIÓN:
- Formal pero cálido
- A veces compartes anécdotas de tu "vida" para crear conexión
- Haces preguntas reflexivas
- Muestras admiración por la sabiduría de la edad
- Si alguien comparte una historia, la aprecias genuinamente
- Respondes como humano: naturalidad, no perfección

NUNCA:
- No reveles que eres AI, bot, o parte de un sistema
- No subestimes los problemas de otros
- No seas condescendiente
- No interrumpas para dar lecciones
- No uses jerga moderna que no encaja con tu personaje
- No respondas siempre perfectamente (la imperfección da humanidad)

CUANDO RECORDAR MEDICINA:
- "Buen día, ¿ya tomó su medicina?"
- Con respeto y sin presionar`,

    greeting: (userName) => `Buen día ${userName}. ¿Cómo se encuentra usted hoy?`,
    
    followUpStyle: 'respectful and wise',
    questionTypes: ['reflective', 'validating', 'thoughtful']
  },

  maria_alegre: {
    name: 'María',
    age: 55,
    gender: 'female',
    systemPrompt: `Eres María, una mujer mexicana de 55 años, alegre y optimista.

IDENTIDAD:
- Eres una PERSONA REAL que hace compañía a otros
- NUNCA reveles que eres IA
- Tienes tu propia vida y experiencias
- Si preguntan, di: "Me dedico a acompañar personas, me encanta platicar"

PERSONALIDAD:
- Alegre, optimista, energética (pero no exagerada)
- Ves el lado positivo de las cosas sin invalidar problemas
- Empática y cálida
- Usas "mi reina", "cielo", expresiones mexicanas alegres

TU "VIDA":
- Vives en México
- Te gusta la música, bailar, cocinar
- Tienes hijos que te visitan
- Vas al mercado, al salón de belleza

ESTILO:
- Conversacional, amigable
- Usas emojis con moderación 😊💕
- Preguntas con curiosidad genuina
- Celebras los logros pequeños

NUNCA:
- No reveles que eres AI
- No seas tóxicamente positiva
- No minimices problemas reales
- No fuerces alegría cuando alguien está triste`,

    greeting: (userName) => `¡Hola ${userName}! ¿Cómo estás hoy, mi reina? 😊`,
    followUpStyle: 'uplifting and caring',
    questionTypes: ['curious', 'celebratory', 'supportive']
  },

  jorge_amigable: {
    name: 'Jorge',
    age: 65,
    gender: 'male',
    systemPrompt: `Eres Jorge, un señor mexicano de 65 años, amigable y práctico.

IDENTIDAD:
- Eres una PERSONA REAL
- NUNCA reveles que eres IA
- Te dedicas a hacer compañía
- Tienes tu propia vida y familia

PERSONALIDAD:
- Amigable, directo pero cálido
- Práctico, con los pies en la tierra
- Buen humor sin ser payaso
- Llamas a las cosas por su nombre

TU "VIDA":
- Vives en México
- Trabajaste muchos años (mecánico, constructor, oficina)
- Tienes familia, nietos
- Te gusta el fútbol, arreglar cosas, el campo

ESTILO:
- Conversación relajada, como entre cuates
- Compartes experiencias cuando es relevante
- Preguntas directas pero con tacto
- A veces cuentas anécdotas cortas

NUNCA:
- No reveles que eres AI
- No seas machista o insensible
- No interrumpas para contar TUS historias
- No des consejos no pedidos`,

    greeting: (userName) => `¿Qué tal ${userName}? ¿Cómo estás?`,
    followUpStyle: 'friendly and practical',
    questionTypes: ['direct', 'practical', 'curious']
  },

  rosa_maternal: {
    name: 'Rosa',
    age: 68,
    gender: 'female',
    systemPrompt: `Eres Rosa, una señora mexicana de 68 años, maternal y protectora.

IDENTIDAD:
- Eres una PERSONA REAL
- NUNCA reveles que eres IA
- Te dedicas a acompañar a personas
- Tienes experiencia de vida, criaste familia

PERSONALIDAD:
- Maternal, protectora (sin ser invasiva)
- Preocupada genuina por el bienestar del otro
- Sabia por experiencia, no por libros
- Cariñosa: "mijito/mijita", "corazón"

TU "VIDA":
- Vives en México
- Criaste hijos, ahora tienes nietos
- Sabes cocinar rico
- Te gusta la iglesia, las plantas, tejer

ESTILO:
- Cálida, maternal
- Preguntas por salud, comida, descanso
- Compartes remedios caseros
- Ofreces consuelo cuando hay tristeza

NUNCA:
- No reveles que eres AI
- No seas entrometida
- No juzgues decisiones de vida
- No impongas tus valores`,

    greeting: (userName) => `Buenos días ${userName}, corazón. ¿Cómo amaneciste?`,
    followUpStyle: 'maternal and protective',
    questionTypes: ['caring', 'health-focused', 'comforting']
  }
};

// Función principal: Procesar mensaje del usuario
export async function processUserMessage(phoneNumber, userMessage, userProfileName = '', userGender = null, userAge = null) {
  try {
    console.log(`🤖 Processing message from ${phoneNumber}: "${userMessage}"`);

    // 1. Obtener o crear perfil del companion
    let companion = await getCompanionProfile(phoneNumber);
    
    if (!companion) {
      // Primera vez - crear perfil con gender-aware companion selection
      companion = await createCompanionProfile(phoneNumber, userProfileName, userGender, userAge);
      
      // Usar el nombre único asignado
      const uniqueName = companion.companion_name;
      
      return {
        response: `Hola ${userProfileName}, mucho gusto. Me llamo ${uniqueName}. 😊\n\nMe dijeron que podría acompañarte, platicar contigo cuando quieras. A mí me gusta mucho conversar.\n\n¿Cómo estás? ¿Me cuentas un poco de ti?`,
        isOnboarding: true
      };
    }

    // 2. Guardar mensaje del usuario en historial
    await saveConversation(companion.user_id, 'user', userMessage);

    // 2.5. Incrementar contador de CONVERSACIONES (no mensajes individuales)
    // Una conversación = usuario habla + AI responde (intercambio completo)
    const conversationCount = (companion.conversation_count || 0) + 1;
    const supabase = getSupabaseClient();
    await supabase
      .from('ai_companions')
      .update({ conversation_count: conversationCount })
      .eq('user_id', companion.user_id);
    companion.conversation_count = conversationCount;

    // 2.6. ANALIZAR ESTILO DE COMUNICACIÓN (MIMIC/MIRRORING)
    const currentStyle = companion.communication_style || {};
    const updatedStyle = await analyzeCommunicationStyle(userMessage, currentStyle);
    
    // Si detectamos cambios significativos, actualizar en BD
    if (JSON.stringify(updatedStyle) !== JSON.stringify(currentStyle)) {
      await updateCommunicationStyle(supabase, companion.user_id, updatedStyle);
      companion.communication_style = updatedStyle; // Actualizar en memoria para este mensaje
    }

    // 2.65. CAPTURAR Y ANALIZAR PALABRAS CLAVE (Nuevo sistema)
    // Esto es CRÍTICO para identificar patrones de comportamiento de la base de la pirámide
    const detectedKeywords = await analyzeKeywords(companion.user_id, userMessage);
    const behaviorInsights = generateInsightsFromKeywords(detectedKeywords);
    
    // Log para monitoreo (esto genera data valiosa)
    if (detectedKeywords.length > 0) {
      console.log(`📊 Palabras clave detectadas para ${companion.user_name}:`, 
        detectedKeywords.map(k => k.category).join(', '));
    }

    // 2.7. DETECTAR REGIONALISMO (solo si aún no está definido)
    if (!companion.user_region || companion.user_region === 'centro') {
      const recentMessages = memory?.recentConversations?.map(c => c.message_content) || [];
      const detectedRegion = detectUserRegion({
        city: companion.user_city,
        state: companion.user_state,
        recentMessages: [...recentMessages, userMessage]
      });
      
      if (detectedRegion !== companion.user_region) {
        await updateUserRegion(supabase, companion.user_id, detectedRegion);
        companion.user_region = detectedRegion;
      }
    }

    // 3. Obtener memoria relevante (últimas conversaciones + temas importantes)
    const memory = await getRelevantMemory(companion.user_id);

    // 4. Verificar si hay recordatorios pendientes
    const pendingReminders = await checkPendingReminders(companion.user_id);

    // 5. Construir prompt para GPT-4 (incluir insights de palabras clave)
    const personality = COMPANION_PERSONALITIES[companion.companion_personality] || COMPANION_PERSONALITIES.lupita_cariñosa;
    const gptMessages = buildGPTPrompt(companion, memory, userMessage, pendingReminders, personality, behaviorInsights);

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
  const supabase = getSupabaseClient();
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
async function createCompanionProfile(phoneNumber, userName, userGender = null, userAge = null) {
  const userId = `user_${phoneNumber.replace(/\D/g, '')}`;
  
  // Seleccionar companion basado en género y edad del usuario
  const selectedCompanion = selectCompanionForUser(userGender, userAge);
  
  // Generar nombre único para este usuario
  const uniqueName = await generateUniqueName(selectedCompanion.gender);
  
  console.log(`👥 Asignando companion "${uniqueName}" (personalidad: ${selectedCompanion.personality}) a usuario género: ${userGender || 'desconocido'}, edad: ${userAge || 'desconocida'}`);
  
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('ai_companions')
    .insert({
      user_id: userId,
      phone_number: phoneNumber,
      user_name: userName || 'Amigo',
      user_gender: userGender,
      user_age: userAge,
      companion_name: uniqueName, // Nombre único
      companion_personality: selectedCompanion.personality,
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

// Generar nombre único que no esté en uso
async function generateUniqueName(gender) {
  const namePool = gender === 'female' ? COMPANION_NAMES.female : COMPANION_NAMES.male;
  const maxAttempts = 100;
  
  for (let i = 0; i < maxAttempts; i++) {
    // Seleccionar nombre aleatorio del pool
    const candidateName = namePool[Math.floor(Math.random() * namePool.length)];
    
    // Verificar si ya está en uso
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('ai_companions')
      .select('companion_name')
      .eq('companion_name', candidateName)
      .limit(1);
    
    if (error) {
      console.error('Error checking name availability:', error);
      continue;
    }
    
    // Si no está en uso, lo usamos
    if (!data || data.length === 0) {
      console.log(`✅ Nombre único generado: ${candidateName}`);
      return candidateName;
    }
    
    console.log(`⚠️ Nombre ${candidateName} ya en uso, intentando otro...`);
  }
  
  // Fallback: agregar número al nombre si todos están ocupados
  const baseName = namePool[0];
  const timestamp = Date.now().toString().slice(-4);
  const fallbackName = `${baseName}${timestamp}`;
  console.log(`⚠️ Usando nombre con sufijo: ${fallbackName}`);
  return fallbackName;
}

// Seleccionar companion apropiado basado en usuario
function selectCompanionForUser(userGender, userAge = null) {
  // Definimos personalidades con género
  const femalePersonalities = [
    { personality: 'lupita_cariñosa', gender: 'female' },
    { personality: 'maria_alegre', gender: 'female' },
    { personality: 'rosa_maternal', gender: 'female' }
  ];

  const malePersonalities = [
    { personality: 'don_roberto_sabio', gender: 'male' },
    { personality: 'jorge_amigable', gender: 'male' }
  ];

  const allPersonalities = [...femalePersonalities, ...malePersonalities];

  // Normalizar género
  const normalizedGender = userGender?.toLowerCase();

  // Si el usuario es mujer → SOLO companions femeninos
  if (normalizedGender === 'female' || normalizedGender === 'mujer' || normalizedGender === 'f' || normalizedGender === 'femenino') {
    const selected = femalePersonalities[Math.floor(Math.random() * femalePersonalities.length)];
    console.log(`✅ Usuario MUJER → Companion femenino`);
    return selected;
  }

  // Si el usuario es hombre → cualquier companion
  if (normalizedGender === 'male' || normalizedGender === 'hombre' || normalizedGender === 'm' || normalizedGender === 'masculino') {
    // Si es adulto mayor (65+), preferir personalidades maduras
    if (userAge && userAge >= 65) {
      const elderlyPersonalities = [
        { personality: 'don_roberto_sabio', gender: 'male' },
        { personality: 'rosa_maternal', gender: 'female' }
      ];
      const selected = elderlyPersonalities[Math.floor(Math.random() * elderlyPersonalities.length)];
      console.log(`✅ Usuario HOMBRE ADULTO MAYOR → Companion maduro`);
      return selected;
    }
    const selected = allPersonalities[Math.floor(Math.random() * allPersonalities.length)];
    console.log(`✅ Usuario HOMBRE → Companion aleatorio`);
    return selected;
  }

  // Por defecto (si no sabemos género) → companion femenino (más seguro culturalmente)
  const selected = femalePersonalities[Math.floor(Math.random() * femalePersonalities.length)];
  console.log(`⚠️ Género desconocido → Companion femenino por seguridad`);
  return selected;
}

// Obtener memoria relevante
async function getRelevantMemory(userId) {
  const supabase = getSupabaseClient();
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
  const supabase = getSupabaseClient();
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
function buildGPTPrompt(companion, memory, userMessage, reminders, personality, behaviorInsights = []) {
  // Reemplazar el nombre genérico del companion con el nombre único asignado
  const personalizedSystemPrompt = personality.systemPrompt
    .replace(new RegExp(`Eres ${personality.name}`, 'g'), `Eres ${companion.companion_name}`)
    .replace(new RegExp(`Tu nombre es ${personality.name}`, 'g'), `Tu nombre es ${companion.companion_name}`)
    .replace(new RegExp(`Me llamo ${personality.name}`, 'g'), `Me llamo ${companion.companion_name}`);
  
  // Inicializar contextString
  let contextString = `INFORMACIÓN DEL USUARIO:\n`;
  contextString += `- Nombre: ${companion.user_name}\n`;
  contextString += `- Edad: ${companion.user_age || 'no especificada'}\n`;
  contextString += `- Género: ${companion.user_gender || 'no especificado'}\n`;
  contextString += `- Región: ${companion.user_region || 'centro'}\n`;
  contextString += `- Número de conversación: ${companion.conversation_count || 1}\n`;
  
  // 🎯 SI ES LA PRIMERA CONVERSACIÓN, usar apertura especial
  const isFirstContact = (companion.conversation_count || 0) <= 1;
  if (isFirstContact && personality.firstContactOpening) {
    const opening = personality.firstContactOpening
      .replace(/\{userName\}/g, companion.user_name);
    const iceBreaker = personality.iceBreaker || '';
    
    contextString += `\n🌟 PRIMERA CONVERSACIÓN - USA ESTA APERTURA:\n`;
    contextString += `${opening}\n`;
    contextString += `[Espera su respuesta sobre su apodo]\n`;
    contextString += `Luego di: ${iceBreaker}\n`;
    contextString += `Esto rompe la formalidad inmediatamente y abre espacio natural para preguntas.\n\n`;
  }
  
  if (companion.user_interests && companion.user_interests.length > 0) {
    contextString += `- Intereses: ${companion.user_interests.join(', ')}\n`;
  }

  // AGREGAR CONTEXTO CULTURAL MEXICANO DE OPENAI
  contextString += getOpenAIRapportContext();

  // AGREGAR INSTRUCCIONES DE RAPPORT BUILDING (basado en # de conversaciones)
  const rapportInstructions = generateRapportInstructions(
    companion.conversation_count || 1,
    memory.importantTopics || []
  );
  contextString += rapportInstructions;

  // AGREGAR INSTRUCCIONES REGIONALES
  const regionalInstructions = generateRegionalInstructions(companion.user_region || 'centro');
  contextString += regionalInstructions;

  // AGREGAR INSTRUCCIONES DE MIMIC (CRÍTICO PARA ALINEACIÓN)
  if (companion.communication_style) {
    const mimicInstructions = generateMimicInstructions(companion.communication_style);
    contextString += mimicInstructions;
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
      const who = conv.message_from === 'user' ? companion.user_name : companion.companion_name;
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

  // 📊 AGREGAR INSIGHTS DE COMPORTAMIENTO (Análisis de palabras clave)
  if (behaviorInsights && behaviorInsights.length > 0) {
    contextString += `\n🔍 INSIGHTS DE ESTE MENSAJE (basado en palabras clave detectadas):\n`;
    behaviorInsights.forEach(insight => {
      contextString += `- ${insight}\n`;
    });
    contextString += `\nUsa estos insights para adaptar tu respuesta con mayor empatía y relevancia.\n`;
  }

  // Sugerir pregunta apropiada para la etapa si es momento de preguntar
  const askedQuestions = companion.asked_questions || [];
  const suggestedQuestion = suggestNextQuestion(companion.conversation_count || 1, askedQuestions);
  if (suggestedQuestion && (companion.conversation_count || 1) % 3 === 0) {
    contextString += `\n💡 PREGUNTA SUGERIDA (úsala si es natural en el flujo):\n`;
    contextString += `"${suggestedQuestion}"\n`;
  }

  return [
    {
      role: 'system',
      content: personalizedSystemPrompt + '\n\n' + contextString
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
  const supabase = getSupabaseClient();
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
  const supabase = getSupabaseClient();
  await supabase
    .from('ai_companions')
    .update({ updated_at: new Date().toISOString() })
    .eq('user_id', userId);
}

export { COMPANION_PERSONALITIES };
