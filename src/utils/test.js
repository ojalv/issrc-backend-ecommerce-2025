/* MODELOS
    categoria x
    cliente
    empleado
    imagen
    itemCarritDeCompra
    itemOrdenDeCompra
    Marca x
    OrdenDeCompra
    Producto
*/

import Categoria from "../models/Categoria.js";
import Marca from "../models/Marca.js";
import Producto from "../models/Producto.js";

async function crearCategorias() {
  await Categoria.create({ nombre: "smartphones" });
  await Categoria.create({ nombre: "fundas" });
  await Categoria.create({ nombre: "auriculares" });
  await Categoria.create({ nombre: "cargadores" });
}

async function crearMarcas() {
  await Marca.create({ nombre: "Samsung" });
  await Marca.create({ nombre: "Xiaomi" });
  await Marca.create({ nombre: "Apple" });
  await Marca.create({ nombre: "Motorola" });
}

async function crearProductos() {
  await Producto.create({
    nombre: "Samsung Galaxy A34",
    descripcion: "Smartphone de gama media con excelente cámara y batería.",
    precioUnitario: 150000,
    precioDescuento: 135000,
    descuentoActivo: true,
    idMarca: 1, // Samsung
    idCategoria: 1, // smartphones
    estaActivo: true,
  });

  await Producto.create({
    nombre: "Funda Transparente Xiaomi Redmi Note",
    descripcion: "Funda protectora transparente de silicona.",
    precioUnitario: 5000,
    precioDescuento: 4500,
    descuentoActivo: true,
    idMarca: 2, // Xiaomi
    idCategoria: 2, // fundas
    estaActivo: true,
  });

  await Producto.create({
    nombre: "Auriculares Bluetooth Apple AirPods",
    descripcion: "Auriculares inalámbricos con estuche de carga.",
    precioUnitario: 120000,
    precioDescuento: 110000,
    descuentoActivo: true,
    idMarca: 3, // Apple
    idCategoria: 3, // auriculares
    estaActivo: true,
  });

  await Producto.create({
    nombre: "Cargador Turbo Motorola USB-C",
    descripcion: "Cargador rápido 30W con cable incluido.",
    precioUnitario: 25000,
    precioDescuento: 22000,
    descuentoActivo: false,
    idMarca: 4, // Motorola
    idCategoria: 4, // cargadores
    estaActivo: true,
  });

  await Producto.create({
    nombre: "Funda de cuero para iPhone 13",
    descripcion: "Elegante funda de cuero genuino para iPhone.",
    precioUnitario: 10000,
    precioDescuento: 8500,
    descuentoActivo: true,
    idMarca: 3, // Apple
    idCategoria: 2, // fundas
    estaActivo: true,
  });

  await Producto.create({
    nombre: "Auriculares con cable Samsung EO-IG955",
    descripcion:
      "Auriculares con cable de alta calidad para dispositivos Samsung.",
    precioUnitario: 8000,
    precioDescuento: 7200,
    descuentoActivo: true,
    idMarca: 1, // Samsung
    idCategoria: 3, // auriculares
    estaActivo: true,
  });

  await Producto.create({
    nombre: "Cargador Inalámbrico Xiaomi 20W",
    descripcion: "Base de carga inalámbrica rápida.",
    precioUnitario: 30000,
    precioDescuento: 27000,
    descuentoActivo: true,
    idMarca: 2, // Xiaomi
    idCategoria: 4, // cargadores
    estaActivo: true,
  });
}

export async function crearRegistros() {
  try {
    await crearCategorias();
    await crearMarcas();
    await crearProductos();
    console.log("✅ Registros de prueba cargados correctamente");
  } catch (error) {
    console.error("❌ Error al crear registros:", error.message);
  }
}
