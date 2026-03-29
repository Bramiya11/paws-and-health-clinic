const db = require('../config/db.js');

// GET /login
exports.getLogin = (req, res) => {
    res.render('login', { title: 'Iniciar Sesión', error: null });
};

// POST /login
exports.postLogin = (req, res) => {
    const { username, password } = req.body;

    db.get(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, user) => {
            if (err) return res.status(500).send(err.message);

            if (!user) {
                return res.render('login', {
                    title: 'Iniciar Sesión',
                    error: 'Usuario o contraseña incorrectos.'
                });
            }

            // Guardamos en sesión solo lo necesario
            req.session.user = {
                id: user.id,
                username: user.username,
                role: user.role
            };

            res.redirect('/');
        }
    );
};

// POST /logout
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};