import User from "../model/auth.model.js"
import ErrorHandler from "../utils/errorHandler.js"
import SuccessHandler from '../utils/successHandler.js'

export const getAllUserController = async (req, res, next) => {
    try {
        const allUser = await User.find({ role: { $ne: 'admin' } });
        if (allUser.length <= 0) {
            return new ErrorHandler('User not found', 400).send(res);
        }

        return new SuccessHandler(
            200,
            'User profiles retrieved successfully',
            allUser
        ).send(res);

    } catch (error) {
        return new ErrorHandler(error.message || "Something went wrong", 500).send(res);
    }
};