# 🔑 ACTUALIZAR VAPI PRIVATE KEY

## Cuando tengas el Private Key de VAPI:

1. **Abre .env.local**

2. **Reemplaza esta línea:**
```bash
VAPI_API_KEY=e4c6a7c4-203c-455f-ae23-cc46e5ed6bee
```

3. **Por tu nuevo Private Key:**
```bash
VAPI_API_KEY=tu_nuevo_private_key_aqui
```

4. **Guarda y despliega:**
```bash
# Actualizar en Vercel
vercel env add VAPI_API_KEY production

# O usa el dashboard: https://vercel.com/tu-proyecto/settings/environment-variables
```

## ⚠️ IMPORTANTE

El Private Key se usa para:
- Crear/modificar assistants programáticamente
- Hacer llamadas outbound via API
- Actualizar configuraciones de VAPI

**Para recibir webhooks (lo que necesitas HOY), el endpoint ya funciona sin cambios.**

---

## 🧪 TEST AHORA MISMO

1. Ve a VAPI Dashboard
2. Haz una test call
3. Verifica que aparece en Supabase → companion_calls
4. Verifica que aparece en S3

**El sistema ya está listo para producción del Lunes** ✅
