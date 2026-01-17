import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Leer credenciales
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('📋 Ejecutando SQL para crear tablas de funciones propietarias...\n');

// Leer el archivo SQL
const sqlFile = join(__dirname, 'create-proprietary-functions-tables.sql');
const sqlContent = readFileSync(sqlFile, 'utf-8');

// Dividir en statements individuales (por COMMIT y comandos grandes)
const statements = sqlContent
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--') && s !== 'COMMIT');

console.log(`📝 Encontrados ${statements.length} statements SQL\n`);

// Ejecutar cada statement
for (let i = 0; i < statements.length; i++) {
  const statement = statements[i];
  
  // Mostrar solo las primeras 80 caracteres
  const preview = statement.substring(0, 80).replace(/\n/g, ' ') + '...';
  console.log(`[${i + 1}/${statements.length}] Ejecutando: ${preview}`);
  
  try {
    const { data, error } = await supabase.rpc('exec', { sql: statement });
    
    if (error) {
      console.error(`❌ Error: ${error.message}`);
      // Continuar con el siguiente si falla (por si ya existe)
    } else {
      console.log(`✅ OK`);
    }
  } catch (err) {
    console.error(`❌ Error ejecutando statement: ${err.message}`);
  }
  
  console.log('');
}

console.log('🎉 ¡Proceso completado!\n');
console.log('📊 Verifica las tablas en: https://supabase.com/dashboard/project/rzmdekjegbdgitqekjee/editor');
