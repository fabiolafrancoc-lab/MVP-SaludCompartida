import dotenv from 'dotenv';

dotenv.config();

const weaviateUrl = process.env.WEAVIATE_URL;
const apiKey = process.env.WEAVIATE_API_KEY;

console.log('Testing Weaviate REST API...\n');
console.log('URL:', weaviateUrl);
console.log('API Key:', apiKey ? 'Present (' + apiKey.substring(0, 10) + '...)' : 'Missing');

try {
  // Test 1: Simple root endpoint
  console.log('\n1. Testing root endpoint...');
  const rootResponse = await fetch(`${weaviateUrl}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  });
  
  console.log('Status:', rootResponse.status);
  const rootText = await rootResponse.text();
  console.log('Response:', rootText.substring(0, 200));

  // Test 2: Get meta
  console.log('\n2. Testing /v1/meta endpoint...');
  const metaResponse = await fetch(`${weaviateUrl}/v1/meta`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  });
  
  console.log('Status:', metaResponse.status);
  const metaText = await metaResponse.text();
  console.log('Response:', metaText.substring(0, 500));

  // Test 3: Get schema
  console.log('\n3. Testing /v1/schema endpoint...');
  const schemaResponse = await fetch(`${weaviateUrl}/v1/schema`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  });
  
  console.log('Status:', schemaResponse.status);
  const schemaText = await schemaResponse.text();
  console.log('Response:', schemaText);

} catch (error) {
  console.error('❌ Error:', error.message);
}
