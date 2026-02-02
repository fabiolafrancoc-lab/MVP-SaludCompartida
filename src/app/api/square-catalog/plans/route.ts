import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/square-catalog/plans
 * 
 * Lista todos los planes de suscripción disponibles en Square
 */
export async function GET(request: NextRequest) {
  console.log('📋 [SQUARE] Obteniendo planes de suscripción...');
  
  try {
    const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;

    if (!SQUARE_ACCESS_TOKEN) {
      return NextResponse.json(
        { success: false, error: 'Square not configured' },
        { status: 500 }
      );
    }

    // Buscar objetos de tipo SUBSCRIPTION_PLAN
    const response = await fetch('https://connect.squareup.com/v2/catalog/list?types=SUBSCRIPTION_PLAN', {
      method: 'GET',
      headers: {
        'Square-Version': '2024-12-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Error obteniendo catalog:', JSON.stringify(data, null, 2));
      return NextResponse.json(
        {
          success: false,
          error: data.errors?.[0]?.detail || 'Error fetching catalog',
        },
        { status: response.status }
      );
    }

    console.log('✅ [SQUARE] Planes encontrados:', data.objects?.length || 0);

    return NextResponse.json({
      success: true,
      plans: data.objects || [],
      count: data.objects?.length || 0,
    });

  } catch (error: any) {
    console.error('❌ Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
