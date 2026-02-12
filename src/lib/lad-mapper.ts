/**
 * LAD (Llamando al Doctor) API Mapper
 * Mapea datos de Supabase a formato requerido por LAD API
 */

export interface LADPatientData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  birth_date: string;
  country_code: 'MX';
}

export interface LADConsultationRequest {
  patient: LADPatientData;
  service_type: 'telemedicine' | 'therapy';
  consultation_type: 'video' | 'chat' | 'phone';
  specialty?: string;
  external_id: string;
  partner_name: 'SaludCompartida';
  notes?: string;
}

/**
 * Mapea registro de Supabase a formato LAD
 */
export function mapSupabaseToLAD(
  registration: any,
  serviceType: 'telemedicine' | 'therapy',
  consultationType: 'video' | 'chat' | 'phone' = 'video'
): LADConsultationRequest {
  
  const cleanPhone = (registration.family_phone || '').replace(/\s+/g, '').replace(/[^\d]/g, '');
  const gender = registration.family_sex === 'M' ? 'male' : 'female';
  const lastName = registration.family_mother_last_name
    ? `${registration.family_last_name} ${registration.family_mother_last_name}`
    : registration.family_last_name;
  
  return {
    patient: {
      first_name: registration.family_first_name,
      last_name: lastName,
      email: registration.family_primary_email || registration.family_email,
      phone: cleanPhone,
      gender: gender,
      birth_date: registration.family_birthdate || '1980-01-01',
      country_code: 'MX'
    },
    service_type: serviceType,
    consultation_type: consultationType,
    specialty: serviceType === 'therapy' ? 'psychology' : 'general',
    external_id: registration.family_code,
    partner_name: 'SaludCompartida',
    notes: `Migrante: ${registration.migrant_first_name} ${registration.migrant_last_name} (${registration.migrant_email})`
  };
}

export function validateRegistrationForLAD(registration: any): {
  valid: boolean;
  missing: string[];
} {
  const missing: string[] = [];
  
  if (!registration.family_first_name) missing.push('family_first_name');
  if (!registration.family_last_name) missing.push('family_last_name');
  if (!registration.family_primary_email && !registration.family_email) missing.push('family_email');
  if (!registration.family_phone) missing.push('family_phone');
  if (!registration.family_sex) missing.push('family_sex');
  if (!registration.family_birthdate) missing.push('family_birthdate');
  
  return {
    valid: missing.length === 0,
    missing
  };
}
