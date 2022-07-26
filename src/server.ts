import express, { Router } from 'express';
import Cart from './lib/Cart';
import Container from './lib/Container';
import Product from './lib/Product';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// si algo da error aca, probar router.use(express.json()) etc

const productRouter = Router()
app.use('/api/productos', productRouter)
const productContainer = new Container('./products.txt');

productRouter.get('/:id?', async (req, res) => {
    if (req.params.id === undefined) {
        res.json(await productContainer.getAll());
    } else {
        const id = Number(req.params.id);
        const product = await productContainer.getById(id)
        if (product === null) {
            res.status(404)
            res.json({ error: 'producto no encontrado' })
        }
        else
            res.json(product)
    }
});

productRouter.post('/', (req, res, next) => { /* validar admin */ next(); }, async (req, res) => {
    const { name, description, code, thumbnail, price, stock } = req.body;
    const product: Product = new Product(name, description, code, thumbnail, price, stock);
    res.json(await productContainer.save(product));
});

productRouter.put('/:id', (req, res, next) => { /* validar admin */ next(); }, async (req, res) => {
    const id = Number(req.params.id)
    const newData = req.body
    const product: Product = await productContainer.modifyItemById(id, newData)

    if (product === null) {
        res.status(404)
        res.json({ error: 'producto no encontrado' })
    }
    else
        res.json(product)
});

productRouter.delete('/:id', (req, res, next) => { /* validar admin */ next(); }, async (req, res) => {
    const id = Number(req.params.id)
    const product = await productContainer.deleteById(id)

    if (product === null) {
        res.status(404)
        res.json({ error: 'producto no encontrado' })
    }
    else
        res.json(product)
});

const cartRouter = Router()
app.use('/api/carrito', cartRouter)
const cartContainer = new Container('./carts.txt');

cartRouter.post('/', async (req, res) => {
    const cart: Cart = new Cart();
    res.json(await cartContainer.save(cart));
});

cartRouter.delete('/:id', async (req, res) => {
    const id: number = Number(req.params.id);
    const cart: Cart = await cartContainer.deleteById(id)

    if (cart === null) {
        res.status(404)
        res.json({ error: 'producto no encontrado' })
    }
    else
        res.json(cart)
})

cartRouter.get('/:id/productos', async (req, res) => {
    const id: number = Number(req.params.id);
    const cart: Cart = await cartContainer.getById(id);
    if (cart === null) {
        res.status(404)
        res.json({ error: 'carrito no encontrado' })
    }
    else
        res.json(cart.products)
});

cartRouter.post('/:id/productos', async (req, res) => {
    const id: number = Number(req.params.id);
    const cart: Cart = await cartContainer.getById(id);
    console.log(cart);
    if (cart === null) {
        res.status(404)
        res.json({ error: 'carrito no encontrado' })
    }

    const product: Product = req.body;
    cart.addToCart(product);
    res.json(cart.products);
});

cartRouter.delete('/:id/productos/:id_prod', async (req, res) => {
    const id: number = Number(req.params.id);
    const cart: Cart = await cartContainer.getById(id);
    if (cart === null) {
        res.status(404)
        res.json({ error: 'carrito no encontrado' })
    }

    const productId = Number(req.params.id_prod);
    const removedProduct = cart.removeFromCart(productId);

    if (removedProduct === null) {
        res.status(404)
        res.json({ error: 'carrito no encontrado' })
    }
    else
        res.json(removedProduct)
});

const PORT: number = Number(process.env.PORT) || 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}.`);
})

server.on('error', error => console.log(`Error en servidor ${error}`))