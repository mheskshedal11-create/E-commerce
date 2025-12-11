import express from 'express'
import { getAllProductController, getProductByIdController, productController } from "../controller/product.controller.js";
import upload from '../middleware/multer.middleware.js';

const productRouter = express.Router()

productRouter.post('/', upload.array('productImages', 10), productController)
productRouter.get('/getall', getAllProductController)
productRouter.get('/:id', getProductByIdController)

export default productRouter