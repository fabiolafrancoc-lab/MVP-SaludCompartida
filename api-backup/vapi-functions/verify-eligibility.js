import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

/**
 * FUNCIÓN PROPIETARIA #3: Verificar Elegibilidad de Servicios
 * 
 * Verifica qué servicios puede usar el usuario según su plan de membresía
 * y estado de cuenta.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      phone_number,
      service_type // telemedicine, pharmacy, therapy, emergency
    } = req.body;

    console.log('🔍 Verificando elegibilidad:', { phone_number, service_type });

    // Buscar usuario
    const { data: user, error: userError } = await supabase
      .from('registrations')
      .select('*, user_accounts(*)')
      .or(`migrant_phone.eq.${phone_number.replace(/\D/g, '')},family_phone.eq.${phone_number.replace(/\D/g, '')}`)
      .single();

    if (userError) {
      return res.status(404).json({ 
        success: false,
        eligible: false,
        message: 'No encontré tu registro. ¿Ya te suscribiste a Salud Compartida?' 
      });
    }

    // Verificar estado de cuenta (asumimos activa si existe)
    const accountActive = user.user_accounts && user.user_accounts.length > 0;
    
    // Definir servicios incluidos en membresía base
    const INCLUDED_SERVICES = {
      telemedicine: {
        included: true,
        limit: 'ilimitado',
        description: 'Consultas médicas 24/7 por videollamada'
      },
      pharmacy: {
        included: true,
        limit: 'ilimitado',
        discount: '30%',
        description: 'Descuentos en medicamentos en farmacias aliadas'
      },
      therapy: {
        included: true,
        limit: '2 sesiones/mes',
        description: 'Consultas con psicólogos certificados'
      },
      emergency: {
        included: true,
        limit: '24/7',
        description: 'Línea directa para emergencias médicas'
      }
    };

    const serviceInfo = INCLUDED_SERVICES[service_type];

    if (!serviceInfo) {
      return res.status(400).json({
        success: false,
        message: 'Servicio no reconocido. Pregúntame por: telemedicina, farmacia, terapia o emergencias.'
      });
    }

    // Construir respuesta
    return res.status(200).json({
      success: true,
      eligible: accountActive && serviceInfo.included,
      service: {
        name: service_type,
        included: serviceInfo.included,
        limit: serviceInfo.limit,
        description: serviceInfo.description,
        discount: serviceInfo.discount || null
      },
      account_status: accountActive ? 'active' : 'inactive',
      message: accountActive 
        ? `✅ Sí puedes usar ${service_type}. ${serviceInfo.description}. ${serviceInfo.limit ? `Límite: ${serviceInfo.limit}.` : ''}`
        : '❌ Tu cuenta no está activa. Primero necesitas suscribirte para acceder a los servicios.',
      user_info: {
        migrant_name: user.migrant_first_name,
        family_name: user.family_first_name,
        subscription_date: user.created_at
      }
    });

  } catch (error) {
    console.error('❌ Error en verify-eligibility:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Error al verificar elegibilidad',
      error: error.message 
    });
  }
}
