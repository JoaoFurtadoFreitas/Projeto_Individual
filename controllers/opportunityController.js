const sql = require('../scripts/db');

module.exports = {
  async createOpportunity(req, res) {
    const {
      titulo, descricao, tipo, data_limite, autor_id, empresa, link_externo, destaque
    } = req.body;

    try {
      await sql`
        INSERT INTO opportunities 
        (titulo, descricao, tipo, data_limite, autor_id, empresa, link_externo, destaque)
        VALUES (${titulo}, ${descricao}, ${tipo}, ${data_limite}, ${autor_id}, ${empresa}, ${link_externo}, ${destaque})
      `;

      res.status(201).send('Oportunidade criada');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao criar oportunidade');
    }
  },

  async listOpportunities(req, res) {
    try {
      const opportunities = await sql`SELECT * FROM opportunities ORDER BY criado_em DESC`;
      res.json(opportunities);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao listar oportunidades');
    }
  }
};
