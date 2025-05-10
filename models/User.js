class User {
  constructor(id, nome, email, senha, tipo, curso_id) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.tipo = tipo;
  }
}

module.exports = User;
