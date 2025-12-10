import express from 'express'
import { deleteProfileController } from '../controller/user.controller.js'

const userRouter = express.Router()

userRouter.delete('/delete/:id', deleteProfileController)

export default userRouter