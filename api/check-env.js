// TEST: Verificar que las APIs pueden leer las variables de entorno
// Este archivo debe desplegarse en Vercel para probar en producción

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Verificar qué variables de entorno están disponibles
  const envCheck = {
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL_ENV || 'local',
    variables: {
      // Twilio
      TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID 
        ? `✅ Definida (${process.env.TWILIO_ACCOUNT_SID.substring(0, 6)}...)` 
        : '❌ NO DEFINIDA',
      TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN 
        ? `✅ Definida (${process.env.TWILIO_AUTH_TOKEN.substring(0, 4)}...)` 
        : '❌ NO DEFINIDA',
      TWILIO_WHATSAPP_NUMBER: process.env.TWILIO_WHATSAPP_NUMBER 
        ? `✅ Definida (${process.env.TWILIO_WHATSAPP_NUMBER})` 
        : '❌ NO DEFINIDA',
      
      // Resend
      RESEND_API_KEY: process.env.RESEND_API_KEY 
        ? `✅ Definida (${process.env.RESEND_API_KEY.substring(0, 8)}...)` 
        : '❌ NO DEFINIDA',
      
      // Supabase
      VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL 
        ? `✅ Definida` 
        : '❌ NO DEFINIDA',
      VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY 
        ? `✅ Definida` 
        : '❌ NO DEFINIDA',
    },
    
    // Estadísticas
    stats: {
      totalVariables: Object.keys(process.env).length,
      requiredForComms: 4, // Twilio (3) + Resend (1)
      defined: 0,
      missing: 0
    }
  };

  // Contar variables definidas/faltantes
  Object.values(envCheck.variables).forEach(value => {
    if (value.includes('✅')) {
      envCheck.stats.defined++;
    } else {
      envCheck.stats.missing++;
    }
  });

  // Diagnóstico automático
  const diagnosis = [];
  
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_WHATSAPP_NUMBER) {
    diagnosis.push('🚨 CRÍTICO: Variables de Twilio faltantes. WhatsApp NO funcionará.');
  }
  
  if (!process.env.RESEND_API_KEY) {
    diagnosis.push('🚨 CRÍTICO: Variable RESEND_API_KEY faltante. Emails NO funcionarán.');
  }
  
  if (diagnosis.length === 0) {
    diagnosis.push('✅ Todas las variables de entorno están configuradas correctamente.');
    diagnosis.push('💡 Si los mensajes aún no llegan:');
    diagnosis.push('   • Verifica Twilio Sandbox (usuarios deben hacer "join")');
    diagnosis.push('   • Verifica Resend Domain (debe estar verificado)');
    diagnosis.push('   • Revisa los logs de las funciones send-whatsapp y send-email');
  } else {
    diagnosis.push('');
    diagnosis.push('📝 SOLUCIÓN:');
    diagnosis.push('1. Ve a Vercel Dashboard → Settings → Environment Variables');
    diagnosis.push('2. Agrega las variables faltantes');
    diagnosis.push('3. Aplica a: Production, Preview, Development');
    diagnosis.push('4. Haz REDEPLOY del proyecto');
  }

  envCheck.diagnosis = diagnosis;

  // Respuesta
  res.status(200).json(envCheck);
}
