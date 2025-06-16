
const express = require('express');
const router = express.Router();
const oportunidadeController = require('../controllers/oportunidadeController');

// Página de criação
router.get('/nova', oportunidadeController.getNova);
router.post('/nova', oportunidadeController.postNova);

// Página de visualização geral
router.get('/proximas', oportunidadeController.getProximas);

router.delete('/:id', oportunidadeController.deleteOportunidade);

router.get('/:id', oportunidadeController.getDetalhes);




// Rota de teste (não produção)
if (process.env.NODE_ENV !== 'production') {
  const oportunidadeService = require('../services/oportunidadeService');
  router.get('/teste/proximas', async (req, res) => {
    const proximas = await oportunidadeService.getProximas();
    res.json(proximas);
  });
}

module.exports = router;
