'use client';

import { useState, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════
   DASHBOARD — Unified Page (app/dashboard/page.jsx)
   
   This is the NEW architecture that replaces the old
   individual route files. Everything lives under /dashboard
   with client-side navigation managed by DashboardShell.
   
   REPLACES:
   - app/dashboard/telemedicina/page.jsx
   - app/dashboard/farmacia/page.jsx
   - app/dashboard/ahorros/page.jsx
   - app/dashboard/lupita-fernanda/page.jsx
   - app/dashboard/evaluacion/page.jsx
   - app/dashboard/blog/page.jsx
   - app/dashboard/terapia/page.jsx
   - app/dashboard/quienes-somos/page.jsx
   - app/dashboard/mi-cuenta/page.jsx
   - app/dashboard/contactanos/page.jsx
   - app/dashboard/terminos-privacidad/page.jsx
   
   All those components still exist in /components/ — 
   they just render inside the shell instead of as 
   separate routes.
   ═══════════════════════════════════════════════════════════ */

import DashboardShell from '../../components/DashboardShell';
import Inicio from '../../components/Inicio';

/* ── Lazy imports for existing components ─────────────────
   Uncomment each line as you integrate the component.
   The component files should already be in /components/
   ───────────────────────────────────────────────────────── */
// import Telemedicina from '../../components/Telemedicina';
// import Farmacia from '../../components/Farmacia';
// import Terapia from '../../components/Terapia';
// import Ahorros from '../../components/Ahorros';
// import LupitaFernanda from '../../components/LupitaFernanda';
// import MiCuenta from '../../components/MiCuenta';
// import Evaluacion from '../../components/Evaluacion';
// import Blog from '../../components/Blog';
// import QuienesSomos from '../../components/QuienesSomos';
// import Contactanos from '../../components/Contactanos';
// import TerminosPrivacidad from '../../components/TerminosPrivacidad';


/* ── Placeholder screen (used until components are imported) */
function PlaceholderScreen({ title, color = '#06B6D4' }) {
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center' }}>
      <div style={{
        width: 80, height: 80, borderRadius: 24,
        background: `${color}15`, border: `1px solid ${color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 20px',
        fontSize: 32,
      }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
        </svg>
      </div>
      <h2 style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: 24, color, marginBottom: 8,
      }}>{title}</h2>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', maxWidth: 280, margin: '0 auto' }}>
        Esta sección se está integrando. Pronto estará disponible.
      </p>
    </div>
  );
}


export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState('inicio');

  // TODO: Replace with real user data from Supabase session
  const userName = 'Renata';
  const migrantName = 'Carlos';
  const userType = 'mexico'; // or 'migrant'

  const handleNavigate = useCallback((sectionId) => {
    setActiveSection(sectionId);
    // Scroll to top when changing sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLogout = useCallback(() => {
    // TODO: Implement Supabase signOut
    // await supabase.auth.signOut();
    window.location.href = '/';
  }, []);

  /* ── Render the active section ───────────────────────── */
  const renderSection = () => {
    const commonProps = {
      userType,
      userName,
      migrantName,
      onBack: () => handleNavigate('inicio'),
      onNavigate: handleNavigate,
    };

    switch (activeSection) {
      case 'inicio':
        return <Inicio {...commonProps} />;

      /* ── Primary services ─────────────────────── */
      // Uncomment each case as you import the component above

      // case 'telemedicina':
      //   return <Telemedicina {...commonProps} />;

      // case 'farmacia':
      //   return <Farmacia {...commonProps} />;

      // case 'terapia':
      //   return <Terapia {...commonProps} />;

      /* ── Secondary screens ────────────────────── */

      // case 'ahorros':
      //   return <Ahorros {...commonProps} />;

      // case 'lupita-fernanda':
      //   return <LupitaFernanda {...commonProps} />;

      // case 'mi-cuenta':
      //   return <MiCuenta {...commonProps} />;

      // case 'evaluacion':
      //   return <Evaluacion {...commonProps} />;

      // case 'blog':
      //   return <Blog {...commonProps} />;

      // case 'quienes-somos':
      //   return <QuienesSomos {...commonProps} />;

      // case 'contactanos':
      //   return <Contactanos {...commonProps} />;

      // case 'terminos-privacidad':
      //   return <TerminosPrivacidad {...commonProps} />;

      /* ── Fallback for sections not yet imported ── */
      default: {
        const labels = {
          telemedicina: 'Médico 24/7',
          farmacia: 'Farmacia',
          terapia: 'Terapia',
          ahorros: 'Mis Ahorros',
          'lupita-fernanda': 'Lupita y Fernanda',
          'mi-cuenta': 'Mi Cuenta',
          evaluacion: 'Evalúanos',
          blog: 'Blog de Salud',
          'quienes-somos': 'Quiénes Somos',
          contactanos: 'Contáctanos',
          'terminos-privacidad': 'Términos y Privacidad',
        };
        const colors = {
          telemedicina: '#06B6D4',
          farmacia: '#EC4899',
          terapia: '#8B5CF6',
          ahorros: '#10B981',
          'lupita-fernanda': '#8B5CF6',
          'mi-cuenta': '#06B6D4',
          evaluacion: '#F59E0B',
          blog: '#06B6D4',
          'quienes-somos': '#EC4899',
          contactanos: '#06B6D4',
          'terminos-privacidad': '#6B7280',
        };
        return (
          <PlaceholderScreen
            title={labels[activeSection] || activeSection}
            color={colors[activeSection] || '#06B6D4'}
          />
        );
      }
    }
  };

  return (
    <DashboardShell
      activeSection={activeSection}
      onNavigate={handleNavigate}
      userName={userName}
      migrantName={migrantName}
      userType={userType}
      onLogout={handleLogout}
    >
      {renderSection()}
    </DashboardShell>
  );
}
