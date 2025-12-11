import joi from 'joi';

export const ProductValidation = joi.object({
    productName: joi.string()
        .trim()
        .required()
        .messages({
            "string.base": "Product name must be a string",
            "string.empty": "Product name is required",
            "any.required": "Product name is required"
        }),

    productDescription: joi.string()
        .trim()
        .required()
        .messages({
            "string.base": "Product description must be a string",
            "string.empty": "Product description is required",
            "any.required": "Product description is required"
        }),

    price: joi.number()
        .positive()
        .required()
        .messages({
            "number.base": "Price must be a number",
            "number.positive": "Price must be greater than zero",
            "any.required": "Price is required"
        }),

    category: joi.string()
        .trim()
        .required()
        .messages({
            "string.base": "Category must be a string",
            "string.empty": "Category is required",
            "any.required": "Category is required"
        }),

    stock: joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            "number.base": "Stock must be a number",
            "number.integer": "Stock must be an integer",
            "number.min": "Stock cannot be negative",
            "any.required": "Stock is required"
        }),

    brand: joi.string()
        .trim()
        .optional()
        .messages({
            "string.base": "Brand must be a string"
        }),

    ratings: joi.number()
        .min(0)
        .max(5)
        .optional()
        .messages({
            "number.base": "Ratings must be a number",
            "number.min": "Ratings cannot be less than 0",
            "number.max": "Ratings cannot be more than 5"
        }),

    numReviews: joi.number()
        .integer()
        .min(0)
        .optional()
        .messages({
            "number.base": "Number of reviews must be a number",
            "number.integer": "Number of reviews must be an integer",
            "number.min": "Number of reviews cannot be negative"
        }),

    productImages: joi.array()
        .items(joi.string().uri().messages({
            "string.uri": "Each product image must be a valid URL"
        }))
        .optional()
        .messages({
            "array.base": "Product images must be an array of URLs"
        })
});
