export default function Hero() {
  const s = {
    heroSection: {padding: '48px 24px 32px', textAlign: 'center'},
    heroBadge: {display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 100, padding: '6px 16px', marginBottom: 28},
    heroBadgeDot: {width: 6, height: 6, borderRadius: '50%', background: '#8B5CF6', boxShadow: '0 0 8px rgba(139,92,246,0.6)', animation: 'gentlePulse 3s ease-in-out infinite'},
    heroBadgeText: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.5, color: '#A78BFA', textTransform: 'uppercase'},
    heroTitle: {fontFamily: "'DM Serif Display', serif", fontSize: 30, lineHeight: 1.25, color: '#FFFFFF', marginBottom: 20, letterSpacing: -0.5},
    heroTitleAccent: {color: '#C4B5FD', display: 'block', marginTop: 4},
    heroSubtitle: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', maxWidth: 360, margin: '0 auto'},
    imagePlaceholderBox: {margin: '0 24px 32px', height: 220, borderRadius: 18, border: '2px dashed rgba(139,92,246,0.25)', background: 'rgba(139,92,246,0.04)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10},
    imagePlaceholderLabel: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'rgba(139,92,246,0.5)', textTransform: 'uppercase'},
    imagePlaceholderHint: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.25)'},
    scenesSection: {padding: '0 24px 32px', display: 'flex', flexDirection: 'column', gap: 14},
    sceneCard: {background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '20px 18px', animation: 'fadeSlideIn 0.6s ease-out both'},
    sceneTime: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#8B5CF6', marginBottom: 10},
    sceneText: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', marginBottom: 12},
    sceneAside: {fontFamily: "'DM Serif Display', serif", fontSize: 14, fontStyle: 'italic', color: '#C4B5FD', textAlign: 'right'},
    transitionSection: {padding: '20px 24px 36px', textAlign: 'center'},
    transitionLine: {height: 1, background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)', marginBottom: 24, marginTop: 24},
    transitionText: {fontFamily: "'DM Serif Display', serif", fontSize: 22, lineHeight: 1.5, color: '#FFFFFF'},
    transitionMuted: {color: 'rgba(255,255,255,0.35)'},
    transitionHighlight: {color: '#A78BFA', display: 'block', marginTop: 6, fontSize: 24}
  };

  const scenes = [
    {time: 'Martes, 3:00 PM', text: 'Tu mamá terminó de comer. Sola. La tele está prendida, pero nadie le pregunta cómo le fue en el doctor.', aside: '— Ella no te lo dice'},
    {time: 'Jueves, 10:30 PM', text: 'Tu esposa acostó a los niños. Quiere hablar con alguien. Pero tú llegas cansado y ella no quiere ser una carga más.', aside: '— Ella no te lo dice'},
    {time: 'Domingo, 11:00 AM', text: 'Tu abuelo se sentó en su silla. Antes le llegaban visitas. Ahora el teléfono no suena.', aside: '— Él no te lo dice'},
    {time: 'Todos los días', text: 'Tú mandas dinero. Pagas cuentas. Haces lo que puedes. Pero hay algo que el dinero no puede comprar: tu presencia.', aside: '— Y eso tú lo sabes'}
  ];

  return (
    <>
      <section style={s.heroSection}>
        <div style={s.heroBadge}>
          <span style={s.heroBadgeDot} />
          <span style={s.heroBadgeText}>Esto no es salud. Es conexión.</span>
        </div>
        <h1 style={s.heroTitle}>
          La distancia no solo duele en el cuerpo.{' '}
          <span style={s.heroTitleAccent}>Duele en el silencio.</span>
        </h1>
        <p style={s.heroSubtitle}>
          Tu mamá no te dice que se siente sola. Tu esposa no te cuenta que lloró otra vez.
          Tu abuelo ya no habla tanto por teléfono porque no quiere preocuparte.
        </p>
      </section>

      <div style={s.imagePlaceholderBox}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(139,92,246,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <span style={s.imagePlaceholderLabel}>IMAGEN PLACEHOLDER 1</span>
        <span style={s.imagePlaceholderHint}>Reemplaza este div por tu imagen</span>
      </div>

      <section style={s.scenesSection}>
        {scenes.map((scene, i) => (
          <div key={i} style={{...s.sceneCard, animationDelay: `${i * 0.15}s`}}>
            <div style={s.sceneTime}>{scene.time}</div>
            <p style={s.sceneText}>{scene.text}</p>
            <p style={s.sceneAside}>{scene.aside}</p>
          </div>
        ))}
      </section>

      <section style={s.transitionSection}>
        <div style={s.transitionLine} />
        <p style={s.transitionText}>
          Ahora imagina que alguien les llama.{' '}
          <span style={s.transitionMuted}>No para vender. No para cobrar.</span>{' '}
          <span style={s.transitionHighlight}>Solo para acompañar.</span>
        </p>
        <div style={s.transitionLine} />
      </section>
    </>
  );
}
