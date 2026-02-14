"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function TerminosCondiciones() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a0f 0%, #111827 50%, #0a0a0f 100%)',
      color: 'white',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      padding: '0',
    }}>
      
      {/* Header */}
      <header style={{
        padding: '24px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <Link 
          href="/" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.5)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.color = '#06B6D4'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}
        >
          ← Volver al inicio
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #06B6D4, #0891B2)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            📄
          </div>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>Términos del Servicio</h1>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>SaludCompartida</p>
          </div>
        </div>
        
        {/* Mensaje de confianza */}
        <div style={{
          background: 'rgba(6, 182, 212, 0.1)',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          gap: '12px',
        }}>
          <div style={{ fontSize: '20px' }}>🛡️</div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: '#06B6D4' }}>
              Tu confianza es lo primero
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
              Queremos que entiendas cómo funciona SaludCompartida. Aquí explicamos todo de forma clara y sencilla.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '24px 20px', maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Lo más importante */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ✓ Lo más importante
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {[
              { emoji: '❤️', title: 'No es seguro médico', desc: 'Es un servicio que te conecta con doctores y servicios de salud', gradient: 'linear-gradient(135deg, #F43F5E, #E11D48)' },
              { emoji: '💳', title: 'Pagas mensual', desc: '$12-18 USD al mes. Puedes cancelar cuando quieras', gradient: 'linear-gradient(135deg, #06B6D4, #0891B2)' },
              { emoji: '👨‍👩‍👧‍👦', title: 'Hasta 4 personas', desc: 'Tu suscripción cubre a tu familia en México', gradient: 'linear-gradient(135deg, #3B82F6, #2563EB)' },
              { emoji: '📍', title: 'Servicio en México', desc: 'Los doctores y servicios están en México. El pago es desde EE.UU.', gradient: 'linear-gradient(135deg, #F59E0B, #D97706)' },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '16px',
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: item.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  marginBottom: '12px',
                }}>
                  {item.emoji}
                </div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{item.title}</h3>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ¿Quiénes participan? */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🏢 ¿Quiénes participan?
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* SaludCompartida */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(6, 182, 212, 0.05))',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: '16px',
              padding: '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'rgba(6, 182, 212, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                }}>
                  🌐
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#06B6D4' }}>SaludCompartida</p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Tech Solution Services FVR LLC • Florida, EE.UU.</p>
                </div>
              </div>
              <p style={{ fontSize: '13px', marginBottom: '12px', lineHeight: '1.6' }}>
                <strong>Plataforma tecnológica</strong> que te permite contratar y pagar tu suscripción desde Estados Unidos.
              </p>
              <div style={{
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '12px',
                padding: '12px',
              }}>
                <p style={{ fontSize: '11px', fontWeight: '600', marginBottom: '8px', color: 'rgba(255,255,255,0.7)' }}>¿Qué hacemos?</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>
                  {['Manejamos la app y el sitio web', 'Procesamos tu pago mensual de forma segura', 'Te damos soporte y atención al cliente', 'Coordinamos que tu familia reciba los servicios'].map((text, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#06B6D4' }} />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                borderRadius: '8px',
                padding: '10px',
                marginTop: '12px',
              }}>
                <p style={{ fontSize: '11px', color: '#FCD34D' }}>
                  <strong>Importante:</strong> SaludCompartida NO es hospital, clínica, ni aseguradora. No damos consultas médicas.
                </p>
              </div>
            </div>

            {/* NUEVO MÉTODO */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '16px',
              padding: '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                }}>
                  ❤️
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#10B981' }}>NUEVO MÉTODO</p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Proveedor de servicios de salud • México</p>
                </div>
              </div>
              <p style={{ fontSize: '13px', marginBottom: '12px', lineHeight: '1.6' }}>
                <strong>Empresa mexicana independiente</strong> que organiza y entrega los servicios de salud a tu familia.
              </p>
              <div style={{
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '12px',
                padding: '12px',
              }}>
                <p style={{ fontSize: '11px', fontWeight: '600', marginBottom: '8px', color: 'rgba(255,255,255,0.7)' }}>¿Qué hacen ellos?</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>
                  {['Tienen convenios con doctores, clínicas y farmacias', 'Verifican que todos tengan licencia para ejercer', 'Coordinan las consultas y servicios en México', 'Cumplen con las leyes de salud mexicanas'].map((text, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#10B981' }} />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Aviso */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              gap: '12px',
            }}>
              <div style={{ fontSize: '16px' }}>⚠️</div>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
                <strong>Son empresas independientes.</strong> SaludCompartida y NUEVO MÉTODO no son la misma empresa ni tienen los mismos dueños. Trabajan juntas para darte el servicio, cada una con su responsabilidad.
              </p>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.1))',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '32px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(6, 182, 212, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
            }}>
              ❓
            </div>
            <div>
              <p style={{ fontSize: '16px', fontWeight: '600' }}>¿Tienes preguntas?</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Estamos aquí para ayudarte</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a 
              href="https://wa.me/17869648040?text=Hola,%20tengo%20preguntas%20sobre%20los%20términos" 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(34, 197, 94, 0.2)',
                borderRadius: '12px',
                padding: '12px',
                textDecoration: 'none',
                color: 'white',
                transition: 'background 0.2s',
              }}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(34, 197, 94, 0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)'}
            >
              <div style={{
                width: '40px',
                height: '40px',
                background: '#22C55E',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
              }}>
                📱
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: '600' }}>WhatsApp</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Respuesta rápida</p>
              </div>
            </a>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '12px',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
              }}>
                ✉️
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: '600' }}>contact@saludcompartida.com</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Escríbenos</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ textAlign: 'center', padding: '24px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>
            Última actualización: Febrero 2026
          </p>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
            Tech Solution Services FVR LLC • Florida, EE.UU.
          </p>
          <Link 
            href="/" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: '#06B6D4',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.color = '#0891B2'}
            onMouseLeave={(e) => e.target.style.color = '#06B6D4'}
          >
            ← Volver al inicio
          </Link>
        </footer>

      </main>
    </div>
  );
}
