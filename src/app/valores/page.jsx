'use client';

import SharedHeader from '../../components/SharedHeader';
import SharedFooter from '../../components/SharedFooter';

export default function ValoresPage() {
  return (
    <>
      <SharedHeader />
      
      <style jsx global>{`
        :root {
          --cyan: #06B6D4;
          --magenta: #EC4899;
          --gray-900: #111827;
          --gray-800: #1F2937;
        }

        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: var(--gray-900);
          color: white;
          margin: 0;
          padding: 0;
        }

        .valores-page {
          min-height: 100vh;
          padding: 120px 24px 80px;
          background: var(--gray-900);
        }

        .valores-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-title {
          font-size: 48px;
          font-weight: 800;
          text-align: center;
          margin-bottom: 24px;
          background: linear-gradient(135deg, var(--cyan), var(--magenta));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-subtitle {
          font-size: 20px;
          text-align: center;
          color: rgba(255,255,255,0.7);
          margin-bottom: 60px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .valores-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          margin-top: 60px;
        }

        .valor-card {
          background: var(--gray-800);
          border-radius: 20px;
          padding: 40px;
          border: 1px solid rgba(6, 182, 212, 0.2);
          transition: all 0.3s ease;
        }

        .valor-card:hover {
          border-color: var(--cyan);
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(6, 182, 212, 0.2);
        }

        .valor-icon {
          width: 56px;
          height: 56px;
          margin-bottom: 20px;
        }

        .valor-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--cyan);
        }

        .valor-description {
          font-size: 18px;
          line-height: 1.7;
          color: rgba(255,255,255,0.85);
        }

        @media (min-width: 768px) {
          .valores-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (min-width: 1024px) {
          .valores-grid {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 36px;
          }

          .valor-card {
            padding: 28px;
          }

          .valor-title {
            font-size: 24px;
          }

          .valor-description {
            font-size: 16px;
          }
        }
      `}</style>

      <div className="valores-page">
        <div className="valores-container">
          <h1 className="page-title">Nuestros Valores</h1>
          <p className="page-subtitle">
            Los principios que definen quiénes somos y cómo servimos a nuestras familias
          </p>

          <div className="valores-grid">
            {/* Valor 1 - Empatía */}
            <div className="valor-card">
              <svg className="valor-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M32 52 C16 40, 8 32, 8 20 C8 10, 16 8, 20 8 C26 8, 30 12, 32 16 C34 12, 38 8, 44 8 C48 8, 56 10, 56 20 C56 32, 48 40, 32 52 Z" 
                      fill="var(--magenta)" stroke="var(--magenta)" strokeWidth="2"/>
              </svg>
              <h3 className="valor-title">Empatía</h3>
              <p className="valor-description">
                Entendemos el dolor de estar lejos. Cada familia que servimos es tratada como si fuera la nuestra.
              </p>
            </div>

            {/* Valor 2 - Transparencia */}
            <div className="valor-card">
              <svg className="valor-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="12" y="12" width="40" height="40" rx="4" stroke="var(--cyan)" strokeWidth="3"/>
                <path d="M20 24 L32 36 L44 20" stroke="var(--cyan)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="valor-title">Transparencia</h3>
              <p className="valor-description">
                Sin letra pequeña, sin sorpresas. Mostramos exactamente cuánto ahorras y cómo te ayudamos.
              </p>
            </div>

            {/* Valor 3 - Compromiso */}
            <div className="valor-card">
              <svg className="valor-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="32" cy="32" r="24" stroke="var(--cyan)" strokeWidth="3"/>
                <path d="M32 16 L32 32 L44 32" stroke="var(--cyan)" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              <h3 className="valor-title">Compromiso</h3>
              <p className="valor-description">
                24/7, 365 días al año. Cuando tu familia nos necesita, estamos ahí. Sin excepciones.
              </p>
            </div>

            {/* Valor 4 - Innovación */}
            <div className="valor-card">
              <svg className="valor-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M32 8 L32 24 M32 40 L32 56 M8 32 L24 32 M40 32 L56 32" stroke="var(--cyan)" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="32" cy="32" r="8" fill="var(--cyan)" stroke="var(--cyan)" strokeWidth="2"/>
              </svg>
              <h3 className="valor-title">Innovación</h3>
              <p className="valor-description">
                Tecnología al servicio del cuidado humano. Hacemos simple lo que antes era imposible.
              </p>
            </div>

            {/* Valor 5 - Calidad */}
            <div className="valor-card">
              <svg className="valor-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M32 8 L40 24 L56 28 L44 40 L48 56 L32 48 L16 56 L20 40 L8 28 L24 24 Z" 
                      stroke="var(--cyan)" strokeWidth="3" fill="rgba(6, 182, 212, 0.2)"/>
              </svg>
              <h3 className="valor-title">Calidad</h3>
              <p className="valor-description">
                Médicos certificados, farmacias verificadas, servicios probados. Tu familia merece lo mejor.
              </p>
            </div>

            {/* Valor 6 - Accesibilidad */}
            <div className="valor-card">
              <svg className="valor-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="32" cy="32" r="24" stroke="var(--cyan)" strokeWidth="3"/>
                <text x="32" y="42" textAnchor="middle" fontSize="28" fontWeight="bold" fill="var(--cyan)">$</text>
              </svg>
              <h3 className="valor-title">Accesibilidad</h3>
              <p className="valor-description">
                40¢ al día. Porque el cuidado de salud no debe ser un lujo, sino un derecho para todos.
              </p>
            </div>
          </div>
        </div>
      </div>

      <SharedFooter />
    </>
  );
}
