// API endpoint para guardar pre-checkout desde el backend
// Usa SQL raw para evitar problemas de schema cache

export default async function handler(req, res) {
  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { first_name, last_name, email, phone, country, traffic_source } = req.body;

    // Validar campos requeridos
    if (!first_name || !last_name || !email || !phone) {
      return res.status(400).json({ 
        success: false,
        error: 'Faltan campos requeridos' 
      });
    }

    console.log('📥 Recibiendo pre-checkout:', { first_name, last_name, email, phone });

    // Usar SQL raw para INSERT directo (bypass schema cache)
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ozpffhjaknxwoueaojkh.supabase.co';
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96cGZmaGpha254d291ZWFvamtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MjA5MDUsImV4cCI6MjA3ODM5NjkwNX0.Co05GFfcqmANmlT5tiQ-2fpN6VYc3w2m3PSKdHFCvds';

    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/insert_pre_checkout_customer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        p_first_name: first_name,
        p_last_name: last_name,
        p_email: email,
        p_phone: phone,
        p_country: country || 'USA',
        p_status: 'pending_payment',
        p_traffic_source: traffic_source || 'direct'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error de Supabase:', errorText);
      return res.status(500).json({ 
        success: false,
        error: 'Error al guardar en base de datos' 
      });
    }

    const data = await response.json();
    console.log('✅ Pre-checkout guardado:', data);

    // La función RPC retorna un array
    const savedData = Array.isArray(data) && data.length > 0 ? data[0] : data;

    return res.status(200).json({ 
      success: true,
      data: savedData
    });

  } catch (error) {
    console.error('❌ Error en save-pre-checkout:', error);
    return res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
}
