import { Router } from 'express';
import validateAdmin from '../utils/validateAdmin.js';
import { productsDao as productsApi } from '../daos/index.js'
import logger from '../utils/logger.js';

const productRouter = Router();

productRouter.get('/:id?', logger.logReqInfo, async (req, res) => {
    if (req.params.id === undefined) {
        try {
            const products = await productsApi.getAll();
            res.json(products);
        } catch (error) {
            logger.logError(error)

            res.status(500);
            res.json({ error: -1, descripcion: 'error al listar los productos' });
        }
    } else {
        try {
            const product = await productsApi.getById(req.params.id);
            res.json(product);
        } catch (error) {
            logger.logError(error);

            if (error.message.includes('404'))
                res.status(404);
            else
                res.status(500);
            res.json({ error: -2, descripcion: 'producto no encontrado' });
        }
    }
});

productRouter.post('/', logger.logReqInfo, validateAdmin, async (req, res) => {
    try {
        const _id = await productsApi.save(req.body);
        res.json({ _id: _id });
    } catch (error) {
        logger.logError(error);

        res.status(500);
        res.json({ error: -3, descripcion: 'error al guardar producto' });
    }
});

productRouter.put('/:id', logger.logReqInfo, validateAdmin, async (req, res) => {
    try {
        await productsApi.modifyItemById(req.params.id, req.body);
        res.status(204);
        res.send();
    } catch (error) {
        logger.logError(error);

        if (error.message.includes('404'))
            res.status(404);
        else
            res.status(500);

        res.json({ error: -4, descripcion: 'error al actualizar producto' });
    }
});

productRouter.delete('/:id', logger.logReqInfo, validateAdmin, async (req, res) => {
    try {
        await productsApi.deleteById(req.params.id);
        res.status(204);
        res.send();
    } catch (error) {
        logger.logError(error);

        if (error.message.includes('404'))
            res.status(404);
        else
            res.status(500);

        res.json({ error: -5, descripcion: 'error al borrar producto' });
    }
});

export default productRouter;