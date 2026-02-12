'use client';

import { useState } from "react";

/* ═══════════════════════════════════════════════════════════
   PANTALLA: CONTÁCTANOS
   WhatsApp dinámico: +1 (migrante) · +52 (México)
   Supabase: whatsapp_e164 → "+1XXXXXXXXXX" o "+52XXXXXXXXXX"
   Formulario → Confirmación con flujo backend 3 pasos
   ═══════════════════════════════════════════════════════════ */

/* ── WhatsApp E.164 config by userType ── */
const WA = {
  migrant: { prefix: '+1', digits: 10, label: 'EE.UU.', placeholder: '555 123 4567',
    fmt: d => { const c=d.replace(/\D/g,''); return c.length<=3?c:c.length<=6?`${c.slice(0,3)} ${c.slice(3)}`:`${c.slice(0,3)} ${c.slice(3,6)} ${c.slice(6,10)}`; } },
  mexico: { prefix: '+52', digits: 10, label: 'México', placeholder: '55 1234 5678',
    fmt: d => { const c=d.replace(/\D/g,''); return c.length<=2?c:c.length<=6?`${c.slice(0,2)} ${c.slice(2)}`:`${c.slice(0,2)} ${c.slice(2,6)} ${c.slice(6,10)}`; } },
};

const I = {
  Msg: ({s=22,c='#06B6D4'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>,
  Check: ({s=40,c='#10B981'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  Mail: ({s=18,c='#06B6D4'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  WA: ({s=18,c='#25D366'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  Send: ({s=18,c='#fff'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>,
  Users: ({s=18,c='#F59E0B'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Clock: ({s=18,c='#06B6D4'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Arrow: ({s=18,c='#fff'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>,
  ChevDown: ({s=14,c='rgba(255,255,255,0.4)'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
};

const CATEGORIAS = ['Telemedicina','Farmacia','Terapia','Mi cuenta','Problemas con mi código','Pagos y membresía','Sugerencia','Otro'];

const S = {
  page: { minHeight: '100vh', background: '#111827', color: '#fff', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", maxWidth: 430, margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  logo: { fontFamily: "'DM Serif Display', serif", fontSize: 20, background: 'linear-gradient(135deg, #06B6D4, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 },
  px: { padding: '0 20px' },
  st: { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(255,255,255,0.35)', marginBottom: 14, marginTop: 28 },
  back: { display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: '8px 0', marginBottom: 8 },
  label: { fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 },
  input: { width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff', fontSize: 14, padding: '12px 14px', outline: 'none', boxSizing: 'border-box', fontFamily: "'Plus Jakarta Sans', sans-serif" },
  select: { width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff', fontSize: 14, padding: '12px 14px', outline: 'none', boxSizing: 'border-box', fontFamily: "'Plus Jakarta Sans', sans-serif", appearance: 'none', WebkitAppearance: 'none' },
  textarea: { width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff', fontSize: 14, padding: '12px 14px', outline: 'none', boxSizing: 'border-box', fontFamily: "'Plus Jakarta Sans', sans-serif", resize: 'vertical', minHeight: 100 },
  btn: { width: '100%', padding: '16px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #06B6D4, #EC4899)', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
  tagline: { fontSize: 13, color: 'rgba(255,255,255,0.5)', textAlign: 'center', fontStyle: 'italic' },
  prefix: { display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)', borderRadius: 12, padding: '12px 12px', fontSize: 14, fontWeight: 700, color: '#25D366', flexShrink: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" },
};

// ── userType passed via props from auth/session ──
export default function Contactanos({ userType = 'mexico' }) {
  const cfg = WA[userType] || WA.mexico;

  const [view, setView] = useState('form');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [waDigits, setWaDigits] = useState('');
  const [email, setEmail] = useState('');
  const [categoria, setCategoria] = useState('');
  const [mensaje, setMensaje] = useState('');

  const waClean = waDigits.replace(/\D/g, '').slice(0, cfg.digits);
  const waFull = `${cfg.prefix}${waClean}`; // E.164 for Supabase
  const canSend = nombre.trim() && apellido.trim() && waClean.length === cfg.digits && categoria && mensaje.length >= 20;
  const handleWa = (v) => setWaDigits(v.replace(/\D/g, '').slice(0, cfg.digits));
  const reset = () => { setView('form'); setNombre(''); setApellido(''); setWaDigits(''); setEmail(''); setCategoria(''); setMensaje(''); };

  /* ═══════ CONFIRMACIÓN ═══════ */
  if (view === 'sent') return (
    <div style={S.page}>
      <div style={S.header}>{/* Logo: /saludcompartida-dark-no-tagline.png */}
        <img src="/saludcompartida-dark-no-tagline.png" alt="SaludCompartida" style={{ height: 40 }} /></div>
      <div style={S.px}>
        <div style={{ textAlign: 'center', paddingTop: 40, paddingBottom: 20 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><I.Check /></div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, marginBottom: 8 }}>Mensaje Enviado</h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: 310, margin: '0 auto 28px' }}>Gracias por contactarnos. Estamos para servirte.</p>
          <div style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 16, padding: 18, textAlign: 'left', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(6,182,212,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I.Mail /></div>
              <div><p style={{ fontSize: 13, fontWeight: 700 }}>Enviado a contact@saludcompartida.com</p><p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>vía Resend</p></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>De: <b>{nombre} {apellido}</b></span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>Motivo: <b>{categoria}</b></span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>WhatsApp: <b>{waFull}</b></span>
            </div>
          </div>
          {/* 3-step backend */}
          <div style={{ textAlign: 'left', marginBottom: 28 }}>
            <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: 'rgba(255,255,255,0.8)' }}>Qué sucede ahora:</p>
            {[
              { Ic: I.Mail, t: 'Correo de confirmación enviado', d: 'Recibirás un correo confirmando que recibimos tu mensaje con un número de ticket.', c: '#06B6D4', tag: 'ENVIADO AHORA', line: true },
              { Ic: I.Users, t: 'Nuestro equipo revisa tu mensaje', d: 'Un miembro de nuestro equipo lee tu mensaje y prepara una respuesta personalizada.', c: '#F59E0B', tag: 'EN LOS PRÓXIMOS MINUTOS', line: true },
              { Ic: I.WA, t: 'Respuesta por correo o WhatsApp', d: 'Te responderemos por correo electrónico o por WhatsApp, como te sea más cómodo.', c: '#25D366', tag: 'MÁXIMO 15 MINUTOS', line: false },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `${s.c}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><s.Ic /></div>
                  {s.line && <div style={{ width: 2, height: 24, background: 'rgba(255,255,255,0.08)', marginTop: 4 }} />}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: s.c, marginBottom: 4 }}>{s.t}</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{s.d}</p>
                  <span style={{ fontSize: 10, color: `${s.c}CC`, fontWeight: 700, marginTop: 6, display: 'inline-block', background: `${s.c}15`, padding: '3px 10px', borderRadius: 8 }}>{s.tag}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(236,72,153,0.06))', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 14, padding: 16, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
            <I.Clock /><div><p style={{ fontSize: 14, fontWeight: 700, color: '#06B6D4' }}>Máximo 15 minutos</p><p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>Nuestra promesa de tiempo de respuesta</p></div>
          </div>
          <button style={S.btn} onClick={reset}>Volver al Inicio</button>
        </div>
      </div>
      <div style={{ padding: '28px 20px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 24 }}><p style={S.tagline}>SaludCompartida, donde está tu corazón</p></div>
    </div>
  );

  /* ═══════ FORMULARIO ═══════ */
  return (
    <div style={S.page}>
      <div style={S.header}>
        {/* Logo: /saludcompartida-dark-no-tagline.png */}
        <img src="/saludcompartida-dark-no-tagline.png" alt="SaludCompartida" style={{ height: 40 }} />
        <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', marginRight: 6, boxShadow: '0 0 8px #10B981' }} /><span style={{ fontSize: 12, color: '#10B981', fontWeight: 600 }}>Activo</span></div>
      </div>
      <div style={S.px}>
        <button style={S.back}><I.Arrow /> Volver al inicio</button>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img src="/girl.jpeg" alt="Ayuda" style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 16px', border: '3px solid rgba(6,182,212,0.3)' }} />
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, marginBottom: 8, lineHeight: 1.3 }}>¿Necesitas <span style={{ color: '#06B6D4' }}>Ayuda</span>?</h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 320, margin: '0 auto' }}>Cuéntanos qué necesitas. Te responderemos en menos de 15 minutos.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.15)', borderRadius: 12, padding: 12, marginBottom: 24 }}>
          <I.Mail s={16} /><p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>Tu mensaje será enviado a <b style={{ color: '#06B6D4' }}>contact@saludcompartida.com</b></p>
        </div>

        <p style={S.st}>Tus datos</p>
        <div style={{ marginBottom: 14 }}><label style={S.label}>Nombre *</label><input style={S.input} value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" /></div>
        <div style={{ marginBottom: 14 }}><label style={S.label}>Apellido Paterno *</label><input style={S.input} value={apellido} onChange={e => setApellido(e.target.value)} placeholder="Apellido Paterno" /></div>

        {/* ── WhatsApp con prefijo dinámico ── */}
        <div style={{ marginBottom: 14 }}>
          <label style={S.label}><I.WA s={14} /> WhatsApp *</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={S.prefix}><I.WA s={14} /> {cfg.prefix}</div>
            <input style={{ ...S.input, flex: 1 }} type="tel" value={cfg.fmt(waDigits)} onChange={e => handleWa(e.target.value)} placeholder={cfg.placeholder} maxLength={14} />
          </div>
          <p style={{ fontSize: 11, color: waClean.length === cfg.digits ? 'rgba(16,185,129,0.6)' : 'rgba(255,255,255,0.25)', marginTop: 4 }}>
            {waClean.length === cfg.digits ? `✓ Se guardará como ${waFull}` : `${waClean.length}/${cfg.digits} dígitos · ${cfg.label}`}
          </p>
        </div>

        <div style={{ marginBottom: 14 }}><label style={S.label}><I.Mail s={14} /> Correo electrónico</label><input style={S.input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="correo@ejemplo.com" /></div>

        <p style={{ ...S.st, marginTop: 24 }}>Tu mensaje</p>
        <div style={{ marginBottom: 14 }}>
          <label style={S.label}>¿En qué podemos ayudarte? *</label>
          <div style={{ position: 'relative' }}>
            <select style={S.select} value={categoria} onChange={e => setCategoria(e.target.value)}>
              <option value="">Selecciona una categoría</option>
              {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><I.ChevDown /></div>
          </div>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label style={S.label}>Tu mensaje *</label>
          <textarea style={S.textarea} value={mensaje} onChange={e => setMensaje(e.target.value)} placeholder="Descríbenos brevemente qué necesitas..." />
          <p style={{ fontSize: 11, color: mensaje.length >= 20 ? 'rgba(16,185,129,0.6)' : 'rgba(255,255,255,0.3)', marginTop: 4, textAlign: 'right' }}>{mensaje.length}/20 mínimo</p>
        </div>
        <button style={{ ...S.btn, opacity: canSend ? 1 : 0.35, marginTop: 8 }} onClick={() => { if (canSend) setView('sent'); }}><I.Send /> Enviar Mensaje</button>

        <p style={{ ...S.st, marginTop: 32 }}>También puedes contactarnos por</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: 'rgba(37,211,102,0.08)', borderRadius: 14, border: '1px solid rgba(37,211,102,0.2)', marginBottom: 10, cursor: 'pointer' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(37,211,102,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><I.WA s={22} /></div>
          <div><p style={{ fontSize: 13, fontWeight: 700, color: '#25D366' }}>WhatsApp</p><p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Escríbenos y te respondemos al instante</p></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: 'rgba(6,182,212,0.06)', borderRadius: 14, border: '1px solid rgba(6,182,212,0.15)', marginBottom: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(6,182,212,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><I.Mail s={20} /></div>
          <div><p style={{ fontSize: 13, fontWeight: 700, color: '#06B6D4' }}>Correo electrónico</p><p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>contact@saludcompartida.com</p></div>
        </div>
      </div>
      <div style={{ padding: '28px 20px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 24 }}><p style={S.tagline}>SaludCompartida, donde está tu corazón</p></div>
    </div>
  );
}
