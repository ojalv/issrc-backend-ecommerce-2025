import { DataTypes } from 'sequelize';
import sequelize from '../config/db/connection.js';

const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nombreCompleto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true
  },
  calleYnumero: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ciudad: {
    type: DataTypes.STRING,
    allowNull: true
  },
  provincia: {
    type: DataTypes.STRING,
    allowNull: true
  },
  codigoPostal: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'Cliente',
  timestamps: false
});

export default Cliente;
