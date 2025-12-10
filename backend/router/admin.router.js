import express from 'express'
import { getAllUserController } from '../controller/admin.controller.js'
import { isAuthorize, isAuthorizeRole } from '../middleware/Auth.middleware.js'

const adminRouter = express.Router()
adminRouter.get('/allUser', isAuthorize, isAuthorizeRole('admin'), getAllUserController)

export default adminRouter