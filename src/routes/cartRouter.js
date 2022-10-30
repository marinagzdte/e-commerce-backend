import { Router } from 'express';
import { cartsDao as cartsApi } from '../daos/index.js'
import logger from '../utils/logger.js';

const cartRouter = Router();

cartRouter.post('/', logger.logReqInfo, async (req, res) => {
    try {
        const _id = await cartsApi.save(req.body);
        res.json({ _id: _id });
    } catch (error) {
        logger.logError(error);

        res.status(500);
        res.json({ error: -6, descripcion: 'error al guardar carrito' });
    }
});

cartRouter.delete('/:id', logger.logReqInfo, async (req, res) => {
    try {
        await cartsApi.deleteById(req.params.id);
        res.status(204);
        res.send();
    } catch (error) {
        logger.logError(error);

        if (error.message.includes('404'))
            res.status(404);
        else
            res.status(500);

        res.json({ error: -7, descripcion: 'carrito no encontrado' });
    }
});

cartRouter.get('/:id/productos', logger.logReqInfo, async (req, res) => {
    try {
        const cart = await cartsApi.getById(req.params.id);
        res.json(cart.products);
    } catch (error) {
        logger.logError(error);

        if (error.message.includes('404'))
            res.status(404);
        else
            res.status(500);

        res.json({ error: -7, descripcion: 'carrito no encontrado' })
    }
});

cartRouter.post('/:id/productos', logger.logReqInfo, async (req, res) => {
    try {
        const cart = await cartsApi.getById(req.params.id);
        cart.products.push(req.body);
        cartsApi.modifyItemById(req.params.id, cart);
        res.json(cart.products);
    } catch (error) {
        logger.logError(error);

        res.status(500);
        res.json({ error: -8, descripcion: 'no se pudo agregar el producto al carrito' })
    }
});

cartRouter.delete('/:id/productos/:id_prod', logger.logReqInfo, async (req, res) => {
    try {
        const cart = await cartsApi.getById(req.params.id);

        const index = cart.products.findIndex(prod => prod.id === req.params.id_prod || prod._id === req.params.id_prod)
        if (index === -1) {
            res.status(404)
            res.json({ error: -9, descripcion: 'el carrito no contiene ese producto' });
        } else {
            cart.products.splice(index, 1);
            await cartsApi.modifyItemById(req.params.id, cart);
            res.status(204);
            res.send();
        }

    } catch (error) {
        logger.logError(error);

        if (error.message.includes('404')) {
            res.status(404);
            res.json({ error: -7, descripcion: 'carrito no encontrado' });
        }
        else {
            res.status(500);
            res.json({ error: -10, descripcion: 'no se pudo eliminar el producto del carrito' })
        }
    }
});

export default cartRouter;