export async function authDB(sequelize) {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');
}

export async function syncDB(sequelize) {
    await sequelize.sync({ force: true }); //true solo en desarrollo
    console.log('✅ Base de datos sincronizada');

    // Sincroniza los modelos con la base de datos.
    // force: false (default) - No borra tablas si existen.
    // force: true - Borra y recrea tablas. ¡PELIGROSO en producción!
    // alter: true - Intenta modificar tablas existentes.
}



