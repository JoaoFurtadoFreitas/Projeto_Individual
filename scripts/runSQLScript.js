const fs = require('fs');
const path = require('path');
require('dotenv').config();
const sql = require('./db.js');

const runSQLScript = async () => {
  try {
    const filePath = path.join(__dirname, './init.sql');
    const file = fs.readFileSync(filePath, 'utf8');
    console.log('Conectando ao banco de dados...');
    await sql.unsafe(file);
    console.log('✅ Script SQL executado com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao executar o script SQL:', err);
  } finally {
    await sql.end(); 
  }
};

runSQLScript();