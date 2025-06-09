const express = require('express');
const router = express.Router();
const labelController = require('../controllers/labelController');
const labelService = require('../services/labelService');

router.post('/adicionar', labelController.adicionarLabel);
router.post('/criar', async (req, res) => {
  const { nome } = req.body;
  try {
    const nova = await labelService.addLabelIfNotExists(nome);
    res.json(nova);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar label' });
  }
});


module.exports = router;
