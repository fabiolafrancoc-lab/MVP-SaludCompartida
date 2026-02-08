import React, { useState } from 'react';

const SessionSection = ({ migrante = "Migrante" }) => {
  const [formData, setFormData] = useState({ nombre: '', fecha: '', hora: '' });
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmed(true);
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}>
        
        <h2 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#1F2937',
          marginBottom: '16px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          Sesión Semanal
        </h2>

        <p style={{
          fontSize: '18px',
          color: '#6B7280',
          marginBottom: '32px',
          lineHeight: '1.6',
        }}>
          <strong>{migrante}</strong> te entrega este regalo porque así como quiere que estés sana por fuera, también quiere que estés bien por dentro.
        </p>

        {/* Videos */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
          <video 
            src="/mentalhealth.jpeg" 
            poster="/mentalhealth.jpeg"
            controls 
            style={{ width: '50%', borderRadius: '12px', objectFit: 'cover' }}
          />
          <video 
            src="/momhappy.jpeg"
            poster="/momhappy.jpeg" 
            controls 
            style={{ width: '50%', borderRadius: '12px', objectFit: 'cover' }}
          />
        </div>

        {/* Profesionales */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', justifyContent: 'center' }}>
          <img src="/psycho1.jpeg" alt="Profesional" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }} />
          <img src="/psycho2.jpeg" alt="Profesional" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }} />
          <img src="/psycho3.jpeg" alt="Profesional" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }} />
          <img src="/psycho4.jpeg" alt="Profesional" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }} />
        </div>

        {/* Formulario */}
        {!confirmed ? (
          <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
            <input
              type="text"
              placeholder="Tu nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '16px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                fontSize: '16px',
              }}
            />
            <input
              type="date"
              value={formData.fecha}
              onChange={(e) => setFormData({...formData, fecha: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '16px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                fontSize: '16px',
              }}
            />
            <input
              type="time"
              value={formData.hora}
              onChange={(e) => setFormData({...formData, hora: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '16px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                fontSize: '16px',
              }}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #EC4899, #DB2777)',
                color: '#FFFFFF',
                fontSize: '18px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Reservar Sesión
            </button>
          </form>
        ) : (
          <div style={{
            background: '#F0FDF4',
            padding: '24px',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#10B981', marginBottom: '8px' }}>
              ✓ Sesión Confirmada
            </h3>
            <p style={{ fontSize: '16px', color: '#6B7280' }}>
              {formData.nombre}, tu sesión está agendada para el {formData.fecha} a las {formData.hora}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default SessionSection;
