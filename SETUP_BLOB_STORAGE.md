# 🔧 CONFIGURACIÓN: Vercel Blob Storage

## Paso 1: Habilitar Blob Storage en Vercel

1. Ve a: https://vercel.com/dashboard
2. Selecciona tu proyecto: **MVP-SaludCompartida**
3. Ve a **Storage** (tab arriba)
4. Click en **"Create Database"** o **"Connect Store"**
5. Selecciona **"Blob"**
6. Click en **"Create"**

Vercel creará automáticamente:
- Un Blob Store asociado a tu proyecto
- Las variables de entorno necesarias

---

## Paso 2: Verificar Variables de Entorno

Después de crear el Blob Store, ve a:

**Settings → Environment Variables**

Deberías ver automáticamente:
- ✅ `BLOB_READ_WRITE_TOKEN` (generado por Vercel)

**Esta variable ya está lista para usar** - No necesitas configurar nada más.

---

## Paso 3: Verificar en tu código

El archivo `api/recording-system.js` ya está configurado para usar Vercel Blob:

```javascript
import { put } from '@vercel/blob';

const blob = await put(fileName, audioFile, {
  access: 'private',
  addRandomSuffix: false
});
```

---

## 📊 Costos de Vercel Blob

| Concepto | Precio | Tu Uso Estimado |
|----------|--------|-----------------|
| **Storage** | $0.15/GB/mes | $5-20/mes (100-500 grabaciones) |
| **Bandwidth** | $0.10/GB transfer | $5-10/mes |
| **Total Inicial** | - | **$10-30/mes** |

### Escala:
- 1,000 grabaciones (500 horas): ~$50-100/mes
- 10,000 grabaciones (5,000 horas): ~$500-800/mes

---

## 🎯 Siguiente Paso: Testing

Una vez que hayas creado el Blob Store en Vercel, podrás:

1. **Subir una grabación de prueba**
2. **Ver la transcripción automática** (Whisper)
3. **Ver el análisis** (GPT-4)
4. **Revisar insights en Supabase**

---

## ⚠️ Nota Importante:

Si prefieres usar **Cloudflare R2** (10x más barato):
- Storage: $0.015/GB/mes
- Sin costo de bandwidth de salida
- Total: ~$5-10/mes para 1,000 grabaciones

**¿Quieres que implemente R2 en vez de Vercel Blob?**

---

## ✅ Checklist:

- [ ] Crear Blob Store en Vercel Dashboard
- [ ] Verificar variable `BLOB_READ_WRITE_TOKEN`
- [ ] Redeploy automático (Vercel detecta nueva variable)
- [ ] Listo para testing

---

**¿Vas a crear el Blob Store ahora?** Te guío con el testing cuando esté listo. 🚀
