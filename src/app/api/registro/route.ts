import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient, generateRegistrationId, generateCodigoFamilia } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { suscriptor, usuarioPrincipal, usuariosAdicionales, planId, planName, planPrice } = body;

    if (!suscriptor?.email || !usuarioPrincipal?.nombre) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    const codigoFamilia = generateCodigoFamilia();
    const supabase = getSupabaseClient();

    // 1. Crear registro principal
    const { data: registration, error: dbError } = await supabase
      .from('registrations')
      .insert({
        codigo_familia: codigoFamilia,
        migrant_name: suscriptor.nombre,
        migrant_email: suscriptor.email,
        migrant_phone: suscriptor.telefono,
        migrant_state: suscriptor.estado,
        principal_name: usuarioPrincipal.nombre,
        principal_phone: usuarioPrincipal.telefono,
        principal_relationship: usuarioPrincipal.parentesco,
        plan_id: planId,
        plan_name: planName,
        plan_price: planPrice,
        status: 'pending',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) {
      console.error('Error creating registration:', dbError);
      return NextResponse.json({ error: 'Error al crear registro' }, { status: 500 });
    }

    // Obtener el ID numérico generado
    const registrationId = registration.id;

    // 2. Crear miembros de familia
    const familyMembers = [
      { ...usuarioPrincipal, is_principal: true },
      ...(usuariosAdicionales || []).filter((m: any) => m.nombre?.trim())
    ];

    if (familyMembers.length > 0) {
      await supabase.from('family_members').insert(
        familyMembers.map((member: any) => ({
          registration_id: registrationId,
          name: member.nombre,
          phone: member.telefono || null,
          relationship: member.parentesco,
          is_principal: member.is_principal || false,
        }))
      );
    }

    // 3. TODO: Crear checkout en Square
    // Por ahora retornamos URL simulada
    const checkoutUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?nuevo=true&codigo=${codigoFamilia}`;

    return NextResponse.json({
      success: true,
      registrationId,
      codigoFamilia,
      checkoutUrl,
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const codigo = searchParams.get('codigo');

  if (!codigo) {
    return NextResponse.json({ error: 'Código requerido' }, { status: 400 });
  }

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .eq('codigo_familia', codigo)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Registro no encontrado' }, { status: 404 });
  }

  return NextResponse.json({
    status: data.subscription_status,
    plan: data.plan_id,
    codigoFamilia: data.codigo_familia,
    fechaActivacion: data.activated_at,
  });
}
