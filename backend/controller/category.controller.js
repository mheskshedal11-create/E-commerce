import Category from "../model/category.model.js";
import ErrorHandler from '../utils/errorHandler.js'
import SuccessHandler from '../utils/successHandler.js'

export const categoryController = async (req, res, next) => {
    try {
        const { categoryName } = req.body;

        if (!categoryName || categoryName.trim() === '') {
            return next(new ErrorHandler('Category name is required', 400));
        }

        const existingCategory = await Category.findOne({ categoryName });
        if (existingCategory) {
            return next(new ErrorHandler('Category already exists', 400));
        }

        const newCategory = new Category({ categoryName });
        await newCategory.save();

        new SuccessHandler(201, newCategory, 'Category created successfully!').send(res);
    } catch (error) {
        next(error);
    }
};
