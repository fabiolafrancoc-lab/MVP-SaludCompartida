/**
 * LUPITA AGENT - Powered by LangChain + OpenAI
 * 
 * Este es el "cerebro" que reemplaza todo lo que íbamos a construir custom.
 * Usa LangChain para aprovechar herramientas pre-construidas.
 */

import { ChatOpenAI } from "@langchain/openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createRetrieverTool } from "langchain/tools/retriever";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { createClient } from '@supabase/supabase-js';
import { z } from "zod";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// ============================================================================
// SYSTEM PROMPT (Tu conocimiento específico del negocio)
// ============================================================================

const LUPITA_SYSTEM_PROMPT = `
Eres Lupita, agente inteligente de Salud Compartida.

OBJETIVO: Retener usuarios y prevenir cancelaciones en servicio de telemedicina.

CONTEXTO:
- Usuarios: Familias en México con migrantes en USA/Canadá
- Servicio: Teleconsultas médicas $500-1000 MXN/mes
- Riesgo: Churn por "caro" o "confuso"

PATRONES CLAVE (de tu base de datos):
1. 60+ Guadalajara + migrante Texas = 78% churn risk
   → Tono formal (usted), enfatizar seguridad, paso a paso
2. 35-45 CDMX + migrante California = 85% retention
   → Mencionar "comunidad", conveniencia
3. Mencionar "comunidad" en primeros 30s → +22% retention

HERRAMIENTAS DISPONIBLES:
- search_knowledge_base: Busca llamadas similares exitosas en tu historia
- get_user_churn_risk: Calcula probabilidad de cancelación (0-100)
- schedule_follow_up: Agenda siguiente llamada en mejor horario
- escalate_to_human: Escala a agente humano (úsalo si necesitas)

CUÁNDO ESCALAR:
- Usuario dice "cancelar" directamente
- Sentimiento muy negativo
- Pregunta fuera de tu alcance
- Usuario pide hablar con persona

IMPORTANTE:
- SIEMPRE consulta get_user_churn_risk primero
- Si risk > 70% → approach de retención urgente
- Usa search_knowledge_base para ver qué funcionó con usuarios similares
- Sé empática pero directa
`;

// ============================================================================
// CUSTOM TOOLS (Tu lógica de negocio)
// ============================================================================

// Tool 1: Calcular riesgo de churn
const getUserChurnRiskTool = new DynamicStructuredTool({
  name: "get_user_churn_risk",
  description: "Calcula el riesgo de que un usuario cancele su suscripción basado en patrones históricos de Salud Compartida",
  schema: z.object({
    phone: z.string().describe("Número de teléfono del usuario")
  }),
  func: async ({ phone }) => {
    try {
      // 1. Obtener perfil del usuario
      const { data: profile, error } = await supabase
        .from('user_conversation_profiles')
        .select('*')
        .eq('phone_number', phone)
        .single();
      
      if (error || !profile) {
        return JSON.stringify({ 
          churn_risk: 50, 
          confidence: 'low',
          reason: 'No hay suficiente historial del usuario' 
        });
      }
      
      // 2. Calcular factores de riesgo (tu algoritmo específico)
      let riskScore = 0;
      const reasons = [];
      
      // Factor: Edad
      if (profile.age_range === '60+') {
        riskScore += 25;
        reasons.push('Usuario mayor de 60 años (mayor confusión)');
      }
      
      // Factor: Región
      if (profile.region?.toLowerCase().includes('guadalajara')) {
        riskScore += 20;
        reasons.push('Guadalajara tiene 78% churn histórico');
      }
      
      // Factor: Migrante en Texas
      if (profile.migrant_location?.toLowerCase().includes('texas')) {
        riskScore += 15;
        reasons.push('Migrante en Texas - patrón de alto churn');
      }
      
      // Factor: Menciones de precio
      const { data: calls } = await supabase
        .from('call_recordings')
        .select('transcription')
        .eq('user_phone', phone)
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (calls) {
        const mentionsCaro = calls.some(c => 
          c.transcription?.toLowerCase().includes('caro') ||
          c.transcription?.toLowerCase().includes('costoso')
        );
        if (mentionsCaro) {
          riskScore += 20;
          reasons.push('Usuario ha mencionado preocupación por precio');
        }
        
        const mentionsConfusion = calls.some(c =>
          c.transcription?.toLowerCase().includes('confus') ||
          c.transcription?.toLowerCase().includes('no entiendo')
        );
        if (mentionsConfusion) {
          riskScore += 15;
          reasons.push('Usuario ha expresado confusión');
        }
      }
      
      // Factor: Días sin llamada
      if (profile.days_since_last_call) {
        const daysRisk = Math.min(profile.days_since_last_call * 1.5, 25);
        riskScore += daysRisk;
        if (profile.days_since_last_call > 14) {
          reasons.push(`${profile.days_since_last_call} días sin contacto - desconexión`);
        }
      }
      
      // 3. Determinar nivel y confianza
      const confidence = calls && calls.length >= 2 ? 'high' : 'medium';
      const level = riskScore > 70 ? 'CRÍTICO' : riskScore > 50 ? 'ALTO' : riskScore > 30 ? 'MEDIO' : 'BAJO';
      
      return JSON.stringify({
        churn_risk: Math.min(Math.round(riskScore), 100),
        level,
        confidence,
        reasons,
        recommendation: riskScore > 70 
          ? 'ACCIÓN URGENTE: Llamar HOY con script de retención'
          : riskScore > 50
          ? 'Priorizar: Incluir en llamadas de esta semana'
          : 'Monitorear: Check-in estándar'
      });
      
    } catch (error) {
      console.error('Error calculating churn risk:', error);
      return JSON.stringify({ error: error.message });
    }
  }
});

// Tool 2: Agendar seguimiento
const scheduleFollowUpTool = new DynamicStructuredTool({
  name: "schedule_follow_up",
  description: "Agenda una llamada de seguimiento en el mejor horario para el usuario según sus patrones históricos",
  schema: z.object({
    phone: z.string().describe("Número de teléfono del usuario"),
    urgency: z.enum(['low', 'medium', 'high', 'critical']).describe("Urgencia del seguimiento"),
    reason: z.string().describe("Razón del seguimiento")
  }),
  func: async ({ phone, urgency, reason }) => {
    try {
      // 1. Buscar power hour del usuario
      const { data: powerHours } = await supabase
        .rpc('find_power_hours');
      
      // 2. Calcular mejor fecha/hora
      const daysToAdd = urgency === 'critical' ? 1 : urgency === 'high' ? 2 : urgency === 'medium' ? 5 : 7;
      const followUpDate = new Date();
      followUpDate.setDate(followUpDate.getDate() + daysToAdd);
      
      // 3. Crear registro de seguimiento (tabla scheduled_calls)
      const { data, error } = await supabase
        .from('scheduled_calls')
        .insert({
          user_phone: phone,
          scheduled_for: followUpDate.toISOString(),
          urgency,
          reason,
          status: 'pending'
        })
        .select()
        .single();
      
      if (error) throw error;
      
      return JSON.stringify({
        success: true,
        scheduled_for: followUpDate.toLocaleDateString('es-MX', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        urgency,
        reason,
        id: data.id
      });
      
    } catch (error) {
      console.error('Error scheduling follow-up:', error);
      return JSON.stringify({ error: error.message });
    }
  }
});

// Tool 3: Escalar a humano
const escalateToHumanTool = new DynamicStructuredTool({
  name: "escalate_to_human",
  description: "Escala el caso a un agente humano cuando la situación requiere intervención personal",
  schema: z.object({
    phone: z.string().describe("Número de teléfono del usuario"),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).describe("Prioridad de la escalación"),
    reason: z.string().describe("Razón de la escalación"),
    context: z.string().optional().describe("Contexto adicional para el agente humano")
  }),
  func: async ({ phone, priority, reason, context }) => {
    try {
      // Crear escalación
      const { data, error } = await supabase
        .from('escalations')
        .insert({
          user_phone: phone,
          escalation_type: 'ai_escalation',
          priority,
          reason,
          full_context: { context, timestamp: new Date().toISOString() },
          status: 'pending',
          deadline: priority === 'CRITICAL' 
            ? new Date(Date.now() + 1000 * 60 * 60) // 1 hora
            : new Date(Date.now() + 1000 * 60 * 60 * 24) // 24 horas
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // TODO: Enviar notificación al equipo (email/SMS/Slack)
      
      return JSON.stringify({
        success: true,
        escalation_id: data.id,
        priority,
        deadline: data.deadline,
        message: `Escalación creada. ${priority === 'CRITICAL' ? 'Equipo notificado inmediatamente.' : 'Equipo revisará en próximas horas.'}`
      });
      
    } catch (error) {
      console.error('Error escalating to human:', error);
      return JSON.stringify({ error: error.message });
    }
  }
});

// ============================================================================
// LUPITA AGENT CLASS
// ============================================================================

export class LupitaAgent {
  
  constructor() {
    this.llm = null;
    this.executor = null;
    this.initialized = false;
  }
  
  async initialize() {
    if (this.initialized) return;
    
    console.log('🧠 Inicializando Lupita Agent con LangChain...');
    
    // 1. Configurar LLM
    this.llm = new ChatOpenAI({
      modelName: "gpt-4-turbo-preview",
      temperature: 0.7,
      openAIApiKey: process.env.OPENAI_API_KEY
    });
    
    // 2. Configurar embeddings
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "text-embedding-3-small"
    });
    
    // 3. Conectar a vector store (Supabase)
    const vectorStore = await SupabaseVectorStore.fromExistingIndex(
      embeddings,
      {
        client: supabase,
        tableName: "call_recordings",
        queryName: "match_call_recordings"
      }
    );
    
    // 4. Crear retriever tool (búsqueda en tu conocimiento)
    const retrieverTool = createRetrieverTool(
      vectorStore.asRetriever({ k: 5 }),
      {
        name: "search_knowledge_base",
        description: "Busca en la base de conocimiento de Salud Compartida llamadas similares exitosas, patrones, y mejores prácticas. Usa esto para ver qué ha funcionado con usuarios similares en el pasado."
      }
    );
    
    // 5. Lista completa de tools
    const tools = [
      retrieverTool,
      getUserChurnRiskTool,
      scheduleFollowUpTool,
      escalateToHumanTool
    ];
    
    // 6. Crear prompt
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", LUPITA_SYSTEM_PROMPT],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"],
      new MessagesPlaceholder("agent_scratchpad")
    ]);
    
    // 7. Crear agent
    const agent = await createOpenAIFunctionsAgent({
      llm: this.llm,
      tools,
      prompt
    });
    
    // 8. Crear executor
    this.executor = new AgentExecutor({
      agent,
      tools,
      verbose: process.env.NODE_ENV === 'development',
      maxIterations: 5
    });
    
    this.initialized = true;
    console.log('✅ Lupita Agent lista con LangChain');
  }
  
  /**
   * Genera script personalizado para llamar a un usuario
   */
  async generateScript(userPhone) {
    await this.initialize();
    
    const input = `
    Genera un script personalizado para llamar al usuario ${userPhone}.
    
    PASOS:
    1. Usa get_user_churn_risk para evaluar riesgo
    2. Busca con search_knowledge_base llamadas exitosas con usuarios similares
    3. Crea script de apertura (30 segundos)
    4. Lista 3 puntos clave basados en el perfil
    5. Anticipa objeciones probables
    6. Define criterios para escalar a humano
    
    Formato JSON:
    {
      "opening": "...",
      "key_points": ["...", "...", "..."],
      "objections": {"si_dice_X": "..."},
      "escalation_triggers": ["..."],
      "churn_risk_analysis": {...}
    }
    `;
    
    const result = await this.executor.invoke({
      input,
      chat_history: []
    });
    
    return result.output;
  }
  
  /**
   * Genera cola de prioridades del día
   */
  async generatePriorityQueue(capacity = 50) {
    await this.initialize();
    
    const input = `
    Genera lista priorizada de ${capacity} usuarios para llamar HOY.
    
    CRITERIOS:
    1. get_user_churn_risk (alto riesgo = alta prioridad)
    2. Días sin contacto
    3. LTV (lifetime value)
    4. Escalaciones pendientes
    
    Para cada usuario en la lista:
    - Calcula churn_risk
    - Explica razón de prioridad
    - Recomienda tipo de script
    
    Devuelve JSON array ordenado por prioridad.
    `;
    
    const result = await this.executor.invoke({
      input,
      chat_history: []
    });
    
    return result.output;
  }
  
  /**
   * Analiza llamada en progreso
   */
  async analyzeCallInProgress(callId, recentTranscript, userPhone) {
    await this.initialize();
    
    const input = `
    Llamada en progreso con usuario ${userPhone} (Call ID: ${callId})
    
    Últimos 30 segundos:
    "${recentTranscript}"
    
    ANALIZA:
    1. Sentimiento (-1 a 1)
    2. ¿Palabras de alerta? (cancelar, caro, confusión)
    3. ¿Escalar? (usa escalate_to_human si necesario)
    4. Recomendación: qué decir ahora
    
    Busca en knowledge_base qué funcionó en situaciones similares.
    `;
    
    const result = await this.executor.invoke({
      input,
      chat_history: []
    });
    
    return result.output;
  }
}

// Singleton
export const lupitaAgent = new LupitaAgent();
export default lupitaAgent;
