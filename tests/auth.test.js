const request = require('supertest');
const app = require('../server');

describe('Auth Controller', () => {
  const randomEmail = `test_${Date.now()}@example.com`;

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        nome: 'testuser',
        email: randomEmail,
        password: '123456'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: randomEmail,
        password: '123456'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
