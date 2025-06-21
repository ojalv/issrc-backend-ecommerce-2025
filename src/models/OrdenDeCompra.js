import { DataTypes } from 'sequelize';
import sequelize from '../config/db/connection.js';

const OrdenDeCompra = sequelize.define('OrdenDeCompra', {
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
  idDespachador: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Empleado',
      key: 'id'
    }
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  estadoEnvio: {
    type: DataTypes.ENUM("PENDIENTE","EN PREPARACION","DESPACHADO"),
    defaultValue: "PENDIENTE"
  },
  idTransaccionMP: {
    type: DataTypes.STRING,
    allowNull: true
  },
  codigoSeguimientoAndreani: {
    type: DataTypes.STRING,
    allowNull: true
  },
  direccionEnvio: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nombreCliente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefonoCliente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  emailCliente: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
}, {
  tableName: 'OrdenDeCompra',
  timestamps: false
});

export default OrdenDeCompra;
