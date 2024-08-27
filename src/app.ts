import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cursoRoutes from "./routes/cursoRoutes";
import InscripcionRoutes from "./routes/inscripcionRoutes";

dotenv.config();

const app = express()
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

app.use("/", cursoRoutes,InscripcionRoutes);

export default app;
