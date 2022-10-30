import app from './server.js';
import logger from './utils/logger.js';
import mongoose from 'mongoose';
import config from './config.js';

const PORT = Number(process.env.PORT) || 8080;
const server = app.listen(PORT, async () => {
    logger.logInfo(`Servidor escuchando en puerto ${PORT}.`);
    try {
        await mongoose.connect(config.mongodb.connectionString, config.mongodb.options)
        logger.logInfo('conectado a la db')
    } catch (error) {
        logger.logError(error)
    }
})

server.on('error', error => logger.logError(error))