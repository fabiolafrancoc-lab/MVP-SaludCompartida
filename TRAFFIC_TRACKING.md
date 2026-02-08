# 📊 Sistema de Tracking de Origen de Tráfico

## Cómo Funciona

El sistema automáticamente detecta de dónde vienen los usuarios y guarda esta información en la base de datos.

## URLs para Redes Sociales

### Instagram
```
https://prototype.saludcompartida.com?source=instagram
```

### Facebook
```
https://prototype.saludcompartida.com?source=facebook
```

### TikTok
```
https://prototype.saludcompartida.com?source=tiktok
```

### Twitter/X
```
https://prototype.saludcompartida.com?source=twitter
```

### Google Ads
```
https://prototype.saludcompartida.com?source=google-ads
```

### Email Marketing
```
https://prototype.saludcompartida.com?source=email
```

## También Funciona con UTM Parameters

Si ya usas UTM parameters, el sistema los detecta automáticamente:

```
https://prototype.saludcompartida.com?utm_source=instagram&utm_medium=story&utm_campaign=launch
```

## Ver Reportes en Supabase

### Ejecuta esta query para ver de dónde vienen tus usuarios:

```sql
SELECT 
  COALESCE(traffic_source, 'directo') as origen,
  COUNT(*) as total_registros,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM registrations), 2) as porcentaje
FROM public.registrations
GROUP BY traffic_source
ORDER BY total_registros DESC;
```

### Ver registros recientes por origen:

```sql
SELECT 
  migrant_first_name,
  migrant_last_name,
  migrant_email,
  traffic_source,
  created_at
FROM public.registrations
WHERE traffic_source = 'instagram'  -- Cambiar a: facebook, tiktok, etc.
ORDER BY created_at DESC
LIMIT 10;
```

### Dashboard completo:

```sql
-- Registros por día y origen
SELECT 
  DATE(created_at) as fecha,
  traffic_source,
  COUNT(*) as registros
FROM public.registrations
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at), traffic_source
ORDER BY fecha DESC, registros DESC;
```

## Cómo Usar en Tus Posts

### Para Instagram:
1. Crea tu post/story
2. Agrega link en bio: `https://prototype.saludcompartida.com?source=instagram`
3. O usa herramienta de link en bio (Linktree, etc.) con el parámetro

### Para Facebook:
1. Publica tu post
2. Usa el link: `https://prototype.saludcompartida.com?source=facebook`

### Para TikTok:
1. Crea tu video
2. En la descripción o comentarios fijados: `https://prototype.saludcompartida.com?source=tiktok`

## Análisis Avanzado

### Conversión por canal:

```sql
SELECT 
  traffic_source,
  COUNT(*) as registros,
  COUNT(CASE WHEN codes_sent = TRUE THEN 1 END) as activados,
  ROUND(COUNT(CASE WHEN codes_sent = TRUE THEN 1 END) * 100.0 / COUNT(*), 2) as tasa_activacion
FROM public.registrations
GROUP BY traffic_source
ORDER BY registros DESC;
```

### Mejor canal por valor:

```sql
-- Cuando tengas pagos implementados
SELECT 
  traffic_source,
  COUNT(*) as total_usuarios,
  SUM(CASE WHEN subscription_active = TRUE THEN 1 ELSE 0 END) as usuarios_pagando,
  SUM(CASE WHEN subscription_active = TRUE THEN 12 ELSE 0 END) as revenue_mensual
FROM public.registrations
GROUP BY traffic_source
ORDER BY revenue_mensual DESC;
```

## Tips para Maximizar Tracking

1. **Siempre usa el parámetro `?source=`** en tus links
2. **Sé consistente** con los nombres (siempre minúsculas)
3. **Prueba cada link** antes de publicarlo
4. **Revisa reportes semanalmente** para ver qué canal funciona mejor
5. **Invierte más** en el canal que te trae mejores usuarios

## Links Directos vs Con Tracking

❌ **Sin tracking:** `https://prototype.saludcompartida.com`
- No sabrás de dónde vino el usuario

✅ **Con tracking:** `https://prototype.saludcompartida.com?source=instagram`
- Sabrás exactamente que vino de Instagram

## Acciones Siguientes

1. **Ejecuta el script SQL:** `scripts/add-traffic-source-column.sql` en Supabase
2. **Usa los links con `?source=`** en todas tus publicaciones
3. **Revisa los reportes** semanalmente
4. **Optimiza** tu estrategia basada en datos reales

