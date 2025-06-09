const labelService = require('../services/labelService');

async function selectLabelsForm(req, res) {
  const labels = await labelService.listLabels();
  res.render('labels/select', { labels });
}

async function saveUserLabels(req, res) {
  const { labelIds } = req.body;
  const usuarioId = req.session.usuario.id;
  try {
    await labelService.saveUserLabels(usuarioId, Array.isArray(labelIds) ? labelIds : [labelIds]);
    res.redirect('/home');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao salvar interesses');
  }
}

async function adicionarLabel(req, res) {
  const { nome } = req.body;
  try {
    await labelService.criarLabel(nome);
    res.redirect('/home');
  } catch (err) {
    res.status(500).send('Erro ao adicionar label');
  }
}

module.exports = {
  selectLabelsForm,
  saveUserLabels,
  adicionarLabel
};

