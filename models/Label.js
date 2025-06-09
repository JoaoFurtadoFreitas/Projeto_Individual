const db = require('../scripts/db');

module.exports = {
  findAll: async () => {
    const result = await db.query('SELECT * FROM label ORDER BY nome');
    return result.rows;
  },

  create: async (nome) => {
    const result = await db.query(
      'INSERT INTO label (nome) VALUES ($1) RETURNING *',
      [nome]
    );
    return result.rows[0];
  }
};

