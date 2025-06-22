import { Router } from 'express';
import {
  getOrdenesDeCompra,
  getOrdenDeCompraById,
  createOrdenDeCompra,
  updateOrdenDeCompra,
  deleteOrdenDeCompra
} from '../controllers/ordenDeCompraController.js';

const ordenDeCompraRoutes = Router();

ordenDeCompraRoutes.get('/', getOrdenesDeCompra);
ordenDeCompraRoutes.get('/:id', getOrdenDeCompraById);
ordenDeCompraRoutes.post('/', createOrdenDeCompra);
ordenDeCompraRoutes.put('/:id', updateOrdenDeCompra);
ordenDeCompraRoutes.delete('/:id', deleteOrdenDeCompra);

export default ordenDeCompraRoutes;
