/**
 * 🏠 HOMEPAGE PRINCIPAL → saludcompartida.app/
 * 
 * Landing page con FONDO OSCURO (dark background: #111827)
 * Mobile-first: 375px base → 768px tablet → 1024px desktop
 * Hero split: Imagen izquierda + Formulario derecha
 * Form action: GET /subscribe
 * 
 * @route / (URL raíz del sitio)
 * @created 2026-01-27
 * @status ACTIVO - Diseño oscuro correcto
 */

'use client';

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const scrollToForm = () => {
    const formEl = document.querySelector('.form-input');
    if (formEl) {
      formEl.focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <style jsx global>{`
        :root {
          --cyan: #06B6D4;
          --cyan-dark: #0891B2;
          --magenta: #EC4899;
          --magenta-dark: #DB2777;
          --gray-900: #111827;
          --gray-800: #1F2937;
          --gray-700: #374151;
          --gray-600: #4B5563;
          --gray-100: #F3F4F6;
          --white: #FFFFFF;
          --orange: #F59E0B;
          --orange-dark: #D97706;
          --green: #10B981;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: var(--gray-900);
          color: var(--white);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          line-height: 1.6;
        }

        /* ===== HEADER ===== */
        .header {
          padding: 16px 24px;
          display: flex;
          justify-content: flex-start;
          background: rgba(17, 24, 39, 0.95);
          backdrop-filter: blur(10px);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .logo-img {
          height: 40px;
          width: auto;
        }

        /* ===== HERO SECTION - SPLIT ===== */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding-top: 72px;
        }

        @media (min-width: 1024px) {
          .hero {
            flex-direction: row;
          }
        }

        /* Left side - Image */
        .hero-image {
          position: relative;
          min-height: 50vh;
          background: linear-gradient(135deg, var(--gray-800), var(--gray-900));
          overflow: hidden;
        }

        @media (min-width: 1024px) {
          .hero-image {
            width: 50%;
            min-height: calc(100vh - 72px);
          }
        }

        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
        }

        .hero-image::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, rgba(17,24,39,0.3) 0%, rgba(17,24,39,0.7) 100%);
        }

        .hero-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 40px 24px;
          z-index: 2;
        }

        .hero-welcome {
          display: inline-block;
          background: rgba(6, 182, 212, 0.2);
          border: 1px solid rgba(6, 182, 212, 0.4);
          padding: 8px 20px;
          border-radius: 24px;
          font-size: 13px;
          color: var(--cyan);
          margin-bottom: 16px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .hero-headline {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(28px, 5vw, 40px);
          line-height: 1.2;
          color: var(--white);
          text-shadow: 0 2px 20px rgba(0,0,0,0.5);
        }

        .hero-headline .highlight {
          color: var(--cyan);
        }

        /* Right side - Form */
        .hero-form {
          padding: 40px 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: var(--gray-900);
        }

        @media (min-width: 1024px) {
          .hero-form {
            width: 50%;
            padding: 60px 80px;
          }
        }

        .form-container {
          max-width: 440px;
          margin: 0 auto;
          width: 100%;
        }

        /* Community message */
        .community-message {
          background: linear-gradient(135deg, rgba(236,72,153,0.06), rgba(6,182,212,0.06));
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
          text-align: center;
        }

        .community-message p {
          font-size: 16px;
          color: rgba(255,255,255,0.9);
          line-height: 1.7;
        }

        .community-message strong {
          color: var(--cyan);
        }

        .community-message .magenta {
          color: var(--magenta);
          font-weight: 600;
        }

        /* FOMO Counter */
        .fomo-counter {
          background: linear-gradient(135deg, var(--orange), var(--orange-dark));
          border-radius: 16px;
          padding: 20px 24px;
          margin-bottom: 28px;
          text-align: center;
        }

        .fomo-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255,255,255,0.9);
          margin-bottom: 8px;
        }

        .fomo-numbers {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .fomo-current {
          font-family: 'DM Serif Display', serif;
          font-size: 48px;
          color: var(--white);
          line-height: 1;
        }

        .fomo-separator {
          font-size: 28px;
          color: rgba(255,255,255,0.5);
        }

        .fomo-total {
          font-size: 28px;
          color: rgba(255,255,255,0.7);
        }

        .fomo-deadline {
          font-size: 14px;
          color: rgba(255,255,255,0.85);
        }

        .fomo-deadline strong {
          color: var(--white);
        }

        /* Form */
        .form-intro {
          margin-bottom: 20px;
        }

        .form-title {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          color: var(--white);
          margin-bottom: 8px;
        }

        .form-subtitle {
          font-size: 15px;
          color: rgba(255,255,255,0.6);
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.8);
          margin-bottom: 8px;
        }

        .form-input {
          width: 100%;
          padding: 14px 16px;
          background: var(--gray-800);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          font-size: 16px;
          color: var(--white);
          font-family: inherit;
          transition: all 0.2s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--cyan);
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.2);
        }

        .form-input::placeholder {
          color: rgba(255,255,255,0.3);
        }

        .phone-group {
          display: flex;
          gap: 8px;
        }

        .country-code {
          width: 85px;
          padding: 14px 10px;
          background: var(--gray-800);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          font-size: 15px;
          color: var(--white);
          text-align: center;
        }

        .submit-btn {
          width: 100%;
          padding: 16px 24px;
          background: linear-gradient(135deg, var(--cyan), var(--cyan-dark));
          border: none;
          border-radius: 12px;
          font-size: 17px;
          font-weight: 700;
          color: var(--white);
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 8px;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(6, 182, 212, 0.4);
        }

        .submit-btn .subtext {
          display: block;
          font-size: 13px;
          font-weight: 400;
          opacity: 0.9;
          margin-top: 4px;
        }

        .trust-row {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: rgba(255,255,255,0.5);
        }

        .trust-item svg {
          width: 14px;
          height: 14px;
          color: var(--green);
        }

        /* ===== 4 PILLARS SECTION ===== */
        .pillars {
          padding: 80px 24px;
          background: var(--gray-800);
        }

        .pillars-content {
          max-width: 1000px;
          margin: 0 auto;
        }

        .section-label {
          display: inline-block;
          background: rgba(6, 182, 212, 0.15);
          border: 1px solid rgba(6, 182, 212, 0.3);
          padding: 8px 20px;
          border-radius: 24px;
          font-size: 12px;
          color: var(--cyan);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
        }

        .pillars-headline {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(28px, 5vw, 42px);
          line-height: 1.2;
          margin-bottom: 16px;
        }

        .pillars-headline .cyan { color: var(--cyan); }
        .pillars-headline .magenta { color: var(--magenta); }

        .pillars-subheadline {
          font-size: 18px;
          color: rgba(255,255,255,0.7);
          margin-bottom: 48px;
          max-width: 600px;
        }

        .pillars-grid {
          display: grid;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .pillars-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .pillar-card {
          background: var(--gray-900);
          border-radius: 20px;
          padding: 32px;
          border: 1px solid rgba(255,255,255,0.05);
          transition: all 0.3s ease;
        }

        .pillar-card:hover {
          border-color: rgba(6, 182, 212, 0.3);
          transform: translateY(-4px);
        }

        .pillar-number {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--cyan), var(--magenta));
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
          margin-bottom: 20px;
        }

        .pillar-title {
          font-family: 'DM Serif Display', serif;
          font-size: 24px;
          margin-bottom: 12px;
        }

        .pillar-description {
          font-size: 15px;
          color: rgba(255,255,255,0.7);
          line-height: 1.6;
        }

        .pillar-stat {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .pillar-stat-number {
          font-family: 'DM Serif Display', serif;
          font-size: 32px;
          color: var(--cyan);
        }

        .pillar-stat-label {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
        }

        /* ===== THE BRIDGE - LONELINESS ===== */
        .bridge {
          padding: 80px 24px;
          background: linear-gradient(180deg, var(--gray-900) 0%, var(--gray-800) 100%);
          text-align: center;
        }

        .bridge-content {
          max-width: 700px;
          margin: 0 auto;
        }

        .bridge-intro {
          font-size: 18px;
          color: rgba(255,255,255,0.6);
          margin-bottom: 24px;
        }

        .bridge-headline {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(28px, 5vw, 40px);
          line-height: 1.3;
          margin-bottom: 32px;
        }

        .bridge-headline .magenta {
          color: var(--magenta);
        }

        .bridge-subtext {
          font-size: 17px;
          color: rgba(255,255,255,0.8);
          line-height: 1.7;
          margin-bottom: 48px;
        }

        /* ===== LUPITA & FERNANDA SECTION ===== */
        .companions {
          padding: 80px 24px;
          background: var(--gray-800);
        }

        .companions-content {
          max-width: 1100px;
          margin: 0 auto;
        }

        .companions-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .companions-label {
          display: inline-block;
          background: rgba(236, 72, 153, 0.15);
          border: 1px solid rgba(236, 72, 153, 0.3);
          padding: 8px 20px;
          border-radius: 24px;
          font-size: 12px;
          color: var(--magenta);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
        }

        .companions-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(28px, 5vw, 42px);
          margin-bottom: 16px;
        }

        .companions-subtitle {
          font-size: 18px;
          color: rgba(255,255,255,0.7);
          max-width: 600px;
          margin: 0 auto;
        }

        /* Companion cards */
        .companion-cards {
          display: grid;
          gap: 32px;
          margin-bottom: 48px;
        }

        @media (min-width: 768px) {
          .companion-cards {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .companion-card {
          background: var(--gray-900);
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .companion-card.lupita {
          border-color: rgba(236, 72, 153, 0.2);
        }

        .companion-card.fernanda {
          border-color: rgba(6, 182, 212, 0.2);
        }

        .companion-image {
          height: 280px;
          background: var(--gray-700);
          position: relative;
          overflow: hidden;
        }

        .companion-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .companion-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(10px);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }

        .companion-card.lupita .companion-badge {
          color: var(--magenta);
        }

        .companion-card.fernanda .companion-badge {
          color: var(--cyan);
        }

        .companion-body {
          padding: 28px;
        }

        .companion-name {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          margin-bottom: 8px;
        }

        .companion-for {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          margin-bottom: 16px;
        }

        .companion-description {
          font-size: 15px;
          color: rgba(255,255,255,0.8);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .companion-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .companion-features span {
          background: rgba(255,255,255,0.05);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          color: rgba(255,255,255,0.7);
        }

        /* ===== TESTIMONIALS - VISUAL ===== */
        .testimonials {
          padding: 80px 24px;
          background: var(--gray-900);
        }

        .testimonials-content {
          max-width: 1100px;
          margin: 0 auto;
        }

        .testimonials-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .testimonials-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(28px, 5vw, 38px);
          margin-bottom: 16px;
        }

        .testimonials-grid {
          display: grid;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .testimonial-card {
          background: var(--gray-800);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .testimonial-card.featured {
          border-color: rgba(236, 72, 153, 0.3);
        }

        .testimonial-image {
          height: 200px;
          background: var(--gray-700);
          position: relative;
          overflow: hidden;
        }

        .testimonial-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .testimonial-tag {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: rgba(236, 72, 153, 0.9);
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .testimonial-body {
          padding: 24px;
        }

        .testimonial-quote {
          font-size: 15px;
          color: rgba(255,255,255,0.9);
          line-height: 1.6;
          margin-bottom: 20px;
          font-style: italic;
        }

        .testimonial-quote::before {
          content: '"';
          color: var(--magenta);
          font-size: 24px;
          font-style: normal;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .author-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--cyan), var(--magenta));
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
        }

        .author-name {
          font-weight: 600;
          font-size: 14px;
        }

        .author-location {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
        }

        /* ===== PRICING SECTION ===== */
        .pricing {
          padding: 80px 24px;
          background: linear-gradient(180deg, var(--gray-800) 0%, var(--gray-900) 100%);
          text-align: center;
        }

        .pricing-content {
          max-width: 500px;
          margin: 0 auto;
        }

        .pricing-box {
          background: linear-gradient(135deg, rgba(6,182,212,0.1), rgba(236,72,153,0.08));
          border: 2px solid rgba(6, 182, 212, 0.3);
          border-radius: 24px;
          padding: 40px 32px;
          margin-bottom: 32px;
        }

        .pricing-label {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          margin-bottom: 16px;
        }

        .pricing-amount {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .pricing-currency {
          font-size: 28px;
          color: rgba(255,255,255,0.7);
        }

        .pricing-number {
          font-family: 'DM Serif Display', serif;
          font-size: 72px;
          color: var(--cyan);
          line-height: 1;
        }

        .pricing-period {
          font-size: 18px;
          color: rgba(255,255,255,0.6);
        }

        .pricing-daily {
          font-size: 16px;
          color: var(--orange);
          font-weight: 600;
          margin-bottom: 24px;
        }

        .pricing-includes {
          text-align: left;
          padding: 24px;
          background: rgba(0,0,0,0.2);
          border-radius: 16px;
        }

        .pricing-includes-title {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255,255,255,0.5);
          margin-bottom: 16px;
        }

        .pricing-includes-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pricing-includes-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: rgba(255,255,255,0.85);
        }

        .pricing-includes-item svg {
          width: 20px;
          height: 20px;
          color: var(--green);
          flex-shrink: 0;
        }

        .cta-final {
          display: inline-block;
          padding: 18px 48px;
          background: linear-gradient(135deg, var(--magenta), var(--magenta-dark));
          border-radius: 14px;
          font-size: 18px;
          font-weight: 700;
          color: var(--white);
          text-decoration: none;
          transition: all 0.3s ease;
          margin-bottom: 16px;
          cursor: pointer;
          border: none;
        }

        .cta-final:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(236, 72, 153, 0.4);
        }

        .guarantee {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 14px;
          color: rgba(255,255,255,0.5);
        }

        .guarantee svg {
          width: 18px;
          height: 18px;
          color: var(--green);
        }

        /* ===== FINAL FOMO ===== */
        .final-fomo {
          padding: 60px 24px;
          background: linear-gradient(135deg, var(--orange), var(--orange-dark));
          text-align: center;
        }

        .final-fomo-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .final-fomo-headline {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(24px, 4vw, 32px);
          margin-bottom: 12px;
        }

        .final-fomo-numbers {
          font-size: 18px;
          margin-bottom: 24px;
        }

        .final-fomo-numbers strong {
          font-size: 24px;
        }

        .cta-white {
          display: inline-block;
          padding: 16px 40px;
          background: var(--white);
          border-radius: 12px;
          font-size: 17px;
          font-weight: 700;
          color: var(--orange-dark);
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
        }

        .cta-white:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }

        /* ===== FOOTER ===== */
        .footer {
          padding: 48px 24px 32px;
          background: var(--gray-900);
          text-align: center;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .footer-logo {
          height: 36px;
          width: auto;
          margin-bottom: 16px;
          opacity: 0.7;
        }

        .footer-text {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          margin-bottom: 8px;
        }

        .footer-tagline {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          margin-bottom: 24px;
          font-style: italic;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }

        .footer-links a {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-links a:hover {
          color: var(--cyan);
        }

        .footer-copyright {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          margin-top: 16px;
        }
      `}</style>

      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      {/* Header */}
      <header className="header">
        <img src="/saludcompartida-dark-no-tagline.png" alt="SaludCompartida" className="logo-img" />
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-image">
          <img src="https://saludcompartida.app/girl_3.jpeg" alt="Tu familia en México" />
          <div className="hero-overlay">
            <span className="hero-welcome">Bienvenido</span>
            <h1 className="hero-headline">
              Si llegaste hasta aquí, es porque <span className="highlight">tú también lo sientes</span>.
            </h1>
          </div>
        </div>

        <div className="hero-form">
          <div className="form-container">
            
            {/* Headline primero */}
            <div style={{marginBottom: '24px'}}>
              <span className="hero-welcome" style={{display: 'inline-block', marginBottom: '16px'}}>Bienvenido</span>
              <h1 className="hero-headline" style={{fontSize: 'clamp(24px, 5vw, 32px)', lineHeight: '1.3', marginBottom: '16px'}}>
                Si llegaste hasta aquí, es porque <span className="highlight">tú también lo sientes</span>.
              </h1>
              {/* Imagen debajo del headline */}
              <img 
                src="/LANDING_TOP_PICTURE.jpeg" 
                alt="Familia unida" 
                style={{
                  width: '100%',
                  maxWidth: '280px',
                  height: 'auto',
                  borderRadius: '12px',
                  marginTop: '16px'
                }}
              />
            </div>

            {/* Community Message */}
            <div className="community-message">
              <p>
                <strong>Queremos conocerte.</strong><br />
                Sabemos que tu corazón está lejos.<br />
                <span className="magenta">Por eso tenemos 100 espacios para nuevas familias.</span>
              </p>
            </div>

            {/* FOMO Counter */}
            <div className="fomo-counter">
              <p className="fomo-label">Familias Fundadoras</p>
              <div className="fomo-numbers">
                <span className="fomo-current">87</span>
                <span className="fomo-separator">/</span>
                <span className="fomo-total">100</span>
              </div>
              <p className="fomo-deadline">Cerramos el <strong>30 de enero de 2026</strong></p>
            </div>

            {/* Form */}
            <div className="form-intro">
              <h2 className="form-title">Cuéntanos de ti</h2>
              <p className="form-subtitle" style={{fontSize: '13px'}}>Suscríbete y en 30 segundos tu familia recibe acceso por WhatsApp</p>
            </div>

            <form action="https://saludcompartida.app/subscribe" method="GET">
              <div className="form-group">
                <label className="form-label">Tu Nombre</label>
                <input type="text" className="form-input" name="name" placeholder="¿Cómo te llamas?" required />
              </div>

              <div className="form-group">
                <label className="form-label">Tu Email</label>
                <input type="email" className="form-input" name="email" placeholder="tu@email.com" required />
              </div>

              <div className="form-group">
                <label className="form-label">Tu Teléfono en EE.UU.</label>
                <div className="phone-group">
                  <span className="country-code">🇺🇸 +1</span>
                  <input type="tel" className="form-input" name="phone" placeholder="(555) 123-4567" required style={{flex: 1}} />
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Quiero Ser Parte de las Familias Fundadoras de SaludCompartida
                <span className="subtext">40¢ diarios ($12 mensuales) — Cancela cuando quieras</span>
              </button>
            </form>

            <div className="trust-row">
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <div>
                  <div>Pago seguro mediante Square</div>
                  <div style={{fontSize: '10px', opacity: 0.7}}>PCI-DSS Level 1 • SSL/TLS</div>
                </div>
              </div>
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Sin contratos
              </div>
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                24/7
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section className="pillars">
        <div className="pillars-content">
          <span className="section-label">Los 4 Pilares</span>
          <h2 className="pillars-headline">
            Tú pagas <span className="cyan">aquí</span>.<br />
            Ellos se cuidan <span className="magenta">allá</span>.
          </h2>
          <p className="pillars-subheadline">
            Con 40¢ al día, tu familia tiene acceso a todo esto:
          </p>

          <div className="pillars-grid">
            {/* Pillar 1 */}
            <div className="pillar-card">
              <div className="pillar-number">1</div>
              <h3 className="pillar-title">Ayuda Médica</h3>
              <p className="pillar-description">
                Doctor por videollamada 24/7. Sin citas, sin esperas, sin madrugadas. 
                Más descuentos de hasta 75% en más de 1,700 farmacias en todo México.
              </p>
              <div className="pillar-stat">
                <div className="pillar-stat-number">$6.3B</div>
                <div className="pillar-stat-label">Gasto anual en salud que queremos reducir para cada familia</div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="pillar-card">
              <div className="pillar-number">2</div>
              <h3 className="pillar-title">Te Acompañamos</h3>
              <p className="pillar-description">
                Por WhatsApp te preguntamos: ¿Cómo te atendieron? ¿Qué dudas tienes? 
                ¿En qué más te podemos ayudar? No estás solo navegando el sistema.
              </p>
              <div className="pillar-stat">
                <div className="pillar-stat-number">24/7</div>
                <div className="pillar-stat-label">Siempre disponibles para resolver tus dudas</div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="pillar-card">
              <div className="pillar-number">3</div>
              <h3 className="pillar-title">Tus Ahorros</h3>
              <p className="pillar-description">
                Te mostramos exactamente cuánto estás ahorrando. Dashboard visible 
                para ti y para tu familia. Sin sorpresas, sin letras pequeñas.
              </p>
              <div className="pillar-stat">
                <div className="pillar-stat-number">$432</div>
                <div className="pillar-stat-label">Ahorro promedio anual por familia</div>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="pillar-card">
              <div className="pillar-number">4</div>
              <h3 className="pillar-title">Compañía</h3>
              <p className="pillar-description">
                Lupita y Fernanda llaman a tu familia para platicar, compartir recetas, 
                elegir ropa para un evento. Porque la soledad no se cura con dinero.
              </p>
              <div className="pillar-stat">
                <div className="pillar-stat-number">∞</div>
                <div className="pillar-stat-label">Llamadas de compañía incluidas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bridge Section - Loneliness */}
      <section className="bridge">
        <div className="bridge-content">
          <p className="bridge-intro">Con 40¢ al día cubrimos doctor, farmacias y terapia. Pero...</p>
          <h2 className="bridge-headline">
            Hay algo que el dinero <span className="magenta">no puede comprar</span>.
          </h2>
          <p className="bridge-subtext">
            La soledad de tu mamá cuando sus hijos están lejos. El abuelo que ya no tiene con quién platicar. 
            La esposa que carga sola con tres niños mientras tú trabajas aquí.<br /><br />
            <strong>Por eso creamos a Lupita y Fernanda.</strong>
          </p>
        </div>
      </section>

      {/* Lupita & Fernanda Section */}
      <section className="companions">
        <div className="companions-content">
          <div className="companions-header">
            <span className="companions-label">El Diferenciador</span>
            <h2 className="companions-title">Lupita y Fernanda</h2>
            <p className="companions-subtitle">
              No son asistentes. Son amigas que llaman para alegrar el día.
            </p>
          </div>

          <div className="companion-cards">
            {/* Lupita */}
            <div className="companion-card lupita">
              <div className="companion-image">
                <img src="/SENIOR_CITIZEN_COOKING.jpeg" alt="Lupita acompañando" />
                <span className="companion-badge">Para adultos 55+</span>
              </div>
              <div className="companion-body">
                <h3 className="companion-name">Lupita</h3>
                <p className="companion-for">Para tus papás y abuelos</p>
                <p className="companion-description">
                  Una voz cálida que llama para saber cómo están. Para intercambiar recetas, 
                  recordar el cumpleaños de la comadre, o simplemente platicar de la vida.
                </p>
                <div className="companion-features">
                  <span>Llamadas de compañía</span>
                  <span>Intercambio de recetas</span>
                  <span>Siempre con tiempo</span>
                </div>
              </div>
            </div>

            {/* Fernanda */}
            <div className="companion-card fernanda">
              <div className="companion-image">
                <img src="https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=600&h=400&fit=crop" alt="Fernanda acompañando" />
                <span className="companion-badge">Para mamás 25-50</span>
              </div>
              <div className="companion-body">
                <h3 className="companion-name">Fernanda</h3>
                <p className="companion-for">Para tu esposa, hermana, prima</p>
                <p className="companion-description">
                  Como una amiga que entiende lo que es manejar tres horarios de niños, 
                  lidiar con hijos adolescentes, elegir qué ponerse para el concierto, 
                  o simplemente necesitar desahogarse.
                </p>
                <div className="companion-features">
                  <span>Alguien que escucha</span>
                  <span>Consejos de amiga</span>
                  <span>Sin juicios</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="testimonials-content">
          <div className="testimonials-header">
            <span className="section-label">Historias Reales</span>
            <h2 className="testimonials-title">Lo que dicen las familias</h2>
          </div>

          <div className="testimonials-grid">
            {/* Testimonial 1 - Lupita/Recetas */}
            <div className="testimonial-card featured">
              <div className="testimonial-image">
                <img src="/SENIOR_CITIZEN_COOKING.jpeg" alt="Abuela cocinando" />
                <span className="testimonial-tag">Lupita</span>
              </div>
              <div className="testimonial-body">
                <p className="testimonial-quote">
                  Desde hace tres semanas mi mamá me habla de su amiga Lupita, que ya están hasta intercambiando recetas. Me alegra mucho que se sienta acompañada.
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">JL</div>
                  <div>
                    <div className="author-name">José Luis M.</div>
                    <div className="author-location">Tucson, Arizona</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 - Medical */}
            <div className="testimonial-card">
              <div className="testimonial-body" style={{paddingTop: '32px'}}>
                <p className="testimonial-quote">
                  Por primera vez en 8 años, no me preocupo cuando mi mamá me dice que le duele algo. Sé que puede llamar al doctor en cualquier momento.
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">MR</div>
                  <div>
                    <div className="author-name">María R.</div>
                    <div className="author-location">Phoenix, Arizona</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 - Fernanda */}
            <div className="testimonial-card featured">
              <div className="testimonial-body" style={{paddingTop: '32px'}}>
                <p className="testimonial-quote">
                  Fernanda le ayudó a mi esposa a elegir la ropa para ir al concierto de su sobrina. Cosas simples, pero que le alegran la vida cuando yo no estoy.
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">RC</div>
                  <div>
                    <div className="author-name">Roberto C.</div>
                    <div className="author-location">Houston, Texas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing">
        <div className="pricing-content">
          <div className="pricing-box">
            <p className="pricing-label">Protege hasta 4 familiares por</p>
            <div className="pricing-amount">
              <span className="pricing-currency">$</span>
              <span className="pricing-number">12</span>
            </div>
            <p className="pricing-period">al mes</p>
            <p className="pricing-daily">Solo 40¢ al día — menos que un café</p>

            <div className="pricing-includes">
              <p className="pricing-includes-title">Incluye para toda tu familia</p>
              <div className="pricing-includes-list">
                <div className="pricing-includes-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Telemedicina 24/7 ilimitada
                </div>
                <div className="pricing-includes-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Hasta 75% descuento en 1,700+ farmacias
                </div>
                <div className="pricing-includes-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Terapia psicológica semanal
                </div>
                <div className="pricing-includes-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Lupita y Fernanda (compañía ilimitada)
                </div>
                <div className="pricing-includes-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Dashboard de ahorros en tiempo real
                </div>
              </div>
            </div>
          </div>

          <button onClick={scrollToForm} className="cta-final">
            Unirme a las 100 Familias Fundadoras
          </button>

          <div className="guarantee">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Cancela cuando quieras. Sin preguntas. Sin letras pequeñas.
          </div>
        </div>
      </section>

      {/* Final FOMO Banner */}
      <section className="final-fomo">
        <div className="final-fomo-content">
          <h2 className="final-fomo-headline">¿Todavía estás pensando?</h2>
          <p className="final-fomo-numbers">
            Solo quedan <strong>13 lugares</strong> de 100.<br />
            Cerramos el <strong>30 de enero</strong>.
          </p>
          <button onClick={scrollToForm} className="cta-white">
            Reservar Mi Lugar Ahora
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <img 
          src="/saludcompartida-dark-no-tagline.png" 
          alt="SaludCompartida" 
          className="footer-logo"
        />
        <p className="footer-text">
          <strong>SaludCompartida</strong> © 2026
        </p>
        <p className="footer-tagline">
          Cuidando familias, acortando distancias.
        </p>
        <div className="footer-links">
          <a href="/terminos">Términos y Condiciones</a>
          <a href="/privacidad">Política de Privacidad</a>
          <a href="/contacto">Contacto</a>
        </div>
        <p className="footer-copyright">
          Hecho con ❤️ para familias migrantes en Estados Unidos.
        </p>
      </footer>
    </>
  );
}
