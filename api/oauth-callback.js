// OAuth callback handler for Square
export default async function handler(req, res) {
  const { code, state, error } = req.query;

  if (error) {
    console.error('❌ OAuth error:', error);
    return res.status(400).send(`
      <html>
        <body style="font-family: Arial; padding: 40px; text-align: center;">
          <h1>❌ Error en OAuth</h1>
          <p>${error}</p>
          <a href="/pago">Volver a intentar</a>
        </body>
      </html>
    `);
  }

  if (!code) {
    return res.status(400).send('No authorization code provided');
  }

  try {
    console.log('🔄 Exchanging authorization code for access token...');

    const SQUARE_APP_ID = process.env.SQUARE_APP_ID;
    const SQUARE_APP_SECRET = process.env.SQUARE_APP_SECRET;

    if (!SQUARE_APP_ID || !SQUARE_APP_SECRET) {
      throw new Error('Square OAuth credentials not configured in Vercel. Add SQUARE_APP_ID and SQUARE_APP_SECRET.');
    }

    // Intercambiar code por access token (PRODUCTION)
    const response = await fetch('https://connect.squareup.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Square-Version': '2024-12-18',
      },
      body: JSON.stringify({
        client_id: SQUARE_APP_ID,
        client_secret: SQUARE_APP_SECRET,
        code: code,
        grant_type: 'authorization_code',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Token exchange failed:', data);
      throw new Error(data.error_description || 'Failed to exchange token');
    }

    console.log('✅ Access token obtained successfully');
    console.log('\n🔑 NEW ACCESS TOKEN (copy this):');
    console.log(data.access_token);
    console.log('\n📋 Merchant ID:', data.merchant_id);
    console.log('📋 Token expires at:', data.expires_at);
    console.log('📋 Scopes:', data.scope);

    // Mostrar token en la página
    return res.status(200).send(`
      <html>
        <head>
          <style>
            body { font-family: Arial; padding: 40px; background: #f0f9ff; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #0891b2; }
            .token { background: #f1f5f9; padding: 20px; border-radius: 5px; word-break: break-all; font-family: monospace; margin: 20px 0; font-size: 14px; }
            .success { color: #10b981; font-size: 50px; }
            .instructions { background: #fef3c7; padding: 15px; border-radius: 5px; margin-top: 20px; }
            .code { background: #1e293b; color: #10b981; padding: 2px 6px; border-radius: 3px; font-family: monospace; }
            ol { text-align: left; line-height: 1.8; }
            .btn { display: inline-block; margin-top: 20px; background: #0891b2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="success">✅</div>
            <h1>¡OAuth Exitoso!</h1>
            <p>Tu nuevo Access Token con permisos <strong>ORDERS_WRITE + PAYMENTS_WRITE</strong>:</p>
            <div class="token">${data.access_token}</div>
            
            <div class="instructions">
              <h3>🚀 Pasos siguientes:</h3>
              <ol>
                <li>Copia el token de arriba (selecciona todo el texto gris)</li>
                <li>Ve a <strong>Vercel Dashboard → Settings → Environment Variables</strong></li>
                <li>Busca <span class="code">SQUARE_ACCESS_TOKEN</span></li>
                <li>Click en <strong>Edit</strong></li>
                <li>Pega el nuevo token</li>
                <li>Click en <strong>Save</strong></li>
                <li><strong>Redeploy</strong> tu aplicación</li>
                <li>¡Prueba hacer un pago!</li>
              </ol>
            </div>

            <p><strong>Merchant ID:</strong> ${data.merchant_id}</p>
            <p><strong>Token expira:</strong> ${data.expires_at || 'Never'}</p>
            <p><strong>Permisos:</strong> ${data.scope || 'N/A'}</p>

            <a href="/pago" class="btn">Ir a página de pago</a>
          </div>
        </body>
      </html>
    `);

  } catch (error) {
    console.error('❌ OAuth callback error:', error);
    return res.status(500).send(`
      <html>
        <body style="font-family: Arial; padding: 40px; text-align: center;">
          <h1>❌ Error</h1>
          <p style="color: #dc2626; font-size: 18px; margin: 20px 0;">${error.message}</p>
          <p style="color: #666;">Revisa los logs de Vercel para más detalles.</p>
          <div style="background: #fef3c7; padding: 15px; border-radius: 5px; margin: 20px auto; max-width: 600px;">
            <strong>Verifica que tengas estas variables en Vercel:</strong>
            <ul style="text-align: left;">
              <li><code>SQUARE_APP_ID</code></li>
              <li><code>SQUARE_APP_SECRET</code></li>
            </ul>
          </div>
          <a href="/pago" style="color: #0891b2;">Volver</a>
        </body>
      </html>
    `);
  }
}