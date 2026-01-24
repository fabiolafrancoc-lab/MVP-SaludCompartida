import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';
import { sendAuraDailySummary } from '@/lib/resend';

// Este endpoint debe ser llamado por un cron job
// Ejecutar a las 07:00 y 19:00 hrs todos los días
export async function GET(request: NextRequest) {
  try {
    // Verificar token de seguridad (solo cron job puede llamar)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || 'dev-secret-change-in-production';
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getSupabaseClient();

    // 1. Obtener total de suscriptores
    const { count: totalSubscribers } = await supabase
      .from('registrations')
      .select('*', { count: 'exact', head: true });

    // 2. Obtener suscriptores activos
    const { count: activeSubscriptions } = await supabase
      .from('registrations')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    // 3. Obtener nuevos de hoy
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { count: newToday } = await supabase
      .from('registrations')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString());

    // 4. Obtener suscripciones recientes (últimas 24h)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const { data: recentSubscriptions } = await supabase
      .from('registrations')
      .select('codigo_familia, migrant_name, principal_name, principal_phone, plan_name, created_at')
      .gte('created_at', yesterday.toISOString())
      .order('created_at', { ascending: false })
      .limit(50);

    // 5. Enviar email con resumen
    const result = await sendAuraDailySummary({
      totalSubscribers: totalSubscribers || 0,
      newToday: newToday || 0,
      activeSubscriptions: activeSubscriptions || 0,
      recentSubscriptions: (recentSubscriptions || []).map((sub: any) => ({
        codigoFamilia: sub.codigo_familia,
        migrantName: sub.migrant_name,
        principalName: sub.principal_name,
        principalPhone: sub.principal_phone,
        planName: sub.plan_name,
        createdAt: new Date(sub.created_at).toLocaleString('es-MX'),
      })),
    });

    return NextResponse.json({
      success: result.success,
      stats: {
        totalSubscribers,
        newToday,
        activeSubscriptions,
        recentCount: recentSubscriptions?.length || 0,
      },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Daily summary error:', error);
    return NextResponse.json({ 
      error: 'Error al generar resumen diario',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
