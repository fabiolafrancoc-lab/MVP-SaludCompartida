/**
 * API Health Check para Weaviate
 * Endpoint: /api/weaviate-health
 * 
 * Devuelve estado de salud y estadísticas de Weaviate
 */

import { getWeaviateClient } from '../src/lib/weaviate-client.js';

export default async function handler(req, res) {
  // Solo permitir GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const weaviate = getWeaviateClient();

    // 1. Health check
    const health = await weaviate.healthCheck();
    
    if (!health.healthy) {
      return res.status(503).json({
        success: false,
        error: 'Weaviate no está disponible',
        details: health,
        timestamp: new Date().toISOString()
      });
    }

    // 2. Estadísticas
    const stats = await weaviate.getStats();

    // 3. Test de búsqueda rápida para medir latencia
    const startTime = Date.now();
    await weaviate.searchCollectiveKnowledge('test', null, 1);
    const searchLatency = Date.now() - startTime;

    // 4. Respuesta
    res.status(200).json({
      success: true,
      status: 'healthy',
      weaviate: {
        healthy: true,
        url: process.env.WEAVIATE_URL || 'not configured',
        connected: true
      },
      data: {
        callRecordings: stats.callRecordings,
        collectiveKnowledge: stats.collectiveKnowledge,
        userProfiles: stats.userProfiles,
        total: stats.callRecordings + stats.collectiveKnowledge + stats.userProfiles
      },
      performance: {
        searchLatency: `${searchLatency}ms`,
        rating: searchLatency < 100 ? 'excellent' : searchLatency < 300 ? 'good' : 'slow'
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error en health check:', error);
    
    res.status(500).json({
      success: false,
      error: 'Error conectando a Weaviate',
      message: error.message,
      details: {
        hasWeaviateUrl: !!process.env.WEAVIATE_URL,
        hasWeaviateKey: !!process.env.WEAVIATE_API_KEY
      },
      timestamp: new Date().toISOString()
    });
  }
}
