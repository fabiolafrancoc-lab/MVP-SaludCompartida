import { useLocation } from 'react-router-dom';
import { Heart, CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';

export default function Confirmacion() {
  const location = useLocation();
  const data = location.state || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-pink-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Heart className="w-7 h-7 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SaludCompartida</h1>
              <p className="text-xs text-gray-500">Uniendo Familias</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido centrado */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-2xl">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ¡Registro Exitoso, {data.nombre || 'Usuario'}!
          </h1>
          <p className="text-xl text-gray-600">
            Has dado el primer paso para proteger a tu familia. En <span className="font-semibold text-cyan-600">3 días hábiles</span> recibirás acceso completo.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}