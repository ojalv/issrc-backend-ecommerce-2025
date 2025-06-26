import { DataTypes } from 'sequelize';
import sequelize from '../config/db/connection.js';

// Modelo que representa un ítem del carrito de compras.
// Se relaciona directamente con un Cliente (idCliente) y con un Producto (idProducto),
// registrando la cantidad solicitada de ese producto.
const ItemCarritoDeCompra = sequelize.define('ItemCarritoDeCompra', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  idCliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Cliente',
      key: 'id'
    }
  },
  idProducto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Producto',
      key: 'id'
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
}, {
  tableName: 'ItemCarritoDeCompra',
  timestamps: false
});

export default ItemCarritoDeCompra;
