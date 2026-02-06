import { NextResponse, NextRequest } from 'next/server';

// API temporal para verificar qué variables existen en Vercel
export async function GET(request: NextRequest) {
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'unknown',
    square_variables: {
      SQUARE_ACCESS_TOKEN: process.env.SQUARE_ACCESS_TOKEN ? `✅ Definida (${process.env.SQUARE_ACCESS_TOKEN.substring(0, 10)}...)` : '❌ NO DEFINIDA',
      SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID || '❌ NO DEFINIDA',
      NEXT_PUBLIC_SQUARE_APP_ID: process.env.NEXT_PUBLIC_SQUARE_APP_ID || '❌ NO DEFINIDA',
      NEXT_PUBLIC_SQUARE_LOCATION_ID: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || '❌ NO DEFINIDA',
    },
    diagnosis: [
      process.env.SQUARE_ACCESS_TOKEN ? '✅ Backend tiene token de Square' : '🚨 CRÍTICO: SQUARE_ACCESS_TOKEN faltante en Vercel',
      process.env.SQUARE_LOCATION_ID ? '✅ Backend tiene Location ID' : '🚨 CRÍTICO: SQUARE_LOCATION_ID faltante en Vercel',
      process.env.NEXT_PUBLIC_SQUARE_APP_ID ? '✅ Frontend tiene App ID' : '🚨 CRÍTICO: NEXT_PUBLIC_SQUARE_APP_ID faltante en Vercel',
      process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID ? '✅ Frontend tiene Location ID' : '🚨 CRÍTICO: NEXT_PUBLIC_SQUARE_LOCATION_ID faltante en Vercel',
    ]
  });
}

export const dynamic = 'force-dynamic';
