// Add missing traffic_source column to registrations table
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function addMissingColumn() {
  console.log('🔧 Adding traffic_source column to registrations table...\n');
  
  // Add the column via SQL
  const { data, error } = await supabase.rpc('exec_sql', {
    sql: `
      ALTER TABLE registrations ADD COLUMN IF NOT EXISTS traffic_source VARCHAR(50) DEFAULT 'direct';
      CREATE INDEX IF NOT EXISTS idx_traffic_source ON registrations(traffic_source);
    `
  });
  
  if (error) {
    console.error('❌ Error:', error);
    console.log('\n⚠️ Trying alternative method...');
    
    // Alternative: Just try to insert a test record to trigger schema refresh
    const { error: testError } = await supabase
      .from('registrations')
      .select('traffic_source')
      .limit(1);
    
    if (testError && testError.message.includes('traffic_source')) {
      console.log('\n❌ Column still missing. Please run this SQL manually in Supabase:');
      console.log('\nALTER TABLE registrations ADD COLUMN IF NOT EXISTS traffic_source VARCHAR(50) DEFAULT \'direct\';');
      console.log('CREATE INDEX IF NOT EXISTS idx_traffic_source ON registrations(traffic_source);');
      console.log('NOTIFY pgrst, \'reload schema\';');
    } else {
      console.log('✅ Column exists or was added successfully!');
    }
  } else {
    console.log('✅ Column added successfully!');
  }
}

addMissingColumn().catch(console.error);
