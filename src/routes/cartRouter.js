import { Router } from 'express';
import Container from '../lib/Container.js';
import Cart from '../lib/Cart.js';

const cartRouter = Router();
const cartContainer = new Container('../carts.txt');

cartRouter.post('/', async (req, res) => {
    const cart = new Cart();
    res.json({ id: await cartContainer.save(cart) });
});

cartRouter.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const deletedCart = await cartContainer.deleteById(id)
    if (deletedCart === undefined || cart === null) {
        res.status(404)
        res.json({ error: -4, descripcion: 'carrito no encontrado' })
    } else {
        res.json(deletedCart);
    }
})

cartRouter.get('/:id/productos', async (req, res) => {
    const id = Number(req.params.id);
    const cart = await cartContainer.getById(id);
    if (cart === undefined || cart === null) {
        res.status(404)
        res.json({ error: -4, descripcion: 'carrito no encontrado' })
    }
    else
        res.json(cart.products)
});

cartRouter.post('/:id/productos', async (req, res) => {
    const id = Number(req.params.id);
    const cart = await cartContainer.getById(id);
    if (cart === undefined || cart === null) {
        res.status(404)
        res.json({ error: -4, descripcion: 'carrito no encontrado' })
    }

    const desiredProduct = req.body;
    cart.products.push(desiredProduct);
    cartContainer.modifyItemById(cart.id, cart);
    res.json(cart.products);
});

cartRouter.delete('/:id/productos/:id_prod', async (req, res) => {
    const id = Number(req.params.id);
    const cart = await cartContainer.getById(id);
    if (cart === undefined || cart === null) {
        res.status(404)
        res.json({ error: -4, descripcion: 'carrito no encontrado' });
    }

    const productId = Number(req.params.id_prod);
    const index = cart.products.findIndex(prod => prod.id === productId)
    if (index === -1) {
        res.status(404)
        res.json({ error: -5, descripcion: 'el carrito no contiene ese producto' });
    } else {
        const deletedProduct = cart.products.splice(index, 1);
        await cartContainer.modifyItemById(cart.id, cart);
        res.json(deletedProduct);
    }
});

export default cartRouter;