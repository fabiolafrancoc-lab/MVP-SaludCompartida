'use client';
import Hero from './sections/Hero';
import Companions from './sections/Companions';
import Closing from './sections/Closing';

export default function LupitaFernandaPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap');
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gentlePulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }
      `}</style>
      <div style={{background: '#07080F', minHeight: '100vh', display: 'flex', justifyContent: 'center'}}>
        <div style={{width: '100%', maxWidth: 430, background: '#0B0E18', minHeight: '100vh', position: 'relative', overflow: 'hidden'}}>
          <Hero />
          <Companions />
          <Closing />
        </div>
      </div>
    </>
  );
}
