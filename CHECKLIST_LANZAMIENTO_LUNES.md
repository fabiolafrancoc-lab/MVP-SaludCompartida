# ✅ CHECKLIST LANZAMIENTO LUNES 27 ENERO 2026
## Lupita AI Companion - Estrategia 3

**Objetivo**: Sistema 100% operacional para aceptar nuevos usuarios que compren planes y reciban llamadas de Lupita.

---

## 🔧 INFRAESTRUCTURA (Completado Hoy - 24 Enero)

- [x] **Supabase**: Tablas companion_calls, user_facts, scheduled_callbacks, behavioral_codes creadas
- [x] **AWS S3**: 2 buckets configurados (legal + companion) con credenciales en .env
- [x] **Webhook VAPI**: Código actualizado para descargar recordings y subir a S3
- [x] **Git/Vercel**: Código pusheado, deployment en progreso
- [ ] **VAPI Dashboard**: Webhook URL configurada (https://saludcompartida.app/api/vapi-webhook)
- [ ] **Importación**: 17 llamadas existentes migradas al nuevo sistema

---

## 📞 FLUJO DE LLAMADAS (Verificar)

### A. Usuario Nuevo Compra Plan
1. [ ] Usuario completa registro en saludcompartida.app
2. [ ] Paga con Square (Estrategia 1 - ya en producción)
3. [ ] Sistema crea registro en `scheduled_callbacks` con phone_number
4. [ ] Lupita recibe horario para primera llamada (ej: mañana 10am)

### B. Lupita Inicia Llamada (Outbound)
1. [ ] Cron job o trigger detecta `scheduled_callbacks` pendientes
2. [ ] Sistema llama API de VAPI: `POST /call` con phoneNumberId + destinationNumber
3. [ ] VAPI conecta llamada a través de TELNYX
4. [ ] Webhook recibe `call-start` → Inserta en `companion_calls` (status: in_progress)

### C. Durante la Llamada
1. [ ] VAPI graba audio + genera transcripción en tiempo real
2. [ ] Claude 3.5 Sonnet procesa conversación con 16 behavioral codes
3. [ ] ElevenLabs sintetiza voz de Lupita
4. [ ] Deepgram transcribe audio del usuario

### D. Al Terminar Llamada
1. [ ] Webhook recibe `call-end` con recordingUrl
2. [ ] Sistema descarga audio de VAPI
3. [ ] Sube a S3 legal bucket (immutable, 1 año)
4. [ ] Sube a S3 companion bucket (procesamiento)
5. [ ] Actualiza `companion_calls`: s3_legal_url, s3_active_url, transcript, duration
6. [ ] (Futuro) Lambda procesa audio → embeddings → Weaviate

---

## 🧪 TESTING PRE-LANZAMIENTO

### Test 1: Webhook Funcional
```bash
curl -X POST https://saludcompartida.app/api/vapi-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "type": "call-start",
    "call": {
      "id": "test_call_123",
      "customer": {"number": "+521234567890"},
      "startedAt": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"
    }
  }'
```
**Esperado**: Status 200, registro en `companion_calls` con call_id=test_call_123

### Test 2: Llamada Real de Prueba
1. [ ] Ir a VAPI Dashboard → Phone Numbers → Click "Make Test Call"
2. [ ] Ingresar tu número de teléfono
3. [ ] Hablar con Lupita por 1-2 minutos
4. [ ] Colgar
5. [ ] Verificar en Supabase: `SELECT * FROM companion_calls ORDER BY created_at DESC LIMIT 1;`
6. [ ] Verificar en S3: https://s3.console.aws.amazon.com/s3/buckets/saludcompartida-legal-archive

**Esperado**: 
- Recording en S3 legal bucket
- Recording en S3 companion bucket
- Metadata en companion_calls con s3_legal_url y s3_active_url
- Transcript en formato JSONB

### Test 3: Importación de Llamadas Existentes
```bash
node scripts/import-existing-calls.js
```
**Esperado**: 17 registros en companion_calls con audios en S3

---

## 🎯 MÉTRICAS DE ÉXITO

### Lunes 27 Enero - Día 1
- [ ] **0 errores** en webhook (verificar Vercel logs)
- [ ] **100% de recordings** en S3 legal bucket
- [ ] **Todas las llamadas** registradas en companion_calls
- [ ] **Tiempo de respuesta** < 2 segundos en webhook

### Semana 1 (27 Enero - 2 Febrero)
- [ ] **25+ llamadas** completadas exitosamente
- [ ] **0% detección de AI** (feedback usuarios)
- [ ] **95%+ disponibilidad** (uptime VAPI + webhook)
- [ ] **Retention**: % usuarios que aceptan segunda llamada

---

## 🚨 CONTINGENCIAS

### Si falla webhook VAPI
1. Verificar URL en VAPI Dashboard: https://saludcompartida.app/api/vapi-webhook
2. Verificar logs en Vercel: https://vercel.com/fabiolafrancoc-lab/mvp-saludcompartida/logs
3. Verificar env vars en Vercel: SUPABASE_SERVICE_ROLE_KEY, AWS keys

### Si no graba a S3
1. Verificar credenciales AWS en Vercel (no en .env.local)
2. Verificar permisos IAM: PutObject en ambos buckets
3. Verificar que VAPI envía recordingUrl en webhook

### Si transcripción vacía
1. VAPI puede tardar hasta 5 minutos en procesar recording
2. Verificar en VAPI Dashboard → Calls → Ver transcripción
3. Si no aparece, contactar soporte VAPI

---

## 📊 MONITOREO POST-LANZAMIENTO

### Diario (primera semana)
- [ ] Revisar Vercel logs (errores 500)
- [ ] Revisar Supabase: `SELECT COUNT(*) FROM companion_calls WHERE created_at > NOW() - INTERVAL '1 day';`
- [ ] Verificar S3 legal bucket: conteo de archivos
- [ ] Escuchar sample de 2-3 llamadas al azar

### Semanal
- [ ] Analizar duraciones promedio de llamadas
- [ ] Identificar behavioral_codes más usados
- [ ] Revisar user_facts: ¿se está extrayendo info correctamente?
- [ ] Feedback usuarios: ¿detectaron AI? ¿les gustó?

---

## 🎉 CRITERIOS DE ÉXITO TOTAL

- ✅ **Estrategia 1**: Pagos funcionando (YA COMPLETADO)
- ✅ **Estrategia 3**: Lupita llamando sin detección de AI (EN PROCESO)
- ⏳ **Estrategia 2**: WhatsApp automático (PENDIENTE - no prioritario)
- ⏳ **Estrategia 4**: Dashboard migrante (PENDIENTE - Febrero)

**Definición de "Listo para Lunes":**
1. ✅ Usuario puede comprar plan
2. ✅ Lupita puede llamar al usuario
3. ✅ Llamada se graba automáticamente en S3 legal
4. ✅ Metadata se guarda en Supabase
5. ✅ Webhook no tiene errores en producción

---

## 📞 CONTACTOS DE EMERGENCIA

- **VAPI Support**: support@vapi.ai
- **AWS Support**: (si hay problemas con S3)
- **Vercel Support**: vercel.com/support
- **Supabase Support**: supabase.com/dashboard/support

---

**Última actualización**: 24 Enero 2026 - 11:30 PM
**Responsable**: Fabiola Franco
**Deadline**: Lunes 27 Enero 2026 - 8:00 AM
