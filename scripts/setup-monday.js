/**
 * Script para configurar Monday.com automáticamente
 * 
 * INSTRUCCIONES:
 * 1. Ve a Monday.com → Avatar → Developers → Get API Token
 * 2. Copia tu API token
 * 3. Crea un archivo .env y agrega: MONDAY_API_TOKEN=tu_token_aqui
 * 4. Ejecuta: node scripts/setup-monday.js
 */

const fs = require('fs');
const path = require('path');

// Monday.com API endpoint
const MONDAY_API_URL = 'https://api.monday.com/v2';

// Lee el token del .env
require('dotenv').config();
const MONDAY_API_TOKEN = process.env.MONDAY_API_TOKEN;

if (!MONDAY_API_TOKEN) {
  console.error('❌ Error: MONDAY_API_TOKEN no encontrado en .env');
  console.log('\n📝 Instrucciones:');
  console.log('1. Ve a Monday.com → Avatar → Developers');
  console.log('2. Click en "Developer" → "My Access Tokens"');
  console.log('3. Crea un nuevo token');
  console.log('4. Agrega a tu .env: MONDAY_API_TOKEN=tu_token_aqui\n');
  process.exit(1);
}

// Helper function para hacer requests a Monday API
async function mondayRequest(query, variables = {}) {
  const response = await fetch(MONDAY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': MONDAY_API_TOKEN
    },
    body: JSON.stringify({ query, variables })
  });
  
  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Monday API Error: ${JSON.stringify(data.errors)}`);
  }
  
  return data.data;
}

// 1. Crear Board "60-Day Timeline"
async function createMainBoard() {
  console.log('📋 Creando board "60-Day Timeline"...');
  
  const query = `
    mutation ($name: String!, $kind: BoardKind!) {
      create_board (board_name: $name, board_kind: $kind) {
        id
        name
      }
    }
  `;
  
  const variables = {
    name: 'SaludCompartida - 60 Day Timeline',
    kind: 'public'
  };
  
  const result = await mondayRequest(query, variables);
  console.log('✅ Board creado:', result.create_board.id);
  return result.create_board.id;
}

// 2. Crear columnas personalizadas
async function createColumns(boardId) {
  console.log('📝 Creando columnas personalizadas...');
  
  const columns = [
    { title: 'Week', type: 'dropdown', settings: { labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6', 'Semana 7', 'Semana 8', 'Semana 9'] } },
    { title: 'Day', type: 'numbers' },
    { title: 'Priority', type: 'status', settings: { labels: { 0: 'Critical', 1: 'High', 2: 'Medium', 3: 'Low' } } },
    { title: 'Output Expected', type: 'long_text' },
    { title: 'Depends On', type: 'text' },
    { title: 'Timeline', type: 'timeline' }
  ];
  
  for (const col of columns) {
    const query = `
      mutation ($boardId: ID!, $title: String!, $columnType: ColumnType!) {
        create_column (board_id: $boardId, title: $title, column_type: $columnType) {
          id
          title
        }
      }
    `;
    
    await mondayRequest(query, {
      boardId,
      title: col.title,
      columnType: col.type
    });
    
    console.log(`  ✅ Columna "${col.title}" creada`);
  }
}

// 3. Importar tareas desde el JSON
async function importTasks(boardId) {
  console.log('📥 Importando tareas...');
  
  // Lee el archivo JSON con el plan de 60 días
  const mvpPlanPath = path.join(__dirname, '../mvp-60-days-plan.json');
  
  if (!fs.existsSync(mvpPlanPath)) {
    console.log('⚠️  mvp-60-days-plan.json no encontrado. Creando archivo...');
    // Aquí podrías agregar la lógica para crear el archivo si no existe
    return;
  }
  
  const mvpPlan = JSON.parse(fs.readFileSync(mvpPlanPath, 'utf-8'));
  
  let tasksCreated = 0;
  
  for (const week of mvpPlan.weeks) {
    console.log(`\n📅 ${week.name}`);
    
    for (const task of week.tasks) {
      const query = `
        mutation ($boardId: ID!, $itemName: String!, $columnValues: JSON!) {
          create_item (board_id: $boardId, item_name: $itemName, column_values: $columnValues) {
            id
          }
        }
      `;
      
      const columnValues = JSON.stringify({
        text: task.id,
        text9: task.output, // Output Expected
        status: task.priority.toLowerCase(),
        dropdown: `Semana ${week.week}`,
        numbers: task.day.toString()
      });
      
      await mondayRequest(query, {
        boardId,
        itemName: task.task,
        columnValues
      });
      
      tasksCreated++;
      process.stdout.write(`\r  ✅ Tareas importadas: ${tasksCreated}`);
    }
  }
  
  console.log(`\n✅ Total de ${tasksCreated} tareas importadas\n`);
}

// 4. Crear Dashboard con widgets
async function createDashboard(boardId) {
  console.log('📊 Creando dashboard...');
  
  const query = `
    mutation ($name: String!, $boardIds: [ID!]!) {
      create_dashboard (name: $name, board_ids: $boardIds) {
        id
        name
      }
    }
  `;
  
  const result = await mondayRequest(query, {
    name: 'SaludCompartida - KPIs Dashboard',
    boardIds: [boardId]
  });
  
  console.log('✅ Dashboard creado:', result.create_dashboard.id);
  return result.create_dashboard.id;
}

// 5. Crear automations
async function createAutomations(boardId) {
  console.log('🤖 Configurando automations...');
  
  // Monday.com automations se crean mejor desde el UI
  // Pero podemos crear las recetas básicas
  
  console.log('⚠️  Las automations se deben configurar desde Monday.com UI:');
  console.log('   1. Ve a tu board → Click "Automate"');
  console.log('   2. Busca: "When status changes to something, notify someone"');
  console.log('   3. Configura: Cuando Priority=Critical y Status=Overdue → Notificarte');
  console.log('');
}

// Función principal
async function main() {
  console.log('\n🚀 Iniciando setup de Monday.com...\n');
  
  try {
    // 1. Crear board principal
    const boardId = await createMainBoard();
    
    // 2. Crear columnas
    await createColumns(boardId);
    
    // 3. Importar tareas
    await importTasks(boardId);
    
    // 4. Crear dashboard
    const dashboardId = await createDashboard(boardId);
    
    // 5. Info sobre automations
    await createAutomations(boardId);
    
    console.log('\n✅ ¡Setup completado!\n');
    console.log('📋 Tu board: https://monday.com/boards/' + boardId);
    console.log('📊 Tu dashboard: https://monday.com/boards/' + dashboardId);
    console.log('\n🎉 ¡Listo para empezar tu MVP de 60 días!\n');
    
  } catch (error) {
    console.error('\n❌ Error durante setup:', error.message);
    process.exit(1);
  }
}

// Ejecutar
main();
