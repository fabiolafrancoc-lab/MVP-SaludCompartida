'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import NewHeader from '@/components/landing/NewHeader';
import NewStickyFooter from '@/components/landing/NewStickyFooter';

export default function RegistroPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Form submission logic here
    setTimeout(() => {
      router.push('/pago');
    }, 1000);
  };

  return (
    <>
      <NewHeader />
      <div style={{ background: '#FFFFFF', minHeight: '100vh', paddingTop: '80px', paddingBottom: '120px' }}>
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Serif+Display&display=swap');

          .registro-hero {
            background: #FFFFFF;
            padding: 24px 20px 32px;
            text-align: center;
          }

          .hero-content {
            max-width: 800px;
            margin: 0 auto;
          }

          .hero-headline {
            font-family: 'DM Serif Display', serif;
            font-size: 28px;
            line-height: 1.3;
            color: #1F2937;
            margin-bottom: 8px;
          }

          .hero-headline .highlight {
            color: #06B6D4;
          }

          .hero-subheadline {
            font-size: 16px;
            color: #4B5563;
            margin-bottom: 24px;
          }

          .commitment-card {
            background: linear-gradient(135deg, #1F2937, #374151);
            border-radius: 20px;
            padding: 24px;
            margin-bottom: 24px;
            text-align: center;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
          }

          .commitment-icon {
            width: 40px;
            height: 40px;
            margin: 0 auto 12px;
            color: #EC4899;
          }

          .commitment-text {
            font-size: 15px;
            line-height: 1.5;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 16px;
          }

          .commitment-text strong {
            color: #06B6D4;
          }

          .limit-box {
            background: rgba(6, 182, 212, 0.15);
            border: 1px solid rgba(6, 182, 212, 0.3);
            border-radius: 12px;
            padding: 16px 20px;
            margin-bottom: 12px;
          }

          .limit-number {
            font-family: 'DM Serif Display', serif;
            font-size: 32px;
            color: #06B6D4;
            line-height: 1.2;
            margin-bottom: 4px;
          }

          .limit-detail {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
          }

          .limit-detail strong {
            color: #F59E0B;
          }

          .commitment-why {
            font-size: 13px;
            color: rgba(255, 255, 255, 0.6);
            font-style: italic;
          }

          .registro-container {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px 40px;
          }

          @media (min-width: 900px) {
            .registro-container {
              grid-template-columns: 1fr 380px;
              gap: 40px;
            }
          }

          .form-section {
            background: #FFFFFF;
          }

          .form-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 24px;
          }

          .form-header-icon {
            width: 48px;
            height: 48px;
            background: rgba(6, 182, 212, 0.1);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #06B6D4;
          }

          .form-header-text h2 {
            font-size: 20px;
            font-weight: 700;
            color: #1F2937;
            margin-bottom: 2px;
          }

          .form-header-text p {
            font-size: 14px;
            color: #4B5563;
          }

          .form-group {
            margin-bottom: 20px;
          }

          .form-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }

          @media (max-width: 600px) {
            .form-row {
              grid-template-columns: 1fr;
            }
          }

          .form-label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: #1F2937;
            margin-bottom: 6px;
          }

          .form-label .optional {
            color: #4B5563;
            font-weight: 400;
            font-size: 12px;
          }

          .form-label .required {
            color: #EC4899;
          }

          .form-input {
            width: 100%;
            padding: 14px 16px;
            border: 1px solid #E5E7EB;
            border-radius: 10px;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 15px;
            color: #1F2937;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
          }

          .form-input:focus {
            outline: none;
            border-color: #06B6D4;
            box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
          }

          .form-input::placeholder {
            color: #9CA3AF;
          }

          .form-select {
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 12px center;
            background-size: 20px;
            padding-right: 40px;
          }

          .form-hint {
            font-size: 12px;
            color: #4B5563;
            margin-top: 6px;
          }

          .form-hint.lupita {
            color: #EC4899;
          }

          .whatsapp-field {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 6px;
          }

          .whatsapp-icon {
            color: #25D366;
          }

          .phone-input-wrapper {
            display: flex;
            align-items: center;
            border: 1px solid #E5E7EB;
            border-radius: 10px;
            overflow: hidden;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
          }

          .phone-input-wrapper:focus-within {
            border-color: #06B6D4;
            box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
          }

          .phone-flag {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 14px 12px;
            background: #F9FAFB;
            border-right: 1px solid #E5E7EB;
            font-size: 14px;
          }

          .phone-input {
            flex: 1;
            border: none;
            padding: 14px 16px;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 15px;
            color: #1F2937;
          }

          .phone-input:focus {
            outline: none;
          }

          .form-divider {
            height: 1px;
            background: #E5E7EB;
            margin: 32px 0;
          }

          .family-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 24px;
          }

          .family-header-icon {
            width: 48px;
            height: 48px;
            background: rgba(236, 72, 153, 0.1);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #EC4899;
          }

          .info-voluntaria {
            font-size: 12px;
            color: #EC4899;
            margin-bottom: 16px;
          }

          .submit-button {
            width: 100%;
            padding: 18px 24px;
            background: linear-gradient(135deg, #06B6D4, #EC4899);
            border: none;
            border-radius: 14px;
            color: #FFFFFF;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            margin-top: 32px;
          }

          .submit-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(6, 182, 212, 0.3);
          }

          .submit-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .benefits-sidebar {
            display: none;
          }

          @media (min-width: 900px) {
            .benefits-sidebar {
              display: block;
              position: sticky;
              top: 100px;
            }
          }

          .image-card {
            border-radius: 20px;
            overflow: hidden;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }

          .benefit-card {
            background: #F9FAFB;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 16px;
            display: flex;
            align-items: flex-start;
            gap: 16px;
          }

          .benefit-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .benefit-icon.tele {
            background: rgba(6, 182, 212, 0.15);
            color: #06B6D4;
          }

          .benefit-icon.farma {
            background: rgba(249, 115, 22, 0.15);
            color: #F97316;
          }

          .benefit-icon.terapia {
            background: rgba(236, 72, 153, 0.15);
            color: #EC4899;
          }

          .benefit-icon.ahorro {
            background: rgba(16, 185, 129, 0.15);
            color: #10B981;
          }

          .benefit-text h3 {
            font-size: 15px;
            font-weight: 600;
            color: #1F2937;
            margin-bottom: 4px;
          }

          .benefit-text p {
            font-size: 13px;
            color: #4B5563;
            line-height: 1.4;
          }

          .sidebar-section-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #4B5563;
            margin-bottom: 12px;
            padding-left: 4px;
          }

          .pillar-5-card {
            background: linear-gradient(135deg, #1F2937, #1a1a2e);
            border-radius: 20px;
            padding: 28px 24px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }

          .pillar-5-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #EC4899, #06B6D4);
          }

          .pillar-5-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #EC4899;
            margin-bottom: 16px;
          }

          .pillar-5-avatars {
            display: flex;
            justify-content: center;
            margin-bottom: 12px;
          }

          .p5-avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 18px;
            color: white;
            border: 3px solid #1F2937;
          }

          .p5-avatar.lupita {
            background: linear-gradient(135deg, #EC4899, #9333EA);
            z-index: 2;
          }

          .p5-avatar.fernanda {
            background: linear-gradient(135deg, #06B6D4, #0891B2);
            margin-left: -12px;
            z-index: 1;
          }

          .pillar-5-title {
            font-family: 'DM Serif Display', serif;
            font-size: 24px;
            color: #FFFFFF;
            margin-bottom: 12px;
          }

          .pillar-5-text {
            font-size: 14px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 16px;
          }

          .pillar-5-text strong {
            color: #06B6D4;
          }

          .pillar-5-quote {
            font-size: 13px;
            font-style: italic;
            color: rgba(255, 255, 255, 0.6);
            padding: 12px 16px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            border-left: 3px solid #EC4899;
          }
        `}</style>

        {/* Hero Section */}
        <section className="registro-hero">
          <div className="hero-content">
            <h1 className="hero-headline">
              Estás a un paso de cuidar a <span className="highlight">tu familia</span>
            </h1>
            <p className="hero-subheadline">
              Estamos donde está tu corazón.
            </p>

            <div className="commitment-card">
              <div className="commitment-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <p className="commitment-text">
                Queremos hacer las cosas <strong>bien</strong>.<br/>
                Conocer a cada familia. Escuchar sus historias.
              </p>
              <div className="limit-box">
                <div className="limit-number">100 familias</div>
                <div className="limit-detail">es todo lo que podemos aceptar hasta el <strong>20 de febrero</strong></div>
              </div>
              <p className="commitment-why">
                Porque ustedes merecen atención, no solo un número.
              </p>
            </div>
          </div>
        </section>

        {/* Main Container */}
        <div className="registro-container">
          {/* Form Section */}
          <div className="form-section">
            <form onSubmit={handleSubmit}>
              {/* Migrant Data */}
              <div className="form-header">
                <div className="form-header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="form-header-text">
                  <h2>Tus Datos</h2>
                  <p>Información del migrante en EE.UU.</p>
                </div>
              </div>

              <div className="form-group">
                <div className="form-row">
                  <div>
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-input" placeholder="María" required />
                  </div>
                  <div>
                    <label className="form-label">Apellido Paterno</label>
                    <input type="text" className="form-input" placeholder="García" required />
                  </div>
                  <div>
                    <label className="form-label">Apellido Materno <span className="required">*</span></label>
                    <input type="text" className="form-input" placeholder="López" />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div>
                    <label className="form-label">Sexo</label>
                    <select className="form-input form-select" required>
                      <option value="">Selecciona</option>
                      <option value="F">Femenino</option>
                      <option value="M">Masculino</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Fecha de Nacimiento</label>
                    <input type="date" className="form-input" required />
                    <p className="form-hint lupita">Para que Lupita o Fernanda te conozcan mejor</p>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Correo Electrónico</label>
                <input type="email" className="form-input" placeholder="maria.garcia@email.com" required />
              </div>

              <div className="form-group">
                <label className="form-label whatsapp-field">
                  Proporcónanos tu WhatsApp (Estados Unidos)
                  <svg className="whatsapp-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </label>
                <div className="phone-input-wrapper">
                  <div className="phone-flag">🇺🇸</div>
                  <input type="tel" className="phone-input" placeholder="+13051234567 o 3051234567" required />
                </div>
                <p className="form-hint">Puedes escribir con + o sin +. Ej: +13051234567 • Tu código será enviado aquí</p>
              </div>

              <div className="form-divider"></div>

              {/* Family Data */}
              <div className="family-header">
                <div className="family-header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className="form-header-text">
                  <h2>Datos de Tu Familiar</h2>
                  <p>Información del familiar en México que recibirá los beneficios</p>
                </div>
              </div>

              <div className="form-group">
                <div className="form-row">
                  <div>
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-input" placeholder="Rosa" required />
                  </div>
                  <div>
                    <label className="form-label">Apellido Paterno</label>
                    <input type="text" className="form-input" placeholder="Hernández" required />
                  </div>
                  <div>
                    <label className="form-label">Apellido Materno <span className="required">*</span></label>
                    <input type="text" className="form-input" placeholder="Pérez" />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div>
                    <label className="form-label">Sexo</label>
                    <select className="form-input form-select" required>
                      <option value="">Selecciona</option>
                      <option value="F">Femenino</option>
                      <option value="M">Masculino</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Fecha de Nacimiento</label>
                    <input type="date" className="form-input" required />
                    <p className="form-hint lupita">Para que Lupita o Fernanda la conozcan mejor</p>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Correo Electrónico <span className="optional">(opcional)</span></label>
                <input type="email" className="form-input" placeholder="rosa.hernandez@email.com" />
                <p className="form-hint">Si tu familiar tiene email, lo usaremos para enviarle su código de acceso</p>
              </div>

              <p className="info-voluntaria">* Información Voluntaria</p>

              <div className="form-group">
                <label className="form-label whatsapp-field">
                  Proporcónanos su WhatsApp (México)
                  <svg className="whatsapp-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </label>
                <div className="phone-input-wrapper">
                  <div className="phone-flag">🇲🇽</div>
                  <input type="tel" className="phone-input" placeholder="+525551234567 o 5551234567" required />
                </div>
                <p className="form-hint">Puedes escribir con + o sin +. Ej: +525551234567 • Su código será enviado aquí</p>
              </div>

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Procesando...' : 'Suscribirme Ahora'}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </form>
          </div>

          {/* Benefits Sidebar */}
          <aside className="benefits-sidebar">
            <div className="image-card">
              <Image 
                src="/girl_3.jpeg" 
                alt="Niña estudiando en el colegio" 
                width={380} 
                height={380}
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>

            <div className="sidebar-section-label">Lo que recibe tu familia</div>
            
            <div className="benefit-card">
              <div className="benefit-icon tele">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="benefit-text">
                <h3>Doctor 24/7</h3>
                <p>Sin esperas. Con receta electrónica.</p>
              </div>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon farma">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
              </div>
              <div className="benefit-text">
                <h3>Farmacias</h3>
                <p>40-75% descuento en 1,700+ ubicaciones</p>
              </div>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon terapia">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <line x1="9" y1="9" x2="9.01" y2="9"/>
                  <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
              </div>
              <div className="benefit-text">
                <h3>Terapia Semanal</h3>
                <p>Especialista en salud mental</p>
              </div>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon ahorro">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div className="benefit-text">
                <h3>Tus Ahorros</h3>
                <p>Ve cuánto ahorra tu familia en tiempo real</p>
              </div>
            </div>

            <div className="pillar-5-card">
              <div className="pillar-5-label">Porque la distancia duele</div>
              <div className="pillar-5-avatars">
                <div className="p5-avatar lupita">L</div>
                <div className="p5-avatar fernanda">F</div>
              </div>
              <h3 className="pillar-5-title">Lupita y Fernanda</h3>
              <p className="pillar-5-text">
                No es salud. Es <strong>compañía</strong>.<br/>
                Para que tu mamá tenga con quién hablar cuando tú no puedes llamar.
              </p>
              <div className="pillar-5-quote">
                "Ya están hasta intercambiando recetas"
              </div>
            </div>
          </aside>
        </div>
      </div>
      <NewStickyFooter />
    </>
  );
}
