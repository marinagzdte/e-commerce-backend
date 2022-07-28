import app from './server.js';

const PORT = Number(process.env.PORT) || 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}.`);
})

server.on('error', error => console.log(`Error en servidor ${error}`))