const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Listagem de usuários
router.get('/', userController.listUsers);

// Cadastro de novo usuário
router.post('/', userController.createUser);

module.exports = router;
