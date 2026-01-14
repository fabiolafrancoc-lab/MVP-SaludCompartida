/**
 * Setup Weaviate Schema para Lupita AI Brain
 * 
 * Este script crea las clases (collections) en Weaviate para:
 * 1. CallRecording - Transcripciones y análisis de llamadas
 * 2. CollectiveKnowledge - Patrones y aprendizajes del sistema
 * 3. UserProfile - Perfiles de conversación de usuarios
 * 
 * Uso:
 * 1. Crear cuenta en https://console.weaviate.cloud
 * 2. Obtener WEAVIATE_URL y WEAVIATE_API_KEY
 * 3. Agregar a .env
 * 4. Ejecutar: node scripts/setup-weaviate-schema.js
 */

import weaviate from 'weaviate-ts-client';
import dotenv from 'dotenv';

dotenv.config();

// Extraer el host del URL (sin https://)
const weaviateUrl = process.env.WEAVIATE_URL?.replace('https://', '').replace('http://', '');

const client = weaviate.client({
  scheme: 'https',
  host: weaviateUrl,
  apiKey: {
    apiKey: process.env.WEAVIATE_API_KEY
  },
  headers: {
    'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY
  }
});

async function createSchema() {
  console.log('🚀 Iniciando creación de schema en Weaviate...\n');

  try {
    // ===== 1. CALL RECORDING CLASS =====
    console.log('📞 Creando clase CallRecording...');
    const callRecordingClass = {
      class: 'CallRecording',
      description: 'Transcripciones y análisis de llamadas telefónicas con usuarios',
      vectorizer: 'text2vec-openai',
      moduleConfig: {
        'text2vec-openai': {
          model: 'text-embedding-3-small',
          dimensions: 1536,
          type: 'text'
        }
      },
      properties: [
        {
          name: 'userPhone',
          dataType: ['text'],
          description: 'Número de teléfono del usuario (+1 o +52 + 10 dígitos)',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'userAccessCode',
          dataType: ['text'],
          description: 'Código de acceso único del usuario',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'transcription',
          dataType: ['text'],
          description: 'Transcripción completa de la llamada',
          indexFilterable: false,
          indexSearchable: true,
          moduleConfig: {
            'text2vec-openai': {
              skip: false,
              vectorizePropertyName: false
            }
          }
        },
        {
          name: 'analysis',
          dataType: ['text'],
          description: 'Análisis de GPT-4 sobre la llamada',
          indexFilterable: false,
          indexSearchable: true,
          moduleConfig: {
            'text2vec-openai': {
              skip: false,
              vectorizePropertyName: false
            }
          }
        },
        {
          name: 'sentiment',
          dataType: ['text'],
          description: 'Sentimiento de la llamada: positivo, neutral, negativo, frustrado',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'topics',
          dataType: ['text[]'],
          description: 'Temas principales discutidos',
          indexFilterable: true,
          indexSearchable: true
        },
        {
          name: 'redFlags',
          dataType: ['text[]'],
          description: 'Señales de alerta detectadas',
          indexFilterable: true,
          indexSearchable: true
        },
        {
          name: 'callDuration',
          dataType: ['int'],
          description: 'Duración de la llamada en segundos',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'audioUrl',
          dataType: ['text'],
          description: 'URL del audio en Vercel Blob',
          indexFilterable: false,
          indexSearchable: false
        },
        {
          name: 'callDate',
          dataType: ['date'],
          description: 'Fecha y hora de la llamada',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'ageRange',
          dataType: ['text'],
          description: 'Rango de edad: 18-25, 26-35, 36-45, 46-55, 56-65, 65+',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'userRegion',
          dataType: ['text'],
          description: 'Estado/región del usuario en México',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'migrantLocation',
          dataType: ['text'],
          description: 'Ciudad/estado del migrante en USA',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'churnRisk',
          dataType: ['number'],
          description: 'Riesgo de cancelación (0-1)',
          indexFilterable: true,
          indexSearchable: false
        }
      ]
    };

    await client.schema
      .classCreator()
      .withClass(callRecordingClass)
      .do();
    console.log('✅ CallRecording creado\n');

    // ===== 2. COLLECTIVE KNOWLEDGE CLASS =====
    console.log('🧠 Creando clase CollectiveKnowledge...');
    const collectiveKnowledgeClass = {
      class: 'CollectiveKnowledge',
      description: 'Base de conocimiento colectivo - patrones aprendidos de todas las llamadas',
      vectorizer: 'text2vec-openai',
      moduleConfig: {
        'text2vec-openai': {
          model: 'text-embedding-3-small',
          dimensions: 1536,
          type: 'text'
        }
      },
      properties: [
        {
          name: 'knowledgeType',
          dataType: ['text'],
          description: 'Tipo: power_phrase, technique, pattern, churn_predictor, engagement_driver',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'content',
          dataType: ['text'],
          description: 'Contenido del aprendizaje',
          indexFilterable: false,
          indexSearchable: true,
          moduleConfig: {
            'text2vec-openai': {
              skip: false,
              vectorizePropertyName: false
            }
          }
        },
        {
          name: 'context',
          dataType: ['text'],
          description: 'Contexto en el que funciona',
          indexFilterable: false,
          indexSearchable: true,
          moduleConfig: {
            'text2vec-openai': {
              skip: false,
              vectorizePropertyName: false
            }
          }
        },
        {
          name: 'outcomeType',
          dataType: ['text'],
          description: 'Resultado: retention, cancellation, referral, upgrade, engagement_increase',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'effectivenessScore',
          dataType: ['number'],
          description: 'Score de efectividad (0-1)',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'usageCount',
          dataType: ['int'],
          description: 'Veces que se ha aplicado',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'successRate',
          dataType: ['number'],
          description: 'Tasa de éxito (0-1)',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'ageRange',
          dataType: ['text'],
          description: 'Rango de edad donde funciona mejor',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'userRegion',
          dataType: ['text'],
          description: 'Región donde funciona mejor',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'emotionalTone',
          dataType: ['text'],
          description: 'Tono emocional: worried, confident, confused, frustrated, hopeful',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'isSticky',
          dataType: ['boolean'],
          description: 'Si es una característica que genera adherencia',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'isWarningSignal',
          dataType: ['boolean'],
          description: 'Si es una señal de alerta',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'riskLevel',
          dataType: ['text'],
          description: 'Nivel de riesgo: low, medium, high, critical',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'discoveredAt',
          dataType: ['date'],
          description: 'Fecha de descubrimiento',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'lastUsedAt',
          dataType: ['date'],
          description: 'Última vez usado',
          indexFilterable: true,
          indexSearchable: false
        }
      ]
    };

    await client.schema
      .classCreator()
      .withClass(collectiveKnowledgeClass)
      .do();
    console.log('✅ CollectiveKnowledge creado\n');

    // ===== 3. USER PROFILE CLASS =====
    console.log('👤 Creando clase UserProfile...');
    const userProfileClass = {
      class: 'UserProfile',
      description: 'Perfiles de conversación y preferencias de usuarios',
      vectorizer: 'text2vec-openai',
      moduleConfig: {
        'text2vec-openai': {
          model: 'text-embedding-3-small',
          dimensions: 1536,
          type: 'text'
        }
      },
      properties: [
        {
          name: 'userPhone',
          dataType: ['text'],
          description: 'Número de teléfono del usuario',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'userAccessCode',
          dataType: ['text'],
          description: 'Código de acceso único',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'conversationSummary',
          dataType: ['text'],
          description: 'Resumen de todas las conversaciones',
          indexFilterable: false,
          indexSearchable: true,
          moduleConfig: {
            'text2vec-openai': {
              skip: false,
              vectorizePropertyName: false
            }
          }
        },
        {
          name: 'preferredTopics',
          dataType: ['text[]'],
          description: 'Temas que le interesan',
          indexFilterable: true,
          indexSearchable: true
        },
        {
          name: 'concerns',
          dataType: ['text[]'],
          description: 'Preocupaciones principales',
          indexFilterable: true,
          indexSearchable: true
        },
        {
          name: 'communicationStyle',
          dataType: ['text'],
          description: 'Estilo: formal, casual, directo, detallado',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'responsePattern',
          dataType: ['text'],
          description: 'Patrón de respuesta: brief, detailed, story-teller',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'engagementLevel',
          dataType: ['text'],
          description: 'Nivel: high, medium, low, declining',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'churnRisk',
          dataType: ['number'],
          description: 'Riesgo de cancelación actual (0-1)',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'totalCalls',
          dataType: ['int'],
          description: 'Total de llamadas realizadas',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'lastCallDate',
          dataType: ['date'],
          description: 'Fecha de última llamada',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'avgCallDuration',
          dataType: ['int'],
          description: 'Duración promedio de llamadas en segundos',
          indexFilterable: true,
          indexSearchable: false
        },
        {
          name: 'updatedAt',
          dataType: ['date'],
          description: 'Última actualización del perfil',
          indexFilterable: true,
          indexSearchable: false
        }
      ]
    };

    await client.schema
      .classCreator()
      .withClass(userProfileClass)
      .do();
    console.log('✅ UserProfile creado\n');

    // ===== VERIFICAR SCHEMA =====
    console.log('🔍 Verificando schema...');
    const schema = await client.schema.getter().do();
    
    console.log('\n✅ Schema creado exitosamente!');
    console.log(`📊 Total de clases: ${schema.classes.length}`);
    schema.classes.forEach(cls => {
      console.log(`   - ${cls.class}: ${cls.properties.length} propiedades`);
    });

    console.log('\n🎉 ¡Weaviate está listo para usar!\n');
    console.log('📝 Próximos pasos:');
    console.log('   1. Ejecutar: node scripts/migrate-to-weaviate.js');
    console.log('   2. Actualizar AI Brain para usar Weaviate');
    console.log('   3. Probar búsquedas semánticas\n');

  } catch (error) {
    console.error('❌ Error creando schema:', error);
    
    if (error.message.includes('already exists')) {
      console.log('\n⚠️  El schema ya existe. Para recrearlo:');
      console.log('   1. Ir a Weaviate Console');
      console.log('   2. Eliminar las clases existentes');
      console.log('   3. Volver a ejecutar este script\n');
    } else if (error.message.includes('WEAVIATE_URL')) {
      console.log('\n⚠️  Variables de entorno faltantes:');
      console.log('   Asegúrate de tener en .env:');
      console.log('   WEAVIATE_URL=tu-cluster.weaviate.network');
      console.log('   WEAVIATE_API_KEY=tu-api-key');
      console.log('   OPENAI_API_KEY=sk-...\n');
    }
    
    process.exit(1);
  }
}

// Ejecutar
createSchema();
