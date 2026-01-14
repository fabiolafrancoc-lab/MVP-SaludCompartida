/**
 * API: RUN AI BRAIN CYCLE
 * 
 * Ejecuta manualmente un ciclo del cerebro AI
 * 
 * POST /api/run-brain-cycle
 * Body: { "cycle": "hourly" | "daily" | "weekly" }
 */

import { lupitaBrain } from '../ai-brain/lupita-brain.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { cycle = 'hourly' } = req.body;
    
    console.log(`🧠 Running ${cycle} cycle...`);
    
    let result;
    
    switch (cycle) {
      case 'hourly':
        result = await lupitaBrain.runHourlyCycle();
        break;
      case 'daily':
        result = await lupitaBrain.runDailyCycle();
        break;
      case 'weekly':
        result = await lupitaBrain.runWeeklyCycle();
        break;
      default:
        return res.status(400).json({
          error: 'Invalid cycle type',
          valid_types: ['hourly', 'daily', 'weekly']
        });
    }
    
    return res.status(200).json({
      success: true,
      cycle,
      result,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error(`❌ Error running ${req.body.cycle || 'unknown'} cycle:`, error);
    return res.status(500).json({
      error: 'Failed to run brain cycle',
      details: error.message
    });
  }
}
