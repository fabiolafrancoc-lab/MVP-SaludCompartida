export default function Companions() {
  const s = {
    companionSection: {padding: '0 24px 36px'},
    companionCard: {background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '24px 20px', position: 'relative', overflow: 'hidden'},
    lupitaGlow: {position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.12), transparent 70%)', animation: 'glowPulse 4s ease-in-out infinite'},
    fernandaGlow: {position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.12), transparent 70%)', animation: 'glowPulse 4s ease-in-out infinite'},
    companionHeader: {display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18, position: 'relative', zIndex: 1},
    lupitaAvatar: {width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #EC4899, #9333EA)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(236,72,153,0.3)'},
    fernandaAvatar: {width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #06B6D4, #0891B2)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(6,182,212,0.3)'},
    avatarLetter: {fontFamily: "'DM Serif Display', serif", fontSize: 22, color: '#FFFFFF', fontWeight: 400},
    lupitaName: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 800, color: '#EC4899', marginBottom: 2},
    fernandaName: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 800, color: '#06B6D4', marginBottom: 2},
    companionFor: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.4)'},
    companionQuote: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', position: 'relative', paddingLeft: 4, marginBottom: 18, borderLeft: 'none'},
    quoteOpenMark: {fontFamily: "'DM Serif Display', serif", fontSize: 40, color: 'rgba(139,92,246,0.25)', lineHeight: 0, verticalAlign: 'sub', marginRight: 4},
    quoteCloseMark: {fontFamily: "'DM Serif Display', serif", fontSize: 40, color: 'rgba(139,92,246,0.25)', lineHeight: 0, verticalAlign: 'sub', marginLeft: 4},
    tagsRow: {display: 'flex', flexWrap: 'wrap', gap: 6},
    tagLupita: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10, fontWeight: 600, padding: '5px 12px', borderRadius: 100, background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.2)', color: '#F472B6'},
    tagFernanda: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10, fontWeight: 600, padding: '5px 12px', borderRadius: 100, background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)', color: '#22D3EE'},
    howSection: {padding: '36px 24px', textAlign: 'center'},
    howTitle: {fontFamily: "'DM Serif Display', serif", fontSize: 26, color: '#FFFFFF', marginBottom: 12},
    howSubtitle: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 600, color: '#C4B5FD', marginBottom: 6},
    howDetail: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 28},
    stepsRow: {display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 4, position: 'relative'},
    stepItem: {flex: 1, textAlign: 'center', position: 'relative'},
    stepCircle: {width: 44, height: 44, borderRadius: '50%', background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px'},
    stepNumber: {fontFamily: "'DM Serif Display', serif", fontSize: 18, color: '#A78BFA'},
    stepTitle: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.3, marginBottom: 4},
    stepSub: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.35)', lineHeight: 1.3},
    stepArrow: {position: 'absolute', right: -10, top: 14, fontSize: 16, color: 'rgba(139,92,246,0.3)'},
    imagePlaceholderBox2: {margin: '8px 24px 32px', height: 200, borderRadius: 18, border: '2px dashed rgba(236,72,153,0.25)', background: 'rgba(236,72,153,0.04)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10},
    imagePlaceholderLabel: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'rgba(236,72,153,0.5)', textTransform: 'uppercase'},
    imagePlaceholderHint: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.25)'},
    testimonialSection: {padding: '0 24px 36px'},
    testimonialCard: {background: 'linear-gradient(135deg, rgba(139,92,246,0.06), rgba(236,72,153,0.04))', border: '1px solid rgba(139,92,246,0.12)', borderRadius: 20, padding: '28px 22px', position: 'relative'},
    testimonialQuoteMark: {fontFamily: "'DM Serif Display', serif", fontSize: 60, color: 'rgba(139,92,246,0.15)', position: 'absolute', top: 8, left: 16, lineHeight: 1},
    testimonialText: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', fontStyle: 'italic', marginBottom: 20, position: 'relative', zIndex: 1},
    testimonialAuthor: {display: 'flex', alignItems: 'center', gap: 12},
    testimonialInitials: {width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: '#FFFFFF'},
    testimonialName: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: '#FFFFFF', marginBottom: 1},
    testimonialLocation: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.35)'}
  };

  return (
    <>
      <section style={s.companionSection}>
        <div style={s.companionCard}>
          <div style={s.lupitaGlow} />
          <div style={s.companionHeader}>
            <div style={s.lupitaAvatar}><span style={s.avatarLetter}>L</span></div>
            <div>
              <h3 style={s.lupitaName}>Lupita</h3>
              <p style={s.companionFor}>Para tus papás y abuelos · 55+</p>
            </div>
          </div>
          <blockquote style={s.companionQuote}>
            <span style={s.quoteOpenMark}>&quot;</span>
            Soy Lupita. Voy a llamar a tu familia esta semana para presentarme.
            No para venderles nada — solo para que sepan que aquí estamos.
            Para platicar de lo que quieran: recetas, el clima, los nietos.
            Para que sepan que ya no están solos.
            <span style={s.quoteCloseMark}>&quot;</span>
          </blockquote>
          <div style={s.tagsRow}>
            {['Llamadas de compañía', 'Historias y conversación', 'Siempre con tiempo'].map((tag, j) => (
              <span key={j} style={s.tagLupita}>{tag}</span>
            ))}
          </div>
        </div>

        <div style={{...s.companionCard, marginTop: 20}}>
          <div style={s.fernandaGlow} />
          <div style={s.companionHeader}>
            <div style={s.fernandaAvatar}><span style={s.avatarLetter}>F</span></div>
            <div>
              <h3 style={s.fernandaName}>Fernanda</h3>
              <p style={s.companionFor}>Para mamás y esposas · 25–50</p>
            </div>
          </div>
          <blockquote style={s.companionQuote}>
            <span style={s.quoteOpenMark}>&quot;</span>
            Sé lo que es estar sola con los hijos mientras tu esposo trabaja lejos.
            Voy a llamarte — para platicar, para escucharte, o simplemente para
            recordarte que no estás sola. Sin juicios. Como una amiga que siempre
            tiene tiempo.
            <span style={s.quoteCloseMark}>&quot;</span>
          </blockquote>
          <div style={s.tagsRow}>
            {['Alguien que escucha', 'Conversación real', 'Siempre disponible'].map((tag, j) => (
              <span key={j} style={s.tagFernanda}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={s.howSection}>
        <h2 style={s.howTitle}>Así funciona</h2>
        <p style={s.howSubtitle}>Ellas llaman a tu familia. Tu familia no tiene que hacer nada.</p>
        <p style={s.howDetail}>Sin apps. Sin descargas. Solo una llamada cálida al celular.</p>
        <div style={s.stepsRow}>
          {[
            { step: '1', title: 'Tú contrataste', sub: 'Ya estás aquí' },
            { step: '2', title: 'Lupita o Fernanda llama', sub: 'A tu familia en México' },
            { step: '3', title: 'Conexión real', sub: 'Compañía, no ventas' },
          ].map((st, i) => (
            <div key={i} style={s.stepItem}>
              <div style={s.stepCircle}><span style={s.stepNumber}>{st.step}</span></div>
              <p style={s.stepTitle}>{st.title}</p>
              <p style={s.stepSub}>{st.sub}</p>
              {i < 2 && <div style={s.stepArrow}>→</div>}
            </div>
          ))}
        </div>
      </section>

      <div style={s.imagePlaceholderBox2}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(236,72,153,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <span style={s.imagePlaceholderLabel}>IMAGEN PLACEHOLDER 2</span>
        <span style={s.imagePlaceholderHint}>Reemplaza este div por tu imagen</span>
      </div>

      <section style={s.testimonialSection}>
        <div style={s.testimonialCard}>
          <div style={s.testimonialQuoteMark}>&quot;</div>
          <p style={s.testimonialText}>
            Desde hace tres semanas mi mamá me habla de su amiga Lupita, que ya
            están hasta intercambiando recetas. Me alegra mucho que se sienta
            acompañada y tenga con quién compartir sus aventuras. Por primera vez
            en años, no me preocupo tanto.
          </p>
          <div style={s.testimonialAuthor}>
            <div style={s.testimonialInitials}>JL</div>
            <div>
              <p style={s.testimonialName}>José Luis M.</p>
              <p style={s.testimonialLocation}>Los Angeles, California</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
