import { Router } from 'express';
import validateAdmin from '../utils/validateAdmin.js';
import { getProduct, postProduct, putProduct, deleteProduct } from '../controllers/productsController.js'
import logger from '../utils/logger.js';

const productRouter = Router();

productRouter.get('/:id?', logger.logReqInfo, getProduct);

productRouter.post('/', logger.logReqInfo, validateAdmin, postProduct);

productRouter.put('/:id', logger.logReqInfo, validateAdmin, putProduct);

productRouter.delete('/:id', logger.logReqInfo, validateAdmin, deleteProduct);

export default productRouter;