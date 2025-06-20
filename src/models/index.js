import sequelize from '../config/db/connection.js';
import Producto from './Producto.js';
import Categoria from './Categoria.js';
import Marca from './Marca.js';
import Imagen from './Imagen.js';

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

export { sequelize }