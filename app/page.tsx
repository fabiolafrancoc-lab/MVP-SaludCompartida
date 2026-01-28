"use client";

import dynamic from 'next/dynamic';

// NUEVO: Cargar directamente el MobileLandingPage desde src/app/page.jsx
const MobileLandingPage = dynamic(() => import('../src/app/page'), {
  ssr: false,
  loading: () => <div style={{ opacity: 0 }}>Cargando...</div>
});

export default function Page() {
  return <MobileLandingPage />;
}
