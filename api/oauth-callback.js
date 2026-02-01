// OAuth callback handler for Square
export default async function handler(req, res) {
  const { code, state, error } = req.query;

  if (error) {
    console.error('❌ OAuth error:', error);
    return res.redirect('/pago?error=oauth_failed');
  }

  if (!code) {
    return res.status(400).json({ error: 'No authorization code provided' });
  }

  try {
    console.log('🔄 Exchanging authorization code for access token...');

    const SQUARE_APP_ID = process.env.SQUARE_APP_ID || process.env.NEXT_PUBLIC_SQUARE_APP_ID;
    const SQUARE_APP_SECRET = process.env.SQUARE_APP_SECRET;
    const SQUARE_ENVIRONMENT = process.env.SQUARE_ENVIRONMENT || 'sandbox';

    if (!SQUARE_APP_ID || !SQUARE_APP_SECRET) {
      throw new Error('Square credentials not configured');
    }

    // Determinar URL base según ambiente
    const baseUrl = SQUARE_ENVIRONMENT === 'production' 
      ? 'https://connect.squareup.com'
      : 'https://connect.squareupsandbox.com';

    // Intercambiar code por access token
    const response = await fetch(`${baseUrl}/oauth2/token`, {
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
    console.log('📋 Token info:', {
      merchant_id: data.merchant_id,
      expires_at: data.expires_at,
      scopes: data.scope,
    });

    // GUARDAR TOKEN EN VARIABLE DE ENTORNO (temporal)
    // En producción, deberías guardarlo en base de datos o secrets manager
    console.log('\n🔑 NEW ACCESS TOKEN:');
    console.log(data.access_token);
    console.log('\n⚠️  Copia este token y agrégalo a tus variables de entorno como SQUARE_ACCESS_TOKEN\n');

    // Redirigir de vuelta a página de pago con éxito
    return res.redirect('/pago?oauth=success&message=Token obtenido. Revisa la consola del servidor.');

  } catch (error) {
    console.error('❌ OAuth callback error:', error);
    return res.redirect('/pago?error=' + encodeURIComponent(error.message));
  }
}