import express from 'express'
import { getProfileByIdController, loginController, registerController } from '../controller/auth.controller.js'
import upload from '../middleware/multer.middleware.js'
import { isAuthorize, isAuthorizeRole } from '../middleware/Auth.middleware.js'

const authRouter = express.Router()

authRouter.post('/', upload.single('profileImage'), registerController)
authRouter.post('/login', loginController)
authRouter.get('/profile/:id', isAuthorize, getProfileByIdController)

export default authRouter