#!/usr/bin/env python3
"""
Script para ejecutar todas las migraciones de Supabase en orden
Ejecutar: python3 execute-migrations.py
"""

import os
import sys
from pathlib import Path
from supabase import create_client, Client

# Cargar variables de entorno
from dotenv import load_dotenv
load_dotenv()

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print('❌ Error: SUPABASE_URL y SUPABASE_SERVICE_KEY deben estar definidos en .env')
    sys.exit(1)

# Crear cliente de Supabase
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Lista de migraciones en orden de ejecución
MIGRATIONS = [
    'create_ai_companions_table.sql',
    'create_behavioral_codes_table.sql',
    'create_beneficiaries_table.sql',
    'create_medical_history_table.sql',
    'create_service_usage_table.sql',
    'create_companion_calls_table.sql',
    'create_scheduled_callbacks_table.sql',
    'create_urgent_notifications_table.sql',
    'create_triggers.sql'
]

def execute_migration(filename: str) -> bool:
    """Ejecuta una migración SQL"""
    print(f'\n📝 Ejecutando: {filename}...')
    
    migrations_dir = Path(__file__).parent / 'supabase' / 'migrations'
    filepath = migrations_dir / filename
    
    if not filepath.exists():
        print(f'❌ Archivo no encontrado: {filepath}')
        return False
    
    sql = filepath.read_text(encoding='utf-8')
    
    try:
        # Ejecutar el SQL directamente
        response = supabase.postgrest.rpc('exec_sql', {'sql_query': sql}).execute()
        print(f'✅ {filename} ejecutado correctamente')
        return True
    except Exception as e:
        print(f'❌ Error ejecutando {filename}: {str(e)}')
        return False

def main():
    print('🚀 Iniciando ejecución de migraciones de Salud Compartida\n')
    print(f'📊 Total de migraciones: {len(MIGRATIONS)}')
    print(f'🔗 Supabase URL: {SUPABASE_URL}\n')
    
    success_count = 0
    fail_count = 0
    
    for migration in MIGRATIONS:
        if execute_migration(migration):
            success_count += 1
        else:
            fail_count += 1
            print('\n⚠️  Continuando con siguiente migración...\n')
    
    print('\n' + '=' * 60)
    print('📊 RESUMEN DE MIGRACIONES')
    print('=' * 60)
    print(f'✅ Exitosas: {success_count}/{len(MIGRATIONS)}')
    print(f'❌ Fallidas: {fail_count}/{len(MIGRATIONS)}')
    print('=' * 60)
    
    if fail_count > 0:
        print('\n⚠️  Algunas migraciones fallaron. Revisa los errores arriba.')
        print('💡 Puedes ejecutar las migraciones manualmente en:')
        print('   https://supabase.com/dashboard/project/rzmdekjegbdgitqekjee/sql/new')
        sys.exit(1)
    else:
        print('\n🎉 ¡Todas las migraciones se ejecutaron correctamente!')
        print('💚 Lupita ya tiene su base de datos completa.')

if __name__ == '__main__':
    main()
