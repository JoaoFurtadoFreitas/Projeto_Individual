const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/opportunities', require('./opportunities'));
router.use('/labels', require('./labels'));

router.get('/', (req, res) => {
  res.send('Bem-vindo à Central de Vagas e Oportunidades Acadêmicas');
});

module.exports = router;
