import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );
    
    const event = await request.json();
    
    console.log('📥 Square webhook received', {
      type: event.type,
      timestamp: new Date().toISOString(),
    });
    
    // Handle payment completion
    if (event.type === 'payment.updated') {
      const payment = event.data.object.payment;
      
      if (payment.status === 'COMPLETED') {
        const orderId = payment.orderId;
        
        console.log('✅ Payment completed', { order_id: orderId });
        
        // Find registration by order_id
        const { data: registration, error: fetchError } = await supabase
          .from('registrations')
          .select('*')
          .eq('square_order_id', orderId)
          .single();
        
        if (fetchError || !registration) {
          console.error('❌ Registration not found for order:', orderId);
          return NextResponse.json({ 
            error: 'Registration not found' 
          }, { status: 404 });
        }
        
        // Update status to active
        const { error: updateError } = await supabase
          .from('registrations')
          .update({
            status: 'active',
            square_payment_id: payment.id,
            payment_completed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('id', registration.id);
        
        if (updateError) {
          console.error('❌ Failed to activate registration:', updateError);
          return NextResponse.json({ 
            error: 'Failed to activate registration' 
          }, { status: 500 });
        }
        
        console.log('✅ Registration activated', {
          registration_id: registration.id,
          migrant_code: registration.migrant_code,
          family_code: registration.family_code,
        });
        
        // 🚀 ENVIAR NOTIFICACIONES (EMAIL + WHATSAPP)
        try {
          console.log('📧 Sending welcome notifications...');
          
          await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL || 'https://saludcompartida.app'}/api/send-notifications`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: 'welcome',
                registrationId: registration.id,
                codigoFamilia: registration.family_code || registration.migrant_code,
                suscriptorEmail: registration.subscriber_email || registration.migrant_email,
                suscriptorNombre: registration.subscriber_name || registration.migrant_name,
                suscriptorTelefono: registration.subscriber_phone || registration.migrant_phone,
                usuarioPrincipalNombre: registration.primary_user_name || registration.family_name,
                usuarioPrincipalTelefono: registration.primary_user_phone || registration.family_phone,
                planName: registration.plan_type || 'Básico',
              }),
            }
          );
          console.log('✅ Notifications sent');
        } catch (notificationError) {
          console.error('⚠️ Notification error:', notificationError);
        }

        // 📧 NOTIFICACIÓN A SALUDCOMPARTIDA (nuevo registro)
        try {
          const { Resend } = await import('resend');
          const resend = new Resend(process.env.RESEND_API_KEY);
          
          await resend.emails.send({
            from: 'SaludCompartida <noreply@saludcompartida.com>',
            to: 'contact@saludcompartida.com',
            subject: `🎉 Nueva suscripción: ${registration.subscriber_name || registration.migrant_name}`,
            html: `
              <h1>🎉 ¡Nueva Suscripción!</h1>
              <p><strong>Migrante:</strong> ${registration.subscriber_name || registration.migrant_name}</p>
              <p><strong>Email:</strong> ${registration.subscriber_email || registration.migrant_email}</p>
              <p><strong>Familia:</strong> ${registration.primary_user_name || registration.family_name}</p>
              <p><strong>Teléfono familia:</strong> ${registration.primary_user_phone || registration.family_phone}</p>
              <p><strong>Código:</strong> ${registration.family_code || registration.migrant_code}</p>
              <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}</p>
            `,
          });
          console.log('✅ Admin notification sent');
        } catch (adminEmailError) {
          console.error('⚠️ Admin email error:', adminEmailError);
        }
      }
    }
    
    return NextResponse.json({ received: true });
    
  } catch (error: any) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}