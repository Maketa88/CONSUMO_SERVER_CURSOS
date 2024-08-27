"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = require("sqlite3");
const db = new sqlite3_1.Database("sistema_gestion_cursos.db", (err) => {
    if (err) {
        console.error("Error al abrir la base de datos: " + err.message);
    }
    else {
        console.log("Conectado a la Base de Datos");
    }
});
exports.default = db;
