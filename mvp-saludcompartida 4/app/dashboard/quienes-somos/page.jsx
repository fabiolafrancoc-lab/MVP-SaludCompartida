'use client';
import QuienesSomos from '@/components/QuienesSomos';

// TODO: obtener userType del auth/session de Supabase
// 'migrant' = dashboard migrante | 'mexico' = dashboard México
export default function QuienesSomosPage() {
  return <QuienesSomos userType="mexico" />;
}
