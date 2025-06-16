const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

module.exports = {
  login: async (email, senha) => {
  const usuario = await Usuario.findByEmail(email);
  if (!usuario || !usuario.senha_hash) return null;

  const match = await bcrypt.compare(senha, usuario.senha_hash);
  return match ? usuario : null;
},


register: async (nome, email, senha, cargo) => {
  if (!senha) {
    throw new Error('Senha não fornecida');
  }
   const existente = await Usuario.findByEmail(email);
    if (existente) {
      const err = new Error('email já cadastrado');
      err.code = 'EMAIL_DUPLICADO';
      throw err;
    }
  const senha_hash = await bcrypt.hash(senha, 10);
  return await Usuario.create({ nome, email, senha_hash, cargo });
}

};

