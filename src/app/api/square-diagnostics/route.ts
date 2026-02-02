import { NextRequest, NextResponse } from 'next/server';

// ════════════════════════════════════════════════════════════
// ENDPOINT DE DIAGNÓSTICO: Verifica configuración de Square
// ════════════════════════════════════════════════════════════

export async function GET(request: NextRequest) {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    variables: {
      NEXT_PUBLIC_SQUARE_APP_ID: {
        exists: !!process.env.NEXT_PUBLIC_SQUARE_APP_ID,
        value: process.env.NEXT_PUBLIC_SQUARE_APP_ID?.substring(0, 15) + '...',
        length: process.env.NEXT_PUBLIC_SQUARE_APP_ID?.length || 0
      },
      NEXT_PUBLIC_SQUARE_LOCATION_ID: {
        exists: !!process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
        value: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
        length: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID?.length || 0
      },
      SQUARE_ACCESS_TOKEN: {
        exists: !!process.env.SQUARE_ACCESS_TOKEN,
        value: process.env.SQUARE_ACCESS_TOKEN?.substring(0, 10) + '...',
        length: process.env.SQUARE_ACCESS_TOKEN?.length || 0
      },
      SQUARE_LOCATION_ID: {
        exists: !!process.env.SQUARE_LOCATION_ID,
        value: process.env.SQUARE_LOCATION_ID,
        length: process.env.SQUARE_LOCATION_ID?.length || 0
      }
    },
    validation: {
      allVariablesPresent: !!(
        process.env.NEXT_PUBLIC_SQUARE_APP_ID &&
        process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID &&
        process.env.SQUARE_ACCESS_TOKEN &&
        process.env.SQUARE_LOCATION_ID
      ),
      locationIdsMatch: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID === process.env.SQUARE_LOCATION_ID
    }
  };

  // Test de conectividad con Square API
  let apiTest = null;
  if (process.env.SQUARE_ACCESS_TOKEN) {
    try {
      const response = await fetch('https://connect.squareup.com/v2/locations', {
        method: 'GET',
        headers: {
          'Square-Version': '2024-12-18',
          'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      
      apiTest = {
        status: response.status,
        success: response.ok,
        locations: data.locations?.map((loc: any) => ({
          id: loc.id,
          name: loc.name,
          status: loc.status
        })) || [],
        error: data.errors?.[0] || null
      };
    } catch (error: any) {
      apiTest = {
        success: false,
        error: error.message
      };
    }
  }

  return NextResponse.json({
    ...diagnostics,
    apiTest,
    recommendations: getRecommendations(diagnostics, apiTest)
  });
}

function getRecommendations(diagnostics: any, apiTest: any) {
  const recommendations = [];

  if (!diagnostics.validation.allVariablesPresent) {
    recommendations.push('⚠️ Faltan variables de entorno de Square');
  }

  if (!diagnostics.validation.locationIdsMatch) {
    recommendations.push('⚠️ Los Location IDs no coinciden entre variables públicas y privadas');
  }

  if (apiTest && !apiTest.success) {
    recommendations.push('❌ No se pudo conectar con Square API - Verifica el Access Token');
  }

  if (apiTest && apiTest.success && apiTest.locations.length === 0) {
    recommendations.push('⚠️ No se encontraron locations en Square - Verifica el Access Token');
  }

  if (recommendations.length === 0) {
    recommendations.push('✅ Configuración de Square parece correcta');
  }

  return recommendations;
}
