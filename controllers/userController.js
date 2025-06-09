const userService = require('../services/userService');
const labelService = require('../services/labelService'); // ✅ Adicionado

module.exports = {
  getPerfil: async (req, res) => {
    const usuarioId = req.session.usuario?.id;
    if (!usuarioId) return res.redirect('/auth/login');

    try {
      const usuario = await userService.getUsuarioComLabels(usuarioId);
      const todasLabels = await userService.getTodasLabels();
      res.render('usuario/perfil', { usuario, todasLabels });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao carregar perfil.');
    }
  },

  updatePerfil: async (req, res) => {
    const usuarioId = req.session.usuario?.id;
    const { nome, labels } = req.body;
    try {
      await userService.updatePerfil(usuarioId, nome, labels);
      res.redirect('/home');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao atualizar perfil.');
    }
  },

  getEditPage: async (req, res) => {
    const usuario = req.session.usuario;
    if (!usuario) return res.redirect('/auth/login');

    const labelsDisponiveis = await labelService.listLabels(); // ✅ Correto
    const usuarioCompleto = await userService.getUsuarioComLabels(usuario.id); // ✅ usa findWithLabels

    res.render('usuario/editar', {
      usuario: usuarioCompleto,
      labels: labelsDisponiveis
    });
  },

  updateProfile: async (req, res) => {
  const { nome, labels } = req.body;
  const usuarioId = req.session.usuario.id;

  await userService.update(usuarioId, { nome, labels: Array.isArray(labels) ? labels : [] });

  // Atualiza a sessão com os dados atualizados (com labels completas)
  const usuarioAtualizado = await userService.getUsuarioComLabels(usuarioId);
  req.session.usuario = usuarioAtualizado;

  res.redirect('/usuario/perfil');
}
};


 
  



