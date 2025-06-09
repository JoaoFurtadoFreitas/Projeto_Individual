const express = require('express');
const router = express.Router();

const oportunidadeRoutes = require('./oportunidadeRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const labelRoutes = require('./labelRoutes'); // <- Faltava isso

const oportunidadeController = require('../controllers/oportunidadeController');

// Página inicial
router.get('/home', oportunidadeController.getHome);

// Rotas agrupadas por entidade
router.use('/oportunidades', oportunidadeRoutes);
router.use('/auth', authRoutes);
router.use('/usuario', userRoutes);
router.use('/labels', labelRoutes); // <- Agora está ativa

module.exports = router;
