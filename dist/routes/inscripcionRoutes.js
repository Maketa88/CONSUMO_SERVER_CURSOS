"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const InscripcionesController_1 = require("../controllers/InscripcionesController");
const router = (0, express_1.Router)();
router.post("/AgregarInscripcion", InscripcionesController_1.agregarInscripcion);
router.get("/VerInscripciones", InscripcionesController_1.verInscripciones);
router.get("/VerInscripcionPorId/:id_inscripcion", InscripcionesController_1.verInscripcionesPorId);
router.put("/ActualizarInscripcion/:id_inscripcion", InscripcionesController_1.actualizarInscripcion);
router.delete("/BorrarInscripcion/:id_inscripcion", InscripcionesController_1.borrarInscripcion);
exports.default = router;
