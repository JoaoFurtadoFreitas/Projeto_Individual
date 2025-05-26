const sql = require('../scripts/db');
const bcrypt = require('bcrypt');

module.exports = {
  loginForm(req, res) {
    res.render('auth/login');
  },

  async login(req, res) {
    const { email, senha } = req.body;

    try {
      const [user] = await sql`
        SELECT * FROM users WHERE email = ${email}
      `;

      if (!user) return res.status(404).send('Usuário não encontrado');

      const match = await bcrypt.compare(senha, user.senha_hash);
      if (!match) return res.status(401).send('Senha incorreta');

      // Sessão ou token (a depender da implementação futura)
      res.send('Login bem-sucedido!');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro no login');
    }
  }
};
