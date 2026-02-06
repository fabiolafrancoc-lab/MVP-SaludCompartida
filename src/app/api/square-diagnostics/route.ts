import { NextResponse } from 'next/server';

// Endpoint de diagnóstico para verificar configuración de Square
export async function GET() {
  const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
  const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;
  const NEXT_PUBLIC_SQUARE_APP_ID = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
  const NEXT_PUBLIC_SQUARE_LOCATION_ID = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    variables: {
      SQUARE_ACCESS_TOKEN: SQUARE_ACCESS_TOKEN ? `${SQUARE_ACCESS_TOKEN.substring(0, 10)}...` : '❌ NO CONFIGURADO',
      SQUARE_LOCATION_ID: SQUARE_LOCATION_ID || '❌ NO CONFIGURADO',
      NEXT_PUBLIC_SQUARE_APP_ID: NEXT_PUBLIC_SQUARE_APP_ID || '❌ NO CONFIGURADO',
      NEXT_PUBLIC_SQUARE_LOCATION_ID: NEXT_PUBLIC_SQUARE_LOCATION_ID || '❌ NO CONFIGURADO',
    },
    validation: {
      allVariablesPresent: !!(SQUARE_ACCESS_TOKEN && SQUARE_LOCATION_ID && NEXT_PUBLIC_SQUARE_APP_ID && NEXT_PUBLIC_SQUARE_LOCATION_ID),
      locationIdsMatch: SQUARE_LOCATION_ID === NEXT_PUBLIC_SQUARE_LOCATION_ID,
    },
    mode: SQUARE_ACCESS_TOKEN?.startsWith('EAAAE') ? 'SANDBOX' : 'PRODUCTION',
  };

  // Intentar llamar a Square API para verificar conectividad
  if (SQUARE_ACCESS_TOKEN) {
    try {
      const response = await fetch('https://connect.squareup.com/v2/locations', {
        headers: {
          'Square-Version': '2024-12-18',
          Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        return NextResponse.json({
          ...diagnostics,
          apiTest: {
            success: true,
            message: '✅ Conectado exitosamente a Square API',
            locations: data.locations?.map((loc: any) => ({
              id: loc.id,
              name: loc.name,
              status: loc.status,
            })),
          },
        });
      } else {
        return NextResponse.json({
          ...diagnostics,
          apiTest: {
            success: false,
            message: '❌ Error al conectar con Square API',
            error: data.errors?.[0] || data,
          },
        }, { status: 500 });
      }
    } catch (error: any) {
      return NextResponse.json({
        ...diagnostics,
        apiTest: {
          success: false,
          message: '❌ Error de red al conectar con Square API',
          error: error.message,
        },
      }, { status: 500 });
    }
  }

  return NextResponse.json(diagnostics);
}
