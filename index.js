// index.js (en la raíz del proyecto)
import express from "express";
import { sequelize } from "./src/models/index.js"; // Importa la instancia (nota el .js)
import { syncDB, authDB } from "./src/utils/db.js";
import categoriaRoutes from "./src/routes/categoriaRoutes.js";
import imagenRoutes from "./src/routes/imagenRoutes.js";
import productoRoutes from "./src/routes/productoRoutes.js";
import ordenDeCompraRoutes from "./src/routes/ordenDeCompraRoutes.js";
import itemOrdenDeCompraRoutes from "./src/routes/itemOrdenDeCompraRoutes.js";
import clienteRoutes from "./src/routes/clienteRoutes.js";
import empleadoRoutes from "./src/routes/empleadoRoutes.js";
import marcaRoutes from "./src/routes/marcaRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware básico para parsear JSON
app.use(express.json());

// Rutas de API
app.use('/categorias', categoriaRoutes);
app.use('/marcas', marcaRoutes);
app.use('/imagenes', imagenRoutes);
app.use('/productos', productoRoutes);
app.use('/ordenes', ordenDeCompraRoutes);
app.use('/items', itemOrdenDeCompraRoutes);
app.use('/clientes', clienteRoutes);
app.use('/empleados', empleadoRoutes);

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