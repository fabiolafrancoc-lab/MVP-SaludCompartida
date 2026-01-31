// ============================================
// TEST COMPLETO: SISTEMA LUPITA
// Verifica conexiones AWS S3 + Supabase + Weaviate
// ============================================

import { testS3Connection } from '../src/lib/vapi-audio-handler.js';
import { createClient } from '@supabase/supabase-js';
import weaviate from 'weaviate-ts-client';

// Colores para terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(emoji, message, color = colors.reset) {
  console.log(`${color}${emoji} ${message}${colors.reset}`);
}

async function testSupabase() {
  log('🔍', 'Testing Supabase connection...', colors.blue);
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // Test connection
    const { data, error } = await supabase
      .from('companion_calls')
      .select('count')
      .limit(1);

    if (error) throw error;

    log('✅', 'Supabase connection OK', colors.green);
    
    // Test insert
    const testCall = {
      call_id: `test-${Date.now()}`,
      phone_number: '+525500000000',
      started_at: new Date().toISOString(),
      status: 'test'
    };

    const { error: insertError } = await supabase
      .from('companion_calls')
      .insert(testCall);

    if (insertError) throw insertError;

    log('✅', 'Supabase insert OK', colors.green);

    // Cleanup
    await supabase
      .from('companion_calls')
      .delete()
      .eq('call_id', testCall.call_id);

    return true;
  } catch (error) {
    log('❌', `Supabase error: ${error.message}`, colors.red);
    return false;
  }
}

async function testWeaviate() {
  log('🔍', 'Testing Weaviate connection...', colors.blue);

  try {
    const client = weaviate.client({
      scheme: 'https',
      host: process.env.WEAVIATE_URL,
      apiKey: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY)
    });

    // Test connection
    const meta = await client.misc.metaGetter().do();
    
    if (!meta.version) throw new Error('Weaviate not responding');

    log('✅', `Weaviate connection OK (version: ${meta.version})`, colors.green);

    // Check schema
    const schema = await client.schema.getter().do();
    const hasClass = schema.classes?.some(c => c.class === 'LupitaConversation');

    if (hasClass) {
      log('✅', 'Weaviate schema "LupitaConversation" exists', colors.green);
    } else {
      log('⚠️', 'Weaviate schema "LupitaConversation" NOT found', colors.yellow);
      log('💡', 'Run: node scripts/setup-weaviate-schema.js', colors.blue);
    }

    return true;
  } catch (error) {
    log('❌', `Weaviate error: ${error.message}`, colors.red);
    return false;
  }
}

async function testVAPIWebhook() {
  log('🔍', 'Testing VAPI webhook endpoint...', colors.blue);

  try {
    const response = await fetch('http://localhost:3000/api/vapi-webhook', {
      method: 'GET'
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    log('✅', `VAPI webhook OK: ${data.status}`, colors.green);
    return true;
  } catch (error) {
    log('❌', `VAPI webhook error: ${error.message}`, colors.red);
    log('💡', 'Make sure Next.js is running: npm run dev', colors.blue);
    return false;
  }
}

async function testEnvironmentVariables() {
  log('🔍', 'Checking environment variables...', colors.blue);

  const required = {
    'AWS_ACCESS_KEY_ID_LEGAL': process.env.AWS_ACCESS_KEY_ID_LEGAL,
    'AWS_SECRET_ACCESS_KEY_LEGAL': process.env.AWS_SECRET_ACCESS_KEY_LEGAL,
    'AWS_ACCESS_KEY_ID_COMPANION': process.env.AWS_ACCESS_KEY_ID_COMPANION,
    'AWS_SECRET_ACCESS_KEY_COMPANION': process.env.AWS_SECRET_ACCESS_KEY_COMPANION,
    'AWS_REGION': process.env.AWS_REGION,
    'AWS_S3_BUCKET_LEGAL': process.env.AWS_S3_BUCKET_LEGAL,
    'AWS_S3_BUCKET_COMPANION': process.env.AWS_S3_BUCKET_COMPANION,
    'VAPI_API_KEY': process.env.VAPI_API_KEY,
    'VAPI_PHONE_NUMBER_ID': process.env.VAPI_PHONE_NUMBER_ID,
    'WEAVIATE_URL': process.env.WEAVIATE_URL,
    'WEAVIATE_API_KEY': process.env.WEAVIATE_API_KEY,
    'NEXT_PUBLIC_SUPABASE_URL': process.env.NEXT_PUBLIC_SUPABASE_URL,
    'SUPABASE_SERVICE_ROLE_KEY': process.env.SUPABASE_SERVICE_ROLE_KEY
  };

  let allPresent = true;

  for (const [key, value] of Object.entries(required)) {
    if (!value) {
      log('❌', `Missing: ${key}`, colors.red);
      allPresent = false;
    } else {
      log('✅', `${key}: ${value.substring(0, 20)}...`, colors.green);
    }
  }

  return allPresent;
}

async function runAllTests() {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 LUPITA SYSTEM TESTS');
  console.log('='.repeat(60) + '\n');

  const results = {
    env: false,
    aws: false,
    supabase: false,
    weaviate: false,
    webhook: false
  };

  // 1. Environment variables
  log('📋', 'TEST 1/5: Environment Variables', colors.blue);
  results.env = await testEnvironmentVariables();
  console.log('');

  // 2. AWS S3
  log('📋', 'TEST 2/5: AWS S3 Connection', colors.blue);
  const s3Result = await testS3Connection();
  results.aws = s3Result.healthy;
  console.log('');

  // 3. Supabase
  log('📋', 'TEST 3/5: Supabase Connection', colors.blue);
  results.supabase = await testSupabase();
  console.log('');

  // 4. Weaviate
  log('📋', 'TEST 4/5: Weaviate Connection', colors.blue);
  results.weaviate = await testWeaviate();
  console.log('');

  // 5. VAPI Webhook
  log('📋', 'TEST 5/5: VAPI Webhook', colors.blue);
  results.webhook = await testVAPIWebhook();
  console.log('');

  // Summary
  console.log('='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));

  for (const [test, passed] of Object.entries(results)) {
    const status = passed ? '✅ PASS' : '❌ FAIL';
    const color = passed ? colors.green : colors.red;
    log('', `${test.toUpperCase().padEnd(15)} ${status}`, color);
  }

  const allPassed = Object.values(results).every(r => r);
  
  console.log('='.repeat(60));
  
  if (allPassed) {
    log('🎉', 'ALL TESTS PASSED! System is ready.', colors.green);
    console.log('\n💡 Next steps:');
    console.log('   1. Configure webhook in VAPI Dashboard');
    console.log('   2. Make a test call to Lupita');
    console.log('   3. Check S3 buckets for audio files');
  } else {
    log('⚠️', 'Some tests failed. Check errors above.', colors.yellow);
  }
  
  console.log('');
  
  return allPassed;
}

// Run tests
runAllTests()
  .then(success => process.exit(success ? 0 : 1))
  .catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
