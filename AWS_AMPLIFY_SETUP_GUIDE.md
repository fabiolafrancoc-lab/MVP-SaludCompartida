# 🚀 GUÍA: Conectar GitHub a AWS Amplify
## SaludCompartida - Deployment Setup

---

**Fecha:** 27 de Enero, 2026  
**Repositorio:** fabiolafrancoc-lab/MVP-SaludCompartida  
**Framework:** Next.js 16.1.3 (App Router + Turbopack)

---

## 📋 PREREQUISITOS

Antes de comenzar, asegúrate de tener:

- ✅ Cuenta de AWS activa ([aws.amazon.com](https://aws.amazon.com))
- ✅ Repositorio en GitHub (ya lo tienes: `fabiolafrancoc-lab/MVP-SaludCompartida`)
- ✅ Permisos de administrador en el repositorio
- ✅ Variables de entorno listas (Supabase, Square, etc.)

---

## 🔧 PASO 1: Acceder a AWS Amplify Console

1. **Inicia sesión en AWS Console:**
   - Ve a: https://console.aws.amazon.com
   - Ingresa tus credenciales de AWS

2. **Busca AWS Amplify:**
   - En la barra de búsqueda superior, escribe: `Amplify`
   - Haz clic en **"AWS Amplify"** en los resultados
   - O ve directo a: https://console.aws.amazon.com/amplify/

3. **Región:**
   - En la esquina superior derecha, selecciona tu región preferida
   - Recomendado: **us-east-1 (N. Virginia)** para mejor compatibilidad

---

## 📦 PASO 2: Crear Nueva App en Amplify

1. **Haz clic en "Create new app"** (botón naranja)

2. **Selecciona Source Code Provider:**
   - Elige: **GitHub**
   - Haz clic en **"Continue"**

3. **Autorizar AWS Amplify en GitHub:**
   - Se abrirá una ventana emergente de GitHub
   - Haz clic en **"Authorize AWS Amplify"**
   - Ingresa tu contraseña de GitHub si es necesario
   - Selecciona la organización: **fabiolafrancoc-lab**
   - Puedes dar acceso a:
     - **Todos los repositorios** (All repositories), O
     - **Solo repositorios seleccionados** (Only select repositories) → Elige `MVP-SaludCompartida`
   - Haz clic en **"Install & Authorize"**

---

## 🔗 PASO 3: Seleccionar Repositorio y Branch

1. **Repository:**
   - En el dropdown, selecciona: `fabiolafrancoc-lab/MVP-SaludCompartida`

2. **Branch:**
   - Selecciona: `main` (tu rama principal)
   - Puedes agregar más ramas después si necesitas staging

3. **Monorepo (si aplica):**
   - Si tienes múltiples apps en el repo, especifica la carpeta
   - En tu caso: **Déjalo vacío** (Next.js está en la raíz)

4. **Haz clic en "Next"**

---

## ⚙️ PASO 4: Configurar Build Settings

AWS Amplify detectará automáticamente que es un proyecto Next.js. Verifica la configuración:

### Build Configuration Auto-detectada:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### ⚠️ IMPORTANTE: Modificar para Next.js 16 + Turbopack

Haz clic en **"Edit"** y reemplaza con esta configuración:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
        - echo "Installing dependencies..."
    build:
      commands:
        - echo "Building Next.js with Turbopack..."
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### App Name:
- Nombre sugerido: **saludcompartida-mvp** (sin espacios)

### Environment Variables (crítico):
- Haz clic en **"Advanced settings"** → **"Environment variables"**
- Agrega TODAS tus variables de entorno:

```
SUPABASE_URL=https://xxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SQUARE_APPLICATION_ID=sandbox-sq0idb-...
SQUARE_ACCESS_TOKEN=EAAAl...
SQUARE_LOCATION_ID=LH5Z...
NEXT_PUBLIC_SQUARE_APPLICATION_ID=sandbox-sq0idb-...
NEXT_PUBLIC_SQUARE_LOCATION_ID=LH5Z...
# ... todas tus otras variables
```

⚠️ **CRÍTICO:** Sin las variables de entorno, la app no funcionará.

### Haz clic en "Next"

---

## 🎯 PASO 5: Review y Deploy

1. **Review Summary:**
   - Verifica que todo esté correcto:
     - Repository: `MVP-SaludCompartida`
     - Branch: `main`
     - Build settings: Configuración Next.js
     - Environment variables: Todas agregadas

2. **Haz clic en "Save and Deploy"**

3. **Proceso de Deploy:**
   - AWS Amplify creará automáticamente:
     - ✅ Pipeline de CI/CD
     - ✅ URL de preview (ej: `https://main.xxxxxxxxx.amplifyapp.com`)
     - ✅ SSL certificate (HTTPS automático)
     - ✅ CDN global

4. **Tiempo de Deploy:**
   - **Provision:** ~30 segundos
   - **Build:** ~3-5 minutos (primera vez)
   - **Deploy:** ~1 minuto
   - **Total:** ~5-7 minutos

---

## 📊 PASO 6: Monitorear el Deploy

Mientras se despliega, verás 4 fases:

1. **Provision** (verde ✅)
   - Configura el entorno de build

2. **Build** (naranja 🔄)
   - Ejecuta `npm ci` y `npm run build`
   - Aquí verás los logs en tiempo real
   - Si hay errores, aparecerán aquí

3. **Deploy** (naranja 🔄)
   - Sube los archivos a la CDN
   - Configura el routing

4. **Verify** (verde ✅)
   - Valida que la app esté funcionando

### Si todo sale bien:
- Todas las fases mostrarán ✅ verde
- Verás el mensaje: **"Deployment successfully completed"**

---

## 🌐 PASO 7: Configurar Custom Domain (Opcional)

Si tienes tu dominio `saludcompartida.app`:

1. **En AWS Amplify Console:**
   - Ve a tu app → **"Domain management"** en el menú lateral
   - Haz clic en **"Add domain"**

2. **Selecciona tu dominio:**
   - Si usas **Route 53** (DNS de AWS):
     - Selecciona el dominio del dropdown
   - Si usas **otro proveedor** (GoDaddy, Namecheap, etc.):
     - Ingresa manualmente: `saludcompartida.app`

3. **Configure subdomains:**
   - Root domain: `saludcompartida.app` → apunta a `main` branch
   - Subdomain: `www.saludcompartida.app` → redirect a root
   - (Opcional) Staging: `staging.saludcompartida.app` → apunta a `staging` branch

4. **DNS Configuration:**
   - AWS Amplify te dará registros DNS para agregar:
     ```
     Type: CNAME
     Name: www
     Value: xxxxxxxxx.cloudfront.net
     
     Type: ALIAS/ANAME (or A record)
     Name: @
     Value: xxxxxxxxx.cloudfront.net
     ```
   - Copia estos registros y agrégalos en tu proveedor de DNS

5. **SSL Certificate:**
   - AWS Amplify genera automáticamente un certificado SSL gratis
   - Validación puede tomar 5-10 minutos

6. **Espera propagación:**
   - DNS puede tomar 5-48 horas en propagarse globalmente
   - Usualmente funciona en 15-30 minutos

---

## 🔄 PASO 8: Configurar Auto-Deploy

**¡Ya está configurado automáticamente!** 🎉

Cada vez que hagas `git push` a la rama `main`:
1. AWS Amplify detecta el cambio (webhook de GitHub)
2. Inicia build automáticamente
3. Despliega la nueva versión
4. Tu app se actualiza en ~3-5 minutos

### Desactivar auto-deploy (si necesitas):
1. Ve a **"Build settings"** → **"Branches"**
2. Haz clic en el branch `main`
3. Toggle **"Automatic build"** a OFF

---

## 🐛 TROUBLESHOOTING

### Error: "Build failed - Module not found"

**Causa:** Alguna dependencia falta en `package.json`

**Solución:**
```bash
# Local, verifica que compile
npm run build

# Si falla, instala la dependencia
npm install <paquete-faltante>

# Commit y push
git add package.json package-lock.json
git commit -m "Fix: Add missing dependency"
git push
```

### Error: "Environment variable not defined"

**Causa:** Olvidaste agregar una variable de entorno

**Solución:**
1. Ve a **"Environment variables"** en Amplify Console
2. Haz clic en **"Manage variables"**
3. Agrega la variable faltante
4. Haz clic en **"Redeploy this version"**

### Error: "Build timeout"

**Causa:** El build toma más de 30 minutos (límite default)

**Solución:**
1. Ve a **"Build settings"** → **"Build image settings"**
2. Aumenta el timeout a 60 minutos
3. O optimiza tu build (menos dependencies, faster build)

### Error: "404 on page refresh"

**Causa:** Next.js App Router necesita configuración especial

**Solución:**
1. Ve a **"Rewrites and redirects"**
2. Agrega esta regla:
   ```
   Source: /<*>
   Target: /index.html
   Type: 200 (Rewrite)
   ```

### Build OK pero la página está en blanco

**Causa:** Variables de entorno faltantes o incorrectas

**Solución:**
1. Revisa los logs del browser (F12 → Console)
2. Verifica que todas las `NEXT_PUBLIC_*` variables estén en Amplify
3. Redeploy después de agregar variables

---

## 📊 COMPARACIÓN: Vercel vs AWS Amplify

| Feature | Vercel | AWS Amplify |
|---------|--------|-------------|
| **Setup** | Más simple | Requiere más pasos |
| **Build Speed** | Más rápido | Un poco más lento |
| **Free Tier** | Generoso | Limitado (1000 build mins/mes) |
| **Global CDN** | ✅ | ✅ |
| **Custom Domain** | ✅ Fácil | ✅ Requiere DNS config |
| **Auto SSL** | ✅ | ✅ |
| **Preview Deploys** | ✅ | ✅ |
| **Integración AWS** | ❌ | ✅ Nativa |
| **Cost (producción)** | $20/mes | Variable (~$15-50/mes) |

### ¿Cuándo usar AWS Amplify?

✅ Si ya usas otros servicios de AWS (RDS, S3, Lambda, etc.)  
✅ Si necesitas integración tight con AWS ecosystem  
✅ Si tu empresa tiene contratos enterprise con AWS  
✅ Si necesitas compliance específico (HIPAA, SOC2 en AWS)

### ¿Cuándo usar Vercel?

✅ Para deploys más rápidos y simples  
✅ Si no necesitas servicios de AWS  
✅ Para prototyping y MVPs rápidos  
✅ Si priorizas developer experience sobre control

---

## 💰 COSTOS DE AWS AMPLIFY

### Free Tier (12 meses):
- ✅ 1,000 build minutes/mes
- ✅ 15 GB hosting storage
- ✅ 100 GB data transfer/mes

### Después del Free Tier:
- **Build minutes:** $0.01/minuto (~$3-5/mes con 3 builds/día)
- **Hosting:** $0.023/GB almacenado (~$0.50/mes)
- **Data transfer:** $0.15/GB servido (~$5-15/mes según tráfico)

**Estimado mensual para tu MVP:** $10-25/mes

---

## 🔐 SEGURIDAD

### Variables de Entorno:
- ✅ Encriptadas en reposo
- ✅ No aparecen en logs de build
- ✅ Solo accesibles durante build y runtime

### HTTPS:
- ✅ Automático con AWS Certificate Manager
- ✅ TLS 1.2+
- ✅ HSTS habilitado

### Headers de Seguridad:
Agrega en **"Rewrites and redirects"**:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

---

## 📈 MONITOREO Y LOGS

### CloudWatch Logs:
1. Ve a AWS CloudWatch Console
2. Busca log group: `/aws/amplify/saludcompartida-mvp`
3. Verás:
   - Build logs
   - Runtime logs (SSR)
   - Error traces

### Métricas:
- Requests/minuto
- Data transfer
- Build duration
- Error rate

### Alertas:
1. Ve a **"Monitoring"** en Amplify Console
2. Configura alertas para:
   - Build failures
   - High error rate
   - Quota limits

---

## 🚀 OPTIMIZACIONES

### Build Time:
```yaml
# En amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci --prefer-offline --no-audit
    build:
      commands:
        - npm run build
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### Performance:
- ✅ CDN automático (CloudFront)
- ✅ HTTP/2 enabled
- ✅ Brotli compression
- ✅ Image optimization (Next.js built-in)

---

## 🔄 ROLLBACK

Si un deploy falla o tiene bugs:

1. Ve a **"Deployments"** en Amplify Console
2. Busca el deploy anterior que funcionaba (con ✅)
3. Haz clic en **"Redeploy this version"**
4. Tu app volverá a la versión anterior en ~2 minutos

---

## 📞 SOPORTE

### AWS Support:
- **Developer:** $29/mes (email support)
- **Business:** $100/mes (24/7 phone + chat)

### Community:
- [AWS Amplify Docs](https://docs.amplify.aws/)
- [AWS re:Post](https://repost.aws/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/aws-amplify)

---

## ✅ CHECKLIST FINAL

Antes de considerar el deploy completo:

- [ ] App se despliega sin errores
- [ ] Todas las páginas cargan correctamente
- [ ] Variables de entorno configuradas
- [ ] Custom domain (si aplica) funcionando
- [ ] SSL certificate activo (HTTPS)
- [ ] Forms y navegación funcionan
- [ ] Supabase conecta correctamente
- [ ] Square payment integration funciona
- [ ] Mobile responsive (test en celular real)
- [ ] Performance aceptable (< 3s load time)
- [ ] No hay errores en console del browser
- [ ] Logs de CloudWatch limpios

---

## 🎉 SIGUIENTE PASO

Una vez conectado GitHub a AWS Amplify:

1. **Monitor el primer deploy** (5-7 minutos)
2. **Test la app** en la URL de Amplify
3. **Configura custom domain** si lo tienes
4. **Configura alertas** de CloudWatch
5. **Documenta la URL** para tu equipo

---

**¿Prefieres Vercel?** Es más rápido de configurar. Déjame saber si quieres cambiar a Vercel en vez de Amplify.

---

**Creado:** 27 de Enero, 2026  
**Última actualización:** 27 de Enero, 2026  
**Versión:** 1.0.0

