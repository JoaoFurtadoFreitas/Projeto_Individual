const sql = require('../scripts/db');

module.exports = {
  async createLabel(req, res) {
    const { nome } = req.body;

    try {
      await sql`
        INSERT INTO labels (nome) VALUES (${nome})
      `;
      res.status(201).send('Label criada');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao criar label');
    }
  },

  async listLabels(req, res) {
    try {
      const labels = await sql`SELECT * FROM labels`;
      res.json(labels);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao listar labels');
    }
  }
};
