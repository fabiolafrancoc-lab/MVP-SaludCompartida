'use client';
import Terapia from '@/components/Terapia';

// TODO: obtener userType del auth/session de Supabase
export default function TerapiaPage() {
  return <Terapia userType="mexico" />;
}
