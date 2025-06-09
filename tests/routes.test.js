const userService = require('../services/userService');
const db = require('../scripts/db');  // aqui importa o objeto { query, pool }

let testUserId;

describe('User Service', () => {
  afterAll(async () => {
    if (testUserId) {
      // Usar db.query para executar query parametrizada
      await db.query('DELETE FROM users WHERE id = $1', [testUserId]);
    }
    await db.pool.end(); // fecha conexão após todos os testes
  });

  it('deve criar um novo usuário', async () => {
    const timestamp = Date.now();
    const userData = {
      nome: 'Teste',
      email: `teste${timestamp}@inteli.edu.br`,
      senha: '123456',
      tipo: 'aluno'
    };

    const createdUser = await userService.createUser(userData);
    testUserId = createdUser.id;

    expect(createdUser).toHaveProperty('id');
    expect(createdUser.nome).toBe('Teste');
  });

  it('deve listar usuários', async () => {
    const users = await userService.listUsers();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });
});
