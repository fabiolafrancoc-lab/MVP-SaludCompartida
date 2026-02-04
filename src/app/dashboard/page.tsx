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
type Page = 'quienes-somos' | 'telemedicina' | 'farmacia' | 'terapia' | 'ahorros' | 'lupita-fernanda' | 'mi-cuenta' | 'evaluacion' | 'blog' | 'contactanos' | 'terminos';

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [codeError, setCodeError] = useState('');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [registration, setRegistration] = useState<RegistrationData | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('quienes-somos');

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
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .or(`migrant_code.eq.${code},family_code.eq.${code}`)
        .eq('subscription_status', 'ACTIVE')
        .single();

      if (error || !data) {
        setCodeError('Código no válido o suscripción no activa.');
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
  
  // Tabs para Usuario México (9 tabs)
  const navItems: { id: Page; label: string; emoji: string }[] = [
    { id: 'quienes-somos', label: 'Quiénes Somos', emoji: '🏠' },
    { id: 'telemedicina', label: 'Telemedicina', emoji: '🩺' },
    { id: 'farmacia', label: 'Farmacia', emoji: '💊' },
    { id: 'terapia', label: 'Terapia', emoji: '💙' },
    { id: 'ahorros', label: 'Ahorros', emoji: '💰' },
    { id: 'lupita-fernanda', label: 'Lupita & Fernanda', emoji: '🤖' },
    { id: 'mi-cuenta', label: 'Mi Cuenta', emoji: '👤' },
    { id: 'evaluacion', label: 'Evaluación', emoji: '⭐' },
    { id: 'blog', label: 'Blog', emoji: '�' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#111827', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      <header style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '20px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '430px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src="/saludcompartida-dark-no-tagline.png" alt="Logo" style={{ height: '32px' }} onError={(e) => e.currentTarget.style.display = 'none'} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: '#fff', fontSize: '14px', fontWeight: '600' }}>{userName}</span>
            <button onClick={handleLogout} style={{ padding: '8px 16px', fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', cursor: 'pointer' }}>Salir</button>
          </div>
        </div>
      </header>
      <nav style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '10px 20px', overflowX: 'auto', position: 'sticky', top: '73px', zIndex: 99 }}>
        <div style={{ maxWidth: '430px', margin: '0 auto', display: 'flex', gap: '8px' }}>
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setCurrentPage(item.id)} style={{ padding: '10px 16px', fontSize: '14px', fontWeight: '600', color: currentPage === item.id ? '#06B6D4' : 'rgba(255,255,255,0.6)', background: currentPage === item.id ? 'rgba(6,182,212,0.15)' : 'transparent', border: currentPage === item.id ? '1px solid rgba(6,182,212,0.3)' : '1px solid transparent', borderRadius: '10px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              <span style={{ marginRight: '6px' }}>{item.emoji}</span>
              {item.label}
            </button>
          ))}
        </div>
      </nav>
      <main>
        {currentPage === 'quienes-somos' && <QuienesSomos userType={userType!} />}
        {currentPage === 'telemedicina' && <Telemedicina userType={userType!} onBack={() => {}} />}
        {currentPage === 'farmacia' && <Farmacia userType={userType!} onBack={() => {}} />}
        {currentPage === 'terapia' && <Terapia userType={userType!} />}
        {currentPage === 'ahorros' && <Ahorros userType={userType!} onBack={() => {}} />}
        {currentPage === 'lupita-fernanda' && <LupitaFernanda userType={userType!} onBack={() => {}} />}
        {currentPage === 'mi-cuenta' && <MiCuenta userType={userType!} />}
        {currentPage === 'evaluacion' && <Evaluacion userType={userType!} onBack={() => {}} />}
        {currentPage === 'blog' && <Blog userType={userType!} onBack={() => {}} />}
        {currentPage === 'contactanos' && <Contactanos userType={userType!} />}
        {currentPage === 'terminos' && <TerminosPrivacidad />}
      </main>
      <footer style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '30px 20px', marginTop: '60px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: 0 }}>© 2026 SaludCompartida · Hecho con 💙</p>
      </footer>
    </div>
  );
}
