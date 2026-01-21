/**
 * Test ElevenLabs Voice ID
 * Verifica que tu Voice ID y API Key funcionan correctamente
 */

const ELEVENLABS_API_KEY = 'TU_API_KEY_AQUI'; // Pega tu API key aquí
const VOICE_ID = 'z1ngDYs2H24Xsd8ts3az'; // El Voice ID de Lupita

async function testVoice() {
  console.log('🔍 Probando conexión con ElevenLabs...\n');
  
  try {
    // 1. Verificar que el Voice ID existe
    console.log('1️⃣ Verificando Voice ID...');
    const voiceResponse = await fetch(`https://api.elevenlabs.io/v1/voices/${VOICE_ID}`, {
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY
      }
    });
    
    if (!voiceResponse.ok) {
      const error = await voiceResponse.text();
      console.error('❌ Error al verificar voz:', error);
      
      if (voiceResponse.status === 401) {
        console.error('\n⚠️  API KEY INVÁLIDA');
        console.error('Ve a https://elevenlabs.io/app/settings/api-keys');
        console.error('Crea una nueva API key y pégala arriba\n');
      } else if (voiceResponse.status === 404) {
        console.error('\n⚠️  VOICE ID NO ENCONTRADO');
        console.error('Ve a https://elevenlabs.io/app/voices');
        console.error('Copia el Voice ID correcto de tu voz\n');
      }
      return;
    }
    
    const voiceData = await voiceResponse.json();
    console.log('✅ Voz encontrada:', voiceData.name);
    console.log('   Category:', voiceData.category);
    console.log('   Language:', voiceData.labels?.language || 'N/A');
    console.log('   Gender:', voiceData.labels?.gender || 'N/A');
    console.log('   Age:', voiceData.labels?.age || 'N/A');
    
    // 2. Verificar cuota disponible
    console.log('\n2️⃣ Verificando cuota disponible...');
    const userResponse = await fetch('https://api.elevenlabs.io/v1/user', {
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY
      }
    });
    
    if (userResponse.ok) {
      const userData = await userResponse.json();
      const subscription = userData.subscription;
      const characterCount = subscription.character_count;
      const characterLimit = subscription.character_limit;
      const remaining = characterLimit - characterCount;
      
      console.log('✅ Cuota de caracteres:');
      console.log(`   Usados: ${characterCount.toLocaleString()}`);
      console.log(`   Límite: ${characterLimit.toLocaleString()}`);
      console.log(`   Disponibles: ${remaining.toLocaleString()}`);
      
      if (remaining < 1000) {
        console.warn('\n⚠️  CUOTA BAJA - Menos de 1,000 caracteres disponibles');
        console.warn('Considera actualizar tu plan en https://elevenlabs.io/pricing\n');
      }
    }
    
    // 3. Probar síntesis de voz (genera un audio corto)
    console.log('\n3️⃣ Probando síntesis de voz...');
    const ttsResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: 'Hola, soy Lupita de Salud Compartida.',
        model_id: 'eleven_turbo_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.3
        }
      })
    });
    
    if (!ttsResponse.ok) {
      const error = await ttsResponse.text();
      console.error('❌ Error en síntesis de voz:', error);
      return;
    }
    
    console.log('✅ Síntesis de voz exitosa!');
    console.log('   El audio se generó correctamente');
    
    // Resumen
    console.log('\n' + '='.repeat(50));
    console.log('✅ TODO FUNCIONA CORRECTAMENTE');
    console.log('='.repeat(50));
    console.log('\nSi todo se ve bien aquí, el problema está en VAPI.');
    console.log('\nPasos siguientes:');
    console.log('1. Ve a VAPI Dashboard → Settings → Integrations');
    console.log('2. ELIMINA la integración actual de ElevenLabs');
    console.log('3. Agrégala de nuevo con tu API Key');
    console.log('4. Crea un nuevo Assistant con estos settings:');
    console.log('   - Provider: 11labs');
    console.log(`   - Voice ID: ${VOICE_ID}`);
    console.log('   - Model: eleven_turbo_v2');
    console.log('   - Language: es\n');
    
  } catch (error) {
    console.error('❌ Error inesperado:', error.message);
    console.error('\nVerifica tu conexión a internet y que las URLs sean correctas.\n');
  }
}

// Ejecutar test
testVoice();
