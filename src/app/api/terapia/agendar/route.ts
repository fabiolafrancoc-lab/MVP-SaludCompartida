import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';
import { sendTherapySessionNotification } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      codigoFamilia, 
      patientName, 
      patientPhone, 
      sessionDate, 
      sessionTime,
      therapyType 
    } = body;

    if (!codigoFamilia || !patientName || !patientPhone || !sessionDate || !sessionTime) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    const supabase = getSupabaseClient();

    // 1. Verificar que existe la suscripción y obtener datos del migrante
    const { data: registration, error: regError } = await supabase
      .from('registrations')
      .select('id, status, plan_id, migrant_email')
      .eq('codigo_familia', codigoFamilia)
      .single();

    if (regError || !registration) {
      return NextResponse.json({ error: 'Código de familia no encontrado' }, { status: 404 });
    }

    if (registration.status !== 'active') {
      return NextResponse.json({ error: 'Suscripción no activa' }, { status: 403 });
    }

    // 2. Verificar si el plan incluye terapia
    if (registration.plan_id === 'basic') {
      return NextResponse.json({ 
        error: 'El plan Basic no incluye terapia psicológica. Actualiza a Premium.' 
      }, { status: 403 });
    }

    // 3. Crear registro de la sesión (opcional - para tracking)
    // TODO: Agregar tabla therapy_sessions si necesitas tracking

    // 4. Enviar notificación inmediata a Aura con TODOS los datos
    const emailResult = await sendTherapySessionNotification({
      patientName,
      patientPhone,
      patientEmail: registration.migrant_email, // Email del migrante registrado
      codigoFamilia,
      sessionDate,
      sessionTime,
      therapyType: therapyType || 'Terapia General',
    });

    if (!emailResult.success) {
      console.error('Error sending therapy notification:', emailResult.error);
      return NextResponse.json({ 
        error: 'Error al enviar notificación',
        success: false 
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Sesión agendada correctamente. Recibirás confirmación por WhatsApp.',
      session: {
        patientName,
        sessionDate,
        sessionTime,
        therapyType: therapyType || 'Terapia General',
      },
    });

  } catch (error) {
    console.error('Therapy scheduling error:', error);
    return NextResponse.json({ 
      error: 'Error al agendar sesión',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
