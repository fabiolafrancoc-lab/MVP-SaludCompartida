export default function Closing() {
  const s = {
    closingSection: {padding: '20px 24px 48px', textAlign: 'center'},
    closingTitle: {fontFamily: "'DM Serif Display', serif", fontSize: 26, color: '#FFFFFF', marginBottom: 14, lineHeight: 1.3},
    closingText: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', marginBottom: 28, maxWidth: 340, margin: '0 auto 28px'},
    closingCards: {display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24},
    closingCardLupita: {background: 'rgba(236,72,153,0.06)', border: '1px solid rgba(236,72,153,0.15)', borderRadius: 16, padding: '20px 14px', textAlign: 'center'},
    closingCardFernanda: {background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.15)', borderRadius: 16, padding: '20px 14px', textAlign: 'center'},
    closingCardIcon: {marginBottom: 10},
    lupitaAvatarSmall: {width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #EC4899, #9333EA)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'},
    fernandaAvatarSmall: {width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #06B6D4, #0891B2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'},
    avatarLetterSmall: {fontFamily: "'DM Serif Display', serif", fontSize: 17, color: '#FFFFFF'},
    closingCardTitle: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: '#FFFFFF'},
    closingBadge: {display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.18)', borderRadius: 100, padding: '8px 20px', marginBottom: 32},
    closingBadgeText: {fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: '#A78BFA'},
    tagline: {fontFamily: "'DM Serif Display', serif", fontSize: 14, fontStyle: 'italic', color: 'rgba(255,255,255,0.18)'}
  };

  return (
    <section style={s.closingSection}>
      <h2 style={s.closingTitle}>
        Tu familia nunca más estará sola.
      </h2>
      <p style={s.closingText}>
        Tú hiciste posible esto. Con tu trabajo, con tu esfuerzo.
        Aunque estés lejos, tu amor llega.
      </p>

      <div style={s.closingCards}>
        <div style={s.closingCardLupita}>
          <div style={s.closingCardIcon}>
            <div style={s.lupitaAvatarSmall}><span style={s.avatarLetterSmall}>L</span></div>
          </div>
          <p style={s.closingCardTitle}>Lupita para tus papás</p>
        </div>
        <div style={s.closingCardFernanda}>
          <div style={s.closingCardIcon}>
            <div style={s.fernandaAvatarSmall}><span style={s.avatarLetterSmall}>F</span></div>
          </div>
          <p style={s.closingCardTitle}>Fernanda para tu esposa</p>
        </div>
      </div>

      <div style={s.closingBadge}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        <span style={s.closingBadgeText}>Compañía ilimitada</span>
      </div>

      <p style={s.tagline}>
        Donde está tu corazón, está SaludCompartida
      </p>
    </section>
  );
}
