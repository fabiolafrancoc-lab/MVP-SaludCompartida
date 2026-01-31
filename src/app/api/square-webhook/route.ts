import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );
    
    const event = await request.json();
    
    // TODO: Add Square webhook signature verification for production
    // See: https://developer.squareup.com/docs/webhooks/step3validate
    // This prevents unauthorized requests from activating payments
    
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
        const { data: registration } = await supabase
          .from('registrations')
          .select('*')
          .eq('square_order_id', orderId)
          .single();
        
        if (registration) {
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
          
          // TODO: Send welcome emails/WhatsApp notifications
        }
      }
    }
    
    return NextResponse.json({ received: true });
    
  } catch (error: any) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}
