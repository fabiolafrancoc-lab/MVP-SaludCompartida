import { NextResponse } from 'next/server';

// API temporal para verificar qué variables existen en Vercel
export async function GET() {
  return NextResponse.json({
    square_access_token_exists: !!process.env.SQUARE_ACCESS_TOKEN,
    square_location_id_exists: !!process.env.SQUARE_LOCATION_ID,
    square_access_token_length: process.env.SQUARE_ACCESS_TOKEN?.length || 0,
    square_access_token_preview: process.env.SQUARE_ACCESS_TOKEN?.substring(0, 10) || 'MISSING',
    next_public_square_app_id: process.env.NEXT_PUBLIC_SQUARE_APP_ID || 'MISSING',
    next_public_square_location_id: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || 'MISSING',
  });
}
