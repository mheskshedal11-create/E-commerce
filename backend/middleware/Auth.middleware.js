import ErrorHandler from "../utils/errorHandler.js";
import User from "../model/auth.model.js";
import jwt from 'jsonwebtoken'
export const isAuthorize = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return new ErrorHandler('Unauthorize access please login.......!', 401).send(res);
        }

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await User.findById(decoded.id);
        if (!user) {
            return new ErrorHandler('User not found', 404).send(res);
        }

        req.user = {
            id: user._id.toString(),
            role: user.role
        };
        next();
    } catch (error) {
        return new ErrorHandler('Invalid token', 401).send(res);
    }
};

export const isAuthorizeRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return new ErrorHandler('Unauthorized role!', 401).send(res);
        }
        next();
    }
}
