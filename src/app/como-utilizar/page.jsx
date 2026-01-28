'use client';

import SharedHeader from '../../components/SharedHeader';
import SharedFooter from '../../components/SharedFooter';

export default function ComoUtilizarPage() {
  return (
    <>
      <SharedHeader />
      
      <style jsx global>{`
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #111827;
          color: white;
          margin: 0;
          padding: 0;
        }

        .guia-page {
          min-height: 100vh;
          padding: 120px 24px 80px;
          background: #111827;
        }

        .guia-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .page-title {
          font-size: 48px;
          font-weight: 800;
          text-align: center;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #06B6D4, #EC4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-subtitle {
          font-size: 20px;
          text-align: center;
          color: rgba(255,255,255,0.7);
          margin-bottom: 60px;
        }

        .guia-image-wrapper {
          background: #1F2937;
          border-radius: 24px;
          padding: 24px;
          border: 2px solid rgba(6, 182, 212, 0.2);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }

        .guia-image {
          width: 100%;
          height: auto;
          border-radius: 16px;
          display: block;
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 36px;
          }
        }
      `}</style>

      <div className="guia-page">
        <div className="guia-container">
          <h1 className="page-title">Cómo utilizar nuestros servicios</h1>
          <p className="page-subtitle">
            Guía paso a paso para aprovechar al máximo SaludCompartida
          </p>

          <div className="guia-image-wrapper">
            <img 
              src="/GUIA DE UTILIZACION.png" 
              alt="Guía de Utilización de SaludCompartida"
              className="guia-image"
            />
          </div>
        </div>
      </div>

      <SharedFooter />
    </>
  );
}
