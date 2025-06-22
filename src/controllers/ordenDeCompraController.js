import OrdenDeCompra from '../models/OrdenDeCompra.js';
import ItemOrdenDeCompra from '../models/ItemOrdenDeCompra.js';
import Cliente from '../models/Cliente.js';
import Empleado from '../models/Empleado.js';

// Obtener todas las órdenes de compra con sus relaciones
export const getOrdenesDeCompra = async (req, res) => {
  try {
    const ordenes = await OrdenDeCompra.findAll({
      include: [
        { model: Cliente, as: 'cliente', attributes: ['id', 'nombreCompleto'] },
        { model: Empleado, as: 'despachador', attributes: ['id', 'nombreCompleto'] },
        { model: ItemOrdenDeCompra, as: 'items' }
      ]
    });
    res.json(ordenes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener órdenes de compra' });
  }
};

// Obtener una orden por ID
export const getOrdenDeCompraById = async (req, res) => {
  const { id } = req.params;
  try {
    const orden = await OrdenDeCompra.findByPk(id, {
      include: [
        { model: Cliente, as: 'cliente', attributes: ['id', 'nombreCompleto'] },
        { model: Empleado, as: 'despachador', attributes: ['id', 'nombreCompleto'] },
        { model: ItemOrdenDeCompra, as: 'items' }
      ]
    });
    if (!orden) {
      return res.status(404).json({ message: 'Orden de compra no encontrada' });
    }
    res.json(orden);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la orden de compra' });
  }
};

// Crear una nueva orden de compra (opcionalmente con items)
export const createOrdenDeCompra = async (req, res) => {
  const {
    idCliente,
    idDespachador,
    total,
    estadoEnvio,
    idTransaccionMP,
    codigoSeguimientoAndreani,
    direccionEnvio,
    nombreCliente,
    telefonoCliente,
    emailCliente,
    items = []
  } = req.body;

  const t = await OrdenDeCompra.sequelize.transaction();
  try {
    // Crear la orden
    const nuevaOrden = await OrdenDeCompra.create({
      idCliente,
      idDespachador,
      total,
      estadoEnvio,
      idTransaccionMP,
      codigoSeguimientoAndreani,
      direccionEnvio,
      nombreCliente,
      telefonoCliente,
      emailCliente
    }, { transaction: t });

    // Si vienen items, los creamos y asociamos
    if (Array.isArray(items) && items.length > 0) {
      const itemsConOrden = items.map(it => ({ ...it, idOrdenDeCompra: nuevaOrden.id }));
      await ItemOrdenDeCompra.bulkCreate(itemsConOrden, { transaction: t });
    }

    await t.commit();
    res.status(201).json(nuevaOrden);
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ message: 'Error al crear la orden de compra' });
  }
};

// Actualizar una orden de compra (no maneja items)
export const updateOrdenDeCompra = async (req, res) => {
  const { id } = req.params;
  const {
    idCliente,
    idDespachador,
    total,
    estadoEnvio,
    idTransaccionMP,
    codigoSeguimientoAndreani,
    direccionEnvio,
    nombreCliente,
    telefonoCliente,
    emailCliente
  } = req.body;

  try {
    const orden = await OrdenDeCompra.findByPk(id);
    if (!orden) {
      return res.status(404).json({ message: 'Orden de compra no encontrada' });
    }

    Object.assign(orden, {
      idCliente: idCliente ?? orden.idCliente,
      idDespachador: idDespachador ?? orden.idDespachador,
      total: total ?? orden.total,
      estadoEnvio: estadoEnvio ?? orden.estadoEnvio,
      idTransaccionMP: idTransaccionMP ?? orden.idTransaccionMP,
      codigoSeguimientoAndreani: codigoSeguimientoAndreani ?? orden.codigoSeguimientoAndreani,
      direccionEnvio: direccionEnvio ?? orden.direccionEnvio,
      nombreCliente: nombreCliente ?? orden.nombreCliente,
      telefonoCliente: telefonoCliente ?? orden.telefonoCliente,
      emailCliente: emailCliente ?? orden.emailCliente
    });

    await orden.save();
    res.json(orden);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la orden de compra' });
  }
};

// Eliminar una orden de compra (también elimina sus items)
export const deleteOrdenDeCompra = async (req, res) => {
  const { id } = req.params;
  const t = await OrdenDeCompra.sequelize.transaction();
  try {
    const orden = await OrdenDeCompra.findByPk(id);
    if (!orden) {
      return res.status(404).json({ message: 'Orden de compra no encontrada' });
    }

    await ItemOrdenDeCompra.destroy({ where: { idOrdenDeCompra: id } , transaction: t});
    await orden.destroy({ transaction: t });
    await t.commit();
    res.json({ message: 'Orden de compra eliminada' });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la orden de compra' });
  }
};
