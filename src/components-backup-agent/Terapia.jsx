'use client';

import { useState, useEffect } from 'react';
import { generateWhatsAppLink } from '@/utils/waE164';

// ─── DATA ───────────────────────────────────────────────────
const THERAPISTS = [
  { id: 1, name: 'Psic. Antonio Márquez', specialties: ['Ansiedad', 'Depresión', 'Duelo'], experience: 15, bio: 'Especialista en procesos migratorios y adaptación cultural. Ayudo a familias a mantener lazos fuertes a pesar de la distancia.', color: '#F59E0B', initial: 'AM' },
  { id: 2, name: 'Psic. María J. García', specialties: ['Familia', 'Relaciones', 'Estrés'], experience: 6, bio: 'Trabajo con parejas y familias para mejorar su comunicación. Las relaciones sanas se construyen con esfuerzo diario.', color: '#EC4899', initial: 'MG' },
  { id: 3, name: 'Psic. Laura Rodríguez', specialties: ['Ansiedad', 'Trauma', 'Autoestima'], experience: 7, bio: 'Me enfoco en ayudar a personas que cargan con culpa y ansiedad. Juntos encontramos la paz mental que mereces.', color: '#8B5CF6', initial: 'LR' },
  { id: 4, name: 'Psic. Carmen López', specialties: ['Depresión', 'Duelo', 'Familia'], experience: 5, bio: 'Acompaño procesos de pérdida y duelo con empatía. La tristeza es válida, y juntos encontraremos cómo seguir adelante.', color: '#06B6D4', initial: 'CL' },
];

const THERAPY_TESTIMONIALS = [
  { text: "Ir a terapia no es de ricos, es de quien quiere dejar de sufrir en silencio.", author: "Juan, 34 años" },
  { text: "Hablar con alguien no te hace débil, te da las fuerzas para soportar lo que otros no ven.", author: "Rosa, 41 años" },
  { text: "No estás solo, muchos callamos por miedo, pero juntos podemos buscar algo mejor.", author: "Miguel, 28 años" },
  { text: "Aguantar no es lo mismo que vivir; pedir ayuda me enseñó eso.", author: "Pedro, 39 años" },
  { text: "Los hombres también lloran... y sanar también es cosa de hombres.", author: "Raúl, 38 años" },
  { text: "Terapia no me cambió la vida, me enseñó a vivirla sin tanto peso encima.", author: "Luis, 43 años" },
  { text: "Antes me daba pena decir que iba a terapia, hoy hasta la recomiendo.", author: "Julio, 37 años" },
  { text: "Mi papá nunca habló de sus emociones; yo sí, y ahora soy un mejor padre.", author: "Ricardo, 44 años" },
];

const ANXIETY_TIPS = [
  { title: 'Respira profundo', desc: 'Inhala 4 segundos, sostén 4 segundos, exhala 6 segundos. Es una técnica comprobada para activar tu sistema nervioso parasimpático.', color: '#06B6D4' },
  { title: 'Escribe lo que te preocupa', desc: 'Sacar los pensamientos de tu cabeza y ponerlos en papel reduce su poder. Escribe sin juzgarte, solo suelta.', color: '#8B5CF6' },
  { title: 'Mueve tu cuerpo 10 minutos', desc: 'Camina, estira, baila. El movimiento libera endorfinas que combaten la ansiedad de forma natural.', color: '#EC4899' },
  { title: 'Limita café y noticias', desc: 'La cafeína imita los síntomas de ansiedad. Las noticias negativas activan tu amígdala. Reduce ambos.', color: '#06B6D4' },
  { title: 'Habla con alguien de confianza', desc: 'No cargues todo solo. Una conversación honesta puede ser más poderosa que cualquier medicina.', color: '#8B5CF6' },
];

const RELATIONSHIP_TIPS = [
  { title: 'Escucha de verdad, no solo para responder', desc: 'La mayoría escuchamos pensando en qué vamos a decir. Practica escuchar para entender, no para contestar.', color: '#8B5CF6' },
  { title: 'Di lo que sientes sin atacar', desc: 'En lugar de "tú siempre..." di "yo siento que..." El cambio de enfoque transforma la conversación.', color: '#EC4899' },
  { title: 'Perdona, pero también pon límites', desc: 'Perdonar no significa aceptar todo. Puedes querer a alguien y también cuidarte.', color: '#06B6D4' },
  { title: 'Celebra lo bueno, no solo señales lo malo', desc: 'Dile a tu familia qué hicieron bien hoy. Un "gracias" o "qué bien lo hiciste" cambia el ambiente de un hogar.', color: '#8B5CF6' },
  { title: 'Pide lo que necesitas claramente', desc: 'Nadie puede adivinar lo que sientes. Pedir no es exigir: es confiar en que la otra persona quiere ayudar.', color: '#EC4899' },
];

const STRESS_TIPS = [
  { title: 'Haz listas simples y tacha lo que terminas', desc: 'El cerebro necesita sentir progreso. Cada tache libera dopamina y te motiva a seguir.', color: '#EC4899' },
  { title: 'Di "no" sin culpa cuando sea necesario', desc: 'No puedes con todo. Decir "no" a lo que no puedes es decir "sí" a tu bienestar.', color: '#F59E0B' },
  { title: 'Duerme aunque creas que no hay tiempo', desc: 'Un cerebro descansado resuelve en minutos lo que uno agotado tarda horas. Dormir es productivo.', color: '#06B6D4' },
  { title: 'Toma pausas de 5 minutos cada hora', desc: 'Sal al patio, mira por la ventana, respira. Micro-pausas previenen el agotamiento acumulado.', color: '#EC4899' },
  { title: 'Suelta lo que no puedes controlar', desc: 'Gasta tu energía solo en lo que puedes cambiar. Lo demás, déjalo ir.', color: '#F59E0B' },
];

const THERAPY_HOURS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

export default function Terapia({ userType = 'mexico' }) {
  const [view, setView] = useState('main'); // 'main' | 'tips-ansiedad' | 'tips-relaciones' | 'tips-estres' | 'booking' | 'confirmation'
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [bookingData, setBookingData] = useState({
    therapist: null,
    name: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx(i => (i + 1) % THERAPY_TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const whatsappPhone = userType === 'migrant' ? '+13055227150' : '+525512345678';

  // ═══════════════════════════════════════════════════════════
  // VISTA: MAIN (Tips + Agenda tu sesión)
  // ═══════════════════════════════════════════════════════════
  if (view === 'main') {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#111827',
        color: '#fff',
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        padding: '24px 16px',
        maxWidth: 430,
        margin: '0 auto'
      }}>
        
        {/* Header */}
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <img 
            src="/saludcompartida-dark-no-tagline.png" 
            alt="SaludCompartida" 
            style={{ height: 40, marginBottom: 16 }}
          />
          <h1 style={{
            fontFamily: '"DM Serif Display", serif',
            fontSize: 32,
            marginBottom: 8,
            background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Terapia Psicológica
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
            {userType === 'migrant' 
              ? 'Para tu familia en México' 
              : 'Para ti y tu familia'}
          </p>
        </div>

        {/* Testimonial rotativo */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(139,92,246,0.08))',
          border: '1px solid rgba(236,72,153,0.2)',
          borderRadius: 16,
          padding: 20,
          marginBottom: 32,
          minHeight: 120,
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.5s ease'
        }}>
          <div>
            <p style={{ fontSize: 15, lineHeight: 1.6, fontStyle: 'italic', marginBottom: 12, color: 'rgba(255,255,255,0.9)' }}>
              "{THERAPY_TESTIMONIALS[testimonialIdx].text}"
            </p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
              — {THERAPY_TESTIMONIALS[testimonialIdx].author}
            </p>
          </div>
        </div>

        {/* Tips de Salud Mental */}
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
          Tips de Salud Mental
        </h2>

        <div style={{ marginBottom: 32 }}>
          {/* Ansiedad */}
          <div
            onClick={() => setView('tips-ansiedad')}
            style={{
              background: 'rgba(6,182,212,0.1)',
              border: '1px solid rgba(6,182,212,0.25)',
              borderRadius: 16,
              padding: 20,
              marginBottom: 12,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6, color: '#06B6D4' }}>
              Ansiedad
            </h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>
              5 técnicas para calmar tu mente cuando todo se siente abrumador
            </p>
            <span style={{ fontSize: 12, color: '#06B6D4', fontWeight: 600 }}>
              Ver tips →
            </span>
          </div>

          {/* Relaciones */}
          <div
            onClick={() => setView('tips-relaciones')}
            style={{
              background: 'rgba(236,72,153,0.1)',
              border: '1px solid rgba(236,72,153,0.25)',
              borderRadius: 16,
              padding: 20,
              marginBottom: 12,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6, color: '#EC4899' }}>
              Relaciones
            </h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>
              5 claves para mejorar la comunicación con tu familia
            </p>
            <span style={{ fontSize: 12, color: '#EC4899', fontWeight: 600 }}>
              Ver tips →
            </span>
          </div>

          {/* Estrés */}
          <div
            onClick={() => setView('tips-estres')}
            style={{
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.25)',
              borderRadius: 16,
              padding: 20,
              marginBottom: 12,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6, color: '#F59E0B' }}>
              Estrés
            </h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>
              5 estrategias prácticas para manejar la presión diaria
            </p>
            <span style={{ fontSize: 12, color: '#F59E0B', fontWeight: 600 }}>
              Ver tips →
            </span>
          </div>
        </div>

        {/* Agenda tu sesión */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(139,92,246,0.1))',
          border: '1px solid rgba(236,72,153,0.3)',
          borderRadius: 20,
          padding: 24,
          marginBottom: 24
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
            Agenda tu sesión
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 20 }}>
            1 sesión por semana, 50 minutos, con psicólogos titulados en México
          </p>
          <button
            onClick={() => setView('booking')}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
              border: 'none',
              borderRadius: 12,
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Agendar ahora
          </button>
        </div>

        {/* WhatsApp alternativo */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 16,
          padding: 20,
          textAlign: 'center'
        }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>
            ¿Prefieres agendar por WhatsApp?
          </p>
          <a
            href={generateWhatsAppLink(whatsappPhone, 'Hola, quiero agendar una sesión de terapia')}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(37,211,102,0.1)',
              border: '1px solid rgba(37,211,102,0.3)',
              color: '#25D366',
              padding: '10px 20px',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // VISTA: TIPS PAGES
  // ═══════════════════════════════════════════════════════════
  if (view.startsWith('tips-')) {
    const tipType = view.replace('tips-', '');
    let tips, title, color;

    if (tipType === 'ansiedad') {
      tips = ANXIETY_TIPS;
      title = 'Tips para la Ansiedad';
      color = '#06B6D4';
    } else if (tipType === 'relaciones') {
      tips = RELATIONSHIP_TIPS;
      title = 'Tips para las Relaciones';
      color = '#EC4899';
    } else {
      tips = STRESS_TIPS;
      title = 'Tips para el Estrés';
      color = '#F59E0B';
    }

    return (
      <div style={{
        minHeight: '100vh',
        background: '#111827',
        color: '#fff',
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        padding: '24px 16px',
        maxWidth: 430,
        margin: '0 auto'
      }}>
        
        {/* Back button */}
        <button
          onClick={() => setView('main')}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10,
            padding: '8px 16px',
            color: 'rgba(255,255,255,0.7)',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
          </svg>
          Volver
        </button>

        {/* Title */}
        <h1 style={{
          fontFamily: '"DM Serif Display", serif',
          fontSize: 28,
          marginBottom: 32,
          color
        }}>
          {title}
        </h1>

        {/* Tips list */}
        {tips.map((tip, idx) => (
          <div
            key={idx}
            style={{
              background: `${tip.color}15`,
              border: `1px solid ${tip.color}40`,
              borderRadius: 16,
              padding: 20,
              marginBottom: 16
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: tip.color }}>
              {idx + 1}. {tip.title}
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.75)' }}>
              {tip.desc}
            </p>
          </div>
        ))}

        {/* CTA */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 16,
          padding: 20,
          textAlign: 'center',
          marginTop: 32
        }}>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>
            ¿Necesitas hablar con alguien?
          </p>
          <button
            onClick={() => setView('booking')}
            style={{
              width: '100%',
              padding: '12px',
              background: `linear-gradient(135deg, ${color}, #8B5CF6)`,
              border: 'none',
              borderRadius: 12,
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Agendar sesión de terapia
          </button>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // VISTA: BOOKING
  // ═══════════════════════════════════════════════════════════
  if (view === 'booking') {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#111827',
        color: '#fff',
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        padding: '24px 16px',
        maxWidth: 430,
        margin: '0 auto'
      }}>
        
        {/* Back button */}
        <button
          onClick={() => setView('main')}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10,
            padding: '8px 16px',
            color: 'rgba(255,255,255,0.7)',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
          </svg>
          Volver
        </button>

        <h1 style={{
          fontFamily: '"DM Serif Display", serif',
          fontSize: 28,
          marginBottom: 8
        }}>
          Agenda tu sesión
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 32 }}>
          Selecciona psicólogo, fecha y hora
        </p>

        {/* Therapists */}
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
          1. Elige tu psicólogo
        </h2>
        {THERAPISTS.map((therapist) => (
          <div
            key={therapist.id}
            onClick={() => setBookingData({ ...bookingData, therapist: therapist.id })}
            style={{
              background: bookingData.therapist === therapist.id 
                ? `${therapist.color}20` 
                : 'rgba(255,255,255,0.04)',
              border: bookingData.therapist === therapist.id 
                ? `2px solid ${therapist.color}` 
                : '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16,
              padding: 16,
              marginBottom: 12,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: therapist.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                fontWeight: 700,
                color: '#fff',
                flexShrink: 0
              }}>
                {therapist.initial}
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
                  {therapist.name}
                </h3>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                  {therapist.experience} años de experiencia
                </p>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: 8 }}>
              {therapist.bio}
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {therapist.specialties.map(spec => (
                <span
                  key={spec}
                  style={{
                    fontSize: 11,
                    padding: '3px 10px',
                    borderRadius: 20,
                    background: `${therapist.color}30`,
                    color: therapist.color,
                    fontWeight: 600
                  }}
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Name */}
        {bookingData.therapist && (
          <>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, marginTop: 32 }}>
              2. ¿Quién va a la sesión?
            </h2>
            <input
              type="text"
              value={bookingData.name}
              onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
              placeholder="Nombre completo"
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                color: '#fff',
                fontSize: 14,
                fontFamily: 'inherit',
                marginBottom: 24
              }}
            />
          </>
        )}

        {/* Date */}
        {bookingData.name && (
          <>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
              3. Fecha
            </h2>
            <input
              type="date"
              value={bookingData.date}
              onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                color: '#fff',
                fontSize: 14,
                fontFamily: 'inherit',
                marginBottom: 24
              }}
            />
          </>
        )}

        {/* Time */}
        {bookingData.date && (
          <>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
              4. Hora
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 32 }}>
              {THERAPY_HOURS.map(hour => (
                <button
                  key={hour}
                  onClick={() => setBookingData({ ...bookingData, time: hour })}
                  style={{
                    padding: '12px',
                    background: bookingData.time === hour 
                      ? 'linear-gradient(135deg, #EC4899, #8B5CF6)' 
                      : 'rgba(255,255,255,0.06)',
                    border: bookingData.time === hour 
                      ? '1px solid #EC4899' 
                      : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    color: '#fff',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {hour}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Confirm button */}
        {bookingData.time && (
          <button
            onClick={() => setView('confirmation')}
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
              border: 'none',
              borderRadius: 12,
              color: '#fff',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Confirmar cita
          </button>
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // VISTA: CONFIRMATION
  // ═══════════════════════════════════════════════════════════
  if (view === 'confirmation') {
    const selectedTherapist = THERAPISTS.find(t => t.id === bookingData.therapist);
    
    return (
      <div style={{
        minHeight: '100vh',
        background: '#111827',
        color: '#fff',
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        padding: '24px 16px',
        maxWidth: 430,
        margin: '0 auto',
        textAlign: 'center'
      }}>
        
        {/* Success icon */}
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.2))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '40px auto 24px'
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>

        <h1 style={{
          fontFamily: '"DM Serif Display", serif',
          fontSize: 28,
          marginBottom: 12,
          color: '#10B981'
        }}>
          ¡Cita confirmada!
        </h1>

        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 32 }}>
          Recibirás un recordatorio por WhatsApp y email
        </p>

        {/* Booking details */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 16,
          padding: 24,
          marginBottom: 24,
          textAlign: 'left'
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
            Detalles de tu sesión
          </h2>
          <p style={{ fontSize: 14, marginBottom: 8 }}>
            <strong>Psicólogo:</strong> {selectedTherapist?.name}
          </p>
          <p style={{ fontSize: 14, marginBottom: 8 }}>
            <strong>Paciente:</strong> {bookingData.name}
          </p>
          <p style={{ fontSize: 14, marginBottom: 8 }}>
            <strong>Fecha:</strong> {new Date(bookingData.date).toLocaleDateString('es-MX', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p style={{ fontSize: 14 }}>
            <strong>Hora:</strong> {bookingData.time} hrs (Ciudad de México)
          </p>
        </div>

        {/* Actions */}
        <a
          href={generateWhatsAppLink(whatsappPhone, `Hola, confirmé mi cita de terapia para el ${bookingData.date} a las ${bookingData.time}`)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            width: '100%',
            padding: '14px',
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            borderRadius: 12,
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            textDecoration: 'none',
            marginBottom: 12
          }}
        >
          Confirmar por WhatsApp
        </a>

        <button
          onClick={() => {
            setView('main');
            setBookingData({ therapist: null, name: '', date: '', time: '' });
          }}
          style={{
            width: '100%',
            padding: '14px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 12,
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return null;
}
