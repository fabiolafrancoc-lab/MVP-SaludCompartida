import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient, generateCodigoFamilia } from '@/lib/supabase';
import { 
  sendMigrantWelcomeEmail, 
  sendAuraImmediateNotification 
} from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { suscriptor, usuarioPrincipal, usuariosAdicionales, planId, planName, planPrice } = body;

    if (!suscriptor?.email || !usuarioPrincipal?.nombre || !usuarioPrincipal?.apellido || !usuarioPrincipal?.fechaNacimiento) {
      return NextResponse.json({ error: 'Datos incompletos. Se requiere: nombre, apellido y fecha de nacimiento del usuario principal.' }, { status: 400 });
    }

    const codigoFamilia = generateCodigoFamilia();
    const supabase = getSupabaseClient();
    const now = new Date();
    const activationDate = now.toLocaleDateString('es-MX', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const activationTime = now.toLocaleTimeString('es-MX', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });

    // 1. Crear registro principal
    const { data: registration, error: dbError } = await supabase
      .from('registrations')
      .insert({
        codigo_familia: codigoFamilia,
        migrant_name: suscriptor.nombre,
        migrant_email: suscriptor.email,
        migrant_phone: suscriptor.telefono,
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
          last_name: member.apellido || null,
          birth_date: member.fechaNacimiento || null,
          phone: member.telefono || null,
          relationship: member.parentesco,
          is_principal: member.is_principal || false,
        }))
      );
    }

    // 3. Enviar emails automáticos
    try {
      // Separar nombre y apellido del migrante
      const migrantFullName = suscriptor.nombre.split(' ');
      const migrantFirstName = migrantFullName[0];
      const migrantLastName = migrantFullName.slice(1).join(' ') || migrantFullName[0];

      // Email 1: Al migrante con credenciales
      await sendMigrantWelcomeEmail({
        migrantName: suscriptor.nombre,
        migrantEmail: suscriptor.email,
        codigoFamilia,
        planName,
        planPrice,
      });

      // Email 4: A Aura (notificación inmediata) con datos completos
      await sendAuraImmediateNotification({
        migrantName: migrantFirstName,
        migrantLastName: migrantLastName,
        migrantEmail: suscriptor.email,
        migrantPhone: suscriptor.telefono,
        principalName: usuarioPrincipal.nombre,
        principalLastName: usuarioPrincipal.apellido,
        principalBirthDate: usuarioPrincipal.fechaNacimiento,
        principalPhone: usuarioPrincipal.telefono,
        codigoFamilia,
        planName,
        planPrice,
        familyMembersCount: familyMembers.length,
        activationDate,
        activationTime,
      });
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
      // No bloqueamos el registro si fallan los emails
    }

    // 4. TODO: Crear checkout en Square
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
