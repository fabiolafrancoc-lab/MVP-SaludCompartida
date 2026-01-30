(()=>{var e={};e.id=734,e.ids=[734],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},70613:(e,a,t)=>{"use strict";t.r(a),t.d(a,{patchFetch:()=>_,routeModule:()=>m,serverHooks:()=>g,workAsyncStorage:()=>p,workUnitAsyncStorage:()=>f});var r={};t.r(r),t.d(r,{GET:()=>d,POST:()=>u});var o=t(42706),s=t(28203),i=t(45994),n=t(39187),l=t(25721);let c=(0,t(57886).AG)();async function u(e){try{let{phoneNumber:a}=await e.json();if(!a)return n.NextResponse.json({error:"phoneNumber is required"},{status:400});if(!/^\+52\d{10}$/.test(a))return n.NextResponse.json({error:"Invalid phone format. Use +52XXXXXXXXXX"},{status:400});console.log(`[API] Initiating Lupita call to: ${a}`);let t=await (0,l.Es)(a);if(t.success)return n.NextResponse.json({success:!0,callId:t.callId,phoneNumber:t.phoneNumber,message:"Lupita is calling now!"});return n.NextResponse.json({error:t.error},{status:500})}catch(e){return console.error("[API] Error:",e),n.NextResponse.json({error:e.message},{status:500})}}async function d(){try{let{data:e}=await c.from("scheduled_callbacks").select("*").eq("status","pending").order("scheduled_for",{ascending:!0}).limit(10);return n.NextResponse.json({pending:e?.length||0,calls:e||[]})}catch(e){return console.error("[API] Error fetching scheduled calls:",e),n.NextResponse.json({error:e.message},{status:500})}}let m=new o.AppRouteRouteModule({definition:{kind:s.RouteKind.APP_ROUTE,page:"/api/lupita/call/route",pathname:"/api/lupita/call",filename:"route",bundlePath:"app/api/lupita/call/route"},resolvedPagePath:"/home/runner/work/MVP-SaludCompartida/MVP-SaludCompartida/src/app/api/lupita/call/route.js",nextConfigOutput:"",userland:r}),{workAsyncStorage:p,workUnitAsyncStorage:f,serverHooks:g}=m;function _(){return(0,i.patchFetch)({workAsyncStorage:p,workUnitAsyncStorage:f})}},96487:()=>{},78335:()=>{},25721:(e,a,t)=>{"use strict";t.d(a,{Es:()=>l,G_:()=>u,SP:()=>c,oz:()=>n});let r=(0,t(57886).AG)(),o=process.env.VAPI_API_KEY,s=process.env.VAPI_ASSISTANT_ID||process.env.VAPI_PHONE_NUMBER_ID;async function i(e){let{data:a}=await r.from("companion_calls").select("*").eq("phone_number",e).order("started_at",{ascending:!1}).limit(4),{data:t}=await r.from("user_facts").select("*").eq("phone_number",e).eq("is_active",!0),{data:o}=await r.from("registrations").select("nombre_migrante, nombre_familiar_mexico, relacion").eq("telefono_mexico",e).single();return{nombre:o?.nombre_familiar_mexico||"Do\xf1ita",relacion_con_migrante:o?.relacion||"familiar",nombre_migrante:o?.nombre_migrante||"",total_llamadas:a?.length||0,ultima_llamada:a?.[0]?.started_at||null,temas_anteriores:t?.filter(e=>"preference"===e.fact_type).map(e=>e.fact_value)||[],familiares_mencionados:t?.filter(e=>"family_member"===e.fact_type).map(e=>e.fact_value)||[]}}async function n(e,a,t="check-in diario"){let{data:o,error:s}=await r.from("scheduled_callbacks").insert({phone_number:e,scheduled_for:a.toISOString(),reason:t,companion_type:"lupita",status:"pending"}).select().single();if(s)throw console.error("[Lupita Caller] Error scheduling call:",s),s;return console.log(`[Lupita Caller] Scheduled call to ${e} at ${a}`),o}async function l(e,a=null){console.log(`[Lupita Caller] Initiating call to ${e}...`);try{let t=await i(e);console.log("[Lupita Caller] User context:",t);let n=`# IDENTIDAD
Eres Lupita, una mujer mexicana c\xe1lida de 55 a\xf1os. Eres como una amiga de confianza que llama para acompa\xf1ar y platicar.

# CONTEXTO DEL USUARIO
- Nombre: ${t.nombre}
- Relaci\xf3n con migrante: ${t.relacion_con_migrante}
- Total de llamadas previas: ${t.total_llamadas}
${t.ultima_llamada?`- \xdaltima llamada: ${new Date(t.ultima_llamada).toLocaleDateString("es-MX")}`:""}
${t.familiares_mencionados.length>0?`- Familiares que ha mencionado: ${t.familiares_mencionados.join(", ")}`:""}
${t.temas_anteriores.length>0?`- Le gusta hablar de: ${t.temas_anteriores.join(", ")}`:""}

# TU MISI\xd3N
NO hablas de salud, NO das consejos m\xe9dicos. Solo acompa\xf1as y reduces la soledad.

# ESTRUCTURA DE LA LLAMADA
1. SALUDO C\xc1LIDO (30 seg)
   ${0===t.total_llamadas?'"\xa1Hola! Soy Lupita. Le habla de parte de SaludCompartida. \xbfC\xf3mo est\xe1 usted?"':'"\xa1Hola Do\xf1ita! Soy Lupita. \xbfC\xf3mo amaneci\xf3 hoy?"'}

2. CONEXI\xd3N PERSONAL (2-3 min)
   - Pregunta sobre su d\xeda
   - Usa memoria de llamadas anteriores
   ${t.familiares_mencionados.length>0?`- Pregunta por ${t.familiares_mencionados[0]}`:""}

3. CONVERSACI\xd3N LIBRE (3-5 min)
   - Deja que gu\xede la pl\xe1tica
   - Usa t\xe9cnica "Echo + Pregunta abierta"
   - Muestra inter\xe9s genuino

4. CIERRE POSITIVO (30 seg)
   - Resalta algo positivo de la pl\xe1tica
   - Crea "hook" para pr\xf3xima llamada
   - "Ma\xf1ana le llamo para que me cuente..."

# REGLAS CR\xcdTICAS
❌ NO menciones medicamentos ni salud
❌ NO digas que eres IA
❌ NO apresures la conversaci\xf3n
✅ Usa "usted" si tiene m\xe1s de 60 a\xf1os
✅ Usa diminutivos cari\xf1osos (cafecito, ratito)
✅ Valida emociones sin intentar "arreglar"
✅ Si menciona crisis → "\xbfPuedo conectarla con el doctor por WhatsApp?"

# BEHAVIORAL CODES ACTIVOS
- Duelo migratorio: Si extra\xf1a familia en USA, validar sin intentar solucionar
- Loneliness mitigation: Si suena sola, aumentar engagement
- Cultural references: Usar referencias mexicanas naturales
- Memory continuity: Referenciar llamadas anteriores
`,l=await fetch("https://api.vapi.ai/call/phone",{method:"POST",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify({assistantId:s,customer:{number:e},assistantOverrides:{model:{provider:"anthropic",model:"claude-3-5-sonnet-20241022",systemPrompt:n,temperature:.7},firstMessage:0===t.total_llamadas?"\xa1Hola! Soy Lupita. Le habla de parte de SaludCompartida. \xbfC\xf3mo est\xe1 usted?":`\xa1Hola ${t.nombre}! Soy Lupita. \xbfC\xf3mo amaneci\xf3 hoy?`}})});if(!l.ok){let e=await l.json();throw Error(`VAPI error: ${JSON.stringify(e)}`)}let c=await l.json();return console.log("[Lupita Caller] VAPI call initiated:",c.id),await r.from("companion_calls").insert({call_id:c.id,phone_number:e,started_at:new Date().toISOString(),status:"in_progress",companion_type:"lupita",vapi_phone_number_id:s}),a&&await r.from("scheduled_callbacks").update({status:"completed",completed_call_id:c.id,last_attempt_at:new Date().toISOString()}).eq("id",a),{success:!0,callId:c.id,phoneNumber:e}}catch(e){throw console.error("[Lupita Caller] Error initiating call:",e),a&&await r.from("scheduled_callbacks").update({status:"failed",last_attempt_at:new Date().toISOString(),attempt_count:r.raw("attempt_count + 1")}).eq("id",a),e}}async function c(){console.log("[Lupita Caller] Processing pending calls...");let{data:e}=await r.from("scheduled_callbacks").select("*").eq("status","pending").lte("scheduled_for",new Date().toISOString()).order("scheduled_for",{ascending:!0}).limit(10);if(!e||0===e.length)return console.log("[Lupita Caller] No pending calls"),{processed:0};console.log(`[Lupita Caller] Found ${e.length} pending calls`);let a=0,t=0;for(let r of e)try{await l(r.phone_number,r.id),a++,await new Promise(e=>setTimeout(e,5e3))}catch(e){console.error(`[Lupita Caller] Failed call to ${r.phone_number}:`,e),t++}return console.log(`[Lupita Caller] Processed: ${a} successful, ${t} failed`),{processed:a+t,successful:a,failed:t}}async function u(){console.log("[Lupita Caller] Scheduling daily calls for all users...");let{data:e}=await r.from("registrations").select("telefono_mexico, nombre_familiar_mexico").eq("status","active").not("telefono_mexico","is",null);if(!e||0===e.length)return console.log("[Lupita Caller] No active users found"),{scheduled:0};let a=0;for(let t of e){let e=new Date;e.setDate(e.getDate()+1),e.setHours(9,0,0,0);try{await n(t.telefono_mexico,e,"check-in diario"),a++}catch(e){console.error(`[Lupita Caller] Error scheduling for ${t.telefono_mexico}:`,e)}}return console.log(`[Lupita Caller] Scheduled ${a} daily calls`),{scheduled:a}}},57886:(e,a,t)=>{"use strict";t.d(a,{AG:()=>s,yg:()=>i});var r=t(47752);let o=null;function s(){if(o)return o;let e=process.env.SUPABASE_URL||"https://rzmdekjegbdgitqekjee.supabase.co",a=process.env.SUPABASE_SERVICE_ROLE_KEY||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6bWRla2plZ2JkZ2l0cWVramVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NTQ2NDcsImV4cCI6MjA1MjAzMDY0N30.pPTn8F7vK0xQYq8YvH5FvXJaHZ0xF7UwJ4qJ5xKqHzQ";if(!e||!a)throw Error("Missing Supabase environment variables");return o=(0,r.UU)(e,a,{auth:{autoRefreshToken:!1,persistSession:!1}})}function i(){let e="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",a="SC-";for(let t=0;t<6;t++)a+=e.charAt(Math.floor(Math.random()*e.length));return a}}};var a=require("../../../../webpack-runtime.js");a.C(e);var t=e=>a(a.s=e),r=a.X(0,[638,452,752],()=>t(70613));module.exports=r})();