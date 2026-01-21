# Monday.com Setup - SaludCompartida MVP 60 Días

## 📋 Instrucciones de Setup

### Paso 1: Crear cuenta
1. Ve a https://monday.com
2. Sign up con tu email (prueba gratis 14 días)
3. Selecciona plan: **Standard** ($24/mes después del trial)

### Paso 2: Crear Workspace
1. Nombre del workspace: **SaludCompartida MVP**
2. Invite members: Solo tú por ahora

### Paso 3: Boards a crear

#### Board 1: **60-Day Timeline** 📅
**Columnas:**
- Task ID (texto)
- Task Name (texto)
- Week (dropdown: Semana 1-9)
- Day (número: 1-60)
- Owner (persona: Fabiola / Asistente / Terapeuta)
- Status (dropdown: Not Started / In Progress / Done / Blocked)
- Priority (dropdown: Critical / High / Medium / Low)
- Depends On (conexión a otras tareas)
- Output Expected (texto largo)
- Due Date (fecha)
- Timeline (timeline visual)

**Vistas a crear:**
- Timeline View (Gantt chart)
- Kanban por Status
- Calendar View
- Table View (default)

---

#### Board 2: **KPIs Dashboard** 📊
**Columnas:**
- Week (dropdown: 1-9)
- Metric Name (texto)
- Target (número)
- Current (número)
- Status (fórmula: Current/Target)
- Type (dropdown: count / percentage / currency / ratio)
- Last Updated (fecha)
- Chart (widget)

**Widgets del Dashboard:**
- Progress hacia 100 suscriptores (número grande)
- Churn Rate (gauge)
- CAC (gráfica de línea)
- NPS (termómetro)
- Llamadas por semana (bar chart)

---

#### Board 3: **Blockers & Risks** 🚨
**Columnas:**
- Week (dropdown)
- Blocker Description (texto largo)
- Impact (dropdown: High / Medium / Low)
- Status (dropdown: Active / Resolved / Monitoring)
- Action Taken (texto largo)
- Resolved Date (fecha)
- Owner (persona)

**Automations:**
- Si Blocker = Active → Enviar email a Fabiola
- Si Impact = High + Status = Active → Notificación diaria

---

#### Board 4: **Team & Delegation** 👥
**Columnas:**
- Person (persona)
- Role (texto)
- Tasks Assigned This Week (número)
- Tasks Completed (número)
- Completion Rate (fórmula)
- Notes (texto largo)

---

#### Board 5: **Metrics Tracker** 📈
**Columnas:**
- Date (fecha)
- Subscribers Count (número)
- CAC (número)
- Churn Rate (porcentaje)
- NPS (número)
- Calls Made (número)
- Revenue (número)

**Integraciones a configurar:**
- Supabase → Subscribers Count (vía Zapier)
- Facebook Ads → CAC (vía integración nativa)
- Google Sheets → Calls Made (vía integración nativa)

---

## 🤖 Automations a configurar

### Critical Automation 1: **Blocker Detection**
**Trigger:** Week ends + KPI below target
**Action:** Create item in Blockers board + Notify Fabiola

### Critical Automation 2: **CAC Alert**
**Trigger:** CAC > $25
**Action:** Send notification + Change status to "Action Required"

### Critical Automation 3: **Task Dependencies**
**Trigger:** Task marked Done
**Action:** Move dependent tasks to "Ready to Start"

### Critical Automation 4: **Daily Standup**
**Trigger:** Every day 9am
**Action:** Send summary of today's critical tasks to Fabiola

### Critical Automation 5: **Weekly Report**
**Trigger:** Every Sunday 6pm
**Action:** Generate and send weekly KPIs summary

---

## 📊 Dashboard Widgets a crear

### Widget 1: **Progress to 100**
- Tipo: Numbers
- Source: Metrics Tracker → Subscribers Count
- Display: 57 / 100 (ejemplo)

### Widget 2: **CAC Trend**
- Tipo: Chart
- Source: Metrics Tracker → CAC
- Display: Line chart últimos 60 días

### Widget 3: **Weekly Tasks**
- Tipo: Workload
- Source: 60-Day Timeline → Owner + Due Date
- Display: Tasks por persona por semana

### Widget 4: **Blockers Active**
- Tipo: Battery
- Source: Blockers & Risks → Status = Active
- Display: Número de blockers activos

### Widget 5: **Churn Rate**
- Tipo: Gauge
- Source: Metrics Tracker → Churn Rate
- Display: 0-10% (verde), 10-15% (amarillo), 15%+ (rojo)

---

## 🔗 Integraciones necesarias

### 1. Supabase → Monday.com (vía Zapier)
**Zap:** New row in user_accounts → Update Subscribers Count

### 2. Facebook Ads → Monday.com
**Integration:** Native Facebook Ads integration
**Sync:** CAC, CPC, CTR diario

### 3. Google Sheets → Monday.com
**Integration:** Native Google Sheets integration
**Sync:** Call transcripts count

### 4. Slack → Monday.com (opcional)
**Integration:** Native Slack integration
**Notifications:** Blockers, Critical tasks overdue

---

## 📱 Mobile App Setup

1. Descargar Monday.com app (iOS/Android)
2. Login con tu cuenta
3. Configurar notificaciones:
   - ✅ Task assigned to me
   - ✅ Task overdue
   - ✅ Blocker created
   - ✅ Daily standup
   - ❌ Comments (demasiado ruido)

---

## 🎨 Color Coding

- **Semana 1-2:** Azul (Setup)
- **Semana 3-4:** Verde (Escalar)
- **Semana 5-6:** Amarillo (Delegar)
- **Semana 7-8:** Naranja (Documentar)
- **Semana 9:** Rojo (GO/NO-GO)

**Priority Colors:**
- 🔴 Critical
- 🟠 High
- 🟡 Medium
- 🟢 Low

---

## ⏱️ Timeline de Setup

**Total: 45 minutos**

1. Crear cuenta + workspace (5 min)
2. Crear 5 boards (15 min)
3. Importar 120 tasks del JSON (10 min)
4. Configurar automations (10 min)
5. Crear dashboard widgets (5 min)

---

## 🚀 Próximos Pasos

Una vez que crees tu cuenta:

1. **Invítame como Admin** para que pueda configurar todo
2. O dame acceso temporal y yo lo configuro
3. Te grabo un Loom de 10 minutos explicando cómo usar todo
4. ¡Listo para lanzar tu MVP!

---

## 💡 Tips Pro

1. **Vista principal:** Siempre abre Dashboard primero para ver el big picture
2. **Check diario:** Usa la vista Timeline para ver qué toca hoy
3. **Fin de semana:** Revisa Blockers board y cierra la semana
4. **Mobile:** Marca tasks como Done desde el teléfono
5. **Backup:** Monday exporta a Excel/CSV automáticamente

---

## 🆘 Soporte

- Monday.com tiene chat 24/7
- Video tutorials: https://monday.com/resources/
- Community: https://community.monday.com/

---

**Cuando tengas tu cuenta lista, avísame y configuro todo en 30 minutos! 🎉**
