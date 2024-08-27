import { Database } from "sqlite3";

export const db = new Database("sistema_gestion_cursos.db", (err) => {
  if (err) {
    console.error("Error al abrir la base de datos: " + err.message);
  } else {
    console.log("Conectado a la Base de Datos");
  }
});


