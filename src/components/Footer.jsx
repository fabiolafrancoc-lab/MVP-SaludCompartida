import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t border-gray-200 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo y tagline */}
          <div className="col-span-1 md:col-span-1">
            <img 
              src="/saludcompartida logo WT.png" 
              alt="SaludCompartida" 
              className="h-12 mb-4"
            />
            <p className="text-sm text-gray-600 italic">
              Donde está tu corazón, está SaludCompartida
            </p>
          </div>

          {/* Columna: Nosotros */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Nosotros</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/quienes-somos')}
                  className="text-sm text-gray-600 hover:text-cyan-600 transition-colors"
                >
                  Quiénes Somos
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/mision-y-valores')}
                  className="text-sm text-gray-600 hover:text-cyan-600 transition-colors"
                >
                  Misión y Valores
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/nuestros-pilares')}
                  className="text-sm text-gray-600 hover:text-cyan-600 transition-colors"
                >
                  Nuestros Pilares
                </button>
              </li>
            </ul>
          </div>

          {/* Columna: Servicios */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/beneficios')}
                  className="text-sm text-gray-600 hover:text-cyan-600 transition-colors"
                >
                  Beneficios
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="text-sm text-gray-600 hover:text-cyan-600 transition-colors"
                >
                  Planes
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/blog')}
                  className="text-sm text-gray-600 hover:text-cyan-600 transition-colors"
                >
                  Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Columna: Soporte */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/contacto')}
                  className="text-sm text-gray-600 hover:text-cyan-600 transition-colors"
                >
                  Contacto
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/terms')}
                  className="text-sm text-gray-600 hover:text-cyan-600 transition-colors"
                >
                  Términos y Condiciones
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/privacy')}
                  className="text-sm text-gray-600 hover:text-cyan-600 transition-colors"
                >
                  Aviso de Privacidad
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisora */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2025 SaludCompartida. Todos los derechos reservados.
            </p>
            <p className="text-sm text-gray-600 font-medium">
              SaludCompartida · Cuidando lo que más importa
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}