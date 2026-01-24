'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Phone, User, Users, Plus, X, Heart } from 'lucide-react';
import { formatPhoneMX } from '@/lib/utils';

const PARENTESCOS = [
  'Madre',
  'Padre',
  'Esposo/a',
  'Hijo/a',
  'Hermano/a',
  'Abuelo/a',
  'Tío/a',
  'Primo/a',
  'Otro familiar'
];

interface FamilyMember {
  nombre: string;
  telefono: string;
  parentesco: string;
}

export default function DatosFamiliaPage() {
  const router = useRouter();
  const [usuarioPrincipal, setUsuarioPrincipal] = useState<FamilyMember>({
    nombre: '',
    telefono: '',
    parentesco: ''
  });
  const [usuariosAdicionales, setUsuariosAdicionales] = useState<FamilyMember[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Verificar que venga del paso anterior
    const datosMigrante = sessionStorage.getItem('sc_datos_migrante');
    if (!datosMigrante) {
      router.push('/registro/datos-migrante');
      return;
    }

    // Cargar datos si ya existen
    const datosFamilia = sessionStorage.getItem('sc_datos_familia');
    if (datosFamilia) {
      const data = JSON.parse(datosFamilia);
      setUsuarioPrincipal(data.usuarioPrincipal || { nombre: '', telefono: '', parentesco: '' });
      setUsuariosAdicionales(data.usuariosAdicionales || []);
    }
  }, [router]);

  const handlePrincipalChange = (field: keyof FamilyMember, value: string) => {
    if (field === 'telefono') {
      value = formatPhoneMX(value);
    }
    setUsuarioPrincipal(prev => ({ ...prev, [field]: value }));
    if (errors[`principal_${field}`]) {
      setErrors(prev => ({ ...prev, [`principal_${field}`]: '' }));
    }
  };

  const handleAdicionalChange = (index: number, field: keyof FamilyMember, value: string) => {
    if (field === 'telefono') {
      value = formatPhoneMX(value);
    }
    const newAdicionales = [...usuariosAdicionales];
    newAdicionales[index] = { ...newAdicionales[index], [field]: value };
    setUsuariosAdicionales(newAdicionales);
    if (errors[`adicional_${index}_${field}`]) {
      setErrors(prev => ({ ...prev, [`adicional_${index}_${field}`]: '' }));
    }
  };

  const addFamilyMember = () => {
    if (usuariosAdicionales.length < 3) {
      setUsuariosAdicionales([...usuariosAdicionales, { nombre: '', telefono: '', parentesco: '' }]);
    }
  };

  const removeFamilyMember = (index: number) => {
    const newAdicionales = usuariosAdicionales.filter((_, i) => i !== index);
    setUsuariosAdicionales(newAdicionales);
    // Limpiar errores relacionados
    const newErrors = { ...errors };
    Object.keys(newErrors).forEach(key => {
      if (key.startsWith(`adicional_${index}_`)) {
        delete newErrors[key];
      }
    });
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validar usuario principal
    if (!usuarioPrincipal.nombre.trim()) {
      newErrors.principal_nombre = 'El nombre es requerido';
    }

    const principalPhoneDigits = usuarioPrincipal.telefono.replace(/\D/g, '');
    if (!principalPhoneDigits) {
      newErrors.principal_telefono = 'El teléfono es requerido';
    } else if (principalPhoneDigits.length !== 12 || !principalPhoneDigits.startsWith('52')) {
      newErrors.principal_telefono = 'Debe ser un teléfono válido de México (+52)';
    }

    if (!usuarioPrincipal.parentesco) {
      newErrors.principal_parentesco = 'Selecciona el parentesco';
    }

    // Validar usuarios adicionales (solo si tienen datos)
    usuariosAdicionales.forEach((user, index) => {
      const hasAnyData = user.nombre.trim() || user.telefono.trim() || user.parentesco;
      
      if (hasAnyData) {
        if (!user.nombre.trim()) {
          newErrors[`adicional_${index}_nombre`] = 'El nombre es requerido';
        }

        const phoneDigits = user.telefono.replace(/\D/g, '');
        if (!phoneDigits) {
          newErrors[`adicional_${index}_telefono`] = 'El teléfono es requerido';
        } else if (phoneDigits.length !== 12 || !phoneDigits.startsWith('52')) {
          newErrors[`adicional_${index}_telefono`] = 'Teléfono inválido de México';
        }

        if (!user.parentesco) {
          newErrors[`adicional_${index}_parentesco`] = 'Selecciona el parentesco';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Filtrar usuarios adicionales que estén completos
      const adicionalesCompletos = usuariosAdicionales.filter(user => 
        user.nombre.trim() && user.telefono.trim() && user.parentesco
      );

      const datosFamilia = {
        usuarioPrincipal,
        usuariosAdicionales: adicionalesCompletos
      };

      // Guardar en sessionStorage
      sessionStorage.setItem('sc_datos_familia', JSON.stringify(datosFamilia));

      // Navegar al siguiente paso
      router.push('/registro/plan');
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const totalMembers = 1 + usuariosAdicionales.filter(u => u.nombre.trim()).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header con Progress */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-sc-gray">SaludCompartida</h1>
            <span className="text-sm text-gray-600">Paso 3 de 4</span>
          </div>
          
          {/* Progress Bar */}
          <div className="flex gap-2">
            <div className="flex-1 h-2 bg-sc-cyan rounded-full"></div>
            <div className="flex-1 h-2 bg-sc-cyan rounded-full"></div>
            <div className="flex-1 h-2 bg-sc-cyan rounded-full"></div>
            <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-sc-gray mb-2">
                Tu familia en México
              </h2>
              <p className="text-gray-600">
                Registra a las personas que tendrán acceso a los servicios de salud.
              </p>
            </div>
            <div className="counter-badge">
              <Users className="w-5 h-5" />
              <span className="font-bold">{totalMembers} de 4</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Usuario Principal */}
          <div className="card-sc">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-sc-magenta" />
              <h3 className="text-xl font-semibold text-sc-gray">Usuario Principal</h3>
              <span className="badge-sm badge-primary ml-auto">Requerido</span>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="principal_nombre" className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="principal_nombre"
                  value={usuarioPrincipal.nombre}
                  onChange={(e) => handlePrincipalChange('nombre', e.target.value)}
                  className={`input-sc ${errors.principal_nombre ? 'border-red-500' : ''}`}
                  placeholder="María González López"
                />
                {errors.principal_nombre && (
                  <p className="text-red-500 text-sm mt-1">{errors.principal_nombre}</p>
                )}
              </div>

              <div>
                <label htmlFor="principal_telefono" className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline w-4 h-4 mr-1" />
                  Teléfono en México
                </label>
                <input
                  type="tel"
                  id="principal_telefono"
                  value={usuarioPrincipal.telefono}
                  onChange={(e) => handlePrincipalChange('telefono', e.target.value)}
                  className={`input-sc ${errors.principal_telefono ? 'border-red-500' : ''}`}
                  placeholder="+52 55 1234 5678"
                />
                {errors.principal_telefono && (
                  <p className="text-red-500 text-sm mt-1">{errors.principal_telefono}</p>
                )}
              </div>

              <div>
                <label htmlFor="principal_parentesco" className="block text-sm font-medium text-gray-700 mb-2">
                  Parentesco
                </label>
                <select
                  id="principal_parentesco"
                  value={usuarioPrincipal.parentesco}
                  onChange={(e) => handlePrincipalChange('parentesco', e.target.value)}
                  className={`input-sc ${errors.principal_parentesco ? 'border-red-500' : ''}`}
                >
                  <option value="">Selecciona el parentesco</option>
                  {PARENTESCOS.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                {errors.principal_parentesco && (
                  <p className="text-red-500 text-sm mt-1">{errors.principal_parentesco}</p>
                )}
              </div>
            </div>
          </div>

          {/* Usuarios Adicionales */}
          {usuariosAdicionales.map((user, index) => (
            <div key={index} className="card-sc relative">
              <button
                type="button"
                onClick={() => removeFamilyMember(index)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                title="Eliminar"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-semibold text-sc-gray mb-4">
                Familiar Adicional #{index + 1}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline w-4 h-4 mr-1" />
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={user.nombre}
                    onChange={(e) => handleAdicionalChange(index, 'nombre', e.target.value)}
                    className={`input-sc ${errors[`adicional_${index}_nombre`] ? 'border-red-500' : ''}`}
                    placeholder="Nombre completo"
                  />
                  {errors[`adicional_${index}_nombre`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`adicional_${index}_nombre`]}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline w-4 h-4 mr-1" />
                    Teléfono en México
                  </label>
                  <input
                    type="tel"
                    value={user.telefono}
                    onChange={(e) => handleAdicionalChange(index, 'telefono', e.target.value)}
                    className={`input-sc ${errors[`adicional_${index}_telefono`] ? 'border-red-500' : ''}`}
                    placeholder="+52 55 1234 5678"
                  />
                  {errors[`adicional_${index}_telefono`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`adicional_${index}_telefono`]}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parentesco
                  </label>
                  <select
                    value={user.parentesco}
                    onChange={(e) => handleAdicionalChange(index, 'parentesco', e.target.value)}
                    className={`input-sc ${errors[`adicional_${index}_parentesco`] ? 'border-red-500' : ''}`}
                  >
                    <option value="">Selecciona el parentesco</option>
                    {PARENTESCOS.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  {errors[`adicional_${index}_parentesco`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`adicional_${index}_parentesco`]}</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Botón Agregar Familiar */}
          {usuariosAdicionales.length < 3 && (
            <button
              type="button"
              onClick={addFamilyMember}
              className="w-full btn-outline"
            >
              <Plus className="w-5 h-5 mr-2" />
              Agregar Familiar Adicional ({3 - usuariosAdicionales.length} disponibles)
            </button>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-outline flex-1"
              disabled={isLoading}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Atrás
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
              disabled={isLoading}
            >
              {isLoading ? 'Guardando...' : 'Continuar'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>💚 Incluye hasta 4 personas</strong><br />
            El usuario principal es quien recibirá las notificaciones principales. 
            Puedes agregar hasta 3 familiares adicionales.
          </p>
        </div>
      </main>
    </div>
  );
}
