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
import SharedHeader from '../components/SharedHeader';
import SharedFooter from '../components/SharedFooter';

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
          justify-content: space-between;
          align-items: center;
          background: rgba(17, 24, 39, 0.98);
          backdrop-filter: blur(10px);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .header-content {
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
        }

        .logo-img {
          height: 40px;
          width: auto;
          cursor: pointer;
        }

        .nav-menu {
          display: none;
          gap: 32px;
          flex: 1;
          justify-content: center;
        }

        @media (min-width: 1024px) {
          .nav-menu {
            display: flex;
          }
        }

        .nav-item {
          position: relative;
          color: rgba(255,255,255,0.85);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .nav-item:hover {
          color: var(--cyan);
        }

        .dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 12px;
          background: rgba(31, 41, 55, 0.98);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 8px;
          min-width: 220px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }

        .nav-item:hover .dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-item {
          display: block;
          padding: 10px 16px;
          color: rgba(255,255,255,0.8);
          font-size: 13px;
          border-radius: 8px;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .dropdown-item:hover {
          background: rgba(6, 182, 212, 0.1);
          color: var(--cyan);
        }

        .nav-cta {
          display: none;
          gap: 12px;
        }

        @media (min-width: 1024px) {
          .nav-cta {
            display: flex;
          }
        }

        .btn-contratar {
          padding: 10px 24px;
          background: linear-gradient(135deg, var(--cyan), #0891B2);
          color: white;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .btn-contratar:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(6, 182, 212, 0.4);
        }

        .btn-login {
          padding: 10px 24px;
          background: linear-gradient(135deg, var(--magenta), #DB2777);
          color: white;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .btn-login:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.4);
        }

        .mobile-menu-btn {
          display: block;
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          padding: 8px;
        }

        @media (min-width: 1024px) {
          .mobile-menu-btn {
            display: none;
          }
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

        /* Hero Grid - New Layout */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }

        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr;
            align-items: start;
            gap: 48px;
          }
        }

        .hero-grid-image {
          width: 100%;
        }

        .hero-grid-content {
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

        /* ===== VISION Y MISION SECTION ===== */
        .vision-mision {
          padding: 80px 24px;
          background: var(--gray-900);
        }

        .vision-mision-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .vision-mision-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .vision-mision-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(32px, 5vw, 48px);
          color: var(--white);
          margin-bottom: 16px;
        }

        .vision-mision-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }

        @media (min-width: 768px) {
          .vision-mision-grid {
            grid-template-columns: 1fr 1fr;
            gap: 64px;
          }
        }

        .vm-card {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(236, 72, 153, 0.05));
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 40px;
          text-align: center;
        }

        .vm-card-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 24px;
          background: linear-gradient(135deg, var(--cyan), var(--magenta));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vm-card h3 {
          font-size: 28px;
          color: var(--cyan);
          margin-bottom: 16px;
        }

        .vm-card p {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(255,255,255,0.8);
        }

        /* ===== VALORES SECTION ===== */
        .valores {
          padding: 80px 24px;
          background: var(--gray-800);
        }

        .valores-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .valores-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .valores-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(32px, 5vw, 48px);
          color: var(--white);
          margin-bottom: 16px;
        }

        .valores-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }

        @media (min-width: 768px) {
          .valores-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .valores-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .valor-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px;
          padding: 32px;
          transition: all 0.3s ease;
        }

        .valor-card:hover {
          transform: translateY(-4px);
          border-color: var(--cyan);
          box-shadow: 0 8px 24px rgba(6, 182, 212, 0.2);
        }

        .valor-card-icon {
          width: 48px;
          height: 48px;
          margin-bottom: 16px;
          color: var(--magenta);
        }

        .valor-card h3 {
          font-size: 20px;
          color: var(--white);
          margin-bottom: 12px;
        }

        .valor-card p {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255,255,255,0.7);
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
          padding: 10px 24px;
          border-radius: 24px;
          font-size: 15px;
          font-weight: 600;
          color: var(--cyan);
          text-transform: uppercase;
          letter-spacing: 1.5px;
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

        /* ===== GUÍAS DE UTILIZACIÓN ===== */
        .guias-section {
          padding: 100px 24px;
          background: var(--gray-900);
        }

        .guias-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        .guias-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .guias-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(36px, 5vw, 52px);
          margin-bottom: 16px;
          background: linear-gradient(135deg, var(--cyan), var(--magenta));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .guias-subtitle {
          font-size: 20px;
          color: rgba(255,255,255,0.7);
          max-width: 700px;
          margin: 0 auto;
        }

        .guias-grid {
          display: grid;
          gap: 40px;
          margin-top: 60px;
        }

        @media (min-width: 1024px) {
          .guias-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .guia-card {
          background: var(--gray-800);
          border-radius: 24px;
          overflow: hidden;
          border: 2px solid rgba(6, 182, 212, 0.2);
          transition: all 0.3s ease;
        }

        .guia-card:hover {
          transform: translateY(-8px);
          border-color: var(--cyan);
          box-shadow: 0 12px 40px rgba(6, 182, 212, 0.3);
        }

        .guia-image-container {
          width: 100%;
          overflow: hidden;
          background: var(--gray-700);
        }

        .guia-image {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.3s ease;
        }

        .guia-card:hover .guia-image {
          transform: scale(1.05);
        }

        .guia-info {
          padding: 32px;
          text-align: center;
        }

        .guia-label {
          display: inline-block;
          background: rgba(6, 182, 212, 0.15);
          border: 1px solid rgba(6, 182, 212, 0.3);
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 13px;
          color: var(--cyan);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 16px;
          font-weight: 600;
        }

        .guia-card:nth-child(2) .guia-label {
          background: rgba(236, 72, 153, 0.15);
          border-color: rgba(236, 72, 153, 0.3);
          color: var(--magenta);
        }

        .guia-name {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 12px;
          color: white;
        }

        .guia-description {
          font-size: 16px;
          color: rgba(255,255,255,0.7);
          line-height: 1.6;
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

        /* ===== POR QUE CREAMOS - VIDEO SECTION ===== */
        .por-que-creamos {
          padding: 80px 24px;
          background: linear-gradient(180deg, var(--gray-900) 0%, var(--gray-800) 100%);
        }

        .por-que-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .por-que-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .por-que-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(32px, 5vw, 48px);
          color: var(--white);
          margin-bottom: 16px;
        }

        .por-que-subtitle {
          font-size: 18px;
          color: rgba(255,255,255,0.7);
          max-width: 600px;
          margin: 0 auto;
        }

        .por-que-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }

        @media (min-width: 1024px) {
          .por-que-grid {
            grid-template-columns: 1fr 1fr;
            gap: 64px;
          }
        }

        .video-container {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }

        .video-container video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .por-que-text {
          padding: 32px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px;
        }

        .por-que-text h3 {
          font-size: 24px;
          color: var(--cyan);
          margin-bottom: 16px;
        }

        .por-que-text p {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(255,255,255,0.8);
          margin-bottom: 16px;
        }

        .por-que-text p:last-child {
          margin-bottom: 0;
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
          font-size: clamp(42px, 6vw, 56px);
          margin-bottom: 16px;
          font-weight: 700;
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

      {/* Header - Using SharedHeader Component */}
      <SharedHeader />

      {/* Hero Section */}
      <section className="hero" style={{paddingTop: '88px', minHeight: 'auto'}}>
        {/* Headline principal arriba */}
        <div style={{textAlign: 'center', padding: '40px 24px 32px', maxWidth: '900px', margin: '0 auto'}}>
          <span className="hero-welcome" style={{display: 'inline-block', marginBottom: '16px'}}>Bienvenido</span>
          <h1 className="hero-headline" style={{fontSize: 'clamp(28px, 5vw, 42px)', lineHeight: '1.2', margin: '0'}}>
            Si llegaste hasta aquí, es porque <span className="highlight">tú también lo sientes</span>.
          </h1>
        </div>

        {/* Contenedor imagen izquierda + form derecha */}
        <div className="hero-grid" style={{padding: '0 24px 60px', maxWidth: '1200px', margin: '0 auto'}}>
          
          {/* Video izquierda (mobile: arriba, desktop: izquierda) */}
          <div className="hero-grid-image">
            <video 
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{
                width: '100%',
                maxWidth: '500px',
                height: 'auto',
                borderRadius: '16px',
                margin: '0 auto',
                display: 'block',
                backgroundColor: '#1F2937'
              }}
            >
              <source src="/LANDING_VIDEO_LARGO.mov" type="video/mp4" />
              Tu navegador no soporta video.
            </video>
          </div>

          {/* Contenido derecha (mobile: abajo, desktop: derecha) */}
          <div className="hero-grid-content">
              
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

          </div> {/* Cierre contenido derecha */}
        </div> {/* Cierre hero-grid */}
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

            {/* Testimonial 3 - Lucía */}
            <div className="testimonial-card featured">
              <div className="testimonial-image">
                <img src="/LANDING_TOP_PICTURE.jpeg" alt="Familia unida" />
                <span className="testimonial-tag">Fernanda</span>
              </div>
              <div className="testimonial-body">
                <p className="testimonial-quote">
                  Fernanda me llama cuando estoy sola con la niña y mi esposo trabajando. A veces solo necesito que alguien me escuche. Es como tener una amiga que siempre tiene tiempo para mí.
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">LM</div>
                  <div>
                    <div className="author-name">Lucía M.</div>
                    <div className="author-location">Esposa de migrante, Dallas</div>
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
            <p className="pricing-label">Cuida a los que más quieres en México</p>
            <div className="pricing-amount">
              <span className="pricing-currency">$</span>
              <span className="pricing-number">12</span>
            </div>
            <p className="pricing-period">al mes</p>
            <p className="pricing-daily">Solo 40¢ al día — menos que un café</p>

            <div className="pricing-includes">
              <p className="pricing-includes-title">Incluye para toda tu familia (hasta cuatro personas)</p>
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
                  Terapia semanal por quien más lo necesite
                </div>
                <div className="pricing-includes-item" style={{fontWeight: 700, color: 'var(--cyan)'}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Hasta 75% descuento en 1,700+ farmacias
                </div>
                <div className="pricing-includes-item" style={{fontWeight: 700, color: 'var(--magenta)', cursor: 'pointer'}} onClick={scrollToForm}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span style={{textDecoration: 'underline'}}>Lupita y Fernanda (compañía ilimitada)</span>
                </div>
                <div className="pricing-includes-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Nos comprometemos a mostrarte cuánto estás ahorrando
                </div>
              </div>
            </div>
          </div>

          <button onClick={() => window.location.href = 'https://saludcompartida.app/subscribe'} className="cta-final">
            Quiero unirme hoy a las siguientes 100 Familias Fundadoras
          </button>

          <div className="guarantee">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            *Cancela la suscripción en cualquier momento.
          </div>
        </div>
      </section>

      {/* Final FOMO Banner */}
      <section className="final-fomo">
        <div className="final-fomo-content">
          <h2 className="final-fomo-headline">¿Todavía estás pensando?</h2>
          <p className="final-fomo-numbers">
            Cerramos el <strong>30 de enero</strong>.
          </p>
          <button onClick={() => window.location.href = 'https://saludcompartida.app/subscribe'} className="cta-white">
            Quiero MI Lugar Ahora - Me quiero subscribir
          </button>
        </div>
      </section>

      {/* Footer - Using SharedFooter Component */}
      <SharedFooter />
    </>
  );
}
