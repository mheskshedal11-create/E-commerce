import express from 'express'
import { categoryController } from "../controller/category.controller.js";

const categoryRouter = express.Router()

categoryRouter.post('/', categoryController)

export default categoryRouter

