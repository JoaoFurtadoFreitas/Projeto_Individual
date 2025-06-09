const db = require('../scripts/db');

module.exports = {
  create: async ({ titulo, descricao, data_limite, imagem_url, link }) => {
    const result = await db.query(
      `INSERT INTO oportunidade (titulo, descricao, data_limite, imagem_url, link)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [titulo, descricao, data_limite, imagem_url, link]
    );
    return result.rows[0];
  },

  findAll: async () => {
    const result = await db.query('SELECT * FROM oportunidade ORDER BY data_limite ASC');
    return result.rows;
  },

  findProximas: async () => {
    const result = await db.query(`
      SELECT * FROM oportunidade
      WHERE data_limite >= CURRENT_DATE
      ORDER BY data_limite ASC
      LIMIT 10
    `);
    return result.rows;
  },

  findById: async (id) => {
    const result = await db.query('SELECT * FROM oportunidade WHERE id = $1', [id]);
    return result.rows[0];
  },

  findWithLabels: async (id) => {
    const oportunidadeRes = await db.query('SELECT * FROM oportunidade WHERE id = $1', [id]);
    const oportunidade = oportunidadeRes.rows[0];
    if (!oportunidade) return null;

    const labelsRes = await db.query(
      `SELECT l.* FROM label l
       JOIN oportunidade_label ol ON ol.label_id = l.id
       WHERE ol.oportunidade_id = $1`,
      [id]
    );
    oportunidade.labels = labelsRes.rows;
    return oportunidade;
  },

  findByLabels: async (labels) => {
    if (!labels || labels.length === 0) return [];

    const labelIds = labels.map(label => label.id);

    const result = await db.query(
      `
      SELECT DISTINCT o.*
      FROM oportunidade o
      JOIN oportunidade_label ol ON o.id = ol.oportunidade_id
      WHERE ol.label_id = ANY($1::int[])
      ORDER BY data_limite ASC
      LIMIT 10
      `,
      [labelIds]
    );

    return result.rows;
  },

  setLabels: async (oportunidadeId, labelIds) => {
    await db.query('DELETE FROM oportunidade_label WHERE oportunidade_id = $1', [oportunidadeId]);
    for (const labelId of labelIds) {
      await db.query(
        'INSERT INTO oportunidade_label (oportunidade_id, label_id) VALUES ($1, $2)',
        [oportunidadeId, labelId]
      );
    }
  }
};
