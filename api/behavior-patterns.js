/**
 * API Endpoint: Obtener patrones de comportamiento
 * 
 * GET /api/behavior-patterns
 * 
 * Este endpoint permite analizar los patrones de comportamiento capturados
 * del segmento base de la pirámide en América Latina.
 * 
 * Query params:
 * - userId: ID específico de usuario (opcional)
 * - gender: Filtrar por género (opcional)
 * - ageMin, ageMax: Rango de edad (opcional)
 * - region: Filtrar por región mexicana (opcional)
 * - type: 'user' | 'population' (default: 'user' si userId presente, sino 'population')
 */

import { getUserBehaviorPatterns, getPopulationPatterns } from './keyword-pattern-analyzer.js';

export default async function handler(req, res) {
  // Solo GET permitido
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, gender, ageMin, ageMax, region, type } = req.query;

    // Análisis individual de usuario
    if (userId || type === 'user') {
      if (!userId) {
        return res.status(400).json({ error: 'userId required for user analysis' });
      }

      const patterns = await getUserBehaviorPatterns(userId);
      
      if (!patterns) {
        return res.status(404).json({ error: 'No data found for this user' });
      }

      return res.status(200).json({
        type: 'user',
        userId,
        data: patterns,
        message: 'Patrones de comportamiento individuales obtenidos exitosamente'
      });
    }

    // Análisis poblacional (default)
    const filters = {};
    if (gender) filters.gender = gender;
    if (ageMin && ageMax) {
      filters.ageMin = parseInt(ageMin);
      filters.ageMax = parseInt(ageMax);
    }
    if (region) filters.region = region;

    const populationData = await getPopulationPatterns(filters);

    if (!populationData) {
      return res.status(500).json({ error: 'Error retrieving population patterns' });
    }

    return res.status(200).json({
      type: 'population',
      filters,
      data: populationData,
      message: 'Patrones de comportamiento poblacionales obtenidos exitosamente',
      note: 'Esta data es ÚNICA - no existe información similar del segmento base de la pirámide en LATAM'
    });

  } catch (error) {
    console.error('❌ Error in behavior-patterns endpoint:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
