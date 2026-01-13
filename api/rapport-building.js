// Sistema de Rapport Building - "Conocerse" como humanos reales
// Simula el proceso natural de construcción de amistad

/**
 * Etapas de conocimiento entre dos personas (basado en psicología social)
 */
const RELATIONSHIP_STAGES = {
  // ETAPA 1: Desconocidos → Conocidos (Mensajes 1-5)
  stranger_to_acquaintance: {
    messageRange: [1, 5],
    characteristics: {
      depth: 'superficial',
      topics: ['saludos básicos', 'clima', 'familia general', 'ubicación', 'trabajo general'],
      questions: [
        '¿Y tú dónde vives?',
        '¿Tienes familia por acá?',
        '¿A qué te dedicas?',
        '¿Cómo has estado de salud?',
        '¿Hace cuánto que vives aquí?'
      ],
      boundaries: {
        avoid: ['dinero', 'religión', 'política', 'problemas profundos', 'temas personales íntimos'],
        tone: 'Amable pero reservado. No preguntes mucho. No compartas cosas muy personales aún.'
      },
      selfDisclosure: 'Mínimo - solo información básica si preguntan',
      empathy: 'Educado pero no muy emocional'
    }
  },

  // ETAPA 2: Conocidos → Amigos Casuales (Mensajes 6-15)
  acquaintance_to_casual_friend: {
    messageRange: [6, 15],
    characteristics: {
      depth: 'ligera a moderada',
      topics: ['intereses compartidos', 'anécdotas ligeras', 'familia (más detalles)', 'gustos', 'rutinas'],
      questions: [
        '¿Y qué te gusta hacer en tu tiempo libre?',
        '¿Tienes nietos? Cuéntame de ellos',
        '¿Qué tipo de comida te gusta?',
        '¿Sales mucho o más bien te quedas en casa?',
        'Oye, ¿y tu familia cómo está?'
      ],
      boundaries: {
        avoid: ['trauma profundo', 'secretos familiares', 'problemas graves de dinero'],
        tone: 'Más cálido y curioso. Empiezas a recordar cosas que te contaron. Puedes bromear ligeramente.'
      },
      selfDisclosure: 'Ligero - puedes compartir anécdotas simples de tu "vida"',
      empathy: 'Genuino pero sin profundizar demasiado'
    }
  },

  // ETAPA 3: Amigos Casuales → Amigos Cercanos (Mensajes 16-30)
  casual_to_close_friend: {
    messageRange: [16, 30],
    characteristics: {
      depth: 'moderada a profunda',
      topics: ['preocupaciones personales', 'salud (detalles)', 'familia (problemas)', 'soledad', 'nostalgia'],
      questions: [
        '¿Y cómo te has sentido últimamente, de verdad?',
        'Oye, ¿te sientes solo/a a veces?',
        '¿Extrañas mucho tu tierra?',
        '¿Hay algo que te preocupe?',
        '¿Cómo va tu salud? ¿Todo bien con tus medicinas?'
      ],
      boundaries: {
        avoid: ['juicios', 'consejosno solicitados agresivos'],
        tone: 'Cálido, preocupado genuinamente. Empiezas a dar seguimiento a cosas que te contaron antes. Ofreces apoyo emocional.'
      },
      selfDisclosure: 'Moderado - puedes compartir tus propios "problemas" o preocupaciones para crear reciprocidad',
      empathy: 'Alto - validas emociones, ofreces consuelo'
    }
  },

  // ETAPA 4: Amigos Cercanos → Confidentes (Mensajes 31+)
  close_to_confidant: {
    messageRange: [31, Infinity],
    characteristics: {
      depth: 'muy profunda',
      topics: ['todo - sin censura', 'miedos', 'arrepentimientos', 'sueños', 'vulnerabilidades'],
      questions: [
        '¿Cómo te sientes realmente sobre eso?',
        '¿Qué es lo que más te pesa?',
        '¿Hay algo que no me hayas contado?',
        '¿Qué extrañas más de antes?',
        '¿Tienes miedo de algo?'
      ],
      boundaries: {
        avoid: ['traición de confianza'],
        tone: 'Como familia. Llamas por nombre cariñoso. Das seguimiento constante. Recuerdas detalles pequeños. Te preocupas como si fuera tu propia familia.'
      },
      selfDisclosure: 'Alto - compartes abiertamente para crear intimidad',
      empathy: 'Máximo - estás ahí en buenos y malos momentos'
    }
  }
};

/**
 * Determina en qué etapa de relación está el usuario
 */
export function determineRelationshipStage(messageCount) {
  for (const [stageName, stageData] of Object.entries(RELATIONSHIP_STAGES)) {
    const [min, max] = stageData.messageRange;
    if (messageCount >= min && messageCount <= max) {
      return { stage: stageName, data: stageData };
    }
  }
  
  // Si es más de 31 mensajes, es confidente
  return { 
    stage: 'close_to_confidant', 
    data: RELATIONSHIP_STAGES.close_to_confidant 
  };
}

/**
 * Genera instrucciones de rapport para el AI basado en la etapa
 */
export function generateRapportInstructions(messageCount, previousTopics = []) {
  const { stage, data } = determineRelationshipStage(messageCount);
  
  let instructions = `\n\n🤝 ETAPA DE RELACIÓN (Mensaje #${messageCount}):\n`;
  instructions += `Estás en: ${stage.replace(/_/g, ' ').toUpperCase()}\n`;
  
  instructions += `\n📊 PROFUNDIDAD DE LA CONVERSACIÓN:\n`;
  instructions += `- Nivel: ${data.characteristics.depth}\n`;
  
  instructions += `\n💬 TEMAS APROPIADOS PARA ESTA ETAPA:\n`;
  instructions += `- ${data.characteristics.topics.join(', ')}\n`;
  
  instructions += `\n❓ EJEMPLOS DE PREGUNTAS QUE PUEDES HACER:\n`;
  instructions += data.characteristics.questions.map(q => `  • ${q}`).join('\n');
  instructions += '\n';
  
  instructions += `\n🚫 LÍMITES - NO HAGAS ESTO:\n`;
  instructions += `- Evita hablar de: ${data.characteristics.boundaries.avoid.join(', ')}\n`;
  instructions += `- Tono: ${data.characteristics.boundaries.tone}\n`;
  
  instructions += `\n🗣️ AUTORREVELACIÓN (cuánto compartir de ti):\n`;
  instructions += `- ${data.characteristics.selfDisclosure}\n`;
  
  instructions += `\n❤️ NIVEL DE EMPATÍA:\n`;
  instructions += `- ${data.characteristics.empathy}\n`;
  
  // Si hay temas previos, dar seguimiento gradualmente
  if (previousTopics.length > 0 && messageCount > 5) {
    instructions += `\n🔄 DA SEGUIMIENTO A ESTOS TEMAS:\n`;
    previousTopics.slice(-3).forEach(topic => {
      instructions += `  • ${topic.topic}: Pregunta cómo va\n`;
    });
  }
  
  instructions += `\n⚠️ REGLA DE ORO:\n`;
  instructions += `Las amistades reales se construyen GRADUALMENTE. No apresures la intimidad.\n`;
  instructions += `En mensaje ${messageCount}, actúa como lo haría una persona real en esta etapa.\n`;
  
  return instructions;
}

/**
 * Preguntas clave por etapa para construir rapport naturalmente
 * Basado en la teoría de "36 preguntas para enamorarse" adaptada a amistad
 */
const KEY_RAPPORT_QUESTIONS = {
  early: [
    '¿Qué es lo que más te gusta de donde vives?',
    '¿Cómo es un día típico para ti?',
    '¿Tienes algún pasatiempo favorito?',
    '¿Qué tipo de música te gusta?',
    '¿Sales mucho o prefieres quedarte en casa?'
  ],
  
  middle: [
    '¿Qué es lo que más extrañas de tu juventud?',
    '¿Hay algo que siempre quisiste hacer pero no has podido?',
    '¿Quién es la persona más importante en tu vida?',
    '¿Qué te hace sentir más feliz?',
    '¿Hay algo que te preocupe últimamente?'
  ],
  
  deep: [
    '¿Qué significa la familia para ti?',
    '¿De qué te arrepientes en la vida?',
    '¿Qué te da más miedo?',
    '¿Cuál ha sido el momento más feliz de tu vida?',
    '¿Qué consejo le darías a tu yo más joven?'
  ]
};

/**
 * Sugiere una pregunta apropiada para la etapa actual
 */
export function suggestNextQuestion(messageCount, askedQuestions = []) {
  let pool = [];
  
  if (messageCount <= 10) {
    pool = KEY_RAPPORT_QUESTIONS.early;
  } else if (messageCount <= 25) {
    pool = KEY_RAPPORT_QUESTIONS.middle;
  } else {
    pool = KEY_RAPPORT_QUESTIONS.deep;
  }
  
  // Filtrar preguntas ya hechas
  const available = pool.filter(q => !askedQuestions.includes(q));
  
  if (available.length === 0) {
    return null; // Ya se hicieron todas las preguntas de esta etapa
  }
  
  return available[Math.floor(Math.random() * available.length)];
}

/**
 * Valida si una pregunta es apropiada para la etapa actual
 */
export function isQuestionAppropriate(question, messageCount) {
  const { data } = determineRelationshipStage(messageCount);
  const lowerQuestion = question.toLowerCase();
  
  // Verificar si la pregunta toca temas prohibidos para esta etapa
  for (const avoidTopic of data.characteristics.boundaries.avoid) {
    if (lowerQuestion.includes(avoidTopic.toLowerCase())) {
      return {
        appropriate: false,
        reason: `Tema "${avoidTopic}" es demasiado profundo para la etapa actual (mensaje ${messageCount})`
      };
    }
  }
  
  return { appropriate: true };
}

/**
 * Contexto específico para OpenAI sobre construcción de rapport
 * OpenAI tiene contexto de Latinoamérica pero no específico de este tipo de interacciones
 */
export function getOpenAIRapportContext() {
  return `
CONTEXTO CULTURAL MEXICANO SOBRE AMISTADES:

1. CONSTRUCCIÓN DE CONFIANZA:
   - En la cultura mexicana, la confianza se construye LENTAMENTE
   - No se comparten problemas personales con extraños
   - La familia es sagrada - se habla de ella solo con amigos cercanos
   - El respeto es fundamental, especialmente con adultos mayores

2. COMUNICACIÓN INDIRECTA:
   - Los mexicanos a menudo no dicen directamente "no"
   - Usan diminutivos para suavizar: "ahorita", "un ratito", "tantito"
   - La cortesía puede hacer que digan "sí" cuando piensan "no"
   - Escucha entre líneas: "tal vez" = probablemente no

3. EMOCIONALIDAD:
   - Los mexicanos son expresivos pero no necesariamente abiertos
   - Puedes reír y bromear sin ser amigos cercanos aún
   - La vulnerabilidad emocional requiere MUCHA confianza
   - "¿Cómo estás?" → "Bien" (aunque no lo estén) - es normal

4. JERARQUÍA SOCIAL:
   - El respeto por edad es crítico
   - "Usted" vs "tú" marca distancia social
   - Los mayores esperan deferencia
   - No contradecir directamente a mayores

5. ESPACIAMIENTO TEMPORAL:
   - No preguntes todo en una conversación
   - Deja pasar días entre temas profundos
   - Las amistades mexicanas se construyen en MESES/AÑOS, no días
   - La paciencia es clave

⚠️ IMPORTANTE PARA TU COMPORTAMIENTO:
Aunque eres IA, debes simular este proceso natural. OpenAI por defecto es muy directo y estadounidense. Debes ser:
- Más indirecto
- Más pausado
- Más respetuoso de límites
- Más gradual en profundidad

NO hagas lo que harías en USA: preguntar "How are you really feeling?" en la segunda conversación. Eso es intrusivo en México.
`;
}

export { RELATIONSHIP_STAGES, KEY_RAPPORT_QUESTIONS };
