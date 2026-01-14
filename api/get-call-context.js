/**
 * ENDPOINT: Obtener Contexto para Nueva Llamada
 * 
 * ANTES de que Lupita llame a un usuario, este endpoint le da:
 * - Qué sabe sobre el usuario
 * - Cómo iniciar la conversación
 * - Qué temas retomar
 * 
 * Uso: GET /api/get-call-context?userId=+525512345678
 */

import { createClient } from '@supabase/supabase-js';

function getSupabaseClient() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId parameter' });
    }

    console.log('📋 Getting call context for user:', userId);

    const supabase = getSupabaseClient();

    // 1. Obtener perfil del usuario
    const { data: profile } = await supabase
      .from('user_conversation_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    // Si no hay perfil, es primera llamada
    if (!profile) {
      return res.status(200).json({
        isFirstCall: true,
        message: 'Primera llamada con este usuario',
        suggestedOpening: 'Hola, le habla [tu nombre] de Salud Compartida. ¿Cómo está usted el día de hoy?',
        tips: [
          'Presentarse claramente',
          'Explicar el propósito de la llamada',
          'Preguntar por su estado de salud general',
          'Escuchar activamente y capturar información personal'
        ]
      });
    }

    // 2. Obtener últimas 3 llamadas
    const { data: recentCalls } = await supabase
      .from('call_recordings')
      .select('recording_date, transcription_text, analysis_quality_rating')
      .eq('user_id', userId)
      .order('recording_date', { ascending: false })
      .limit(3);

    // 3. Usar función de base de datos para contexto
    const { data: contextData } = await supabase
      .rpc('get_user_context_for_call', { p_user_id: userId });

    const context = contextData?.[0];

    // 4. Construir respuesta estructurada
    const response = {
      isFirstCall: false,
      user: {
        name: profile.preferred_name || profile.name || 'Usuario',
        totalCalls: profile.total_calls,
        lastCallDate: profile.last_contact_date,
        daysSinceLastCall: Math.floor(
          (new Date() - new Date(profile.last_contact_date)) / (1000 * 60 * 60 * 24)
        )
      },
      
      // LO QUE SABEMOS
      knownInformation: {
        health: {
          conditions: profile.health_conditions || [],
          lastSymptoms: profile.last_symptoms || [],
          medications: profile.medications || [],
          concerns: profile.health_concerns || []
        },
        personal: {
          family: profile.family_members || [],
          location: profile.location,
          ageRange: profile.age_range
        },
        emotional: {
          lastState: profile.emotional_state,
          supportNetwork: profile.support_network || [],
          stressors: profile.stressors || []
        },
        economic: {
          situation: profile.income_situation,
          concerns: profile.economic_concerns || [],
          productsInterested: profile.products_interested || []
        }
      },

      // RESUMEN DE CONVERSACIONES ANTERIORES
      conversationHistory: {
        summary: profile.conversation_summary,
        keyTopics: profile.key_topics || [],
        recentCalls: recentCalls?.slice(0, 2).map(call => ({
          date: call.recording_date,
          qualityRating: call.analysis_quality_rating,
          snippet: call.transcription_text?.substring(0, 100) + '...'
        })) || []
      },

      // CÓMO INICIAR LA LLAMADA
      callGuidance: {
        greeting: context?.conversation_starters?.[0] || 
                  `Hola ${profile.preferred_name || profile.name}, le habla [tu nombre] de Salud Compartida.`,
        
        openingQuestions: [
          profile.last_symptoms?.length > 0 
            ? `¿Cómo ha seguido de ${profile.last_symptoms[0]}?`
            : '¿Cómo ha estado?',
          
          profile.family_members?.length > 0
            ? `¿Cómo está ${profile.family_members[0].split(' ')[0]}?` // Primer nombre del primer familiar
            : '¿Cómo está su familia?'
        ],

        topicsToExplore: [
          ...(profile.health_concerns || []).map(c => `Seguimiento: ${c}`),
          ...(profile.products_interested || []).map(p => `Interés en: ${p}`)
        ],

        thingsToAvoid: [
          profile.stressors?.length > 0 
            ? `Tema sensible: ${profile.stressors[0]}` 
            : null
        ].filter(Boolean)
      },

      // TIPS PERSONALIZADOS
      tips: generatePersonalizedTips(profile)
    };

    return res.status(200).json(response);

  } catch (error) {
    console.error('❌ Error getting call context:', error);
    return res.status(500).json({
      error: 'Failed to get context',
      message: error.message
    });
  }
}

function generatePersonalizedTips(profile) {
  const tips = [];

  if (profile.preferred_name) {
    tips.push(`✅ Usar: "${profile.preferred_name}" (así le gusta que le llamen)`);
  }

  if (profile.emotional_state === 'preocupada' || profile.emotional_state === 'triste') {
    tips.push('💙 Usuario estuvo emotivo en última llamada - usar validación emocional');
  }

  if (profile.health_conditions?.length > 0) {
    tips.push(`🏥 Condiciones conocidas: ${profile.health_conditions.join(', ')}`);
  }

  if (profile.support_network?.length > 0) {
    tips.push(`👥 Red de apoyo: ${profile.support_network.join(', ')}`);
  }

  if (profile.total_calls >= 5) {
    tips.push('⭐ Usuario frecuente - construir sobre relación establecida');
  }

  const daysSince = Math.floor(
    (new Date() - new Date(profile.last_contact_date)) / (1000 * 60 * 60 * 24)
  );

  if (daysSince > 14) {
    tips.push(`⏰ Hace ${daysSince} días desde última llamada - preguntar qué ha pasado`);
  }

  return tips;
}
