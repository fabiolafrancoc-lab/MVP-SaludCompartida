'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Video,
  Pill,
  Stethoscope,
  FileText,
  Brain,
  BookOpen,
  MessageCircle,
  User,
  X,
  Copy,
  Check,
  Users,
  TrendingUp,
  Calendar,
  ChevronRight,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { formatUSD } from '@/lib/utils';

const SERVICES = [
  {
    title: 'Telemedicina',
    subtitle: 'Consulta médica 24/7',
    icon: Video,
    color: 'cyan' as const,
    href: '/dashboard/telemedicina',
    badge: 'Ilimitado'
  },
  {
    title: 'Farmacia',
    subtitle: 'Descuentos hasta 80%',
    icon: Pill,
    color: 'green' as const,
    href: '/dashboard/farmacia',
    badge: 'Ahorra hoy'
  },
  {
    title: 'Especialistas',
    subtitle: 'Red de médicos',
    icon: Stethoscope,
    color: 'magenta' as const,
    href: '/dashboard/especialistas'
  },
  {
    title: 'Exámenes',
    subtitle: 'Laboratorio y estudios',
    icon: FileText,
    color: 'orange' as const,
    href: '/dashboard/examenes'
  },
  {
    title: 'Terapia',
    subtitle: 'Apoyo psicológico',
    icon: Brain,
    color: 'cyan' as const,
    href: '/dashboard/terapia',
    badge: 'Premium'
  },
  {
    title: 'Blog de Salud',
    subtitle: 'Artículos y consejos',
    icon: BookOpen,
    color: 'green' as const,
    href: '/dashboard/blog'
  },
  {
    title: 'Comunidad',
    subtitle: 'Foro y soporte',
    icon: MessageCircle,
    color: 'magenta' as const,
    href: '/dashboard/comunidad'
  },
  {
    title: 'Mi Cuenta',
    subtitle: 'Perfil y ajustes',
    icon: User,
    color: 'orange' as const,
    href: '/dashboard/cuenta'
  }
];

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [codigoFamilia, setCodigoFamilia] = useState('');
  const [copied, setCopied] = useState(false);
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    // Verificar si es nuevo registro
    const isNuevo = searchParams.get('nuevo') === 'true';
    const codigo = searchParams.get('codigo') || sessionStorage.getItem('sc_codigo_familia') || '';
    
    setCodigoFamilia(codigo);

    if (isNuevo && codigo) {
      setShowWelcomeModal(true);
    }

    // Cargar datos del registro
    loadRegistrationData(codigo);
  }, [searchParams]);

  const loadRegistrationData = async (codigo: string) => {
    if (!codigo) return;

    try {
      const response = await fetch(`/api/registro?codigo=${codigo}`);
      if (response.ok) {
        const data = await response.json();
        setRegistrationData(data);
      }
    } catch (error) {
      console.error('Error loading registration:', error);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(codigoFamilia);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const closeModal = () => {
    setShowWelcomeModal(false);
    // Limpiar query params
    router.replace('/dashboard');
  };

  const userName = registrationData?.suscriptor_nombre?.split(' ')[0] || 'Usuario';
  const planName = registrationData?.plan_name || 'Basic';
  const familyCount = 4; // Calcular del registro real
  const totalConsultations = 12; // Desde base de datos
  const totalSavings = 145.50; // Desde base de datos

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-sc-gray">SaludCompartida</h1>
            
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-sc-cyan transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="text-right">
                    <div className="text-sm font-semibold text-sc-gray">{userName}</div>
                    <div className="text-xs text-gray-500">Plan {planName}</div>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-sc-cyan to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {userName.charAt(0)}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                    <a
                      href="/dashboard/cuenta"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Configuración</span>
                    </a>
                    <a
                      href="/dashboard/familia"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      <Users className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Mi Familia</span>
                    </a>
                    <hr className="my-2" />
                    <button
                      onClick={() => router.push('/logout')}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-600">Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="card-sc bg-gradient-to-r from-sc-cyan to-blue-600 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">¡Hola, {userName}! 👋</h2>
              <p className="text-blue-100 text-lg">
                Tu familia tiene acceso a todos los servicios de salud
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <span className="text-sm font-semibold">Tu código: {codigoFamilia}</span>
                </div>
                <button
                  onClick={copyCode}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  title="Copiar código"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Users className="w-16 h-16" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-sc">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Consultas</p>
                <p className="text-3xl font-bold text-sc-cyan">{totalConsultations}</p>
              </div>
              <Calendar className="w-10 h-10 text-sc-cyan opacity-20" />
            </div>
          </div>

          <div className="card-sc">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Ahorros</p>
                <p className="text-3xl font-bold text-sc-green">{formatUSD(totalSavings)}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-sc-green opacity-20" />
            </div>
          </div>

          <div className="card-sc">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Familiares</p>
                <p className="text-3xl font-bold text-sc-magenta">{familyCount}</p>
              </div>
              <Users className="w-10 h-10 text-sc-magenta opacity-20" />
            </div>
          </div>

          <div className="card-sc">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Plan</p>
                <p className="text-2xl font-bold text-sc-orange">{planName}</p>
              </div>
              <div className="w-10 h-10 bg-sc-orange rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-sc-gray mb-6">Servicios Disponibles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                subtitle={service.subtitle}
                icon={<service.icon className="w-6 h-6" />}
                color={service.color}
                href={service.href}
                badge={service.badge}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-sc">
          <h3 className="text-xl font-bold text-sc-gray mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sc-cyan rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sc-gray">Consulta de Telemedicina</p>
                  <p className="text-sm text-gray-600">Hace 2 días</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sc-green rounded-lg flex items-center justify-center">
                  <Pill className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sc-gray">Descuento en Farmacia</p>
                  <p className="text-sm text-gray-600">Hace 5 días - Ahorraste $23.50</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sc-magenta rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sc-gray">Sesión de Terapia</p>
                  <p className="text-sm text-gray-600">Hace 1 semana</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </main>

      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 relative animate-fade-in">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-sc-cyan to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-12 h-12 text-white" />
              </div>

              <h2 className="text-4xl font-bold text-sc-gray mb-4">
                ¡Bienvenido a SaludCompartida!
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Tu familia ya tiene acceso a todos los servicios de salud
              </p>

              {/* Código */}
              <div className="card-sc bg-gradient-to-r from-sc-cyan to-blue-600 text-white mb-8">
                <p className="text-sm mb-2 text-blue-100">Tu código familiar</p>
                <div className="flex items-center justify-center gap-4">
                  <p className="text-5xl font-bold tracking-wider">{codigoFamilia}</p>
                  <button
                    onClick={copyCode}
                    className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                  </button>
                </div>
                <p className="text-sm mt-2 text-blue-100">
                  Comparte este código con tu familia en México
                </p>
              </div>

              {/* Next Steps */}
              <div className="text-left mb-8">
                <h3 className="text-lg font-semibold text-sc-gray mb-4">Próximos pasos:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-sc-cyan rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <p className="text-gray-700">Revisa el email de confirmación que te enviamos</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-sc-cyan rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <p className="text-gray-700">Comparte tu código con tu familia en México</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-sc-cyan rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <p className="text-gray-700">Explora los servicios disponibles en el dashboard</p>
                  </div>
                </div>
              </div>

              <button onClick={closeModal} className="btn-primary w-full">
                Explorar Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
