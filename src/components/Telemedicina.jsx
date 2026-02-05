'use client';
import { useState, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════
   TELEMEDICINA — Usuario México 🇲🇽
   Videollamada con Doctores 24/7
   Carousel de frases mexicanas · WhatsApp CTA · Emotional card
   
   Props: userType ('mexico'|'migrant'), onBack (fn)
   Design: Plus Jakarta Sans + DM Serif Display
   Colors: Cyan #06B6D4, Magenta #EC4899
   ═══════════════════════════════════════════════════════════════ */

const PHRASES = [
  { text: "El chamaco trae la panza suelta", color: "#FF6B6B" },
  { text: "Mi escuincle anda con la calentura bien alta", color: "#4ECDC4" },
  { text: "La criatura no quiere comer ni jugar, está apachurrada", color: "#FFD93D" },
  { text: "Le salió una roncha bien rara al chamaquito", color: "#95E1D3" },
  { text: "Se me enchiló el nene, ¿qué le doy para la picazón?", color: "#F38181" },
  { text: "Doctor, anoche me eché unas copitas y ahora traigo la cruda del siglo", color: "#AA96DA" },
  { text: "¿Qué me recomienda pa' bajarme el mal del puerco?", color: "#FCBAD3" },
  { text: "Me anda cargando el payaso, doctor", color: "#A8D8EA" },
  { text: "Siento que ya me llevó el tren", color: "#FFB6B9" },
  { text: "Ando tumbado, me dio bajón", color: "#FEC8D8" },
  { text: "Traigo un moco pegado", color: "#957DAD" },
  { text: "La cabeza me late como tambora", color: "#FFE66D" },
  { text: "Tengo el cuerpo cortado, como si me hubieran dado una arrastrada", color: "#6BCB77" },
  { text: "Se me aflojó el estómago", color: "#FF6B9D" },
  { text: "Tengo la garganta hecha trizas", color: "#C9ADA7" },
  { text: "Mi mujer dice que ya estoy 'llorón', pero sí me siento mal", color: "#FFA5A5" },
  { text: "¿Qué le doy a mi suegra, que también anda echando grilla?", color: "#9CAFB7" },
  { text: "Me anda dando el patatús", color: "#E7B2A5" },
  { text: "No me hallo", color: "#AAC4FF" },
  { text: "Tengo el cuerpo cortado", color: "#D4A5A5" },
];

/* ── SVG Icons ── */
const VidIcon = ({ s = 22, c = '#fff' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z" /><rect width="14" height="12" x="2" y="6" rx="2" /></svg>;
const BookIcon = ({ s = 22, c = '#fff' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>;
const ActIcon = ({ s = 22, c = '#fff' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>;
const WAIcon = ({ s = 28, c = '#fff' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>;
const ClkIcon = ({ s = 14, c = 'currentColor' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
const ShdIcon = ({ s = 18, c = 'currentColor' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg>;
const UsrIcon = ({ s = 18, c = 'currentColor' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
const HrtIcon = ({ s = 18, c = '#EC4899' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>;
const ArrIcon = ({ s = 20, c = 'currentColor' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>;

/* ── Main Component ── */
export default function Telemedicina({ userType = 'mexico', onBack }) {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const migrantName = 'Fabiola'; // TODO: from Supabase session

  useEffect(() => {
    const t = setInterval(() => setPhraseIdx(i => (i + 1) % PHRASES.length), 3000);
    return () => clearInterval(t);
  }, []);

  const S = {
    page: { minHeight: '100vh', background: '#111827', color: '#fff', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", maxWidth: 430, margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
    section: { padding: '0 20px 32px' },
    sTitle: { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(255,255,255,0.35)', marginBottom: 14, marginTop: 28 },
    card: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '18px 16px', marginBottom: 12 },
  };

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={S.header}>
        <img src="/saludcompartida-dark-no-tagline.png" alt="SaludCompartida" style={{ height: 40 }} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', marginRight: 6, boxShadow: '0 0 8px #10B981' }} />
          <span style={{ fontSize: 12, color: '#10B981', fontWeight: 600 }}>Activo</span>
        </div>
      </div>

      <div style={S.section}>
        {/* Back */}
        <div style={{ paddingTop: 12, marginBottom: 8, cursor: 'pointer' }} onClick={onBack}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 700, color: '#FFFFFF' }}>
            <ArrIcon s={18} c="#FFFFFF" /> VOLVER
          </span>
        </div>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 72, height: 72, borderRadius: 22, background: 'rgba(6,182,212,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <VidIcon s={36} c="#06B6D4" />
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, marginBottom: 8, lineHeight: 1.3 }}>
            Videollamada con<br />Doctores <span style={{ color: '#06B6D4' }}>24/7</span>
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, maxWidth: 320, margin: '0 auto' }}>
            Sin colas. Sin esperas. Sin perder tu día de trabajo. Un doctor te atiende cuando lo necesites, desde donde estés.
          </p>
        </div>

        {/* ILIMITADO Badge */}
        <div style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.12), rgba(16,185,129,0.12))', border: '1px solid rgba(6,182,212,0.25)', borderRadius: 16, padding: 18, textAlign: 'center', marginBottom: 20 }}>
          <p style={{ fontSize: 24, fontWeight: 800, color: '#06B6D4', letterSpacing: 1 }}>ILIMITADO</p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>
            Para ti y tus 3 miembros familiares. Las veces que necesiten.
          </p>
        </div>

        {/* Emotional Connection Card */}
        <div style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(236,72,153,0.05))', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 16, padding: 18, textAlign: 'center', marginBottom: 20 }}>
          <HrtIcon s={18} />
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 8, lineHeight: 1.6 }}>
            <span style={{ color: '#06B6D4', fontWeight: 600 }}>{migrantName}</span> no quiere que esperes horas en una clínica. Este doctor es para ti — <b style={{ color: '#06B6D4' }}>llámalo cuando lo necesites, sin pena.</b>
          </p>
        </div>

        {/* Phrases Carousel */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: 14 }}>
            Puedes llamar por lo que sea, así de fácil:
          </p>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 20, minHeight: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', transition: 'all 0.5s ease' }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: PHRASES[phraseIdx].color, lineHeight: 1.5, fontStyle: 'italic' }}>
              &ldquo;{PHRASES[phraseIdx].text}&rdquo;
            </p>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginTop: 8 }}>
            Dilo como lo sientes. Tu doctor te entiende.
          </p>
        </div>

        {/* Lo que incluye */}
        <p style={S.sTitle}>Lo que incluye</p>

        <div style={S.card}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(6,182,212,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <VidIcon s={20} c="#06B6D4" />
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Videollamada con Médico</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
                Consulta cara a cara con un doctor general. Explica tus síntomas, muestra lo que necesites, y recibe diagnóstico y tratamiento en el momento.
              </p>
            </div>
          </div>
        </div>

        <div style={S.card}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(6,182,212,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <BookIcon s={20} c="#06B6D4" />
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Receta Médica Electrónica</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
                Recibe tu receta directamente en tu celular después de la consulta. Llévala a cualquier farmacia de nuestra red y aprovecha tu descuento.
              </p>
            </div>
          </div>
        </div>

        <div style={S.card}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(6,182,212,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ActIcon s={20} c="#06B6D4" />
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Seguimiento Médico</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
                El doctor da seguimiento a tu consulta anterior. No tienes que repetir toda tu historia cada vez. Tu expediente está ahí, tu médico sabe por qué llamaste antes.
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <p style={S.sTitle}>Acceso inmediato</p>

        <a 
          href="https://wa.me/525610178639?text=Hola%2C%20necesito%20una%20consulta%20m%C3%A9dica" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            display: 'block',
            background: 'rgba(37,211,102,0.1)', 
            border: '2px solid rgba(37,211,102,0.35)', 
            borderRadius: 18, 
            padding: 20, 
            cursor: 'pointer',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(37,211,102,0.15)';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(37,211,102,0.1)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <WAIcon />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 18, fontWeight: 700, color: '#25D366', marginBottom: 2 }}>Conectar por WhatsApp</p>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, fontWeight: 500 }}>
                Presiona y un médico te contactará. Sin colas, sin esperas.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(37,211,102,0.15)' }}>
            <ClkIcon c="rgba(255,255,255,0.5)" />
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Disponible 24 horas, 7 días a la semana</span>
          </div>
        </a>

        {/* Zero-friction pills */}
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 16 }}>
          {[
            { icon: <ClkIcon s={18} c="#06B6D4" />, label: 'Sin espera' },
            { icon: <ShdIcon c="#06B6D4" />, label: 'Sin límite' },
            { icon: <UsrIcon c="#06B6D4" />, label: '4 miembros' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(6,182,212,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.icon}
              </div>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom Volver */}
        <div style={{ textAlign: 'center', paddingTop: 20 }}>
          <span onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 700, color: '#FFFFFF', cursor: 'pointer' }}>
            <ArrIcon s={18} c="#FFFFFF" /> VOLVER
          </span>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '28px 20px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 12 }}>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textAlign: 'center', fontStyle: 'italic' }}>
          &ldquo;SaludCompartida, donde está tu corazón&rdquo;
        </p>
      </div>
    </div>
  );
}
