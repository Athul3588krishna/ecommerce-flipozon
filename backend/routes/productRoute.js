import express from 'express';
import {listProduct,addProduct,removeProduct,singleProduct} from '../controllers/productController.js';
import multer from '../middleware/multer.js';

const productRouter = express.Router();

productRouter.post('/add',upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1}]), addProduct);
productRouter.get('/list', listProduct);
productRouter.post('/remove/:id', removeProduct);
productRouter.post('/single/:id', singleProduct);

export default productRouter;