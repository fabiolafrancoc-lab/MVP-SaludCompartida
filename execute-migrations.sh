#!/bin/bash

# Script para ejecutar todas las migraciones de Supabase
# Requiere: curl, jq

SUPABASE_URL="https://rzmdekjegbdgitqekjee.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6bWRla2plZ2JkZ2l0cWVramVlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzM1OTQ4NywiZXhwIjoyMDc4OTM1NDg3fQ.Yymz6ef5Khexv1jr79LXGTSCvqHzzszTitqKNImKEVQ"

MIGRATIONS_DIR="./supabase/migrations"

echo "🚀 Iniciando ejecución de migraciones de Salud Compartida"
echo ""

declare -a MIGRATIONS=(
    "create_ai_companions_table.sql"
    "create_behavioral_codes_table.sql"
    "create_beneficiaries_table.sql"
    "create_medical_history_table.sql"
    "create_service_usage_table.sql"
    "create_companion_calls_table.sql"
    "create_scheduled_callbacks_table.sql"
    "create_urgent_notifications_table.sql"
    "create_triggers.sql"
)

SUCCESS=0
FAIL=0

for migration in "${MIGRATIONS[@]}"; do
    echo "📝 Ejecutando: $migration..."
    
    filepath="$MIGRATIONS_DIR/$migration"
    
    if [ ! -f "$filepath" ]; then
        echo "❌ Archivo no encontrado: $filepath"
        FAIL=$((FAIL + 1))
        continue
    fi
    
    # Leer el contenido del archivo SQL
    sql_content=$(cat "$filepath")
    
    # Ejecutar via Supabase REST API
    response=$(curl -s -X POST \
        "$SUPABASE_URL/rest/v1/rpc/exec_sql" \
        -H "apikey: $SUPABASE_KEY" \
        -H "Authorization: Bearer $SUPABASE_KEY" \
        -H "Content-Type: application/json" \
        -d "{\"sql_query\": $(echo "$sql_content" | jq -Rs .)}")
    
    if [ $? -eq 0 ]; then
        echo "✅ $migration ejecutado correctamente"
        SUCCESS=$((SUCCESS + 1))
    else
        echo "❌ Error ejecutando $migration"
        echo "   Respuesta: $response"
        FAIL=$((FAIL + 1))
    fi
    
    echo ""
done

echo "============================================================"
echo "📊 RESUMEN DE MIGRACIONES"
echo "============================================================"
echo "✅ Exitosas: $SUCCESS/${#MIGRATIONS[@]}"
echo "❌ Fallidas: $FAIL/${#MIGRATIONS[@]}"
echo "============================================================"

if [ $FAIL -gt 0 ]; then
    echo ""
    echo "⚠️  Algunas migraciones fallaron."
    echo "💡 Ejecuta las migraciones manualmente en:"
    echo "   https://supabase.com/dashboard/project/rzmdekjegbdgitqekjee/sql/new"
    exit 1
else
    echo ""
    echo "🎉 ¡Todas las migraciones se ejecutaron correctamente!"
    echo "💚 Lupita ya tiene su base de datos completa."
fi
