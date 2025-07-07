const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: 'segredo-supersecreto',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null;
  next();
});

// Middleware para interpretar JSON e dados de formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, 'public')));

// Importação das rotas
const labelRoutes = require('./routes/labelRoutes');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/authRoutes');
const oportunidadeRoutes = require('./routes/oportunidadeRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/labels', labelRoutes);
app.use('/usuario', userRoutes);
app.use((req, res, next) => {
  console.log('Rota recebida:', req.method, req.url);
  next();
});

app.use('/', indexRoutes);
app.use('/oportunidades', oportunidadeRoutes);

// Middleware para 404
app.use((req, res, next) => {
  res.status(404).send('Rota não encontrada');
});

if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  const HOST = process.env.HOST || 'localhost'; // escuta em localhost por padrão

  app.listen(PORT, HOST, () => {
    console.log(`Servidor rodando em http://${HOST}:${PORT}`);
  });
}

module.exports = app;
