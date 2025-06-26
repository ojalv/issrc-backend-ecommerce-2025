import sequelize from '../config/db/connection.js';
import Producto from './Producto.js';
import Categoria from './Categoria.js';
import Marca from './Marca.js';
import Imagen from './Imagen.js';
import Cliente from './Cliente.js';
import Empleado from './Empleado.js';
import OrdenDeCompra from './OrdenDeCompra.js';
import ItemOrdenDeCompra from './ItemOrdenDeCompra.js';
import ItemCarritoDeCompra from './ItemCarritoDeCompra.js';

/* --- Relación Producto <-> Marca (N:1) --- */
Producto.belongsTo(Marca, {
  foreignKey: 'idMarca',
  as: 'marca'
});
Marca.hasMany(Producto, {
  foreignKey: 'idMarca',
  as: 'productos'
});

/* --- Relación Producto <-> Categoria (N:1) --- */
Producto.belongsTo(Categoria, {
  foreignKey: 'idCategoria',
  as: 'categoria'
});
Categoria.hasMany(Producto, {
  foreignKey: 'idCategoria',
  as: 'productos'
});

/* --- Relación Producto <-> Imagen (1:N) --- */
Producto.hasMany(Imagen, {
  foreignKey: 'idProducto',
  as: 'imagenes'
});
Imagen.belongsTo(Producto, {
  foreignKey: 'idProducto',
  as: 'producto'
});

/* --- Relación OrdenDeCompra <-> ItemOrdenDeCompra (1:N) ---*/
OrdenDeCompra.hasMany(ItemOrdenDeCompra, {
  foreignKey: 'idOrdenDeCompra',
  as: 'items'
});
ItemOrdenDeCompra.belongsTo(OrdenDeCompra, {
  foreignKey: 'idOrdenDeCompra',
  as: 'ordenDeCompra'
});

/* --- Relación OrdenDeCompra <-> Cliente (N:1) --- */
OrdenDeCompra.belongsTo(Cliente, {
  foreignKey: 'idCliente',
  as: 'cliente'
});
Cliente.hasMany(OrdenDeCompra, {
  foreignKey: 'idCliente',
  as: 'ordenesDeCompra'
});

/* --- Relación OrdenDeCompra <-> Empleado (N:1) --- */
OrdenDeCompra.belongsTo(Empleado, {
  foreignKey: 'idDespachador',
  as: 'despachador'
});
Empleado.hasMany(OrdenDeCompra, {
  foreignKey: 'idDespachador',
  as: 'ordenesDeCompra'
});

/* --- Relación Cliente <-> ItemCarritoDeCompra (1:N) --- */
Cliente.hasMany(ItemCarritoDeCompra, {
  foreignKey: 'idCliente',
  as: 'itemsCarrito'
});
ItemCarritoDeCompra.belongsTo(Cliente, {
  foreignKey: 'idCliente',
  as: 'cliente'
});

/* --- Relación Producto <-> ItemCarritoDeCompra (1:N) --- */
Producto.hasMany(ItemCarritoDeCompra, {
  foreignKey: 'idProducto',
  as: 'itemsCarrito'
});
ItemCarritoDeCompra.belongsTo(Producto, {
  foreignKey: 'idProducto',
  as: 'producto'
});

export { sequelize }