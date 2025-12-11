import ErrorHandler from "../utils/errorHandler.js";
import User from "../model/auth.model.js";
import jwt from 'jsonwebtoken'

export const isAuthorize = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return next(new ErrorHandler('Unauthorized access, please login', 401));
        }

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await User.findById(decoded.id);

        if (!user) {
            return next(new ErrorHandler('User not found', 404));
        }

        req.user = {
            _id: user._id,  // Changed from id to _id for consistency
            role: user.role,
            name: user.name,
            email: user.email
        };

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return next(new ErrorHandler('Invalid token', 401));
        }
        if (error.name === 'TokenExpiredError') {
            return next(new ErrorHandler('Token expired, please login again', 401));
        }
        return next(new ErrorHandler('Authentication failed', 401));
    }
};

export const isAuthorizeRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new ErrorHandler('User not authenticated', 401));
        }

        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler('You do not have permission to access this resource', 403));
        }

        next();
    }
}