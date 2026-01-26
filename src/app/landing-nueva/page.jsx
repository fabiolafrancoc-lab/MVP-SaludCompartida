'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import NewHeader from '@/components/landing/NewHeader';
import NewStickyFooter from '@/components/landing/NewStickyFooter';

export default function LandingNueva() {
  const router = useRouter();

  const scrollToSubscribe = () => {
    router.push('/registro');
  };

  return (
    <>
      <NewHeader />
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#1F2937', color: '#FFFFFF', paddingTop: '80px', paddingBottom: '100px' }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Serif+Display&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes arrowPulse {
          0%, 100% { 
            opacity: 0.4;
            transform: translateX(0);
          }
          50% { 
            opacity: 1;
            transform: translateX(4px);
          }
        }

        .hero {
          padding: 40px 20px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 60%);
          pointer-events: none;
        }

        .hero::after {
          content: '';
          position: absolute;
          bottom: -30%;
          left: -30%;
          width: 80%;
          height: 80%;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 60%);
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 480px;
          margin: 0 auto;
        }

        .emotional-opener {
          text-align: center;
          margin-bottom: 32px;
          animation: fadeInUp 0.8s ease-out;
        }

        .emotional-opener .greeting {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          color: #06B6D4;
          margin-bottom: 12px;
          line-height: 1.2;
        }

        .emotional-opener .subtext {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
        }

        .emotional-opener .highlight {
          color: #EC4899;
          font-weight: 600;
        }

        .fomo-container {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(236, 72, 153, 0.08));
          border: 1px solid rgba(6, 182, 212, 0.2);
          border-radius: 20px;
          padding: 28px 24px;
          margin-bottom: 28px;
          text-align: center;
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }

        .commitment-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 16px;
          color: #EC4899;
          opacity: 0.9;
        }

        .commitment-text {
          font-size: 17px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 20px;
        }

        .commitment-text strong {
          color: #06B6D4;
        }

        .limit-box {
          background: rgba(6, 182, 212, 0.12);
          border: 1px solid rgba(6, 182, 212, 0.3);
          border-radius: 12px;
          padding: 16px 20px;
          margin-bottom: 16px;
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
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          font-style: italic;
        }

        .value-card {
          background: #374151;
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 24px;
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }

        .value-headline {
          font-family: 'DM Serif Display', serif;
          font-size: 32px;
          line-height: 1.2;
          margin-bottom: 16px;
        }

        .value-headline .aqui {
          color: #06B6D4;
        }

        .value-headline .alla {
          color: #EC4899;
        }

        .value-price {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: rgba(6, 182, 212, 0.1);
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .price-main {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .price-daily {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .price-cents {
          font-family: 'DM Serif Display', serif;
          font-size: 42px;
          color: #06B6D4;
          line-height: 1;
        }

        .price-per {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
        }

        .price-monthly {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 2px;
        }

        .price-comparison {
          flex: 1;
        }

        .price-original {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: line-through;
        }

        .price-savings {
          font-size: 14px;
          color: #10B981;
          font-weight: 600;
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 16px;
        }

        .pillar-item {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.05);
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.85);
        }

        .pillar-item svg {
          width: 18px;
          height: 18px;
          color: #06B6D4;
          flex-shrink: 0;
        }

        .pillar-5-highlight {
          background: linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(6, 182, 212, 0.1));
          border: 1px solid rgba(236, 72, 153, 0.3);
          border-radius: 14px;
          padding: 16px;
          position: relative;
        }

        .p5-label {
          position: absolute;
          top: -10px;
          left: 16px;
          background: #374151;
          padding: 2px 10px;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #EC4899;
          border-radius: 4px;
        }

        .p5-content {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 4px;
        }

        .p5-avatars-small {
          display: flex;
        }

        .p5-av {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          color: white;
          border: 2px solid #374151;
        }

        .p5-av.lupita {
          background: linear-gradient(135deg, #EC4899, #9333EA);
          z-index: 2;
        }

        .p5-av.fernanda {
          background: linear-gradient(135deg, #06B6D4, #0891B2);
          margin-left: -10px;
          z-index: 1;
        }

        .p5-text {
          display: flex;
          flex-direction: column;
        }

        .p5-names {
          font-weight: 600;
          font-size: 14px;
          color: #FFFFFF;
        }

        .p5-desc {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
        }

        .cta-primary {
          display: block;
          width: 100%;
          padding: 18px 24px;
          background: linear-gradient(135deg, #EC4899, #DB2777);
          border: none;
          border-radius: 14px;
          color: #FFFFFF;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 18px;
          font-weight: 700;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          animation: fadeInUp 0.8s ease-out 0.6s both;
          box-shadow: 0 8px 32px rgba(236, 72, 153, 0.3);
        }

        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(236, 72, 153, 0.4);
        }

        .cta-subtext {
          text-align: center;
          margin-top: 12px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          animation: fadeInUp 0.8s ease-out 0.7s both;
        }

        .trust-section {
          padding: 40px 20px;
          background: #374151;
        }

        .trust-content {
          max-width: 480px;
          margin: 0 auto;
        }

        .process-time {
          text-align: center;
          margin-bottom: 28px;
        }

        .time-highlight {
          font-family: 'DM Serif Display', serif;
          font-size: 40px;
          background: linear-gradient(135deg, #06B6D4, #EC4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
        }

        .time-text {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.8);
        }

        .process-visual {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 24px;
          padding: 24px 0;
          position: relative;
        }

        .process-visual::before {
          content: '';
          position: absolute;
          top: 52px;
          left: 15%;
          right: 15%;
          height: 3px;
          background: linear-gradient(90deg, #06B6D4, #25D366, #EC4899);
          border-radius: 2px;
          z-index: 0;
        }

        .process-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          flex: 1;
          position: relative;
          z-index: 1;
        }

        .process-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          position: relative;
          border: 3px solid #374151;
        }

        .process-icon.step-1 {
          background: linear-gradient(135deg, #06B6D4, #0891B2);
        }

        .process-icon.step-2 {
          background: linear-gradient(135deg, #25D366, #128C7E);
        }

        .process-icon.step-3 {
          background: linear-gradient(135deg, #EC4899, #DB2777);
        }

        .process-icon svg {
          width: 28px;
          height: 28px;
          color: #FFFFFF;
        }

        .process-price {
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
          color: #FFFFFF;
          font-weight: 700;
        }

        .process-label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.8);
          max-width: 80px;
          line-height: 1.3;
        }

        .process-sublabel {
          font-size: 11px;
          color: #06B6D4;
          margin-top: 4px;
        }

        .process-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
          animation: arrowPulse 1.5s ease-in-out infinite;
        }

        .process-message {
          text-align: center;
          font-size: 18px;
          color: rgba(255, 255, 255, 0.7);
          font-style: italic;
        }

        .benefits-section {
          padding: 40px 20px;
        }

        .benefits-content {
          max-width: 480px;
          margin: 0 auto;
        }

        .audience-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 4px 10px;
          border-radius: 6px;
          margin-bottom: 16px;
        }

        .audience-label.migrant {
          background: rgba(6, 182, 212, 0.15);
          color: #06B6D4;
        }

        .audience-label.family {
          background: rgba(236, 72, 153, 0.15);
          color: #EC4899;
        }

        .benefits-grid {
          display: grid;
          gap: 16px;
        }

        .benefit-card {
          display: flex;
          gap: 16px;
          padding: 20px;
          background: #374151;
          border-radius: 16px;
          border-left: 3px solid #06B6D4;
          transition: transform 0.2s ease;
        }

        .benefit-card:hover {
          transform: translateX(4px);
        }

        .benefit-card.family {
          border-left-color: #EC4899;
        }

        .benefit-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .benefit-card:not(.family) .benefit-icon {
          background: rgba(6, 182, 212, 0.15);
          color: #06B6D4;
        }

        .benefit-card.family .benefit-icon {
          background: rgba(236, 72, 153, 0.15);
          color: #EC4899;
        }

        .benefit-text h3 {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .benefit-text p {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.4;
        }

        .companions-section {
          padding: 48px 20px;
          background: linear-gradient(180deg, #1F2937, #374151);
        }

        .companions-content {
          max-width: 480px;
          margin: 0 auto;
        }

        .not-health-badge {
          display: inline-block;
          background: linear-gradient(135deg, #EC4899, #06B6D4);
          color: #FFFFFF;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 6px 14px;
          border-radius: 20px;
          margin-bottom: 12px;
        }

        .companions-title {
          font-family: 'DM Serif Display', serif;
          font-size: 36px;
          text-align: left;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #EC4899, #06B6D4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .companions-intro {
          font-size: 16px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 28px;
        }

        .soledad-message {
          background: rgba(236, 72, 153, 0.1);
          border-left: 3px solid #EC4899;
          padding: 16px 20px;
          border-radius: 0 12px 12px 0;
          margin: 24px 0;
        }

        .soledad-text {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
          font-style: italic;
        }

        .soledad-text strong {
          color: #EC4899;
          font-style: normal;
        }

        .companions-grid {
          display: grid;
          gap: 16px;
          margin-bottom: 24px;
        }

        .companion-card {
          background: #1F2937;
          border-radius: 20px;
          padding: 24px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.2s ease;
        }

        .companion-card:hover {
          transform: translateY(-2px);
        }

        .companion-card.lupita {
          border-color: rgba(236, 72, 153, 0.3);
        }

        .companion-card.fernanda {
          border-color: rgba(6, 182, 212, 0.3);
        }

        .companion-avatar {
          width: 80px;
          height: 80px;
          margin: 0 auto 16px;
        }

        .companion-name {
          font-family: 'DM Serif Display', serif;
          font-size: 24px;
          margin-bottom: 4px;
        }

        .companion-card.lupita .companion-name {
          color: #EC4899;
        }

        .companion-card.fernanda .companion-name {
          color: #06B6D4;
        }

        .companion-for {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 12px;
        }

        .companion-desc {
          font-size: 14px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 16px;
        }

        .companion-features {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }

        .companion-features span {
          font-size: 11px;
          padding: 6px 10px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.7);
        }

        .companions-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
          padding: 16px;
          background: rgba(6, 182, 212, 0.1);
          border-radius: 12px;
        }

        .social-proof {
          padding: 40px 20px;
          background: linear-gradient(180deg, #374151, #1F2937);
        }

        .social-content {
          max-width: 480px;
          margin: 0 auto;
          text-align: center;
        }

        .section-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #06B6D4;
          margin-bottom: 16px;
        }

        .testimonial-card {
          background: #1F2937;
          border: 1px solid rgba(6, 182, 212, 0.2);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 16px;
        }

        .testimonial-card.lupita-story {
          border-color: rgba(236, 72, 153, 0.3);
          background: linear-gradient(135deg, #1F2937, rgba(236, 72, 153, 0.05));
        }

        .testimonial-quote {
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
          line-height: 1.4;
          margin-bottom: 16px;
          color: rgba(255, 255, 255, 0.9);
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .author-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #06B6D4, #EC4899);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
        }

        .author-avatar.lupita-avatar {
          background: linear-gradient(135deg, #EC4899, #9333EA);
        }

        .author-info {
          text-align: left;
        }

        .author-name {
          font-weight: 600;
          font-size: 14px;
        }

        .author-location {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 24px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          color: #06B6D4;
          line-height: 1;
        }

        .stat-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 4px;
        }

        .final-cta {
          padding: 48px 20px;
          text-align: center;
        }

        .final-content {
          max-width: 480px;
          margin: 0 auto;
        }

        .final-headline {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          margin-bottom: 8px;
        }

        .final-subheadline {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 24px;
        }

        .cta-secondary {
          display: block;
          width: 100%;
          padding: 18px 24px;
          background: linear-gradient(135deg, #06B6D4, #0891B2);
          border: none;
          border-radius: 14px;
          color: #FFFFFF;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 18px;
          font-weight: 700;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(6, 182, 212, 0.3);
          margin-bottom: 16px;
        }

        .cta-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(6, 182, 212, 0.4);
        }

        .guarantee {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
        }

        @media (min-width: 480px) {
          .hero {
            padding: 100px 24px 60px;
          }

          .emotional-opener .greeting {
            font-size: 32px;
          }

          .value-headline {
            font-size: 36px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="emotional-opener">
            <h1 className="greeting">Gracias por escuchar mi historia</h1>
            <p className="subtext">
              Sé lo que sientes. La preocupación a las <span className="highlight">3 AM</span> cuando suena el teléfono. 
              Por eso creé esto <span className="highlight">para ti</span>.
            </p>
          </div>

          <div className="fomo-container">
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

          <div className="value-card">
            <h2 className="value-headline">
              Tú trabajas duro <span className="aqui">"aquí"</span>.<br/>
              Nosotros los cuidamos <span className="alla">"allá"</span>.
            </h2>
            
            <div className="value-price">
              <div className="price-main">
                <div className="price-daily">
                  <span className="price-cents">40¢</span>
                  <span className="price-per">al día</span>
                </div>
                <div className="price-monthly">
                  <span>$12/mes • Hasta 4 familiares</span>
                </div>
              </div>
              <div className="price-comparison">
                <div className="price-original">$576/año en gastos médicos</div>
                <div className="price-savings">Ahorras $432 al año</div>
              </div>
            </div>

            <div className="pillars-grid">
              <div className="pillar-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>Doctor 24/7</span>
              </div>
              <div className="pillar-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
                <span>75% Farmacias</span>
              </div>
              <div className="pillar-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <line x1="9" y1="9" x2="9.01" y2="9"/>
                  <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
                <span>Terapia Semanal</span>
              </div>
              <div className="pillar-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                <span>Tus Ahorros</span>
              </div>
            </div>

            <div className="pillar-5-highlight">
              <div className="p5-label">Porque la distancia duele</div>
              <div className="p5-content">
                <div className="p5-avatars-small">
                  <div className="p5-av lupita">L</div>
                  <div className="p5-av fernanda">F</div>
                </div>
                <div className="p5-text">
                  <span className="p5-names">Lupita y Fernanda</span>
                  <span className="p5-desc">Para que no te extrañen tanto cuando no puedes llamar</span>
                </div>
              </div>
            </div>
          </div>

          <button className="cta-primary" onClick={scrollToSubscribe}>
            Quiero Cuidar a Mi Familia
          </button>
          <p className="cta-subtext">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Pago seguro • Cancela cuando quieras
          </p>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="trust-content">
          <div className="process-time">
            <span className="time-highlight">30 Segundos</span>
            <p className="time-text">para Cuidar a tu Familia</p>
          </div>
          
          <div className="process-visual">
            <div className="process-step">
              <div className="process-icon step-1">
                <span className="process-price">$12</span>
              </div>
              <span className="process-label">Compras</span>
            </div>
            
            <div className="process-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            
            <div className="process-step">
              <div className="process-icon step-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </div>
              <span className="process-label">WhatsApp a tu familia</span>
              <span className="process-sublabel">30 segundos</span>
            </div>
            
            <div className="process-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            
            <div className="process-step">
              <div className="process-icon step-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <span className="process-label">¡Listo!</span>
            </div>
          </div>

          <p className="process-message">
            Así de simple. Así de rápido.
          </p>
        </div>
      </section>

      {/* Benefits Section - Dual Audience */}
      <section className="benefits-section">
        <div className="benefits-content">
          <h2 className="section-headline">No Es Solo para Uno</h2>
          <p className="section-subheadline">Es para todos los que amas</p>
          
          <div className="benefits-grid">
            <div className="benefit-audience migrant">
              <div className="audience-label">Para Ti en EE.UU.</div>
              <div className="benefit-card">
                <div className="benefit-icon">📱</div>
                <h3>Dashboard en tu celular</h3>
                <p>Ve todo desde tu celular: quién usó el doctor, cuánto ahorraste, cuándo es la próxima terapia</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🔔</div>
                <h3>Notificaciones en tiempo real</h3>
                <p>Te avisamos cada vez que tu familia use un servicio. Paz mental 24/7</p>
              </div>
            </div>
            
            <div className="benefit-audience family">
              <div className="audience-label">Para Tu Familia en México</div>
              <div className="benefit-card">
                <div className="benefit-icon">👨‍⚕️</div>
                <h3>Doctor 24/7 por WhatsApp</h3>
                <p>Escribe cuando quieran. Doctor real responde en minutos</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">💊</div>
                <h3>75% descuento en farmacias</h3>
                <p>Más de 1,700 farmacias en México. Solo muestran el código</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🧠</div>
                <h3>Terapia semanal incluida</h3>
                <p>Para la ansiedad, depresión, o simplemente platicar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companions Section - Full Story */}
      <section className="companions-section">
        <div className="companions-content">
          <div className="companions-badge">
            <span>Esto no es salud. Es conexión.</span>
          </div>
          
          <h2 className="companions-headline">Siempre Acompañados</h2>
          
          <div className="companions-grid">
            <div className="companion-card lupita">
              <div className="companion-avatar">
                <div className="avatar-circle">L</div>
              </div>
              <div className="companion-for">Para tu familia en México</div>
              <h3 className="companion-name">Lupita</h3>
              <p className="companion-desc">
                La amiga que nunca duerme. Responde sus dudas de salud a las 3 AM. 
                Les recuerda tomar sus pastillas. Celebra con ellos cuando bajan de peso.
              </p>
              <div className="companion-features">
                <span>Recordatorios</span>
                <span>Seguimiento</span>
                <span>Motivación diaria</span>
              </div>
            </div>

            <div className="companion-card fernanda">
              <div className="companion-avatar">
                <div className="avatar-circle">F</div>
              </div>
              <div className="companion-for">Para ti en Estados Unidos</div>
              <h3 className="companion-name">Fernanda</h3>
              <p className="companion-desc">
                Tu mano derecha desde EE.UU. Te avisa cuando tu mamá usa el doctor. 
                Te manda el resumen semanal. Te recuerda que llamar no cuesta nada.
              </p>
              <div className="companion-features">
                <span>Reportes semanales</span>
                <span>Alertas importantes</span>
                <span>Paz mental</span>
              </div>
            </div>
          </div>

          <div className="companions-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <div>
              <strong>María (Phoenix):</strong> "Mi mamá le escribe más a Lupita que a mí. 
              Ya están hasta intercambiando recetas."
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="social-proof">
        <div className="social-content">
          <div className="section-label">Historias Reales</div>
          
          <div className="testimonial-card">
            <p className="testimonial-quote">
              "Llevo 3 meses. Mi mamá ha ido 4 veces al doctor, 2 al psicólogo, 
              y ha ahorrado $187 en medicinas. Yo duermo tranquilo."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">M</div>
              <div>
                <div className="author-name">María R.</div>
                <div className="author-location">Phoenix, AZ</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card lupita-story">
            <p className="testimonial-quote">
              "Lupita le manda memes a mi papá cada mañana. 
              Él tiene 68 años y nunca había usado WhatsApp. Ahora revisa el celular más que yo."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">J</div>
              <div>
                <div className="author-name">José Luis M.</div>
                <div className="author-location">Tucson, AZ</div>
              </div>
            </div>
          </div>

          <div className="stats-row">
            <div className="stat">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Disponible</div>
            </div>
            <div className="stat">
              <div className="stat-number">1,700+</div>
              <div className="stat-label">Farmacias</div>
            </div>
            <div className="stat">
              <div className="stat-number">$432</div>
              <div className="stat-label">Ahorro Anual</div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="final-cta">
        <div className="final-content">
          <h2 className="final-headline">¿Listo para la tranquilidad?</h2>
          <p className="final-subheadline">En 30 segundos, tu familia estará protegida.</p>
          
          <button className="cta-secondary" onClick={scrollToSubscribe}>
            Suscribirme Ahora — Solo 40¢/día
          </button>
          
          <div className="guarantee">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Cancela cuando quieras. Sin preguntas.
          </div>
        </div>
      </section>
      </div>
      <NewStickyFooter />
    </>
  );
}
