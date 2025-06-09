const oportunidadeService = require('../services/oportunidadeService');

module.exports = {
  getHome: async (req, res) => {
    try {
      const usuarioId = req.session?.usuario?.id;

      const proximas = await oportunidadeService.getProximasComLabels();
      const recomendadas = usuarioId
        ? await oportunidadeService.getRecomendadasComLabels(usuarioId)
        : [];

      const labelsDisponiveis = await oportunidadeService.getTodasLabels();

      res.render('home', {
        recomendadas,
        proximas,
        usuario: req.session?.usuario || null,
        labelsDisponiveis
      });
    } catch (err) {
      console.error('Erro no getHome:', err);
      res.status(500).send('Erro ao carregar página inicial');
    }
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
    try {
      const { id } = req.params;
      const oportunidade = await oportunidadeService.getPorIdComLabels(id);
      if (!oportunidade) return res.status(404).send('Oportunidade não encontrada');
      res.render('oportunidades/detalhes', { oportunidade });
    } catch (err) {
      console.error('Erro ao carregar detalhes da oportunidade:', err);
      res.status(500).send('Erro ao carregar detalhes');
    }
  },

  getNova: async (req, res) => {
    try {
      const labels = await oportunidadeService.getTodasLabels();
      res.render('oportunidades/nova', { labels });
    } catch (err) {
      console.error('Erro ao carregar formulário nova oportunidade:', err);
      res.status(500).send('Erro ao carregar formulário');
    }
  },

  postNova: async (req, res) => {
    try {
      const { titulo, descricao, data_limite, imagem_url, link, labels } = req.body;
      await oportunidadeService.criar({ titulo, descricao, data_limite, imagem_url, link, labels });
      res.redirect('/home');
    } catch (err) {
      console.error('Erro ao criar oportunidade:', err);
      res.status(500).send('Erro ao criar oportunidade');
    }
  }
};
