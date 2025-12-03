import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-black border-t border-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo y tagline */}
          <div className="col-span-1 md:col-span-1">
            <img 
              src="/saludcompartida-transp dark-bg-no-tagline copy 2.jpg" 
              alt="SaludCompartida" 
              className="h-12 mb-6"
            />
            <p className="text-base text-gray-300 italic leading-relaxed">
              Donde está tu corazón, está SaludCompartida
            </p>
          </div>

          {/* Columna: Quienes Somos */}
          <div>
            <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider">
              Quienes Somos
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate('/quienes-somos')}
                  className="text-sm text-gray-300 hover:text-cyan-400 transition-colors text-left"
                >
                  Quienes Somos
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/vision-mision')}
                  className="text-sm text-gray-300 hover:text-cyan-400 transition-colors text-left"
                >
                  Visión y Misión
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/nuestros-pilares')}
                  className="text-sm text-gray-300 hover:text-cyan-400 transition-colors text-left"
                >
                  Nuestros Pilares
                </button>
              </li>
            </ul>
          </div>

          {/* Columna: Nuestros Servicios */}
          <div>
            <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider">
              Nuestros Servicios
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate('/telemedicine')}
                  className="text-sm text-gray-300 hover:text-cyan-400 transition-colors text-left"
                >
                  Videollamada con Doctores 24/7
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/pharmacy')}
                  className="text-sm text-gray-300 hover:text-cyan-400 transition-colors text-left"
                >
                  Descuento en Farmacias
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/therapy')}
                  className="text-sm text-gray-300 hover:text-cyan-400 transition-colors text-left"
                >
                  Sesiones con Terapeuta
                </button>
              </li>
            </ul>
          </div>

          {/* Columna: Legal */}
          <div>
            <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate('/terms')}
                  className="text-sm text-gray-300 hover:text-cyan-400 transition-colors text-left"
                >
                  Términos y Condiciones
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/privacy')}
                  className="text-sm text-gray-300 hover:text-cyan-400 transition-colors text-left"
                >
                  Política de Privacidad
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisora */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © 2025 SaludCompartida. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate('/contacto')}
                className="text-sm text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Contacto
              </button>
              <span className="text-gray-600">|</span>
              <p className="text-sm text-gray-300 font-medium">
                Cuidando lo que más importa
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}