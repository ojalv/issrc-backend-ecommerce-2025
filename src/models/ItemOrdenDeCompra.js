import { DataTypes } from 'sequelize';
import sequelize from '../config/db/connection.js';

const ItemOrdenDeCompra = sequelize.define('ItemOrdenDeCompra', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  idOrdenDeCompra: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'OrdenDeCompra',
      key: 'id'
    }
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  precioUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  precioDescuento: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  descuentoActivo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: true
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'ItemOrdenDeCompra',
  timestamps: false
});

export default ItemOrdenDeCompra;
