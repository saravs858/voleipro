const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        res.status(500).send("Erro ao registrar usuário.");
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user._id;
            req.session.isAdmin = user.isAdmin;
            res.redirect('/');
        } else {
            res.status(401).send("Credenciais inválidas.");
        }
    } catch (err) {
        res.status(500).send("Erro no login.");
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};
