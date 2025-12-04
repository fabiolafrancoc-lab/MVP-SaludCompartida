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
    { text: "¿Qué me recomienda pa' bajarle al mal del puerco?", color: "#FCBAD3" },
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <TopNav showMenu={true} hideUser={true} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="relative bg-gradient-to-r from-cyan-600 to-teal-500 rounded-3xl overflow-hidden shadow-2xl mb-12 border border-cyan-500/30">
          <div className="relative z-10 px-12 py-16 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-500 rounded-full p-3 animate-pulse shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-black text-white bg-green-500 px-6 py-2 rounded-full shadow-lg">
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

            <button
              onClick={() => navigate('/registro')}
              className="group bg-green-500 hover:bg-green-600 text-white px-10 py-6 rounded-2xl text-2xl font-bold shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-105 flex items-center gap-4"
            >
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Llama Ahora</span>
            </button>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-4xl font-black text-center text-white mb-8">
            Habla como siempre lo haces
          </h2>
          <div className="text-center min-h-[120px] flex items-center justify-center">
            <p 
              className="text-4xl md:text-5xl font-black italic animate-fade-in px-4"
              style={{ color: phrases[currentPhrase].color }}
            >
              "{phrases[currentPhrase].text}"
            </p>
          </div>
          <p className="text-gray-300 text-center mt-6 text-xl font-semibold">
            Nuestros doctores entienden tu forma de hablar y están listos para ayudarte.
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-12 mb-12 border border-gray-700">
          <h2 className="text-3xl font-black text-center text-white mb-10">
            ¿Cómo funciona?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-700/50 rounded-xl p-8 text-center border border-cyan-500/30 hover:border-cyan-400 transition-all">
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

            <div className="bg-gray-700/50 rounded-xl p-8 text-center border border-purple-500/30 hover:border-purple-400 transition-all">
              <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50">
                <span className="text-3xl font-black text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Describe tu Situación
              </h3>
              <p className="text-gray-300 text-base">
                Cuéntale al doctor lo que sientes, como siempre lo haces
              </p>
            </div>

            <div className="bg-gray-700/50 rounded-xl p-8 text-center border border-green-500/30 hover:border-green-400 transition-all">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/50">
                <span className="text-3xl font-black text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Recibe Orientación
              </h3>
              <p className="text-gray-300 text-base">
                El doctor te orientará y te dirá qué hacer
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/registro')}
            className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105 inline-block"
          >
            Contratar Ahora
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
