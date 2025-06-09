const db = require('../scripts/db');

module.exports = {
  findAll: async () => {
    const result = await db.query('SELECT * FROM usuario');
    return result.rows;
  },

  findByEmail: async (email) => {
    const result = await db.query('SELECT * FROM usuario WHERE email = $1', [email]);
    return result.rows[0];
  },

  create: async ({ nome, email, senha_hash }) => {
    const result = await db.query(
      'INSERT INTO usuario (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, senha_hash]
    );
    return result.rows[0];
  },

  updateNome: async (usuarioId, nome) => {
    await db.query('UPDATE usuario SET nome = $1 WHERE id = $2', [nome, usuarioId]);
  },

  setLabels: async (usuarioId, labelIds) => {
    await db.query('DELETE FROM usuario_label WHERE usuario_id = $1', [usuarioId]);
    for (const labelId of labelIds) {
      await db.query(
        'INSERT INTO usuario_label (usuario_id, label_id) VALUES ($1, $2)',
        [usuarioId, labelId]
      );
    }
  },

  findWithLabels: async (id) => {
    const result = await db.query('SELECT * FROM usuario WHERE id = $1', [id]);
    const usuario = result.rows[0];
    if (!usuario) return null;

    const labelsRes = await db.query(`
      SELECT l.* FROM label l
      JOIN usuario_label ul ON ul.label_id = l.id
      WHERE ul.usuario_id = $1
    `, [id]);

    usuario.labels = labelsRes.rows;
    return usuario;
  }
};

