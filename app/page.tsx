"use client";

import dynamic from 'next/dynamic';

const ClientRouter = dynamic(() => import('../src/ClientRouter'), {
  ssr: false,
  loading: () => <div>Cargando...</div>
});

export default function Page() {
  return <ClientRouter />;
}
