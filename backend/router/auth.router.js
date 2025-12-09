import express from 'express'
import { loginController, registerController } from '../controller/auth.controller.js'

const authRouter = express.Router()

authRouter.post('/', registerController)
authRouter.post('/login', loginController)

export default authRouter