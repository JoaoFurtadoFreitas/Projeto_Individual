const express = require('express');
const router = express.Router();

const oportunidadeRoutes = require('./oportunidadeRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const labelRoutes = require('./labelRoutes');

const oportunidadeController = require('../controllers/oportunidadeController');
const userController = require('../controllers/userController');

// Página inicial
router.get('/', (req, res) => {
  res.render('impact');
});

router.get('/home', oportunidadeController.getHome);

// Rota para página de evento individual
router.get('/events/:id', oportunidadeController.getEventPage);

// Rota para favoritos
router.get('/favorites', userController.getFavorites);

// Rota para perfil (redireciona para a rota correta)
router.get('/perfil', (req, res) => {
  res.redirect('/usuario/perfil');
});

// Rota para filtro por tag
router.get('/filter/:tag', oportunidadeController.getFilteredEvents);

// Rotas agrupadas por entidade
router.use('/oportunidades', oportunidadeRoutes);
router.use('/auth', authRoutes);
router.use('/usuario', userRoutes);
router.use('/labels', labelRoutes);

module.exports = router;
