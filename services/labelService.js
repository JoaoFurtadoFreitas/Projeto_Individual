const db = require('../scripts/db');

// Função auxiliar declarada fora do objeto
async function criarLabel(nome) {
  await db.query('INSERT INTO label (nome) VALUES ($1)', [nome]);
}

module.exports = {
  // Lista todas as labels disponíveis
  listLabels: async () => {
    const result = await db.query('SELECT * FROM label');
    return result.rows;
  },

  criarLabel, // adiciona a função ao exports

  // Associa um conjunto de labels a um usuário (substitui as antigas)
  saveUserLabels: async (userId, labelIds) => {
    await db.query('DELETE FROM usuario_label WHERE usuario_id = $1', [userId]);
    const insertPromises = labelIds.map(labelId => {
      return db.query(
        'INSERT INTO usuario_label (usuario_id, label_id) VALUES ($1, $2)',
        [userId, labelId]
      );
    });
    await Promise.all(insertPromises);
  },

  // Adiciona uma nova label se não existir
  addLabelIfNotExists: async (nome) => {
    const existing = await db.query('SELECT * FROM label WHERE nome = $1', [nome]);
    if (existing.rows.length > 0) return existing.rows[0];
    const result = await db.query('INSERT INTO label (nome) VALUES ($1) RETURNING *', [nome]);
    return result.rows[0];
  }
};
