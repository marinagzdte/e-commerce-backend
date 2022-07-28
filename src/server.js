import express from 'express';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productRouter)
app.use('/api/carrito', cartRouter)

app.all('*', (req, res) => {
    res.status(405).json({ error: -2, descripcion: `ruta ${req.url} metodo ${req.method} no implementado` })
});

export default app;