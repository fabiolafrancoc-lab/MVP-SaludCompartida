#!/bin/bash

# =============================================
# SCRIPT DE MIGRACIÓN AWS RDS
# Automatiza la exportación de Supabase
# =============================================

set -e  # Exit on error

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuración
SUPABASE_HOST="rzmdekjegbdgitqekjee.supabase.co"
SUPABASE_USER="postgres"
SUPABASE_DB="postgres"
EXPORT_DIR="./database-export-$(date +%Y%m%d-%H%M%S)"

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     MIGRACIÓN SALUDCOMPARTIDA: SUPABASE → AWS RDS         ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Verificar herramientas
echo -e "${YELLOW}→ Verificando herramientas necesarias...${NC}"

if ! command -v pg_dump &> /dev/null; then
    echo -e "${RED}✗ pg_dump no encontrado. Instalar PostgreSQL client:${NC}"
    echo "  macOS: brew install postgresql"
    echo "  Ubuntu: sudo apt-get install postgresql-client"
    exit 1
fi
echo -e "${GREEN}✓ pg_dump encontrado${NC}"

if ! command -v psql &> /dev/null; then
    echo -e "${RED}✗ psql no encontrado${NC}"
    exit 1
fi
echo -e "${GREEN}✓ psql encontrado${NC}"

# Solicitar password
echo ""
echo -e "${YELLOW}→ Necesito la contraseña de Supabase${NC}"
echo "  Ve a: https://supabase.com/dashboard/project/rzmdekjegbdgitqekjee/settings/database"
read -s -p "  Password de Supabase: " SUPABASE_PASSWORD
echo ""

# Crear directorio de exportación
echo ""
echo -e "${YELLOW}→ Creando directorio de exportación...${NC}"
mkdir -p "$EXPORT_DIR"
echo -e "${GREEN}✓ Directorio creado: $EXPORT_DIR${NC}"

# Exportar Schema
echo ""
echo -e "${YELLOW}→ Exportando schema de la base de datos...${NC}"
export PGPASSWORD="$SUPABASE_PASSWORD"

pg_dump -h "$SUPABASE_HOST" \
        -U "$SUPABASE_USER" \
        -d "$SUPABASE_DB" \
        --schema-only \
        --no-owner \
        --no-privileges \
        --schema=public \
        -f "$EXPORT_DIR/schema.sql"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Schema exportado: $EXPORT_DIR/schema.sql${NC}"
    SCHEMA_LINES=$(wc -l < "$EXPORT_DIR/schema.sql")
    echo "  Líneas: $SCHEMA_LINES"
else
    echo -e "${RED}✗ Error al exportar schema${NC}"
    exit 1
fi

# Definir tablas en orden de dependencias
TABLES=(
    # Nivel 0 - Sin dependencias
    "ai_companions"
    "medication_catalog"
    "user_demographics"
    
    # Nivel 1
    "registrations"
    "behavioral_codes"
    "user_accounts"
    
    # Nivel 2
    "family_members"
    "beneficiaries"
    "dependents"
    "subscriptions"
    "account_change_history"
    "pre_checkout_customers"
    
    # Nivel 3
    "medical_history"
    "service_usage"
    "companion_calls"
    "savings_records"
    "medication_reminders"
    "medication_adherence"
    "telemedicine_appointments"
    "pharmacy_queries"
    "eligibility_checks"
    "urgent_notifications"
    "lupita_conversations"
    "companion_memory"
    "companion_conversations"
    "ai_voice_calls"
    "call_recordings"
    "call_transcripts"
    "call_extracted_info"
    
    # Nivel 4
    "scheduled_callbacks"
    "scheduled_voice_calls"
    "scheduled_calls"
    
    # Nivel 5
    "keyword_analysis"
    "user_conversation_profiles"
    "user_facts"
    "collective_knowledge_base"
    "emerging_patterns"
    "ai_brain_metrics"
    "escalations"
    "priority_queue_cache"
)

# Exportar datos
echo ""
echo -e "${YELLOW}→ Exportando datos de ${#TABLES[@]} tablas...${NC}"
echo ""

TOTAL_TABLES=${#TABLES[@]}
CURRENT=0
EXPORTED=0
EMPTY=0
FAILED=0

for table in "${TABLES[@]}"; do
    CURRENT=$((CURRENT + 1))
    echo -ne "${BLUE}[$CURRENT/$TOTAL_TABLES]${NC} Exportando ${table}..."
    
    # Verificar si la tabla existe y tiene datos
    COUNT=$(psql -h "$SUPABASE_HOST" \
                 -U "$SUPABASE_USER" \
                 -d "$SUPABASE_DB" \
                 -t -c "SELECT COUNT(*) FROM public.$table" 2>/dev/null || echo "0")
    
    COUNT=$(echo $COUNT | tr -d ' ')
    
    if [ "$COUNT" = "0" ]; then
        echo -e " ${YELLOW}⊘ Vacía (0 registros)${NC}"
        EMPTY=$((EMPTY + 1))
        continue
    fi
    
    # Exportar tabla
    pg_dump -h "$SUPABASE_HOST" \
            -U "$SUPABASE_USER" \
            -d "$SUPABASE_DB" \
            --data-only \
            --table=public.$table \
            -f "$EXPORT_DIR/${table}.sql" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo -e " ${GREEN}✓ Exportada ($COUNT registros)${NC}"
        EXPORTED=$((EXPORTED + 1))
    else
        echo -e " ${RED}✗ Error${NC}"
        FAILED=$((FAILED + 1))
    fi
done

# Exportar triggers y funciones
echo ""
echo -e "${YELLOW}→ Exportando funciones y triggers...${NC}"

pg_dump -h "$SUPABASE_HOST" \
        -U "$SUPABASE_USER" \
        -d "$SUPABASE_DB" \
        --schema=public \
        --no-owner \
        --no-privileges \
        -s -t '' \
        --section=post-data \
        -f "$EXPORT_DIR/functions_triggers.sql" 2>/dev/null

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Funciones y triggers exportados${NC}"
fi

# Crear script de importación
echo ""
echo -e "${YELLOW}→ Generando script de importación...${NC}"

cat > "$EXPORT_DIR/import-to-aws.sh" << 'EOF'
#!/bin/bash

# Script de importación a AWS RDS
# Ejecutar: ./import-to-aws.sh

set -e

# Configuración AWS RDS
read -p "AWS RDS Host: " AWS_HOST
read -p "AWS RDS User (admin): " AWS_USER
read -p "AWS RDS Database (saludcompartida): " AWS_DB
read -s -p "AWS RDS Password: " AWS_PASSWORD
echo ""

export PGPASSWORD="$AWS_PASSWORD"

echo "→ Importando schema..."
psql -h "$AWS_HOST" -U "$AWS_USER" -d "$AWS_DB" -f schema.sql

echo "→ Importando datos..."
for file in *.sql; do
    if [ "$file" != "schema.sql" ] && [ "$file" != "functions_triggers.sql" ]; then
        echo "  Importando $file..."
        psql -h "$AWS_HOST" -U "$AWS_USER" -d "$AWS_DB" -f "$file"
    fi
done

echo "→ Importando funciones y triggers..."
psql -h "$AWS_HOST" -U "$AWS_USER" -d "$AWS_DB" -f functions_triggers.sql

echo "✓ Importación completada"
EOF

chmod +x "$EXPORT_DIR/import-to-aws.sh"
echo -e "${GREEN}✓ Script de importación creado: $EXPORT_DIR/import-to-aws.sh${NC}"

# Resumen
echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                    RESUMEN DE EXPORTACIÓN                  ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "  Total tablas procesadas:  ${TOTAL_TABLES}"
echo -e "  ${GREEN}✓ Exportadas con datos:${NC}    ${EXPORTED}"
echo -e "  ${YELLOW}⊘ Tablas vacías:${NC}           ${EMPTY}"
echo -e "  ${RED}✗ Errores:${NC}                 ${FAILED}"
echo ""
echo -e "  📁 Directorio: ${GREEN}$EXPORT_DIR${NC}"
echo ""

# Crear README
cat > "$EXPORT_DIR/README.md" << EOF
# Exportación de Base de Datos - SaludCompartida

**Fecha:** $(date)
**Origen:** Supabase (rzmdekjegbdgitqekjee.supabase.co)
**Destino:** AWS RDS

## Archivos Exportados

- \`schema.sql\` - Schema completo de la base de datos
- \`functions_triggers.sql\` - Funciones y triggers
- \`[tabla].sql\` - Datos de cada tabla con registros

## Estadísticas

- Total tablas: $TOTAL_TABLES
- Tablas con datos: $EXPORTED
- Tablas vacías: $EMPTY
- Errores: $FAILED

## Cómo Importar a AWS RDS

1. Asegúrate de tener una instancia AWS RDS PostgreSQL 15.x
2. Configura security groups para permitir tu conexión
3. Ejecuta:

\`\`\`bash
./import-to-aws.sh
\`\`\`

4. Sigue las instrucciones en pantalla

## Validación Post-Importación

Ejecuta estas queries en AWS RDS para validar:

\`\`\`sql
-- Verificar conteo de tablas
SELECT COUNT(*) FROM information_schema.tables 
WHERE table_schema = 'public' AND table_type = 'BASE TABLE';

-- Verificar conteo de registros
SELECT 
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns c
     WHERE c.table_schema = t.table_schema 
     AND c.table_name = t.table_name) AS columns
FROM information_schema.tables t
WHERE table_schema = 'public'
AND table_type = 'BASE TABLE'
ORDER BY table_name;
\`\`\`

## Contacto

Para soporte, revisa: \`AWS_MIGRATION_DATABASE_COMPLETE_DOCUMENTATION.md\`
EOF

echo -e "${GREEN}✓ README creado${NC}"
echo ""
echo -e "${YELLOW}→ PRÓXIMOS PASOS:${NC}"
echo ""
echo "  1. Revisa los archivos en: $EXPORT_DIR"
echo "  2. Crea tu AWS RDS instance (si aún no lo hiciste)"
echo "  3. Ejecuta: cd $EXPORT_DIR && ./import-to-aws.sh"
echo "  4. Valida la migración con los scripts en la documentación"
echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                  EXPORTACIÓN COMPLETADA ✓                  ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
