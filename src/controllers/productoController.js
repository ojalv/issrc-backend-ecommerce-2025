import Producto from '../models/Producto.js';
import Marca from '../models/Marca.js';
import Categoria from '../models/Categoria.js';
import Imagen from '../models/Imagen.js';

// Obtener todos los productos con sus relaciones básicas
export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      include: [
        { model: Marca, as: 'marca', attributes: ['id', 'nombre'] }, // incluye la marca del producto
        { model: Categoria, as: 'categoria', attributes: ['id', 'nombre'] }, // incluye la categoria del producto
        { model: Imagen, as: 'imagenes', attributes: ['id', 'url', 'orden'] } // incluye las imagenes del producto
      ],
      where: {
        estaActivo: true //filtra solo los productos activos
      }
    });
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

// Obtener un producto por ID
export const getProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id, {
      include: [
        { model: Marca, as: 'marca', attributes: ['id', 'nombre'] },
        { model: Categoria, as: 'categoria', attributes: ['id', 'nombre'] },
        { model: Imagen, as: 'imagenes', attributes: ['id', 'url', 'orden'] }
      ]
    });
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

// Crear un nuevo producto
export const createProducto = async (req, res) => {
  const { nombre, descripcion, precioUnitario, precioDescuento, descuentoActivo, idMarca, idCategoria, estaActivo } = req.body;
  try {
    const nuevo = await Producto.create({
      nombre,
      descripcion,
      precioUnitario,
      precioDescuento,
      descuentoActivo,
      idMarca,
      idCategoria,
      estaActivo
    });
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el producto' });
  }
};

// Actualizar un producto existente
export const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precioUnitario, precioDescuento, descuentoActivo, idMarca, idCategoria, estaActivo } = req.body;
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    producto.nombre = nombre ?? producto.nombre;
    producto.descripcion = descripcion ?? producto.descripcion;
    producto.precioUnitario = precioUnitario ?? producto.precioUnitario;
    producto.precioDescuento = precioDescuento ?? producto.precioDescuento;
    producto.descuentoActivo = descuentoActivo ?? producto.descuentoActivo;
    producto.idMarca = idMarca ?? producto.idMarca;
    producto.idCategoria = idCategoria ?? producto.idCategoria;
    producto.estaActivo = estaActivo ?? producto.estaActivo;

    await producto.save();
    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};

// Eliminar un producto
export const deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    await producto.destroy();
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};
