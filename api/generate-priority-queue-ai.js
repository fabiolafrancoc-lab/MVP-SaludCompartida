/**
 * API: GENERATE PRIORITY QUEUE (usando LangChain Agent)
 * 
 * Genera lista priorizada de llamadas usando Lupita Agent
 * 
 * POST /api/generate-priority-queue-ai
 * Body: { "capacity": 50 }
 * 
 * Using Weaviate version for 7x faster vector search performance
 */

import { LupitaAgent } from '../ai-brain/lupita-agent-weaviate.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { capacity = 50 } = req.body;
    
    console.log(`📋 Generating AI-powered priority queue (capacity: ${capacity})...`);
    
    // Initialize Lupita Agent with Weaviate backend
    const agent = new LupitaAgent();
    if (!agent) {
      throw new Error('Failed to initialize Lupita Agent');
    }
    
    // LangChain Agent genera la cola
    // Internamente:
    // 1. Obtiene todos los usuarios activos
    // 2. Para cada uno, calcula churn_risk con tool (using Weaviate)
    // 3. Considera días sin contacto, LTV, escalaciones
    // 4. Ordena por prioridad
    // 5. Recomienda script para cada uno
    const queueOutput = await agent.generatePriorityQueue(capacity);
    
    console.log(`✅ Priority queue generated`);
    
    // Parsear output
    let queue;
    try {
      queue = JSON.parse(queueOutput);
    } catch (e) {
      queue = {
        raw_output: queueOutput,
        note: 'Agent provided non-JSON response'
      };
    }
    
    return res.status(200).json({
      success: true,
      queue,
      capacity,
      generated_at: new Date().toISOString(),
      powered_by: 'LangChain + OpenAI GPT-4'
    });
    
  } catch (error) {
    console.error('❌ Error generating priority queue:', error);
    return res.status(500).json({
      error: 'Failed to generate priority queue',
      details: error.message
    });
  }
}
