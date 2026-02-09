/**
 * ENDPOINT: Extraer Información y Actualizar Perfil de Usuario
 * 
 * Después de transcribir una llamada, este endpoint:
 * 1. Extrae información personal/salud/emocional del usuario
 * 2. Actualiza el perfil acumulativo del usuario
 * 3. Prepara contexto para la SIGUIENTE llamada
 * 
 * Uso: POST /api/update-user-profile
 * Body: { recordingId: "uuid" }
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
    const { recordingId } = req.body;

    if (!recordingId) {
      return res.status(400).json({ error: 'Missing recordingId' });
    }

    console.log('👤 Updating user profile for recording:', recordingId);

    const supabase = getSupabaseClient();

    // 1. Obtener la grabación con transcripción
    const { data: recording, error: fetchError } = await supabase
      .from('call_recordings')
      .select('*')
      .eq('id', recordingId)
      .single();

    if (fetchError || !recording) {
      return res.status(404).json({ error: 'Recording not found' });
    }

    if (!recording.transcription_text) {
      return res.status(400).json({ error: 'Recording not transcribed yet' });
    }

    // 2. Obtener perfil existente del usuario (si existe)
    const { data: existingProfile } = await supabase
      .from('user_conversation_profiles')
      .select('*')
      .eq('user_id', recording.user_id)
      .single();

    const isFirstCall = !existingProfile;

    // 3. Extraer información con GPT-4
    console.log('🤖 Extracting information with GPT-4...');
    
    const extractionPrompt = `Analiza esta transcripción de una llamada de salud y extrae TODA la información personal, de salud y emocional mencionada.

${isFirstCall ? 'NOTA: Esta es la PRIMERA llamada con este usuario.' : `NOTA: Ya hemos hablado con este usuario ${existingProfile.total_calls} veces antes.

CONTEXTO ANTERIOR:
- Nombre: ${existingProfile.preferred_name || 'Desconocido'}
- Condiciones de salud conocidas: ${existingProfile.health_conditions?.join(', ') || 'Ninguna'}
- Familia conocida: ${JSON.stringify(existingProfile.family_members) || 'Desconocida'}
- Último estado emocional: ${existingProfile.emotional_state || 'Desconocido'}
- Resumen anterior: ${existingProfile.conversation_summary || 'Sin resumen'}
`}

TRANSCRIPCIÓN:
"${recording.transcription_text}"

Extrae en JSON:
{
  "personal": {
    "name": "nombre completo si lo menciona",
    "preferredName": "cómo prefiere que le llamen (ej: Señora Lupita)",
    "ageRange": "joven/adulto/mayor si puedes inferir",
    "location": "ciudad/colonia si la menciona",
    "familyMembers": ["lista de familiares mencionados con relación"]
  },
  "health": {
    "conditions": ["condiciones de salud mencionadas"],
    "symptoms": ["síntomas actuales"],
    "medications": ["medicamentos que toma"],
    "concerns": ["preocupaciones de salud expresadas"]
  },
  "emotional": {
    "currentState": "estado emocional actual (preocupada/animada/triste/etc)",
    "supportNetwork": ["quién la apoya: hija, vecina, etc"],
    "stressors": ["qué le preocupa o estresa"]
  },
  "economic": {
    "situation": "situación económica si se menciona",
    "concerns": ["preocupaciones económicas"],
    "productsInterested": ["productos de salud que le interesan"]
  },
  "conversationSummary": "Resumen breve de qué se habló en esta llamada (2-3 líneas)",
  "keyTopics": ["temas importantes discutidos"],
  "referencesToPast": ["si mencionó algo de llamadas anteriores"]
}

IMPORTANTE: 
- Si algo NO se menciona, usa null o []
- Sé específico: no "familia", sino "hijo Juan, esposo Pedro"
- Captura el TONO emocional`;

    const extractionResponse = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: 'Eres un experto en extraer información de conversaciones de salud comunitaria. Eres muy detallista.' },
        { role: 'user', content: extractionPrompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.1 // Baja temperatura para precisión
    });

    const extractedInfo = JSON.parse(extractionResponse.choices[0].message.content);
    console.log('✅ Information extracted');

    // 4. Guardar información extraída
    await supabase
      .from('call_extracted_info')
      .insert({
        call_recording_id: recordingId,
        user_id: recording.user_id,
        new_personal_info: extractedInfo.personal || {},
        new_health_info: extractedInfo.health || {},
        new_emotional_info: extractedInfo.emotional || {},
        new_economic_info: extractedInfo.economic || {}
      });

    // 5. Actualizar o crear perfil de usuario
    if (isFirstCall) {
      // Crear nuevo perfil
      const newProfile = {
        user_id: recording.user_id,
        name: extractedInfo.personal?.name || null,
        preferred_name: extractedInfo.personal?.preferredName || null,
        age_range: extractedInfo.personal?.ageRange || null,
        location: extractedInfo.personal?.location || null,
        family_members: extractedInfo.personal?.familyMembers || [],
        health_conditions: extractedInfo.health?.conditions || [],
        medications: extractedInfo.health?.medications || [],
        last_symptoms: extractedInfo.health?.symptoms || [],
        health_concerns: extractedInfo.health?.concerns || [],
        emotional_state: extractedInfo.emotional?.currentState || null,
        support_network: extractedInfo.emotional?.supportNetwork || [],
        stressors: extractedInfo.emotional?.stressors || [],
        income_situation: extractedInfo.economic?.situation || null,
        economic_concerns: extractedInfo.economic?.concerns || [],
        products_interested: extractedInfo.economic?.productsInterested || [],
        total_calls: 1,
        first_contact_date: recording.recording_date,
        last_contact_date: recording.recording_date,
        conversation_summary: extractedInfo.conversationSummary || '',
        key_topics: extractedInfo.keyTopics || []
      };

      await supabase
        .from('user_conversation_profiles')
        .insert(newProfile);

      console.log('✅ Created new user profile');
    } else {
      // Actualizar perfil existente (mergear información)
      const updates = {
        total_calls: existingProfile.total_calls + 1,
        last_contact_date: recording.recording_date
      };

      // Mergear arrays (agregar nuevos, no duplicar)
      if (extractedInfo.personal?.familyMembers?.length > 0) {
        updates.family_members = [
          ...new Set([...existingProfile.family_members || [], ...extractedInfo.personal.familyMembers])
        ];
      }

      if (extractedInfo.health?.conditions?.length > 0) {
        updates.health_conditions = [
          ...new Set([...existingProfile.health_conditions || [], ...extractedInfo.health.conditions])
        ];
      }

      if (extractedInfo.health?.symptoms?.length > 0) {
        updates.last_symptoms = extractedInfo.health.symptoms; // Reemplazar (son síntomas ACTUALES)
      }

      if (extractedInfo.emotional?.supportNetwork?.length > 0) {
        updates.support_network = [
          ...new Set([...existingProfile.support_network || [], ...extractedInfo.emotional.supportNetwork])
        ];
      }

      // Actualizar estado emocional (más reciente)
      if (extractedInfo.emotional?.currentState) {
        updates.emotional_state = extractedInfo.emotional.currentState;
      }

      // Actualizar resumen conversacional (acumular)
      if (extractedInfo.conversationSummary) {
        updates.conversation_summary = existingProfile.conversation_summary
          ? `${existingProfile.conversation_summary}\n\nLlamada ${updates.total_calls}: ${extractedInfo.conversationSummary}`
          : extractedInfo.conversationSummary;
      }

      // Mergear key_topics
      if (extractedInfo.keyTopics?.length > 0) {
        updates.key_topics = [
          ...new Set([...existingProfile.key_topics || [], ...extractedInfo.keyTopics])
        ];
      }

      await supabase
        .from('user_conversation_profiles')
        .update(updates)
        .eq('user_id', recording.user_id);

      console.log('✅ Updated existing user profile');
    }

    // 6. Generar contexto para SIGUIENTE llamada
    const { data: contextData } = await supabase
      .rpc('get_user_context_for_call', { p_user_id: recording.user_id });

    const nextCallContext = contextData?.[0] || null;

    return res.status(200).json({
      success: true,
      userId: recording.user_id,
      isFirstCall,
      extractedInfo,
      nextCallContext: nextCallContext ? {
        totalPreviousCalls: nextCallContext.total_previous_calls,
        keyFacts: nextCallContext.key_facts,
        conversationStarters: nextCallContext.conversation_starters
      } : null
    });

  } catch (error) {
    console.error('❌ Error updating user profile:', error);
    return res.status(500).json({
      error: 'Failed to update profile',
      message: error.message
    });
  }
}
