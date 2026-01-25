// ============================================
// VAPI AUDIO HANDLER
// Descarga audio RAW de VAPI y sube a AWS S3
// ============================================

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import https from 'https';

// Configurar clientes S3 (Legal y Active)
const s3ClientLegal = new S3Client({
  region: process.env.AWS_REGION || 'us-east-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_LEGAL,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_LEGAL
  }
});

const s3ClientActive = new S3Client({
  region: process.env.AWS_REGION || 'us-east-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_COMPANION,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_COMPANION
  }
});

/**
 * Descarga audio desde URL de VAPI
 * @param {string} recordingUrl - URL del audio en VAPI
 * @returns {Promise<Buffer>} - Audio en formato buffer
 */
async function downloadAudioFromVAPI(recordingUrl) {
  return new Promise((resolve, reject) => {
    https.get(recordingUrl, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download audio: ${response.statusCode}`));
        return;
      }

      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Sube audio RAW a S3 bucket
 * @param {S3Client} s3Client - Cliente S3 configurado
 * @param {string} bucket - Nombre del bucket
 * @param {string} key - Path del archivo en S3
 * @param {Buffer} audioBuffer - Audio en formato buffer
 * @param {object} metadata - Metadata adicional
 * @returns {Promise<string>} - URL del archivo en S3
 */
async function uploadToS3(s3Client, bucket, key, audioBuffer, metadata = {}) {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: audioBuffer,
    ContentType: 'audio/mpeg',
    Metadata: {
      ...metadata,
      uploaded_at: new Date().toISOString()
    }
  });

  await s3Client.send(command);
  
  // Generar URL del archivo
  const region = process.env.AWS_REGION || 'us-east-2';
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

/**
 * Procesa audio de llamada terminada
 * Guarda en AWS S3 LEGAL (immutable) y ACTIVE (procesamiento)
 * 
 * @param {object} callData - Datos de la llamada desde VAPI
 * @returns {Promise<object>} - URLs de S3 y metadata
 */
export async function processCallAudio(callData) {
  const {
    id: callId,
    recordingUrl,
    customer,
    createdAt,
    duration
  } = callData;

  if (!recordingUrl) {
    throw new Error('No recording URL provided');
  }

  console.log(`[VAPI Audio] Processing call: ${callId}`);

  // 1. Descargar audio RAW de VAPI
  console.log(`[VAPI Audio] Downloading from: ${recordingUrl}`);
  const audioBuffer = await downloadAudioFromVAPI(recordingUrl);
  console.log(`[VAPI Audio] Downloaded ${audioBuffer.length} bytes`);

  // 2. Generar path organizado por fecha
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  const basePath = `calls/${year}/${month}/${day}/${callId}`;
  const audioKey = `${basePath}/audio-full.mp3`;

  // Metadata común
  const metadata = {
    call_id: callId,
    phone_number: customer?.number || 'unknown',
    duration_seconds: String(duration || 0),
    recorded_at: createdAt
  };

  // 3. Subir a S3 LEGAL (immutable, 1 año)
  console.log(`[VAPI Audio] Uploading to LEGAL bucket...`);
  const legalUrl = await uploadToS3(
    s3ClientLegal,
    process.env.AWS_S3_BUCKET_LEGAL,
    audioKey,
    audioBuffer,
    metadata
  );
  console.log(`[VAPI Audio] Uploaded to LEGAL: ${legalUrl}`);

  // 4. Subir a S3 ACTIVE (para Weaviate/procesamiento)
  console.log(`[VAPI Audio] Uploading to ACTIVE bucket...`);
  const activeUrl = await uploadToS3(
    s3ClientActive,
    process.env.AWS_S3_BUCKET_COMPANION,
    audioKey,
    audioBuffer,
    metadata
  );
  console.log(`[VAPI Audio] Uploaded to ACTIVE: ${activeUrl}`);

  return {
    callId,
    s3LegalUrl: legalUrl,
    s3ActiveUrl: activeUrl,
    s3LegalKey: audioKey,
    s3ActiveKey: audioKey,
    audioSizeBytes: audioBuffer.length,
    metadata
  };
}

/**
 * Health check de S3
 */
export async function testS3Connection() {
  try {
    // Test LEGAL bucket
    const testKeyLegal = `test/${Date.now()}.txt`;
    await uploadToS3(
      s3ClientLegal,
      process.env.AWS_S3_BUCKET_LEGAL,
      testKeyLegal,
      Buffer.from('health check'),
      {}
    );
    console.log('✅ S3 LEGAL connection OK');

    // Test ACTIVE bucket
    const testKeyActive = `test/${Date.now()}.txt`;
    await uploadToS3(
      s3ClientActive,
      process.env.AWS_S3_BUCKET_COMPANION,
      testKeyActive,
      Buffer.from('health check'),
      {}
    );
    console.log('✅ S3 ACTIVE connection OK');

    return { healthy: true };
  } catch (error) {
    console.error('❌ S3 connection failed:', error);
    return { 
      healthy: false, 
      error: error.message 
    };
  }
}
