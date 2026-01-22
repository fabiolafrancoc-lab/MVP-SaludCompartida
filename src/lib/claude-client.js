/**
 * CLAUDE API CLIENT
 * =================
 * Cliente para interactuar directamente con la API de Anthropic (Claude)
 * 
 * Casos de uso:
 * - Analizar transcripciones de conversaciones
 * - Detectar emociones y sentimientos
 * - Generar resúmenes inteligentes
 * - Chat directo con Claude
 */

import Anthropic from '@anthropic-ai/sdk';

// Inicializar cliente de Anthropic
let anthropic = null;

function getClient() {
  if (!anthropic) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY no está configurado en las variables de entorno');
    }
    
    anthropic = new Anthropic({
      apiKey: apiKey,
    });
  }
  
  return anthropic;
}

/**
 * Chat directo con Claude
 * @param {Array} messages - Array de mensajes [{role: 'user'|'assistant', content: '...'}]
 * @param {Object} options - Opciones adicionales
 * @returns {Promise<string>} - Respuesta de Claude
 */
export async function chatWithClaude(messages, options = {}) {
  const client = getClient();
  
  const response = await client.messages.create({
    model: options.model || 'claude-3-5-sonnet-20241022',
    max_tokens: options.maxTokens || 1024,
    temperature: options.temperature || 0.7,
    messages: messages,
    system: options.systemPrompt || 'Eres un asistente útil y amigable.'
  });
  
  return response.content[0].text;
}

/**
 * Analizar una conversación completa
 * @param {Array} transcript - Transcripción [{role: 'user'|'assistant', content: '...'}]
 * @returns {Promise<Object>} - Análisis de la conversación
 */
export async function analyzeConversation(transcript) {
  const client = getClient();
  
  // Convertir transcript a texto legible
  const conversationText = transcript
    .map(msg => `${msg.role === 'user' ? 'Usuario' : 'Lupita'}: ${msg.content}`)
    .join('\n');
  
  const analysisPrompt = `Analiza esta conversación entre Lupita (asistente de salud) y un usuario.

CONVERSACIÓN:
${conversationText}

Proporciona un análisis en JSON con:
1. sentiment: "positive", "negative", "neutral", "mixed"
2. topics: array de temas principales (ej: ["salud mental", "familia", "migración"])
3. emotions: array de emociones detectadas (ej: ["tristeza", "ansiedad", "esperanza"])
4. urgency: "low", "medium", "high", "critical"
5. summary: resumen en 2-3 oraciones
6. actionItems: array de acciones recomendadas
7. flags: array de alertas (ej: ["crisis", "suicidio", "violencia"])

Responde SOLO con el JSON, sin texto adicional.`;

  const response = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    temperature: 0.3, // Baja temperatura para análisis consistente
    messages: [
      { role: 'user', content: analysisPrompt }
    ]
  });
  
  const jsonText = response.content[0].text;
  
  try {
    return JSON.parse(jsonText);
  } catch (error) {
    console.error('Error parseando respuesta de Claude:', jsonText);
    throw new Error('Claude no retornó JSON válido');
  }
}

/**
 * Detectar emoción dominante en un mensaje
 * @param {string} text - Texto a analizar
 * @returns {Promise<string>} - Emoción detectada
 */
export async function detectEmotion(text) {
  const client = getClient();
  
  const emotionPrompt = `Analiza la emoción DOMINANTE en este mensaje:

"${text}"

Responde con UNA SOLA PALABRA entre:
- joy (alegría)
- sadness (tristeza)
- anger (enojo)
- fear (miedo)
- anxiety (ansiedad)
- hope (esperanza)
- neutral (neutro)

Responde SOLO con la palabra, nada más.`;

  const response = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 10,
    temperature: 0.2,
    messages: [
      { role: 'user', content: emotionPrompt }
    ]
  });
  
  return response.content[0].text.trim().toLowerCase();
}

/**
 * Generar resumen ejecutivo de múltiples conversaciones
 * @param {Array} conversations - Array de transcripciones
 * @returns {Promise<Object>} - Resumen ejecutivo
 */
export async function generateExecutiveSummary(conversations) {
  const client = getClient();
  
  const conversationsText = conversations
    .map((conv, i) => {
      const text = conv.transcript
        .map(msg => `${msg.role === 'user' ? 'Usuario' : 'Lupita'}: ${msg.content}`)
        .join('\n');
      return `--- CONVERSACIÓN ${i + 1} (${conv.date}) ---\n${text}`;
    })
    .join('\n\n');
  
  const summaryPrompt = `Genera un resumen ejecutivo de estas ${conversations.length} conversaciones entre Lupita y usuarios:

${conversationsText}

Proporciona en JSON:
1. totalConversations: número total
2. commonThemes: array de temas recurrentes
3. overallSentiment: sentimiento general
4. criticalCases: número de casos que requieren atención inmediata
5. recommendations: array de recomendaciones para el equipo
6. insights: observaciones clave sobre patrones

Responde SOLO con JSON.`;

  const response = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2048,
    temperature: 0.3,
    messages: [
      { role: 'user', content: summaryPrompt }
    ]
  });
  
  const jsonText = response.content[0].text;
  
  try {
    return JSON.parse(jsonText);
  } catch (error) {
    console.error('Error parseando respuesta de Claude:', jsonText);
    throw new Error('Claude no retornó JSON válido');
  }
}

/**
 * Mejorar un prompt de sistema
 * @param {string} currentPrompt - Prompt actual
 * @param {string} feedback - Feedback sobre qué mejorar
 * @returns {Promise<string>} - Prompt mejorado
 */
export async function improveSystemPrompt(currentPrompt, feedback) {
  const client = getClient();
  
  const improvementPrompt = `Eres un experto en diseño de prompts para asistentes de IA.

PROMPT ACTUAL:
${currentPrompt}

FEEDBACK:
${feedback}

Mejora el prompt incorporando el feedback. Mantén el mismo tono y objetivo, pero hazlo más efectivo.

Responde SOLO con el prompt mejorado, sin explicaciones adicionales.`;

  const response = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2048,
    temperature: 0.7,
    messages: [
      { role: 'user', content: improvementPrompt }
    ]
  });
  
  return response.content[0].text;
}

/**
 * Verificar si Claude está disponible
 * @returns {Promise<boolean>}
 */
export async function checkClaudeHealth() {
  try {
    const client = getClient();
    
    await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 10,
      messages: [
        { role: 'user', content: 'Hi' }
      ]
    });
    
    return true;
  } catch (error) {
    console.error('Claude health check failed:', error);
    return false;
  }
}

export default {
  chatWithClaude,
  analyzeConversation,
  detectEmotion,
  generateExecutiveSummary,
  improveSystemPrompt,
  checkClaudeHealth
};
