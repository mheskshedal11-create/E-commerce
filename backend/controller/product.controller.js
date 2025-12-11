import Product from "../model/product.model.js";
import ErrorHandler from '../utils/errorHandler.js';
import SuccessHandler from '../utils/successHandler.js';
import { ProductValidation } from "../utils/product.validation.js";
import fs from "fs";
import { uploadCloudinary } from "../utils/cloudinary.js";

export const productController = async (req, res, next) => {
    try {
        const { error, value } = ProductValidation.validate(req.body, { abortEarly: false });

        // Validation fails → delete all uploaded temp files
        if (error) {
            if (req.files) {
                req.files.forEach(file => fs.unlinkSync(file.path));
            }
            return next(new ErrorHandler(error.details.map(d => d.message).join(", "), 400)).send(res);
        }

        const { productName, productDescription, price, category, stock, brand, ratings, numReviews } = value;

        if (!req.files || req.files.length === 0) {
            return next(new ErrorHandler("At least 1 image is required", 400)).send(res);
        }

        if (req.files.length > 10) {
            return next(new ErrorHandler("Maximum 10 images allowed", 400)).send(res);
        }

        // Upload all images to Cloudinary
        let uploadedImages = [];
        for (const file of req.files) {
            const imageUrl = await uploadCloudinary(file.path);
            uploadedImages.push(imageUrl);
            fs.unlinkSync(file.path); // remove local file
        }

        const isAvailable = stock > 0;

        const newProduct = new Product({
            productName,
            productDescription,
            price,
            category,
            productImages: uploadedImages,  // array of image URLs
            stock,
            isAvailable,
            brand,
            ratings,
            numReviews
        });

        await newProduct.save();
        await newProduct.populate("category", "categoryName -_id");

        return res.status(201).json(new SuccessHandler("Product created successfully!", newProduct));

    } catch (error) {
        next(error);
    }
};

export const getProductByIdController = async (req, res, next) => {
    try {
        const id = req.params.id
        const getproduct = await Product.findById(id)
        if (!getproduct) {
            return next(new ErrorHandler('Product Not Found............!', 400))
        }
        return res
            .status(200)
            .json(new SuccessHandler('Product fetch successfully', getproduct))
    } catch (error) {
        next(error)
    }
}

export const getAllProductController = async (req, res, next) => {
    try {
        const getAllProduct = await Product.find({})

        if (getAllProduct.length === 0) {
            return next(new ErrorHandler('There is no product available', 400))
        }

        return res
            .status(200)
            .json(new SuccessHandler('Products Fetch successfully', getAllProduct))
    } catch (error) {
        next(error)
    }
}