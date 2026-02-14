# 📊 URLs de Tracking para Campañas de Meta (Facebook/Instagram)

## 🎯 URLs para usar en tus anuncios

### **Landing Page Principal**
```
https://www.saludcompartida.app/?utm_source=instagram&utm_medium=social&utm_campaign=lanzamiento_feb_2026

https://www.saludcompartida.app/?utm_source=facebook&utm_medium=social&utm_campaign=lanzamiento_feb_2026
```

### **Página de Registro Directo**
```
https://www.saludcompartida.app/registro-jan?utm_source=instagram&utm_medium=story&utm_campaign=testimonio_familia

https://www.saludcompartida.app/registro-jan?utm_source=facebook&utm_medium=video_ad&utm_campaign=ahorro_farmacias
```

### **WhatsApp desde Ads**
```
https://wa.me/17869648040?text=Hola,%20vi%20tu%20anuncio%20en%20Instagram%20sobre%20SaludCompartida

https://wa.me/17869648040?text=Hola,%20vengo%20de%20Facebook%20y%20quiero%20info%20sobre%20el%20plan%20familiar
```

---

## 🔍 Cómo personalizar los parámetros UTM

### **utm_source** (De dónde viene)
- `instagram` - Posts/Stories/Reels de Instagram
- `facebook` - Posts/Ads de Facebook
- `tiktok` - Videos de TikTok
- `google` - Google Ads
- `whatsapp` - Compartido por WhatsApp
- `email` - Newsletter/Email marketing

### **utm_medium** (Tipo de contenido)
- `social` - Post orgánico
- `paid_ad` - Anuncio pagado
- `story` - Instagram/Facebook Story
- `video_ad` - Video publicitario
- `carousel` - Carrusel de imágenes
- `dm` - Mensaje directo

### **utm_campaign** (Nombre de tu campaña)
- `lanzamiento_feb_2026` - Campaña de lanzamiento
- `testimonio_familia` - Testimonios de usuarios
- `ahorro_farmacias` - Enfocado en descuentos
- `telemedicina_24_7` - Enfocado en telemedicina
- `san_valentin` - Campaña de San Valentín
- `dia_madres` - Día de las Madres

---

## 📋 Ejemplos de Campañas Específicas

### **Campaña 1: Testimonio en Instagram Stories**
```
https://www.saludcompartida.app/registro-jan?utm_source=instagram&utm_medium=story&utm_campaign=testimonio_maria_ahorro
```
**Uso:** Link en tu Story mostrando cómo María ahorró $500

---

### **Campaña 2: Video Ad en Facebook**
```
https://www.saludcompartida.app/?utm_source=facebook&utm_medium=video_ad&utm_campaign=telemedicina_3am
```
**Uso:** Anuncio de video mostrando telemedicina 24/7

---

### **Campaña 3: Carrusel en Instagram**
```
https://www.saludcompartida.app/registro-jan?utm_source=instagram&utm_medium=carousel&utm_campaign=4_pilares_familia
```
**Uso:** Carrusel explicando los 4 pilares

---

### **Campaña 4: WhatsApp desde Facebook**
```
https://wa.me/17869648040?text=Hola,%20vi%20tu%20post%20en%20Facebook%20sobre%20telemedicina%20para%20mi%20familia%20en%20México
```
**Uso:** Botón "Enviar mensaje" en tu Facebook Business

---

## 🎯 Meta Pixel & Conversions API

### **Eventos que debes trackear:**

1. **PageView** - Usuario llega a landing
2. **ViewContent** - Ve página de registro
3. **InitiateCheckout** - Llena formulario (Page 1)
4. **AddPaymentInfo** - Ingresa tarjeta
5. **Purchase** - Completa pago ($12 USD)

### **Configuración en Meta Ads Manager:**

```javascript
// Este código YA está en tu sitio (verificar)
fbq('track', 'PageView');
fbq('track', 'ViewContent', {
  content_name: 'Landing SaludCompartida',
  content_category: 'Healthcare'
});
```

---

## 📊 Cómo ver tus métricas en Supabase

### **Query 1: Conversiones por red social (últimos 7 días)**
```sql
SELECT 
  COALESCE(traffic_source, 'unknown') as red_social,
  COUNT(*) as registros,
  COUNT(CASE WHEN payment_completed_at IS NOT NULL THEN 1 END) as pagos,
  ROUND(
    COUNT(CASE WHEN payment_completed_at IS NOT NULL THEN 1 END)::NUMERIC / 
    NULLIF(COUNT(*), 0) * 100, 
    2
  ) as tasa_conversion
FROM registrations
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY traffic_source
ORDER BY pagos DESC;
```

### **Query 2: Campañas con mejor ROI**
```sql
SELECT 
  utm_campaign as campaña,
  utm_source as red,
  COUNT(*) as registros,
  COUNT(CASE WHEN payment_completed_at IS NOT NULL THEN 1 END) as pagos,
  SUM(CASE WHEN payment_completed_at IS NOT NULL THEN 12 ELSE 0 END) as revenue_usd
FROM registrations
WHERE created_at >= NOW() - INTERVAL '30 days'
  AND utm_campaign IS NOT NULL
GROUP BY utm_campaign, utm_source
ORDER BY revenue_usd DESC;
```

### **Query 3: Hora del día con más conversiones**
```sql
SELECT 
  EXTRACT(HOUR FROM created_at) as hora_del_dia,
  traffic_source,
  COUNT(*) as registros
FROM registrations
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY EXTRACT(HOUR FROM created_at), traffic_source
ORDER BY registros DESC
LIMIT 10;
```

---

## ✅ Checklist de Implementación

### **En Meta Ads Manager:**
- [ ] Agregar parámetros UTM a todos los anuncios
- [ ] Configurar Meta Pixel en saludcompartida.app
- [ ] Crear evento personalizado "Purchase" cuando pago = completado
- [ ] Configurar Conversions API (opcional, mejor tracking)

### **En tu sitio web:**
- [x] Detección automática de referrer (Facebook/Instagram)
- [x] Captura de parámetros UTM
- [x] Guardado en tabla `registrations`
- [ ] Ejecutar SQL para agregar columnas (ver `scripts/add-traffic-source-to-registrations.sql`)

### **En Supabase:**
- [ ] Ejecutar script SQL de tracking
- [ ] Crear dashboard de métricas
- [ ] Configurar alertas para conversiones

---

## 🚀 Próximos Pasos

1. **Hoy:** Ejecuta el SQL en Supabase para agregar las columnas
2. **Hoy:** Usa las URLs con UTM en tu próximo post/ad
3. **Mañana:** Revisa tus primeras métricas con las queries SQL
4. **Esta semana:** Compara qué red social convierte mejor (Instagram vs Facebook)

---

## 📞 Soporte

¿Necesitas ayuda para configurar Meta Pixel o Conversions API?
- Documentación Meta: https://developers.facebook.com/docs/meta-pixel
- Conversions API: https://developers.facebook.com/docs/marketing-api/conversions-api

---

**Última actualización:** 13 de Febrero 2026
