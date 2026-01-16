// Check Supabase database for registrations and demographics
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  console.log('🔍 Checking Supabase database...\n');
  
  // Check registrations
  const { data: registrations, error: regError } = await supabase
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);
  
  if (regError) {
    console.error('❌ Error fetching registrations:', regError);
  } else {
    console.log(`✅ Registrations table: ${registrations.length} records found`);
    if (registrations.length > 0) {
      console.log('\n📋 Latest registration:');
      const latest = registrations[0];
      console.log({
        id: latest.id,
        migrant: `${latest.migrant_first_name} ${latest.migrant_last_name}`,
        family: `${latest.family_first_name} ${latest.family_last_name}`,
        family_phone: latest.family_phone,
        created_at: latest.created_at
      });
    }
  }
  
  // Check demographics
  const { data: demographics, error: demoError } = await supabase
    .from('user_demographics')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);
  
  if (demoError) {
    console.error('\n❌ Error fetching demographics:', demoError);
  } else {
    console.log(`\n✅ Demographics table: ${demographics.length} records found`);
    if (demographics.length > 0) {
      console.log('\n👥 Latest demographics:');
      demographics.forEach(d => {
        console.log({
          phone: d.phone,
          type: d.user_type,
          name: `${d.first_name} ${d.last_name}`,
          gender: d.gender,
          dob: d.date_of_birth,
          created: d.created_at
        });
      });
    }
  }
}

checkDatabase().catch(console.error);
