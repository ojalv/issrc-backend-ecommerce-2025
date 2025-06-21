import { Router } from 'express';
import {
  getMarcas,
  getMarcaById,
  createMarca,
  updateMarca,
  deleteMarca
} from '../controllers/marcaController.js';

const marcaRoutes = Router();

marcaRoutes.get('/', getMarcas);
marcaRoutes.get('/:id', getMarcaById);
marcaRoutes.post('/', createMarca);
marcaRoutes.put('/:id', updateMarca);
marcaRoutes.delete('/:id', deleteMarca);

export default marcaRoutes;
