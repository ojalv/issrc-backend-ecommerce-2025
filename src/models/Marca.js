import { DataTypes } from 'sequelize'; // Importamos los tipos de datos de Sequelize
import sequelize from '../config/db/connection.js'; // Importamos la instancia de conexión a la base de datos

// Definimos el modelo "Marca", que representa la tabla "Marca" en la base de datos
const Marca = sequelize.define('Marca', {
  // Clave primaria autoincremental
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // Nombre de la marca (obligatorio)
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Forzamos el nombre de la tabla a "Marca"
  tableName: 'Marca',
  // Desactivamos los timestamps (createdAt, updatedAt)
  timestamps: false
});

// Exportamos el modelo para usarlo en otros módulos
export default Marca;
