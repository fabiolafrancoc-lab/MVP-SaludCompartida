import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const { data, error } = await supabase
  .from('registrations')
  .select('*')
  .order('created_at', { ascending: false })
  .limit(1);

if (error) {
  console.error('❌ Error:', error);
  process.exit(1);
}

if (data && data.length > 0) {
  const reg = data[0];
  console.log('\n' + '='.repeat(60));
  console.log('📋 ÚLTIMA TRANSACCIÓN EN SUPABASE');
  console.log('='.repeat(60));
  console.log(`\n🆔 ID: ${reg.id}`);
  console.log(`📅 Fecha: ${reg.created_at}`);
  console.log(`\n👤 MIGRANTE (EE.UU.):`);
  console.log(`   Nombre: ${reg.migrant_first_name} ${reg.migrant_last_name}`);
  console.log(`   Email: ${reg.migrant_email}`);
  console.log(`   🎟️  CÓDIGO: ${reg.migrant_code}`);
  console.log(`\n👨‍👩‍👧‍👦 FAMILIA (México):`);
  console.log(`   Nombre: ${reg.family_first_name} ${reg.family_last_name}`);
  console.log(`   Email: ${reg.family_primary_email}`);
  console.log(`   🎟️  CÓDIGO: ${reg.family_code}`);
  console.log(`\n💰 PAGO:`);
  console.log(`   Estado: ${reg.status}`);
  console.log(`   Payment ID: ${reg.payment_id || 'N/A'}`);
  console.log(`   Completado: ${reg.payment_completed_at || 'Pendiente'}`);
  console.log(`\n🤖 COMPANION:`);
  console.log(`   Asignado: ${reg.companion_name}`);
  console.log('\n' + '='.repeat(60));
} else {
  console.log('❌ No se encontraron registros');
}
