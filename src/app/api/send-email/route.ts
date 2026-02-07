import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    let emailContent;
    let recipients: string[] = [];
    let subject = '';

    switch (type) {
      case 'therapy_appointment':
        // Email cuando alguien agenda terapia
        recipients = ['contact@saludcompartida.com'];
        subject = '🧠 Nueva Solicitud de Terapia - SaludCompartida';
        emailContent = `
          <h2>Nueva Solicitud de Terapia</h2>
          <p><strong>Nombre:</strong> ${data.name}</p>
          <p><strong>Teléfono:</strong> ${data.phone}</p>
          <p><strong>Fecha solicitada:</strong> ${data.date}</p>
          <p><strong>Hora solicitada:</strong> ${data.time}</p>
          <p><strong>Código de usuario:</strong> ${data.userCode}</p>
          <p><strong>Fecha de solicitud:</strong> ${new Date().toLocaleString('es-MX')}</p>
        `;
        break;

      case 'new_subscription':
        // Email cuando hay nueva suscripción ACTIVA
        recipients = [
          'contact@saludcompartida.com'
        ];
        subject = '🎉 Nueva Suscripción Activa - SaludCompartida';
        emailContent = `
          <h2>Nueva Suscripción Activada</h2>
          <p><strong>ID Usuario México:</strong> ${data.familyId}</p>
          <p><strong>Nombre:</strong> ${data.familyName}</p>
          <p><strong>WhatsApp:</strong> ${data.familyPhone}</p>
          <p><strong>Fecha de Inicio:</strong> ${data.activationDate}</p>
          <p><strong>Código Familiar:</strong> ${data.familyCode}</p>
          <p><strong>Migrante:</strong> ${data.migrantName}</p>
          <p><strong>Código Migrante:</strong> ${data.migrantCode}</p>
        `;
        break;

      case 'daily_report':
        // Reporte diario de usuarios
        recipients = [
          'contact@saludcompartida.com'
        ];
        subject = `📊 Reporte Diario - ${data.reportTime} - SaludCompartida`;
        emailContent = `
          <h2>Reporte de Usuarios - ${data.reportTime}</h2>
          <h3>📈 Resumen</h3>
          <p><strong>Total usuarios activos:</strong> ${data.totalActive}</p>
          <p><strong>Nuevos hoy:</strong> ${data.newToday}</p>
          <p><strong>Fecha del reporte:</strong> ${data.reportDate}</p>
          
          ${data.newUsers && data.newUsers.length > 0 ? `
            <h3>🆕 Usuarios Nuevos Hoy</h3>
            <table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%;">
              <thead>
                <tr style="background-color: #f3f4f6;">
                  <th>Nombre</th>
                  <th>Código</th>
                  <th>WhatsApp</th>
                  <th>Fecha Activación</th>
                </tr>
              </thead>
              <tbody>
                ${data.newUsers.map((user: any) => `
                  <tr>
                    <td>${user.name}</td>
                    <td>${user.code}</td>
                    <td>${user.phone}</td>
                    <td>${user.activationDate}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : '<p>No hay nuevos usuarios hoy.</p>'}
          
          ${data.activeUsers && data.activeUsers.length > 0 ? `
            <h3>✅ Todos los Usuarios Activos</h3>
            <table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%;">
              <thead>
                <tr style="background-color: #f3f4f6;">
                  <th>Nombre</th>
                  <th>Código</th>
                  <th>WhatsApp</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${data.activeUsers.map((user: any) => `
                  <tr>
                    <td>${user.name}</td>
                    <td>${user.code}</td>
                    <td>${user.phone}</td>
                    <td style="color: #10B981;">Activo</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : '<p>No hay usuarios activos.</p>'}
        `;
        break;

      default:
        return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@saludcompartida.app';

    // Enviar email con Resend
    const { data: emailData, error } = await resend.emails.send({
      from: `SaludCompartida <${fromEmail}>`,
      to: recipients,
      subject: subject,
      html: `
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #06B6D4, #8B5CF6); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">SaludCompartida</h1>
          </div>
          <div style="padding: 30px; background: #f9fafb;">
            ${emailContent}
          </div>
          <div style="padding: 20px; text-align: center; background: #111827; color: #9ca3af; font-size: 12px;">
            <p>Este es un email automático de SaludCompartida</p>
            <p>© ${new Date().getFullYear()} SaludCompartida. Todos los derechos reservados.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, emailId: emailData?.id });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
