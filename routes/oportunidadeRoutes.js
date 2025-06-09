const express = require('express');
const router = express.Router();
const oportunidadeController = require('../controllers/oportunidadeController');

// Página de criação
router.get('/nova', oportunidadeController.getNova);
router.post('/nova', oportunidadeController.postNova);

// Página de visualização geral (home já é tratado fora)
router.get('/proximas', oportunidadeController.getProximas); // Controller precisa implementar se desejar

// (Opcional) API ou debug
if (process.env.NODE_ENV !== 'production') {
  const oportunidadeService = require('../services/oportunidadeService');
  router.get('/teste/proximas', async (req, res) => {
    const proximas = await oportunidadeService.getProximas();
    res.json(proximas);
  });
}

module.exports = router;

