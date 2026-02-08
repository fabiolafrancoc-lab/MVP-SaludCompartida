import React from 'react';

const GiftBanner = ({ usuario = "Usuario", migrante = "Migrante" }) => {
  return (
    <div style={{
      marginTop: '60px',
      padding: '24px 20px',
      background: 'linear-gradient(135deg, #EC4899, #DB2777)',
      textAlign: 'center',
    }}>
      <h1 style={{
        fontSize: '28px',
        fontWeight: 700,
        color: '#FFFFFF',
        marginBottom: '8px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        Un regalo para ti
      </h1>
      <p style={{
        fontSize: '16px',
        color: '#FFFFFF',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        Hola <strong>{usuario}</strong>, <strong>{migrante}</strong> te envía de Regalo SaludCompartida
      </p>
    </div>
  );
};

export default GiftBanner;
