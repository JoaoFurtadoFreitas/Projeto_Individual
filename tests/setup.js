// tests/setup.js
require('dotenv').config();

const db = require('../scripts/db');

beforeAll(async () => {
  await db.query('DELETE FROM usuario WHERE email = $1', ['test@example.com']);
});
