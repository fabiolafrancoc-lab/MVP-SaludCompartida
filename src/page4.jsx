import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserContext from './contexts/UserContext';
import { useGeolocation, isUSAUser, isMexicoUser } from './hooks/useGeolocation';
import { FireIcon } from './components/CustomIcons';
import TopNav from './components/TopNav';

// Custom Navigation Icons - Diseñados profesionalmente
const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
  </svg>
);

const LocationPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="currentColor"/>
    <circle cx="12" cy="9" r="2.5" fill="white"/>
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
  </svg>
);

const ShieldCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <path d="M12 2L4 6V11C4 16.55 7.84 21.74 13 23C18.16 21.74 22 16.55 22 11V6L14 2H12Z" fill="currentColor" fillOpacity="0.2"/>
    <path d="M12 2L4 6V11C4 16.55 7.84 21.74 13 23C18.16 21.74 22 16.55 22 11V6L14 2H12Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
  </svg>
);

const QuestionCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
    <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.2"/>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 16V16.01M12 13C12 12.5 12.2 12 12.6 11.6C13 11.2 13.5 11 14 11C15.1 11 16 10.1 16 9C16 7.9 15.1 7 14 7C13.5 7 13 7.2 12.6 7.6" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
  </svg>
);

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
    {/* Cruz principal centrada */}
    <rect x="36" y="38" width="8" height="20" rx="2" fill="#FF2B8A"/>
    <rect x="30" y="44" width="20" height="8" rx="2" fill="#FF2B8A"/>
    {/* Pastillas decorativas */}
    <circle cx="32" cy="20" r="5" fill="white" stroke="white" strokeWidth="2"/>
    <circle cx="48" cy="20" r="5" fill="white" stroke="white" strokeWidth="2"/>
    <rect x="30" y="18" width="4" height="4" rx="1" fill="#FF2B8A"/>
    <rect x="46" y="18" width="4" height="4" rx="1" fill="#FF2B8A"/>
  </svg>
);

const TherapyIcon = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Corazón */}
    <path d="M40 60C40 60 20 48 20 35C20 28 24 24 29 24C33 24 37 27 40 31C43 27 47 24 51 24C56 24 60 28 60 35C60 48 40 60 40 60Z" 
          fill="white" stroke="white" strokeWidth="2.5"/>
    <path d="M40 55C40 55 25 45 25 35C25 30 27.5 27 31 27C34 27 37 29 40 33C43 29 46 27 49 27C52.5 27 55 30 55 35C55 45 40 55 40 55Z" 
          fill="#9B00FF"/>
    {/* Línea de pulso dentro del corazón */}
    <path d="M32 38L35 38L37 32L39 44L41 38L44 38" 
          stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
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

const DashboardBox = ({ icon, title, message, color, onClick, badge, size = 'normal' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = icon;
  
  // Size variants
  const sizeClasses = {
    large: 'p-10',
    normal: 'p-8',
    small: 'p-6'
  };

  const iconSizes = {
    large: 'w-32 h-32',
    normal: 'w-24 h-24',
    small: 'w-16 h-16'
  };

  const titleSizes = {
    large: 'text-3xl',
    normal: 'text-2xl',
    small: 'text-xl'
  };
  
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
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            {badge}
          </span>
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated Circle Background */}
      <div 
        className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-white/10 transition-all duration-700 ${
          isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-0'
        }`}
      />
      
      {/* Content */}
      <div className={`relative z-10 ${sizeClasses[size]} flex flex-col items-center text-center`}>
        {/* Icon Container with Glow Effect */}
        <div className="relative mb-6">
          <div 
            className={`absolute inset-0 blur-2xl transition-all duration-500 ${
              isHovered ? 'opacity-60 scale-110' : 'opacity-0 scale-95'
            }`}
            style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
          />
          <div 
            className={`relative ${iconSizes[size]} transition-all duration-500 ${
              isHovered ? 'scale-110 rotate-6' : ''
            }`}
          >
            {IconComponent && <IconComponent />}
          </div>
        </div>
        
        {/* Title */}
        <h3 className={`${titleSizes[size]} font-black mb-3 text-white drop-shadow-lg`}>
          {title}
        </h3>
        
        {/* Message */}
        <p className={`${size === 'small' ? 'text-sm' : 'text-base'} leading-relaxed text-white/95 font-semibold drop-shadow-md`}>
          {message}
        </p>
        
        {/* Hover Arrow */}
        <div 
          className={`mt-4 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white animate-bounce">
            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="3" strokeLinecap="square"/>
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
  const { currentUser } = useContext(UserContext);
  
  // Geolocation hook
  const { country, countryCode, loading: geoLoading } = useGeolocation();
  const [showLocationBanner, setShowLocationBanner] = useState(false);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(false);
  
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

      // Check if this is first visit (show welcome banner)
      const hasVisited = localStorage.getItem('page4_visited');
      if (!hasVisited) {
        setShowWelcomeBanner(true);
        localStorage.setItem('page4_visited', 'true');
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

  // Main service blocks - Reorganizado con jerarquía visual
  // PRINCIPALES (grandes): Servicios de salud core
  const primaryServices = [
    {
      icon: DoctorIcon,
      title: "Videollamada a Doctor",
      message: "Consulta médica 24/7 desde cualquier lugar",
      color: "#52D293",
      badge: "Destacado",
      onClick: () => {
        window.scrollTo(0, 0);
        navigate('/telemedicine');
      }
    },
    {
      icon: PharmacyIcon,
      title: "Descuento en Farmacias",
      message: "Hasta 75% OFF en medicamentos y productos",
      color: "#FF2B8A",
      onClick: () => {
        window.scrollTo(0, 0);
        navigate('/pharmacy');
      }
    },
    {
      icon: TherapyIcon,
      title: "Sesiones con Psicólogos",
      message: "Terapia profesional para ti y tu familia",
      color: "#9B59B6",
      onClick: () => {
        window.scrollTo(0, 0);
        navigate('/therapy');
      }
    }
  ];

  // SECUNDARIOS (pequeños): Cuenta y recursos
  const secondaryServices = [
    {
      icon: SavingsIcon,
      title: "Mis Ahorros",
      message: "Mira cuánto has ahorrado",
      color: "#FF9500",
      onClick: () => {
        window.scrollTo(0, 0);
        navigate('/savings', { state: { name: userName } });
      }
    },
    {
      icon: AccountIcon,
      title: "Mi Cuenta",
      message: "Actualiza tu información",
      color: "#0071FF",
      onClick: () => {
        window.scrollTo(0, 0);
        navigate('/account');
      }
    },
    {
      icon: BlogIcon,
      title: "Blog de Salud",
      message: "Consejos y guías de salud",
      color: "#FF6F61",
      badge: "Nuevo",
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
      
      {/* TopNav Navigation */}
      <TopNav internalPage={true} showMenu={true} />

      {/* Location Detection Banner */}
      {showLocationBanner && country && (
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 px-4 shadow-lg animate-slide-down">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LocationPinIcon />
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
              <CloseIcon />
            </button>
          </div>
        </div>
      )}

      {/* Welcome Banner - First Visit Only */}
      {showWelcomeBanner && (
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white py-6 px-4 shadow-lg relative">
          <button
            onClick={() => setShowWelcomeBanner(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors z-10"
          >
            <CloseIcon />
          </button>
          <div className="max-w-7xl mx-auto pr-12">
            <div className="flex items-center gap-4 mb-3">
              <ShieldCheckIcon />
              <h2 className="text-2xl md:text-3xl font-bold">¡Bienvenido a SaludCompartida!</h2>
            </div>
            <p className="text-base md:text-lg leading-relaxed max-w-5xl mb-4">
              🎉 <span className="font-bold">¡Tu familia ya está protegida!</span> Ahora tienes acceso completo a:
            </p>
            <div className="grid md:grid-cols-3 gap-4 max-w-5xl">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="font-bold text-lg mb-1">🏥 Telemedicina 24/7</p>
                <p className="text-sm">Habla con doctores certificados cuando lo necesites</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="font-bold text-lg mb-1">💊 Descuento en Farmacias</p>
                <p className="text-sm">Hasta 75% OFF en medicamentos</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="font-bold text-lg mb-1">🧠 Terapia con Psicólogos</p>
                <p className="text-sm">Cuida tu salud mental con profesionales</p>
              </div>
            </div>
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

        {/* Service Blocks - Nueva Jerarquía Visual */}
        
        {/* Sección 1: SERVICIOS PRINCIPALES (3 grandes) */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {primaryServices.map((service) => (
              <DashboardBox
                key={service.title}
                icon={service.icon}
                title={service.title}
                message={service.message}
                color={service.color}
                onClick={service.onClick}
                badge={service.badge}
                size="large"
              />
            ))}
          </div>
        </div>

        {/* Sección 2: SERVICIOS SECUNDARIOS (3 pequeños) */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {secondaryServices.map((service) => (
              <DashboardBox
                key={service.title}
                icon={service.icon}
                title={service.title}
                message={service.message}
                color={service.color}
                onClick={service.onClick}
                badge={service.badge}
                size="small"
              />
            ))}
          </div>
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
              <div className="group-hover:rotate-12 transition-transform duration-300">
                <QuestionCircleIcon />
              </div>
              <span className="drop-shadow-md">¿Tienes Consultas?</span>
              <div className="group-hover:translate-x-2 transition-transform duration-300">
                <ArrowRightIcon />
              </div>
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
                onClick={() => navigate('/post-terms')}
                className="text-gray-600 hover:text-cyan-600 text-sm font-medium transition-colors underline"
              >
                Términos y Condiciones
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => navigate('/post-privacy')}
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