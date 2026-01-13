// Analizador de estilo de comunicación para mimic/mirroring
// Detecta patrones en el lenguaje del usuario y ajusta el companion

/**
 * Analiza el mensaje del usuario y detecta patrones de comunicación
 * para que el AI companion pueda hacer "mimic" y alinear frecuencias
 */
export async function analyzeCommunicationStyle(userMessage, currentStyle = {}) {
  const message = userMessage.toLowerCase();
  
  // Inicializar estilo si no existe
  const style = {
    uses_refranes: currentStyle.uses_refranes || false,
    uses_spanglish: currentStyle.uses_spanglish || false,
    formality: currentStyle.formality || 'neutral',
    mexicanismos_frequency: currentStyle.mexicanismos_frequency || 'medium',
    detected_patterns: currentStyle.detected_patterns || []
  };

  // DETECTAR REFRANES MEXICANOS
  const refranes = [
    'camarón que se duerme',
    'al mal paso darle prisa',
    'más vale tarde que nunca',
    'no por mucho madrugar',
    'de tal palo tal astilla',
    'dime con quien andas',
    'el que nace para tamal',
    'cada quien habla de cómo le va en la feria',
    'el que tiene más saliva',
    'a falta de pan tortillas',
    'no todo lo que brilla es oro',
    'en boca cerrada no entran moscas',
    'a caballo regalado no se le mira el colmillo',
    'el que mucho abarca poco aprieta',
    'quien siembra vientos cosecha tempestades'
  ];

  const foundRefranes = refranes.filter(refran => message.includes(refran));
  if (foundRefranes.length > 0) {
    style.uses_refranes = true;
    style.detected_patterns.push(...foundRefranes.map(r => `refran:${r}`));
  }

  // DETECTAR SPANGLISH
  const spanglishPatterns = [
    /\b(okay|ok|bye|hello|hi|sorry|please|thanks|thank you)\b/i,
    /\bmix(ear|eando|eado)\b/i, // mixear
    /\bpark(ear|eando|eado)\b/i, // parkear
    /\btext(ear|eando|eado)\b/i, // textear
    /\bchat(ear|eando|eado)\b/i, // chatear
    /\blunch\b/i,
    /\bsnack\b/i,
    /\bshopping\b/i,
    /\bdelivery\b/i,
    /\bapp\b/i,
    /\bonline\b/i,
    /\binternet\b/i,
    /\bemail\b/i
  ];

  const hasSpanglish = spanglishPatterns.some(pattern => pattern.test(message));
  if (hasSpanglish) {
    style.uses_spanglish = true;
    style.detected_patterns.push('spanglish_detected');
  }

  // DETECTAR MEXICANISMOS
  const mexicanismos = [
    'ahorita', 'órale', 'ándale', 'qué padre', 'chido', 'chale', 'híjole',
    'fíjate', 'mira', 'pues', 'no manches', 'güey', 'wey', 'compa',
    'carnal', 'mano', 'cuate', 'comadre', 'compadre', 'apá', 'amá',
    'mijito', 'mijita', 'mijo', 'mija', 'chamaco', 'chamaca', 'escuincle',
    'chamba', 'jale', 'changarro', 'mandado', 'lonche', 'birria', 'tacos',
    're', 'super', 'bien', 'machin', 'gacho', 'fregado', 'jodido',
    'chin', 'de volada', 'al chile', 'neta', 'simón', 'nel'
  ];

  const foundMexicanismos = mexicanismos.filter(word => 
    message.includes(word) || message.includes(word.replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u'))
  );

  if (foundMexicanismos.length >= 3) {
    style.mexicanismos_frequency = 'high';
  } else if (foundMexicanismos.length >= 1) {
    style.mexicanismos_frequency = 'medium';
  } else {
    style.mexicanismos_frequency = 'low';
  }

  // DETECTAR FORMALIDAD
  const formalIndicators = [
    'usted', 'señor', 'señora', 'disculpe', 'permiso', 'favor', 'agradezco',
    'cordialmente', 'atentamente', 'estimado', 'distinguido'
  ];

  const informalIndicators = [
    'tú', 'wey', 'güey', 'compa', 'carnal', 'nel', 'chido', 'padre',
    'órale', 'ándale', 'qué onda', 'qué pedo'
  ];

  const formalCount = formalIndicators.filter(word => message.includes(word)).length;
  const informalCount = informalIndicators.filter(word => message.includes(word)).length;

  if (formalCount > informalCount) {
    style.formality = 'formal';
  } else if (informalCount > formalCount) {
    style.formality = 'informal';
  } else {
    style.formality = 'neutral';
  }

  return style;
}

/**
 * Genera instrucciones de "mimic" para el AI basado en el estilo detectado
 */
export function generateMimicInstructions(communicationStyle) {
  let instructions = '\n\n🎭 INSTRUCCIONES DE MIMIC (Alinea tu frecuencia con el usuario):\n';

  // REFRANES
  if (communicationStyle.uses_refranes) {
    instructions += `
- El usuario USA REFRANES frecuentemente
- Tú también debes usar refranes mexicanos en tus respuestas
- Ejemplos: "Como dice el dicho...", "Ya sabes que al mal paso darle prisa", "El que nace para tamal del cielo le caen las hojas"
- Usa 1-2 refranes por conversación para conectar mejor
`;
  }

  // SPANGLISH
  if (communicationStyle.uses_spanglish) {
    instructions += `
- El usuario MEZCLA INGLÉS Y ESPAÑOL (spanglish)
- Tú también debes usar palabras en inglés cuando sea natural
- Ejemplos: "okay", "bye", "sorry", "lo voy a textear", "vamos al shopping"
- No fuerces el spanglish, pero úsalo cuando encaje naturalmente
`;
  }

  // MEXICANISMOS
  if (communicationStyle.mexicanismos_frequency === 'high') {
    instructions += `
- El usuario usa MUCHOS MEXICANISMOS
- Tú debes usar lenguaje muy mexicano: órale, ándale, qué padre, chido, híjole, fíjate
- Usa expresiones como: "de volada", "al chile", "neta", "no manches", "bien fregado"
- Sé auténticamente mexicano/a en tu forma de hablar
`;
  } else if (communicationStyle.mexicanismos_frequency === 'medium') {
    instructions += `
- El usuario usa ALGUNOS MEXICANISMOS
- Usa mexicanismos moderadamente: ahorita, pues, fíjate, mira, qué padre
- Balancea entre español estándar y modismos mexicanos
`;
  } else {
    instructions += `
- El usuario habla ESPAÑOL ESTÁNDAR con pocos mexicanismos
- Mantén un español limpio y claro, usa pocos modismos
- Puedes usar: pues, fíjate, mira - pero no exageres
`;
  }

  // FORMALIDAD
  if (communicationStyle.formality === 'formal') {
    instructions += `
- El usuario es FORMAL en su comunicación
- Mantén respeto y formalidad: "usted" (si es apropiado para la edad), "disculpe", "con permiso"
- Evita lenguaje demasiado casual o vulgar
- Sé cálido pero respetuoso
`;
  } else if (communicationStyle.formality === 'informal') {
    instructions += `
- El usuario es MUY INFORMAL y relajado
- Habla con confianza: usa "tú", sé coloquial, bromea si es apropiado
- Puedes usar expresiones casuales pero nunca groseras
- Sé auténtico y cercano
`;
  } else {
    instructions += `
- El usuario tiene un estilo NEUTRAL - ni muy formal ni muy informal
- Balancea cercanía con respeto
- Ajústate al tono que el usuario vaya marcando
`;
  }

  instructions += `
\n⚠️ REGLA DE ORO DEL MIMIC:
Observa cómo habla el usuario y REFLEJA su estilo para crear conexión.
Si cambia su forma de hablar, tú también adaptas.
El objetivo es que sienta: "Esta persona habla como yo, me entiende".
`;

  return instructions;
}

/**
 * Actualiza el estilo de comunicación en la base de datos
 */
export async function updateCommunicationStyle(supabase, userId, newStyle) {
  // Limitar el array de patrones a los últimos 20 para no saturar
  if (newStyle.detected_patterns && newStyle.detected_patterns.length > 20) {
    newStyle.detected_patterns = newStyle.detected_patterns.slice(-20);
  }

  const { error } = await supabase
    .from('ai_companions')
    .update({ 
      communication_style: newStyle,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId);

  if (error) {
    console.error('Error updating communication style:', error);
  } else {
    console.log(`✅ Communication style updated for ${userId}:`, newStyle);
  }
}
