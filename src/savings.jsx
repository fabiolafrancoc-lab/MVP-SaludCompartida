import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Savings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Prefer name passed in location.state, otherwise try stored user data from page3, default to 'Nombre'
  let storedFirstName = null;
  try {
    // Primero intentar con currentUser (nuevo sistema)
    const currentUserStored = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null;
    if (currentUserStored) {
      const parsed = JSON.parse(currentUserStored);
      storedFirstName = parsed?.firstName || null;
    } else {
      // Fallback a accessUser (sistema anterior)
      const accessUserStored = typeof window !== 'undefined' ? localStorage.getItem('accessUser') : null;
      if (accessUserStored) {
        const parsed = JSON.parse(accessUserStored);
        storedFirstName = parsed?.firstName || null;
      }
    }
  } catch (e) {
    storedFirstName = null;
  }
  const userName = location.state?.name || storedFirstName || 'Nombre';

  // Datos simulados de ahorro
  const savingsData = {
    totalSaved: 2825.00,
    monthsActive: 3,
    services: [
      {
        name: 'Telemedicina',
        saved: 1106.00,
        uses: 2,
        regularPrice: 1105,
        paidPrice: 0,
        media: '/momhappy.jpeg',
        mediaType: 'image',
        testimonial: 'Consultas médicas sin salir de casa',
        icon: (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        )
      },
      {
    name: 'Terapia',
    saved: 1476.00,
    uses: 4,
    regularPrice: 1476,
    paidPrice: 0,
    media: '/mentalhealth.jpeg',
    mediaType: 'image',
    testimonial: 'Salud mental accesible para toda la familia',
        icon: (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      {
        name: 'Farmacia Benavides',
        saved: 120.00,
        uses: 3,
        regularPrice: 200,
        paidPrice: 80,
        media: '/benavides.jpeg',
        mediaType: 'image',
        testimonial: 'Medicinas cuando más las necesitas',
        icon: (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        )
      },
      {
    name: 'Farmacias del Ahorro',
    saved: 13.30,
    uses: 2,
    regularPrice: 35,
    paidPrice: 21.70,
    media: '/delahorro.jpeg',
    mediaType: 'image',
    testimonial: 'Cuidado inclusivo para todos',
        icon: (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )
      },
      {
    name: 'Compras para el Hogar',
    saved: 110.20,
    uses: 5,
    regularPrice: 250,
    paidPrice: 139.80,
    media: '/familyeating.jpeg',
    mediaType: 'image',
    testimonial: 'Bienestar familiar completo',
        icon: (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      }
    ],
    monthlyBreakdown: [
      { month: 'Mes 1', saved: 300 },
      { month: 'Mes 2', saved: 1780 },
      { month: 'Mes 3', saved: 4965 }
    ]
  };

  // Historias reales removed per request

  // Calcular proyección anual
  const averageMonthlySavings = savingsData.totalSaved / savingsData.monthsActive;
  const remainingMonths = 12 - savingsData.monthsActive;
  const annualProjection = savingsData.totalSaved + (averageMonthlySavings * remainingMonths);

  const formatNoCents = (value) => {
    try {
      return Math.round(value).toLocaleString('en-US');
    } catch (e) {
      return Math.round(value).toString();
    }
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Animación contador
  const [displayedTotal, setDisplayedTotal] = useState(0);
  
  useEffect(() => {
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

  const handleVolver = () => {
    window.scrollTo(0, 0);
    navigate('/page4', { state: { name: userName } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-pink-50">
      {/* Header with Volver button */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <img 
            src="/saludcompartida logo WT.png" 
            alt="SaludCompartida" 
            className="h-16"
          />
          <button
            onClick={handleVolver}
            className="text-gray-600 hover:text-gray-900 font-medium text-lg"
          >
            Volver
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section - Mensaje Personalizado */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¡Felicidades{' '}
            <span className="text-5xl md:text-7xl text-cyan-400 block mt-2">
              {userName}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Estás cuidando la salud de tu familia de forma estratégica
          </p>
        </div>

        {/* Ahorro Total - Card Principal con Imagen */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="rounded-3xl p-8 md:p-12 shadow-2xl"
                 style={{ background: 'linear-gradient(180deg, #FF2B8A 0%, #FF6F61 100%)' }}>
              <div className="flex flex-col items-center gap-6">
                <svg className="w-16 h-16 md:w-20 md:h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-center">
                  <p className="text-xl md:text-2xl text-white mb-2">Este Mes has Ahorrado</p>
                  <p className="text-5xl md:text-6xl font-bold text-white">
                    ${formatNoCents(displayedTotal)}
                  </p>
                  <p className="text-xl md:text-2xl text-white/90 mt-2">MXN</p>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-cyan-100">
              <img 
                src="/grandma.jpeg" 
                alt="Familia feliz con SaludCompartida"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        {/* Historias Reales removed as requested */}

        {/* Breakdown por Servicio con Media */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6">
            Desglose de Ahorros por Servicio
          </h2>
          <p className="text-lg text-center text-gray-700 mb-6">
            Cada peso que ahorras es un peso que inviertes en el bienestar de tu familia, <span className="text-cyan-600 font-semibold">{userName}</span>
          </p>

          <div className="space-y-4">
            {savingsData.services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="grid md:grid-cols-5 gap-0">
                  {/* Media - 40% width */}
                  <div className="relative h-40 md:h-56 md:col-span-2">
                    {service.mediaType === 'video' ? (
                      <video
                        src={service.media}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img 
                        src={service.media} 
                        alt={service.name} 
                        className={`w-full h-full ${
                          service.name === 'Farmacia Benavides' || service.name === 'Farmacias del Ahorro' 
                            ? 'object-contain bg-white p-4' 
                            : 'object-cover'
                        }`} 
                      />
                    )}
                  </div>

                  {/* Información - 60% width */}
                  <div className="p-4 md:p-6 flex flex-col justify-center md:col-span-3">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-gray-700 mb-3 italic">"{service.testimonial}"</p>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl md:text-3xl font-bold text-cyan-600">
                          MX${formatNoCents(service.saved)}
                        </span>
                        <span className="text-gray-600">ahorrados</span>
                      </div>
                      
                      <p className="text-gray-600">
                        Total {service.uses} uso{service.uses > 1 ? 's' : ''} en el mes
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-gray-50 rounded-lg p-2">
                          <p className="text-gray-500 mb-1">Precio Regular</p>
                          <p className="text-gray-900 font-semibold">MX${service.regularPrice}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2">
                          <p className="text-gray-500 mb-1">Con SaludCompartida</p>
                          <p className="text-cyan-600 font-semibold">MX${service.paidPrice}</p>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-2">
                        <p className="text-green-600 font-semibold text-center">
                          Ahorro: {((service.saved / service.regularPrice) * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>

                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className="bg-cyan-600 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${((service.saved / service.regularPrice) * 100).toFixed(0)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gráfica Visual */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6">
            Evolución de tu Ahorro
          </h2>
          <div className="bg-white rounded-2xl p-4 md:p-6">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={savingsData.monthlyBreakdown} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" stroke="#6B7280" />
                <YAxis type="category" dataKey="month" stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    color: '#111827'
                  }}
                  formatter={(value) => [`MX$${value}`, 'Ahorro']}
                />
                <Legend />
                <Bar
                  dataKey="saved"
                  fill="#00B7EB"
                  radius={[0, 8, 8, 0]}
                  name="Ahorro Acumulado MX$"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Proyección Anual */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6">
            Proyección Anual
          </h2>
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 text-center">
            <p className="text-lg text-gray-700 mb-4">
              <span className="text-cyan-600 font-bold">{userName}</span>, si continúas ahorrando así, a finales de diciembre habrás ahorrado
            </p>
            <p className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">
              ~${formatNoCents(annualProjection)}
            </p>
            <p className="text-2xl text-pink-600">MXN en el 2025</p>
          </div>
        </div>

        {/* Call-to-Action Motivacional */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl p-8 border border-cyan-100 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              <span className="text-cyan-600">{userName}</span>, estás tomando decisiones acertadas para tu familia
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Cada consulta, cada compra en farmacia, cada servicio que usas representa dinero que puedes invertir en lo que realmente importa: el bienestar de tu familia.
            </p>
          </div>
        </div>

        {/* Tips de Ahorro Adicional */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
            💡 Maximiza tus Ahorros
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Usa Telemedicina Primero</h4>
                  <p className="text-gray-700">
                    Ahorra hasta <span className="text-cyan-600 font-bold">MX$2,356/mes</span> consultando primero por teléfono antes de ir al doctor
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 text-pink-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Medicamentos Genéricos</h4>
                  <p className="text-gray-700">
                    Ahorra <span className="text-pink-400 font-bold">50% más (MX$955/mes)</span> comprando genéricos de igual calidad
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Compras del Hogar</h4>
                  <p className="text-gray-700">
                    Ahorra <span className="text-purple-400 font-bold">~MX$2,140/mes</span> comprando productos de hogar en farmacias con descuento
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Sesiones de Terapia</h4>
                  <p className="text-gray-700">
                    Invierte en salud mental: <span className="text-green-400 font-bold">MX$2,216/mes</span> en sesiones semanales
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Consultas Button */}
        <div className="mt-12 flex justify-center pb-8">
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

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>SaludCompartida © 2025 - Cuidando familias, construyendo futuro</p>
        </div>
      </footer>
    </div>
  );
};

export default Savings;