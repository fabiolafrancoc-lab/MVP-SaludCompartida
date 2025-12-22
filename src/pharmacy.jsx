import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PharmacyMap from './components/PharmacyMap';
import TopNav from './components/TopNav';
import { LightbulbIcon } from './components/CustomIcons';

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
      {/* Header with Navigation Menu */}
      <TopNav internalPage={true} showBackButton={true} onBack={() => navigate('/page4')} />

      <main className="max-w-6xl mx-auto px-safe py-safe">
        
        {/* HERO SECTION CON VIDEOS */}
        <div className="mb-12">
          {nombreUsuario && nombreUsuario !== 'Usuario' && (
            <p className="text-center text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl text-gray-700 mb-4">
              ¡Hola <span className="font-bold text-cyan-600">{nombreUsuario}</span>!
            </p>
          )}
          <h1 className="text-lg md:text-3xl lg:text-4xl md:text-base md:text-2xl lg:text-3xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
            Descuentos en Farmacias
          </h1>
          <p className="text-center text-lg md:text-3xl lg:text-4xl text-gray-600 mb-8 max-w-3xl mx-auto">
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

        {/* SECCIÓN QR DIARIO POR WHATSAPP */}
        <div className="mb-12">
          <h2 className="text-base md:text-2xl lg:text-3xl font-bold text-gray-800 mb-6 text-center">
            ¡Todos los días te enviaremos QR's vía WhatsApp para que los uses diariamente!
          </h2>
          
          <div className="max-w-md mx-auto">
            {/* QR CODE REALISTA */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-cyan-500">
              <div className="flex flex-col items-center">
                <div className="mb-4">
                  <p className="text-center text-gray-700 font-semibold text-lg md:text-3xl lg:text-4xl mb-2">
                    Recibe tu QR del día por WhatsApp
                  </p>
                  <p className="text-center text-gray-500 text-sm">
                    Cada mañana recibirás un código único
                  </p>
                </div>
                
                {/* QR CODE SVG REALISTA */}
                <div className="bg-white p-4 rounded-xl border-4 border-gray-800">
                  <svg viewBox="0 0 200 200" className="w-48 h-48">
                    {/* Esquinas de posicionamiento (3 grandes) */}
                    {/* Superior izquierda */}
                    <rect x="0" y="0" width="60" height="60" fill="none" stroke="black" strokeWidth="8"/>
                    <rect x="16" y="16" width="28" height="28" fill="black"/>
                    
                    {/* Superior derecha */}
                    <rect x="140" y="0" width="60" height="60" fill="none" stroke="black" strokeWidth="8"/>
                    <rect x="156" y="16" width="28" height="28" fill="black"/>
                    
                    {/* Inferior izquierda */}
                    <rect x="0" y="140" width="60" height="60" fill="none" stroke="black" strokeWidth="8"/>
                    <rect x="16" y="156" width="28" height="28" fill="black"/>
                    
                    {/* Patrón de datos realista - Fila 1 */}
                    <rect x="70" y="0" width="8" height="8" fill="black"/>
                    <rect x="86" y="0" width="8" height="8" fill="black"/>
                    <rect x="94" y="0" width="8" height="8" fill="black"/>
                    <rect x="110" y="0" width="8" height="8" fill="black"/>
                    <rect x="126" y="0" width="8" height="8" fill="black"/>
                    
                    {/* Fila 2 */}
                    <rect x="70" y="8" width="8" height="8" fill="black"/>
                    <rect x="86" y="8" width="8" height="8" fill="black"/>
                    <rect x="102" y="8" width="8" height="8" fill="black"/>
                    <rect x="118" y="8" width="8" height="8" fill="black"/>
                    
                    {/* Fila 3 */}
                    <rect x="70" y="16" width="8" height="8" fill="black"/>
                    <rect x="78" y="16" width="8" height="8" fill="black"/>
                    <rect x="94" y="16" width="8" height="8" fill="black"/>
                    <rect x="110" y="16" width="8" height="8" fill="black"/>
                    <rect x="126" y="16" width="8" height="8" fill="black"/>
                    
                    {/* Fila 4 */}
                    <rect x="70" y="24" width="8" height="8" fill="black"/>
                    <rect x="86" y="24" width="8" height="8" fill="black"/>
                    <rect x="102" y="24" width="8" height="8" fill="black"/>
                    <rect x="118" y="24" width="8" height="8" fill="black"/>
                    <rect x="126" y="24" width="8" height="8" fill="black"/>
                    
                    {/* Fila 5 */}
                    <rect x="70" y="32" width="8" height="8" fill="black"/>
                    <rect x="78" y="32" width="8" height="8" fill="black"/>
                    <rect x="94" y="32" width="8" height="8" fill="black"/>
                    <rect x="102" y="32" width="8" height="8" fill="black"/>
                    <rect x="126" y="32" width="8" height="8" fill="black"/>
                    
                    {/* Patrón lateral derecho */}
                    <rect x="70" y="70" width="8" height="8" fill="black"/>
                    <rect x="78" y="70" width="8" height="8" fill="black"/>
                    <rect x="94" y="70" width="8" height="8" fill="black"/>
                    <rect x="110" y="70" width="8" height="8" fill="black"/>
                    <rect x="126" y="70" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="78" width="8" height="8" fill="black"/>
                    <rect x="86" y="78" width="8" height="8" fill="black"/>
                    <rect x="102" y="78" width="8" height="8" fill="black"/>
                    <rect x="118" y="78" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="86" width="8" height="8" fill="black"/>
                    <rect x="78" y="86" width="8" height="8" fill="black"/>
                    <rect x="94" y="86" width="8" height="8" fill="black"/>
                    <rect x="110" y="86" width="8" height="8" fill="black"/>
                    <rect x="126" y="86" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="94" width="8" height="8" fill="black"/>
                    <rect x="86" y="94" width="8" height="8" fill="black"/>
                    <rect x="94" y="94" width="8" height="8" fill="black"/>
                    <rect x="110" y="94" width="8" height="8" fill="black"/>
                    <rect x="118" y="94" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="102" width="8" height="8" fill="black"/>
                    <rect x="78" y="102" width="8" height="8" fill="black"/>
                    <rect x="94" y="102" width="8" height="8" fill="black"/>
                    <rect x="102" y="102" width="8" height="8" fill="black"/>
                    <rect x="126" y="102" width="8" height="8" fill="black"/>
                    
                    {/* Patrón central complejo */}
                    <rect x="70" y="110" width="8" height="8" fill="black"/>
                    <rect x="86" y="110" width="8" height="8" fill="black"/>
                    <rect x="102" y="110" width="8" height="8" fill="black"/>
                    <rect x="118" y="110" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="118" width="8" height="8" fill="black"/>
                    <rect x="78" y="118" width="8" height="8" fill="black"/>
                    <rect x="94" y="118" width="8" height="8" fill="black"/>
                    <rect x="110" y="118" width="8" height="8" fill="black"/>
                    <rect x="126" y="118" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="126" width="8" height="8" fill="black"/>
                    <rect x="86" y="126" width="8" height="8" fill="black"/>
                    <rect x="102" y="126" width="8" height="8" fill="black"/>
                    <rect x="118" y="126" width="8" height="8" fill="black"/>
                    <rect x="126" y="126" width="8" height="8" fill="black"/>
                    
                    {/* Patrón inferior */}
                    <rect x="70" y="140" width="8" height="8" fill="black"/>
                    <rect x="78" y="140" width="8" height="8" fill="black"/>
                    <rect x="94" y="140" width="8" height="8" fill="black"/>
                    <rect x="110" y="140" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="148" width="8" height="8" fill="black"/>
                    <rect x="86" y="148" width="8" height="8" fill="black"/>
                    <rect x="102" y="148" width="8" height="8" fill="black"/>
                    <rect x="118" y="148" width="8" height="8" fill="black"/>
                    <rect x="126" y="148" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="156" width="8" height="8" fill="black"/>
                    <rect x="78" y="156" width="8" height="8" fill="black"/>
                    <rect x="94" y="156" width="8" height="8" fill="black"/>
                    <rect x="102" y="156" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="164" width="8" height="8" fill="black"/>
                    <rect x="86" y="164" width="8" height="8" fill="black"/>
                    <rect x="94" y="164" width="8" height="8" fill="black"/>
                    <rect x="110" y="164" width="8" height="8" fill="black"/>
                    <rect x="126" y="164" width="8" height="8" fill="black"/>
                    
                    <rect x="70" y="172" width="8" height="8" fill="black"/>
                    <rect x="78" y="172" width="8" height="8" fill="black"/>
                    <rect x="94" y="172" width="8" height="8" fill="black"/>
                    <rect x="118" y="172" width="8" height="8" fill="black"/>
                    
                    {/* Más patrones en esquina inferior derecha */}
                    <rect x="140" y="70" width="8" height="8" fill="black"/>
                    <rect x="156" y="70" width="8" height="8" fill="black"/>
                    <rect x="172" y="70" width="8" height="8" fill="black"/>
                    <rect x="188" y="70" width="8" height="8" fill="black"/>
                    
                    <rect x="140" y="78" width="8" height="8" fill="black"/>
                    <rect x="148" y="78" width="8" height="8" fill="black"/>
                    <rect x="164" y="78" width="8" height="8" fill="black"/>
                    <rect x="180" y="78" width="8" height="8" fill="black"/>
                    
                    <rect x="140" y="86" width="8" height="8" fill="black"/>
                    <rect x="156" y="86" width="8" height="8" fill="black"/>
                    <rect x="172" y="86" width="8" height="8" fill="black"/>
                    <rect x="188" y="86" width="8" height="8" fill="black"/>
                    
                    <rect x="140" y="94" width="8" height="8" fill="black"/>
                    <rect x="148" y="94" width="8" height="8" fill="black"/>
                    <rect x="164" y="94" width="8" height="8" fill="black"/>
                    <rect x="172" y="94" width="8" height="8" fill="black"/>
                    
                    <rect x="140" y="102" width="8" height="8" fill="black"/>
                    <rect x="156" y="102" width="8" height="8" fill="black"/>
                    <rect x="164" y="102" width="8" height="8" fill="black"/>
                    <rect x="188" y="102" width="8" height="8" fill="black"/>
                    
                    <rect x="140" y="110" width="8" height="8" fill="black"/>
                    <rect x="148" y="110" width="8" height="8" fill="black"/>
                    <rect x="172" y="110" width="8" height="8" fill="black"/>
                    <rect x="180" y="110" width="8" height="8" fill="black"/>
                    
                    <rect x="140" y="118" width="8" height="8" fill="black"/>
                    <rect x="156" y="118" width="8" height="8" fill="black"/>
                    <rect x="164" y="118" width="8" height="8" fill="black"/>
                    <rect x="188" y="118" width="8" height="8" fill="black"/>
                    
                    <rect x="140" y="126" width="8" height="8" fill="black"/>
                    <rect x="148" y="126" width="8" height="8" fill="black"/>
                    <rect x="172" y="126" width="8" height="8" fill="black"/>
                    <rect x="180" y="126" width="8" height="8" fill="black"/>
                    
                    {/* Patrón lateral izquierdo inferior */}
                    <rect x="0" y="70" width="8" height="8" fill="black"/>
                    <rect x="16" y="70" width="8" height="8" fill="black"/>
                    <rect x="32" y="70" width="8" height="8" fill="black"/>
                    <rect x="48" y="70" width="8" height="8" fill="black"/>
                    
                    <rect x="0" y="78" width="8" height="8" fill="black"/>
                    <rect x="8" y="78" width="8" height="8" fill="black"/>
                    <rect x="24" y="78" width="8" height="8" fill="black"/>
                    <rect x="40" y="78" width="8" height="8" fill="black"/>
                    
                    <rect x="0" y="86" width="8" height="8" fill="black"/>
                    <rect x="16" y="86" width="8" height="8" fill="black"/>
                    <rect x="32" y="86" width="8" height="8" fill="black"/>
                    <rect x="48" y="86" width="8" height="8" fill="black"/>
                    
                    <rect x="0" y="94" width="8" height="8" fill="black"/>
                    <rect x="8" y="94" width="8" height="8" fill="black"/>
                    <rect x="24" y="94" width="8" height="8" fill="black"/>
                    <rect x="32" y="94" width="8" height="8" fill="black"/>
                    
                    <rect x="0" y="102" width="8" height="8" fill="black"/>
                    <rect x="16" y="102" width="8" height="8" fill="black"/>
                    <rect x="24" y="102" width="8" height="8" fill="black"/>
                    <rect x="48" y="102" width="8" height="8" fill="black"/>
                    
                    <rect x="0" y="110" width="8" height="8" fill="black"/>
                    <rect x="8" y="110" width="8" height="8" fill="black"/>
                    <rect x="32" y="110" width="8" height="8" fill="black"/>
                    <rect x="40" y="110" width="8" height="8" fill="black"/>
                    
                    <rect x="0" y="118" width="8" height="8" fill="black"/>
                    <rect x="16" y="118" width="8" height="8" fill="black"/>
                    <rect x="24" y="118" width="8" height="8" fill="black"/>
                    <rect x="48" y="118" width="8" height="8" fill="black"/>
                    
                    <rect x="0" y="126" width="8" height="8" fill="black"/>
                    <rect x="8" y="126" width="8" height="8" fill="black"/>
                    <rect x="32" y="126" width="8" height="8" fill="black"/>
                    <rect x="40" y="126" width="8" height="8" fill="black"/>
                    
                    {/* Más detalles en esquinas inferiores */}
                    <rect x="140" y="140" width="8" height="8" fill="black"/>
                    <rect x="156" y="140" width="8" height="8" fill="black"/>
                    <rect x="172" y="140" width="8" height="8" fill="black"/>
                    <rect x="188" y="140" width="8" height="8" fill="black"/>
                    
                    <rect x="140" y="172" width="8" height="8" fill="black"/>
                    <rect x="148" y="172" width="8" height="8" fill="black"/>
                    <rect x="164" y="172" width="8" height="8" fill="black"/>
                    <rect x="180" y="172" width="8" height="8" fill="black"/>
                    
                    <rect x="140" y="188" width="8" height="8" fill="black"/>
                    <rect x="156" y="188" width="8" height="8" fill="black"/>
                    <rect x="172" y="188" width="8" height="8" fill="black"/>
                    <rect x="188" y="188" width="8" height="8" fill="black"/>
                  </svg>
                </div>
                
                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="font-semibold">WhatsApp</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Código actualizado diariamente
                  </p>
                </div>
              </div>
            </div>

            {/* INSTRUCCIONES USO ACTUALIZADO */}
            <div className="mt-4 bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded-r-lg">
              <p className="text-sm text-gray-700 flex items-center gap-2">
                <LightbulbIcon className="w-5 h-5 text-cyan-700 flex-shrink-0" />
                <span><span className="font-bold text-cyan-700">Cómo usar:</span> Muestra el QR que recibes diariamente por WhatsApp en cualquier farmacia para aplicar tu descuento</span>
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
            <h3 className="text-sm md:text-lg lg:text-xl font-bold">Descuento sobre Descuento</h3>
          </div>
          <p className="text-sm md:text-base lg:text-lg leading-relaxed">
            ¿Ya tienes descuentos en tu farmacia favorita? <span className="font-bold">¡Perfecto!</span> Nuestro descuento se aplica <span className="font-bold underline">sobre el precio ya rebajado</span>. Maximiza tus ahorros en cada compra.
          </p>
        </div>

        {/* CATEGORÍAS DE PRODUCTOS */}
        <div className="mb-12">
          <h2 className="text-base md:text-xl lg:text-2xl font-bold text-gray-800 mb-6 text-center">
            Descuentos en Todo lo que Necesitas
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* PRODUCTOS FARMACÉUTICOS */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-cyan-100">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-10 h-10 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-800">Productos Farmacéuticos</h3>
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
                <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-800">Productos del Hogar</h3>
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



        {/* CTA FINAL - SIN BOTÓN VOLVER */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-center text-white shadow-2xl">
          <h3 className="text-base md:text-xl lg:text-2xl font-bold mb-3">Empieza a Ahorrar Hoy</h3>
          <p className="text-sm md:text-base lg:text-lg mb-6 text-gray-300">
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
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl font-bold text-sm md:text-base lg:text-lg shadow-lg hover:shadow-xl transition-all"
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