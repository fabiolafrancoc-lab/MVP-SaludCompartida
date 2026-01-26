import { createClient } from '@supabase/supabase-js';

// Tipos de la base de datos
export interface Database {
  public: {
    Tables: {
      registrations: {
        Row: Registration;
        Insert: RegistrationInsert;
        Update: RegistrationUpdate;
      };
      family_members: {
        Row: FamilyMember;
        Insert: FamilyMemberInsert;
        Update: FamilyMemberUpdate;
      };
      savings_records: {
        Row: SavingsRecord;
        Insert: SavingsRecordInsert;
        Update: SavingsRecordUpdate;
      };
      service_usage: {
        Row: ServiceUsage;
        Insert: ServiceUsageInsert;
        Update: ServiceUsageUpdate;
      };
    };
  };
}

// Registration Types
export interface Registration {
  id: number;
  codigo_familia: string;
  
  migrant_name: string;
  migrant_email: string;
  migrant_phone: string;
  migrant_state: string;
  
  principal_name: string;
  principal_phone: string;
  principal_relationship: string;
  
  plan_id: string;
  plan_name: string;
  plan_price: number;
  
  square_customer_id: string | null;
  square_subscription_id: string | null;
  square_payment_id: string | null;
  
  status: 'pending' | 'active' | 'cancelled' | 'expired' | 'paused';
  activated_at: string | null;
  last_payment_at: string | null;
  cancelled_at: string | null;
  
  created_at: string;
  updated_at: string;
}

export type RegistrationInsert = Omit<Registration, 'id' | 'created_at' | 'updated_at'>;
export type RegistrationUpdate = Partial<RegistrationInsert>;

export interface FamilyMember {
  id: number;
  registration_id: number;
  name: string;
  last_name: string | null;
  birth_date: string | null;
  phone: string | null;
  relationship: string;
  is_principal: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type FamilyMemberInsert = Omit<FamilyMember, 'id' | 'created_at' | 'updated_at'>;
export type FamilyMemberUpdate = Partial<FamilyMemberInsert>;

export interface SavingsRecord {
  id: number;
  registration_id: number;
  month: string;
  telemedicina_savings: number;
  farmacia_savings: number;
  terapia_savings: number;
  otros_savings: number;
  total_savings: number;
  created_at: string;
  updated_at: string;
}

export type SavingsRecordInsert = Omit<SavingsRecord, 'id' | 'created_at' | 'updated_at'>;
export type SavingsRecordUpdate = Partial<SavingsRecordInsert>;

export interface ServiceUsage {
  id: number;
  registration_id: number;
  family_member_id: number | null;
  service_type: 'telemedicina' | 'farmacia' | 'terapia' | 'especialista' | 'examen' | 'otro';
  description: string | null;
  amount_paid: number;
  amount_saved: number;
  used_at: string;
  created_at: string;
}

export type ServiceUsageInsert = Omit<ServiceUsage, 'id' | 'created_at'>;
export type ServiceUsageUpdate = Partial<ServiceUsageInsert>;

let supabaseClient: any = null;

export function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }

  supabaseClient = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return supabaseClient;
}

export async function createRegistration(data: RegistrationInsert): Promise<Registration> {
  const supabase = getSupabaseClient();
  
  const { data: registration, error } = await supabase
    .from('registrations')
    .insert(data)
    .select()
    .single();

  if (error) {
    console.error('Error creating registration:', error);
    throw new Error(`Failed to create registration: ${error.message}`);
  }

  return registration;
}

export async function getRegistrationByCode(codigoFamilia: string): Promise<Registration | null> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('registrations')
    .select()
    .eq('codigo_familia', codigoFamilia)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    console.error('Error fetching registration:', error);
    throw new Error(`Failed to fetch registration: ${error.message}`);
  }

  return data;
}

export async function updateUserByAccessCode(codigoFamilia: string, updates: RegistrationUpdate): Promise<Registration> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('registrations')
    .update(updates)
    .eq('codigo_familia', codigoFamilia)
    .select()
    .single();

  if (error) {
    console.error('Error updating registration:', error);
    throw new Error(`Failed to update registration: ${error.message}`);
  }

  return data;
}

export function generateRegistrationId(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `${timestamp}${random.toString().padStart(4, '0')}`;
}

export function generateCodigoFamilia(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'SC-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// ALIAS: insertRegistration -> createRegistration (para compatibilidad)
export async function insertRegistration(data: RegistrationInsert): Promise<Registration> {
  return createRegistration(data);
}

// ALIAS: getUserByAccessCode -> getRegistrationByCode (para compatibilidad)
export async function getUserByAccessCode(codigoFamilia: string): Promise<Registration | null> {
  return getRegistrationByCode(codigoFamilia);
}

// Guardar dependientes (family members)
export async function saveDependents(registrationId: number, dependents: FamilyMemberInsert[]): Promise<FamilyMember[]> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('family_members')
    .insert(dependents)
    .select();

  if (error) {
    console.error('Error saving dependents:', error);
    throw new Error(`Failed to save dependents: ${error.message}`);
  }

  return data;
}

// Obtener dependientes por código de familia
export async function getDependentsByAccessCode(codigoFamilia: string): Promise<FamilyMember[]> {
  const supabase = getSupabaseClient();
  
  // Primero obtener la registration
  const registration = await getRegistrationByCode(codigoFamilia);
  if (!registration) {
    return [];
  }

  const { data, error } = await supabase
    .from('family_members')
    .select()
    .eq('registration_id', registration.id)
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching dependents:', error);
    throw new Error(`Failed to fetch dependents: ${error.message}`);
  }

  return data || [];
}
