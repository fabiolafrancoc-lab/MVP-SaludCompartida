# Especificación del Flujo de Ubicación en Pharmacy.jsx

## Resumen del Proyecto
Implementar un sistema completo de búsqueda de farmacias con dos métodos de ubicación, visualización de medicamentos con precios comparativos, mapa integrado y ofertas especiales del día.

## Estados Necesarios

```javascript
const [step, setStep] = useState('initial'); 
// Valores: 'initial', 'chooseMethod', 'manualAddress', 'showResults'

const [locationMethod, setLocationMethod] = useState(null); 
// Valores: null, 'manual', 'current'

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

const [selectedMedicine, setSelectedMedicine] = useState(null); 
// Valores: null, objeto medicamento, 'none'
```

## Datos Estáticos

### Medicamentos con Precios
```javascript
const medicamentos = [
  { nombre: 'Omeprazol', dosis: '20 mg, 30 cápsulas', benavides: 84, ahorro: 137, guadalajara: 41.50 },
  { nombre: 'Aspirina', dosis: '500 mg, 40 tabletas', benavides: 50, ahorro: 95, guadalajara: 44.25 },
  { nombre: 'Ibuprofeno', dosis: '400 mg, 20 cápsulas', benavides: 79, ahorro: 84, guadalajara: 30 },
  { nombre: 'Naproxeno', dosis: '500 mg, 20 tabletas', benavides: 67, ahorro: 67, guadalajara: 42.50 },
  { nombre: 'Losartán', dosis: '50 mg, 30 tabletas', benavides: 177, ahorro: 181, guadalajara: 158 }
];
```

### Ofertas del Día - Benavides
```javascript
const ofertasBenavides = [
  { producto: 'KleenBebé Suavelastic', presentacion: 'Recién Nacido, 40 unidades', precio: 160 },
  { producto: 'Huggies Supreme', presentacion: 'Etapa 4, 36 unidades', precio: 387 },
  { producto: 'Huggies Ultraconfort', presentacion: 'Etapa 5, 40 unidades', precio: 387 }
];
```

### Ofertas del Día - Guadalajara
```javascript
const ofertasGuadalajara = [
  { producto: 'Nido Pre-Escolar', presentacion: '2+ años, 1.5 kg', precio: 211 },
  { producto: "Johnson's Baby Original", presentacion: '200 ml', precio: 58 },
  { producto: "Smudy's Manzanilla", presentacion: '250 ml', precio: 19 },
  { producto: 'Mustela Shampoo Suave', presentacion: '500 ml', precio: 148.5 }
];
```

### Ofertas del Día - Del Ahorro
```javascript
const ofertasAhorro = [
  { producto: 'Acetona Marca del Ahorro', presentacion: '200 ml', precio: 48 },
  { producto: 'Naturella Nocturna', presentacion: '8 unidades', precio: 27.50 },
  { producto: 'Kotex Ultradelgada con Alas', presentacion: '10 piezas', precio: 25.50 },
  { producto: 'Always Ultra-Gel Nocturna', presentacion: '14 unidades', precio: 67 }
];
```

## Flujo de Navegación

### PASO 1: Pantalla Inicial (step === 'initial')
- Mostrar hero con videos
- Mostrar tarjeta premium
- Botón "Compartir Ubicación" → setStep('chooseMethod')

### PASO 2: Elegir Método (step === 'chooseMethod')
Dos opciones lado a lado:
1. **"Ingresa tu Dirección"** → setStep('manualAddress'), setLocationMethod('manual')
2. **"Compartir mi Ubicación Actual"** → setStep('showResults'), setLocationMethod('current')

### PASO 3: Formulario Manual (step === 'manualAddress')
Campos obligatorios:
- Calle
- Número Exterior  
- Número Interior (opcional)
- Colonia
- Alcaldía o municipio
- Código Postal (5 dígitos)
- Ciudad
- Estado

Ejemplo en gris:
"Por ejemplo: Calle Reforma 123, Colonia Centro, Alcaldía Cuauhtémoc, 06000, Ciudad de México, CDMX."

Botón: "Buscar Farmacias Cercanas" → valida y va a setStep('showResults')

### PASO 4: Resultados (step === 'showResults')

#### Vista de 2 Columnas:

**Columna Izquierda (50%):** Google Maps
- Si `selectedMedicine === null`: Mostrar mensaje "Selecciona un medicamento"
- Si `selectedMedicine === 'none'`: Mostrar 3 farmacias con íconos CIAN
- Si `selectedMedicine === medicamento`: Mostrar 1 farmacia con ícono MAGENTA (la más barata)

**Columna Derecha (50%):**

1. **Tabla de Medicamentos** (si `selectedMedicine === null`)
   - Tabla con 5 medicamentos + opción "No"
   - Botones "Elegir" en cada fila
   - Resaltar precio más bajo en verde

2. **Resultados según selección:**
   
   Si eligió medicamento específico:
   - Mostrar dirección de la farmacia más barata
   - Mostrar ofertas especiales del día

   Si eligió "No":
   - Mostrar 3 direcciones de farmacias cercanas
   - Mostrar ofertas especiales del día

## Sección de Ofertas Especiales

Siempre visible cuando `step === 'showResults'`:

```jsx
<div className="ofertas">
  <h3>Ofertas Especiales del Día de Hoy</h3>
  <p>Ahorra más con SaludCompartida</p>
  
  <section>
    <h4>Hoy Descuento Especial en Farmacias Benavides</h4>
    {ofertasBenavides.map(...)}
  </section>

  <section>
    <h4>Hoy Descuento Especial en Farmacias Guadalajara</h4>
    {ofertasGuadalajara.map(...)}
  </section>

  <section>
    <h4>Hoy Descuento Especial en Farmacias del Ahorro</h4>
    {ofertasAhorro.map(...)}
  </section>
</div>
```

## Funciones Auxiliares

```javascript
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
  if (!addressData.codigoPostal.trim() || addressData.codigoPostal.length !== 5) 
    errors.codigoPostal = true;
  if (!addressData.ciudad.trim()) errors.ciudad = true;
  if (!addressData.estado.trim()) errors.estado = true;
  
  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};
```

## Comportamiento del Botón "Volver"

```javascript
const handleVolver = () => {
  if (step === 'chooseMethod') {
    setStep('initial');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (step === 'manualAddress') {
    setStep('chooseMethod');
  } else if (step === 'showResults') {
    if (locationMethod === 'manual') {
      setStep('manualAddress');
    } else {
      setStep('chooseMethod');
    }
  } else {
    navigate('/page4'); // Salir de pharmacy
  }
};
```

## Estructura Visual del Mapa (Placeholder)

```jsx
<div className="mapa-container" style={{minHeight: '400px'}}>
  <div className="bg-gradient-to-br from-cyan-100 to-blue-100 p-8">
    {selectedMedicine && selectedMedicine !== 'none' ? (
      // Mostrar PIN MAGENTA con medicamento
      <div className="text-center">
        <div className="w-24 h-24 bg-pink-500 rounded-full">
          {/* Ícono de ubicación */}
        </div>
        <h4>{selectedMedicine.nombre}</h4>
        <p>{selectedMedicine.dosis}</p>
        <p className="text-green-600">
          ${getMejorPrecio(selectedMedicine)}
        </p>
        <p>Farmacia {getFarmaciaBarata(selectedMedicine)}</p>
      </div>
    ) : selectedMedicine === 'none' ? (
      // Mostrar 3 PINES CIAN
      <div className="space-y-4">
        <div className="pin-cian">Farmacia Guadalajara - 0.3 km</div>
        <div className="pin-cian">Farmacia Benavides - 0.8 km</div>
        <div className="pin-cian">Farmacia del Ahorro - 1.2 km</div>
      </div>
    ) : (
      <p>Selecciona un medicamento o "No" para ver farmacias</p>
    )}
    
    <div className="absolute bottom-4 left-4">
      🗺️ Google Maps integración
    </div>
  </div>
</div>
```

## Notas de Implementación

1. **TODO EN UNA SOLA PÁGINA**: Usar renderizado condicional con el estado `step`
2. **Scroll automático**: Usar `scrollIntoView({ behavior: 'smooth' })` en cada transición
3. **Validación de formulario**: Mostrar errores en rojo, deshabilitar submit si hay errores
4. **Responsive**: Grid de 2 columnas en desktop, stack vertical en mobile
5. **Colores de marca**:
   - Magenta/Pink: #E91E63 (pins de mejor precio)
   - Cyan: #06B6D4 (pins de farmacias cercanas)
6. **Íconos personalizados**: Diseñar pines de ubicación en lugar de usar los estándar

## Implementación Sugerida

Por el tamaño del archivo, se sugiere:
1. Crear archivo temporal con toda la lógica
2. Testear cada paso del flujo
3. Una vez funcionando, reemplazar el archivo completo
4. Commit con descripción detallada

## Próximos Pasos

1. ✅ Documentación creada
2. ⏳ Implementar estados y handlers
3. ⏳ Crear UI para cada paso
4. ⏳ Integrar tabla de medicamentos
5. ⏳ Implementar mapa placeholder
6. ⏳ Agregar sección de ofertas
7. ⏳ Testing completo
8. ⏳ Commit final
