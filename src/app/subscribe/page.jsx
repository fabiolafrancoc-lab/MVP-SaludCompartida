'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SubscribePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get query parameters if any (name, email, phone)
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');

    // Build query string to pass to registro-nuevo
    const params = new URLSearchParams();
    if (name) params.set('name', name);
    if (email) params.set('email', email);
    if (phone) params.set('phone', phone);

    const queryString = params.toString();
    const targetUrl = queryString ? `/registro-nuevo?${queryString}` : '/registro-nuevo';

    // Redirect to the registration page
    router.push(targetUrl);
  }, [router, searchParams]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#111827'
    }}>
      <div style={{ textAlign: 'center', color: '#FFFFFF' }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #06B6D4',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          margin: '0 auto 16px',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ fontSize: '18px', marginBottom: '8px' }}>Redirigiendo...</p>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
          Te llevaremos al formulario de suscripción
        </p>
      </div>
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
