'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rzmdekjegbdgitqekjee.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// Países disponibles (solo México habilitado inicialmente)
const COUNTRIES = [
  { code: 'US', flag: '🇺🇸', name: 'Estados Unidos', enabled: true },
  { code: 'MX', flag: '🇲🇽', name: 'México', enabled: true },
  { code: 'GT', flag: '🇬🇹', name: 'Guatemala', enabled: false },
  { code: 'SV', flag: '🇸🇻', name: 'El Salvador', enabled: false },
  { code: 'HN', flag: '🇭🇳', name: 'Honduras', enabled: false },
  { code: 'NI', flag: '🇳🇮', name: 'Nicaragua', enabled: false },
  { code: 'CR', flag: '🇨🇷', name: 'Costa Rica', enabled: false },
  { code: 'PA', flag: '🇵🇦', name: 'Panamá', enabled: false },
  { code: 'CO', flag: '🇨🇴', name: 'Colombia', enabled: false },
  { code: 'VE', flag: '🇻🇪', name: 'Venezuela', enabled: false },
  { code: 'EC', flag: '🇪🇨', name: 'Ecuador', enabled: false },
  { code: 'PE', flag: '🇵🇪', name: 'Perú', enabled: false },
  { code: 'BO', flag: '🇧🇴', name: 'Bolivia', enabled: false },
  { code: 'PY', flag: '🇵🇾', name: 'Paraguay', enabled: false },
  { code: 'UY', flag: '🇺🇾', name: 'Uruguay', enabled: false },
  { code: 'AR', flag: '🇦🇷', name: 'Argentina', enabled: false },
  { code: 'CL', flag: '🇨🇱', name: 'Chile', enabled: false },
  { code: 'DO', flag: '🇩🇴', name: 'República Dominicana', enabled: false },
  { code: 'CU', flag: '🇨🇺', name: 'Cuba', enabled: false },
  { code: 'PR', flag: '🇵🇷', name: 'Puerto Rico', enabled: false },
];

// Estados de México
const MEXICO_STATES = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
  'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima',
  'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco',
  'México', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León',
  'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí',
  'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala',
  'Veracruz', 'Yucatán', 'Zacatecas'
];

// Estados de USA (principales)
const USA_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
];

// Función para generar código de familia único (6 dígitos alfanuméricos, SIN prefijo)
function generateFamilyCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Función para determinar companion (Lupita 55+ / Fernanda 25-50)
function determineCompanion(fechaNacimiento: string): 'lupita' | 'fernanda' {
  const birthDate = new Date(fechaNacimiento);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  return age >= 55 ? 'lupita' : 'fernanda';
}

// Función para validar edad (18+)
function validateAge(birthdate: string): boolean {
  const birth = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age >= 18;
}

export default function RegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    // Migrante USA - nombres exactos de Supabase
    migrant_first_name: '',
    migrant_last_name: '',
    migrant_mother_last_name: '',
    migrant_sex: '',
    migrant_birthdate: '',
    migrant_email: '',
    migrant_phone: '',
    // Usuario México - nombres exactos de Supabase
    family_first_name: '',
    family_last_name: '',
    family_mother_last_name: '',
    family_sex: '',
    family_birthdate: '',
    family_email: '',
    family_phone: '',
    // Términos
    terms_accepted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Formatear teléfono USA: (555) 123-4567
    if (name === 'migrant_phone') {
      const cleaned = value.replace(/\D/g, '').slice(0, 10);
      let formatted = '';
      if (cleaned.length > 0) {
        formatted = '(' + cleaned.slice(0, 3);
      }
      if (cleaned.length > 3) {
        formatted += ') ' + cleaned.slice(3, 6);
      }
      if (cleaned.length > 6) {
        formatted += '-' + cleaned.slice(6, 10);
      }
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    
    // Formatear teléfono México: 55 1234 5678
    if (name === 'family_phone') {
      const cleaned = value.replace(/\D/g, '').slice(0, 10);
      let formatted = '';
      if (cleaned.length > 0) {
        formatted = cleaned.slice(0, 2);
      }
      if (cleaned.length > 2) {
        formatted += ' ' + cleaned.slice(2, 6);
      }
      if (cleaned.length > 6) {
        formatted += ' ' + cleaned.slice(6, 10);
      }
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Validate age 18+
      if (!validateAge(formData.migrant_birthdate)) {
        setError('El migrante debe ser mayor de 18 años');
        setIsSubmitting(false);
        return;
      }

      if (!validateAge(formData.family_birthdate)) {
        setError('El usuario en México debe ser mayor de 18 años');
        setIsSubmitting(false);
        return;
      }

      // Validate emails
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (!emailRegex.test(formData.migrant_email)) {
        setError('Email del migrante inválido');
        setIsSubmitting(false);
        return;
      }

      if (!emailRegex.test(formData.family_email)) {
        setError('Email del usuario en México inválido');
        setIsSubmitting(false);
        return;
      }

      // Generate 2 unique codes with safety counter
      let migrant_code = generateFamilyCode();
      let family_code = generateFamilyCode();
      let attempts = 0;
      const maxAttempts = 10;

      // Ensure they're different
      while (migrant_code === family_code && attempts < maxAttempts) {
        family_code = generateFamilyCode();
        attempts++;
      }
      
      if (migrant_code === family_code) {
        throw new Error('Unable to generate unique codes');
      }
      
      // Limpiar teléfonos (solo números)
      const migrant_phone_clean = formData.migrant_phone.replace(/\D/g, '');
      const family_phone_clean = formData.family_phone.replace(/\D/g, '');
      
      // Determinar companion según edad del usuario en México
      const family_companion_assigned = determineCompanion(formData.family_birthdate);

      // Guardar en tabla REGISTRATIONS - nombres EXACTOS de columnas Supabase
      const { data: registrationData, error: registrationError } = await supabase
        .from('registrations')
        .insert({
          // Códigos (2 different codes)
          migrant_code: migrant_code,
          family_code: family_code,
          
          // Datos del migrante (USA)
          migrant_first_name: formData.migrant_first_name,
          migrant_last_name: formData.migrant_last_name,
          migrant_mother_last_name: formData.migrant_mother_last_name || null,
          migrant_sex: formData.migrant_sex,
          migrant_birthdate: formData.migrant_birthdate,
          migrant_email: formData.migrant_email,
          migrant_country_code: '+1',
          migrant_phone: migrant_phone_clean,
          
          // Datos del usuario en México
          family_first_name: formData.family_first_name,
          family_last_name: formData.family_last_name,
          family_mother_last_name: formData.family_mother_last_name || null,
          family_sex: formData.family_sex,
          family_birthdate: formData.family_birthdate,
          family_email: formData.family_email,
          family_country_code: '+52',
          family_phone: family_phone_clean,
          
          // Companion asignado
          family_companion_assigned: family_companion_assigned,
          
          // Status y términos
          status: 'pending_payment',
          terms_accepted: formData.terms_accepted,
          terms_accepted_at: new Date().toISOString(),
          
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (registrationError) throw registrationError;

      // Guardar en sessionStorage para /confirmacion y /dashboard
      sessionStorage.setItem('registrationData', JSON.stringify({
        registration_id: registrationData.id,
        migrant_code: migrant_code,
        family_code: family_code,
        family_companion_assigned: family_companion_assigned,
        // Para WATI: +1 + número limpio
        migrant_phone_full: `+1${migrant_phone_clean}`,
        // Para WATI: +52 + número limpio  
        family_phone_full: `+52${family_phone_clean}`,
        // Datos adicionales para dashboard
        migrant_first_name: formData.migrant_first_name,
        family_first_name: formData.family_first_name,
      }));

      // ✅ REDIRIGIR A PÁGINA DE PAGO CON FORMULARIO DE TARJETA
      window.location.href = `/pago?id=${registrationData.id}`;

    } catch (err: any) {
      console.error('Error en registro:', err);
      setError(err.message || 'Ocurrió un error. Por favor intenta de nuevo.');
      setIsSubmitting(false);
    }
  };

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
          --green: #10B981;
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
          min-height: 100vh;
        }

        .serif {
          font-family: 'Instrument Serif', Georgia, serif;
        }

        /* Navigation */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 16px 20px;
          background: #0a0a0a;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          height: 36px;
        }

        .nav-help {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .nav-help a {
          color: var(--cyan);
          text-decoration: none;
        }

        /* Registration Container */
        .registration {
          min-height: 100vh;
          padding: 100px 20px 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .registration-wrapper {
          display: grid;
          gap: 48px;
          width: 100%;
          max-width: 1100px;
          align-items: start;
        }

        @media (min-width: 900px) {
          .registration-wrapper {
            grid-template-columns: 1fr 1fr;
          }
        }

        .registration-image {
          display: none;
        }

        @media (min-width: 900px) {
          .registration-image {
            display: block;
            position: sticky;
            top: 100px;
          }
        }

        .registration-image img {
          width: 100%;
          height: 500px;
          object-fit: cover;
          border-radius: 24px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.4);
        }

        .registration-image-caption {
          text-align: center;
          margin-top: 16px;
          font-size: 15px;
          color: var(--text-secondary);
          font-style: italic;
        }

        .registration-container {
          width: 100%;
        }

        /* Progress Steps */
        .progress-container {
          margin-bottom: 40px;
        }

        .progress-steps {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .progress-step {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .progress-dot {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          transition: all 0.3s;
        }

        .progress-dot.active {
          background: var(--magenta);
          color: white;
        }

        .progress-dot.completed {
          background: var(--green);
          color: white;
        }

        .progress-dot.inactive {
          background: var(--navy-card);
          color: var(--text-muted);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .progress-label {
          font-size: 14px;
          color: var(--text-secondary);
          display: none;
        }

        @media (min-width: 480px) {
          .progress-label {
            display: block;
          }
        }

        .progress-line {
          width: 60px;
          height: 2px;
          background: rgba(255,255,255,0.1);
          margin: 0 8px;
        }

        .progress-line.active {
          background: var(--green);
        }

        .progress-text {
          text-align: center;
          font-size: 14px;
          color: var(--text-muted);
        }

        /* Form Card */
        .form-card {
          background: var(--navy-card);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 40px 32px;
        }

        @media (max-width: 480px) {
          .form-card {
            padding: 32px 20px;
          }
        }

        .form-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .form-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 32px;
        }

        .form-icon.usa {
          background: rgba(14, 165, 233, 0.15);
        }

        .form-icon.mexico {
          background: rgba(16, 185, 129, 0.15);
        }

        .form-title {
          font-size: 28px;
          margin-bottom: 8px;
        }

        .form-subtitle {
          font-size: 16px;
          color: var(--text-secondary);
        }

        /* Form Fields */
        .form-section {
          margin-bottom: 28px;
        }

        .form-section-title {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--cyan);
          margin-bottom: 16px;
        }

        .form-row {
          display: grid;
          gap: 16px;
          margin-bottom: 16px;
        }

        .form-row.two-col {
          grid-template-columns: 1fr 1fr;
        }

        .form-row.three-col {
          grid-template-columns: 1fr 1fr 1fr;
        }

        @media (max-width: 480px) {
          .form-row.two-col,
          .form-row.three-col {
            grid-template-columns: 1fr;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
        }

        .form-label .required {
          color: var(--magenta);
        }

        .form-input,
        .form-select {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 16px;
          font-family: inherit;
          transition: all 0.2s;
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: var(--cyan);
          background: rgba(255,255,255,0.06);
        }

        .form-input::placeholder {
          color: var(--text-muted);
        }

        .form-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 44px;
        }

        .form-select option {
          background: var(--navy-card);
          color: var(--text-primary);
        }

        /* Phone Input with Flag */
        .phone-input-container {
          position: relative;
        }

        .phone-flag {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          font-size: 14px;
        }

        .phone-input {
          padding-left: 80px !important;
        }

        .phone-hint {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 6px;
        }

        .phone-hint strong {
          color: var(--text-secondary);
        }

        .phone-example {
          color: var(--cyan);
          font-family: monospace;
          background: rgba(14, 165, 233, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .phone-note {
          font-size: 11px;
          color: var(--gold);
          margin-top: 4px;
          font-style: italic;
        }

        /* WhatsApp Icon */
        .whatsapp-icon {
          width: 18px;
          height: 18px;
          vertical-align: middle;
          margin-right: 6px;
        }

        /* Terms Checkbox */
        .terms-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
        }

        .terms-checkbox input[type="checkbox"] {
          width: 20px;
          height: 20px;
          margin-top: 2px;
          accent-color: var(--magenta);
          cursor: pointer;
          flex-shrink: 0;
        }

        .terms-label {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .terms-label a {
          color: var(--cyan);
          text-decoration: none;
        }

        .terms-label a:hover {
          text-decoration: underline;
        }

        .terms-label .required {
          color: var(--magenta);
        }

        /* Date Input */
        .date-input {
          position: relative;
        }

        .date-input::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }

        /* Buttons */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s;
          cursor: pointer;
          border: none;
          font-family: inherit;
          width: 100%;
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

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .btn-secondary:hover {
          border-color: rgba(255,255,255,0.2);
          color: var(--text-primary);
        }

        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 32px;
        }

        .form-actions .btn {
          flex: 1;
        }

        /* Security Note */
        .security-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
          font-size: 13px;
          color: var(--text-muted);
        }

        .security-note svg {
          width: 16px;
          height: 16px;
          color: var(--green);
        }

        /* Error Message */
        .error-message {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 18px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 12px;
          margin-top: 16px;
        }

        .error-message svg {
          width: 20px;
          height: 20px;
          color: #EF4444;
          flex-shrink: 0;
        }

        .error-message span {
          font-size: 14px;
          color: #FCA5A5;
        }

        /* Footer Note */
        .footer-note {
          text-align: center;
          margin-top: 32px;
          font-size: 14px;
          color: var(--text-muted);
        }

        .footer-note a {
          color: var(--cyan);
          text-decoration: none;
        }

        .footer-note a:hover {
          text-decoration: underline;
        }

        /* ================================ */
        /* INTRO SECTION - Hero Emocional */
        /* ================================ */
        .intro-section {
          max-width: 900px;
          margin: 120px auto 60px;
          padding: 0 20px;
          text-align: center;
        }

        .intro-pretext {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--cyan);
          margin-bottom: 16px;
        }

        .intro-title {
          font-size: 42px;
          line-height: 1.2;
          margin-bottom: 24px;
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .intro-title {
            font-size: 32px;
          }
        }

        .intro-title .highlight {
          background: linear-gradient(135deg, var(--magenta) 0%, var(--cyan) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .intro-subtitle {
          font-size: 18px;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 48px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .intro-subtitle strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        /* Signatures Section */
        .signatures-section {
          margin: 48px 0;
          padding: 40px 20px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .signatures-title {
          font-size: 16px;
          color: var(--text-secondary);
          margin-bottom: 32px;
          font-style: italic;
        }

        .signatures-cloud {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 20px 30px;
          min-height: 200px;
        }

        .signature {
          display: inline-block;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          transition: all 0.3s;
          cursor: default;
        }

        .signature:hover {
          transform: scale(1.05);
          background: rgba(255, 255, 255, 0.06);
        }

        .sig-child {
          font-family: 'Comic Sans MS', 'Chalkboard SE', cursive;
          transform: rotate(-2deg);
          font-weight: 700;
        }

        .sig-elder {
          font-family: 'Brush Script MT', 'Lucida Handwriting', cursive;
          font-style: italic;
          font-weight: 400;
          transform: rotate(1deg);
        }

        /* Benefits Tags */
        .intro-benefits {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin: 40px 0;
        }

        .benefit-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          font-size: 15px;
          color: var(--text-primary);
          font-weight: 500;
          transition: all 0.3s;
        }

        .benefit-tag:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
        }

        /* Badges */
        .intro-badges {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
          margin-top: 32px;
        }

        .badge-urgency,
        .badge-price {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 24px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
        }

        .badge-urgency {
          background: linear-gradient(135deg, #DC2626 0%, #EF4444 100%);
          color: white;
          box-shadow: 0 4px 20px rgba(220, 38, 38, 0.3);
          animation: pulse 2s ease-in-out infinite;
        }

        .badge-price {
          background: linear-gradient(135deg, var(--green) 0%, #059669 100%);
          color: white;
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @media (max-width: 640px) {
          .intro-section {
            margin-top: 100px;
          }
          
          .signatures-cloud {
            gap: 15px 20px;
          }
          
          .signature {
            font-size: 14px !important;
          }
          
          .intro-benefits {
            gap: 8px;
          }
          
          .benefit-tag {
            font-size: 13px;
            padding: 10px 16px;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-inner">
          <img 
            src="/saludcompartida-dark-no-tagline.png" 
            alt="SaludCompartida" 
            className="nav-logo"
          />
          <div className="nav-help">
            ¿Dudas? <a href="/contacto">Contáctanos</a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Emotional Intro */}
      <section className="intro-section">
        <p className="intro-pretext">Estás a un paso de cuidarlos</p>
        <h1 className="intro-title serif">
          El amor que sientes<br/>
          <span className="highlight">ahora se convierte en protección</span>
        </h1>
      </section>

      {/* Registration */}
      <div className="registration">
        <div className="registration-wrapper">
          
          {/* Imagen */}
          <div className="registration-image">
            <img 
              src="/girl3.jpeg" 
              alt="Cuidando a tu familia con SaludCompartida"
            />
            <p className="registration-image-caption">
              "Ahora sé que mi mamá está acompañada"
            </p>
          </div>

        <div className="registration-container">
          
          <form onSubmit={handleSubmit}>
            <div className="form-card">
              {/* SECCIÓN USA */}
              <div className="form-header">
                <div className="form-icon usa">🇺🇸</div>
                <h1 className="form-title serif">Registro Rápido</h1>
                <p className="form-subtitle">Completa los datos del titular (USA) y usuario (México)</p>
              </div>

              <div className="form-section-title" style={{marginBottom: '24px', fontSize: '15px', color: 'var(--cyan)'}}>
                👤 TITULAR EN ESTADOS UNIDOS
              </div>

                <div className="form-section">
                  <div className="form-section-title">Nombre completo</div>
                  <div className="form-row three-col">
                    <div className="form-group">
                      <label className="form-label">Nombre <span className="required">*</span></label>
                      <input 
                        type="text"
                        name="migrant_first_name"
                        value={formData.migrant_first_name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Juan"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Apellido paterno <span className="required">*</span></label>
                      <input 
                        type="text"
                        name="migrant_last_name"
                        value={formData.migrant_last_name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="García"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Apellido materno</label>
                      <input 
                        type="text"
                        name="migrant_mother_last_name"
                        value={formData.migrant_mother_last_name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="López"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <div className="form-section-title">Información personal</div>
                  <div className="form-row two-col">
                    <div className="form-group">
                      <label className="form-label">Sexo <span className="required">*</span></label>
                      <select 
                        name="migrant_sex"
                        value={formData.migrant_sex}
                        onChange={handleChange}
                        className="form-select"
                        required
                      >
                        <option value="">Seleccionar</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Fecha de nacimiento <span className="required">*</span></label>
                      <input 
                        type="date"
                        name="migrant_birthdate"
                        value={formData.migrant_birthdate}
                        onChange={handleChange}
                        className="form-input date-input"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <div className="form-section-title">Contacto</div>
                  <div className="form-group">
                    <label className="form-label">Correo electrónico <span className="required">*</span></label>
                    <input 
                      type="email"
                      name="migrant_email"
                      value={formData.migrant_email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="#25D366">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Número de celular (WhatsApp) <span className="required">*</span>
                    </label>
                    <div className="phone-input-container">
                      <span className="phone-flag">🇺🇸 +1</span>
                      <input 
                        type="tel"
                        name="migrant_phone"
                        value={formData.migrant_phone}
                        onChange={handleChange}
                        className="form-input phone-input"
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                    <p className="phone-hint">
                      <strong>Escribe solo los 10 dígitos.</strong> El formato se aplica automáticamente.
                    </p>
                    <p className="phone-note">Nosotros agregamos el +1 automáticamente. No lo escribas.</p>
                  </div>
                </div>

                {/* SECCIÓN MÉXICO */}
                <div className="form-section-title" style={{marginTop: '48px', marginBottom: '24px', fontSize: '15px', color: 'var(--green)'}}>
                  🇲🇽 USUARIO EN MÉXICO
                </div>

                <div className="form-section">
                  <div className="form-section-title">Nombre completo</div>
                  <div className="form-row three-col">
                    <div className="form-group">
                      <label className="form-label">Nombre <span className="required">*</span></label>
                      <input 
                        type="text"
                        name="family_first_name"
                        value={formData.family_first_name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="María"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Apellido paterno <span className="required">*</span></label>
                      <input 
                        type="text"
                        name="family_last_name"
                        value={formData.family_last_name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="García"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Apellido materno</label>
                      <input 
                        type="text"
                        name="family_mother_last_name"
                        value={formData.family_mother_last_name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="López"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <div className="form-section-title">Información personal</div>
                  <div className="form-row two-col">
                    <div className="form-group">
                      <label className="form-label">Sexo <span className="required">*</span></label>
                      <select 
                        name="family_sex"
                        value={formData.family_sex}
                        onChange={handleChange}
                        className="form-select"
                        required
                      >
                        <option value="">Seleccionar</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Fecha de nacimiento <span className="required">*</span></label>
                      <input 
                        type="date"
                        name="family_birthdate"
                        value={formData.family_birthdate}
                        onChange={handleChange}
                        className="form-input date-input"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <div className="form-section-title">Contacto</div>
                  <div className="form-group">
                    <label className="form-label">Correo electrónico <span className="required">*</span></label>
                    <input 
                      type="email"
                      name="family_email"
                      value={formData.family_email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="email@ejemplo.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="#25D366">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Número de WhatsApp <span className="required">*</span>
                    </label>
                    <div className="phone-input-container">
                      <span className="phone-flag">🇲🇽 +52</span>
                      <input 
                        type="tel"
                        name="family_phone"
                        value={formData.family_phone}
                        onChange={handleChange}
                        className="form-input phone-input"
                        placeholder="55 1234 5678"
                        required
                      />
                    </div>
                    <p className="phone-hint">
                      <strong>Escribe solo los 10 dígitos.</strong> El formato se aplica automáticamente.
                    </p>
                    <p className="phone-note">Nosotros agregamos el +52 automáticamente. No lo escribas.</p>
                  </div>
                </div>

                <div className="form-section">
                  <div className="terms-checkbox">
                    <input 
                      type="checkbox"
                      id="terms_accepted"
                      name="terms_accepted"
                      checked={formData.terms_accepted}
                      onChange={(e) => setFormData(prev => ({ ...prev, terms_accepted: e.target.checked }))}
                      required
                    />
                    <label htmlFor="terms_accepted" className="terms-label">
                      He leído y acepto la <a href="/privacidad" target="_blank">Política de Privacidad</a> y los <a href="/terminos" target="_blank">Términos y Condiciones</a> <span className="required">*</span>
                    </label>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{width: '100%'}}>
                    {isSubmitting ? 'Procesando...' : 'Continuar al pago →'}
                  </button>
                </div>

                {error && (
                  <div className="error-message">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="15" y1="9" x2="9" y2="15"/>
                      <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                <div className="security-note">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <span>Podrás agregar hasta 3 usuarios más después en tu cuenta</span>
                </div>
              </div>

              <p className="footer-note">
                ¿Ya tienes cuenta? <a href="https://saludcompartida.app/login">Inicia sesión</a>
              </p>
            </form>

        </div>
        </div>
      </div>
    </>
  );
}
