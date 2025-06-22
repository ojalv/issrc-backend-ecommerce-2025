import { Router } from 'express';
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} from '../controllers/itemOrdenDeCompraController.js';

const itemOrdenDeCompraRoutes = Router();

itemOrdenDeCompraRoutes.get('/', getItems);
itemOrdenDeCompraRoutes.get('/:id', getItemById);
itemOrdenDeCompraRoutes.post('/', createItem);
itemOrdenDeCompraRoutes.put('/:id', updateItem);
itemOrdenDeCompraRoutes.delete('/:id', deleteItem);

export default itemOrdenDeCompraRoutes;
