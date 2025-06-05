const Usuario = require('../models/Usuario');
const Label = require('../models/Label');

module.exports = {
  // 🆕 Função para criar usuário
  createUser: async ({ nome, email, senha }) => {
  const bcrypt = require('bcryptjs');
  const senha_hash = await bcrypt.hash(senha, 10); // Criptografa a senha
  return await Usuario.create({ nome, email, senha_hash });
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
  }
};
