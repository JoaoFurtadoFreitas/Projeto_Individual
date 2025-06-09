const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Página de perfil e seleção de labels
router.get('/perfil', userController.getPerfil);
router.post('/perfil', userController.updatePerfil);
router.get('/editar', userController.getEditPage);
router.post('/editar', userController.updateProfile); // ✅ Corrigido nome da função



module.exports = router;

