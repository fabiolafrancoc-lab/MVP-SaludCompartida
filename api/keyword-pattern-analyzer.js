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
      topHealthSymptoms: {},
      topEmotionalStates: {},
      topEconomicIssues: {},
      migrationThemes: {},
      culturalElements: {}
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
  
  detectedKeywords.forEach(item => {
    const { category, importance } = item;
    
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
      }
    }
  });
  
  return insights;
}
