'use client';

import { useState, useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════
   DashboardShell — SaludCompartida Platinum UX
   
   ARCHITECTURE:
   - Single unified shell that wraps ALL dashboard content
   - Top header: Logo + User name + Status
   - Bottom tab bar: 5 primary tabs (app-native style)
   - "More" drawer for secondary items
   - NO horizontal scrolling tabs
   - NO duplicate headers
   - Mobile-first: 375px optimized
   
   REPLACES: The broken double-navigation layout
   ═══════════════════════════════════════════════════════════ */

/* ── Icons (SVG, no emojis) ─────────────────────────────── */

const Icons = {
  Logo: () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="13" fill="url(#logoGrad)" stroke="rgba(6,182,212,0.3)" strokeWidth="1"/>
      <path d="M14 8l-1.5 3.5L9 13l3.5 1.5L14 18l1.5-3.5L19 13l-3.5-1.5L14 8z" fill="#fff" opacity="0.9"/>
      <defs><linearGradient id="logoGrad" x1="0" y1="0" x2="28" y2="28"><stop stopColor="#06B6D4"/><stop offset="1" stopColor="#EC4899"/></linearGradient></defs>
    </svg>
  ),
  Home: ({active}) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active?'#06B6D4':'none'} stroke={active?'#06B6D4':'rgba(255,255,255,0.45)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    </svg>
  ),
  Doctor: ({active}) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active?'#06B6D4':'rgba(255,255,255,0.45)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4"/><path d="M16 2v4"/><rect width="8" height="14" x="8" y="6" rx="1"/><rect width="20" height="8" x="2" y="10" rx="1"/>
      {active && <circle cx="12" cy="14" r="2" fill="#06B6D4" stroke="none"/>}
    </svg>
  ),
  Pill: ({active}) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active?'#EC4899':'rgba(255,255,255,0.45)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>
    </svg>
  ),
  Heart: ({active}) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active?'#EC4899':'none'} stroke={active?'#EC4899':'rgba(255,255,255,0.45)'} strokeWidth="1.8">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Grid: ({active}) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active?'#F59E0B':'rgba(255,255,255,0.45)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="3"/><circle cx="17" cy="7" r="3"/><circle cx="7" cy="17" r="3"/><circle cx="17" cy="17" r="3"/>
    </svg>
  ),
  /* Secondary icons for "More" drawer */
  Savings: ({s=20}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.4-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2"/><path d="M2 9.1C1.2 10 1 11 1 12c0 1.5.5 2.8 1.5 3.8"/>
      <circle cx="12.5" cy="11.5" r="1" fill="#10B981"/>
    </svg>
  ),
  Companion: ({s=20}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Account: ({s=20}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
    </svg>
  ),
  Star: ({s=20}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1.8">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Blog: ({s=20}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
      <path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8z"/>
    </svg>
  ),
  Info: ({s=20}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
    </svg>
  ),
  X: ({s=20}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  ),
  Logout: ({s=20}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  Chevron: ({s=16}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>
  ),
};


/* ── Tab definitions ────────────────────────────────────── */

const PRIMARY_TABS = [
  { id: 'inicio',       label: 'Inicio',       Icon: Icons.Home },
  { id: 'telemedicina', label: 'Médico',        Icon: Icons.Doctor },
  { id: 'farmacia',     label: 'Farmacia',      Icon: Icons.Pill },
  { id: 'terapia',      label: 'Terapia',       Icon: Icons.Heart },
  { id: 'mas',          label: 'Más',           Icon: Icons.Grid },
];

const SECONDARY_ITEMS = [
  { id: 'ahorros',           label: 'Mis Ahorros',        Icon: Icons.Savings,   desc: 'Estado de cuenta de descuentos' },
  { id: 'lupita-fernanda',   label: 'Lupita y Fernanda',  Icon: Icons.Companion, desc: 'Tu compañía por teléfono' },
  { id: 'mi-cuenta',         label: 'Mi Cuenta',          Icon: Icons.Account,   desc: 'Datos y suscripción' },
  { id: 'evaluacion',        label: 'Evalúanos',          Icon: Icons.Star,      desc: 'Ayúdanos a mejorar' },
  { id: 'blog',              label: 'Blog de Salud',      Icon: Icons.Blog,      desc: 'Tips y artículos' },
  { id: 'quienes-somos',     label: 'Quiénes Somos',      Icon: Icons.Info,      desc: 'Nuestra historia' },
];


/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function DashboardShell({
  activeSection = 'inicio',
  onNavigate,
  userName = 'Renata',
  migrantName = 'Carlos',
  userType = 'mexico',
  children,
  onLogout,
}) {
  const [showMore, setShowMore] = useState(false);
  const [currentTab, setCurrentTab] = useState(activeSection);
  const moreRef = useRef(null);

  // Sync external activeSection
  useEffect(() => {
    setCurrentTab(activeSection);
  }, [activeSection]);

  // Close drawer on outside click
  useEffect(() => {
    if (!showMore) return;
    const handler = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setShowMore(false);
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [showMore]);

  const handleTabPress = (id) => {
    if (id === 'mas') {
      setShowMore(!showMore);
      return;
    }
    setShowMore(false);
    setCurrentTab(id);
    onNavigate?.(id);
  };

  const handleSecondaryPress = (id) => {
    setShowMore(false);
    setCurrentTab(id);
    onNavigate?.(id);
  };

  const isSecondary = SECONDARY_ITEMS.some(s => s.id === currentTab);
  const activeLabel = isSecondary
    ? SECONDARY_ITEMS.find(s => s.id === currentTab)?.label
    : null;

  return (
    <>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet"/>

      <div style={styles.shell}>
        {/* ── TOP HEADER ─────────────────────────────── */}
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            <Icons.Logo />
            <div>
              <span style={styles.brandText}>
                Salud<span style={styles.brandAccent}>Compartida</span>
              </span>
            </div>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.statusDot} />
            <span style={styles.userName}>{userName}</span>
            <button style={styles.logoutBtn} onClick={onLogout} aria-label="Salir">
              <Icons.Logout s={18} />
            </button>
          </div>
        </header>

        {/* ── SECONDARY BREADCRUMB (when in secondary screen) ── */}
        {isSecondary && (
          <div style={styles.breadcrumb}>
            <button
              style={styles.breadcrumbBack}
              onClick={() => handleTabPress('inicio')}
            >
              ← Inicio
            </button>
            <span style={styles.breadcrumbSep}>›</span>
            <span style={styles.breadcrumbCurrent}>{activeLabel}</span>
          </div>
        )}

        {/* ── MAIN CONTENT AREA ──────────────────────── */}
        <main style={styles.content}>
          {children}
        </main>

        {/* ── "MORE" DRAWER (slides up from bottom) ──── */}
        {showMore && (
          <>
            <div style={styles.overlay} onClick={() => setShowMore(false)} />
            <div ref={moreRef} style={styles.drawer}>
              <div style={styles.drawerHandle} />
              <div style={styles.drawerHeader}>
                <span style={styles.drawerTitle}>Más opciones</span>
                <button style={styles.drawerClose} onClick={() => setShowMore(false)}>
                  <Icons.X s={18} />
                </button>
              </div>
              <div style={styles.drawerGrid}>
                {SECONDARY_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    style={{
                      ...styles.drawerItem,
                      ...(currentTab === item.id ? styles.drawerItemActive : {}),
                    }}
                    onClick={() => handleSecondaryPress(item.id)}
                  >
                    <div style={styles.drawerIconWrap}>
                      <item.Icon s={22} />
                    </div>
                    <span style={styles.drawerItemLabel}>{item.label}</span>
                    <span style={styles.drawerItemDesc}>{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── BOTTOM TAB BAR ─────────────────────────── */}
        <nav style={styles.tabBar}>
          {PRIMARY_TABS.map((tab) => {
            const isActive = tab.id === 'mas'
              ? showMore || isSecondary
              : currentTab === tab.id;

            return (
              <button
                key={tab.id}
                style={{
                  ...styles.tab,
                  ...(isActive ? styles.tabActive : {}),
                }}
                onClick={() => handleTabPress(tab.id)}
                aria-label={tab.label}
              >
                <tab.Icon active={isActive} />
                <span style={{
                  ...styles.tabLabel,
                  ...(isActive ? styles.tabLabelActive : {}),
                }}>
                  {tab.label}
                </span>
                {isActive && tab.id !== 'mas' && <div style={styles.tabDot} />}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}


/* ═══════════════════════════════════════════════════════════
   STYLES — Inline for zero-dependency portability
   ═══════════════════════════════════════════════════════════ */

const styles = {
  shell: {
    minHeight: '100vh',
    maxWidth: 430,
    margin: '0 auto',
    background: '#0A0F1C',
    color: '#fff',
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  },

  /* Header */
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 20px',
    background: 'rgba(10,15,28,0.95)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  brandText: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 17,
    fontWeight: 400,
    color: '#fff',
    letterSpacing: '-0.3px',
  },
  brandAccent: {
    background: 'linear-gradient(135deg, #06B6D4, #EC4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginLeft: 1,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: '#10B981',
    boxShadow: '0 0 6px rgba(16,185,129,0.5)',
  },
  userName: {
    fontSize: 13,
    fontWeight: 600,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: '0.5px',
  },
  logoutBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
    display: 'flex',
    alignItems: 'center',
    opacity: 0.6,
  },

  /* Breadcrumb for secondary screens */
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 20px',
    background: 'rgba(255,255,255,0.02)',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
  },
  breadcrumbBack: {
    background: 'none',
    border: 'none',
    color: '#06B6D4',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    padding: 0,
  },
  breadcrumbSep: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 14,
  },
  breadcrumbCurrent: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    fontWeight: 500,
  },

  /* Content area */
  content: {
    flex: 1,
    overflowY: 'auto',
    paddingBottom: 90, // Space for bottom tab bar
  },

  /* Bottom tab bar */
  tabBar: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '8px 4px 24px',
    background: 'linear-gradient(to top, rgba(10,15,28,0.99) 60%, rgba(10,15,28,0.95))',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: 430,
    zIndex: 50,
  },
  tab: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '6px 12px',
    borderRadius: 12,
    transition: 'all 0.2s ease',
    position: 'relative',
    minWidth: 56,
  },
  tabActive: {
    background: 'rgba(6,182,212,0.08)',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: 500,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: '0.3px',
    transition: 'color 0.2s ease',
  },
  tabLabelActive: {
    color: '#06B6D4',
    fontWeight: 700,
  },
  tabDot: {
    position: 'absolute',
    bottom: 2,
    width: 3,
    height: 3,
    borderRadius: '50%',
    background: '#06B6D4',
  },

  /* Overlay */
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.6)',
    zIndex: 55,
    backdropFilter: 'blur(4px)',
  },

  /* More drawer */
  drawer: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: 430,
    background: '#111827',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '24px 24px 0 0',
    padding: '12px 20px 100px',
    zIndex: 60,
    animation: 'slideUp 0.25s ease-out',
  },
  drawerHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    background: 'rgba(255,255,255,0.15)',
    margin: '0 auto 16px',
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  drawerTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: 'rgba(255,255,255,0.9)',
  },
  drawerClose: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
  },
  drawerGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
  },
  drawerItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: 6,
    padding: '16px 10px',
    borderRadius: 16,
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.05)',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  drawerItemActive: {
    background: 'rgba(6,182,212,0.1)',
    border: '1px solid rgba(6,182,212,0.25)',
  },
  drawerIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    background: 'rgba(255,255,255,0.04)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerItemLabel: {
    fontSize: 13,
    fontWeight: 700,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 1.2,
  },
  drawerItemDesc: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
    lineHeight: 1.3,
  },
};
