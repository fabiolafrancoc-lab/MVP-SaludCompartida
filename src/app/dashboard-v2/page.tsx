'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

export default function DashboardV2() {
  const router = useRouter();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  const [userData, setUserData] = useState<any>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Intentar obtener datos desde sessionStorage
      const sessionData = sessionStorage.getItem('registrationData');
      if (sessionData) {
        const parsed = JSON.parse(sessionData);
        setUserData(parsed);
      } else {
        // Si no hay sessionStorage, redirigir al login
        router.push('/landing-jan');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleFeedbackSubmit = async () => {
    if (!selectedRating) {
      alert('Por favor selecciona una calificación');
      return;
    }

    try {
      // Aquí puedes enviar el feedback a Supabase
      alert('¡Gracias por tu opinión! Nos ayuda mucho 💜');
      setSelectedRating(null);
      setFeedbackComment('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleWhatsAppLupita = () => {
    const phone = '15558420346'; // Número de WATI
    const message = encodeURIComponent('Hola Lupita, quiero platicar contigo. ¿Me puedes llamar?');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const handleEmergencyCall = () => {
    window.location.href = 'tel:911';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-[#0C1222] flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  const familyFirstName = userData?.family_first_name || 'María';
  const migrantFirstName = userData?.migrant_first_name || 'Carlos';
  const companionName = userData?.family_companion_assigned === 'lupita' ? 'Lupita' : 'Fernanda';

  return (
    <>
      <style jsx global>{`
        :root {
          --cyan: #06B6D4;
          --cyan-dark: #0891B2;
          --cyan-glow: rgba(6, 182, 212, 0.15);
          --magenta: #EC4899;
          --magenta-dark: #DB2777;
          --magenta-glow: rgba(236, 72, 153, 0.12);
          --green: #10B981;
          --green-light: #D1FAE5;
          --gold: #F59E0B;
          --gold-light: #FEF3C7;
          --purple: #8B5CF6;
          --gray-900: #0F172A;
          --gray-800: #1E293B;
          --gray-700: #334155;
          --gray-600: #475569;
          --gray-400: #94A3B8;
          --gray-200: #E2E8F0;
          --gray-100: #F1F5F9;
          --white: #FFFFFF;
          --whatsapp: #25D366;
        }

        * {
          -webkit-tap-highlight-color: transparent;
        }

        body {
          font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
          background: linear-gradient(180deg, var(--gray-900) 0%, #0C1222 100%);
          min-height: 100vh;
          color: var(--white);
          -webkit-font-smoothing: antialiased;
        }

        @keyframes pulse-green {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          50% { opacity: 0.8; box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(15, 23, 42, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .main-content {
          padding-top: 145px;
          padding-bottom: 100px;
        }

        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(15, 23, 42, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 10px 16px 22px;
          display: flex;
          justify-content: space-around;
          z-index: 100;
        }
      `}</style>

      {/* HEADER */}
      <header className="header">
        <div className="px-5 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/saludcompartida-dark-no-tagline.png" 
              alt="SaludCompartida" 
              className="h-8 w-auto"
            />
          </div>
          
          <div className="flex items-center gap-1.5 bg-green/15 px-3 py-1.5 rounded-full border border-green/30">
            <div className="w-2 h-2 bg-green rounded-full animate-[pulse-green_2s_infinite]"></div>
            <span className="text-[11px] font-semibold text-green uppercase tracking-wider">Activo</span>
          </div>

          <button 
            onClick={() => router.back()}
            className="flex items-center gap-1 bg-white/6 border border-white/10 px-3 py-2 rounded-xl active:scale-95 transition-transform"
          >
            <span className="text-[13px] font-semibold text-gray-400">Volver</span>
            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

        {/* Acciones Rápidas del Header */}
        <nav className="flex justify-center gap-3 px-4 pb-3.5">
          <button 
            onClick={handleEmergencyCall}
            className="flex flex-col items-center gap-1.5 px-4 py-2.5 bg-red-500/10 border border-red-500/30 rounded-2xl active:scale-95 transition-transform flex-1 max-w-[100px]"
          >
            <div className="w-9 h-9 rounded-xl bg-red-500/20 flex items-center justify-center text-red-500">
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <span className="text-[11px] font-semibold text-red-500">Emergencia</span>
          </button>

          <button className="flex flex-col items-center gap-1.5 px-4 py-2.5 bg-cyan/10 border border-cyan/30 rounded-2xl active:scale-95 transition-transform flex-1 max-w-[100px]">
            <div className="w-9 h-9 rounded-xl bg-cyan/20 flex items-center justify-center text-cyan">
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <span className="text-[11px] font-semibold text-cyan">{migrantFirstName}</span>
          </button>

          <button 
            onClick={handleWhatsAppLupita}
            className="flex flex-col items-center gap-1.5 px-4 py-2.5 bg-[#FF6B6B]/10 border border-[#FF6B6B]/30 rounded-2xl active:scale-95 transition-transform flex-1 max-w-[100px]"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FF6B6B]/20 flex items-center justify-center text-[#FF6B6B]">
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <span className="text-[11px] font-semibold text-[#FF6B6B]">{companionName}</span>
          </button>
        </nav>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="main-content">
        
        {/* HERO DE BIENVENIDA */}
        <section className="px-5 pt-5 pb-7 relative overflow-hidden">
          <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] pointer-events-none"
            style={{background: 'radial-gradient(circle, var(--cyan-glow) 0%, transparent 70%)'}}
          />
          <div className="absolute bottom-[-50px] left-[-50px] w-[200px] h-[200px] pointer-events-none"
            style={{background: 'radial-gradient(circle, var(--magenta-glow) 0%, transparent 70%)'}}
          />
          
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-magenta/15 to-purple/15 border border-magenta/30 px-4 py-2 rounded-full mb-4 animate-[fadeInDown_0.6s_ease-out]">
            <svg className="w-5 h-5 text-magenta" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
            </svg>
            <span className="text-[13px] font-semibold text-magenta">Un regalo para ti</span>
          </div>
          
          <div className="relative z-10 animate-[fadeInUp_0.7s_ease-out_0.1s_both]">
            <h1 className="font-['DM_Serif_Display'] text-[30px] leading-tight mb-2">
              Hola, <span className="text-cyan">{familyFirstName}</span>
            </h1>
            <p className="text-[15px] text-white/75 leading-relaxed">
              <span className="text-magenta font-semibold">{migrantFirstName}</span> te entregó un servicio de salud <span className="text-magenta">♥</span>
            </p>
          </div>
        </section>

        {/* TARJETA DE SERVICIO */}
        <section className="mx-5 mb-6 bg-gradient-to-br from-gray-800 to-gray-900 border border-white/8 rounded-3xl p-6 relative overflow-hidden animate-[fadeInUp_0.7s_ease-out_0.2s_both]">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan to-magenta" />
          
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wider text-gray-400 mb-1">Tu servicio</p>
              <h2 className="font-['DM_Serif_Display'] text-[22px] text-cyan">Servicio de Salud Familiar</h2>
            </div>
            <div className="w-12 h-12 bg-cyan/15 rounded-2xl flex items-center justify-center text-cyan">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-1 bg-white/3 rounded-2xl p-3.5 text-center">
              <div className="font-['DM_Serif_Display'] text-[26px] text-cyan mb-0.5">4</div>
              <div className="text-[11px] text-gray-400 leading-tight">Miembros cubiertos</div>
            </div>
            <div className="flex-1 bg-white/3 rounded-2xl p-3.5 text-center">
              <div className="font-['DM_Serif_Display'] text-[26px] text-cyan mb-0.5">24/7</div>
              <div className="text-[11px] text-gray-400 leading-tight">Disponibilidad</div>
            </div>
          </div>
        </section>

        {/* SECCIÓN: TUS BENEFICIOS */}
        <section className="px-5 pb-7">
          <div className="flex items-center gap-3 mb-4 animate-[fadeInUp_0.7s_ease-out_0.3s_both]">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-glow to-cyan/25 flex items-center justify-center text-cyan">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <path d="M22 4L12 14.01l-3-3"/>
              </svg>
            </div>
            <div>
              <h2 className="text-[17px] font-bold">Lo que tienes incluido</h2>
              <p className="text-[12px] text-gray-400">Todo esto es tuyo, sin límites</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {/* Doctor 24/7 */}
            <button 
              onClick={() => router.push('/dashboard/telemedicina')}
              className="bg-gray-800 border border-white/6 rounded-[20px] p-5 flex items-start gap-4 active:scale-[0.98] transition-transform animate-[fadeInUp_0.5s_ease-out_0.35s_both] relative"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan/15 flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <div className="flex-1 text-left pr-6">
                <h3 className="text-[16px] font-bold mb-1 flex items-center gap-2">
                  Doctor 24/7
                  <span className="text-[10px] font-semibold bg-cyan/15 text-cyan px-2 py-0.5 rounded-full">Ilimitado</span>
                </h3>
                <p className="text-[13px] text-gray-400 leading-relaxed">
                  Videollamadas y llamadas con médicos vía WhatsApp. Sin citas, sin esperas. Incluye recetas electrónicas.
                </p>
              </div>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7"/>
              </svg>
            </button>

            {/* Farmacias */}
            <button 
              onClick={() => router.push('/dashboard/farmacia')}
              className="bg-gray-800 border border-white/6 rounded-[20px] p-5 flex items-start gap-4 active:scale-[0.98] transition-transform animate-[fadeInUp_0.5s_ease-out_0.4s_both] relative"
            >
              <div className="w-14 h-14 rounded-2xl bg-green/15 flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
              </div>
              <div className="flex-1 text-left pr-6">
                <h3 className="text-[16px] font-bold mb-1 flex items-center gap-2">
                  Descuentos en Farmacias
                  <span className="text-[10px] font-semibold bg-green/15 text-green px-2 py-0.5 rounded-full">Hasta 75%</span>
                </h3>
                <p className="text-[13px] text-gray-400 leading-relaxed">
                  1,700+ farmacias en todo México. Descuentos en medicinas, productos para el hogar y productos para ti.
                </p>
              </div>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7"/>
              </svg>
            </button>

            {/* Terapia */}
            <button 
              onClick={() => router.push('/dashboard/terapia')}
              className="bg-gray-800 border border-white/6 rounded-[20px] p-5 flex items-start gap-4 active:scale-[0.98] transition-transform animate-[fadeInUp_0.5s_ease-out_0.45s_both] relative"
            >
              <div className="w-14 h-14 rounded-2xl bg-magenta/15 flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-magenta" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <line x1="9" y1="9" x2="9.01" y2="9"/>
                  <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
              </div>
              <div className="flex-1 text-left pr-6">
                <h3 className="text-[16px] font-bold mb-1 flex items-center gap-2">
                  Terapia Psicológica
                  <span className="text-[10px] font-semibold bg-magenta/15 text-magenta px-2 py-0.5 rounded-full">Semanal</span>
                </h3>
                <p className="text-[13px] text-gray-400 leading-relaxed">
                  Psicólogos certificados. Cuida tu mente o la de quien más lo necesite en tu familia.
                </p>
              </div>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </section>

        {/* MISIÓN */}
        <div className="mx-5 mb-6 bg-gradient-to-br from-purple/10 to-cyan/10 border border-purple/20 rounded-3xl p-6 animate-[fadeInUp_0.7s_ease-out_0.5s_both]">
          <div className="w-12 h-12 rounded-2xl bg-purple/20 flex items-center justify-center text-purple mb-4">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <p className="text-[14px] text-white/90 leading-relaxed">
            En <strong>SaludCompartida</strong> tenemos la misión de ayudarte a través de distintos servicios de salud para que <strong>reduzcas los gastos de dinero</strong> que haces en doctores y medicinas. Queremos que tu familia esté sana sin que te preocupes por el dinero.
          </p>
        </div>

        {/* SECCIÓN DE COMPAÑÍA */}
        <div className="bg-gradient-to-br from-[#FF6B6B]/10 via-magenta/10 to-purple/10 border-t border-b border-magenta/20 py-8 mb-6 animate-[fadeInUp_0.7s_ease-out_0.6s_both]">
          <div className="px-5">
            <div className="inline-flex items-center gap-2 bg-magenta/15 border border-magenta/30 px-4 py-2 rounded-full mb-4">
              <svg className="w-5 h-5 text-magenta" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span className="text-[13px] font-semibold text-magenta">Servicio especial</span>
            </div>

            <h2 className="font-['DM_Serif_Display'] text-[32px] leading-tight mb-4">Nunca más sola</h2>
            
            <p className="text-[15px] text-white/90 leading-relaxed mb-6">
              Sabemos lo que se siente la <strong>soledad</strong>. Por eso creamos algo especial para ti y tu familia. <strong>Lupita y Fernanda</strong> están aquí para acompañarte, platicar contigo y hacer la vida más liviana.
            </p>

            {/* Mensaje de Lupita */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-6">
              <p className="text-[14px] text-white/90 leading-relaxed mb-4">
                Hola, soy <strong className="text-[#FF6B6B]">Lupita</strong>. Vamos a hablar de cosas entretenidas, de recetas, de historias bonitas... lo que tú quieras. Estoy aquí para que la vida sea más <span className="text-cyan font-semibold">liviana</span>.
              </p>
              
              <p className="text-[14px] text-white/90 font-semibold mb-3">¿Cómo platicamos? Es muy fácil:</p>
              
              <div className="space-y-3 mb-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-magenta flex items-center justify-center text-white font-bold text-[14px] flex-shrink-0">1</div>
                  <p className="text-[13px] text-white/90 pt-1.5">Envíame un <strong>mensaje por WhatsApp</strong> desde el mismo número que registraste (así te reconozco)</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-magenta flex items-center justify-center text-white font-bold text-[14px] flex-shrink-0">2</div>
                  <p className="text-[13px] text-white/90 pt-1.5">Dime a qué hora tienes disponible para platicar</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-magenta flex items-center justify-center text-white font-bold text-[14px] flex-shrink-0">3</div>
                  <p className="text-[13px] text-white/90 pt-1.5"><strong>Yo te llamo por teléfono</strong> a la hora que me digas</p>
                </div>
              </div>
              
              <p className="text-[14px] text-white/90 leading-relaxed">
                <span className="text-cyan font-semibold">¡Así no gastas ni un peso!</span> Nosotros pagamos la llamada para que puedas platicar todo el tiempo que quieras sin preocuparte.
                <br/><br/>
                <span className="text-cyan font-semibold">¡Cuenta conmigo siempre!</span>
              </p>
            </div>

            <button 
              onClick={handleWhatsAppLupita}
              className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-[#25D366]/30 active:scale-[0.98]"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Escribir a {companionName} por WhatsApp
            </button>
            
            <p className="text-[13px] text-center text-gray-400 mt-3">
              <strong>Tú escribes, nosotros llamamos.</strong> Así no gastas en la llamada.
            </p>
          </div>
        </div>

        {/* CONTACTO */}
        <section className="px-5 pb-8 animate-[fadeInUp_0.7s_ease-out_0.85s_both]">
          <h3 className="font-['DM_Serif_Display'] text-[22px] text-center mb-1.5">¿Necesitas ayuda?</h3>
          <p className="text-[14px] text-gray-400 text-center mb-5">Estamos aquí para ti</p>

          <div className="flex flex-col gap-3">
            <a 
              href="mailto:contact@saludcompartida.com" 
              className="flex items-center gap-4 px-5 py-4.5 bg-gray-800 border border-white/6 rounded-2xl active:scale-[0.98] active:bg-gray-700 transition-all"
            >
              <div className="w-12 h-12 bg-cyan/15 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[12px] text-gray-400">Correo electrónico</span>
                <span className="text-[14px] font-semibold text-white">contact@saludcompartida.com</span>
              </div>
            </a>

            <a 
              href="https://wa.me/15558420346?text=Hola,%20necesito%20ayuda%20con%20mi%20servicio%20de%20SaludCompartida" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-5 py-4.5 bg-gray-800 border border-white/6 rounded-2xl active:scale-[0.98] active:bg-gray-700 transition-all"
            >
              <div className="w-12 h-12 bg-[#25D366]/15 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[12px] text-gray-400">WhatsApp</span>
                <span className="text-[14px] font-semibold text-white">Escríbenos aquí</span>
              </div>
            </a>
          </div>
        </section>

      </main>

      {/* NAVEGACIÓN INFERIOR */}
      <nav className="bottom-nav">
        <div className="flex flex-col items-center gap-1 px-3.5 py-2 rounded-xl bg-cyan/10">
          <svg className="w-5.5 h-5.5 text-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
          <span className="text-[10px] font-semibold text-cyan">Inicio</span>
        </div>
        
        <button 
          onClick={() => router.push('/dashboard/servicios')}
          className="flex flex-col items-center gap-1 px-3.5 py-2 rounded-xl"
        >
          <svg className="w-5.5 h-5.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
          <span className="text-[10px] font-semibold text-gray-400">Salud</span>
        </button>
        
        <button 
          onClick={() => router.push('/dashboard/ahorros')}
          className="flex flex-col items-center gap-1 px-3.5 py-2 rounded-xl"
        >
          <svg className="w-5.5 h-5.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          <span className="text-[10px] font-semibold text-gray-400">Ahorros</span>
        </button>
        
        <button 
          onClick={() => router.push('/dashboard/cuenta')}
          className="flex flex-col items-center gap-1 px-3.5 py-2 rounded-xl"
        >
          <svg className="w-5.5 h-5.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span className="text-[10px] font-semibold text-gray-400">Mi Cuenta</span>
        </button>
      </nav>
    </>
  );
}
