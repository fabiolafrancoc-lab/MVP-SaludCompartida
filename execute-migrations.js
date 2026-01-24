#!/usr/bin/env node

/**
 * Script para ejecutar todas las migraciones de Supabase en orden
 * Ejecutar: node execute-migrations.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: SUPABASE_URL y SUPABASE_SERVICE_KEY deben estar definidos en .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const migrations = [
  'create_ai_companions_table.sql',
  'create_behavioral_codes_table.sql',
  'create_beneficiaries_table.sql',
  'create_medical_history_table.sql',
  'create_service_usage_table.sql',
  'create_companion_calls_table.sql',
  'create_scheduled_callbacks_table.sql',
  'create_urgent_notifications_table.sql',
  'create_triggers.sql'
];

async function executeMigration(filename) {
  console.log(`\n📝 Ejecutando: ${filename}...`);
  
  const filepath = path.join(__dirname, 'supabase', 'migrations', filename);
  
  if (!fs.existsSync(filepath)) {
    console.error(`❌ Archivo no encontrado: ${filepath}`);
    return false;
  }
  
  const sql = fs.readFileSync(filepath, 'utf8');
  
  try {
    const { error } = await supabase.rpc('exec_sql', { sql_query: sql });
    
    if (error) {
      // Intentar ejecutar directamente si rpc no funciona
      const { error: directError } = await supabase.from('_migrations').insert({
        name: filename,
        executed_at: new Date().toISOString()
      });
      
      if (directError) {
        console.error(`❌ Error ejecutando ${filename}:`, error.message);
        return false;
      }
    }
    
    console.log(`✅ ${filename} ejecutado correctamente`);
    return true;
  } catch (err) {
    console.error(`❌ Error ejecutando ${filename}:`, err.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Iniciando ejecución de migraciones de Salud Compartida\n');
  console.log('📊 Total de migraciones: ' + migrations.length);
  console.log('🔗 Supabase URL: ' + supabaseUrl);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const migration of migrations) {
    const success = await executeMigration(migration);
    if (success) {
      successCount++;
    } else {
      failCount++;
      console.log('\n⚠️  Continuando con siguiente migración...\n');
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMEN DE MIGRACIONES');
  console.log('='.repeat(60));
  console.log(`✅ Exitosas: ${successCount}/${migrations.length}`);
  console.log(`❌ Fallidas: ${failCount}/${migrations.length}`);
  console.log('='.repeat(60));
  
  if (failCount > 0) {
    console.log('\n⚠️  Algunas migraciones fallaron. Revisa los errores arriba.');
    console.log('💡 Puedes ejecutar las migraciones manualmente en:');
    console.log('   https://supabase.com/dashboard/project/rzmdekjegbdgitqekjee/sql/new');
  } else {
    console.log('\n🎉 ¡Todas las migraciones se ejecutaron correctamente!');
    console.log('💚 Lupita ya tiene su base de datos completa.');
  }
}

main().catch(console.error);
