import ItemCarritoDeCompra from '../models/ItemCarritoDeCompra.js';
import Cliente from '../models/Cliente.js';
import Producto from '../models/Producto.js';

/*
  Controlador CRUD para los ítems de carrito.
  Las rutas que lo consumen se definen en /carrito
*/

// Obtener todos los ítems del carrito
export const getItems = async (req, res) => {
  const { idCliente } = req.query; 
  try {
    const where = idCliente ? { idCliente } : undefined;
    const items = await ItemCarritoDeCompra.findAll({ where });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los items del carrito' });
  }
};

// Obtener ítem por ID
export const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await ItemCarritoDeCompra.findByPk(id);
    if (!item) return res.status(404).json({ message: 'Ítem no encontrado' });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el ítem' });
  }
};

// Crear nuevo ítem
export const createItem = async (req, res) => {
  const { idCliente, idProducto, cantidad } = req.body;
  try {
    // Validaciones básicas
    const cliente = await Cliente.findByPk(idCliente);
    if (!cliente) return res.status(400).json({ message: 'Cliente no válido' });

    const producto = await Producto.findByPk(idProducto);
    if (!producto) return res.status(400).json({ message: 'Producto no válido' });

    const nuevo = await ItemCarritoDeCompra.create({ idCliente, idProducto, cantidad });
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el ítem del carrito' });
  }
};

// Actualizar ítem (solo cantidad y/o producto)
export const updateItem = async (req, res) => {
  const { id } = req.params;
  const { idProducto, cantidad } = req.body;
  try {
    const item = await ItemCarritoDeCompra.findByPk(id);
    if (!item) return res.status(404).json({ message: 'Ítem no encontrado' });

    if (idProducto) {
      const producto = await Producto.findByPk(idProducto);
      if (!producto) return res.status(400).json({ message: 'Producto no válido' });
      item.idProducto = idProducto;
    }

    if (cantidad !== undefined) item.cantidad = cantidad;
    await item.save();
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el ítem' });
  }
};

// Eliminar ítem
export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await ItemCarritoDeCompra.findByPk(id);
    if (!item) return res.status(404).json({ message: 'Ítem no encontrado' });
    await item.destroy();
    res.json({ message: 'Ítem eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el ítem' });
  }
};
