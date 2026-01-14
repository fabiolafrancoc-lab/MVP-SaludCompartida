/**
 * SCRIPT DE TESTING LOCAL
 * 
 * Prueba el sistema completo de grabaciones:
 * 1. Lee un archivo de audio local
 * 2. Lo convierte a base64
 * 3. Lo sube al endpoint
 * 4. Monitorea el progreso de transcripción y análisis
 * 
 * Uso:
 * node scripts/test-upload-recording.js path/to/audio.m4a
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const API_URL = 'https://www.saludcompartida.app'; // Tu URL de producción
// const API_URL = 'http://localhost:3000'; // Para testing local

const TEST_USER_ID = '+525512345678'; // Reemplaza con un número real de testing
const TEST_AGENT_ID = 'agent_test_001';

async function uploadRecording(audioFilePath) {
  try {
    console.log('📂 Reading audio file:', audioFilePath);
    
    // Leer archivo de audio
    if (!fs.existsSync(audioFilePath)) {
      throw new Error(`File not found: ${audioFilePath}`);
    }

    const audioBuffer = fs.readFileSync(audioFilePath);
    const fileSizeMB = audioBuffer.length / 1024 / 1024;
    
    console.log('✅ File loaded:', {
      size: `${(audioBuffer.length / 1024).toFixed(2)} KB`,
      filename: path.basename(audioFilePath)
    });

    // Advertencia para archivos muy grandes
    if (fileSizeMB > 25) {
      console.log('\n⚠️  WARNING: File is very large (' + fileSizeMB.toFixed(1) + ' MB)');
      console.log('   Recommended: Use files under 10 MB for faster processing');
      console.log('   This may take 5-10 minutes to process...\n');
    }

    const audioBase64 = audioBuffer.toString('base64');
    const filename = path.basename(audioFilePath);

    console.log('✅ File loaded:', {
      size: `${(audioBuffer.length / 1024).toFixed(2)} KB`,
      filename
    });

    // Calcular duración estimada (no exacta, solo para demo)
    const estimatedDuration = Math.floor(audioBuffer.length / 16000); // ~16KB por segundo

    console.log('\n📤 Uploading to:', `${API_URL}/api/test-recording-upload`);

    // Subir grabación
    const uploadResponse = await fetch(`${API_URL}/api/test-recording-upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        audioBase64,
        userId: TEST_USER_ID,
        agentId: TEST_AGENT_ID,
        duration: estimatedDuration,
        tags: ['test', 'demo'],
        filename
      })
    });

    const uploadResult = await uploadResponse.json();

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed: ${uploadResult.error}`);
    }

    console.log('✅ Upload successful!');
    console.log('Recording ID:', uploadResult.recording.id);
    console.log('Blob URL:', uploadResult.recording.blobUrl);

    // Monitorear progreso
    console.log('\n⏳ Monitoring transcription and analysis...\n');
    await monitorProgress(uploadResult.recording.id);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

async function monitorProgress(recordingId) {
  let attempts = 0;
  const maxAttempts = 60; // 5 minutos máximo (60 intentos x 5 segundos)

  while (attempts < maxAttempts) {
    try {
      const response = await fetch(`${API_URL}/api/get-recording-status?id=${recordingId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      const transcriptionStatus = data.status.transcription;
      const analysisStatus = data.status.analysis;

      // Mostrar progreso
      console.log(`[${new Date().toLocaleTimeString()}] Transcription: ${transcriptionStatus} | Analysis: ${analysisStatus}`);

      // Si ambos están completados, mostrar resultados
      if (transcriptionStatus === 'completed' && analysisStatus === 'completed') {
        console.log('\n✅ Processing complete!\n');
        
        console.log('📝 TRANSCRIPTION:');
        console.log('─'.repeat(80));
        console.log(data.transcription.text);
        console.log('─'.repeat(80));
        
        console.log('\n🔍 ANALYSIS:');
        console.log('Category:', data.analysis.category);
        console.log('Quality Rating:', data.analysis.qualityRating + '/5');
        console.log('Emotional Tone:', data.analysis.emotionalTone);
        console.log('Outcome:', data.analysis.outcome);
        
        console.log('\n💪 Techniques Used:');
        data.analysis.techniques.forEach(t => console.log('  -', t));
        
        console.log('\n✨ Power Phrases:');
        data.analysis.powerPhrases.forEach(p => console.log('  -', p));
        
        console.log('\n📈 Areas for Improvement:');
        data.analysis.improvementAreas.forEach(a => console.log('  -', a));
        
        console.log('\n🎯 Key Moments:');
        data.analysis.keyMoments.forEach(m => console.log('  -', m));
        
        return;
      }

      // Si alguno falló, mostrar error
      if (transcriptionStatus === 'failed' || analysisStatus === 'failed') {
        console.error('\n❌ Processing failed!');
        if (data.transcription?.error) {
          console.error('Transcription error:', data.transcription.error);
        }
        if (data.analysis?.error) {
          console.error('Analysis error:', data.analysis.error);
        }
        process.exit(1);
      }

      // Esperar 5 segundos antes de siguiente intento
      await new Promise(resolve => setTimeout(resolve, 5000));
      attempts++;

    } catch (error) {
      console.error('❌ Error checking status:', error.message);
      process.exit(1);
    }
  }

  console.error('\n⏱️ Timeout: Processing took too long (5 minutes)');
  console.log('Check status manually at:', `${API_URL}/api/get-recording-status?id=${recordingId}`);
  process.exit(1);
}

// Ejecutar
const audioFilePath = process.argv[2];

if (!audioFilePath) {
  console.error('❌ Usage: node scripts/test-upload-recording.js path/to/audio.m4a');
  console.error('\nExample:');
  console.error('  node scripts/test-upload-recording.js ~/Desktop/test-call.m4a');
  process.exit(1);
}

console.log('🚀 Starting recording upload test...\n');
uploadRecording(audioFilePath);
