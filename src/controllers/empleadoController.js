import Empleado from '../models/Empleado.js';
import OrdenDeCompra from '../models/OrdenDeCompra.js';

// Obtener todos los empleados (opcionalmente con órdenes despachadas)
export const getEmpleados = async (req, res) => {
  const { includeOrders } = req.query;
  try {
    const empleados = await Empleado.findAll({
      include: includeOrders === 'true' ? [{ model: OrdenDeCompra, as: 'ordenesDeCompra' }] : []
    });
    res.json(empleados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener empleados' });
  }
};

// Obtener empleado por ID
export const getEmpleadoById = async (req, res) => {
  const { id } = req.params;
  const { includeOrders } = req.query;
  try {
    const empleado = await Empleado.findByPk(id, {
      include: includeOrders === 'true' ? [{ model: OrdenDeCompra, as: 'ordenesDeCompra' }] : []
    });
    if (!empleado) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    res.json(empleado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el empleado' });
  }
};

// Crear nuevo empleado
export const createEmpleado = async (req, res) => {
  const { email, passwordHash, nombreCompleto, rol } = req.body;
  try {
    const nuevo = await Empleado.create({ email, passwordHash, nombreCompleto, rol });
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Email ya registrado' });
    }
    res.status(500).json({ message: 'Error al crear el empleado' });
  }
};

// Actualizar empleado existente
export const updateEmpleado = async (req, res) => {
  const { id } = req.params;
  const { email, passwordHash, nombreCompleto, rol } = req.body;
  try {
    const empleado = await Empleado.findByPk(id);
    if (!empleado) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    Object.assign(empleado, {
      email: email ?? empleado.email,
      passwordHash: passwordHash ?? empleado.passwordHash,
      nombreCompleto: nombreCompleto ?? empleado.nombreCompleto,
      rol: rol ?? empleado.rol
    });
    await empleado.save();
    res.json(empleado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el empleado' });
  }
};

// Eliminar empleado
export const deleteEmpleado = async (req, res) => {
  const { id } = req.params;
  try {
    const empleado = await Empleado.findByPk(id);
    if (!empleado) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    await empleado.destroy();
    res.json({ message: 'Empleado eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el empleado' });
  }
};
