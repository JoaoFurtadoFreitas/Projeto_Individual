const db = require('../scripts/db');
const Oportunidade = require('../models/Oportunidade');
const Usuario = require('../models/Usuario');

async function getRecomendadasComLabels(usuarioId) {
  const usuario = await Usuario.findWithLabels(usuarioId);
  if (!usuario || !usuario.labels || usuario.labels.length === 0) return [];

  const oportunidades = await Oportunidade.findByLabels(usuario.labels);

  const completas = await Promise.all(
    oportunidades.map(async (o) => {
      return await Oportunidade.findWithLabels(o.id);
    })
  );

  return completas;
}

async function getProximasComLabels() {
  const oportunidades = await Oportunidade.findProximas();
  const oportunidadesComLabels = await Promise.all(
    oportunidades.map(async (o) => {
      const completa = await Oportunidade.findWithLabels(o.id);
      return completa;
    })
  );
  return oportunidadesComLabels;
}



async function criar(dados) {
  const { titulo, descricao, imagem_url, data_limite, link, labels } = dados;

  const result = await db.query(
    `INSERT INTO oportunidade (titulo, descricao, imagem_url, data_limite, link)
     VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    [titulo, descricao, imagem_url, data_limite, link]
  );

  const oportunidadeId = result.rows[0].id;

  if (labels && labels.length) {
    const labelIds = Array.isArray(labels) ? labels : [labels];
    for (const labelId of labelIds) {
      await db.query(
        'INSERT INTO oportunidade_label (oportunidade_id, label_id) VALUES ($1, $2)',
        [oportunidadeId, labelId]
      );
    }
  }
}

module.exports = {
  criar,
  getRecomendadas: async (usuarioId) => {
    const usuario = await Usuario.findWithLabels(usuarioId);
    return await Oportunidade.findByLabels(usuario.labels);
  },
  getProximas: async () => {
    return await Oportunidade.findProximas();
  },
  getProximasComLabels,
  getRecomendadasComLabels,
  
  getPorId: async (id) => {
    return await Oportunidade.findById(id);
  },
  comLabels: async (id) => {
    return await Oportunidade.findWithLabels(id);
  }
};

