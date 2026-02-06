'use client';
import Contactanos from '@/components/Contactanos';

// TODO: obtener userType del auth/session de Supabase
export default function ContactanosPage() {
  return <Contactanos userType="mexico" />;
}
