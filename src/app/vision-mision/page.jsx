'use client';

import SharedHeader from '../../components/SharedHeader';
import SharedFooter from '../../components/SharedFooter';

export default function VisionMisionPage() {
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

        .vision-mision-page {
          min-height: 100vh;
          padding: 120px 24px 80px;
          background: var(--gray-900);
        }

        .vision-mision-container {
          max-width: 1200px;
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

        .vision-mision-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          margin-top: 60px;
        }

        .vision-card, .mision-card {
          background: var(--gray-800);
          border-radius: 24px;
          padding: 48px;
          border: 1px solid rgba(6, 182, 212, 0.2);
          transition: all 0.3s ease;
        }

        .vision-card:hover, .mision-card:hover {
          border-color: var(--cyan);
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(6, 182, 212, 0.2);
        }

        .card-icon {
          width: 64px;
          height: 64px;
          margin-bottom: 24px;
        }

        .card-title {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 20px;
          color: var(--cyan);
        }

        .card-text {
          font-size: 20px;
          line-height: 1.8;
          color: rgba(255,255,255,0.9);
        }

        @media (min-width: 768px) {
          .vision-mision-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 36px;
          }

          .vision-card, .mision-card {
            padding: 32px;
          }

          .card-title {
            font-size: 28px;
          }

          .card-text {
            font-size: 18px;
          }
        }
      `}</style>

      <div className="vision-mision-page">
        <div className="vision-mision-container">
          <h1 className="page-title">Nuestra Visión y Misión</h1>
          <p className="page-subtitle">
            El propósito que guía cada paso de SaludCompartida
          </p>

          <div className="vision-mision-grid">
            {/* Visión */}
            <div className="vision-card">
              <svg className="card-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="32" cy="32" r="28" stroke="var(--cyan)" strokeWidth="3"/>
                <path d="M32 12 L32 32 L44 44" stroke="var(--cyan)" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="32" cy="32" r="4" fill="var(--cyan)"/>
              </svg>
              <h2 className="card-title">Visión</h2>
              <p className="card-text">
                Ser el puente de salud y compañía más confiable para las familias migrantes, donde la distancia nunca sea una barrera para cuidar a quienes más amas.
              </p>
            </div>

            {/* Misión */}
            <div className="mision-card">
              <svg className="card-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M32 8 L40 24 L56 28 L44 40 L48 56 L32 48 L16 56 L20 40 L8 28 L24 24 Z" 
                      stroke="var(--cyan)" strokeWidth="3" fill="rgba(6, 182, 212, 0.2)"/>
              </svg>
              <h2 className="card-title">Misión</h2>
              <p className="card-text">
                Ofrecer servicios de salud accesibles y compañía genuina para familias en México, permitiendo que los migrantes en Estados Unidos cuiden de sus seres queridos con tranquilidad y amor, sin importar la distancia.
              </p>
            </div>
          </div>
        </div>
      </div>

      <SharedFooter />
    </>
  );
}
