import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { UserContext } from './contexts/UserContext';

// Custom Navigation Icons - Diseñados profesionalmente
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
    <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.2"/>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
  </svg>
);

const BackArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
    <path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
  </svg>
);

const ChecklistIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <circle cx="10" cy="10" r="8"/>
    <path d="M7 10L9 12L13 8" stroke="white" strokeWidth="2" strokeLinecap="square" fill="none"/>
  </svg>
);

// Premium Icons
const FamilyIcon = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="25" r="8" fill="white" stroke="white" strokeWidth="2"/>
    <circle cx="50" cy="25" r="8" fill="white" stroke="white" strokeWidth="2"/>
    <circle cx="40" cy="45" r="6" fill="white" stroke="white" strokeWidth="2"/>
    <path d="M20 55C20 48 24 43 30 43C36 43 40 48 40 55V60H20V55Z" fill="white"/>
    <path d="M40 55C40 48 44 43 50 43C56 43 60 48 60 55V60H40V55Z" fill="white"/>
    <circle cx="30" cy="25" r="4" fill="#00D9FF"/>
    <circle cx="50" cy="25" r="4" fill="#FF2B8A"/>
    <circle cx="40" cy="45" r="3" fill="#FFB800"/>
  </svg>
);

const SavingsIcon = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="28" fill="white" stroke="white" strokeWidth="3"/>
    <text x="40" y="52" textAnchor="middle" fill="#10B981" fontSize="36" fontWeight="bold">$</text>
    <path d="M35 25L45 25M40 22L40 28" stroke="#10B981" strokeWidth="3" strokeLinecap="round"/>
    <path d="M35 55L45 55M40 52L40 58" stroke="#10B981" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const BlogIcon = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="24" y="18" width="32" height="44" rx="3" fill="white" stroke="white" strokeWidth="2.5"/>
    <rect x="30" y="26" width="20" height="3" rx="1.5" fill="#FF6F61"/>
    <rect x="30" y="33" width="20" height="3" rx="1.5" fill="#FF6F61"/>
    <rect x="30" y="40" width="16" height="3" rx="1.5" fill="#FF6F61"/>
  </svg>
);

const ContactIcon = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="35" r="16" fill="white" stroke="white" strokeWidth="2"/>
    <path d="M32 23C26.5 23 22 27.5 22 33C22 35 22.6 36.8 23.6 38.3L22 43L26.9 41.4C28.3 42.3 30 43 32 43C37.5 43 42 38.5 42 33C42 27.5 37.5 23 32 23Z" fill="#7CB342"/>
    <rect x="46" y="28" width="22" height="16" rx="3" fill="white" stroke="white" strokeWidth="2"/>
    <path d="M46 31L57 38L68 31" stroke="#7CB342" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CancelIcon = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="28" fill="white" stroke="white" strokeWidth="3"/>
    <path d="M28 28L52 52M52 28L28 52" stroke="#EF4444" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

const ServiceCard = ({ icon: Icon, title, description, color, onClick, badge }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-2 ${
        isHovered ? 'border-' + color + '-500' : 'border-transparent'
      } transform ${isHovered ? 'scale-105 -translate-y-1' : ''}`}
    >
      {badge && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {badge}
          </span>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className={`w-16 h-16 flex-shrink-0 transition-transform duration-300 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
            <Icon />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
        </div>
      </div>
      
      <div className={`h-1 bg-gradient-to-r from-${color}-400 to-${color}-600 transform transition-all duration-300 ${
        isHovered ? 'scale-x-100' : 'scale-x-0'
      }`} />
    </div>
  );
};

const Migrant = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  
  // Get user data
  const [userName, setUserName] = useState('Usuario');
  const [userEmail, setUserEmail] = useState('');
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    try {
      if (currentUser && currentUser.firstName) {
        setUserName(currentUser.firstName);
        setUserEmail(currentUser.email || '');
      } else {
        const currentUserStored = localStorage.getItem('currentUser');
        if (currentUserStored) {
          const parsed = JSON.parse(currentUserStored);
          setUserName(parsed?.firstName || 'Usuario');
          setUserEmail(parsed?.email || '');
        } else {
          const accessUserStored = localStorage.getItem('accessUser');
          if (accessUserStored) {
            const parsed = JSON.parse(accessUserStored);
            setUserName(parsed?.firstName || 'Usuario');
            setUserEmail(parsed?.email || '');
          }
        }
      }

      // Check if this is first visit (show welcome banner)
      const hasVisited = localStorage.getItem('migrant_dashboard_visited');
      if (!hasVisited) {
        setShowWelcomeBanner(true);
        localStorage.setItem('migrant_dashboard_visited', 'true');
      }
    } catch (e) {
      console.error('Error loading user data:', e);
    }
  }, [currentUser]);

  // Savings data - starts at zero for new users
  const savingsData = {
    totalSaved: 0.00,
    monthsActive: 1,
    lastMonthSavings: 0.00,
    familyMembers: 0,
    servicesUsed: 0
  };

  // Sample data for visualization
  const sampleServicesData = [
    { name: 'Telemedicina', value: 450, color: '#10B981' },
    { name: 'Terapia', value: 554, color: '#8B5CF6' },
    { name: 'Farmacia', value: 133, color: '#F59E0B' }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <img 
            src="/saludcompartida logo WT.png" 
            alt="SaludCompartida" 
            className="h-16"
          />
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <span className="text-2xl">🇺🇸</span>
                Migrante en USA
              </p>
              <p className="text-sm font-semibold text-cyan-600">{userEmail}</p>
            </div>
            <button
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/');
              }}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-xl hover:from-cyan-600 hover:to-pink-600 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <BackArrowIcon />
              Volver
            </button>
          </div>
        </div>
      </header>

      {/* Welcome Banner - First visit only */}
      {showWelcomeBanner && (
        <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white py-6 px-4 shadow-lg relative">
          <button
            onClick={() => setShowWelcomeBanner(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <CloseIcon />
          </button>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-3">
              <CheckCircleIcon />
              <h2 className="text-2xl md:text-3xl font-bold">¡Bienvenido a SaludCompartida!</h2>
            </div>
            <p className="text-base md:text-lg leading-relaxed max-w-5xl">
              🎉 <span className="font-bold">¡Felicidades!</span> Acabas de proteger la salud de tu familia en México. 
              Tus familiares ya tienen acceso a <span className="font-bold">telemedicina 24/7, terapia con psicólogos certificados, 
              y descuentos de hasta 75% en farmacias</span>. Cada vez que usen estos servicios, verás los ahorros reflejados aquí. 
              <span className="font-bold"> ¡Comparte con ellos su código de acceso para que empiecen ahora mismo! 💙</span>
            </p>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
            ¡Hola, <span className="bg-gradient-to-r from-cyan-500 to-pink-500 bg-clip-text text-transparent">
              {userName}
            </span>!
          </h1>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🇺🇸</span>
            <p className="text-xl md:text-2xl text-gray-600 font-semibold">Dashboard del Migrante</p>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
            Desde aquí puedes monitorear los ahorros de tu familia en México, acceder al blog de salud y contactarnos si necesitas ayuda.
          </p>
        </div>

        {/* Stats Section - Hero Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Total Savings - Large Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12">
                  <SavingsIcon />
                </div>
                <p className="text-cyan-100 text-lg font-semibold">Ahorro Total de tu Familia</p>
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-4">
                ${displayedTotal.toFixed(2)}
              </h2>
              <p className="text-cyan-100 text-base md:text-lg mb-6">
                MXN • {savingsData.monthsActive === 1 ? 'Primer mes activo' : `${savingsData.monthsActive} meses activos`}
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-sm text-cyan-100 mb-3 font-semibold">A medida que tu familia use los servicios:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white">
                    <ChecklistIcon />
                    <span className="text-sm">Videollamadas con doctores 24/7</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <ChecklistIcon />
                    <span className="text-sm">Sesiones de terapia con psicólogos</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <ChecklistIcon />
                    <span className="text-sm">Descuentos hasta 75% en farmacias</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Stats Card */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-gray-100">
            <div className="text-center">
              <p className="text-gray-600 font-semibold mb-3">Estadísticas del Mes</p>
              <p className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                ${savingsData.lastMonthSavings.toFixed(2)}
              </p>
              <div className="space-y-3">
                <div className="bg-cyan-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Servicios Usados</p>
                  <p className="text-3xl font-bold text-cyan-600">{savingsData.servicesUsed}</p>
                </div>
                <div className="bg-pink-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Familiares Activos</p>
                  <p className="text-3xl font-bold text-pink-600">{savingsData.familyMembers}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 flex-shrink-0">
              <FamilyIcon />
            </div>
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                ✨ ¡Tu familia ya tiene acceso completo!
              </h3>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
                Tus familiares en México pueden usar <span className="font-semibold text-cyan-600">telemedicina 24/7</span>, 
                agendar <span className="font-semibold text-purple-600">sesiones de terapia con psicólogos certificados</span>, 
                y obtener <span className="font-semibold text-pink-600">descuentos de hasta 75% en farmacias</span>.
              </p>
              <p className="text-xs md:text-sm text-gray-600 italic">
                💡 <strong>Tip:</strong> Cada consulta médica ahorra $80-$100 USD • Cada sesión de terapia ahorra $120-$150 USD • 
                Los descuentos en farmacia varían según medicamentos.
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Acceso Rápido</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard
              icon={BlogIcon}
              title="Blog de Salud"
              description="Artículos sobre salud, bienestar y cuidado familiar"
              color="orange"
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/blog');
              }}
              badge="📚 Nuevo"
            />
            
            <ServiceCard
              icon={ContactIcon}
              title="Contáctanos"
              description="¿Preguntas? Escríbenos por WhatsApp o Email"
              color="green"
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/migrantcontact');
              }}
            />
            
            <ServiceCard
              icon={CancelIcon}
              title="Cancelar Suscripción"
              description="Gestiona tu membresía y opciones"
              color="red"
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/cancel-subscription');
              }}
            />
          </div>
        </div>

        {/* Example Savings - Only shown when no data */}
        {savingsData.totalSaved === 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border-2 border-dashed border-gray-300">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 text-center">
              📊 Ejemplo de Ahorros Futuros
            </h3>
            <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
              Así se verá tu dashboard cuando tu familia empiece a usar los servicios:
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Sample Chart */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-4">Distribución de Ahorros</h4>
                <div className="flex items-center justify-center h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sampleServicesData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sampleServicesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value} MXN`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sample Stats */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700 mb-4">Ahorros por Servicio</h4>
                {sampleServicesData.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: service.color }}
                      />
                      <span className="font-semibold text-gray-800 text-sm md:text-base">{service.name}</span>
                    </div>
                    <span className="text-lg font-bold" style={{ color: service.color }}>
                      ${service.value}
                    </span>
                  </div>
                ))}
                <div className="pt-4 border-t-2 border-gray-200">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-xl">
                    <span className="font-bold text-gray-900">Total Ejemplo</span>
                    <span className="text-xl md:text-2xl font-black text-emerald-600">
                      $1,137 MXN
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-16 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-700 text-base md:text-lg font-medium text-center md:text-left">
              SaludCompartida · Cuidando a tu familia desde la distancia 💙
            </p>
            
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate('/terms', { state: { from: '/migrant' } })}
                className="text-gray-600 hover:text-cyan-600 text-sm font-medium transition-colors underline"
              >
                Términos
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => navigate('/privacy', { state: { from: '/migrant' } })}
                className="text-gray-600 hover:text-pink-600 text-sm font-medium transition-colors underline"
              >
                Privacidad
              </button>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-xs md:text-sm text-gray-500">
              © 2025 SaludCompartida. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Migrant;