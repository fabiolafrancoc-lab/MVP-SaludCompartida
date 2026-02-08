import React from 'react';

const HeaderNew = () => {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '12px 20px',
        background: 'rgba(31, 41, 55, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(6, 182, 212, 0.2)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Logo - Izquierda */}
        <a 
          href="/" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            textDecoration: 'none',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#06B6D4" strokeWidth="2"/>
            <path d="M16 8v8l6 4" stroke="#EC4899" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: '16px', fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <span style={{ color: '#06B6D4' }}>Salud</span>
            <span style={{ color: '#FFFFFF' }}>Compartida</span>
          </span>
        </a>

        {/* Navegación - Derecha */}
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="/salud" style={linkStyle}>Salud</a>
          <a href="/nunca-mas-sola" style={linkStyle}>Nunca mas Sola</a>
          <a href="/ahorro" style={linkStyle}>Ahorro</a>
          <a href="/cuenta" style={linkStyle}>Cuenta</a>
          <a href="/" style={buttonStyle}>Volver</a>
        </nav>
      </div>
    </header>
  );
};

const linkStyle = {
  color: '#FFFFFF',
  fontSize: '14px',
  fontWeight: 500,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  textDecoration: 'none',
  transition: 'color 0.2s ease',
};

const buttonStyle = {
  padding: '8px 16px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 600,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  textDecoration: 'none',
  background: 'linear-gradient(135deg, #EC4899, #DB2777)',
  color: '#FFFFFF',
  transition: 'all 0.2s ease',
};

export default HeaderNew;
