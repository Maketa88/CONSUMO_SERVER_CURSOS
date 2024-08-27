"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrarInscripcion = exports.actualizarInscripcion = exports.verInscripcionesPorId = exports.verInscripciones = exports.agregarInscripcion = void 0;
const database_1 = require("../config/database");
const agregarInscripcion = (req, res) => {
    const { id_inscripcion } = req.params;
    const { id_curso, nombre_estudiante, fecha_inscripcion } = req.body;
    database_1.db.get("SELECT * FROM Cursos WHERE id_curso = ?", [id_curso], (err, row) => {
        if (err) {
            return res.status(500).json({ status: "Error", message: err.message });
        }
        if (!row) {
            return res.status(404).json({ status: "Error", message: "Curso no encontrado" });
        }
        database_1.db.run("INSERT INTO Inscripciones (id_inscripcion, id_curso, nombre_estudiante, fecha_inscripcion) VALUES (?, ?, ?, ?)", [id_inscripcion, id_curso, nombre_estudiante, fecha_inscripcion], (err) => {
            if (err) {
                return res.status(500).json({ status: "Error", message: err.message });
            }
            return res.status(201).json({
                Status: "Inscripción registrada exitosamente",
                id_inscripcion,
                id_curso,
                nombre_estudiante,
                fecha_inscripcion,
            });
        });
    });
};
exports.agregarInscripcion = agregarInscripcion;
const verInscripciones = (req, res) => {
    database_1.db.all("SELECT * FROM Inscripciones", (err, rows) => {
        if (err) {
            res.status(500).json({ status: "error", message: err.message });
        }
        else {
            res.status(200).json(rows);
        }
    });
};
exports.verInscripciones = verInscripciones;
const verInscripcionesPorId = (req, res) => {
    const id_inscripcion = req.params.id_inscripcion;
    database_1.db.get("SELECT * FROM Inscripciones WHERE id_inscripcion = ?", [id_inscripcion], (err, row) => {
        if (err) {
            res.status(500).json({ status: "error", message: err.message });
        }
        else if (row) {
            res.status(200).json(row);
        }
        else {
            res.status(404).json({ status: "error", message: "Inscripcion no encontrada" });
        }
    });
};
exports.verInscripcionesPorId = verInscripcionesPorId;
const actualizarInscripcion = (req, res) => {
    const id_inscripcion = req.params.id_inscripcion;
    const { nombre_estudiante, fecha_inscripcion } = req.body;
    database_1.db.get("SELECT * FROM Inscripciones WHERE id_inscripcion = ?", [id_inscripcion], (err, row) => {
        if (err) {
            return res.status(500).json({ status: "Error", message: err.message });
        }
        if (!row) {
            return res
                .status(404)
                .json({ status: "Error", message: "Inscripción no encontrada" });
        }
        const updatedNombreEstudiante = nombre_estudiante || row.nombre_estudiante;
        const updatedFechaInscripcion = fecha_inscripcion || row.fecha_inscripcion;
        database_1.db.run("UPDATE Inscripciones SET nombre_estudiante = ?, fecha_inscripcion = ? WHERE id_inscripcion = ?", [updatedNombreEstudiante, updatedFechaInscripcion, id_inscripcion], (updateErr) => {
            if (updateErr) {
                return res
                    .status(500)
                    .json({ status: "Error", message: updateErr.message });
            }
            return res.status(200).json({
                status: "Inscripción actualizada exitosamente",
            });
        });
    });
};
exports.actualizarInscripcion = actualizarInscripcion;
const borrarInscripcion = (req, res) => {
    // Obtener el id_inscripcion desde los headers
    const id_inscripcion = req.params.id_inscripcion;
    // Ejecutar la eliminación en la base de datos
    database_1.db.run(`DELETE FROM Inscripciones WHERE id_inscripcion = ?`, [id_inscripcion], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "La Inscripción no se ha encontrado y no se ha podido borrar", });
        }
        return res.status(200).json({
            Status: "Inscripción borrada exitosamente",
            id_inscripcion,
        });
    });
};
exports.borrarInscripcion = borrarInscripcion;
