const authService = require('../services/authService');

module.exports = {
  getLoginPage: (req, res) => {
    res.render('login');
  },

  getRegisterPage: (req, res) => {
    res.render('register');
  },

 
  logout: (req, res) => {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  },
  register: async (req, res) => {
  const { nome, email, senha, password } = req.body;
  const senhaFinal = senha || password; // aceita qualquer um
  try {
    await authService.register(nome, email, senhaFinal);
    res.redirect('/login');
  } catch (err) {
    console.error("Erro ao registrar:", err);
    res.render('register', { erro: 'Erro ao registrar. Tente novamente.' });
  }
},

login: async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await authService.login(email, senha);
    if (usuario) {
      req.session.usuario = usuario;
      res.redirect('/home');
    } else {
      res.render('login', { erro: 'Credenciais inválidas' });
    }
  } catch (err) {
    console.error("Erro no login:", err); // <= Adicionado para debug
    res.render('login', { erro: 'Erro interno. Tente novamente.' });
  }
},


  
};
