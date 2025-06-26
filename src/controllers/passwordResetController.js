import PasswordReset from '../models/PasswordReset.js';
import Cliente from '../models/Cliente.js';
import { randomBytes } from 'crypto';
import { Op } from 'sequelize';

/*
  Controlador para las solicitudes de restablecimiento de contraseña.
  Rutas base: /password-resets
*/

// Obtener todas las solicitudes
export const getResets = async (req, res) => {
  const { idCliente } = req.query;
  try {
    const where = idCliente ? { idCliente } : undefined;
    const resets = await PasswordReset.findAll({ where });
    res.json(resets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener solicitudes de restablecimiento' });
  }
};

// Obtener solicitud por ID
export const getResetById = async (req, res) => {
  const { id } = req.params;
  try {
    const reset = await PasswordReset.findByPk(id);
    if (!reset) return res.status(404).json({ message: 'Solicitud no encontrada' });
    res.json(reset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la solicitud' });
  }
};

// Crear nueva solicitud
export const createReset = async (req, res) => {
  const { idCliente, expiracionMinutos = 60 } = req.body;
  try {
    // Verificar cliente existente
    const cliente = await Cliente.findByPk(idCliente);
    if (!cliente) return res.status(400).json({ message: 'Cliente no válido' });

    const token = randomBytes(32).toString('hex');
    const expiracion = new Date(Date.now() + expiracionMinutos * 60 * 1000);

    const nueva = await PasswordReset.create({ idCliente, token, expiracion });
    res.status(201).json(nueva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la solicitud' });
  }
};

// Verificar un token (vigente y no usado)
export const verifyToken = async (req, res) => {
  const { token } = req.params;
  try {
    const reset = await PasswordReset.findOne({ where: { token } });
    if (!reset)
      return res.status(404).json({ message: 'Token no encontrado' });

    if (reset.usado)
      return res.status(400).json({ message: 'Token ya utilizado' });

    if (reset.expiracion < new Date())
      return res.status(400).json({ message: 'Token expirado' });

    res.json({ valido: true, idCliente: reset.idCliente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al verificar token' });
  }
};

// Marcar token como usado
export const markUsed = async (req, res) => {
  const { token } = req.params;
  try {
    const reset = await PasswordReset.findOne({ where: { token } });
    if (!reset) return res.status(404).json({ message: 'Token no encontrado' });

    reset.usado = true;
    await reset.save();
    res.json({ message: 'Token marcado como usado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar token' });
  }
};

// Eliminar solicitudes expiradas (utilidad)
export const deleteExpired = async (_req, res) => {
  try {
    const count = await PasswordReset.destroy({ where: { expiracion: { [Op.lt]: new Date() } } });
    res.json({ eliminadas: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar solicitudes expiradas' });
  }
};
