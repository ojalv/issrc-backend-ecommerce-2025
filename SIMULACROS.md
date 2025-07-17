Galería de Imágenes del Producto
Concepto: Permitir que cada producto tenga múltiples imágenes en lugar de una sola.

Backend:
Modelo ImagenProducto: id, urlImagen (TEXT), productoId (INTEGER).
Rutas:
GET /api/productos/:productoId/imagenes: Devuelve todas las URLs de las imágenes de un producto.
POST /api/productos/:productoId/imagenes: Guarda una nueva URL de imagen para el producto. Recibe urlImagen en el body.

Frontend:
En la página de detalle, mostrar una imagen principal y debajo una serie de miniaturas (thumbnails).
Al hacer clic en una miniatura, esta se convierte en la imagen principal mostrada.
Añadir un formulario simple con un campo de texto para pegar una URL de imagen y un botón para "Agregar Imagen".