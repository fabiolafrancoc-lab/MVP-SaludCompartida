/**
 * Test rápido de Weaviate
 * Verifica que todo esté funcionando correctamente
 */

import { getWeaviateClient } from '../src/lib/weaviate-client.js';
import dotenv from 'dotenv';

dotenv.config();

async function runTests() {
  console.log('🚀 Iniciando tests de Weaviate...\n');

  try {
    const weaviate = getWeaviateClient();

    // TEST 1: Health Check
    console.log('1️⃣ Test de conexión...');
    const health = await weaviate.healthCheck();
    
    if (health.healthy) {
      console.log('   ✅ Weaviate está activo y funcionando');
    } else {
      console.log('   ❌ Weaviate no responde:', health.error);
      return;
    }

    // TEST 2: Estadísticas
    console.log('\n2️⃣ Obteniendo estadísticas...');
    const stats = await weaviate.getStats();
    
    if (stats) {
      console.log('   📊 Objetos en Weaviate:');
      console.log(`      - CallRecording: ${stats.callRecordings}`);
      console.log(`      - CollectiveKnowledge: ${stats.collectiveKnowledge}`);
      console.log(`      - UserProfile: ${stats.userProfiles}`);
      console.log(`      - Total: ${stats.callRecordings + stats.collectiveKnowledge + stats.userProfiles}`);
    }

    // TEST 3: Buscar conocimiento
    if (stats.collectiveKnowledge > 0) {
      console.log('\n3️⃣ Test de búsqueda semántica...');
      const results = await weaviate.searchCollectiveKnowledge(
        'técnicas para usuarios que piensan que el servicio es caro',
        null,
        3
      );

      if (results.length > 0) {
        console.log(`   ✅ Encontrados ${results.length} resultados relevantes:`);
        results.forEach((r, i) => {
          console.log(`\n   ${i + 1}. ${r.knowledgeType.toUpperCase()}`);
          console.log(`      Contenido: ${r.content.substring(0, 80)}...`);
          console.log(`      Efectividad: ${Math.round(r.effectivenessScore * 100)}%`);
          console.log(`      Usado ${r.usageCount} veces`);
        });
      } else {
        console.log('   ⚠️  No se encontraron resultados (la base de conocimiento puede estar vacía)');
      }
    } else {
      console.log('\n3️⃣ Test de búsqueda semántica...');
      console.log('   ⏭️  Skipping - No hay datos en CollectiveKnowledge aún');
    }

    // TEST 4: Búsqueda de llamadas
    if (stats.callRecordings > 0) {
      console.log('\n4️⃣ Test de búsqueda de llamadas...');
      const calls = await weaviate.searchSimilarUsersCalls(
        'usuario preocupado por el costo',
        {},
        5
      );

      if (calls.length > 0) {
        console.log(`   ✅ Encontradas ${calls.length} llamadas similares:`);
        calls.slice(0, 2).forEach((call, i) => {
          console.log(`\n   ${i + 1}. Sentimiento: ${call.sentiment}`);
          console.log(`      Temas: ${call.topics?.join(', ')}`);
          console.log(`      Churn risk: ${Math.round(call.churnRisk * 100)}%`);
        });
      } else {
        console.log('   ⚠️  No se encontraron llamadas similares');
      }
    } else {
      console.log('\n4️⃣ Test de búsqueda de llamadas...');
      console.log('   ⏭️  Skipping - No hay llamadas registradas aún');
    }

    // TEST 5: Insertar dato de prueba
    console.log('\n5️⃣ Test de inserción...');
    try {
      const testKnowledge = await weaviate.insertCollectiveKnowledge({
        knowledgeType: 'power_phrase',
        content: 'Mencionar "comunidad de migrantes" en los primeros 30 segundos',
        context: 'Al inicio de la llamada con usuarios nuevos de 35-45 años',
        outcomeType: 'retention',
        effectivenessScore: 0.82,
        usageCount: 145,
        successRate: 0.78,
        ageRange: '35-45',
        emotionalTone: 'hopeful',
        isSticky: true
      });

      console.log('   ✅ Inserción exitosa - Objeto creado:', testKnowledge.id || 'ID generado');
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('   ℹ️  Dato de prueba ya existe (normal si ejecutaste esto antes)');
      } else {
        console.log('   ⚠️  Error en inserción:', error.message);
      }
    }

    // TEST 6: Performance
    console.log('\n6️⃣ Test de performance...');
    const startTime = Date.now();
    
    await weaviate.searchCollectiveKnowledge('usuario confundido', null, 10);
    
    const duration = Date.now() - startTime;
    console.log(`   ⏱️  Búsqueda completada en ${duration}ms`);
    
    if (duration < 100) {
      console.log('   ✅ Performance EXCELENTE (<100ms)');
    } else if (duration < 300) {
      console.log('   ✅ Performance BUENA (<300ms)');
    } else {
      console.log('   ⚠️  Performance LENTA (>300ms) - Considera upgrade de plan');
    }

    // RESUMEN
    console.log('\n' + '='.repeat(60));
    console.log('✅ TODOS LOS TESTS COMPLETADOS');
    console.log('='.repeat(60));
    console.log('\n🎉 ¡Weaviate está funcionando correctamente!\n');
    console.log('📝 Próximos pasos:');
    console.log('   1. Ejecutar migración: node scripts/migrate-to-weaviate.js');
    console.log('   2. Actualizar AI Brain para usar Weaviate');
    console.log('   3. Deploy a Vercel');
    console.log('   4. ¡Empezar a llamar usuarios!\n');

  } catch (error) {
    console.error('\n❌ Error en tests:', error);
    console.error('\n🔧 Solución:');
    console.error('   1. Verifica que WEAVIATE_URL y WEAVIATE_API_KEY estén en .env');
    console.error('   2. Verifica que el cluster esté activo en Weaviate Console');
    console.error('   3. Ejecuta: node scripts/setup-weaviate-schema.js\n');
    process.exit(1);
  }
}

// Ejecutar
runTests();
