import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const {
      type,
      registrationId,
      codigoFamilia,
      suscriptorEmail,
      suscriptorNombre,
      suscriptorTelefono,
      usuarioPrincipalNombre,
      usuarioPrincipalTelefono,
      planName,
    } = await request.json();

    console.log(`Sending ${type} notifications for:`, codigoFamilia);

    const results = {
      email: false,
      whatsappSuscriptor: false,
      whatsappUsuario: false,
    };

    // 1. Email al suscriptor
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        await resend.emails.send({
          from: 'SaludCompartida <noreply@saludcompartida.app>',
          to: suscriptorEmail,
          subject: '¡Bienvenido a SaludCompartida!',
          html: `
            <!DOCTYPE html>
            <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #06B6D4 0%, #0891B2 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0;">¡Bienvenido a SaludCompartida!</h1>
              </div>
              <div style="padding: 40px 30px;">
                <h2 style="color: #1F2937;">¡Hola, ${suscriptorNombre.split(' ')[0]}!</h2>
                <p style="color: #4B5563; font-size: 16px;">Tu suscripción está activa. Tu familia en México ya puede usar todos los servicios de salud.</p>
                
                <div style="background-color: #F0FDFA; border: 2px solid #06B6D4; border-radius: 12px; padding: 20px; margin: 30px 0; text-align: center;">
                  <p style="color: #0891B2; font-size: 14px; margin: 0 0 10px 0;">Código de tu familia:</p>
                  <p style="color: #0891B2; font-size: 32px; font-weight: bold; font-family: monospace; margin: 0;">${codigoFamilia}</p>
                  <p style="color: #6B7280; font-size: 12px; margin: 10px 0 0 0;">Comparte este código con ${usuarioPrincipalNombre}</p>
                </div>
                
                <h3 style="color: #1F2937;">Servicios incluidos en tu plan ${planName}:</h3>
                <ul style="color: #4B5563;">
                  <li>✓ Telemedicina ilimitada 24/7</li>
                  <li>✓ Descuento en farmacias (40-75%)</li>
                  <li>✓ Hasta 4 personas cubiertas</li>
                  ${planName === 'Premium' ? '<li>✓ Terapia psicológica semanal</li>' : ''}
                </ul>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="display: inline-block; background: #06B6D4; color: white; padding: 15px 40px; border-radius: 8px; text-decoration: none; font-weight: bold;">Ir a mi Dashboard</a>
                </div>
                
                <p style="color: #6B7280; font-size: 14px; text-align: center;">¿Preguntas? Contáctanos: +1 305 522 7150</p>
              </div>
              <div style="background-color: #1F2937; padding: 20px; text-align: center;">
                <p style="color: #9CA3AF; font-size: 12px; margin: 0;">© 2026 SaludCompartida. Todos los derechos reservados.</p>
              </div>
            </body>
            </html>
          `,
        });
        results.email = true;
      } catch (emailError) {
        console.error('Email error:', emailError);
      }
    }

    // 2. WhatsApp al suscriptor (USA)
    if (process.env.WATI_API_URL && process.env.WATI_API_TOKEN) {
      try {
        const cleanPhone = suscriptorTelefono.replace(/[^\d+]/g, '');
        await fetch(`${process.env.WATI_API_URL}/api/v1/sendSessionMessage/${cleanPhone}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.WATI_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messageText: `🎉 ¡Hola ${suscriptorNombre.split(' ')[0]}! Tu familia ya tiene acceso a SaludCompartida.\n\n📋 Código: ${codigoFamilia}\n\n💚 Comparte este código con ${usuarioPrincipalNombre.split(' ')[0]}`,
          }),
        });
        results.whatsappSuscriptor = true;
      } catch (waError) {
        console.error('WhatsApp suscriptor error:', waError);
      }
    }

    // 3. WhatsApp al usuario en México
    if (process.env.WATI_API_URL && process.env.WATI_API_TOKEN) {
      try {
        const cleanPhone = usuarioPrincipalTelefono.replace(/[^\d+]/g, '');
        await fetch(`${process.env.WATI_API_URL}/api/v1/sendSessionMessage/${cleanPhone}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.WATI_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messageText: `🏥 ¡Hola ${usuarioPrincipalNombre.split(' ')[0]}!\n\n${suscriptorNombre.split(' ')[0]} te ha inscrito en SaludCompartida.\n\n✅ Ya tienes acceso a:\n- Telemedicina 24/7\n- Descuentos en farmacias\n- Terapia psicológica\n\n📋 Tu código: ${codigoFamilia}\n🌐 Entra a: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
          }),
        });
        results.whatsappUsuario = true;
      } catch (waError) {
        console.error('WhatsApp usuario error:', waError);
      }
    }

    return NextResponse.json({ success: true, results });

  } catch (error) {
    console.error('Notification error:', error);
    return NextResponse.json({ error: 'Error sending notifications' }, { status: 500 });
  }
}
