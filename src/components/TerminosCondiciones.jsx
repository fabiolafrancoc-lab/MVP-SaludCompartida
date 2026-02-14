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

        {/* Detalles Legales Acordeones */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            📋 Detalles del servicio
          </h2>
          
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}>
            
            {/* Qué incluye */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <button
                onClick={() => toggleSection('servicios')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  background: openSection === 'servicios' ? 'rgba(255,255,255,0.05)' : 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(16, 185, 129, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>✓</div>
                  <span style={{ fontSize: '15px', fontWeight: '600' }}>¿Qué incluye mi suscripción?</span>
                </div>
                <span style={{ fontSize: '20px' }}>{openSection === 'servicios' ? '−' : '+'}</span>
              </button>
              {openSection === 'servicios' && (
                <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)' }}>
                  <div style={{ fontSize: '13px', lineHeight: '1.7', color: 'rgba(255,255,255,0.8)' }}>
                    <p style={{ marginBottom: '12px' }}>Tu plan mensual puede incluir:</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                      {['Consultas médicas por teléfono o video (24/7)', 'Sesiones de terapia psicológica semanal', 'Acompañamiento con Lupita/Fernanda (asistente virtual)'].map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: '8px' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#06B6D4', marginTop: '6px', flexShrink: 0 }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{
                      background: 'rgba(245, 158, 11, 0.1)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      borderRadius: '8px',
                      padding: '12px',
                    }}>
                      <p style={{ fontSize: '12px', color: '#FCD34D' }}>
                        <strong>Importante:</strong> No cubre emergencias graves ni hospitalizaciones. En una emergencia, llama al 911 o ve a urgencias.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pago */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <button
                onClick={() => toggleSection('pago')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  background: openSection === 'pago' ? 'rgba(255,255,255,0.05)' : 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(59, 130, 246, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>💳</div>
                  <span style={{ fontSize: '15px', fontWeight: '600' }}>¿Cómo funciona el pago?</span>
                </div>
                <span style={{ fontSize: '20px' }}>{openSection === 'pago' ? '−' : '+'}</span>
              </button>
              {openSection === 'pago' && (
                <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)' }}>
                  <div style={{ fontSize: '13px', lineHeight: '1.7', color: 'rgba(255,255,255,0.8)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      'Pagas en dólares (USD) desde Estados Unidos',
                      'El cobro es automático cada mes en tu tarjeta',
                      'Si tu banco cobra comisiones extra, esas van por tu cuenta',
                      'Si subimos el precio, te avisamos antes'
                    ].map((text, i) => (
                      <div key={i} style={{ display: 'flex', gap: '12px' }}>
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: 'rgba(6, 182, 212, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontWeight: '700',
                          color: '#06B6D4',
                          flexShrink: 0,
                        }}>{i + 1}</div>
                        <p>{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cancelación */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <button
                onClick={() => toggleSection('cancelar')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  background: openSection === 'cancelar' ? 'rgba(255,255,255,0.05)' : 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(245, 158, 11, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>⚠️</div>
                  <span style={{ fontSize: '15px', fontWeight: '600' }}>¿Cómo cancelo?</span>
                </div>
                <span style={{ fontSize: '20px' }}>{openSection === 'cancelar' ? '−' : '+'}</span>
              </button>
              {openSection === 'cancelar' && (
                <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)' }}>
                  <div style={{ fontSize: '13px', lineHeight: '1.7', color: 'rgba(255,255,255,0.8)' }}>
                    <p style={{ marginBottom: '12px' }}><strong>Puedes cancelar cuando quieras.</strong> Es fácil:</p>
                    <div style={{ marginLeft: '16px', marginBottom: '16px' }}>
                      <p>• Desde la app o el sitio web</p>
                      <p>• Contactando a servicio al cliente</p>
                    </div>
                    <div style={{
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '8px',
                      padding: '12px',
                      marginBottom: '12px',
                    }}>
                      <p style={{ fontSize: '12px' }}>
                        Al cancelar, ya no te cobramos el siguiente mes. Tu servicio sigue activo hasta que termine el mes que ya pagaste.
                      </p>
                    </div>
                    <div style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      borderRadius: '8px',
                      padding: '10px',
                    }}>
                      <p style={{ fontSize: '11px', color: '#60A5FA' }}>
                        <strong>Nota:</strong> Borrar la app de tu teléfono NO cancela la suscripción. Debes cancelarla directamente.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Términos Legales Florida (Inglés/Español) */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <button
                onClick={() => toggleSection('legal-florida')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  background: openSection === 'legal-florida' ? 'rgba(255,255,255,0.05)' : 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(139, 92, 246, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>⚖️</div>
                  <div>
                    <span style={{ fontSize: '15px', fontWeight: '600', display: 'block' }}>Términos Legales (Suscriptor en EE.UU.)</span>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Florida law • English & Español</span>
                  </div>
                </div>
                <span style={{ fontSize: '20px' }}>{openSection === 'legal-florida' ? '−' : '+'}</span>
              </button>
              {openSection === 'legal-florida' && (
                <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', maxHeight: '400px', overflowY: 'auto' }}>
                  <div style={{ fontSize: '12px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)' }}>
                    
                    <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <p style={{ color: 'white', fontWeight: '700', marginBottom: '8px' }}>A. MASTER TERMS & CONDITIONS (ENGLISH)</p>
                      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>
                        Account Holder pays in the US – Florida law applies
                      </p>
                      
                      <div style={{ marginBottom: '12px' }}>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '600', fontSize: '12px', marginBottom: '4px' }}>
                          1. Provider Identity and Scope
                        </p>
                        <p>
                          Tech Solution Services FVR LLC ("Company", "we", "us") is a limited liability company organized under the laws of the State of Florida, United States of America, and operates the digital health access platform "SaludCompartida" (the "Platform").
                        </p>
                        <p style={{ marginTop: '8px' }}>
                          The contractual relationship under these Terms & Conditions ("Terms") exists between the Company and the Account Holder (the person who pays for the subscription), regardless of the country where the Beneficiaries receive the health services.
                        </p>
                      </div>

                      <div style={{ marginBottom: '12px' }}>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '600', fontSize: '12px', marginBottom: '4px' }}>
                          2. Nature of the Service
                        </p>
                        <p>
                          SaludCompartida is a digital access and coordination platform that connects Beneficiaries located in Mexico with NUEVO MÉTODO and other Providers for the delivery of medical and health-related services.
                        </p>
                        <p style={{ marginTop: '8px' }}>
                          The Company does not itself provide medical care and is not a hospital, clinic, insurance company or health insurer, and does not guarantee any medical outcome.
                        </p>
                      </div>

                      <div style={{ marginBottom: '12px' }}>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '600', fontSize: '12px', marginBottom: '4px' }}>
                          3. Subscription and Payment
                        </p>
                        <p>
                          The monthly subscription fee is charged in United States dollars (USD). Payment is processed automatically through Stripe. Subscription automatically renews each month until cancelled by the Account Holder.
                        </p>
                      </div>

                      <div style={{ marginBottom: '12px' }}>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '600', fontSize: '12px', marginBottom: '4px' }}>
                          4. Governing Law and Dispute Resolution
                        </p>
                        <p>
                          These Terms shall be governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved in the courts of Florida.
                        </p>
                      </div>

                      <div style={{ marginBottom: '12px' }}>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '600', fontSize: '12px', marginBottom: '4px' }}>
                          5. Limitation of Liability
                        </p>
                        <p>
                          To the maximum extent permitted by law, the Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Platform or services.
                        </p>
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <p style={{ color: 'white', fontWeight: '700', marginBottom: '8px' }}>B. TÉRMINOS Y CONDICIONES PRINCIPALES (ESPAÑOL)</p>
                      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>
                        El titular de la cuenta paga en EE.UU. – se aplica la ley de Florida
                      </p>
                      
                      <div style={{ marginBottom: '12px' }}>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '600', fontSize: '12px', marginBottom: '4px' }}>
                          1. Identidad del Proveedor y Alcance
                        </p>
                        <p>
                          Tech Solution Services FVR LLC ("la Compañía", "nosotros") es una sociedad de responsabilidad limitada organizada bajo las leyes del Estado de Florida, Estados Unidos de América, y opera la plataforma digital de acceso a servicios de salud "SaludCompartida" (la "Plataforma").
                        </p>
                        <p style={{ marginTop: '8px' }}>
                          La relación contractual bajo estos Términos y Condiciones existe entre la Compañía y el Titular de la Cuenta (la persona que paga la suscripción), independientemente del país donde los Beneficiarios reciban los servicios de salud.
                        </p>
                      </div>

                      <div style={{ marginBottom: '12px' }}>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '600', fontSize: '12px', marginBottom: '4px' }}>
                          2. Naturaleza del Servicio
                        </p>
                        <p>
                          SaludCompartida es una plataforma digital de acceso y coordinación que conecta a los Beneficiarios ubicados en México con NUEVO MÉTODO y otros Proveedores para la entrega de servicios médicos y relacionados con la salud.
                        </p>
                        <p style={{ marginTop: '8px' }}>
                          La Compañía no proporciona atención médica directamente y no es un hospital, clínica, compañía de seguros o aseguradora de salud, y no garantiza ningún resultado médico.
                        </p>
                      </div>

                      <div style={{ marginBottom: '12px' }}>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '600', fontSize: '12px', marginBottom: '4px' }}>
                          3. Ley Aplicable y Resolución de Disputas
                        </p>
                        <p>
                          Estos Términos se regirán e interpretarán de acuerdo con las leyes del Estado de Florida, sin tener en cuenta sus disposiciones sobre conflictos de leyes. Cualquier disputa que surja de estos Términos se resolverá en los tribunales de Florida.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Derechos de Usuarios en México */}
            <div>
              <button
                onClick={() => toggleSection('derechos-mexico')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  background: openSection === 'derechos-mexico' ? 'rgba(255,255,255,0.05)' : 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(236, 72, 153, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>🇲🇽</div>
                  <div>
                    <span style={{ fontSize: '15px', fontWeight: '600', display: 'block' }}>Derechos de Usuarios en México</span>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Normativa mexicana aplicable</span>
                  </div>
                </div>
                <span style={{ fontSize: '20px' }}>{openSection === 'derechos-mexico' ? '−' : '+'}</span>
              </button>
              {openSection === 'derechos-mexico' && (
                <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)' }}>
                  <div style={{ fontSize: '13px', lineHeight: '1.7', color: 'rgba(255,255,255,0.8)' }}>
                    <p style={{ marginBottom: '12px' }}>Si usas los servicios de salud en México, tienes derecho a:</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {[
                        'Recibir información clara sobre qué incluye tu plan',
                        'Ser atendido por doctores con licencia válida',
                        'Trato digno y respetuoso',
                        'Que tu información de salud sea confidencial',
                        'Presentar quejas ante PROFECO o autoridades de salud mexicanas (COFEPRIS)',
                        'Ejercer tus derechos ARCO (Acceso, Rectificación, Cancelación y Oposición) sobre tus datos personales'
                      ].map((text, i) => (
                        <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
                          <span style={{ color: '#06B6D4', fontSize: '16px' }}>✓</span>
                          <span>{text}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div style={{
                      marginTop: '16px',
                      background: 'rgba(236, 72, 153, 0.1)',
                      border: '1px solid rgba(236, 72, 153, 0.2)',
                      borderRadius: '8px',
                      padding: '12px',
                    }}>
                      <p style={{ fontSize: '12px', color: '#F472B6' }}>
                        <strong>Importante:</strong> Los servicios de salud en México son prestados por NUEVO MÉTODO y proveedores médicos mexicanos, quienes están sujetos a la normativa mexicana de salud (NOM-004-SSA3-2012, Ley General de Salud).
                      </p>
                    </div>
                  </div>
                </div>
              )}
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
            
            <Link 
              href="/contacto"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '12px',
                textDecoration: 'none',
                color: 'white',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            >
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
                <p style={{ fontSize: '14px', fontWeight: '600' }}>Formulario de Contacto</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Escríbenos tus dudas</p>
              </div>
            </Link>
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
