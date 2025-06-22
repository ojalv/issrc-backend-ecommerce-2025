import ItemOrdenDeCompra from '../models/ItemOrdenDeCompra.js';
import OrdenDeCompra from '../models/OrdenDeCompra.js';

// Obtener todos los items (opcionalmente filtrados por idOrdenDeCompra)
export const getItems = async (req, res) => {
  const { idOrdenDeCompra } = req.query; // ?idOrdenDeCompra=123
  try {
    const where = idOrdenDeCompra ? { idOrdenDeCompra } : undefined;
    const items = await ItemOrdenDeCompra.findAll({ where });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener items de orden de compra' });
  }
};

// Obtener item por ID
export const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await ItemOrdenDeCompra.findByPk(id);
    if (!item) {
      return res.status(404).json({ message: 'Item no encontrado' });
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el item' });
  }
};

// Crear nuevo item
export const createItem = async (req, res) => {
  const {
    idOrdenDeCompra,
    descripcion,
    precioUnitario,
    precioDescuento,
    descuentoActivo,
    marca,
    categoria,
    nombre
  } = req.body;
  try {
    // Verificar que la orden exista
    const orden = await OrdenDeCompra.findByPk(idOrdenDeCompra);
    if (!orden) {
      return res.status(400).json({ message: 'Orden de compra no válida' });
    }
    const nuevo = await ItemOrdenDeCompra.create({
      idOrdenDeCompra,
      descripcion,
      precioUnitario,
      precioDescuento,
      descuentoActivo,
      marca,
      categoria,
      nombre
    });
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el item' });
  }
};

// Actualizar item
export const updateItem = async (req, res) => {
  const { id } = req.params;
  const {
    idOrdenDeCompra,
    descripcion,
    precioUnitario,
    precioDescuento,
    descuentoActivo,
    marca,
    categoria,
    nombre
  } = req.body;
  try {
    const item = await ItemOrdenDeCompra.findByPk(id);
    if (!item) {
      return res.status(404).json({ message: 'Item no encontrado' });
    }
    Object.assign(item, {
      idOrdenDeCompra: idOrdenDeCompra ?? item.idOrdenDeCompra,
      descripcion: descripcion ?? item.descripcion,
      precioUnitario: precioUnitario ?? item.precioUnitario,
      precioDescuento: precioDescuento ?? item.precioDescuento,
      descuentoActivo: descuentoActivo ?? item.descuentoActivo,
      marca: marca ?? item.marca,
      categoria: categoria ?? item.categoria,
      nombre: nombre ?? item.nombre
    });
    await item.save();
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el item' });
  }
};

// Eliminar item
export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await ItemOrdenDeCompra.findByPk(id);
    if (!item) {
      return res.status(404).json({ message: 'Item no encontrado' });
    }
    await item.destroy();
    res.json({ message: 'Item eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el item' });
  }
};
