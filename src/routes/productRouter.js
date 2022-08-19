import { Router } from 'express';
import validateAdmin from '../utils/validateAdmin.js';
import { productsDao as productsApi } from '../daos/index.js'

const productRouter = Router();

productRouter.get('/:id?', async (req, res) => {
    if (req.params.id === undefined) {
        res.json(await productsApi.getAll());
    } else {
        const product = await productsApi.getById(req.params.id)
        if (product === undefined) {
            res.status(404)
            res.json({ error: -3, descripcion: 'producto no encontrado' })
        }
        else
            res.json(product)
    }
});

productRouter.post('/', validateAdmin, async (req, res) => {
    res.json({ id: await productsApi.save(req.body) });
});

productRouter.put('/:id', validateAdmin, async (req, res) => {
    const modifiedProduct = await productsApi.modifyItemById(req.body)
    if (modifiedProduct === undefined) {
        res.status(404)
        res.json({ error: -3, descripcion: 'producto no encontrado' })
    } else {
        res.json(modifiedProduct);
    }
});

productRouter.delete('/:id', validateAdmin, async (req, res) => {
    const deletedProduct = await productsApi.deleteById(req.params.id);
    if (deletedProduct === undefined) {
        res.status(404)
        res.json({ error: -3, descripcion: 'producto no encontrado' })
    } else {
        res.json(deletedProduct);
    }
});

export default productRouter;