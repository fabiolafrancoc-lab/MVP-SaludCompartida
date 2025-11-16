import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { WhatsAppButtonCyan, WhatsAppIconCyan } from './components/WhatsAppIcons';

export default function Telemedicine() {
  const navigate = useNavigate();
  const [currentPhrase, setCurrentPhrase] = useState(0);

  const phrases = [
    { text: "El chamaco trae la panza suelta", color: "#FF6B6B" },
    { text: "Mi escuincle anda con la calentura bien alta", color: "#4ECDC4" },
    { text: "La criatura no quiere comer ni jugar, está apachurrada", color: "#FFD93D" },
    { text: "Le salió una roncha bien rara al chamaquito", color: "#95E1D3" },
    { text: "Se me enchiló el nene, ¿qué le doy para la picazón?", color: "#F38181" },
    { text: "Doctor, anoche me eché unas copitas y ahora traigo la cruda del siglo", color: "#AA96DA" },
    { text: "¿Qué me recomienda pa' bajarme el mal del puerco?", color: "#FCBAD3" },
    { text: "Me anda cargando el payaso, doctor", color: "#A8D8EA" },
    { text: "Siento que ya me llevó el tren", color: "#FFB6B9" },
    { text: "Ando tumbado, me dio bajón", color: "#FEC8D8" },
    { text: "Traigo un moco pegado", color: "#957DAD" },
    { text: "La cabeza me late como tambora", color: "#FFE66D" },
    { text: "Tengo el cuerpo cortado, como si me hubieran dado una arrastrada", color: "#6BCB77" },
    { text: "Se me aflojó el estómago", color: "#FF6B9D" },
    { text: "Tengo la garganta hecha trizas", color: "#C9ADA7" },
    { text: "Mi mujer dice que ya estoy 'llorón', pero sí me siento mal", color: "#FFA5A5" },
    { text: "¿Qué le doy a mi suegra, que también anda echando grilla?", color: "#9CAFB7" },
    { text: "Me anda dando el patatús", color: "#E7B2A5" },
    { text: "No me hallo", color: "#AAC4FF" },
    { text: "Tengo el cuerpo cortado", color: "#D4A5A5" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [phrases.length]);

  const handleWhatsAppCall = () => {
    // Obtener nombre del usuario desde localStorage
    let firstName = '';
    try {
      const currentUserData = localStorage.getItem('currentUser');
      if (currentUserData) {
        const userData = JSON.parse(currentUserData);
        firstName = userData?.firstName || '';
      } else {
        const accessUserData = localStorage.getItem('accessUser');
        if (accessUserData) {
          const userData = JSON.parse(accessUserData);
          firstName = userData?.firstName || '';
        }
      }
    } catch (e) {
      firstName = '';
    }
    
    const greeting = firstName ? `Hola, soy ${firstName}` : 'Hola';
    const whatsappMessage = encodeURIComponent(
      `${greeting}! 🌟\n\nEstoy interesado en los servicios de Telemedicina. Por favor selecciona la opción que necesitas:\n\n` +
      `1️⃣ Quiero utilizar Telemedicina 24/7\n` +
      `2️⃣ Quiero agendar mi cita con mi Terapeuta\n` +
      `3️⃣ Tengo consultas sobre mis Ahorros\n` +
      `4️⃣ Otras Consultas\n\n` +
      `Deja tu mensaje de voz y te devolveremos la llamada en máximo 15 minutos. ⏱️\n\n` +
      `📞 Horario: Lunes a Viernes, 9:00 AM - 5:00 PM`
    );
    window.open(`https://wa.me/5529984922702?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      {/* Header with Volver button */}
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
              navigate('/page4');
            }}
            className="text-gray-600 hover:text-gray-900 font-medium text-lg"
          >
            Volver
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section con Video Background */}
        <div className="relative bg-gradient-to-r from-teal-600 to-teal-500 rounded-3xl overflow-hidden shadow-2xl mb-8">
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source src="https://p0iccshbkx3s8qpk.public.blob.vercel-storage.com/doctorvideo.mov" type="video/mp4" />
          </video>

          <div className="relative z-10 px-8 py-12 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-400 rounded-full p-2 animate-pulse">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-green-400 text-green-900 px-4 py-1 rounded-full">
                Disponible 24/7
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Doctor a tu alcance
              <br />
              <span className="text-yellow-300">cuando más lo necesitas</span>
            </h1>

            <p className="text-xl text-teal-50 mb-6 max-w-2xl">
              Habla con un doctor ahora mismo por teléfono o WhatsApp.
              Sin citas, sin esperas, sin complicaciones.
            </p>

            {/* CTA Principal */}
            <button
              onClick={handleWhatsAppCall}
              className="group bg-green-500 hover:bg-green-600 text-white px-10 py-6 rounded-2xl text-2xl font-bold shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-105 flex items-center gap-4"
            >
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Llama Ahora</span>
            </button>
          </div>
        </div>

        {/* Sección de Empatía con Frases Rotativas */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-2 border-orange-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Te entendemos cuando te sientes mal
            </h2>
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 min-h-[100px] flex items-center justify-center">
              <p 
                key={currentPhrase}
                className="text-2xl md:text-3xl font-bold italic animate-fade-in transition-colors duration-500"
                style={{ color: phrases[currentPhrase].color }}
              >
                "{phrases[currentPhrase].text}"
              </p>
            </div>
            <p className="text-gray-600 mt-4 text-lg">
              Nuestros doctores hablan tu idioma y entienden tu cultura. 
              <br />
              <span className="font-semibold text-teal-600">Sin pena, sin barreras.</span>
            </p>
          </div>
        </div>

        {/* Video Destacado Expandido */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8">
          {/* Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover min-h-[400px]"
          >
            <source src="https://p0iccshbkx3s8qpk.public.blob.vercel-storage.com/patient.mov" type="video/mp4" />
          </video>

          {/* Solo gradient oscuro abajo para legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

          <div className="absolute bottom-0 left-0 right-0 px-8 py-12 text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Consulta desde casa
            </h2>
            <p className="text-xl text-white/90">
              Tu salud, tu espacio, tu tranquilidad
            </p>
          </div>
        </div>

        {/* Cómo Funciona */}
        <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            ¿Cómo funciona?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-teal-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Presiona "Llama Ahora"
              </h3>
              <p className="text-gray-600">
                Un solo click te conecta con WhatsApp
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Describe tu problema
              </h3>
              <p className="text-gray-600">
                Habla como siempre lo haces, sin tecnicismos
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Recibe tu diagnóstico
              </h3>
              <p className="text-gray-600">
                El doctor te guiará y te dará las indicaciones
              </p>
            </div>
          </div>
        </div>

        {/* CTA Final Grande */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl shadow-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            ¿Listo para sentirte mejor?
          </h2>
          <p className="text-2xl text-green-50 mb-8">
            Un doctor está esperando tu llamada ahora mismo
          </p>
          <button
            onClick={handleWhatsAppCall}
            className="group bg-white text-cyan-600 px-12 py-6 rounded-2xl text-2xl font-bold shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105 inline-flex items-center gap-4"
          >
            <WhatsAppIconCyan className="w-10 h-10" />
            <span>Llama Ahora por WhatsApp</span>
          </button>

          <div className="mt-6">
            <p className="text-white/90 text-base mb-3">
              ¿Recibiste una receta médica? Ahorra hasta <span className="font-bold text-yellow-300">75%</span>
            </p>
            <button
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/pharmacy');
              }}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg font-semibold text-base transition-all"
            >
              Ver Farmacias con Descuento
            </button>
          </div>
        </div>

        {/* Consultas Button */}
        <div className="mt-12 flex justify-center pb-8">
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate('/contact');
            }}
            className="group flex items-center gap-3 px-8 py-4 bg-white hover:bg-gray-50 text-cyan-600 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ¿Tienes Consultas?
          </button>
        </div>
      </main>



      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}