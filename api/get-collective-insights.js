/**
 * ENDPOINT: Obtener Recomendaciones Basadas en Aprendizaje Colectivo
 * 
 * Antes de una llamada, obtén recomendaciones basadas en TODO el ecosistema:
 * - Qué técnicas funcionan mejor
 * - Qué frases usar
 * - Qué patrones aplicar
 * 
 * Uso: POST /api/get-collective-insights
 * Body: { 
 *   context: "usuario preocupado por diabetes",
 *   userProfile: { conditions: ["diabetes"], emotionalState: "preocupado" }
 * }
 */

import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

function getSupabaseClient() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { context, userProfile } = req.body;

    if (!context) {
      return res.status(400).json({ error: 'Missing context' });
    }

    console.log('🧠 Getting collective insights for context:', context);

    const supabase = getSupabaseClient();

    // 1. Generar embedding del contexto
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: context
    });

    const queryEmbedding = embeddingResponse.data[0].embedding;

    // 2. Buscar llamadas similares exitosas
    const { data: similarCalls } = await supabase.rpc('search_similar_calls', {
      query_embedding: queryEmbedding,
      min_quality_rating: 4,
      similarity_threshold: 0.7,
      result_limit: 10
    });

    console.log(`✅ Found ${similarCalls?.length || 0} similar successful calls`);

    // 3. Obtener técnicas más efectivas del ecosistema
    const { data: topTechniques } = await supabase
      .rpc('get_most_effective_techniques', { min_usage_count: 5 });

    // 4. Obtener frases poderosas del ecosistema
    const { data: topPhrases } = await supabase
      .rpc('get_most_powerful_phrases', { min_usage_count: 3 });

    // 5. Obtener knowledge base activo relevante
    const { data: knowledgeBase } = await supabase
      .from('active_knowledge')
      .select('*')
      .limit(20);

    // 6. Analizar con GPT-4 para sintetizar recomendaciones
    const analysisPrompt = `Eres un experto en comunicación de salud comunitaria. Analiza estos datos del ecosistema:

CONTEXTO DE LA LLAMADA:
${context}

${userProfile ? `PERFIL DEL USUARIO:
- Condiciones: ${userProfile.conditions?.join(', ') || 'Desconocidas'}
- Estado emocional: ${userProfile.emotionalState || 'Desconocido'}
- Preocupaciones: ${userProfile.concerns?.join(', ') || 'Desconocidas'}` : ''}

DATOS DEL ECOSISTEMA (${similarCalls?.length || 0} llamadas similares exitosas):

TOP TÉCNICAS QUE FUNCIONAN:
${topTechniques?.slice(0, 5).map((t, i) => 
  `${i+1}. ${t.technique} - Usada ${t.usage_count} veces, Rating promedio: ${t.avg_rating.toFixed(1)}, Éxito: ${t.success_rate.toFixed(0)}%`
).join('\n')}

TOP FRASES PODEROSAS:
${topPhrases?.slice(0, 10).map((p, i) => 
  `${i+1}. "${p.phrase}" - Usada ${p.usage_count} veces, Rating: ${p.avg_rating.toFixed(1)}`
).join('\n')}

KNOWLEDGE BASE ACTIVO:
${knowledgeBase?.slice(0, 10).map(k => 
  `- [${k.knowledge_type}] ${k.content} (${k.category}) - Éxito: ${k.success_rate?.toFixed(0)}%`
).join('\n')}

EJEMPLOS DE LLAMADAS SIMILARES EXITOSAS:
${similarCalls?.slice(0, 3).map((call, i) => 
  `Llamada ${i+1} (Rating: ${call.analysis_quality_rating}/5):
  Técnicas: ${call.analysis_techniques?.join(', ')}
  Frases: ${call.analysis_power_phrases?.join(', ')}`
).join('\n\n')}

GENERA RECOMENDACIONES ESPECÍFICAS en JSON:
{
  "recommendedTechniques": [
    {"technique": "nombre", "why": "razón basada en datos", "whenToUse": "momento específico"}
  ],
  "powerPhrasesToUse": [
    {"phrase": "frase exacta", "context": "cuándo usarla", "successRate": 85}
  ],
  "conversationStructure": {
    "opening": "cómo abrir basado en éxitos",
    "middle": ["qué explorar", "en qué orden"],
    "closing": "cómo cerrar efectivamente"
  },
  "thingsToAvoid": ["qué no hacer basado en fracasos"],
  "personalizedTips": ["tips específicos para este contexto"],
  "confidence": 0.85,
  "basedOn": "10 llamadas similares exitosas"
}`;

    const recommendationsResponse = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: 'Eres un experto en sintetizar insights de grandes volúmenes de datos de llamadas. Tus recomendaciones deben ser específicas, accionables y basadas en evidencia.' },
        { role: 'user', content: analysisPrompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3
    });

    const recommendations = JSON.parse(recommendationsResponse.choices[0].message.content);

    // 7. Obtener estadísticas del ecosistema
    const { data: ecosystemHealth } = await supabase
      .from('ecosystem_health')
      .select('*')
      .single();

    return res.status(200).json({
      success: true,
      context,
      recommendations,
      ecosystemData: {
        totalCalls: ecosystemHealth?.total_calls || 0,
        uniqueUsers: ecosystemHealth?.total_unique_users || 0,
        avgQuality: ecosystemHealth?.avg_quality_overall || 0,
        highQualityPercentage: ecosystemHealth?.high_quality_percentage || 0,
        similarCallsFound: similarCalls?.length || 0
      },
      rawData: {
        topTechniques: topTechniques?.slice(0, 5),
        topPhrases: topPhrases?.slice(0, 10),
        similarCallsSample: similarCalls?.slice(0, 3).map(c => ({
          quality: c.analysis_quality_rating,
          techniques: c.analysis_techniques,
          phrases: c.analysis_power_phrases
        }))
      }
    });

  } catch (error) {
    console.error('❌ Error getting collective insights:', error);
    return res.status(500).json({
      error: 'Failed to get insights',
      message: error.message
    });
  }
}
