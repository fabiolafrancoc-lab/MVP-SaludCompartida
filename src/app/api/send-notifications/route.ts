import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendPostPaymentEmails } from '@/lib/email-templates';

// ════════════════════════════════════════════════════════════════════════════
// ENDPOINT: /api/send-notifications
// ════════════════════════════════════════════════════════════════════════════
// Descripción: Envía emails de bienvenida post-pago usando templates de Resend
// Conexión: Supabase + Resend + Square
// ════════════════════════════════════════════════════════════════════════════

// Inicializar Supabase con service role key o anon key como fallback
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function POST(request: NextRequest) {
  try {
    const { type, registrationId } = await request.json();

    console.log(`📧 [RESEND] Iniciando envío de emails para registration:`, registrationId);
    console.log(`📧 [RESEND] Tipo de notificación:`, type);

    // ════════════════════════════════════════════════════════════
    // 1. OBTENER DATOS COMPLETOS DE SUPABASE
    // ════════════════════════════════════════════════════════════
    // ✅ JOIN con ai_companions para obtener nombre de compañera
    // ✅ Todos los campos necesarios para los templates
    // ════════════════════════════════════════════════════════════
    
    const { data: registration, error: fetchError } = await supabase
      .from('registrations')
      .select(`
        *,
        ai_companions:assigned_companion_id (
          companion_name
        )
      `)
      .eq('id', registrationId)
      .single();

    if (fetchError || !registration) {
      console.error('❌ [SUPABASE] Error obteniendo datos:', fetchError);
      return NextResponse.json({ 
        success: false, 
        error: 'Registro no encontrado en Supabase' 
      }, { status: 404 });
    }

    console.log('✅ [SUPABASE] Datos obtenidos correctamente:', {
      migrant_email: registration.migrant_email,
      family_email: registration.family_primary_email,
      migrant_code: registration.migrant_code,
      family_code: registration.family_code,
      companion: registration.ai_companions?.companion_name || 'Sin asignar',
      payment_status: registration.payment_status
    });

    // ════════════════════════════════════════════════════════════
    // 2. VALIDAR QUE RESEND ESTÉ CONFIGURADO
    // ════════════════════════════════════════════════════════════
    
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ [RESEND] API Key no configurada en variables de entorno');
      return NextResponse.json({
        success: false,
        error: 'Servicio de email no configurado'
      }, { status: 500 });
    }

    // ════════════════════════════════════════════════════════════
    // 3. ENVIAR EMAILS CON LOS NUEVOS TEMPLATES
    // ════════════════════════════════════════════════════════════
    // ✅ Email 1: Migrante (USA) - "El Que Nunca Olvida"
    // ✅ Email 2: Usuario México - "El Regalo de Amor"
    // ✅ Ambos emails se envían en paralelo
    // ════════════════════════════════════════════════════════════
    
    try {
      // Obtener nombre de compañera (con fallback a Lupita)
      const companionName = registration.ai_companions?.companion_name || 'Lupita';

      console.log('📧 [RESEND] Enviando emails con templates:');
      console.log('   → Email Migrante (USA):', registration.migrant_email);
      console.log('   → Email Usuario México:', registration.family_primary_email);
      console.log('   → Compañera asignada:', companionName);

      // Enviar AMBOS emails usando la función de email-templates.ts
      const emailResults = await sendPostPaymentEmails(
        // Email 1: Migrante (USA)
        {
          migrant_email: registration.migrant_email,
          migrant_code: registration.migrant_code,
          migrant_first_name: registration.migrant_first_name,
          companion_name: companionName,
        },
        // Email 2: Usuario México
        {
          family_primary_email: registration.family_primary_email,
          family_first_name: registration.family_first_name,
          family_code: registration.family_code,
          migrant_first_name: registration.migrant_first_name,
          migrant_email: registration.migrant_email,
          companion_name: companionName,
        }
      );

      // Log detallado de resultados
      console.log('✅ [RESEND] Resultado Email Migrante:', 
        emailResults.migrant.status === 'fulfilled' ? 
        '✓ Enviado exitosamente' : 
        `✗ Error: ${emailResults.migrant.status === 'rejected' ? emailResults.migrant.reason : 'Unknown'}`
      );
      
      console.log('✅ [RESEND] Resultado Email Usuario México:', 
        emailResults.family.status === 'fulfilled' ? 
        '✓ Enviado exitosamente' : 
        `✗ Error: ${emailResults.family.status === 'rejected' ? emailResults.family.reason : 'Unknown'}`
      );

      // Respuesta exitosa
      return NextResponse.json({
        success: true,
        emails: {
          migrant: {
            sent: emailResults.migrant.status === 'fulfilled',
            email: registration.migrant_email
          },
          family: {
            sent: emailResults.family.status === 'fulfilled',
            email: registration.family_primary_email
          }
        },
        companion: companionName,
        message: 'Emails de bienvenida enviados exitosamente'
      });

    } catch (emailError) {
      console.error('❌ [RESEND] Error enviando emails:', emailError);
      return NextResponse.json({
        success: false,
        error: 'Error enviando emails',
        details: emailError instanceof Error ? emailError.message : 'Unknown error'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ [ENDPOINT] Error general en send-notifications:', error);
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
