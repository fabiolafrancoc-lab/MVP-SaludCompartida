'use client';
import MiCuenta from '@/components/MiCuenta';

// TODO: obtener userType del auth/session de Supabase
export default function MiCuentaPage() {
  return <MiCuenta userType="mexico" />;
}
