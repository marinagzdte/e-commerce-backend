import { Router } from 'express';
import Container from '../lib/Container.js';
import Product from '../lib/Product.js';
import validateAdmin from '../utils/validateAdmin.js';

const productRouter = Router();
const productContainer = new Container('../products.txt');

productRouter.get('/:id?', async (req, res) => {
    if (req.params.id === undefined) {
        res.json(await productContainer.getAll());
    } else {
        const id = Number(req.params.id);
        const product = await productContainer.getById(id)
        if (product === undefined) {
            res.status(404)
            res.json({ error: -3, descripcion: 'producto no encontrado' })
        }
        else
            res.json(product)
    }
});

productRouter.post('/', validateAdmin, async (req, res) => {
    const { name, description, code, thumbnail, price, stock } = req.body;
    const product = new Product(name, description, code, thumbnail, price, stock);
    res.json({ id: await productContainer.save(product) });
});

productRouter.put('/:id', validateAdmin, async (req, res) => {
    const id = Number(req.params.id)
    const newData = req.body
    const modifiedProduct = await productContainer.modifyItemById(id, newData)
    if (modifiedProduct === undefined) {
        res.status(404)
        res.json({ error: -3, descripcion: 'producto no encontrado' })
    } else {
        res.json(modifiedProduct);
    }
});

productRouter.delete('/:id', validateAdmin, async (req, res) => {
    const id = Number(req.params.id);
    const deletedProduct = await productContainer.deleteById(id);
    if (deletedProduct === undefined) {
        res.status(404)
        res.json({ error: -3, descripcion: 'producto no encontrado' })
    } else {
        res.json(deletedProduct);
    }
});

export default productRouter;