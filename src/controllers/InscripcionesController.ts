import { Request, Response } from "express";
import {db} from "../config/database";
import { Inscripcion } from "../models/inscripcionesModel";

export const agregarInscripcion = (req: Request, res: Response) => {
    const { id_inscripcion } = req.params;
    const { id_curso, nombre_estudiante, fecha_inscripcion } = req.body;
  
    db.get("SELECT * FROM Cursos WHERE id_curso = ?", [id_curso], (err, row) => {
      if (err) {
        return res.status(500).json({ status: "Error", message: err.message });
      }
      if (!row) {
        return res.status(404).json({ status: "Error", message: "Curso no encontrado" });
      }
  
      db.run(
        "INSERT INTO Inscripciones (id_inscripcion, id_curso, nombre_estudiante, fecha_inscripcion) VALUES (?, ?, ?, ?)",
        [id_inscripcion, id_curso, nombre_estudiante, fecha_inscripcion],
        (err) => {
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
        }
      );
    });
  };

 export const verInscripciones = (req: Request, res: Response) => {
    db.all("SELECT * FROM Inscripciones", (err, rows) => {
      if (err) {
        res.status(500).json({ status: "error", message: err.message });
      } else {
        res.status(200).json(rows);
      }
    });
  };


  export const verInscripcionesPorId = (req: Request, res: Response) => {
    const id_inscripcion = req.params.id_inscripcion;
    db.get("SELECT * FROM Inscripciones WHERE id_inscripcion = ?", [id_inscripcion], (err, row) => {
      if (err) {
        res.status(500).json({ status: "error", message: err.message });
      } else if (row) {
        res.status(200).json(row);
      } else {
        res.status(404).json({ status: "error", message: "Inscripcion no encontrada" });
      }
    });
  };

export const actualizarInscripcion = (req: Request, res: Response) => {
    const id_inscripcion = req.params.id_inscripcion;
    const { nombre_estudiante, fecha_inscripcion } = req.body;
  
    db.get(
      "SELECT * FROM Inscripciones WHERE id_inscripcion = ?",
      [id_inscripcion],
      (err, row: Inscripcion) => {
        if (err) {
          return res.status(500).json({ status: "Error", message: err.message });
        }
  
        if (!row) {
          return res
            .status(404)
            .json({ status: "Error", message: "Inscripción no encontrada" });
        }
  
        const updatedNombreEstudiante =
          nombre_estudiante || row.nombre_estudiante;
        const updatedFechaInscripcion =
          fecha_inscripcion || row.fecha_inscripcion;
  
        db.run(
          "UPDATE Inscripciones SET nombre_estudiante = ?, fecha_inscripcion = ? WHERE id_inscripcion = ?",
          [updatedNombreEstudiante, updatedFechaInscripcion, id_inscripcion],
          (updateErr) => {
            if (updateErr) {
              return res
                .status(500)
                .json({ status: "Error", message: updateErr.message });
            }
  
            return res.status(200).json({
              status: "Inscripción actualizada exitosamente",
            });
          }
        );
      }
    );
  };

 export const borrarInscripcion =(req: Request, res: Response) => {
    // Obtener el id_inscripcion desde los headers
    const id_inscripcion = req.params.id_inscripcion;
  
    // Ejecutar la eliminación en la base de datos
    db.run(
      `DELETE FROM Inscripciones WHERE id_inscripcion = ?`,
      [id_inscripcion],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
          return res.status(404).json({error: "La Inscripción no se ha encontrado y no se ha podido borrar",});
        }
        return res.status(200).json({
          Status: "Inscripción borrada exitosamente",
          id_inscripcion,
        });
      }
    );
  };
  
  
  