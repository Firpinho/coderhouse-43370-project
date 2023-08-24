const mongoose = require('mongoose');
require('dotenv/config')

const connection_string = process.env.MONGO_ATLAS

try {
    mongoose.connect(connection_string).then(() => console.log('[SERVER] Database connected.')).catch(() => console.log('[SERVER][ERR] Error al conectar con la base de datos.'))
} catch (error) {
    console.log(error.message);
}