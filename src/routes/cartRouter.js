import { Router } from 'express';
import { cartsDao as cartsApi } from '../daos/index.js'

const cartRouter = Router();

cartRouter.post('/', async (req, res) => {
    try {
        const _id = await cartsApi.save(req.body);
        res.json({ _id: _id });
    } catch (error) {
        console.log(error);

        res.status(500);
        res.json({ error: -100, descripcion: 'error al guardar' });
    }
});

cartRouter.delete('/:id', async (req, res) => {
    try {
        await cartsApi.deleteById(req.params.id);
        res.status(204);
        res.send();
    } catch (error) {
        console.log(error);

        if (error.message.includes('404'))
            res.status(404);
        else
            res.status(500);

        res.json({ error: -4, descripcion: 'carrito no encontrado' });
    }
});

cartRouter.get('/:id/productos', async (req, res) => {
    try {
        const cart = await cartsApi.getById(req.params.id);
        res.json(cart.products);
    } catch (error) {
        console.log(error);

        if (error.message.includes('404'))
            res.status(404);
        else
            res.status(500);

        res.json({ error: -4, descripcion: 'carrito no encontrado' })
    }
});

cartRouter.post('/:id/productos', async (req, res) => {
    try {
        const cart = await cartsApi.getById(req.params.id);
        cart.products.push(req.body);
        cartsApi.modifyItemById(req.params.id, cart);
        res.json(cart.products);
    } catch (error) {
        console.log(error);

        res.status(500);
        res.json({ error: -4, descripcion: 'no se pudo agregar el producto al carrito' })
    }
});

cartRouter.delete('/:id/productos/:id_prod', async (req, res) => {
    try {
        const cart = await cartsApi.getById(req.params.id);

        const index = cart.products.findIndex(prod => prod.id === req.params.id_prod || prod._id === req.params.id_prod)
        if (index === -1) {
            res.status(404)
            res.json({ error: -5, descripcion: 'el carrito no contiene ese producto' });
        } else {
            cart.products.splice(index, 1);
            await cartsApi.modifyItemById(req.params.id, cart);
            res.status(204);
            res.send();
        }

    } catch (error) {
        console.log(error);

        if (error.message.includes('404')) {
            res.status(404);
            res.json({ error: -4, descripcion: 'carrito no encontrado' });
        }
        else {
            res.status(500);
            res.json({ error: -4, descripcion: 'no se pudo eliminar el producto del carrito' })
        }
    }
});

export default cartRouter;