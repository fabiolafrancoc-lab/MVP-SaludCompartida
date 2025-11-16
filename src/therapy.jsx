import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from './components/TopNav';
import { sendAppointmentConfirmation } from './lib/notifications';

// Páginas de Tips para cada beneficio
const AnxietyTips = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <img 
            src="/saludcompartida logo WT.png" 
            alt="SaludCompartida" 
            className="h-16"
          />
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 font-medium text-lg"
          >
            Volver
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Cómo reducir tu ansiedad
          </h1>

          <div className="bg-gradient-to-r from-cyan-100 to-purple-100 rounded-xl p-6 mb-8">
            <p className="text-lg text-gray-800 italic text-center font-semibold">
              "La ansiedad no te hace débil. Reconocerla y enfrentarla te hace valiente."
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-cyan-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">1. Respira profundo cuando sientas el pecho apretado</h3>
              <p className="text-gray-700 mb-3">
                Inhala contando hasta 4, aguanta 4 segundos, y exhala contando hasta 6. Repite 5 veces.
              </p>
              <p className="text-cyan-800 font-semibold">
                Tu cuerpo escucha lo que tu respiración le dice. Cuando respiras despacio, le dices que todo está bien.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">2. Escribe lo que te preocupa</h3>
              <p className="text-gray-700 mb-3">
                Anota en tu celular o en papel: "¿Qué es lo peor que puede pasar?" y "¿Qué puedo controlar?"
              </p>
              <p className="text-purple-800 font-semibold">
                Sacar los pensamientos de tu cabeza les quita poder. No estás solo con tus preocupaciones.
              </p>
            </div>

            <div className="bg-pink-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">3. Mueve tu cuerpo 10 minutos al día</h3>
              <p className="text-gray-700 mb-3">
                Camina, baila, estira. No tiene que ser ejercicio intenso. Solo muévete.
              </p>
              <p className="text-pink-800 font-semibold">
                El movimiento le dice a tu cerebro: "Estoy vivo, estoy fuerte, puedo con esto."
              </p>
            </div>

            <div className="bg-cyan-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">4. Limita el café y las noticias</h3>
              <p className="text-gray-700 mb-3">
                Si ya estás ansioso, la cafeína y las malas noticias lo empeoran. Toma agua, escucha música.
              </p>
              <p className="text-cyan-800 font-semibold">
                No tienes que estar informado 24/7. Tu paz mental vale más que saber todo lo que pasa.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">5. Habla con alguien de confianza</h3>
              <p className="text-gray-700 mb-3">
                Un amigo, un familiar, o tu terapeuta. No guardes todo para ti.
              </p>
              <p className="text-purple-800 font-semibold">
                Pedir ayuda no es ser carga para otros. Es ser humano. Todos necesitamos apoyo.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6">
            <p className="text-gray-700 text-center font-semibold text-lg">
              Recuerda: La ansiedad miente. Te dice que todo está mal cuando no es cierto. 
              <br />
              <span className="text-purple-800">Eres más fuerte de lo que tu ansiedad te hace creer.</span>
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-lg"
          >
            Volver a Terapia
          </button>
        </div>


      </div>
    </div>
  );
};

const RelationshipTips = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <img 
            src="/saludcompartida logo WT.png" 
            alt="SaludCompartida" 
            className="h-16"
          />
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Volver
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Cómo mejorar tus relaciones
          </h1>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-8">
            <p className="text-lg text-gray-800 italic text-center font-semibold">
              "Las buenas relaciones no son perfectas. Son honestas, pacientes y llenas de perdón."
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">1. Escucha de verdad, no solo para responder</h3>
              <p className="text-gray-700 mb-3">
                Cuando alguien te habla, guarda el celular. Míralo a los ojos. Déjalo terminar antes de hablar.
              </p>
              <p className="text-purple-800 font-semibold">
                Escuchar es el regalo más grande que puedes darle a alguien. Le dices: "Tu voz importa."
              </p>
            </div>

            <div className="bg-pink-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">2. Di lo que sientes sin atacar</h3>
              <p className="text-gray-700 mb-3">
                En vez de "Nunca me ayudas", di "Me siento solo cuando tengo que hacer todo yo."
              </p>
              <p className="text-pink-800 font-semibold">
                Tus sentimientos son válidos. Expresarlos con respeto abre puertas, no las cierra.
              </p>
            </div>

            <div className="bg-cyan-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">3. Perdona, pero también pon límites</h3>
              <p className="text-gray-700 mb-3">
                Perdonar no significa aceptar cualquier cosa. Puedes perdonar y al mismo tiempo decir "esto no está bien."
              </p>
              <p className="text-cyan-800 font-semibold">
                Poner límites no es egoísta. Es cuidarte para poder cuidar a otros de manera sana.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">4. Celebra lo bueno, no solo señales lo malo</h3>
              <p className="text-gray-700 mb-3">
                Cuando tu pareja, hijo o amigo haga algo bien, díselo. "Me gustó que...", "Gracias por..."
              </p>
              <p className="text-purple-800 font-semibold">
                Las relaciones crecen con lo que alimentas. Alimenta lo bueno, y lo bueno crecerá.
              </p>
            </div>

            <div className="bg-pink-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">5. Pide lo que necesitas claramente</h3>
              <p className="text-gray-700 mb-3">
                No esperes que adivinen. Di: "Necesito que me escuches 10 minutos sin darme consejos."
              </p>
              <p className="text-pink-800 font-semibold">
                Nadie puede leer tu mente. Pedir no es exigir, es confiar en que te pueden apoyar.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6">
            <p className="text-gray-700 text-center font-semibold text-lg">
              Recuerda: Todas las relaciones pasan por momentos difíciles. 
              <br />
              <span className="text-purple-800">Lo que importa es cómo las enfrentan juntos.</span>
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg"
          >
            Volver a Terapia
          </button>
        </div>


      </div>
    </div>
  );
};

const StressTips = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <img 
            src="/saludcompartida logo WT.png" 
            alt="SaludCompartida" 
            className="h-16"
          />
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Volver
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Cómo manejar tu estrés
          </h1>

          <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-6 mb-8">
            <p className="text-lg text-gray-800 italic text-center font-semibold">
              "El estrés no viene de lo que haces, sino de sentir que no tienes control. Toma el control donde puedas."
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-pink-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">1. Haz listas simples y tacha lo que terminas</h3>
              <p className="text-gray-700 mb-3">
                Escribe 3 cosas que TIENES que hacer hoy. Solo 3. Cuando las termines, tacha y celebra.
              </p>
              <p className="text-pink-800 font-semibold">
                Ver lo que SÍ lograste te da poder. No te enfoques en lo que falta, reconoce lo que hiciste.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">2. Di "no" sin culpa cuando sea necesario</h3>
              <p className="text-gray-700 mb-3">
                No puedes con todo. "No puedo ahorita" o "déjame pensarlo" son respuestas válidas.
              </p>
              <p className="text-purple-800 font-semibold">
                Decir "no" a otros es decir "sí" a tu salud. No eres egoísta, eres inteligente.
              </p>
            </div>

            <div className="bg-cyan-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">3. Duerme aunque creas que no hay tiempo</h3>
              <p className="text-gray-700 mb-3">
                Apaga el celular 30 minutos antes de dormir. Tu cerebro necesita descanso para funcionar.
              </p>
              <p className="text-cyan-800 font-semibold">
                Sin descanso, todo es más difícil. Dormir no es flojera, es recargarte para seguir adelante.
              </p>
            </div>

            <div className="bg-pink-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">4. Toma pausas de 5 minutos cada hora</h3>
              <p className="text-gray-700 mb-3">
                Párate, estira, respira. No tienes que trabajar sin parar para ser productivo.
              </p>
              <p className="text-pink-800 font-semibold">
                Las pausas no te hacen lento. Te hacen eficiente. Tu mente necesita respirar también.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-xl">5. Suelta lo que no puedes controlar</h3>
              <p className="text-gray-700 mb-3">
                Pregúntate: "¿Esto depende de mí?" Si no, déjalo ir. Enfócate en lo que SÍ puedes cambiar.
              </p>
              <p className="text-purple-800 font-semibold">
                Cargar con preocupaciones que no puedes resolver solo te agota. Suelta lo que no es tuyo.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-6">
            <p className="text-gray-700 text-center font-semibold text-lg">
              Recuerda: El estrés es parte de la vida, pero no tiene que consumirte. 
              <br />
              <span className="text-pink-800">Pequeños cambios diarios hacen una gran diferencia.</span>
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg"
          >
            Volver a Terapia
          </button>
        </div>


      </div>
    </div>
  );
};

export default function Therapy() {
  const navigate = useNavigate();
  
  // Get user data from localStorage
  let storedUserData = null;
  try {
    // Primero intentar con currentUser (nuevo sistema)
    const currentUserStored = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null;
    const accessUserStored = typeof window !== 'undefined' ? localStorage.getItem('accessUser') : null;
    
    if (currentUserStored) {
      storedUserData = JSON.parse(currentUserStored);
    } else if (accessUserStored) {
      storedUserData = JSON.parse(accessUserStored);
    }
  } catch (e) {
    storedUserData = null;
  }
  
  // Estados para login de usuarios recurrentes
  // Si ya hay un usuario logueado (currentUser), NO mostrar modal
  const [showLoginModal, setShowLoginModal] = useState(!storedUserData);
  const [loginPhone, setLoginPhone] = useState('');
  const [isReturningUser, setIsReturningUser] = useState(!!storedUserData);
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentView, setCurrentView] = useState('main');
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [sessionFor, setSessionFor] = useState(''); // 'myself' o 'other'
  const [formData, setFormData] = useState({
    nombre: storedUserData?.firstName || '',
    apellidoPaterno: storedUserData?.lastName || '',
    telefono: storedUserData?.phone || '',
    email: storedUserData?.email || '',
    concerns: ''
  });
  const [otherPersonData, setOtherPersonData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    telefono: '',
    relationship: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [otherPersonErrors, setOtherPersonErrors] = useState({});
  const [dateTimeErrors, setDateTimeErrors] = useState({ date: false, time: false });
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRescheduleQuestion, setShowRescheduleQuestion] = useState(false);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
  const [isRescheduling, setIsRescheduling] = useState(false);

  // Update form data when localStorage changes (e.g., from account update)
  // Cargar datos al montar el componente
  useEffect(() => {
    try {
      let userData = null;
      const currentUserStored = localStorage.getItem('currentUser');
      if (currentUserStored) {
        userData = JSON.parse(currentUserStored);
      } else {
        const accessUserStored = localStorage.getItem('accessUser');
        if (accessUserStored) {
          userData = JSON.parse(accessUserStored);
        }
      }
      
      if (userData) {
        setFormData(prev => ({
          ...prev,
          nombre: userData?.firstName || prev.nombre,
          apellidoPaterno: userData?.lastName || prev.apellidoPaterno,
          telefono: userData?.phone || prev.telefono,
          email: userData?.email || prev.email
        }));
        setIsReturningUser(true);
      }
    } catch (e) {
      console.error('Error loading user data:', e);
    }
  }, []); // Solo al montar

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        // Primero intentar con currentUser (nuevo sistema)
        let userData = null;
        const currentUserStored = localStorage.getItem('currentUser');
        if (currentUserStored) {
          userData = JSON.parse(currentUserStored);
        } else {
          const accessUserStored = localStorage.getItem('accessUser');
          if (accessUserStored) {
            userData = JSON.parse(accessUserStored);
          }
        }
        
        if (userData) {
          setFormData(prev => ({
            ...prev,
            nombre: userData?.firstName || prev.nombre,
            apellidoPaterno: userData?.lastName || prev.apellidoPaterno,
            telefono: userData?.phone || prev.telefono,
            email: userData?.email || prev.email
          }));
        }
      } catch (e) {
        console.error('Error updating form data from storage:', e);
      }
    };

    // Listen for storage changes
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // 50 Testimoniales rotativos - Solo nombre y edad
  const testimonials = [
    { text: "Ir a terapia no es de ricos, es de quien quiere dejar de sufrir en silencio.", author: "Juan, 34 años" },
    { text: "Hablar con alguien no te hace débil, te da las fuerzas para soportar lo que otros no ven.", author: "Rosa, 41 años" },
    { text: "No estás solo, muchos callamos por miedo, pero juntos podemos buscar algo mejor.", author: "Miguel, 28 años" },
    { text: "Dicen que así es la vida, pero yo aprendí que merezco algo diferente y pedir ayuda es el primer paso.", author: "Carmen, 36 años" },
    { text: "Si nadie te escucha en casa, busca quien sí lo haga afuera; tu dolor merece atención, no silencio.", author: "José, 43 años" },
    { text: "La vergüenza no es tuya, es de quienes te lastiman; tú sí mereces sanar.", author: "María, 32 años" },
    { text: "Aguantar no es lo mismo que vivir; pedir ayuda me enseñó eso.", author: "Pedro, 39 años" },
    { text: "Basta de decir 'así me tocó'; también se vale buscar estar bien.", author: "Guadalupe, 45 años" },
    { text: "Es mentira que pedir ayuda sea para gente loca; es para los que ya no quieren sufrir solos.", author: "Carlos, 37 años" },
    { text: "A mí también me dolía el alma y pensé que no tenía arreglo, pero sí lo tiene.", author: "Ana, 29 años" },
    { text: "Pedir ayuda no es traicionar a tu familia, es cuidarte para poder cuidarlos.", author: "Luis, 40 años" },
    { text: "Aunque nos digan 'no llores', llorar fue el principio de mi libertad.", author: "Patricia, 33 años" },
    { text: "No se trata de tener dinero, se trata de tener ganas de vivir mejor.", author: "Francisco, 44 años" },
    { text: "Mi mamá me decía 'no cuentes tus cosas', pero cuando hablé, sentí que el mundo pesaba menos.", author: "Teresa, 38 años" },
    { text: "La violencia no es normal, aunque todos te digan que sí; buscar ayuda me mostró otra vida.", author: "Ramón, 42 años" },
    { text: "Callar también te enferma; hablar fue mi medicina.", author: "Elena, 35 años" },
    { text: "No vine a este mundo a aguantar golpes ni palabras feas; merezco vivir en paz.", author: "Jesús, 31 años" },
    { text: "Antes pensaba que era mi culpa todo... ahora sé que nadie merece maltrato.", author: "Margarita, 46 años" },
    { text: "Si crees que solo a ti te pasa, hay miles como tú... y también salieron adelante.", author: "Antonio, 36 años" },
    { text: "Tener miedo no es lo mismo que estar solo; aquí hay gente que quiere ayudarte.", author: "Silvia, 30 años" },
    { text: "No importa si eres hombre o mujer, todos sentimos y todos merecemos ayuda.", author: "Roberto, 41 años" },
    { text: "El primer paso fue atreverme a preguntar, el segundo fue descubrir que sí podía salir adelante.", author: "Leticia, 34 años" },
    { text: "No necesitas saberlo todo ni tener respuestas; solo necesitas dar el primer paso para sanar.", author: "Javier, 39 años" },
    { text: "Aunque no tengas mucho, mereces vivir bien; la salud mental es para todos.", author: "Cristina, 37 años" },
    { text: "Lo que viviste no te define, pedir ayuda sí puede cambiar tu historia.", author: "Fernando, 43 años" },
    { text: "Ir al terapeuta no es de locos, es de valientes que decidieron estar en paz.", author: "Isabel, 32 años" },
    { text: "Los hombres también lloran... y sanar también es cosa de hombres.", author: "Raúl, 38 años" },
    { text: "Antes me guardaba todo; ahora hablo y duermo tranquilo.", author: "Luz, 35 años" },
    { text: "Pensé que pedir ayuda era debilidad, pero fue mi mejor decisión.", author: "Manuel, 40 años" },
    { text: "Ir al terapeuta no me cambió la vida... me la devolvió.", author: "Gloria, 42 años" },
    { text: "Aprendí que sentir no es ser débil, es ser humano.", author: "Alejandro, 33 años" },
    { text: "Mi papá nunca habló de sus emociones; yo sí, y ahora soy un mejor padre.", author: "Ricardo, 44 años" },
    { text: "Dejar de fingir que todo está bien también es cuidarte.", author: "Esperanza, 31 años" },
    { text: "No estás loco, estás cansado de cargar solo.", author: "Héctor, 36 años" },
    { text: "Pedir ayuda no te quita lo fuerte, te quita lo triste.", author: "Concepción, 39 años" },
    { text: "Mi mente también merece un chequeo, como mi cuerpo.", author: "Sergio, 41 años" },
    { text: "Antes les huía a mis pensamientos, ahora los entiendo.", author: "Yolanda, 34 años" },
    { text: "Ir a terapia no me hizo débil, me hizo libre.", author: "Arturo, 37 años" },
    { text: "Mi salud mental también es parte de mi bienestar.", author: "Angélica, 30 años" },
    { text: "No necesitas tocar fondo para buscar ayuda, basta con querer estar mejor.", author: "Enrique, 45 años" },
    { text: "Si hablar sana, ¿por qué seguir callando?", author: "Beatriz, 33 años" },
    { text: "En mi barrio decían que la terapia era para ricos; hoy sé que es para quien se quiere.", author: "Martín, 38 años" },
    { text: "La gente dice que el tiempo cura... pero hablar acelera el proceso.", author: "Dolores, 42 años" },
    { text: "Romper el silencio fue mi primer paso hacia la paz.", author: "Oscar, 35 años" },
    { text: "Mis cuates decían 'aguántate', ahora dicen que onda güey eres otro.", author: "Rodrigo, 29 años" },
    { text: "No es que esté loco, es que estoy aprendiendo a estar bien.", author: "Mónica, 36 años" },
    { text: "Hablar con un terapeuta no me quitó los problemas, me dio herramientas.", author: "Gabriel, 40 años" },
    { text: "Si cuidamos el cuerpo, también hay que cuidar la mente.", author: "Norma, 43 años" },
    { text: "Antes me daba pena decir que iba a terapia, hoy hasta la recomiendo.", author: "Julio, 37 años" },
    { text: "No se trata de ser fuerte todo el tiempo, se trata de estar bien contigo.", author: "Verónica, 32 años" }
  ];

  // Cambiar testimonial cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prevIndex) => 
        (prevIndex + 1) % testimonials.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Psicólogos
  const psychologists = [
    {
      name: "Psic. Antonio Márquez",
      image: "/psycho1.jpeg",
      specialties: ["Ansiedad", "Depresión", "Duelo"],
      experience: 15,
      bio: "Especialista en procesos migratorios y adaptación cultural. Ayudo a familias a mantener lazos fuertes a pesar de la distancia."
    },
    {
      name: "Psic. María Jesús García",
      image: "/psycho2.jpeg",
      specialties: ["Familia", "Relaciones", "Estrés"],
      experience: 6,
      bio: "Trabajo con parejas y familias para mejorar su comunicación. Creo firmemente que las relaciones sanas se construyen con esfuerzo diario."
    },
    {
      name: "Psic. Laura Rodríguez",
      image: "/psycho3.jpeg",
      specialties: ["Ansiedad", "Trauma", "Autoestima"],
      experience: 7,
      bio: "Me enfoco en ayudar a personas que cargan con culpa y ansiedad. Juntos encontramos la paz mental que mereces tener."
    },
    {
      name: "Psic. Carmen López",
      image: "/psycho4.jpeg",
      specialties: ["Depresión", "Duelo", "Familia"],
      experience: 5,
      bio: "Acompaño procesos de pérdida y duelo con empatía. La tristeza es válida, y juntos encontraremos cómo seguir adelante."
    }
  ];

  // Función para verificar si una fecha es día festivo en México
  const isHoliday = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // JavaScript months are 0-indexed
    const year = date.getFullYear();
    
    // Días festivos bloqueados:
    // 24 y 25 de diciembre de 2025
    // 31 de diciembre de 2025 (nota: usuario dijo "31 de Enero" pero debe ser diciembre)
    // 1 de enero de 2026
    const holidays = [
      { day: 24, month: 12, year: 2025 }, // Nochebuena
      { day: 25, month: 12, year: 2025 }, // Navidad
      { day: 31, month: 12, year: 2025 }, // Fin de año
      { day: 1, month: 1, year: 2026 }     // Año nuevo
    ];
    
    return holidays.some(holiday => 
      holiday.day === day && holiday.month === month && holiday.year === year
    );
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    let daysAdded = 0;
    // Si está reprogramando, empezar desde +15 días; si no, desde +16 días
    let currentDay = isRescheduling ? 15 : 16;
    
    while (daysAdded < 21) { // Generar 3 semanas de fechas disponibles
      const date = new Date(today);
      date.setDate(today.getDate() + currentDay);
      
      // Excluir domingos (día 0) y días festivos
      if (date.getDay() !== 0 && !isHoliday(date)) {
        dates.push(date);
        daysAdded++;
      }
      currentDay++;
    }
    return dates;
  };

  const availableDates = generateDates();

  // Pool de horarios disponibles (se seleccionarán 5 por día)
  const allTimeSlots = [
    '09:00', '10:00', '11:00', '12:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Solo números
    if (value.length <= 10) {
      setFormData({...formData, telefono: value});
      // Validar si está vacío o incompleto
      if (value.length === 0 || value.length === 10) {
        setFormErrors({...formErrors, telefono: value.length !== 10});
      }
    }
  };

  const handleOtherPersonPhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Solo números
    if (value.length <= 10) {
      setOtherPersonData({...otherPersonData, telefono: value});
      // Validar si está vacío o incompleto
      if (value.length === 0 || value.length === 10) {
        setOtherPersonErrors({...otherPersonErrors, telefono: value.length !== 10});
      }
    }
  };

  const formatPhoneDisplay = (phone) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  };

  const handleLoginSubmit = () => {
    const cleaned = loginPhone.replace(/\D/g, '');
    
    if (cleaned.length !== 10) {
      alert('Por favor ingresa un número de teléfono válido de 10 dígitos');
      return;
    }
    
    const uniquePhoneId = `+52${cleaned}`;
    const therapyUsers = JSON.parse(localStorage.getItem('therapyUsers') || '{}');
    
    if (therapyUsers[uniquePhoneId]) {
      // Usuario encontrado - autocompletar datos
      const userData = therapyUsers[uniquePhoneId];
      setFormData({
        nombre: userData.nombre,
        apellidoPaterno: userData.apellidoPaterno,
        telefono: userData.telefono,
        email: userData.email,
        concerns: ''
      });
      setIsReturningUser(true);
      setShowLoginModal(false);
      console.log('✅ Usuario recurrente identificado:', userData.nombre);
    } else {
      // Usuario nuevo
      setIsReturningUser(false);
      setShowLoginModal(false);
      console.log('👤 Usuario nuevo');
    }
  };

  const handleSkipLogin = () => {
    setIsReturningUser(false);
    setShowLoginModal(false);
  };

  const handleSubmit = async () => {
    // Reset errors
    setFormErrors({});
    setOtherPersonErrors({});
    setDateTimeErrors({ date: false, time: false });
    
    let hasErrors = false;
    const newFormErrors = {};
    const newOtherPersonErrors = {};
    const newDateTimeErrors = { date: false, time: false };
    
    if (!sessionFor) {
      // Scroll al selector de sesión
      const sessionSelector = document.querySelector('[data-session-selector]');
      if (sessionSelector) {
        sessionSelector.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    if (!selectedDate) {
      newDateTimeErrors.date = true;
      hasErrors = true;
    }
    
    if (!selectedTime) {
      newDateTimeErrors.time = true;
      hasErrors = true;
    }

    if (!selectedDate || !selectedTime) {
      setDateTimeErrors(newDateTimeErrors);
      // Scroll al calendario
      const calendar = document.querySelector('[data-calendar]');
      if (calendar) {
        calendar.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Validar formData (quien agenda)
    if (!formData.nombre || !formData.nombre.trim()) {
      newFormErrors.nombre = true;
      hasErrors = true;
    }
    if (!formData.apellidoPaterno || !formData.apellidoPaterno.trim()) {
      newFormErrors.apellidoPaterno = true;
      hasErrors = true;
    }
    if (!formData.email || !formData.email.trim()) {
      newFormErrors.email = true;
      hasErrors = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newFormErrors.email = true;
      hasErrors = true;
    }
    if (!formData.telefono || formData.telefono.length !== 10) {
      newFormErrors.telefono = true;
      hasErrors = true;
    }

    // Validar otherPersonData si es para otra persona
    if (sessionFor === 'other') {
      if (!otherPersonData.nombre || !otherPersonData.nombre.trim()) {
        newOtherPersonErrors.nombre = true;
        hasErrors = true;
      }
      if (!otherPersonData.apellidoPaterno || !otherPersonData.apellidoPaterno.trim()) {
        newOtherPersonErrors.apellidoPaterno = true;
        hasErrors = true;
      }
      if (!otherPersonData.email || !otherPersonData.email.trim()) {
        newOtherPersonErrors.email = true;
        hasErrors = true;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(otherPersonData.email)) {
        newOtherPersonErrors.email = true;
        hasErrors = true;
      }
      if (!otherPersonData.telefono || otherPersonData.telefono.length !== 10) {
        newOtherPersonErrors.telefono = true;
        hasErrors = true;
      }
      if (!otherPersonData.relationship || !otherPersonData.relationship.trim()) {
        newOtherPersonErrors.relationship = true;
        hasErrors = true;
      }
    }

    if (hasErrors) {
      setFormErrors(newFormErrors);
      setOtherPersonErrors(newOtherPersonErrors);
      // Scroll al primer campo con error
      const firstError = sessionFor === 'myself' 
        ? Object.keys(newFormErrors)[0]
        : Object.keys(newOtherPersonErrors)[0] || Object.keys(newFormErrors)[0];
      const errorElement = document.querySelector(`[name="${firstError}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
      return;
    }

    const patientInfo = sessionFor === 'myself' 
      ? `${formData.nombre} ${formData.apellidoPaterno}`
      : `${otherPersonData.nombre} ${otherPersonData.apellidoPaterno} ${otherPersonData.apellidoMaterno || ''}`.trim();

    const patientPhone = sessionFor === 'myself'
      ? `+52${formData.telefono}`
      : `+52${otherPersonData.telefono}`;

    const patientEmail = sessionFor === 'myself'
      ? formData.email
      : otherPersonData.email;

    const dataToSend = {
      timestamp: new Date().toISOString(),
      sessionFor: sessionFor === 'myself' ? 'Para mí' : 'Para otra persona',
      patientName: patientInfo,
      patientPhone: patientPhone,
      patientEmail: patientEmail,
      contactName: `${formData.nombre} ${formData.apellidoPaterno}`,
      contactPhone: `+52${formData.telefono}`,
      contactEmail: formData.email,
      relationship: sessionFor === 'other' ? otherPersonData.relationship : 'Propio paciente',
      sessionType: 'Individual',
      contactMethod: 'Videollamada',
      date: selectedDate.toLocaleDateString('es-MX'),
      time: selectedTime,
      concerns: formData.concerns
    };

    console.log('Agendamiento de terapia:', dataToSend);
    
    // Enviar email de confirmación
    try {
      const emailMessage = `
📅 NUEVA CITA DE TERAPIA AGENDADA

--- Tipo de Sesión ---
${sessionFor === 'myself' ? '✅ Sesión para el usuario que agenda' : '👥 Sesión para otra persona (familiar)'}

--- Información del Paciente (quien asistirá a terapia) ---
Nombre completo: ${patientInfo}
Teléfono: ${patientPhone}
Email: ${patientEmail}
${sessionFor === 'other' ? `Parentesco: ${otherPersonData.relationship}` : ''}

--- Información de Contacto (quien agenda) ---
Nombre: ${formData.nombre} ${formData.apellidoPaterno}
Teléfono: +52${formData.telefono}
Email: ${formData.email}

--- Detalles de la Sesión ---
Fecha: ${selectedDate.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
Hora: ${selectedTime} hrs
Tipo de sesión: Individual
Método: Videollamada

--- Motivos de Consulta ---
${formData.concerns || 'No especificado'}

--- Acción Requerida ---
⚠️ IMPORTANTE: Contactar ${sessionFor === 'myself' ? 'al paciente' : 'a ambos números'} 24 horas antes para confirmar y enviar link de videollamada.
      `.trim();

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: sessionFor === 'myself' 
            ? `${formData.nombre} ${formData.apellidoPaterno}` 
            : `${otherPersonData.nombre} ${otherPersonData.apellidoPaterno} (agendado por ${formData.nombre})`,
          phone: patientPhone,
          message: emailMessage,
          type: 'therapy'
        }),
      });

      if (!response.ok) {
        console.error('Error al enviar email de confirmación');
      }

      // Enviar email de confirmación al paciente
      if (patientEmail) {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: patientEmail,
            subject: '📅 Confirmación de Cita - Sesión de Terapia',
            message: `Hola ${patientInfo.split(' ')[0]},

¡Tu cita de terapia ha sido agendada exitosamente! 🎉

📅 **Detalles de tu sesión:**
• Fecha: ${selectedDate.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
• Hora: ${selectedTime} hrs
• Tipo: Sesión Individual
• Modalidad: Videollamada

📞 **Contacto:**
Recibirás el link de videollamada 24 horas antes de tu cita.

💙 **Recordatorio:**
Es importante que estés en un lugar tranquilo y privado para tu sesión.

¿Dudas? Escríbenos a contact@saludcompartida.com

¡Nos vemos pronto!
SaludCompartida`,
            type: 'therapy-confirmation'
          })
        });
      }

      // Si la cita es para otra persona, enviar email también al contacto
      if (sessionFor === 'other' && formData.email && formData.email !== patientEmail) {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: formData.email,
            subject: '📅 Confirmación - Cita de Terapia Agendada',
            message: `Hola ${formData.nombre},

Has agendado exitosamente una cita de terapia para ${patientInfo} 🎉

📅 **Detalles de la sesión:**
• Paciente: ${patientInfo}
• Fecha: ${selectedDate.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
• Hora: ${selectedTime} hrs
• Tipo: Sesión Individual
• Modalidad: Videollamada

📞 **Información importante:**
El link de videollamada será enviado al paciente 24 horas antes de la cita.

💙 **Tu apoyo es importante:**
Asegúrate de recordarle al paciente sobre la cita.

¿Dudas? Escríbenos a contact@saludcompartida.com

Gracias por cuidar de tu familia.
SaludCompartida`,
            type: 'therapy-confirmation'
          })
        });
      }

    } catch (error) {
      console.error('Error:', error);
    }
    
    // Enviar notificación de WhatsApp/SMS al paciente
    try {
      const notificationResult = await sendAppointmentConfirmation({
        phone: sessionFor === 'myself' ? formData.telefono : otherPersonData.telefono,
        firstName: sessionFor === 'myself' ? formData.nombre : otherPersonData.nombre,
        date: selectedDate.toLocaleDateString('es-MX', { 
          weekday: 'long', 
          day: 'numeric', 
          month: 'long' 
        }),
        time: selectedTime,
        type: 'psicología'
      });

      if (notificationResult.success) {
        console.log(`✅ Notificación enviada por ${notificationResult.method}:`, notificationResult.messageSid);
      } else {
        console.error('❌ Error al enviar notificación:', notificationResult.error);
      }
    } catch (error) {
      console.error('Error enviando notificación:', error);
      // No bloqueamos el flujo si falla la notificación
    }
    
    // Guardar usuario en localStorage para futuras sesiones
    const uniquePhoneId = `+52${formData.telefono}`;
    const therapyUsers = JSON.parse(localStorage.getItem('therapyUsers') || '{}');
    
    therapyUsers[uniquePhoneId] = {
      nombre: formData.nombre,
      apellidoPaterno: formData.apellidoPaterno,
      email: formData.email,
      telefono: formData.telefono,
      countryCode: '+52',
      lastAppointment: new Date().toISOString()
    };
    
    localStorage.setItem('therapyUsers', JSON.stringify(therapyUsers));
    console.log('✅ Usuario guardado en localStorage:', uniquePhoneId);
    
    setShowConfirmation(true);
  };

  const formatDate = (date) => {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()]
    };
  };

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 6; // Solo sábado (domingo ya está excluido)
  };

  const handleCancelAppointment = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    setShowRescheduleQuestion(true);
  };

  const handleRescheduleNo = () => {
    // Usuario no quiere reprogramar
    console.log('Usuario canceló sin reprogramar');
    setShowRescheduleQuestion(false);
    setShowThankYouMessage(true);
  };

  const handleRescheduleYes = () => {
    // Usuario quiere reprogramar - resetear formulario y mostrar calendario
    console.log('Usuario quiere reprogramar');
    setShowRescheduleQuestion(false);
    setShowConfirmation(false);
    setIsRescheduling(true);
    setSelectedDate(null);
    setSelectedTime(null);
    window.scrollTo(0, 0);
  };

  const getAvailableTimesForDate = (date) => {
    if (!date) return [];
    
    const day = date.getDay();
    
    // Sábado (día 6): 09:00 a 12:00
    if (day === 6) {
      return ['09:00', '10:00', '11:00', '12:00'];
    }
    
    // Lunes a Viernes: 5 horarios disponibles
    // Seleccionamos de manera distribuida durante el día
    return ['09:00', '11:00', '14:00', '16:00', '18:00'];
  };

  if (currentView === 'anxiety') {
    return <AnxietyTips onBack={() => setCurrentView('main')} />;
  }

  if (currentView === 'relationships') {
    return <RelationshipTips onBack={() => setCurrentView('main')} />;
  }

  if (currentView === 'stress') {
    return <StressTips onBack={() => setCurrentView('main')} />;
  }

  // Modal de login para usuarios recurrentes
  if (showLoginModal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Bienvenido!</h2>
            <p className="text-gray-600">¿Ya has agendado una sesión antes?</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ingresa tu teléfono
              </label>
              <div className="flex gap-2">
                <div className="flex items-center bg-gray-100 border border-gray-300 rounded-xl px-4">
                  <span className="text-gray-700 font-medium">+52</span>
                </div>
                <input
                  type="tel"
                  value={loginPhone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 10) {
                      setLoginPhone(value);
                    }
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="555 123 4567"
                  maxLength="10"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Autocompletaremos tus datos si ya agendaste antes</p>
            </div>

            <button
              onClick={handleLoginSubmit}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              Continuar
            </button>

            <button
              onClick={handleSkipLogin}
              className="w-full py-3 text-gray-600 font-semibold hover:text-gray-900 transition-colors"
            >
              Soy nuevo, llenar datos manualmente
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
        <TopNav onBack={() => navigate('/page4')} hideUser={true} />

        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¡Tu sesión está agendada!
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              {sessionFor === 'myself' 
                ? 'Que bueno que diste el primer paso. Hablar de lo que sientes es de valientes.'
                : 'Gracias por cuidar a tu familia. Has tomado una gran decisión al apoyar a tu ser querido.'
              }
            </p>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-8">
              <p className="text-sm text-gray-600 mb-2">
                {sessionFor === 'myself' ? 'Tu sesión' : `Sesión de ${otherPersonData.nombre} ${otherPersonData.apellidoPaterno}`}
              </p>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {selectedDate.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
              <p className="text-xl text-gray-700">{selectedTime} hrs</p>
              <p className="text-sm text-gray-600 mt-4">Sesión individual por videollamada</p>
            </div>

            <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 mb-8">
              <p className="text-sm text-gray-700">
                <strong>Te vamos a contactar 24 horas antes</strong> al{' '}
                <span className="font-semibold">+52 {formatPhoneDisplay(formData.telefono)}</span>
                {sessionFor === 'other' && (
                  <>
                    {' '}y al <span className="font-semibold">+52 {formatPhoneDisplay(otherPersonData.telefono)}</span>
                  </>
                )}
                {' '}para confirmar {sessionFor === 'myself' ? 'tu' : 'la'} sesión y mandar el link de la videollamada.
              </p>
            </div>

            {/* Botón de Cancelar Cita */}
            <div className="mb-8">
              <button
                onClick={handleCancelAppointment}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg mb-4"
              >
                Cancelar Cita
              </button>
            </div>

            {/* Sección de Cancelación y Reprogramación (info) */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-3 mb-4">
                <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">¿Necesitas ayuda con tu cita?</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Si tienes dudas o necesitas asistencia, contáctanos:
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Por WhatsApp:</strong> Envía un mensaje al <a href={`https://wa.me/5529984922702?text=${encodeURIComponent('Hola, tengo una pregunta sobre mi sesión de terapia del ' + selectedDate.toLocaleDateString('es-MX'))}`} className="text-cyan-600 hover:underline font-semibold">55 2998 4922 702</a></span>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Por email:</strong> Escribe a <a href={`mailto:terapia@saludcompartida.com?subject=Consulta sobre sesión&body=Nombre: ${formData.nombre} ${formData.apellidoPaterno}%0D%0AFecha de cita: ${selectedDate.toLocaleDateString('es-MX')}%0D%0AHora: ${selectedTime}%0D%0A%0D%0AConsulta:`} className="text-cyan-600 hover:underline font-semibold">terapia@saludcompartida.com</a></span>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Por teléfono:</strong> Llama al 55 1234 5678 (Lunes a Viernes, 9am-6pm)</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-yellow-300">
                    <p className="text-xs text-gray-600">
                      <strong>Nota:</strong> Avísanos con al menos 24 horas de anticipación para cualquier cambio.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate('/page4')}
                className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold py-4 rounded-xl hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-lg"
              >
                Volver al menú principal
              </button>
              
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  setSessionFor('');
                  setSelectedDate(null);
                  setSelectedTime(null);
                  setIsRescheduling(false);
                  setFormData({ nombre: '', apellidoPaterno: '', telefono: '', email: '', concerns: '' });
                  setOtherPersonData({ nombre: '', apellidoPaterno: '', apellidoMaterno: '', email: '', telefono: '', relationship: '' });
                }}
                className="w-full text-gray-600 hover:text-gray-900 font-medium"
              >
                Agendar otra sesión
              </button>
            </div>
          </div>
        </div>

        {/* Modal de Confirmación de Cancelación */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                ¿Seguro que quieres cancelar?
              </h3>
              
              <p className="text-gray-600 text-center mb-6">
                Tu sesión del {selectedDate.toLocaleDateString('es-MX', { day: 'numeric', month: 'long' })} a las {selectedTime} hrs será cancelada.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={handleConfirmCancel}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all"
                >
                  Sí, cancelar cita
                </button>
                
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-xl transition-all"
                >
                  No, mantener mi cita
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Pregunta de Reprogramación */}
        {showRescheduleQuestion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
              <div className="w-16 h-16 bg-cyan-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                ¿Quieres reprogramar tu sesión?
              </h3>
              
              <p className="text-gray-600 text-center mb-6">
                Podemos ayudarte a encontrar una nueva fecha para tu sesión de terapia.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={handleRescheduleYes}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg"
                >
                  Sí, quiero reprogramar
                </button>
                
                <button
                  onClick={handleRescheduleNo}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-xl transition-all"
                >
                  No, solo cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Mensaje de Agradecimiento */}
        {showThankYouMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                Estamos Aquí para Ti
              </h3>
              
              <p className="text-lg text-gray-700 text-center mb-6">
                Tu bienestar emocional es nuestra prioridad. Cuando estés listo para tu sesión, <strong className="text-purple-600">estaremos listos para atenderte</strong> con todo el apoyo que mereces.
              </p>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-600 text-center italic">
                  "Cuidar de tu salud mental no es un lujo, es una necesidad. Vuelve cuando lo necesites, siempre tendremos un espacio para ti."
                </p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/page4')}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg"
                >
                  Volver al menú principal
                </button>
                
                <button
                  onClick={() => {
                    setShowThankYouMessage(false);
                    setShowConfirmation(false);
                    setSessionFor('');
                    setSelectedDate(null);
                    setSelectedTime(null);
                    setIsRescheduling(false);
                    window.scrollTo(0, 0);
                  }}
                  className="w-full text-cyan-600 hover:text-cyan-700 font-semibold py-2"
                >
                  Agendar una nueva sesión
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <img 
            src="/saludcompartida logo WT.png" 
            alt="SaludCompartida" 
            className="h-16 cursor-pointer"
            onClick={() => navigate('/')}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section - SIN ICONO DE CORAZÓN */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tu Salud Mental Importa
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Hablar de lo que sientes no es de débiles, es de valientes. Una sesión a la semana puede cambiar tu vida.
          </p>

          <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-6 py-3">
            <svg className="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-semibold text-purple-900">
              100% confidencial y profesional
            </span>
          </div>
        </div>

        {/* Mensaje de bienvenida para usuarios recurrentes */}
        {isReturningUser && formData.nombre && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 mb-8 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  ¡Qué bien verte de nuevo, {formData.nombre}!
                </h3>
                <p className="text-gray-700">
                  Nos alegra que sigas cuidando tu salud mental. Tus datos ya están listos, solo selecciona tu nueva fecha.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            ¿Por qué terapia?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => setCurrentView('anxiety')}
              className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 text-left transition-all hover:shadow-xl hover:scale-105 hover:from-cyan-100 hover:to-cyan-200 cursor-pointer"
            >
              <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Reduce tu ansiedad</h3>
              <p className="text-sm text-gray-600 mb-3">
                La vida de migrante es pesada. Hablar con alguien que te entiende te ayuda a sentirte más tranquilo.
              </p>
              <p className="text-xs font-semibold text-cyan-700">
                Haz clic para ver tips →
              </p>
            </button>

            <button
              onClick={() => setCurrentView('relationships')}
              className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-left transition-all hover:shadow-xl hover:scale-105 hover:from-purple-100 hover:to-purple-200 cursor-pointer"
            >
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Mejora tus relaciones</h3>
              <p className="text-sm text-gray-600 mb-3">
                Estar lejos no es fácil. Un terapeuta te ayuda a manejar el estrés y mejorar cómo te llevas con tu familia.
              </p>
              <p className="text-xs font-semibold text-purple-700">
                Haz clic para ver tips →
              </p>
            </button>

            <button
              onClick={() => setCurrentView('stress')}
              className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 text-left transition-all hover:shadow-xl hover:scale-105 hover:from-pink-100 hover:to-pink-200 cursor-pointer"
            >
              <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Maneja tu estrés</h3>
              <p className="text-sm text-gray-600 mb-3">
                Entre el trabajo, las cuentas y la preocupación por tu familia, el estrés se acumula. Aquí te ayudamos.
              </p>
              <p className="text-xs font-semibold text-pink-700">
                Haz clic para ver tips →
              </p>
            </button>
          </div>

          {/* Testimoniales - Solo nombre y edad */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 transition-all duration-500">
            <p className="text-gray-700 italic mb-2">
              "{testimonials[currentTestimonialIndex].text}"
            </p>
            <p className="text-sm font-semibold text-gray-900">
              — {testimonials[currentTestimonialIndex].author}
            </p>
          </div>
        </div>

        {/* Videos de Salud Mental */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <video 
              src="https://p0iccshbkx3s8qpk.public.blob.vercel-storage.com/womansreaming.mov"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              Tu navegador no soporta el video.
            </video>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl">
            <video 
              src="https://p0iccshbkx3s8qpk.public.blob.vercel-storage.com/mentalhealthhappy.mov"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              Tu navegador no soporta el video.
            </video>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Conoce a nuestros psicólogos
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Todos nuestros psicólogos están certificados y tienen amplia experiencia
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {psychologists.map((psychologist, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                  <img 
                    src={psychologist.image} 
                    alt={psychologist.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center"><svg class="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div>`;
                    }}
                  />
                </div>
                
                <h3 className="font-bold text-gray-900 text-center mb-2">
                  {psychologist.name}
                </h3>
                
                <div className="flex flex-wrap gap-2 justify-center mb-3">
                  {psychologist.specialties.map((specialty, i) => (
                    <span key={i} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>
                
                <p className="text-xs text-gray-600 text-center mb-3">
                  {psychologist.experience} años de experiencia
                </p>
                
                <p className="text-sm text-gray-700 text-center">
                  {psychologist.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario con campos separados y teléfono +55 */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {isRescheduling && (
            <div className="bg-cyan-50 border-2 border-cyan-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-cyan-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Reprogramando tu sesión</h3>
                  <p className="text-sm text-gray-700">
                    Las nuevas fechas disponibles empiezan <strong>15 días desde hoy</strong>. Selecciona tu nueva fecha y hora.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isRescheduling ? 'Reprograma tu sesión individual' : 'Agenda tu sesión individual'}
          </h2>

          {/* Selección: Para Mí o Para Otra Persona */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              La sesión de terapia es:
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSessionFor('myself')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  sessionFor === 'myself'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-center">Para Mí</h3>
                <p className="text-sm text-gray-600 text-center mt-2">
                  Yo asistiré a la sesión
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSessionFor('other')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  sessionFor === 'other'
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                <div className="flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-center">Para Otra Persona</h3>
                <p className="text-sm text-gray-600 text-center mt-2">
                  Un familiar asistirá
                </p>
              </button>
            </div>
          </div>

          {/* Datos de quien agenda (siempre visible) */}
          {sessionFor && (
            <>
              <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-xl p-6 mb-8">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {sessionFor === 'myself' ? 'Tus Datos' : 'Datos de quien agenda (tú)'}
                </h3>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={(e) => {
                        setFormData({...formData, nombre: e.target.value});
                      }}
                      onBlur={(e) => {
                        if (!e.target.value.trim()) {
                          setFormErrors({...formErrors, nombre: true});
                        } else {
                          setFormErrors({...formErrors, nombre: false});
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 ${
                        formErrors.nombre ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Tu nombre"
                    />
                    {formErrors.nombre && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Este campo es obligatorio
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Apellido paterno <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="apellidoPaterno"
                      value={formData.apellidoPaterno}
                      onChange={(e) => {
                        setFormData({...formData, apellidoPaterno: e.target.value});
                      }}
                      onBlur={(e) => {
                        if (!e.target.value.trim()) {
                          setFormErrors({...formErrors, apellidoPaterno: true});
                        } else {
                          setFormErrors({...formErrors, apellidoPaterno: false});
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 ${
                        formErrors.apellidoPaterno ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Tu apellido"
                    />
                    {formErrors.apellidoPaterno && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Este campo es obligatorio
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tu correo electrónico <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({...formData, email: e.target.value});
                    }}
                    onBlur={(e) => {
                      const value = e.target.value.trim();
                      if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                        setFormErrors({...formErrors, email: true});
                      } else {
                        setFormErrors({...formErrors, email: false});
                      }
                    }}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 ${
                      formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="tucorreo@ejemplo.com"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Este campo es obligatorio
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Tu teléfono (WhatsApp) <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <div className={`flex items-center bg-gray-100 border border-r-0 rounded-l-xl px-4 ${
                      formErrors.telefono ? 'border-red-500' : 'border-gray-300'
                    }`}>
                      <span className="text-gray-700 font-medium">+52</span>
                    </div>
                    <input
                      type="tel"
                      value={formatPhoneDisplay(formData.telefono)}
                      onChange={handlePhoneChange}
                      className={`flex-1 px-4 py-3 border rounded-r-xl focus:ring-2 focus:ring-cyan-500 ${
                        formErrors.telefono ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="555 123 4567"
                      maxLength="12"
                    />
                  </div>
                  {formErrors.telefono ? (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Este campo es obligatorio
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">Formato: XXX XXX XXXX</p>
                  )}
                </div>
              </div>

              {/* Datos de la persona que asistirá (solo si es para otra persona) */}
              {sessionFor === 'other' && (
                <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl p-6 mb-8">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Datos de quien asistirá a terapia
                  </h3>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="otherNombre"
                        value={otherPersonData.nombre}
                        onChange={(e) => {
                          setOtherPersonData({...otherPersonData, nombre: e.target.value});
                        }}
                        onBlur={(e) => {
                          if (!e.target.value.trim()) {
                            setOtherPersonErrors({...otherPersonErrors, nombre: true});
                          } else {
                            setOtherPersonErrors({...otherPersonErrors, nombre: false});
                          }
                        }}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 ${
                          otherPersonErrors.nombre ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Nombre"
                      />
                      {otherPersonErrors.nombre && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Este campo es obligatorio
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Apellido Paterno <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="otherApellidoPaterno"
                        value={otherPersonData.apellidoPaterno}
                        onChange={(e) => {
                          setOtherPersonData({...otherPersonData, apellidoPaterno: e.target.value});
                        }}
                        onBlur={(e) => {
                          if (!e.target.value.trim()) {
                            setOtherPersonErrors({...otherPersonErrors, apellidoPaterno: true});
                          } else {
                            setOtherPersonErrors({...otherPersonErrors, apellidoPaterno: false});
                          }
                        }}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 ${
                          otherPersonErrors.apellidoPaterno ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Apellido paterno"
                      />
                      {otherPersonErrors.apellidoPaterno && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Este campo es obligatorio
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Apellido Materno <span className="text-gray-400 text-xs">(opcional)</span>
                      </label>
                      <input
                        type="text"
                        value={otherPersonData.apellidoMaterno}
                        onChange={(e) => setOtherPersonData({...otherPersonData, apellidoMaterno: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Apellido materno"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Correo electrónico <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="otherEmail"
                      value={otherPersonData.email}
                      onChange={(e) => {
                        setOtherPersonData({...otherPersonData, email: e.target.value});
                      }}
                      onBlur={(e) => {
                        const value = e.target.value.trim();
                        if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                          setOtherPersonErrors({...otherPersonErrors, email: true});
                        } else {
                          setOtherPersonErrors({...otherPersonErrors, email: false});
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 ${
                        otherPersonErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="correo@ejemplo.com"
                    />
                    {otherPersonErrors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Este campo es obligatorio
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      Teléfono (WhatsApp) <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <div className={`flex items-center bg-gray-100 border border-r-0 rounded-l-xl px-4 ${
                        otherPersonErrors.telefono ? 'border-red-500' : 'border-gray-300'
                      }`}>
                        <span className="text-gray-700 font-medium">+52</span>
                      </div>
                      <input
                        type="tel"
                        value={formatPhoneDisplay(otherPersonData.telefono)}
                        onChange={handleOtherPersonPhoneChange}
                        className={`flex-1 px-4 py-3 border rounded-r-xl focus:ring-2 focus:ring-pink-500 ${
                          otherPersonErrors.telefono ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="555 123 4567"
                        maxLength="12"
                      />
                    </div>
                    {otherPersonErrors.telefono ? (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Este campo es obligatorio
                      </p>
                    ) : (
                      <p className="text-xs text-gray-500 mt-1">Formato: XXX XXX XXXX (diferente al tuyo)</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Parentesco <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="relationship"
                      value={otherPersonData.relationship}
                      onChange={(e) => {
                        setOtherPersonData({...otherPersonData, relationship: e.target.value});
                        setOtherPersonErrors({...otherPersonErrors, relationship: false});
                      }}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 ${
                        otherPersonErrors.relationship ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Selecciona el parentesco</option>
                      <option value="Mamá">Mamá</option>
                      <option value="Papá">Papá</option>
                      <option value="Hijo/a">Hijo/a</option>
                      <option value="Hermano/a">Hermano/a</option>
                      <option value="Esposo/a">Esposo/a</option>
                      <option value="Abuelo/a">Abuelo/a</option>
                      <option value="Tío/a">Tío/a</option>
                      <option value="Primo/a">Primo/a</option>
                      <option value="Otro familiar">Otro familiar</option>
                    </select>
                    {otherPersonErrors.relationship && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Este campo es obligatorio
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Fecha y hora solo si ya eligió Para Mí o Para Otra Persona */}
          {sessionFor && (
            <>
              <div className="mb-8" data-calendar>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Selecciona el día <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-7 gap-2">
              {availableDates.map((date, index) => {
                const formatted = formatDate(date);
                const isSelected = selectedDate?.toDateString() === date.toDateString();
                
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedTime(null);
                      setDateTimeErrors({...dateTimeErrors, date: false});
                    }}
                    className={`p-3 rounded-xl text-center transition-all ${
                      isSelected
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-white border-2 border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-xs font-medium mb-1">{formatted.day}</div>
                    <div className="text-lg font-bold">{formatted.date}</div>
                    <div className="text-xs">{formatted.month}</div>
                  </button>
                );
              })}
            </div>
            {dateTimeErrors.date && (
              <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Este campo es obligatorio
              </p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              * Fechas disponibles después de 15 días. Cerrado los domingos y días festivos (24, 25, 31 Dic / 1 Ene).
            </p>
          </div>

          {selectedDate && (
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Selecciona la hora <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
                {getAvailableTimesForDate(selectedDate).map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => {
                      setSelectedTime(time);
                      setDateTimeErrors({...dateTimeErrors, time: false});
                    }}
                    className={`py-3 rounded-xl font-semibold transition-all ${
                      selectedTime === time
                        ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg'
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-cyan-300'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              {dateTimeErrors.time && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Este campo es obligatorio
                </p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                {isWeekend(selectedDate) 
                  ? '* Sábado: 9:00am - 12:00pm'
                  : '* Lunes a Viernes: 5 horarios disponibles'
                }
              </p>
            </div>
          )}

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ¿Qué te gustaría trabajar? (opcional)
            </label>
            <textarea
              value={formData.concerns}
              onChange={(e) => setFormData({...formData, concerns: e.target.value})}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              placeholder="Puedes compartir brevemente lo que te preocupa. Esto es confidencial y nos ayuda a prepararnos mejor para apoyarte."
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedDate || !selectedTime || !sessionFor}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              selectedDate && selectedTime && sessionFor
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Confirmar mi sesión
          </button>

          <p className="text-xs text-center text-gray-500 mt-4">
            Te contactaremos 24 horas antes para confirmar tu sesión por videollamada
          </p>
            </>
          )}
        </div>

        <div className="mt-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-purple-600 mr-4 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Tu privacidad es sagrada</h3>
              <p className="text-sm text-gray-700">
                Todo lo que compartas con tu terapeuta es 100% confidencial. Tus sesiones están protegidas por las leyes de privacidad médica. Nadie más tendrá acceso a lo que platiques, ni siquiera nosotros.
              </p>
            </div>
          </div>
        </div>

        {/* Consultas Button */}
        <div className="mt-12 flex justify-center">
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
      </div>
    </div>
  );
}