import { Request, Response } from "express";
import {db} from "../config/database";
import { Curso } from "../models/cursoModel";

export const agregarCurso = (req: Request, res: Response) => {
  const { id_curso, nombre_curso, descripcion, duracion_horas } = req.body;

  db.get(
    "SELECT * FROM Cursos WHERE nombre_curso = ? AND descripcion = ? AND duracion_horas = ?",
    [nombre_curso, descripcion, duracion_horas],
    (err, row) => {
      if (err) {
        return res.status(500).json({ status: "error", message: err.message });
      }
      
      if (row) {
        // Curso con la misma combinación ya existe
        return res.status(400).json({ status: "error", message: "Ya existe un curso con esta combinación de nombre, descripción y duración." });
      }

      

  db.run(
    "INSERT INTO Cursos(id_curso, nombre_curso, descripcion, duracion_horas) VALUES (?, ?, ?, ?)",
    [id_curso, nombre_curso, descripcion, duracion_horas],
    (err) => {
      if (err) {
        res.status(500).json({ status: "error", message: err.message });
      } else {
        res.status(200).json({ status: "ok", message: "Curso Agregado correctamente" });
      }
    }
  )
}
);
};

export const verCursos = (req: Request, res: Response) => {
  db.all("SELECT * FROM Cursos", (err, rows) => {
    if (err) {
      res.status(500).json({ status: "error", message: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
};

export const verCursoPorId = (req: Request, res: Response) => {
  const id_curso = req.params.id_curso;
  db.get("SELECT * FROM Cursos WHERE id_curso = ?", [id_curso], (err, row) => {
    if (err) {
      res.status(500).json({ status: "error", message: err.message });
    } else if (row) {
      res.status(200).json(row);
    } else {
      res.status(404).json({ status: "error", message: "Curso no encontrado" });
    }
  });
};

export const actualizarCurso = (req: Request, res: Response) => {
  const id_curso = req.params.id_curso;
  const { nombre_curso, descripcion, duracion_horas } = req.body;

  db.get(
    "SELECT * FROM Cursos WHERE id_curso = ?",
    [id_curso],
    (err, row: Curso) => {
      if (err) {
        return res.status(500).json({ status: "Error", message: err.message });
      }

      if (!row) {
        return res.status(404).json({ status: "Error", message: "Curso no encontrado" });
      }

      const updatedNombre = nombre_curso || row.nombre_curso;
      const updatedDescripcion = descripcion || row.descripcion;
      const updatedHoras = duracion_horas || row.duracion_horas;

      db.run(
        "UPDATE Cursos SET nombre_curso = ?, descripcion = ?, duracion_horas = ? WHERE id_curso = ?",
        [updatedNombre, updatedDescripcion, updatedHoras, id_curso],
        (updateErr) => {
          if (updateErr) {
            return res.status(500).json({ status: "Error", message: updateErr.message });
          }

          return res.status(200).json({
            status: "Curso actualizado exitosamente",
          });
        }
      );
    }
  );
};

export const borrarCurso = (req: Request, res: Response) => {
  const id_curso = req.params.id_curso;

  db.run("DELETE FROM Cursos WHERE id_curso = ?", [id_curso], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "El Curso no se ha encontrado y no se ha podido borrar" });
    }

    return res.status(200).json({
      Status: "Borrado Exitosamente",
    });
  });
};
