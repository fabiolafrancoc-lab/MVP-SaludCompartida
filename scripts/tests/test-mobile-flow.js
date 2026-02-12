const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://rzmdekjegbdgitqekjee.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6bWRla2plZ2JkZ2l0cWVramVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzNTk0ODcsImV4cCI6MjA3ODkzNTQ4N30.7gS2HOL_KpBaNxZUBZOCLrM1tamungV7-mLXZQGfNks';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testMobileFlow() {
  console.log('\n🔍 TEST DE FLUJO MÓVIL - CÓDIGO MÁS RECIENTE\n');
  
  // Usar el código más reciente: SC3MKY (familia)
  const testCode = 'SC3MKY';
  
  console.log(`1️⃣ Simulando ingreso de código: ${testCode}`);
  
  // Buscar en family_access_code
  let { data, error } = await supabase
    .from('registrations')
    .select('*')
    .eq('family_access_code', testCode);
  
  if (error) {
    console.error('❌ ERROR:', error.message);
    return;
  }
  
  if (data && data.length > 0) {
    const user = data[0];
    console.log('\n✅ CÓDIGO ENCONTRADO EN SUPABASE');
    console.log('📋 Datos que debería cargar automáticamente:');
    console.log({
      first_name: user.family_first_name,
      last_name: user.family_last_name,
      mother_last_name: user.family_mother_last_name,
      email: user.family_email,
      phone: user.family_phone,
      country_code: user.family_country_code,
      date_of_birth: user.family_date_of_birth,
      user_type: 'family'
    });
    
    // Simular formateo de teléfono
    const phoneDigits = (user.family_phone || '').replace(/\D/g, '');
    const formattedPhone = phoneDigits.length === 10 
      ? phoneDigits.replace(/^(\d{3})(\d{3})(\d{4})$/, '$1 $2 $3')
      : phoneDigits;
    
    console.log('\n📱 Teléfono formateado para display:', formattedPhone);
    console.log('🏳️  País:', user.family_country_code);
    
    console.log('\n✅ FLUJO MÓVIL DEBE FUNCIONAR ASÍ:');
    console.log('1. Usuario ingresa: SC3MKY');
    console.log(`2. Aparece automáticamente: ${user.family_first_name} ${user.family_last_name}`);
    console.log(`3. Teléfono: ${formattedPhone}`);
    console.log('4. Campos en VERDE (bloqueados)');
    console.log('5. Solo acepta términos y entra');
    
  } else {
    console.log('❌ Código no encontrado como family_access_code');
    
    // Buscar como migrant_access_code
    ({ data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('migrant_access_code', testCode));
    
    if (data && data.length > 0) {
      console.log('✅ ENCONTRADO como código de migrante');
    } else {
      console.log('❌ No encontrado en ningún campo');
    }
  }
  
  console.log('\n\n🧪 PRUEBA ESTO EN TU MÓVIL:');
  console.log('1. Ve a: https://saludcompartida.org/login-codigo');
  console.log('2. Ingresa: SC3MKY');
  console.log('3. Espera 0.5 segundos');
  console.log('4. Deberías ver los datos cargados automáticamente');
  console.log('5. Acepta términos y presiona "Activar Cuenta"');
}

testMobileFlow().catch(console.error);
