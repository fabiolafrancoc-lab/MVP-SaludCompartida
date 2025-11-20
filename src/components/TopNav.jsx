
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

// TopNav now supports: logo, back button, user info, login button, and restart bubbles
const TopNav = ({ 
  logoSrc = '/saludcompartida logo WT.png', 
  logoAlt = 'SaludCompartida', 
  onBack, 
  hideUser = false,
  onRestartBubbles = null,
  showLoginButton = false
}) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const handleScrollToTop = () => {
    if (typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
      }, 300); // Pequeño delay para que se vea el scroll
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo - clickeable para volver al inicio */}
        <div 
          className="flex items-center gap-2 md:gap-4 cursor-pointer"
          onClick={onRestartBubbles ? handleRestartBubbles : handleScrollToTop}
        >
          <img src={logoSrc} alt={logoAlt} className="h-10 md:h-12 object-contain hover:opacity-80 transition-opacity" />
        </div>
        
        {/* Navegación derecha */}
        <nav className="flex items-center gap-2 md:gap-4">
          {/* Botón para volver a las bubbles (solo visible en desktop) */}
          {onRestartBubbles && (
            <button
              onClick={handleRestartBubbles}
              className="text-xs md:text-sm text-gray-600 hover:text-cyan-600 font-medium transition-colors hidden lg:flex items-center gap-1"
              title="Ver introducción de nuevo"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Inicio
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
        </nav>
      </div>
    </header>
  );
};

export default TopNav;
