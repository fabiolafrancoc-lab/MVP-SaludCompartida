import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '0.5rem'
};

// Farmacias de ejemplo en Ciudad de México
const pharmacies = [
  {
    id: 1,
    name: 'Farmacia Guadalajara',
    position: { lat: 19.4326, lng: -99.1332 },
    price: 41.50,
    distance: '0.3 km',
    isCheapest: true
  },
  {
    id: 2,
    name: 'Farmacia Benavides',
    position: { lat: 19.4306, lng: -99.1382 },
    price: 84,
    distance: '0.8 km',
    isCheapest: false
  },
  {
    id: 3,
    name: 'Farmacia del Ahorro',
    position: { lat: 19.4286, lng: -99.1432 },
    price: 137,
    distance: '1.2 km',
    isCheapest: false
  },
  {
    id: 4,
    name: 'Farmacia San Pablo',
    position: { lat: 19.4366, lng: -99.1282 },
    price: 95,
    distance: '1.5 km',
    isCheapest: false
  }
];

const PharmacyMap = ({ selectedMedicine, address }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  // Si no hay API key, mostrar mensaje informativo
  if (!apiKey || apiKey === '') {
    return (
      <div className="w-full h-[600px] bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg flex items-center justify-center border-2 border-cyan-200">
        <div className="text-center p-8 max-w-md">
          <svg className="w-20 h-20 mx-auto mb-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <p className="text-cyan-700 font-bold text-lg md:text-3xl lg:text-4xl mb-2">Mapa de Farmacias</p>
          <p className="text-gray-600 mb-4">El mapa interactivo estará disponible próximamente</p>
          <div className="bg-white rounded-lg p-4 border-2 border-cyan-100">
            <p className="text-sm text-gray-700">
              Mientras tanto, puedes buscar farmacias cercanas en tu aplicación de mapas favorita usando tu ubicación actual
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  const [map, setMap] = React.useState(null);

  // Centro del mapa (default: Centro CDMX)
  const center = {
    lat: 19.4326,
    lng: -99.1332
  };

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    pharmacies.forEach(pharmacy => {
      bounds.extend(pharmacy.position);
    });
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (loadError) {
    console.error('Google Maps error:', loadError);
    return (
      <div className="w-full h-[600px] bg-red-50 rounded-lg flex items-center justify-center border-2 border-red-200">
        <div className="text-center p-6 max-w-md">
          <svg className="w-16 h-16 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-600 font-bold mb-2">Error al cargar Google Maps</p>
          <p className="text-sm text-gray-600 mb-4">
            {loadError.message || 'Por favor, verifica la configuración de la API key'}
          </p>
          <div className="bg-white rounded-lg p-3 border border-red-200">
            <p className="text-xs text-gray-600">
              Puedes usar tu aplicación de mapas para buscar farmacias cercanas
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mb-4"></div>
          <p className="text-gray-600">Cargando mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        }}
      >
        {pharmacies.map((pharmacy) => (
          <Marker
            key={pharmacy.id}
            position={pharmacy.position}
            title={`${pharmacy.name} - $${pharmacy.price}`}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: pharmacy.isCheapest ? '#E91E63' : '#06B6D4',
              fillOpacity: 1,
              strokeColor: '#FFFFFF',
              strokeWeight: 3,
              scale: pharmacy.isCheapest ? 12 : 10,
            }}
            animation={pharmacy.isCheapest ? window.google.maps.Animation.BOUNCE : null}
          />
        ))}
      </GoogleMap>
      
      {/* Leyenda */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-pink-600 rounded-full"></div>
          <span className="text-sm text-gray-700"><strong>Magenta:</strong> Farmacia más barata</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-cyan-600 rounded-full"></div>
          <span className="text-sm text-gray-700"><strong>Cyan:</strong> Farmacias cercanas</span>
        </div>
      </div>

      {address && (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 max-w-sm">
          <p className="text-xs text-gray-600 mb-1">Buscando cerca de:</p>
          <p className="text-sm font-semibold text-gray-800">
            {address.calle} {address.numeroExterior}, {address.colonia}
          </p>
        </div>
      )}
    </div>
  );
};

export default React.memo(PharmacyMap);
