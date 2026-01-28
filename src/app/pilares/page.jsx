'use client';

import SharedHeader from '../../components/SharedHeader';
import SharedFooter from '../../components/SharedFooter';

export default function PilaresPage() {
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

        .pilares-page {
          min-height: 100vh;
          padding: 120px 24px 80px;
          background: var(--gray-900);
        }

        .pilares-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-title {
          font-size: 48px;
          font-weight: 800;
          text-align: center;
          margin-bottom: 24px;
        }

        .title-highlight {
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

        .pillars-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          margin-top: 60px;
        }

        @media (min-width: 768px) {
          .pillars-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .pillar-card {
          background: var(--gray-800);
          border-radius: 24px;
          padding: 40px;
          border: 2px solid rgba(6, 182, 212, 0.2);
          transition: all 0.3s ease;
          position: relative;
        }

        .pillar-card:hover {
          transform: translateY(-4px);
          border-color: var(--cyan);
          box-shadow: 0 8px 32px rgba(6, 182, 212, 0.2);
        }

        .pillar-number {
          position: absolute;
          top: -20px;
          right: 30px;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, var(--cyan), #0891B2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 800;
          box-shadow: 0 4px 12px rgba(6, 182, 212, 0.4);
        }

        .pillar-card:last-child .pillar-number {
          background: linear-gradient(135deg, var(--magenta), #DB2777);
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.4);
        }

        .pillar-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 20px;
          line-height: 1.3;
        }

        .pillar-description {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(255,255,255,0.85);
          margin-bottom: 24px;
        }

        .pillar-stat {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .pillar-stat-number {
          font-size: 36px;
          font-weight: 800;
          color: var(--cyan);
          margin-bottom: 8px;
        }

        .pillar-card:last-child .pillar-stat-number {
          color: var(--magenta);
        }

        .pillar-stat-label {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 36px;
          }

          .pillar-card {
            padding: 32px 24px;
          }

          .pillar-title {
            font-size: 20px;
          }
        }
      `}</style>

      <div className="pilares-page">
        <div className="pilares-container">
          <h1 className="page-title">
            Los Cuatro <span className="title-highlight">Pilares</span> de SaludCompartida
          </h1>
          <p className="page-subtitle">
            Tú pagas aquí. Ellos se cuidan allá. Con 40¢ al día, tu familia tiene acceso a todo esto:
          </p>

          <div className="pillars-grid">
            {/* Pillar 1 - Telemedicina */}
            <div className="pillar-card">
              <div className="pillar-number">1</div>
              <h3 className="pillar-title">
                <span style={{color: 'var(--cyan)'}}>PILAR 1:</span> Servicios Médicos que te permitan ahorrar dinero
              </h3>
              <p className="pillar-description">
                • Doctor por videollamada 24/7. Sin citas, sin esperas, sin madrugadas.<br/>
                • Descuentos en farmacias en todos los productos hasta un 75% en más de 1,700 farmacias en todo México.<br/>
                • Soporte emocional para quien más lo necesita de tu familia semanalmente.
              </p>
              <div className="pillar-stat">
                <div className="pillar-stat-number">$6.3B</div>
                <div className="pillar-stat-label">
                  En México las familias que reciben remesas gastan out of pocket anuales en gastos de Salud. Nuestra prioridad es ayudar a cada familia a reducir ese gasto
                </div>
              </div>
            </div>

            {/* Pillar 2 - WhatsApp */}
            <div className="pillar-card">
              <div className="pillar-number">2</div>
              <h3 className="pillar-title">
                <span style={{color: 'var(--cyan)'}}>PILAR 2:</span> Te Acompañamos y Queremos Mejorar para ti
              </h3>
              <p className="pillar-description">
                • Pregúntanos a través de WhatsApp.<br/>
                • ¿Cómo te atendieron? ¿Qué dudas tienes?<br/>
                • ¿En qué más te podemos ayudar?<br/>
                • No estás solo navegando el sistema.
              </p>
              <div className="pillar-stat">
                <div className="pillar-stat-number">24/7</div>
                <div className="pillar-stat-label">Siempre disponibles para resolver tus dudas</div>
              </div>
            </div>

            {/* Pillar 3 - Dashboard de Ahorros */}
            <div className="pillar-card">
              <div className="pillar-number">3</div>
              <h3 className="pillar-title">
                <span style={{color: 'var(--cyan)'}}>PILAR 3:</span> Nos comprometemos a mostrarte cuánto estás ahorrando
              </h3>
              <p className="pillar-description">
                • Información visible para ti y para tu familia.<br/>
                • Ayudarte a reducir tus gastos es nuestra prioridad.<br/>
                • Dashboard accesible en todo momento.
              </p>
              <div className="pillar-stat">
                <div className="pillar-stat-number">$432</div>
                <div className="pillar-stat-label">Ahorro promedio anual por familia</div>
              </div>
            </div>

            {/* Pillar 4 - Lupita y Fernanda (MAGENTA - AL FINAL) */}
            <div className="pillar-card">
              <div className="pillar-number">4</div>
              <h3 className="pillar-title">
                <span style={{color: 'var(--magenta)'}}>PILAR 4: Lupita y Fernanda</span> - Acompañamiento a tus seres queridos
              </h3>
              <p className="pillar-description">
                <strong>Lupita:</strong> Compañía para adultos mayores.<br/>
                • Llama semanalmente a tus padres o abuelos.<br/>
                • Conversaciones sobre recetas, historias, música.<br/><br/>
                <strong>Fernanda:</strong> Apoyo para mamás y familias.<br/>
                • Acompaña a esposas de migrantes, madres jóvenes.<br/>
                • Crianza, recetas, presupuesto familiar.
              </p>
              <p className="pillar-description" style={{marginTop: '12px'}}>
                Nuestro objetivo es acompañar a tus seres queridos en caso de que se sientan solos.
              </p>
              <div className="pillar-stat">
                <div className="pillar-stat-number">
                  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '48px', height: '48px'}}>
                    <circle cx="20" cy="20" r="8" fill="var(--magenta)"/>
                    <path d="M12 35 C12 28, 28 28, 28 35" fill="var(--magenta)"/>
                    <circle cx="44" cy="22" r="7" fill="var(--magenta)"/>
                    <path d="M37 38 C37 32, 51 32, 51 38" fill="var(--magenta)"/>
                  </svg>
                </div>
                <div className="pillar-stat-label">Acompañamiento real a tus seres queridos</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SharedFooter />
    </>
  );
}
