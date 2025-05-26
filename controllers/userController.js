const sql = require('../scripts/db');
const bcrypt = require('bcrypt');

module.exports = {
  async createUser(req, res) {
    const { nome, email, senha, tipo } = req.body;

    try {
      const senhaHash = await bcrypt.hash(senha, 10);

      await sql`
        INSERT INTO users (nome, email, senha_hash, tipo)
        VALUES (${nome}, ${email}, ${senhaHash}, ${tipo})
      `;

      res.status(201).send('Usuário criado com sucesso');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao criar usuário');
    }
  },

  async listUsers(req, res) {
    try {
      const users = await sql`SELECT id, nome, email, tipo, criado_em FROM users`;
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao listar usuários');
    }
  }
};
