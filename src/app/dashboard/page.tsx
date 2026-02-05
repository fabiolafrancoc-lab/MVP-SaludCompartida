'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import QuienesSomos from '@/components/QuienesSomos';
import Telemedicina from '@/components/Telemedicina';
import Farmacia from '@/components/Farmacia';
import Terapia from '@/components/Terapia';
import Ahorros from '@/components/Ahorros';
import LupitaFernanda from '@/components/LupitaFernanda';
import MiCuenta from '@/components/MiCuenta';
import Evaluacion from '@/components/Evaluacion';
import Blog from '@/components/Blog';
import Contactanos from '@/components/Contactanos';
import TerminosPrivacidad from '@/components/TerminosPrivacidad';

// Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rzmdekjegbdgitqekjee.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6bWRla2plZ2JkZ2l0cWVramVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2ODY4NTgsImV4cCI6MjA1MjI2Mjg1OH0.wUMLWc97WMJW0Q6KgDO-x10Klu8FrXKk_M0bUmX1QTg';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface RegistrationData {
  id: number;
  migrant_code: string;
  family_code: string;
  migrant_first_name: string;
  family_first_name: string;
  migrant_email: string;
  family_primary_email: string;
  status: string;
}

type UserType = 'migrant' | 'mexico';
type Page = 'home' | 'quienes-somos' | 'telemedicina' | 'farmacia' | 'terapia' | 'ahorros' | 'lupita-fernanda' | 'mi-cuenta' | 'evaluacion' | 'blog' | 'contactanos' | 'terminos';

// Iconos SVG (no emojis)
const Icons = {
  Doctor: ({ s = 28 }: { s?: number }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4" /><path d="M16 2v4" /><rect width="8" height="14" x="8" y="6" rx="1" /><rect width="20" height="8" x="2" y="10" rx="1" />
    </svg>
  ),
  Pill: ({ s = 28 }: { s?: number }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" /><path d="m8.5 8.5 7 7" />
    </svg>
  ),
  Brain: ({ s = 28 }: { s?: number }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 1 4 4 7 7 0 0 1 3 6c0 4-3 7-7 7s-7-3-7-7a7 7 0 0 1 3-6 4 4 0 0 1 4-4z" /><path d="M12 2v20" />
    </svg>
  ),
  Heart: ({ s = 28 }: { s?: number }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="#EC4899" stroke="#EC4899" strokeWidth="1.8">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Savings: ({ s = 24 }: { s?: number }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.4-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2" />
      <circle cx="12.5" cy="11.5" r="1" fill="#10B981" />
    </svg>
  ),
  Companion: ({ s = 24 }: { s?: number }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Arrow: ({ s = 16 }: { s?: number }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  MedicalCross: ({ s = 26 }: { s?: number }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 2h2v9h9v2h-9v9h-2v-9H2v-2h9V2z" fill="#FFFFFF" />
    </svg>
  ),
  Logout: ({ s = 20 }: { s?: number }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Gift: ({ s = 80 }: { s?: number }) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
      {/* Moño superior */}
      <path d="M35 25 Q30 15, 25 20 Q20 25, 25 30 L35 35" fill="#EC4899" stroke="#EC4899" strokeWidth="2"/>
      <path d="M65 25 Q70 15, 75 20 Q80 25, 75 30 L65 35" fill="#EC4899" stroke="#EC4899" strokeWidth="2"/>
      
      {/* Lazo central */}
      <ellipse cx="50" cy="30" rx="8" ry="6" fill="#F472B6"/>
      
      {/* Caja principal */}
      <rect x="25" y="35" width="50" height="45" rx="4" fill="url(#giftGradient)" stroke="#8B5CF6" strokeWidth="2.5"/>
      
      {/* Listón vertical */}
      <rect x="47" y="35" width="6" height="45" fill="#F59E0B" opacity="0.9"/>
      
      {/* Listón horizontal */}
      <rect x="25" y="55" width="50" height="6" fill="#10B981" opacity="0.9"/>
      
      {/* Brillos */}
      <circle cx="40" cy="50" r="3" fill="rgba(255,255,255,0.4)"/>
      <circle cx="65" cy="65" r="2" fill="rgba(255,255,255,0.3)"/>
      
      <defs>
        <linearGradient id="giftGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0.9"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  Sparkles: ({ s = 20 }: { s?: number }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z" fill="#FCD34D"/>
      <path d="M19 3L19.5 5L21.5 5.5L19.5 6L19 8L18.5 6L16.5 5.5L18.5 5L19 3Z" fill="#FCD34D"/>
      <path d="M5 14L5.5 16L7.5 16.5L5.5 17L5 19L4.5 17L2.5 16.5L4.5 16L5 14Z" fill="#FCD34D"/>
    </svg>
  ),
};

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [codeError, setCodeError] = useState('');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [registration, setRegistration] = useState<RegistrationData | null>(null);
  const [previewData, setPreviewData] = useState<any>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [animateIn, setAnimateIn] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => setAnimateIn(true), 50);
    }
  }, [isAuthenticated]);

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setCodeError('');
    setPreviewData(null);

    const code = codeInput.trim().toUpperCase();

    if (code.length < 4) {
      setCodeError('Código debe tener al menos 4 caracteres');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .or(`migrant_code.eq.${code},family_code.eq.${code}`)
        .maybeSingle();

      if (error || !data) {
        setCodeError('Código no válido.');
        setIsLoading(false);
        return;
      }

      if (data.status !== 'active') {
        setCodeError('Este código no está activo. Completa el pago primero.');
        setIsLoading(false);
        return;
      }

      // Mostrar preview de datos ANTES de autenticar
      const type: UserType = (data.migrant_code === code) ? 'migrant' : 'mexico';
      setPreviewData({ ...data, userType: type });
      setIsLoading(false);
    } catch (error) {
      setCodeError('Error al validar código.');
      setIsLoading(false);
    }
  };

  const handleConfirmAccess = () => {
    if (!acceptTerms) {
      setCodeError('Debes aceptar los Términos y Condiciones.');
      return;
    }
    
    setUserType(previewData.userType);
    setRegistration(previewData);
    setIsAuthenticated(true);
    localStorage.setItem('dashboardCode', codeInput.trim().toUpperCase());
    localStorage.setItem('dashboardUserType', previewData.userType);
  };

  useEffect(() => {
    const savedCode = localStorage.getItem('dashboardCode');
    if (savedCode) {
      setCodeInput(savedCode);
      setTimeout(() => document.querySelector('form')?.requestSubmit(), 100);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserType(null);
    setRegistration(null);
    setCodeInput('');
    setCurrentPage('home');
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
        <div style={{ width: '100%', maxWidth: '450px', background: 'rgba(255,255,255,0.04)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)', padding: '40px 30px' }}>
          <img src="/saludcompartida-dark-no-tagline.png" alt="Logo" style={{ height: '50px', margin: '0 auto 30px', display: 'block' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', marginBottom: '10px', textAlign: 'center' }}>Dashboard</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', marginBottom: '30px', textAlign: 'center' }}>Ingresa tu código de acceso</p>
          
          {!previewData ? (
            <form onSubmit={handleCodeSubmit}>
              <input 
                type="text" 
                value={codeInput} 
                onChange={(e) => { setCodeInput(e.target.value.toUpperCase()); setCodeError(''); }} 
                placeholder="Código" 
                disabled={isLoading} 
                style={{ 
                  width: '100%', 
                  padding: '16px', 
                  fontSize: '16px', 
                  color: '#fff', 
                  background: 'rgba(255,255,255,0.08)', 
                  border: '2px solid rgba(255,255,255,0.12)', 
                  borderRadius: '12px', 
                  textAlign: 'center', 
                  textTransform: 'uppercase' 
                }} 
              />
              {codeError && <p style={{ color: '#EF4444', fontSize: '14px', marginTop: '12px', textAlign: 'center' }}>{codeError}</p>}
              <button 
                type="submit" 
                disabled={isLoading || codeInput.length < 4} 
                style={{ 
                  width: '100%', 
                  marginTop: '20px', 
                  padding: '16px', 
                  fontSize: '16px', 
                  fontWeight: '700', 
                  color: '#fff', 
                  background: 'linear-gradient(135deg, #06B6D4, #0891B2)', 
                  border: 'none', 
                  borderRadius: '12px', 
                  cursor: 'pointer', 
                  opacity: (isLoading || codeInput.length < 4) ? 0.6 : 1 
                }}
              >
                {isLoading ? 'Validando...' : 'Validar Código'}
              </button>
            </form>
          ) : (
            <div>
              {/* Preview de datos autocompletados */}
              <div style={{ marginBottom: '24px', textAlign: 'left' }}>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Datos de tu cuenta:
                </p>
                
                <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginBottom: '4px' }}>Nombre</p>
                  <p style={{ color: '#fff', fontSize: '15px', fontWeight: '600' }}>
                    {previewData.userType === 'migrant' ? previewData.migrant_first_name : previewData.family_first_name}
                  </p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginBottom: '4px' }}>Apellido</p>
                  <p style={{ color: '#fff', fontSize: '15px', fontWeight: '600' }}>
                    {previewData.userType === 'migrant' ? previewData.migrant_last_name : previewData.family_last_name}
                  </p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginBottom: '4px' }}>Email</p>
                  <p style={{ color: '#fff', fontSize: '14px', fontWeight: '600' }}>
                    {previewData.userType === 'migrant' ? previewData.migrant_email : previewData.family_email}
                  </p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginBottom: '4px' }}>Teléfono</p>
                  <p style={{ color: '#fff', fontSize: '15px', fontWeight: '600' }}>
                    {previewData.userType === 'migrant' ? previewData.migrant_phone : previewData.family_phone}
                  </p>
                </div>
              </div>

              {/* Checkbox de Términos y Condiciones */}
              <label style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '12px', 
                marginBottom: '20px', 
                cursor: 'pointer',
                textAlign: 'left'
              }}>
                <input 
                  type="checkbox" 
                  checked={acceptTerms} 
                  onChange={(e) => { setAcceptTerms(e.target.checked); setCodeError(''); }}
                  style={{ 
                    marginTop: '3px',
                    width: '18px', 
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: '#06B6D4'
                  }} 
                />
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: '1.6' }}>
                  Acepto los <a href="/terminos" target="_blank" style={{ color: '#06B6D4', textDecoration: 'underline' }}>Términos y Condiciones</a> y la <a href="/privacidad" target="_blank" style={{ color: '#06B6D4', textDecoration: 'underline' }}>Política de Privacidad</a> de SaludCompartida.
                </span>
              </label>

              {codeError && <p style={{ color: '#EF4444', fontSize: '14px', marginBottom: '16px', textAlign: 'center' }}>{codeError}</p>}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => { setPreviewData(null); setAcceptTerms(false); setCodeError(''); }}
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
                  disabled={!acceptTerms}
                  style={{ 
                    flex: 2,
                    padding: '14px', 
                    fontSize: '15px', 
                    fontWeight: '700', 
                    color: '#fff', 
                    background: acceptTerms ? 'linear-gradient(135deg, #06B6D4, #0891B2)' : 'rgba(255,255,255,0.1)', 
                    border: 'none', 
                    borderRadius: '12px', 
                    cursor: acceptTerms ? 'pointer' : 'not-allowed',
                    opacity: acceptTerms ? 1 : 0.5
                  }}
                >
                  Acceder al Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const userName = userType === 'migrant' ? registration?.migrant_first_name : registration?.family_first_name;
  const migrantName = registration?.migrant_first_name || 'Fabiola';
  const companionName = userType === 'migrant' ? 'Fernanda' : 'Lupita';
  const isMigrant = userType === 'migrant';

  const greeting = (() => {
    const h = new Date().getHours();
    return h < 12 ? 'Buenos días' : h < 18 ? 'Buenas tardes' : 'Buenas noches';
  })();

  const SERVICES = [
    {
      id: 'telemedicina' as Page,
      icon: Icons.Doctor,
      title: 'Videollamada con un Doctor',
      subtitle: 'Consulta médica inmediata. Sin filas, sin esperas.',
      badges: [
        { text: 'ILIMITADO', bg: 'rgba(6,182,212,0.65)', color: '#06B6D4' },
        { text: '24/7 · Todo el año', bg: 'rgba(251,191,36,0.65)', color: '#FBB020' },
      ],
      detail: 'CONSULTAS ILIMITADAS · Para ti y 3 familiares',
      detailColor: '#10B981',
      gradient: 'linear-gradient(135deg, rgba(6,182,212,0.35), rgba(6,182,212,0.18))',
      border: 'rgba(6,182,212,0.75)',
      iconBg: 'linear-gradient(135deg, rgba(6,182,212,0.55), rgba(6,182,212,0.4))',
    },
    {
      id: 'farmacia' as Page,
      icon: Icons.Pill,
      title: 'Descuento en Farmacias',
      subtitle: 'Ahorra hasta 75% en medicinas. En cualquier farmacia.',
      badges: [
        { text: '1,700+ FARMACIAS', bg: 'rgba(251,146,60,0.65)', color: '#FB923C' },
        { text: 'Hasta 75% OFF', bg: 'rgba(34,197,94,0.65)', color: '#22C55E' },
      ],
      detail: 'SIN LÍMITE DE USO · Toda tu familia',
      detailColor: '#EC4899',
      gradient: 'linear-gradient(135deg, rgba(236,72,153,0.35), rgba(236,72,153,0.18))',
      border: 'rgba(236,72,153,0.75)',
      iconBg: 'linear-gradient(135deg, rgba(236,72,153,0.55), rgba(236,72,153,0.4))',
    },
    {
      id: 'terapia' as Page,
      icon: Icons.Brain,
      title: 'Tu Sesión de Terapia',
      subtitle: 'Hablar no es de débiles, es de valientes. Para ti o quien más lo necesite.',
      badges: [
        { text: 'Semanal · 50 min', bg: 'rgba(251,146,60,0.65)', color: '#FB923C' },
        { text: 'Cambio de terapeuta', bg: 'rgba(139,92,246,0.65)', color: '#8B5CF6' },
        { text: '100% Confidencial', bg: 'rgba(236,72,153,0.65)', color: '#EC4899' },
      ],
      detail: '4 SESIONES MENSUALES · 1 por miembro',
      detailColor: '#10B981',
      gradient: 'linear-gradient(135deg, rgba(139,92,246,0.35), rgba(139,92,246,0.18))',
      border: 'rgba(139,92,246,0.75)',
      iconBg: 'linear-gradient(135deg, rgba(139,92,246,0.55), rgba(139,92,246,0.4))',
    },
  ];

  // Renderizar HOME
  const renderHome = () => (
    <div style={{ padding: '0 20px 100px', opacity: animateIn ? 1 : 0, transition: 'opacity 0.4s ease' }}>
      {/* Greeting */}
      <div style={{ paddingTop: 24, marginBottom: 28 }}>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', fontWeight: 600, marginBottom: 6 }}>{greeting}</p>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 34,
          lineHeight: 1.25,
          margin: 0,
          color: '#fff',
        }}>
          {isMigrant
            ? <>Hola, <span style={{ color: '#06B6D4' }}>{userName}</span></>
            : <>{userName}, <span style={{ color: '#06B6D4' }}>{migrantName}</span> te cuida</>
          }
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginTop: 10, fontWeight: 500 }}>
          {isMigrant
            ? 'Tu familia tiene acceso a doctor, medicinas y compañía.'
            : 'Tienes acceso a médico, medicinas, terapia y compañía para ti y tu familia.'
          }
        </p>
      </div>

      {/* Emotional banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(6,182,212,0.08))',
        border: '1px solid rgba(236,72,153,0.15)',
        borderRadius: 18,
        padding: '20px 20px',
        marginBottom: 28,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 14,
      }}>
        <div style={{ flexShrink: 0, marginTop: 3 }}>
          <Icons.Heart s={26} />
        </div>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.75, margin: 0, fontWeight: 500 }}>
          {isMigrant
            ? <><b style={{ color: '#EC4899', fontSize: 16 }}>{userName}</b>, tu familia ya tiene acceso a todos los servicios. Cada vez que los usan, tú cuidas aunque estés lejos.</>
            : <><b style={{ color: '#EC4899', fontSize: 16 }}>{migrantName}</b> eligió SaludCompartida para que tú y tu familia estén protegidos. Es su forma de estar cerca, aunque esté lejos.</>
          }
        </p>
      </div>

      {/* Quick stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 10,
        marginBottom: 28,
      }}>
        {[
          { num: '4', label: 'Miembros', color: '#06B6D4' },
          { num: '$0', label: 'Ahorrado', color: '#10B981' },
          { num: '24/7', label: 'Acceso', color: '#F59E0B' },
        ].map((s, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 14,
            padding: '14px 10px',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 22, fontWeight: 800, color: s.color, letterSpacing: '-0.5px', margin: 0 }}>{s.num}</p>
            <p style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginTop: 3, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Label */}
      <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>
        Tus servicios
      </p>

      {/* Service cards */}
      {SERVICES.map((svc, idx) => (
        <div
          key={svc.id}
          style={{
            background: svc.gradient,
            border: `2px solid ${svc.border}`,
            borderRadius: 20,
            padding: '24px 20px',
            marginBottom: 16,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          {/* Header con Icon + Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: svc.iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            }}>
              <svc.icon s={40} />
            </div>
            <h3 style={{ fontSize: 21, fontWeight: 800, margin: 0, color: '#fff', flex: 1, lineHeight: 1.3 }}>
              {svc.title}
            </h3>
          </div>

          {/* Subtitle */}
          <p style={{ 
            fontSize: 16, 
            color: 'rgba(255,255,255,0.9)', 
            margin: '0 0 18px', 
            lineHeight: 1.6,
            fontWeight: 500, 
          }}>
            {svc.subtitle}
          </p>

          {/* Badges (múltiples) */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 10, 
            marginBottom: 18 
          }}>
            {svc.badges.map((badge, i) => (
              <span key={i} style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: '0.5px',
                padding: '9px 16px',
                borderRadius: 11,
                background: badge.bg,
                color: badge.color,
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}>
                {badge.text}
              </span>
            ))}
          </div>

          {/* Detail line (beneficio clave) */}
          <div style={{
            background: 'rgba(16,185,129,0.15)',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: 12,
            padding: '14px 18px',
            marginBottom: 18,
          }}>
            <p style={{ 
              fontSize: 13, 
              fontWeight: 800, 
              letterSpacing: '0.8px',
              color: svc.detailColor, 
              margin: 0,
              textAlign: 'center',
            }}>
              {svc.detail}
            </p>
          </div>

          {/* Conocer Más Button */}
          <button
            onClick={() => setCurrentPage(svc.id)}
            style={{
              width: '100%',
              padding: '16px 20px',
              background: 'rgba(255,255,255,0.12)',
              border: '1.5px solid rgba(255,255,255,0.25)',
              borderRadius: 14,
              color: '#fff',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.18)';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Conocer más
            <Icons.Arrow s={18} />
          </button>
        </div>
      ))}

      {/* Sorpresa de Fin de Mes - Dinámico y Alegre! */}
      <div 
        onClick={() => {
          setGiftOpened(!giftOpened);
          if (!giftOpened) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
          }
        }}
        style={{
          marginTop: 16,
          marginBottom: 16,
          padding: '28px 24px',
          background: giftOpened 
            ? 'linear-gradient(135deg, rgba(251,146,60,0.25), rgba(236,72,153,0.25), rgba(139,92,246,0.25))'
            : 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.15))',
          border: giftOpened 
            ? '2px solid rgba(251,146,60,0.5)' 
            : '2px solid rgba(139,92,246,0.4)',
          borderRadius: 20,
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          transform: giftOpened ? 'scale(1.02)' : 'scale(1)',
          boxShadow: giftOpened 
            ? '0 12px 40px rgba(251,146,60,0.3)' 
            : '0 8px 32px rgba(139,92,246,0.2)',
        }}
      >
        {/* Confetti animado */}
        {showConfetti && (
          <>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: ['#FCD34D', '#EC4899', '#8B5CF6', '#10B981', '#06B6D4'][i % 5],
                  animation: `confetti-${i} 2s ease-out forwards`,
                  opacity: 0,
                }}
              />
            ))}
          </>
        )}

        <style>{`
          ${[...Array(20)].map((_, i) => `
            @keyframes confetti-${i} {
              0% {
                transform: translate(-50%, -50%) translate(0, 0) rotate(0deg);
                opacity: 1;
              }
              100% {
                transform: translate(-50%, -50%) 
                           translate(${Math.cos(i * 18 * Math.PI / 180) * 150}px, 
                                     ${Math.sin(i * 18 * Math.PI / 180) * 150}px) 
                           rotate(${i * 45}deg);
                opacity: 0;
              }
            }
          `).join('')}
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 16,
          position: 'relative',
          zIndex: 1,
        }}>
          {/* SVG de Regalo con animación */}
          <div style={{ 
            animation: giftOpened ? 'rotate 0.6s ease-out' : 'bounce 2s ease-in-out infinite',
            transformOrigin: 'center',
          }}>
            <Icons.Gift s={giftOpened ? 100 : 80} />
          </div>

          {/* Sparkles alrededor */}
          {!giftOpened && (
            <>
              <div style={{ position: 'absolute', top: 10, left: 20, animation: 'bounce 1.5s ease-in-out infinite 0.2s' }}>
                <Icons.Sparkles s={16} />
              </div>
              <div style={{ position: 'absolute', top: 15, right: 25, animation: 'bounce 1.5s ease-in-out infinite 0.5s' }}>
                <Icons.Sparkles s={20} />
              </div>
              <div style={{ position: 'absolute', bottom: 20, left: 30, animation: 'bounce 1.5s ease-in-out infinite 0.8s' }}>
                <Icons.Sparkles s={14} />
              </div>
            </>
          )}

          {/* Mensaje */}
          {!giftOpened ? (
            <>
              <h3 style={{ 
                fontSize: 20, 
                fontWeight: 800, 
                color: '#FCD34D', 
                margin: 0,
                textAlign: 'center',
                textShadow: '0 2px 8px rgba(252,211,77,0.3)',
              }}>
                ¡Sorpresa de Fin de Mes! 🎉
              </h3>
              <p style={{ 
                fontSize: 15, 
                color: 'rgba(255,255,255,0.85)', 
                textAlign: 'center',
                lineHeight: 1.6,
                margin: 0,
                fontWeight: 500,
              }}>
                Toca el regalo para descubrir la sorpresa que SaludCompartida tiene para ti
              </p>
              <p style={{ 
                fontSize: 12, 
                color: 'rgba(255,255,255,0.5)', 
                textAlign: 'center',
                margin: 0,
                fontStyle: 'italic',
              }}>
                Presiona aquí 👆
              </p>
            </>
          ) : (
            <>
              <h3 style={{ 
                fontSize: 22, 
                fontWeight: 800, 
                color: '#10B981', 
                margin: 0,
                textAlign: 'center',
                textShadow: '0 2px 12px rgba(16,185,129,0.4)',
              }}>
                ¡El regalo llega pronto! 🎁
              </h3>
              <p style={{ 
                fontSize: 16, 
                color: 'rgba(255,255,255,0.9)', 
                textAlign: 'center',
                lineHeight: 1.7,
                margin: 0,
                fontWeight: 600,
              }}>
                A <span style={{ color: '#FCD34D' }}>fin de mes</span>, te revelaremos <b style={{ color: '#EC4899' }}>todos los ahorros</b> que obtuviste. 
              </p>
              <p style={{ 
                fontSize: 14, 
                color: 'rgba(255,255,255,0.7)', 
                textAlign: 'center',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Cada consulta, cada medicina, cada terapia... ¡todo suma! 💰✨
              </p>
              <div style={{
                marginTop: 8,
                padding: '10px 20px',
                background: 'rgba(16,185,129,0.2)',
                borderRadius: 12,
                border: '1px solid rgba(16,185,129,0.3)',
              }}>
                <p style={{ 
                  fontSize: 13, 
                  color: '#10B981', 
                  fontWeight: 700,
                  margin: 0,
                  textAlign: 'center',
                }}>
                  🎊 Mientras más uses, más ahorras 🎊
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Lupita/Fernanda - Solo botón */}
      <button
        onClick={() => setCurrentPage('lupita-fernanda')}
        style={{
          width: '100%',
          padding: '20px 18px',
          background: 'rgba(139,92,246,0.12)',
          border: '2px solid rgba(139,92,246,0.3)',
          borderRadius: 16,
          cursor: 'pointer',
          textAlign: 'center',
          color: '#fff',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(139,92,246,0.18)';
          e.currentTarget.style.transform = 'scale(1.01)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(139,92,246,0.12)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <Icons.Companion s={28} />
        <div style={{ textAlign: 'left', flex: 1 }}>
          <p style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>{companionName}</p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: 0 }}>Tu compañía siempre</p>
        </div>
        <Icons.Arrow s={18} />
      </button>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#111827', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '20px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '430px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #06B6D4, #0891B2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icons.MedicalCross s={26} />
            </div>
            <img src="/saludcompartida-dark-no-tagline.png" alt="SaludCompartida" style={{ height: '36px' }} onError={(e) => e.currentTarget.style.display = 'none'} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#10B981',
                display: 'inline-block'
              }} />
              <span style={{ color: '#fff', fontSize: '17px', fontWeight: '700' }}>{userName}</span>
            </div>
            <button
              onClick={handleLogout}
              style={{
                padding: '6px',
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            >
              <Icons.Logout s={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Top Navigation (SECCIONES) */}
      <nav style={{
        background: 'rgba(17,24,39,0.95)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'sticky',
        top: '88px',
        zIndex: 90,
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}>
        <style>{`
          nav::-webkit-scrollbar { display: none; }
        `}</style>
        <div style={{ 
          maxWidth: '430px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'flex-start',
          gap: '4px',
          padding: '10px 16px'
        }}>
          <button onClick={() => setCurrentPage('home')} style={{
            background: currentPage === 'home' ? 'rgba(6,182,212,0.15)' : 'transparent',
            border: currentPage === 'home' ? '1px solid rgba(6,182,212,0.3)' : '1px solid transparent',
            padding: '8px 14px',
            borderRadius: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: currentPage === 'home' ? '#06B6D4' : 'rgba(255,255,255,0.6)',
            fontSize: '13px',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill={currentPage === 'home' ? '#06B6D4' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            Inicio
          </button>

          <button onClick={() => setCurrentPage('quienes-somos')} style={{
            background: currentPage === 'quienes-somos' ? 'rgba(6,182,212,0.15)' : 'transparent',
            border: currentPage === 'quienes-somos' ? '1px solid rgba(6,182,212,0.3)' : '1px solid transparent',
            padding: '8px 14px',
            borderRadius: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: currentPage === 'quienes-somos' ? '#06B6D4' : 'rgba(255,255,255,0.6)',
            fontSize: '13px',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
            </svg>
            Quiénes Somos
          </button>

          <button onClick={() => setCurrentPage('ahorros')} style={{
            background: currentPage === 'ahorros' ? 'rgba(6,182,212,0.15)' : 'transparent',
            border: currentPage === 'ahorros' ? '1px solid rgba(6,182,212,0.3)' : '1px solid transparent',
            padding: '8px 14px',
            borderRadius: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: currentPage === 'ahorros' ? '#06B6D4' : 'rgba(255,255,255,0.6)',
            fontSize: '13px',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.4-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2" />
            </svg>
            Mis Ahorros
          </button>

          <button onClick={() => setCurrentPage('lupita-fernanda')} style={{
            background: currentPage === 'lupita-fernanda' ? 'rgba(6,182,212,0.15)' : 'transparent',
            border: currentPage === 'lupita-fernanda' ? '1px solid rgba(6,182,212,0.3)' : '1px solid transparent',
            padding: '8px 14px',
            borderRadius: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: currentPage === 'lupita-fernanda' ? '#06B6D4' : 'rgba(255,255,255,0.6)',
            fontSize: '13px',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Acompañamiento
          </button>

          <button onClick={() => setCurrentPage('mi-cuenta')} style={{
            background: currentPage === 'mi-cuenta' ? 'rgba(6,182,212,0.15)' : 'transparent',
            border: currentPage === 'mi-cuenta' ? '1px solid rgba(6,182,212,0.3)' : '1px solid transparent',
            padding: '8px 14px',
            borderRadius: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: currentPage === 'mi-cuenta' ? '#06B6D4' : 'rgba(255,255,255,0.6)',
            fontSize: '13px',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
            </svg>
            Mi Cuenta
          </button>

          <button onClick={() => setCurrentPage('blog')} style={{
            background: currentPage === 'blog' ? 'rgba(6,182,212,0.15)' : 'transparent',
            border: currentPage === 'blog' ? '1px solid rgba(6,182,212,0.3)' : '1px solid transparent',
            padding: '8px 14px',
            borderRadius: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: currentPage === 'blog' ? '#06B6D4' : 'rgba(255,255,255,0.6)',
            fontSize: '13px',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
            </svg>
            Blog
          </button>

          <button onClick={() => setCurrentPage('contactanos')} style={{
            background: currentPage === 'contactanos' ? 'rgba(6,182,212,0.15)' : 'transparent',
            border: currentPage === 'contactanos' ? '1px solid rgba(6,182,212,0.3)' : '1px solid transparent',
            padding: '8px 14px',
            borderRadius: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: currentPage === 'contactanos' ? '#06B6D4' : 'rgba(255,255,255,0.6)',
            fontSize: '13px',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Contacto
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '430px', margin: '0 auto' }}>
        {currentPage === 'home' && renderHome()}
        {currentPage === 'quienes-somos' && <QuienesSomos userType={userType!} />}
        {currentPage === 'telemedicina' && <Telemedicina userType={userType!} onBack={() => setCurrentPage('home')} />}
        {currentPage === 'farmacia' && <Farmacia userType={userType!} onBack={() => setCurrentPage('home')} />}
        {currentPage === 'terapia' && <Terapia userType={userType!} />}
        {currentPage === 'ahorros' && <Ahorros userType={userType!} onBack={() => setCurrentPage('home')} />}
        {currentPage === 'lupita-fernanda' && <LupitaFernanda userType={userType!} onBack={() => setCurrentPage('home')} />}
        {currentPage === 'mi-cuenta' && <MiCuenta userType={userType!} />}
        {currentPage === 'evaluacion' && <Evaluacion userType={userType!} onBack={() => setCurrentPage('home')} />}
        {currentPage === 'blog' && <Blog userType={userType!} onBack={() => setCurrentPage('home')} />}
        {currentPage === 'contactanos' && <Contactanos userType={userType!} />}
        {currentPage === 'terminos' && <TerminosPrivacidad />}
      </main>

      {/* Bottom Navigation */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(17,24,39,0.98)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
        padding: '8px 0 12px'
      }}>
        <div style={{ maxWidth: '430px', margin: '0 auto', display: 'flex', justifyContent: 'space-around' }}>
          <button onClick={() => setCurrentPage('home')} style={{
            background: 'transparent',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            color: currentPage === 'home' ? '#06B6D4' : 'rgba(255,255,255,0.45)'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill={currentPage === 'home' ? '#06B6D4' : 'none'} stroke="currentColor" strokeWidth="1.8">
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            <span style={{ fontSize: '10px', fontWeight: '600' }}>Inicio</span>
          </button>

          <button onClick={() => setCurrentPage('quienes-somos')} style={{
            background: 'transparent',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            color: currentPage === 'quienes-somos' ? '#06B6D4' : 'rgba(255,255,255,0.45)'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
            </svg>
            <span style={{ fontSize: '10px', fontWeight: '600' }}>Info</span>
          </button>

          <button onClick={() => setCurrentPage('mi-cuenta')} style={{
            background: 'transparent',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            color: currentPage === 'mi-cuenta' ? '#06B6D4' : 'rgba(255,255,255,0.45)'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
            </svg>
            <span style={{ fontSize: '10px', fontWeight: '600' }}>Cuenta</span>
          </button>

          <button onClick={() => setCurrentPage('blog')} style={{
            background: 'transparent',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            color: currentPage === 'blog' ? '#06B6D4' : 'rgba(255,255,255,0.45)'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
            </svg>
            <span style={{ fontSize: '10px', fontWeight: '600' }}>Blog</span>
          </button>

          <button onClick={() => setCurrentPage('contactanos')} style={{
            background: 'transparent',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            color: currentPage === 'contactanos' ? '#06B6D4' : 'rgba(255,255,255,0.45)'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span style={{ fontSize: '10px', fontWeight: '600' }}>Contacto</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
