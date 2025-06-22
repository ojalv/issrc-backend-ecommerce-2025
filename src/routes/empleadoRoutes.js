import { Router } from 'express';
import {
  getEmpleados,
  getEmpleadoById,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado
} from '../controllers/empleadoController.js';

const empleadoRoutes = Router();

empleadoRoutes.get('/', getEmpleados);
empleadoRoutes.get('/:id', getEmpleadoById);
empleadoRoutes.post('/', createEmpleado);
empleadoRoutes.put('/:id', updateEmpleado);
empleadoRoutes.delete('/:id', deleteEmpleado);

export default empleadoRoutes;
