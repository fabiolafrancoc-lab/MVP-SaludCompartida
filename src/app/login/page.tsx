'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseClientBrowser } from '@/lib/supabase-client';

export default function LoginPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);

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

      // Get supabase client
      const supabase = getSupabaseClientBrowser();

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

      // Determine if migrant or family
      const isMigrant = data.migrant_code === cleanCode;

      // Show preview data for user verification
      setPreviewData({ ...data, userType: isMigrant ? 'migrant' : 'family' });
      setIsLoading(false);

    } catch (err: any) {
      console.error('Login error:', err);
      setError('Error al verificar código');
      setIsLoading(false);
    }
  };

  const handleConfirmAccess = async () => {
    if (!previewData) return;
    setIsLoading(true);

    try {
      const cleanCode = code.trim().toUpperCase();
      const isMigrant = previewData.userType === 'migrant';

      // Save to sessionStorage
      sessionStorage.setItem('userCode', cleanCode);
      sessionStorage.setItem('userData', JSON.stringify(previewData));
      sessionStorage.setItem('userType', isMigrant ? 'migrant' : 'family');

      const supabase = getSupabaseClientBrowser();

      // Check if terms already accepted
      if (previewData.terms_accepted) {
        // Update last_login_at
        const { error: updateError } = await supabase
          .from('registrations')
          .update({ last_login_at: new Date().toISOString() })
          .eq('id', previewData.id);

        if (updateError) {
          console.error('Failed to update last_login_at:', updateError);
        }

        router.push('/dashboard');
      } else {
        router.push('/terms-acceptance');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Error al continuar');
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
            <h1 className="login-title">
              {previewData ? 'Verifica tus datos' : 'Ingresa tu código'}
            </h1>
            <p className="login-subtitle">
              {previewData
                ? 'Confirma que esta información es correcta antes de continuar'
                : 'Usa el código de 6 dígitos que recibiste'}
            </p>
          </div>

          {!previewData ? (
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
          ) : (
            <div>
              {/* Preview de datos del usuario */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(14,165,233,0.1), rgba(236,72,153,0.08))',
                border: '1px solid rgba(14,165,233,0.2)',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '20px',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0EA5E9, #0284C7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: '800',
                    color: '#fff'
                  }}>
                    {(previewData.userType === 'migrant' ? previewData.migrant_first_name : previewData.family_first_name)?.charAt(0)}
                  </div>
                  <div>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>
                      {previewData.userType === 'migrant' ? '🇺🇸 Usuario Migrante' : '🇲🇽 Usuario Familia en México'}
                    </p>
                    <p style={{ color: '#0EA5E9', fontSize: '13px', fontWeight: '700' }}>
                      Código: {previewData.userType === 'migrant' ? previewData.migrant_code : previewData.family_code}
                    </p>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                  {/* Nombre Completo */}
                  <div style={{ marginBottom: '14px' }}>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Nombre Completo
                    </p>
                    <p style={{ color: '#fff', fontSize: '16px', fontWeight: '700' }}>
                      {previewData.userType === 'migrant'
                        ? `${previewData.migrant_first_name} ${previewData.migrant_last_name}`
                        : `${previewData.family_first_name} ${previewData.family_last_name}`
                      }
                    </p>
                  </div>

                  {/* Fecha de Nacimiento */}
                  <div style={{ marginBottom: '14px' }}>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      🎂 Fecha de Nacimiento
                    </p>
                    <p style={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}>
                      {(() => {
                        const bd = previewData.userType === 'migrant' ? previewData.migrant_birthdate : previewData.family_birthdate;
                        if (!bd) return 'No registrada';
                        const d = new Date(bd + 'T00:00:00');
                        return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
                      })()}
                    </p>
                  </div>

                  {/* Email */}
                  <div style={{ marginBottom: '14px' }}>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      📧 Email
                    </p>
                    <p style={{ color: '#0EA5E9', fontSize: '14px', fontWeight: '600' }}>
                      {previewData.userType === 'migrant' ? previewData.migrant_email : previewData.family_email}
                    </p>
                  </div>

                  {/* WhatsApp */}
                  <div style={{ marginBottom: '14px' }}>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      📱 WhatsApp
                    </p>
                    <p style={{ color: '#25D366', fontSize: '15px', fontWeight: '700' }}>
                      {previewData.userType === 'migrant' ? previewData.migrant_phone : previewData.family_phone}
                    </p>
                  </div>

                  {/* Status */}
                  <div style={{
                    marginTop: '16px',
                    padding: '12px',
                    background: 'rgba(16,185,129,0.1)',
                    border: '1px solid rgba(16,185,129,0.2)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#10B981',
                      boxShadow: '0 0 8px #10B981'
                    }} />
                    <p style={{ color: '#10B981', fontSize: '13px', fontWeight: '700', margin: 0 }}>
                      Suscripción Activa
                    </p>
                  </div>
                </div>
              </div>

              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '20px', textAlign: 'center', lineHeight: '1.6' }}>
                ¿Esta información es correcta? Verifica que coincida con tus datos antes de continuar.
              </p>

              {error && (
                <div className="error-message" style={{ marginBottom: '16px' }}>
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => { setPreviewData(null); setError(''); }}
                  style={{
                    flex: 1,
                    padding: '14px',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: 'rgba(255,255,255,0.7)',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmAccess}
                  disabled={isLoading}
                  className="btn-primary"
                  style={{
                    flex: 2,
                    opacity: isLoading ? 0.5 : 1,
                    cursor: isLoading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isLoading ? 'Ingresando...' : 'Confirmar y Acceder'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
