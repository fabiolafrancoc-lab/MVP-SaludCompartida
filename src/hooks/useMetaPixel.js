import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PIXEL_ID = '35350289364';

export const useMetaPixel = () => {
  const location = useLocation();

  // Inicializar pixel solo una vez
  useEffect(() => {
    // Verificar si ya está cargado
    if (window.fbq) return;

    // Cargar Meta Pixel
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  }, []);

  // Rastrear navegación virtual (cambios de ruta sin recargar)
  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'PageView');
      console.log('📊 Meta Pixel PageView:', location.pathname);
    }
  }, [location.pathname]);
};

// Función helper para trackear eventos personalizados
export const trackEvent = (eventName, data = {}) => {
  if (window.fbq) {
    window.fbq('track', eventName, data);
    console.log('📊 Meta Pixel Event:', eventName, data);
  }
};
