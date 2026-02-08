# 📧 Sistema de Envío Automático - Resumen Visual

## 📊 Flujo Completo del Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                    DÍA 0 - REGISTRO                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Usuario llena formulario → Guarda en Supabase                  │
│                           ↓                                      │
│         Email INMEDIATO: "Registro Exitoso" ✅                   │
│         (Sin código - espera 3 días)                             │
│                                                                  │
│  Base de datos:                                                  │
│  - migrant_email: user@example.com                               │
│  - family_email: family@example.com                              │
│  - migrant_access_code: SC-12345                                 │
│  - family_access_code: SC-67890                                  │
│  - created_at: 2025-11-15 10:00:00                               │
│  - codes_sent: NULL  ← Sistema buscará este valor                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

                            ⏰ ESPERA 3 DÍAS

┌─────────────────────────────────────────────────────────────────┐
│                 DÍA 3 - ENVÍO AUTOMÁTICO                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Vercel Cron Job (10:00 AM diario)                              │
│         ↓                                                        │
│  Ejecuta: /api/send-access-codes                                │
│         ↓                                                        │
│  Query Supabase:                                                 │
│  "Dame registros de hace 3 días donde codes_sent = NULL"        │
│         ↓                                                        │
│  Encuentra: 5 registros (ejemplo)                               │
│         ↓                                                        │
│  Por cada registro:                                              │
│    1. Envía email al MIGRANTE con código SC-12345               │
│    2. Envía email al FAMILIAR con código SC-67890               │
│    3. Actualiza: codes_sent = TRUE                              │
│    4. Actualiza: codes_sent_at = 2025-11-18 10:00:00            │
│         ↓                                                        │
│  Resultado:                                                      │
│  ✅ 5 migrantes recibieron códigos                               │
│  ✅ 5 familiares recibieron códigos                              │
│  ✅ Total: 10 emails enviados                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Archivos Creados

```
prototipo-saludcompartida/
│
├── api/
│   └── send-access-codes.js ..................... API endpoint automático
│
├── scripts/
│   ├── send-access-codes.js .................... Script manual
│   └── supabase-add-columns.sql ................ SQL para agregar columnas
│
├── vercel.json .................................. Configuración cron (10AM diario)
├── package.json ................................. Dependencias actualizadas
├── AUTOMATIC_CODES_README.md .................... Documentación completa
└── SETUP_AUTOMATIC_CODES.md ..................... Guía rápida de setup
```

---

## 🎯 Mensajes que se Envían

### 📧 Email 1: Migrante Seleccionado

```
De: SaludCompartida <noreply@saludcompartida.com>
Para: migrante@example.com
Asunto: 🎉 ¡Felicidades! Has sido seleccionado - SaludCompartida

Hola Juan,

¡Excelentes noticias! Has sido seleccionado para participar 
en el programa piloto de SaludCompartida. 🎉

Tu código de acceso es: SC-12345

🔗 Activa tu cuenta ahora:
👉 https://prototype.saludcompartida.com

✅ Telemedicina 24/7 para tu familiar en México
✅ Descuentos de 40-75% en medicamentos
✅ Sesiones de terapia psicológica semanales
✅ 30 días completamente GRATIS

⏰ ¡Activa tu cuenta hoy!
Los 30 días gratis comienzan desde tu primer acceso.
```

### 📧 Email 2: Familiar Seleccionado

```
De: SaludCompartida <noreply@saludcompartida.com>
Para: familiar@example.com
Asunto: 🎉 ¡Felicidades! Has sido seleccionado - SaludCompartida

Hola María,

¡Excelentes noticias! Has sido seleccionada para participar 
en el programa piloto de SaludCompartida. 🎉

Juan Pérez (Migrante en USA) te registró para que puedas 
utilizar los beneficios de SaludCompartida sin costo 
durante 30 días.

Tu código de acceso es: SC-67890

🔗 Activa tu cuenta ahora:
👉 https://prototype.saludcompartida.com

¡Empieza a ahorrar! Empieza a utilizar SaludCompartida.

✅ Telemedicina 24/7
✅ Descuentos de 40-75% en medicamentos
✅ Terapia psicológica semanal
✅ 30 días completamente GRATIS
```

---

## ⚙️ Configuración Requerida

### ✅ En Supabase:

1. Ejecutar SQL para agregar columnas:
   - `codes_sent` (BOOLEAN)
   - `codes_sent_at` (TIMESTAMP)

### ✅ En Vercel:

1. Agregar variable de entorno:
   - `CRON_SECRET` = `saludcompartida-cron-2025-secure`

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Deploy:
   ```bash
   git push origin main
   ```

---

## 🧪 Comandos Útiles

```bash
# Ejecutar manualmente (testing)
npm run send-codes

# Ver logs en tiempo real
vercel logs --follow

# Probar API endpoint
curl -X GET https://prototype.saludcompartida.com/api/send-access-codes \
  -H "Authorization: Bearer saludcompartida-cron-2025-secure"
```

---

## 📊 Ejemplo de Logs

```
🚀 Iniciando proceso de envío de códigos de acceso...

📅 Buscando registros entre 2025-11-12 y 2025-11-13
✅ Encontrados 3 registros elegibles

📧 Procesando 3 registros...

📝 Procesando: Juan Pérez
✅ Código enviado al migrante: juan@example.com
✅ Código enviado al familiar: maria@example.mx
✅ Registro completado para ID: 1

📝 Procesando: Ana García
✅ Código enviado al migrante: ana@example.com
✅ Código enviado al familiar: pedro@example.mx
✅ Registro completado para ID: 2

📝 Procesando: Luis Rodríguez
✅ Código enviado al migrante: luis@example.com
✅ Código enviado al familiar: carmen@example.mx
✅ Registro completado para ID: 3

==================================================
📊 RESUMEN DEL PROCESO:
==================================================
✅ Exitosos: 3
❌ Errores: 0
📧 Total procesados: 3
==================================================
```

---

## 🔐 Seguridad

- ✅ Endpoint protegido con token de autorización
- ✅ Solo procesa registros que NO han recibido códigos
- ✅ Marca registros como procesados (evita duplicados)
- ✅ Logs completos para auditoría
- ✅ Manejo de errores robusto

---

## 📅 Horario de Ejecución

**Automático:** Todos los días a las **10:00 AM UTC**
- 4:00 AM CST (México)
- 5:00 AM EST (Nueva York)

Para cambiar el horario, edita `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/send-access-codes",
      "schedule": "0 10 * * *"  ← Formato cron
    }
  ]
}
```

Formato: `minuto hora día mes díaSemana`
- `0 10 * * *` = 10:00 AM todos los días
- `0 14 * * *` = 2:00 PM todos los días
- `0 8 * * 1` = 8:00 AM solo lunes

---

## 🎉 Ventajas del Sistema

1. ✅ **100% Automático** - No requiere intervención manual
2. ✅ **Evita Duplicados** - Marca registros como procesados
3. ✅ **Logs Completos** - Sabes exactamente qué pasó
4. ✅ **Seguro** - Token de autorización obligatorio
5. ✅ **Escalable** - Puede procesar miles de registros
6. ✅ **Confiable** - Vercel Cron con 99.9% uptime
7. ✅ **Flexible** - Puedes ejecutar manualmente cuando quieras

---

## 📞 Próximos Pasos

1. ✅ Ejecutar SQL en Supabase
2. ✅ Agregar `CRON_SECRET` en Vercel
3. ✅ Instalar dependencias: `npm install`
4. ✅ Hacer deploy está listo (ya hicimos push)
5. ✅ Probar con registro de hace 3 días
6. ✅ Monitorear logs el primer día de ejecución

---

**¡Sistema listo para producción!** 🚀
