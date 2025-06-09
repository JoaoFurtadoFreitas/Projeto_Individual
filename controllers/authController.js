const authService = require('../services/authService');

module.exports = {
  getLoginPage: (req, res) => res.render('auth/login'),
  getRegisterPage: (req, res) => res.render('auth/register'),

  register: async (req, res) => {
    const { nome, email, senha, password } = req.body;
    const senhaFinal = senha || password;

    try {
      await authService.register(nome, email, senhaFinal);
      res.redirect('/labels/select');
    } catch (err) {
      console.error('Erro ao registrar:', err);
      res.render('auth/register', { erro: 'Erro ao registrar. Tente novamente.' });
    }
  },

  login: async (req, res) => {
    const { email, senha, password } = req.body;
    const senhaFinal = senha || password;

    try {
      const usuario = await authService.login(email, senhaFinal);
      if (usuario) {
        req.session.usuario = usuario;
        res.redirect('/home');
      } else {
        res.render('auth/login', { erro: 'Credenciais inválidas' });
      }
    } catch (err) {
      console.error('Erro no login:', err);
      res.render('auth/login', { erro: 'Erro interno. Tente novamente.' });
    }
  },

  logout: (req, res) => {
    req.session.destroy(() => res.redirect('/auth/login'));
  }
};
