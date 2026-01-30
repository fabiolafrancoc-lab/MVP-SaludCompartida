(()=>{var e={};e.id=630,e.ids=[630],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},77598:e=>{"use strict";e.exports=require("node:crypto")},52541:(e,r,t)=>{"use strict";t.r(r),t.d(r,{patchFetch:()=>x,routeModule:()=>c,serverHooks:()=>u,workAsyncStorage:()=>l,workUnitAsyncStorage:()=>d});var a={};t.r(a),t.d(a,{POST:()=>p});var o=t(42706),i=t(28203),s=t(45994),n=t(39187);async function p(e){try{let{type:r,registrationId:a,codigoFamilia:o,suscriptorEmail:i,suscriptorNombre:s,suscriptorTelefono:p,usuarioPrincipalNombre:c,usuarioPrincipalTelefono:l,planName:d}=await e.json();console.log(`Sending ${r} notifications for:`,o);let u={email:!1,whatsappSuscriptor:!1,whatsappUsuario:!1};if(process.env.RESEND_API_KEY)try{let{Resend:e}=await t.e(691).then(t.bind(t,58072)),r=new e(process.env.RESEND_API_KEY);await r.emails.send({from:"SaludCompartida <noreply@saludcompartida.app>",to:i,subject:"\xa1Bienvenido a SaludCompartida!",html:`
            <!DOCTYPE html>
            <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #06B6D4 0%, #0891B2 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0;">\xa1Bienvenido a SaludCompartida!</h1>
              </div>
              <div style="padding: 40px 30px;">
                <h2 style="color: #1F2937;">\xa1Hola, ${s.split(" ")[0]}!</h2>
                <p style="color: #4B5563; font-size: 16px;">Tu suscripci\xf3n est\xe1 activa. Tu familia en M\xe9xico ya puede usar todos los servicios de salud.</p>
                
                <div style="background-color: #F0FDFA; border: 2px solid #06B6D4; border-radius: 12px; padding: 20px; margin: 30px 0; text-align: center;">
                  <p style="color: #0891B2; font-size: 14px; margin: 0 0 10px 0;">C\xf3digo de tu familia:</p>
                  <p style="color: #0891B2; font-size: 32px; font-weight: bold; font-family: monospace; margin: 0;">${o}</p>
                  <p style="color: #6B7280; font-size: 12px; margin: 10px 0 0 0;">Comparte este c\xf3digo con ${c}</p>
                </div>
                
                <h3 style="color: #1F2937;">Servicios incluidos en tu plan ${d}:</h3>
                <ul style="color: #4B5563;">
                  <li>✓ Telemedicina ilimitada 24/7</li>
                  <li>✓ Descuento en farmacias (40-75%)</li>
                  <li>✓ Hasta 4 personas cubiertas</li>
                  ${"Premium"===d?"<li>✓ Terapia psicol\xf3gica semanal</li>":""}
                </ul>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="display: inline-block; background: #06B6D4; color: white; padding: 15px 40px; border-radius: 8px; text-decoration: none; font-weight: bold;">Ir a mi Dashboard</a>
                </div>
                
                <p style="color: #6B7280; font-size: 14px; text-align: center;">\xbfPreguntas? Cont\xe1ctanos: +1 305 522 7150</p>
              </div>
              <div style="background-color: #1F2937; padding: 20px; text-align: center;">
                <p style="color: #9CA3AF; font-size: 12px; margin: 0;">\xa9 2026 SaludCompartida. Todos los derechos reservados.</p>
              </div>
            </body>
            </html>
          `}),u.email=!0}catch(e){console.error("Email error:",e)}if(process.env.WATI_API_URL&&process.env.WATI_API_TOKEN)try{let e=p.replace(/[^\d+]/g,"");await fetch(`${process.env.WATI_API_URL}/api/v1/sendSessionMessage/${e}`,{method:"POST",headers:{Authorization:`Bearer ${process.env.WATI_API_TOKEN}`,"Content-Type":"application/json"},body:JSON.stringify({messageText:`🎉 \xa1Hola ${s.split(" ")[0]}! Tu familia ya tiene acceso a SaludCompartida.

📋 C\xf3digo: ${o}

💚 Comparte este c\xf3digo con ${c.split(" ")[0]}`})}),u.whatsappSuscriptor=!0}catch(e){console.error("WhatsApp suscriptor error:",e)}if(process.env.WATI_API_URL&&process.env.WATI_API_TOKEN)try{let e=l.replace(/[^\d+]/g,"");await fetch(`${process.env.WATI_API_URL}/api/v1/sendSessionMessage/${e}`,{method:"POST",headers:{Authorization:`Bearer ${process.env.WATI_API_TOKEN}`,"Content-Type":"application/json"},body:JSON.stringify({messageText:`🏥 \xa1Hola ${c.split(" ")[0]}!

${s.split(" ")[0]} te ha inscrito en SaludCompartida.

✅ Ya tienes acceso a:
- Telemedicina 24/7
- Descuentos en farmacias
- Terapia psicol\xf3gica

📋 Tu c\xf3digo: ${o}
🌐 Entra a: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard`})}),u.whatsappUsuario=!0}catch(e){console.error("WhatsApp usuario error:",e)}return n.NextResponse.json({success:!0,results:u})}catch(e){return console.error("Notification error:",e),n.NextResponse.json({error:"Error sending notifications"},{status:500})}}let c=new o.AppRouteRouteModule({definition:{kind:i.RouteKind.APP_ROUTE,page:"/api/notificaciones/route",pathname:"/api/notificaciones",filename:"route",bundlePath:"app/api/notificaciones/route"},resolvedPagePath:"/home/runner/work/MVP-SaludCompartida/MVP-SaludCompartida/src/app/api/notificaciones/route.ts",nextConfigOutput:"",userland:a}),{workAsyncStorage:l,workUnitAsyncStorage:d,serverHooks:u}=c;function x(){return(0,s.patchFetch)({workAsyncStorage:l,workUnitAsyncStorage:d})}},96487:()=>{},78335:()=>{}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),a=r.X(0,[638,452],()=>t(52541));module.exports=a})();