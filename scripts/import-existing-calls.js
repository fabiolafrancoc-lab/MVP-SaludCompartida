#!/usr/bin/env node
/**
 * SCRIPT: Importar Llamadas Existentes de Lupita
 * ==============================================
 * 
 * Importa las 17+ llamadas reales de Lupita que ya están grabadas
 * al nuevo sistema de companion_calls + S3
 * 
 * USO:
 * node scripts/import-existing-calls.js
 * 
 * PREREQUISITOS:
 * - Tablas companion_calls creadas en Supabase
 * - Variables de entorno configuradas (.env.local)
 * - Archivos de audio disponibles (local o URLs de VAPI)
 */

import { createClient } from '@supabase/supabase-js';
import { processCallAudio } from '../src/lib/vapi-audio-handler.js';
import 'dotenv/config';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ============================================
// CONFIGURACIÓN: Lista de llamadas existentes
// ============================================
const EXISTING_CALLS = [
  {
    callId: 'call_001_abuela_maria',
    phoneNumber: '+52 123 456 7890',
    startedAt: '2026-01-20T10:00:00Z',
    durationMinutes: 12,
    recordingUrl: 'https://storage.vapi.ai/recordings/...',  // URL real de VAPI
    transcript: 'Lupita: Buenos días doñita... [extracto]',
    notes: 'Primera llamada exitosa - no detectó AI',
    userProfile: 'adulto_mayor'
  },
  // ... Añadir las 17 llamadas aquí
];

/**
 * Importa una llamada existente al nuevo sistema
 */
async function importCall(call) {
  console.log(`\n📞 Importando llamada: ${call.callId}`);
  console.log(`   Teléfono: ${call.phoneNumber}`);
  console.log(`   Fecha: ${call.startedAt}`);

  try {
    // 1. Crear registro en companion_calls
    const { data: callData, error: callError } = await supabase
      .from('companion_calls')
      .insert({
        call_id: call.callId,
        phone_number: call.phoneNumber,
        started_at: call.startedAt,
        ended_at: new Date(new Date(call.startedAt).getTime() + call.durationMinutes * 60000).toISOString(),
        duration_seconds: call.durationMinutes * 60,
        status: 'completed',
        companion_type: 'lupita',
        vapi_recording_url: call.recordingUrl,
        transcript: call.transcript ? [{ role: 'system', message: call.transcript }] : null,
        vapi_phone_number_id: process.env.VAPI_PHONE_NUMBER_ID
      })
      .select()
      .single();

    if (callError) {
      console.error(`❌ Error creando registro: ${callError.message}`);
      return { success: false, error: callError.message };
    }

    console.log(`✅ Registro creado en Supabase: ${callData.id}`);

    // 2. Descargar audio de VAPI y subir a S3 (si hay recordingUrl)
    if (call.recordingUrl && call.recordingUrl.includes('http')) {
      console.log(`📥 Descargando audio de VAPI...`);
      
      try {
        const audioResult = await processCallAudio(call.callId, call.recordingUrl);
        
        // Actualizar con URLs de S3
        await supabase.from('companion_calls')
          .update({
            s3_legal_url: audioResult.legalUrl,
            s3_active_url: audioResult.companionUrl,
            s3_legal_key: audioResult.legalKey,
            s3_active_key: audioResult.companionKey,
            audio_size_bytes: audioResult.audioSize
          })
          .eq('call_id', call.callId);
        
        console.log(`✅ Audio subido a S3:`);
        console.log(`   Legal: ${audioResult.legalUrl}`);
        console.log(`   Active: ${audioResult.companionUrl}`);
      } catch (audioError) {
        console.error(`⚠️ Error procesando audio: ${audioError.message}`);
        console.log(`   (El registro se creó pero sin audio en S3)`);
      }
    } else {
      console.log(`⏭️ No hay recordingUrl válida, saltando descarga`);
    }

    return { success: true, callId: call.callId };

  } catch (error) {
    console.error(`❌ Error general: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Main: Importar todas las llamadas
 */
async function main() {
  console.log('╔════════════════════════════════════════════╗');
  console.log('║  IMPORTACIÓN DE LLAMADAS EXISTENTES        ║');
  console.log('║  Lupita AI Companion                       ║');
  console.log('╚════════════════════════════════════════════╝\n');

  console.log(`📊 Total de llamadas a importar: ${EXISTING_CALLS.length}\n`);

  // Verificar configuración
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error('❌ ERROR: NEXT_PUBLIC_SUPABASE_URL no configurada');
    process.exit(1);
  }

  if (!process.env.AWS_ACCESS_KEY_ID_LEGAL || !process.env.AWS_ACCESS_KEY_ID_COMPANION) {
    console.error('❌ ERROR: Credenciales de AWS no configuradas');
    process.exit(1);
  }

  const results = {
    success: [],
    failed: []
  };

  // Importar una por una (no en paralelo para evitar rate limits)
  for (const call of EXISTING_CALLS) {
    const result = await importCall(call);
    
    if (result.success) {
      results.success.push(call.callId);
    } else {
      results.failed.push({ callId: call.callId, error: result.error });
    }

    // Pausa de 2 segundos entre llamadas
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Resumen final
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║  RESUMEN DE IMPORTACIÓN                    ║');
  console.log('╚════════════════════════════════════════════╝\n');

  console.log(`✅ Exitosas: ${results.success.length}/${EXISTING_CALLS.length}`);
  console.log(`❌ Fallidas: ${results.failed.length}/${EXISTING_CALLS.length}\n`);

  if (results.failed.length > 0) {
    console.log('⚠️ Llamadas fallidas:');
    results.failed.forEach(f => {
      console.log(`   - ${f.callId}: ${f.error}`);
    });
  }

  console.log('\n🎉 Importación completada!\n');
}

// Ejecutar
main().catch(console.error);
