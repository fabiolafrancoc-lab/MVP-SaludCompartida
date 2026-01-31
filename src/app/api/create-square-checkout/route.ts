import { NextRequest, NextResponse } from 'next/server';
import { Client, Environment } from 'square';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Initialize Square client inside the function
    const squareClient = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN || '',
      environment: process.env.SQUARE_ENVIRONMENT === 'sandbox' ? Environment.Sandbox : Environment.Production,
    });

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );
    
    const { registration_id, amount, description } = await request.json();
    
    console.log('🔵 Square checkout initiated', {
      registration_id,
      amount,
      timestamp: new Date().toISOString(),
    });
    
    // Validate amount is exactly $12.00
    if (amount !== 1200) {
      return NextResponse.json({
        success: false,
        error: 'Invalid amount',
      }, { status: 400 });
    }
    
    // Verify registration exists and is not already paid
    const { data: registration, error: fetchError } = await supabase
      .from('registrations')
      .select('status')
      .eq('id', registration_id)
      .single();
    
    if (fetchError || !registration) {
      return NextResponse.json({
        success: false,
        error: 'Registration not found',
      }, { status: 404 });
    }
    
    if (registration.status === 'active') {
      return NextResponse.json({
        success: false,
        error: 'Already paid',
      }, { status: 400 });
    }
    
    // Create Square payment link
    const response = await squareClient.checkoutApi.createPaymentLink({
      idempotencyKey: `reg-${registration_id}-${Date.now()}`,
      order: {
        locationId: process.env.SQUARE_LOCATION_ID!,
        lineItems: [
          {
            name: description || 'SaludCompartida - Plan Familiar',
            quantity: '1',
            basePriceMoney: {
              amount: BigInt(amount),
              currency: 'USD',
            },
          },
        ],
      },
      checkoutOptions: {
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/confirmacion`,
        allowTipping: false,
      },
    });
    
    const checkoutUrl = response.result.paymentLink?.url;
    const orderId = response.result.paymentLink?.orderId;
    
    if (!checkoutUrl) {
      throw new Error('No checkout URL received from Square');
    }
    
    // Save Square order_id to registration
    await supabase
      .from('registrations')
      .update({ 
        square_order_id: orderId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', registration_id);
    
    console.log('✅ Square checkout created', {
      registration_id,
      order_id: orderId,
      duration_ms: Date.now() - startTime,
    });
    
    return NextResponse.json({
      success: true,
      checkoutUrl: checkoutUrl,
      orderId: orderId,
    });
    
  } catch (error: any) {
    console.error('❌ Square checkout failed', {
      error: error.message,
      stack: error.stack,
      duration_ms: Date.now() - startTime,
    });
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Internal server error',
    }, { status: 500 });
  }
}
