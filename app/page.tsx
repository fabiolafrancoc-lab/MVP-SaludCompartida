"use client";

import dynamic from 'next/dynamic';

const ClientRouter = dynamic(() => import('../src/ClientRouter'), {
  ssr: false,
  loading: () => <div style={{ opacity: 0 }}>Cargando...</div>
});

export default function Page() {
  return <ClientRouter />;
}
