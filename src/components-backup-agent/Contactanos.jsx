'use client';

import { useState } from 'react';
import { generateWhatsAppLink } from '@/utils/waE164';

export default function Contactanos({ userType = 'mexico' }) {
  const [view, setView] = useState('form'); // 'form' | 'confirmation'
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Tengo un problema con mi servicio',
    'Necesito ayuda con mi cuenta',
    'Quiero cambiar mis datos',
    'Tengo una duda sobre los descuentos',
    'Quiero dar de baja mi servicio',
    'Quiero agregar o quitar un familiar',
    'Tengo una sugerencia',
    'Otro tema'
  ];

  // WhatsApp según userType
  const whatsappPhone = userType === 'migrant' ? '+13055227150' : '+525512345678'; // TODO: Agregar número México
  const whatsappMessage = `Hola, necesito ayuda con: ${formData.category || 'mi cuenta'}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Conectar con Resend o backend
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          userType,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setView('confirmation');
      } else {
        alert('Hubo un error. Intenta de nuevo o escríbenos por WhatsApp.');
      }
    } catch (error) {
      console.error('Error enviando formulario:', error);
      alert('Hubo un error. Intenta de nuevo o escríbenos por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (view === 'confirmation') {
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
        {/* Success state */}
        <div style={{ textAlign: 'center', paddingTop: 60 }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.2))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>

          <h1 style={{
            fontFamily: '"DM Serif Display", serif',
            fontSize: 28,
            marginBottom: 16,
            color: '#06B6D4'
          }}>
            ¡Mensaje recibido!
          </h1>

          <p style={{ 
            fontSize: 15, 
            lineHeight: 1.6, 
            color: 'rgba(255,255,255,0.7)',
            marginBottom: 32
          }}>
            Gracias por escribirnos. Te responderemos en las próximas <strong style={{ color: '#10B981' }}>24 horas</strong> por email o WhatsApp.
          </p>

          {/* WhatsApp urgente */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 16,
            padding: 20,
            marginBottom: 24
          }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>
              ¿Es urgente?
            </p>
            <a
              href={generateWhatsAppLink(whatsappPhone, whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Escríbenos por WhatsApp
            </a>
          </div>

          <button
            onClick={() => {
              setView('form');
              setFormData({ category: '', name: '', email: '', phone: '', message: '' });
            }}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff',
              padding: '12px 32px',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Enviar otro mensaje
          </button>
        </div>
      </div>
    );
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
      
      {/* Header con logo */}
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
          color: '#06B6D4'
        }}>
          ¿En qué te ayudamos?
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
          {userType === 'migrant' 
            ? 'Estamos para ti, siempre' 
            : 'Estamos contigo, donde está tu corazón'}
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        
        {/* Categoría */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ 
            display: 'block', 
            fontSize: 13, 
            fontWeight: 600, 
            marginBottom: 8,
            color: 'rgba(255,255,255,0.8)'
          }}>
            ¿De qué se trata?
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '14px 16px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              color: '#fff',
              fontSize: 14,
              fontFamily: 'inherit'
            }}
          >
            <option value="">Selecciona una opción</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Nombre */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ 
            display: 'block', 
            fontSize: 13, 
            fontWeight: 600, 
            marginBottom: 8,
            color: 'rgba(255,255,255,0.8)'
          }}>
            Tu nombre
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Cómo te llamamos"
            required
            style={{
              width: '100%',
              padding: '14px 16px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              color: '#fff',
              fontSize: 14,
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ 
            display: 'block', 
            fontSize: 13, 
            fontWeight: 600, 
            marginBottom: 8,
            color: 'rgba(255,255,255,0.8)'
          }}>
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Para responderte"
            required
            style={{
              width: '100%',
              padding: '14px 16px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              color: '#fff',
              fontSize: 14,
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Teléfono */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ 
            display: 'block', 
            fontSize: 13, 
            fontWeight: 600, 
            marginBottom: 8,
            color: 'rgba(255,255,255,0.8)'
          }}>
            Teléfono
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder={userType === 'migrant' ? '(305) 555-1234' : '55 1234 5678'}
            style={{
              width: '100%',
              padding: '14px 16px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              color: '#fff',
              fontSize: 14,
              fontFamily: 'inherit'
            }}
          />
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>
            {userType === 'migrant' ? '+1 305 522 7150' : '+52 número México'}
          </p>
        </div>

        {/* Mensaje */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ 
            display: 'block', 
            fontSize: 13, 
            fontWeight: 600, 
            marginBottom: 8,
            color: 'rgba(255,255,255,0.8)'
          }}>
            Cuéntanos más
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Escribe aquí los detalles..."
            required
            rows={5}
            style={{
              width: '100%',
              padding: '14px 16px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              color: '#fff',
              fontSize: 14,
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Botón enviar */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '16px',
            background: isSubmitting 
              ? 'rgba(255,255,255,0.1)' 
              : 'linear-gradient(135deg, #06B6D4, #EC4899)',
            border: 'none',
            borderRadius: 12,
            color: '#fff',
            fontSize: 16,
            fontWeight: 700,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'transform 0.2s',
            marginBottom: 16
          }}
          onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
        </button>

        {/* WhatsApp alternativo */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 16,
          padding: 20,
          textAlign: 'center'
        }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>
            ¿Prefieres hablar directamente?
          </p>
          <a
            href={generateWhatsAppLink(whatsappPhone, whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(37,211,102,0.1)',
              border: '1px solid rgba(37,211,102,0.3)',
              color: '#25D366',
              padding: '12px 24px',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(37,211,102,0.15)';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(37,211,102,0.1)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp directo
          </a>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 12 }}>
            Email: <strong>contact@saludcompartida.com</strong>
          </p>
        </div>
      </form>
    </div>
  );
}
