'use client';
import { useSearchParams } from 'next/navigation';
import TerminosPrivacidad from '@/components/TerminosPrivacidad';

// Rutas:
//   /dashboard/terminos-privacidad          → Tab 0 = Términos
//   /dashboard/terminos-privacidad?tab=1    → Tab 1 = Privacidad
export default function TerminosPrivacidadPage() {
  const searchParams = useSearchParams();
  const tab = parseInt(searchParams.get('tab') || '0', 10);
  return <TerminosPrivacidad initialTab={tab} />;
}
