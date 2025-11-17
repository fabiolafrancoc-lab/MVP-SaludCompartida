// API endpoint para guardar pre-checkout desde el backend
// Esto evita problemas de schema cache del lado del cliente

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ozpffhjaknxwoueaojkh.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96cGZmaGpha254d291ZWFvamtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MjA5MDUsImV4cCI6MjA3ODM5NjkwNX0.Co05GFfcqmANmlT5tiQ-2fpN6VYc3w2m3PSKdHFCvds'
);

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

    // Insertar directamente en la tabla (sin RPC)
    const { data, error } = await supabase
      .from('pre_checkout_customers')
      .insert([{
        first_name,
        last_name,
        email,
        phone,
        country: country || 'USA',
        status: 'pending_payment',
        traffic_source: traffic_source || 'direct'
      }])
      .select()
      .single();

    if (error) {
      console.error('❌ Error de Supabase:', error);
      return res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }

    console.log('✅ Pre-checkout guardado:', data);

    return res.status(200).json({ 
      success: true,
      data 
    });

  } catch (error) {
    console.error('❌ Error en save-pre-checkout:', error);
    return res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
}
