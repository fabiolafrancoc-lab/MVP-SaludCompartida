'use client';

/* ═══════════════════════════════════════════════════════════════
   FARMACIA — Descuentos en Farmacias (SIMPLE CON WHATSAPP)
   
   Sin tarjetas, sin QR, sin códigos.
   Habla con una persona REAL por WhatsApp → Te dan receta + descuentos
   
   Props: userType ('mexico'|'migrant'), onBack (fn)
   ═══════════════════════════════════════════════════════════════ */

const TagIcon = ({s=22,c='#fff'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill={c}/></svg>;
const ArrIcon = ({s=20,c='currentColor'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;
const PillIcon = ({s=18,c='currentColor'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>;
const SparkIcon = ({s=18,c='currentColor'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;
const HomeIcon = ({s=18,c='currentColor'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const WhatsAppIcon = ({s=24,c='#25D366'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>;
const CheckIcon = ({s=18,c='#10B981'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

const WHATSAPP_NUMBER = '+525610178639'; // Número de Aura Multiasistencias

const CATEGORIES = [
  { icon: <PillIcon s={20} c="#06B6D4" />, label: 'Medicamentos', desc: 'Recetados y genéricos', discount: 'Hasta 75%', color: '#06B6D4' },
  { icon: <SparkIcon s={20} c="#EC4899" />, label: 'Belleza', desc: 'Maquillaje, cremas, skincare', discount: 'Hasta 60%', color: '#EC4899' },
  { icon: <HomeIcon s={20} c="#8B5CF6" />, label: 'Hogar', desc: 'Pañales, leche, limpieza', discount: 'Hasta 50%', color: '#8B5CF6' },
];

const PASOS = [
  { num: '1', title: 'Contacta por WhatsApp', desc: 'Escribe al número abajo. Respuesta inmediata.' },
  { num: '2', title: 'Solicita tu receta', desc: 'Dile qué medicamentos necesitas o productos del hogar.' },
  { num: '3', title: 'Recibe descuentos', desc: 'Te dan la receta Y los descuentos aplicables. ¡Listo!' },
];

export default function Farmacia({ userType = 'mexico', onBack }) {
  const userName = 'Renata';
  const migrantName = 'Fabiola';

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola! Soy ${userName}, miembro de SaludCompartida. Necesito información sobre descuentos en medicamentos y productos del hogar.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const S = {
    page: { minHeight: '100vh', background: '#111827', color: '#fff', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", maxWidth: 430, margin: '0 auto', paddingBottom: 60 },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
    section: { padding: '0 20px 32px' },
    sTitle: { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(255,255,255,0.35)', marginBottom: 14, marginTop: 28 },
    card: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '18px 16px', marginBottom: 12 },
    badge: { display: 'inline-block', padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700 },
  };

  return (
    <div style={S.page}>
  return (
    <div style={S.page}>
      {/* Header */}
      <div style={S.header}>
        <img src="/saludcompartida-dark-no-tagline.png" alt="SaludCompartida" style={{ height: 40 }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', marginRight: 6, boxShadow: '0 0 8px #10B981' }} />
          <span style={{ fontSize: 12, color: '#10B981', fontWeight: 600 }}>Activo</span>
        </div>
      </div>

      <div style={S.section}>
        {/* Back Button */}
        <div style={{ paddingTop: 12, marginBottom: 8, cursor: 'pointer' }} onClick={onBack}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 700, color: '#FFFFFF' }}>
            <ArrIcon s={18} c="#FFFFFF" /> VOLVER
          </span>
        </div>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ 
            width: 80, 
            height: 80, 
            borderRadius: 24, 
            background: 'linear-gradient(135deg, rgba(236,72,153,0.25), rgba(236,72,153,0.15))', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 18px',
            boxShadow: '0 8px 32px rgba(236,72,153,0.3)',
          }}>
            <TagIcon s={42} c="#EC4899" />
          </div>
          <h2 style={{ 
            fontFamily: "'DM Serif Display', serif", 
            fontSize: 28, 
            marginBottom: 10, 
            lineHeight: 1.3,
            color: '#fff',
          }}>
            Descuentos en<br /><span style={{ color: '#EC4899' }}>Farmacias</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, maxWidth: 340, margin: '0 auto' }}>
            Sin tarjetas, sin códigos, sin complicaciones.<br/>
            <b style={{ color: '#EC4899' }}>Habla con una persona real</b> por WhatsApp.
          </p>
        </div>

        {/* Cómo funciona */}
        <p style={S.sTitle}>Así de simple es:</p>
        {PASOS.map((paso, i) => (
          <div key={i} style={{ 
            display: 'flex', 
            gap: 16, 
            marginBottom: 18,
            paddingLeft: 4,
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(16,185,129,0.15))',
              border: '1.5px solid rgba(16,185,129,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontWeight: 800,
              fontSize: 18,
              color: '#10B981',
            }}>
              {paso.num}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, color: '#fff' }}>{paso.title}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{paso.desc}</p>
            </div>
          </div>
        ))}

        {/* WhatsApp CTA */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(37,211,102,0.15), rgba(37,211,102,0.08))',
          border: '2px solid rgba(37,211,102,0.3)',
          borderRadius: 20,
          padding: '24px 20px',
          marginTop: 28,
          marginBottom: 28,
          textAlign: 'center',
        }}>
          <WhatsAppIcon s={48} />
          <p style={{ fontSize: 17, fontWeight: 800, color: '#fff', marginTop: 14, marginBottom: 8 }}>
            Contacta Ahora
          </p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 18, lineHeight: 1.6 }}>
            Respuesta inmediata. Una persona real te atiende.
          </p>
          <button
            onClick={handleWhatsApp}
            style={{
              width: '100%',
              padding: '16px 24px',
              background: '#25D366',
              border: 'none',
              borderRadius: 14,
              color: '#fff',
              fontSize: 16,
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              boxShadow: '0 8px 24px rgba(37,211,102,0.4)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(37,211,102,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,211,102,0.4)';
            }}
          >
            <WhatsAppIcon s={24} c="#fff" />
            Abrir WhatsApp
          </button>
        </div>

        {/* Categorías de productos */}
        <p style={S.sTitle}>En qué te ayudamos:</p>
        {CATEGORIES.map((cat, i) => (
          <div key={i} style={{
            background: `${cat.color}08`,
            border: `1.5px solid ${cat.color}25`,
            borderRadius: 16,
            padding: '18px 16px',
            marginBottom: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ 
                width: 50, 
                height: 50, 
                borderRadius: 14, 
                background: `${cat.color}15`, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                flexShrink: 0 
              }}>
                {cat.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 3, color: '#fff' }}>{cat.label}</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{cat.desc}</p>
              </div>
              <span style={{ 
                ...S.badge, 
                background: `${cat.color}20`, 
                color: cat.color,
              }}>
                {cat.discount}
              </span>
            </div>
          </div>
        ))}

        {/* Beneficios adicionales */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(6,182,212,0.05))',
          border: '1px solid rgba(6,182,212,0.2)',
          borderRadius: 16,
          padding: '18px',
          marginTop: 24,
        }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#06B6D4', marginBottom: 12 }}>
            <CheckIcon s={20} /> Incluido en tu membresía
          </p>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 2 }}>
            <li><b style={{ color: '#fff' }}>Recetas médicas</b> para tus medicamentos</li>
            <li><b style={{ color: '#fff' }}>Descuentos en +1,700 farmacias</b> de México</li>
            <li><b style={{ color: '#fff' }}>Productos del hogar</b> (pañales, leche, limpieza)</li>
            <li><b style={{ color: '#fff' }}>Sin límite de uso</b> - úsalo cuantas veces quieras</li>
          </ul>
        </div>

        {/* Emotional Message */}
        {userType === 'mexico' && (
          <div style={{
            background: 'rgba(236,72,153,0.08)',
            border: '1px solid rgba(236,72,153,0.15)',
            borderRadius: 16,
            padding: 18,
            marginTop: 24,
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
              <b style={{ color: '#EC4899' }}>{migrantName}</b> ya pagó por estos descuentos para ti. 
              Cada vez que ahorras en medicinas o productos del hogar, 
              <b style={{ color: '#10B981' }}> él cuida de ti aunque esté lejos</b>.
            </p>
          </div>
        )}

        {/* Footer CTA */}
        <div style={{ textAlign: 'center', paddingTop: 32 }}>
          <button
            onClick={handleWhatsApp}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 28px',
              background: 'rgba(37,211,102,0.15)',
              border: '2px solid rgba(37,211,102,0.3)',
              borderRadius: 12,
              color: '#25D366',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(37,211,102,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(37,211,102,0.15)';
            }}
          >
            <WhatsAppIcon s={20} />
            Hablar por WhatsApp
          </button>
        </div>

        <div style={{ textAlign: 'center', paddingTop: 28 }}>
          <span onClick={onBack} style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 6, 
            fontSize: 13, 
            color: 'rgba(255,255,255,0.4)', 
            cursor: 'pointer' 
          }}>
            <ArrIcon s={16} c="rgba(255,255,255,0.4)" /> Volver al inicio
          </span>
        </div>
      </div>
    </div>
  );
}
        <div style={{
          background: 'linear-gradient(145deg, #1a1a2e, #16213e, #0f3460)',
          borderRadius: 20, padding: '24px 20px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
          marginBottom: 16, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase' }}>Platinum Member</p>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: '#fff', marginTop: 4 }}>SaludCompartida</p>
            </div>
            <QRCode />
          </div>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '10px 14px', marginBottom: 14 }}>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 2 }}>TITULAR</p>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{userName}</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '10px 14px' }}>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 2 }}>CONVENIO</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#F59E0B', fontFamily: 'monospace' }}>{convenioNumber}</p>
            </div>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '10px 14px' }}>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 2 }}>DESCUENTO</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#10B981' }}>Hasta 75%</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Red de farmacias</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#8B5CF6' }}>+1,700</span>
          </div>
        </div>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: 20 }}>Muestra esta tarjeta o el código QR en la farmacia</p>

        {/* DESCUENTO SOBRE DESCUENTO */}
        <div style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.12), rgba(139,92,246,0.12))', border: '1px solid rgba(236,72,153,0.25)', borderRadius: 16, padding: 18, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg, #EC4899, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <DollarIcon s={20} c="#fff" />
            </div>
            <p style={{ fontSize: 16, fontWeight: 800, color: '#EC4899' }}>Descuento sobre Descuento</p>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
            ¿Ya tienes descuentos en tu farmacia favorita? <b style={{ color: '#fff' }}>Nuestro descuento se aplica sobre el precio ya rebajado.</b> Maximiza tus ahorros en cada compra.
          </p>
        </div>

        {/* CATEGORÍAS */}
        <p style={S.sTitle}>Descuentos en todo lo que necesitas</p>
        {CATEGORIES.map((cat, i) => (
          <div key={i} style={S.card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{cat.icon}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{cat.label}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{cat.desc}</p>
              </div>
              <span style={{ ...S.badge, background: `${cat.color}20`, color: cat.color, fontWeight: 700, fontSize: 13 }}>{cat.discount}</span>
            </div>
          </div>
        ))}

        {/* UBICACIÓN */}
        <p style={S.sTitle}>Farmacias cerca de ti</p>
        {!showLocation ? (
          <div onClick={() => setShowLocation(true)} style={{ background: 'rgba(255,255,255,0.04)', border: '2px dashed rgba(139,92,246,0.3)', borderRadius: 16, padding: 24, textAlign: 'center', cursor: 'pointer' }}>
            <MapIcon s={32} c="#8B5CF6" />
            <p style={{ fontSize: 15, fontWeight: 700, color: '#8B5CF6', marginTop: 12, marginBottom: 4 }}>¿Compartir mi ubicación?</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Te mostramos las farmacias más cercanas con los mejores descuentos</p>
          </div>
        ) : (
          <div>
            {FARMACIAS.map((f, i) => (
              <div key={i} style={{ ...S.card, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><MapIcon s={20} c="#8B5CF6" /></div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{f.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{f.dist}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}><StarIcon /> <span style={{ fontSize: 11, color: '#F59E0B' }}>{f.rating}</span></span>
                  </div>
                </div>
                <span style={{ ...S.badge, background: 'rgba(16,185,129,0.15)', color: '#10B981', fontWeight: 700, fontSize: 13 }}>-{f.discount}</span>
              </div>
            ))}
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginTop: 8 }}>Mostrando 4 de +1,700 farmacias disponibles</p>
          </div>
        )}

        {/* Emotional */}
        <div style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.15)', borderRadius: 16, padding: 18, textAlign: 'center', marginTop: 20 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
            <span style={{ color: '#06B6D4', fontWeight: 600 }}>{migrantName}</span> ya pagó por estos descuentos para ti. Cada vez que compras con tu tarjeta, <b style={{ color: '#10B981' }}>ahorras dinero real</b>.
          </p>
        </div>

        <div style={{ textAlign: 'center', paddingTop: 24 }}>
          <span onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}><ArrIcon s={16} c="rgba(255,255,255,0.4)" /> Volver</span>
        </div>
      </div>

      <div style={{ padding: '28px 20px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 12 }}>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textAlign: 'center', fontStyle: 'italic' }}>&ldquo;SaludCompartida, donde está tu corazón&rdquo;</p>
      </div>
    </div>
  );
}
