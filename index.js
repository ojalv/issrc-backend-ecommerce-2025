// index.js (en la raíz del proyecto)
import express from "express";
import { sequelize } from "./src/models/index.js"; // Importa la instancia (nota el .js)
import { syncDB, authDB } from "./src/utils/db.js";
import categoriaRoutes from "./src/routes/categoriaRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware básico para parsear JSON
app.use(express.json());

// Rutas de API
app.use("/categorias", categoriaRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Backend funcionando!");
});

// Iniciar servidor y probar conexión DB
async function startServer() {
  try {
    await authDB(sequelize); // Intenta autenticar la conexión a la DB
    await syncDB(sequelize); // Sincroniza modelos

    // Inicia el servidor Express
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ No se pudo conectar a la base de datos:", error);
  }
}

startServer();