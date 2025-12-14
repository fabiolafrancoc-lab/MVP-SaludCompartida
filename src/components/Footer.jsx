import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer({ variant = 'dark', internalPage = false }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(path);
  };

  // Estilos según variante
  const bgColor = variant === 'light' ? 'bg-white' : 'bg-black';
  const borderColor = variant === 'light' ? 'border-gray-200' : 'border-gray-800';
  const textColor = variant === 'light' ? 'text-gray-900' : 'text-white';
  const textSecondary = variant === 'light' ? 'text-gray-700' : 'text-gray-300';
  const textTertiary = variant === 'light' ? 'text-gray-500' : 'text-gray-400';
  const hoverColor = variant === 'light' ? 'hover:text-cyan-600' : 'hover:text-cyan-400';
  const dividerColor = variant === 'light' ? 'border-gray-300' : 'border-gray-700';

  return (
    <footer className={`${bgColor} border-t ${borderColor} ${textColor} py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo y tagline */}
          <div className="col-span-1 md:col-span-1">
            <img 
              src={variant === 'light' ? '/saludcompartida logo WT.png' : '/saludcompartida-transp dark-bg-no-tagline copy 2.jpg'}
              alt="SaludCompartida" 
              className="h-12 mb-6"
            />
            <p className={`text-base ${textSecondary} italic leading-relaxed`}>
              Donde está tu corazón, está SaludCompartida
            </p>
          </div>

          {/* Columna: Quienes Somos */}
          <div>
            <h3 className={`text-base font-bold ${textColor} mb-6 uppercase tracking-wider`}>
              Quienes Somos
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleNavigate(internalPage ? '/page4' : '/')}
                  className={`text-sm ${textSecondary} ${hoverColor} transition-colors text-left`}>
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate(internalPage ? '/quienes-somos-internal' : '/quienes-somos')}
                  className={`text-sm ${textSecondary} ${hoverColor} transition-colors text-left`}>
                  Quienes Somos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate(internalPage ? '/vision-mision-internal' : '/vision-mision')}
                  className={`text-sm ${textSecondary} ${hoverColor} transition-colors text-left`}>
                  Visión y Misión
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate(internalPage ? '/nuestros-pilares-internal' : '/nuestros-pilares')}
                  className={`text-sm ${textSecondary} ${hoverColor} transition-colors text-left`}>
                  Nuestros Pilares
                </button>
              </li>
            </ul>
          </div>

          {/* Columna: Nuestros Servicios */}
          <div>
            <h3 className={`text-base font-bold ${textColor} mb-6 uppercase tracking-wider`}>
              Nuestros Servicios
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleNavigate(internalPage ? '/telemedicine' : '/beneficios#telemedicina')}
                  className={`text-sm ${textSecondary} ${hoverColor} transition-colors text-left`}>
                  Videollamada con Doctores 24/7
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate(internalPage ? '/pharmacy' : '/beneficios#farmacias')}
                  className={`text-sm ${textSecondary} ${hoverColor} transition-colors text-left`}>
                  Descuento en Farmacias
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate(internalPage ? '/therapy' : '/beneficios#terapia')}
                  className={`text-sm ${textSecondary} ${hoverColor} transition-colors text-left`}>
                  Sesiones con Terapeuta
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate(internalPage ? '/savings' : '/beneficios#ahorros')}
                  className={`text-sm ${textSecondary} ${hoverColor} transition-colors text-left`}>
                  Mis Ahorros
                </button>
              </li>
            </ul>
          </div>

          {/* Columna: Legal */}
          <div>
            <h3 className={`text-base font-bold ${textColor} mb-6 uppercase tracking-wider`}>
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleNavigate('/terms')}
                  className={`text-sm ${textSecondary} ${hoverColor} transition-colors text-left`}>
                  Términos y Condiciones
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('/privacy')}
                  className={`text-sm ${textSecondary} ${hoverColor} transition-colors text-left`}>
                  Política de Privacidad
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisora */}
        <div className={`border-t ${dividerColor} pt-8 mt-8`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className={`text-sm ${textTertiary}`}>
              © 2025 SaludCompartida. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => handleNavigate('/contacto')}
                className={`text-sm ${textSecondary} ${hoverColor} transition-colors`}>
                Contacto
              </button>
              <span className={textTertiary}>|</span>
              <p className={`text-sm ${textSecondary} font-medium`}>
                Cuidando lo que más importa
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}