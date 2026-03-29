// Verifica que el usuario haya iniciado sesión
exports.isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/login');
};

// Verifica que el usuario tenga rol Veterinario
exports.isVet = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'Veterinario') {
        return next();
    }
    res.status(403).send('Acceso denegado: Solo Veterinarios pueden realizar esta acción.');
};