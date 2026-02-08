'use client';

import { useState, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════
   INICIO — Dashboard Home Screen
   
   The first thing the user sees after login.
   Card-based, emotional, clear service access.
   Mobile-first 375px, Platinum UX.
   ═══════════════════════════════════════════════════════════ */

const I = {
  Doctor: ({s=28}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="8" height="14" x="8" y="6" rx="1"/><rect width="20" height="8" x="2" y="10" rx="1"/></svg>,
  Pill: ({s=28}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>,
  Brain: ({s=28}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 1 4 4 7 7 0 0 1 3 6c0 4-3 7-7 7s-7-3-7-7a7 7 0 0 1 3-6 4 4 0 0 1 4-4z"/><path d="M12 2v20"/></svg>,
  Heart: ({s=28}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="#EC4899" stroke="#EC4899" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Savings: ({s=28}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.4-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2"/><circle cx="12.5" cy="11.5" r="1" fill="#10B981"/></svg>,
  Arrow: ({s=16}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>,
};

const SERVICES = [
  {
    id: 'telemedicina',
    icon: I.Doctor,
    title: 'Médico 24/7',
    subtitle: 'Videollamada con doctor',
    tag: 'ILIMITADO',
    tagColor: '#06B6D4',
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.12), rgba(6,182,212,0.04))',
    border: 'rgba(6,182,212,0.2)',
  },
  {
    id: 'farmacia',
    icon: I.Pill,
    title: 'Farmacia',
    subtitle: 'Descuentos 40-75%',
    tag: '1,700+ FARMACIAS',
    tagColor: '#EC4899',
    gradient: 'linear-gradient(135deg, rgba(236,72,153,0.12), rgba(236,72,153,0.04))',
    border: 'rgba(236,72,153,0.2)',
  },
  {
    id: 'terapia',
    icon: I.Brain,
    title: 'Terapia',
    subtitle: 'Psicólogo profesional',
    tag: 'CONFIDENCIAL',
    tagColor: '#8B5CF6',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(139,92,246,0.04))',
    border: 'rgba(139,92,246,0.2)',
  },
];

export default function Inicio({
  userName = 'Renata',
  migrantName = 'Carlos',
  userType = 'mexico',
  onNavigate,
}) {
  const [greeting, setGreeting] = useState('Buenos días');
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? 'Buenos días' : h < 18 ? 'Buenas tardes' : 'Buenas noches');
    setTimeout(() => setAnimateIn(true), 50);
  }, []);

  const isMig = userType === 'migrant';

  return (
    <div style={{ padding: '0 20px 24px', opacity: animateIn ? 1 : 0, transition: 'opacity 0.4s ease' }}>

      {/* ── Greeting ────────────────────────────── */}
      <div style={{ paddingTop: 24, marginBottom: 28 }}>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', fontWeight: 500, marginBottom: 4 }}>{greeting}</p>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 28,
          lineHeight: 1.25,
          margin: 0,
          color: '#fff',
        }}>
          {isMig
            ? <>Hola, <span style={{ color: '#06B6D4' }}>{userName}</span></>
            : <>{userName}, <span style={{ color: '#06B6D4' }}>{migrantName}</span> te cuida</>
          }
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginTop: 8 }}>
          {isMig
            ? 'Tu familia tiene acceso a doctor, medicinas y compañía.'
            : 'Tienes acceso a médico, medicinas, terapia y compañía para ti y tu familia.'
          }
        </p>
      </div>

      {/* ── Emotional banner ──────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(6,182,212,0.08))',
        border: '1px solid rgba(236,72,153,0.15)',
        borderRadius: 16,
        padding: '16px 18px',
        marginBottom: 28,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
      }}>
        <div style={{ flexShrink: 0, marginTop: 2 }}>
          <I.Heart s={22} />
        </div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, margin: 0 }}>
          {isMig
            ? <><b style={{ color: '#EC4899' }}>{userName}</b>, tu familia ya tiene acceso a todos los servicios. Cada vez que los usan, tú cuidas aunque estés lejos.</>
            : <><b style={{ color: '#EC4899' }}>{migrantName}</b> eligió SaludCompartida para que tú y tu familia estén protegidos. Es su forma de estar cerca, aunque esté lejos.</>
          }
        </p>
      </div>

      {/* ── Quick stats ──────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 10,
        marginBottom: 28,
      }}>
        {[
          { num: '4', label: 'Miembros', color: '#06B6D4' },
          { num: '$3,255', label: 'Ahorrado', color: '#10B981' },
          { num: '24/7', label: 'Acceso', color: '#F59E0B' },
        ].map((s, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 14,
            padding: '14px 10px',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 22, fontWeight: 800, color: s.color, letterSpacing: '-0.5px', margin: 0 }}>{s.num}</p>
            <p style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginTop: 3, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Label ───────────────────────────────── */}
      <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>
        Tus servicios
      </p>

      {/* ── Service cards ─────────────────────────── */}
      {SERVICES.map((svc, idx) => (
        <button
          key={svc.id}
          onClick={() => onNavigate?.(svc.id)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '18px 16px',
            background: svc.gradient,
            border: `1px solid ${svc.border}`,
            borderRadius: 16,
            cursor: 'pointer',
            marginBottom: 10,
            textAlign: 'left',
            transition: 'transform 0.15s ease',
            color: '#fff',
            animation: animateIn ? `fadeSlideIn 0.4s ease ${idx * 0.08}s both` : 'none',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {/* Icon */}
          <div style={{
            width: 50,
            height: 50,
            borderRadius: 14,
            background: 'rgba(255,255,255,0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svc.icon />
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 16, fontWeight: 700, margin: '0 0 3px' }}>{svc.title}</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: 0 }}>{svc.subtitle}</p>
          </div>

          {/* Tag + arrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <span style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.5px',
              padding: '4px 8px',
              borderRadius: 6,
              background: `${svc.tagColor}18`,
              color: svc.tagColor,
              whiteSpace: 'nowrap',
            }}>
              {svc.tag}
            </span>
            <I.Arrow />
          </div>
        </button>
      ))}

      {/* ── Secondary row (Ahorros + Lupita) ─────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
        <button
          onClick={() => onNavigate?.('ahorros')}
          style={{
            padding: '16px 14px',
            background: 'rgba(16,185,129,0.06)',
            border: '1px solid rgba(16,185,129,0.15)',
            borderRadius: 14,
            cursor: 'pointer',
            textAlign: 'center',
            color: '#fff',
            transition: 'transform 0.15s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <I.Savings s={24} />
          <p style={{ fontSize: 13, fontWeight: 700, margin: '8px 0 2px' }}>Mis Ahorros</p>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', margin: 0 }}>$3,255 MXN este mes</p>
        </button>

        <button
          onClick={() => onNavigate?.('lupita-fernanda')}
          style={{
            padding: '16px 14px',
            background: 'rgba(139,92,246,0.06)',
            border: '1px solid rgba(139,92,246,0.15)',
            borderRadius: 14,
            cursor: 'pointer',
            textAlign: 'center',
            color: '#fff',
            transition: 'transform 0.15s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <p style={{ fontSize: 13, fontWeight: 700, margin: '8px 0 2px' }}>Lupita y Fernanda</p>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', margin: 0 }}>Tu compañía siempre</p>
        </button>
      </div>

      {/* ── Footer tagline ────────────────────────── */}
      <p style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: 14,
        fontStyle: 'italic',
        color: 'rgba(255,255,255,0.25)',
        textAlign: 'center',
        marginTop: 32,
        paddingBottom: 8,
      }}>
        Donde está tu corazón, está SaludCompartida
      </p>

      {/* Keyframe animation */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { transform: translate(-50%, 100%); }
          to { transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}
