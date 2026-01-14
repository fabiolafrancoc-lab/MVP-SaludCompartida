import weaviate from 'weaviate-ts-client';
import dotenv from 'dotenv';

dotenv.config();

console.log('Testing Weaviate connection...\n');
console.log('WEAVIATE_URL:', process.env.WEAVIATE_URL);
console.log('WEAVIATE_API_KEY:', process.env.WEAVIATE_API_KEY ? 'Present' : 'Missing');
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'Present' : 'Missing');

const weaviateUrl = process.env.WEAVIATE_URL?.replace('https://', '').replace('http://', '');
console.log('\nCleaned URL (host):', weaviateUrl);

const client = weaviate.client({
  scheme: 'https',
  host: weaviateUrl,
  apiKey: {
    apiKey: process.env.WEAVIATE_API_KEY
  },
  headers: {
    'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY
  }
});

try {
  console.log('\nChecking if Weaviate is ready...');
  const isReady = await client.misc.liveChecker().do();
  console.log('✅ Weaviate is ready!', isReady);
  
  console.log('\nGetting meta information...');
  const meta = await client.misc.metaGetter().do();
  console.log('✅ Meta:', JSON.stringify(meta, null, 2));
} catch (error) {
  console.error('❌ Connection error:', error.message);
  console.error('Full error:', error);
}
