import { Router } from "express";
import {
  agregarCurso,
  verCursos,
  verCursoPorId,
  actualizarCurso,
  borrarCurso,
} from "../controllers/cursoController";

const router = Router();

router.post("/AgregarCurso", agregarCurso);
router.get("/VerCursos", verCursos);
router.get("/VerCursos/:id_curso", verCursoPorId);
router.put("/ActualizarCurso/:id_curso", actualizarCurso);
router.delete("/BorrarCurso/:id_curso", borrarCurso);

export default router;
