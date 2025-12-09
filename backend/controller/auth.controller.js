import User from "../model/auth.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import SuccessHandler from "../utils/successHandler.js";

export const registerController = async (req, res, next) => {
    try {
        const { fullName, email, password, role } = req.body;

        if (!fullName || !email || !password) {
            return new ErrorHandler("All fields are required", 400).send(res);
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new ErrorHandler("Email already registered", 400).send(res);
        }

        const newUser = await User.create({
            fullName,
            email,
            password,
            role: role || "user",
        });

        newUser.password = undefined;

        return new SuccessHandler(newUser, "User registered successfully", 201).send(res);

    } catch (error) {
        next(error);
    }
};


export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return new ErrorHandler("All fields are required", 400).send(res);
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return new ErrorHandler("Invalid email or password", 400).send(res);
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return new ErrorHandler("Invalid email or password", 400).send(res);
        }

        user.password = undefined;

        return new SuccessHandler(user, "Login successful").send(res);
    } catch (error) {
        next(error);
    }
};