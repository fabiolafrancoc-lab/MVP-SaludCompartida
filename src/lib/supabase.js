// Configuración de Supabase usando el cliente oficial
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ozpffhjaknxwoueaojkh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96cGZmaGpha254d291ZWFvamtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MjA5MDUsImV4cCI6MjA3ODM5NjkwNX0.Co05GFfcqmANmlT5tiQ-2fpN6VYc3w2m3PSKdHFCvds';

// Crear cliente de Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Función para generar código de acceso único (6 caracteres alfanuméricos)
function generateAccessCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Sin O, 0, I, 1 para evitar confusión
  let code = 'SC';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code; // Ejemplo: SC2A4B, SCH7K9, etc.
}

// Insertar registro completo (migrante + familiar en una sola fila)
export async function insertRegistration(migrantData, familyData, trafficSource = 'direct') {
  const migrantAccessCode = generateAccessCode();
  const familyAccessCode = generateAccessCode();
  
  const newRegistration = {
    migrant_first_name: migrantData.firstName,
    migrant_last_name: migrantData.lastName,
    migrant_mother_last_name: migrantData.motherLastName || null,
    migrant_email: migrantData.email,
    migrant_country_code: migrantData.countryCode || '+1',
    migrant_phone: migrantData.phone,
    migrant_access_code: migrantAccessCode,
    family_first_name: familyData.firstName,
    family_last_name: familyData.lastName,
    family_mother_last_name: familyData.motherLastName || null,
    family_email: familyData.email || null,
    family_country_code: familyData.countryCode || '+52',
    family_phone: familyData.phone,
    family_access_code: familyAccessCode,
    family_country: familyData.country || null,
    traffic_source: trafficSource
  };

  console.log('🔄 Intentando guardar en Supabase:', newRegistration);
  
  try {
    const { data, error } = await supabase
      .from('registrations')
      .insert([newRegistration])
      .select();

    if (error) {
      console.error('❌ ERROR insertando registro:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ RESPUESTA de Supabase:', data);
    
    if (!data || data.length === 0) {
      console.error('❌ Supabase retornó vacío');
      return { 
        success: false, 
        error: 'No se pudo insertar en Supabase',
        migrantAccessCode,
        familyAccessCode 
      };
    }
    
    return { 
      success: true, 
      data: data[0], 
      migrantAccessCode,
      familyAccessCode 
    };
  } catch (error) {
    console.error('❌ ERROR REAL insertando registro:', error);
    return { success: false, error: error.message };
  }
}

// Buscar usuario por código de acceso
export async function getUserByAccessCode(accessCode) {
  try {
    // Buscar en códigos de migrante
    let { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('migrant_access_code', accessCode);
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      const user = data[0];
      return { 
        success: true, 
        data: {
          first_name: user.migrant_first_name,
          last_name: user.migrant_last_name,
          mother_last_name: user.migrant_mother_last_name,
          email: user.migrant_email,
          phone: user.migrant_phone,
          country_code: user.migrant_country_code,
          access_code: user.migrant_access_code,
          user_type: 'migrant',
          created_at: user.created_at
        }
      };
    }
    
    // Si no es código de migrante, buscar en códigos de familiar
    ({ data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('family_access_code', accessCode));
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      const user = data[0];
      return { 
        success: true, 
        data: {
          first_name: user.family_first_name,
          last_name: user.family_last_name,
          mother_last_name: user.family_mother_last_name,
          email: user.family_email,
          phone: user.family_phone,
          country_code: user.family_country_code,
          access_code: user.family_access_code,
          user_type: 'family',
          created_at: user.created_at
        }
      };
    }
    
    return { success: false, error: 'Código no encontrado' };
  } catch (error) {
    console.error('Error buscando usuario:', error);
    return { success: false, error: error.message };
  }
}

// Buscar usuario por teléfono
export async function getUserByPhone(phone) {
  try {
    // Buscar en teléfonos de migrante
    let { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('migrant_phone', phone);
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      const user = data[0];
      return { 
        success: true, 
        data: {
          first_name: user.migrant_first_name,
          last_name: user.migrant_last_name,
          mother_last_name: user.migrant_mother_last_name,
          email: user.migrant_email,
          phone: user.migrant_phone,
          country_code: user.migrant_country_code,
          access_code: user.migrant_access_code,
          user_type: 'migrant',
          created_at: user.created_at
        }
      };
    }
    
    // Si no es teléfono de migrante, buscar en teléfonos de familiar
    ({ data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('family_phone', phone));
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      const user = data[0];
      return { 
        success: true, 
        data: {
          first_name: user.family_first_name,
          last_name: user.family_last_name,
          mother_last_name: user.family_mother_last_name,
          email: user.family_email,
          phone: user.family_phone,
          country_code: user.family_country_code,
          access_code: user.family_access_code,
          user_type: 'family',
          created_at: user.created_at
        }
      };
    }
    
    return { success: false, error: 'Teléfono no encontrado' };
  } catch (error) {
    console.error('Error buscando usuario:', error);
    return { success: false, error: error.message };
  }
}

// Insertar datos de pre-checkout usando cliente oficial de Supabase
export async function insertPreCheckoutCustomer(customerData) {
  try {
    console.log('🔄 Intentando guardar pre-checkout:', customerData);
    
    const { data, error } = await supabase.rpc('insert_pre_checkout_customer', {
      p_first_name: customerData.first_name,
      p_last_name: customerData.last_name,
      p_email: customerData.email,
      p_phone: customerData.phone,
      p_country: customerData.country || 'USA',
      p_status: customerData.status || 'pending_payment',
      p_traffic_source: customerData.traffic_source || 'direct'
    });

    if (error) {
      console.error('❌ Error de Supabase:', error);
      throw error;
    }

    console.log('✅ Respuesta de Supabase:', data);

    // La función RPC retorna un array
    const savedData = Array.isArray(data) && data.length > 0 ? data[0] : data;

    if (!savedData || !savedData.id) {
      console.error('❌ No se obtuvo ID');
      return {
        success: false,
        error: 'Error al guardar información. Por favor intenta de nuevo.'
      };
    }

    console.log('✅ Pre-checkout guardado con ID:', savedData.id);
    return {
      success: true,
      data: savedData
    };
  } catch (error) {
    console.error('❌ Error insertando pre-checkout:', error);
    return {
      success: false,
      error: 'Error al guardar información. Por favor intenta de nuevo.'
    };
  }
}

export default {
  insertRegistration,
  getUserByAccessCode,
  getUserByPhone,
  insertPreCheckoutCustomer
};
