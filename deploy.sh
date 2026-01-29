#!/bin/bash

# 🚀 SCRIPT DE DEPLOY MANUAL - SaludCompartida
# Usar si Vercel no hace auto-deploy desde GitHub

echo "🚀 Iniciando deploy manual a Vercel..."
echo ""

# Paso 1: Verificar que estés en la rama main
BRANCH=$(git branch --show-current)
if [ "$BRANCH" != "main" ]; then
  echo "⚠️  No estás en la rama main. Cambiando..."
  git checkout main
fi

# Paso 2: Verificar que todo esté commiteado
if [ -n "$(git status --porcelain)" ]; then
  echo "⚠️  Tienes cambios sin commitear. Committeando..."
  git add .
  git commit -m "chore: Auto-commit before deploy"
  git push origin main
fi

# Paso 3: Verificar que esté sincronizado con GitHub
echo "📡 Verificando sincronización con GitHub..."
git fetch origin
LOCAL=$(git rev-parse main)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" != "$REMOTE" ]; then
  echo "⚠️  Tu rama local está desactualizada. Haciendo pull..."
  git pull origin main
fi

echo "✅ Git sincronizado con GitHub"
echo ""

# Paso 4: Deploy a Vercel
echo "🚀 Deployando a Vercel (Producción)..."
echo ""
echo "Opciones:"
echo "  1) Deploy automático (si ya está conectado)"
echo "  2) Deploy manual con Vercel CLI"
echo ""
read -p "Selecciona opción (1 o 2): " option

if [ "$option" = "1" ]; then
  echo ""
  echo "📋 PASOS PARA DEPLOY AUTOMÁTICO:"
  echo ""
  echo "1. Ve a: https://vercel.com/dashboard"
  echo "2. Selecciona tu proyecto: MVP-SaludCompartida"
  echo "3. Ve a: Settings → Git"
  echo "4. Verifica que esté conectado a: fabiolafrancoc-lab/MVP-SaludCompartida"
  echo "5. Si NO está conectado:"
  echo "   - Click 'Connect Git Repository'"
  echo "   - Selecciona GitHub → Autoriza → Selecciona repo"
  echo "6. Una vez conectado, GitHub auto-deploya en cada push"
  echo ""
  echo "7. Si ya está conectado, ve a:"
  echo "   - Deployments → Click menú (...) del último → 'Redeploy'"
  echo ""
  
elif [ "$option" = "2" ]; then
  echo ""
  echo "🔑 Primero debes hacer login en Vercel:"
  echo ""
  vercel login
  
  echo ""
  echo "✅ Login exitoso. Ahora haciendo deploy..."
  echo ""
  
  # Deploy a producción
  vercel --prod --yes
  
  if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deploy EXITOSO!"
    echo ""
    echo "🔗 Tu app está en: https://mvp-salud-compartida.vercel.app"
    echo ""
  else
    echo ""
    echo "❌ Deploy falló. Revisa los errores arriba."
    echo ""
  fi
else
  echo "Opción inválida"
  exit 1
fi

echo ""
echo "📊 RESUMEN DEL DEPLOY:"
echo "Commit actual: $LOCAL"
echo "Rama: main"
echo "Archivos en este commit:"
git show --name-status --oneline HEAD | head -20

echo ""
echo "✅ Deploy completado!"
