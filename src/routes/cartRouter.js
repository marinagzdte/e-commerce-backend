import { Router } from 'express';
import { cartsDao as cartsApi } from '../daos/index.js'

const cartRouter = Router();

cartRouter.post('/', async (req, res) => {
    res.json({ id: await cartsApi.save(req.body) });
});

cartRouter.delete('/:id', async (req, res) => {
    const deletedCart = await cartsApi.deleteById(req.params.id)
    if (deletedCart === undefined || cart[0] === null) {
        res.status(404)
        res.json({ error: -4, descripcion: 'carrito no encontrado' })
    } else {
        res.json(deletedCart);
    }
})

cartRouter.get('/:id/productos', async (req, res) => {
    const cart = await cartsApi.getById(req.params.id);
    if (cart === undefined || cart === null) {
        res.status(404)
        res.json({ error: -4, descripcion: 'carrito no encontrado' })
    }
    else
        res.json(cart[0].products)
});

cartRouter.post('/:id/productos', async (req, res) => {
    const cart = await cartsApi.getById(req.params.id);
    if (cart === undefined || cart === null) {
        res.status(404)
        res.json({ error: -4, descripcion: 'carrito no encontrado' })
    }

    const desiredProduct = req.body;
    cart[0].products.push(desiredProduct);
    cartsApi.modifyItemById(cart[0]);
    res.json(cart.products);
});

cartRouter.delete('/:id/productos/:id_prod', async (req, res) => {
    const cart = await cartsApi.getById(req.params.id);
    if (cart === undefined || cart === null) {
        res.status(404)
        res.json({ error: -4, descripcion: 'carrito no encontrado' });
    }

    const index = cart[0].products.findIndex(prod => prod._id === req.params.id_prod)
    if (index === -1) {
        res.status(404)
        res.json({ error: -5, descripcion: 'el carrito no contiene ese producto' });
    } else {
        const deletedProduct = cart[0].products.splice(index, 1);
        await cartsApi.modifyItemById(cart[0]);
        res.json(deletedProduct);
    }
});

export default cartRouter;