import { Router } from 'express';
import {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
} from '../controllers/clienteController.js';

const clienteRoutes = Router();

clienteRoutes.get('/', getClientes);
clienteRoutes.get('/:id', getClienteById);
clienteRoutes.post('/', createCliente);
clienteRoutes.put('/:id', updateCliente);
clienteRoutes.delete('/:id', deleteCliente);

export default clienteRoutes;
