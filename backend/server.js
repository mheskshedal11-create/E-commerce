import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import dbConnection from './database/db.js'
import errorMiddleware from './middleware/errorMIddleware.js'
import authRouter from './router/auth.router.js'


const app = express()

dbConnection()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 8000

//Global Error handling 
app.use(errorMiddleware)


//router
app.use('/api/v1/auth', authRouter)

app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}`)
})