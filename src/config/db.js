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
            status TEXT DEFAULT 'Scheduled',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (id_pet) REFERENCES pet(id),
            FOREIGN KEY (id_owner) REFERENCES owner(id)
        )
    `);

    //Aquí insertamos los valores correspondientes. En este caso migramos a Rex y Luna bajo el nuevo esquema.
    const stmtO = db.prepare("INSERT INTO owner (owner_name) VALUES (?)");
    stmtO.run("Juan Pérez");
    stmtO.run("Maria García");
    stmtO.finalize();
    const stmtP = db.prepare("INSERT INTO pet (pet_name, id_owner) VALUES (?, ?)");
    stmtP.run("Rex", 1);
    stmtP.run("Luna", 2);
    stmtP.finalize();
    const stmtA = db.prepare("INSERT INTO appointments (id_pet, id_owner, service, appointment_date) VALUES (?, ?, ?, ?)");
    stmtA.run(1, 1, "Corte de Pelo", "2026-02-25 10:00");
    stmtA.run(2, 2, "Baño y Limpieza", "2026-02-25 11:30");
    stmtA.finalize();
});

module.exports = db;
