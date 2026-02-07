'use client';

import { useState } from "react";

/* ═══════════════════════════════════════════════════════════
   PANTALLA: QUIÉNES SOMOS
   Para el usuario REAL: lenguaje simple, emocional, cercano
   3 tabs: Nosotros · Nuestra Promesa · Lo Que Nos Mueve
   Dual audience: userType = 'migrant' | 'mexico'
   Platinum UX · Plus Jakarta Sans + DM Serif Display
   ═══════════════════════════════════════════════════════════ */

const I = {
  Arrow: ({s=18,c='#fff'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>,
  Heart: ({s=20,c='#EC4899'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke={c} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Home: ({s=20,c='#06B6D4'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>,
  Shield: ({s=20,c='#06B6D4'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>,
  Users: ({s=20,c='#F59E0B'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Star: ({s=20,c='#F59E0B'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke={c} strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Brain: ({s=20,c='#8B5CF6'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 1 4 4 7 7 0 0 1 3 6c0 4-3 7-7 7s-7-3-7-7a7 7 0 0 1 3-6 4 4 0 0 1 4-4z"/><path d="M12 2v20"/><path d="M8 6c-2 1-3 3.5-3 6"/><path d="M16 6c2 1 3 3.5 3 6"/></svg>,
  Cross: ({s=20,c='#10B981'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="8" height="14" x="8" y="6" rx="1"/><rect width="20" height="8" x="2" y="10" rx="1"/></svg>,
  Pill: ({s=20,c='#EC4899'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>,
  Sparkle: ({s=20,c='#F59E0B'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>,
  Phone: ({s=20,c='#10B981'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  HandHeart: ({s=20,c='#EC4899'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 15 6 6"/><path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z"/></svg>,
  Check: ({s=20,c='#10B981'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  Sun: ({s=20,c='#F59E0B'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>,
};

const TABS = ['Nosotros', 'Nuestra Promesa', 'Lo Que Nos Mueve'];

const S = {
  page: { minHeight: '100vh', background: '#111827', color: '#fff', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", maxWidth: 430, margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  logo: { fontFamily: "'DM Serif Display', serif", fontSize: 20, background: 'linear-gradient(135deg, #06B6D4, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 },
  px: { padding: '0 20px' },
  back: { display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: '8px 0', marginBottom: 8 },
  st: { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(255,255,255,0.35)', marginBottom: 14, marginTop: 28 },
  card: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '18px 16px', marginBottom: 12 },
  tagline: { fontSize: 13, color: 'rgba(255,255,255,0.5)', textAlign: 'center', fontStyle: 'italic' },
  serif: { fontFamily: "'DM Serif Display', serif" },
};


/* ═══════════════════════════════════════════════════════════
   TAB 1 — NOSOTROS
   Contado como historia humana, no como pitch
   ═══════════════════════════════════════════════════════════ */
function TabNosotros({ userType }) {
  const isMig = userType === 'migrant';

  return (
    <div>
      {/* Hero emocional */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ width: 80, height: 80, borderRadius: 24, background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(236,72,153,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '1px solid rgba(6,182,212,0.2)' }}>
          <I.Home s={40} />
        </div>
        <h2 style={{ ...S.serif, fontSize: 26, lineHeight: 1.3, marginBottom: 12 }}>
          {isMig
            ? <>Nacimos para que<br />puedas <span style={{ color: '#06B6D4' }}>cuidarlos</span><br />aunque estés lejos</>
            : <>Nacimos para que<br />tú y tu familia<br />estén <span style={{ color: '#06B6D4' }}>protegidos</span></>
          }
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, maxWidth: 320, margin: '0 auto' }}>
          {isMig
            ? 'Sabemos lo que se siente estar lejos cuando alguien que amas se enferma. Por eso creamos SaludCompartida.'
            : 'Alguien que te quiere mucho quiso asegurarse de que tú y tu familia tengan acceso a un doctor, medicinas, y alguien que los escuche.'
          }
        </p>
      </div>

      {/* Emotional connection */}
      <div style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.08), rgba(6,182,212,0.05))', border: '1px solid rgba(236,72,153,0.15)', borderRadius: 16, padding: 20, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flexShrink: 0, marginTop: 2 }}><I.Heart /></div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8 }}>
            {isMig
              ? <>Tú trabajas duro todos los días. Mandas dinero, llamas cuando puedes, pero siempre te queda esa preocupación: <b style={{ color: '#EC4899' }}>¿y si se enferman?</b> SaludCompartida existe para darte esa tranquilidad. Para que sepas que tu familia tiene a quién recurrir.</>
              : <>Tu familiar está lejos, trabajando duro para que tú estés bien. Ahora, además de enviarte dinero, te envía salud. <b style={{ color: '#EC4899' }}>Eso es amor hecho servicio.</b> SaludCompartida es la forma en que te cuida, aunque no pueda estar ahí.</>
            }
          </p>
        </div>
      </div>

      {/* Qué incluye — lenguaje simple */}
      <p style={S.st}>Qué tienes con SaludCompartida</p>

      {[
        { Ic: I.Cross, t: 'Doctor por teléfono o video', d: 'Cuando te sientas mal, llamas y un doctor te atiende. Sin filas, sin esperas, a cualquier hora.', c: '#10B981' },
        { Ic: I.Pill, t: 'Medicinas más baratas', d: 'En más de 1,700 farmacias en todo México pagas mucho menos por tus medicinas. Hasta 75% menos.', c: '#EC4899' },
        { Ic: I.Brain, t: 'Alguien que te escuche', d: 'Si te sientes triste, preocupada o con mucho estrés, puedes platicar con un profesional. Sin que nadie te juzgue.', c: '#8B5CF6' },
        { Ic: I.Sparkle, t: 'Lupita, tu compañera', d: 'Lupita te llama para ver cómo estás, te recuerda tus medicinas, y te platica. Como una amiga que siempre está pendiente de ti.', c: '#F59E0B' },
      ].map((p, i) => (
        <div key={i} style={{ ...S.card, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div style={{ width: 46, height: 46, borderRadius: 14, background: `${p.c}12`, border: `1px solid ${p.c}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <p.Ic />
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 5, color: p.c }}>{p.t}</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{p.d}</p>
          </div>
        </div>
      ))}

      {/* Cuánto cuesta */}
      <div style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(236,72,153,0.06))', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 16, padding: 22, textAlign: 'center', marginBottom: 24 }}>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginBottom: 6 }}>
          {isMig ? 'Todo esto para tu familia por' : 'Todo esto para ti y tu familia por'}
        </p>
        <p style={{ fontSize: 34, fontWeight: 800, color: '#06B6D4', letterSpacing: -1 }}>
          $12-18<span style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}> al mes</span>
        </p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>Para ti y hasta 3 personas más de tu familia</p>
      </div>

      {/* Quién lo hizo */}
      <p style={S.st}>¿Quién creó SaludCompartida?</p>
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(236,72,153,0.15)', borderRadius: 16, padding: '20px 16px', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: 'linear-gradient(135deg, #06B6D4, #EC4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>FF</span>
          </div>
          <div>
            <p style={{ fontSize: 16, fontWeight: 700 }}>Fabiola Franco</p>
            <p style={{ fontSize: 12, color: '#06B6D4', fontWeight: 600 }}>Fundadora · Migrante desde 1999</p>
          </div>
        </div>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.9, marginBottom: 14 }}>
          {isMig
            ? <>Fabiola es migrante, igual que tú. Dejó su país en 1999 y desde entonces conoce esa culpa que no se va: <b style={{ color: '#EC4899' }}>la culpa de no estar ahí.</b> De no ver envejecer a tus papás. De no poder acompañarlos cuando se enferman. De enterarte por teléfono de cosas que quisieras ver con tus propios ojos.</>
            : <>Fabiola es migrante desde 1999. Ella vive lejos de su familia, igual que tu familiar vive lejos de ti. Ella conoce esa tristeza de no poder estar presente, de no poder acompañar a los suyos. <b style={{ color: '#EC4899' }}>Por eso creó algo para que las familias como la tuya no estén solas.</b></>
          }
        </p>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.9, marginBottom: 14 }}>
          <b style={{ color: '#06B6D4' }}>Por eso creó SaludCompartida.</b> Con SaludCompartida, los seres queridos de los migrantes acceden a doctor 24/7, medicinas baratas, alguien que cuide su salud emocional, y una compañera como Lupita que siempre esté al pendiente.
        </p>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.9 }}>
          Ella lo creó porque sabe lo que se siente no estar ahí y querer ayudar.
        </p>
        <p style={{ fontSize: 15, ...S.serif, color: '#EC4899', textAlign: 'center', marginTop: 16 }}>
          SaludCompartida, donde está tu corazón.
        </p>
      </div>


    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   TAB 2 — NUESTRA PROMESA
   Lo que prometemos, en palabras claras
   ═══════════════════════════════════════════════════════════ */
function TabPromesa({ userType }) {
  const isMig = userType === 'migrant';

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ width: 80, height: 80, borderRadius: 24, background: 'rgba(6,182,212,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '1px solid rgba(6,182,212,0.2)' }}>
          <I.Shield s={40} />
        </div>
        <h2 style={{ ...S.serif, fontSize: 26, lineHeight: 1.3, marginBottom: 12 }}>
          {isMig
            ? <>Nuestra promesa<br />para <span style={{ color: '#06B6D4' }}>tu familia</span></>
            : <>Nuestra promesa<br />para <span style={{ color: '#06B6D4' }}>ti</span></>
          }
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, maxWidth: 320, margin: '0 auto' }}>
          Esto es lo que nos comprometemos a hacer por ti. Siempre.
        </p>
      </div>

      {/* Promises */}
      {[
        { Ic: I.Phone, t: 'Siempre vas a tener a quién llamar',
          d: isMig
            ? 'Tu mamá, tu esposa, tus hijos — cuando se sientan mal, van a tener un doctor que los atienda. De día o de noche.'
            : 'Cuando te sientas mal, solo tienes que llamar. Un doctor te va a atender, de día o de noche. Sin filas, sin esperas.',
          c: '#10B981' },
        { Ic: I.Pill, t: 'Las medicinas no van a ser un lujo',
          d: isMig
            ? 'Tu familia va a pagar mucho menos en la farmacia. No van a tener que elegir entre la medicina y la comida.'
            : 'Vas a pagar mucho menos por tus medicinas. No tienes que elegir entre lo que necesitas para tu salud y lo demás.',
          c: '#EC4899' },
        { Ic: I.Brain, t: 'Alguien los va a escuchar de verdad',
          d: isMig
            ? 'Si tu mamá se siente sola o tu esposa está estresada, puede hablar con alguien que la escuche sin juzgarla. Una vez por semana.'
            : 'Si te sientes triste, si algo te preocupa, puedes hablar con alguien. Sin que te juzguen. A tu ritmo, cuando tú quieras.',
          c: '#8B5CF6' },
        { Ic: I.Sparkle, t: 'Nunca van a estar solos',
          d: isMig
            ? 'Lupita les va a llamar para ver cómo están. Les recuerda sus medicinas. Les platica. Es como si tú pudieras estar ahí, pero con ayuda.'
            : 'Lupita te va a llamar para saludarte, preguntarte cómo te sientes, recordarte tus medicinas. Es como tener una amiga que siempre está al pendiente.',
          c: '#F59E0B' },
        { Ic: I.HandHeart, t: 'Te vamos a tratar con respeto',
          d: 'Nada de letras chiquitas. Nada de sorpresas. Nada de "eso no está incluido". Lo que te decimos es lo que es. Tu confianza es lo que más valoramos.',
          c: '#06B6D4' },
      ].map((p, i) => (
        <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${p.c}18`, borderRadius: 16, padding: '20px 16px', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: `${p.c}12`, border: `1px solid ${p.c}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <p.Ic />
            </div>
            <p style={{ fontSize: 15, fontWeight: 700 }}>{p.t}</p>
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>{p.d}</p>
        </div>
      ))}

      {/* Emotional close */}
      <div style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.08), rgba(6,182,212,0.06))', border: '1px solid rgba(236,72,153,0.15)', borderRadius: 16, padding: 22, marginBottom: 8 }}>
        <div style={{ textAlign: 'center' }}>
          <I.Heart s={24} />
          <p style={{ fontSize: 15, ...S.serif, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginTop: 12, marginBottom: 8 }}>
            {isMig
              ? '"Trabajas lejos para que ellos estén bien. Nosotros los cuidamos de cerca para que tú estés tranquilo."'
              : '"Tu familiar eligió esto para ti porque te quiere. Y nosotros vamos a cuidar de ti como si fueras nuestra familia."'
            }
          </p>
          <p style={{ fontSize: 12, color: '#EC4899', fontWeight: 600 }}>— SaludCompartida</p>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   TAB 3 — LO QUE NOS MUEVE
   Valores contados como creencias humanas
   ═══════════════════════════════════════════════════════════ */
function TabValores() {
  const VALS = [
    { Ic: I.Users, t: 'Tú nos importas de verdad',
      d: 'No somos una empresa grande que te ve como un número. Somos personas que entienden lo que vives. Creamos esto pensando en ti, en tu mamá, en tu familia.',
      c: '#06B6D4' },
    { Ic: I.Heart, t: 'Mereces lo mejor',
      d: 'Que ganes poco no significa que merezcas un servicio malo. Aquí todo está hecho con el mismo cuidado que si fuera para nuestra propia familia. Bonito, fácil de usar, y con respeto.',
      c: '#EC4899' },
    { Ic: I.Sun, t: 'Sin trucos, sin sorpresas',
      d: 'No hay letras chiquitas. No hay cargos escondidos. Lo que te decimos es lo que es. Si algo cambia, te lo decimos primero a ti.',
      c: '#F59E0B' },
    { Ic: I.Brain, t: 'La tecnología es para ayudarte, no para complicarte',
      d: 'Lupita suena como una persona de verdad porque queremos que te sientas cómoda hablando con ella. Todo aquí está hecho para que sea fácil, no difícil.',
      c: '#8B5CF6' },
    { Ic: I.Star, t: 'Tu salud no debería depender de tu bolsillo',
      d: 'Todas las personas merecen poder ir al doctor, comprar sus medicinas y tener a alguien que las escuche. No importa dónde vivas ni cuánto ganes.',
      c: '#10B981' },
  ];

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ width: 80, height: 80, borderRadius: 24, background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '1px solid rgba(245,158,11,0.2)' }}>
          <I.Star s={40} />
        </div>
        <h2 style={{ ...S.serif, fontSize: 26, lineHeight: 1.3, marginBottom: 12 }}>
          Lo que nos mueve<br /><span style={{ color: '#F59E0B' }}>cada día</span>
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, maxWidth: 320, margin: '0 auto' }}>
          Esto es lo que creemos. No son palabras bonitas en un cuadro. Es lo que hacemos todos los días.
        </p>
      </div>

      {VALS.map((v, i) => (
        <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${v.c}18`, borderRadius: 16, padding: '20px 16px', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: `${v.c}12`, border: `1px solid ${v.c}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <v.Ic />
            </div>
            <p style={{ fontSize: 15, fontWeight: 700 }}>{v.t}</p>
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>{v.d}</p>
        </div>
      ))}

      {/* Close */}
      <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(16,185,129,0.06))', border: '1px solid rgba(245,158,11,0.18)', borderRadius: 16, padding: 22, marginBottom: 8 }}>
        <p style={{ fontSize: 15, ...S.serif, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, textAlign: 'center', marginBottom: 10 }}>
          "No creamos SaludCompartida para ganar premios. La creamos porque hay millones de familias que merecen que alguien las vea."
        </p>
        <p style={{ fontSize: 12, color: '#F59E0B', fontWeight: 600, textAlign: 'center' }}>— Fabiola Franco, Fundadora</p>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════ */
export default function QuienesSomos({ userType = 'mexico' }) {
  const [tab, setTab] = useState(0);

  return (
    <div style={S.page}>
      {/* Header eliminado - solo contenido */}

      <div style={S.px}>
        <button style={S.back}><I.Arrow /> Volver al inicio</button>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'rgba(255,255,255,0.03)', borderRadius: 14, padding: 4, border: '1px solid rgba(255,255,255,0.06)' }}>
          {TABS.map((t, i) => (
            <button key={i} onClick={() => setTab(i)} style={{
              flex: 1, padding: '10px 4px', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 11, fontWeight: tab === i ? 700 : 500,
              background: tab === i ? 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(236,72,153,0.1))' : 'transparent',
              color: tab === i ? '#fff' : 'rgba(255,255,255,0.35)',
              transition: 'all 0.2s ease',
              ...(tab === i ? { boxShadow: '0 2px 8px rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.2)' } : {}),
            }}>
              {t}
            </button>
          ))}
        </div>

        {tab === 0 && <TabNosotros userType={userType} />}
        {tab === 1 && <TabPromesa userType={userType} />}
        {tab === 2 && <TabValores />}
      </div>

      <div style={{ padding: '28px 20px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 24 }}>
        <p style={S.tagline}>SaludCompartida, donde está tu corazón</p>
      </div>
    </div>
  );
}
