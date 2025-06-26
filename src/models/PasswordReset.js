import { DataTypes } from 'sequelize';
import sequelize from '../config/db/connection.js';

// Modelo que registra solicitudes de restablecimiento de contraseña.
// Cada registro se vincula a un Cliente mediante idCliente.
// Incluye token único, fecha de expiración, flag de uso y fecha de creación.
const PasswordReset = sequelize.define('PasswordReset', {
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
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  expiracion: {
    type: DataTypes.DATE,
    allowNull: false
  },
  usado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'PasswordReset',
  timestamps: false
});

export default PasswordReset;
