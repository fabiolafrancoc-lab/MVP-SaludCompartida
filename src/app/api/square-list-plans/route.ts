import { NextRequest, NextResponse } from 'next/server';

// Endpoint para listar planes de suscripción disponibles en Square
export async function GET(request: NextRequest) {
  console.log('📋 Listando planes de suscripción de Square...');
  
  try {
    const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;

    if (!SQUARE_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'Square credentials not configured' },
        { status: 500 }
      );
    }

    // Llamar a Catalog API para obtener planes de suscripción
    const response = await fetch(
      'https://connect.squareup.com/v2/catalog/list?types=SUBSCRIPTION_PLAN',
      {
        method: 'GET',
        headers: {
          'Square-Version': '2024-12-18',
          Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Square API error:', JSON.stringify(data, null, 2));
      return NextResponse.json(
        { error: 'Error fetching subscription plans', details: data.errors },
        { status: response.status }
      );
    }

    console.log('✅ Planes encontrados:', data.objects?.length || 0);
    
    // Formatear la respuesta para que sea más legible
    const plans = data.objects?.map((obj: any) => ({
      id: obj.id,
      name: obj.subscription_plan_data?.name,
      phases: obj.subscription_plan_data?.phases?.map((phase: any) => ({
        cadence: phase.cadence,
        periods: phase.periods,
        ordinal: phase.ordinal,
      })),
    }));

    return NextResponse.json({
      success: true,
      plans: plans || [],
      raw: data.objects || [],
    });

  } catch (error: any) {
    console.error('❌ Error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
