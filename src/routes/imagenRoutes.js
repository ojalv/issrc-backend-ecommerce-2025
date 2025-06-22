import { Router } from 'express';
import {
  getImagenes,
  getImagenById,
  createImagen,
  updateImagen,
  deleteImagen
} from '../controllers/imagenController.js';

const imagenRoutes = Router();

imagenRoutes.get('/', getImagenes);
imagenRoutes.get('/:id', getImagenById);
imagenRoutes.post('/', createImagen);
imagenRoutes.put('/:id', updateImagen);
imagenRoutes.delete('/:id', deleteImagen);

export default imagenRoutes;
