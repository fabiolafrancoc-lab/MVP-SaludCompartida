import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const iconColor = 'rgba(255,255,255,0.7)';
  const overlayBg = 'rgba(255,255,255,0.18)';
  const displayedColor = isHovered ? shadeHex(color || '#000000', -8) : color;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-8 cursor-pointer transition-all duration-500 transform shadow-xl ${
        isHovered ? 'scale-105 -translate-y-3 shadow-2xl' : ''
      }`}
      style={{ backgroundColor: displayedColor }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative z-10 flex flex-col items-center text-center">
        <div 
          className={`w-24 h-24 mb-6 transition-all duration-500 ${
            isHovered ? 'scale-110 rotate-12' : ''
          }`}
          style={{ color: iconColor }}
        >
          {IconComponent && <IconComponent />}
        </div>
        <h3 className="text-2xl font-bold mb-3 text-white">
          {title}
        </h3>
        <p className="text-lg leading-relaxed text-white font-bold opacity-95">
          {message}
        </p>
      </div>
      
      <div 
        className={`absolute inset-0 rounded-full transition-all duration-700 ${
          isHovered ? 'scale-150 opacity-100' : 'scale-0 opacity-0'
        }`}
        style={{ transformOrigin: 'center', backgroundColor: overlayBg }}
      />
    </div>
  );
};

const Page4 = () => {
  const navigate = useNavigate();
  // Read family name from context for personalization
  const { familyFirstName, familyLastName } = useContext(UserContext);
  
  // Geolocation hook
  const { country, countryCode, loading: geoLoading } = useGeolocation();
  const [showLocationBanner, setShowLocationBanner] = useState(false);
  
  // Get user data from localStorage
  const [userName, setUserName] = useState('');
  
  useEffect(() => {
    try {
      // Primero intentar con currentUser (nuevo sistema)
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
      }
    } catch (error) {
      console.error('Error reading user data:', error);
    }
  }, []);

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
  
  const services = [
    {
      icon: DoctorIcon,
      title: "Habla con un Doctor",
      message: "A cualquier hora del día, los 7 días de la semana. Estamos aquí cuando nos necesites",
      color: "#52D293",
      onClick: () => {
        window.scrollTo(0, 0);
        navigate('/telemedicine');
      }
    },
    {
      icon: PharmacyIcon,
      title: "Descuentos en Farmacias",
      message: "Hasta 75% de descuento en toda la farmacia. Ahorra en lo que tu familia necesita",
      color: "#FF2B8A",
      onClick: () => {
        window.scrollTo(0, 0);
        navigate('/pharmacy');
      }
    },
    {
      icon: TherapyIcon,
      title: "Tu Sesión de Terapia",
      message: "Agenda tu sesión semanal. Porque tu salud mental también importa",
      color: "#9B00FF",
      onClick: () => {
        window.scrollTo(0, 0);
        navigate('/therapy');
      }
    },
    {
      icon: SavingsIcon,
      title: "Mis Ahorros",
      message: "Mira cuánto has ahorrado este mes. Tu esfuerzo se refleja aquí",
      color: "#FF9500",
      onClick: () => {
        window.scrollTo(0, 0);
        navigate('/savings', { state: { name: `${familyFirstName || ''} ${familyLastName || ''}`.trim() } });
      }
    },
    {
      icon: BlogIcon,
      title: "Blog de Salud",
      message: "Consejos y guías para cuidar mejor a tu familia",
      color: "#FF6F61",
      onClick: () => {
        window.scrollTo(0, 0);
        navigate('/blog');
      }
    },
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
      icon: ContactIcon,
      title: "Contáctanos",
      message: "¿Necesitas ayuda? Escríbenos, respondemos rápido",
      color: "#7CB342",
      onClick: () => {
        window.scrollTo(0, 0);
        navigate('/contact');
      }
    },
    {
      icon: RatingIcon,
      title: "Califícanos",
      message: "Tu opinión nos ayuda a ser mejores cada día",
      color: "#00B7EB",
      onClick: () => {
        window.scrollTo(0, 0);
        navigate('/rating');
      }
    },
    {
      icon: PrivacyIcon,
      title: "Privacidad",
      message: "Tu información está segura y protegida siempre",
      color: "#616161",
      onClick: () => navigate('/privacy', { state: { from: '/page4' } })
    },
    {
      icon: TermsIcon,
      title: "Términos",
      message: "Todo lo que necesitas saber sobre tu membresía",
      color: "#BDBDBD",
      onClick: () => navigate('/terms', { state: { from: '/page4' } })
    }
  ];

  return (
  <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-pink-50 to-gray-50">
      {/* Header with Volver button */}
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
        <div className="text-center mb-12">
          {userName && (
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
              ¡Hola <span className="text-cyan-500">{userName}</span>!
            </h1>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Todo lo que tu familia necesita
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Porque cuidarlos no tiene que ser difícil ni caro
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {services.map((service) => (
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
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate('/contact');
            }}
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ¿Tienes Consultas?
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