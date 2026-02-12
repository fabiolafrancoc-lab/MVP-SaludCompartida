// Enviar códigos de acceso por WhatsApp usando Meta Business API
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      migrantPhone, 
      familyPhone, 
      migrantCode, 
      familyCode, 
      migrantName,
      familyName 
    } = req.body;

    console.log('📱 Enviando códigos por WhatsApp (Meta API)...');
    console.log('Migrante:', migrantPhone, migrantCode);
    console.log('Familiar:', familyPhone, familyCode);

    const results = {
      migrant: null,
      family: null
    };

    // Enviar código al migrante
    if (migrantPhone && migrantCode) {
      try {
        const migrantResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://saludcompartida.app'}/api/send-whatsapp-meta`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: migrantPhone,
            templateName: 'codigo_migrante', // Nombre de tu template en Meta
            components: [
              {
                type: 'body',
                parameters: [
                  {
                    type: 'text',
                    text: migrantName || 'Usuario'
                  },
                  {
                    type: 'text',
                    text: migrantCode
                  }
                ]
              }
            ]
          })
        });

        const migrantData = await migrantResponse.json();
        
        if (migrantResponse.ok) {
          results.migrant = {
            success: true,
            messageId: migrantData.messageId
          };
          console.log('✅ WhatsApp enviado al migrante');
        } else {
          results.migrant = {
            success: false,
            error: migrantData.error
          };
          console.error('❌ Error enviando al migrante:', migrantData);
        }
      } catch (error) {
        results.migrant = {
          success: false,
          error: error.message
        };
        console.error('❌ Error al enviar al migrante:', error);
      }
    }

    // Enviar código al familiar en México
    if (familyPhone && familyCode) {
      try {
        const familyResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://saludcompartida.app'}/api/send-whatsapp-meta`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: familyPhone,
            templateName: 'codigo_familiar', // Nombre de tu template en Meta
            components: [
              {
                type: 'body',
                parameters: [
                  {
                    type: 'text',
                    text: familyName || 'Usuario'
                  },
                  {
                    type: 'text',
                    text: migrantName || 'Tu familiar'
                  },
                  {
                    type: 'text',
                    text: familyCode
                  }
                ]
              }
            ]
          })
        });

        const familyData = await familyResponse.json();
        
        if (familyResponse.ok) {
          results.family = {
            success: true,
            messageId: familyData.messageId
          };
          console.log('✅ WhatsApp enviado al familiar');
        } else {
          results.family = {
            success: false,
            error: familyData.error
          };
          console.error('❌ Error enviando al familiar:', familyData);
        }
      } catch (error) {
        results.family = {
          success: false,
          error: error.message
        };
        console.error('❌ Error al enviar al familiar:', error);
      }
    }

    // Verificar si al menos un mensaje se envió exitosamente
    const anySuccess = results.migrant?.success || results.family?.success;

    return res.status(anySuccess ? 200 : 500).json({
      success: anySuccess,
      results: results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error general:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Error al enviar códigos por WhatsApp'
    });
  }
}
