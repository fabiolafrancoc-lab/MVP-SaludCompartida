import { NextRequest, NextResponse } from 'next/server';

// ════════════════════════════════════════════════════════════════════════════
// ENDPOINT: /api/square-subscription-plans (GET)
// ════════════════════════════════════════════════════════════════════════════
// Lista todos los planes de suscripción disponibles en Square
// Para crear planes: https://squareup.com/dashboard/items/subscriptions
// ════════════════════════════════════════════════════════════════════════════

export async function GET(request: NextRequest) {
  console.log('📋 [SQUARE] Listando planes de suscripción...');
  
  try {
    const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;

    if (!SQUARE_ACCESS_TOKEN) {
      return NextResponse.json(
        { success: false, error: 'Square not configured' },
        { status: 500 }
      );
    }

    // Obtener el catálogo de items (incluye subscription plans)
    const response = await fetch(
      'https://connect.squareup.com/v2/catalog/list?types=SUBSCRIPTION_PLAN',
      {
        method: 'GET',
        headers: {
          'Square-Version': '2024-12-18',
          'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ [SQUARE] Error:', JSON.stringify(data, null, 2));
      return NextResponse.json(
        { 
          success: false, 
          error: data.errors?.[0]?.detail || 'Error fetching plans',
          details: data.errors 
        },
        { status: response.status }
      );
    }

    const plans = data.objects || [];
    
    console.log(`✅ [SQUARE] ${plans.length} planes encontrados`);

    // Formatear la respuesta para que sea más legible
    const formattedPlans = plans.map((plan: any) => {
      const planData = plan.subscription_plan_data;
      const phases = planData?.phases || [];
      const firstPhase = phases[0];
      const pricing = firstPhase?.recurring_price_money;

      return {
        id: plan.id,
        name: planData?.name || 'Sin nombre',
        version: plan.version,
        phases: phases.map((phase: any) => ({
          uid: phase.uid,
          cadence: phase.cadence, // DAILY, WEEKLY, MONTHLY, ANNUAL
          periods: phase.periods,
          recurring_price: phase.recurring_price_money,
          ordinal: phase.ordinal,
        })),
        // Info rápida del primer phase (el más común)
        quickInfo: {
          planVariationId: firstPhase?.uid, // ← ESTE es el que necesitas para crear subscription
          cadence: firstPhase?.cadence,
          price: pricing ? `${pricing.amount / 100} ${pricing.currency}` : 'N/A',
        },
      };
    });

    return NextResponse.json({
      success: true,
      totalPlans: plans.length,
      plans: formattedPlans,
      instructions: {
        message: 'Copia el "planVariationId" (uid) del phase que quieres usar',
        example: 'SQUARE_SUBSCRIPTION_PLAN_ID=ABC123XYZ',
        createPlanUrl: 'https://squareup.com/dashboard/items/subscriptions',
      },
    });

  } catch (error: any) {
    console.error('❌ [ERROR]:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
