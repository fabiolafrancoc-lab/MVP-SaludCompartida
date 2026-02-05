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
        { text: 'ILIMITADO', bg: 'rgba(6,182,212,0.35)', color: '#06B6D4' },
        { text: '24/7 · Todo el año', bg: 'rgba(251,191,36,0.35)', color: '#FBB020' },
      ],
      detail: 'CONSULTAS ILIMITADAS · Para ti y 3 familiares',
      detailColor: '#10B981',
      gradient: 'linear-gradient(135deg, rgba(6,182,212,0.18), rgba(6,182,212,0.08))',
      border: 'rgba(6,182,212,0.5)',
      iconBg: 'linear-gradient(135deg, rgba(6,182,212,0.35), rgba(6,182,212,0.2))',
    },
    {
      id: 'farmacia' as Page,
      icon: Icons.Pill,
      title: 'Descuento en Farmacias',
      subtitle: 'Ahorra hasta 75% en medicinas. En cualquier farmacia.',
      badges: [
        { text: '1,700+ FARMACIAS', bg: 'rgba(236,72,153,0.35)', color: '#EC4899' },
        { text: 'Hasta 75% OFF', bg: 'rgba(34,197,94,0.35)', color: '#22C55E' },
      ],
      detail: 'SIN LÍMITE DE USO · Toda tu familia',
      detailColor: '#EC4899',
      gradient: 'linear-gradient(135deg, rgba(236,72,153,0.18), rgba(236,72,153,0.08))',
      border: 'rgba(236,72,153,0.5)',
      iconBg: 'linear-gradient(135deg, rgba(236,72,153,0.35), rgba(236,72,153,0.2))',
    },
    {
      id: 'terapia' as Page,
      icon: Icons.Brain,
      title: 'Tu Sesión de Terapia',
      subtitle: 'Hablar no es de débiles, es de valientes. Para ti o quien más lo necesite.',
      badges: [
        { text: 'Semanal · 50 min', bg: 'rgba(251,146,60,0.35)', color: '#FB923C' },
        { text: 'Cambio de terapeuta', bg: 'rgba(139,92,246,0.35)', color: '#8B5CF6' },
        { text: '100% Confidencial', bg: 'rgba(236,72,153,0.35)', color: '#EC4899' },
      ],
      detail: '4 SESIONES MENSUALES · 1 por miembro',
      detailColor: '#10B981',
      gradient: 'linear-gradient(135deg, rgba(139,92,246,0.18), rgba(139,92,246,0.08))',
      border: 'rgba(139,92,246,0.5)',
      iconBg: 'linear-gradient(135deg, rgba(139,92,246,0.35), rgba(139,92,246,0.2))',
    },
  ];

  // Renderizar HOME
  const renderHome = () => (
    <div style={{ padding: '0 20px 100px', opacity: animateIn ? 1 : 0, transition: 'opacity 0.4s ease' }}>
      {/* Greeting */}
      <div style={{ paddingTop: 24, marginBottom: 28 }}>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', fontWeight: 500, marginBottom: 4 }}>{greeting}</p>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 28,
          lineHeight: 1.25,
          margin: 0,
          color: '#fff',
        }}>
          {isMigrant
            ? <>Hola, <span style={{ color: '#06B6D4' }}>{userName}</span></>
            : <>{userName}, <span style={{ color: '#06B6D4' }}>{migrantName}</span> te cuida</>
          }
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginTop: 8 }}>
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
        borderRadius: 16,
        padding: '16px 18px',
        marginBottom: 28,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
      }}>
        <div style={{ flexShrink: 0, marginTop: 2 }}>
          <Icons.Heart s={22} />
        </div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, margin: 0 }}>
          {isMigrant
            ? <><b style={{ color: '#EC4899' }}>{userName}</b>, tu familia ya tiene acceso a todos los servicios. Cada vez que los usan, tú cuidas aunque estés lejos.</>
            : <><b style={{ color: '#EC4899' }}>{migrantName}</b> eligió SaludCompartida para que tú y tu familia estén protegidos. Es su forma de estar cerca, aunque esté lejos.</>
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
              <svc.icon s={36} />
            </div>
            <h3 style={{ fontSize: 19, fontWeight: 800, margin: 0, color: '#fff', flex: 1, lineHeight: 1.3 }}>
              {svc.title}
            </h3>
          </div>

          {/* Subtitle */}
          <p style={{ 
            fontSize: 14, 
            color: 'rgba(255,255,255,0.85)', 
            margin: '0 0 16px', 
            lineHeight: 1.6,
            fontWeight: 500, 
          }}>
            {svc.subtitle}
          </p>

          {/* Badges (múltiples) */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 8, 
            marginBottom: 16 
          }}>
            {svc.badges.map((badge, i) => (
              <span key={i} style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.5px',
                padding: '8px 14px',
                borderRadius: 10,
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
            padding: '12px 16px',
            marginBottom: 16,
          }}>
            <p style={{ 
              fontSize: 12, 
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
              padding: '14px 18px',
              background: 'rgba(255,255,255,0.12)',
              border: '1.5px solid rgba(255,255,255,0.25)',
              borderRadius: 14,
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'all 0.2s ease',
              cursor: 'pointer',
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
            <Icons.Arrow s={16} />
          </button>
        </div>
      ))}

      {/* Secondary row (Ahorros + Acompañamiento) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
        <button
          onClick={() => setCurrentPage('ahorros')}
          style={{
            padding: '16px 14px',
            background: 'rgba(16,185,129,0.06)',
            border: '1px solid rgba(16,185,129,0.15)',
            borderRadius: 14,
            cursor: 'pointer',
            textAlign: 'center',
            color: '#fff',
            transition: 'transform 0.15s',
          }}
        >
          <Icons.Savings />
          <p style={{ fontSize: 13, fontWeight: 700, margin: '8px 0 2px' }}>Mis Ahorros</p>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', margin: 0 }}>$0 MXN este mes</p>
        </button>

        <button
          onClick={() => setCurrentPage('lupita-fernanda')}
          style={{
            padding: '16px 14px',
            background: 'rgba(139,92,246,0.06)',
            border: '1px solid rgba(139,92,246,0.15)',
            borderRadius: 14,
            cursor: 'pointer',
            textAlign: 'center',
            color: '#fff',
            transition: 'transform 0.15s',
          }}
        >
          <Icons.Companion />
          <p style={{ fontSize: 13, fontWeight: 700, margin: '8px 0 2px' }}>{companionName}</p>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', margin: 0 }}>Tu compañía siempre</p>
        </button>
      </div>
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
