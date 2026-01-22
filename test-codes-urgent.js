const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://rzmdekjegbdgitqekjee.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6bWRla2plZ2JkZ2l0cWVramVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzNTk0ODcsImV4cCI6MjA3ODkzNTQ4N30.7gS2HOL_KpBaNxZUBZOCLrM1tamungV7-mLXZQGfNks';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testCodes() {
  console.log('\n🔍 BUSCANDO CÓDIGOS EN SUPABASE...\n');
  
  // Código Usuario: SCRZT6
  console.log('1️⃣ Buscando código FAMILIA: SCRZT6');
  const { data: familia, error: errorFamilia } = await supabase
    .from('registrations')
    .select('*')
    .eq('family_access_code', 'SCRZT6');
  
  if (errorFamilia) {
    console.error('❌ ERROR al buscar SCRZT6:', errorFamilia.message);
  } else if (familia && familia.length > 0) {
    console.log('✅ ENCONTRADO:', {
      family_first_name: familia[0].family_first_name,
      family_last_name: familia[0].family_last_name,
      family_phone: familia[0].family_phone,
      family_country_code: familia[0].family_country_code,
      family_email: familia[0].family_email,
      created_at: familia[0].created_at
    });
  } else {
    console.log('❌ NO ENCONTRADO en family_access_code');
  }
  
  console.log('\n2️⃣ Buscando código MIGRANTE: SCHP45');
  const { data: migrante, error: errorMigrante } = await supabase
    .from('registrations')
    .select('*')
    .eq('migrant_access_code', 'SCHP45');
  
  if (errorMigrante) {
    console.error('❌ ERROR al buscar SCHP45:', errorMigrante.message);
  } else if (migrante && migrante.length > 0) {
    console.log('✅ ENCONTRADO:', {
      migrant_first_name: migrante[0].migrant_first_name,
      migrant_last_name: migrante[0].migrant_last_name,
      migrant_phone: migrante[0].migrant_phone,
      migrant_country_code: migrante[0].migrant_country_code,
      migrant_email: migrante[0].migrant_email,
      created_at: migrante[0].created_at
    });
  } else {
    console.log('❌ NO ENCONTRADO en migrant_access_code');
  }
  
  // Buscar CUALQUIER registro
  console.log('\n3️⃣ Buscando CUALQUIER registro en la tabla...');
  const { data: any, error: errorAny } = await supabase
    .from('registrations')
    .select('migrant_access_code, family_access_code, created_at')
    .limit(5)
    .order('created_at', { ascending: false });
  
  if (errorAny) {
    console.error('❌ ERROR:', errorAny.message);
  } else if (any && any.length > 0) {
    console.log('✅ Últimos 5 registros en la base de datos:');
    any.forEach((reg, i) => {
      console.log(`   ${i+1}. Migrante: ${reg.migrant_access_code}, Familia: ${reg.family_access_code}, Fecha: ${reg.created_at}`);
    });
  } else {
    console.log('❌ NO HAY REGISTROS EN LA TABLA');
  }
}

testCodes().catch(console.error);
