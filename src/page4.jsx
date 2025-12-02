import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserContext from './contexts/UserContext';
import { useGeolocation, isUSAUser, isMexicoUser } from './hooks/useGeolocation';

// Premium Professional SVG Icons - Estilo Corporativo Sofisticado
const DoctorIcon = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="28" r="12" fill="white" stroke="white" strokeWidth="2.5"/>
    <circle cx="40" cy="28" r="7" fill="#52D293"/>
    <path d="M22 65C22 53 29 45 40 45C51 45 58 53 58 65V70H22V65Z" fill="white" stroke="white" strokeWidth="2"/>
    <rect x="37" y="52" width="6" height="10" rx="1" fill="#52D293"/>
    <rect x="34" y="55" width="12" height="4" rx="1" fill="#52D293"/>
    <path d="M32 60L35 63L41 57" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PharmacyIcon = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="25" y="30" width="30" height="35" rx="4" fill="white" stroke="white" strokeWidth="2.5"/>
    <rect x="36" y="40" width="8" height="18" rx="2" fill="#FF2B8A"/>
    <rect x="32" y="48" width="16" height="8" rx="2" fill="#FF2B8A"/>
    <circle cx="32" cy="20" r="6" fill="white" stroke="white" strokeWidth="2"/>
    <circle cx="48" cy="20" r="6" fill="white" stroke="white" strokeWidth="2"/>
    <path d="M30 18L34 22M32 16L32 20" stroke="#FF2B8A" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M46 18L50 22M48 16L48 20" stroke="#FF2B8A" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const TherapyIcon = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 22C40 22 30 27 30 38C30 49 35 55 40 66C45 55 50 49 50 38C50 27 40 22 40 22Z" 
          fill="white" stroke="white" strokeWidth="2.5"/>
    <circle cx="40" cy="38" r="8" fill="#9B00FF"/>
    <path d="M35 43C35 43 37 46 40 46C43 46 45 43 45 43" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="37" cy="37" r="2" fill="white"/>
    <circle cx="43" cy="37" r="2" fill="white"/>
  </svg>
);

const SavingsIcon = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="28" fill="white" stroke="white" strokeWidth="2.5"/>
    <text x="40" y="52" textAnchor="middle" fill="#FF9500" fontSize="36" fontWeight="bold">$</text>
    <path d="M35 25L45 25M40 22L40 28" stroke="#FF9500" strokeWidth="3" strokeLinecap="round"/>
    <path d="M35 55L45 55M40 52L40 58" stroke="#FF9500" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const BlogIcon = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="24" y="18" width="32" height="44" rx="3" fill="white" stroke="white" strokeWidth="2.5"/>
    <rect x="30" y="26" width="20" height="3" rx="1.5" fill="#FF6F61"/>
    <rect x="30" y="33" width="20" height="3" rx="1.5" fill="#FF6F61"/>
    <rect x="30" y="40" width="16" height="3" rx="1.5" fill="#FF6F61"/>
    <rect x="30" y="47" width="14" height="3" rx="1.5" fill="#FF6F61"/>
    <circle cx="48" cy="54" r="5" fill="#FF6F61"/>
    <path d="M46 54L47.5 55.5L50 53" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AccountIcon = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="30" r="12" fill="white" stroke="white" strokeWidth="2.5"/>
    <circle cx="40" cy="30" r="7" fill="#0071FF"/>
    <circle cx="38" cy="29" r="1.5" fill="white"/>
    <circle cx="42" cy="29" r="1.5" fill="white"/>
    <path d="M38 32C38 32 39 33 40 33C41 33 42 32 42 32" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M22 62C22 52 29 46 40 46C51 46 58 52 58 62" 
          stroke="white" strokeWidth="8" strokeLinecap="round"/>
    <rect x="36" y="58" width="8" height="8" rx="2" fill="#0071FF"/>
  </svg>
);

const ContactIcon = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* WhatsApp Icon */}
    <circle cx="32" cy="35" r="16" fill="white" stroke="white" strokeWidth="2"/>
    <path d="M32 23C26.5 23 22 27.5 22 33C22 35 22.6 36.8 23.6 38.3L22 43L26.9 41.4C28.3 42.3 30 43 32 43C37.5 43 42 38.5 42 33C42 27.5 37.5 23 32 23Z" fill="#7CB342"/>
    <path d="M28 30L29 31.5L31.5 29" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28 35H36M32 33V37" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    
    {/* Email Icon */}
    <rect x="46" y="28" width="22" height="16" rx="3" fill="white" stroke="white" strokeWidth="2"/>
    <path d="M46 31L57 38L68 31" stroke="#7CB342" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="52" cy="38" r="1.5" fill="#7CB342"/>
    <circle cx="62" cy="38" r="1.5" fill="#7CB342"/>
  </svg>
);

const RatingIcon = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 18L45 30H58L48 38L52 50L40 42L28 50L32 38L22 30H35L40 18Z" 
          fill="white" stroke="white" strokeWidth="2.5"/>
    <path d="M40 28L42 34H48L43 38L45 44L40 40L35 44L37 38L32 34H38L40 28Z" 
          fill="#00B7EB"/>
  </svg>
);

const PrivacyIcon = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 18L24 25V40C24 50 31 59 40 63C49 59 56 50 56 40V25L40 18Z" 
          fill="white" stroke="white" strokeWidth="2.5"/>
    <circle cx="40" cy="38" r="6" fill="#616161"/>
    <rect x="38" y="43" width="4" height="10" rx="2" fill="#616161"/>
  </svg>
);

const TermsIcon = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="28" y="16" width="28" height="48" rx="3" fill="white" stroke="white" strokeWidth="2.5"/>
    <rect x="34" y="24" width="16" height="3" rx="1.5" fill="#BDBDBD"/>
    <rect x="34" y="31" width="16" height="3" rx="1.5" fill="#BDBDBD"/>
    <rect x="34" y="38" width="14" height="3" rx="1.5" fill="#BDBDBD"/>
    <rect x="34" y="45" width="15" height="3" rx="1.5" fill="#BDBDBD"/>
    <circle cx="34" cy="54" r="3" fill="#BDBDBD"/>
    <path d="M38 54H48" stroke="#BDBDBD" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const DashboardBox = ({ icon, title, message, color, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = icon;
  // helper: decide readable text color (black or white) based on background
  const getContrastColor = (hex) => {
    try {
      const c = hex.replace('#', '');
      const r = parseInt(c.substring(0, 2), 16);
      const g = parseInt(c.substring(2, 4), 16);
      const b = parseInt(c.substring(4, 6), 16);
      // YIQ formula
      const yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq >= 150 ? '#000000' : '#ffffff';
    } catch (e) {
      return '#ffffff';
    }
  };

  // helper: shade hex color by percent (-100..100)
  const shadeHex = (hex, percent) => {
    try {
      const c = hex.replace('#', '');
      const num = parseInt(c, 16);
      let r = (num >> 16) + Math.round(255 * (percent / 100));
      let g = ((num >> 8) & 0x00FF) + Math.round(255 * (percent / 100));
      let b = (num & 0x0000FF) + Math.round(255 * (percent / 100));
      r = Math.max(Math.min(255, r), 0);
      g = Math.max(Math.min(255, g), 0);
      b = Math.max(Math.min(255, b), 0);
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    } catch (e) {
      return hex;
    }
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 transform ${
        isHovered ? 'scale-105 -translate-y-2' : ''
      }`}
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${shadeHex(color, -15)} 100%)`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated Circle Background */}
      <div 
        className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-white/10 transition-all duration-700 ${
          isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-0'
        }`}
      />
      
      {/* Content */}
      <div className="relative z-10 p-8 flex flex-col items-center text-center">
        {/* Icon Container with Glow Effect */}
        <div className="relative mb-6">
          <div 
            className={`absolute inset-0 blur-2xl transition-all duration-500 ${
              isHovered ? 'opacity-60 scale-110' : 'opacity-0 scale-95'
            }`}
            style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
          />
          <div 
            className={`relative w-24 h-24 transition-all duration-500 ${
              isHovered ? 'scale-110 rotate-6' : ''
            }`}
          >
            {IconComponent && <IconComponent />}
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-2xl font-black mb-3 text-white drop-shadow-lg">
          {title}
        </h3>
        
        {/* Message */}
        <p className="text-base leading-relaxed text-white/95 font-semibold drop-shadow-md">
          {message}
        </p>
        
        {/* Hover Arrow */}
        <div 
          className={`mt-4 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <svg 
            className="w-6 h-6 text-white animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={3} 
              d="M13 7l5 5m0 0l-5 5m5-5H6" 
            />
          </svg>
        </div>
      </div>
      
      {/* Bottom Shine Effect */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-1 bg-white transition-all duration-500 ${
          isHovered ? 'opacity-80' : 'opacity-0'
        }`}
      />
    </div>
  );
};

const Page4 = () => {
  const navigate = useNavigate();
  // Read user data from context for personalization
  const { currentUser } = useContext(UserContext);
  
  // Geolocation hook
  const { country, countryCode, loading: geoLoading } = useGeolocation();
  const [showLocationBanner, setShowLocationBanner] = useState(false);
  
  // Get user data from localStorage or context
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [isMigrant, setIsMigrant] = useState(false);
  
  // State for mobile menu dropdowns
  const [openMenu, setOpenMenu] = useState(null);
  
  // Scroll al tope cuando se monta el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    try {
      // Primero usar currentUser del contexto
      if (currentUser && currentUser.firstName) {
        setUserName(currentUser.firstName);
        setUserEmail(currentUser.email || '');
        setUserPhone(currentUser.phone || currentUser.whatsapp || '');
        setIsMigrant(currentUser.isMigrant === true);
        return;
      }
      
      // Fallback: intentar con localStorage directamente
      let userData = null;
      const currentUserData = localStorage.getItem('currentUser');
      if (currentUserData) {
        userData = JSON.parse(currentUserData);
      } else {
        // Fallback a accessUser (sistema anterior)
        const accessUserData = localStorage.getItem('accessUser');
        if (accessUserData) {
          userData = JSON.parse(accessUserData);
        }
      }
      
      if (userData && userData.firstName) {
        setUserName(userData.firstName);
        setUserEmail(userData.email || '');
        setUserPhone(userData.phone || userData.whatsapp || '');
        setIsMigrant(userData.isMigrant === true);
      }
    } catch (error) {
      console.error('Error reading user data:', error);
    }
  }, [currentUser]);

  // Show location banner when geolocation is detected (only for Mexico)
  useEffect(() => {
    if (!geoLoading && country && isMexicoUser(countryCode)) {
      setShowLocationBanner(true);
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowLocationBanner(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [geoLoading, country, countryCode]);

  // Navigation menu structure
  const menuStructure = [
    {
      title: 'Quiénes Somos',
      items: [
        { name: 'Quiénes Somos', route: '/quienes-somos' },
        { name: 'Nuestros Valores', route: '/quienes-somos#valores' },
        { name: 'Blog', route: '/blog' }
      ]
    },
    {
      title: 'Nuestros Servicios',
      items: [
        { name: 'Telemedicina', route: '/telemedicine' },
        { name: 'Descuento en Farmacias', route: '/pharmacy' },
        { name: 'Terapia con Psicólogos', route: '/therapy' }
      ]
    },
    {
      title: 'Mi Cuenta',
      items: [
        { name: 'Mis Ahorros', route: '/savings' },
        { name: 'Mi Cuenta', route: '/account' }
      ]
    },
    {
      title: 'Contáctanos',
      items: [
        { name: 'Contáctanos', route: '/contact' },
        { name: 'Evalúanos', route: '/rating' },
        { name: 'Política de Privacidad', route: '/privacy' },
        { name: 'Términos y Condiciones', route: '/terms' },
        // Solo mostrar "Cancelar Suscripción" si el usuario es MIGRANTE
        ...(isMigrant ? [{ name: 'Cancelar Suscripción', route: '/cancel-subscription', danger: true }] : [])
      ]
    }
  ];

  // Main service blocks - Reorganizado: Fila 1 (Servicios de salud) | Fila 2 (Cuenta y recursos)
  const serviceBlocks = [
    // FILA 1: Servicios de salud
    {
      icon: DoctorIcon,
      title: "Videollamada a Doctor",
      message: "24 horas al día 7 días a la semana",
      color: "#52D293",
      onClick: () => {
        window.scrollTo(0, 0);
        navigate('/telemedicine');
      }
    },
    {
      icon: PharmacyIcon,
      title: "Descuento en Farmacias",
      message: "Hasta 75% de descuento en toda la farmacia",
      color: "#FF2B8A",
      onClick: () => {
        window.scrollTo(0, 0);
        navigate('/pharmacy');
      }
    },
    {
      icon: TherapyIcon,
      title: "Sesiones con Psicólogos",
      message: "Terapia profesional para cuidar tu salud mental",
      color: "#9B59B6",
      onClick: () => {
        window.scrollTo(0, 0);
        navigate('/therapy');
      }
    },
    // FILA 2: Cuenta y recursos
    {
      icon: AccountIcon,
      title: "Mi Cuenta",
      message: "Actualiza tu información y la de tu familia",
      color: "#0071FF",
      onClick: () => {
        window.scrollTo(0, 0);
        navigate('/account');
      }
    },
    {
      icon: SavingsIcon,
      title: "Mis Ahorros",
      message: "Mira cuánto has ahorrado este mes",
      color: "#FF9500",
      onClick: () => {
        window.scrollTo(0, 0);
        navigate('/savings', { state: { name: userName } });
      }
    },
    {
      icon: BlogIcon,
      title: "Blog",
      message: "Consejos y guías para cuidar mejor a tu familia",
      color: "#FF6F61",
      onClick: () => {
        window.scrollTo(0, 0);
        navigate('/blog');
      }
    }
  ];
  
  const toggleMenu = (menuTitle) => {
    setOpenMenu(openMenu === menuTitle ? null : menuTitle);
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-pink-50 to-gray-50">
      
      {/* Header with Logo */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <img 
            src="/saludcompartida logo WT.png" 
            alt="SaludCompartida" 
            className="h-16"
          />
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate('/page3');
            }}
            className="text-gray-600 hover:text-gray-900 font-medium text-lg"
          >
            Volver
          </button>
        </div>
      </header>

      {/* Navigation Menu - Mobile First */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Mobile: Accordion Menu */}
          <div className="md:hidden space-y-2">
            {menuStructure.map((menu) => (
              <div key={menu.title} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleMenu(menu.title)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-gray-800 hover:bg-gray-50"
                >
                  <span>{menu.title}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${openMenu === menu.title ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openMenu === menu.title && (
                  <div className="px-4 pb-3 space-y-2">
                    {menu.items.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          window.scrollTo(0, 0);
                          navigate(item.route);
                          setOpenMenu(null);
                        }}
                        className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
                          item.danger 
                            ? 'text-red-600 hover:bg-red-50 font-semibold' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop: Horizontal Dropdown Menu */}
          <div className="hidden md:flex md:items-center md:justify-center md:space-x-6">
            {menuStructure.map((menu) => (
              <div key={menu.title} className="relative group">
                <button className="px-4 py-2 text-sm font-semibold text-gray-800 hover:text-cyan-600 transition-colors">
                  {menu.title}
                </button>
                {/* Dropdown */}
                <div className="absolute left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    {menu.items.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          window.scrollTo(0, 0);
                          if (item.state) {
                            navigate(item.route, { state: item.state });
                          } else {
                            navigate(item.route);
                          }
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          item.danger
                            ? 'text-red-600 hover:bg-red-50 font-semibold'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Location Detection Banner */}
      {showLocationBanner && country && (
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 px-4 shadow-lg animate-slide-down">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm md:text-base font-medium">
                📍 Ubicación detectada: <span className="font-bold">{country}</span>
                {isUSAUser(countryCode) && ' - Mostrando información para usuarios en USA'}
                {isMexicoUser(countryCode) && ' - Mostrando información para usuarios en México'}
              </p>
            </div>
            <button 
              onClick={() => setShowLocationBanner(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          {userName && (
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              ¡Hola <span className="bg-gradient-to-r from-cyan-500 to-pink-500 bg-clip-text text-transparent">
                {userName}
              </span>!
            </h1>
          )}
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Todo lo que tu familia necesita
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium">
            Porque cuidarlos no tiene que ser difícil ni caro
          </p>
          
          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-cyan-500 rounded-full"></div>
            <div className="h-2 w-2 bg-pink-500 rounded-full"></div>
            <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 via-pink-500 to-cyan-500 rounded-full"></div>
            <div className="h-2 w-2 bg-cyan-500 rounded-full"></div>
            <div className="h-1 w-16 bg-gradient-to-l from-transparent to-pink-500 rounded-full"></div>
          </div>
        </div>

        {/* Service Blocks - 6 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {serviceBlocks.map((service) => (
            <DashboardBox
              key={service.title}
              icon={service.icon}
              title={service.title}
              message={service.message}
              color={service.color}
              onClick={service.onClick}
            />
          ))}
        </div>

        {/* Consultas Button */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate('/contact');
            }}
            className="group relative overflow-hidden px-10 py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-pink-500 text-white rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
          >
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            
            <div className="relative flex items-center gap-4">
              <svg className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="drop-shadow-md">¿Tienes Consultas?</span>
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </button>
        </div>
          </button>
        </div>
      </main>

      {/* Footer actualizado con links a Terms y Privacy */}
      <footer className="bg-white mt-16 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-700 text-lg font-medium">
              SaludCompartida · Cuidando lo que más importa
            </p>
            
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate('/terms', { state: { from: '/page4' } })}
                className="text-gray-600 hover:text-cyan-600 text-sm font-medium transition-colors underline"
              >
                Términos y Condiciones
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => navigate('/privacy', { state: { from: '/page4' } })}
                className="text-gray-600 hover:text-pink-600 text-sm font-medium transition-colors underline"
              >
                Aviso de Privacidad
              </button>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              © 2025 SaludCompartida. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page4;