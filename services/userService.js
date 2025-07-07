const db = require('../scripts/db');
const Usuario = require('../models/Usuario');
const Label = require('../models/Label');

async function update(id, { nome, labels }) {
  await db.query('UPDATE usuario SET nome = $1 WHERE id = $2', [nome, id]);

  // Atualiza labels do usuário (exclui antigas e insere novas)
  await db.query('DELETE FROM usuario_label WHERE usuario_id = $1', [id]);

  if (Array.isArray(labels)) {
    const insertions = labels.map(labelId =>
      db.query('INSERT INTO usuario_label (usuario_id, label_id) VALUES ($1, $2)', [id, labelId])
    );
    await Promise.all(insertions);
  }
}

module.exports = {
  // 🆕 Função para criar usuário
  update,
  createUser: async ({ nome, email, senha, tipo }) => {
  const bcrypt = require('bcryptjs');
  const senha_hash = await bcrypt.hash(senha, 10);
  return await Usuario.create({ nome, email, senha_hash, cargo: tipo });
},

  // 🆕 Função para listar usuários
  listUsers: async () => {
    return await Usuario.findAll(); // Espera-se que Usuario.findAll exista
  },

  // Função já existente: buscar usuário com labels
  getUsuarioComLabels: async (usuarioId) => {
    return await Usuario.findWithLabels(usuarioId);
  },

  // Função já existente: pegar todas as labels
  getTodasLabels: async () => {
    return await Label.findAll();
  },

  // Função já existente: atualizar perfil
  updatePerfil: async (usuarioId, nome, labels) => {
    await Usuario.updateNome(usuarioId, nome);
    await Usuario.setLabels(usuarioId, labels); // Relacionamento N:N
  },

  // Nova função para favoritos
  getFavoritos: async (usuarioId) => {
    // Por enquanto, retorna eventos recomendados baseados nas labels do usuário
    // Em uma implementação completa, você teria uma tabela de favoritos
    const usuario = await Usuario.findWithLabels(usuarioId);
    if (!usuario || !usuario.labels || usuario.labels.length === 0) {
      return [];
    }

    const Oportunidade = require('../models/Oportunidade');
    const oportunidades = await Oportunidade.findByLabels(usuario.labels);
    return await Promise.all(oportunidades.map(o => Oportunidade.findWithLabels(o.id)));
  }
};
