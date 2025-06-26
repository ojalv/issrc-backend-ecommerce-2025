import { Router } from 'express';
import {
  getResets,
  getResetById,
  createReset,
  verifyToken,
  markUsed,
  deleteExpired
} from '../controllers/passwordResetController.js';

const passwordResetRoutes = Router();

passwordResetRoutes.get('/', getResets);
passwordResetRoutes.get('/:id', getResetById);
passwordResetRoutes.post('/', createReset);
passwordResetRoutes.get('/token/:token', verifyToken); // verificar validez
passwordResetRoutes.put('/token/:token', markUsed);   // marcar como usado
passwordResetRoutes.delete('/expired', deleteExpired); // limpiar expirados

export default passwordResetRoutes;
