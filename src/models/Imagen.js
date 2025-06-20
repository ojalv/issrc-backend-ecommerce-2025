// Importamos los tipos de datos que Sequelize provee
import { DataTypes } from 'sequelize';
// Importamos la instancia de conexión
import sequelize from '../config/db/connection.js';

// Definimos el modelo "Imagen", que representa la tabla "Imagen" en la base de datos
//Imagen(id, fkIdProducto, url, orden)
const Imagen = sequelize.define('Imagen', {
  // Clave primaria autoincremental
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // Clave foránea que referencia al producto al que pertenece la imagen
  idProducto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Producto', // nombre de la tabla referenciada
      key: 'id'
    }
  },
  // URL de la imagen (obligatoria)
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Número de orden para mostrar las imágenes (opcional)
  orden: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  // Nombre exacto de la tabla en la base de datos
  tableName: 'Imagen',
  // Desactivamos timestamps automáticos
  timestamps: false
});

// Exportamos el modelo para usarlo en otros módulos
export default Imagen;
