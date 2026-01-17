'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const testimonials = [
  "Son las 3 AM, mi mamá tiene dolor de pecho y no sé qué hacer desde aquí. —María González, Phoenix AZ",
  "Mi hijo con fiebre de 40 grados, la clínica cerrada y yo a mil millas. —Roberto Castro, Tucson AZ",
  "Llamada de emergencia: mi papá cayó, ambulancia cuesta $800 que no tenemos. —Carmen Silva, Mesa AZ",
  "Despierto cada noche pensando si mi familia estará bien sin mí cerca. —José Ramírez, Scottsdale AZ",
  "Mi hermana con apendicitis, yo aquí trabajando sin poder hacer nada. —Ana Morales, Tempe AZ",
  "Emergencia nocturna, no hay doctor disponible y mi mamá sufre de diabetes. —Luis García, Chandler AZ",
  "Mi abuela necesita oxígeno urgente, hospital público saturado, estoy desesperado. —Pedro Vázquez, Gilbert AZ",
  "Bebé con vómito toda la noche, clínica privada cobra $200 que no tengo. —Sofia Méndez, Glendale AZ",
  "Llamó llorando: tiene dolor insoportable y el doctor la vio 2 minutos. —Carlos Díaz, Peoria AZ",
  "Crisis de asma de mi hijo, inhalador agotado, farmacia cerrada a esta hora. —Isabel Reyes, Surprise AZ",
  "Receta de 4 medicinas: $340. Trabajo dos semanas solo para eso. —Miguel Ángel, Los Angeles CA",
  "Consulta $180, estudios $300, medicinas $120. Ya no sé qué hacer. —Laura Pérez, San Diego CA",
  "Mandé $500 este mes solo para doctores. Mis hijos aquí también necesitan. —Diego Flores, San Jose CA",
  "Cada medicina que sube de precio es una comida menos en mi casa. —Gabriela Núñez, Fresno CA",
  "Doctor privado $200, o esperar 6 meses. No hay opción real. —Fernando López, Houston TX",
  "Las medicinas para mi mamá cuestan más que mi renta. —Patricia Ruiz, Dallas TX",
  "Gasté todo mi ahorro en estudios y aún no tiene diagnóstico. —Ricardo Sánchez, Austin TX",
  "Inyección de insulina subió $80. Mi mamá ya está racionando las dosis. —Mónica Herrera, San Antonio TX",
  "Terapia psicológica $120 por sesión. Mi papá necesita 4 al mes, imposible. —Javier Ortiz, El Paso TX",
  "Antibiótico que costaba $30 ahora está en $95. No alcanza. —Guadalupe Martínez, CDMX",
  "6 meses esperando cita con cardiólogo. Mi papá puede no tener 6 meses. —Antonio Fernández, CDMX",
  "Turno asignado: octubre 2026. ¿En serio? —Rosa María Cruz, Guadalajara",
  "Llegué a las 5 AM para turno. Atendieron a 20, yo era el 21. Volví mañana. —Héctor Gómez, Monterrey",
  "4 horas de fila para que me digan que el doctor no vino hoy. —Verónica Álvarez, Puebla",
  "Llamando desde febrero para cita. Siempre ocupado o no contestan. —Ramón Silva, Tijuana",
  "Sistema dice 'no hay citas disponibles' hace 8 meses. —Elena Torres, León",
  "Especialista solo atiende lunes. Turno: 6 meses. —Francisco Jiménez, Querétaro",
  "Cáncer confirmado. Primera cita con oncólogo: 5 meses. —Beatriz Romero, Mérida",
  "Ultrasonido urgente. Cita más cercana: 4 meses. —Daniela Castillo, Aguascalientes",
  "Mi hijo con infección. Pediatra más cercano: 3 semanas. —Claudia Medina, Toluca",
  "Faltó 3 días al trabajo para llevar a mi mamá al doctor. Me despidieron. —Jorge Ramírez, Morelia",
  "No puedo tomar el día libre. Mi jefe ya me advirtió. —Sandra López, Celaya",
  "Cada cita médica es riesgo de perder el empleo. —Alberto Gutiérrez, Saltillo",
  "Me dijeron: 'Una falta más y estás fuera'. Pero mi papá necesita doctores. —Leticia Vargas, Zacatecas",
  "Trabajo por horas. No voy = no cobro. No puedo acompañar a mi mamá. —Mario Hernández, Irapuato",
  "Medicinas de presión subieron 45% en un año. Ya no alcanza. —Gloria Mendoza, CDMX",
  "Lo que costaba $150 ahora es $320. Mismo medicamento. —Raúl Santos, Guadalajara",
  "Compro la mitad de las medicinas recetadas. No hay para todas. —Mariana Flores, Monterrey",
  "En el super elijo: ¿comida o medicinas del mes? —Vicente Ortiz, Puebla",
  "Endeudada en farmacia. Debo 3 meses de medicinas. —Teresa Ramos, León",
  "Me siento culpable de estar aquí mientras ella sufre allá. —Eduardo Sánchez, Phoenix AZ",
  "Cada llamada es: '¿Cuándo vienes?'. No puedo volver aún. —Silvia Moreno, Los Angeles CA",
  "Llevo 3 años sin verlos. Me duele en el alma. —Octavio Rivera, Houston TX",
  "Video llamada no es lo mismo que un abrazo. —Norma Delgado, Dallas TX",
  "Trabajo 12 horas para mantenerlos, pero no estoy ahí cuando me necesitan. —Arturo Peña, Chicago IL",
];

const SaludCompartidaProblemStage = ({ onComplete }) => {
  const navigate = useNavigate();
  const [showQuestion1, setShowQuestion1] = useState(false);
  const [showQuestion2, setShowQuestion2] = useState(false);
  const [showOnlyOneQuestion, setShowOnlyOneQuestion] = useState(false);
  const [allBubbles, setAllBubbles] = useState([]);
  const [backgroundBubbles, setBackgroundBubbles] = useState([]);

  useEffect(() => {
    const shuffled = [...testimonials].sort(() => Math.random() - 0.5);
    let bubbleCounter = 0;
    let bgCounter = 0;
    
    // BURBUJAS principales - aparecen cada 2s, duran 4s legibles, luego se vuelven blur
    const mainInterval = setInterval(() => {
      if (bubbleCounter < 200) {
        const bubble = {
          id: `main-${bubbleCounter}-${Date.now()}`,
          text: shuffled[bubbleCounter % shuffled.length],
          x: 10 + Math.random() * 70,
          y: 30 + Math.random() * 50,
          isReadable: true, // Empieza legible
        };
        
        setAllBubbles(prev => [...prev, bubble]);
        
        // Después de 4 segundos, se vuelve blur (como las de atrás)
        setTimeout(() => {
          setAllBubbles(curr => 
            curr.map(b => b.id === bubble.id ? {...b, isReadable: false} : b)
          );
        }, 4000);
        
        bubbleCounter++;
      }
    }, 2000); // Nueva burbuja cada 2s
    
    // BURBUJAS de fondo (suben desde abajo)
    const bgInterval = setInterval(() => {
      if (bgCounter < 500) {
        const bubble = {
          id: `bg-${bgCounter}-${Date.now()}`,
          text: shuffled[bgCounter % shuffled.length],
          x: Math.random() * 95,
          size: 0.6 + Math.random() * 0.4,
        };
        
        setBackgroundBubbles(prev => [...prev, bubble]);
        
        setTimeout(() => {
          setBackgroundBubbles(curr => curr.filter(b => b.id !== bubble.id));
        }, 10000);
        
        bgCounter++;
      }
    }, 150);
    
    // PREGUNTAS ELIMINADAS TEMPORALMENTE
    // Las preguntas se volverán a implementar después
    
    // Pasar a la siguiente etapa después de 8 segundos (solo mostrar burbujas)
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 8000);
    
    return () => {
      clearInterval(mainInterval);
      clearInterval(bgInterval);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden pt-20">
      
      {/* BURBUJAS de fondo que suben (blur) z-10 */}
      {backgroundBubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="fixed z-10 animate-bubble-fast"
          style={{
            left: `${bubble.x}%`,
            bottom: '-80px',
            transform: `scale(${bubble.size})`,
          }}
        >
          <div className="relative opacity-40">
            <div 
              className="absolute -left-2 top-3 w-0 h-0 blur-[2px]"
              style={{
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderRight: '8px solid rgba(255, 255, 255, 0.8)',
              }}
            />
            <div className="bg-white/80 rounded-lg shadow-lg px-3 py-2 w-[200px] md:w-[280px] border-l-4 border-gray-300 blur-[2px]">
              <p className="text-xs md:text-sm text-gray-700 leading-snug">
                {bubble.text}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* PREGUNTAS ELIMINADAS TEMPORALMENTE - se volverán a agregar */}

      {/* PREGUNTA FINAL ELIMINADA TEMPORALMENTE */}

      {/* BURBUJAS PRINCIPALES - legibles que se vuelven blur z-30-45 */}
      {allBubbles.map((bubble) => (
        <div
          key={bubble.id}
          className={`fixed transition-all duration-2000 ${
            bubble.isReadable ? 'z-45' : 'z-30 opacity-40 blur-[2px]'
          }`}
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
          }}
        >
          <div className="relative">
            <div 
              className="absolute -left-2 top-3 w-0 h-0"
              style={{
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderRight: `8px solid ${bubble.isReadable ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)'}`,
              }}
            />
            <div className={`rounded-lg shadow-2xl px-3 py-2 w-[200px] md:w-[280px] border-l-4 ${
              bubble.isReadable 
                ? 'bg-white/95 border-yellow-400' 
                : 'bg-white/80 border-gray-300'
            }`}>
              <p className={`text-xs md:text-sm leading-snug ${
                bubble.isReadable ? 'text-gray-800' : 'text-gray-700'
              }`}>
                {bubble.text}
              </p>
            </div>
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(20px); }
          15% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        
        @keyframes bubble-fast {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 0.5;
          }
          95% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-110vh) rotate(-2deg);
            opacity: 0;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-fadeInOut {
          animation: fadeInOut 3s ease-in-out;
        }
        
        .animate-bubble-fast {
          animation: bubble-fast 10s linear forwards;
        }
        
        .z-45 {
          z-index: 45;
        }
        
        .duration-2000 {
          transition-duration: 2000ms;
        }
      `}</style>
    </div>
  );
};

export default SaludCompartidaProblemStage;
