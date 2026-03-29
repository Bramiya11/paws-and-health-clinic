const db = require('../config/db.js');

// Obtener todas las citas
const getAllAppointments = (callback) => {
    const sql = `
        SELECT 
            a.id,
            a.id_pet AS id_pet,
            o.owner_name,
            p.pet_name,
            a.service,
            a.appointment_date,
            a.status,
            a.weight,
            a.temperature
        FROM appointments a
        JOIN pet p ON a.id_pet = p.id
        JOIN owner o ON a.id_owner = o.id
        ORDER BY a.appointment_date DESC
    `;
    db.all(sql, [], callback);
};

// Crear una cita 
const createAppointment = (data, callback) => {
    const { pet_name, owner_name, service, appointment_date, weight, temperature, diagnosis } = data;

    db.run("INSERT INTO owner (owner_name) VALUES (?)", [owner_name], function (err) {
        if (err) return callback(err);
        const ownerId = this.lastID;

        db.run("INSERT INTO pet (pet_name, id_owner) VALUES (?, ?)", [pet_name, ownerId], function (err) {
            if (err) return callback(err);
            const petId = this.lastID;

            const sql = "INSERT INTO appointments (id_pet, id_owner, service, appointment_date, weight, temperature, diagnosis) VALUES (?, ?, ?, ?, ?, ?, ?)";
            db.run(sql, [petId, ownerId, service, appointment_date, weight, temperature, diagnosis], callback);
        });
    });
};

// Eliminar una cita
const deleteAppointment = (id, callback) => {
    db.run("DELETE FROM appointments WHERE id = ?", [id], callback);
};

// Obtener historial clínico de una mascota específica (solo lectura) - Sprint 4
const getMedicalHistoryByPet = (petId, callback) => {
    const sql = `
        SELECT
            a.id,
            a.appointment_date,
            a.service,
            a.weight,
            a.temperature,
            a.diagnosis,
            a.status,
            p.pet_name,
            o.owner_name
        FROM appointments a
        JOIN pet p ON a.id_pet = p.id
        JOIN owner o ON a.id_owner = o.id
        WHERE a.id_pet = ?
        ORDER BY a.appointment_date ASC
    `;
    db.all(sql, [petId], callback);
};

module.exports = { getAllAppointments, createAppointment, deleteAppointment, getMedicalHistoryByPet };