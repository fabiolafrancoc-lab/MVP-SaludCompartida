'use client';

import { useState } from "react";

/* ═══════════════════════════════════════════════════════════
   PANTALLA: MI CUENTA
   WhatsApp dinámico: +1 (migrante) · +52 (México)
   Supabase: whatsapp_e164 → "+1XXXXXXXXXX" o "+52XXXXXXXXXX"
   1 Titular + 3 miembros · Acordeones · Guardar al final
   ═══════════════════════════════════════════════════════════ */

const WA = {
  migrant: { prefix: '+1', digits: 10, label: 'EE.UU.', placeholder: '555 123 4567',
    fmt: d => { const c=d.replace(/\D/g,''); return c.length<=3?c:c.length<=6?`${c.slice(0,3)} ${c.slice(3)}`:`${c.slice(0,3)} ${c.slice(3,6)} ${c.slice(6,10)}`; } },
  mexico: { prefix: '+52', digits: 10, label: 'México', placeholder: '55 1234 5678',
    fmt: d => { const c=d.replace(/\D/g,''); return c.length<=2?c:c.length<=6?`${c.slice(0,2)} ${c.slice(2)}`:`${c.slice(0,2)} ${c.slice(2,6)} ${c.slice(6,10)}`; } },
};

const I = {
  Users: ({s=22,c='#fff'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Check: ({s=20,c='#10B981'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  Shield: ({s=20,c='#06B6D4'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>,
  Heart: ({s=18,c='#EC4899'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke={c} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  ChevDown: ({s=18,c='#fff'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  ChevUp: ({s=18,c='#fff'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>,
  Arrow: ({s=18,c='#fff'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>,
  Save: ({s=18,c='#fff'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></svg>,
  WA: ({s=16,c='#25D366'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  Mail: ({s=16,c='#06B6D4'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Calendar: ({s=16,c='#F59E0B'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
};

const COLORS = ['#06B6D4', '#8B5CF6', '#EC4899', '#F59E0B'];
const LABELS = ['Titular', 'Miembro 2', 'Miembro 3', 'Miembro 4'];

const INITIAL = [
  { nombre: 'María', apellido: 'González', email: 'maria.gonzalez@gmail.com', waDigits: '5589123456', nacimiento: '1973-06-15' },
  { nombre: '', apellido: '', email: '', waDigits: '', nacimiento: '' },
  { nombre: '', apellido: '', email: '', waDigits: '', nacimiento: '' },
  { nombre: '', apellido: '', email: '', waDigits: '', nacimiento: '' },
];

const S = {
  page: { minHeight: '100vh', background: '#111827', color: '#fff', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", maxWidth: 430, margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  logo: { fontFamily: "'DM Serif Display', serif", fontSize: 20, background: 'linear-gradient(135deg, #06B6D4, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 },
  px: { padding: '0 20px' },
  st: { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(255,255,255,0.35)', marginBottom: 14, marginTop: 28 },
  back: { display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: '8px 0', marginBottom: 8 },
  label: { fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 },
  input: { width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff', fontSize: 14, padding: '12px 14px', outline: 'none', boxSizing: 'border-box', fontFamily: "'Plus Jakarta Sans', sans-serif" },
  btn: { width: '100%', padding: '16px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #06B6D4, #EC4899)', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
  tagline: { fontSize: 13, color: 'rgba(255,255,255,0.5)', textAlign: 'center', fontStyle: 'italic' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600 },
  prefix: { display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)', borderRadius: 12, padding: '12px 12px', fontSize: 14, fontWeight: 700, color: '#25D366', flexShrink: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" },
};

export default function MiCuenta({ userType = 'mexico' }) {
  const cfg = WA[userType] || WA.mexico;
  const [members, setMembers] = useState(INITIAL);
  const [open, setOpen] = useState([true, false, false, false]);
  const [toast, setToast] = useState(false);

  const upd = (idx, field, val) => {
    const u = [...members];
    if (field === 'waDigits') val = val.replace(/\D/g, '').slice(0, cfg.digits);
    u[idx] = { ...u[idx], [field]: val };
    setMembers(u);
  };
  const toggle = (idx) => { const u = [...open]; u[idx] = !u[idx]; setOpen(u); };
  const filledCount = members.filter(m => m.nombre.trim() && m.apellido.trim()).length;
  const handleSave = () => { setToast(true); setTimeout(() => setToast(false), 3000); };

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
          <div style={{ width: 72, height: 72, borderRadius: 22, background: 'rgba(100,116,139,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><I.Users s={36} c="#64748B" /></div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, marginBottom: 8 }}>Mi Cuenta</h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, maxWidth: 320, margin: '0 auto' }}>Administra tus datos y los de tu familia. Puedes registrar hasta 4 miembros.</p>
        </div>
        {/* Membresía */}
        <div style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(236,72,153,0.06))', border: '1px solid rgba(6,182,212,0.15)', borderRadius: 16, padding: 20, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><I.Shield /><span style={{ fontSize: 15, fontWeight: 700 }}>Membresía</span></div>
            <span style={{ ...S.badge, background: 'rgba(16,185,129,0.15)', color: '#10B981' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} /> Activa</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>Pagada por</span><span style={{ fontSize: 13, fontWeight: 700, color: '#06B6D4' }}>Fabiola (EE.UU.)</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>Miembros registrados</span><span style={{ fontSize: 13, fontWeight: 700, color: '#F59E0B' }}>{filledCount} de 4</span></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(236,72,153,0.06)', border: '1px solid rgba(236,72,153,0.12)', borderRadius: 12, padding: 14, marginBottom: 8 }}>
          <I.Heart /><p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}><span style={{ color: '#06B6D4', fontWeight: 700 }}>Fabiola</span> paga esta membresía para que tú y tu familia estén protegidos.</p>
        </div>

        <p style={S.st}>Miembros ({filledCount}/4)</p>

        {members.map((m, i) => {
          const color = COLORS[i]; const label = LABELS[i]; const isOpen = open[i];
          const hasFill = m.nombre.trim() && m.apellido.trim();
          const waClean = m.waDigits.replace(/\D/g, '');
          return (
            <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${isOpen ? color + '30' : 'rgba(255,255,255,0.06)'}`, borderRadius: 16, marginBottom: 12, overflow: 'hidden' }}>
              <div onClick={() => toggle(i)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `${color}15`, border: `1.5px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {hasFill ? <span style={{ fontWeight: 800, fontSize: 14, color }}>{m.nombre.charAt(0)}{m.apellido.charAt(0)}</span> : <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.25)' }}>{i + 1}</span>}
                  </div>
                  <div><p style={{ fontSize: 14, fontWeight: 700, color: hasFill ? '#fff' : 'rgba(255,255,255,0.4)' }}>{hasFill ? `${m.nombre} ${m.apellido}` : `Agregar ${label}`}</p><span style={{ fontSize: 11, color, fontWeight: 600 }}>{label}</span></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {hasFill && <span style={{ ...S.badge, background: 'rgba(16,185,129,0.1)', color: '#10B981', fontSize: 10 }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} /> OK</span>}
                  {isOpen ? <I.ChevUp s={16} c="rgba(255,255,255,0.4)" /> : <I.ChevDown s={16} c="rgba(255,255,255,0.4)" />}
                </div>
              </div>
              {isOpen && (
                <div style={{ padding: '0 16px 18px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ marginTop: 16, marginBottom: 14 }}><label style={S.label}>Nombre</label><input style={S.input} value={m.nombre} onChange={e => upd(i, 'nombre', e.target.value)} placeholder="Nombre" /></div>
                  <div style={{ marginBottom: 14 }}><label style={S.label}>Apellido Paterno</label><input style={S.input} value={m.apellido} onChange={e => upd(i, 'apellido', e.target.value)} placeholder="Apellido Paterno" /></div>
                  <div style={{ marginBottom: 14 }}><label style={S.label}><I.Mail /> Correo electrónico</label><input style={S.input} type="email" value={m.email} onChange={e => upd(i, 'email', e.target.value)} placeholder="correo@ejemplo.com" /></div>
                  <div style={{ marginBottom: 14 }}>
                    <label style={S.label}><I.WA /> WhatsApp</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <div style={S.prefix}><I.WA s={14} /> {cfg.prefix}</div>
                      <input style={{ ...S.input, flex: 1 }} type="tel" value={cfg.fmt(m.waDigits)} onChange={e => upd(i, 'waDigits', e.target.value)} placeholder={cfg.placeholder} maxLength={14} />
                    </div>
                    <p style={{ fontSize: 11, color: waClean.length === cfg.digits ? 'rgba(16,185,129,0.6)' : 'rgba(255,255,255,0.25)', marginTop: 4 }}>
                      {waClean.length === cfg.digits ? `✓ Se guardará como ${cfg.prefix}${waClean}` : `${waClean.length}/${cfg.digits} dígitos · ${cfg.label}`}
                    </p>
                  </div>
                  <div><label style={S.label}><I.Calendar /> Fecha de nacimiento</label><input style={S.input} type="date" value={m.nacimiento} onChange={e => upd(i, 'nacimiento', e.target.value)} /></div>
                </div>
              )}
            </div>
          );
        })}

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 16, marginTop: 8 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>No es necesario completar todos a la vez. Registra a tus miembros poco a poco. Puedes modificar los datos en cualquier momento.</p>
        </div>
        <button style={{ ...S.btn, marginTop: 24, marginBottom: 12 }} onClick={handleSave}><I.Save /> Guardar</button>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginBottom: 20 }}>La administración de pagos es gestionada por Fabiola desde EE.UU.</p>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: 'rgba(16,185,129,0.95)', color: '#fff', borderRadius: 14, padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600, boxShadow: '0 8px 30px rgba(0,0,0,0.4)', maxWidth: 380, zIndex: 100 }}><I.Check s={20} c="#fff" /> Datos guardados correctamente</div>}
      <div style={{ padding: '28px 20px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 8 }}><p style={S.tagline}>SaludCompartida, donde está tu corazón</p></div>
    </div>
  );
}
