import { DataTypes } from 'sequelize'; // Importamos los tipos de datos de Sequelize
import sequelize from '../config/db/connection.js'; // Importamos la instancia de conexión a la base de datos

// Definimos el modelo Producto, que representa la tabla "Producto" en la base de datos
// Producto(id, nombre, descripcion, precioUnitario, precioDescuento, descuentoActivo, fkIdMarca, fkIdCategoria, estaActivo)
const Producto = sequelize.define('Producto', {
  // Clave primaria autoincremental
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // Nombre del producto (obligatorio)
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Descripción del producto (opcional, tipo texto largo)
  descripcion: {
    type: DataTypes.TEXT
  },
  // Precio base del producto (obligatorio, con dos decimales)
  precioUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  // Precio con descuento (opcional, por defecto 0.00)
  precioDescuento: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  // Indica si el descuento está activo (true o false, por defecto false)
  descuentoActivo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  // Clave foránea que referencia a la tabla Marcas
  idMarca: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Marca', // nombre de la tabla referenciada
      key: 'id'        // clave primaria de la tabla referenciada
    }
  },
  // Clave foránea que referencia a la tabla Categorias
  idCategoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categoria', // nombre de la tabla referenciada
      key: 'id'
    }
  },
  // Indica si el producto está activo o no (por defecto true)
  estaActivo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  // Forzamos el nombre de la tabla a "Producto"
  tableName: 'Producto',
  // Desactivamos los campos automáticos createdAt y updatedAt
  timestamps: false
});

// Exportamos el modelo para poder usarlo en otros archivos
export default Producto;
