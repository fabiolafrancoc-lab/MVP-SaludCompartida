/**
 * API: GET PRIORITY QUEUE
 * 
 * Obtiene la lista priorizada de llamadas para hoy
 * 
 * GET /api/get-priority-queue
 * GET /api/get-priority-queue?capacity=100
 * GET /api/get-priority-queue?refresh=true
 */

import { lupitaBrain } from '../ai-brain/lupita-brain.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const capacity = parseInt(req.query.capacity) || 50;
    const refresh = req.query.refresh === 'true';
    
    console.log(`📋 Fetching priority queue (capacity: ${capacity}, refresh: ${refresh})`);
    
    let queue;
    
    if (refresh) {
      // Generar cola fresca
      console.log('Generating fresh priority queue...');
      queue = await lupitaBrain.scheduler.generateTodayQueue(capacity);
    } else {
      // Obtener de cache si existe
      console.log('Checking for cached queue...');
      queue = await lupitaBrain.getTodayPriorityQueue();
    }
    
    return res.status(200).json({
      success: true,
      queue,
      cached: !refresh,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error fetching priority queue:', error);
    return res.status(500).json({
      error: 'Failed to fetch priority queue',
      details: error.message
    });
  }
}
