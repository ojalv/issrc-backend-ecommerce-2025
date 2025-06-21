import Marca from '../models/Marca.js';

// Obtener todas las marcas
export const getMarcas = async (req, res) => {
  try {
    const marcas = await Marca.findAll();
    res.json(marcas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener marcas' });
  }
};

// Obtener una marca por ID
export const getMarcaById = async (req, res) => {
  const { id } = req.params;
  try {
    const marca = await Marca.findByPk(id);
    if (!marca) {
      return res.status(404).json({ message: 'Marca no encontrada' });
    }
    res.json(marca);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la marca' });
  }
};

// Crear una nueva marca
export const createMarca = async (req, res) => {
  const { nombre } = req.body;
  try {
    const nueva = await Marca.create({ nombre });
    res.status(201).json(nueva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la marca' });
  }
};

// Actualizar una marca existente
export const updateMarca = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const marca = await Marca.findByPk(id);
    if (!marca) {
      return res.status(404).json({ message: 'Marca no encontrada' });
    }
    marca.nombre = nombre ?? marca.nombre;
    await marca.save();
    res.json(marca);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la marca' });
  }
};

// Eliminar una marca
export const deleteMarca = async (req, res) => {
  const { id } = req.params;
  try {
    const marca = await Marca.findByPk(id);
    if (!marca) {
      return res.status(404).json({ message: 'Marca no encontrada' });
    }
    await marca.destroy();
    res.json({ message: 'Marca eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la marca' });
  }
};
