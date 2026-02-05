'use client';
import { useState, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════
   AHORROS — Mis Ahorros Desglosados
   Statement aspiracional · Animated counter · Service breakdown
   
   Props: userType ('mexico'|'migrant'), onBack (fn)
   ═══════════════════════════════════════════════════════════════ */

const DollarIcon = ({s=22,c='#fff'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
const ArrIcon = ({s=20,c='currentColor'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;
const TrendIcon = ({s=18,c='currentColor'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
const HrtIcon = ({s=16,c='#EC4899'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;

const SAVINGS = [
  { date: '30 Ene', service: 'Consulta Telemedicina', original: 850, paid: 0, saved: 850, color: '#06B6D4' },
  { date: '28 Ene', service: 'Farmacia — Omeprazol + Vitaminas', original: 620, paid: 186, saved: 434, color: '#8B5CF6' },
  { date: '25 Ene', service: 'Sesión Terapia Psicológica', original: 900, paid: 0, saved: 900, color: '#F59E0B' },
  { date: '22 Ene', service: 'Farmacia — Paracetamol + Crema', original: 340, paid: 119, saved: 221, color: '#8B5CF6' },
  { date: '18 Ene', service: 'Consulta Telemedicina', original: 850, paid: 0, saved: 850, color: '#06B6D4' },
];

const POTENTIAL = [
  { service: 'Videollamada con Doctor', desc: 'En vez de ir al consultorio', normal: 850, saved: 850, color: '#06B6D4' },
  { service: 'Farmacia con descuento', desc: 'Medicamentos y productos del hogar', normal: 620, saved: 434, color: '#8B5CF6' },
  { service: 'Sesión de Terapia', desc: 'Una sesión semanal de 50 min incluida', normal: 900, saved: 900, color: '#F59E0B' },
  { service: 'Belleza y cuidado personal', desc: 'Maquillaje, cremas en farmacia', normal: 340, saved: 221, color: '#EC4899' },
];

const totalSavings = SAVINGS.reduce((s, i) => s + i.saved, 0);
const totalPotential = POTENTIAL.reduce((s, i) => s + i.saved, 0);

export default function Ahorros({ userType = 'mexico', onBack }) {
  const [animated, setAnimated] = useState(0);
  const [tab, setTab] = useState(0); // 0=actual, 1=potencial
  const migrantName = 'Fabiola';

  useEffect(() => {
    const target = tab === 0 ? totalSavings : totalPotential;
    let c = 0;
    const step = Math.ceil(target / 40);
    const t = setInterval(() => {
      c += step;
      if (c >= target) { c = target; clearInterval(t); }
      setAnimated(c);
    }, 30);
    return () => clearInterval(t);
  }, [tab]);

  const S = {
    page: { minHeight: '100vh', background: '#111827', color: '#fff', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", maxWidth: 430, margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
    section: { padding: '0 20px 32px' },
    sTitle: { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(255,255,255,0.35)', marginBottom: 14, marginTop: 28 },
  };

  return (
    <div style={S.page}>
      <div style={S.header}>
        <img src="/saludcompartida-dark-no-tagline.png" alt="SaludCompartida" style={{ height: 40 }} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', marginRight: 6, boxShadow: '0 0 8px #10B981' }} />
          <span style={{ fontSize: 12, color: '#10B981', fontWeight: 600 }}>Activo</span>
        </div>
      </div>

      <div style={S.section}>
        <div style={{ paddingTop: 12, marginBottom: 8, cursor: 'pointer' }} onClick={onBack}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 700, color: '#FFFFFF' }}>
            <ArrIcon s={18} c="#FFFFFF" /> VOLVER
          </span>
        </div>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 72, height: 72, borderRadius: 22, background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <DollarIcon s={36} c="#10B981" />
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, marginBottom: 8, lineHeight: 1.3 }}>
            Tus <span style={{ color: '#10B981' }}>Ahorros</span>
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {['Este mes', 'Potencial mensual'].map((label, i) => (
            <div
              key={i}
              onClick={() => setTab(i)}
              style={{
                flex: 1, textAlign: 'center', padding: '10px 0', borderRadius: 12,
                background: tab === i ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${tab === i ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.06)'}`,
                color: tab === i ? '#10B981' : 'rgba(255,255,255,0.5)',
                fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Main counter */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(6,182,212,0.08))',
          border: '1px solid rgba(16,185,129,0.15)',
          borderRadius: 16, padding: '20px 16px', marginBottom: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #059669, #10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {tab === 0 ? <DollarIcon s={22} /> : <TrendIcon s={22} c="#fff" />}
            </div>
            <div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>
                {tab === 0 ? 'Ahorraste este mes' : 'Podrías ahorrar hasta'}
              </p>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: '#10B981' }}>
                ${animated.toLocaleString()} <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>MXN</span>
              </p>
            </div>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
            {tab === 0
              ? `Usando los servicios que ${migrantName} paga para ti y tu familia:`
              : `Usando los servicios que ${migrantName} ya pagó para ti y tu familia:`
            }
          </p>
        </div>

        {/* Breakdown */}
        {tab === 0 ? (
          <>
            <p style={S.sTitle}>Detalle de transacciones</p>
            {SAVINGS.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 14, marginBottom: 8,
              }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <DollarIcon s={18} c={s.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{s.service}</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{s.date}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#10B981' }}>-${s.saved}</p>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through' }}>${s.original}</p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <p style={S.sTitle}>Desglose por servicio</p>
            {POTENTIAL.map((p, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 14, marginBottom: 8,
              }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: `${p.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <DollarIcon s={18} c={p.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{p.service}</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{p.desc}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#10B981' }}>-${p.saved}</p>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through' }}>${p.normal}</p>
                </div>
              </div>
            ))}
          </>
        )}

        {/* CTA */}
        <div style={{
          marginTop: 16, padding: '14px 16px', borderRadius: 12,
          background: 'rgba(16,185,129,0.1)', textAlign: 'center',
        }}>
          <p style={{ fontSize: 13, color: '#10B981', fontWeight: 600, lineHeight: 1.5 }}>
            Estos servicios ya están pagados para ti.
          </p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>
            Cada vez que los usas, ahorras dinero real.
          </p>
        </div>

        {/* Emotional */}
        <div style={{ background: 'rgba(236,72,153,0.06)', border: '1px solid rgba(236,72,153,0.15)', borderRadius: 16, padding: 18, textAlign: 'center', marginTop: 20 }}>
          <HrtIcon />
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginTop: 8 }}>
            <span style={{ color: '#06B6D4', fontWeight: 600 }}>{migrantName}</span> está orgulloso de que uses estos servicios. Cada peso que ahorras <b style={{ color: '#10B981' }}>es una victoria para tu familia</b>.
          </p>
        </div>

        <div style={{ textAlign: 'center', paddingTop: 24 }}>
          <span onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}><ArrIcon s={16} c="rgba(255,255,255,0.4)" /> Volver</span>
        </div>
      </div>

      <div style={{ padding: '28px 20px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 12 }}>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textAlign: 'center', fontStyle: 'italic' }}>&ldquo;SaludCompartida, donde está tu corazón&rdquo;</p>
      </div>
    </div>
  );
}
