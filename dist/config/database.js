"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sqlite3_1 = require("sqlite3");
exports.db = new sqlite3_1.Database("sistema_gestion_cursos.db", (err) => {
    if (err) {
        console.error("Error al abrir la base de datos: " + err.message);
    }
    else {
        console.log("Conectado a la Base de Datos");
    }
});
