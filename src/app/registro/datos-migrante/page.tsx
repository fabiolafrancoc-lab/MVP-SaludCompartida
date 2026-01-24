'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Phone, Mail, User, MapPin } from 'lucide-react';
import { formatPhoneUSA } from '@/lib/utils';

const USA_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming', 'District of Columbia'
];

export default function DatosMigrantePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    email: '',
    telefonoUS: '',
    estadoUS: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Cargar datos del paso anterior si existen
    const registroInicial = sessionStorage.getItem('sc_registro_inicial');
    if (registroInicial) {
      const data = JSON.parse(registroInicial);
      setFormData(prev => ({
        ...prev,
        nombreCompleto: data.nombre || '',
        email: data.email || ''
      }));
    }
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneUSA(e.target.value);
    setFormData(prev => ({ ...prev, telefonoUS: formatted }));
    if (errors.telefonoUS) {
      setErrors(prev => ({ ...prev, telefonoUS: '' }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombreCompleto.trim()) {
      newErrors.nombreCompleto = 'El nombre completo es requerido';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    const phoneDigits = formData.telefonoUS.replace(/\D/g, '');
    if (!phoneDigits) {
      newErrors.telefonoUS = 'El teléfono es requerido';
    } else if (phoneDigits.length !== 11 || !phoneDigits.startsWith('1')) {
      newErrors.telefonoUS = 'Debe ser un teléfono válido de USA (+1)';
    }

    if (!formData.estadoUS) {
      newErrors.estadoUS = 'Selecciona tu estado';
    }

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
      // Guardar datos en sessionStorage
      sessionStorage.setItem('sc_datos_migrante', JSON.stringify(formData));
      
      // Navegar al siguiente paso
      router.push('/registro/datos-familia');
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header con Progress */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-sc-gray">SaludCompartida</h1>
            <span className="text-sm text-gray-600">Paso 2 de 4</span>
          </div>
          
          {/* Progress Bar */}
          <div className="flex gap-2">
            <div className="flex-1 h-2 bg-sc-cyan rounded-full"></div>
            <div className="flex-1 h-2 bg-sc-cyan rounded-full"></div>
            <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
            <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-sc-gray mb-2">
            Cuéntanos sobre ti
          </h2>
          <p className="text-gray-600">
            Necesitamos tus datos de contacto en Estados Unidos para completar el registro.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre Completo */}
          <div>
            <label htmlFor="nombreCompleto" className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline w-4 h-4 mr-1" />
              Nombre Completo
            </label>
            <input
              type="text"
              id="nombreCompleto"
              name="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleChange}
              className={`input-sc ${errors.nombreCompleto ? 'border-red-500' : ''}`}
              placeholder="Juan Pérez García"
            />
            {errors.nombreCompleto && (
              <p className="text-red-500 text-sm mt-1">{errors.nombreCompleto}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="inline w-4 h-4 mr-1" />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-sc ${errors.email ? 'border-red-500' : ''}`}
              placeholder="tu-email@ejemplo.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Teléfono USA */}
          <div>
            <label htmlFor="telefonoUS" className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="inline w-4 h-4 mr-1" />
              Teléfono en USA
            </label>
            <input
              type="tel"
              id="telefonoUS"
              name="telefonoUS"
              value={formData.telefonoUS}
              onChange={handlePhoneChange}
              className={`input-sc ${errors.telefonoUS ? 'border-red-500' : ''}`}
              placeholder="+1 305 555 1234"
            />
            {errors.telefonoUS && (
              <p className="text-red-500 text-sm mt-1">{errors.telefonoUS}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Formato: +1 XXX XXX XXXX
            </p>
          </div>

          {/* Estado USA */}
          <div>
            <label htmlFor="estadoUS" className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline w-4 h-4 mr-1" />
              Estado donde resides
            </label>
            <select
              id="estadoUS"
              name="estadoUS"
              value={formData.estadoUS}
              onChange={handleChange}
              className={`input-sc ${errors.estadoUS ? 'border-red-500' : ''}`}
            >
              <option value="">Selecciona tu estado</option>
              {USA_STATES.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {errors.estadoUS && (
              <p className="text-red-500 text-sm mt-1">{errors.estadoUS}</p>
            )}
          </div>

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
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>💡 ¿Por qué necesitamos esto?</strong><br />
            Tu información de contacto nos permite enviarte confirmaciones y mantener 
            comunicación sobre el servicio de salud para tu familia en México.
          </p>
        </div>
      </main>
    </div>
  );
}
