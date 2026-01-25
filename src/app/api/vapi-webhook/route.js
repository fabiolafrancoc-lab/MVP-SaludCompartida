// ============================================
// VAPI WEBHOOK HANDLER
// Recibe eventos de llamadas de Lupita
// Guarda audio en AWS S3 + metadata en Supabase
// ============================================

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { processCallAudio } from '@/lib/vapi-audio-handler';

// Configurar Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * POST /api/vapi-webhook
 * Recibe eventos de VAPI (call-start, call-end, etc.)
 */
export async function POST(request) {
  try {
    const event = await request.json();
    
    console.log('[VAPI Webhook] Event received:', event.message?.type || event.type);

    // Extraer tipo de evento
    const eventType = event.message?.type || event.type;
    
    switch (eventType) {
      case 'call-start':
        await handleCallStart(event);
        break;
        
      case 'call-end':
        await handleCallEnd(event);
        break;
        
      case 'transcript':
        await handleTranscript(event);
        break;
        
      case 'hang':
        await handleHang(event);
        break;
        
      default:
        console.log('[VAPI Webhook] Unhandled event type:', eventType);
    }

    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('[VAPI Webhook] Error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Handler: Llamada iniciada
 */
async function handleCallStart(event) {
  const call = event.call;
  const callId = call?.id;
  const phoneNumber = call?.customer?.number;
  
  console.log(`[VAPI] Call started: ${callId} to ${phoneNumber}`);

  // Guardar en Supabase
  const { error } = await supabase
    .from('companion_calls')
    .insert({
      call_id: callId,
      phone_number: phoneNumber,
      started_at: new Date().toISOString(),
      status: 'in_progress',
      companion_type: 'lupita',
      vapi_phone_number_id: call?.phoneNumberId
    });

  if (error) {
    console.error('[VAPI] Error saving call start:', error);
  }
}

/**
 * Handler: Llamada terminada
 * AQUÍ SE GUARDA EL AUDIO EN AWS S3
 */
async function handleCallEnd(event) {
  const call = event.call;
  const callId = call?.id;
  const recordingUrl = call?.recordingUrl;
  const transcript = call?.transcript;
  const duration = call?.duration;

  console.log(`[VAPI] Call ended: ${callId}, duration: ${duration}s`);
  console.log(`[VAPI] Recording URL: ${recordingUrl}`);

  // 1. Procesar y guardar audio en AWS S3
  let s3Data = null;
  if (recordingUrl) {
    try {
      s3Data = await processCallAudio({
        id: callId,
        recordingUrl: recordingUrl,
        customer: call.customer,
        createdAt: call.createdAt || new Date().toISOString(),
        duration: duration
      });
      console.log('[VAPI] Audio saved to S3:', s3Data);
    } catch (error) {
      console.error('[VAPI] Error processing audio:', error);
    }
  }

  // 2. Actualizar Supabase con toda la info
  const { error } = await supabase
    .from('companion_calls')
    .update({
      ended_at: new Date().toISOString(),
      duration_seconds: duration,
      status: 'completed',
      transcript: transcript,
      vapi_recording_url: recordingUrl,
      s3_legal_url: s3Data?.s3LegalUrl,
      s3_active_url: s3Data?.s3ActiveUrl,
      s3_legal_key: s3Data?.s3LegalKey,
      s3_active_key: s3Data?.s3ActiveKey,
      audio_size_bytes: s3Data?.audioSizeBytes
    })
    .eq('call_id', callId);

  if (error) {
    console.error('[VAPI] Error updating call end:', error);
  }

  // 3. TODO: Trigger procesamiento para Weaviate
  // await triggerWeaviateProcessing(callId, s3Data.s3ActiveUrl);
}

/**
 * Handler: Transcripción en tiempo real
 */
async function handleTranscript(event) {
  const callId = event.call?.id;
  const transcript = event.transcript;
  
  console.log(`[VAPI] Transcript [${callId}]:`, transcript?.text?.substring(0, 50));
  
  // Opcionalmente guardar transcripciones parciales
  // para análisis en tiempo real
}

/**
 * Handler: Usuario colgó
 */
async function handleHang(event) {
  const callId = event.call?.id;
  console.log(`[VAPI] User hung up: ${callId}`);
  
  // Marcar como terminada por el usuario
  await supabase
    .from('companion_calls')
    .update({
      hung_up_by: 'user',
      hung_up_at: new Date().toISOString()
    })
    .eq('call_id', callId);
}

/**
 * GET /api/vapi-webhook
 * Health check
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'vapi-webhook',
    timestamp: new Date().toISOString()
  });
}
