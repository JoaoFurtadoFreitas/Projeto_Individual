// test/routes.test.js
const request = require('supertest');
const app = require('../server');

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /oportunidades', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/home');
    expect(res.statusCode).toBe(200);
  });
});

