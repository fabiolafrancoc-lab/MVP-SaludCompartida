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
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
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
    return (
      <div className="w-full h-[600px] bg-red-50 rounded-lg flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-red-600 font-bold mb-2">Error al cargar Google Maps</p>
          <p className="text-sm text-gray-600">Por favor, verifica tu API key</p>
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
