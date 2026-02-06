'use client';
import Ahorros from '../../../components/Ahorros';
export default function AhorrosPage() {
  return <Ahorros userType="mexico" onBack={() => window.history.back()} />;
}
