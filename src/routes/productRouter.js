import { Router } from 'express';
import validateAdmin from '../utils/validateAdmin.js';
import { productsDao as productsApi } from '../daos/index.js'

const productRouter = Router();

productRouter.get('/:id?', async (req, res) => {
    if (req.params.id === undefined) {
        try {
            const products = await productsApi.getAll();
            res.json(products);
        } catch (error) {
            console.log(error)

            res.status(500);
            res.json({ error: -99, descripcion: 'error al listar los productos' });
        }
    } else {
        try {
            const product = await productsApi.getById(req.params.id);
            res.json(product);
        } catch (error) {
            console.log(error);

            if (error.message.includes('404'))
                res.status(404);
            else
                res.status(500);
            res.json({ error: -3, descripcion: 'producto no encontrado' });
        }
    }
});

productRouter.post('/', validateAdmin, async (req, res) => {
    try {
        const _id = await productsApi.save(req.body);
        res.json({ _id: _id });
    } catch (error) {
        console.log(error);

        res.status(500);
        res.json({ error: -100, descripcion: 'error al guardar' });
    }
});

productRouter.put('/:id', validateAdmin, async (req, res) => {
    try {
        await productsApi.modifyItemById(req.body);
        res.status(204);
        res.send();
    } catch (error) {
        console.log(error);

        if (error.message.includes('404'))
            res.status(404);
        else
            res.status(500);

        res.json({ error: -100, descripcion: 'error al guardar' });
    }
});

productRouter.delete('/:id', validateAdmin, async (req, res) => {
    try {
        await productsApi.deleteById(req.params.id);
        res.status(204);
        res.send();
    } catch (error) {
        console.log(error);

        if (error.message.includes('404'))
            res.status(404);
        else
            res.status(500);

        res.json({ error: -3, descripcion: 'error al borrar' });
    }
});

export default productRouter;