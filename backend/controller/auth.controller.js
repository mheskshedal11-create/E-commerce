
import { Sign } from "crypto";
import User from "../model/auth.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";
import SuccessHandler from "../utils/successHandler.js";
import fs from 'fs';
import jwt from 'jsonwebtoken'

export const registerController = async (req, res, next) => {
    try {
        const { fullName, email, password, role } = req.body;

        if (!fullName || !email || !password) {
            if (req.file) fs.unlinkSync(req.file.path);
            return new ErrorHandler("All fields are required", 400).send(res);
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (req.file) fs.unlinkSync(req.file.path);
            return new ErrorHandler("Email already registered", 400).send(res);
        }

        let imageUrl = null;
        if (req.file) {
            imageUrl = await uploadCloudinary(req.file.path, 'profile');
            fs.unlinkSync(req.file.path);
        }

        const newUser = await User.create({
            fullName,
            email,
            password,
            role: role || "user",
            profileImage: imageUrl
        });

        newUser.password = undefined;

        return new SuccessHandler(newUser, "User registered successfully", 201).send(res);

    } catch (error) {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
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

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_TOKEN,
            { expiresIn: "2d" }
        );

        res.cookie('token', token, {
            httpOnly: true,
            SignIn: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 2 * 24 * 60 * 60 * 1000
        });


        return new SuccessHandler(200, user, token, "Login successful").send(res);

    } catch (error) {
        next(error);
    }
};

export const getProfileByIdController = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (id !== req.user.id) {
            return new ErrorHandler("Unauthorized access", 401).send(res);
        }

        const getUser = await User.findById(id);
        if (!getUser) {
            return new ErrorHandler('User Not Found', 400).send(res);
        }

        getUser.password = undefined;

        return new SuccessHandler(
            200,
            "User Profile Get Successfully",
            getUser
        ).send(res);

    } catch (error) {
        return new ErrorHandler(error.message || "Something went wrong", 500).send(res);
    }
};

