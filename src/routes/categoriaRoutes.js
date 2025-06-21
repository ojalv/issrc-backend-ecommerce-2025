import { Router } from 'express';
import {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria
} from '../controllers/categoriaController.js';

const categoriaRoutes = Router();

categoriaRoutes.get('/', getCategorias);
categoriaRoutes.get('/:id', getCategoriaById);
categoriaRoutes.post('/', createCategoria);
categoriaRoutes.put('/:id', updateCategoria);
categoriaRoutes.delete('/:id', deleteCategoria);

export default categoriaRoutes;
