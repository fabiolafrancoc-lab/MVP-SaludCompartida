export default function SharedHeader() {
  return (
    <>
      <style jsx global>{`
        .shared-header {
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(17, 24, 39, 0.98);
          backdrop-filter: blur(10px);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .shared-header-content {
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
        }

        .shared-logo-img {
          height: 40px;
          width: auto;
          cursor: pointer;
        }

        .shared-nav-menu {
          display: none;
          gap: 32px;
          flex: 1;
          justify-content: center;
        }

        @media (min-width: 1024px) {
          .shared-nav-menu {
            display: flex;
          }
        }

        .shared-nav-item {
          position: relative;
          color: rgba(255,255,255,0.85);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .shared-nav-item:hover {
          color: #06B6D4;
        }

        .shared-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 12px;
          background: rgba(31, 41, 55, 0.98);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 8px;
          min-width: 220px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }

        .shared-nav-item:hover .shared-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .shared-dropdown-item {
          display: block;
          padding: 10px 16px;
          color: rgba(255,255,255,0.8);
          font-size: 13px;
          border-radius: 8px;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .shared-dropdown-item:hover {
          background: rgba(6, 182, 212, 0.1);
          color: #06B6D4;
        }

        .shared-nav-cta {
          display: none;
          gap: 12px;
        }

        @media (min-width: 1024px) {
          .shared-nav-cta {
            display: flex;
          }
        }

        .shared-btn-contratar {
          padding: 10px 24px;
          background: linear-gradient(135deg, #06B6D4, #0891B2);
          color: white;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .shared-btn-contratar:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(6, 182, 212, 0.4);
        }

        .shared-btn-login {
          padding: 10px 24px;
          background: linear-gradient(135deg, #EC4899, #DB2777);
          color: white;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .shared-btn-login:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.4);
        }

        .shared-mobile-menu-btn {
          display: block;
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          padding: 8px;
        }

        @media (min-width: 1024px) {
          .shared-mobile-menu-btn {
            display: none;
          }
        }
      `}</style>

      <header className="shared-header">
        <div className="shared-header-content">
          {/* Logo */}
          <a href="/">
            <img src="/saludcompartida-dark-no-tagline.png" alt="SaludCompartida" className="shared-logo-img" />
          </a>

          {/* Desktop Navigation */}
          <nav className="shared-nav-menu">
            {/* Quiénes Somos */}
            <div className="shared-nav-item">
              Quiénes Somos
              <div className="shared-dropdown">
                <a href="/vision-mision" className="shared-dropdown-item">Visión y Misión</a>
                <a href="/que-resolvemos" className="shared-dropdown-item">Qué Resolvemos</a>
                <a href="/valores" className="shared-dropdown-item">Nuestros Valores</a>
                <a href="/pilares" className="shared-dropdown-item">Nuestros Pilares</a>
              </div>
            </div>

            {/* Cómo Utilizar SaludCompartida */}
            <div className="shared-nav-item">
              Cómo Utilizar SaludCompartida
              <div className="shared-dropdown">
                <a href="/como-utilizar" className="shared-dropdown-item">Cómo utilizar nuestros servicios</a>
                <a href="/como-utilizar-adulto-mayor" className="shared-dropdown-item">Cómo nuestro Adulto Mayor utiliza nuestros servicios</a>
              </div>
            </div>

            {/* Lo que nos hace únicos */}
            <div className="shared-nav-item">
              Lo que nos hace Únicos
              <div className="shared-dropdown">
                <a href="/por-que-creamos" className="shared-dropdown-item">Por qué creamos SaludCompartida</a>
                <a href="/lupita-fernanda" className="shared-dropdown-item">Lupita y Fernanda</a>
              </div>
            </div>
          </nav>

          {/* CTA Buttons */}
          <div className="shared-nav-cta">
            <a href="/subscribe" className="shared-btn-contratar">Contratar SaludCompartida</a>
            <a href="/dashboard" className="shared-btn-login">Ya Tengo mi Clave</a>
          </div>

          {/* Mobile Menu Button */}
          <button className="shared-mobile-menu-btn" onClick={() => alert('Menú móvil próximamente')}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}
