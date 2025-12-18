
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

// Iconos profesionales para el dropdown de usuario
const DashboardIconMenu = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DoctorIconMenu = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="3.5" stroke="#52D293" strokeWidth="2"/>
    <path d="M6 20C6 16.5 8.5 14 12 14C15.5 14 18 16.5 18 20" stroke="#52D293" strokeWidth="2" strokeLinecap="round"/>
    <rect x="11" y="15.5" width="2" height="3" rx="0.5" fill="#52D293"/>
    <rect x="10" y="17" width="4" height="1.5" rx="0.5" fill="#52D293"/>
  </svg>
);

const PharmacyIconMenu = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="9" width="10" height="12" rx="1.5" stroke="#FF2B8A" strokeWidth="2"/>
    <rect x="10.5" y="11.5" width="3" height="7" rx="0.5" fill="#FF2B8A"/>
    <rect x="8.5" y="13.5" width="7" height="3" rx="0.5" fill="#FF2B8A"/>
  </svg>
);

const TherapyIconMenu = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21C12 21 5 15.5 5 11C5 8.5 6.5 7 8.5 7C10 7 11.5 8 12 9.5C12.5 8 14 7 15.5 7C17.5 7 19 8.5 19 11C19 15.5 12 21 12 21Z" stroke="#9B00FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 13L10 13L10.7 11L11.3 15L12 13L13 13" stroke="#9B00FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SavingsIconMenu = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#FF9500" strokeWidth="2"/>
    <path d="M12 6V8M12 16V18" stroke="#FF9500" strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 10H12.5C13.3 10 14 10.7 14 11.5C14 12.3 13.3 13 12.5 13H11.5C10.7 13 10 13.7 10 14.5C10 15.3 10.7 16 11.5 16H14" stroke="#FF9500" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const AccountIconMenu = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="3.5" stroke="#0071FF" strokeWidth="2"/>
    <path d="M6 20C6 16.5 8.5 14 12 14C15.5 14 18 16.5 18 20" stroke="#0071FF" strokeWidth="2" strokeLinecap="round"/>
    <rect x="10.5" y="18" width="3" height="3" rx="1" fill="#0071FF"/>
  </svg>
);

const BlogIconMenu = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="4" width="12" height="16" rx="1.5" stroke="#FF6F61" strokeWidth="2"/>
    <line x1="9" y1="8" x2="15" y2="8" stroke="#FF6F61" strokeWidth="2" strokeLinecap="round"/>
    <line x1="9" y1="11" x2="15" y2="11" stroke="#FF6F61" strokeWidth="2" strokeLinecap="round"/>
    <line x1="9" y1="14" x2="13" y2="14" stroke="#FF6F61" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// TopNav now supports: logo, back button, user info, login button, restart bubbles, and section navigation
const TopNav = ({ 
  logoSrc, 
  logoAlt = 'SaludCompartida', 
  onBack, 
  hideUser = false,
  onRestartBubbles = null,
  showLoginButton = false,
  showMenu = true,
  homeIcon = false,
  internalPage = false, // Nueva prop para páginas internas (después de login)
  showBackButton = false // Nueva prop para mostrar "Volver" en páginas internas (excepto page4)
}) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Determinar el logo según el contexto PRE/POST contratación
  const finalLogoSrc = logoSrc || (internalPage 
    ? '/saludcompartida logo WT.png' 
    : '/saludcompartida-transp dark-bg-no-tagline copy 2.jpg');
  const [quienesSomosOpen, setQuienesSomosOpen] = useState(false);
  const [serviciosOpen, setServiciosOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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
    if (typeof onBack === 'function') {
      onBack(); // Usar la función onBack personalizada si existe
    } else {
      navigate('/'); // Fallback a inicio solo si no hay onBack
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
    <header className={`${internalPage ? 'bg-white border-b border-gray-200' : 'bg-black border-b border-gray-800'} sticky top-0 z-50 shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo y botón HOME */}
        <div className="flex items-center gap-1 md:gap-4">
          {/* Logo - clickeable para volver al inicio - MÁS PEQUEÑO EN MOBILE */}
          <div 
            className="cursor-pointer group"
            onClick={onRestartBubbles ? handleRestartBubbles : handleScrollToTop}
          >
            <img src={finalLogoSrc} alt={logoAlt} className="h-8 md:h-12 object-contain group-hover:opacity-80 transition-opacity" />
          </div>
          
          {/* Botón HOME - Solo en páginas internas - COMPACTO EN MOBILE */}
          {internalPage && (
            <button
              onClick={() => navigate('/page4')}
              className="flex items-center gap-1 bg-cyan-500/20 border border-cyan-500/40 rounded-lg px-2 py-1 md:px-3 md:py-1.5 hover:bg-cyan-500/30 transition-colors"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs md:text-sm font-semibold text-cyan-600">HOME</span>
            </button>
          )}
          
          {/* Home Icon legacy - aparece cuando homeIcon es true */}
          {homeIcon && !internalPage && (
            <div className="flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/40 rounded-lg px-3 py-1.5">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-sm font-semibold text-cyan-400">Home</span>
            </div>
          )}
        </div>
        
        {/* Menú de navegación - Desktop */}
        {showMenu && (
          <nav className="hidden lg:flex items-center gap-6">
            {/* Botón HOME directo - Solo en páginas pre-suscripción */}
            {!internalPage && (
              <button
                onClick={() => navigate('/home')}
                className="text-sm font-medium text-white hover:text-cyan-400 transition-colors"
              >
                HOME
              </button>
            )}

            {/* Dropdown Quienes Somos */}
            <div className="relative group">
              <button
                className={`text-sm font-medium ${internalPage ? 'text-gray-900 hover:text-cyan-600' : 'text-white hover:text-cyan-400'} transition-colors flex items-center gap-1`}
              >
                Quienes Somos
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute left-0 mt-2 w-56 ${internalPage ? 'bg-white border-gray-300' : 'bg-gray-900 border-gray-700'} rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
                <button
                  onClick={() => navigate(internalPage ? '/quienes-somos-internal' : '/quienes-somos')}
                  className={`block w-full text-left px-4 py-3 text-sm ${internalPage ? 'text-gray-700 hover:bg-gray-100 hover:text-cyan-600' : 'text-gray-300 hover:bg-gray-800 hover:text-cyan-400'} transition-colors first:rounded-t-lg`}
                >
                  Quienes Somos
                </button>
                <button
                  onClick={() => navigate(internalPage ? '/vision-mision-internal' : '/vision-mision')}
                  className={`block w-full text-left px-4 py-3 text-sm ${internalPage ? 'text-gray-700 hover:bg-gray-100 hover:text-cyan-600' : 'text-gray-300 hover:bg-gray-800 hover:text-cyan-400'} transition-colors`}
                >
                  Visión y Misión
                </button>
                <button
                  onClick={() => navigate(internalPage ? '/nuestros-pilares-internal' : '/nuestros-pilares')}
                  className={`block w-full text-left px-4 py-3 text-sm ${internalPage ? 'text-gray-700 hover:bg-gray-100 hover:text-cyan-600' : 'text-gray-300 hover:bg-gray-800 hover:text-cyan-400'} transition-colors`}
                >
                  Nuestros Pilares
                </button>
                <button
                  onClick={() => navigate(internalPage ? '/post-privacy' : '/privacy')}
                  className={`block w-full text-left px-4 py-3 text-sm ${internalPage ? 'text-gray-700 hover:bg-gray-100 hover:text-cyan-600' : 'text-gray-300 hover:bg-gray-800 hover:text-cyan-400'} transition-colors`}
                >
                  Política de Privacidad
                </button>
                <button
                  onClick={() => navigate(internalPage ? '/post-terms' : '/terms')}
                  className={`block w-full text-left px-4 py-3 text-sm ${internalPage ? 'text-gray-700 hover:bg-gray-100 hover:text-cyan-600' : 'text-gray-300 hover:bg-gray-800 hover:text-cyan-400'} transition-colors last:rounded-b-lg`}
                >
                  Términos y Condiciones
                </button>
              </div>
            </div>

            {/* Dropdown Nuestros Servicios */}
            <div className="relative group">
              <button
                className={`text-sm font-medium ${internalPage ? 'text-gray-900 hover:text-cyan-600' : 'text-white hover:text-cyan-400'} transition-colors flex items-center gap-1`}
              >
                Nuestros Servicios
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute left-0 mt-2 w-64 ${internalPage ? 'bg-white border-gray-300' : 'bg-gray-900 border-gray-700'} rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
                <button
                  onClick={() => navigate(internalPage ? '/telemedicine' : '/telemedicina-info')}
                  className={`block w-full text-left px-4 py-3 text-sm ${internalPage ? 'text-gray-700 hover:bg-gray-100 hover:text-cyan-600' : 'text-gray-300 hover:bg-gray-800 hover:text-cyan-400'} transition-colors first:rounded-t-lg`}
                >
                  Videollamada con Doctores 24/7
                </button>
                <button
                  onClick={() => navigate(internalPage ? '/pharmacy' : '/farmacias-info')}
                  className={`block w-full text-left px-4 py-3 text-sm ${internalPage ? 'text-gray-700 hover:bg-gray-100 hover:text-cyan-600' : 'text-gray-300 hover:bg-gray-800 hover:text-cyan-400'} transition-colors`}
                >
                  Descuento en Farmacias
                </button>
                <button
                  onClick={() => navigate(internalPage ? '/therapy' : '/terapia-info')}
                  className={`block w-full text-left px-4 py-3 text-sm ${internalPage ? 'text-gray-700 hover:bg-gray-100 hover:text-cyan-600' : 'text-gray-300 hover:bg-gray-800 hover:text-cyan-400'} transition-colors`}
                >
                  Sesiones con Terapeuta
                </button>
                <button
                  onClick={() => navigate(internalPage ? '/savings' : '/mis-ahorros-info')}
                  className={`block w-full text-left px-4 py-3 text-sm ${internalPage ? 'text-gray-700 hover:bg-gray-100 hover:text-cyan-600' : 'text-gray-300 hover:bg-gray-800 hover:text-cyan-400'} transition-colors last:rounded-b-lg`}
                >
                  Mis Ahorros
                </button>
              </div>
            </div>

            {/* Dropdown HOME Usuario - Solo en páginas internas - COMPACTO */}
            {internalPage && currentUser && (
              <div className="relative group">
                <button
                  className="text-xs md:text-sm font-medium text-gray-900 hover:text-cyan-600 transition-colors flex items-center gap-1 md:gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-2 py-1 md:px-3 md:py-2"
                >
                  <svg className="w-3 h-3 md:w-4 md:h-4 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="truncate max-w-[120px] md:max-w-none">
                    HOME {currentUser.firstName || 'Nombre'} {currentUser.lastName || 'Apellido'}
                  </span>
                  {showBackButton && (
                    <span className="ml-1 text-xs font-normal whitespace-nowrap">| Volver</span>
                  )}
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu Usuario */}
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <button
                    onClick={() => navigate('/page4')}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-cyan-600 transition-colors first:rounded-t-lg font-semibold border-b border-gray-200"
                  >
                    <DashboardIconMenu /> Dashboard Principal
                  </button>
                  <button
                    onClick={() => navigate('/telemedicine')}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-cyan-600 transition-colors"
                  >
                    <DoctorIconMenu /> Telemedicina
                  </button>
                  <button
                    onClick={() => navigate('/pharmacy')}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-cyan-600 transition-colors"
                  >
                    <PharmacyIconMenu /> Descuento en Farmacias
                  </button>
                  <button
                    onClick={() => navigate('/therapy')}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-cyan-600 transition-colors"
                  >
                    <TherapyIconMenu /> Sesiones Psicológicas
                  </button>
                  <button
                    onClick={() => navigate('/savings')}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-cyan-600 transition-colors"
                  >
                    <SavingsIconMenu /> Mis Ahorros
                  </button>
                  <button
                    onClick={() => navigate('/account')}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-cyan-600 transition-colors"
                  >
                    <AccountIconMenu /> Mi Cuenta
                  </button>
                  <button
                    onClick={() => navigate('/blog')}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-cyan-600 transition-colors last:rounded-b-lg"
                  >
                    <BlogIconMenu /> Blog
                  </button>
                </div>
              </div>
            )}
          </nav>
        )}
        
        {/* Navegación derecha - COMPACTA EN MOBILE */}
        <div className="flex items-center gap-1 md:gap-3">
          {/* Menú hamburguesa - Mobile - MÁS PEQUEÑO */}
          {showMenu && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden ${internalPage ? 'text-gray-900 hover:text-cyan-600' : 'text-gray-300 hover:text-cyan-400'} transition-colors`}
              aria-label="Menú"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}

          {/* Botón "Contratar SaludCompartida" - MAGENTA */}
          {!internalPage && (
            <button
              onClick={() => navigate('/registro')}
              className="hidden md:block bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:from-fuchsia-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Contratar SaludCompartida
            </button>
          )}

          {/* Botón "Ya tengo mi Código/Login" - CYAN */}
          {!internalPage && (
            <button
              onClick={() => navigate('/page3')}
              className="hidden md:block bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Ya tengo mi Código/Login
            </button>
          )}

          {/* Versión mobile de los botones */}
          {!internalPage && (
            <>
              <button
                onClick={() => navigate('/registro')}
                className="md:hidden bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white px-3 py-1.5 rounded-lg font-semibold text-xs hover:from-fuchsia-600 hover:to-pink-700 transition-all"
              >
                Contratar
              </button>
              
              <button
                onClick={() => navigate('/page3')}
                className="md:hidden bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-3 py-1.5 rounded-lg font-semibold text-xs hover:from-cyan-600 hover:to-cyan-700 transition-all"
              >
                Login
              </button>
            </>
          )}

          {/* Botón volver - usa onBack si existe, sino va al home correcto */}
          {onBack && (
            <button
              onClick={handleBackButton}
              className="text-gray-600 hover:text-gray-900 font-medium text-sm md:text-base md:text-2xl lg:text-3xl transition-colors flex items-center gap-1"
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
        <div className={`lg:hidden ${internalPage ? 'bg-white border-t border-gray-200' : 'bg-black border-t border-gray-800'} shadow-lg`}>
          <nav className="flex flex-col py-4 px-6 space-y-4">
            {/* HOME directo - Mobile */}
            <button
              onClick={() => { navigate(internalPage ? '/page4' : '/home'); setMenuOpen(false); }}
              className={`text-left text-lg md:text-3xl lg:text-4xl font-bold ${internalPage ? 'text-gray-900 hover:text-cyan-600' : 'text-white hover:text-cyan-400'} transition-colors py-2 border-l-2 border-cyan-500 pl-4`}
            >
              HOME
            </button>

            {/* Dropdown Quienes Somos - Mobile */}
            <div className="border-l-2 border-cyan-500 pl-4">
              <button
                onClick={() => setQuienesSomosOpen(!quienesSomosOpen)}
                className={`text-left text-lg md:text-3xl lg:text-4xl font-medium ${internalPage ? 'text-gray-900 hover:text-cyan-600' : 'text-white hover:text-cyan-400'} transition-colors py-2 w-full flex items-center justify-between`}
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
                    onClick={() => { navigate(internalPage ? '/quienes-somos-internal' : '/quienes-somos'); setMenuOpen(false); setQuienesSomosOpen(false); }}
                    className={`text-left text-sm font-medium ${internalPage ? 'text-gray-700 hover:text-cyan-600' : 'text-gray-300 hover:text-cyan-400'} transition-colors py-2 block w-full`}
                  >
                    → Quienes Somos
                  </button>
                  <button
                    onClick={() => { navigate(internalPage ? '/vision-mision-internal' : '/vision-mision'); setMenuOpen(false); setQuienesSomosOpen(false); }}
                    className={`text-left text-sm font-medium ${internalPage ? 'text-gray-700 hover:text-cyan-600' : 'text-gray-300 hover:text-cyan-400'} transition-colors py-2 block w-full`}
                  >
                    → Visión y Misión
                  </button>
                  <button
                    onClick={() => { navigate(internalPage ? '/nuestros-pilares-internal' : '/nuestros-pilares'); setMenuOpen(false); setQuienesSomosOpen(false); }}
                    className={`text-left text-sm font-medium ${internalPage ? 'text-gray-700 hover:text-cyan-600' : 'text-gray-300 hover:text-cyan-400'} transition-colors py-2 block w-full`}
                  >
                    → Nuestros Pilares
                  </button>
                  <button
                    onClick={() => { navigate(internalPage ? '/post-privacy' : '/privacy'); setMenuOpen(false); setQuienesSomosOpen(false); }}
                    className={`text-left text-sm font-medium ${internalPage ? 'text-gray-700 hover:text-cyan-600' : 'text-gray-300 hover:text-cyan-400'} transition-colors py-2 block w-full`}
                  >
                    → Política de Privacidad
                  </button>
                  <button
                    onClick={() => { navigate(internalPage ? '/post-terms' : '/terms'); setMenuOpen(false); setQuienesSomosOpen(false); }}
                    className={`text-left text-sm font-medium ${internalPage ? 'text-gray-700 hover:text-cyan-600' : 'text-gray-300 hover:text-cyan-400'} transition-colors py-2 block w-full`}
                  >
                    → Términos y Condiciones
                  </button>
                </div>
              )}
            </div>

            {/* Dropdown Nuestros Servicios - Mobile */}
            <div className="border-l-2 border-cyan-500 pl-4">
              <button
                onClick={() => setServiciosOpen(!serviciosOpen)}
                className={`text-left text-lg md:text-3xl lg:text-4xl font-medium ${internalPage ? 'text-gray-900 hover:text-cyan-600' : 'text-white hover:text-cyan-400'} transition-colors py-2 w-full flex items-center justify-between`}
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
                    onClick={() => { navigate(internalPage ? '/telemedicine' : '/telemedicina-info'); setMenuOpen(false); setServiciosOpen(false); }}
                    className={`text-left text-sm font-medium ${internalPage ? 'text-gray-700 hover:text-cyan-600' : 'text-gray-300 hover:text-cyan-400'} transition-colors py-2 block w-full`}
                  >
                    → Videollamada con Doctores 24/7
                  </button>
                  <button
                    onClick={() => { navigate(internalPage ? '/pharmacy' : '/farmacias-info'); setMenuOpen(false); setServiciosOpen(false); }}
                    className={`text-left text-sm font-medium ${internalPage ? 'text-gray-700 hover:text-cyan-600' : 'text-gray-300 hover:text-cyan-400'} transition-colors py-2 block w-full`}
                  >
                    → Descuento en Farmacias
                  </button>
                  <button
                    onClick={() => { navigate(internalPage ? '/therapy' : '/terapia-info'); setMenuOpen(false); setServiciosOpen(false); }}
                    className={`text-left text-sm font-medium ${internalPage ? 'text-gray-700 hover:text-cyan-600' : 'text-gray-300 hover:text-cyan-400'} transition-colors py-2 block w-full`}
                  >
                    → Sesiones con Terapeuta
                  </button>
                  <button
                    onClick={() => { navigate(internalPage ? '/savings' : '/mis-ahorros-info'); setMenuOpen(false); setServiciosOpen(false); }}
                    className={`text-left text-sm font-medium ${internalPage ? 'text-gray-700 hover:text-cyan-600' : 'text-gray-300 hover:text-cyan-400'} transition-colors py-2 block w-full`}
                  >
                    → Mis Ahorros
                  </button>
                </div>
              )}
            </div>

            {/* Dropdown HOME Usuario - Mobile - Solo en páginas internas */}
            {internalPage && currentUser && (
              <div className="border-l-2 border-cyan-500 pl-4 bg-cyan-500/5 rounded-lg py-2">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="text-left text-base md:text-2xl lg:text-3xl font-bold text-cyan-600 hover:text-cyan-700 transition-colors py-2 w-full flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="flex flex-col">
                      <span>HOME {currentUser.firstName || 'Nombre'} {currentUser.lastName || 'Apellido'}</span>
                      {showBackButton && (
                        <span className="text-xs font-normal text-cyan-500">Volver</span>
                      )}
                    </span>
                  </span>
                  <svg 
                    className={`w-5 h-5 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {userMenuOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <button
                      onClick={() => { navigate('/telemedicine'); setMenuOpen(false); setUserMenuOpen(false); }}
                      className="flex items-center gap-2 text-left text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors py-2 w-full"
                    >
                      <DoctorIconMenu /> → Telemedicina
                    </button>
                    <button
                      onClick={() => { navigate('/pharmacy'); setMenuOpen(false); setUserMenuOpen(false); }}
                      className="flex items-center gap-2 text-left text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors py-2 w-full"
                    >
                      <PharmacyIconMenu /> → Descuento en Farmacias
                    </button>
                    <button
                      onClick={() => { navigate('/therapy'); setMenuOpen(false); setUserMenuOpen(false); }}
                      className="flex items-center gap-2 text-left text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors py-2 w-full"
                    >
                      <TherapyIconMenu /> → Sesiones Psicológicas
                    </button>
                    <button
                      onClick={() => { navigate('/savings'); setMenuOpen(false); setUserMenuOpen(false); }}
                      className="flex items-center gap-2 text-left text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors py-2 w-full"
                    >
                      <SavingsIconMenu /> → Mis Ahorros
                    </button>
                    <button
                      onClick={() => { navigate('/account'); setMenuOpen(false); setUserMenuOpen(false); }}
                      className="flex items-center gap-2 text-left text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors py-2 w-full"
                    >
                      <AccountIconMenu /> → Mi Cuenta
                    </button>
                    <button
                      onClick={() => { navigate('/blog'); setMenuOpen(false); setUserMenuOpen(false); }}
                      className="flex items-center gap-2 text-left text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors py-2 w-full"
                    >
                      <BlogIconMenu /> → Blog
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default TopNav;
