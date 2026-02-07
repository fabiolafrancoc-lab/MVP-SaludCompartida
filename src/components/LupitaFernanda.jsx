'use client';
import { useState } from 'react';

/* ═══════════════════════════════════════════════════════════════
   LUPITA & FERNANDA — AI Companions
   "Tus compañeras para hacer la vida más liviana"
   
   Lupita: 55+ (uses usted, warm, maternal)
   Fernanda: 25-55 (uses tú, contemporary, supportive)
   Connection → Trust → Consultation methodology
   
   Props: userType ('mexico'|'migrant'), onBack (fn)
   ═══════════════════════════════════════════════════════════════ */

const ArrIcon = ({s=20,c='currentColor'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;
const WAIcon = ({s=28,c='#fff'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
const HrtIcon = ({s=18,c='#EC4899'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const PhoneIcon = ({s=18,c='currentColor'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;

const LUPITA_TOPICS = [
  'Recetas de cocina tradicional',
  'Remedios caseros que funcionan',
  'Historias de la familia',
  'Consejos para el día a día',
  'Simplemente platicar',
];

const FERNANDA_TOPICS = [
  'Desahogarte sin ser juzgada',
  'Consejos de autocuidado',
  'Crianza y maternidad',
  'Manejar el estrés del día',
  'Lo que quieras, cuando quieras',
];

export default function LupitaFernanda({ userType = 'mexico', onBack, migrantName: migrantNameProp }) {
  const [selected, setSelected] = useState(null); // 'lupita' | 'fernanda'
  const migrantName = migrantNameProp || 'Tu familiar';
  const familyName = 'María';

  const S = {
    page: { minHeight: '100vh', background: '#111827', color: '#fff', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", maxWidth: 430, margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
    section: { padding: '0 20px 32px' },
    sTitle: { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(255,255,255,0.35)', marginBottom: 14, marginTop: 28 },
  };

  return (
    <div style={S.page}>
      {/* Header eliminado - solo contenido */}

      <div style={S.section}>
        <div style={{ paddingTop: 12, marginBottom: 8, cursor: 'pointer' }} onClick={onBack}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 700, color: '#FFFFFF' }}>
            <ArrIcon s={18} c="#FFFFFF" /> VOLVER
          </span>
        </div>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #EC4899, #9333EA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, color: '#fff', border: '3px solid #111827', zIndex: 2 }}>L</div>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #06B6D4, #0891B2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, color: '#fff', border: '3px solid #111827', marginLeft: -16 }}>F</div>
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, marginBottom: 8, lineHeight: 1.3 }}>
            <span style={{ color: '#EC4899' }}>Lupita</span> y <span style={{ color: '#06B6D4' }}>Fernanda</span>
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, maxWidth: 320, margin: '0 auto' }}>
            Tus compañeras para hacer la vida más liviana. Comparte recetas, conversa de lo que quieras, o simplemente ten a alguien que te escuche.
          </p>
        </div>

        {/* How it works */}
        <div style={{ background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.2)', borderRadius: 16, padding: 18, textAlign: 'center', marginBottom: 24 }}>
          <PhoneIcon s={22} c="#25D366" />
          <p style={{ fontSize: 14, fontWeight: 700, color: '#25D366', marginTop: 8, marginBottom: 4 }}>
            Tú escribes, nosotras llamamos
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
            Envíanos un mensaje a WhatsApp y te llamamos nosotras para que <b style={{ color: '#10B981' }}>no gastes tu dinero</b>.
          </p>
        </div>

        {/* LUPITA Card */}
        <p style={S.sTitle}>Elige tu compañera</p>

        <div
          onClick={() => setSelected('lupita')}
          style={{
            background: selected === 'lupita' ? 'rgba(236,72,153,0.12)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${selected === 'lupita' ? 'rgba(236,72,153,0.3)' : 'rgba(255,255,255,0.06)'}`,
            borderRadius: 16, padding: '18px 16px', marginBottom: 12, cursor: 'pointer', transition: 'all 0.2s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #EC4899, #9333EA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: '#fff', flexShrink: 0 }}>L</div>
            <div>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#EC4899' }}>Lupita</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Como platicar con tu tía favorita</p>
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 12 }}>
            &ldquo;Cuénteme, mija, ¿cómo le fue hoy?&rdquo; — Lupita usa &ldquo;usted&rdquo;, habla con cariño, y siempre tiene un consejo sabio. Perfecta si buscas calidez y compañía.
          </p>
          {selected === 'lupita' && (
            <div style={{ marginTop: 8 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Puedes hablar de:</p>
              {LUPITA_TOPICS.map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <HrtIcon s={12} />
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{t}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FERNANDA Card */}
        <div
          onClick={() => setSelected('fernanda')}
          style={{
            background: selected === 'fernanda' ? 'rgba(6,182,212,0.12)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${selected === 'fernanda' ? 'rgba(6,182,212,0.3)' : 'rgba(255,255,255,0.06)'}`,
            borderRadius: 16, padding: '18px 16px', marginBottom: 20, cursor: 'pointer', transition: 'all 0.2s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #06B6D4, #0891B2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: '#fff', flexShrink: 0 }}>F</div>
            <div>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#06B6D4' }}>Fernanda</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Como hablar con tu mejor amiga</p>
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 12 }}>
            &ldquo;Oye, ¿cómo estás tú con todo esto?&rdquo; — Fernanda usa &ldquo;tú&rdquo;, es directa, empática y nunca juzga. Perfecta si buscas a alguien que te entienda.
          </p>
          {selected === 'fernanda' && (
            <div style={{ marginTop: 8 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Puedes hablar de:</p>
              {FERNANDA_TOPICS.map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <HrtIcon s={12} c="#06B6D4" />
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{t}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* WhatsApp CTA */}
        <div style={{ background: 'rgba(37,211,102,0.1)', border: '2px solid rgba(37,211,102,0.35)', borderRadius: 18, padding: 20, cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <WAIcon />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#25D366', marginBottom: 2 }}>
                {selected ? `Escribir a ${selected === 'lupita' ? 'Lupita' : 'Fernanda'}` : 'Escríbenos por WhatsApp'}
              </p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
                Solo dinos a qué hora puedes y te llamamos nosotras
              </p>
            </div>
          </div>
        </div>

        {/* Emotional */}
        <div style={{ background: 'rgba(236,72,153,0.06)', border: '1px solid rgba(236,72,153,0.15)', borderRadius: 16, padding: 18, textAlign: 'center', marginTop: 20 }}>
          <HrtIcon />
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 8, lineHeight: 1.6 }}>
            <span style={{ color: '#06B6D4', fontWeight: 600 }}>{migrantName}</span> quiere que tengas compañía. Lupita y Fernanda están aquí para que la distancia pese menos. <b style={{ color: '#EC4899' }}>Cuenta con nosotras siempre.</b>
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
