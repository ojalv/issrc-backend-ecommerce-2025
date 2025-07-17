import { Router } from 'express';
import {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  getImagenesProducto,
  createImagenProducto
} from '../controllers/productoController.js';

const productoRoutes = Router();

productoRoutes.get('/', getProductos);
productoRoutes.get('/:id', getProductoById);
productoRoutes.post('/', createProducto);
productoRoutes.put('/:id', updateProducto);
productoRoutes.delete('/:id', deleteProducto);

// imagenes

/*
GET /api/productos/:productoId/imagenes: Devuelve todas las URLs de las imágenes de un producto.
POST /api/productos/:productoId/imagenes: Guarda una nueva URL de imagen para el producto. Recibe urlImagen en el body.
*/
productoRoutes.get('/:id/imagenes', getImagenesProducto);
productoRoutes.post('/:id/imagenes', createImagenProducto);


export default productoRoutes;
