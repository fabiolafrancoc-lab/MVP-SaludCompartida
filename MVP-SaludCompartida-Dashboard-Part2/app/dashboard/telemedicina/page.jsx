'use client';
import Telemedicina from '../../../components/Telemedicina';
export default function TelemedicinPage() {
  // TODO: get userType from Supabase auth/session
  return <Telemedicina userType="mexico" onBack={() => window.history.back()} />;
}
