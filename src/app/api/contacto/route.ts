import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, name, email, phone, message, userType, timestamp } = body;

    // Validación básica
    if (!category || !name || !email || !message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Enviar email con Resend a contact@saludcompartida.com
    await resend.emails.send({
      from: 'SaludCompartida <noreply@saludcompartida.app>',
      to: 'contact@saludcompartida.com',
      subject: `📩 Contacto: ${category}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #06B6D4;">Nuevo mensaje de contacto</h2>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Categoría:</strong> ${category}</p>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
            <p><strong>Tipo de usuario:</strong> ${userType === 'migrant' ? 'Migrante (USA)' : 'México'}</p>
            <p><strong>Fecha:</strong> ${new Date(timestamp).toLocaleString('es-MX')}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3>Mensaje:</h3>
            <p style="white-space: pre-wrap; background: #f9fafb; padding: 15px; border-radius: 8px;">
              ${message}
            </p>
          </div>
        </div>
      `
    });

    console.log('✅ [CONTACTO] Email enviado exitosamente');
    
    return NextResponse.json({ 
      success: true,
      message: 'Mensaje enviado correctamente'
    });

  } catch (error) {
    console.error('❌ [CONTACTO] Error:', error);
    return NextResponse.json(
      { error: 'Error enviando mensaje' },
      { status: 500 }
    );
  }
}
