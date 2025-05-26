const express = require('express');
const router = express.Router();
const opportunityController = require('../controllers/opportunityController');

// Listagem de oportunidades
router.get('/', opportunityController.listOpportunities);

// Cadastro de nova oportunidade
router.post('/', opportunityController.createOpportunity);

module.exports = router;
