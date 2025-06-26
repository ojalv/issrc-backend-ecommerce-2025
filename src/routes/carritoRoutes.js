import { Router } from 'express';
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} from '../controllers/itemCarritoDeCompraController.js';

const carritoRoutes = Router();

carritoRoutes.get('/', getItems);
carritoRoutes.get('/:id', getItemById);
carritoRoutes.post('/', createItem);
carritoRoutes.put('/:id', updateItem);
carritoRoutes.delete('/:id', deleteItem);

export default carritoRoutes;
