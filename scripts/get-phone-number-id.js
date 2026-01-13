// Script para obtener Phone Number ID desde WhatsApp Business Account ID
// Uso: node scripts/get-phone-number-id.js YOUR_ACCESS_TOKEN

const WHATSAPP_ACCOUNT_ID = '1830624390892945';

async function getPhoneNumberId(accessToken) {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${WHATSAPP_ACCOUNT_ID}/phone_numbers`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error('❌ Error:', data.error.message);
      console.log('\n💡 Necesitas un Access Token válido.');
      console.log('Obtén uno en: https://developers.facebook.com/apps/');
      console.log('App → WhatsApp → API Setup → Temporary access token');
      return;
    }

    console.log('✅ Phone Numbers encontrados:\n');
    
    if (data.data && data.data.length > 0) {
      data.data.forEach(phone => {
        console.log('📱 Número:', phone.display_phone_number);
        console.log('🆔 Phone Number ID:', phone.id);
        console.log('✓ Verified:', phone.verified_name);
        console.log('📊 Quality:', phone.quality_rating);
        console.log('---');
      });

      console.log('\n🎯 USA ESTE Phone Number ID en Vercel:');
      console.log(`META_WHATSAPP_PHONE_NUMBER_ID=${data.data[0].id}`);
    } else {
      console.log('❌ No se encontraron números de teléfono asociados');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Obtener token de argumentos
const accessToken = process.argv[2];

if (!accessToken) {
  console.log('❌ Falta el Access Token\n');
  console.log('📋 Uso:');
  console.log('  node scripts/get-phone-number-id.js YOUR_ACCESS_TOKEN\n');
  console.log('🔑 Obtén tu Access Token en:');
  console.log('  1. Ve a: https://developers.facebook.com/apps/');
  console.log('  2. Selecciona tu app (o crea una)');
  console.log('  3. WhatsApp → API Setup → Temporary access token');
  console.log('  4. Copia el token (empieza con EAAG...)');
  console.log('  5. Ejecuta: node scripts/get-phone-number-id.js EAAG...\n');
  process.exit(1);
}

console.log('🔍 Buscando Phone Number ID...\n');
getPhoneNumberId(accessToken);
