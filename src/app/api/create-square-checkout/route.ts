import { NextResponse } from 'next/server';
import { Client, Environment } from 'square';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  const startTime = Date.now();
  
  try {
    const squareEnvironment = process.env.SQUARE_ENVIRONMENT;
    
    if (squareEnvironment !== 'sandbox' && squareEnvironment !== 'production') {
      console.error('❌ Invalid SQUARE_ENVIRONMENT:', squareEnvironment);
      return NextResponse.json({
        success: false,
        error: 'Invalid payment configuration',
      }, { status: 500 });
    }
    
    const squareClient = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN || '',
      environment: squareEnvironment === 'sandbox' ? Environment.Sandbox : Environment.Production,
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
    
    if (amount !== 1200) {
      return NextResponse.json({
        success: false,
        error: 'Invalid amount',
      }, { status: 400 });
    }
    
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
    
    const response = await squareClient.checkoutApi.createPaymentLink({
      idempotencyKey: `reg-${registration_id}-${Date.now()}`,
      order: {
        locationId: process.env.SQUARE_LOCATION_ID,
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
    
    const { error: updateError } = await supabase
      .from('registrations')
      .update({ 
        square_order_id: orderId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', registration_id);
    
    if (updateError) {
      console.error('Failed to save order_id:', updateError);
      throw new Error('Failed to save payment tracking');
    }
    
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
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    
    console.error('❌ Square checkout failed', {
      error: errorMessage,
      stack: errorStack,
      duration_ms: Date.now() - startTime,
    });
    
    return NextResponse.json({
      success: false,
      error: errorMessage || 'Internal server error',
    }, { status: 500 });
  }
}