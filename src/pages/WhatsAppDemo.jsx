// src/pages/WhatsAppDemo.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  WhatsAppIconMagenta, 
  WhatsAppIconCyan,
  WhatsAppButtonMagenta,
  WhatsAppButtonCyan,
  WhatsAppFloatingButton
} from '../components/WhatsAppIcons';

export default function WhatsAppDemo() {
  const navigate = useNavigate();
  const whatsappNumber = '5529984922702';
  const whatsappMessage = encodeURIComponent('Hola! Estoy interesado en los servicios de SaludCompartida 🌟');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <img 
            src="/saludcompartida logo WT.png" 
            alt="SaludCompartida" 
            className="h-16"
          />
          <button
            onClick={() => navigate('/page4')}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
          >
            ← Volver
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Íconos de WhatsApp Personalizados
          </h1>
          <p className="text-xl text-gray-600">
            Diseños exclusivos de SaludCompartida en Magenta y Cyan
          </p>
        </div>

        {/* Sección de Íconos */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Diseño Magenta */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-pink-600 mb-2">
                Diseño Magenta
              </h2>
              <p className="text-gray-600">
                Estilo vibrante y llamativo
              </p>
            </div>
            
            <div className="flex flex-col items-center space-y-6">
              {/* Ícono grande */}
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-2xl">
                <WhatsAppIconMagenta className="w-32 h-32" />
              </div>
              
              {/* Tamaños variados */}
              <div className="flex items-end gap-6">
                <WhatsAppIconMagenta className="w-12 h-12" />
                <WhatsAppIconMagenta className="w-16 h-16" />
                <WhatsAppIconMagenta className="w-20 h-20" />
              </div>

              {/* Botón de ejemplo */}
              <WhatsAppButtonMagenta
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              >
                Chatea con Nosotros
              </WhatsAppButtonMagenta>

              {/* Características */}
              <div className="w-full bg-pink-50 rounded-lg p-4 text-left">
                <h3 className="font-bold text-pink-900 mb-2">Características:</h3>
                <ul className="text-sm text-pink-800 space-y-1">
                  <li>• Gradiente magenta vibrante (#E91E63 → #C2185B)</li>
                  <li>• Branding "SaludCompartida" integrado</li>
                  <li>• Ícono de WhatsApp personalizado</li>
                  <li>• Sombras suaves y profesionales</li>
                  <li>• Diseño optimizado para web y móvil</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Diseño Cyan */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-cyan-600 mb-2">
                Diseño Cyan
              </h2>
              <p className="text-gray-600">
                Estilo profesional y moderno
              </p>
            </div>
            
            <div className="flex flex-col items-center space-y-6">
              {/* Ícono grande */}
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-8 rounded-2xl">
                <WhatsAppIconCyan className="w-32 h-32" />
              </div>
              
              {/* Tamaños variados */}
              <div className="flex items-end gap-6">
                <WhatsAppIconCyan className="w-12 h-12" />
                <WhatsAppIconCyan className="w-16 h-16" />
                <WhatsAppIconCyan className="w-20 h-20" />
              </div>

              {/* Botón de ejemplo */}
              <WhatsAppButtonCyan
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              >
                Chatea con Nosotros
              </WhatsAppButtonCyan>

              {/* Características */}
              <div className="w-full bg-cyan-50 rounded-lg p-4 text-left">
                <h3 className="font-bold text-cyan-900 mb-2">Características:</h3>
                <ul className="text-sm text-cyan-800 space-y-1">
                  <li>• Gradiente cyan profesional (#06B6D4 → #0E7490)</li>
                  <li>• Branding "SaludCompartida" integrado</li>
                  <li>• Ícono de WhatsApp personalizado</li>
                  <li>• Sombras suaves y profesionales</li>
                  <li>• Diseño optimizado para web y móvil</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Comparación */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Comparación de Estilos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-pink-600 mb-4 text-lg">🌸 Magenta - Recomendado para:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold">✓</span>
                  <span>Páginas de contacto para usuarios de México</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold">✓</span>
                  <span>Llamadas a la acción principales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold">✓</span>
                  <span>Secciones de registro y onboarding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold">✓</span>
                  <span>Audiencia femenina o familiar</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-cyan-600 mb-4 text-lg">💙 Cyan - Recomendado para:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 font-bold">✓</span>
                  <span>Páginas de telemedicina y servicios médicos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 font-bold">✓</span>
                  <span>Secciones para usuarios migrantes (USA)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 font-bold">✓</span>
                  <span>Contextos profesionales y corporativos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 font-bold">✓</span>
                  <span>Áreas de información técnica</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sección de Casos de Uso */}
        <div className="bg-gradient-to-r from-pink-50 via-white to-cyan-50 rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Implementación en el Proyecto
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex justify-center mb-4">
                <WhatsAppIconMagenta className="w-16 h-16" />
              </div>
              <h3 className="font-bold text-center mb-2">contact.jsx</h3>
              <p className="text-sm text-gray-600 text-center">
                Formulario de contacto con botón Magenta para usuarios mexicanos
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex justify-center mb-4">
                <WhatsAppIconCyan className="w-16 h-16" />
              </div>
              <h3 className="font-bold text-center mb-2">migrantcontact.jsx</h3>
              <p className="text-sm text-gray-600 text-center">
                Contacto simplificado con botón Cyan para usuarios USA
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex justify-center mb-4">
                <WhatsAppIconCyan className="w-16 h-16" />
              </div>
              <h3 className="font-bold text-center mb-2">telemedicine.jsx</h3>
              <p className="text-sm text-gray-600 text-center">
                Botón Cyan en página de telemedicina 24/7
              </p>
            </div>
          </div>
        </div>

        {/* Código de Ejemplo */}
        <div className="bg-gray-900 rounded-2xl shadow-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Cómo Usar</h2>
          <div className="bg-gray-800 rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`// Importar componentes
import { 
  WhatsAppIconMagenta, 
  WhatsAppIconCyan,
  WhatsAppButtonMagenta,
  WhatsAppButtonCyan
} from './components/WhatsAppIcons';

// Usar botón Magenta
<WhatsAppButtonMagenta
  href="https://wa.me/5529984922702?text=Hola"
>
  Chatea con Nosotros
</WhatsAppButtonMagenta>

// Usar botón Cyan
<WhatsAppButtonCyan
  href="https://wa.me/5529984922702?text=Hello"
>
  Chat with Us
</WhatsAppButtonCyan>

// Usar solo el ícono
<WhatsAppIconMagenta className="w-12 h-12" />
<WhatsAppIconCyan className="w-16 h-16" />`}</code>
            </pre>
          </div>
        </div>
      </main>

      {/* Botón flotante de demostración */}
      <WhatsAppFloatingButton
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        variant="magenta"
      />
    </div>
  );
}
