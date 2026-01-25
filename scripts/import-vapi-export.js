#!/usr/bin/env node
/**
 * SCRIPT: Importar Export de VAPI a Supabase + S3
 * ================================================
 * 
 * Lee el JSON exportado de VAPI y crea registros en companion_calls
 * Descarga recordings (si existen) y los sube a S3 (legal + companion)
 * 
 * USO:
 * node scripts/import-vapi-export.js
 */

import { createClient } from '@supabase/supabase-js';
import { processCallAudio } from '../src/lib/vapi-audio-handler.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
const envPath = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim();
    process.env[key] = value;
  }
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Path al JSON exportado
const EXPORT_PATH = path.join(__dirname, '../temp-vapi-export/calls-export-7ccbcd15-8f32-4b4c-ab90-50618ceca6f9-2026-01-24-21-16-33.json');

/**
 * Extrae número de teléfono de diferentes fuentes
 */
function extractPhoneNumber(call) {
  // Intenta diferentes campos
  if (call.customer?.number) return call.customer.number;
  if (call.phoneNumber?.number) return call.phoneNumber.number;
  if (call.forwardedPhoneNumber) return call.forwardedPhoneNumber;
  
  // Si es webCall, extraer de metadata o usar placeholder
  if (call.type === 'webCall') {
    return call.metadata?.phoneNumber || 'web-' + call.id.slice(0, 8);
  }
  
  return 'unknown-' + call.id.slice(0, 8);
}

/**
 * Importa una llamada de VAPI a Supabase
 */
async function importCall(call, index, total) {
  console.log(`\n[${index + 1}/${total}] 📞 Importando llamada: ${call.id}`);
  console.log(`   Tipo: ${call.type}`);
  console.log(`   Fecha: ${call.startedAt}`);
  console.log(`   Duración: ${Math.round((new Date(call.endedAt) - new Date(call.startedAt)) / 1000)}s`);
  console.log(`   Costo: $${call.cost}`);

  const phoneNumber = extractPhoneNumber(call);
  const durationSeconds = Math.round((new Date(call.endedAt) - new Date(call.startedAt)) / 1000);

  try {
    // 1. Verificar si ya existe
    const { data: existing } = await supabase
      .from('companion_calls')
      .select('id')
      .eq('call_id', call.id)
      .single();

    if (existing) {
      console.log(`   ⏭️  Ya existe en base de datos (id: ${existing.id})`);
      return { success: true, skipped: true, callId: call.id };
    }

    // 2. Preparar transcript
    let transcriptArray = [];
    if (call.transcript && typeof call.transcript === 'string' && call.transcript.trim()) {
      transcriptArray = [{ role: 'assistant', message: call.transcript, time: new Date(call.startedAt).toISOString() }];
    } else if (call.messages && Array.isArray(call.messages)) {
      transcriptArray = call.messages
        .filter(m => m.role !== 'system')
        .map(m => ({
          role: m.role,
          message: m.message || '',
          time: m.time ? new Date(m.time).toISOString() : new Date(call.startedAt).toISOString()
        }));
    }

    // 3. Crear registro en companion_calls
    const { data: callData, error: callError } = await supabase
      .from('companion_calls')
      .insert({
        call_id: call.id,
        phone_number: phoneNumber,
        started_at: call.startedAt,
        ended_at: call.endedAt,
        duration_seconds: durationSeconds,
        status: call.status === 'ended' ? 'completed' : 'failed',
        companion_type: 'lupita',
        vapi_recording_url: call.recordingUrl || null,
        transcript: transcriptArray.length > 0 ? transcriptArray : null,
        vapi_phone_number_id: call.phoneNumberId || process.env.VAPI_PHONE_NUMBER_ID,
        hung_up_by: call.endedReason?.includes('customer') ? 'user' : 'system'
      })
      .select()
      .single();

    if (callError) {
      console.error(`   ❌ Error creando registro: ${callError.message}`);
      return { success: false, error: callError.message, callId: call.id };
    }

    console.log(`   ✅ Registro creado en Supabase (id: ${callData.id})`);

    // 4. Descargar audio y subir a S3 (si existe recordingUrl)
    if (call.recordingUrl && call.recordingUrl.startsWith('http')) {
      console.log(`   📥 Descargando recording...`);
      
      try {
        const audioResult = await processCallAudio(call.id, call.recordingUrl);
        
        // Actualizar con URLs de S3
        await supabase.from('companion_calls')
          .update({
            s3_legal_url: audioResult.legalUrl,
            s3_active_url: audioResult.companionUrl,
            s3_legal_key: audioResult.legalKey,
            s3_active_key: audioResult.companionKey,
            audio_size_bytes: audioResult.audioSize
          })
          .eq('call_id', call.id);
        
        console.log(`   ✅ Audio subido a S3:`);
        console.log(`      Legal: ${audioResult.legalKey}`);
        console.log(`      Active: ${audioResult.companionKey}`);
      } catch (audioError) {
        console.error(`   ⚠️  Error procesando audio: ${audioError.message}`);
        console.log(`   ℹ️  Registro guardado sin audio en S3`);
      }
    } else {
      console.log(`   ⏭️  No hay recordingUrl válida`);
    }

    return { success: true, callId: call.id };

  } catch (error) {
    console.error(`   ❌ Error general: ${error.message}`);
    return { success: false, error: error.message, callId: call.id };
  }
}

/**
 * Main: Importar todas las llamadas del export
 */
async function main() {
  console.log('╔════════════════════════════════════════════╗');
  console.log('║  IMPORTACIÓN DE EXPORT VAPI                ║');
  console.log('║  Lupita AI Companion                       ║');
  console.log('╚════════════════════════════════════════════╝\n');

  // 1. Verificar que existe el archivo
  if (!fs.existsSync(EXPORT_PATH)) {
    console.error(`❌ ERROR: No se encontró el archivo de export en:`);
    console.error(`   ${EXPORT_PATH}`);
    console.error(`\nAsegúrate de haber extraído el ZIP en temp-vapi-export/`);
    process.exit(1);
  }

  // 2. Leer JSON
  console.log(`📂 Leyendo export de: ${path.basename(EXPORT_PATH)}\n`);
  const calls = JSON.parse(fs.readFileSync(EXPORT_PATH, 'utf-8'));
  console.log(`📊 Total de llamadas en export: ${calls.length}\n`);

  // 3. Filtrar solo llamadas válidas (con startedAt y endedAt)
  const validCalls = calls.filter(c => c.startedAt && c.endedAt);
  console.log(`✅ Llamadas válidas (con start/end): ${validCalls.length}`);
  console.log(`⏭️  Llamadas sin completar: ${calls.length - validCalls.length}\n`);

  if (validCalls.length === 0) {
    console.log('⚠️  No hay llamadas válidas para importar');
    process.exit(0);
  }

  // 4. Verificar configuración
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error('❌ ERROR: NEXT_PUBLIC_SUPABASE_URL no configurada');
    process.exit(1);
  }

  if (!process.env.AWS_ACCESS_KEY_ID_LEGAL) {
    console.error('❌ ERROR: Credenciales de AWS no configuradas');
    console.error('ℹ️  Las llamadas se importarán sin audio en S3');
  }

  // 5. Importar una por una
  const results = {
    success: [],
    skipped: [],
    failed: []
  };

  for (let i = 0; i < validCalls.length; i++) {
    const result = await importCall(validCalls[i], i, validCalls.length);
    
    if (result.success) {
      if (result.skipped) {
        results.skipped.push(result.callId);
      } else {
        results.success.push(result.callId);
      }
    } else {
      results.failed.push({ callId: result.callId, error: result.error });
    }

    // Pausa de 1 segundo entre llamadas para evitar rate limits
    if (i < validCalls.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // 6. Resumen final
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║  RESUMEN DE IMPORTACIÓN                    ║');
  console.log('╚════════════════════════════════════════════╝\n');

  console.log(`✅ Importadas exitosamente: ${results.success.length}`);
  console.log(`⏭️  Ya existían (saltadas): ${results.skipped.length}`);
  console.log(`❌ Fallidas: ${results.failed.length}`);
  console.log(`📊 Total procesadas: ${validCalls.length}\n`);

  if (results.failed.length > 0) {
    console.log('⚠️  Llamadas fallidas:');
    results.failed.forEach(f => {
      console.log(`   - ${f.callId}: ${f.error}`);
    });
    console.log('');
  }

  // 7. Verificar en Supabase
  const { count } = await supabase
    .from('companion_calls')
    .select('*', { count: 'exact', head: true });

  console.log(`🎉 Total de llamadas en companion_calls: ${count}\n`);

  console.log('✅ Importación completada!\n');
}

// Ejecutar
main().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
