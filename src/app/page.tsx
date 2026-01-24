'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Phone, Pill, Heart, Users, Shield, Clock, ChevronRight, Star } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [userCount] = useState(1247);
  const [formData, setFormData] = useState({ nombre: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    sessionStorage.setItem('sc_registro_inicial', JSON.stringify(formData));
    setTimeout(() => router.push('/registro/datos-migrante'), 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      <header className="py-4 px-6 bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Image src="/saludcompartida logo WT.png" alt="SaludCompartida" width={200} height={64} className="h-16 w-auto" priority />
          <div className="hidden md:flex items-center gap-6">
            <a href="#servicios" className="text-gray-600 hover:text-sc-cyan-500">Servicios</a>
            <a href="tel:+13055227150" className="btn-outline text-sm py-2 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Llámanos
            </a>
          </div>
        </div>
      </header>

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="counter-badge absolute -top-4 left-4 z-10 animate-pulse-glow">
                <Users className="w-5 h-5" />
                <span>{userCount.toLocaleString()} familias protegidas</span>
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="w-full h-96 bg-gradient-to-br from-sc-cyan-500 to-sc-magenta-500 flex items-center justify-center">
                  <p className="text-white text-2xl font-bold">Imagen familiar</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white text-lg md:text-xl font-medium">"Ahora puedo cuidar a mi mamá desde aquí"</p>
                  <p className="text-gray-300 text-sm mt-1">— María G., Phoenix AZ</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="service-icon-cyan mx-auto mb-2"><Phone className="w-6 h-6" /></div>
                  <p className="text-xs text-gray-600">Telemedicina 24/7</p>
                </div>
                <div className="text-center">
                  <div className="service-icon-green mx-auto mb-2"><Pill className="w-6 h-6" /></div>
                  <p className="text-xs text-gray-600">Hasta 75% descuento</p>
                </div>
                <div className="text-center">
                  <div className="service-icon-magenta mx-auto mb-2"><Users className="w-6 h-6" /></div>
                  <p className="text-xs text-gray-600">Hasta 4 personas</p>
                </div>
              </div>
            </div>

            <div className="lg:pl-8">
              <div className="card-sc max-w-md mx-auto lg:mx-0">
                <div className="text-center mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-sc-gray-800 mb-2">Cuida a tu familia en México</h1>
                  <p className="text-gray-600">Desde <span className="text-sc-cyan-500 font-bold text-2xl">$12</span>/mes para hasta 4 personas</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tu nombre</label>
                    <input type="text" required className="input-sc" placeholder="¿Cómo te llamas?" 
                      value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tu correo electrónico</label>
                    <input type="email" required className="input-sc" placeholder="tu@email.com"
                      value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2">
                    {isLoading ? <span className="spinner" /> : <><span>Comenzar ahora</span><ChevronRight className="w-5 h-5" /></>}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1"><Shield className="w-4 h-4 text-sc-green-500" /><span>Pago seguro</span></div>
                    <div className="flex items-center gap-1"><Clock className="w-4 h-4 text-sc-cyan-500" /><span>Activo en 30 seg</span></div>
                    <div className="flex items-center gap-1"><Star className="w-4 h-4 text-sc-orange-500" /><span>4.9 estrellas</span></div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 text-center mt-4">
                Al continuar, aceptas nuestros <a href="/terminos" className="underline">Términos</a> y <a href="/privacidad" className="underline">Privacidad</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-sc-gray-800 mb-4">Todo lo que tu familia necesita</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Acceso inmediato a servicios de salud de calidad en México</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card-sc card-hover text-center">
              <div className="service-icon-cyan mx-auto mb-4"><Phone className="w-7 h-7" /></div>
              <h3 className="font-bold text-sc-gray-800 mb-2">Telemedicina 24/7</h3>
              <p className="text-sm text-gray-600">Consultas ilimitadas con médicos certificados</p>
            </div>
            <div className="card-sc card-hover text-center">
              <div className="service-icon-green mx-auto mb-4"><Pill className="w-7 h-7" /></div>
              <h3 className="font-bold text-sc-gray-800 mb-2">Descuento en Farmacias</h3>
              <p className="text-sm text-gray-600">40-75% de descuento en más de 1,700 farmacias</p>
            </div>
            <div className="card-sc card-hover text-center">
              <div className="service-icon-magenta mx-auto mb-4"><Heart className="w-7 h-7" /></div>
              <h3 className="font-bold text-sc-gray-800 mb-2">Terapia Psicológica</h3>
              <p className="text-sm text-gray-600">Sesiones semanales con psicólogos</p>
            </div>
            <div className="card-sc card-hover text-center">
              <div className="service-icon-orange mx-auto mb-4"><Users className="w-7 h-7" /></div>
              <h3 className="font-bold text-sc-gray-800 mb-2">Hasta 4 Personas</h3>
              <p className="text-sm text-gray-600">Una suscripción cubre a toda tu familia</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-sc-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-sm text-gray-400">© 2026 SaludCompartida. Todos los derechos reservados.</div>
          <div className="text-sm text-gray-400 mt-2">Contacto: +1 305 522 7150</div>
        </div>
      </footer>
    </div>
  );
}
