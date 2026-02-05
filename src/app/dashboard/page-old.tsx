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
  const migrantName = registration?.migrant_first_name || 'Fabiola';
  const companionName = userType === 'migrant' ? 'Fernanda' : 'Lupita';
  
  // Scroll suave a sección
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#111827', fontFamily: '"Plus Jakarta Sans", sans-serif', paddingBottom: '200px' }}>
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
          {/* Logo + Icono */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '14px', 
              background: 'linear-gradient(135deg, #06B6D4, #0891B2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px'
            }}>
              ✚
            </div>
            <img src="/saludcompartida-dark-no-tagline.png" alt="SaludCompartida" style={{ height: '36px' }} onError={(e) => e.currentTarget.style.display = 'none'} />
          </div>
          
          {/* Usuario + Status */}
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
                padding: '0',
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '26px',
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

      {/* Main Content - Todo en scroll */}
      <main>
        {/* HOME SECTION */}
        <div id="inicio" style={{ maxWidth: '430px', margin: '0 auto', padding: '30px 20px' }}>
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
                <strong style={{ color: '#EC4899' }}>{migrantName}</strong> eligió SaludCompartida para que tú y tu familia estén protegidos. Es su forma de estar cerca, aunque esté lejos.
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
              <p style={{ color: '#10B981', fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0' }}>$0</p>
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
            onClick={() => scrollToSection('telemedicina-section')}
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
            onClick={() => scrollToSection('farmacia-section')}
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
            onClick={() => scrollToSection('terapia-section')}
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

          {/* Acompañamiento con Lupita/Fernanda */}
          <div 
            onClick={() => scrollToSection('acompanamiento-section')}
            style={{ 
              background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(147,51,234,0.1))',
              border: '1px solid rgba(168,85,247,0.3)',
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
              <div style={{ fontSize: '40px' }}>👥</div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0' }}>Acompañamiento {companionName}</h4>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: 0 }}>Tu compañía siempre</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#A855F7', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>24/7 ONLINE</span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '20px' }}>›</span>
            </div>
          </div>

          {/* Mis Ahorros */}
          <div 
            onClick={() => scrollToSection('ahorros-section')}
            style={{ 
              background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.1))',
              border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: '20px',
              padding: '24px',
              marginBottom: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '40px' }}>💰</div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0' }}>Mis Ahorros</h4>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: 0 }}>$0 MXN este mes</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#10B981', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>VER DETALLE</span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '20px' }}>›</span>
            </div>
          </div>
        </div>

        {/* SECCIONES COMPLETAS */}
        <div id="quienes-somos-section">
          <QuienesSomos userType={userType!} />
        </div>

        <div id="telemedicina-section">
          <Telemedicina userType={userType!} onBack={() => scrollToSection('inicio')} />
        </div>

        <div id="farmacia-section">
          <Farmacia userType={userType!} onBack={() => scrollToSection('inicio')} />
        </div>

        <div id="terapia-section">
          <Terapia userType={userType!} />
        </div>

        <div id="acompanamiento-section">
          <LupitaFernanda userType={userType!} onBack={() => scrollToSection('inicio')} />
        </div>

        <div id="ahorros-section">
          <Ahorros userType={userType!} onBack={() => scrollToSection('inicio')} />
        </div>

        <div id="mi-cuenta-section">
          <MiCuenta userType={userType!} />
        </div>

        <div id="contactanos-section">
          <Contactanos userType={userType!} />
        </div>

        <div id="blog-section">
          <Blog userType={userType!} onBack={() => scrollToSection('inicio')} />
        </div>

        <div id="evaluacion-section">
          <Evaluacion userType={userType!} onBack={() => scrollToSection('inicio')} />
        </div>

        <div id="terminos-section">
          <TerminosPrivacidad />
        </div>
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
        zIndex: 100,
        padding: '12px 0 16px 0'
      }}>
        <div style={{ maxWidth: '430px', margin: '0 auto' }}>
          {/* Navegación Principal */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '8px',
            padding: '0 12px',
            marginBottom: '12px'
          }}>
            {/* Inicio */}
            <button 
              onClick={() => scrollToSection('inicio')}
              style={{ 
                background: 'transparent',
                border: 'none',
                padding: '8px 4px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span style={{ fontSize: '20px' }}>🏠</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '9px', fontWeight: '600' }}>Inicio</span>
            </button>

            {/* Quiénes Somos */}
            <button 
              onClick={() => scrollToSection('quienes-somos-section')}
              style={{ 
                background: 'transparent',
                border: 'none',
                padding: '8px 4px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span style={{ fontSize: '20px' }}>ℹ️</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '9px', fontWeight: '600', textAlign: 'center' }}>Quiénes Somos</span>
            </button>

            {/* Servicios */}
            <button 
              onClick={() => scrollToSection('telemedicina-section')}
              style={{ 
                background: 'transparent',
                border: 'none',
                padding: '8px 4px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span style={{ fontSize: '20px' }}>🩺</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '9px', fontWeight: '600' }}>Servicios</span>
            </button>

            {/* Acompañamiento */}
            <button 
              onClick={() => scrollToSection('acompanamiento-section')}
              style={{ 
                background: 'transparent',
                border: 'none',
                padding: '8px 4px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span style={{ fontSize: '20px' }}>👥</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '9px', fontWeight: '600', textAlign: 'center' }}>{companionName}</span>
            </button>

            {/* Mis Ahorros */}
            <button 
              onClick={() => scrollToSection('ahorros-section')}
              style={{ 
                background: 'transparent',
                border: 'none',
                padding: '8px 4px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span style={{ fontSize: '20px' }}>💰</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '9px', fontWeight: '600', textAlign: 'center' }}>Mis Ahorros</span>
            </button>

            {/* Mi Cuenta */}
            <button 
              onClick={() => scrollToSection('mi-cuenta-section')}
              style={{ 
                background: 'transparent',
                border: 'none',
                padding: '8px 4px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span style={{ fontSize: '20px' }}>👤</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '9px', fontWeight: '600', textAlign: 'center' }}>Mi Cuenta</span>
            </button>

            {/* Contáctanos */}
            <button 
              onClick={() => scrollToSection('contactanos-section')}
              style={{ 
                background: 'transparent',
                border: 'none',
                padding: '8px 4px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span style={{ fontSize: '20px' }}>💬</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '9px', fontWeight: '600' }}>Contacto</span>
            </button>

            {/* Blog */}
            <button 
              onClick={() => scrollToSection('blog-section')}
              style={{ 
                background: 'transparent',
                border: 'none',
                padding: '8px 4px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span style={{ fontSize: '20px' }}>📚</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '9px', fontWeight: '600' }}>Blog</span>
            </button>
          </div>

          {/* Links Legales */}
          <div style={{ 
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '8px',
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            padding: '8px 20px 0 20px'
          }}>
            <button 
              onClick={() => scrollToSection('terminos-section')}
              style={{ 
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.4)',
                fontSize: '9px',
                fontWeight: '500',
                cursor: 'pointer',
                padding: '4px 8px'
              }}
            >
              Política de Privacidad
            </button>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
            <button 
              onClick={() => scrollToSection('terminos-section')}
              style={{ 
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.4)',
                fontSize: '9px',
                fontWeight: '500',
                cursor: 'pointer',
                padding: '4px 8px'
              }}
            >
              Términos y Condiciones
            </button>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
            <button 
              onClick={() => scrollToSection('evaluacion-section')}
              style={{ 
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.4)',
                fontSize: '9px',
                fontWeight: '500',
                cursor: 'pointer',
                padding: '4px 8px'
              }}
            >
              Evalúanos
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
