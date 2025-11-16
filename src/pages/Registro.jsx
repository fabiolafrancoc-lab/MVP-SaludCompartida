import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, Shield, Clock, ArrowRight, Sparkles, Plus, X, UserPlus } from 'lucide-react';

export default function Registro() {
  const navigate = useNavigate();
  
  // Get user data from localStorage
  let storedUserData = null;
  try {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('accessUser') : null;
    if (stored) {
      storedUserData = JSON.parse(stored);
    }
  } catch (e) {
    storedUserData = null;
  }
  
  const [cuposRestantes, setCuposRestantes] = useState(47);
  const [formData, setFormData] = useState({
    nombre: storedUserData?.firstName || '',
    apellidoPaterno: storedUserData?.lastName || '',
    apellidoMaterno: storedUserData?.motherLastName || '',
    email: storedUserData?.email || '',
    telefono: storedUserData?.phone ? `+1 ${storedUserData.phone}` : '+1 ',
    estado: '',
    paisFamilia: 'Mexico'
  });

  const [familiares, setFamiliares] = useState([
    { nombre: '', telefono: '+52 ', relacion: '' }
  ]);

  const [errors, setErrors] = useState({});
  const [familiarErrors, setFamiliarErrors] = useState([]);

  // Simular reducción de cupos (FOMO)
  useEffect(() => {
    const interval = setInterval(() => {
      setCuposRestantes(prev => prev > 20 ? prev - 1 : prev);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    setFamiliarErrors([]);
    
    // Validate formData
    const newErrors = {};
    let hasErrors = false;
    
    if (!formData.nombre.trim()) { newErrors.nombre = true; hasErrors = true; }
    if (!formData.apellidoPaterno.trim()) { newErrors.apellidoPaterno = true; hasErrors = true; }
    if (!formData.email.trim()) { newErrors.email = true; hasErrors = true; }
    const cleanPhone = formData.telefono.replace(/\D/g, '');
    if (cleanPhone.length !== 11) { newErrors.telefono = true; hasErrors = true; }
    if (!formData.estado) { newErrors.estado = true; hasErrors = true; }
    if (!formData.paisFamilia) { newErrors.paisFamilia = true; hasErrors = true; }
    
    // Validate familiares
    const newFamiliarErrors = familiares.map(familiar => {
      const famErrors = {};
      if (!familiar.nombre.trim()) { famErrors.nombre = true; hasErrors = true; }
      const famPhone = familiar.telefono.replace(/\D/g, '');
      if (famPhone.length !== 12) { famErrors.telefono = true; hasErrors = true; }
      if (!familiar.relacion) { famErrors.relacion = true; hasErrors = true; }
      return famErrors;
    });
    
    if (hasErrors) {
      setErrors(newErrors);
      setFamiliarErrors(newFamiliarErrors);
      alert('Por favor completa todos los campos requeridos marcados en rojo');
      return;
    }
    
    navigate('/confirmacion', { state: { ...formData, familiares } });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFamiliarChange = (index, field, value) => {
    const newFamiliares = [...familiares];
    newFamiliares[index][field] = value;
    setFamiliares(newFamiliares);
  };

  const agregarFamiliar = () => {
    if (familiares.length < 4) {
      setFamiliares([...familiares, { nombre: '', telefono: '+52 ', relacion: '' }]);
    }
  };

  const eliminarFamiliar = (index) => {
    if (familiares.length > 1) {
      setFamiliares(familiares.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-pink-50">
      {/* Header con Logo */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Heart className="w-7 h-7 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SaludCompartida</h1>
              <p className="text-xs text-gray-500">Uniendo Familias</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Banner de Escasez */}
        <div className="mb-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 animate-pulse" />
              <div>
                <h2 className="text-2xl font-bold">¡Acceso Exclusivo Preventa!</h2>
                <p className="text-white/90">Sé de los primeros en proteger a tu familia</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl border-2 border-white/40">
              <div className="text-sm font-medium">Cupos disponibles</div>
              <div className="text-4xl font-bold">{cuposRestantes}</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Columna Izquierda: Beneficios */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Dale a tu familia el regalo de la salud
              </h3>
              <p className="text-lg text-gray-600">
                Por solo <span className="text-3xl font-bold text-cyan-600">$12-18/mes</span> protege hasta 4 personas
              </p>
            </div>

            {/* Imagen Hero */}
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=600&fit=crop" 
                alt="Familia feliz"
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Beneficios */}
            <div className="space-y-4">
              {[
                { icon: Users, title: 'Hasta 4 familiares', desc: 'Incluye a padres, hermanos o hijos' },
                { icon: Clock, title: 'Telemedicina 24/7', desc: 'Doctores disponibles cuando los necesites' },
                { icon: Shield, title: 'Activación instantánea', desc: '30 segundos vía WhatsApp' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Formulario */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Regístrate para acceso prioritario</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* TUS DATOS */}
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-semibold text-gray-700 mb-3">Tus datos (quien paga)</h4>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 transition ${
                      errors.nombre ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Tu nombre"
                  />
                  {errors.nombre && <p className="text-red-500 text-xs mt-1">Este campo es requerido</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apellido Paterno <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="apellidoPaterno"
                      required
                      value={formData.apellidoPaterno}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 transition ${
                        errors.apellidoPaterno ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {errors.apellidoPaterno && <p className="text-red-500 text-xs mt-1">Este campo es requerido</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apellido Materno <span className="text-gray-500 text-xs">(opcional)</span>
                    </label>
                    <input
                      type="text"
                      name="apellidoMaterno"
                      value={formData.apellidoMaterno}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 transition ${
                      errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">Este campo es requerido</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Teléfono (WhatsApp) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    required
                    value={formData.telefono}
                    onChange={handleChange}
                    minLength="12"
                    maxLength="15"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 transition ${
                      errors.telefono ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="+1 555 123 4567"
                  />
                  {errors.telefono ? (
                    <p className="text-red-500 text-xs mt-1">Ingresa un teléfono válido: +1 XXX XXX XXXX</p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">Formato: +1 XXX XXX XXXX</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado en EE.UU. <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="estado"
                    required
                    value={formData.estado}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 transition ${
                      errors.estado ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Selecciona tu estado</option>
                    <option value="Arizona">Arizona</option>
                    <option value="California">California</option>
                    <option value="Texas">Texas</option>
                    <option value="Florida">Florida</option>
                    <option value="New York">New York</option>
                    <option value="Illinois">Illinois</option>
                    <option value="Otro">Otro</option>
                  </select>
                  {errors.estado && <p className="text-red-500 text-xs mt-1">Selecciona tu estado</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Dónde vive tu familia? <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="paisFamilia"
                    required
                    value={formData.paisFamilia}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 transition ${
                      errors.paisFamilia ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="Mexico">México</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Honduras">Honduras</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Peru">Perú</option>
                    <option value="India">India</option>
                  </select>
                  {errors.paisFamilia && <p className="text-red-500 text-xs mt-1">Selecciona el país</p>}
                </div>

                {/* FAMILIARES */}
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <UserPlus className="w-5 h-5 text-cyan-600" />
                      <h4 className="font-semibold text-gray-700">Registra a tu familia ({familiares.length}/4)</h4>
                    </div>
                    {familiares.length < 4 && (
                      <button
                        type="button"
                        onClick={agregarFamiliar}
                        className="text-cyan-600 hover:text-cyan-700 font-medium text-sm flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        Agregar
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {familiares.map((familiar, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">Familiar {index + 1}</span>
                          {familiares.length > 1 && (
                            <button
                              type="button"
                              onClick={() => eliminarFamiliar(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <input
                          type="text"
                          required
                          value={familiar.nombre}
                          onChange={(e) => handleFamiliarChange(index, 'nombre', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 text-sm ${
                            familiarErrors[index]?.nombre ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="Nombre completo"
                        />
                        {familiarErrors[index]?.nombre && <p className="text-red-500 text-xs mt-1">Este campo es requerido</p>}

                        <div>
                          <input
                            type="tel"
                            required
                            value={familiar.telefono}
                            onChange={(e) => handleFamiliarChange(index, 'telefono', e.target.value)}
                            minLength="13"
                            maxLength="16"
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 text-sm ${
                              familiarErrors[index]?.telefono ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="+52 555 123 4567"
                          />
                          {familiarErrors[index]?.telefono ? (
                            <p className="text-red-500 text-xs mt-1">Teléfono válido: +52 XXX XXX XXXX</p>
                          ) : (
                            <p className="text-xs text-gray-500 mt-1">Formato: +52 XXX XXX XXXX</p>
                          )}
                        </div>

                        <div>
                          <select
                            required
                            value={familiar.relacion}
                            onChange={(e) => handleFamiliarChange(index, 'relacion', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 text-sm ${
                              familiarErrors[index]?.relacion ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Relación</option>
                            <option value="Madre">Madre</option>
                            <option value="Padre">Padre</option>
                            <option value="Hermano/a">Hermano/a</option>
                            <option value="Hijo/a">Hijo/a</option>
                            <option value="Esposo/a">Esposo/a</option>
                            <option value="Abuelo/a">Abuelo/a</option>
                            <option value="Otro">Otro</option>
                          </select>
                          {familiarErrors[index]?.relacion && <p className="text-red-500 text-xs mt-1">Selecciona la relación</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group mt-6"
                >
                  Asegurar mi lugar y el de mi familia
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-xs text-center text-gray-500">
                  Al registrarte, tú y tu familia recibirán códigos de acceso en 3 días hábiles
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}