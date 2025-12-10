import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadCloudinary = async (localPath, folder = 'profile') => {
    try {
        if (!localPath) return null

        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: 'auto',
            folder: `ecommerce/${folder}`
        })

        return response.secure_url

    } catch (error) {
        console.log(error)
        if (fs.existsSync(localPath)) {
            fs.unlinkSync(localPath)
        }
        return null
    }
}