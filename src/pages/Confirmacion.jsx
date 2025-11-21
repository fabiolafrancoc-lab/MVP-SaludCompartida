import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Mail, CreditCard, Calendar, FileText } from 'lucide-react';
import Footer from '../components/Footer';

export default function Confirmacion() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || JSON.parse(localStorage.getItem('subscriptionData') || '{}');

  // Si no hay datos de suscripción, redirigir
  if (!data.confirmationNumber) {
    setTimeout(() => navigate('/registro'), 100);
    return null;
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('es-MX', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownloadReceipt = () => {
    // En producción, generaría un PDF
    alert('Función de descarga de comprobante en desarrollo');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-pink-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-center">
          <img src="/saludcompartida logo WT.png" alt="SaludCompartida" className="h-10" />
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Éxito */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              ¡Suscripción Exitosa!
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Bienvenido a SaludCompartida, {data.firstName || 'Usuario'}
            </p>
            <p className="text-sm text-gray-500">
              Te hemos enviado los detalles a {data.email}
            </p>
          </div>

          {/* Comprobante */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Comprobante de Pago</h2>
              <button
                onClick={handleDownloadReceipt}
                className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Descargar</span>
              </button>
            </div>

            <div className="space-y-4">
              {/* Número de confirmación */}
              <div className="bg-gradient-to-r from-cyan-50 to-pink-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-5 h-5 text-cyan-600" />
                  <p className="text-sm font-semibold text-gray-700">Número de Confirmación</p>
                </div>
                <p className="text-2xl font-bold text-gray-900 tracking-wider">
                  {data.confirmationNumber}
                </p>
              </div>

              {/* Detalles de la transacción */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Fecha de Suscripción</p>
                    <p className="text-gray-900">{formatDate(data.subscriptionDate)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Método de Pago</p>
                    <p className="text-gray-900">**** **** **** {data.cardLast4}</p>
                  </div>
                </div>
              </div>

              {/* Plan y monto */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-gray-700">Plan Contratado</p>
                  <p className="text-lg font-bold text-gray-900">{data.plan}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Total Pagado</p>
                  <p className="text-2xl font-bold text-cyan-600">${data.amount} USD</p>
                </div>
              </div>

              {/* Información del suscriptor */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-3">Información del Suscriptor</p>
                <div className="space-y-2">
                  <p className="text-gray-900">
                    <span className="text-gray-600">Nombre:</span> {data.firstName} {data.lastName} {data.motherLastName}
                  </p>
                  <p className="text-gray-900">
                    <span className="text-gray-600">Email:</span> {data.email}
                  </p>
                  <p className="text-gray-900">
                    <span className="text-gray-600">WhatsApp:</span> {data.countryCode} {data.whatsappNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Próximos pasos */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-blue-900 mb-2">¿Qué sigue?</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>✓ Recibirás un correo de bienvenida en los próximos minutos</li>
                  <li>✓ Tus códigos de acceso llegarán por WhatsApp y email en menos de 30 segundos</li>
                  <li>✓ Puedes agregar hasta 4 familiares desde tu panel de control</li>
                  <li>✓ El acceso a telemedicina está activo inmediatamente</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Botón de acción */}
          <div className="text-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Ir a Mi Panel de Control
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}