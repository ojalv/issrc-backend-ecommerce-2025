import Cliente from '../models/Cliente.js';
import OrdenDeCompra from '../models/OrdenDeCompra.js';

// Obtener todos los clientes (con sus órdenes opcionalmente)
export const getClientes = async (req, res) => {
  const { includeOrders } = req.query; // ?includeOrders=true
  try {
    const clientes = await Cliente.findAll({
      include: includeOrders === 'true' ? [{ model: OrdenDeCompra, as: 'ordenesDeCompra' }] : []
    });
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener clientes' });
  }
};

// Obtener cliente por ID
export const getClienteById = async (req, res) => {
  const { id } = req.params;
  const { includeOrders } = req.query;
  try {
    const cliente = await Cliente.findByPk(id, {
      include: includeOrders === 'true' ? [{ model: OrdenDeCompra, as: 'ordenesDeCompra' }] : []
    });
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el cliente' });
  }
};

// Crear nuevo cliente
export const createCliente = async (req, res) => {
  const {
    email,
    passwordHash,
    dni,
    nombreCompleto,
    telefono,
    calleYnumero,
    ciudad,
    provincia,
    codigoPostal
  } = req.body;
  try {
    const nuevo = await Cliente.create({
      email,
      passwordHash,
      dni,
      nombreCompleto,
      telefono,
      calleYnumero,
      ciudad,
      provincia,
      codigoPostal
    });
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Email o DNI ya registrado' });
    }
    res.status(500).json({ message: 'Error al crear el cliente' });
  }
};

// Actualizar cliente existente
export const updateCliente = async (req, res) => {
  const { id } = req.params;
  const {
    email,
    passwordHash,
    dni,
    nombreCompleto,
    telefono,
    calleYnumero,
    ciudad,
    provincia,
    codigoPostal
  } = req.body;
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    Object.assign(cliente, {
      email: email ?? cliente.email,
      passwordHash: passwordHash ?? cliente.passwordHash,
      dni: dni ?? cliente.dni,
      nombreCompleto: nombreCompleto ?? cliente.nombreCompleto,
      telefono: telefono ?? cliente.telefono,
      calleYnumero: calleYnumero ?? cliente.calleYnumero,
      ciudad: ciudad ?? cliente.ciudad,
      provincia: provincia ?? cliente.provincia,
      codigoPostal: codigoPostal ?? cliente.codigoPostal
    });
    await cliente.save();
    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el cliente' });
  }
};

// Eliminar cliente
export const deleteCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    await cliente.destroy();
    res.json({ message: 'Cliente eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el cliente' });
  }
};
