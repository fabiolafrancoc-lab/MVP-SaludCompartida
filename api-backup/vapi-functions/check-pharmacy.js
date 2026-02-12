import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

/**
 * FUNCIÓN PROPIETARIA #2: Consultar Disponibilidad de Medicamentos en Farmacia
 * 
 * Busca medicamentos en el catálogo de farmacias aliadas y verifica
 * disponibilidad y precios con descuento.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      medication_name,
      phone_number,
      user_location = null // ciudad/estado del familiar en México
    } = req.body;

    console.log('💊 Consultando farmacia:', { medication_name, user_location });

    // Catálogo básico de medicamentos comunes (esto se expandirá con DB real)
    const MEDICATION_CATALOG = {
      'paracetamol': { 
        available: true, 
        price_regular: 45, 
        price_discounted: 32,
        discount: '30%',
        pharmacy: 'Farmacia Guadalajara',
        generic_available: true
      },
      'ibuprofeno': { 
        available: true, 
        price_regular: 60, 
        price_discounted: 42,
        discount: '30%',
        pharmacy: 'Farmacia del Ahorro',
        generic_available: true
      },
      'amoxicilina': { 
        available: true, 
        price_regular: 180, 
        price_discounted: 126,
        discount: '30%',
        pharmacy: 'Farmacias Similares',
        generic_available: true,
        requires_prescription: true
      },
      'losartan': { 
        available: true, 
        price_regular: 220, 
        price_discounted: 154,
        discount: '30%',
        pharmacy: 'Farmacia San Pablo',
        generic_available: true,
        requires_prescription: true
      },
      'metformina': { 
        available: true, 
        price_regular: 95, 
        price_discounted: 67,
        discount: '30%',
        pharmacy: 'Farmacias del Ahorro',
        generic_available: true,
        requires_prescription: true
      },
      'omeprazol': { 
        available: true, 
        price_regular: 150, 
        price_discounted: 105,
        discount: '30%',
        pharmacy: 'Farmacias Benavides',
        generic_available: true
      }
    };

    // Buscar medicamento (búsqueda flexible)
    const medicationKey = medication_name.toLowerCase().trim();
    let medicationInfo = MEDICATION_CATALOG[medicationKey];

    // Si no hay match exacto, buscar por similitud
    if (!medicationInfo) {
      const similarKeys = Object.keys(MEDICATION_CATALOG).filter(key => 
        key.includes(medicationKey) || medicationKey.includes(key)
      );
      
      if (similarKeys.length > 0) {
        medicationInfo = MEDICATION_CATALOG[similarKeys[0]];
      }
    }

    if (!medicationInfo) {
      return res.status(200).json({
        success: true,
        found: false,
        message: `No encontré "${medication_name}" en nuestro catálogo actual. ¿Puedes decirme el nombre completo o la marca? También puedo conectarte con un asesor de farmacia.`,
        suggestion: 'Intenta con el nombre genérico o la marca comercial'
      });
    }

    // Guardar consulta en historial
    await supabase
      .from('pharmacy_queries')
      .insert({
        phone_number: phone_number,
        medication_name: medication_name,
        medication_found: true,
        location: user_location,
        created_at: new Date().toISOString()
      });

    return res.status(200).json({
      success: true,
      found: true,
      medication: {
        name: medication_name,
        available: medicationInfo.available,
        pharmacy: medicationInfo.pharmacy,
        price_regular: medicationInfo.price_regular,
        price_with_discount: medicationInfo.price_discounted,
        savings: medicationInfo.price_regular - medicationInfo.price_discounted,
        discount_percentage: medicationInfo.discount,
        generic_available: medicationInfo.generic_available,
        requires_prescription: medicationInfo.requires_prescription || false
      },
      message: `✅ Sí tenemos ${medication_name}. El precio normal es $${medicationInfo.price_regular} MXN, pero con tu membresía pagas solo $${medicationInfo.price_discounted} MXN. ¡Ahorras $${medicationInfo.price_regular - medicationInfo.price_discounted} MXN! ${medicationInfo.requires_prescription ? '⚠️ Requiere receta médica.' : ''}`
    });

  } catch (error) {
    console.error('❌ Error en check-pharmacy:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Error al consultar farmacia',
      error: error.message 
    });
  }
}
