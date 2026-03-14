const db = require('../config/db.js');

exports.getAllAppointments = (req, res) => {
    const sql = `
        SELECT 
            a.id,
            o.owner_name,
            p.pet_name,
            a.service,
            a.appointment_date,
            a.status
        FROM appointments a
        JOIN pet p ON a.id_pet = p.id
        JOIN owner o ON a.id_owner = o.id
        ORDER BY a.appointment_date DESC
    `;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.render('index', { title: 'Panel de Citas', appointments: rows });
    });
};

exports.getCreateForm = (req, res) => {
    res.render('create', { title: 'Agendar Nueva Cita' });
};

exports.createAppointment = (req, res) => {
    const { pet_name, owner_name, service, appointment_date } = req.body;

    // 1. Insertar owner
    db.run("INSERT INTO owner (owner_name) VALUES (?)", [owner_name], function (err) {
        if (err) return res.status(500).send(err.message);
        const ownerId = this.lastID;

        // 2. Insertar pet con el id del owner
        db.run("INSERT INTO pet (pet_name, id_owner) VALUES (?, ?)", [pet_name, ownerId], function (err) {
            if (err) return res.status(500).send(err.message);
            const petId = this.lastID;

            // 3. Insertar appointment con ambos IDs
            const sql = "INSERT INTO appointments (id_pet, id_owner, service, appointment_date) VALUES (?, ?, ?, ?)";
            db.run(sql, [petId, ownerId, service, appointment_date], function (err) {
                if (err) return res.status(500).send(err.message);
                res.redirect('/');
            });
        });
    });
};

exports.deleteAppointment = (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM appointments WHERE id = ?", id, function (err) {
        if (err) return res.status(500).send(err.message);
        res.redirect('/');
    });
};

/*exports.getAllAppointments = (req, res) => {
    db.all("SELECT * FROM appointments ORDER BY appointment_date DESC", [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.render('index', { title: 'Panel de Citas', appointments: rows });
    });
};

exports.getCreateForm = (req, res) => {
    res.render('create', { title: 'Agendar Nueva Cita' });
};

exports.createAppointment = (req, res) => {
    const { pet_name, owner_name, service, appointment_date } = req.body;
    const sql = "INSERT INTO appointments (pet_name, owner_name, service, appointment_date) VALUES (?, ?, ?, ?)";
    const params = [pet_name, owner_name, service, appointment_date];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.redirect('/');
    });
};

exports.deleteAppointment = (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM appointments WHERE id = ?", id, function (err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.redirect('/');
    });
};
*/