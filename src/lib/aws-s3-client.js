/**
 * AWS S3 Client para almacenamiento de grabaciones de Lupita
 * 
 * Propósito: Precaución legal personal
 * Contenido: Conversaciones generales (NO datos de salud)
 * Retención: 1 año automático
 * Llave: Número de teléfono del usuario
 */

import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

// Configurar cliente S3 para LEGAL ARCHIVE
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_LEGAL,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_LEGAL
  }
});

/**
 * Formatea número de teléfono para usar como key
 * +525599906900 → 52_5599906900
 * +15558420346 → 1_5558420346
 */
function formatPhoneKey(phone) {
  return phone.replace('+', '').replace(/\s/g, '');
}

/**
 * Sube una grabación de Lupita a S3
 * @param {Buffer|Blob} audioFile - Archivo de audio
 * @param {Object} metadata - Metadata de la grabación
 * @returns {Promise<string>} - URL de S3 del archivo
 */
export async function uploadRecordingToS3(audioFile, metadata) {
  try {
    const phoneKey = formatPhoneKey(metadata.phoneNumber);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    // Estructura: recordings/{phone}/{timestamp}.opus
    const fileName = `recordings/${phoneKey}/${timestamp}.opus`;
    
    console.log('📤 Uploading to S3:', fileName);
    
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.AWS_S3_BUCKET_LEGAL,
        Key: fileName,
        Body: audioFile,
        ContentType: 'audio/opus',
        ServerSideEncryption: 'AES256',
        Metadata: {
          'nombre-apellido': metadata.nombreApellido || '',
          'telefono': metadata.phoneNumber || '',
          'fecha-llamada': metadata.callDate || new Date().toISOString(),
          'vapi-call-id': metadata.vapiCallId || '',
          'duracion-segundos': metadata.duration?.toString() || '0'
        },
        // Expiración automática después de 1 año
        Expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      }
    });

    upload.on('httpUploadProgress', (progress) => {
      const percent = Math.round((progress.loaded / progress.total) * 100);
      console.log(`📤 Upload progress: ${percent}%`);
    });

    await upload.done();
    
    const s3Url = `https://${process.env.AWS_S3_BUCKET_LEGAL}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    
    console.log('✅ Recording uploaded to S3:', s3Url);
    
    return s3Url;
    
  } catch (error) {
    console.error('❌ Error uploading to S3:', error);
    throw error;
  }
}

/**
 * Descarga grabación de VAPI y la sube a S3
 * @param {string} vapiUrl - URL de la grabación en VAPI
 * @param {Object} callData - Datos de la llamada
 * @returns {Promise<string>} - URL de S3
 */
export async function backupVapiRecordingToS3(vapiUrl, callData) {
  try {
    console.log('📥 Downloading from VAPI:', vapiUrl);
    
    // Descargar de VAPI
    const response = await fetch(vapiUrl);
    if (!response.ok) {
      throw new Error(`Failed to download from VAPI: ${response.status}`);
    }
    
    const audioBuffer = await response.arrayBuffer();
    const sizeMB = (audioBuffer.byteLength / 1024 / 1024).toFixed(2);
    console.log(`📊 Downloaded ${sizeMB} MB from VAPI`);
    
    // Subir a S3
    const s3Url = await uploadRecordingToS3(Buffer.from(audioBuffer), {
      phoneNumber: callData.phoneNumber,
      nombreApellido: callData.nombreApellido,
      vapiCallId: callData.vapiCallId,
      duration: callData.duration,
      callDate: callData.callDate || new Date().toISOString()
    });
    
    console.log('✅ Backup to S3 completed');
    
    // Limpiar grabaciones antiguas (mantener solo últimas 4)
    await cleanupOldRecordings(callData.phoneNumber);
    
    return s3Url;
    
  } catch (error) {
    console.error('❌ Error backing up to S3:', error);
    throw error;
  }
}

/**
 * Mantiene solo las últimas 4 grabaciones por usuario
 * @param {string} phoneNumber - Número de teléfono del usuario
 */
async function cleanupOldRecordings(phoneNumber) {
  try {
    const phoneKey = formatPhoneKey(phoneNumber);
    const prefix = `recordings/${phoneKey}/`;
    
    console.log('🧹 Checking recordings for cleanup:', prefix);
    
    // Listar todas las grabaciones del usuario
    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET_LEGAL,
      Prefix: prefix
    });
    
    const response = await s3Client.send(listCommand);
    
    if (!response.Contents || response.Contents.length <= 4) {
      console.log(`✅ User has ${response.Contents?.length || 0} recordings (within limit)`);
      return;
    }
    
    // Ordenar por fecha (más reciente primero)
    const sortedRecordings = response.Contents.sort((a, b) => 
      b.LastModified - a.LastModified
    );
    
    // Eliminar todas excepto las últimas 4
    const toDelete = sortedRecordings.slice(4);
    
    console.log(`🗑️ Deleting ${toDelete.length} old recordings...`);
    
    for (const recording of toDelete) {
      await s3Client.send(new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_LEGAL,
        Key: recording.Key
      }));
      console.log(`  ✅ Deleted: ${recording.Key}`);
    }
    
    console.log('✅ Cleanup completed');
    
  } catch (error) {
    console.error('⚠️ Cleanup failed (non-critical):', error);
    // No lanzar error - el cleanup es opcional
  }
}

/**
 * Obtiene las últimas 4 grabaciones de un usuario
 * @param {string} phoneNumber - Número de teléfono
 * @returns {Promise<Array>} - Lista de grabaciones
 */
export async function getLast4Recordings(phoneNumber) {
  try {
    const phoneKey = formatPhoneKey(phoneNumber);
    const prefix = `recordings/${phoneKey}/`;
    
    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET_LEGAL,
      Prefix: prefix
    });
    
    const response = await s3Client.send(listCommand);
    
    if (!response.Contents || response.Contents.length === 0) {
      return [];
    }
    
    // Ordenar por fecha (más reciente primero) y tomar solo 4
    const recordings = response.Contents
      .sort((a, b) => b.LastModified - a.LastModified)
      .slice(0, 4)
      .map(item => ({
        key: item.Key,
        url: `https://${process.env.AWS_S3_BUCKET_LEGAL}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`,
        lastModified: item.LastModified,
        size: item.Size
      }));
    
    return recordings;
    
  } catch (error) {
    console.error('❌ Error fetching recordings:', error);
    return [];
  }
}

/**
 * Verifica si S3 está configurado correctamente
 */
export async function checkS3Health() {
  try {
    // Intentar listar el bucket
    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET_LEGAL,
      MaxKeys: 1
    });
    
    await s3Client.send(listCommand);
    
    console.log('✅ S3 health check passed');
    return { 
      healthy: true, 
      message: 'S3 connection successful',
      bucket: process.env.AWS_S3_BUCKET_LEGAL,
      region: process.env.AWS_REGION
    };
    
  } catch (error) {
    console.error('❌ S3 health check failed:', error);
    return { 
      healthy: false, 
      error: error.message,
      config: {
        bucket: process.env.AWS_S3_BUCKET_LEGAL,
        region: process.env.AWS_REGION,
        hasCredentials: !!(process.env.AWS_ACCESS_KEY_ID_LEGAL && process.env.AWS_SECRET_ACCESS_KEY_LEGAL)
      }
    };
  }
}

export { s3Client };
