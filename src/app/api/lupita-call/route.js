// ============================================
// API: LUPITA CALL
// Endpoint para iniciar llamadas de Lupita
// ============================================

import { NextResponse } from 'next/server';
import { 
  initiateCallNow, 
  scheduleCall,
  processPendingCalls,
  scheduleDailyCallsForAllUsers
} from '@/lib/lupita-caller';

/**
 * POST /api/lupita-call
 * Iniciar o programar llamada de Lupita
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { action, phoneNumber, scheduledFor, reason } = body;

    switch (action) {
      case 'call-now':
        // Llamar AHORA a un número específico
        if (!phoneNumber) {
          return NextResponse.json(
            { error: 'Phone number required' },
            { status: 400 }
          );
        }

        const result = await initiateCallNow(phoneNumber);
        return NextResponse.json({
          success: true,
          message: `Lupita llamando a ${phoneNumber}`,
          callId: result.callId
        });

      case 'schedule':
        // Programar llamada para después
        if (!phoneNumber || !scheduledFor) {
          return NextResponse.json(
            { error: 'Phone number and scheduledFor required' },
            { status: 400 }
          );
        }

        const scheduled = await scheduleCall(
          phoneNumber,
          new Date(scheduledFor),
          reason || 'llamada programada'
        );

        return NextResponse.json({
          success: true,
          message: `Llamada programada para ${scheduledFor}`,
          callbackId: scheduled.id
        });

      case 'process-pending':
        // Procesar todas las llamadas pendientes (para cron job)
        const processed = await processPendingCalls();
        return NextResponse.json({
          success: true,
          message: `Procesadas ${processed.processed} llamadas`,
          stats: processed
        });

      case 'schedule-daily-all':
        // Programar llamadas diarias para todos los usuarios
        const dailyScheduled = await scheduleDailyCallsForAllUsers();
        return NextResponse.json({
          success: true,
          message: `Programadas ${dailyScheduled.scheduled} llamadas diarias`,
          stats: dailyScheduled
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('[API Lupita Call] Error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

/**
 * GET /api/lupita-call
 * Health check
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'lupita-caller',
    actions: [
      'call-now',
      'schedule',
      'process-pending',
      'schedule-daily-all'
    ]
  });
}
