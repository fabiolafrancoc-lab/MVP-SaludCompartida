'use client';
import { useState } from 'react';

/* ═══════════════════════════════════════════════════════════════
   FARMACIA — Descuentos en Farmacias
   Tarjeta Platinum · QR · Descuento sobre descuento · 1,700+
   
   Props: userType ('mexico'|'migrant'), onBack (fn)
   ═══════════════════════════════════════════════════════════════ */

const TagIcon = ({s=22,c='#fff'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill={c}/></svg>;
const MapIcon = ({s=18,c='currentColor'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const DollarIcon = ({s=18,c='currentColor'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
const ArrIcon = ({s=20,c='currentColor'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;
const PillIcon = ({s=18,c='currentColor'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>;
const SparkIcon = ({s=18,c='currentColor'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;
const HomeIcon = ({s=18,c='currentColor'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const StarIcon = ({s=14,c='#F59E0B'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke={c} strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;

const QRCode = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect width="64" height="64" rx="4" fill="#fff"/>
    <rect x="4" y="4" width="18" height="18" rx="2" stroke="#111827" strokeWidth="3" fill="none"/>
    <rect x="8" y="8" width="10" height="10" rx="1" fill="#111827"/>
    <rect x="42" y="4" width="18" height="18" rx="2" stroke="#111827" strokeWidth="3" fill="none"/>
    <rect x="46" y="8" width="10" height="10" rx="1" fill="#111827"/>
    <rect x="4" y="42" width="18" height="18" rx="2" stroke="#111827" strokeWidth="3" fill="none"/>
    <rect x="8" y="46" width="10" height="10" rx="1" fill="#111827"/>
    <rect x="26" y="4" width="4" height="4" fill="#111827"/><rect x="34" y="4" width="4" height="4" fill="#111827"/>
    <rect x="26" y="12" width="4" height="4" fill="#111827"/><rect x="30" y="8" width="4" height="4" fill="#111827"/>
    <rect x="26" y="26" width="4" height="4" fill="#111827"/><rect x="30" y="30" width="4" height="4" fill="#111827"/>
    <rect x="34" y="26" width="4" height="4" fill="#111827"/><rect x="42" y="26" width="4" height="4" fill="#111827"/>
    <rect x="50" y="26" width="4" height="4" fill="#111827"/><rect x="26" y="34" width="4" height="4" fill="#111827"/>
    <rect x="34" y="34" width="4" height="4" fill="#111827"/><rect x="42" y="34" width="4" height="4" fill="#111827"/>
    <rect x="50" y="42" width="4" height="4" fill="#111827"/><rect x="42" y="50" width="4" height="4" fill="#111827"/>
    <rect x="50" y="50" width="4" height="4" fill="#111827"/><rect x="46" y="46" width="4" height="4" fill="#111827"/>
    <rect x="54" y="54" width="6" height="6" rx="1" fill="#111827"/>
  </svg>
);

const CATEGORIES = [
  { icon: <PillIcon s={20} c="#06B6D4" />, label: 'Medicamentos', desc: 'Recetados y genéricos', discount: '40-75%', color: '#06B6D4' },
  { icon: <SparkIcon s={20} c="#EC4899" />, label: 'Belleza', desc: 'Maquillaje, cremas, esmaltes', discount: '30-60%', color: '#EC4899' },
  { icon: <HomeIcon s={20} c="#8B5CF6" />, label: 'Hogar', desc: 'Pañales, leche, papel higiénico', discount: '25-50%', color: '#8B5CF6' },
];

const FARMACIAS = [
  { name: 'Farmacias Guadalajara', dist: '0.8 km', discount: '60%', rating: 4.8 },
  { name: 'Farmacias Benavides', dist: '1.2 km', discount: '55%', rating: 4.7 },
  { name: 'Farmacia del Ahorro', dist: '1.5 km', discount: '50%', rating: 4.6 },
  { name: 'Farmacias Similares', dist: '2.1 km', discount: '65%', rating: 4.5 },
];

export default function Farmacia({ userType = 'mexico', onBack }) {
  const [showLocation, setShowLocation] = useState(false);
  const userName = 'María García';
  const convenioNumber = 'SC-847291';
  const migrantName = 'Carlos';

  const S = {
    page: { minHeight: '100vh', background: '#111827', color: '#fff', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", maxWidth: 430, margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
    section: { padding: '0 20px 32px' },
    sTitle: { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(255,255,255,0.35)', marginBottom: 14, marginTop: 28 },
    card: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '18px 16px', marginBottom: 12 },
    badge: { display: 'inline-block', padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600 },
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
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            <ArrIcon s={16} c="rgba(255,255,255,0.4)" /> Volver
          </span>
        </div>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 72, height: 72, borderRadius: 22, background: 'rgba(139,92,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <TagIcon s={36} c="#8B5CF6" />
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, marginBottom: 8, lineHeight: 1.3 }}>
            Descuentos en<br /><span style={{ color: '#8B5CF6' }}>Farmacias</span>
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, maxWidth: 320, margin: '0 auto' }}>
            Hasta 75% de descuento en medicamentos, belleza, hogar y más. En más de 1,700 farmacias.
          </p>
        </div>

        {/* TARJETA PLATINUM */}
        <p style={S.sTitle}>Tu tarjeta de descuento</p>
        <div style={{
          background: 'linear-gradient(145deg, #1a1a2e, #16213e, #0f3460)',
          borderRadius: 20, padding: '24px 20px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
          marginBottom: 16, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase' }}>Platinum Member</p>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: '#fff', marginTop: 4 }}>SaludCompartida</p>
            </div>
            <QRCode />
          </div>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '10px 14px', marginBottom: 14 }}>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 2 }}>TITULAR</p>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{userName}</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '10px 14px' }}>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 2 }}>CONVENIO</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#F59E0B', fontFamily: 'monospace' }}>{convenioNumber}</p>
            </div>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '10px 14px' }}>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 2 }}>DESCUENTO</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#10B981' }}>Hasta 75%</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Red de farmacias</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#8B5CF6' }}>+1,700</span>
          </div>
        </div>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: 20 }}>Muestra esta tarjeta o el código QR en la farmacia</p>

        {/* DESCUENTO SOBRE DESCUENTO */}
        <div style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.12), rgba(139,92,246,0.12))', border: '1px solid rgba(236,72,153,0.25)', borderRadius: 16, padding: 18, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg, #EC4899, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <DollarIcon s={20} c="#fff" />
            </div>
            <p style={{ fontSize: 16, fontWeight: 800, color: '#EC4899' }}>Descuento sobre Descuento</p>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
            ¿Ya tienes descuentos en tu farmacia favorita? <b style={{ color: '#fff' }}>Nuestro descuento se aplica sobre el precio ya rebajado.</b> Maximiza tus ahorros en cada compra.
          </p>
        </div>

        {/* CATEGORÍAS */}
        <p style={S.sTitle}>Descuentos en todo lo que necesitas</p>
        {CATEGORIES.map((cat, i) => (
          <div key={i} style={S.card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{cat.icon}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{cat.label}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{cat.desc}</p>
              </div>
              <span style={{ ...S.badge, background: `${cat.color}20`, color: cat.color, fontWeight: 700, fontSize: 13 }}>{cat.discount}</span>
            </div>
          </div>
        ))}

        {/* UBICACIÓN */}
        <p style={S.sTitle}>Farmacias cerca de ti</p>
        {!showLocation ? (
          <div onClick={() => setShowLocation(true)} style={{ background: 'rgba(255,255,255,0.04)', border: '2px dashed rgba(139,92,246,0.3)', borderRadius: 16, padding: 24, textAlign: 'center', cursor: 'pointer' }}>
            <MapIcon s={32} c="#8B5CF6" />
            <p style={{ fontSize: 15, fontWeight: 700, color: '#8B5CF6', marginTop: 12, marginBottom: 4 }}>¿Compartir mi ubicación?</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Te mostramos las farmacias más cercanas con los mejores descuentos</p>
          </div>
        ) : (
          <div>
            {FARMACIAS.map((f, i) => (
              <div key={i} style={{ ...S.card, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><MapIcon s={20} c="#8B5CF6" /></div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{f.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{f.dist}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}><StarIcon /> <span style={{ fontSize: 11, color: '#F59E0B' }}>{f.rating}</span></span>
                  </div>
                </div>
                <span style={{ ...S.badge, background: 'rgba(16,185,129,0.15)', color: '#10B981', fontWeight: 700, fontSize: 13 }}>-{f.discount}</span>
              </div>
            ))}
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginTop: 8 }}>Mostrando 4 de +1,700 farmacias disponibles</p>
          </div>
        )}

        {/* Emotional */}
        <div style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.15)', borderRadius: 16, padding: 18, textAlign: 'center', marginTop: 20 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
            <span style={{ color: '#06B6D4', fontWeight: 600 }}>{migrantName}</span> ya pagó por estos descuentos para ti. Cada vez que compras con tu tarjeta, <b style={{ color: '#10B981' }}>ahorras dinero real</b>.
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
