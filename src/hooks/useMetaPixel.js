'use client';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const META_PIXEL_ID = '35350289364';
const TIKTOK_PIXEL_ID = 'CNHFH4RC77U7SFL97E10';

export const useMetaPixel = () => {
  const location = useLocation();

  // Inicializar Meta Pixel solo una vez
  useEffect(() => {
    // Verificar si ya está cargado
    if (typeof window === 'undefined' || window.fbq) return;

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

    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');
  }, []);

  // Inicializar TikTok Pixel solo una vez
  useEffect(() => {
    // Verificar si ya está cargado
    if (typeof window === 'undefined' || window.ttq) return;

    // Cargar TikTok Pixel
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
      ttq.load(TIKTOK_PIXEL_ID);
      ttq.page();
    }(window, document, 'ttq');
  }, []);

  // Rastrear navegación virtual (cambios de ruta sin recargar)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Meta Pixel PageView
    if (window.fbq) {
      window.fbq('track', 'PageView');
      console.log('📊 Meta Pixel PageView:', location.pathname);
    }
    
    // TikTok Pixel PageView
    if (window.ttq) {
      window.ttq.page();
      console.log('📊 TikTok Pixel PageView:', location.pathname);
    }
  }, [location.pathname]);
};

// Función helper para trackear eventos personalizados en ambos pixels
export const trackEvent = (eventName, data = {}) => {
  if (typeof window === 'undefined') return;
  
  // Meta Pixel
  if (window.fbq) {
    window.fbq('track', eventName, data);
    console.log('📊 Meta Pixel Event:', eventName, data);
  }
  
  // TikTok Pixel - mapear eventos de Meta a TikTok
  if (window.ttq) {
    const tiktokEventMap = {
      'Lead': 'SubmitForm',
      'InitiateCheckout': 'InitiateCheckout',
      'Purchase': 'CompletePayment',
      'CompleteRegistration': 'CompleteRegistration'
    };
    
    const tiktokEvent = tiktokEventMap[eventName] || eventName;
    
    // Enriquecer datos para TikTok Pixel con información requerida
    const enrichedData = {
      ...data,
      // Agregar content_id si no existe (requerido para Video Shopping Ads)
      content_id: data.content_id || data.paymentId || 'membership-plan',
      // Asegurar que email y phone estén en el formato correcto para CompletePayment
      ...(data.email && { email: data.email }),
      ...(data.phone && { phone_number: data.phone }),
    };
    
    window.ttq.track(tiktokEvent, enrichedData);
    console.log('📊 TikTok Pixel Event:', tiktokEvent, enrichedData);
  }
};

