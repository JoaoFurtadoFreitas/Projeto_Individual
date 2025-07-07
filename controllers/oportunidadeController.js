const oportunidadeService = require('../services/oportunidadeService');

module.exports = {
  getHome: async (req, res) => {
  try {
     await oportunidadeService.deletarVencidas();
     
    const usuarioId = req.session?.usuario?.id;

    const proximas = await oportunidadeService.getProximasComLabels();
    const recomendadas = usuarioId
      ? await oportunidadeService.getRecomendadasComLabels(usuarioId)
      : [];

    const todas = await oportunidadeService.getTodas(); 

    const labelsDisponiveis = await oportunidadeService.getTodasLabels();

    res.render('home', {
      recomendadas,
      proximas,
      todas, 
      usuario: req.session?.usuario || null,
      labelsDisponiveis
    });
  } catch (err) {
    console.error('Erro no getHome:', err);
    res.status(500).send('Erro ao carregar página inicial');
  }
},

  // Nova função para página de evento individual
  getEventPage: async (req, res) => {
    try {
      const id = req.params.id;
      const evento = await oportunidadeService.getComLabels(id);

      if (!evento) {
        return res.status(404).send('Evento não encontrado');
      }

      res.render('event', {
        evento,
        usuario: req.session?.usuario || null
      });
    } catch (err) {
      console.error('Erro ao carregar evento:', err);
      res.status(500).send('Erro ao carregar evento');
    }
  },

  // Nova função para filtro por tag
  getFilteredEvents: async (req, res) => {
    try {
      const tag = req.params.tag;
      const usuarioId = req.session?.usuario?.id;

      // Buscar eventos filtrados por tag
      const eventosFiltrados = await oportunidadeService.getByLabel(tag);
      const labelsDisponiveis = await oportunidadeService.getTodasLabels();

      res.render('home', {
        todas: eventosFiltrados,
        recomendadas: [],
        proximas: [],
        usuario: req.session?.usuario || null,
        labelsDisponiveis,
        tagAtiva: tag
      });
    } catch (err) {
      console.error('Erro ao filtrar eventos:', err);
      res.status(500).send('Erro ao filtrar eventos');
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

// oportunidadesController.js
getDetalhes: async (req, res) => {
 try {
    const id = req.params.id;
    const oportunidade = await oportunidadeService.getComLabels(id);

    if (!oportunidade) {
      return res.status(404).json({ error: 'Oportunidade não encontrada' });
    }

    res.json(oportunidade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar a oportunidade' });
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
      const usuario_id = req.session.usuario.id;

      await oportunidadeService.criar({
        titulo,
        descricao,
        data_limite,
        imagem_url,
        link,
        labels,
        usuario_id
      });
      res.redirect('/home');
    } catch (err) {
      console.error('Erro ao criar oportunidade:', err);
      res.status(500).send('Erro ao criar oportunidade');
    }
  },
   deleteOportunidade: async (req, res) => {
    try {
      const { id } = req.params;
      await oportunidadeService.deletar(id);
      res.status(200).json({ mensagem: 'Oportunidade apagada com sucesso' });
    } catch (err) {
      console.error('Erro ao apagar oportunidade:', err);
      res.status(500).json({ erro: 'Erro ao apagar oportunidade' });
    }
  },
};
