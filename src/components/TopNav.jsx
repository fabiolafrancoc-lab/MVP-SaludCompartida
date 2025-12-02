
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
  showMenu = false
}) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [nosotrosOpen, setNosotrosOpen] = useState(false);

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
    // If a caller provided an onBack callback (for example to change App state), call it.
    if (typeof onBack === 'function') {
      try {
        onBack();
      } catch (err) {
        console.error('TopNav onBack callback error:', err);
      }
    }
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
            <button
              onClick={handleRestartBubbles}
              className="text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => handleScrollToSection('problema')}
              className="text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors"
            >
              El Problema
            </button>
            <button
              onClick={() => handleScrollToSection('solucion')}
              className="text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors"
            >
              La Solución
            </button>
            
            {/* Dropdown Nosotros */}
            <div className="relative group">
              <button
                className="text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors flex items-center gap-1"
              >
                Nosotros
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button
                  onClick={() => navigate('/quienes-somos')}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors first:rounded-t-lg"
                >
                  Quiénes Somos
                </button>
                <button
                  onClick={() => navigate('/mision-y-valores')}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
                >
                  Misión y Valores
                </button>
                <button
                  onClick={() => navigate('/nuestros-pilares')}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors last:rounded-b-lg"
                >
                  Nuestros Pilares
                </button>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/beneficios')}
              className="text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors"
            >
              Beneficios
            </button>
            <button
              onClick={() => navigate('/contacto')}
              className="text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors"
            >
              Contacto
            </button>
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
            <button
              onClick={handleRestartBubbles}
              className="text-left text-base font-medium text-gray-700 hover:text-cyan-600 transition-colors py-2"
            >
              Inicio
            </button>
            <button
              onClick={() => handleScrollToSection('problema')}
              className="text-left text-base font-medium text-gray-700 hover:text-cyan-600 transition-colors py-2"
            >
              El Problema
            </button>
            <button
              onClick={() => handleScrollToSection('solucion')}
              className="text-left text-base font-medium text-gray-700 hover:text-cyan-600 transition-colors py-2"
            >
              La Solución
            </button>
            
            {/* Dropdown Nosotros - Mobile */}
            <div className="border-l-2 border-cyan-200 pl-4">
              <button
                onClick={() => setNosotrosOpen(!nosotrosOpen)}
                className="text-left text-base font-medium text-gray-700 hover:text-cyan-600 transition-colors py-2 w-full flex items-center justify-between"
              >
                Nosotros
                <svg 
                  className={`w-5 h-5 transition-transform ${nosotrosOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {nosotrosOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  <button
                    onClick={() => { navigate('/quienes-somos'); setMenuOpen(false); setNosotrosOpen(false); }}
                    className="text-left text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors py-2 block w-full"
                  >
                    → Quiénes Somos
                  </button>
                  <button
                    onClick={() => { navigate('/mision-y-valores'); setMenuOpen(false); setNosotrosOpen(false); }}
                    className="text-left text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors py-2 block w-full"
                  >
                    → Misión y Valores
                  </button>
                  <button
                    onClick={() => { navigate('/nuestros-pilares'); setMenuOpen(false); setNosotrosOpen(false); }}
                    className="text-left text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors py-2 block w-full"
                  >
                    → Nuestros Pilares
                  </button>
                </div>
              )}
            </div>
            
            <button
              onClick={() => { navigate('/beneficios'); setMenuOpen(false); }}
              className="text-left text-base font-medium text-gray-700 hover:text-cyan-600 transition-colors py-2"
            >
              Beneficios
            </button>
            <button
              onClick={() => { navigate('/contacto'); setMenuOpen(false); }}
              className="text-left text-base font-medium text-gray-700 hover:text-cyan-600 transition-colors py-2"
            >
              Contacto
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default TopNav;
