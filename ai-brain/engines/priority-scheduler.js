/**
 * PRIORITY SCHEDULER
 * 
 * Decide a quién llamar primero cada día
 * Optimiza para: máxima retención + mejor timing + eficiencia
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export class PriorityScheduler {
  
  /**
   * Calcula score de prioridad para un usuario
   */
  async calculatePriority(user) {
    
    // Factor 1: Riesgo de churn (0-100)
    const churnRisk = await this.getChurnProbability(user.phone);
    const churnWeight = 50; // 50% del score
    
    // Factor 2: Días sin contacto (0-30)
    const daysSinceLastCall = await this.getDaysSinceLastCall(user.phone);
    const recencyWeight = 20; // 20% del score
    
    // Factor 3: Power hour match (0-10)
    const powerHourMatch = await this.isPowerHour(user);
    const timingWeight = 15; // 15% del score
    
    // Factor 4: Lifetime value (0-100)
    const ltv = await this.calculateLTV(user);
    const valueWeight = 10; // 10% del score
    
    // Factor 5: Intervención pendiente (0-100)
    const pendingAction = await this.hasPendingEscalation(user.phone);
    const actionWeight = 5; // 5% del score
    
    // Score total
    const priorityScore = (
      (churnRisk * churnWeight / 100) +
      (Math.min(daysSinceLastCall, 30) * recencyWeight / 30) +
      (powerHourMatch * timingWeight) +
      (this.normalize(ltv, 0, 1000) * valueWeight) +
      (pendingAction ? actionWeight : 0)
    );
    
    return {
      score: priorityScore,
      breakdown: {
        churnRisk: churnRisk.toFixed(1),
        daysSinceLastCall,
        powerHourMatch: powerHourMatch ? 'Yes' : 'No',
        ltv: ltv.toFixed(2),
        pendingAction
      }
    };
  }
  
  /**
   * Genera la cola de prioridades para hoy
   */
  async generateTodayQueue(capacity = 50) {
    console.log(`📋 Generating priority queue for ${capacity} calls`);
    
    // 1. Obtener todos los usuarios activos
    const { data: activeUsers, error } = await supabase
      .from('user_conversation_profiles')
      .select('*')
      .eq('is_active', true);
    
    if (error) {
      throw new Error(`Error fetching active users: ${error.message}`);
    }
    
    console.log(`Found ${activeUsers.length} active users`);
    
    // 2. Calcular prioridad para cada uno
    const usersWithPriority = await Promise.all(
      activeUsers.map(async (user) => {
        const priority = await this.calculatePriority(user);
        return {
          ...user,
          priority_score: priority.score,
          priority_breakdown: priority.breakdown
        };
      })
    );
    
    // 3. Ordenar por score (mayor primero)
    const sortedQueue = usersWithPriority
      .sort((a, b) => b.priority_score - a.priority_score)
      .slice(0, capacity);
    
    // 4. Enriquecer con contexto adicional
    const enrichedQueue = await Promise.all(
      sortedQueue.map(async (user, index) => {
        const recommendedScript = await this.getRecommendedScript(user);
        const estimatedDuration = await this.estimateCallDuration(user);
        
        return {
          rank: index + 1,
          user_phone: user.phone_number,
          user_name: user.preferred_name || 'Usuario',
          priority_score: user.priority_score.toFixed(1),
          reason: this.generatePriorityReason(user),
          recommended_script: recommendedScript,
          estimated_duration: `${estimatedDuration} min`,
          metadata: user.priority_breakdown
        };
      })
    );
    
    // 5. Calcular métricas totales
    const totalTime = enrichedQueue.reduce((sum, call) => 
      sum + parseInt(call.estimated_duration), 0
    );
    
    return {
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
      capacity,
      priority_queue: enrichedQueue,
      estimated_total_time: `${(totalTime / 60).toFixed(1)} hours`,
      coverage: `Top ${capacity} of ${activeUsers.length} active users`
    };
  }
  
  /**
   * Obtiene probabilidad de churn del usuario
   */
  async getChurnProbability(phone) {
    // Buscar en collective_knowledge_base si hay patrón de riesgo
    const { data: userProfile } = await supabase
      .from('user_conversation_profiles')
      .select('*')
      .eq('phone_number', phone)
      .single();
    
    if (!userProfile) return 0;
    
    // Buscar patrones de churn matching
    const { data: churnPatterns } = await supabase
      .from('collective_knowledge_base')
      .select('*')
      .eq('knowledge_type', 'churn_predictor')
      .eq('is_warning_signal', true)
      .gte('confidence_score', 0.7);
    
    if (!churnPatterns || churnPatterns.length === 0) return 0;
    
    // Calcular match con usuario actual
    let maxRisk = 0;
    for (const pattern of churnPatterns) {
      const matchScore = this.calculatePatternMatch(userProfile, pattern);
      if (matchScore > 0.6) {
        maxRisk = Math.max(maxRisk, pattern.success_rate || 0);
      }
    }
    
    return maxRisk;
  }
  
  /**
   * Calcula días desde última llamada
   */
  async getDaysSinceLastCall(phone) {
    const { data: lastCall } = await supabase
      .from('call_recordings')
      .select('created_at')
      .eq('user_phone', phone)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (!lastCall) return 30; // Nunca llamado = máxima prioridad
    
    const daysDiff = Math.floor(
      (Date.now() - new Date(lastCall.created_at).getTime()) / (1000 * 60 * 60 * 24)
    );
    
    return Math.min(daysDiff, 30);
  }
  
  /**
   * Verifica si estamos en power hour del usuario
   */
  async isPowerHour(user) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.toLocaleDateString('es-MX', { weekday: 'long' }).toLowerCase();
    
    // Buscar power hours del usuario en knowledge base
    const { data: powerHours } = await supabase
      .from('collective_knowledge_base')
      .select('*')
      .eq('knowledge_type', 'pattern')
      .ilike('content', '%optimal calling time%')
      .or(`user_region.eq.${user.region || 'all'},age_range.eq.${user.age_range || 'all'}`);
    
    if (!powerHours || powerHours.length === 0) {
      // Default: martes-jueves 10am-12pm
      return (currentHour >= 10 && currentHour < 12 && 
              ['martes', 'miércoles', 'jueves'].includes(currentDay)) ? 10 : 0;
    }
    
    // Check si alguno coincide
    for (const ph of powerHours) {
      if (ph.best_day_of_week === currentDay) {
        const hourRange = this.parseTimeOfDay(ph.best_time_of_day);
        if (currentHour >= hourRange.start && currentHour < hourRange.end) {
          return 10;
        }
      }
    }
    
    return 0;
  }
  
  /**
   * Calcula lifetime value del usuario
   */
  async calculateLTV(user) {
    // LTV = monthly_payment × months_active × referrals_multiplier
    const monthlyPayment = user.monthly_payment || 500; // MXN
    const monthsActive = user.months_active || 1;
    const referralsMultiplier = 1 + (user.total_referrals || 0) * 0.2;
    
    return monthlyPayment * monthsActive * referralsMultiplier;
  }
  
  /**
   * Verifica si tiene escalación pendiente
   */
  async hasPendingEscalation(phone) {
    const { data: escalations } = await supabase
      .from('escalations')
      .select('*')
      .eq('user_phone', phone)
      .eq('status', 'pending')
      .gte('priority', 'MEDIUM');
    
    return escalations && escalations.length > 0;
  }
  
  /**
   * Recomienda script basado en perfil
   */
  async getRecommendedScript(user) {
    const churnRisk = await this.getChurnProbability(user.phone_number);
    
    if (churnRisk > 70) return 'retention_high_risk';
    if (churnRisk > 40) return 'retention_medium_risk';
    if (user.total_calls === 0) return 'onboarding_first_call';
    if (user.last_call_quality < 3) return 'follow_up_low_quality';
    return 'standard_check_in';
  }
  
  /**
   * Estima duración de llamada
   */
  async estimateCallDuration(user) {
    // Basado en historial
    const { data: avgDuration } = await supabase
      .from('call_recordings')
      .select('duration')
      .eq('user_phone', user.phone_number)
      .not('duration', 'is', null);
    
    if (avgDuration && avgDuration.length > 0) {
      const avg = avgDuration.reduce((sum, r) => sum + (r.duration || 0), 0) / avgDuration.length;
      return Math.round(avg / 60); // Convert to minutes
    }
    
    // Default por tipo de llamada
    const churnRisk = await this.getChurnProbability(user.phone_number);
    if (churnRisk > 70) return 10; // Llamadas de retención son más largas
    if (user.total_calls === 0) return 8; // Onboarding
    return 6; // Check-in estándar
  }
  
  /**
   * Genera razón legible de la prioridad
   */
  generatePriorityReason(user) {
    const reasons = [];
    
    if (user.priority_breakdown.churnRisk > 70) {
      reasons.push('High churn risk');
    }
    if (user.priority_breakdown.daysSinceLastCall > 14) {
      reasons.push(`${user.priority_breakdown.daysSinceLastCall} days no contact`);
    }
    if (user.priority_breakdown.powerHourMatch === 'Yes') {
      reasons.push('In power hour');
    }
    if (user.priority_breakdown.pendingAction) {
      reasons.push('Pending escalation');
    }
    
    return reasons.length > 0 ? reasons.join(' + ') : 'Regular check-in';
  }
  
  /**
   * Helper: Normalizar valores a rango 0-1
   */
  normalize(value, min, max) {
    return Math.min(Math.max((value - min) / (max - min), 0), 1) * 100;
  }
  
  /**
   * Helper: Calcular match entre usuario y patrón
   */
  calculatePatternMatch(user, pattern) {
    let matches = 0;
    let total = 0;
    
    if (pattern.age_range) {
      total++;
      if (user.age_range === pattern.age_range) matches++;
    }
    if (pattern.user_region) {
      total++;
      if (user.region === pattern.user_region) matches++;
    }
    if (pattern.migrant_location) {
      total++;
      if (user.migrant_location === pattern.migrant_location) matches++;
    }
    
    return total > 0 ? matches / total : 0;
  }
  
  /**
   * Helper: Parse time of day to hours
   */
  parseTimeOfDay(timeStr) {
    const mapping = {
      'mañana': { start: 8, end: 12 },
      'tarde': { start: 12, end: 18 },
      'noche': { start: 18, end: 21 }
    };
    return mapping[timeStr] || { start: 10, end: 12 };
  }
}
