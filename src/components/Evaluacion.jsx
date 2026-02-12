'use client';
import { useState } from 'react';

/* ═══════════════════════════════════════════════════════════════
   EVALUACIÓN — Rating del Servicio
   5 estrellas · Caritas SVG · 4 pasos · Contacto condicional
   
   Props: userType ('mexico'|'migrant'), onBack (fn)
   ═══════════════════════════════════════════════════════════════ */

const ArrIcon = ({s=20,c='currentColor'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;

/* Custom SVG Faces */
const Face5 = () => <svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#06B6D4" opacity="0.15"/><circle cx="24" cy="24" r="20" fill="none" stroke="#06B6D4" strokeWidth="2"/><circle cx="17" cy="20" r="2" fill="#06B6D4"/><circle cx="31" cy="20" r="2" fill="#06B6D4"/><path d="M15 30 Q24 38 33 30" fill="none" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round"/></svg>;
const Face4 = () => <svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#10B981" opacity="0.15"/><circle cx="24" cy="24" r="20" fill="none" stroke="#10B981" strokeWidth="2"/><circle cx="17" cy="20" r="2" fill="#10B981"/><circle cx="31" cy="20" r="2" fill="#10B981"/><path d="M16 30 Q24 35 32 30" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round"/></svg>;
const Face3 = () => <svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#F59E0B" opacity="0.15"/><circle cx="24" cy="24" r="20" fill="none" stroke="#F59E0B" strokeWidth="2"/><circle cx="17" cy="20" r="2" fill="#F59E0B"/><circle cx="31" cy="20" r="2" fill="#F59E0B"/><line x1="16" y1="31" x2="32" y2="31" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"/></svg>;
const Face2 = () => <svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#EF4444" opacity="0.15"/><circle cx="24" cy="24" r="20" fill="none" stroke="#EF4444" strokeWidth="2"/><circle cx="17" cy="20" r="2" fill="#EF4444"/><circle cx="31" cy="20" r="2" fill="#EF4444"/><path d="M16 34 Q24 28 32 34" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round"/></svg>;
const Face1 = () => <svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#991B1B" opacity="0.15"/><circle cx="24" cy="24" r="20" fill="none" stroke="#991B1B" strokeWidth="2"/><circle cx="17" cy="20" r="2" fill="#991B1B"/><circle cx="31" cy="20" r="2" fill="#991B1B"/><path d="M15 35 Q24 27 33 35" fill="none" stroke="#991B1B" strokeWidth="2.5" strokeLinecap="round"/><line x1="10" y1="15" x2="18" y2="18" stroke="#991B1B" strokeWidth="2"/><line x1="38" y1="15" x2="30" y2="18" stroke="#991B1B" strokeWidth="2"/></svg>;

const FACES = [null, <Face1 key={1}/>, <Face2 key={2}/>, <Face3 key={3}/>, <Face4 key={4}/>, <Face5 key={5}/>];
const FACE_COLORS = [null, '#991B1B', '#EF4444', '#F59E0B', '#10B981', '#06B6D4'];
const FACE_LABELS = [null, 'Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente'];

const REASONS = {
  high: ['Servicio rápido', 'Doctores excelentes', 'Fácil de usar', 'Me ayudó mucho', 'Buen precio', 'Otro'],
  low: ['Tardó mucho', 'No me atendieron bien', 'Difícil de usar', 'Problemas técnicos', 'No resolvieron mi problema', 'Otro'],
};

const StarIcon = ({ filled, onClick, size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? '#F59E0B' : 'none'} stroke={filled ? '#F59E0B' : 'rgba(255,255,255,0.2)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={onClick} style={{ cursor: 'pointer', transition: 'all 0.15s' }}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function Evaluacion({ userType = 'mexico', onBack }) {
  const [step, setStep] = useState(0);
  const [rating, setRating] = useState(0);
  const [reasons, setReasons] = useState([]);
  const [otherText, setOtherText] = useState('');
  const [comment, setComment] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const familyName = 'María';

  const totalSteps = rating <= 3 && rating > 0 ? 4 : 3;
  const progress = ((step + 1) / totalSteps) * 100;

  const toggleReason = (r) => {
    setReasons(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]);
  };

  const handleSubmit = () => {
    // TODO: send to Supabase/Resend
    setSubmitted(true);
    setTimeout(() => { if (onBack) onBack(); }, 4000);
  };

  const S = {
    page: { minHeight: '100vh', background: '#111827', color: '#fff', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", maxWidth: 430, margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
    section: { padding: '0 20px 32px' },
    btn: { width: '100%', padding: '14px 0', borderRadius: 14, border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'all 0.2s' },
  };

  if (submitted) {
    return (
      <div style={S.page}>
        {/* Header eliminado - ya está en navegación superior */}
        <div style={{ ...S.section, textAlign: 'center', paddingTop: 80 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, marginBottom: 12 }}>
            <span style={{ color: '#10B981' }}>Gracias</span>, {familyName}
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
            Tu opinión nos ayuda a mejorar para ti y tu familia. Regresando al dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      {/* Header eliminado - ya está en navegación superior */}

      <div style={S.section}>
        <div style={{ paddingTop: 12, marginBottom: 8, cursor: 'pointer' }} onClick={onBack}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            <ArrIcon s={16} c="rgba(255,255,255,0.4)" /> Volver
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, marginBottom: 24, overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #06B6D4, #EC4899)', borderRadius: 2, transition: 'width 0.3s' }} />
        </div>

        {/* Intro message */}
        <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(236,72,153,0.08))', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 16, padding: 18, textAlign: 'center', marginBottom: 24 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#F59E0B', marginBottom: 4 }}>
            {familyName}, ayúdanos a mejorar
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>Solo tomará dos minutos</p>
        </div>

        {/* STEP 0: Stars */}
        {step === 0 && (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, marginBottom: 24 }}>
              ¿Cómo calificarías nuestro servicio?
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
              {[1,2,3,4,5].map(n => (
                <StarIcon key={n} filled={n <= rating} onClick={() => setRating(n)} size={40} />
              ))}
            </div>
            {rating > 0 && (
              <div style={{ marginBottom: 24 }}>
                {FACES[rating]}
                <p style={{ fontSize: 14, fontWeight: 700, color: FACE_COLORS[rating], marginTop: 8 }}>{FACE_LABELS[rating]}</p>
              </div>
            )}
            {rating > 0 && (
              <button onClick={() => setStep(1)} style={{ ...S.btn, background: 'linear-gradient(135deg, #06B6D4, #0891B2)', color: '#fff' }}>
                Continuar
              </button>
            )}
          </div>
        )}

        {/* STEP 1: Reasons */}
        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, marginBottom: 16, textAlign: 'center' }}>
              ¿Qué te {rating >= 4 ? 'gustó' : 'podemos mejorar'}?
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {(rating >= 4 ? REASONS.high : REASONS.low).map(r => (
                <div key={r} onClick={() => toggleReason(r)} style={{
                  padding: '10px 16px', borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                  background: reasons.includes(r) ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${reasons.includes(r) ? 'rgba(6,182,212,0.3)' : 'rgba(255,255,255,0.06)'}`,
                  color: reasons.includes(r) ? '#06B6D4' : 'rgba(255,255,255,0.6)',
                }}>
                  {r}
                </div>
              ))}
            </div>
            {reasons.includes('Otro') && (
              <textarea
                value={otherText} onChange={(e) => setOtherText(e.target.value)}
                placeholder="Cuéntanos más..."
                style={{ width: '100%', padding: 14, borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, resize: 'vertical', minHeight: 80, marginBottom: 16, outline: 'none', boxSizing: 'border-box' }}
              />
            )}
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setStep(0)} style={{ ...S.btn, flex: 1, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)' }}>Atrás</button>
              <button onClick={() => setStep(2)} style={{ ...S.btn, flex: 2, background: 'linear-gradient(135deg, #06B6D4, #0891B2)', color: '#fff' }}>Continuar</button>
            </div>
          </div>
        )}

        {/* STEP 2: Comment */}
        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, marginBottom: 16, textAlign: 'center' }}>
              ¿Algo más que quieras decirnos?
            </h2>
            <textarea
              value={comment} onChange={(e) => setComment(e.target.value)}
              placeholder="Tu experiencia nos importa mucho (opcional)"
              style={{ width: '100%', padding: 14, borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, resize: 'vertical', minHeight: 120, marginBottom: 20, outline: 'none', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setStep(1)} style={{ ...S.btn, flex: 1, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)' }}>Atrás</button>
              <button onClick={() => rating <= 3 ? setStep(3) : handleSubmit()} style={{ ...S.btn, flex: 2, background: 'linear-gradient(135deg, #06B6D4, #0891B2)', color: '#fff' }}>
                {rating <= 3 ? 'Continuar' : 'Enviar'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Contact (only if rating ≤ 3) */}
        {step === 3 && (
          <div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, marginBottom: 8, textAlign: 'center' }}>
              ¿Te gustaría que te contactemos?
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: 20, lineHeight: 1.5 }}>
              Queremos resolver tu situación personalmente
            </p>
            <input
              value={contactInfo} onChange={(e) => setContactInfo(e.target.value)}
              placeholder="Tu teléfono o WhatsApp (opcional)"
              style={{ width: '100%', padding: 14, borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, marginBottom: 20, outline: 'none', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setStep(2)} style={{ ...S.btn, flex: 1, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)' }}>Atrás</button>
              <button onClick={handleSubmit} style={{ ...S.btn, flex: 2, background: 'linear-gradient(135deg, #06B6D4, #0891B2)', color: '#fff' }}>Enviar</button>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', paddingTop: 28 }}>
          <span onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}><ArrIcon s={16} c="rgba(255,255,255,0.4)" /> Volver</span>
        </div>
      </div>

      <div style={{ padding: '28px 20px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 12 }}>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textAlign: 'center', fontStyle: 'italic' }}>&ldquo;SaludCompartida, donde está tu corazón&rdquo;</p>
      </div>
    </div>
  );
}
