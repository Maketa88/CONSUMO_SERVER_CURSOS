import { Router } from "express";
import {
  agregarInscripcion,
  verInscripciones,
  verInscripcionesPorId,
  actualizarInscripcion,
  borrarInscripcion,
} from "../controllers/InscripcionesController";

const router = Router();

router.post("/AgregarInscripcion", agregarInscripcion);
router.get("/VerInscripciones", verInscripciones);
router.get("/VerInscripcionPorId/:id_inscripcion", verInscripcionesPorId);
router.put("/ActualizarInscripcion/:id_inscripcion", actualizarInscripcion);
router.delete("/BorrarInscripcion/:id_inscripcion", borrarInscripcion);

export default router;
