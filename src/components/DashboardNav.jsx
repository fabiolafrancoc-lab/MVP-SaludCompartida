import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const DashboardNav = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [openMenu, setOpenMenu] = useState(null);
  const [isMigrant, setIsMigrant] = useState(false);

  useEffect(() => {
    try {
      if (currentUser && currentUser.isMigrant !== undefined) {
        setIsMigrant(currentUser.isMigrant === true);
      } else {
        const currentUserData = localStorage.getItem('currentUser');
        if (currentUserData) {
          const userData = JSON.parse(currentUserData);
          setIsMigrant(userData.isMigrant === true);
        }
      }
    } catch (error) {
      console.error('Error reading user data:', error);
    }
  }, [currentUser]);

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

  const toggleMenu = (menuTitle) => {
    setOpenMenu(openMenu === menuTitle ? null : menuTitle);
  };

  return (
    <>
      {/* Header with Logo */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <img 
            src="/saludcompartida logo WT.png" 
            alt="SaludCompartida" 
            className="h-16 cursor-pointer"
            onClick={() => {
              window.scrollTo(0, 0);
              navigate('/page4');
            }}
          />
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate('/page4');
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
    </>
  );
};

export default DashboardNav;
