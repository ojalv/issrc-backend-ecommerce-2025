import { DataTypes } from 'sequelize'; // Importamos los tipos de datos de Sequelize
import sequelize from '../config/db/connection.js'; // Importamos la instancia de conexión a la base de datos

// Definimos el modelo "Categoria", que representa la tabla "Categoria" en la base de datos
const Categoria = sequelize.define('Categoria', {
  // Clave primaria autoincremental
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // Nombre de la categoría (obligatorio)
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Forzamos el nombre de la tabla a "Categoria"
  tableName: 'Categoria',
  // Desactivamos los timestamps (createdAt, updatedAt)
  timestamps: false
});

// Exportamos el modelo para usarlo en otros módulos
export default Categoria;
