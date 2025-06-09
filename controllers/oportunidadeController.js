const oportunidadeService = require('../services/oportunidadeService');

module.exports = {
  getHome: async (req, res) => {
    const usuarioId = req.session?.usuario?.id;

    const proximas = await oportunidadeService.getProximasComLabels();
    const recomendadas = usuarioId
      ? await oportunidadeService.getRecomendadasComLabels(usuarioId)
      : [];

    res.render('home', {
      recomendadas,
      proximas,
      usuario: req.session?.usuario || null
    });
  },
  getProximas: async (req, res) => {
  try {
    const proximas = await oportunidadeService.getProximas();
    res.render('oportunidades/proximas', { proximas });
  } catch (err) {
    console.error('Erro ao carregar oportunidades próximas:', err);
    res.status(500).send('Erro ao carregar oportunidades');
  }
},
  getDetalhesOportunidade: async (req, res) => {
    const { id } = req.params;
    try {
      const oportunidade = await oportunidadeService.getPorIdComLabels(id);
      if (!oportunidade) return res.status(404).send('Oportunidade não encontrada');
      res.render('oportunidades/detalhes', { oportunidade });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao carregar detalhes');
    }
  },

  getNova: async (req, res) => {
    const labels = await oportunidadeService.getTodasLabels();
    res.render('oportunidades/nova', { labels });
  },

  postNova: async (req, res) => {
    const { titulo, descricao, data_limite, imagem_url, link, labels } = req.body;
    try {
      const nova = await oportunidadeService.criar({
        titulo, descricao, data_limite, imagem_url, link
      });
      await oportunidadeService.vincularLabels(nova.id, Array.isArray(labels) ? labels : [labels]);
      res.redirect('/home');
    } catch (err) {
      console.error('Erro ao criar oportunidade:', err);
      res.status(500).send('Erro ao criar oportunidade');
    }
  }
};
