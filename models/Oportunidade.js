const db = require('../scripts/db');

module.exports = {
create: async ({ titulo, descricao, data_limite, imagem_url, link, usuario_id }) => {
  const result = await db.query(
    `INSERT INTO oportunidade (titulo, descricao, data_limite, imagem_url, link, usuario_id)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [titulo, descricao, data_limite, imagem_url, link, usuario_id]
  );
  return result.rows[0];
},

  findAll: async () => {
    const result = await db.query('SELECT * FROM oportunidade ORDER BY data_limite ASC');
    return result.rows;
  },

findProximas: async () => {
  const result = await db.query(`
    SELECT o.*, u.nome AS autor_nome, u.email AS autor_email, u.cargo AS autor_cargo
    FROM oportunidade o
    LEFT JOIN usuario u ON o.usuario_id = u.id
    WHERE o.data_limite BETWEEN CURRENT_DATE AND (CURRENT_DATE + INTERVAL '10 days')
    ORDER BY o.data_limite ASC
    LIMIT 10
  `);
  return result.rows;
},


  findById: async (id) => {
    const result = await db.query('SELECT * FROM oportunidade WHERE id = $1', [id]);
    return result.rows[0];
  },

  findWithLabels: async (id) => {
    const { rows } = await db.query(`
    SELECT o.*, 
           u.nome AS autor_nome,
           u.cargo AS autor_cargo,
           u.email AS autor_email,
           json_agg(json_build_object('id', l.id, 'nome', l.nome)) AS labels
    FROM oportunidade o
    LEFT JOIN usuario u ON u.id = o.usuario_id
    LEFT JOIN oportunidade_label ol ON ol.oportunidade_id = o.id
    LEFT JOIN label l ON l.id = ol.label_id
    WHERE o.id = $1
    GROUP BY o.id, u.id
  `, [id]);

  return rows[0];
  },

  findByLabels: async (labels) => {
  if (!labels || labels.length === 0) return [];

  const labelIds = labels.map(label => label.id);

  const result = await db.query(
    `
    SELECT o.*, u.nome AS autor_nome, u.email AS autor_email, u.cargo AS autor_cargo
    FROM oportunidade o
    JOIN oportunidade_label ol ON o.id = ol.oportunidade_id
    LEFT JOIN usuario u ON o.usuario_id = u.id
    WHERE ol.label_id = ANY($1::int[])
    ORDER BY o.data_limite ASC
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
