import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PharmacyMap from './components/PharmacyMap';

export default function Pharmacy() {
  const navigate = useNavigate();
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const convenioNumber = 'SC-2025-8472';

  // Estados para el flujo de ubicación
  const [step, setStep] = useState('initial'); // initial, chooseMethod, manualAddress, showResults
  const [locationMethod, setLocationMethod] = useState(null); // 'manual' o 'current'
  const [addressData, setAddressData] = useState({
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    colonia: '',
    alcaldia: '',
    codigoPostal: '',
    ciudad: '',
    estado: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [selectedMedicine, setSelectedMedicine] = useState(null); // null, medicamento específico, o 'none'

  // Cargar nombre del usuario desde localStorage
  useEffect(() => {
    try {
      // Primero intentar con currentUser (nuevo sistema)
      let userData = null;
      const currentUserData = localStorage.getItem('currentUser');
      if (currentUserData) {
        userData = JSON.parse(currentUserData);
      } else {
        // Fallback a accessUser (sistema anterior)
        const accessUserData = localStorage.getItem('accessUser');
        if (accessUserData) {
          userData = JSON.parse(accessUserData);
        }
      }
      
      if (userData && userData.firstName) {
        setNombreUsuario(userData.firstName);
        setApellidoPaterno(userData.lastName || '');
      } else {
        setNombreUsuario('Usuario');
        setApellidoPaterno('SaludCompartida');
      }
    } catch (error) {
      console.error('Error cargando datos del usuario:', error);
      setNombreUsuario('Usuario');
      setApellidoPaterno('SaludCompartida');
    }
  }, []);

  // Datos de medicamentos con precios
  const medicamentos = [
    { nombre: 'Omeprazol', dosis: '20 mg, 30 cápsulas', benavides: 84.00, ahorro: 137.00, guadalajara: 41.50 },
    { nombre: 'Aspirina', dosis: '500 mg, 40 tabletas', benavides: 44.25, ahorro: 95.00, guadalajara: 50.85 },
    { nombre: 'Ibuprofeno', dosis: '400 mg, 20 cápsulas', benavides: 79.00, ahorro: 84.00, guadalajara: 74.00 },
    { nombre: 'Naproxeno', dosis: '500 mg, 20 tabletas', benavides: 67.00, ahorro: 53.50, guadalajara: 55.80 },
    { nombre: 'Losartán', dosis: '50 mg, 30 tabletas', benavides: 177.00, ahorro: 155.80, guadalajara: 158.00 }
  ];

  // Ofertas del día - Benavides
  const ofertasBenavides = [
    { producto: 'KleenBebé Suavelastic', presentacion: 'Recién Nacido, 40 unidades', precio: 160 },
    { producto: 'Huggies Supreme', presentacion: 'Etapa 4, 36 unidades', precio: 387 },
    { producto: 'Huggies Ultraconfort', presentacion: 'Etapa 5, 40 unidades', precio: 387 }
  ];

  // Ofertas del día - Guadalajara
  const ofertasGuadalajara = [
    { producto: 'Nido Pre-Escolar', presentacion: '2+ años, 1.5 kg', precio: 211 },
    { producto: "Johnson's Baby Original", presentacion: '200 ml', precio: 58 },
    { producto: "Smudy's Manzanilla", presentacion: '250 ml', precio: 19 },
    { producto: 'Mustela Shampoo Suave', presentacion: '500 ml', precio: 148.5 }
  ];

  // Ofertas del día - Del Ahorro
  const ofertasAhorro = [
    { producto: 'Acetona Marca del Ahorro', presentacion: '200 ml', precio: 48 },
    { producto: 'Naturella Nocturna', presentacion: '8 unidades', precio: 27.50 },
    { producto: 'Kotex Ultradelgada con Alas', presentacion: '10 piezas', precio: 25.50 },
    { producto: 'Always Ultra-Gel Nocturna', presentacion: '14 unidades', precio: 67 }
  ];

  // Funciones auxiliares
  const getMejorPrecio = (med) => {
    return Math.min(med.benavides, med.ahorro, med.guadalajara);
  };

  const getFarmaciaBarata = (med) => {
    const minPrice = getMejorPrecio(med);
    if (med.benavides === minPrice) return 'Benavides';
    if (med.ahorro === minPrice) return 'Del Ahorro';
    return 'Guadalajara';
  };

  const validateForm = () => {
    const errors = {};
    if (!addressData.calle.trim()) errors.calle = true;
    if (!addressData.numeroExterior.trim()) errors.numeroExterior = true;
    if (!addressData.colonia.trim()) errors.colonia = true;
    if (!addressData.alcaldia.trim()) errors.alcaldia = true;
    if (!addressData.codigoPostal.trim() || addressData.codigoPostal.length !== 5) errors.codigoPostal = true;
    if (!addressData.ciudad.trim()) errors.ciudad = true;
    if (!addressData.estado.trim()) errors.estado = true;
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handlers de navegación
  const handleShareLocation = () => {
    // Limpiar datos de dirección cuando se inicia el proceso
    setAddressData({
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      colonia: '',
      alcaldia: '',
      codigoPostal: '',
      ciudad: '',
      estado: ''
    });
    setFormErrors({});
    setSelectedMedicine(null);
    setStep('chooseMethod');
    setTimeout(() => {
      document.getElementById('location-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleChooseManual = () => {
    // Asegurar que el formulario esté limpio
    setAddressData({
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      colonia: '',
      alcaldia: '',
      codigoPostal: '',
      ciudad: '',
      estado: ''
    });
    setFormErrors({});
    setLocationMethod('manual');
    setStep('manualAddress');
    setTimeout(() => {
      document.getElementById('manual-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleChooseCurrent = () => {
    setLocationMethod('current');
    setStep('showResults');
    // Simular obtención de ubicación actual
    setAddressData({
      calle: 'Reforma',
      numeroExterior: '123',
      numeroInterior: '',
      colonia: 'Centro',
      alcaldia: 'Cuauhtémoc',
      codigoPostal: '06000',
      ciudad: 'Ciudad de México',
      estado: 'CDMX'
    });
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmitAddress = () => {
    if (validateForm()) {
      setStep('showResults');
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleVolver = () => {
    if (step === 'chooseMethod') {
      // Limpiar todo cuando se regresa al inicio
      setAddressData({
        calle: '',
        numeroExterior: '',
        numeroInterior: '',
        colonia: '',
        alcaldia: '',
        codigoPostal: '',
        ciudad: '',
        estado: ''
      });
      setFormErrors({});
      setSelectedMedicine(null);
      setStep('initial');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 'manualAddress') {
      // Limpiar formulario cuando se regresa a elegir método
      setAddressData({
        calle: '',
        numeroExterior: '',
        numeroInterior: '',
        colonia: '',
        alcaldia: '',
        codigoPostal: '',
        ciudad: '',
        estado: ''
      });
      setFormErrors({});
      setStep('chooseMethod');
      setTimeout(() => {
        document.getElementById('location-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (step === 'showResults') {
      if (locationMethod === 'manual') {
        setStep('manualAddress');
        setTimeout(() => {
          document.getElementById('manual-form')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        // Si vuelve desde current location, limpiar datos
        setAddressData({
          calle: '',
          numeroExterior: '',
          numeroInterior: '',
          colonia: '',
          alcaldia: '',
          codigoPostal: '',
          ciudad: '',
          estado: ''
        });
        setStep('chooseMethod');
        setTimeout(() => {
          document.getElementById('location-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
      navigate('/page4');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <img 
            src="/saludcompartida logo WT.png" 
            alt="SaludCompartida" 
            className="h-16 object-contain"
          />
          <button
            onClick={handleVolver}
            className="text-gray-600 hover:text-gray-900 font-medium text-lg transition-colors"
          >
            Volver
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* HERO SECTION CON VIDEOS */}
        <div className="mb-12">
          {nombreUsuario && nombreUsuario !== 'Usuario' && (
            <p className="text-center text-4xl md:text-5xl text-gray-700 mb-4">
              ¡Hola <span className="font-bold text-cyan-600">{nombreUsuario}</span>!
            </p>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
            Descuentos en Farmacias
          </h1>
          <p className="text-center text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            <span className="font-bold text-pink-600">40% - 75% de descuento</span> en productos farmacéuticos y no farmacéuticos
            <br />
            <span className="text-cyan-600 font-semibold">¡Descuento sobre descuento!</span>
          </p>

          {/* VIDEOS LADO A LADO */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* VIDEO 1 */}
            <div className="rounded-2xl shadow-2xl overflow-hidden bg-gray-900">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
                style={{ minHeight: '300px', maxHeight: '500px' }}
              >
                <source src="https://p0iccshbkx3s8qpk.public.blob.vercel-storage.com/pharmacy1.mov" type="video/mp4" />
              </video>
            </div>
            
            {/* VIDEO 2 */}
            <div className="rounded-2xl shadow-2xl overflow-hidden bg-gray-900">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
                style={{ minHeight: '300px', maxHeight: '500px' }}
              >
                <source src="https://p0iccshbkx3s8qpk.public.blob.vercel-storage.com/pharmacy2.mov" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        {/* TARJETA PREMIUM BLACK/PLATINUM */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Tu Tarjeta de Descuento Premium
          </h2>
          
          <div className="max-w-md mx-auto">
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-8 shadow-2xl border border-gray-700 overflow-hidden">
              
              {/* EFECTOS DE BRILLO */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-slate-400/20 to-transparent rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                {/* HEADER TARJETA */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-amber-400 font-bold text-sm tracking-wider mb-1">PLATINUM MEMBER</div>
                    <div className="text-white text-2xl font-bold">SaludCompartida</div>
                  </div>
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2">
                    {/* QR CODE PLACEHOLDER */}
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <rect x="0" y="0" width="20" height="20" fill="black"/>
                      <rect x="30" y="0" width="20" height="20" fill="black"/>
                      <rect x="60" y="0" width="20" height="20" fill="black"/>
                      <rect x="0" y="30" width="20" height="20" fill="black"/>
                      <rect x="60" y="30" width="20" height="20" fill="black"/>
                      <rect x="0" y="60" width="20" height="20" fill="black"/>
                      <rect x="30" y="60" width="20" height="20" fill="black"/>
                      <rect x="60" y="60" width="20" height="20" fill="black"/>
                    </svg>
                  </div>
                </div>

                {/* NOMBRE USUARIO */}
                <div className="mb-6">
                  <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Titular</div>
                  <div className="text-white text-xl font-semibold tracking-wide">
                    {nombreUsuario} {apellidoPaterno}
                  </div>
                </div>

                {/* CONVENIO */}
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Convenio</div>
                    <div className="text-amber-400 text-lg font-mono font-bold">{convenioNumber}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 text-xs mb-1">Red de farmacias</div>
                    <div className="text-white font-bold text-2xl">+1,700</div>
                  </div>
                </div>
              </div>
            </div>

            {/* INSTRUCCIONES USO */}
            <div className="mt-4 bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded-r-lg">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-cyan-700">💡 Cómo usar:</span> Muestra esta tarjeta o código QR en farmacia para aplicar tu descuento
              </p>
            </div>
          </div>
        </div>

        {/* VENTAJA COMPETITIVA */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-8 mb-12 text-white shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-2xl font-bold">Descuento sobre Descuento</h3>
          </div>
          <p className="text-lg leading-relaxed">
            ¿Ya tienes descuentos en tu farmacia favorita? <span className="font-bold">¡Perfecto!</span> Nuestro descuento se aplica <span className="font-bold underline">sobre el precio ya rebajado</span>. Maximiza tus ahorros en cada compra.
          </p>
        </div>

        {/* CATEGORÍAS DE PRODUCTOS */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Descuentos en Todo lo que Necesitas
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* PRODUCTOS FARMACÉUTICOS */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-cyan-100">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-10 h-10 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-800">Productos Farmacéuticos</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-cyan-600 font-bold">✓</span> Medicamentos con receta
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-600 font-bold">✓</span> Medicamentos de libre venta
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-600 font-bold">✓</span> Vitaminas y suplementos
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-600 font-bold">✓</span> Material de curación
                </li>
              </ul>
            </div>

            {/* PRODUCTOS NO FARMACÉUTICOS */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-pink-100">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-800">Productos del Hogar</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-pink-600 font-bold">✓</span> Cosméticos y maquillaje
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-pink-600 font-bold">✓</span> Productos de higiene
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-pink-600 font-bold">✓</span> Bebidas y snacks
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-pink-600 font-bold">✓</span> Pañales, leche y mucho más!
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BUSCADOR DE UBICACIÓN */}
        <div className="mb-12" id="pharmacy-finder-section">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Encuentra Farmacias Cerca de Ti
          </h2>

          {step === 'initial' && (
            <div className="max-w-md mx-auto bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 shadow-xl text-center border-2 border-cyan-200">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-5xl">📍</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">¿Compartir mi ubicación?</h3>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Te mostraremos las farmacias más cercanas con los mejores descuentos
              </p>
              <button
                onClick={handleShareLocation}
                className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Compartir Ubicación
              </button>
              <p className="text-sm text-gray-600 mt-4 italic">
                🔒 Tu privacidad es importante. Solo usamos tu ubicación para este propósito.
              </p>
            </div>
          )}

          {/* SELECCIÓN DE MÉTODO DE UBICACIÓN */}
          {step === 'chooseMethod' && (
            <div id="location-section" className="max-w-4xl mx-auto space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
                ¿Cómo quieres proporcionar tu ubicación?
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* OPCIÓN MANUAL */}
                <div 
                  onClick={handleChooseManual}
                  className="bg-gradient-to-br from-white to-cyan-50 rounded-2xl p-10 shadow-xl border-2 border-cyan-200 hover:border-cyan-500 cursor-pointer transition-all hover:shadow-2xl group transform hover:scale-105"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-4xl">✍️</span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-3 text-center">Ingresa tu Dirección</h4>
                  <p className="text-gray-600 text-center text-lg">
                    Escribe manualmente tu dirección completa
                  </p>
                </div>

                {/* OPCIÓN UBICACIÓN ACTUAL */}
                <div 
                  onClick={handleChooseCurrent}
                  className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-10 shadow-xl border-2 border-pink-200 hover:border-pink-500 cursor-pointer transition-all hover:shadow-2xl group transform hover:scale-105"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-4xl">📱</span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-3 text-center">Compartir mi Ubicación Actual</h4>
                  <p className="text-gray-600 text-center text-lg">
                    Detectamos automáticamente dónde te encuentras
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* FORMULARIO DE DIRECCIÓN MANUAL */}
          {step === 'manualAddress' && (
            <div id="manual-form" className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                Ingresa tu Dirección
              </h3>
              
              <div className="space-y-4">
                {/* Calle */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Calle <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={addressData.calle}
                    onChange={(e) => setAddressData({...addressData, calle: e.target.value})}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${formErrors.calle ? 'border-red-500' : 'border-gray-300'} focus:border-cyan-500 focus:outline-none`}
                    placeholder="Ej: Reforma"
                  />
                  <p className="text-xs text-gray-500 mt-1">Ejemplo: Reforma</p>
                </div>

                {/* Número Exterior e Interior */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Número Exterior <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={addressData.numeroExterior}
                      onChange={(e) => setAddressData({...addressData, numeroExterior: e.target.value})}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${formErrors.numeroExterior ? 'border-red-500' : 'border-gray-300'} focus:border-cyan-500 focus:outline-none`}
                      placeholder="123"
                    />
                    <p className="text-xs text-gray-500 mt-1">Ejemplo: 123</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Número Interior
                    </label>
                    <input
                      type="text"
                      value={addressData.numeroInterior}
                      onChange={(e) => setAddressData({...addressData, numeroInterior: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-cyan-500 focus:outline-none"
                      placeholder="Apto 4B"
                    />
                    <p className="text-xs text-gray-500 mt-1">Ejemplo: Apto 4B (opcional)</p>
                  </div>
                </div>

                {/* Colonia y Alcaldía */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Colonia <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={addressData.colonia}
                      onChange={(e) => setAddressData({...addressData, colonia: e.target.value})}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${formErrors.colonia ? 'border-red-500' : 'border-gray-300'} focus:border-cyan-500 focus:outline-none`}
                      placeholder="Centro"
                    />
                    <p className="text-xs text-gray-500 mt-1">Ejemplo: Centro</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Alcaldía/Municipio <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={addressData.alcaldia}
                      onChange={(e) => setAddressData({...addressData, alcaldia: e.target.value})}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${formErrors.alcaldia ? 'border-red-500' : 'border-gray-300'} focus:border-cyan-500 focus:outline-none`}
                      placeholder="Cuauhtémoc"
                    />
                    <p className="text-xs text-gray-500 mt-1">Ejemplo: Cuauhtémoc</p>
                  </div>
                </div>

                {/* Código Postal, Ciudad y Estado */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Código Postal <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      maxLength={5}
                      value={addressData.codigoPostal}
                      onChange={(e) => setAddressData({...addressData, codigoPostal: e.target.value})}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${formErrors.codigoPostal ? 'border-red-500' : 'border-gray-300'} focus:border-cyan-500 focus:outline-none`}
                      placeholder="06000"
                    />
                    <p className="text-xs text-gray-500 mt-1">Ejemplo: 06000</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ciudad <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={addressData.ciudad}
                      onChange={(e) => setAddressData({...addressData, ciudad: e.target.value})}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${formErrors.ciudad ? 'border-red-500' : 'border-gray-300'} focus:border-cyan-500 focus:outline-none`}
                      placeholder="Ciudad de México"
                    />
                    <p className="text-xs text-gray-500 mt-1">Ejemplo: CDMX</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Estado <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={addressData.estado}
                      onChange={(e) => setAddressData({...addressData, estado: e.target.value})}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${formErrors.estado ? 'border-red-500' : 'border-gray-300'} focus:border-cyan-500 focus:outline-none`}
                      placeholder="CDMX"
                    />
                    <p className="text-xs text-gray-500 mt-1">Ejemplo: CDMX</p>
                  </div>
                </div>

                {/* Botón Buscar */}
                <button
                  onClick={handleSubmitAddress}
                  className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl mt-6"
                >
                  Buscar Farmacias
                </button>
              </div>
            </div>
          )}

          {/* VISTA DE RESULTADOS */}
          {step === 'showResults' && (
            <div id="results-section" className="space-y-6">
              {/* Dirección Actual */}
              <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded-r-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-bold">📍 Ubicación:</span> {addressData.calle} {addressData.numeroExterior}, {addressData.colonia}, {addressData.alcaldia}, {addressData.codigoPostal}
                </p>
              </div>

              {/* Layout 50/50 */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* COLUMNA IZQUIERDA: MAPA */}
                <div className="bg-white rounded-xl p-6 shadow-xl">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Mapa de Farmacias</h3>
                  
                  {/* GOOGLE MAPS */}
                  <PharmacyMap 
                    selectedMedicine={selectedMedicine}
                    address={addressData}
                  />
                </div>

                {/* COLUMNA DERECHA: TABLAS DE PRECIOS Y OFERTAS */}
                <div className="space-y-6">
                  {/* TABLA DE MEDICAMENTOS */}
                  <div className="bg-white rounded-xl p-6 shadow-xl">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Compara Precios de Medicamentos</h3>
                    <p className="text-sm text-gray-600 mb-4">Precios en MX$</p>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2 border-gray-200">
                            <th className="text-left py-3 px-2 font-bold text-gray-700">Medicamento</th>
                            <th className="text-center py-3 px-2 font-bold text-red-600">Benavides</th>
                            <th className="text-center py-3 px-2 font-bold text-red-600">Guadalajara</th>
                            <th className="text-center py-3 px-2 font-bold text-green-600">Del Ahorro</th>
                          </tr>
                        </thead>
                        <tbody>
                          {medicamentos.map((med, idx) => {
                            const mejorPrecio = getMejorPrecio(med);
                            const farmaciaBarata = getFarmaciaBarata(med);
                            return (
                              <tr 
                                key={idx}
                                onClick={() => setSelectedMedicine(med.nombre)}
                                className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                                  selectedMedicine === med.nombre ? 'bg-cyan-50' : ''
                                }`}
                              >
                                <td className="py-3 px-2 font-semibold text-gray-800">
                                  {med.nombre}
                                  {selectedMedicine === med.nombre && (
                                    <span className="ml-2 text-cyan-600">←</span>
                                  )}
                                </td>
                                <td className={`text-center py-3 px-2 font-bold ${
                                  farmaciaBarata === 'Benavides' ? 'text-pink-600' : 'text-gray-600'
                                }`}>
                                  ${med.benavides.toFixed(2)}
                                </td>
                                <td className={`text-center py-3 px-2 font-bold ${
                                  farmaciaBarata === 'Guadalajara' ? 'text-pink-600' : 'text-gray-600'
                                }`}>
                                  ${med.guadalajara.toFixed(2)}
                                </td>
                                <td className={`text-center py-3 px-2 font-bold ${
                                  farmaciaBarata === 'Del Ahorro' ? 'text-pink-600' : 'text-gray-600'
                                }`}>
                                  ${med.ahorro.toFixed(2)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <p className="text-xs text-gray-500 mt-4 text-center italic">
                      Haz clic en un medicamento para ver su ubicación en el mapa
                    </p>
                  </div>

                  {/* OFERTAS ESPECIALES BENAVIDES */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg border-2 border-blue-200">
                    <h4 className="text-lg font-bold text-blue-800 mb-3">
                      Ofertas Benavides
                    </h4>
                    <div className="space-y-2">
                      {ofertasBenavides.map((oferta, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-3 shadow-sm">
                          <p className="text-sm font-semibold text-gray-800">{oferta.producto}</p>
                          <p className="text-xs text-gray-600 mt-1">{oferta.presentacion} - ${oferta.precio}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* OFERTAS ESPECIALES GUADALAJARA */}
                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 shadow-lg border-2 border-red-200">
                    <h4 className="text-lg font-bold text-red-800 mb-3">
                      Ofertas Guadalajara
                    </h4>
                    <div className="space-y-2">
                      {ofertasGuadalajara.map((oferta, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-3 shadow-sm">
                          <p className="text-sm font-semibold text-gray-800">{oferta.producto}</p>
                          <p className="text-xs text-gray-600 mt-1">{oferta.presentacion} - ${oferta.precio}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* OFERTAS ESPECIALES DEL AHORRO */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-lg border-2 border-green-200">
                    <h4 className="text-lg font-bold text-green-800 mb-3">
                      Ofertas Del Ahorro
                    </h4>
                    <div className="space-y-2">
                      {ofertasAhorro.map((oferta, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-3 shadow-sm">
                          <p className="text-sm font-semibold text-gray-800">{oferta.producto}</p>
                          <p className="text-xs text-gray-600 mt-1">{oferta.presentacion} - ${oferta.precio}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA FINAL - SIN BOTÓN VOLVER */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-center text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-3">Empieza a Ahorrar Hoy</h3>
          <p className="text-xl mb-6 text-gray-300">
            En promedio, nuestros usuarios ahorran <span className="font-bold text-amber-400">$2,500 MXN al mes</span> en farmacias
          </p>
        </div>

        {/* Consultas Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate('/contact');
            }}
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ¿Tienes Consultas?
          </button>
        </div>

      </main>


    </div>
  );
}