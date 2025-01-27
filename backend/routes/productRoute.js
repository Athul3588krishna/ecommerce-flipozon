import express from 'express';
import multer from '../middleware/multer.js';
import { listProducts,addProduct,removeProduct,singleProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js'; //process the multiple form data
const productRouter = express.Router();


productRouter.post('/add',upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct);
productRouter.post('/remove',removeProduct);
productRouter.post('/single',singleProduct);
productRouter.get('/list',listProducts);




export default productRouter;