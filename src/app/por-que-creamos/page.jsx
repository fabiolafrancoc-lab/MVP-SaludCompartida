'use client';

import SharedHeader from '../../components/SharedHeader';
import SharedFooter from '../../components/SharedFooter';

export default function PorQueCreamos() {
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

        .por-que-page {
          min-height: 100vh;
          padding: 120px 24px 80px;
          background: #111827;
        }

        .por-que-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-title {
          font-size: 48px;
          font-weight: 800;
          text-align: center;
          margin-bottom: 24px;
        }

        .title-highlight {
          background: linear-gradient(135deg, #EC4899, #DB2777);
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

        .content-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          margin-top: 60px;
        }

        @media (min-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr 1fr;
            align-items: center;
          }
        }

        .video-wrapper {
          background: #1F2937;
          border-radius: 24px;
          padding: 16px;
          border: 2px solid rgba(236, 72, 153, 0.2);
        }

        .video-wrapper video {
          width: 100%;
          height: auto;
          border-radius: 16px;
        }

        .text-content {
          padding: 24px;
        }

        .text-content h3 {
          font-size: 32px;
          margin-bottom: 24px;
          color: #06B6D4;
        }

        .text-content p {
          font-size: 18px;
          line-height: 1.8;
          color: rgba(255,255,255,0.85);
          margin-bottom: 24px;
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 36px;
          }

          .text-content h3 {
            font-size: 24px;
          }

          .text-content p {
            font-size: 16px;
          }
        }
      `}</style>

      <div className="por-que-page">
        <div className="por-que-container">
          <h1 className="page-title">
            Por qué creamos <span className="title-highlight">SaludCompartida</span>
          </h1>
          <p className="page-subtitle">
            La historia detrás de nuestra misión de acortar distancias y cuidar familias
          </p>

          <div className="content-grid">
            {/* Video Testimonial */}
            <div className="video-wrapper">
              <video 
                controls
              >
                <source src="/VIDEO_PAGINA copy.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>

            {/* Texto explicativo */}
            <div className="text-content">
              <h3>Nuestra Historia</h3>
              <p>
                SaludCompartida nació de una necesidad real. Como muchos migrantes, 
                sentíamos la angustia de estar lejos cuando nuestros seres queridos 
                nos necesitaban.
              </p>
              <p>
                Queríamos crear algo más que un servicio médico. Queríamos construir 
                un puente que acortara las distancias, que les permitiera a las familias 
                sentirse acompañadas aunque estén a miles de kilómetros.
              </p>
              <p>
                <strong style={{color: '#06B6D4'}}>Por eso creamos a Lupita y Fernanda.</strong> 
                Por eso incluimos no solo telemedicina, sino compañía, terapia, y todo 
                lo que una familia necesita para sentirse cuidada y acompañada.
              </p>
            </div>
          </div>
        </div>
      </div>

      <SharedFooter />
    </>
  );
}
