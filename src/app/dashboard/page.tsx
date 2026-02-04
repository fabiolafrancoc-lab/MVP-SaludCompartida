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

if (!supabaseAnonKey) {
  console.error('❌ SUPABASE_ANON_KEY no configurado');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface RegistrationData {
  id: number;
  migrant_code: string;
  family_code: string;
  migrant_first_name: string;
  family_first_name: string;
  migrant_email: string;
  family_primary_email: string;
  subscription_status: string;
}

type UserType = 'migrant' | 'mexico';
type Page = 'home' | 'quienes-somos' | 'telemedicina' | 'farmacia' | 'terapia' | 'ahorros' | 'lupita-fernanda' | 'mi-cuenta' | 'evaluacion' | 'blog' | 'contactanos' | 'terminos';

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [codeError, setCodeError] = useState('');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [registration, setRegistration] = useState<RegistrationData | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  console.log('Dashboard render - isAuthenticated:', isAuthenticated);

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
      // Buscar registro por código (migrant_code o family_code)
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .or(`migrant_code.eq.${code},family_code.eq.${code}`)
        .maybeSingle();

      console.log('🔍 [DASHBOARD] Registro encontrado:', { data, error, code });

      if (error) {
        console.error('❌ [DASHBOARD] Error de Supabase:', error);
        setCodeError('Error al validar código. Intenta de nuevo.');
        setIsLoading(false);
        return;
      }

      if (!data) {
        console.error('❌ [DASHBOARD] Código no encontrado');
        setCodeError('Código no válido.');
        setIsLoading(false);
        return;
      }

      // Verificar que el pago esté completado y la suscripción activa
      // Valores válidos: 'pending', 'active', 'cancelled', 'expired', 'paused'
      if (data.status !== 'active') {
        console.error('❌ [DASHBOARD] Suscripción no activa. status:', data.status);
        setCodeError('Este código no está activo. Completa el pago primero.');
        setIsLoading(false);
        return;
      }

      console.log('✅ [DASHBOARD] Código válido, suscripción activa');

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
  };

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
  const migrantName = registration?.migrant_first_name || 'Carlos';
  
  // Renderizar página Home (inicio) con todos los servicios
  const renderHome = () => (
    <div style={{ maxWidth: '430px', margin: '0 auto', padding: '30px 20px' }}>
      {/* Bienvenida */}
      <div style={{ marginBottom: '30px' }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: '0 0 8px 0' }}>Buenos días</p>
        <h1 style={{ 
          color: '#fff', 
          fontSize: '28px', 
          fontWeight: '700', 
          margin: 0,
          lineHeight: '1.3'
        }}>
          {userName}, <span style={{ color: '#06B6D4' }}>{migrantName}</span> te cuida
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', marginTop: '12px' }}>
          Tienes acceso a médico, medicinas, terapia y compañía para ti y tu familia.
        </p>
      </div>

      {/* Mensaje del migrante */}
      <div style={{ 
        background: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(168,85,247,0.1))', 
        border: '1px solid rgba(236,72,153,0.3)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>💗</span>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
            <strong style={{ color: '#EC4899' }}>{migrantName}</strong> eligió SaludCompartida para que tú y tu familia estén protegidos. Es su forma de estar cerca, aunque esté lejos s.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '40px' }}>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
          <p style={{ color: '#06B6D4', fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0' }}>4</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: '600', margin: 0, textTransform: 'uppercase' }}>MIEMBROS</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
          <p style={{ color: '#10B981', fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0' }}>$3,255</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: '600', margin: 0, textTransform: 'uppercase' }}>AHORRADO</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
          <p style={{ color: '#F59E0B', fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0' }}>24/7</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: '600', margin: 0, textTransform: 'uppercase' }}>ACCESO</p>
        </div>
      </div>

      {/* TUS SERVICIOS */}
      <h3 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 16px 0' }}>TUS SERVICIOS</h3>

      {/* Telemedicina */}
      <div 
        onClick={() => setCurrentPage('telemedicina')}
        style={{ 
          background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(8,145,178,0.1))',
          border: '1px solid rgba(6,182,212,0.3)',
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '40px' }}>🩺</div>
          <div>
            <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0' }}>Médico 24/7</h4>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: 0 }}>Videollamada con doctor</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#06B6D4', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>ILIMITADO</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '20px' }}>›</span>
        </div>
      </div>

      {/* Farmacia */}
      <div 
        onClick={() => setCurrentPage('farmacia')}
        style={{ 
          background: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(219,39,119,0.1))',
          border: '1px solid rgba(236,72,153,0.3)',
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '40px' }}>💊</div>
          <div>
            <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0' }}>Farmacia</h4>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: 0 }}>Descuentos 40–75%</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#EC4899', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase' }}>1,700+ FARMACIAS</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '20px' }}>›</span>
        </div>
      </div>

      {/* Terapia */}
      <div 
        onClick={() => setCurrentPage('terapia')}
        style={{ 
          background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(124,58,237,0.1))',
          border: '1px solid rgba(139,92,246,0.3)',
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '40px' }}>💙</div>
          <div>
            <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0' }}>Terapia</h4>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: 0 }}>Psicólogo profesional</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#8B5CF6', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>CONFIDENCIAL</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '20px' }}>›</span>
        </div>
      </div>

      {/* Lupita y Fernanda + Mis Ahorros (Grid 2 columnas) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '40px' }}>
        {/* Lupita/Fernanda */}
        <div 
          onClick={() => setCurrentPage('lupita-fernanda')}
          style={{ 
            background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(124,58,237,0.1))',
            border: '1px solid rgba(139,92,246,0.3)',
            borderRadius: '20px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            minHeight: '160px'
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>👥</div>
          <h4 style={{ color: '#fff', fontSize: '16px', fontWeight: '700', margin: '0 0 6px 0' }}>Lupita y Fernanda</h4>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', margin: 0 }}>Tu compañía siempre</p>
        </div>

        {/* Mis Ahorros */}
        <div 
          onClick={() => setCurrentPage('ahorros')}
          style={{ 
            background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.1))',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: '20px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            minHeight: '160px'
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>💰</div>
          <h4 style={{ color: '#fff', fontSize: '16px', fontWeight: '700', margin: '0 0 6px 0' }}>Mis Ahorros</h4>
          <p style={{ color: '#10B981', fontSize: '13px', fontWeight: '600', margin: 0 }}>$3,255 MXN este mes</p>
        </div>
      </div>

      {/* Frase */}
      <p style={{ 
        color: 'rgba(255,255,255,0.3)', 
        fontSize: '14px', 
        fontStyle: 'italic', 
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        Donde está tu corazón, está SaludCompartida
      </p>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#111827', fontFamily: '"Plus Jakarta Sans", sans-serif', paddingBottom: '80px' }}>
      {/* Header */}
      <header style={{ 
        background: 'rgba(255,255,255,0.04)', 
        borderBottom: '1px solid rgba(255,255,255,0.06)', 
        padding: '16px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '430px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo + Icono */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #06B6D4, #0891B2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              ✚
            </div>
            <img src="/saludcompartida-dark-no-tagline.png" alt="SaludCompartida" style={{ height: '24px' }} onError={(e) => e.currentTarget.style.display = 'none'} />
          </div>
          
          {/* Usuario + Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                background: '#10B981',
                display: 'inline-block'
              }} />
              <span style={{ color: '#fff', fontSize: '14px', fontWeight: '600' }}>{userName}</span>
            </div>
            <button 
              onClick={handleLogout}
              style={{ 
                padding: '0',
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              ↗
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
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

      {/* Footer Navigation */}
      <footer style={{ 
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(17,24,39,0.98)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(10px)',
        zIndex: 100
      }}>
        <div style={{ maxWidth: '430px', margin: '0 auto', padding: '12px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            {/* Inicio */}
            <button 
              onClick={() => setCurrentPage('home')}
              style={{ 
                background: 'transparent',
                border: 'none',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span style={{ fontSize: '22px' }}>🏠</span>
              <span style={{ color: currentPage === 'home' ? '#06B6D4' : 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: '600' }}>Inicio</span>
            </button>

            {/* Médico */}
            <button 
              onClick={() => setCurrentPage('telemedicina')}
              style={{ 
                background: 'transparent',
                border: 'none',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span style={{ fontSize: '22px' }}>🩺</span>
              <span style={{ color: currentPage === 'telemedicina' ? '#06B6D4' : 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: '600' }}>Médico</span>
            </button>

            {/* Farmacia */}
            <button 
              onClick={() => setCurrentPage('farmacia')}
              style={{ 
                background: 'transparent',
                border: 'none',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span style={{ fontSize: '22px' }}>💊</span>
              <span style={{ color: currentPage === 'farmacia' ? '#06B6D4' : 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: '600' }}>Farmacia</span>
            </button>

            {/* Terapia */}
            <button 
              onClick={() => setCurrentPage('terapia')}
              style={{ 
                background: 'transparent',
                border: 'none',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span style={{ fontSize: '22px' }}>💙</span>
              <span style={{ color: currentPage === 'terapia' ? '#06B6D4' : 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: '600' }}>Terapia</span>
            </button>

            {/* Más */}
            <button 
              onClick={() => setCurrentPage('mi-cuenta')}
              style={{ 
                background: 'transparent',
                border: 'none',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span style={{ fontSize: '22px' }}>⋮⋮</span>
              <span style={{ color: currentPage === 'mi-cuenta' ? '#06B6D4' : 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: '600' }}>Más</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
