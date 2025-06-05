const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});



const runSQLScript = async () => {
  try {
    const filePath = path.join(__dirname, 'init.sql');
    const sql = fs.readFileSync(filePath, 'utf8');

    console.log('Conectando ao banco de dados...');
    await pool.query(sql);
    console.log('Script SQL executado com sucesso!');
  } catch (err) {
    console.error('Erro ao executar o script SQL:', err);
  } finally {
    await pool.end();
  }
};

runSQLScript();
