/**
 * Migración de datos de Supabase/pgvector a Weaviate
 * 
 * Este script migra:
 * 1. Call recordings existentes con sus transcripciones
 * 2. Análisis de llamadas
 * 3. Metadata de usuarios
 * 
 * Uso:
 * node scripts/migrate-to-weaviate.js
 */

import weaviate from 'weaviate-ts-client';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Extraer el host del URL (sin https://)
const weaviateUrl = process.env.WEAVIATE_URL?.replace('https://', '').replace('http://', '');

// Clientes
const weaviateClient = weaviate.client({
  scheme: 'https',
  host: weaviateUrl,
  apiKey: {
    apiKey: process.env.WEAVIATE_API_KEY
  },
  headers: {
    'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY
  }
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Configuración
const BATCH_SIZE = 50; // Procesar 50 registros a la vez
const DELAY_MS = 1000; // 1 segundo entre batches para no saturar

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateEmbedding(text) {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
      dimensions: 1536
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generando embedding:', error);
    return null;
  }
}

async function migrateCallRecordings() {
  console.log('\n📞 Iniciando migración de call recordings...');
  
  try {
    // 1. Obtener total de registros
    const { count } = await supabase
      .from('call_recordings')
      .select('*', { count: 'exact', head: true });
    
    console.log(`   Total de llamadas a migrar: ${count}`);
    
    let migrated = 0;
    let errors = 0;
    let offset = 0;

    // 2. Procesar en batches
    while (offset < count) {
      console.log(`   Procesando batch ${Math.floor(offset / BATCH_SIZE) + 1}...`);
      
      const { data: recordings, error } = await supabase
        .from('call_recordings')
        .select('*')
        .order('created_at', { ascending: true })
        .range(offset, offset + BATCH_SIZE - 1);

      if (error) {
        console.error('Error obteniendo registros:', error);
        break;
      }

      // 3. Crear objetos para Weaviate
      const weaviateObjects = [];
      
      for (const rec of recordings) {
        try {
          // Combinar transcripción y análisis para el embedding
          const textForEmbedding = `${rec.transcription || ''}\n\n${rec.analysis || ''}`;
          
          // Generar embedding si no existe
          let vector = rec.transcription_embedding;
          if (!vector && textForEmbedding.trim()) {
            vector = await generateEmbedding(textForEmbedding);
            await delay(100); // Pequeña pausa entre embeddings
          }

          const weaviateObj = {
            class: 'CallRecording',
            properties: {
              userPhone: rec.user_phone || '',
              userAccessCode: rec.user_access_code || '',
              transcription: rec.transcription || '',
              analysis: rec.analysis || '',
              sentiment: rec.sentiment || 'neutral',
              topics: rec.topics || [],
              redFlags: rec.red_flags || [],
              callDuration: rec.call_duration_seconds || 0,
              audioUrl: rec.audio_url || '',
              callDate: rec.call_date || rec.created_at,
              ageRange: rec.age_range || '',
              userRegion: rec.user_region || '',
              migrantLocation: rec.migrant_location || '',
              churnRisk: rec.churn_risk || 0
            }
          };

          // Agregar vector si existe
          if (vector && Array.isArray(vector)) {
            weaviateObj.vector = vector;
          }

          weaviateObjects.push(weaviateObj);
          
        } catch (err) {
          console.error(`   Error procesando registro ${rec.id}:`, err.message);
          errors++;
        }
      }

      // 4. Insertar batch en Weaviate
      if (weaviateObjects.length > 0) {
        try {
          let batcher = weaviateClient.batch.objectsBatcher();
          
          weaviateObjects.forEach(obj => {
            batcher = batcher.withObject(obj);
          });

          const result = await batcher.do();
          
          // Verificar errores en el batch
          if (result && result.length > 0) {
            const batchErrors = result.filter(r => r.result && r.result.errors);
            if (batchErrors.length > 0) {
              console.error(`   Errores en batch: ${batchErrors.length}`);
              errors += batchErrors.length;
            }
          }
          
          migrated += weaviateObjects.length;
          console.log(`   ✅ Migrados: ${migrated}/${count} (${Math.round(migrated/count*100)}%)`);
          
        } catch (err) {
          console.error('   Error insertando batch en Weaviate:', err);
          errors += weaviateObjects.length;
        }
      }

      offset += BATCH_SIZE;
      
      // Pausa entre batches
      if (offset < count) {
        await delay(DELAY_MS);
      }
    }

    console.log(`\n   ✅ Migración completada!`);
    console.log(`      - Exitosos: ${migrated}`);
    console.log(`      - Errores: ${errors}`);
    
    return { migrated, errors };
    
  } catch (error) {
    console.error('❌ Error en migración:', error);
    throw error;
  }
}

async function migrateCollectiveKnowledge() {
  console.log('\n🧠 Iniciando migración de collective knowledge...');
  
  try {
    const { data: knowledge, error } = await supabase
      .from('collective_knowledge_base')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error obteniendo knowledge base:', error);
      return { migrated: 0, errors: 1 };
    }

    console.log(`   Total de conocimientos a migrar: ${knowledge.length}`);
    
    let migrated = 0;
    let errors = 0;

    for (const item of knowledge) {
      try {
        // Combinar contenido y contexto para embedding
        const textForEmbedding = `${item.content || ''}\n\n${item.context || ''}`;
        
        // Generar embedding si no existe
        let vector = item.knowledge_embedding;
        if (!vector && textForEmbedding.trim()) {
          vector = await generateEmbedding(textForEmbedding);
          await delay(100);
        }

        const weaviateObj = {
          class: 'CollectiveKnowledge',
          properties: {
            knowledgeType: item.knowledge_type || 'pattern',
            content: item.content || '',
            context: item.context || '',
            outcomeType: item.outcome_type || '',
            effectivenessScore: item.effectiveness_score || 0,
            usageCount: item.usage_count || 0,
            successRate: item.success_rate || 0,
            ageRange: item.age_range || '',
            userRegion: item.user_region || '',
            emotionalTone: item.emotional_tone || '',
            isSticky: item.is_sticky_feature || false,
            isWarningSignal: item.is_warning_signal || false,
            riskLevel: item.risk_level || '',
            discoveredAt: item.discovered_at || item.created_at,
            lastUsedAt: item.last_used_at || item.updated_at
          }
        };

        if (vector && Array.isArray(vector)) {
          weaviateObj.vector = vector;
        }

        await weaviateClient.data
          .creator()
          .withClassName('CollectiveKnowledge')
          .withProperties(weaviateObj.properties)
          .withVector(weaviateObj.vector)
          .do();

        migrated++;
        
        if (migrated % 10 === 0) {
          console.log(`   Progreso: ${migrated}/${knowledge.length}`);
        }
        
        await delay(200);
        
      } catch (err) {
        console.error(`   Error migrando item ${item.id}:`, err.message);
        errors++;
      }
    }

    console.log(`\n   ✅ Migración completada!`);
    console.log(`      - Exitosos: ${migrated}`);
    console.log(`      - Errores: ${errors}`);
    
    return { migrated, errors };
    
  } catch (error) {
    console.error('❌ Error en migración:', error);
    throw error;
  }
}

async function migrateUserProfiles() {
  console.log('\n👤 Iniciando migración de user profiles...');
  
  try {
    const { data: profiles, error } = await supabase
      .from('user_conversation_profiles')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error obteniendo perfiles:', error);
      return { migrated: 0, errors: 1 };
    }

    console.log(`   Total de perfiles a migrar: ${profiles.length}`);
    
    let migrated = 0;
    let errors = 0;

    for (const profile of profiles) {
      try {
        // Generar embedding del summary
        let vector = profile.conversation_summary_embedding;
        if (!vector && profile.conversation_summary) {
          vector = await generateEmbedding(profile.conversation_summary);
          await delay(100);
        }

        const weaviateObj = {
          class: 'UserProfile',
          properties: {
            userPhone: profile.user_phone || '',
            userAccessCode: profile.user_access_code || '',
            conversationSummary: profile.conversation_summary || '',
            preferredTopics: profile.preferred_topics || [],
            concerns: profile.concerns || [],
            communicationStyle: profile.communication_style || 'casual',
            responsePattern: profile.response_pattern || 'detailed',
            engagementLevel: profile.engagement_level || 'medium',
            churnRisk: profile.churn_risk || 0,
            totalCalls: profile.total_calls || 0,
            lastCallDate: profile.last_call_date || profile.updated_at,
            avgCallDuration: profile.avg_call_duration_seconds || 0,
            updatedAt: profile.updated_at
          }
        };

        if (vector && Array.isArray(vector)) {
          weaviateObj.vector = vector;
        }

        await weaviateClient.data
          .creator()
          .withClassName('UserProfile')
          .withProperties(weaviateObj.properties)
          .withVector(weaviateObj.vector)
          .do();

        migrated++;
        
        if (migrated % 10 === 0) {
          console.log(`   Progreso: ${migrated}/${profiles.length}`);
        }
        
        await delay(200);
        
      } catch (err) {
        console.error(`   Error migrando perfil ${profile.id}:`, err.message);
        errors++;
      }
    }

    console.log(`\n   ✅ Migración completada!`);
    console.log(`      - Exitosos: ${migrated}`);
    console.log(`      - Errores: ${errors}`);
    
    return { migrated, errors };
    
  } catch (error) {
    console.error('❌ Error en migración:', error);
    throw error;
  }
}

async function verifyMigration() {
  console.log('\n🔍 Verificando migración...');
  
  try {
    // Contar objetos en cada clase
    const callRecordings = await weaviateClient.graphql
      .aggregate()
      .withClassName('CallRecording')
      .withFields('meta { count }')
      .do();

    const collectiveKnowledge = await weaviateClient.graphql
      .aggregate()
      .withClassName('CollectiveKnowledge')
      .withFields('meta { count }')
      .do();

    const userProfiles = await weaviateClient.graphql
      .aggregate()
      .withClassName('UserProfile')
      .withFields('meta { count }')
      .do();

    console.log('\n📊 Estadísticas en Weaviate:');
    console.log(`   - CallRecording: ${callRecordings.data.Aggregate.CallRecording[0].meta.count || 0} objetos`);
    console.log(`   - CollectiveKnowledge: ${collectiveKnowledge.data.Aggregate.CollectiveKnowledge[0].meta.count || 0} objetos`);
    console.log(`   - UserProfile: ${userProfiles.data.Aggregate.UserProfile[0].meta.count || 0} objetos`);
    
  } catch (error) {
    console.error('Error verificando:', error);
  }
}

async function main() {
  console.log('🚀 Iniciando migración completa a Weaviate...\n');
  console.log('⚠️  Esta operación puede tomar varios minutos dependiendo del volumen de datos.\n');
  
  try {
    // Verificar conexión a Weaviate
    const isReady = await weaviateClient.misc.liveChecker().do();
    if (!isReady) {
      throw new Error('Weaviate no está disponible. Verifica WEAVIATE_URL y WEAVIATE_API_KEY');
    }
    console.log('✅ Conexión a Weaviate verificada\n');

    // Migrar en orden
    const results = {
      callRecordings: await migrateCallRecordings(),
      collectiveKnowledge: await migrateCollectiveKnowledge(),
      userProfiles: await migrateUserProfiles()
    };

    // Verificar
    await verifyMigration();

    // Resumen final
    console.log('\n🎉 ¡Migración completada!\n');
    console.log('📊 Resumen:');
    console.log(`   CallRecordings: ${results.callRecordings.migrated} migrados, ${results.callRecordings.errors} errores`);
    console.log(`   CollectiveKnowledge: ${results.collectiveKnowledge.migrated} migrados, ${results.collectiveKnowledge.errors} errores`);
    console.log(`   UserProfiles: ${results.userProfiles.migrated} migrados, ${results.userProfiles.errors} errores`);
    
    const totalMigrated = results.callRecordings.migrated + results.collectiveKnowledge.migrated + results.userProfiles.migrated;
    const totalErrors = results.callRecordings.errors + results.collectiveKnowledge.errors + results.userProfiles.errors;
    
    console.log(`\n   Total: ${totalMigrated} objetos migrados, ${totalErrors} errores`);
    
    if (totalErrors === 0) {
      console.log('\n✨ Todo listo! Ahora puedes usar Weaviate con Lupita AI Brain.\n');
    } else {
      console.log('\n⚠️  Hubo algunos errores. Revisa los logs arriba para más detalles.\n');
    }
    
  } catch (error) {
    console.error('\n❌ Error fatal en migración:', error);
    process.exit(1);
  }
}

// Ejecutar
main();
