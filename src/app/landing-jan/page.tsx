'use client';

import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <style jsx global>{`
        :root {
          --bg-dark: #0a0a0a;
          --bg-light: #1a1a2E;
          --cyan: #0EA5E9;
          --cyan-deep: #0284C7;
          --cyan-glow: rgba(14, 165, 233, 0.12);
          --magenta: #EC4899;
          --magenta-deep: #DB2777;
          --magenta-glow: rgba(236, 72, 153, 0.12);
          --navy: #0a0a0a;
          --navy-light: #12121f;
          --navy-card: #16162a;
          --cream: #FFFBF7;
          --gold: #F59E0B;
          --green: #10B981;
          --red: #EF4444;
          --text-primary: #FFFFFF;
          --text-secondary: rgba(255, 255, 255, 0.75);
          --text-muted: rgba(255, 255, 255, 0.5);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'DM Sans', -apple-system, sans-serif;
          background: linear-gradient(180deg, #0a0a0a 0%, #1a1a2E 100%);
          background-attachment: fixed;
          color: var(--text-primary);
          -webkit-font-smoothing: antialiased;
          line-height: 1.6;
          overflow-x: hidden;
        }

        .serif {
          font-family: 'Instrument Serif', Georgia, serif;
        }

        /* Ambient Background */
        .ambient {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .ambient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.2;
        }

        .ambient-orb.one {
          width: 600px;
          height: 600px;
          background: #1a1a2E;
          top: -200px;
          left: -200px;
          animation: drift1 30s ease-in-out infinite;
        }

        .ambient-orb.two {
          width: 500px;
          height: 500px;
          background: #1a1a2E;
          bottom: 20%;
          right: -150px;
          animation: drift2 25s ease-in-out infinite;
        }

        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(50px, 50px); }
        }

        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-40px, -40px); }
        }

        /* Navigation */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 16px 20px;
          transition: all 0.3s;
          background: #0a0a0a;
        }

        .nav.scrolled {
          background: rgba(10, 10, 10, 0.98);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 12px 20px;
        }

        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
        }

        .nav-logo {
          height: 36px;
          flex-shrink: 0;
        }

        .nav-links {
          display: none;
          align-items: center;
          gap: 32px;
        }

        .nav-links a {
          font-size: 14px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s;
          white-space: nowrap;
        }

        .nav-links a:hover {
          color: var(--text-primary);
        }

        .nav-cta {
          display: none;
          align-items: center;
          gap: 12px;
        }

        .nav-mobile-toggle {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 32px;
          height: 32px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }

        .nav-mobile-toggle span {
          display: block;
          width: 100%;
          height: 2px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: all 0.3s;
        }

        .nav-mobile-toggle.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .nav-mobile-toggle.active span:nth-child(2) {
          opacity: 0;
        }

        .nav-mobile-toggle.active span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        .nav-mobile {
          display: none;
          flex-direction: column;
          gap: 16px;
          padding: 24px 20px;
          background: #0a0a0a;
          border-top: 1px solid rgba(255,255,255,0.05);
          margin-top: 16px;
        }

        .nav-mobile.active {
          display: flex;
        }

        .nav-mobile a {
          font-size: 16px;
          color: var(--text-secondary);
          text-decoration: none;
          padding: 8px 0;
        }

        .nav-mobile a:hover {
          color: var(--text-primary);
        }

        .nav-mobile .btn {
          text-align: center;
          margin-top: 8px;
        }

        @media (min-width: 1024px) {
          .nav-links { display: flex; }
          .nav-cta { display: flex; }
          .nav-mobile-toggle { display: none; }
          .nav-mobile { display: none !important; }
        }

        /* Buttons */
        .btn {
          padding: 12px 24px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s;
          cursor: pointer;
          border: none;
          font-family: inherit;
          display: inline-block;
        }

        .btn-ghost {
          background: transparent;
          color: var(--text-secondary);
        }

        .btn-ghost:hover {
          color: var(--text-primary);
        }

        .btn-primary {
          background: var(--magenta);
          color: white;
          box-shadow: 0 4px 20px rgba(236, 72, 153, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(236, 72, 153, 0.4);
        }

        .btn-magenta {
          background: var(--magenta);
          color: white;
          box-shadow: 0 4px 16px rgba(236, 72, 153, 0.3);
        }

        .btn-magenta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(236, 72, 153, 0.4);
        }

        .btn-cyan {
          background: var(--cyan);
          color: white;
          box-shadow: 0 4px 16px rgba(14, 165, 233, 0.3);
        }

        .btn-cyan:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(14, 165, 233, 0.4);
        }

        .btn-hero {
          padding: 18px 36px;
          font-size: 17px;
          border-radius: 14px;
        }

        /* Sections */
        section {
          position: relative;
          z-index: 1;
        }

        .section-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Hero */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 120px 20px 80px;
        }

        .hero-inner {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(14, 165, 233, 0.15);
          border: 1px solid var(--cyan);
          padding: 12px 24px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 700;
          color: white;
          margin-bottom: 32px;
          animation: fadeUp 0.8s ease-out;
        }

        .hero-eyebrow::before {
          content: '';
          width: 10px;
          height: 10px;
          background: var(--cyan);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .hero-headline {
          font-size: clamp(36px, 8vw, 64px);
          line-height: 1.1;
          margin-bottom: 24px;
          animation: fadeUp 0.8s ease-out 0.1s both;
        }

        .hero-headline .you {
          color: var(--cyan);
        }

        .hero-headline .them {
          color: var(--cyan);
        }

        .hero-sub-emotional {
          font-size: 19px;
          color: var(--text-secondary);
          margin-bottom: 24px;
          max-width: 580px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
          animation: fadeUp 0.8s ease-out 0.15s both;
        }

        .hero-sub-solution {
          font-size: 20px;
          color: var(--text-primary);
          margin-bottom: 32px;
          animation: fadeUp 0.8s ease-out 0.2s both;
        }

        .hero-proposition {
          font-size: clamp(22px, 4vw, 32px);
          margin-bottom: 40px;
          padding: 24px 32px;
          background: var(--navy-card);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          display: inline-block;
          animation: fadeUp 0.8s ease-out 0.25s both;
        }

        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
          margin-bottom: 48px;
          animation: fadeUp 0.8s ease-out 0.3s both;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 48px;
          flex-wrap: wrap;
          animation: fadeUp 0.8s ease-out 0.4s both;
        }

        .hero-stat {
          text-align: center;
        }

        .hero-stat-value {
          font-size: 32px;
          font-weight: 700;
          color: var(--cyan);
        }

        .hero-stat-label {
          font-size: 14px;
          color: var(--text-muted);
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Video Section */
        .video-section {
          padding: 80px 20px;
          background: rgba(26, 26, 46, 0.3);
        }

        .video-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .video-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .video-title {
          font-size: clamp(28px, 5vw, 40px);
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .video-subtitle {
          font-size: 18px;
          color: var(--text-secondary);
        }

        .video-wrapper {
          position: relative;
          padding-bottom: 56.25%;
          border-radius: 20px;
          overflow: hidden;
          background: var(--navy-card);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }

        .video-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        /* Guides Section */
        .guides-section {
          padding: 80px 20px;
        }

        .guides-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .guides-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .guides-title {
          font-size: clamp(28px, 5vw, 40px);
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .guides-subtitle {
          font-size: 18px;
          color: var(--text-secondary);
        }

        .guides-grid {
          display: grid;
          gap: 32px;
        }

        @media (min-width: 768px) {
          .guides-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .guide-card {
          background: var(--navy-card);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .guide-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255,255,255,0.15);
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }

        .guide-image {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Solution Section */
        .solution-section {
          padding: 100px 20px;
          background: linear-gradient(180deg, rgba(26, 26, 46, 0.5) 0%, rgba(10, 10, 10, 0.5) 100%);
        }

        .solution-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .solution-label {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--cyan);
          margin-bottom: 16px;
        }

        .solution-title {
          font-size: clamp(28px, 5vw, 44px);
          margin-bottom: 16px;
        }

        .solution-sub {
          font-size: 18px;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
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
          background: var(--navy-card);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 24px;
          padding: 36px 28px;
          transition: all 0.4s;
          position: relative;
          overflow: hidden;
        }

        .pillar-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .pillar-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255,255,255,0.12);
        }

        .pillar-card:hover::before {
          opacity: 1;
        }

        .pillar-card.cyan::before { background: var(--cyan); }
        .pillar-card.magenta::before { background: var(--magenta); }
        .pillar-card.green::before { background: var(--green); }
        .pillar-card.gold::before { background: var(--gold); }

        .pillar-number {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 16px;
        }

        .pillar-card.cyan .pillar-number { color: var(--cyan); }
        .pillar-card.magenta .pillar-number { color: var(--magenta); }
        .pillar-card.green .pillar-number { color: var(--green); }
        .pillar-card.gold .pillar-number { color: var(--gold); }

        .pillar-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .pillar-icon svg {
          width: 28px;
          height: 28px;
        }

        .pillar-card.cyan .pillar-icon {
          background: var(--cyan-glow);
          color: var(--cyan);
        }

        .pillar-card.magenta .pillar-icon {
          background: var(--magenta-glow);
          color: var(--magenta);
        }

        .pillar-card.green .pillar-icon {
          background: rgba(16, 185, 129, 0.12);
          color: var(--green);
        }

        .pillar-card.gold .pillar-icon {
          background: rgba(245, 158, 11, 0.12);
          color: var(--gold);
        }

        .pillar-title {
          font-size: 22px;
          margin-bottom: 12px;
        }

        .pillar-desc {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .pillar-highlight {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: rgba(255,255,255,0.04);
          border-radius: 8px;
          font-size: 14px;
          color: var(--text-secondary);
        }

        .pillar-highlight strong {
          color: var(--text-primary);
          font-size: 18px;
        }

        /* Pain Section */
        .pain-section {
          padding: 100px 20px;
        }

        .pain-inner {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .pain-truth {
          margin-bottom: 40px;
        }

        .pain-truth-label {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--magenta);
          margin-bottom: 16px;
        }

        .pain-truth-headline {
          font-size: clamp(40px, 8vw, 72px);
          line-height: 1.1;
          color: var(--text-primary);
        }

        .pain-reality {
          font-size: 20px;
          color: var(--text-secondary);
          margin-bottom: 48px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .pain-headline {
          font-size: clamp(24px, 4vw, 36px);
          line-height: 1.4;
          margin-bottom: 48px;
          color: var(--text-secondary);
        }

        .pain-headline em {
          color: var(--magenta);
          font-style: italic;
        }

        .pain-cards {
          display: grid;
          gap: 20px;
          margin-bottom: 48px;
        }

        @media (min-width: 768px) {
          .pain-cards {
            grid-template-columns: repeat(3, 1fr);
          }
          .pain-card {
            flex-direction: column;
            text-align: center;
          }
          .pain-card-icon {
            margin: 0 auto;
          }
        }

        .pain-card {
          background: var(--navy-card);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 24px;
          text-align: left;
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .pain-card-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(239, 68, 68, 0.1);
          color: var(--red);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pain-card-icon svg {
          width: 24px;
          height: 24px;
        }

        .pain-card-content h4 {
          font-size: 17px;
          margin-bottom: 6px;
        }

        .pain-card-content p {
          font-size: 15px;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .pain-quote-box {
          background: var(--navy-card);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 40px 32px;
          margin-top: 48px;
        }

        .pain-quote {
          font-size: 22px;
          color: var(--text-primary);
          font-style: italic;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .pain-quote strong {
          color: var(--cyan);
          font-style: normal;
          font-weight: 700;
        }

        /* CTA Intermedio */
        .cta-intermedio {
          padding: 80px 20px;
          text-align: center;
          background: linear-gradient(180deg, rgba(26, 26, 46, 0.5) 0%, rgba(10, 10, 10, 0.5) 100%);
        }

        .cta-intermedio-inner {
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-intermedio-title {
          font-size: clamp(28px, 5vw, 40px);
          margin-bottom: 16px;
          color: var(--text-primary);
        }

        .cta-intermedio-text {
          font-size: 18px;
          color: var(--text-secondary);
          margin-bottom: 32px;
        }

        /* Companions Section */
        .companions-section {
          padding: 120px 20px;
          background: linear-gradient(180deg, transparent 0%, rgba(26, 26, 46, 0.3) 50%, transparent 100%);
        }

        .companions-inner {
          max-width: 1000px;
          margin: 0 auto;
        }

        .companions-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .companions-badge {
          display: inline-block;
          background: var(--navy-card);
          border: 1px solid rgba(255,255,255,0.15);
          padding: 10px 20px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 24px;
        }

        .companions-title {
          font-size: clamp(36px, 7vw, 56px);
          line-height: 1.15;
          margin-bottom: 20px;
        }

        .companions-title .lupita {
          color: var(--magenta);
        }

        .companions-title .fernanda {
          color: var(--cyan);
        }

        .companions-subtitle {
          font-size: 20px;
          color: var(--text-secondary);
          max-width: 550px;
          margin: 0 auto;
        }

        .companions-grid {
          display: grid;
          gap: 32px;
          margin-bottom: 48px;
        }

        @media (min-width: 768px) {
          .companions-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .companion-card {
          background: var(--navy-card);
          border-radius: 28px;
          padding: 40px 32px;
          border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.4s;
        }

        .companion-card.lupita {
          border-color: rgba(236, 72, 153, 0.15);
        }

        .companion-card.lupita:hover {
          border-color: rgba(236, 72, 153, 0.3);
          box-shadow: 0 24px 64px rgba(236, 72, 153, 0.12);
          transform: translateY(-6px);
        }

        .companion-card.fernanda {
          border-color: rgba(14, 165, 233, 0.15);
        }

        .companion-card.fernanda:hover {
          border-color: rgba(14, 165, 233, 0.3);
          box-shadow: 0 24px 64px rgba(14, 165, 233, 0.12);
          transform: translateY(-6px);
        }

        .companion-badge-small {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .lupita .companion-badge-small {
          background: var(--magenta-glow);
          color: var(--magenta);
        }

        .fernanda .companion-badge-small {
          background: var(--cyan-glow);
          color: var(--cyan);
        }

        .companion-name {
          font-size: 36px;
          margin-bottom: 8px;
        }

        .lupita .companion-name { color: var(--magenta); }
        .fernanda .companion-name { color: var(--cyan); }

        .companion-for {
          font-size: 15px;
          color: var(--text-muted);
          margin-bottom: 20px;
        }

        .companion-desc {
          font-size: 17px;
          color: var(--text-secondary);
          line-height: 1.75;
          margin-bottom: 24px;
        }

        .companion-features {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .companion-feature {
          padding: 10px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 100px;
          font-size: 13px;
          color: var(--text-secondary);
        }

        .companions-callout {
          background: linear-gradient(135deg, #0a0a0a, #1a1a2E, #0a0a0a);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 32px;
          text-align: center;
        }

        .companions-callout p {
          font-size: 20px;
          margin-bottom: 8px;
        }

        .companions-callout small {
          font-size: 15px;
          opacity: 0.9;
        }

        /* Testimonials */
        .testimonials-section {
          padding: 100px 20px;
          background: rgba(26, 26, 46, 0.4);
        }

        .testimonials-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .testimonials-label {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 16px;
        }

        .testimonials-title {
          font-size: clamp(28px, 5vw, 40px);
        }

        .testimonials-grid {
          display: grid;
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .testimonials-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .testimonial-card {
          background: var(--navy-card);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 24px;
          padding: 32px 28px;
        }

        .testimonial-stars {
          display: flex;
          gap: 4px;
          margin-bottom: 20px;
        }

        .testimonial-stars svg {
          width: 20px;
          height: 20px;
          fill: var(--gold);
          color: var(--gold);
        }

        .testimonial-quote {
          font-size: 17px;
          line-height: 1.75;
          margin-bottom: 24px;
          color: var(--text-primary);
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .testimonial-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
        }

        .testimonial-avatar.cyan {
          background: var(--cyan-glow);
          color: var(--cyan);
        }

        .testimonial-avatar.magenta {
          background: var(--magenta-glow);
          color: var(--magenta);
        }

        .testimonial-avatar.green {
          background: rgba(16, 185, 129, 0.12);
          color: var(--green);
        }

        .testimonial-name {
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 2px;
        }

        .testimonial-location {
          font-size: 14px;
          color: var(--text-muted);
        }

        /* Pricing */
        .pricing-section {
          padding: 120px 20px;
        }

        .pricing-inner {
          max-width: 600px;
          margin: 0 auto;
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .pricing-label {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--cyan);
          margin-bottom: 16px;
        }

        .pricing-title {
          font-size: clamp(28px, 5vw, 40px);
          margin-bottom: 16px;
        }

        .pricing-subtitle {
          font-size: 18px;
          color: var(--text-secondary);
        }

        .pricing-card {
          background: var(--navy-card);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 32px;
          overflow: hidden;
          color: var(--text-primary);
        }

        .pricing-card-body {
          padding: 40px 32px;
        }

        .pricing-amount {
          text-align: center;
          margin-bottom: 32px;
        }

        .pricing-value {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 4px;
          margin-bottom: 8px;
        }

        .pricing-currency {
          font-size: 28px;
          font-weight: 600;
          margin-top: 16px;
          color: var(--cyan);
        }

        .pricing-number {
          font-size: 80px;
          font-weight: 800;
          line-height: 1;
          color: var(--cyan);
        }

        .pricing-period {
          font-size: 20px;
          color: var(--text-secondary);
        }

        .pricing-daily {
          font-size: 18px;
          color: var(--text-secondary);
        }

        .pricing-daily strong {
          color: var(--green);
        }

        .pricing-features {
          margin-bottom: 32px;
        }

        .pricing-feature {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .pricing-feature:last-child {
          border-bottom: none;
        }

        .pricing-feature svg {
          width: 24px;
          height: 24px;
          color: var(--green);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .pricing-feature span {
          font-size: 16px;
          line-height: 1.5;
          color: var(--text-primary);
        }

        .pricing-feature strong {
          font-weight: 700;
        }

        .btn-pricing {
          display: block;
          width: 100%;
          padding: 20px 32px;
          background: var(--magenta);
          color: white;
          font-size: 18px;
          font-weight: 700;
          font-family: inherit;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          transition: all 0.3s;
          box-shadow: 0 8px 32px rgba(236, 72, 153, 0.35);
        }

        .btn-pricing:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(236, 72, 153, 0.45);
          background: var(--magenta-deep);
        }

        .pricing-guarantee {
          text-align: center;
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 14px;
          color: var(--text-muted);
        }

        .pricing-guarantee svg {
          width: 18px;
          height: 18px;
          color: var(--green);
        }

        /* Urgency */
        .urgency-section {
          padding: 100px 20px;
          background: rgba(26, 26, 46, 0.4);
        }

        .urgency-card {
          max-width: 700px;
          margin: 0 auto;
          background: linear-gradient(135deg, #0a0a0a, #1a1a2E, #0a0a0a);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 32px;
          padding: 56px 36px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .urgency-content {
          position: relative;
          z-index: 1;
        }

        .urgency-number {
          font-size: clamp(72px, 18vw, 140px);
          font-weight: 800;
          line-height: 1;
          margin-bottom: 8px;
          color: var(--cyan);
        }

        .urgency-label {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .urgency-deadline {
          font-size: 20px;
          opacity: 0.95;
          margin-bottom: 12px;
        }

        .urgency-deadline strong {
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        .urgency-reason {
          font-size: 16px;
          opacity: 0.85;
          max-width: 450px;
          margin: 0 auto 32px;
          font-style: italic;
        }

        .btn-urgency {
          display: inline-block;
          padding: 20px 48px;
          background: var(--magenta);
          color: white;
          font-size: 18px;
          font-weight: 700;
          font-family: inherit;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s;
          box-shadow: 0 8px 32px rgba(236, 72, 153, 0.35);
        }

        .btn-urgency:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 40px rgba(236, 72, 153, 0.45);
        }

        /* Footer */
        .footer {
          padding: 60px 20px 40px;
          text-align: center;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .footer-logo {
          height: 40px;
          margin-bottom: 20px;
          opacity: 0.8;
        }

        .footer-tagline {
          font-size: 16px;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-bottom: 24px;
        }

        .footer-links a {
          font-size: 14px;
          color: var(--text-muted);
          text-decoration: none;
        }

        .footer-links a:hover {
          color: var(--text-primary);
        }

        .footer-copy {
          font-size: 13px;
          color: var(--text-muted);
        }

        /* Sticky CTA */
        .sticky-cta {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(20px);
          padding: 16px 20px;
          border-top: 1px solid rgba(255,255,255,0.1);
          z-index: 999;
        }

        .sticky-cta.visible {
          display: block;
        }

        .sticky-cta a {
          display: block;
          width: 100%;
          padding: 16px 24px;
          background: var(--magenta);
          color: white;
          font-size: 16px;
          font-weight: 700;
          text-align: center;
          text-decoration: none;
          border-radius: 12px;
        }

        @media (max-width: 768px) {
          .sticky-cta.visible {
            display: block;
          }
          .hero-ctas {
            flex-direction: column;
          }
          .btn-hero {
            width: 100%;
            text-align: center;
          }
        }

        /* Reveal Animation */
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Ambient Background */}
      <div className="ambient">
        <div className="ambient-orb one"></div>
        <div className="ambient-orb two"></div>
      </div>

      {/* Navigation */}
      <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <img 
            src="/saludcompartida-dark-no-tagline.png" 
            alt="SaludCompartida" 
            className="nav-logo"
          />
          <div className="nav-links">
            <a href="#quienes-somos">Quiénes Somos</a>
            <a href="#como-utilizar">Cómo Utilizar</a>
            <a href="#que-nos-hace-unicos">Qué Nos Hace Únicos</a>
          </div>
          <div className="nav-cta">
            <a href="https://saludcompartida.app/subscribe" className="btn btn-magenta">Quiero Contratar Ahora</a>
            <a href="https://saludcompartida.app/login" className="btn btn-cyan">Ya Tengo Mi Código</a>
          </div>
          <button 
            className={`nav-mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menú"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className={`nav-mobile ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="#quienes-somos" onClick={closeMobileMenu}>Quiénes Somos</a>
          <a href="#como-utilizar" onClick={closeMobileMenu}>Cómo Utilizar</a>
          <a href="#que-nos-hace-unicos" onClick={closeMobileMenu}>Qué Nos Hace Únicos</a>
          <a href="https://saludcompartida.app/subscribe" className="btn btn-magenta">Quiero Contratar Ahora</a>
          <a href="https://saludcompartida.app/login" className="btn btn-cyan">Ya Tengo Mi Código</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">Cuidamos a tu familia en México • 24/7</div>
          
          <h1 className="hero-headline serif">
            Si llegaste hasta aquí, es porque <span className="them">tú también lo sientes</span>.
          </h1>
          
          <p className="hero-sub-emotional">
            Esa preocupación constante. Ese nudo en el estómago cuando tu mamá te dice que le duele algo y tú estás a miles de kilómetros. Esa culpa de no poder estar ahí.
          </p>
          
          <p className="hero-sub-solution">
            <strong>No tienes que seguir sintiéndote así.</strong>
          </p>
          
          <div className="hero-proposition">
            <span className="serif">Tú trabajas duro <span className="you">&quot;aquí&quot;</span>. Nosotros los cuidamos <span className="them">&quot;allá&quot;</span>.</span>
          </div>
          
          <div className="hero-ctas">
            <a href="https://saludcompartida.app/subscribe" className="btn btn-primary btn-hero">
              Quiero cuidar a mi familia →
            </a>
          </div>
          
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">24/7</div>
              <div className="hero-stat-label">Doctores disponibles</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">1,700+</div>
              <div className="hero-stat-label">Farmacias con descuento</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">$432</div>
              <div className="hero-stat-label">Ahorro promedio/año</div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Solution Section - 4 Pilares */}
      <section className="solution-section" id="como-utilizar">
        <div className="section-inner">
          <div className="solution-header">
            <div className="solution-label">Los 4 Pilares</div>
            <h2 className="solution-title serif">Todo lo que tu familia necesita</h2>
            <p className="solution-sub">Con $12 al mes, tu familia tiene acceso completo a:</p>
          </div>
          
          <div className="pillars-grid">
            <div className="pillar-card cyan">
              <div className="pillar-number">PILAR 01</div>
              <div className="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72"/></svg>
              </div>
              <h3 className="pillar-title">Atención Médica 24/7</h3>
              <p className="pillar-desc">
                En México, las familias que reciben remesas gastan de su bolsillo ~$6.3 billones anuales en salud. Nuestra misión es reducir ese gasto. Telemedicina ilimitada por video o teléfono, sin citas, sin esperas. A las 3 AM si es necesario.
              </p>
              <div className="pillar-highlight">
                <strong>75%</strong> descuento en 1,700+ farmacias
              </div>
            </div>
            
            <div className="pillar-card gold">
              <div className="pillar-number">PILAR 02</div>
              <div className="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              </div>
              <h3 className="pillar-title">Terapia Psicológica</h3>
              <p className="pillar-desc">
                Sesiones semanales con psicólogos certificados. Para tu mamá que necesita hablar, para tu esposa que necesita apoyo, para quien más lo necesite.
              </p>
              <div className="pillar-highlight">
                <strong>Ilimitada</strong> para toda la familia
              </div>
            </div>
            
            <div className="pillar-card green">
              <div className="pillar-number">PILAR 03</div>
              <div className="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </div>
              <h3 className="pillar-title">Panel de Ahorros</h3>
              <p className="pillar-desc">
                Un panel mensual donde ves los ahorros reales que estás obteniendo al utilizar los servicios de SaludCompartida. Cada consulta, cada descuento, cada peso ahorrado. Sin sorpresas.
              </p>
              <div className="pillar-highlight">
                <strong>$432</strong> ahorro promedio anual
              </div>
            </div>
            
            <div className="pillar-card magenta">
              <div className="pillar-number">PILAR 04</div>
              <div className="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
              <h3 className="pillar-title">Compañía</h3>
              <p className="pillar-desc">
                Lupita y Fernanda llaman a tu familia para platicar de lo que les gusta: recetas de cocina, qué tipo de baile prefieren, cómo pasan el fin de semana, cosas que les levanten el ánimo. Una amiga que siempre tiene tiempo.
              </p>
              <div className="pillar-highlight">
                <strong>Proactivas</strong> — ellas llaman primero
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Video Section */}
      <section className="video-section">
        <div className="video-container">
          <div className="video-header">
            <h2 className="video-title serif">Por qué creamos SaludCompartida</h2>
            <p className="video-subtitle">Escucha una conversación real con Lupita</p>
          </div>
          <div className="video-wrapper">
            <video 
              src="/Video_Pagina_copy.mp4"
              controls
              playsInline
              preload="metadata"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* 3. Pain Section - La verdad que nadie dice */}
      <section className="pain-section" id="quienes-somos">
        <div className="section-inner">
          <div className="pain-inner">
            <div className="pain-truth">
              <span className="pain-truth-label">La verdad que nadie dice</span>
              <h2 className="pain-truth-headline serif">No todo es dinero.</h2>
            </div>
            
            <p className="pain-reality">
              Sí, mandamos remesas. Sí, pagamos las cuentas. Pero el dinero no resuelve todo.
            </p>
            
            <h3 className="pain-headline serif">
              La <em>soledad de tu mamá</em> cuando sus hijos están lejos. El <em>abuelo</em> que ya no tiene con quién platicar. Tu <em>esposa</em> que carga sola con tres niños mientras tú trabajas aquí.
            </h3>
            
            <div className="pain-cards">
              <div className="pain-card">
                <div className="pain-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                </div>
                <div className="pain-card-content">
                  <h4>La llamada a las 3 AM</h4>
                  <p>Cuando tu mamá se enferma y no hay nadie que la lleve al doctor. El dinero no resuelve eso.</p>
                </div>
              </div>
              
              <div className="pain-card">
                <div className="pain-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div className="pain-card-content">
                  <h4>La soledad que pesa</h4>
                  <p>Tu papá sentado solo en la sala. Tu mamá sin nadie con quien platicar. El dinero no les hace compañía.</p>
                </div>
              </div>
              
              <div className="pain-card">
                <div className="pain-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div className="pain-card-content">
                  <h4>Tu esposa sola con los niños</h4>
                  <p>Tres hijos, mil responsabilidades, y nadie con quien desahogarse. El dinero no la acompaña.</p>
                </div>
              </div>
            </div>
            
            <div className="pain-quote-box">
              <p className="pain-quote">
                &quot;Para muchos de nosotros no es tema de dinero.<br/>
                Es la <strong>soledad</strong> de saber que nuestro corazón está allá.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Intermedio - Antes de Lupita y Fernanda */}
      <section className="cta-intermedio">
        <div className="cta-intermedio-inner">
          <h2 className="cta-intermedio-title serif">¿Listo para cuidar a tu familia?</h2>
          <p className="cta-intermedio-text">Empieza hoy. Tu familia lo sentirá mañana.</p>
          <a href="https://saludcompartida.app/subscribe" className="btn btn-primary btn-hero">
            Quiero Contratar Ahora →
          </a>
        </div>
      </section>

      {/* 4. Companions Section - Lupita y Fernanda */}
      <section className="companions-section" id="que-nos-hace-unicos">
        <div className="companions-inner">
          <div className="companions-header">
            <div className="companions-badge">✨ Esto no es salud. Es conexión.</div>
            <h2 className="companions-title serif">
              <span className="lupita">Lupita</span> y <span className="fernanda">Fernanda</span>
            </h2>
            <p className="companions-subtitle">
              No son asistentes. No son robots. Son amigas que llaman a tu familia para alegrar el día.
            </p>
          </div>
          
          <div className="companions-grid">
            <div className="companion-card lupita">
              <div className="companion-badge-small">Para adultos 55+</div>
              <h3 className="companion-name serif">Lupita</h3>
              <p className="companion-for">Para tus papás y abuelos</p>
              <p className="companion-desc">
                Una voz cálida que llama para saber cómo están. Para intercambiar recetas, recordar el cumpleaños de la comadre, contar historias, o simplemente platicar de la vida.
              </p>
              <div className="companion-features">
                <span className="companion-feature">Llamadas de compañía</span>
                <span className="companion-feature">Intercambio de recetas</span>
                <span className="companion-feature">Siempre con tiempo para ellos</span>
              </div>
            </div>
            
            <div className="companion-card fernanda">
              <div className="companion-badge-small">Para mamás 25–50</div>
              <h3 className="companion-name serif">Fernanda</h3>
              <p className="companion-for">Para tu esposa, hermana, prima</p>
              <p className="companion-desc">
                Como una amiga que entiende lo que es manejar horarios de niños, lidiar con hijos adolescentes, elegir qué ponerse para el concierto, o simplemente necesitar desahogarse.
              </p>
              <div className="companion-features">
                <span className="companion-feature">Alguien que escucha</span>
                <span className="companion-feature">Consejos de amiga</span>
                <span className="companion-feature">Sin juicios</span>
              </div>
            </div>
          </div>
          
          <div className="companions-callout">
            <p><strong>Ellas llaman a tu familia.</strong></p>
            <small>Tu familia no tiene que hacer nada. Solo contestar y platicar con una amiga.</small>
          </div>
        </div>
      </section>

      {/* 5. Guides Section - Así de fácil funciona */}
      <section className="guides-section" id="ver-como-funciona">
        <div className="guides-container">
          <div className="guides-header">
            <h2 className="guides-title serif">Así de fácil funciona</h2>
            <p className="guides-subtitle">Guías para tu familia en México</p>
          </div>
          <div className="guides-grid">
            <div className="guide-card">
              <img 
                src="/images/GUIA_DE_UTILIZACION.png" 
                alt="Guía de utilización - Cómo ayudar a mi familia en México" 
                className="guide-image"
              />
            </div>
            <div className="guide-card">
              <img 
                src="/images/GUIA_DE_UTILIZACION_ADULTO_MAYOR.jpeg" 
                alt="Guía de utilización para adultos mayores" 
                className="guide-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials - Historias Reales */}
      <section className="testimonials-section">
        <div className="testimonials-header">
          <div className="testimonials-label">Historias Reales</div>
          <h2 className="testimonials-title serif">Lo que dicen las familias</h2>
        </div>
        
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
            <p className="testimonial-quote">
              &quot;Por primera vez en 8 años, no me preocupo cuando mi mamá me dice que le duele algo. Sé que puede llamar al doctor en cualquier momento.&quot;
            </p>
            <div className="testimonial-author">
              <div className="testimonial-avatar cyan">MR</div>
              <div>
                <div className="testimonial-name">María R.</div>
                <div className="testimonial-location">Phoenix, Arizona</div>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
            <p className="testimonial-quote">
              &quot;Mi mamá me habla de su amiga Lupita. Ya están intercambiando recetas. Me alegra tanto que se sienta acompañada.&quot;
            </p>
            <div className="testimonial-author">
              <div className="testimonial-avatar magenta">JL</div>
              <div>
                <div className="testimonial-name">José Luis M.</div>
                <div className="testimonial-location">Los Angeles, CA</div>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
            <p className="testimonial-quote">
              &quot;Mandamos dinero, pero no servía cuando mi mamá se enfermó a las 3 AM. Ahora sé que tiene a quién llamar.&quot;
            </p>
            <div className="testimonial-author">
              <div className="testimonial-avatar green">JC</div>
              <div>
                <div className="testimonial-name">José Carlos M.</div>
                <div className="testimonial-location">Tucson, Arizona</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final CTA - Cuida a los que más quieres */}
      <section className="pricing-section" id="precio">
        <div className="pricing-inner">
          <div className="pricing-header">
            <h2 className="pricing-title serif">Cuida a los que más quieres</h2>
            <p className="pricing-subtitle">Todo lo que necesita tu familia por solo $12 al mes</p>
          </div>
          
          <div className="pricing-card">
            <div className="pricing-card-body">
              <div className="pricing-amount">
                <div className="pricing-value">
                  <span className="pricing-currency">$</span>
                  <span className="pricing-number">12</span>
                </div>
                <p className="pricing-period">USD al mes</p>
                <p className="pricing-daily">Solo <strong>40¢ al día</strong> — menos que un café</p>
              </div>
              
              <div className="pricing-features">
                <div className="pricing-feature">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Hasta <strong>4 familiares</strong> incluidos</span>
                </div>
                <div className="pricing-feature">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Telemedicina <strong>24/7 ilimitada</strong></span>
                </div>
                <div className="pricing-feature">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Hasta <strong>75% descuento</strong> en 1,700+ farmacias</span>
                </div>
                <div className="pricing-feature">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Terapia semanal</strong> incluida</span>
                </div>
                <div className="pricing-feature">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Lupita o Fernanda</strong> — compañía ilimitada</span>
                </div>
                <div className="pricing-feature">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Panel de ahorros</strong> para ver tus ahorros cada mes</span>
                </div>
              </div>
              
              <a href="https://saludcompartida.app/subscribe" className="btn-pricing">
                Quiero Contratar Ahora →
              </a>
              
              <div className="pricing-guarantee">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>Cancela cuando quieras. Sin preguntas.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <img 
          src="/saludcompartida-dark-no-tagline.png" 
          alt="SaludCompartida" 
          className="footer-logo"
        />
        <p className="footer-tagline">Cuidando familias, acortando distancias.</p>
        <div className="footer-links">
          <a href="/terminos">Términos</a>
          <a href="/privacidad">Privacidad</a>
          <a href="mailto:hola@saludcompartida.com">Contacto</a>
        </div>
        <p className="footer-copy">© 2025 SaludCompartida. Todos los derechos reservados.</p>
      </footer>

      {/* Sticky CTA */}
      <div className="sticky-cta" id="sticky-cta">
        <a href="https://saludcompartida.app/subscribe">Quiero Contratar Ahora →</a>
      </div>
    </>
  );
}
