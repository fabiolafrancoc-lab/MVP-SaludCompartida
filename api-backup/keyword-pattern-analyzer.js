/**
 * SISTEMA DE CAPTURA Y ANÁLISIS DE PALABRAS CLAVE
 * 
 * Objetivo: Identificar patrones de comportamiento del segmento base de la pirámide
 * en América Latina. Esta información NO EXISTE actualmente y es extremadamente valiosa.
 * 
 * Categorías de captura:
 * 1. Salud (síntomas, enfermedades mencionadas, remedios)
 * 2. Económico (trabajo, dinero, gastos, necesidades)
 * 3. Emocional (sentimientos expresados, preocupaciones, alegrías)
 * 4. Social (familia, relaciones, comunidad, soledad)
 * 5. Cultural (costumbres, creencias, tradiciones, religión)
 * 6. Migración (nostalgia, adaptación, documentos, discriminación)
 */

import { createClient } from '@supabase/supabase-js';

// Helper function to get Supabase client (lazy initialization)
function getSupabaseClient() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
}

/**
 * Categorías y palabras clave a detectar
 */
const KEYWORD_CATEGORIES = {
  // SALUD - Síntomas y condiciones
  salud_sintomas: {
    keywords: [
      'dolor', 'duele', 'me duele', 'molestia', 'malestar',
      'cansancio', 'cansado', 'fatigado', 'débil', 'debilidad',
      'mareo', 'mareado', 'vértigo',
      'presión', 'presión alta', 'presión baja',
      'azúcar', 'diabetes', 'diabético',
      'corazón', 'pecho', 'respirar', 'respiración',
      'cabeza', 'dolor de cabeza', 'migraña',
      'estómago', 'barriga', 'panza', 'digestión',
      'dormir', 'insomnio', 'sueño', 'pesadillas',
      'hinchazón', 'hinchado', 'inflamado',
      'tos', 'gripe', 'catarro', 'resfriado'
    ],
    importance: 'high'
  },

  salud_medicamentos: {
    keywords: [
      'pastilla', 'pastillas', 'medicina', 'medicamento',
      'doctor', 'médico', 'consulta', 'cita médica',
      'receta', 'farmacia', 'remedios',
      'metformina', 'insulina', 'losartán', 'aspirina',
      'tomo', 'tomando', 'inyección', 'inyecto',
      'me recetaron', 'me dieron', 'me mandaron'
    ],
    importance: 'high'
  },

  salud_remedios_caseros: {
    keywords: [
      'té', 'tecito', 'hierbas', 'manzanilla', 'hierba buena',
      'limón', 'miel', 'ajo', 'cebolla', 'jengibre',
      'vaporub', 'alcohol', 'pomada', 'sobada', 'sobado',
      'curandero', 'yerbero', 'santiguada',
      'remedio casero', 'remedio de la abuela'
    ],
    importance: 'medium'
  },

  // ECONÓMICO - Situación financiera
  economico_trabajo: {
    keywords: [
      'trabajo', 'trabajar', 'trabajando', 'empleo', 'chambear', 'chamba',
      'jale', 'jalar', 'patrón', 'jefe', 'cheque', 'sueldo', 'salario',
      'pago', 'me pagan', 'gano', 'ganaba',
      'construcción', 'limpieza', 'cocina', 'restaurante',
      'jardinería', 'cuidar niños', 'nana', 'niñera',
      'uber', 'taxi', 'delivery', 'repartidor',
      'desempleado', 'sin trabajo', 'busco trabajo'
    ],
    importance: 'high'
  },

  economico_dinero: {
    keywords: [
      'dinero', 'plata', 'feria', 'lana', 'centavos',
      'caro', 'barato', 'no tengo', 'no me alcanza',
      'deuda', 'debo', 'prestado', 'prestar', 'pagar',
      'renta', 'alquiler', 'luz', 'agua', 'gas',
      'comida', 'mercado', 'super', 'despensa',
      'ahorro', 'ahorrar', 'guardado',
      'mandar', 'enviar', 'remesa', 'western union'
    ],
    importance: 'high'
  },

  // EMOCIONAL - Estados y sentimientos
  emocional_tristeza: {
    keywords: [
      'triste', 'tristeza', 'deprimido', 'depresión',
      'solo', 'sola', 'soledad', 'me siento solo',
      'llorar', 'lloro', 'lágrimas',
      'pena', 'me da pena', 'vergüenza',
      'preocupado', 'preocupación', 'angustia', 'ansiedad',
      'miedo', 'temor', 'asustado', 'nervioso',
      'desesperado', 'desesperación', 'no puedo más',
      'cansado de', 'harto', 'ya no aguanto'
    ],
    importance: 'high'
  },

  emocional_alegria: {
    keywords: [
      'feliz', 'contento', 'contenta', 'alegre', 'alegría',
      'bien', 'mejor', 'bendecido', 'bendición',
      'gracias a Dios', 'afortunado', 'agradecido',
      'emocionado', 'ilusionado',
      'reír', 'risa', 'chistoso', 'divertido'
    ],
    importance: 'medium'
  },

  emocional_estres: {
    keywords: [
      'estrés', 'estresado', 'presionado',
      'no duermo', 'mal dormido', 'insomnio',
      'preocupado', 'dar vueltas', 'pensando mucho',
      'agobiado', 'abrumado', 'mucha carga'
    ],
    importance: 'high'
  },

  // SOCIAL - Relaciones y familia
  social_familia: {
    keywords: [
      'hijo', 'hija', 'hijos', 'familia',
      'esposo', 'esposa', 'pareja', 'marido', 'mujer',
      'nieto', 'nieta', 'nietos',
      'mamá', 'madre', 'papá', 'padre',
      'hermano', 'hermana', 'primo', 'tío', 'tía',
      'suegra', 'suegro', 'yerno', 'nuera',
      'compadre', 'comadre', 'ahijado'
    ],
    importance: 'medium'
  },

  social_conflictos: {
    keywords: [
      'pelea', 'pleito', 'discusión', 'problema con',
      'no me habla', 'enojado', 'enojada', 'molesto',
      'no se llevan', 'conflicto', 'no me entiende',
      'me ignora', 'me trata mal', 'abuso',
      'violencia', 'me pega', 'me grita',
      'divorcio', 'separación', 'dejé a', 'me dejó'
    ],
    importance: 'high'
  },

  social_soledad: {
    keywords: [
      'solo', 'sola', 'soledad', 'nadie', 'sin compañía',
      'no tengo amigos', 'no tengo a nadie',
      'me dejan solo', 'no me visitan', 'no me llaman',
      'extraño', 'me hace falta', 'quisiera tener'
    ],
    importance: 'high'
  },

  // CULTURAL - Costumbres y creencias
  cultural_religion: {
    keywords: [
      'Dios', 'diosito', 'Señor', 'Jesús', 'Cristo',
      'Virgen', 'virgencita', 'Guadalupe',
      'santo', 'santa', 'san', 'rezar', 'rezo', 'oración',
      'misa', 'iglesia', 'padre', 'sacerdote',
      'fe', 'creo en', 'bendición', 'milagro',
      'promesa', 'manda', 'cruz', 'rosario'
    ],
    importance: 'medium'
  },

  cultural_tradiciones: {
    keywords: [
      'día de muertos', 'altar', 'ofrenda',
      'posada', 'navidad', 'año nuevo',
      'quinceañera', 'bautizo', 'primera comunión', 'boda',
      'fiesta', 'celebración', 'cumpleaños',
      'comida típica', 'tamales', 'mole', 'pozole',
      'mariachi', 'banda', 'norteño'
    ],
    importance: 'low'
  },

  // MIGRACIÓN - Experiencia migrante
  migracion_nostalgia: {
    keywords: [
      'extraño', 'echo de menos', 'me hace falta',
      'mi pueblo', 'mi tierra', 'mi rancho', 'mi país',
      'México', 'allá', 'cuando vivía en',
      'quisiera volver', 'regresar', 'visitar',
      'no he visto', 'hace años que no'
    ],
    importance: 'high'
  },

  migracion_documentos: {
    keywords: [
      'papeles', 'documentos', 'permiso', 'visa',
      'migración', 'migratorio', 'ilegal', 'indocumentado',
      'cruzar', 'frontera', 'ICE', 'deportación',
      'residencia', 'ciudadanía', 'green card',
      'miedo a', 'no puedo salir'
    ],
    importance: 'high'
  },

  migracion_discriminacion: {
    keywords: [
      'discriminación', 'racismo', 'me tratan mal',
      'por ser mexicano', 'por mi acento', 'no hablo inglés',
      'me miran feo', 'me insultan', 'mojado', 'ilegal',
      'no me dan trabajo por', 'no me entienden'
    ],
    importance: 'high'
  },

  // NECESIDADES - Carencias expresadas
  necesidades_basicas: {
    keywords: [
      'necesito', 'me falta', 'no tengo', 'quisiera',
      'ayuda', 'apoyo', 'quién me ayude',
      'cómo consigo', 'dónde puedo', 'a dónde voy'
    ],
    importance: 'high'
  },

  // ============================================================================
  // CRISIS SOCIAL - PATRONES DE ALTO RIESGO (Para alertas B2G/NGO)
  // ============================================================================
  
  crisis_violencia: {
    keywords: [
      'me pega', 'me golpea', 'me pegó', 'golpes', 'moretones',
      'violencia', 'abuso', 'maltrato', 'me lastima',
      'tengo miedo de', 'amenaza', 'me amenaza',
      'pandillas', 'bandas', 'narco', 'extorsión',
      'balacera', 'disparos', 'peligro', 'inseguro', 'inseguridad'
    ],
    importance: 'critical'
  },

  crisis_trabajo_infantil: {
    keywords: [
      'mi hijo trabaja', 'mi hija trabaja', 'niño trabajando',
      'no va a la escuela', 'dejó la escuela', 'salió de la escuela',
      'tiene que trabajar', 'ayudar a la familia',
      'en la calle vendiendo', 'vendiendo chicles', 'limpiando carros'
    ],
    importance: 'critical'
  },

  crisis_trata_personas: {
    keywords: [
      'la obligaron', 'no puede salir', 'no la dejan salir',
      'le quitaron documentos', 'sin papeles', 'retenida',
      'prostitución', 'explotación', 'trabajar sin pago',
      'tráfico', 'la vendieron', 'se la llevaron'
    ],
    importance: 'critical'
  },

  crisis_salud_mental: {
    keywords: [
      'quiero morir', 'me quiero morir', 'suicidio', 'quitarme la vida',
      'no tiene sentido', 'ya no aguanto más', 'mejor muerto',
      'pensamientos de', 'acabar con todo', 'desaparecer',
      'autolesión', 'me corto', 'me lastimo', 'me hago daño'
    ],
    importance: 'critical'
  },

  crisis_adicciones: {
    keywords: [
      'drogas', 'droga', 'drogado', 'piedra', 'cristal',
      'cocaína', 'coca', 'mariguana', 'mota',
      'alcohol', 'alcoholismo', 'tomar', 'borracho', 'tomado',
      'adicto', 'adicción', 'vicio', 'no puedo dejar',
      'rehab', 'rehabilitación', 'clínica'
    ],
    importance: 'critical'
  },

  // ============================================================================
  // NECESIDADES BÁSICAS - Para insights B2G (World Bank, BID)
  // ============================================================================

  basicas_agua: {
    keywords: [
      'agua', 'sin agua', 'no hay agua', 'cortan el agua',
      'agua sucia', 'agua contaminada', 'no llega agua',
      'garrafón', 'pipa de agua', 'cisterna',
      'no tenemos para agua', 'comprar agua'
    ],
    importance: 'high'
  },

  basicas_alimentacion: {
    keywords: [
      'hambre', 'no hay comida', 'sin comer', 'no he comido',
      'comida', 'no tengo para comer', 'sin alimento',
      'banco de alimentos', 'despensa', 'comedor',
      'tortillas', 'frijoles', 'arroz', 'huevo',
      'desnutrición', 'desnutrido', 'flaco', 'bajo de peso'
    ],
    importance: 'high'
  },

  basicas_vivienda: {
    keywords: [
      'casa', 'vivienda', 'techo', 'sin casa', 'homeless',
      'cuarto', 'rento', 'alquiler', 'renta cara',
      'hacinamiento', 'muchos en un cuarto', 'compartimos',
      'humedad', 'goteras', 'frío', 'calor extremo',
      'no tengo dónde', 'me van a correr', 'desalojo'
    ],
    importance: 'high'
  },

  basicas_educacion: {
    keywords: [
      'escuela', 'primaria', 'secundaria', 'preparatoria',
      'no fue a la escuela', 'no pudo estudiar', 'dejó de estudiar',
      'no sabe leer', 'no sabe escribir', 'analfabeta',
      'quiere estudiar', 'sueño de estudiar', 'terminar la escuela',
      'útiles escolares', 'uniformes', 'libros', 'colegiatura'
    ],
    importance: 'medium'
  },

  // ============================================================================
  // PRODUCTOS Y MARCAS - Para insights B2B (CPG companies)
  // ============================================================================

  productos_farmacia: {
    keywords: [
      // Marcas de medicamentos (genéricos comunes)
      'metformina', 'losartán', 'enalapril', 'simvastatina',
      'omeprazol', 'ranitidina', 'ibuprofeno', 'paracetamol',
      'aspirina', 'captopril', 'glibenclamida', 'amlodipino',
      
      // Farmacias
      'similares', 'del ahorro', 'guadalajara', 'benavides',
      'san pablo', 'farmacia', 'botica', 'genérico',
      
      // Patterns de compra
      'cada mes compro', 'me dura', 'me alcanza para',
      'caro', 'barato', 'genérico', 'de marca'
    ],
    importance: 'high'
  },

  productos_limpieza: {
    keywords: [
      // Detergentes y limpieza
      'pinol', 'fabuloso', 'maestro limpio', 'cloralex',
      'ariel', 'roma', 'salvo', 'vel rosita',
      'jabón', 'detergente', 'cloro', 'suavitel',
      
      // Patterns de uso
      'rinde', 'dura más', 'compro el chico', 'compro el grande',
      'envase pequeño', 'sachet', 'bolsita', 'individual',
      'no me alcanza para', 'junto para comprar'
    ],
    importance: 'medium'
  },

  productos_alimentos: {
    keywords: [
      // Marcas mexicanas comunes
      'bimbo', 'marinela', 'sabritas', 'coca cola', 'pepsi',
      'maseca', 'minsa', 'nestle', 'herdez', 'la costeña',
      'lala', 'alpura', 'santa clara',
      
      // Productos básicos
      'leche', 'pan', 'tortillas', 'huevo', 'frijol', 'arroz',
      'aceite', 'azúcar', 'sal', 'café',
      
      // Patterns
      'compro a granel', 'por kilo', 'suelto', 'en el tianguis',
      'en el mercado', 'más barato', 'me rinde más'
    ],
    importance: 'medium'
  },

  productos_higiene: {
    keywords: [
      // Marcas
      'colgate', 'palmolive', 'suavitel', 'downy',
      'kotex', 'saba', 'always', 'gillette',
      'dove', 'pantene', 'head shoulders', 'sedal',
      
      // Productos
      'pasta de dientes', 'cepillo', 'shampoo', 'jabón',
      'desodorante', 'papel de baño', 'toallas sanitarias',
      
      // Patterns
      'sale caro', 'compro el económico', 'dura poco'
    ],
    importance: 'low'
  },

  // ============================================================================
  // COMPORTAMIENTO FINANCIERO - Para analytics predictivo
  // ============================================================================

  financiero_remesas: {
    keywords: [
      'mandar dinero', 'enviar dinero', 'transferir',
      'western union', 'moneygram', 'xoom', 'remitly', 'ria',
      'cuánto mandas', 'cuánto envías', 'cada cuánto',
      'comisión', 'tarifa', 'tipo de cambio', 'tarda',
      'quincenal', 'semanal', 'mensual', 'cada mes'
    ],
    importance: 'high'
  },

  financiero_ahorro: {
    keywords: [
      'ahorro', 'ahorrar', 'guardado', 'guardando',
      'banco', 'cuenta', 'cajita', 'alcancía',
      'no puedo ahorrar', 'no me queda', 'no alcanza',
      'junto para', 'estoy juntando', 'poco a poco',
      'meta', 'objetivo', 'quiero juntar'
    ],
    importance: 'medium'
  },

  financiero_deuda: {
    keywords: [
      'deuda', 'debo', 'préstamo', 'prestado', 'empeñado',
      'caja de ahorro', 'tanda', 'crédito', 'fiado',
      'no puedo pagar', 'me están cobrando', 'intereses',
      'agiotista', 'usurero', 'amenazas', 'debo meses'
    ],
    importance: 'high'
  },

  financiero_sensibilidad_precio: {
    keywords: [
      'caro', 'muy caro', 'carísimo', 'barato',
      'subió el precio', 'aumentó', 'antes costaba',
      'ya no alcanza', 'no me alcanza', 'no puedo comprar',
      'oferta', 'descuento', 'promoción', '2x1',
      'espero a que baje', 'cuando haya dinero'
    ],
    importance: 'medium'
  },

  // ============================================================================
  // MIGRACIÓN EXPANDIDA - Para predictive analytics
  // ============================================================================

  migracion_intencion: {
    keywords: [
      'me quiero ir', 'quiero cruzar', 'irme al norte',
      'buscar mejor vida', 'oportunidades allá',
      'coyote', 'pollero', 'cuánto cuesta cruzar',
      'visa', 'tramitar papeles', 'pasaporte',
      'trabajo en usa', 'me dijeron que allá'
    ],
    importance: 'high'
  },

  migracion_familia_separada: {
    keywords: [
      'mi familia está allá', 'mis hijos están en',
      'mi esposo está en usa', 'mi esposa se fue',
      'no los he visto', 'años sin verlos',
      'por videollamada', 'solo por teléfono',
      'me quedé solo', 'se fueron', 'me dejaron'
    ],
    importance: 'high'
  },

  migracion_retorno: {
    keywords: [
      'quiero regresar', 'volver a méxico', 'regresar a mi tierra',
      'deportado', 'me deportaron', 'me regresaron',
      'ya no aguanto aquí', 'mejor allá',
      'juntar para volver', 'cuando tenga dinero regreso'
    ],
    importance: 'medium'
  },

  // ============================================================================
  // TELECOMUNICACIONES - Para partnerships con carriers
  // ============================================================================

  telecom_proveedor: {
    keywords: [
      'telcel', 'movistar', 'at&t', 'unefon', 'virgin',
      'plan', 'paquete', 'megas', 'gigas', 'datos',
      'se me acaban', 'no tengo saldo', 'recargar',
      'wifi', 'internet', 'sin internet', 'no tengo internet'
    ],
    importance: 'medium'
  },

  telecom_uso: {
    keywords: [
      'llamadas internacionales', 'llamar a méxico', 'llamar a usa',
      'whatsapp', 'facebook', 'messenger', 'videollamada',
      'gastar datos', 'consume mucho', 'se acaban rápido',
      'solo con wifi', 'busco wifi gratis'
    ],
    importance: 'medium'
  },

  telecom_pain_points: {
    keywords: [
      'caro', 'muy caro', 'no me alcanza para plan',
      'no tengo señal', 'mala señal', 'se cae la llamada',
      'lento', 'muy lento el internet', 'no carga',
      'me cobran de más', 'cargos extras', 'no entiendo mi recibo'
    ],
    importance: 'medium'
  },

  // ============================================================================
  // OPORTUNIDADES - Para insights de movilidad social
  // ============================================================================

  oportunidades_emprendimiento: {
    keywords: [
      'negocio', 'poner un negocio', 'quiero emprender',
      'vender', 'cocinar para vender', 'hacer tamales',
      'trabajar por mi cuenta', 'independiente',
      'tienda', 'puesto', 'ambulante', 'en mi casa',
      'clientes', 'ventas', 'ganancias', 'invertir'
    ],
    importance: 'high'
  },

  oportunidades_educacion: {
    keywords: [
      'estudiar', 'terminar la escuela', 'sacar el grado',
      'curso', 'capacitación', 'certificado', 'título',
      'aprender', 'inglés', 'computación', 'oficio',
      'quiero ser', 'sueño con', 'me gustaría estudiar',
      'beca', 'gratuito', 'gratis', 'en línea'
    ],
    importance: 'high'
  },

  oportunidades_empleo: {
    keywords: [
      'mejor trabajo', 'cambiar de trabajo', 'busco trabajo',
      'ascenso', 'promoción', 'subir de puesto',
      'más sueldo', 'mejor pagado', 'con prestaciones',
      'seguro social', 'imss', 'vacaciones', 'aguinaldo',
      'contrato', 'planta', 'base', 'sindicato'
    ],
    importance: 'high'
  },

  // ============================================================================
  // COMPARTIR Y ECONOMÍA COLABORATIVA - Comportamiento único del segmento
  // ============================================================================

  economia_compartir: {
    keywords: [
      'compartimos', 'compartir', 'entre varios', 'cooperamos',
      'nos juntamos para', 'entre todos', 'ponemos entre',
      'vamos juntos a', 'dividimos', 'a medias',
      'me presta', 'le presto', 'prestamos', 'turnamos',
      'comprar entre todos', 'compra en grupo'
    ],
    importance: 'high'
  },

  economia_informal: {
    keywords: [
      'cash', 'efectivo', 'en mano', 'sin recibo',
      'por fuera', 'sin contrato', 'de palabra',
      'por día', 'por semana', 'me pagan diario',
      'no está dado de alta', 'sin papeles', 'informal',
      'tianguis', 'mercado sobre ruedas', 'vendedor ambulante'
    ],
    importance: 'medium'
  }
};

/**
 * Analiza un mensaje y extrae palabras clave por categoría
 */
export async function analyzeKeywords(userId, message) {
  const lowerMessage = message.toLowerCase();
  const detectedKeywords = [];
  
  // Recorrer todas las categorías y buscar coincidencias
  for (const [category, data] of Object.entries(KEYWORD_CATEGORIES)) {
    const foundKeywords = data.keywords.filter(keyword => 
      lowerMessage.includes(keyword.toLowerCase())
    );
    
    if (foundKeywords.length > 0) {
      detectedKeywords.push({
        category,
        keywords: foundKeywords,
        importance: data.importance,
        detectedAt: new Date().toISOString()
      });
    }
  }
  
  // Si se detectaron palabras clave, guardar en base de datos
  if (detectedKeywords.length > 0) {
    await saveKeywordAnalysis(userId, message, detectedKeywords);
  }
  
  return detectedKeywords;
}

/**
 * Guarda el análisis de palabras clave en la base de datos
 */
async function saveKeywordAnalysis(userId, originalMessage, detectedKeywords) {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('keyword_analysis')
      .insert({
        user_id: userId,
        message_text: originalMessage,
        detected_keywords: detectedKeywords,
        total_categories: detectedKeywords.length,
        has_high_importance: detectedKeywords.some(k => k.importance === 'high'),
        created_at: new Date().toISOString()
      });
    
    if (error) {
      console.error('❌ Error saving keyword analysis:', error);
    } else {
      console.log('✅ Keyword analysis saved:', detectedKeywords.map(k => k.category).join(', '));
    }
  } catch (err) {
    console.error('❌ Exception saving keyword analysis:', err);
  }
}

/**
 * Obtiene patrones agregados de comportamiento de un usuario
 */
export async function getUserBehaviorPatterns(userId) {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('keyword_analysis')
      .select('detected_keywords, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (error) throw error;
    
    // Agregar por categoría
    const categoryFrequency = {};
    const keywordFrequency = {};
    
    data.forEach(record => {
      record.detected_keywords.forEach(item => {
        // Contar categorías
        categoryFrequency[item.category] = (categoryFrequency[item.category] || 0) + 1;
        
        // Contar palabras clave individuales
        item.keywords.forEach(keyword => {
          keywordFrequency[keyword] = (keywordFrequency[keyword] || 0) + 1;
        });
      });
    });
    
    return {
      totalMessages: data.length,
      categoryFrequency,
      keywordFrequency,
      topCategories: Object.entries(categoryFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([cat, count]) => ({ category: cat, count })),
      topKeywords: Object.entries(keywordFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([word, count]) => ({ keyword: word, count }))
    };
  } catch (err) {
    console.error('❌ Error getting behavior patterns:', err);
    return null;
  }
}

/**
 * Obtiene patrones agregados de toda la población (análisis demográfico)
 */
export async function getPopulationPatterns(filters = {}) {
  try {
    const supabase = getSupabaseClient();
    let query = supabase
      .from('keyword_analysis')
      .select(`
        detected_keywords,
        created_at,
        ai_companions!inner(
          user_gender,
          user_age,
          user_region
        )
      `);
    
    // Aplicar filtros demográficos si existen
    if (filters.gender) {
      query = query.eq('ai_companions.user_gender', filters.gender);
    }
    if (filters.ageMin && filters.ageMax) {
      query = query.gte('ai_companions.user_age', filters.ageMin)
                   .lte('ai_companions.user_age', filters.ageMax);
    }
    if (filters.region) {
      query = query.eq('ai_companions.user_region', filters.region);
    }
    
    const { data, error } = await query.limit(1000);
    
    if (error) throw error;
    
    // Análisis agregado
    const analysis = {
      totalSamples: data.length,
      categoryDistribution: {},
      
      // Categorías originales
      topHealthSymptoms: {},
      topEmotionalStates: {},
      topEconomicIssues: {},
      migrationThemes: {},
      culturalElements: {},
      
      // NUEVAS CATEGORÍAS PARA B2B/B2G
      crisisAlerts: {
        violence: 0,
        childLabor: 0,
        trafficking: 0,
        mentalHealth: 0,
        addiction: 0
      },
      basicNeeds: {
        water: 0,
        food: 0,
        housing: 0,
        education: 0
      },
      productBehavior: {
        pharmacyBrands: {},
        cleaningProducts: {},
        foodBrands: {},
        pricePatterns: {}
      },
      financialBehavior: {
        remittanceProviders: {},
        savingsPatterns: {},
        debtPatterns: {},
        priceSensitivity: {}
      },
      migrationInsights: {
        migrationIntent: 0,
        separatedFamily: 0,
        returnIntent: 0
      },
      telecomUsage: {
        providers: {},
        usagePatterns: {},
        painPoints: {}
      },
      opportunities: {
        entrepreneurship: 0,
        education: 0,
        employment: 0
      },
      collaborativeEconomy: {
        sharingBehavior: 0,
        informalEconomy: 0
      }
    };
    
    data.forEach(record => {
      record.detected_keywords.forEach(item => {
        const cat = item.category;
        analysis.categoryDistribution[cat] = (analysis.categoryDistribution[cat] || 0) + 1;
        
        // Categorizar por tipo
        if (cat.startsWith('salud_')) {
          item.keywords.forEach(kw => {
            analysis.topHealthSymptoms[kw] = (analysis.topHealthSymptoms[kw] || 0) + 1;
          });
        } else if (cat.startsWith('emocional_')) {
          item.keywords.forEach(kw => {
            analysis.topEmotionalStates[kw] = (analysis.topEmotionalStates[kw] || 0) + 1;
          });
        } else if (cat.startsWith('economico_')) {
          item.keywords.forEach(kw => {
            analysis.topEconomicIssues[kw] = (analysis.topEconomicIssues[kw] || 0) + 1;
          });
        } else if (cat.startsWith('migracion_')) {
          item.keywords.forEach(kw => {
            analysis.migrationThemes[kw] = (analysis.migrationThemes[kw] || 0) + 1;
          });
        } else if (cat.startsWith('cultural_')) {
          item.keywords.forEach(kw => {
            analysis.culturalElements[kw] = (analysis.culturalElements[kw] || 0) + 1;
          });
        }
        
        // NUEVAS CATEGORÍAS
        else if (cat.startsWith('crisis_')) {
          if (cat === 'crisis_violencia') analysis.crisisAlerts.violence++;
          else if (cat === 'crisis_trabajo_infantil') analysis.crisisAlerts.childLabor++;
          else if (cat === 'crisis_trata_personas') analysis.crisisAlerts.trafficking++;
          else if (cat === 'crisis_salud_mental') analysis.crisisAlerts.mentalHealth++;
          else if (cat === 'crisis_adicciones') analysis.crisisAlerts.addiction++;
        }
        else if (cat.startsWith('basicas_')) {
          if (cat === 'basicas_agua') analysis.basicNeeds.water++;
          else if (cat === 'basicas_alimentacion') analysis.basicNeeds.food++;
          else if (cat === 'basicas_vivienda') analysis.basicNeeds.housing++;
          else if (cat === 'basicas_educacion') analysis.basicNeeds.education++;
        }
        else if (cat.startsWith('productos_')) {
          item.keywords.forEach(kw => {
            if (cat === 'productos_farmacia') {
              analysis.productBehavior.pharmacyBrands[kw] = (analysis.productBehavior.pharmacyBrands[kw] || 0) + 1;
            } else if (cat === 'productos_limpieza') {
              analysis.productBehavior.cleaningProducts[kw] = (analysis.productBehavior.cleaningProducts[kw] || 0) + 1;
            } else if (cat === 'productos_alimentos') {
              analysis.productBehavior.foodBrands[kw] = (analysis.productBehavior.foodBrands[kw] || 0) + 1;
            }
          });
        }
        else if (cat.startsWith('financiero_')) {
          item.keywords.forEach(kw => {
            if (cat === 'financiero_remesas') {
              analysis.financialBehavior.remittanceProviders[kw] = (analysis.financialBehavior.remittanceProviders[kw] || 0) + 1;
            } else if (cat === 'financiero_ahorro') {
              analysis.financialBehavior.savingsPatterns[kw] = (analysis.financialBehavior.savingsPatterns[kw] || 0) + 1;
            } else if (cat === 'financiero_deuda') {
              analysis.financialBehavior.debtPatterns[kw] = (analysis.financialBehavior.debtPatterns[kw] || 0) + 1;
            } else if (cat === 'financiero_sensibilidad_precio') {
              analysis.financialBehavior.priceSensitivity[kw] = (analysis.financialBehavior.priceSensitivity[kw] || 0) + 1;
            }
          });
        }
        else if (cat.startsWith('migracion_') && cat !== 'migracion_nostalgia' && cat !== 'migracion_documentos' && cat !== 'migracion_discriminacion') {
          if (cat === 'migracion_intencion') analysis.migrationInsights.migrationIntent++;
          else if (cat === 'migracion_familia_separada') analysis.migrationInsights.separatedFamily++;
          else if (cat === 'migracion_retorno') analysis.migrationInsights.returnIntent++;
        }
        else if (cat.startsWith('telecom_')) {
          item.keywords.forEach(kw => {
            if (cat === 'telecom_proveedor') {
              analysis.telecomUsage.providers[kw] = (analysis.telecomUsage.providers[kw] || 0) + 1;
            } else if (cat === 'telecom_uso') {
              analysis.telecomUsage.usagePatterns[kw] = (analysis.telecomUsage.usagePatterns[kw] || 0) + 1;
            } else if (cat === 'telecom_pain_points') {
              analysis.telecomUsage.painPoints[kw] = (analysis.telecomUsage.painPoints[kw] || 0) + 1;
            }
          });
        }
        else if (cat.startsWith('oportunidades_')) {
          if (cat === 'oportunidades_emprendimiento') analysis.opportunities.entrepreneurship++;
          else if (cat === 'oportunidades_educacion') analysis.opportunities.education++;
          else if (cat === 'oportunidades_empleo') analysis.opportunities.employment++;
        }
        else if (cat.startsWith('economia_')) {
          if (cat === 'economia_compartir') analysis.collaborativeEconomy.sharingBehavior++;
          else if (cat === 'economia_informal') analysis.collaborativeEconomy.informalEconomy++;
        }
      });
    });
    
    return analysis;
  } catch (err) {
    console.error('❌ Error getting population patterns:', err);
    return null;
  }
}

/**
 * Genera insights para el companion basados en palabras clave detectadas
 */
export function generateInsightsFromKeywords(detectedKeywords) {
  const insights = [];
  const alerts = []; // Para situaciones críticas
  
  detectedKeywords.forEach(item => {
    const { category, importance, keywords } = item;
    
    // ALERTAS CRÍTICAS - Requieren intervención inmediata
    if (importance === 'critical') {
      if (category === 'crisis_violencia') {
        alerts.push({
          level: 'CRITICAL',
          type: 'VIOLENCE',
          action: 'Contactar equipo de crisis inmediatamente. Preguntar si está en peligro AHORA.',
          keywords: keywords
        });
        insights.push('🚨 ALERTA: Posible situación de violencia. Prioriza la seguridad del usuario. Pregunta si está en peligro ahora mismo.');
      } else if (category === 'crisis_salud_mental') {
        alerts.push({
          level: 'CRITICAL',
          type: 'SUICIDE_RISK',
          action: 'Contactar línea de prevención de suicidio. NO dejar solo al usuario.',
          keywords: keywords
        });
        insights.push('🚨 ALERTA: Riesgo de suicidio detectado. Mantén la conversación, pregunta directamente, ofrece línea de crisis.');
      } else if (category === 'crisis_trabajo_infantil') {
        alerts.push({
          level: 'CRITICAL',
          type: 'CHILD_LABOR',
          action: 'Documentar para reporte a NGO/autoridades.',
          keywords: keywords
        });
        insights.push('⚠️ ALERTA: Posible trabajo infantil. Documenta con empatía, no juzgues.');
      } else if (category === 'crisis_trata_personas') {
        alerts.push({
          level: 'CRITICAL',
          type: 'HUMAN_TRAFFICKING',
          action: 'Contactar autoridades/NGO especializada inmediatamente.',
          keywords: keywords
        });
        insights.push('🚨 ALERTA: Posible trata de personas. Documenta detalles, ofrece recursos de ayuda.');
      } else if (category === 'crisis_adicciones') {
        alerts.push({
          level: 'HIGH',
          type: 'SUBSTANCE_ABUSE',
          action: 'Ofrecer recursos de rehabilitación, contacto con grupos de apoyo.',
          keywords: keywords
        });
        insights.push('⚠️ Adicción detectada. Escucha sin juzgar, pregunta si quiere ayuda, ofrece recursos.');
      }
    }
    
    // INSIGHTS NORMALES (no críticos)
    if (importance === 'high') {
      if (category === 'emocional_tristeza') {
        insights.push('El usuario puede estar pasando por un momento difícil emocionalmente. Muestra empatía extra.');
      } else if (category === 'salud_sintomas') {
        insights.push('El usuario mencionó síntomas de salud. Pregunta cómo se siente sin dar consejos médicos.');
      } else if (category === 'economico_dinero') {
        insights.push('Hay preocupaciones económicas. Valida su esfuerzo y pregunta cómo puedes apoyar emocionalmente.');
      } else if (category === 'social_conflictos') {
        insights.push('Hay conflictos familiares/sociales. Escucha sin juzgar, valida sus sentimientos.');
      } else if (category === 'migracion_nostalgia') {
        insights.push('Hay nostalgia por su tierra. Pregunta sobre sus recuerdos, valida la distancia emocional.');
      } else if (category === 'social_soledad') {
        insights.push('El usuario expresa soledad. Dale compañía cálida, pregunta sobre su día, hazle saber que importa.');
      } else if (category === 'basicas_agua') {
        insights.push('💧 Falta de acceso a agua potable. Documenta detalles para reporte B2G.');
      } else if (category === 'basicas_alimentacion') {
        insights.push('🍽️ Inseguridad alimentaria detectada. Pregunta con sensibilidad, documenta.');
      } else if (category === 'basicas_vivienda') {
        insights.push('🏠 Problemas de vivienda. Documenta situación para análisis de necesidades.');
      } else if (category === 'productos_farmacia') {
        insights.push('💊 Menciona medicamentos/farmacias. Captura marcas, precios, frecuencia de compra.');
      } else if (category === 'financiero_remesas') {
        insights.push('💵 Patrón de remesas detectado. Captura frecuencia, montos, proveedores.');
      } else if (category === 'oportunidades_emprendimiento') {
        insights.push('💼 Interés en emprendimiento. Explora la idea, documenta tipo de negocio.');
      } else if (category === 'oportunidades_educacion') {
        insights.push('📚 Aspiración educativa. Pregunta qué quiere estudiar, documenta barreras.');
      } else if (category === 'economia_compartir') {
        insights.push('🤝 Comportamiento de economía colaborativa. Documenta cómo comparten recursos.');
      }
    }
  });
  
  return { insights, alerts };
}
