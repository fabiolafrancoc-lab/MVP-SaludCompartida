'use client';
import Farmacia from '../../../components/Farmacia';
export default function FarmaciaPage() {
  return <Farmacia userType="mexico" onBack={() => window.history.back()} />;
}
