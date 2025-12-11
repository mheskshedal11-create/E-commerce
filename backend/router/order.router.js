import express from 'express'
import { orderController } from '../controller/order.controller.js'
import { isAuthorize } from '../middleware/Auth.middleware.js'
const orderRouter = express.Router()
orderRouter.post('/', isAuthorize, orderController)
export default orderRouter