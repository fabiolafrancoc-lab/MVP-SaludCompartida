/**
 * ANALYZE ECOSYSTEM PATTERNS
 * 
 * Este endpoint ejecuta análisis automático del ecosistema completo para:
 * 1. Detectar patrones de cancelación (churn predictors)
 * 2. Identificar power hours (mejores horarios)
 * 3. Encontrar frases predictivas de outcomes
 * 4. Análisis de cohortes
 * 5. Registrar hallazgos en collective_knowledge_base
 * 
 * Se puede ejecutar:
 * - Manualmente: POST /api/analyze-ecosystem-patterns
 * - Automáticamente: Cron job diario/semanal
 * - Trigger: Después de N llamadas nuevas
 */

import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🔍 Iniciando análisis automático del ecosistema...');
    
    const insights = {
      churn_patterns: [],
      power_hours: [],
      predictive_phrases: [],
      cohort_insights: [],
      new_knowledge_entries: 0
    };

    // ========================================================================
    // 1. DETECTAR PATRONES DE CANCELACIÓN
    // ========================================================================
    console.log('📊 Analizando patrones de churn...');
    const { data: churnPatterns, error: churnError } = await supabase
      .rpc('detect_churn_patterns');
    
    if (!churnError && churnPatterns) {
      insights.churn_patterns = churnPatterns;
      
      // Registrar patrones significativos en knowledge base
      for (const pattern of churnPatterns) {
        if (pattern.confidence >= 0.7 && pattern.sample_size >= 20) {
          await supabase.from('collective_knowledge_base').upsert({
            knowledge_type: 'churn_predictor',
            content: pattern.pattern_description,
            outcome_type: 'cancellation',
            context: `Detected in ${pattern.user_segment}`,
            times_used: pattern.sample_size,
            success_rate: pattern.churn_rate,
            confidence_score: pattern.confidence,
            is_warning_signal: true,
            risk_level: pattern.churn_rate > 50 ? 'high' : 'medium'
          });
          insights.new_knowledge_entries++;
        }
      }
    }

    // ========================================================================
    // 2. ENCONTRAR POWER HOURS (mejores horarios)
    // ========================================================================
    console.log('⏰ Identificando power hours...');
    const { data: powerHours, error: hoursError } = await supabase
      .rpc('find_power_hours');
    
    if (!hoursError && powerHours) {
      insights.power_hours = powerHours.slice(0, 10); // Top 10
      
      // Registrar top 3 horarios como sticky features
      for (const slot of powerHours.slice(0, 3)) {
        if (slot.call_count >= 10) {
          await supabase.from('collective_knowledge_base').upsert({
            knowledge_type: 'pattern',
            content: `Optimal calling time: ${slot.day_of_week.trim()} at ${slot.hour_of_day}:00`,
            outcome_type: 'engagement',
            context: 'Timing optimization',
            best_day_of_week: slot.day_of_week.trim().toLowerCase(),
            best_time_of_day: slot.hour_of_day < 12 ? 'mañana' : slot.hour_of_day < 18 ? 'tarde' : 'noche',
            times_used: slot.call_count,
            avg_quality_rating: slot.avg_quality,
            success_rate: (slot.avg_quality / 5) * 100,
            is_sticky_feature: true
          });
          insights.new_knowledge_entries++;
        }
      }
    }

    // ========================================================================
    // 3. IDENTIFICAR FRASES PREDICTIVAS
    // ========================================================================
    console.log('💬 Buscando frases predictivas...');
    const { data: predictivePhrases, error: phrasesError } = await supabase
      .rpc('find_predictive_phrases', { target_outcome: 'cancellation' });
    
    if (!phrasesError && predictivePhrases) {
      insights.predictive_phrases = predictivePhrases.slice(0, 20);
      
      // Registrar frases de alerta (correlación alta con churn)
      for (const phrase of predictivePhrases.slice(0, 10)) {
        if (phrase.times_observed >= 15 && phrase.outcome_correlation >= 0.7) {
          await supabase.from('collective_knowledge_base').upsert({
            knowledge_type: 'churn_predictor',
            content: `Warning phrase detected: "${phrase.phrase}"`,
            outcome_type: 'cancellation',
            context: 'User mentions this word in calls with poor outcomes',
            times_used: phrase.times_observed,
            success_rate: phrase.outcome_correlation * 100,
            is_warning_signal: true,
            risk_level: phrase.outcome_correlation > 0.8 ? 'high' : 'medium'
          });
          insights.new_knowledge_entries++;
        }
      }
    }

    // ========================================================================
    // 4. ANÁLISIS DE COHORTES
    // ========================================================================
    console.log('👥 Analizando cohortes...');
    const { data: cohorts, error: cohortError } = await supabase
      .rpc('cohort_analysis');
    
    if (!cohortError && cohorts) {
      insights.cohort_insights = cohorts;
      
      // Comparar cohortes para detectar mejoras/deterioros
      if (cohorts.length >= 2) {
        const latest = cohorts[0];
        const previous = cohorts[1];
        
        const engagementChange = latest.engagement_rate - previous.engagement_rate;
        const qualityChange = latest.avg_quality - previous.avg_quality;
        
        if (Math.abs(engagementChange) > 10) {
          await supabase.from('collective_knowledge_base').insert({
            knowledge_type: 'pattern',
            content: `Cohort ${latest.cohort} shows ${engagementChange > 0 ? 'improvement' : 'decline'} in engagement: ${engagementChange.toFixed(1)}%`,
            outcome_type: engagementChange > 0 ? 'engagement' : 'cancellation',
            context: 'Cohort comparison analysis',
            times_used: latest.total_users,
            success_rate: latest.engagement_rate,
            avg_quality_rating: latest.avg_quality,
            is_warning_signal: engagementChange < -10
          });
          insights.new_knowledge_entries++;
        }
      }
    }

    // ========================================================================
    // 5. ANÁLISIS CON GPT-4: Síntesis de hallazgos
    // ========================================================================
    console.log('🤖 Generando síntesis con GPT-4...');
    
    const synthesisPrompt = `Eres un analista de datos experto en health tech. Analiza estos datos del ecosistema:

PATRONES DE CHURN:
${JSON.stringify(insights.churn_patterns, null, 2)}

MEJORES HORARIOS:
${JSON.stringify(insights.power_hours.slice(0, 5), null, 2)}

FRASES PREDICTIVAS (top 10):
${JSON.stringify(insights.predictive_phrases.slice(0, 10), null, 2)}

COHORTES:
${JSON.stringify(insights.cohort_insights, null, 2)}

Genera un resumen ejecutivo con:
1. 3 insights clave más importantes
2. 2 acciones recomendadas inmediatas
3. 1 hipótesis a validar

Formato JSON:
{
  "key_insights": ["...", "...", "..."],
  "immediate_actions": ["...", "..."],
  "hypothesis_to_test": "..."
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: synthesisPrompt }],
      response_format: { type: 'json_object' },
      temperature: 0.3
    });

    const synthesis = JSON.parse(completion.choices[0].message.content);
    insights.executive_summary = synthesis;

    // Guardar el análisis ejecutivo
    await supabase.from('collective_knowledge_base').insert({
      knowledge_type: 'pattern',
      content: `Executive Summary: ${synthesis.key_insights.join('; ')}`,
      outcome_type: 'engagement',
      context: `Generated on ${new Date().toISOString()}. Actions: ${synthesis.immediate_actions.join('; ')}`,
      confidence_score: 0.85,
      is_active: true
    });

    console.log(`✅ Análisis completado. ${insights.new_knowledge_entries} nuevos registros en knowledge base`);

    return res.status(200).json({
      success: true,
      message: 'Ecosystem analysis completed',
      insights,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error en análisis del ecosistema:', error);
    return res.status(500).json({
      error: 'Failed to analyze ecosystem',
      details: error.message
    });
  }
}
