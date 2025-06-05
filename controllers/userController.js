const userService = require('../services/userService');

module.exports = {
  getPerfil: async (req, res) => {
    const usuarioId = req.session.usuario.id;
    const usuario = await userService.getUsuarioComLabels(usuarioId);
    const todasLabels = await userService.getTodasLabels();
    res.render('perfil', { usuario, todasLabels });
  },

  updatePerfil: async (req, res) => {
    const usuarioId = req.session.usuario.id;
    const { nome, labels } = req.body;

    await userService.updatePerfil(usuarioId, nome, labels);
    res.redirect('/home');
  }
};
