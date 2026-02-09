import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendPostPaymentEmails } from '@/lib/email-templates';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sourceId, registrationId } = body;

    if (!sourceId || !registrationId) {
      return NextResponse.json({ success: false, error: 'Missing parameters' }, { status: 400 });
    }

    const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
    const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;
    const SQUARE_API = 'https://connect.squareup.com/v2';

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabase = createClient(SUPABASE_URL as string, SUPABASE_KEY as string);

    const { data: registration } = await supabase.from('registrations').select('*').eq('id', registrationId).single();

    // Crear pago único de $12
    const paymentPayload = {
      idempotency_key: `payment_${registrationId}_${Date.now()}`,
      source_id: sourceId,
      amount_money: { amount: 1200, currency: 'USD' },
      location_id: SQUARE_LOCATION_ID,
      autocomplete: true,
      buyer_email_address: registration?.migrant_email || undefined,
    };

    const paymentResponse = await fetch(`${SQUARE_API}/payments`, {
      method: 'POST',
      headers: {
        'Square-Version': '2024-12-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentPayload),
    });

    const paymentData = await paymentResponse.json();

    if (!paymentResponse.ok || paymentData.errors) {
      return NextResponse.json({ success: false, error: 'Payment failed', details: paymentData.errors }, { status: 500 });
    }

    await supabase.from('registrations').update({ status: 'active', payment_completed_at: new Date().toISOString() }).eq('id', registrationId);

    // Enviar emails post-pago
    if (registration) {
      console.log('📧 Enviando emails post-pago...');
      console.log('Migrante email:', registration.migrant_email);
      console.log('Familia email:', registration.family_primary_email);
      
      const emailResults = await sendPostPaymentEmails(
        {
          migrant_email: registration.migrant_email,
          migrant_code: registration.migrant_code,
          migrant_first_name: registration.migrant_first_name,
          companion_name: registration.family_companion_assigned === 'lupita' ? 'Lupita' : 'Fernanda',
        },
        {
          family_primary_email: registration.family_email || registration.family_primary_email,
          family_first_name: registration.family_first_name,
          family_code: registration.family_code,
          migrant_first_name: registration.migrant_first_name,
          companion_name: registration.family_companion_assigned === 'lupita' ? 'Lupita' : 'Fernanda',
        },
        registration // ✅ Pasar datos completos para email de notificación a Aura
      );
      
      console.log('📧 Resultados de emails:', JSON.stringify(emailResults, null, 2));
    }

    return NextResponse.json({ success: true, data: { paymentId: paymentData.payment.id, registrationId } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
