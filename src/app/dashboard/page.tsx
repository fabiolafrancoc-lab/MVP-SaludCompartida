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

      const type: UserType = (data.migrant_code === code) ? 'migrant' : 'mexico';
      setUserType(type);
      setRegistration(data);
      setIsAuthenticated(true);
      setIsLoading(false);
      localStorage.setItem('dashboardCode', code);
      localStorage.setItem('dashboardUserType', type);
    } catch (error) {
      setCodeError('Error al validar código.');
      setIsLoading(false);
    }
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
        <div style={{ width: '100%', maxWidth: '400px', background: 'rgba(255,255,255,0.04)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)', padding: '40px 30px', textAlign: 'center' }}>
          <img src="/saludcompartida-dark-no-tagline.png" alt="Logo" style={{ height: '50px', margin: '0 auto 30px' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', marginBottom: '10px' }}>Dashboard</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', marginBottom: '30px' }}>Ingresa tu código de acceso</p>
          <form onSubmit={handleCodeSubmit}>
            <input type="text" value={codeInput} onChange={(e) => setCodeInput(e.target.value.toUpperCase())} placeholder="Código" disabled={isLoading} style={{ width: '100%', padding: '16px', fontSize: '16px', color: '#fff', background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.12)', borderRadius: '12px', textAlign: 'center', textTransform: 'uppercase' }} />
            {codeError && <p style={{ color: '#EF4444', fontSize: '14px', marginTop: '12px' }}>{codeError}</p>}
            <button type="submit" disabled={isLoading || codeInput.length < 4} style={{ width: '100%', marginTop: '20px', padding: '16px', fontSize: '16px', fontWeight: '700', color: '#fff', background: 'linear-gradient(135deg, #06B6D4, #0891B2)', border: 'none', borderRadius: '12px', cursor: 'pointer', opacity: isLoading ? 0.6 : 1 }}>
              {isLoading ? 'Validando...' : 'Ingresar'}
            </button>
          </form>
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
      title: 'Médico 24/7',
      subtitle: 'Tu doctor disponible ahora. Sin esperas.',
      tag: 'ILIMITADO',
      tagColor: '#06B6D4',
      gradient: 'linear-gradient(135deg, rgba(6,182,212,0.12), rgba(6,182,212,0.04))',
      border: 'rgba(6,182,212,0.2)',
    },
    {
      id: 'farmacia' as Page,
      icon: Icons.Pill,
      title: 'Farmacia',
      subtitle: 'Ahorra hasta 75% en medicinas. En cualquier farmacia.',
      tag: '1,700+ FARMACIAS',
      tagColor: '#EC4899',
      gradient: 'linear-gradient(135deg, rgba(236,72,153,0.12), rgba(236,72,153,0.04))',
      border: 'rgba(236,72,153,0.2)',
    },
    {
      id: 'terapia' as Page,
      icon: Icons.Brain,
      title: 'Terapia',
      subtitle: 'Habla hoy. Siente la diferencia mañana.',
      tag: 'CONFIDENCIAL',
      tagColor: '#8B5CF6',
      gradient: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(139,92,246,0.04))',
      border: 'rgba(139,92,246,0.2)',
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
            border: `1px solid ${svc.border}`,
            borderRadius: 16,
            padding: '18px 16px',
            marginBottom: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            {/* Icon */}
            <div style={{
              width: 50,
              height: 50,
              borderRadius: 14,
              background: 'rgba(255,255,255,0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svc.icon />
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 16, fontWeight: 700, margin: '0 0 3px', color: '#fff' }}>{svc.title}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: 0 }}>{svc.subtitle}</p>
            </div>

            {/* Tag */}
            <span style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.5px',
              padding: '4px 8px',
              borderRadius: 6,
              background: `${svc.tagColor}18`,
              color: svc.tagColor,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
              {svc.tag}
            </span>
          </div>

          {/* Conocer Más Button */}
          <button
            onClick={() => setCurrentPage(svc.id)}
            style={{
              width: '100%',
              padding: '10px 14px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
            }}
          >
            Conocer Más
            <Icons.Arrow s={14} />
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
