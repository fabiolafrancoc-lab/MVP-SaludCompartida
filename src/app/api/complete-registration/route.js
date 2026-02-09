import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function POST(req) {
  try {
    const body = await req.json();
    const migrant_code = generateCode();
    const user_code = generateCode();

    const { data: registration, error } = await supabase
      .from('registrations')
      .insert({
        ...body,
        migrant_code,
        user_code,
        codes_active: true,
        status: 'active'
      })
      .select()
      .single();

    if (error) throw error;

    await Promise.all([
      resend.emails.send({
        from: 'SaludCompartida <noreply@saludcompartida.app>',
        to: body.migrant_email,
        subject: `${body.migrant_first_name}, la distancia ya no significa desprotección`,
        html: `<h1>Tu código: ${migrant_code}</h1>`
      }),
      resend.emails.send({
        from: 'SaludCompartida <noreply@saludcompartida.app>',
        to: body.user_email,
        subject: `${body.user_first_name}, ${body.migrant_first_name} te envió algo especial`,
        html: `<h1>Tu código: ${user_code}</h1>`
      })
    ]);

    return Response.json({ success: true, registration_id: registration.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
