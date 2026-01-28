'use client';

import SharedHeader from '../../components/SharedHeader';
import SharedFooter from '../../components/SharedFooter';

export default function QueResolvemosPage() {
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

        .que-resolvemos-page {
          min-height: 100vh;
          padding: 120px 24px 80px;
          background: var(--gray-900);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-section {
          text-align: center;
          margin-bottom: 80px;
        }

        .main-title {
          font-size: 56px;
          font-weight: 800;
          margin-bottom: 24px;
          background: linear-gradient(135deg, var(--cyan), var(--magenta));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 28px;
          color: rgba(255,255,255,0.9);
          margin-bottom: 16px;
          font-weight: 600;
        }

        .tagline {
          font-size: 20px;
          color: var(--cyan);
          font-style: italic;
          margin-bottom: 60px;
        }

        .section-title {
          font-size: 36px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 48px;
          color: var(--cyan);
        }

        .problems-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
          margin-bottom: 80px;
        }

        .problem-card {
          background: var(--gray-800);
          border-radius: 20px;
          padding: 32px 24px;
          border: 2px solid rgba(6, 182, 212, 0.2);
          transition: all 0.3s ease;
        }

        .problem-card:hover {
          border-color: var(--cyan);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(6, 182, 212, 0.3);
        }

        .problem-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--cyan);
        }

        .problem-description {
          font-size: 16px;
          line-height: 1.6;
          color: rgba(255,255,255,0.8);
        }

        .solution-section {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(236, 72, 153, 0.1));
          border-radius: 32px;
          padding: 60px 40px;
          margin-bottom: 80px;
          border: 2px solid var(--cyan);
        }

        .solution-title {
          font-size: 42px;
          font-weight: 800;
          text-align: center;
          margin-bottom: 16px;
          color: white;
        }

        .solution-subtitle {
          font-size: 24px;
          text-align: center;
          color: var(--cyan);
          margin-bottom: 48px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 40px;
        }

        .feature-card {
          text-align: center;
          padding: 24px;
        }

        .feature-number {
          font-size: 48px;
          font-weight: 800;
          color: var(--cyan);
          margin-bottom: 8px;
        }

        .feature-label {
          font-size: 14px;
          color: rgba(255,255,255,0.7);
        }

        .feature-description {
          font-size: 18px;
          color: white;
          font-weight: 600;
        }

        .ai-companion-section {
          background: linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(6, 182, 212, 0.1));
          border-radius: 32px;
          padding: 60px 40px;
          margin-bottom: 80px;
          border: 2px solid var(--magenta);
        }

        .ai-title {
          font-size: 42px;
          font-weight: 800;
          text-align: center;
          margin-bottom: 24px;
          color: var(--magenta);
        }

        .ai-subtitle {
          font-size: 20px;
          text-align: center;
          color: rgba(255,255,255,0.9);
          margin-bottom: 48px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .crisis-solution-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 48px;
        }

        .crisis-card, .solution-card {
          background: var(--gray-800);
          border-radius: 20px;
          padding: 32px;
        }

        .crisis-card {
          border: 2px solid rgba(255, 0, 0, 0.3);
        }

        .solution-card {
          border: 2px solid var(--magenta);
        }

        .card-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 20px;
          color: var(--magenta);
        }

        .crisis-card .card-title {
          color: #ff6b6b;
        }

        .list-item {
          font-size: 16px;
          line-height: 1.8;
          color: rgba(255,255,255,0.9);
          margin-bottom: 12px;
          padding-left: 24px;
          position: relative;
        }

        .list-item:before {
          content: "•";
          position: absolute;
          left: 0;
          color: var(--magenta);
          font-size: 24px;
          line-height: 1;
        }

        .crisis-card .list-item:before {
          color: #ff6b6b;
        }

        .solution-card .list-item:before {
          content: "✓";
          color: var(--magenta);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          background: var(--gray-800);
          border-radius: 20px;
          padding: 40px;
          border: 2px solid var(--magenta);
        }

        .stat-card {
          text-align: center;
        }

        .stat-number {
          font-size: 48px;
          font-weight: 800;
          color: var(--magenta);
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 16px;
          color: rgba(255,255,255,0.8);
          margin-bottom: 4px;
        }

        .stat-sublabel {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
        }

        .access-section {
          margin-bottom: 80px;
        }

        .access-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .access-card {
          background: var(--gray-800);
          border-radius: 24px;
          padding: 40px;
          border: 2px solid rgba(6, 182, 212, 0.3);
        }

        .access-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 24px;
          color: var(--cyan);
        }

        .access-list {
          list-style: none;
          padding: 0;
        }

        .access-list li {
          font-size: 16px;
          line-height: 1.8;
          color: rgba(255,255,255,0.9);
          margin-bottom: 12px;
          padding-left: 28px;
          position: relative;
        }

        .access-list li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: var(--cyan);
          font-weight: bold;
          font-size: 20px;
        }

        .final-message {
          text-align: center;
          font-size: 32px;
          font-weight: 700;
          padding: 60px 40px;
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(236, 72, 153, 0.2));
          border-radius: 24px;
          border: 2px solid var(--cyan);
          margin-bottom: 60px;
        }

        .final-message span {
          background: linear-gradient(135deg, var(--cyan), var(--magenta));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (max-width: 768px) {
          .main-title { font-size: 36px; }
          .subtitle { font-size: 22px; }
          .section-title { font-size: 28px; }
          .solution-title, .ai-title { font-size: 32px; }
          .features-grid { grid-template-columns: 1fr; }
          .crisis-solution-grid { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: 1fr; }
          .access-grid { grid-template-columns: 1fr; }
          .final-message { font-size: 24px; padding: 40px 24px; }
        }
      `}</style>

      <div className="que-resolvemos-page">
        <div className="container">
          
          {/* Hero Section */}
          <div className="hero-section">
            <h1 className="main-title">Qué Resolvemos</h1>
            <p className="subtitle">Transformando el acceso a la salud para familias migrantes</p>
            <p className="tagline">"El acceso a la salud NO debe ser un privilegio"</p>
          </div>

          {/* Problems We Solve */}
          <h2 className="section-title">Los Problemas Que Enfrentan Las Familias</h2>
          <div className="problems-grid">
            <div className="problem-card">
              <h3 className="problem-title">Consultas Médicas</h3>
              <p className="problem-description">
                Acceso presencial y 24/7 por video y WhatsApp que las familias retrasan por meses
              </p>
            </div>

            <div className="problem-card">
              <h3 className="problem-title">Medicamentos con Receta</h3>
              <p className="problem-description">
                Que consumen cheques completos de sueldo
              </p>
            </div>

            <div className="problem-card">
              <h3 className="problem-title">Exámenes Médicos Ambulatorios</h3>
              <p className="problem-description">
                Que quedan sin hacerse por falta de acceso
              </p>
            </div>

            <div className="problem-card">
              <h3 className="problem-title">Apoyo en Salud Mental</h3>
              <p className="problem-description">
                Que permanece fuera del alcance de muchas familias
              </p>
            </div>

            <div className="problem-card">
              <h3 className="problem-title">Acceso a Especialistas</h3>
              <p className="problem-description">
                Que se siente como un lujo inalcanzable
              </p>
            </div>

            <div className="problem-card" style={{borderColor: 'rgba(236, 72, 153, 0.3)'}}>
              <h3 className="problem-title" style={{color: 'var(--magenta)'}}>Reducir la SOLEDAD</h3>
              <p className="problem-description">
                La epidemia silenciosa que afecta a millones de familias
              </p>
            </div>
          </div>

          {/* The Solution */}
          <div className="solution-section">
            <h2 className="solution-title">La Solución: SaludCompartida</h2>
            <p className="solution-subtitle">Una App. Salud Completa. $12/mes</p>
            <p style={{textAlign: 'center', fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '40px'}}>
              La plataforma transforma gastos de bolsillo en pagos de suscripción manejables, eliminando el estrés financiero.
            </p>

            <h3 style={{fontSize: '28px', fontWeight: '700', textAlign: 'center', marginBottom: '32px', color: 'var(--cyan)'}}>
              30 Segundos Para Acceso a Salud
            </h3>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-number">$12</div>
                <p className="feature-description">Migrante compra suscripción mensual</p>
                <p className="feature-label">APIs de plataforma aseguradas</p>
              </div>

              <div className="feature-card">
                <div className="feature-number">30s</div>
                <p className="feature-description">Familia recibe código por WhatsApp</p>
                <p className="feature-label">Telemedicina asegurada</p>
              </div>

              <div className="feature-card">
                <div className="feature-number">AHORA</div>
                <p className="feature-description">Llamada con doctor inicia inmediatamente</p>
                <p className="feature-label">Farmacias aseguradas</p>
              </div>
            </div>
          </div>

          {/* AI Companion Section */}
          <div className="ai-companion-section">
            <h2 className="ai-title">Acompañante IA: Combatiendo la Epidemia Silenciosa</h2>
            <p className="ai-subtitle">
              Más allá del acceso a salud, estamos resolviendo la crisis de soledad que afecta al 75% de adultos mayores con condiciones crónicas.
            </p>

            <div className="crisis-solution-grid">
              <div className="crisis-card">
                <h3 className="card-title">La Crisis</h3>
                <div className="list-item">Adultos mayores aislados olvidan sus medicamentos (40% peor adherencia)</div>
                <div className="list-item">Evitan visitas al doctor porque "a nadie le importa"</div>
                <div className="list-item">Depresión lleva a 28% más visitas a emergencias</div>
                <div className="list-item">Familiares en el extranjero se sienten impotentes y culpables</div>
              </div>

              <div className="solution-card">
                <h3 className="card-title">Nuestra Acompañante IA</h3>
                <div className="list-item">Chequeos diarios vía voz y texto de WhatsApp</div>
                <div className="list-item">Algoritmos de empatía diseñados con psicólogos</div>
                <div className="list-item">Recordatorios de medicamentos con aliento emocional</div>
                <div className="list-item">Adaptada culturalmente para familias latinas</div>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">2,000+</div>
                <p className="stat-label">Conversaciones Diarias</p>
                <p className="stat-sublabel">(por sistema)</p>
              </div>

              <div className="stat-card">
                <div className="stat-number">24/7</div>
                <p className="stat-label">Siempre Disponible</p>
                <p className="stat-sublabel">(nunca se cansa)</p>
              </div>

              <div className="stat-card">
                <div className="stat-number">$0</div>
                <p className="stat-label">Costo Extra</p>
                <p className="stat-sublabel">(incluido en suscripción)</p>
              </div>
            </div>
          </div>

          {/* Access Section */}
          <div className="access-section">
            <h2 className="section-title">Acceso Inmediato Para Tu Familia</h2>
            <div className="access-grid">
              <div className="access-card">
                <h3 className="access-title">Migrante - Acceso Inmediato a:</h3>
                <ul className="access-list">
                  <li>Estados de Ahorros Agregados</li>
                  <li>Blog y Comunidad</li>
                  <li>Notificaciones Push</li>
                </ul>
              </div>

              <div className="access-card">
                <h3 className="access-title">Usuario en México - Acceso Inmediato a:</h3>
                <ul className="access-list">
                  <li>Consultas ilimitadas 24/7</li>
                  <li>Descuentos en Farmacias: Medicamentos y más</li>
                  <li>Acceso con Descuentos a Consultas Presenciales (Doctor General y Especialistas)</li>
                  <li>Exámenes Médicos Ambulatorios</li>
                  <li>Subir Historial Médico Familiar</li>
                  <li>Estados de Ahorros Mensuales</li>
                  <li>Guía de Referencia Médica</li>
                  <li>Acompañante IA (apoyo emocional 24/7 y recordatorios de medicamentos)</li>
                  <li>Cuatro usuarios por suscripción</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Final Message */}
          <div className="final-message">
            <span>Haciendo de la salud un derecho humano, no un privilegio.</span>
          </div>

        </div>
      </div>

      <SharedFooter />
    </>
  );
}
