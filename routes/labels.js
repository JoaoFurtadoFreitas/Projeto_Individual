const express = require('express');
const router = express.Router();
const labelController = require('../controllers/labelController');

// Listagem de labels
router.get('/', labelController.listLabels);

// Cadastro de nova label
router.post('/', labelController.createLabel);

module.exports = router;
