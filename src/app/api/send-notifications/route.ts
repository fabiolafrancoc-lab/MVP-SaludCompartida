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

    console.log(`📧 Sending ${type} notifications for:`, codigoFamilia);

    const results = {
      email: false,
      whatsappSuscriptor: false,
      whatsappUsuario: false,
    };

    // ════════════════════════════════════════════════════════════
    // 1. EMAIL AL MIGRANTE (EEUU) - DISEÑO HERMOSO
    // ════════════════════════════════════════════════════════════
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        const firstName = suscriptorNombre?.split(' ')[0] || 'Amigo';
        const familyFirstName = usuarioPrincipalNombre?.split(' ')[0] || 'tu familia';
        
        await resend.emails.send({
          from: 'SaludCompartida <noreply@saludcompartida.app>',
          to: suscriptorEmail,
          subject: `${firstName}, tu familia ya está protegida 💚`,
          html: `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #111827; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #111827;">
        <tr>
            <td align="center" style="padding: 20px 10px;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%;">
                    
                    <!-- HEADER CON LOGO -->
                    <tr>
                        <td align="center" style="background-color: #111827; padding: 30px 20px 20px;">
                            <img src="https://saludcompartida.app/saludcompartida-dark-no-tagline.png" 
                                 alt="SaludCompartida" 
                                 width="220" 
                                 style="display: block; max-width: 220px; height: auto;">
                        </td>
                    </tr>

                    <!-- BODY PRINCIPAL -->
                    <tr>
                        <td style="background-color: #FFFFFF; border-radius: 16px 16px 0 0;">
                            
                            <!-- Badge de confirmación -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td align="center" style="padding: 30px 30px 0;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="background-color: #ECFDF5; border-radius: 50px; padding: 12px 24px;">
                                                    <span style="color: #059669; font-size: 15px; font-weight: bold;">✓ Tu suscripción está activa</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Saludo principal - HÉROE SIN CAPA -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="padding: 25px 30px 15px; text-align: center;">
                                        <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #111827; line-height: 1.3;">
                                            <span style="color: #E91E8C;">${firstName}</span>, eres un héroe sin capa
                                        </h1>
                                    </td>
                                </tr>
                            </table>

                            <!-- Mensaje emocional -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="padding: 0 30px 20px;">
                                        <p style="margin: 0 0 15px; font-size: 17px; line-height: 1.7; color: #4B5563;">
                                            Trabajas lejos de casa. Te levantas temprano. Aguantas lo que muchos no entienden. <strong style="color: #111827;">Y todo por ellos.</strong>
                                        </p>
                                        <p style="margin: 0; font-size: 17px; line-height: 1.7; color: #4B5563;">
                                            Hoy tomaste una decisión que <strong style="color: #111827;">pocos conocen y muchos van a querer</strong>: tu familia ya tiene acceso a doctores, medicinas y apoyo emocional.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Caja emocional destacada -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="padding: 0 30px 25px;">
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: linear-gradient(135deg, #FDF2F8, #FCE7F3); border-left: 4px solid #E91E8C; border-radius: 0 12px 12px 0;">
                                            <tr>
                                                <td style="padding: 20px;">
                                                    <p style="margin: 0; font-size: 16px; line-height: 1.7; color: #374151; font-style: italic;">
                                                        "Otros mandan dinero. <strong style="color: #E91E8C;">Tú mandas salud.</strong> Desde hoy, cuando necesiten un doctor a las 11pm, lo tienen. Cuando necesiten medicinas, pagan menos de la mitad. Y cuando se sientan solos... <strong style="color: #E91E8C;">ya no lo estarán.</strong>"
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- CÓDIGO DE ACCESO - SUPER DESTACADO -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="padding: 0 30px 30px;">
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #111827; border-radius: 16px;">
                                            <tr>
                                                <td align="center" style="padding: 30px 20px;">
                                                    <p style="margin: 0 0 8px; font-size: 13px; color: #9CA3AF; text-transform: uppercase; letter-spacing: 2px;">
                                                        TU CÓDIGO DE ACCESO DESDE EEUU
                                                    </p>
                                                    <p style="margin: 0; font-size: 48px; font-weight: bold; color: #00D4AA; letter-spacing: 8px; font-family: 'Courier New', Courier, monospace;">
                                                        ${codigoFamilia}
                                                    </p>
                                                    <p style="margin: 12px 0 0; font-size: 14px; color: #9CA3AF;">
                                                        Guarda este código. Lo necesitarás para ver los ahorros de tu familia.
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- FIRMAS DE AGRADECIMIENTO -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="padding: 0 30px 25px;">
                                        <p style="margin: 0 0 15px; font-size: 14px; color: #9CA3AF; text-align: center;">
                                            Esto es lo que las familias quieren decirte...
                                        </p>
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: linear-gradient(135deg, #FEF3C7, #FDE68A); border-radius: 12px;">
                                            <tr>
                                                <td style="padding: 25px 15px; text-align: center; line-height: 2.8;">
                                                    <span style="font-family: 'Comic Sans MS', cursive; font-size: 20px; color: #2563EB; display: inline-block; margin: 4px 8px;">Gracias papá</span>
                                                    <span style="font-family: 'Comic Sans MS', cursive; font-size: 16px; color: #DC2626; display: inline-block; margin: 4px 8px;">gracias mami</span>
                                                    <span style="font-family: 'Comic Sans MS', cursive; font-size: 22px; color: #16A34A; display: inline-block; margin: 4px 8px;">Grasias tío</span>
                                                    <br>
                                                    <span style="font-family: 'Comic Sans MS', cursive; font-size: 17px; color: #7C3AED; display: inline-block; margin: 4px 8px;">te quiero mamá</span>
                                                    <span style="font-family: 'Comic Sans MS', cursive; font-size: 24px; color: #DB2777; display: inline-block; margin: 4px 8px;">GRACIAS TÍA</span>
                                                    <span style="font-family: 'Comic Sans MS', cursive; font-size: 18px; color: #EA580C; display: inline-block; margin: 4px 8px;">ya no me duele</span>
                                                    <br>
                                                    <span style="font-family: 'Brush Script MT', cursive; font-size: 22px; color: #1E40AF; font-style: italic; display: inline-block; margin: 4px 8px;">Gracias, mijo</span>
                                                    <span style="font-family: 'Brush Script MT', cursive; font-size: 20px; color: #92400E; font-style: italic; display: inline-block; margin: 4px 8px;">Bendiciones, mijita</span>
                                                    <br>
                                                    <span style="font-family: 'Brush Script MT', cursive; font-size: 24px; color: #0891B2; font-style: italic; display: inline-block; margin: 4px 8px;">Dios te bendiga, hijo</span>
                                                    <span style="font-family: 'Brush Script MT', cursive; font-size: 19px; color: #374151; font-style: italic; display: inline-block; margin: 4px 8px;">Gracias, sobrino</span>
                                                    <br>
                                                    <span style="font-family: 'Comic Sans MS', cursive; font-size: 15px; color: #059669; display: inline-block; margin: 4px 8px;">tenkiu mama</span>
                                                    <span style="font-family: 'Brush Script MT', cursive; font-size: 21px; color: #BE185D; font-style: italic; display: inline-block; margin: 4px 8px;">Que Dios te lo pague</span>
                                                    <span style="font-family: 'Comic Sans MS', cursive; font-size: 19px; color: #4338CA; display: inline-block; margin: 4px 8px;">eres el mejor tio</span>
                                                    <br>
                                                    <span style="font-family: 'Brush Script MT', cursive; font-size: 23px; color: #15803D; font-style: italic; display: inline-block; margin: 4px 8px;">Gracias por no olvidarnos</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Beneficios -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="padding: 0 30px 25px;">
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #F9FAFB; border-radius: 12px;">
                                            <tr>
                                                <td style="padding: 20px;">
                                                    <p style="margin: 0 0 15px; font-size: 16px; font-weight: bold; color: #111827;">
                                                        Tu familia ahora tiene:
                                                    </p>
                                                    <p style="margin: 0 0 8px; font-size: 15px; color: #4B5563;">✓ <strong>Doctores 24/7</strong> — de día, de noche, sin filas</p>
                                                    <p style="margin: 0 0 8px; font-size: 15px; color: #4B5563;">✓ <strong>Hasta 75% de descuento</strong> en farmacias</p>
                                                    <p style="margin: 0 0 8px; font-size: 15px; color: #4B5563;">✓ <strong>Terapia psicológica</strong> — estrés, duelos, ansiedad</p>
                                                    <p style="margin: 0; font-size: 15px; color: #4B5563;">✓ <strong>Lupita los acompaña</strong> — para que no estén solos</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Sección Lupita -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="padding: 0 30px 25px;">
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: linear-gradient(135deg, #FDF2F8, #FCE7F3); border-radius: 16px; border: 1px solid #FBCFE8;">
                                            <tr>
                                                <td style="padding: 25px;">
                                                    <p style="margin: 0 0 5px; font-size: 17px; font-weight: bold; color: #111827;">
                                                        Lupita llamará a ${familyFirstName} pronto
                                                    </p>
                                                    <p style="margin: 0 0 15px; font-size: 13px; color: #9CA3AF;">
                                                        Compañera de bienestar • Llamadas semanales
                                                    </p>
                                                    <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #374151; font-style: italic;">
                                                        "Voy a llamar a tu familia para presentarme. No para vender nada — solo para que sepan que <strong style="color: #E91E8C;">ya no están solos</strong>. Tú hiciste esto posible."
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- CTA Button -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="padding: 0 30px 20px;">
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td align="center">
                                                    <a href="https://saludcompartida.app/dashboard" 
                                                       style="display: inline-block; background: linear-gradient(135deg, #E91E8C, #BE185D); color: #FFFFFF; text-decoration: none; padding: 18px 40px; border-radius: 12px; font-size: 17px; font-weight: bold;">
                                                        ${firstName}, ve a tu Panel →
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Confirmación de envío -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="padding: 0 30px 30px;">
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #ECFDF5; border-radius: 12px;">
                                            <tr>
                                                <td style="padding: 16px 20px; text-align: center;">
                                                    <p style="margin: 0; font-size: 15px; color: #059669;">
                                                        📱 <strong>Ya enviamos el código a México</strong><br>
                                                        <span style="color: #047857;">${familyFirstName}</span> al <span style="color: #047857;">${usuarioPrincipalTelefono}</span>
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                        <td style="background-color: #F3F4F6; border-radius: 0 0 16px 16px; padding: 25px 30px; text-align: center;">
                            <p style="margin: 0 0 8px; font-size: 17px; color: #111827;">
                                Donde está tu corazón <span style="color: #E91E8C;">♥</span> está SaludCompartida
                            </p>
                            <p style="margin: 0; font-size: 14px; color: #9CA3AF;">
                                ¿Dudas? Escríbenos a contact@saludcompartida.com
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
          `,
        });
        results.email = true;
        console.log('✅ Email migrante enviado');
      } catch (emailError) {
        console.error('❌ Email error:', emailError);
      }
    }

    // ════════════════════════════════════════════════════════════
    // 2. EMAIL A LA FAMILIA EN MÉXICO
    // ════════════════════════════════════════════════════════════
    // TODO: Si tienes email de la familia, enviar también
    // Por ahora solo enviamos WhatsApp

    // ════════════════════════════════════════════════════════════
    // 3. WHATSAPP AL SUSCRIPTOR (USA)
    // ════════════════════════════════════════════════════════════
    if (process.env.WATI_API_URL && process.env.WATI_API_TOKEN && suscriptorTelefono) {
      try {
        const cleanPhone = suscriptorTelefono.replace(/[^\d+]/g, '');
        const firstName = suscriptorNombre?.split(' ')[0] || 'Amigo';
        const familyFirstName = usuarioPrincipalNombre?.split(' ')[0] || 'tu familia';
        
        await fetch(`${process.env.WATI_API_URL}/api/v1/sendSessionMessage/${cleanPhone}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.WATI_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messageText: `🎉 ¡${firstName}, eres un héroe sin capa!\n\nTu familia ya tiene acceso a SaludCompartida.\n\n📋 *Código:* ${codigoFamilia}\n\n✅ Doctores 24/7\n✅ Hasta 75% en farmacias\n✅ Terapia incluida\n✅ Lupita los acompaña\n\n💚 Ya enviamos el código a ${familyFirstName}.\n\nDonde está tu corazón ♥ está SaludCompartida`,
          }),
        });
        results.whatsappSuscriptor = true;
        console.log('✅ WhatsApp suscriptor enviado');
      } catch (waError) {
        console.error('❌ WhatsApp suscriptor error:', waError);
      }
    }

    // ════════════════════════════════════════════════════════════
    // 4. WHATSAPP AL USUARIO EN MÉXICO
    // ════════════════════════════════════════════════════════════
    if (process.env.WATI_API_URL && process.env.WATI_API_TOKEN && usuarioPrincipalTelefono) {
      try {
        const cleanPhone = usuarioPrincipalTelefono.replace(/[^\d+]/g, '');
        const firstName = suscriptorNombre?.split(' ')[0] || 'Alguien especial';
        const familyFirstName = usuarioPrincipalNombre?.split(' ')[0] || 'Amigo';
        
        await fetch(`${process.env.WATI_API_URL}/api/v1/sendSessionMessage/${cleanPhone}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.WATI_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messageText: `💚 ¡Hola ${familyFirstName}!\n\n*${firstName}* te acaba de regalar algo muy especial: acceso a SaludCompartida.\n\n📋 *Tu código:* ${codigoFamilia}\n\n✅ Doctores 24/7 sin filas\n✅ Hasta 75% descuento en farmacias\n✅ Terapia psicológica incluida\n✅ Lupita te llamará pronto\n\n🔗 Entra a: saludcompartida.app/login\n\n_${firstName} te piensa todos los días. Esto es su amor convertido en acción._\n\nDonde está tu corazón ♥ está SaludCompartida`,
          }),
        });
        results.whatsappUsuario = true;
        console.log('✅ WhatsApp usuario México enviado');
      } catch (waError) {
        console.error('❌ WhatsApp usuario error:', waError);
      }
    }

    console.log('📧 Notification results:', results);
    return NextResponse.json({ success: true, results });

  } catch (error) {
    console.error('❌ Notification error:', error);
    return NextResponse.json({ error: 'Error sending notifications' }, { status: 500 });
  }
}