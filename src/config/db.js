const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    //Creación de las tablas de Dueño, Mascota y Citas
    db.run(`
        CREATE TABLE owner(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            owner_name TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
    db.run(`
        CREATE TABLE pet(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pet_name TEXT NOT NULL,
            id_owner INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (id_owner) REFERENCES owner(id)
        )
    `);
    db.run(`
        CREATE TABLE appointments(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_pet INTEGER NOT NULL,
            id_owner INTEGER NOT NULL,
            service TEXT NOT NULL,
            appointment_date TEXT NOT NULL,
            weight REAL,
            temperature REAL,
            diagnosis VARCHAR(50),
            status TEXT DEFAULT 'Scheduled',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (id_pet) REFERENCES pet(id),
            FOREIGN KEY (id_owner) REFERENCES owner(id)
        )
    `);
    //Nueva tabla para los usuarios 
    db.run(`
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'Recepcionista',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    //Aquí insertamos los valores correspondientes. En este caso migramos a Rex y Luna bajo el nuevo esquema.
    const stmtO = db.prepare("INSERT INTO owner (owner_name) VALUES (?)");
    stmtO.run("Juan Pérez");
    stmtO.run("Maria García");
    stmtO.run("Brandon");
    stmtO.finalize();
    const stmtP = db.prepare("INSERT INTO pet (pet_name, id_owner) VALUES (?, ?)");
    stmtP.run("Rex", 1);
    stmtP.run("Luna", 2);
    stmtP.run("Tato", 3);
    stmtP.run("Pinky", 3);
    stmtP.finalize();
    //Datos de prueba reales Sprint 4
    const stmtA = db.prepare(`INSERT INTO appointments (id_pet, id_owner, service, appointment_date, weight, temperature, diagnosis, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
    // Citas originales - Sprint 4
    stmtA.run(1, 1, "Corte de Pelo",    "2026-02-25 10:00", null, null, null, "Scheduled");
    stmtA.run(2, 2, "Baño y Limpieza",  "2026-02-25 11:30", null, null, null, "Scheduled");
    stmtA.run(3, 3, "Baño y Limpieza",  "2026-02-25 11:30", null, null, null, "Scheduled");
    stmtA.run(4, 3, "Baño y Limpieza",  "2026-02-25 11:30", null, null, null, "Scheduled");

    // Historial médico de Rex (id_pet: 1) para el timeline - Sprint 4
    stmtA.run(1, 1, "Consulta Médica", "2025-10-10 09:00", 12.3, 38.2, "Revisión general. Saludable.", "Completed");
    stmtA.run(1, 1, "Consulta Médica", "2025-11-20 10:00", 12.1, 38.6, "Leve infección en oído derecho. Receta: Otomax.", "Completed");
    stmtA.run(1, 1, "Consulta Médica", "2026-01-15 09:30", 12.5, 38.4, "Seguimiento. Infección resuelta. Todo bien.", "Completed");
    stmtA.run(1, 1, "Consulta Médica", "2026-03-01 11:00", 12.8, 39.1, "Fiebre moderada. Receta: Amoxicilina 5 días.", "Completed");

    // Historial médico de Luna (id_pet: 2) - Sprint 4
    stmtA.run(2, 2, "Consulta Médica", "2025-12-05 14:00", 8.4, 38.0, "Control de peso. Sin novedades.", "Completed");
    stmtA.run(2, 2, "Consulta Médica", "2026-02-10 10:30", 8.2, 38.3, "Pérdida de apetito. Receta: Vitaminas B12.", "Completed");

    stmtA.finalize();
    //Usuarios de prueba
    const stmtU = db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)");
    stmtU.run("dr.lopez", "1234", "Veterinario");
    stmtU.run("recepcion", "1234", "Recepcionista");
    stmtU.finalize();
});

module.exports = db;
