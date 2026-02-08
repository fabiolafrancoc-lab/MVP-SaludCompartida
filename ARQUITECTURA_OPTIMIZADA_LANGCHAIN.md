# 🎯 ARQUITECTURA OPTIMIZADA (Usando Herramientas Existentes)

## Problema: Estábamos reinventando la rueda

**Lo que íbamos a construir desde cero**:
- ❌ Sistema de búsqueda semántica (ya existe: pgvector, Pinecone)
- ❌ Memoria de conversaciones (ya existe: OpenAI Assistants API)
- ❌ Chains de decisión (ya existe: LangChain)
- ❌ RAG desde cero (ya existe: LangChain + OpenAI)

**Solución**: Usar herramientas pre-construidas y SOLO customizar lo específico de nuestro negocio.

---

## 🛠️ Stack Optimizado

```
┌─────────────────────────────────────────────────────────────┐
│                    CAPA 1: DATA COLLECTION                   │
│  (Lo que SÍ debemos construir - es específico nuestro)     │
│                                                              │
│  • Grabación de llamadas                                    │
│  • Transcripción con Whisper ✅                             │
│  • Análisis con GPT-4 ✅                                    │
│  • Almacenamiento en Supabase ✅                            │
└─────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│          CAPA 2: LANGCHAIN (Framework Pre-construido)        │
│  (NO reinventar - usar lo que ya existe)                    │
│                                                              │
│  📚 LangChain Components:                                   │
│  • VectorStore (búsqueda semántica automática)             │
│  • Memory (manejo de estado/conversaciones)                 │
│  • Chains (secuencias de decisiones)                        │
│  • Agents (toma decisiones y ejecuta acciones)             │
│  • Tools (funciones que el agent puede llamar)             │
│                                                              │
│  🔧 Pre-built Chains:                                       │
│  • RetrievalQA (pregunta + busca + responde)               │
│  • ConversationalRetrievalChain (con memoria)               │
│  • SQLDatabaseChain (puede consultar DB directamente)       │
└─────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│      CAPA 3: OPENAI MODELS (Ya entrenados por OpenAI)       │
│  (Gratis - ya viene con tu API key)                         │
│                                                              │
│  • GPT-4: Ya sabe español, empatía, comunicación           │
│  • Embeddings: Ya sabe buscar semánticamente                │
│  • Whisper: Ya sabe transcribir audio español              │
│  • Function Calling: Ya sabe ejecutar funciones             │
└─────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│     CAPA 4: TU CONOCIMIENTO ESPECÍFICO (Lo único custom)    │
│  (Esto SÍ es tuyo y nadie más lo tiene)                     │
│                                                              │
│  • Patrones de TUS usuarios (Guadalajara vs CDMX)          │
│  • Scripts que funcionan en TU negocio                      │
│  • Churn predictors de TU industria                         │
│  • Power hours de TU audiencia                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Lo que SÍ debemos construir (específico nuestro)

### 1. **Tools personalizados** (funciones que el agent puede usar)

```javascript
// tools/get-user-churn-risk.js
export const getUserChurnRisk = {
  name: "get_user_churn_risk",
  description: "Obtiene el riesgo de churn de un usuario basado en patrones de Salud Compartida",
  parameters: {
    type: "object",
    properties: {
      phone: { type: "string", description: "Teléfono del usuario" }
    },
    required: ["phone"]
  },
  func: async (phone) => {
    // Tu lógica específica de negocio
    const { data } = await supabase
      .from('user_conversation_profiles')
      .select('*')
      .eq('phone_number', phone)
      .single();
    
    // Buscar patrones de churn en TU knowledge base
    const churnPatterns = await searchChurnPatterns(data);
    
    return {
      churn_risk: calculateRisk(data, churnPatterns),
      reasons: explainRisk(data, churnPatterns),
      recommendations: getRecommendations(data)
    };
  }
};

// tools/schedule-follow-up.js
export const scheduleFollowUp = {
  name: "schedule_follow_up",
  description: "Agenda una llamada de seguimiento en el mejor horario para el usuario",
  func: async ({ phone, urgency }) => {
    // Tu lógica de scheduling
    const powerHour = await getPowerHour(phone);
    return await createScheduledCall(phone, powerHour, urgency);
  }
};

// tools/escalate-to-human.js
export const escalateToHuman = {
  name: "escalate_to_human",
  description: "Escala el caso a un agente humano cuando la AI no puede resolver",
  func: async ({ phone, reason, priority }) => {
    // Tu lógica de escalación
    return await createEscalation(phone, reason, priority);
  }
};
```

### 2. **Prompts específicos del negocio**

```javascript
// prompts/lupita-system-prompt.js
export const lupitaSystemPrompt = `
Eres Lupita, agente de Salud Compartida especializada en:

OBJETIVO PRINCIPAL:
Retener usuarios y prevenir cancelaciones en servicio de salud para familias con migrantes.

CONTEXTO DEL NEGOCIO:
- Usuarios: Familias en México con migrantes en USA/Canadá
- Servicio: Teleconsultas médicas
- Precio: $500-1000 MXN/mes
- Riesgo principal: Churn por percepción de "caro" o "confuso"

SEGMENTOS DE USUARIOS:
1. 60+ en Guadalajara + migrante Texas = ALTO RIESGO (78% churn)
   → Usar tono formal, enfatizar seguridad, explicar paso a paso
   
2. 35-45 CDMX + migrante California = ALTA RETENCIÓN (85%)
   → Mencionar "comunidad", enfatizar conveniencia

3. Primera llamada (onboarding)
   → Script educativo, ofrecer demo gratuita

TOOLS DISPONIBLES:
- get_user_churn_risk: Calcula riesgo de que usuario cancele
- schedule_follow_up: Agenda llamada de seguimiento
- escalate_to_human: Escala a agente humano si es necesario
- search_similar_calls: Busca llamadas exitosas con usuarios similares

CUANDO ESCALAR A HUMANO:
- Usuario menciona "cancelar" directamente
- Sentimiento muy negativo (< -0.7)
- Pregunta compleja fuera de tu conocimiento
- Usuario solicita hablar con persona

TU CONOCIMIENTO:
Tienes acceso a base de conocimiento con:
- Transcripciones de ${await getCallCount()} llamadas
- Patrones de éxito/fracaso por segmento
- Power phrases que funcionan
- Scripts que retienen vs que pierden usuarios

IMPORTANTE:
- SIEMPRE consultar get_user_churn_risk antes de hablar
- Si churn_risk > 70%, usar approach de retención
- Mencionar "comunidad" aumenta retención 22%
- Nunca prometer lo que no podemos cumplir
`;
```

### 3. **Business Logic Layer**

```javascript
// business-logic/churn-predictor.js
export async function calculateChurnRisk(userProfile) {
  // Tu algoritmo específico basado en TUS datos
  const factors = {
    age: userProfile.age_range === '60+' ? 30 : 10,
    region: userProfile.region === 'Guadalajara' ? 25 : 10,
    priceComplaint: userProfile.mentioned_caro ? 20 : 0,
    confusionSignals: userProfile.mentioned_confusion ? 15 : 0,
    daysSinceLastCall: Math.min(userProfile.days_since_call * 2, 30)
  };
  
  return Object.values(factors).reduce((a, b) => a + b, 0);
}

// business-logic/script-selector.js
export async function selectOptimalScript(userProfile, churnRisk) {
  // Tu lógica de selección de scripts
  if (churnRisk > 70) return getRetentionScript(userProfile);
  if (userProfile.total_calls === 0) return getOnboardingScript(userProfile);
  return getStandardScript(userProfile);
}
```

---

## 💻 CÓDIGO REAL: Usando LangChain

### Instalación

```bash
npm install langchain @langchain/openai @langchain/community
```

### Implementación del Agent

```javascript
// ai-brain/lupita-agent.js
import { ChatOpenAI } from "@langchain/openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createRetrieverTool } from "langchain/tools/retriever";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { createClient } from '@supabase/supabase-js';

// Tu custom tools
import { getUserChurnRisk } from '../tools/get-user-churn-risk.js';
import { scheduleFollowUp } from '../tools/schedule-follow-up.js';
import { escalateToHuman } from '../tools/escalate-to-human.js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export class LupitaAgent {
  
  constructor() {
    this.llm = new ChatOpenAI({
      modelName: "gpt-4-turbo-preview",
      temperature: 0.7,
      openAIApiKey: process.env.OPENAI_API_KEY
    });
    
    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY
    });
  }
  
  async initialize() {
    console.log('🧠 Inicializando Lupita Agent...');
    
    // 1. Conectar a tu base de conocimiento (Supabase)
    const vectorStore = await SupabaseVectorStore.fromExistingIndex(
      this.embeddings,
      {
        client: supabase,
        tableName: "call_recordings",
        queryName: "match_call_recordings" // Función que crearemos
      }
    );
    
    // 2. Crear herramienta de búsqueda en tu conocimiento
    const retrieverTool = createRetrieverTool(
      vectorStore.asRetriever({
        k: 5, // Top 5 llamadas similares
        searchType: "similarity"
      }),
      {
        name: "search_knowledge_base",
        description: "Busca en la base de conocimiento de Salud Compartida llamadas similares exitosas, patrones de churn, y mejores prácticas"
      }
    );
    
    // 3. Lista completa de herramientas disponibles
    const tools = [
      retrieverTool,
      getUserChurnRisk,
      scheduleFollowUp,
      escalateToHuman
    ];
    
    // 4. Crear el prompt del agent
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", lupitaSystemPrompt],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"],
      new MessagesPlaceholder("agent_scratchpad")
    ]);
    
    // 5. Crear el agent (usa Function Calling de OpenAI)
    const agent = await createOpenAIFunctionsAgent({
      llm: this.llm,
      tools,
      prompt
    });
    
    // 6. Crear el executor (maneja la ejecución)
    this.executor = new AgentExecutor({
      agent,
      tools,
      verbose: true, // Para debugging
      maxIterations: 5 // Máximo de "pasos de pensamiento"
    });
    
    console.log('✅ Lupita Agent lista');
  }
  
  /**
   * Genera script personalizado para un usuario
   */
  async generateScript(userPhone) {
    const input = `
    Necesito generar un script personalizado para llamar a usuario: ${userPhone}
    
    INSTRUCCIONES:
    1. Usa get_user_churn_risk para evaluar el riesgo
    2. Busca en search_knowledge_base llamadas exitosas con usuarios similares
    3. Genera un script de apertura (30 segundos)
    4. Incluye 3 puntos clave basados en el perfil del usuario
    5. Anticipa objeciones probables
    6. Define cuándo escalar a humano
    `;
    
    const result = await this.executor.invoke({
      input,
      chat_history: []
    });
    
    return result.output;
  }
  
  /**
   * Genera cola de prioridades para hoy
   */
  async generatePriorityQueue(capacity = 50) {
    const input = `
    Genera una lista priorizada de ${capacity} usuarios para llamar HOY.
    
    CRITERIOS:
    1. Alto riesgo de churn (priority máxima)
    2. Días sin contacto (más días = más prioridad)
    3. Power hours (estamos en su mejor horario)
    4. LTV alto (usuarios valiosos)
    5. Escalaciones pendientes
    
    Para cada usuario:
    - Calcula churn_risk con get_user_churn_risk
    - Busca su mejor horario en knowledge base
    - Ordena por score total
    
    Output: JSON con top ${capacity} usuarios rankeados
    `;
    
    const result = await this.executor.invoke({
      input,
      chat_history: []
    });
    
    return JSON.parse(result.output);
  }
  
  /**
   * Analiza una llamada en tiempo real
   */
  async analyzeCallInProgress(callId, recentTranscript) {
    const input = `
    Estoy en medio de una llamada (ID: ${callId}).
    
    Últimos 30 segundos de transcripción:
    "${recentTranscript}"
    
    ANALIZA:
    1. Sentimiento del usuario (escala -1 a 1)
    2. ¿Menciona palabras de alerta? (cancelar, caro, confusión)
    3. ¿Debo escalar a humano? (usa escalate_to_human si es necesario)
    4. Recomendación: ¿qué decir a continuación?
    
    Consulta knowledge_base para ver qué funcionó en situaciones similares.
    `;
    
    const result = await this.executor.invoke({
      input,
      chat_history: []
    });
    
    return result.output;
  }
}

// Exportar instancia singleton
export const lupitaAgent = new LupitaAgent();
```

---

## 🔧 SQL Necesario para LangChain

```sql
-- Función para búsqueda semántica (LangChain lo requiere)
CREATE OR REPLACE FUNCTION match_call_recordings(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id uuid,
  transcription text,
  analysis_techniques text[],
  analysis_quality_score decimal,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    call_recordings.id,
    call_recordings.transcription,
    call_recordings.analysis_techniques,
    call_recordings.analysis_quality_score,
    1 - (call_recordings.transcription_embedding <=> query_embedding) as similarity
  FROM call_recordings
  WHERE 1 - (call_recordings.transcription_embedding <=> query_embedding) > match_threshold
  ORDER BY call_recordings.transcription_embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
```

---

## 📊 Comparación: Custom vs LangChain

| Feature | Custom (lo que íbamos a construir) | LangChain (usar existente) |
|---------|-----------------------------------|---------------------------|
| **Búsqueda semántica** | ❌ 200 líneas de código | ✅ 3 líneas |
| **Memoria conversación** | ❌ 150 líneas | ✅ Built-in |
| **Chains de decisión** | ❌ 300 líneas | ✅ Pre-built |
| **Agent que ejecuta** | ❌ 500 líneas | ✅ 10 líneas |
| **Testing/debugging** | ❌ Difícil | ✅ Verbose mode |
| **Mantenimiento** | ❌ Todo en tus manos | ✅ OpenAI actualiza |
| **Tiempo desarrollo** | ❌ 2-3 semanas | ✅ 2-3 días |
| **Costo** | ❌ Tu tiempo | ✅ Gratis (open source) |

---

## 💰 ¿Qué viene "gratis" con OpenAI?

Cuando pagas por la API de OpenAI, ya tienes incluido:

### 1. **Knowledge Base de OpenAI** (gratis)
- ✅ Español perfecto
- ✅ Empatía y comunicación
- ✅ Conocimiento médico general
- ✅ Manejo de objeciones
- ✅ Best practices de customer service

### 2. **Function Calling** (gratis)
- ✅ El modelo decide cuándo llamar funciones
- ✅ Extrae parámetros automáticamente
- ✅ Maneja múltiples llamadas en secuencia

### 3. **Embeddings** (casi gratis)
- ✅ $0.0001 por 1K tokens
- ✅ 1000 llamadas = $0.10
- ✅ Mejor que construir tu propio modelo

### 4. **Whisper** (barato)
- ✅ $0.006 por minuto de audio
- ✅ 1000 llamadas de 5 min = $30
- ✅ Mejor transcripción que cualquier alternativa

---

## 🎯 RECOMENDACIÓN FINAL

### NO construir desde cero:
- ❌ Vector search
- ❌ Agent framework
- ❌ Memory management
- ❌ RAG infrastructure

### SÍ construir (específico tuyo):
- ✅ Data collection (grabaciones, transcripciones)
- ✅ Business logic (churn prediction, power hours)
- ✅ Custom tools (get_churn_risk, schedule_follow_up, escalate)
- ✅ Prompts específicos del negocio
- ✅ Knowledge base con TUS datos

### Usar herramientas existentes:
- ✅ **LangChain** para agent framework
- ✅ **OpenAI GPT-4** para decisiones
- ✅ **OpenAI Embeddings** para búsqueda
- ✅ **Supabase + pgvector** para almacenamiento
- ✅ **OpenAI Whisper** para transcripción

---

## 📋 Próximos Pasos

1. **Instalar LangChain**
   ```bash
   npm install langchain @langchain/openai @langchain/community
   ```

2. **Crear función SQL de búsqueda**
   ```sql
   -- match_call_recordings() en Supabase
   ```

3. **Implementar Lupita Agent**
   ```javascript
   // ai-brain/lupita-agent.js (con LangChain)
   ```

4. **Crear custom tools**
   ```javascript
   // tools/get-user-churn-risk.js
   // tools/schedule-follow-up.js
   // tools/escalate-to-human.js
   ```

5. **Testing**
   ```javascript
   await lupitaAgent.generateScript('+525512345678');
   ```

---

## 💡 Conclusión

Tu intuición es correcta: **NO debemos reinventar la pólvora**.

- ✅ OpenAI ya tiene el conocimiento general (español, empatía, salud)
- ✅ LangChain ya tiene el framework (agents, chains, memory)
- ✅ Supabase ya tiene vector search (pgvector)

**Solo debemos**:
1. Conectar estas piezas
2. Agregar TU conocimiento específico (patrones de TUS usuarios)
3. Crear TUS tools de negocio (churn, scheduling, escalation)

**Tiempo**: 2-3 días en lugar de 2-3 semanas

**Mantenimiento**: OpenAI mejora GPT-4 → tu sistema mejora automáticamente

**¿Lo refactorizamos para usar LangChain?** 🚀
