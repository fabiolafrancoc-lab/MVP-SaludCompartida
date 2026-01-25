// ============================================
// API: INICIAR LLAMADA DE LUPITA
// POST /api/lupita/call
// ============================================

import { NextResponse } from 'next/server';
import { lupitaCall } from '@/lib/lupita-caller';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * POST /api/lupita/call
 * Iniciar llamada proactiva de Lupita
 * 
 * Body: { phoneNumber: "+525512345678" }
 */
export async function POST(request) {
  try {
    const { phoneNumber } = await request.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'phoneNumber is required' },
        { status: 400 }
      );
    }

    // Verificar formato E.164
    if (!/^\+52\d{10}$/.test(phoneNumber)) {
      return NextResponse.json(
        { error: 'Invalid phone format. Use +52XXXXXXXXXX' },
        { status: 400 }
      );
    }

    console.log(`[API] Initiating Lupita call to: ${phoneNumber}`);

    // Ejecutar llamada
    const result = await lupitaCall(phoneNumber);

    if (result.success) {
      return NextResponse.json({
        success: true,
        callId: result.callId,
        phoneNumber: result.phoneNumber,
        startedAt: result.startedAt,
        message: 'Lupita is calling now!'
      });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('[API] Error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

/**
 * GET /api/lupita/call
 * Obtener llamadas programadas pendientes
 */
export async function GET() {
  try {
    const { data: scheduledCalls } = await supabase
      .from('scheduled_callbacks')
      .select('*')
      .eq('status', 'pending')
      .order('scheduled_for', { ascending: true })
      .limit(10);

    return NextResponse.json({
      pending: scheduledCalls?.length || 0,
      calls: scheduledCalls || []
    });

  } catch (error) {
    console.error('[API] Error fetching scheduled calls:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
