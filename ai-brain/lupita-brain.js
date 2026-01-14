/**
 * LUPITA AI BRAIN - Main Orchestrator
 * 
 * Coordina todos los engines:
 * - Priority Scheduler
 * - Script Generator  
 * - Escalation Engine
 * - Experiment Manager
 * - Feedback Loop
 */

import { PriorityScheduler } from './engines/priority-scheduler.js';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

class LupitaAIBrain {
  
  constructor() {
    this.scheduler = new PriorityScheduler();
    // TODO: Inicializar otros engines cuando los creemos
    // this.scriptGen = new ScriptGenerator();
    // this.escalation = new EscalationEngine();
    // this.experiments = new ExperimentManager();
    // this.feedback = new FeedbackLoop();
  }
  
  /**
   * HOURLY CYCLE
   * Ejecutado cada hora para mantener sistema actualizado
   */
  async runHourlyCycle() {
    console.log('🧠 Lupita AI Brain - Hourly Cycle Started');
    const startTime = Date.now();
    
    try {
      // 1. Actualizar cola de prioridades
      const priorityQueue = await this.scheduler.generateTodayQueue(50);
      console.log(`📋 Priority queue updated: ${priorityQueue.priority_queue.length} users`);
      
      // 2. Guardar en base de datos para consulta
      await this.savePriorityQueue(priorityQueue);
      
      // 3. TODO: Revisar escalaciones pendientes
      // const escalations = await this.escalation.checkPendingEscalations();
      
      // 4. TODO: Auto-tune basado en métricas
      // await this.feedback.autoTuneSystem();
      
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`✅ Hourly cycle completed in ${duration}s`);
      
      return {
        success: true,
        duration: `${duration}s`,
        priority_queue: priorityQueue,
        timestamp: new Date().toISOString()
      };
      
    } catch (error) {
      console.error('❌ Error in hourly cycle:', error);
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
  
  /**
   * DAILY CYCLE
   * Ejecutado cada día a las 2am
   */
  async runDailyCycle() {
    console.log('🧠 Lupita AI Brain - Daily Cycle Started');
    
    try {
      // 1. Analizar patrones del ecosistema
      // await analyzeEcosystemPatterns();
      
      // 2. Generar reporte ejecutivo
      const report = await this.generateExecutiveReport();
      
      // 3. TODO: Enviar a equipo
      // await sendReportToTeam(report);
      
      console.log('✅ Daily cycle completed');
      return report;
      
    } catch (error) {
      console.error('❌ Error in daily cycle:', error);
      throw error;
    }
  }
  
  /**
   * WEEKLY CYCLE
   * Ejecutado cada lunes
   */
  async runWeeklyCycle() {
    console.log('🧠 Lupita AI Brain - Weekly Cycle Started');
    
    try {
      // TODO: Implementar cuando tengamos ExperimentManager
      // 1. Correr experimentos
      // await this.experiments.runWeeklyExperiments();
      
      // 2. Evaluar resultados de experimentos anteriores
      // const results = await this.experiments.evaluateLastWeek();
      
      // 3. Aplicar ganadores
      // if (results.winners.length > 0) {
      //   await this.experiments.applyWinners(results.winners);
      // }
      
      console.log('✅ Weekly cycle completed');
      return { success: true };
      
    } catch (error) {
      console.error('❌ Error in weekly cycle:', error);
      throw error;
    }
  }
  
  /**
   * Genera reporte ejecutivo del sistema
   */
  async generateExecutiveReport() {
    console.log('📊 Generating executive report...');
    
    // Obtener métricas clave
    const { data: totalCalls } = await supabase
      .from('call_recordings')
      .select('id', { count: 'exact' });
    
    const { data: totalUsers } = await supabase
      .from('user_conversation_profiles')
      .select('phone_number', { count: 'exact' })
      .eq('is_active', true);
    
    const { data: avgQuality } = await supabase
      .from('call_recordings')
      .select('analysis_quality_score')
      .not('analysis_quality_score', 'is', null);
    
    const avgScore = avgQuality && avgQuality.length > 0
      ? (avgQuality.reduce((sum, r) => sum + r.analysis_quality_score, 0) / avgQuality.length).toFixed(2)
      : 0;
    
    return {
      report_date: new Date().toISOString().split('T')[0],
      metrics: {
        total_active_users: totalUsers?.length || 0,
        total_calls_recorded: totalCalls?.length || 0,
        avg_quality_score: avgScore,
        calls_per_user: totalCalls && totalUsers 
          ? (totalCalls.length / totalUsers.length).toFixed(1)
          : 0
      },
      status: 'System operational'
    };
  }
  
  /**
   * Guarda cola de prioridades en base de datos
   */
  async savePriorityQueue(queue) {
    // Guardar en tabla priority_queue_cache para consulta rápida
    const { error } = await supabase
      .from('priority_queue_cache')
      .upsert({
        date: queue.date,
        queue_data: queue,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'date'
      });
    
    if (error && error.code !== '42P01') { // Ignorar si tabla no existe aún
      console.error('Error saving priority queue:', error);
    }
  }
  
  /**
   * Obtiene cola de prioridades del día
   */
  async getTodayPriorityQueue() {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('priority_queue_cache')
      .select('*')
      .eq('date', today)
      .single();
    
    if (error || !data) {
      // Si no existe, generarla
      console.log('No cached queue found, generating new one...');
      return await this.scheduler.generateTodayQueue(50);
    }
    
    return data.queue_data;
  }
}

// Exportar instancia singleton
export const lupitaBrain = new LupitaAIBrain();
export default lupitaBrain;
