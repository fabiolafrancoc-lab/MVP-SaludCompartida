/**
 * API: GENERATE SCRIPT (usando LangChain Agent + Weaviate)
 * 
 * Genera script personalizado para llamar a un usuario
 * usando Lupita Agent powered by LangChain + Weaviate + OpenAI
 * 
 * POST /api/generate-script
 * Body: { "phone": "+525512345678" }
 */

import LupitaAgent from '../ai-brain/lupita-agent-weaviate.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { phone } = req.body;
    
    if (!phone) {
      return res.status(400).json({ 
        error: 'Missing required field: phone' 
      });
    }
    
    console.log(`🎭 Generating personalized script for ${phone}...`);
    
    // Inicializar Lupita Agent con Weaviate
    // El agente se asigna automáticamente según el teléfono del usuario
    const agent = new LupitaAgent(phone);
    await agent.initialize(phone);
    
    // Obtener info del agente asignado
    const agentInfo = agent.getAgentInfo();
    console.log(`📞 Agente asignado: ${agentInfo.name} (${agentInfo.age} años, ${agentInfo.specialization})`);
    
    // LangChain Agent + Weaviate genera el script automáticamente
    // Internamente:
    // 1. Busca historial del usuario en Weaviate (search_user_history)
    // 2. Calcula churn risk actual (get_churn_risk)
    // 3. Busca técnicas exitosas en knowledge base (search_knowledge)
    // 4. Busca casos similares (search_similar_users)
    // 5. Genera script personalizado con GPT-4 usando personalidad del agente
    const scriptOutput = await agent.generateScript(phone);
    
    console.log(`✅ Script generated for ${phone} by ${agentInfo.name}`);
    
    return res.status(200).json({
      success: true,
      phone,
      agent: {
        name: agentInfo.name,
        fullName: agentInfo.fullName,
        age: agentInfo.age,
        specialization: agentInfo.specialization
      },
      script: scriptOutput,
      generated_at: new Date().toISOString(),
      powered_by: 'LangChain + Weaviate + OpenAI GPT-4'
    });
    
  } catch (error) {
    console.error('❌ Error generating script:', error);
    return res.status(500).json({
      error: 'Failed to generate script',
      details: error.message
    });
  }
}
