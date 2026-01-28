export default function SharedFooter() {
  return (
    <>
      <style jsx global>{`
        .shared-footer {
          background: var(--gray-800, #1F2937);
          padding: 48px 24px 32px;
          text-align: center;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .shared-footer-logo {
          height: 48px;
          width: auto;
          margin: 0 auto 16px;
        }

        .shared-footer-text {
          font-size: 16px;
          color: rgba(255,255,255,0.9);
          margin-bottom: 8px;
        }

        .shared-footer-tagline {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          margin-bottom: 24px;
        }

        .shared-footer-contact {
          margin-bottom: 20px;
        }

        .shared-footer-contact p {
          color: rgba(255,255,255,0.7);
          font-size: 14px;
          margin-bottom: 8px;
        }

        .shared-footer-contact strong {
          color: #06B6D4;
        }

        .shared-footer-links {
          display: flex;
          gap: 24px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .shared-footer-links a {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .shared-footer-links a:hover {
          color: #06B6D4;
        }

        .shared-footer-copyright {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          margin-top: 16px;
        }
      `}</style>

      <footer className="shared-footer">
        <img 
          src="https://saludcompartida.app/saludcompartida-dark-no-tagline.png" 
          alt="SaludCompartida" 
          className="shared-footer-logo"
        />
        <p className="shared-footer-text">
          <strong>SaludCompartida</strong> © 2026
        </p>
        <p className="shared-footer-tagline">
          Cuidando familias, acortando distancias.
        </p>
        <div className="shared-footer-contact">
          <p>
            <strong>Contacto:</strong> contact@saludcompartida.com
          </p>
        </div>
        <div className="shared-footer-links">
          <a href="/terms">Términos y Condiciones</a>
          <a href="/privacy">Política de Privacidad</a>
        </div>
        <p className="shared-footer-copyright">
          Hecho con ❤️ para familias migrantes en Estados Unidos.
        </p>
      </footer>
    </>
  );
}
