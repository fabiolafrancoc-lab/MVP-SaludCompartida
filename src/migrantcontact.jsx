// src/migrantcontact.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WhatsAppButtonCyan } from './components/WhatsAppIcons';

export default function MigrantContact() {
  const navigate = useNavigate();

  // Get user's first name from localStorage
  let firstName = '';
  try {
    // Primero intentar con currentUser (nuevo sistema)
    const currentUserStored = localStorage.getItem('currentUser');
    if (currentUserStored) {
      const parsed = JSON.parse(currentUserStored);
      firstName = parsed?.firstName || '';
    } else {
      // Fallback a accessUser (sistema anterior)
      const accessUserStored = localStorage.getItem('accessUser');
      if (accessUserStored) {
        const parsed = JSON.parse(accessUserStored);
        firstName = parsed?.firstName || '';
      }
    }
  } catch (e) {
    firstName = '';
  }

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const whatsappNumber = '5529984922702';
  const whatsappMessage = encodeURIComponent(
    firstName 
      ? `Hello, I'm ${firstName}. 

🌟 *Welcome to SaludCompartida* 🌟

Please select an option:

1️⃣ I want to use Telemedicine
2️⃣ I want to schedule my appointment with my Therapist
3️⃣ I have questions about my Savings
4️⃣ Other Questions

📞 *Personalized Attention*
Leave your voice message and we'll call you back within 15 minutes.
🕐 Hours: Monday to Friday, 9:00 AM - 5:00 PM`
      : `Hello, I'm a new user. 

🌟 *Welcome to SaludCompartida* 🌟

Please select an option:

1️⃣ I want to use Telemedicine
2️⃣ I want to schedule my appointment with my Therapist
3️⃣ I have questions about my Savings
4️⃣ Other Questions

📞 *Personalized Attention*
Leave your voice message and we'll call you back within 15 minutes.
🕐 Hours: Monday to Friday, 9:00 AM - 5:00 PM`
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-pink-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <img
            src="/saludcompartida logo WT.png"
            alt="SaludCompartida"
            className="h-16 object-contain"
          />
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate('/migrant');
            }}
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Volver
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-4">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2">
              Contáctanos por WhatsApp
            </h1>
            {firstName && (
              <p className="text-xl text-gray-600">
                ¡Hola, {firstName}! Estamos listos para ayudarte
              </p>
            )}
            <p className="text-gray-600 mt-2">
              Haz clic en el botón para abrir WhatsApp y chatear con nosotros directamente
            </p>
          </div>

          {/* WhatsApp Button */}
          <WhatsAppButtonCyan
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          >
            Open WhatsApp
          </WhatsAppButtonCyan>

          {/* Info Box */}
          <div className="mt-8 bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm text-green-900 font-semibold mb-1">
                  Respuesta rápida garantizada
                </p>
                <p className="text-sm text-green-800">
                  Te responderemos en máximo <span className="font-bold">15 minutos</span> durante nuestro horario de atención (Lunes a Viernes, 9:00 AM - 6:00 PM).
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}