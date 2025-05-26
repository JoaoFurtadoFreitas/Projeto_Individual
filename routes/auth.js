const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Formulário de login
router.get('/login', authController.loginForm);

// Processa login
router.post('/login', authController.login);

module.exports = router;
