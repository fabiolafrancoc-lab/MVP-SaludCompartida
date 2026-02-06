'use client';
import Evaluacion from '../../../components/Evaluacion';
export default function EvaluacionPage() {
  return <Evaluacion userType="mexico" onBack={() => window.history.back()} />;
}
