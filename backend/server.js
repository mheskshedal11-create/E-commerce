import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import dbConnection from './database/db.js'
import errorMiddleware from './middleware/errorMIddleware.js'


const app = express()

dbConnection()

const PORT = process.env.PORT || 8000

//Global Error handling 
app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}`)
})