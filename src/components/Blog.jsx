'use client';
import { useState } from 'react';

/* ═══════════════════════════════════════════════════════════════
   BLOG — Aprende con Nosotros
   Artículos de salud · Categorías · Horizontal scroll · Modal
   
   Props: userType ('mexico'|'migrant'), onBack (fn)
   ═══════════════════════════════════════════════════════════════ */

const ArrIcon = ({s=20,c='currentColor'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;
const ClkIcon = ({s=12,c='currentColor'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const XIcon = ({s=20,c='currentColor'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
const BookIcon = ({s=22,c='#fff'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;

const CATEGORIES = ['Todos', 'Prevención', 'Bienestar', 'Salud Familiar', 'Salud Mental', 'Nutrición'];

const ARTICLES = [
  {
    title: 'Cómo Cuidar tu Corazón sin Gastar Mucho',
    cat: 'Prevención', time: '3 min', color: '#EF4444',
    img: 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400&q=80',
    summary: 'Tu corazón trabaja sin parar. Pequeños cambios diarios pueden hacer una gran diferencia: caminar 30 minutos, reducir la sal, comer más frutas. No necesitas un gimnasio caro — con lo que tienes en casa puedes empezar hoy.',
    tips: ['Camina 30 minutos al día, aunque sea en tu colonia', 'Reduce la sal poco a poco — tu paladar se acostumbra', 'Come una fruta al día antes del desayuno', 'Toma agua en vez de refresco en una de tus comidas'],
  },
  {
    title: '5 Ejercicios que Puedes Hacer en Casa',
    cat: 'Bienestar', time: '2 min', color: '#10B981',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
    summary: 'No necesitas equipo ni salir de casa. Estos 5 ejercicios los puedes hacer viendo la tele, cuidando a los niños, o en los 10 minutos antes de dormir.',
    tips: ['Sentadillas: 3 series de 10 (usa la silla como guía)', 'Plancha: 20 segundos, descansa 10, repite 3 veces', 'Caminar en tu lugar: 5 minutos rápido', 'Estiramientos de cuello y espalda en la mañana', 'Subir y bajar un escalón por 3 minutos'],
  },
  {
    title: 'Qué Hacer Cuando tus Hijos Tienen Fiebre',
    cat: 'Salud Familiar', time: '3 min', color: '#06B6D4',
    img: 'https://images.unsplash.com/photo-1565843708714-52ecf69ab81f?w=400&q=80',
    summary: 'La fiebre asusta, pero casi siempre el cuerpo está peleando una infección. Saber qué hacer y cuándo preocuparte puede evitar carreras innecesarias a urgencias.',
    tips: ['Menos de 38°C: solo observa, dale líquidos', 'De 38-39°C: paracetamol según peso, ropa ligera', 'Más de 39°C: consulta por telemedicina (¡ya lo tienes!)', 'NUNCA lo abrigues de más — el calor necesita salir', 'Baño tibio (no frío) ayuda a bajar la temperatura'],
  },
  {
    title: 'Hablar de Emociones No es Debilidad',
    cat: 'Salud Mental', time: '2 min', color: '#8B5CF6',
    img: 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=400&q=80',
    summary: 'Nos enseñaron a "aguantar". Pero guardar todo adentro enferma el cuerpo. Hablar es el primer paso para sentirte mejor — y ya tienes a Lupita, Fernanda, y sesiones de terapia incluidas.',
    tips: ['Está bien decir "no estoy bien"', 'Habla con Lupita o Fernanda — son confidenciales', 'Usa tu sesión de terapia semanal, ya está pagada', 'Llorar no es debilidad, es limpieza emocional'],
  },
  {
    title: 'Recetas Saludables con lo que Tienes en Casa',
    cat: 'Nutrición', time: '3 min', color: '#F59E0B',
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80',
    summary: 'Comer sano no significa comer caro. Con frijoles, huevos, verduras de temporada y un poco de creatividad, puedes alimentar bien a tu familia todos los días.',
    tips: ['Frijoles + arroz = proteína completa y barata', 'Huevos revueltos con verduras: desayuno campeón', 'Avena con plátano: merienda para niños y adultos', 'Sopa de verduras: aprovecha lo que tengas', 'Limón y chile: el sabor mexicano que no cuesta'],
  },
];

export default function Blog({ userType = 'mexico', onBack }) {
  const [activeCat, setActiveCat] = useState('Todos');
  const [openArticle, setOpenArticle] = useState(null);

  const filtered = activeCat === 'Todos' ? ARTICLES : ARTICLES.filter(a => a.cat === activeCat);

  const S = {
    page: { minHeight: '100vh', background: '#111827', color: '#fff', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", maxWidth: 430, margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
    section: { padding: '0 20px 32px' },
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
          <div style={{ width: 72, height: 72, borderRadius: 22, background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <BookIcon s={36} c="#F59E0B" />
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, marginBottom: 8, lineHeight: 1.3 }}>
            Aprende con <span style={{ color: '#F59E0B' }}>Nosotros</span>
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, maxWidth: 320, margin: '0 auto' }}>
            Artículos prácticos de salud escritos para ti, en lenguaje sencillo.
          </p>
        </div>

        {/* Category pills */}
        <div style={{
          display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 20,
          paddingBottom: 8, scrollbarWidth: 'none', msOverflowStyle: 'none',
        }}>
          {CATEGORIES.map(cat => (
            <div
              key={cat}
              onClick={() => setActiveCat(cat)}
              style={{
                padding: '8px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s',
                background: activeCat === cat ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${activeCat === cat ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.06)'}`,
                color: activeCat === cat ? '#F59E0B' : 'rgba(255,255,255,0.5)',
              }}
            >
              {cat}
            </div>
          ))}
        </div>

        {/* Articles */}
        {filtered.map((article, i) => (
          <div
            key={i}
            onClick={() => setOpenArticle(article)}
            style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, overflow: 'hidden', marginBottom: 12, cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <img src={article.img} alt="" style={{ width: '100%', height: 140, objectFit: 'cover' }} />
            <div style={{ padding: '14px 16px' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: article.color, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {article.cat}
              </p>
              <p style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.4, marginBottom: 8 }}>
                {article.title}
              </p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <ClkIcon /> {article.time} de lectura
              </p>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>No hay artículos en esta categoría todavía</p>
          </div>
        )}

        <div style={{ textAlign: 'center', paddingTop: 24 }}>
          <span onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}><ArrIcon s={16} c="rgba(255,255,255,0.4)" /> Volver</span>
        </div>
      </div>

      {/* Article Modal */}
      {openArticle && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)', zIndex: 100,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        }} onClick={() => setOpenArticle(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 430, maxHeight: '85vh', overflowY: 'auto',
              background: '#111827', borderRadius: '24px 24px 0 0',
              border: '1px solid rgba(255,255,255,0.06)', borderBottom: 'none',
            }}
          >
            <img src={openArticle.img} alt="" style={{ width: '100%', height: 180, objectFit: 'cover' }} />

            <div style={{ position: 'absolute', top: 16, right: 16 }}>
              <div onClick={() => setOpenArticle(null)} style={{
                width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>
                <XIcon s={18} c="#fff" />
              </div>
            </div>

            <div style={{ padding: '20px 20px 32px' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: openArticle.color, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                {openArticle.cat} · {openArticle.time}
              </p>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, lineHeight: 1.3, marginBottom: 16 }}>
                {openArticle.title}
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 20 }}>
                {openArticle.summary}
              </p>

              {openArticle.tips && (
                <>
                  <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(255,255,255,0.35)', marginBottom: 12 }}>
                    Consejos prácticos
                  </p>
                  {openArticle.tips.map((tip, j) => (
                    <div key={j} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0',
                      borderTop: j > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    }}>
                      <div style={{ width: 24, height: 24, borderRadius: 8, background: `${openArticle.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: openArticle.color }}>{j + 1}</span>
                      </div>
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{tip}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: '28px 20px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 12 }}>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textAlign: 'center', fontStyle: 'italic' }}>&ldquo;SaludCompartida, donde está tu corazón&rdquo;</p>
      </div>
    </div>
  );
}
