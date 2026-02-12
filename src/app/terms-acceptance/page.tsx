'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function TermsAcceptancePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [userType, setUserType] = useState<string>('');
  const [accepted, setAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem('userData');
    const type = sessionStorage.getItem('userType');
    
    if (!data || !type) {
      router.push('/login');
      return;
    }
    
    setUserData(JSON.parse(data));
    setUserType(type);
  }, [router]);

  const handleAccept = async () => {
    if (!accepted) {
      alert('Debes aceptar los términos para continuar');
      return;
    }

    setIsLoading(true);

    try {
      const { error: updateError } = await supabase
        .from('registrations')
        .update({
          terms_accepted: true,
          terms_accepted_at: new Date().toISOString(),
          last_login_at: new Date().toISOString(),
        })
        .eq('id', userData.id);

      if (updateError) {
        throw updateError;
      }

      const updatedData = { ...userData, terms_accepted: true };
      sessionStorage.setItem('userData', JSON.stringify(updatedData));

      router.push('/dashboard');

    } catch (err) {
      console.error('Error:', err);
      alert('Error al guardar. Intenta de nuevo.');
      setIsLoading(false);
    }
  };

  if (!userData) return null;

  const isMigrant = userType === 'migrant';
  const firstName = isMigrant ? userData.migrant_first_name : userData.family_first_name;
  const email = isMigrant ? userData.migrant_email : userData.family_email;
  const phone = isMigrant ? 
    `+1 ${userData.migrant_phone}` : 
    `+52 ${userData.family_phone}`;

  // ✅ Only show companion if user is from Mexico
  const companionName = !isMigrant && userData.family_companion_assigned
    ? (userData.family_companion_assigned === 'lupita' ? 'Lupita' : 'Fernanda')
    : null;

  return (
    <>
      <style jsx global>{`
        :root {
          --bg-dark: #0a0a0a;
          --bg-light: #1a1a2E;
          --cyan: #0EA5E9;
          --magenta: #EC4899;
          --green: #10B981;
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

        .terms-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .terms-card {
          background: var(--navy-card);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 40px;
          max-width: 600px;
          width: 100%;
        }

        .success-icon {
          width: 64px;
          height: 64px;
          background: var(--green);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }

        .success-icon svg {
          width: 32px;
          height: 32px;
          color: white;
        }

        .terms-title {
          font-size: 24px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 8px;
        }

        .terms-subtitle {
          font-size: 18px;
          text-align: center;
          color: var(--text-secondary);
          margin-bottom: 32px;
        }

        .user-info {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .user-info-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 14px;
        }

        .user-info-row:last-child {
          margin-bottom: 0;
        }

        .user-info-label {
          color: var(--text-secondary);
        }

        .user-info-value {
          color: var(--text-primary);
          font-weight: 600;
        }

        .terms-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 20px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .terms-checkbox input {
          width: 20px;
          height: 20px;
          margin-top: 2px;
          accent-color: var(--magenta);
          cursor: pointer;
        }

        .terms-label {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .terms-label a {
          color: var(--cyan);
          text-decoration: none;
        }

        .terms-label a:hover {
          text-decoration: underline;
        }

        .btn-accept {
          width: 100%;
          padding: 16px;
          background: var(--magenta);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-accept:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(236, 72, 153, 0.4);
        }

        .btn-accept:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      <div className="terms-container">
        <div className="terms-card">
          <div className="success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>

          <h1 className="terms-title">✅ Código válido</h1>
          <h2 className="terms-subtitle">Bienvenido, {firstName}</h2>

          <div className="user-info">
            <div className="user-info-row">
              <span className="user-info-label">Email:</span>
              <span className="user-info-value">{email}</span>
            </div>
            <div className="user-info-row">
              <span className="user-info-label">Teléfono:</span>
              <span className="user-info-value">{phone}</span>
            </div>
            {/* ✅ Only show companion for Mexico user */}
            {companionName && (
              <div className="user-info-row">
                <span className="user-info-label">Acompañante:</span>
                <span className="user-info-value">{companionName}</span>
              </div>
            )}
          </div>

          <div className="terms-checkbox">
            <input
              type="checkbox"
              id="terms"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            <label htmlFor="terms" className="terms-label">
              He leído y acepto los{' '}
              <a href="/terminos" target="_blank">Términos y Condiciones</a>
              {' '}y la{' '}
              <a href="/privacidad" target="_blank">Política de Privacidad</a>
            </label>
          </div>

          <button
            onClick={handleAccept}
            className="btn-accept"
            disabled={!accepted || isLoading}
          >
            {isLoading ? 'Guardando...' : 'Acepto y Continuar'}
          </button>
        </div>
      </div>
    </>
  );
}
