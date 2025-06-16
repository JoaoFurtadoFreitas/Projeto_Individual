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

async function getPorIdComLabels(id) {
  const { rows } = await db.query(`
    SELECT o.*, 
           json_agg(json_build_object('id', l.id, 'nome', l.nome)) AS labels
    FROM oportunidade o
    LEFT JOIN oportunidade_label ol ON ol.oportunidade_id = o.id
    LEFT JOIN label l ON l.id = ol.label_id
    WHERE o.id = $1
    GROUP BY o.id
  `, [id]);

  return rows[0];
}
async function deletarVencidas() {
  const result = await db.query(`
    DELETE FROM oportunidade
    WHERE data_limite < CURRENT_DATE
    RETURNING id
  `);
  console.log(`Oportunidades vencidas deletadas: ${result.rowCount}`);
}


async function criar(dados) {
  const { titulo, descricao, imagem_url, data_limite, link, labels, usuario_id } = dados;

  if (!titulo || !descricao || !data_limite || !link) {
    throw new Error("Campos obrigatórios não preenchidos.");
  }

  const result = await Oportunidade.create({
    titulo,
    descricao,
    imagem_url,
    data_limite,
    link,
    usuario_id
  });

  const oportunidadeId = result.id;

  if (labels && labels.length) {
    const labelsArray = Array.isArray(labels) ? labels : [labels];
    const placeholders = labelsArray.map((_, i) => `$${i + 1}`).join(', ');
    const queryLabels = await db.query(
      `SELECT id, nome FROM label WHERE nome IN (${placeholders})`,
      labelsArray
    );

    const nomeParaId = {};
    queryLabels.rows.forEach(row => {
      nomeParaId[row.nome] = row.id;
    });

    await Promise.all(labelsArray.map(nomeLabel => {
      const labelId = nomeParaId[nomeLabel];
      if (labelId) {
        return db.query(
          'INSERT INTO oportunidade_label (oportunidade_id, label_id) VALUES ($1, $2)',
          [oportunidadeId, labelId]
        );
      }
    }));
  }
}

async function deletar(id) {
  // Remove os vínculos com labels primeiro (por integridade referencial)
  await db.query('DELETE FROM oportunidade_label WHERE oportunidade_id = $1', [id]);
  // Depois remove a própria oportunidade
  await db.query('DELETE FROM oportunidade WHERE id = $1', [id]);
}

async function buscarPorId(id) {
 return await Oportunidade.findWithLabels(id);;
}

async function getTodas() {
  const oportunidades = await Oportunidade.findAll();
  return await Promise.all(oportunidades.map(o => Oportunidade.findWithLabels(o.id)));
}


module.exports = {
  criar,
  getRecomendadas: getRecomendadasComLabels,
  getProximas: async () => await Oportunidade.findProximas(),
  getProximasComLabels,
  getRecomendadasComLabels,
  getPorId: async (id) => await Oportunidade.findById(id),
  getComLabels: async (id) => await Oportunidade.findWithLabels(id),
  getTodasLabels,
  deletar,
  getPorIdComLabels,
  buscarPorId,
  getTodas,
  deletarVencidas
};

