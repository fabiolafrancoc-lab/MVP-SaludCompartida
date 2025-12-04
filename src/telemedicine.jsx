import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import TopNav from './components/TopNav';
import Footer from './components/Footer';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <TopNav showMenu={true} hideUser={true} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-cyan-600 to-teal-500 rounded-3xl overflow-hidden shadow-2xl mb-12 border border-cyan-500/30">
          <div className="relative z-10 px-8 py-16 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white rounded-full p-3 animate-pulse shadow-lg">
                <Clock className="w-8 h-8 text-cyan-600" />
              </div>
              <span className="text-2xl font-bold bg-white text-gray-900 px-6 py-2 rounded-full shadow-lg">
                DISPONIBLE 24/7
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Doctor a tu alcance
              <br />
              <span className="text-yellow-300">cuando más lo necesitas</span>
            </h1>

            <p className="text-xl text-white/90 mb-8 max-w-2xl">
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
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-12 border border-gray-700">
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Habla como siempre lo haces
          </h2>
          <div className="text-center min-h-[80px] flex items-center justify-center">
            <p 
              className="text-xl md:text-2xl font-bold italic animate-fade-in px-4"
              style={{ color: phrases[currentPhrase].color }}
            >
              "{phrases[currentPhrase].text}"
            </p>
          </div>
          <p className="text-gray-300 text-center mt-4 text-base">
            Nuestros doctores entienden tu forma de hablar y están listos para ayudarte.
          </p>
        </div>

        {/* Cómo Funciona */}
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-12 border border-gray-700">
          <h2 className="text-3xl font-black text-center text-white mb-10">
            ¿Cómo funciona?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-700/50 rounded-xl p-6 text-center border border-cyan-500/30 hover:border-cyan-400 transition-all">
              <div className="bg-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/50">
                <span className="text-3xl font-black text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Da clic en "Llama Ahora"
              </h3>
              <p className="text-gray-300 text-base">
                Te conectarás directamente con un doctor por WhatsApp
              </p>
            </div>

            <div className="bg-gray-700/50 rounded-xl p-6 text-center border border-purple-500/30 hover:border-purple-400 transition-all">
              <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50">
                <span className="text-3xl font-black text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Describe tu problema
              </h3>
              <p className="text-gray-300 text-base">
                Habla como siempre lo haces, sin tecnicismos
              </p>
            </div>

            <div className="bg-gray-700/50 rounded-xl p-6 text-center border border-orange-500/30 hover:border-orange-400 transition-all">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/50">
                <span className="text-3xl font-black text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Recibe tu diagnóstico
              </h3>
              <p className="text-gray-300 text-base">
                El doctor te guiará y te dará las indicaciones
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

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
