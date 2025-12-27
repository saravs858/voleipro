const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();

// Configuração do Banco de Dados (MongoDB)
// Para rodar localmente, use: 'mongodb://localhost:27017/voleiDB'
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
    .then(() => console.log('Conectado ao MongoDB...'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Configurações do Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração de Sessão
app.use(session({
    secret: 'volei_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Rotas
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Middleware para Erro 404
app.use((req, res) => {
    res.status(404).render('404', { user: req.session.userId });
});

// Inicialização do Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
