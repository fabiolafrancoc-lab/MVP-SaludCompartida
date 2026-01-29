/**
 * Script para obtener TODAS las tablas de Supabase
 * Este script listará las 53+ tablas que tienes en tu base de datos
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // Correcto: SUPABASE_SERVICE_KEY
);

async function getAllTables() {
  try {
    console.log('🔍 Consultando todas las tablas en la base de datos...\n');
    console.log('📍 URL:', process.env.SUPABASE_URL);
    console.log('');
    
    // Como Supabase no expone directamente information_schema,
    // vamos a consultar tablas conocidas del proyecto
    
    const knownTables = [
      // Core Business
      'registrations',
      'user_accounts',
      'family_members',
      'dependents',
      'beneficiaries',
      'subscriptions',
      'account_change_history',
      'pre_checkout_customers',
      
      // AI Companions
      'ai_companions',
      'behavioral_codes',
      'companion_calls',
      'lupita_conversations',
      'companion_memory',
      'companion_conversations',
      'scheduled_callbacks',
      'scheduled_voice_calls',
      'ai_voice_calls',
      'call_recordings',
      'call_transcripts',
      'call_extracted_info',
      
      // Medical & Health
      'medical_history',
      'service_usage',
      'savings_records',
      'medication_reminders',
      'medication_adherence',
      'medication_catalog',
      'telemedicine_appointments',
      'pharmacy_queries',
      'eligibility_checks',
      'urgent_notifications',
      
      // Analytics
      'keyword_analysis',
      'user_conversation_profiles',
      'user_facts',
      'user_demographics',
      'collective_knowledge_base',
      'emerging_patterns',
      'ai_brain_metrics',
      'escalations',
      
      // Infrastructure
      'priority_queue_cache',
      'scheduled_calls'
    ];
    
    console.log('📊 Verificando existencia de tablas...\n');
    console.log('─'.repeat(80));
    
    let existingCount = 0;
    let missingTables = [];
    
    for (const table of knownTables) {
      try {
        const { count, error } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          console.log(`❌ ${table.padEnd(35)} - NO EXISTE o no accesible`);
          missingTables.push(table);
        } else {
          existingCount++;
          console.log(`✅ ${table.padEnd(35)} - ${count || 0} registros`);
        }
      } catch (err) {
        console.log(`❌ ${table.padEnd(35)} - ERROR: ${err.message}`);
        missingTables.push(table);
      }
    }
    
    console.log('─'.repeat(80));
    console.log(`\n📈 RESUMEN:`);
    console.log(`   Total tablas verificadas: ${knownTables.length}`);
    console.log(`   Tablas existentes: ${existingCount}`);
    console.log(`   Tablas no encontradas: ${missingTables.length}`);
    
    if (missingTables.length > 0) {
      console.log(`\n⚠️  Tablas faltantes:`);
      missingTables.forEach(t => console.log(`   - ${t}`));
    }
    
    console.log('\n💡 SIGUIENTE PASO:');
    console.log('   Ve a: https://supabase.com/dashboard/project/rzmdekjegbdgitqekjee/sql/new');
    console.log('   Ejecuta el archivo: scripts/list-all-tables.sql');
    console.log('   Eso te dará el listado COMPLETO de las 53 tablas\n');
    
  } catch (err) {
    console.error('❌ Error general:', err.message);
    console.log('\n💡 Ejecuta este SQL en Supabase SQL Editor:');
    console.log('─'.repeat(80));
    console.log(`
SELECT 
    table_name AS "Tabla",
    (SELECT COUNT(*) FROM information_schema.columns c
     WHERE c.table_schema = t.table_schema 
     AND c.table_name = t.table_name) AS "Columnas"
FROM information_schema.tables t
WHERE table_schema = 'public'
AND table_type = 'BASE TABLE'
ORDER BY table_name;
    `);
    console.log('─'.repeat(80));
  }
}

// Ejecutar
getAllTables();
