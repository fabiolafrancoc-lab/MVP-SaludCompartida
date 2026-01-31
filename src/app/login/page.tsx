'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function LoginPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const cleanCode = code.trim().toUpperCase();

      if (cleanCode.length !== 6) {
        setError('El código debe tener 6 caracteres');
        setIsLoading(false);
        return;
      }

      // Search by migrant_code OR family_code
      const { data, error: dbError } = await supabase
        .from('registrations')
        .select('*')
        .or(`migrant_code.eq.${cleanCode},family_code.eq.${cleanCode}`)
        .single();

      if (dbError || !data) {
        setError('Código no válido. Verifica e intenta de nuevo.');
        setIsLoading(false);
        return;
      }

      // Verify payment is completed
      if (data.status !== 'active') {
        setError('Este código está pendiente de pago. Completa el pago primero.');
        setIsLoading(false);
        return;
      }

      // Save to sessionStorage
      sessionStorage.setItem('userCode', cleanCode);
      sessionStorage.setItem('userData', JSON.stringify(data));

      // Determine if migrant or family
      const isMigrant = data.migrant_code === cleanCode;
      sessionStorage.setItem('userType', isMigrant ? 'migrant' : 'family');

      // Check if terms already accepted
      if (data.terms_accepted) {
        // Update last_login_at
        const { error: updateError } = await supabase
          .from('registrations')
          .update({ last_login_at: new Date().toISOString() })
          .eq('id', data.id);
          
        if (updateError) {
          console.error('Failed to update last_login_at:', updateError);
        }

        router.push('/dashboard');
      } else {
        router.push('/terms-acceptance');
      }

    } catch (err: any) {
      console.error('Login error:', err);
      setError('Error al verificar código');
      setIsLoading(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        :root {
          --bg-dark: #0a0a0a;
          --bg-light: #1a1a2E;
          --cyan: #0EA5E9;
          --magenta: #EC4899;
          --navy-card: #16162a;
          --text-primary: #FFFFFF;
          --text-secondary: rgba(255, 255, 255, 0.75);
        }

        body {
          font-family: 'DM Sans', -apple-system, sans-serif;
          background: linear-gradient(180deg, #0a0a0a 0%, #1a1a2E 100%);
          background-attachment: fixed;
          color: var(--text-primary);
          min-height: 100vh;
        }

        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .login-card {
          background: var(--navy-card);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 40px;
          max-width: 450px;
          width: 100%;
        }

        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .login-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .login-subtitle {
          font-size: 16px;
          color: var(--text-secondary);
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .form-input {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 18px;
          font-family: monospace;
          letter-spacing: 4px;
          text-align: center;
          text-transform: uppercase;
          transition: all 0.2s;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--cyan);
          background: rgba(255,255,255,0.06);
        }

        .btn-primary {
          width: 100%;
          padding: 16px;
          background: var(--cyan);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(14, 165, 233, 0.4);
        }

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 18px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 12px;
          margin-top: 16px;
          font-size: 14px;
          color: #FCA5A5;
        }
      `}</style>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Ingresa tu código</h1>
            <p className="login-subtitle">
              Usa el código de 6 dígitos que recibiste
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Código de acceso</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="form-input"
                placeholder="A3X9K2"
                maxLength={6}
                autoFocus
                disabled={isLoading}
              />
            </div>

            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Verificando...' : 'Ingresar'}
            </button>

            {error && (
              <div className="error-message">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
