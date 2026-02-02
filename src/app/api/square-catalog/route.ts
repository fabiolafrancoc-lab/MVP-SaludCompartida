import { NextRequest, NextResponse } from 'next/server';

// Endpoint para listar items del catálogo de Square
export async function GET(request: NextRequest) {
  try {
    const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
    
    if (!SQUARE_ACCESS_TOKEN) {
      return NextResponse.json(
        { success: false, error: 'Square not configured' },
        { status: 500 }
      );
    }

    console.log('📋 [SQUARE CATALOG] Buscando items en el catálogo...');

    // Buscar todos los items del tipo ITEM
    const response = await fetch('https://connect.squareup.com/v2/catalog/list?types=ITEM', {
      method: 'GET',
      headers: {
        'Square-Version': '2024-12-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ [SQUARE CATALOG] Error:', data);
      return NextResponse.json(
        { success: false, error: data.errors?.[0]?.detail || 'Error fetching catalog' },
        { status: response.status }
      );
    }

    console.log('✅ [SQUARE CATALOG] Items encontrados:', data.objects?.length || 0);

    // Buscar específicamente "SaludCompartida"
    const saludCompartidaItem = data.objects?.find((obj: any) => 
      obj.item_data?.name?.toLowerCase().includes('saludcompartida')
    );

    if (saludCompartidaItem) {
      console.log('🎯 [SQUARE CATALOG] Item "SaludCompartida" encontrado:');
      console.log('   ID:', saludCompartidaItem.id);
      console.log('   Name:', saludCompartidaItem.item_data?.name);
      console.log('   Variations:', saludCompartidaItem.item_data?.variations?.length || 0);
      
      // Obtener la primera variación (precio)
      const variation = saludCompartidaItem.item_data?.variations?.[0];
      if (variation) {
        console.log('   Variation ID:', variation.id);
        console.log('   Price:', variation.item_variation_data?.price_money?.amount / 100, variation.item_variation_data?.price_money?.currency);
      }
    }

    return NextResponse.json({
      success: true,
      items: data.objects || [],
      saludCompartidaItem: saludCompartidaItem || null,
      total: data.objects?.length || 0,
    });

  } catch (error: any) {
    console.error('❌ [SQUARE CATALOG] Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
