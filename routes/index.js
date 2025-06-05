const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const oportunidadeRoutes = require('./oportunidadeRoutes');

router.use('/auth', authRoutes); // todas as rotas de autenticação começam com /auth
router.use('/users', userRoutes); // todas as rotas de usuários começam com /users
router.use('/oportunidades', oportunidadeRoutes); // todas as rotas de oportunidades com /oportunidades

// Rota raiz opcional
router.get('/', (req, res) => {
  res.send('Bem-vindo à API Central de Vagas!');
});

module.exports = router;

