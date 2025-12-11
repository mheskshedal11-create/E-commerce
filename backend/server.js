import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import dbConnection from './database/db.js'
import authRouter from './router/auth.router.js'
import { globalErrorHandler } from './middleware/errorMIddleware.js'
import adminRouter from './router/admin.router.js'
import userRouter from './router/user.router.js'
import categoryRouter from './router/category.controller.js'
import productRouer from './router/product.router.js'
import orderRouter from './router/order.router.js'


const app = express()

dbConnection()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())

const PORT = process.env.PORT || 8000

//Global Error handling 
app.use(globalErrorHandler)


//router
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/product', productRouer)
app.use('/api/v1/order', orderRouter)

app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}`)
})