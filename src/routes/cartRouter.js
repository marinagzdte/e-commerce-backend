import { Router } from 'express';
import { postCart, postProduct, getCartsProducts, deleteCart, deleteProduct, deleteAllProducts } from '../controllers/cartController.js';
import logger from '../utils/logger.js';

const cartRouter = Router();

cartRouter.post('/', logger.logReqInfo, postCart);

cartRouter.delete('/:id', logger.logReqInfo, deleteCart);

cartRouter.get('/:id/productos', logger.logReqInfo, getCartsProducts);

cartRouter.post('/:id/productos', logger.logReqInfo, postProduct);

cartRouter.delete('/:id/productos/:id_prod', logger.logReqInfo, deleteProduct);

cartRouter.delete('/:id/productos', logger.logReqInfo, deleteAllProducts);

export default cartRouter;