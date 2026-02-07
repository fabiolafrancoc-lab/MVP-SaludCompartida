// API para procesar pagos con Square - REST API directo (sin SDK)
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export default async function handler(req, res) {
  console.log('🔍 Square Payment API called');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sourceId, amount, currency, description, registrationId } = req.body;
  const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
  const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;

  if (!SQUARE_ACCESS_TOKEN || !SQUARE_LOCATION_ID) {
    console.error('❌ Square credentials not configured');
    return res.status(500).json({
      success: false,
      error: 'Payment system not configured'
    });
  }

  if (!sourceId || !amount) {
    return res.status(400).json({ 
      success: false,
      error: 'Missing required fields'
    });
  }

  try {
    console.log('💳 Llamando a Square API directamente...');
    
    // Llamar a Square REST API directamente (Production)
    const response = await fetch('https://connect.squareup.com/v2/payments', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-12-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source_id: sourceId,
        amount_money: {
          amount: amount,
          currency: currency || 'USD',
        },
        location_id: SQUARE_LOCATION_ID,
        idempotency_key: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Square API error:', data);
      return res.status(response.status).json({
        success: false,
        error: data.errors?.[0]?.detail || 'Error processing payment',
      });
    }

    console.log('✅ Payment successful:', data.payment.id);

    // Update registration status to 'active' in Supabase after successful payment
    if (registrationId) {
      const supabase = getSupabase();
      if (supabase) {
        console.log('💾 [SUPABASE] Updating registration status to active:', registrationId);
        const { error: updateError } = await supabase
          .from('registrations')
          .update({
            status: 'active',
            payment_completed_at: new Date().toISOString(),
          })
          .eq('id', registrationId);

        if (updateError) {
          console.error('❌ [SUPABASE] Registration update failed:', updateError);
        } else {
          console.log('✅ [SUPABASE] Registration status updated to active');
        }
      } else {
        console.warn('⚠️ [SUPABASE] Could not connect to update registration status');
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        id: data.payment.id,
        status: data.payment.status,
      },
    });

  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
