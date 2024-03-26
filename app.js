const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const controller = require('./controller');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
    secret: 'secret-key',
    resave: true,
    saveUninitialized: true
}));

// Middleware para verificar autenticação
const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

// Rota para a tela de login
app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// Rota para o processo de login
app.post('/login', controller.login);

// Rota para a tela de cadastro
app.get('/register', (req, res) => {
    res.render('register', { error: null });
});

// Rota para o processo de cadastro
app.post('/register', controller.register);

// Rota para a página do usuário
app.get('/user', requireLogin, controller.userPage);

// Rota para listar usuários
app.get('/listUsers', requireLogin, controller.listUsers);

// Rota para logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Rota raiz - redireciona para a tela de login
app.get('/', (req, res) => {
    res.redirect('/login');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
