'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, AlertTriangle, Check } from 'lucide-react';

const CancelSubscription = () => {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [canceled, setCanceled] = useState(false);
  const [userName, setUserName] = useState('');
  const [isMigrant, setIsMigrant] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Get user name from localStorage and detect if migrant
    try {
      const currentUserData = localStorage.getItem('currentUser');
      if (currentUserData) {
        const userData = JSON.parse(currentUserData);
        setUserName(userData.firstName || '');
        // Detect if user is migrant
        const userIsMigrant = Boolean(
          userData.isMigrant ||
          userData.accessType === 'migrant' ||
          userData.type === 'migrant' ||
          userData.countryCode === '+1'
        );
        setIsMigrant(userIsMigrant);
      }
    } catch (error) {
      console.error('Error reading user data:', error);
    }
  }, []);

  const handleCancelRequest = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = async () => {
    setIsCanceling(true);

    // Simulate cancellation process (2 seconds)
    setTimeout(() => {
      // Mark subscription as canceled in localStorage
      try {
        const subscriptionData = localStorage.getItem('subscriptionData');
        if (subscriptionData) {
          const data = JSON.parse(subscriptionData);
          data.status = 'canceled';
          data.canceledAt = new Date().toISOString();
          localStorage.setItem('subscriptionData', JSON.stringify(data));
        }

        // TODO: Call backend API to cancel Square subscription
        // await fetch('/api/cancel-subscription', { method: 'POST', ... });
        
        setCanceled(true);
        setIsCanceling(false);
        setShowConfirmModal(false);
      } catch (error) {
        console.error('Error canceling subscription:', error);
        setIsCanceling(false);
      }
    }, 2000);
  };

  // Navigate to correct dashboard based on user type
  const navigateToDashboard = () => {
    navigate(isMigrant ? '/migrant' : '/page4');
  };

  if (canceled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-pink-50 to-gray-50 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-12 h-12 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-lg md:text-3xl lg:text-4xl md:text-lg md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Suscripción Cancelada
            </h1>
            
            <p className="text-base md:text-2xl lg:text-3xl text-gray-600 mb-8">
              Tu suscripción ha sido cancelada exitosamente. Recibirás un correo de confirmación con los detalles.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <p className="text-sm text-blue-800">
                <strong>Nota:</strong> Seguirás teniendo acceso a los servicios hasta el final de tu período de facturación actual.
              </p>
            </div>

            <button
              onClick={() => navigateToDashboard()}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl font-bold text-base md:text-2xl lg:text-3xl shadow-lg hover:shadow-xl transition-all"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-pink-50 to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <img 
            src="/saludcompartida logo WT.png" 
            alt="SaludCompartida" 
            className="h-16"
          />
          <button
            onClick={() => navigateToDashboard()}
            className="text-gray-600 hover:text-gray-900 font-medium text-base md:text-2xl lg:text-3xl"
          >
            Volver
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </div>
            </div>
            
            <h1 className="text-lg md:text-3xl lg:text-4xl md:text-lg md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Cancelar Suscripción
            </h1>
            
            {userName && (
              <p className="text-lg md:text-3xl lg:text-4xl text-gray-600 mb-6">
                {userName}, lamentamos verte partir
              </p>
            )}
            
            <p className="text-base md:text-2xl lg:text-3xl text-gray-600 max-w-2xl mx-auto">
              Si cancelas tu suscripción, tu familia en México perderá acceso a todos estos beneficios:
            </p>
          </div>

          {/* Benefits Lost */}
          <div className="space-y-4 mb-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 text-base md:text-2xl lg:text-3xl mb-1">
                    Telemedicina 24/7
                  </h3>
                  <p className="text-gray-600">
                    Consultas médicas ilimitadas a cualquier hora, con receta electrónica incluida.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 text-base md:text-2xl lg:text-3xl mb-1">
                    Descuentos en Farmacias
                  </h3>
                  <p className="text-gray-600">
                    Hasta 75% de descuento en medicamentos y productos de farmacia.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 text-base md:text-2xl lg:text-3xl mb-1">
                    Terapia Psicológica Semanal
                  </h3>
                  <p className="text-gray-600">
                    Sesiones semanales de terapia profesional para cuidar la salud mental de tu familia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Reminder */}
          <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-6 mb-8">
            <p className="text-center text-gray-700">
              Por solo <span className="font-bold text-cyan-600 text-base md:text-2xl lg:text-3xl">$12.00 USD</span> al mes, 
              tu familia en México tiene acceso completo a servicios de salud de calidad.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => navigateToDashboard()}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl font-bold text-base md:text-2xl lg:text-3xl shadow-lg hover:shadow-xl transition-all"
            >
              Mantener Mi Suscripción
            </button>
            
            <button
              onClick={handleCancelRequest}
              className="px-8 py-4 bg-white hover:bg-gray-50 text-red-600 border-2 border-red-600 rounded-xl font-bold text-base md:text-2xl lg:text-3xl transition-all"
            >
              Continuar con la Cancelación
            </button>
          </div>

          {/* Help Section */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              ¿Tienes algún problema o duda? Hablemos antes de que canceles.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="text-cyan-600 hover:text-cyan-700 font-bold underline"
            >
              Contáctanos → Estamos aquí para ayudarte
            </button>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full">
            <div className="text-center mb-6">
              <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h2 className="text-base md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                Confirmación Final
              </h2>
              <p className="text-gray-600">
                ¿Estás completamente seguro que deseas cancelar tu suscripción?
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-700">
                <strong>Importante:</strong> Esta acción cancelará tu suscripción inmediatamente. 
                Seguirás teniendo acceso hasta el final de tu período actual de facturación.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleConfirmCancel}
                disabled={isCanceling}
                className={`w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all ${
                  isCanceling ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isCanceling ? 'Cancelando...' : 'Sí, Cancelar Mi Suscripción'}
              </button>
              
              <button
                onClick={() => setShowConfirmModal(false)}
                disabled={isCanceling}
                className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-bold transition-all"
              >
                No, Mantener Mi Suscripción
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CancelSubscription;
