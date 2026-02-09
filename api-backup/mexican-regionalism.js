// Sistema de Regionalismo Mexicano
// Detecta y aplica variaciones dialectales por región

/**
 * Regiones de México con sus características lingüísticas únicas
 */
const MEXICAN_REGIONS = {
  // NORTE - Monterrey, Nuevo León, Chihuahua, Sonora
  norte: {
    keywords: ['monterrey', 'nuevo león', 'chihuahua', 'sonora', 'coahuila', 'durango', 'tamaulipas', 'sinaloa'],
    characteristics: {
      pronouns: ['tú', 'usted (formal)'],
      greetings: ['¿Qué onda?', '¿Cómo andan?', '¿Qué pex?'],
      expressions: [
        'chido', 'a huevo', 'nel', 'simón', 'fierro', 
        'qué rollo', 'está cura', 'no manches', 'aguas',
        'pinche', 'compa', 'carnal'
      ],
      names: {
        female: ['Mónica', 'Karla', 'Sandra', 'Daniela', 'Alejandra', 'Andrea'],
        male: ['Ricardo', 'Fernando', 'Sergio', 'Eduardo', 'Alberto', 'Raúl']
      },
      foodReferences: ['carne asada', 'machaca', 'burritos', 'tacos de trompo', 'discada'],
      style: 'Directo, informal, confianzudo. Uso frecuente de modismos estadounidenses por cercanía con la frontera. Tono pragmático.'
    }
  },

  // CENTRO - Ciudad de México, Estado de México, Morelos
  centro: {
    keywords: ['ciudad de méxico', 'cdmx', 'méxico', 'edomex', 'estado de méxico', 'morelos', 'puebla', 'tlaxcala'],
    characteristics: {
      pronouns: ['tú', 'usted (muy común)'],
      greetings: ['¿Qué onda?', '¿Cómo estás?', '¿Qué tal?'],
      expressions: [
        'güey', 'wey', 'neta', 'chido', 'padre', 'gacho',
        'fresa', 'naco', 'chafa', 'al chile', 'no mames',
        'órale', 'qué pedo', 'está cañón', 'de volada'
      ],
      names: {
        female: ['Lupita', 'María', 'Ana', 'Carmen', 'Patricia', 'Laura'],
        male: ['Juan', 'José', 'Carlos', 'Miguel', 'Luis', 'Pedro']
      },
      foodReferences: ['tacos al pastor', 'quesadillas', 'tlacoyos', 'tamales', 'elote'],
      style: 'Uso extensivo de "güey/wey". Ritmo rápido de habla. Muchas referencias culturales urbanas. Tono entre irónico y directo.'
    }
  },

  // OCCIDENTE - Jalisco, Guanajuato, Michoacán
  occidente: {
    keywords: ['jalisco', 'guadalajara', 'guanajuato', 'michoacán', 'colima', 'nayarit', 'aguascalientes'],
    characteristics: {
      pronouns: ['tú', 'usted (respetuoso)'],
      greetings: ['¿Cómo estás?', '¿Qué pasó?', 'Buenos días'],
      expressions: [
        'órale', 'ándale', 'híjole', 'chin', 'caray',
        'está chido', 'qué padre', 'manito', 'compadre',
        'fíjate', 'mira', 'pues'
      ],
      names: {
        female: ['Guadalupe', 'Rosa', 'Teresa', 'Beatriz', 'Silvia', 'Martha'],
        male: ['Francisco', 'Antonio', 'Manuel', 'Rafael', 'Jesús', 'Javier']
      },
      foodReferences: ['birria', 'tortas ahogadas', 'pozole', 'carnitas', 'tequila'],
      style: 'Cantadito característico (especialmente Jalisco). Uso de diminutivos. Tono cálido y hospitalario. Orgullosoregional (mariachi, tequila).'
    }
  },

  // SUR - Oaxaca, Chiapas, Guerrero, Veracruz
  sur: {
    keywords: ['oaxaca', 'chiapas', 'guerrero', 'veracruz', 'tabasco', 'campeche', 'yucatán', 'quintana roo'],
    characteristics: {
      pronouns: ['usted (muy común)', 'tú (cercanos)'],
      greetings: ['Buenos días', '¿Cómo está?', 'Buenas tardes'],
      expressions: [
        'mi vida', 'corazón', 'mijito/a', 'chiquito/a',
        'fíjese', 'mire usted', 'pues fíjese', 'ándele pues',
        'qué linda', 'con permiso', 'disculpe'
      ],
      names: {
        female: ['Josefina', 'Dolores', 'Esperanza', 'Consuelo', 'Remedios', 'Soledad'],
        male: ['Guadalupe (Lupe)', 'Esteban', 'Mariano', 'Ernesto', 'Octavio', 'Salvador']
      },
      foodReferences: ['mole', 'tlayudas', 'tamales oaxaqueños', 'pescado a la veracruzana', 'chapulines'],
      style: 'Más formal y respetuoso. Uso extensivo de "usted". Tono pausado y cálido. Muchos diminutivos afectuosos.'
    }
  }
};

/**
 * Detecta la región del usuario basándose en información disponible
 */
export function detectUserRegion(userData) {
  // Prioridad 1: Ciudad o estado explícito
  if (userData.city || userData.state) {
    const location = `${userData.city || ''} ${userData.state || ''}`.toLowerCase();
    
    for (const [regionName, regionData] of Object.entries(MEXICAN_REGIONS)) {
      if (regionData.keywords.some(keyword => location.includes(keyword))) {
        console.log(`🗺️ Región detectada: ${regionName} (por ubicación: ${location})`);
        return regionName;
      }
    }
  }

  // Prioridad 2: Patrones en el lenguaje del usuario
  if (userData.recentMessages && userData.recentMessages.length > 0) {
    const allMessages = userData.recentMessages.join(' ').toLowerCase();
    
    const regionScores = {};
    
    for (const [regionName, regionData] of Object.entries(MEXICAN_REGIONS)) {
      let score = 0;
      regionData.characteristics.expressions.forEach(expression => {
        if (allMessages.includes(expression.toLowerCase())) {
          score += 1;
        }
      });
      regionScores[regionName] = score;
    }
    
    const maxScore = Math.max(...Object.values(regionScores));
    if (maxScore >= 2) { // Al menos 2 expresiones coinciden
      const detectedRegion = Object.keys(regionScores).find(key => regionScores[key] === maxScore);
      console.log(`🗺️ Región detectada: ${detectedRegion} (por lenguaje, score: ${maxScore})`);
      return detectedRegion;
    }
  }

  // Default: Centro (más neutral)
  console.log(`🗺️ Región por defecto: centro`);
  return 'centro';
}

/**
 * Genera instrucciones regionales para el AI
 */
export function generateRegionalInstructions(region) {
  const regionData = MEXICAN_REGIONS[region];
  
  if (!regionData) {
    return '\n\n🗺️ REGIONALISMO: Usa español mexicano estándar (Centro).\n';
  }

  let instructions = `\n\n🗺️ INSTRUCCIONES REGIONALES - ${region.toUpperCase()}:\n`;
  
  instructions += `\nESTILO: ${regionData.characteristics.style}\n`;
  
  instructions += `\nEXPRESIONES TÍPICAS A USAR:\n`;
  instructions += `- ${regionData.characteristics.expressions.slice(0, 8).join(', ')}\n`;
  
  instructions += `\nSALUDOS APROPIADOS:\n`;
  instructions += `- ${regionData.characteristics.greetings.join(', ')}\n`;
  
  instructions += `\nREFERENCIAS CULTURALES (usa cuando sea natural):\n`;
  instructions += `- Comida: ${regionData.characteristics.foodReferences.join(', ')}\n`;
  
  instructions += `\n⚠️ IMPORTANTE:\n`;
  instructions += `- Tu forma de hablar debe sonar auténtica de ${region}\n`;
  instructions += `- NO fuerces el regionalismo, sé natural\n`;
  instructions += `- Si el usuario no es de esta región, puedes adaptar pero mantén el carácter\n`;
  
  return instructions;
}

/**
 * Selecciona nombre de companion apropiado para la región
 */
export function getRegionalName(region, gender) {
  const regionData = MEXICAN_REGIONS[region];
  
  if (!regionData) {
    // Fallback a centro
    return MEXICAN_REGIONS.centro.characteristics.names[gender][0];
  }
  
  const names = regionData.characteristics.names[gender];
  return names[Math.floor(Math.random() * names.length)];
}

/**
 * Actualiza región del usuario en base de datos
 */
export async function updateUserRegion(supabase, userId, region) {
  const { error } = await supabase
    .from('ai_companions')
    .update({ 
      user_region: region,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId);

  if (error) {
    console.error('Error updating user region:', error);
  } else {
    console.log(`✅ Región actualizada para ${userId}: ${region}`);
  }
}

export { MEXICAN_REGIONS };
