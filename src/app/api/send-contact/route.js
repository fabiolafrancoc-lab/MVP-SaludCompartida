import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { nombre, email, telefono, mensaje, to } = await request.json();

    // Enviar email a contact@saludcompartida.com
    const { data, error } = await resend.emails.send({
      from: 'SaludCompartida <noreply@saludcompartida.app>',
      to: [to || 'contact@saludcompartida.com'],
      subject: `Nuevo mensaje de contacto de ${nombre}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #EC4899, #DB2777); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: 700; color: #0EA5E9; margin-bottom: 5px; }
              .value { background: white; padding: 12px; border-radius: 6px; border-left: 4px solid #0EA5E9; }
              .mensaje { background: white; padding: 16px; border-radius: 6px; border-left: 4px solid #EC4899; white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">📩 Nuevo mensaje de contacto</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">👤 Nombre:</div>
                  <div class="value">${nombre}</div>
                </div>
                
                <div class="field">
                  <div class="label">📧 Email:</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                
                ${telefono ? `
                <div class="field">
                  <div class="label">📱 Teléfono:</div>
                  <div class="value">${telefono}</div>
                </div>
                ` : ''}
                
                <div class="field">
                  <div class="label">💬 Mensaje:</div>
                  <div class="mensaje">${mensaje}</div>
                </div>
                
                <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                
                <p style="color: #666; font-size: 12px; margin: 0;">
                  Este mensaje fue enviado desde el formulario de contacto de SaludCompartida<br>
                  Fecha: ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error enviando email:', error);
      return NextResponse.json({ error: 'Error al enviar mensaje' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error en /api/send-contact:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
