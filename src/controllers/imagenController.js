import Imagen from '../models/Imagen.js';

// Obtener todas las imágenes
export const getImagenes = async (req, res) => {
  try {
    const imagenes = await Imagen.findAll();
    res.json(imagenes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener imágenes' });
  }
};

// Obtener una imagen por ID
export const getImagenById = async (req, res) => {
  const { id } = req.params;
  try {
    const imagen = await Imagen.findByPk(id);
    if (!imagen) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }
    res.json(imagen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la imagen' });
  }
};

// Crear una nueva imagen
export const createImagen = async (req, res) => {
  const { idProducto, url, orden } = req.body;
  try {
    const nueva = await Imagen.create({ idProducto, url, orden });
    res.status(201).json(nueva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la imagen' });
  }
};

// Actualizar una imagen existente
export const updateImagen = async (req, res) => {
  const { id } = req.params;
  const { idProducto, url, orden } = req.body;
  try {
    const imagen = await Imagen.findByPk(id);
    if (!imagen) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }

    imagen.idProducto = idProducto ?? imagen.idProducto;
    imagen.url = url ?? imagen.url;
    imagen.orden = orden ?? imagen.orden;

    await imagen.save();
    res.json(imagen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la imagen' });
  }
};

// Eliminar una imagen
export const deleteImagen = async (req, res) => {
  const { id } = req.params;
  try {
    const imagen = await Imagen.findByPk(id);
    if (!imagen) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }
    await imagen.destroy();
    res.json({ message: 'Imagen eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la imagen' });
  }
};
