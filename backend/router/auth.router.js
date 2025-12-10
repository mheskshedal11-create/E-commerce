import express from 'express'
import { loginController, registerController } from '../controller/auth.controller.js'
import upload from '../middleware/multer.middleware.js'

const authRouter = express.Router()

authRouter.post('/', upload.single('profileImage'), registerController)
authRouter.post('/login', loginController)

export default authRouter