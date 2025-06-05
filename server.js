require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');  // ou outra engine que estiver usando
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importação das rotas
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Middleware para 404
app.use((req, res, next) => {
  res.status(404).send('Rota não encontrada');
});

// Exporta para testes com Supertest
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
