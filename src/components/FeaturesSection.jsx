import React, { useState } from 'react';

const FeaturesSection = () => {
  const [expandedTele, setExpandedTele] = useState(false);
  const [expandedFarm, setExpandedFarm] = useState(false);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* TELEMEDICINA */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '24px',
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 700,
          color: '#1F2937',
          marginBottom: '16px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          Lo que SaludCompartida incluye:
        </h2>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#06B6D4', marginBottom: '8px' }}>
              Videollamada con Doctor 24/7
            </h3>
            <p style={{ fontSize: '16px', color: '#6B7280' }}>
              Conéctate vía WhatsApp y serás atendida inmediatamente
            </p>
          </div>

          <button
            onClick={() => setExpandedTele(!expandedTele)}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: expandedTele ? '#06B6D4' : '#FFFFFF',
              border: '2px solid #06B6D4',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              transform: expandedTele ? 'rotate(90deg)' : 'rotate(0deg)',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke={expandedTele ? '#FFFFFF' : '#06B6D4'} strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {expandedTele && (
          <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <img src="/girldoctor.jpeg" alt="Doctora" style={{ width: '33%', borderRadius: '12px', objectFit: 'cover' }} />
              <div style={{ width: '33%', background: 'linear-gradient(135deg, #EC4899, #DB2777)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '32px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>100</h4>
                  <p style={{ fontSize: '16px', color: '#FFFFFF' }}>Frases Mexicanas</p>
                </div>
              </div>
              <img src="/momhappy.jpeg" alt="Mamá e hija" style={{ width: '33%', borderRadius: '12px', objectFit: 'cover' }} />
            </div>

            <div style={{ background: '#F9FAFB', borderRadius: '12px', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="#25D366"/>
                <path d="M33.5 14.3c-2.6-2.6-6.1-4-9.8-4-7.6 0-13.8 6.2-13.8 13.8 0 2.4.6 4.8 1.8 6.9L10 38l7.2-1.9c2 1.1 4.3 1.6 6.6 1.6h.006c7.6 0 13.8-6.2 13.8-13.8 0-3.7-1.4-7.2-4-9.8zm-9.8 21.2c-2.1 0-4.1-.6-5.9-1.6l-.4-.2-4.3 1.1 1.1-4.2-.3-.4c-1.2-1.9-1.8-4.1-1.8-6.3 0-6.5 5.3-11.8 11.8-11.8 3.1 0 6.1 1.2 8.3 3.5 2.2 2.2 3.5 5.2 3.5 8.3-.1 6.5-5.4 11.8-12 11.8zm6.5-8.9c-.4-.2-2.1-1-2.4-1.1-.3-.1-.6-.2-.8.2-.2.4-.9 1.1-1.1 1.3-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.7.2-.2.3-.4.4-.7.1-.2 0-.5-.1-.7-.1-.2-.8-2-1.1-2.7-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-1 .5-.3.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.8c.2.2 2.4 3.7 5.9 5.2.8.3 1.5.5 2 .7.8.3 1.6.2 2.2.1.7-.1 2.1-.9 2.4-1.7.3-.8.3-1.5.2-1.7-.1-.2-.3-.3-.7-.5z" fill="white"/>
              </svg>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '18px', fontWeight: 600, color: '#1F2937', marginBottom: '4px' }}>
                  Llámanos de Lunes a Viernes
                </p>
                <p style={{ fontSize: '14px', color: '#6B7280' }}>
                  Las 24 horas del día estamos para apoyarte
                </p>
              </div>
              <a href="https://wa.me/1234567890" style={{ padding: '12px 24px', borderRadius: '8px', background: '#25D366', color: '#FFFFFF', fontWeight: 600, textDecoration: 'none' }}>
                Contactar
              </a>
            </div>
          </div>
        )}
      </div>

      {/* FARMACIAS */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#10B981', marginBottom: '8px' }}>
              Descuento en Farmacias
            </h3>
            <p style={{ fontSize: '16px', color: '#6B7280' }}>
              En medicamentos, productos para el hogar y productos para ti
            </p>
          </div>

          <button
            onClick={() => setExpandedFarm(!expandedFarm)}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: expandedFarm ? '#10B981' : '#FFFFFF',
              border: '2px solid #10B981',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              transform: expandedFarm ? 'rotate(90deg)' : 'rotate(0deg)',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke={expandedFarm ? '#FFFFFF' : '#10B981'} strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {expandedFarm && (
          <div style={{ marginTop: '24px' }}>
            <div style={{ marginBottom: '24px' }}>
              <img src="/telemedicinepic.jpeg" alt="Farmacia" style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', maxHeight: '300px' }} />
            </div>

            <div style={{ background: '#F0FDF4', borderRadius: '12px', padding: '24px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: 600, color: '#1F2937', marginBottom: '16px' }}>
                Cómo utilizar tu descuento vía WhatsApp:
              </h4>
              <ol style={{ paddingLeft: '20px', color: '#6B7280', lineHeight: '1.8' }}>
                <li>Envía un mensaje a nuestro WhatsApp</li>
                <li>Indica qué medicamento o producto necesitas</li>
                <li>Recibe tu código de descuento al instante</li>
                <li>Presenta el código en la farmacia afiliada</li>
              </ol>
              <a href="https://wa.me/1234567890" style={{ display: 'inline-block', marginTop: '16px', padding: '12px 24px', borderRadius: '8px', background: '#10B981', color: '#FFFFFF', fontWeight: 600, textDecoration: 'none' }}>
                Solicitar Descuento
              </a>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default FeaturesSection;
