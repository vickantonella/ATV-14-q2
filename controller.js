const model = require('./model');

async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await model.getUserByUsername(username);
        if (!user || user.password !== password) {
            res.render('login', { error: 'Credenciais inválidas' });
        } else {
            req.session.user = user;
            // Define o cookie de autenticação
            res.cookie('authenticated', true);
            res.redirect('/user');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.render('login', { error: 'Erro ao fazer login' });
    }
}

async function register(req, res) {
    const { username, password } = req.body;
    try {
        await model.createUser(username, password);
        res.redirect('/login');
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.render('register', { error: 'Erro ao cadastrar usuário' });
    }
}

async function userPage(req, res) {
    const user = req.session.user;
    res.render('user', { user });
}

async function listUsers(req, res) {
    try {
        const users = await model.getAllUsers();
        res.render('userList', { users }); // Certifique-se de que 'userList' corresponde ao nome do arquivo da sua visualização
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.render('user', { error: 'Erro ao listar usuários' });
    }
}

module.exports = {
    login,
    register,
    userPage,
    listUsers, // Adicionando a função para listar usuários
};