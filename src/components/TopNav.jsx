
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

// TopNav now supports: logo, back button, user info, login button, restart bubbles, and section navigation
const TopNav = ({ 
  logoSrc = '/saludcompartida logo WT.png', 
  logoAlt = 'SaludCompartida', 
  onBack, 
  hideUser = false,
  onRestartBubbles = null,
  showLoginButton = false,
  showMenu = true
}) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quienesSomosOpen, setQuienesSomosOpen] = useState(false);
  const [serviciosOpen, setServiciosOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);

  const handleScrollToTop = () => {
    if (typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMenuOpen(false);
    }
  };

  const handleBackButton = () => {
    handleScrollToTop();
    navigate('/'); // Volver siempre a inicio
  };

  const handleRestartBubbles = () => {
    handleScrollToTop();
    if (typeof onRestartBubbles === 'function') {
      setTimeout(() => {
        onRestartBubbles();
        setMenuOpen(false);
      }, 300); // Pequeño delay para que se vea el scroll
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo - clickeable para volver al inicio */}
        <div 
          className="flex items-center gap-2 md:gap-4 cursor-pointer group"
          onClick={onRestartBubbles ? handleRestartBubbles : handleScrollToTop}
        >
          <img src={logoSrc} alt={logoAlt} className="h-10 md:h-12 object-contain group-hover:opacity-80 transition-opacity" />
        </div>
        
        {/* Menú de navegación - Desktop */}
        {showMenu && (
          <nav className="hidden lg:flex items-center gap-6">
            {/* Dropdown Quienes Somos */}
            <div className="relative group">
              <button
                className="text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors flex items-center gap-1"
              >
                Quienes Somos
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button
                  onClick={() => navigate('/quienes-somos')}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors first:rounded-t-lg"
                >
                  Quienes Somos
                </button>
                <button
                  onClick={() => navigate('/vision-mision')}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
                >
                  Visión y Misión
                </button>
                <button
                  onClick={() => navigate('/nuestros-pilares')}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors last:rounded-b-lg"
                >
                  Nuestros Pilares
                </button>
              </div>
            </div>

            {/* Dropdown Nuestros Servicios */}
            <div className="relative group">
              <button
                className="text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors flex items-center gap-1"
              >
                Nuestros Servicios
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button
                  onClick={() => navigate('/telemedicine')}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors first:rounded-t-lg"
                >
                  Videollamada con Doctores 24/7
                </button>
                <button
                  onClick={() => navigate('/pharmacy')}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
                >
                  Descuento en Farmacias
                </button>
                <button
                  onClick={() => navigate('/therapy')}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors last:rounded-b-lg"
                >
                  Sesiones con Terapeuta
                </button>
              </div>
            </div>

            {/* Dropdown Legal */}
            <div className="relative group">
              <button
                className="text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors flex items-center gap-1"
              >
                Legal
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button
                  onClick={() => navigate('/terms')}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors first:rounded-t-lg"
                >
                  Términos y Condiciones
                </button>
                <button
                  onClick={() => navigate('/privacy')}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors last:rounded-b-lg"
                >
                  Política de Privacidad
                </button>
              </div>
            </div>
          </nav>
        )}
        
        {/* Navegación derecha */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Menú hamburguesa - Mobile */}
          {showMenu && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-gray-600 hover:text-cyan-600 transition-colors"
              aria-label="Menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}

          {/* Botón "Ya estoy suscrito" */}
          {showLoginButton && (
            <button
              onClick={() => navigate('/page3')}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-3 py-1.5 md:px-5 md:py-2.5 rounded-full font-semibold text-xs md:text-sm hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Ya estoy suscrito →
            </button>
          )}

          {/* Usuario logueado */}
          {!hideUser && currentUser && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-50 to-pink-50 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-cyan-200">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm md:text-lg font-semibold text-gray-700">
                {currentUser.firstName} {currentUser.lastName}
              </span>
            </div>
          )}
          
          {/* Botón volver genérico */}
          {onBack && (
            <button
              onClick={handleBackButton}
              className="text-gray-600 hover:text-gray-900 font-medium text-sm md:text-lg transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver
            </button>
          )}
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {showMenu && menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col py-4 px-6 space-y-4">
            {/* Dropdown Quienes Somos - Mobile */}
            <div className="border-l-2 border-cyan-200 pl-4">
              <button
                onClick={() => setQuienesSomosOpen(!quienesSomosOpen)}
                className="text-left text-base font-medium text-gray-700 hover:text-cyan-600 transition-colors py-2 w-full flex items-center justify-between"
              >
                Quienes Somos
                <svg 
                  className={`w-5 h-5 transition-transform ${quienesSomosOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {quienesSomosOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  <button
                    onClick={() => { navigate('/quienes-somos'); setMenuOpen(false); setQuienesSomosOpen(false); }}
                    className="text-left text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors py-2 block w-full"
                  >
                    → Quienes Somos
                  </button>
                  <button
                    onClick={() => { navigate('/vision-mision'); setMenuOpen(false); setQuienesSomosOpen(false); }}
                    className="text-left text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors py-2 block w-full"
                  >
                    → Visión y Misión
                  </button>
                  <button
                    onClick={() => { navigate('/nuestros-pilares'); setMenuOpen(false); setQuienesSomosOpen(false); }}
                    className="text-left text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors py-2 block w-full"
                  >
                    → Nuestros Pilares
                  </button>
                </div>
              )}
            </div>

            {/* Dropdown Nuestros Servicios - Mobile */}
            <div className="border-l-2 border-cyan-200 pl-4">
              <button
                onClick={() => setServiciosOpen(!serviciosOpen)}
                className="text-left text-base font-medium text-gray-700 hover:text-cyan-600 transition-colors py-2 w-full flex items-center justify-between"
              >
                Nuestros Servicios
                <svg 
                  className={`w-5 h-5 transition-transform ${serviciosOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {serviciosOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  <button
                    onClick={() => { navigate('/telemedicine'); setMenuOpen(false); setServiciosOpen(false); }}
                    className="text-left text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors py-2 block w-full"
                  >
                    → Videollamada con Doctores 24/7
                  </button>
                  <button
                    onClick={() => { navigate('/pharmacy'); setMenuOpen(false); setServiciosOpen(false); }}
                    className="text-left text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors py-2 block w-full"
                  >
                    → Descuento en Farmacias
                  </button>
                  <button
                    onClick={() => { navigate('/therapy'); setMenuOpen(false); setServiciosOpen(false); }}
                    className="text-left text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors py-2 block w-full"
                  >
                    → Sesiones con Terapeuta
                  </button>
                </div>
              )}
            </div>

            {/* Dropdown Legal - Mobile */}
            <div className="border-l-2 border-cyan-200 pl-4">
              <button
                onClick={() => setLegalOpen(!legalOpen)}
                className="text-left text-base font-medium text-gray-700 hover:text-cyan-600 transition-colors py-2 w-full flex items-center justify-between"
              >
                Legal
                <svg 
                  className={`w-5 h-5 transition-transform ${legalOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {legalOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  <button
                    onClick={() => { navigate('/terms'); setMenuOpen(false); setLegalOpen(false); }}
                    className="text-left text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors py-2 block w-full"
                  >
                    → Términos y Condiciones
                  </button>
                  <button
                    onClick={() => { navigate('/privacy'); setMenuOpen(false); setLegalOpen(false); }}
                    className="text-left text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors py-2 block w-full"
                  >
                    → Política de Privacidad
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default TopNav;
