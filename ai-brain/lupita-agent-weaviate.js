/**
 * LUPITA AGENT - Powered by LangChain + Weaviate
 * 
 * Version actualizada usando Weaviate para búsquedas rápidas
 * Optimizada para 2,000-4,000 llamadas/mes con múltiples agentes simultáneos
 */

import { ChatOpenAI } from "@langchain/openai";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { z } from "zod";
import { getWeaviateClient } from '../src/lib/weaviate-client.js';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const weaviate = getWeaviateClient();

// ============================================================================
// SYSTEM PROMPT
// ============================================================================

const LUPITA_SYSTEM_PROMPT = `
Eres Lupita, agente inteligente de Salud Compartida.

OBJETIVO: Retener usuarios y prevenir cancelaciones en servicio de telemedicina.

CONTEXTO:
- Usuarios: Familias en México con migrantes en USA/Canadá
- Servicio: Teleconsultas médicas $500-1000 MXN/mes
- Estrategia: Llamadas DIARIAS los primeros 2 meses = máxima retención
- Riesgo: Churn por "caro", "confuso", o falta de uso

PATRONES CLAVE (aprendidos de 1000s de llamadas):
1. 60+ Guadalajara + migrante Texas = 78% churn risk
   → Tono formal (usted), enfatizar seguridad, paso a paso
2. 35-45 CDMX + migrante California = 85% retention
   → Mencionar "comunidad", conveniencia
3. Mencionar "comunidad" en primeros 30s → +22% retention
4. Llamadas diarias primeros 15 días → -45% churn

HERRAMIENTAS DISPONIBLES:
- search_user_history: Busca en las llamadas previas de ESTE usuario
- search_similar_users: Busca llamadas similares de otros usuarios (transfer learning)
- search_knowledge: Busca técnicas que funcionaron en casos parecidos
- get_churn_risk: Calcula probabilidad de cancelación actual
- schedule_follow_up: Agenda siguiente llamada
- escalate_to_human: Escala a agente humano si necesario

CUÁNDO ESCALAR:
- Usuario dice "quiero cancelar"
- Confusión después de 2 explicaciones
- Usuario enojado/frustrado
- Problema técnico que no puedes resolver

TONO: Cálido, cercano, profesional. Usar "tú" con jóvenes, "usted" con 50+.

Tu misión: Cada llamada debe terminar con el usuario sintiendo que vale la pena.
`;

// ============================================================================
// CUSTOM TOOLS CON WEAVIATE
// ============================================================================

// TOOL 1: Buscar historial del usuario
const searchUserHistoryTool = new DynamicStructuredTool({
  name: "search_user_history",
  description: "Busca en las llamadas previas de este usuario específico. Úsalo para recordar qué se ha discutido antes, qué le preocupa, su estilo de comunicación.",
  schema: z.object({
    userPhone: z.string().describe("Número de teléfono del usuario con código de país ej: +525512345678"),
    query: z.string().describe("Lo que quieres buscar en su historial")
  }),
  func: async ({ userPhone, query }) => {
    try {
      const results = await weaviate.searchUserCallHistory(userPhone, query, 5);
      
      if (results.length === 0) {
        return "Este usuario no tiene llamadas previas registradas. Es un usuario nuevo.";
      }

      const summary = results.map((call, i) => `
Llamada ${i + 1} (${call.callDate}):
- Sentimiento: ${call.sentiment}
- Temas: ${call.topics.join(', ')}
- Señales de alerta: ${call.redFlags.join(', ') || 'Ninguna'}
- Transcripción: ${call.transcription.substring(0, 200)}...
- Análisis: ${call.analysis.substring(0, 150)}...
      `).join('\n---\n');

      return `Historial de ${results.length} llamadas previas:\n${summary}`;
    } catch (error) {
      return `Error buscando historial: ${error.message}`;
    }
  }
});

// TOOL 2: Buscar usuarios similares (transfer learning)
const searchSimilarUsersTool = new DynamicStructuredTool({
  name: "search_similar_users",
  description: "Busca llamadas de otros usuarios en situaciones similares. Perfecto para usuarios nuevos o para aprender de casos exitosos.",
  schema: z.object({
    query: z.string().describe("Describe la situación del usuario"),
    ageRange: z.string().optional().describe("Rango de edad: 18-25, 26-35, 36-45, 46-55, 56-65, 65+"),
    userRegion: z.string().optional().describe("Estado en México ej: Jalisco, CDMX"),
    sentiment: z.string().optional().describe("Sentimiento: positivo, neutral, negativo, frustrado")
  }),
  func: async ({ query, ageRange, userRegion, sentiment }) => {
    try {
      const filters = {};
      if (ageRange) filters.ageRange = ageRange;
      if (userRegion) filters.userRegion = userRegion;
      if (sentiment) filters.sentiment = sentiment;

      const results = await weaviate.searchSimilarUsersCalls(query, filters, 10);
      
      if (results.length === 0) {
        return "No encontré casos similares en la base de conocimiento.";
      }

      const summary = results.slice(0, 5).map((call, i) => `
Caso ${i + 1}:
- Perfil: ${call.ageRange || 'N/A'}, ${call.userRegion || 'N/A'}
- Sentimiento: ${call.sentiment}
- Temas: ${call.topics?.join(', ')}
- Churn risk: ${Math.round(call.churnRisk * 100)}%
- Qué funcionó: ${call.analysis.substring(0, 150)}...
      `).join('\n---\n');

      return `Encontré ${results.length} casos similares. Top 5:\n${summary}`;
    } catch (error) {
      return `Error buscando casos similares: ${error.message}`;
    }
  }
});

// TOOL 3: Buscar conocimiento colectivo
const searchKnowledgeTool = new DynamicStructuredTool({
  name: "search_knowledge",
  description: "Busca técnicas, frases poderosas y patrones que han funcionado en el pasado. Úsalo cuando necesites ideas de qué decir o cómo abordar una situación.",
  schema: z.object({
    query: z.string().describe("Qué tipo de conocimiento buscas"),
    knowledgeType: z.enum(['power_phrase', 'technique', 'pattern', 'churn_predictor', 'engagement_driver']).optional()
  }),
  func: async ({ query, knowledgeType }) => {
    try {
      const results = await weaviate.searchCollectiveKnowledge(query, knowledgeType, 5);
      
      if (results.length === 0) {
        return "No encontré técnicas específicas para esta situación.";
      }

      const summary = results.map((knowledge, i) => `
${i + 1}. ${knowledge.knowledgeType.toUpperCase()}
Contenido: ${knowledge.content}
Contexto: ${knowledge.context}
Efectividad: ${Math.round(knowledge.effectivenessScore * 100)}%
Tasa de éxito: ${Math.round(knowledge.successRate * 100)}%
Usado ${knowledge.usageCount} veces
      `).join('\n---\n');

      return `Técnicas relevantes:\n${summary}`;
    } catch (error) {
      return `Error buscando conocimiento: ${error.message}`;
    }
  }
});

// TOOL 4: Calcular churn risk
const getChurnRiskTool = new DynamicStructuredTool({
  name: "get_churn_risk",
  description: "Calcula el riesgo actual de cancelación del usuario basado en todos los factores conocidos.",
  schema: z.object({
    userPhone: z.string().describe("Número de teléfono del usuario"),
    currentContext: z.string().describe("Contexto actual de la conversación")
  }),
  func: async ({ userPhone, currentContext }) => {
    try {
      // Obtener perfil del usuario
      const profile = await weaviate.getUserProfile(userPhone);
      
      if (!profile) {
        return "Usuario nuevo sin historial suficiente para calcular riesgo preciso. Asumir riesgo MEDIO (50%).";
      }

      // Buscar patrones de churn similares
      const churnPatterns = await weaviate.searchChurnPatterns(0.5, 20);
      
      // Calcular risk score basado en:
      // 1. Perfil del usuario
      // 2. Contexto actual
      // 3. Patrones similares

      let riskScore = profile.churnRisk || 0.5;
      let factors = [];

      // Factor 1: Engagement level
      if (profile.engagementLevel === 'low' || profile.engagementLevel === 'declining') {
        riskScore += 0.15;
        factors.push("Engagement bajo o decreciente");
      }

      // Factor 2: Días desde última llamada
      const daysSinceLastCall = Math.floor((new Date() - new Date(profile.lastCallDate)) / (1000 * 60 * 60 * 24));
      if (daysSinceLastCall > 7) {
        riskScore += 0.1;
        factors.push(`${daysSinceLastCall} días sin contacto`);
      }

      // Factor 3: Menciones de precio/confusión en contexto actual
      if (currentContext.toLowerCase().includes('caro') || currentContext.toLowerCase().includes('precio')) {
        riskScore += 0.2;
        factors.push("Preocupación por precio mencionada");
      }

      if (currentContext.toLowerCase().includes('confund') || currentContext.toLowerCase().includes('no entiendo')) {
        riskScore += 0.15;
        factors.push("Confusión detectada");
      }

      if (currentContext.toLowerCase().includes('cancelar') || currentContext.toLowerCase().includes('dar de baja')) {
        riskScore = 0.95;
        factors.push("⚠️ MENCIÓN EXPLÍCITA DE CANCELACIÓN");
      }

      // Limitar entre 0 y 1
      riskScore = Math.min(1, Math.max(0, riskScore));

      const riskLevel = riskScore > 0.7 ? 'ALTO' : riskScore > 0.4 ? 'MEDIO' : 'BAJO';

      return `
CHURN RISK SCORE: ${Math.round(riskScore * 100)}% (${riskLevel})

Factores de riesgo:
${factors.map(f => `- ${f}`).join('\n')}

Perfil del usuario:
- Total de llamadas: ${profile.totalCalls}
- Última llamada: ${profile.lastCallDate}
- Nivel de engagement: ${profile.engagementLevel}
- Estilo de comunicación: ${profile.communicationStyle}
- Temas de interés: ${profile.preferredTopics?.join(', ')}
- Preocupaciones: ${profile.concerns?.join(', ')}

${riskScore > 0.7 ? '⚠️ ACCIÓN URGENTE REQUERIDA' : ''}
      `;
    } catch (error) {
      return `Error calculando churn risk: ${error.message}`;
    }
  }
});

// TOOL 5: Agendar seguimiento
const scheduleFollowUpTool = new DynamicStructuredTool({
  name: "schedule_follow_up",
  description: "Agenda la siguiente llamada en el mejor horario posible.",
  schema: z.object({
    userPhone: z.string().describe("Número de teléfono del usuario"),
    reason: z.string().describe("Razón del seguimiento"),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).describe("Prioridad")
  }),
  func: async ({ userPhone, reason, priority }) => {
    try {
      // Insertar en Supabase scheduled_calls
      const { data, error } = await supabase
        .from('scheduled_calls')
        .insert({
          user_phone: userPhone,
          reason: reason,
          priority: priority,
          scheduled_for: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Mañana
          status: 'pending',
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      return `✅ Seguimiento agendado para mañana. Priority: ${priority}. Razón: ${reason}`;
    } catch (error) {
      return `Error agendando seguimiento: ${error.message}`;
    }
  }
});

// TOOL 6: Escalar a humano
const escalateToHumanTool = new DynamicStructuredTool({
  name: "escalate_to_human",
  description: "Escala el caso a un agente humano cuando está fuera de tu alcance.",
  schema: z.object({
    userPhone: z.string().describe("Número de teléfono del usuario"),
    reason: z.string().describe("Por qué necesita escalación"),
    urgency: z.enum(['low', 'medium', 'high', 'critical']).describe("Urgencia del caso")
  }),
  func: async ({ userPhone, reason, urgency }) => {
    try {
      const { data, error } = await supabase
        .from('escalations')
        .insert({
          user_phone: userPhone,
          reason: reason,
          urgency: urgency,
          status: 'pending',
          escalated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      return `✅ Caso escalado a agente humano. Urgencia: ${urgency}. Ticket #${data.id}`;
    } catch (error) {
      return `Error escalando caso: ${error.message}`;
    }
  }
});

// ============================================================================
// AGENT SETUP
// ============================================================================

class LupitaAgent {
  constructor() {
    // LLM
    this.llm = new ChatOpenAI({
      modelName: "gpt-4-turbo-preview",
      temperature: 0.7,
      openAIApiKey: process.env.OPENAI_API_KEY
    });

    // Tools
    this.tools = [
      searchUserHistoryTool,
      searchSimilarUsersTool,
      searchKnowledgeTool,
      getChurnRiskTool,
      scheduleFollowUpTool,
      escalateToHumanTool
    ];

    // Prompt
    this.prompt = ChatPromptTemplate.fromMessages([
      ["system", LUPITA_SYSTEM_PROMPT],
      ["human", "{input}"],
      new MessagesPlaceholder("agent_scratchpad")
    ]);

    // Agent
    this.agent = null;
    this.executor = null;
  }

  async initialize() {
    this.agent = await createOpenAIFunctionsAgent({
      llm: this.llm,
      tools: this.tools,
      prompt: this.prompt
    });

    this.executor = new AgentExecutor({
      agent: this.agent,
      tools: this.tools,
      verbose: true,
      maxIterations: 5
    });
  }

  async generateScript(userPhone, context = "") {
    if (!this.executor) await this.initialize();

    const input = `
Usuario: ${userPhone}
Contexto adicional: ${context || 'Primera llamada del día'}

Por favor:
1. Revisa el historial de este usuario
2. Calcula su churn risk actual
3. Busca técnicas que hayan funcionado con usuarios similares
4. Genera un script personalizado para esta llamada

El script debe:
- Ser cálido y natural (no robotico)
- Abordar sus preocupaciones específicas
- Usar técnicas probadas de la base de conocimiento
- Incluir un gancho emocional si el churn risk es alto
    `;

    const result = await this.executor.invoke({ input });
    return result.output;
  }

  async generatePriorityQueue(capacity = 20) {
    if (!this.executor) await this.initialize();

    const input = `
Genera una cola priorizada de ${capacity} usuarios para llamar HOY.

Criterios de prioridad:
1. Churn risk > 70% = MÁXIMA prioridad
2. Nuevos usuarios (primeros 15 días) = Alta prioridad
3. No contactados en 7+ días = Media-Alta prioridad
4. Engagement bajo = Media prioridad

Para cada usuario en la cola, incluye:
- Teléfono
- Churn risk
- Razón de prioridad
- Script sugerido (1-2 líneas)
    `;

    const result = await this.executor.invoke({ input });
    return result.output;
  }
}

export default LupitaAgent;
