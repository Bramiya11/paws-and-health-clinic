const AppointmentModel = require('../models/appointmentModel.js');

exports.getAllAppointments = (req, res) => {
    AppointmentModel.getAllAppointments((err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.render('index', { title: 'Panel de Citas', appointments: rows });
    });
};

exports.getCreateForm = (req, res) => {
    res.render('create', { title: 'Agendar Nueva Cita' });
};

exports.createAppointment = (req, res) => {
    AppointmentModel.createAppointment(req.body, (err) => {
        if (err) return res.status(500).send(err.message);
        res.redirect('/');
    });
};

exports.deleteAppointment = (req, res) => {
    AppointmentModel.deleteAppointment(req.params.id, (err) => {
        if (err) return res.status(500).send(err.message);
        res.redirect('/');
    });
};

exports.getMedicalHistory = (req, res) => {
    const petId = req.params.petId;

    AppointmentModel.getMedicalHistoryByPet(petId, (err, rows) => {
        if (err) return res.status(500).send(err.message);

        if (rows.length === 0) {
            return res.status(404).send('No se encontró historial para esta mascota.');
        }

        res.render('historial', {
            title: `Historial de ${rows[0].pet_name}`,
            records: rows,
            pet_name: rows[0].pet_name,
            owner_name: rows[0].owner_name
        });
    });
};