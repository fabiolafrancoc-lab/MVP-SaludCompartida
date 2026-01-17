/**
 * Script para crear la tabla ai_voice_calls en Supabase
 * Ejecutar: node scripts/run-create-table.js
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de Supabase
const supabaseUrl = 'https://rzmdekjegbdgitqekjee.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6bWRla2plZ2JkZ2l0cWVramVlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzM1OTQ4NywiZXhwIjoyMDc4OTM1NDg3fQ.Yymz6ef5Khexv1jr79LXGTSCvqHzzszTitqKNImKEVQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTable() {
  console.log('🔨 Creando tabla ai_voice_calls...\n');

  try {
    // Leer el archivo SQL
    const sqlFile = join(__dirname, 'create-ai-voice-calls-table.sql');
    const sql = readFileSync(sqlFile, 'utf8');

    // Ejecutar el SQL completo usando la API de Supabase
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

    if (error) {
      // Si falla, intentar crear la tabla manualmente con comandos individuales
      console.log('ℹ️  Ejecutando creación manual de tabla...\n');
      
      // Crear tabla principal
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS ai_voice_calls (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          vapi_call_id TEXT UNIQUE NOT NULL,
          phone_number TEXT NOT NULL,
          agent_id TEXT NOT NULL,
          user_email TEXT,
          duration_seconds INTEGER,
          cost_usd DECIMAL(10, 4),
          transcript JSONB,
          recording_url TEXT,
          end_reason TEXT,
          call_reason TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `;

      // Usar insert para ejecutar comandos SQL (workaround)
      const { error: createError } = await supabase.rpc('exec', { 
        statement: createTableSQL 
      });

      if (createError) {
        throw createError;
      }

      console.log('✅ Tabla ai_voice_calls creada exitosamente');
      console.log('ℹ️  Nota: Índices y políticas RLS deben crearse manualmente en Supabase UI');
      console.log('   Ve a: https://supabase.com/dashboard/project/rzmdekjegbdgitqekjee/editor\n');
      
      return;
    }

    console.log('✅ Tabla ai_voice_calls creada exitosamente con todos los índices y políticas\n');

  } catch (error) {
    console.error('❌ Error creando tabla:', error.message);
    console.log('\n📝 SOLUCIÓN MANUAL:');
    console.log('1. Ve a: https://supabase.com/dashboard/project/rzmdekjegbdgitqekjee/sql/new');
    console.log('2. Copia el contenido de: scripts/create-ai-voice-calls-table.sql');
    console.log('3. Pega y ejecuta el SQL');
    process.exit(1);
  }
}

createTable();
