import app from "./app";

const PORT = process.env.PORT || 10101;

app.listen(PORT, () => {
  console.log("Servidor ejecutándose en el puerto:", PORT);
});
