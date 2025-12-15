// Funciones de utilidad para gestión de cuentas de usuario
import { supabase } from './supabaseClient';

/**
 * Obtener cuenta de usuario por código de acceso
 */
export async function getUserAccount(accessCode) {
  try {
    const { data, error } = await supabase
      .from('user_accounts')
      .select('*')
      .eq('access_code', accessCode)
      .single();

    if (error) throw error;
    
    return {
      success: true,
      account: data
    };
  } catch (error) {
    console.error('Error obteniendo cuenta:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Actualizar datos de perfil del usuario
 */
export async function updateUserProfile(accessCode, updates) {
  try {
    const { data, error } = await supabase
      .from('user_accounts')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('access_code', accessCode)
      .select()
      .single();

    if (error) throw error;

    // Registrar cambio en historial
    await logAccountChange(data.id, updates, 'user', 'Profile update');

    return {
      success: true,
      account: data
    };
  } catch (error) {
    console.error('Error actualizando perfil:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Actualizar preferencias de notificaciones
 */
export async function updateNotificationPreferences(accessCode, preferences) {
  try {
    const updates = {};
    if (preferences.email !== undefined) updates.notifications_email = preferences.email;
    if (preferences.sms !== undefined) updates.notifications_sms = preferences.sms;
    if (preferences.whatsapp !== undefined) updates.notifications_whatsapp = preferences.whatsapp;

    const { data, error } = await supabase
      .from('user_accounts')
      .update(updates)
      .eq('access_code', accessCode)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      preferences: {
        email: data.notifications_email,
        sms: data.notifications_sms,
        whatsapp: data.notifications_whatsapp
      }
    };
  } catch (error) {
    console.error('Error actualizando preferencias:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Actualizar estado de suscripción
 */
export async function updateSubscriptionStatus(accessCode, subscriptionData) {
  try {
    const updates = {
      subscription_status: subscriptionData.status,
      updated_at: new Date().toISOString()
    };

    if (subscriptionData.startDate) {
      updates.subscription_start_date = subscriptionData.startDate;
    }
    if (subscriptionData.endDate) {
      updates.subscription_end_date = subscriptionData.endDate;
    }
    if (subscriptionData.stripeCustomerId) {
      updates.stripe_customer_id = subscriptionData.stripeCustomerId;
    }
    if (subscriptionData.squareCustomerId) {
      updates.square_customer_id = subscriptionData.squareCustomerId;
    }

    const { data, error } = await supabase
      .from('user_accounts')
      .update(updates)
      .eq('access_code', accessCode)
      .select()
      .single();

    if (error) throw error;

    // Registrar cambio
    await logAccountChange(data.id, updates, 'system', 'Subscription status updated');

    return {
      success: true,
      account: data
    };
  } catch (error) {
    console.error('Error actualizando suscripción:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Actualizar último login
 */
export async function updateLastLogin(accessCode) {
  try {
    const { error } = await supabase
      .from('user_accounts')
      .update({ last_login_at: new Date().toISOString() })
      .eq('access_code', accessCode);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error actualizando last login:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Registrar cambio en historial
 */
async function logAccountChange(userAccountId, changes, changedBy = 'user', reason = '') {
  try {
    const changeRecords = Object.entries(changes).map(([field, newValue]) => ({
      user_account_id: userAccountId,
      field_changed: field,
      new_value: String(newValue),
      changed_by: changedBy,
      change_reason: reason
    }));

    const { error } = await supabase
      .from('account_change_history')
      .insert(changeRecords);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error registrando cambio:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Obtener historial de cambios de cuenta
 */
export async function getAccountHistory(accessCode) {
  try {
    // Primero obtener el user_account_id
    const { data: account } = await supabase
      .from('user_accounts')
      .select('id')
      .eq('access_code', accessCode)
      .single();

    if (!account) throw new Error('Cuenta no encontrada');

    // Obtener historial
    const { data, error } = await supabase
      .from('account_change_history')
      .select('*')
      .eq('user_account_id', account.id)
      .order('changed_at', { ascending: false })
      .limit(50);

    if (error) throw error;

    return {
      success: true,
      history: data
    };
  } catch (error) {
    console.error('Error obteniendo historial:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Crear cuenta de usuario desde registro
 */
export async function createUserAccountFromRegistration(registration, userType) {
  try {
    const isFamily = userType === 'family';
    
    const accountData = {
      registration_id: registration.id,
      access_code: isFamily ? registration.family_access_code : registration.migrant_access_code,
      user_type: userType,
      first_name: isFamily ? registration.family_first_name : registration.migrant_first_name,
      last_name: isFamily ? registration.family_last_name : registration.migrant_last_name,
      mother_last_name: isFamily ? registration.family_mother_last_name : registration.migrant_mother_last_name,
      email: isFamily ? registration.family_email : registration.migrant_email,
      country_code: isFamily ? registration.family_country_code : registration.migrant_country_code,
      phone: isFamily ? registration.family_phone : registration.migrant_phone,
      country: isFamily ? registration.family_country : 'US',
      subscription_status: 'trial',
      trial_end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 días
    };

    const { data, error } = await supabase
      .from('user_accounts')
      .insert(accountData)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      account: data
    };
  } catch (error) {
    console.error('Error creando cuenta:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
