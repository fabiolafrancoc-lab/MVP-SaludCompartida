(()=>{var e={};e.id=463,e.ids=[463],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},77598:e=>{"use strict";e.exports=require("node:crypto")},19514:(e,a,i)=>{"use strict";i.r(a),i.d(a,{patchFetch:()=>w,routeModule:()=>b,serverHooks:()=>y,workAsyncStorage:()=>h,workUnitAsyncStorage:()=>v});var t={};i.r(t),i.d(t,{POST:()=>_});var o=i(42706),r=i(28203),s=i(45994),n=i(39187),l=i(58072);let p=e=>{let a="lupita"===e.companion_assigned?"Lupita":"Fernanda",i="lupita"===e.companion_assigned?"55+":"25-54";return{subject:`\xa1Bienvenido a SaludCompartida! ${e.family_first_name} ahora tiene a ${a}`,html:`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background: white;
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 32px;
    }
    .logo {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #00D9FF 0%, #00B8D9 100%);
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      margin-bottom: 16px;
    }
    h1 {
      color: #0a0a0a;
      font-size: 28px;
      margin-bottom: 8px;
    }
    .subtitle {
      color: #666;
      font-size: 16px;
    }
    .code-box {
      background: linear-gradient(135deg, rgba(0, 217, 255, 0.1) 0%, rgba(0, 184, 217, 0.05) 100%);
      border: 2px solid #00D9FF;
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      margin: 32px 0;
    }
    .code-label {
      font-size: 14px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    .code-value {
      font-size: 36px;
      font-weight: 700;
      color: #00D9FF;
      letter-spacing: 6px;
      font-family: 'Courier New', monospace;
    }
    .info-box {
      background: #f8f9fa;
      border-left: 4px solid #00D9FF;
      border-radius: 8px;
      padding: 20px;
      margin: 24px 0;
    }
    .info-title {
      font-weight: 600;
      color: #0a0a0a;
      margin-bottom: 8px;
      font-size: 18px;
    }
    .info-text {
      color: #555;
      margin: 8px 0;
    }
    .steps {
      margin: 32px 0;
    }
    .step {
      display: flex;
      gap: 16px;
      margin-bottom: 20px;
      align-items: start;
    }
    .step-number {
      width: 32px;
      height: 32px;
      background: #00D9FF;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      flex-shrink: 0;
    }
    .step-content {
      flex: 1;
    }
    .step-title {
      font-weight: 600;
      color: #0a0a0a;
      margin-bottom: 4px;
    }
    .step-text {
      color: #555;
      font-size: 14px;
    }
    .cta-button {
      display: inline-block;
      background: #00D9FF;
      color: white;
      padding: 16px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      margin: 24px 0;
      text-align: center;
    }
    .footer {
      text-align: center;
      color: #999;
      font-size: 12px;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #eee;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">💚</div>
      <h1>\xa1Pago Exitoso!</h1>
      <p class="subtitle">Tu familia ya tiene acceso a SaludCompartida</p>
    </div>

    <p>Hola <strong>${e.migrant_first_name}</strong>,</p>
    
    <p>Tu pago fue procesado exitosamente. <strong>${e.family_first_name}</strong> en M\xe9xico ahora tiene acceso a ${a}, su compa\xf1era de confianza especializada en adultos ${i} a\xf1os.</p>

    <div class="code-box">
      <div class="code-label">C\xf3digo Familiar</div>
      <div class="code-value">${e.family_code}</div>
      <p style="margin-top: 12px; color: #666; font-size: 14px;">
        Comparte este c\xf3digo con ${e.family_first_name}
      </p>
    </div>

    <div class="info-box">
      <div class="info-title">📞 ${e.family_first_name} puede llamar ahora mismo</div>
      <p class="info-text">
        N\xfamero: <strong>${e.phone_number}</strong><br>
        Al llamar, ${a} pedir\xe1 el c\xf3digo <strong>${e.family_code}</strong> para identificarse.
      </p>
    </div>

    <div class="steps">
      <h2 style="font-size: 20px; margin-bottom: 24px;">\xbfQu\xe9 sigue?</h2>
      
      <div class="step">
        <div class="step-number">1</div>
        <div class="step-content">
          <div class="step-title">${e.family_first_name} recibe WhatsApp</div>
          <div class="step-text">Le llegar\xe1 un mensaje con su c\xf3digo de acceso y c\xf3mo usar el servicio.</div>
        </div>
      </div>

      <div class="step">
        <div class="step-number">2</div>
        <div class="step-content">
          <div class="step-title">Primera llamada en minutos</div>
          <div class="step-text">${a} se presentar\xe1 y comenzar\xe1 a construir una relaci\xf3n de confianza.</div>
        </div>
      </div>

      <div class="step">
        <div class="step-number">3</div>
        <div class="step-content">
          <div class="step-title">Accede a tu dashboard</div>
          <div class="step-text">Monitorea las llamadas, ahorros m\xe9dicos y el bienestar de ${e.family_first_name}.</div>
        </div>
      </div>
    </div>

    <center>
      <a href="https://saludcompartida.app/login" class="cta-button">
        Acceder a Mi Dashboard
      </a>
    </center>

    <div class="footer">
      <p>
        <strong>SaludCompartida</strong><br>
        Conectando familias a trav\xe9s de las fronteras<br>
        <a href="https://saludcompartida.app" style="color: #00D9FF;">saludcompartida.app</a>
      </p>
      <p style="margin-top: 16px;">
        Si tienes preguntas, responde a este email o escr\xedbenos a<br>
        <a href="mailto:soporte@saludcompartida.app" style="color: #00D9FF;">soporte@saludcompartida.app</a>
      </p>
    </div>
  </div>
</body>
</html>
    `,text:`
\xa1Hola ${e.migrant_first_name}!

Tu pago fue procesado exitosamente. ${e.family_first_name} en M\xe9xico ahora tiene acceso a ${a}.

C\xd3DIGO FAMILIAR: ${e.family_code}

${e.family_first_name} puede llamar ahora mismo a: ${e.phone_number}

\xbfQu\xe9 sigue?
1. ${e.family_first_name} recibe WhatsApp con instrucciones
2. ${a} llamar\xe1 pronto para presentarse
3. Accede a tu dashboard en: https://saludcompartida.app/login

Gracias por confiar en SaludCompartida.
    `}},d=e=>{let a="lupita"===e.companion_assigned?"Lupita":"Fernanda",i="lupita"===e.companion_assigned?"especializada en adultos mayores de 55 a\xf1os":"especializada en adultos de 25 a 54 a\xf1os";return{subject:`\xa1${e.migrant_first_name} te regal\xf3 a ${a}! 🎁`,html:`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background: white;
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 32px;
    }
    .logo {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #00D9FF 0%, #00B8D9 100%);
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      margin-bottom: 16px;
    }
    h1 {
      color: #0a0a0a;
      font-size: 28px;
      margin-bottom: 8px;
    }
    .subtitle {
      color: #666;
      font-size: 16px;
    }
    .gift-box {
      background: linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(219, 39, 119, 0.05) 100%);
      border: 2px solid #EC4899;
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      margin: 32px 0;
    }
    .gift-emoji {
      font-size: 48px;
      margin-bottom: 12px;
    }
    .gift-text {
      font-size: 18px;
      color: #333;
      font-weight: 600;
    }
    .code-box {
      background: linear-gradient(135deg, rgba(0, 217, 255, 0.1) 0%, rgba(0, 184, 217, 0.05) 100%);
      border: 2px solid #00D9FF;
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      margin: 32px 0;
    }
    .code-label {
      font-size: 14px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    .code-value {
      font-size: 36px;
      font-weight: 700;
      color: #00D9FF;
      letter-spacing: 6px;
      font-family: 'Courier New', monospace;
    }
    .call-box {
      background: linear-gradient(135deg, #00D9FF 0%, #00B8D9 100%);
      color: white;
      border-radius: 12px;
      padding: 32px;
      text-align: center;
      margin: 32px 0;
    }
    .call-title {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 16px;
    }
    .phone-number {
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 2px;
      margin: 16px 0;
    }
    .call-note {
      font-size: 14px;
      opacity: 0.9;
      margin-top: 16px;
    }
    .info-box {
      background: #f8f9fa;
      border-left: 4px solid #00D9FF;
      border-radius: 8px;
      padding: 20px;
      margin: 24px 0;
    }
    .footer {
      text-align: center;
      color: #999;
      font-size: 12px;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #eee;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">💚</div>
      <h1>\xa1Tienes un regalo!</h1>
      <p class="subtitle">De parte de ${e.migrant_first_name}</p>
    </div>

    <div class="gift-box">
      <div class="gift-emoji">🎁</div>
      <p class="gift-text">
        ${e.migrant_first_name} acaba de activar SaludCompartida para ti
      </p>
    </div>

    <p>Hola <strong>${e.family_first_name}</strong>,</p>
    
    <p>Te presentamos a <strong>${a}</strong>, tu compa\xf1era de confianza ${i}. Ella estar\xe1 disponible para ti cuando la necesites.</p>

    <div class="code-box">
      <div class="code-label">Tu C\xf3digo Personal</div>
      <div class="code-value">${e.family_code}</div>
      <p style="margin-top: 12px; color: #666; font-size: 14px;">
        Menciona este c\xf3digo cuando llames
      </p>
    </div>

    <div class="call-box">
      <div class="call-title">📞 Llama cuando quieras</div>
      <div class="phone-number">${e.phone_number}</div>
      <p class="call-note">
        ✓ Gratis para ti<br>
        ✓ Disponible 24/7<br>
        ✓ Conversaciones privadas y confidenciales
      </p>
    </div>

    <div class="info-box">
      <p><strong>\xbfQu\xe9 puedes hacer con ${a}?</strong></p>
      <ul style="margin: 12px 0; padding-left: 20px;">
        <li>Hablar sobre tu salud y bienestar</li>
        <li>Recibir recordatorios de medicamentos</li>
        <li>Encontrar cl\xednicas cerca de ti</li>
        <li>Pedir citas m\xe9dicas</li>
        <li>Compa\xf1\xeda cuando te sientas solo/a</li>
      </ul>
    </div>

    <p style="margin-top: 32px; padding: 20px; background: #fffbeb; border-radius: 8px; border-left: 4px solid #f59e0b;">
      <strong>💡 Tip:</strong> ${a} te llamar\xe1 pronto para presentarse. Tambi\xe9n puedes llamarla t\xfa primero cuando quieras.
    </p>

    <div class="footer">
      <p>
        <strong>SaludCompartida</strong><br>
        Un regalo de amor de ${e.migrant_first_name}<br>
        <a href="https://saludcompartida.app" style="color: #00D9FF;">saludcompartida.app</a>
      </p>
      <p style="margin-top: 16px;">
        Si tienes dudas, responde a este email<br>
        o escr\xedbenos a <a href="mailto:soporte@saludcompartida.app" style="color: #00D9FF;">soporte@saludcompartida.app</a>
      </p>
    </div>
  </div>
</body>
</html>
    `,text:`
\xa1Hola ${e.family_first_name}!

${e.migrant_first_name} acaba de activar SaludCompartida para ti. 

Te presentamos a ${a}, tu compa\xf1era de confianza.

TU C\xd3DIGO PERSONAL: ${e.family_code}

Llama cuando quieras a: ${e.phone_number}
(Menciona tu c\xf3digo: ${e.family_code})

\xbfQu\xe9 puedes hacer con ${a}?
- Hablar sobre tu salud y bienestar
- Recibir recordatorios de medicamentos
- Encontrar cl\xednicas cerca de ti
- Pedir citas m\xe9dicas
- Compa\xf1\xeda cuando te sientas solo/a

${a} te llamar\xe1 pronto para presentarse.

Un regalo de amor de ${e.migrant_first_name}
    `}};async function c(e){let a="lupita"===e.companion_assigned?"Lupita":"Fernanda";try{let i=await fetch(`${process.env.WATI_API_URL}/api/v1/sendTemplateMessage`,{method:"POST",headers:{Authorization:`Bearer ${process.env.WATI_API_TOKEN}`,"Content-Type":"application/json"},body:JSON.stringify({whatsappNumber:e.migrant_phone,template_name:"bienvenida_migrante",broadcast_name:"Post-Pago Migrante",parameters:[{name:"1",value:e.migrant_first_name},{name:"2",value:e.family_first_name},{name:"3",value:a},{name:"4",value:e.family_code},{name:"5",value:e.phone_number}]})}),t=await i.json();if(!i.ok)return console.error("❌ Error enviando WhatsApp migrante:",t),{success:!1,error:t};return console.log("✅ WhatsApp enviado a migrante:",e.migrant_phone),{success:!0,data:t}}catch(e){return console.error("❌ Error en sendWhatsAppMigrante:",e),{success:!1,error:e.message}}}async function m(e){let a="lupita"===e.companion_assigned?"Lupita":"Fernanda";try{let i=await fetch(`${process.env.WATI_API_URL}/api/v1/sendTemplateMessage`,{method:"POST",headers:{Authorization:`Bearer ${process.env.WATI_API_TOKEN}`,"Content-Type":"application/json"},body:JSON.stringify({whatsappNumber:e.family_phone,template_name:"bienvenida_usuario_mexico",broadcast_name:"Post-Pago Usuario M\xe9xico",parameters:[{name:"1",value:e.family_first_name},{name:"2",value:e.migrant_first_name},{name:"3",value:a},{name:"4",value:e.family_code},{name:"5",value:e.phone_number}]})}),t=await i.json();if(!i.ok)return console.error("❌ Error enviando WhatsApp usuario:",t),{success:!1,error:t};return console.log("✅ WhatsApp enviado a usuario M\xe9xico:",e.family_phone),{success:!0,data:t}}catch(e){return console.error("❌ Error en sendWhatsAppUsuarioMexico:",e),{success:!1,error:e.message}}}async function u(e){console.log("\uD83D\uDCF1 Enviando WhatsApp post-pago...");let a={migrante:await c(e),usuario:await m(e)};return console.log("\uD83D\uDCCA Resultados WhatsApp:",{migrante:a.migrante.success?"✅":"❌",usuario:a.usuario.success?"✅":"❌"}),a}let g=new l.Resend(process.env.RESEND_API_KEY);async function f(e){console.log("\uD83D\uDE80 Iniciando env\xedo de notificaciones post-pago..."),console.log("\uD83D\uDCCB Registration ID:",e.registration_id),console.log("\uD83D\uDD11 Family Code:",e.family_code);let a={emailMigrante:{success:!1,error:null},emailUsuario:{success:!1,error:null},whatsappMigrante:{success:!1,error:null},whatsappUsuario:{success:!1,error:null}},i="+525599906900",t={migrant_first_name:e.migrant_first_name,family_first_name:e.family_first_name,family_code:e.family_code,companion_assigned:e.companion_assigned,phone_number:i},o={migrant_first_name:e.migrant_first_name,family_first_name:e.family_first_name,family_code:e.family_code,companion_assigned:e.companion_assigned,phone_number:i,migrant_phone:e.migrant_phone,family_phone:e.family_phone};try{console.log("\uD83D\uDCE7 Enviando email a migrante:",e.migrant_email);let i=p(t),o=await g.emails.send({from:process.env.RESEND_FROM_EMAIL||"SaludCompartida <noreply@saludcompartida.app>",to:e.migrant_email,subject:i.subject,html:i.html,text:i.text});a.emailMigrante={success:!0,error:null},console.log("✅ Email migrante enviado:",o.id)}catch(e){console.error("❌ Error email migrante:",e),a.emailMigrante={success:!1,error:e.message}}if(e.family_email)try{console.log("\uD83D\uDCE7 Enviando email a usuario M\xe9xico:",e.family_email);let i=d(t),o=await g.emails.send({from:process.env.RESEND_FROM_EMAIL||"SaludCompartida <noreply@saludcompartida.app>",to:e.family_email,subject:i.subject,html:i.html,text:i.text});a.emailUsuario={success:!0,error:null},console.log("✅ Email usuario enviado:",o.id)}catch(e){console.error("❌ Error email usuario:",e),a.emailUsuario={success:!1,error:e.message}}else console.log("⚠️ Email de usuario M\xe9xico no proporcionado, solo enviar\xe1 WhatsApp");try{console.log("\uD83D\uDCF1 Enviando WhatsApp a ambos n\xfameros...");let e=await u(o);a.whatsappMigrante=e.migrante,a.whatsappUsuario=e.usuario}catch(e){console.error("❌ Error enviando WhatsApp:",e),a.whatsappMigrante={success:!1,error:e.message},a.whatsappUsuario={success:!1,error:e.message}}let r={total:4,exitosos:Object.values(a).filter(e=>e.success).length,fallidos:Object.values(a).filter(e=>!e.success).length,details:a};return console.log("\uD83D\uDCCA Resumen notificaciones:",{"✅ Exitosos":r.exitosos,"❌ Fallidos":r.fallidos,"Email Migrante":a.emailMigrante.success?"✅":"❌","Email Usuario":a.emailUsuario.success?"✅":"❌","WhatsApp Migrante":a.whatsappMigrante.success?"✅":"❌","WhatsApp Usuario":a.whatsappUsuario.success?"✅":"❌"}),r}let x=(0,i(47752).UU)("https://rzmdekjegbdgitqekjee.supabase.co",process.env.SUPABASE_SERVICE_KEY||"");async function _(e){try{let{registration_id:a}=await e.json();if(!a)return n.NextResponse.json({success:!1,error:"Missing registration_id"},{status:400});console.log("\uD83D\uDCE7 Procesando notificaciones post-pago para:",a);let{data:i,error:t}=await x.from("registrations").select("*").eq("id",a).single();if(t||!i)return console.error("❌ Error obteniendo registro:",t),n.NextResponse.json({success:!1,error:"Registration not found"},{status:404});if(!i.migrant_email)return console.error("❌ Registro sin email de migrante"),n.NextResponse.json({success:!1,error:"Migrant email is required"},{status:400});let o=await f({registration_id:i.id,family_code:i.family_code,migrant_first_name:i.migrant_first_name,migrant_last_name:i.migrant_last_name,migrant_email:i.migrant_email,migrant_phone:`${i.migrant_country_code}${i.migrant_phone}`,family_first_name:i.family_first_name,family_last_name:i.family_last_name,family_email:i.family_email||void 0,family_phone:`${i.family_country_code}${i.family_phone}`,companion_assigned:i.companion_assigned});return await x.from("registrations").update({notifications_sent_at:new Date().toISOString()}).eq("id",a),n.NextResponse.json({success:!0,results:o})}catch(e){return console.error("❌ Error en send-notifications:",e),n.NextResponse.json({success:!1,error:e.message},{status:500})}}let b=new o.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/send-notifications/route",pathname:"/api/send-notifications",filename:"route",bundlePath:"app/api/send-notifications/route"},resolvedPagePath:"/home/runner/work/MVP-SaludCompartida/MVP-SaludCompartida/src/app/api/send-notifications/route.ts",nextConfigOutput:"",userland:t}),{workAsyncStorage:h,workUnitAsyncStorage:v,serverHooks:y}=b;function w(){return(0,s.patchFetch)({workAsyncStorage:h,workUnitAsyncStorage:v})}},96487:()=>{},78335:()=>{}};var a=require("../../../webpack-runtime.js");a.C(e);var i=e=>a(a.s=e),t=a.X(0,[638,452,752,691],()=>i(19514));module.exports=t})();