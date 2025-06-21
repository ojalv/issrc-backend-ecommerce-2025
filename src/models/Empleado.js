import { DataTypes } from 'sequelize';
import sequelize from '../config/db/connection.js';

const Empleado = sequelize.define('Empleado', {
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
  nombreCompleto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM('ADMIN', 'OPERADOR', 'SUPERADMIN'),
    defaultValue: 'OPERADOR',
    allowNull: false,
  }
}, {
  tableName: 'Empleado',
  timestamps: false
});

export default Empleado;
