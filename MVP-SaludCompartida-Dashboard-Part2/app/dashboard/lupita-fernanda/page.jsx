'use client';
import LupitaFernanda from '../../../components/LupitaFernanda';
export default function LupitaFernandaPage() {
  return <LupitaFernanda userType="mexico" onBack={() => window.history.back()} />;
}
