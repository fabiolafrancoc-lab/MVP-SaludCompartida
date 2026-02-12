import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    squareAppId: process.env.NEXT_PUBLIC_SQUARE_APP_ID ? '✅ Presente' : '❌ Faltante',
    squareLocationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID ? '✅ Presente' : '❌ Faltante',
    squareAccessToken: process.env.SQUARE_ACCESS_TOKEN ? '✅ Presente' : '❌ Faltante',
    // Mostrar primeros caracteres para verificar
    appIdPreview: process.env.NEXT_PUBLIC_SQUARE_APP_ID?.substring(0, 15) + '...',
    locationIdPreview: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
  });
}
