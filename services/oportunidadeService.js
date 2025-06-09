const db = require('../scripts/db');
const Oportunidade = require('../models/Oportunidade');
const Usuario = require('../models/Usuario');

async function getRecomendadasComLabels(usuarioId) {
  const usuario = await Usuario.findWithLabels(usuarioId);
  if (!usuario || !usuario.labels || usuario.labels.length === 0) return [];

  const oportunidades = await Oportunidade.findByLabels(usuario.labels);
  return await Promise.all(oportunidades.map(o => Oportunidade.findWithLabels(o.id)));
}

async function getProximasComLabels() {
  const oportunidades = await Oportunidade.findProximas();
  return await Promise.all(oportunidades.map(o => Oportunidade.findWithLabels(o.id)));
}

async function getTodasLabels() {
  const result = await db.query('SELECT nome FROM label ORDER BY nome');
  return result.rows.map(row => row.nome);
}

async function criar(dados) {
  const { titulo, descricao, imagem_url, data_limite, link, labels } = dados;

  if (!titulo || !descricao || !data_limite || !link) {
    throw new Error("Campos obrigatórios não preenchidos.");
  }

  // Insere a oportunidade
  const result = await db.query(
    `INSERT INTO oportunidade (titulo, descricao, imagem_url, data_limite, link)
     VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    [titulo, descricao, imagem_url, data_limite, link]
  );

  const oportunidadeId = result.rows[0].id;

  if (labels && labels.length) {
    // labels pode ser string (1 label) ou array (várias), normalize para array
    const labelsArray = Array.isArray(labels) ? labels : [labels];

    // Buscar os IDs das labels a partir dos nomes
    const placeholders = labelsArray.map((_, i) => `$${i + 1}`).join(', ');
    const queryLabels = await db.query(
      `SELECT id, nome FROM label WHERE nome IN (${placeholders})`,
      labelsArray
    );

    // Mapear nomes para ids
    const nomeParaId = {};
    queryLabels.rows.forEach(row => {
      nomeParaId[row.nome] = row.id;
    });

    // Inserir associações com ids corretos
    await Promise.all(labelsArray.map(nomeLabel => {
      const labelId = nomeParaId[nomeLabel];
      if (labelId) {
        return db.query(
          'INSERT INTO oportunidade_label (oportunidade_id, label_id) VALUES ($1, $2)',
          [oportunidadeId, labelId]
        );
      } else {
        // Se não encontrar a label no banco, ignore ou trate como erro
        console.warn(`Label não encontrada no banco: ${nomeLabel}`);
        return Promise.resolve();
      }
    }));
  }
}


module.exports = {
  criar,
  getRecomendadas: getRecomendadasComLabels,
  getProximas: async () => await Oportunidade.findProximas(),
  getProximasComLabels,
  getRecomendadasComLabels,
  getPorId: async (id) => await Oportunidade.findById(id),
  getComLabels: async (id) => await Oportunidade.findWithLabels(id),
  getTodasLabels
};

