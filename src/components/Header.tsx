import Link from 'next/link';
import { Phone, Mail, MapPin, Menu, Bell, User as UserIcon } from 'lucide-react';

interface HeaderProps {
  variant?: 'landing' | 'registration' | 'dashboard';
  currentStep?: number;
  totalSteps?: number;
  userName?: string;
  userPlan?: string;
  showNotifications?: boolean;
}

export default function Header({
  variant = 'landing',
  currentStep,
  totalSteps,
  userName,
  userPlan,
  showNotifications = false
}: HeaderProps) {
  
  // Landing variant
  if (variant === 'landing') {
    return (
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-sc-gray hover:text-sc-cyan transition-colors">
              SaludCompartida
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/#servicios" className="text-gray-600 hover:text-sc-cyan transition-colors">
                Servicios
              </Link>
              <Link href="/como-funciona" className="text-gray-600 hover:text-sc-cyan transition-colors">
                Cómo Funciona
              </Link>
              <Link href="/nosotros" className="text-gray-600 hover:text-sc-cyan transition-colors">
                Nosotros
              </Link>
              <a
                href="tel:+13055227150"
                className="btn-primary flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Llámanos
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-gray-600 hover:text-sc-cyan">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Registration variant
  if (variant === 'registration') {
    return (
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-2xl font-bold text-sc-gray">
              SaludCompartida
            </Link>
            {currentStep && totalSteps && (
              <span className="text-sm text-gray-600">
                Paso {currentStep} de {totalSteps}
              </span>
            )}
          </div>
          
          {/* Progress Bar */}
          {currentStep && totalSteps && (
            <div className="flex gap-2">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-2 rounded-full transition-colors ${
                    index < currentStep ? 'bg-sc-cyan' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </header>
    );
  }

  // Dashboard variant
  if (variant === 'dashboard') {
    return (
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-2xl font-bold text-sc-gray hover:text-sc-cyan transition-colors">
              SaludCompartida
            </Link>
            
            <div className="flex items-center gap-4">
              {/* Notifications */}
              {showNotifications && (
                <button className="relative p-2 text-gray-600 hover:text-sc-cyan transition-colors">
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              )}

              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden md:block">
                  <div className="text-sm font-semibold text-sc-gray">{userName || 'Usuario'}</div>
                  <div className="text-xs text-gray-500">Plan {userPlan || 'Basic'}</div>
                </div>
                <Link
                  href="/dashboard/cuenta"
                  className="w-10 h-10 bg-gradient-to-br from-sc-cyan to-blue-600 rounded-full flex items-center justify-center text-white font-bold hover:scale-110 transition-transform"
                >
                  {userName ? userName.charAt(0).toUpperCase() : <UserIcon className="w-5 h-5" />}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return null;
}
