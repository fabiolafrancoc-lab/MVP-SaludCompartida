/**
 * DETECT EMOTION WITH CLAUDE
 * POST /api/detect-emotion
 * 
 * Body:
 * {
 *   "text": "Me siento muy triste y solo"
 * }
 */

import { detectEmotion } from '../src/lib/claude-client.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ 
        error: 'Text requerido',
        example: {
          text: 'Me siento muy triste y solo'
        }
      });
    }

    console.log('🔍 Detectando emoción con Claude...');

    const emotion = await detectEmotion(text);

    console.log('✅ Emoción detectada:', emotion);

    // Mapeo de emociones a español
    const emotionMap = {
      'joy': 'alegría',
      'sadness': 'tristeza',
      'anger': 'enojo',
      'fear': 'miedo',
      'anxiety': 'ansiedad',
      'hope': 'esperanza',
      'neutral': 'neutral'
    };

    return res.status(200).json({
      success: true,
      text: text,
      emotion: emotion,
      emotionEs: emotionMap[emotion] || emotion,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error detectando emoción:', error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
