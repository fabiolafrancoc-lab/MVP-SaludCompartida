exports.id=744,exports.ids=[744],exports.modules={96487:()=>{},78335:()=>{},12015:(t,a,e)=>{"use strict";e.d(a,{Do:()=>l,IA:()=>n,j$:()=>d,tL:()=>c});let r=new(e(58072)).Resend(process.env.RESEND_API_KEY),i=process.env.RESEND_FROM_EMAIL||"noreply@saludcompartida.app",o=["stephania.cardenas@anevent.com.mx","stephania.cardenas@auramultiasistencias.com"],s=["stephania.cardenas@auramultiasistencias.com","administracion@auramultiasistencias.com"];async function d(t){try{return await r.emails.send({from:i,to:t.migrantEmail,subject:"\uD83C\uDF89 \xa1Bienvenido a SaludCompartida!",html:`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #06B6D4 0%, #EC4899 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .credentials-box { background: white; border-left: 4px solid #06B6D4; padding: 20px; margin: 20px 0; border-radius: 5px; }
            .button { display: inline-block; background: #06B6D4; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>\xa1Suscripci\xf3n Exitosa! 🎉</h1>
              <p>Tu familia en M\xe9xico ya puede acceder a servicios de salud</p>
            </div>
            <div class="content">
              <p>Hola <strong>${t.migrantName}</strong>,</p>
              
              <p>\xa1Gracias por confiar en SaludCompartida! Tu suscripci\xf3n ha sido procesada exitosamente.</p>
              
              <div class="credentials-box">
                <h3>📋 Tus Credenciales</h3>
                <p><strong>C\xf3digo de Familia:</strong> <span style="font-size: 24px; color: #06B6D4; font-weight: bold;">${t.codigoFamilia}</span></p>
                <p><strong>Plan:</strong> ${t.planName} - $${t.planPrice}/mes</p>
                <p><strong>Email:</strong> ${t.migrantEmail}</p>
              </div>
              
              <p><strong>⚠️ IMPORTANTE:</strong> Comparte el <strong>C\xf3digo de Familia</strong> con tus familiares en M\xe9xico para que puedan acceder a los servicios.</p>
              
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">Acceder al Dashboard</a>
              
              <h3>🏥 Servicios Disponibles:</h3>
              <ul>
                <li>✅ Telemedicina 24/7 ilimitada</li>
                <li>✅ Descuentos en farmacias</li>
                <li>✅ Terapia psicol\xf3gica</li>
                <li>✅ Consultas con especialistas</li>
              </ul>
              
              <p>Si tienes preguntas, cont\xe1ctanos en <a href="mailto:soporte@saludcompartida.app">soporte@saludcompartida.app</a></p>
              
              <div class="footer">
                <p>SaludCompartida - Cuidamos de tu familia, est\xe9s donde est\xe9s</p>
                <p>\xa9 2026 SaludCompartida. Todos los derechos reservados.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `}),{success:!0}}catch(t){return console.error("Error sending migrant welcome email:",t),{success:!1,error:t}}}async function n(t){try{return await r.emails.send({from:i,to:o,subject:`🆕 Nueva Suscripci\xf3n - ${t.codigoFamilia}`,html:`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 700px; margin: 0 auto; padding: 20px; }
            .header { background: #1F2937; color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; background: white; }
            th { background: #06B6D4; color: white; padding: 12px; text-align: left; }
            td { padding: 12px; border-bottom: 1px solid #ddd; }
            .alert { background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0; }
            .highlight { background: #E0F7FA; border-left: 4px solid #06B6D4; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🆕 Nueva Suscripci\xf3n Registrada</h2>
              <p style="margin: 0;">C\xf3digo: <strong>${t.codigoFamilia}</strong></p>
            </div>
            <div class="content">
              <div class="alert">
                <strong>⚡ NOTIFICACI\xd3N INMEDIATA</strong><br>
                Esta suscripci\xf3n acaba de ser procesada.
              </div>
              
              <div class="highlight">
                <strong>🎉 Activaci\xf3n de Suscripci\xf3n:</strong><br>
                Fecha: <strong>${t.activationDate}</strong><br>
                Hora: <strong>${t.activationTime}</strong>
              </div>
              
              <h3>👤 Datos del Migrante (USA)</h3>
              <table>
                <tr><th>Campo</th><th>Valor</th></tr>
                <tr><td>Nombre</td><td><strong>${t.migrantName}</strong></td></tr>
                <tr><td>Apellido Paterno</td><td><strong>${t.migrantLastName}</strong></td></tr>
                <tr><td>Email</td><td>${t.migrantEmail}</td></tr>
                <tr><td>Tel\xe9fono</td><td>${t.migrantPhone}</td></tr>
                <tr><td>Estado (USA)</td><td>${t.migrantState}</td></tr>
              </table>
              
              <h3>👨‍👩‍👧 Usuario Principal (M\xe9xico) - DATOS COMPLETOS</h3>
              <table>
                <tr><th>Campo</th><th>Valor</th></tr>
                <tr><td>Nombre</td><td><strong>${t.principalName}</strong></td></tr>
                <tr><td>Apellido Paterno</td><td><strong>${t.principalLastName}</strong></td></tr>
                <tr><td>Fecha de Nacimiento</td><td><strong>${t.principalBirthDate}</strong></td></tr>
                <tr><td>Tel\xe9fono/Celular</td><td><strong>${t.principalPhone}</strong></td></tr>
                <tr><td>Total Beneficiarios</td><td>${t.familyMembersCount} personas</td></tr>
              </table>
              
              <h3>💳 Plan Contratado</h3>
              <table>
                <tr><th>Campo</th><th>Valor</th></tr>
                <tr><td>Plan</td><td><strong>${t.planName}</strong></td></tr>
                <tr><td>Precio Mensual</td><td><strong>$${t.planPrice} USD</strong></td></tr>
                <tr><td>C\xf3digo de Familia</td><td><strong style="color: #06B6D4; font-size: 18px;">${t.codigoFamilia}</strong></td></tr>
                <tr><td>Fecha de Activaci\xf3n</td><td><strong>${t.activationDate} ${t.activationTime}</strong></td></tr>
              </table>
              
              <p style="margin-top: 30px; font-size: 12px; color: #666;">
                Este email es autom\xe1tico. Recibir\xe1s un resumen diario a las 07:00 y 19:00 hrs.
              </p>
            </div>
          </div>
        </body>
        </html>
      `}),{success:!0}}catch(t){return console.error("Error sending Aura immediate notification:",t),{success:!1,error:t}}}async function l(t){try{let a=new Date().getHours(),e=7===a?"07:00 hrs":"19:00 hrs";return await r.emails.send({from:i,to:o,subject:`📊 Resumen Diario SaludCompartida - ${e}`,html:`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 700px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1F2937 0%, #06B6D4 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .stats { display: flex; justify-content: space-around; margin: 30px 0; }
            .stat-card { background: white; padding: 20px; border-radius: 10px; text-align: center; flex: 1; margin: 0 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            .stat-number { font-size: 48px; font-weight: bold; color: #06B6D4; }
            .stat-label { color: #666; margin-top: 10px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; background: white; }
            th { background: #1F2937; color: white; padding: 12px; text-align: left; }
            td { padding: 12px; border-bottom: 1px solid #ddd; }
            .footer { text-align: center; margin-top: 30px; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📊 Resumen Diario</h1>
              <p>${new Date().toLocaleDateString("es-MX",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
              <p style="font-size: 18px; margin: 0;">${e}</p>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <div class="stats">
                <div class="stat-card">
                  <div class="stat-number">${t.totalSubscribers}</div>
                  <div class="stat-label">Total Suscriptores</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number" style="color: #22c55e;">${t.newToday}</div>
                  <div class="stat-label">Nuevos Hoy</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number" style="color: #EC4899;">${t.activeSubscriptions}</div>
                  <div class="stat-label">Activos</div>
                </div>
              </div>
              
              ${t.recentSubscriptions.length>0?`
                <h3>📋 Suscripciones Recientes (\xdaltimas 24h)</h3>
                <table>
                  <tr>
                    <th>C\xf3digo</th>
                    <th>Migrante</th>
                    <th>Beneficiario</th>
                    <th>Tel\xe9fono</th>
                    <th>Plan</th>
                  </tr>
                  ${t.recentSubscriptions.map(t=>`
                    <tr>
                      <td><strong>${t.codigoFamilia}</strong></td>
                      <td>${t.migrantName}</td>
                      <td>${t.principalName}</td>
                      <td>${t.principalPhone}</td>
                      <td>${t.planName}</td>
                    </tr>
                  `).join("")}
                </table>
              `:`
                <p style="text-align: center; padding: 40px; background: white; border-radius: 10px;">
                  No hay nuevas suscripciones en las \xfaltimas 24 horas.
                </p>
              `}
              
              <div class="footer">
                <p><strong>SaludCompartida</strong></p>
                <p>Este reporte se genera autom\xe1ticamente a las 07:00 y 19:00 hrs, todos los d\xedas.</p>
                <p>\xa9 2026 SaludCompartida. Todos los derechos reservados.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `}),{success:!0}}catch(t){return console.error("Error sending Aura daily summary:",t),{success:!1,error:t}}}async function c(t){try{let a=new Date(t.sessionDate).toLocaleDateString("es-MX",{weekday:"long",year:"numeric",month:"long",day:"numeric"});return await r.emails.send({from:i,to:s,subject:`🧠 Nueva Sesi\xf3n de Terapia Agendada - ${t.codigoFamilia}`,html:`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #EC4899; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .alert { background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0; border-radius: 5px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; background: white; }
            th { background: #EC4899; color: white; padding: 12px; text-align: left; }
            td { padding: 12px; border-bottom: 1px solid #ddd; }
            .highlight { background: #FEE2E2; padding: 15px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🧠 Nueva Sesi\xf3n de Terapia</h2>
              <p style="margin: 0; font-size: 18px;">⏰ Acci\xf3n Requerida</p>
            </div>
            <div class="content">
              <div class="alert">
                <strong>⚡ NOTIFICACI\xd3N INMEDIATA</strong><br>
                Un usuario ha agendado una sesi\xf3n de terapia psicol\xf3gica.
              </div>
              
              <h3>📋 Detalles de la Sesi\xf3n</h3>
              <table>
                <tr><th>Campo</th><th>Valor</th></tr>
                <tr><td><strong>👤 Nombre del Paciente</strong></td><td><strong style="font-size: 16px; color: #EC4899;">${t.patientName}</strong></td></tr>
                <tr><td><strong>📱 Tel\xe9fono M\xf3vil</strong></td><td><strong style="font-size: 16px;">${t.patientPhone}</strong></td></tr>
                <tr><td><strong>📧 Email</strong></td><td><strong style="font-size: 16px;">${t.patientEmail}</strong></td></tr>
                <tr><td><strong>📅 Fecha</strong></td><td><strong style="font-size: 16px; color: #059669;">${a}</strong></td></tr>
                <tr><td><strong>⏰ Hora</strong></td><td><strong style="font-size: 16px; color: #059669;">${t.sessionTime}</strong></td></tr>
                <tr><td>🔑 C\xf3digo Familia</td><td>${t.codigoFamilia}</td></tr>
                <tr><td>🧠 Tipo de Terapia</td><td>${t.therapyType}</td></tr>
              </table>
              
              <div class="highlight">
                <p><strong>📞 Acci\xf3n Requerida:</strong></p>
                <ol style="margin: 10px 0 0 0; padding-left: 20px;">
                  <li>Confirmar disponibilidad del terapeuta</li>
                  <li>Contactar al paciente:
                    <ul>
                      <li>📱 Tel\xe9fono: <strong>${t.patientPhone}</strong></li>
                      <li>📧 Email: <strong>${t.patientEmail}</strong></li>
                    </ul>
                  </li>
                  <li>Enviar link de la sesi\xf3n virtual</li>
                  <li>Confirmar la cita 24 horas antes</li>
                </ol>
              </div>
              
              <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center;">
                <strong>SaludCompartida</strong><br>
                Este email es autom\xe1tico. Responda para coordinar los detalles.<br>
                \xa9 2026 SaludCompartida. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </body>
        </html>
      `}),{success:!0}}catch(t){return console.error("Error sending therapy session notification:",t),{success:!1,error:t}}}},57886:(t,a,e)=>{"use strict";e.d(a,{AG:()=>o,yg:()=>s});var r=e(47752);let i=null;function o(){if(i)return i;let t=process.env.SUPABASE_URL||"https://rzmdekjegbdgitqekjee.supabase.co",a=process.env.SUPABASE_SERVICE_ROLE_KEY||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6bWRla2plZ2JkZ2l0cWVramVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NTQ2NDcsImV4cCI6MjA1MjAzMDY0N30.pPTn8F7vK0xQYq8YvH5FvXJaHZ0xF7UwJ4qJ5xKqHzQ";if(!t||!a)throw Error("Missing Supabase environment variables");return i=(0,r.UU)(t,a,{auth:{autoRefreshToken:!1,persistSession:!1}})}function s(){let t="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",a="SC-";for(let e=0;e<6;e++)a+=t.charAt(Math.floor(Math.random()*t.length));return a}}};