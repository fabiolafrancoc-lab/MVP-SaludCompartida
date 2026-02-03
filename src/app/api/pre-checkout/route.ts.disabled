/**
 * ⚠️ ARCHIVO DEPRECADO - NO USAR
 * API Route: /api/pre-checkout
 * 
 * Este endpoint no se usa actualmente
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  return NextResponse.json(
    { success: false, error: 'Endpoint deprecated' },
    { status: 410 }
  );
}
    
    // 2. Validaciones básicas
    if (!body.firstName || !body.lastName || !body.email || !body.phone) {
      return NextResponse.json(
        { error: 'Missing required fields', required: ['firstName', 'lastName', 'email', 'phone'] },
        { status: 400 }
      );
    }
    
    // 3. Mapear campos de landing a formato pre_checkout
    const preCheckoutData = mapLandingToPreCheckout(body);
    
    // 4. Guardar en Supabase
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from('pre_checkout')
      .insert({
        first_name: preCheckoutData.firstName,
        last_name: preCheckoutData.lastName,
        email: preCheckoutData.email,
        phone: preCheckoutData.phone,
        country_code: preCheckoutData.countryCode,
        traffic_source: preCheckoutData.trafficSource,
        landing_page: preCheckoutData.landingPage,
        utm_campaign: preCheckoutData.utmCampaign,
        utm_source: preCheckoutData.utmSource,
        utm_medium: preCheckoutData.utmMedium,
      })
      .select()
      .single();
    
    if (error) {
      console.error('❌ Error saving pre-checkout:', error);
      
      // Si es duplicate email, no es error crítico
      if (error.code === '23505') {
        return NextResponse.json(
          { 
            success: true, 
            message: 'Email already registered',
            duplicate: true 
          },
          { status: 200 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to save lead', details: error.message },
        { status: 500 }
      );
    }
    
    // 5. Log para analytics
    console.log('✅ Pre-checkout saved:', {
      id: data.id,
      email: data.email,
      source: data.traffic_source,
      landing: data.landing_page,
    });
    
    // 6. Meta Pixel tracking (si está configurado)
    if (process.env.META_PIXEL_ID) {
      try {
        // Track Lead event para remarketing
        await fetch(`https://graph.facebook.com/v18.0/${process.env.META_PIXEL_ID}/events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: [{
              event_name: 'Lead',
              event_time: Math.floor(Date.now() / 1000),
              user_data: {
                em: hashEmail(body.email), // Hash para privacidad
                ph: hashPhone(body.phone),
              },
              custom_data: {
                content_name: 'Landing Form Submit',
                value: 0, // Pre-checkout, aún no hay valor
                currency: 'USD',
              },
            }],
            access_token: process.env.META_PIXEL_ACCESS_TOKEN,
          }),
        });
      } catch (pixelError) {
        console.warn('⚠️ Meta Pixel tracking failed:', pixelError);
        // No bloqueamos la respuesta si el pixel falla
      }
    }
    
    // 7. Respuesta exitosa
    return NextResponse.json(
      {
        success: true,
        leadId: data.id,
        message: 'Lead captured successfully',
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('❌ Pre-checkout API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Hash email para Meta Pixel (privacidad)
 */
function hashEmail(email: string): string {
  // En producción, usar crypto.createHash('sha256')
  return email.toLowerCase().trim();
}

/**
 * Hash phone para Meta Pixel (privacidad)
 */
function hashPhone(phone: string): string {
  // Remover caracteres no numéricos
  return phone.replace(/\D/g, '');
}
