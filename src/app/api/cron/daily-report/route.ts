import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Service role para acceso completo
);

export async function GET(request: NextRequest) {
  try {
    // Verificar que la request viene de Vercel Cron (seguridad)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    const today = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const reportTime = now.getHours() === 7 ? '07:00' : '17:00';

    // Obtener todos los usuarios activos
    const { data: activeUsers, error: activeError } = await supabase
      .from('registrations')
      .select('*')
      .eq('status', 'active')
      .order('payment_completed_at', { ascending: false });

    if (activeError) throw activeError;

    // Obtener usuarios nuevos hoy
    const { data: newUsers, error: newError } = await supabase
      .from('registrations')
      .select('*')
      .eq('status', 'active')
      .gte('payment_completed_at', `${today}T00:00:00`)
      .lte('payment_completed_at', `${today}T23:59:59`)
      .order('payment_completed_at', { ascending: false });

    if (newError) throw newError;

    // Formatear datos para el email
    const formattedActiveUsers = activeUsers?.map(user => ({
      name: `${user.family_first_name} ${user.family_last_name || ''}`,
      code: user.family_code,
      phone: user.family_phone,
      status: user.status
    })) || [];

    const formattedNewUsers = newUsers?.map(user => ({
      name: `${user.family_first_name} ${user.family_last_name || ''}`,
      code: user.family_code,
      phone: user.family_phone,
      activationDate: new Date(user.payment_completed_at).toLocaleString('es-MX')
    })) || [];

    // Enviar email con el reporte
    const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'daily_report',
        data: {
          reportTime,
          reportDate: now.toLocaleString('es-MX'),
          totalActive: activeUsers?.length || 0,
          newToday: newUsers?.length || 0,
          activeUsers: formattedActiveUsers,
          newUsers: formattedNewUsers,
        }
      })
    });

    if (!emailResponse.ok) {
      throw new Error('Failed to send email report');
    }

    return NextResponse.json({
      success: true,
      reportTime,
      totalActive: activeUsers?.length || 0,
      newToday: newUsers?.length || 0,
    });

  } catch (error: any) {
    console.error('Cron Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
