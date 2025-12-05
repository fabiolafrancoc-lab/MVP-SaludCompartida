import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Migrant = () => {
  const navigate = useNavigate();
  
  // Get user data from localStorage
  let userName = 'Usuario';
  try {
    // Primero intentar con currentUser (nuevo sistema)
    const currentUserStored = localStorage.getItem('currentUser');
    if (currentUserStored) {
      const parsed = JSON.parse(currentUserStored);
      userName = parsed?.firstName || 'Usuario';
    } else {
      // Fallback a accessUser (sistema anterior)
      const accessUserStored = localStorage.getItem('accessUser');
      if (accessUserStored) {
        const parsed = JSON.parse(accessUserStored);
        userName = parsed?.firstName || 'Usuario';
      }
    }
  } catch (e) {
    userName = 'Usuario';
  }

  // Savings data from family in Mexico - converted to USD
  const savingsData = {
    totalSaved: 269.38,
    monthsActive: 3,
    lastMonthSavings: 153.27,
    services: [
      {
        name: 'Telemedicina',
        saved: 450.00,
        uses: 8,
        regularPrice: 640,
        paidPrice: 190
      },
      {
        name: 'Terapia',
        saved: 554.00,
        uses: 4,
        regularPrice: 800,
        paidPrice: 246
      },
      {
        name: 'Farmacia Benavides',
        saved: 120.00,
        uses: 3,
        regularPrice: 200,
        paidPrice: 80
      },
      {
        name: 'Farmacias del Ahorro',
        saved: 13.30,
        uses: 2,
        regularPrice: 35,
        paidPrice: 21.70
      },
      {
        name: 'Compras para el Hogar',
        saved: 110.20,
        uses: 5,
        regularPrice: 250,
        paidPrice: 139.80
      }
    ],
    monthlyBreakdown: [
      { month: 'Mes 1', saved: 20 },
      { month: 'Mes 2', saved: 97 },
      { month: 'Mes 3', saved: 153.27 }
    ]
  };

  // Annual projection in USD
  const annualProjection = 613;

  // Animated counter for total savings
  const [displayedTotal, setDisplayedTotal] = useState(0);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const duration = 2000;
    const steps = 60;
    const increment = savingsData.totalSaved / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= savingsData.totalSaved) {
        setDisplayedTotal(savingsData.totalSaved);
        clearInterval(timer);
      } else {
        setDisplayedTotal(current);
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [savingsData.totalSaved]);

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
            onClick={() => {
              window.scrollTo(0, 0);
              navigate('/page3');
            }}
            className="flex items-center gap-2 px-6 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-all font-medium text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            ¡Hola, <span className="text-cyan-500">{userName}</span>!
          </h1>
          <p className="text-2xl text-gray-600 mb-4">
            Migrante
          </p>
          <div className="bg-gradient-to-r from-orange-50 to-pink-50 border-l-4 border-orange-500 rounded-lg p-6 mt-6">
            <p className="text-lg text-gray-800 leading-relaxed">
              <span className="font-bold text-orange-600">¡Bienvenido a tu comunidad!</span> Acabas de dar el paso más importante: 
              proteger la salud de tu familia. <span className="font-semibold text-cyan-600">Miles de familias ya están ahorrando</span> y 
              tú acabas de unirte. <span className="font-bold text-pink-600">No esperes más para que tu familia comience a usar los servicios.</span> Cada 
              día cuenta, y los beneficios están activos desde ahora. 💙
            </p>
          </div>
        </div>

        {/* Total Savings Hero Card */}
        <div className="bg-gradient-to-br from-cyan-500 to-pink-500 rounded-3xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-cyan-100 text-lg mb-2">Ahorro Total Acumulado</p>
              <h2 className="text-6xl font-bold mb-4">
                MX$ 0.00
              </h2>
              <p className="text-cyan-100 text-lg">
                Recién estás comenzando • A medida que uses los servicios, verás tus ahorros crecer aquí
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center">
              <p className="text-cyan-100 text-sm mb-2">Ahorro Este Mes</p>
              <p className="text-4xl font-bold">MX$ 0.00</p>
              <p className="text-cyan-100 text-sm mt-2">Mes 1</p>
            </div>
          </div>
        </div>

        {/* Service Tiles */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Blog Access */}
          <div 
            onClick={() => {
              window.scrollTo(0, 0);
              navigate('/blog');
            }}
            className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl transition-shadow border-2 border-transparent hover:border-pink-500"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Blog de Salud</h3>
            <p className="text-gray-600">
              Accede a artículos sobre salud, bienestar y cuidado familiar
            </p>
          </div>

          {/* Contact Form */}
          <div 
            onClick={() => {
              window.scrollTo(0, 0);
              navigate('/migrantcontact');
            }}
            className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl transition-shadow border-2 border-transparent hover:border-cyan-500"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Contáctanos</h3>
            <p className="text-gray-600">
              ¿Tienes preguntas? Estamos aquí para ayudarte
            </p>
          </div>

          {/* Cancel Subscription */}
          <div 
            onClick={() => {
              window.scrollTo(0, 0);
              navigate('/cancel-subscription');
            }}
            className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl transition-shadow border-2 border-transparent hover:border-red-500"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Cancelar Suscripción</h3>
            <p className="text-gray-600">
              ¿Necesitas cancelar? Estamos aquí para ayudarte con el proceso
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-l-4 border-cyan-500 rounded-lg p-6">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-cyan-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm text-cyan-900 font-semibold mb-1">
                ¡Tu familia ya tiene acceso a todos los servicios! 🎉
              </p>
              <p className="text-sm text-cyan-800">
                Los ahorros comenzarán a mostrarse aquí cuando tu familia en México use los servicios de telemedicina, terapia o descuentos en farmacias. Recuerda: cada consulta, cada receta, cada descuento se traducirá en ahorros reales que verás reflejados en este tablero.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Migrant;