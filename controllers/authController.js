const authService = require('../services/authService');

module.exports = {
  getLoginPage: (req, res) => res.render('auth/login'),
  getRegisterPage: (req, res) => res.render('auth/register', { erro: null }),


  register: async (req, res) => {
    const { nome, email, senha, password, tipo } = req.body;
    const senhaFinal = senha || password;

    try {
      const usuario = await authService.register(nome, email, senhaFinal, tipo);
     
      // Adiciona o novo usuário à sessão:
      req.session.usuario = usuario;

      // Redireciona para a edição de perfil:
      res.redirect('/usuario/editar');
    } catch (err) {
      console.error('Erro ao registrar:', err);
      let mensagem = 'Erro ao registrar. Tente novamente.';
    if (err.code === 'EMAIL_DUPLICADO') {
      mensagem = 'email já cadastrado';
    }

    res.render('auth/register', { erro: mensagem });
  
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
