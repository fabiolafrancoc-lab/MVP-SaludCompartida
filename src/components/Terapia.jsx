'use client';

import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   PANTALLA: TERAPIA — Flujo completo
   WhatsApp dinámico: +1 (migrante) · +52 (México)
   Supabase: whatsapp_e164 → "+52XXXXXXXXXX"
   main → booking → confirmed
   ═══════════════════════════════════════════════════════════ */

const WAC = {
  migrant: { prefix: '+1', digits: 10, label: 'EE.UU.', placeholder: '555 123 4567',
    fmt: d => { const c=d.replace(/\D/g,''); return c.length<=3?c:c.length<=6?`${c.slice(0,3)} ${c.slice(3)}`:`${c.slice(0,3)} ${c.slice(3,6)} ${c.slice(6,10)}`; } },
  mexico: { prefix: '+52', digits: 10, label: 'México', placeholder: '55 1234 5678',
    fmt: d => { const c=d.replace(/\D/g,''); return c.length<=2?c:c.length<=6?`${c.slice(0,2)} ${c.slice(2)}`:`${c.slice(0,2)} ${c.slice(2,6)} ${c.slice(6,10)}`; } },
};

const I = {
  Brain: ({s=22,c='#fff'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 1 4 4 7 7 0 0 1 3 6c0 4-3 7-7 7s-7-3-7-7a7 7 0 0 1 3-6 4 4 0 0 1 4-4z"/><path d="M12 2v20"/><path d="M8 6c-2 1-3 3.5-3 6"/><path d="M16 6c2 1 3 3.5 3 6"/></svg>,
  Heart: ({s=20,c='#EC4899'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke={c} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Check: ({s=40,c='#10B981'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  Mail: ({s=18,c='#06B6D4'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  WA: ({s=18,c='#25D366'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  Arrow: ({s=18,c='#fff'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>,
  Lock: ({s=16,c='rgba(255,255,255,0.4)'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Video: ({s=20,c='#F59E0B'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2"/></svg>,
  UsersI: ({s=20,c='currentColor'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Star: ({s=20,c='#F59E0B'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke={c} strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Activity: ({s=20,c='#EC4899'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
};

const DAYS=['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],MESES=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const SLOTS_WK=['09:00','11:00','13:00','16:00','18:00'],SLOTS_SAT=['09:00','10:30','11:30','12:30'];
const getDates=()=>{const r=[],d=new Date();d.setDate(d.getDate()+15);while(r.length<10){if(d.getDay()!==0)r.push(new Date(d));d.setDate(d.getDate()+1);}return r;};
const TESTS=[{t:"Hablar con alguien no te hace débil, te da fuerzas para lo que otros no ven.",a:"Rosa, 41"},{t:"Pedir ayuda no te quita lo fuerte, te quita lo triste.",a:"Concepción, 39"},{t:"Empecé por mí, pero terminó beneficiando a toda mi familia.",a:"Antonio, 43"},{t:"Desde que voy a terapia, hasta duermo mejor.",a:"Marcos, 34"}];

const S = {
  page:{minHeight:'100vh',background:'#111827',color:'#fff',fontFamily:"'Plus Jakarta Sans', system-ui, sans-serif",maxWidth:430,margin:'0 auto'},
  header:{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 20px',borderBottom:'1px solid rgba(255,255,255,0.06)'},
  logo:{fontFamily:"'DM Serif Display', serif",fontSize:20,background:'linear-gradient(135deg, #06B6D4, #EC4899)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',fontWeight:700},
  px:{padding:'0 20px'},st:{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:2,color:'rgba(255,255,255,0.35)',marginBottom:14,marginTop:28},
  card:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'18px 16px',marginBottom:12},
  back:{display:'flex',alignItems:'center',gap:6,background:'none',border:'none',color:'rgba(255,255,255,0.5)',fontSize:13,fontWeight:600,cursor:'pointer',padding:'8px 0',marginBottom:8},
  label:{fontSize:12,fontWeight:600,color:'rgba(255,255,255,0.5)',marginBottom:6,display:'flex',alignItems:'center',gap:6},
  input:{width:'100%',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:12,color:'#fff',fontSize:14,padding:'12px 14px',outline:'none',boxSizing:'border-box',fontFamily:"'Plus Jakarta Sans', sans-serif"},
  btn:{width:'100%',padding:'16px',borderRadius:12,border:'none',background:'linear-gradient(135deg, #06B6D4, #EC4899)',color:'#fff',fontSize:16,fontWeight:700,cursor:'pointer',fontFamily:"'Plus Jakarta Sans', sans-serif"},
  tagline:{fontSize:13,color:'rgba(255,255,255,0.5)',textAlign:'center',fontStyle:'italic'},
  prefix:{display:'flex',alignItems:'center',gap:6,background:'rgba(37,211,102,0.1)',border:'1px solid rgba(37,211,102,0.25)',borderRadius:12,padding:'12px 12px',fontSize:14,fontWeight:700,color:'#25D366',flexShrink:0,fontFamily:"'Plus Jakarta Sans', sans-serif"},
};

export default function Terapia({ userType = 'mexico', onBack, registration }) {
  const migrantName = registration?.migrant_first_name || 'el migrante';
  const cfg = WAC[userType] || WAC.mexico;
  const [view,setView]=useState('main');
  const [nombre,setNombre]=useState('');const [apellido,setApellido]=useState('');
  const [email,setEmail]=useState('');const [waDigits,setWaDigits]=useState('');
  const [selDate,setSelDate]=useState(null);const [selTime,setSelTime]=useState('');
  const [ti,setTi]=useState(0);
  const dates=getDates();
  useEffect(()=>{const t=setInterval(()=>setTi(i=>(i+1)%TESTS.length),6000);return()=>clearInterval(t);},[]);

  const waClean=waDigits.replace(/\D/g,'').slice(0,cfg.digits);
  const waFull=`${cfg.prefix}${waClean}`;
  const fullName=`${nombre} ${apellido}`.trim();
  const canConfirm=nombre.trim()&&apellido.trim()&&email.trim()&&waClean.length===cfg.digits&&selDate&&selTime;
  const fmtD=d=>`${DAYS[d.getDay()]} ${d.getDate()} ${MESES[d.getMonth()]}`;
  const fmtL=d=>`${d.getDate()} de ${MESES[d.getMonth()]} ${d.getFullYear()}`;
  const handleWa=v=>setWaDigits(v.replace(/\D/g,'').slice(0,cfg.digits));
  const reset=()=>{setView('main');setNombre('');setApellido('');setEmail('');setWaDigits('');setSelDate(null);setSelTime('');};

  /* ═══════ CONFIRMED ═══════ */
  if(view==='confirmed')return(
    <div style={S.page}><div style={S.px}>
      <div style={{textAlign:'center',paddingTop:40,paddingBottom:20}}>
        <div style={{width:80,height:80,borderRadius:'50%',background:'rgba(16,185,129,0.15)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px'}}><I.Check /></div>
        <h2 style={{fontFamily:"'DM Serif Display', serif",fontSize:26,marginBottom:12,lineHeight:1.3}}>Tu sesión ha sido confirmada</h2>
        <p style={{fontSize:14,color:'rgba(255,255,255,0.6)',lineHeight:1.7,maxWidth:320,margin:'0 auto 28px'}}>Te enviaremos un <b style={{color:'#06B6D4'}}>mail de confirmación</b> y un <b style={{color:'#25D366'}}>WhatsApp con 24 horas de anticipación</b> de recordatorio.</p>
        <div style={{background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:16,padding:20,textAlign:'left',marginBottom:28}}>
          {[['Paciente',fullName,'#F59E0B'],['Fecha',selDate&&fmtL(selDate),'#fff'],['Hora',selTime+' hrs','#fff'],['Modalidad','Videollamada','#fff'],['WhatsApp',waFull,'#25D366']].map(([l,v,c],i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:i<4?'1px solid rgba(255,255,255,0.06)':'none'}}><span style={{fontSize:13,color:'rgba(255,255,255,0.5)'}}>{l}</span><span style={{fontSize:13,fontWeight:700,color:c}}>{v}</span></div>
          ))}
        </div>
        <div style={{textAlign:'left',marginBottom:28}}>
          <div style={{display:'flex',gap:12,marginBottom:20}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',flexShrink:0}}><div style={{width:40,height:40,borderRadius:12,background:'rgba(6,182,212,0.15)',display:'flex',alignItems:'center',justifyContent:'center'}}><I.Mail /></div><div style={{width:2,height:24,background:'rgba(255,255,255,0.08)',marginTop:4}} /></div>
            <div><p style={{fontSize:14,fontWeight:700,color:'#06B6D4',marginBottom:4}}>Mail de confirmación</p><p style={{fontSize:13,color:'rgba(255,255,255,0.55)',lineHeight:1.6}}>Enviamos los detalles a <b style={{color:'#fff'}}>{email}</b></p><span style={{fontSize:10,color:'rgba(6,182,212,0.8)',fontWeight:700,marginTop:6,display:'inline-block',background:'rgba(6,182,212,0.1)',padding:'3px 10px',borderRadius:8}}>ENVIADO AHORA</span></div>
          </div>
          <div style={{display:'flex',gap:12}}>
            <div style={{flexShrink:0}}><div style={{width:40,height:40,borderRadius:12,background:'rgba(37,211,102,0.15)',display:'flex',alignItems:'center',justifyContent:'center'}}><I.WA /></div></div>
            <div><p style={{fontSize:14,fontWeight:700,color:'#25D366',marginBottom:4}}>Recordatorio por WhatsApp</p><p style={{fontSize:13,color:'rgba(255,255,255,0.55)',lineHeight:1.6}}>24 horas antes al <b style={{color:'#fff'}}>{waFull}</b> con el link de videollamada.</p><span style={{fontSize:10,color:'rgba(37,211,102,0.8)',fontWeight:700,marginTop:6,display:'inline-block',background:'rgba(37,211,102,0.1)',padding:'3px 10px',borderRadius:8}}>24 HORAS ANTES</span></div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10,background:'rgba(255,255,255,0.04)',borderRadius:12,padding:14,marginBottom:24,border:'1px solid rgba(255,255,255,0.06)'}}><I.Lock /><p style={{fontSize:12,color:'rgba(255,255,255,0.4)',lineHeight:1.5}}>Tu sesión es 100% confidencial.</p></div>
        <button style={S.btn} onClick={reset}>Volver a Terapia</button>
      </div>
    </div><div style={{padding:'28px 20px 20px',borderTop:'1px solid rgba(255,255,255,0.06)',marginTop:24}}><p style={S.tagline}>SaludCompartida, donde está tu corazón</p></div></div>
  );

  /* ═══════ BOOKING ═══════ */
  if(view==='booking'){const slots=selDate&&selDate.getDay()===6?SLOTS_SAT:SLOTS_WK;return(
    <div style={S.page}><div style={S.px}>
      <button style={{...S.back, fontSize: 15, fontWeight: 700, color: '#FFFFFF'}} onClick={()=>setView('main')}><I.Arrow c="#FFFFFF" /> VOLVER</button>
      <h2 style={{fontFamily:"'DM Serif Display', serif",fontSize:24,marginBottom:6}}>Agendar <span style={{color:'#F59E0B'}}>Sesión</span></h2>
      <p style={{fontSize:13,color:'rgba(255,255,255,0.5)',marginBottom:28,lineHeight:1.5}}>Completa los datos y elige el día y hora que mejor te funcione.</p>
      <p style={S.st}>¿Quién va a la sesión?</p>
      <div style={{marginBottom:14}}><label style={S.label}>Nombre</label><input style={S.input} value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Nombre" /></div>
      <div style={{marginBottom:24}}><label style={S.label}>Apellido Paterno</label><input style={S.input} value={apellido} onChange={e=>setApellido(e.target.value)} placeholder="Apellido Paterno" /></div>
      <p style={S.st}>Datos de contacto</p>
      <div style={{marginBottom:14}}><label style={S.label}>Correo electrónico</label><input style={S.input} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="correo@ejemplo.com" /></div>
      <div style={{marginBottom:24}}>
        <label style={S.label}><I.WA s={14} /> WhatsApp</label>
        <div style={{display:'flex',gap:8}}>
          <div style={S.prefix}><I.WA s={14} /> {cfg.prefix}</div>
          <input style={{...S.input,flex:1}} type="tel" value={cfg.fmt(waDigits)} onChange={e=>handleWa(e.target.value)} placeholder={cfg.placeholder} maxLength={14} />
        </div>
        <p style={{fontSize:11,color:waClean.length===cfg.digits?'rgba(16,185,129,0.6)':'rgba(255,255,255,0.25)',marginTop:4}}>
          {waClean.length===cfg.digits?`✓ Se guardará como ${waFull}`:`${waClean.length}/${cfg.digits} dígitos · ${cfg.label}`}
        </p>
      </div>
      <p style={S.st}>Elige un día</p>
      <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:8,marginBottom:20}}>
        {dates.map((d,i)=>{const sel=selDate&&d.toDateString()===selDate.toDateString();return(
          <div key={i} onClick={()=>{setSelDate(d);setSelTime('');}} style={{minWidth:64,padding:'12px 8px',borderRadius:14,cursor:'pointer',background:sel?'rgba(245,158,11,0.15)':'rgba(255,255,255,0.04)',border:`1.5px solid ${sel?'rgba(245,158,11,0.5)':'rgba(255,255,255,0.08)'}`,textAlign:'center',flexShrink:0}}>
            <p style={{fontSize:11,color:sel?'#F59E0B':'rgba(255,255,255,0.4)',fontWeight:600,marginBottom:4}}>{DAYS[d.getDay()]}</p>
            <p style={{fontSize:20,fontWeight:800,color:sel?'#F59E0B':'#fff',marginBottom:2}}>{d.getDate()}</p>
            <p style={{fontSize:10,color:sel?'#F59E0B':'rgba(255,255,255,0.35)'}}>{MESES[d.getMonth()]}</p>
          </div>);})}
      </div>
      {selDate&&<div style={{marginBottom:28}}><p style={S.st}>Elige una hora — {fmtD(selDate)}</p><div style={{display:'flex',flexWrap:'wrap',gap:8}}>
        {slots.map(t=><div key={t} onClick={()=>setSelTime(t)} style={{padding:'12px 20px',borderRadius:12,cursor:'pointer',background:selTime===t?'rgba(245,158,11,0.15)':'rgba(255,255,255,0.04)',border:`1.5px solid ${selTime===t?'rgba(245,158,11,0.5)':'rgba(255,255,255,0.08)'}`,fontSize:14,fontWeight:selTime===t?700:500,color:selTime===t?'#F59E0B':'rgba(255,255,255,0.6)'}}>{t} hrs</div>)}
      </div></div>}
      {canConfirm&&<div style={{background:'rgba(245,158,11,0.06)',border:'1px solid rgba(245,158,11,0.15)',borderRadius:14,padding:16,marginBottom:16}}><p style={{fontSize:12,fontWeight:700,color:'#F59E0B',marginBottom:8}}>Resumen:</p><p style={{fontSize:13,color:'rgba(255,255,255,0.65)',lineHeight:1.8}}><b>{fullName}</b> · {fmtL(selDate)} · <b>{selTime} hrs</b> · Videollamada</p></div>}
      <button style={{...S.btn,opacity:canConfirm?1:0.35,marginBottom:12}} onClick={()=>{if(canConfirm)setView('confirmed');}}>Confirmar Sesión</button>
      <div style={{display:'flex',alignItems:'center',gap:8,justifyContent:'center',marginBottom:32}}><I.Lock /><span style={{fontSize:11,color:'rgba(255,255,255,0.3)'}}>Tus datos y sesiones son 100% confidenciales</span></div>
    </div><div style={{padding:'28px 20px 20px',borderTop:'1px solid rgba(255,255,255,0.06)'}}><p style={S.tagline}>SaludCompartida, donde está tu corazón</p></div></div>
  );}

  /* ═══════ MAIN ═══════ */
  return(
    <div style={S.page}>
    <div style={S.px}>
      <button style={{...S.back, fontSize: 15, fontWeight: 700, color: '#FFFFFF'}} onClick={onBack}><I.Arrow c="#FFFFFF" /> VOLVER</button>
      <div style={{textAlign:'center',marginBottom:24}}>
        <div style={{width:72,height:72,borderRadius:22,background:'rgba(245,158,11,0.15)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}><I.Brain s={36} c="#F59E0B" /></div>
        <h2 style={{fontFamily:"'DM Serif Display', serif",fontSize:26,marginBottom:8,lineHeight:1.3}}>Tu Bienestar<br />Emocional <span style={{color:'#F59E0B'}}>Importa</span></h2>
        <p style={{fontSize:15,color:'rgba(255,255,255,0.65)',lineHeight:1.7,maxWidth:320,margin:'0 auto'}}>Hablar con alguien que te escucha puede cambiar tu semana. Una sesión a la vez, a tu ritmo.</p>
      </div>
      <div style={{background:'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(236,72,153,0.06))',border:'1px solid rgba(245,158,11,0.2)',borderRadius:16,padding:18,textAlign:'center',marginBottom:20}}>
        <I.Heart /><p style={{fontSize:14,color:'rgba(255,255,255,0.7)',marginTop:8,lineHeight:1.6}}><span style={{color:'#06B6D4',fontWeight:700}}>{migrantName}</span> quiere verte bien, por dentro y por fuera. Esta sesión es parte de lo que eligió para ti. <b style={{color:'#F59E0B'}}>Úsala — te lo mereces.</b></p>
      </div>
      <div style={{...S.card,cursor:'default'}}><p style={{fontSize:13,fontWeight:700,color:'#F59E0B',marginBottom:8}}>Cuidarte por dentro es tan importante como cuidarte por fuera.</p><p style={{fontSize:13,color:'rgba(255,255,255,0.55)',lineHeight:1.7}}>Millones de personas ya hablan con un profesional cada semana. Aquí no hay juicios, solo alguien que te escucha con atención y respeto.</p></div>
      <div style={{background:'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(16,185,129,0.08))',border:'1px solid rgba(245,158,11,0.25)',borderRadius:16,padding:18,textAlign:'center',marginBottom:24}}>
        <p style={{fontSize:22,fontWeight:800,color:'#F59E0B',letterSpacing:1}}>1 SESIÓN POR SEMANA</p>
        <p style={{fontSize:13,color:'rgba(255,255,255,0.6)',marginTop:4}}>50 minutos · 4 sesiones al mes · 1 por cada miembro</p>
      </div>
      <p style={S.st}>Lo que incluye</p>
      {[{Ic:I.Video,t:'Sesiones de 50 min por videollamada',d:'Desde tu celular o computadora, donde estés.'},{Ic:()=><I.UsersI s={20} c="#F59E0B"/>,t:'Para ti o cualquier miembro de tu familia',d:'Cada miembro tiene derecho a su sesión semanal.'},{Ic:I.Star,t:'Puedes cambiar de terapeuta',d:'Si no te sientes cómodo, cambia. Sin explicaciones.'},{Ic:()=><I.Lock s={20} c="#F59E0B"/>,t:'100% confidencial',d:'Lo que compartes queda entre tú y tu terapeuta.'}].map((x,i)=><div key={i} style={{...S.card,cursor:'default'}}><div style={{display:'flex',alignItems:'flex-start',gap:14}}><div style={{width:42,height:42,borderRadius:12,background:'rgba(245,158,11,0.12)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><x.Ic /></div><div><p style={{fontSize:15,fontWeight:700,marginBottom:4}}>{x.t}</p><p style={{fontSize:13,color:'rgba(255,255,255,0.55)',lineHeight:1.6}}>{x.d}</p></div></div></div>)}
      <div style={{background:'rgba(245,158,11,0.06)',border:'1px solid rgba(245,158,11,0.15)',borderRadius:16,padding:20,marginBottom:24,minHeight:80}}>
        <p style={{fontSize:14,color:'rgba(255,255,255,0.75)',lineHeight:1.7,fontStyle:'italic',marginBottom:8}}>"{TESTS[ti].t}"</p>
        <p style={{fontSize:12,color:'#F59E0B',fontWeight:600}}>— {TESTS[ti].a}</p>
      </div>
      <button style={S.btn} onClick={()=>setView('booking')}>Agendar Mi Sesión</button>
      <p style={{...S.st,marginTop:32}}>Consejos para tu bienestar</p>
      <div style={{display:'flex',gap:8,marginBottom:24}}>
        {[{l:'Ansiedad',c:'#06B6D4',Ic:()=><I.Check s={22} c="#06B6D4"/>},{l:'Relaciones',c:'#8B5CF6',Ic:()=><I.UsersI s={22} c="#8B5CF6"/>},{l:'Estrés',c:'#EC4899',Ic:I.Activity}].map((t,i)=>(
          <div key={i} style={{flex:1,background:`${t.c}08`,border:`1px solid ${t.c}20`,borderRadius:16,padding:14,cursor:'pointer',textAlign:'center'}}>
            <div style={{width:40,height:40,borderRadius:12,background:`${t.c}15`,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 8px'}}><t.Ic /></div>
            <p style={{fontSize:12,fontWeight:700,color:t.c}}>{t.l}</p><p style={{fontSize:10,color:'rgba(255,255,255,0.35)',marginTop:2}}>5 tips</p>
          </div>))}
      </div>
    </div><div style={{padding:'28px 20px 20px',borderTop:'1px solid rgba(255,255,255,0.06)',marginTop:12}}><p style={S.tagline}>SaludCompartida, donde está tu corazón</p></div></div>
  );
}
