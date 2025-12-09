import mongoose from "mongoose";

const dbConnection = async (req, res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log('db connect successfully')
    } catch (error) {
        console.log(error)

    }
}

export default dbConnection