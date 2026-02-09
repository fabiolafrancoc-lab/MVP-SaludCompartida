/**
 * API: GET ASSIGNED AGENT
 * 
 * Devuelve el agente AI asignado a un usuario específico
 * 
 * GET /api/get-assigned-agent?phone=+525512345678
 */

import { assignAgentToUser, getAgentStats } from '../ai-brain/agents-config.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { phone } = req.query;
    
    if (!phone) {
      // Si no hay teléfono, devolver estadísticas de agentes
      const stats = getAgentStats();
      return res.status(200).json({
        success: true,
        stats,
        message: 'Proporciona un parámetro "phone" para ver el agente asignado'
      });
    }
    
    // Asignar agente basado en el teléfono
    const agent = assignAgentToUser(phone);
    
    return res.status(200).json({
      success: true,
      phone,
      agent: {
        id: agent.id,
        name: agent.name,
        fullName: agent.fullName,
        age: agent.age,
        gender: agent.gender,
        personality: agent.personality,
        tone: agent.tone,
        specialization: agent.specialization,
        greetingStyle: agent.greetingStyle,
        traits: agent.traits
      },
      note: 'Este agente siempre será asignado a este número de teléfono'
    });
    
  } catch (error) {
    console.error('❌ Error getting assigned agent:', error);
    return res.status(500).json({
      error: 'Failed to get assigned agent',
      details: error.message
    });
  }
}
