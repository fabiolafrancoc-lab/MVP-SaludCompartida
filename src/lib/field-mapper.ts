/**
 * FIELD MAPPER - Landing to Supabase Schema
 * 
 * Mapea campos de landing pages (Claude) a schema de Supabase
 * Evita errores de "column does not exist"
 * 
 * @author SaludCompartida Tech Team
 * @date 2026-01-28
 */

import type { RegistrationInsert } from './supabase';

// ============================================
// TIPOS DE DATOS DE LANDING PAGES
// ============================================

export interface LandingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode?: string;
}

export interface PreCheckoutData extends LandingFormData {
  trafficSource?: string;
  landingPage?: string;
  utmCampaign?: string;
  utmSource?: string;
  utmMedium?: string;
}

export interface RegistroFormData {
  // Migrante (USA)
  migrantFirstName: string;
  migrantLastName: string;
  migrantEmail: string;
  migrantPhone: string;
  migrantState: string;
  
  // Familia (México)
  familyFirstName: string;
  familyLastName: string;
  familyPhone: string;
  familyRelationship: string;
  
  // Plan
  planId: 'basico' | 'premium';
  planName: string;
  planPrice: number;
}

// ============================================
// FUNCIONES DE MAPEO
// ============================================

/**
 * Mapea datos de landing (Page 1) a formato pre_checkout
 */
export function mapLandingToPreCheckout(data: LandingFormData): PreCheckoutData {
  return {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.toLowerCase().trim(),
    phone: data.phone.replace(/\D/g, ''), // Solo números
    countryCode: data.countryCode || '+1',
    trafficSource: detectTrafficSource(),
    landingPage: typeof window !== 'undefined' ? window.location.pathname : '',
    utmCampaign: getUrlParam('utm_campaign'),
    utmSource: getUrlParam('utm_source'),
    utmMedium: getUrlParam('utm_medium'),
  };
}

/**
 * Mapea datos de registro completo (Page 2) a formato Supabase registrations
 */
export function mapRegistroToSupabase(data: RegistroFormData): Partial<RegistrationInsert> {
  return {
    // Mapeo: frontend → Supabase
    migrant_name: `${data.migrantFirstName} ${data.migrantLastName}`.trim(),
    migrant_email: data.migrantEmail.toLowerCase().trim(),
    migrant_phone: formatPhoneNumber(data.migrantPhone, '+1'),
    migrant_state: data.migrantState.toUpperCase(),
    
    principal_name: `${data.familyFirstName} ${data.familyLastName}`.trim(),
    principal_phone: formatPhoneNumber(data.familyPhone, '+52'),
    principal_relationship: data.familyRelationship.toLowerCase(),
    
    plan_id: data.planId === 'premium' ? 'premium' : 'basic',
    plan_name: data.planName,
    plan_price: data.planPrice,
    
    codigo_familia: generateFamilyCode(),
    status: 'pending',
  };
}

/**
 * Combina datos de Page 1 (landing) + Page 2 (registro)
 * Usado cuando usuario viene con datos pre-llenados de localStorage
 */
export function mergeLandingAndRegistro(
  landing: LandingFormData,
  registro: Partial<RegistroFormData>
): RegistroFormData {
  return {
    // Pre-llenar con datos de landing
    migrantFirstName: landing.firstName,
    migrantLastName: landing.lastName,
    migrantEmail: landing.email,
    migrantPhone: landing.phone,
    
    // Completar con datos de registro
    migrantState: registro.migrantState || '',
    familyFirstName: registro.familyFirstName || '',
    familyLastName: registro.familyLastName || '',
    familyPhone: registro.familyPhone || '',
    familyRelationship: registro.familyRelationship || '',
    planId: registro.planId || 'basico',
    planName: registro.planName || 'Plan Básico',
    planPrice: registro.planPrice || 12.00,
  };
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Genera código de familia único (6 caracteres alfanuméricos)
 * Excluye caracteres confusos: 0, O, I, 1
 */
export function generateFamilyCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Formatea número de teléfono con código de país
 */
export function formatPhoneNumber(phone: string, countryCode: string): string {
  // Remover todo excepto números
  const digits = phone.replace(/\D/g, '');
  
  // Si ya tiene código de país, retornar
  if (phone.startsWith('+')) {
    return phone;
  }
  
  // Agregar código de país
  return `${countryCode}${digits}`;
}

/**
 * Detecta fuente de tráfico desde URL o referrer
 */
function detectTrafficSource(): string {
  if (typeof window === 'undefined') return 'unknown';
  
  const path = window.location.pathname;
  const referrer = document.referrer.toLowerCase();
  
  // Rutas específicas
  if (path.includes('/instagram')) return 'instagram';
  if (path.includes('/facebook')) return 'facebook';
  if (path.includes('/tiktok')) return 'tiktok';
  
  // Referrer
  if (referrer.includes('facebook.com') || referrer.includes('fb.com')) return 'facebook';
  if (referrer.includes('instagram.com')) return 'instagram';
  if (referrer.includes('tiktok.com')) return 'tiktok';
  if (referrer.includes('google.com')) return 'google';
  if (referrer.includes('youtube.com')) return 'youtube';
  
  // UTM Source
  const utmSource = getUrlParam('utm_source');
  if (utmSource) return utmSource;
  
  // Default
  return referrer ? 'referral' : 'direct';
}

/**
 * Obtiene parámetro de URL
 */
function getUrlParam(param: string): string | null {
  if (typeof window === 'undefined') return null;
  
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**
 * Valida formato de email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida formato de teléfono USA (10 dígitos)
 */
export function isValidUSAPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10;
}

/**
 * Valida formato de teléfono México (10 dígitos)
 */
export function isValidMexicoPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10;
}

// ============================================
// TIPOS DE EXPORT PARA CLAUDE
// ============================================

/**
 * Formato esperado del formulario de Landing (Page 1)
 * Claude debe usar EXACTAMENTE estos nombres de campos
 */
export interface ClaudeLandingForm {
  firstName: string;      // Nombre del migrante (USA)
  lastName: string;       // Apellido del migrante (USA)
  email: string;          // Email del migrante (USA)
  phone: string;          // Teléfono del migrante (USA) - solo números
  countryCode?: string;   // Default: '+1'
}

/**
 * Formato esperado del formulario de Registro (Page 2)
 * Claude debe usar EXACTAMENTE estos nombres de campos
 */
export interface ClaudeRegistroForm {
  // Datos del migrante (USA) - Pre-llenados de Page 1
  migrantFirstName: string;
  migrantLastName: string;
  migrantEmail: string;
  migrantPhone: string;
  migrantState: string;           // Estado USA (2 letras: CA, TX, etc)
  
  // Datos del beneficiario principal (México)
  familyFirstName: string;
  familyLastName: string;
  familyPhone: string;            // Teléfono México (10 dígitos)
  familyRelationship: string;     // madre, padre, hermana, hijo, etc
  
  // Beneficiarios adicionales (opcional, hasta 3 más)
  additionalMembers?: Array<{
    firstName: string;
    lastName: string;
    relationship: string;
    phone?: string;
  }>;
  
  // Selección de plan
  planId: 'basico' | 'premium';   // basico = $12, premium = $18
  planName: string;
  planPrice: number;
}
