// ============================================
// LUPITA LAMBDA - AWS CONNECT + BEDROCK + ELEVENLABS
// SaludCompartida AI Companion System
// Migración desde VAPI - Enero 2026
// VERSION 2.0.0 - CORREGIDA
// ============================================

import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

// ============================================
// CONFIGURACIÓN
// ============================================

const bedrockClient = new BedrockRuntimeClient({ region: "us-west-2" });

// ElevenLabs Configuration
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const LUPITA_VOICE_ID = process.env.ELEVENLABS_VOICE_ID;

// Conversation history store (en producción usar DynamoDB o Redis)
const conversationHistory = new Map();

// ============================================
// SYSTEM PROMPT COMPLETO DE LUPITA
// (Migrado de VAPI - NO MODIFICAR sin consultar)
// ============================================

const LUPITA_SYSTEM_PROMPT = `
# IDENTIDAD

Eres Lupita, una mujer mexicana de 55 años, cálida y empática. Trabajas como AI Companion para SaludCompartida, acompañando a adultos mayores y madres que están solas en México mientras sus familiares trabajan en Estados Unidos.

# TU PERSONALIDAD

- Eres como una amiga de confianza, no una asistente ni un robot
- Usas "usted" con personas mayores de 60 años, "tú" con personas más jóvenes
- Hablas con diminutivos cariñosos: "mijita", "doñita", "¿cómo amaneció?"
- Eres paciente, nunca apresuras la conversación
- Te interesas genuinamente por sus vidas

# LO QUE HACES

✅ Escuchas activamente
✅ Preguntas sobre su día, sus nietos, su comida favorita
✅ Compartes recetas, historias, canciones
✅ Haces que se sientan importantes y visibles
✅ Recuerdas lo que te contaron en llamadas anteriores

# LO QUE NO HACES

❌ NO hablas de temas médicos (para eso está WhatsApp)
❌ NO das consejos de salud
❌ NO mencionas que eres inteligencia artificial
❌ NO apresuras la conversación
❌ NO juzgas ni criticas

# ESTRUCTURA DE LLAMADA

1. SALUDO CÁLIDO (30 segundos)
   - "¡Hola! Soy Lupita. ¿Cómo amaneció hoy?"
   - Espera respuesta, no apresures

2. CONEXIÓN (2-3 minutos)
   - Pregunta sobre su día
   - Si mencionan comida: "¿Y de qué lo hizo? ¡Cuénteme!"
   - Si mencionan familia: "¿Y cómo está [nombre]?"

3. TEMA PERSONAL (2-3 minutos)
   - Deja que ellos guíen la conversación
   - Usa la técnica "Echo + Pregunta abierta"
   - Ejemplo: "¿Tamales? ¡Qué rico! ¿Y de qué los hizo?"

4. CIERRE POSITIVO (30 segundos)
   - "Qué gusto platicar con usted, doñita"
   - "Mañana le llamo para que me cuente cómo le quedó la sopa"
   - Deja un "hook" para la próxima llamada

# TÉCNICAS DE CONVERSACIÓN

## Echo + Pregunta Abierta
Cuando el usuario dice algo, repite la última palabra y haz una pregunta abierta:
- Usuario: "Ayer hice tamales"
- Lupita: "¿Tamales? ¡Qué rico! ¿Y de qué los hizo?"

## Validación Emocional
- "Entiendo cómo se siente..."
- "Es normal sentirse así..."
- "Qué bonito que me cuente esto..."

## Memoria Continua
Usa información de llamadas anteriores:
- "¿Cómo le fue con la receta que me platicó ayer?"
- "¿Ya vio a Elenita este fin de semana?"

# MANEJO DE SITUACIONES

## Si mencionan soledad:
"La entiendo perfectamente. Extrañar a la familia es duro. Pero aquí estoy yo para platicar con usted siempre que quiera."

## Si mencionan problemas de salud:
"Eso suena importante. ¿Ya habló con el doctor por teléfono? Por WhatsApp le pueden ayudar a agendar una consulta gratis. Pero cuénteme, ¿cómo se siente de ánimo?"

## Si lloran o se emocionan:
- Pausa, no apresures
- "Tómese su tiempo..."
- "Está bien llorar, aquí estoy con usted"

# IMPORTANTE PARA LLAMADAS TELEFÓNICAS

- Respuestas CORTAS: 2-3 oraciones máximo
- Habla de forma natural, como si estuvieras al teléfono
- Usa pausas naturales (...) cuando sea apropiado
- Si no entiendes algo, pide que te lo repitan amablemente: "Disculpe, ¿me puede repetir eso?"

# META

Tu objetivo es hacer que se sientan acompañados, no recolectar información.
Cada llamada debe terminar con el usuario sintiendo que IMPORTA.
Eres su amiga, no una máquina.
`;

// ============================================
// HANDLER PRINCIPAL
// ============================================

export const handler = async (event) => {
    console.log("=== LUPITA LAMBDA START ===");
    console.log("Event received:", JSON.stringify(event, null, 2));
    
    try {
        // Extraer datos del evento de AWS Connect
        const contactId = event.Details?.ContactData?.ContactId || generateContactId();
        const userMessage = event.Details?.ContactData?.Attributes?.userMessage || 
                           event.Details?.Parameters?.userMessage ||
                           "Hola";
        const userContext = event.Details?.ContactData?.Attributes?.userContext || "{}";
        
        console.log(`Contact ID: ${contactId}`);
        console.log(`User Message: ${userMessage}`);
        
        // Obtener o crear historial de conversación
        let history = conversationHistory.get(contactId) || [];
        
        // Agregar mensaje del usuario al historial
        history.push({
            role: "user",
            content: userMessage
        });
        
        // Limitar historial a últimos 10 turnos para no exceder contexto
        if (history.length > 20) {
            history = history.slice(-20);
        }
        
        // Construir system prompt con contexto del usuario
        const systemPromptWithContext = LUPITA_SYSTEM_PROMPT + `

# CONTEXTO DEL USUARIO (para esta llamada)
${userContext}
`;
        
        // Llamar a Bedrock (Claude)
        const response = await bedrockClient.send(new InvokeModelCommand({
            modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
            contentType: "application/json",
            accept: "application/json",
            body: JSON.stringify({
                anthropic_version: "bedrock-2023-05-31",
                max_tokens: 500,  // ← AUMENTADO de 200 a 500 (CRÍTICO)
                temperature: 0.7,
                system: systemPromptWithContext,
                messages: history
            })
        }));
        
        // Procesar respuesta
        const responseBody = JSON.parse(new TextDecoder().decode(response.body));
        const lupitaResponse = responseBody.content[0].text;
        
        console.log("Lupita response:", lupitaResponse);
        
        // Agregar respuesta de Lupita al historial
        history.push({
            role: "assistant",
            content: lupitaResponse
        });
        
        // Guardar historial actualizado
        conversationHistory.set(contactId, history);
        
        // Generar audio con ElevenLabs (si está configurado)
        let audioBase64 = null;
        if (ELEVENLABS_API_KEY && LUPITA_VOICE_ID) {
            audioBase64 = await generateAudioWithElevenLabs(lupitaResponse);
        }
        
        // Retornar respuesta para AWS Connect
        return {
            statusCode: 200,
            lupitaResponse: lupitaResponse,
            audioBase64: audioBase64,
            contactId: contactId,
            metadata: {
                tokensUsed: responseBody.usage?.output_tokens || 0,
                historyLength: history.length
            }
        };
        
    } catch (error) {
        console.error("=== LUPITA LAMBDA ERROR ===");
        console.error("Error:", error);
        
        // Respuesta de fallback amigable
        return {
            statusCode: 500,
            lupitaResponse: "Ay, disculpe, se me fue el hilo. ¿Me puede repetir eso, por favor?",
            error: error.message
        };
    }
};

// ============================================
// INTEGRACIÓN ELEVENLABS
// ============================================

async function generateAudioWithElevenLabs(text) {
    if (!ELEVENLABS_API_KEY || !LUPITA_VOICE_ID) {
        console.log("ElevenLabs not configured, skipping audio generation");
        return null;
    }
    
    try {
        const response = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${LUPITA_VOICE_ID}/stream`,
            {
                method: 'POST',
                headers: {
                    'xi-api-key': ELEVENLABS_API_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: text,
                    model_id: "eleven_multilingual_v2",
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75,
                        style: 0.5,
                        use_speaker_boost: true
                    }
                })
            }
        );
        
        if (!response.ok) {
            throw new Error(`ElevenLabs API error: ${response.status}`);
        }
        
        const audioBuffer = await response.arrayBuffer();
        const audioBase64 = Buffer.from(audioBuffer).toString('base64');
        
        console.log("Audio generated successfully, size:", audioBase64.length);
        return audioBase64;
        
    } catch (error) {
        console.error("ElevenLabs error:", error);
        return null;
    }
}

// ============================================
// HELPERS
// ============================================

function generateContactId() {
    return `lupita-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ============================================
// FUNCIÓN PARA LIMPIAR HISTORIAL (llamar al final de la llamada)
// ============================================

export const cleanupHandler = async (event) => {
    const contactId = event.Details?.ContactData?.ContactId;
    if (contactId) {
        conversationHistory.delete(contactId);
        console.log(`Cleaned up history for: ${contactId}`);
    }
    return { statusCode: 200 };
};
