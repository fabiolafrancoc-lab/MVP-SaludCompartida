/**
 * TEST ENDPOINT: Verificar integración con Claude
 * GET /api/test-claude
 */

import { chatWithClaude, checkClaudeHealth } from '../src/lib/claude-client.js';

export default async function handler(req, res) {
  // Permitir solo GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🧪 Testing Claude integration...');

    // 1. Verificar health
    const isHealthy = await checkClaudeHealth();
    
    if (!isHealthy) {
      return res.status(503).json({
        success: false,
        error: 'Claude API no está disponible',
        troubleshooting: {
          step1: 'Verifica que ANTHROPIC_API_KEY esté configurado en Vercel',
          step2: 'Asegúrate de que la API key sea válida',
          step3: 'Revisa los logs de Vercel para más detalles'
        }
      });
    }

    // 2. Test de chat simple
    const response = await chatWithClaude([
      { 
        role: 'user', 
        content: 'Hola, soy Lupita de Salud Compartida. Por favor responde en español: ¿Cómo puedes ayudarnos a analizar conversaciones emocionales?' 
      }
    ], {
      systemPrompt: 'Eres Claude, un asistente de IA que ayuda a analizar conversaciones emocionales para un servicio de salud mental para migrantes.'
    });

    // 3. Test de análisis de emoción
    const emotionTest = '😔 Me siento muy solo aquí en Estados Unidos, extraño mucho a mi familia';
    
    console.log('✅ Claude test successful');

    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      model: 'claude-3-5-sonnet-20241022',
      tests: {
        health: {
          status: '✅ OK',
          description: 'Claude API está disponible'
        },
        chat: {
          status: '✅ OK',
          response: response.substring(0, 200) + '...',
          fullResponse: response
        },
        emotion: {
          status: '✅ Ready',
          testMessage: emotionTest,
          note: 'Usa POST /api/analyze-conversation para análisis completo'
        }
      },
      usage: {
        model: 'claude-3-5-sonnet-20241022',
        costPerMillionInputTokens: '$3.00',
        costPerMillionOutputTokens: '$15.00'
      },
      nextSteps: [
        'POST /api/analyze-conversation - Analizar una conversación completa',
        'POST /api/detect-emotion - Detectar emoción en un mensaje',
        'Integrar con VAPI webhook para análisis automático'
      ]
    });

  } catch (error) {
    console.error('❌ Claude test failed:', error);

    return res.status(500).json({
      success: false,
      error: error.message,
      troubleshooting: {
        commonIssues: {
          'Invalid API Key': 'Verifica que ANTHROPIC_API_KEY esté configurado correctamente en Vercel',
          'Rate limit exceeded': 'Espera 1 minuto y vuelve a intentar',
          'Model not found': 'Verifica que el modelo sea claude-3-5-sonnet-20241022'
        },
        vercelEnv: {
          step1: 'Ve a: https://vercel.com/fabiolafrancoc-lab/mvp-saludcompartida/settings/environment-variables',
          step2: 'Busca ANTHROPIC_API_KEY',
          step3: 'Si no existe, créala con tu API key de https://console.anthropic.com/settings/keys'
        }
      }
    });
  }
}
