'use client';

import { useState, useEffect } from 'react';
import { getSupabaseClientBrowser } from '@/lib/supabase-client';
import { generateWhatsAppLink } from '@/utils/waE164';

export default function MiCuenta({ userType = 'mexico' }) {
  const [accountData, setAccountData] = useState({
    titular: {
      name: '',
      phone: '',
      email: '',
      avatar: null
    },
    miembros: [
      { id: 1, name: '', relation: '', expanded: false },
      { id: 2, name: '', relation: '', expanded: false },
      { id: 3, name: '', relation: '', expanded: false }
    ],
    plan: 'SaludCompartida Familiar',
    status: 'Activo',
    nextBilling: '15 febrero 2026'
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // WhatsApp soporte según userType
  const supportPhone = userType === 'migrant' ? '+13055227150' : '+525512345678';
  const supportMessage = 'Hola, necesito ayuda con mi cuenta de SaludCompartida';

  useEffect(() => {
    // TODO: Cargar datos reales desde Supabase
    loadAccountData();
  }, []);

  const loadAccountData = async () => {
    try {
      // TODO: Implementar lectura de Supabase
      // const { data: user } = await supabase.auth.getUser();
      // const { data: registration } = await supabase
      //   .from('registrations')
      //   .select('*')
      //   .eq('id', user.id)
      //   .single();
      
      // Placeholder data
      setAccountData({
        ...accountData,
        titular: {
          name: userType === 'migrant' ? 'María González' : 'Rosa Martínez',
          phone: userType === 'migrant' ? '(305) 522-7150' : '55 1234 5678',
          email: userType === 'migrant' ? 'maria@email.com' : 'rosa@email.com',
          avatar: null
        }
      });
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  const handleSaveAccount = async () => {
    setIsSaving(true);
    try {
      // TODO: Guardar en Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
    } catch (error) {
      console.error('Error guardando:', error);
      alert('Hubo un error. Intenta de nuevo.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (passwordData.new !== passwordData.confirm) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (passwordData.new.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    try {
      // TODO: Implementar cambio de contraseña con Supabase Auth
      // await supabase.auth.updateUser({ password: passwordData.new });
      alert('Contraseña actualizada exitosamente');
      setPasswordData({ current: '', new: '', confirm: '' });
    } catch (error) {
      console.error('Error cambiando contraseña:', error);
      alert('Hubo un error. Verifica tu contraseña actual.');
    }
  };

  const handleLogout = async () => {
    if (confirm('¿Seguro que quieres cerrar sesión?')) {
      try {
        const supabase = getSupabaseClientBrowser();
        await supabase.auth.signOut();
        // TODO: Redirigir a login
        window.location.href = '/';
      } catch (error) {
        console.error('Error cerrando sesión:', error);
      }
    }
  };

  const toggleMiembro = (id) => {
    setAccountData({
      ...accountData,
      miembros: accountData.miembros.map(m => 
        m.id === id ? { ...m, expanded: !m.expanded } : m
      )
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#111827',
      color: '#fff',
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      padding: '24px 16px',
      maxWidth: 430,
      margin: '0 auto'
    }}>
      
      {/* Header con logo */}
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <img 
          src="/saludcompartida-dark-no-tagline.png" 
          alt="SaludCompartida" 
          style={{ height: 40, marginBottom: 16 }}
        />
        <h1 style={{
          fontFamily: '"DM Serif Display", serif',
          fontSize: 32,
          marginBottom: 8,
          color: '#06B6D4'
        }}>
          Mi Cuenta
        </h1>
      </div>

      {/* Status banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(6,182,212,0.1))',
        border: '1px solid rgba(16,185,129,0.3)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#10B981',
              animation: 'pulse 2s infinite'
            }}/>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#10B981' }}>
              {accountData.status}
            </span>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
            Próximo cobro: {accountData.nextBilling}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 20, fontWeight: 800, color: '#06B6D4', margin: 0 }}>
            $12
          </p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
            USD/mes
          </p>
        </div>
      </div>

      {/* Titular */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          {/* Avatar */}
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            fontWeight: 700
          }}>
            {accountData.titular.name.charAt(0)}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
              {accountData.titular.name}
            </h2>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
              Titular de la cuenta
            </p>
          </div>
        </div>

        {/* Datos del titular */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>
            Teléfono
          </label>
          <input
            type="tel"
            value={accountData.titular.phone}
            onChange={(e) => setAccountData({
              ...accountData,
              titular: { ...accountData.titular, phone: e.target.value }
            })}
            disabled={!isEditing}
            style={{
              width: '100%',
              padding: '12px 14px',
              background: isEditing ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              color: '#fff',
              fontSize: 14,
              fontFamily: 'inherit'
            }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>
            Email
          </label>
          <input
            type="email"
            value={accountData.titular.email}
            onChange={(e) => setAccountData({
              ...accountData,
              titular: { ...accountData.titular, email: e.target.value }
            })}
            disabled={!isEditing}
            style={{
              width: '100%',
              padding: '12px 14px',
              background: isEditing ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              color: '#fff',
              fontSize: 14,
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Botones de edición */}
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(6,182,212,0.15)',
              border: '1px solid rgba(6,182,212,0.3)',
              borderRadius: 10,
              color: '#06B6D4',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Editar información
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setIsEditing(false)}
              style={{
                flex: 1,
                padding: '12px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10,
                color: 'rgba(255,255,255,0.7)',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveAccount}
              disabled={isSaving}
              style={{
                flex: 1,
                padding: '12px',
                background: 'linear-gradient(135deg, #06B6D4, #EC4899)',
                border: 'none',
                borderRadius: 10,
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                cursor: isSaving ? 'not-allowed' : 'pointer'
              }}
            >
              {isSaving ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        )}
      </div>

      {/* Miembros adicionales */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'rgba(255,255,255,0.9)' }}>
          Miembros de tu familia <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>({accountData.miembros.filter(m => m.name).length}/3)</span>
        </h3>

        {accountData.miembros.map((miembro) => (
          <div
            key={miembro.id}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 12,
              marginBottom: 12,
              overflow: 'hidden'
            }}
          >
            <div
              onClick={() => toggleMiembro(miembro.id)}
              style={{
                padding: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>
                  {miembro.name || `Miembro ${miembro.id}`}
                </p>
                {miembro.relation && (
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                    {miembro.relation}
                  </p>
                )}
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
                style={{
                  transform: miembro.expanded ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.2s'
                }}
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>

            {miembro.expanded && (
              <div style={{ padding: '0 16px 16px' }}>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={miembro.name}
                  onChange={(e) => setAccountData({
                    ...accountData,
                    miembros: accountData.miembros.map(m =>
                      m.id === miembro.id ? { ...m, name: e.target.value } : m
                    )
                  })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8,
                    color: '#fff',
                    fontSize: 13,
                    fontFamily: 'inherit',
                    marginBottom: 8
                  }}
                />
                <input
                  type="text"
                  placeholder="Relación (ej: Mamá, Papá, Hijo)"
                  value={miembro.relation}
                  onChange={(e) => setAccountData({
                    ...accountData,
                    miembros: accountData.miembros.map(m =>
                      m.id === miembro.id ? { ...m, relation: e.target.value } : m
                    )
                  })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8,
                    color: '#fff',
                    fontSize: 13,
                    fontFamily: 'inherit'
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Cambiar contraseña */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
          Cambiar contraseña
        </h3>
        <form onSubmit={handleChangePassword}>
          <input
            type="password"
            placeholder="Contraseña actual"
            value={passwordData.current}
            onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '12px 14px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              color: '#fff',
              fontSize: 14,
              fontFamily: 'inherit',
              marginBottom: 12
            }}
          />
          <input
            type="password"
            placeholder="Nueva contraseña (mínimo 8 caracteres)"
            value={passwordData.new}
            onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
            required
            minLength={8}
            style={{
              width: '100%',
              padding: '12px 14px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              color: '#fff',
              fontSize: 14,
              fontFamily: 'inherit',
              marginBottom: 12
            }}
          />
          <input
            type="password"
            placeholder="Confirmar nueva contraseña"
            value={passwordData.confirm}
            onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '12px 14px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              color: '#fff',
              fontSize: 14,
              fontFamily: 'inherit',
              marginBottom: 16
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(139,92,246,0.15)',
              border: '1px solid rgba(139,92,246,0.3)',
              borderRadius: 10,
              color: '#8B5CF6',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Actualizar contraseña
          </button>
        </form>
      </div>

      {/* Soporte */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        textAlign: 'center'
      }}>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>
          ¿Necesitas ayuda?
        </p>
        <a
          href={generateWhatsAppLink(supportPhone, supportMessage)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(37,211,102,0.1)',
            border: '1px solid rgba(37,211,102,0.3)',
            color: '#25D366',
            padding: '10px 20px',
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            textDecoration: 'none'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Hablar con soporte
        </a>
      </div>

      {/* Cerrar sesión */}
      <button
        onClick={handleLogout}
        style={{
          width: '100%',
          padding: '14px',
          background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: 12,
          color: '#EF4444',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.15)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
      >
        Cerrar sesión
      </button>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
