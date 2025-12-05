// Script para diagnosticar problemas de WhatsApp y Email
// Ejecutar en local para verificar configuración

const fetch = require('node-fetch');

const API_BASE = process.env.API_BASE || 'https://saludcompartida.app';

async function testWhatsApp() {
  console.log('\n🔍 Probando WhatsApp...');
  
  try {
    const response = await fetch(`${API_BASE}/api/send-whatsapp.js`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: '+521234567890', // Número de prueba
        message: 'TEST: Verificación de sistema WhatsApp',
        userName: 'Test User'
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ WhatsApp funcionando:', data);
    } else {
      console.error('❌ WhatsApp falló:', data);
      console.error('Status:', response.status);
    }
  } catch (error) {
    console.error('❌ Error al probar WhatsApp:', error.message);
  }
}

async function testEmail() {
  console.log('\n🔍 Probando Email...');
  
  try {
    const response = await fetch(`${API_BASE}/api/send-email.js`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'test@example.com', // Email de prueba
        subject: 'TEST: Verificación de sistema Email',
        message: 'Este es un email de prueba del sistema SaludCompartida.',
        type: 'migrant',
        userName: 'Test User',
        accessCode: '123456'
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Email funcionando:', data);
    } else {
      console.error('❌ Email falló:', data);
      console.error('Status:', response.status);
    }
  } catch (error) {
    console.error('❌ Error al probar Email:', error.message);
  }
}

async function checkVercelFunctionLogs() {
  console.log('\n📋 INSTRUCCIONES PARA REVISAR LOGS EN VERCEL:');
  console.log('1. Ve a: https://vercel.com/dashboard');
  console.log('2. Selecciona tu proyecto: MVP-SaludCompartida');
  console.log('3. Ve a la pestaña "Functions"');
  console.log('4. Busca: send-whatsapp y send-email');
  console.log('5. Revisa los logs de errores (500, 400, 401)');
  console.log('\n📋 O revisa los logs de deployment:');
  console.log('1. Ve a "Deployments" → Último deployment');
  console.log('2. Click en "Functions" → Ver logs en tiempo real');
}

async function checkEnvironmentVariables() {
  console.log('\n🔐 VERIFICAR VARIABLES DE ENTORNO EN VERCEL:');
  console.log('\n1. Ve a: https://vercel.com/dashboard');
  console.log('2. Proyecto → Settings → Environment Variables');
  console.log('\n✅ Debes tener configuradas:');
  console.log('   • TWILIO_ACCOUNT_SID (empieza con "AC")');
  console.log('   • TWILIO_AUTH_TOKEN (32 caracteres)');
  console.log('   • TWILIO_WHATSAPP_NUMBER (whatsapp:+14155238886)');
  console.log('   • RESEND_API_KEY (empieza con "re_")');
  console.log('\n⚠️ Si faltan, agrégalas y REDEPLOY el proyecto');
}

async function checkTwilioSandbox() {
  console.log('\n📱 VERIFICAR TWILIO WHATSAPP SANDBOX:');
  console.log('\n1. Ve a: https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn');
  console.log('2. Verifica que los números destinatarios hayan enviado:');
  console.log('   "join [tu-sandbox-code]"');
  console.log('3. Si no lo han hecho, los mensajes NO llegarán');
  console.log('\n💡 SOLUCIÓN:');
  console.log('   • Para testing: Envía "join [code]" desde tu WhatsApp');
  console.log('   • Para producción: Activa WhatsApp Business API');
}

async function checkResendDomain() {
  console.log('\n📧 VERIFICAR RESEND DOMAIN:');
  console.log('\n1. Ve a: https://resend.com/domains');
  console.log('2. Verifica que "saludcompartida.com" esté verificado ✅');
  console.log('3. Si no está verificado:');
  console.log('   • Agrega los registros DNS (SPF, DKIM, DMARC)');
  console.log('   • Espera propagación (puede tardar hasta 48h)');
  console.log('\n💡 SOLUCIÓN TEMPORAL:');
  console.log('   • Usa el dominio sandbox de Resend para testing');
  console.log('   • Cambia from: "SaludCompartida <onboarding@resend.dev>"');
}

async function main() {
  console.log('🚀 DIAGNÓSTICO DE SISTEMAS DE COMUNICACIÓN\n');
  console.log('='.repeat(50));
  
  // Instrucciones de verificación manual
  await checkEnvironmentVariables();
  console.log('\n' + '='.repeat(50));
  
  await checkTwilioSandbox();
  console.log('\n' + '='.repeat(50));
  
  await checkResendDomain();
  console.log('\n' + '='.repeat(50));
  
  await checkVercelFunctionLogs();
  console.log('\n' + '='.repeat(50));
  
  // Pruebas en vivo (requiere que las APIs estén desplegadas)
  console.log('\n🧪 PRUEBAS EN VIVO:');
  console.log('(Estas llamadas irán al servidor de producción)\n');
  
  await testWhatsApp();
  await testEmail();
  
  console.log('\n' + '='.repeat(50));
  console.log('\n✅ DIAGNÓSTICO COMPLETO\n');
  console.log('Revisa los resultados arriba y sigue las instrucciones.');
  console.log('Si ves errores 500/401, las variables de entorno no están configuradas.');
  console.log('Si ves errores 400, verifica Twilio Sandbox y Resend Domain.\n');
}

main();
