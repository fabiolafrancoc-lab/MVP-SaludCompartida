'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          to: 'contact@saludcompartida.com',
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
        
        // Redirigir a registro después de 3 segundos
        setTimeout(() => {
          router.push('/registro-jan');
        }, 3000);
      }
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      alert('Hubo un error al enviar tu mensaje. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      backgroundColor: '#111827',
      color: 'white',
      minHeight: '100vh',
    }}>
      {/* HEADER */}
      <header style={{
        position: 'sticky',
        top: 0,
        backgroundColor: '#111827',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
      }}>
        <Link href="/">
          <Image 
            src="/saludcompartida-dark-no-tagline.png" 
            alt="SaludCompartida" 
            width={140}
            height={36}
            style={{ height: '36px', width: 'auto', cursor: 'pointer' }}
          />
        </Link>
        <Link href="/" style={{
          padding: '10px 14px',
          background: 'transparent',
          border: '2px solid #06B6D4',
          borderRadius: '10px',
          color: '#06B6D4',
          fontSize: '12px',
          fontWeight: '700',
          textDecoration: 'none',
        }}>← Volver al inicio</Link>
      </header>

      {/* CONTENIDO */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* TÍTULO */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: '32px',
            marginBottom: '12px',
          }}>Contáctanos</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px' }}>
            ¿Tienes dudas o comentarios? Estamos aquí para ayudarte.
          </p>
        </div>

        {/* MENSAJE DE ÉXITO */}
        {showSuccess && (
          <div style={{
            background: 'linear-gradient(135deg, #10B981, #059669)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '24px',
            textAlign: 'center',
            animation: 'fadeIn 0.3s ease-in',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>✓</div>
            <p style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>
              ¡Tu información ha sido enviada con éxito!
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>
              Te responderemos pronto.
            </p>
          </div>
        )}

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} style={{
          background: '#1F2937',
          borderRadius: '20px',
          padding: '32px 24px',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          
          {/* Nombre */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: 'rgba(255,255,255,0.9)',
            }}>
              Nombre completo <span style={{ color: '#EC4899' }}>*</span>
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
              }}
              placeholder="Juan García"
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: 'rgba(255,255,255,0.9)',
            }}>
              Correo electrónico <span style={{ color: '#EC4899' }}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
              }}
              placeholder="tu@email.com"
            />
          </div>

          {/* Teléfono */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: 'rgba(255,255,255,0.9)',
            }}>
              Teléfono (opcional)
            </label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
              }}
              placeholder="(555) 123-4567"
            />
          </div>

          {/* Mensaje */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: 'rgba(255,255,255,0.9)',
            }}>
              Comentarios o dudas <span style={{ color: '#EC4899' }}>*</span>
            </label>
            <textarea
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              required
              rows={6}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
              }}
              placeholder="Escribe aquí tus comentarios o dudas..."
            />
          </div>

          {/* Botón Enviar */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '16px 32px',
              background: isSubmitting 
                ? 'rgba(236,72,153,0.5)' 
                : 'linear-gradient(135deg, #EC4899, #DB2777)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '700',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              boxShadow: '0 8px 32px rgba(236,72,153,0.3)',
            }}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
          </button>

          <p style={{
            fontSize: '12px',
            color: 'rgba(255,255,255,0.5)',
            textAlign: 'center',
            marginTop: '16px',
          }}>
            También puedes escribirnos directamente a{' '}
            <a href="mailto:contact@saludcompartida.com" style={{ color: '#06B6D4', textDecoration: 'none' }}>
              contact@saludcompartida.com
            </a>
          </p>
        </form>

        {/* INFO ADICIONAL */}
        <div style={{
          marginTop: '40px',
          padding: '24px',
          background: 'rgba(6,182,212,0.1)',
          borderRadius: '16px',
          border: '1px solid rgba(6,182,212,0.2)',
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            marginBottom: '12px',
            color: '#06B6D4',
          }}>Horario de atención</h3>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>
            Lunes a Viernes: 9:00 AM - 6:00 PM (Hora del Centro)<br/>
            Te responderemos en menos de 24 horas.
          </p>
        </div>

      </div>
    </div>
  );
}
