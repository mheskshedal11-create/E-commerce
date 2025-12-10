import User from "../model/auth.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";
import SuccessHandler from "../utils/successHandler.js";

export const deleteProfileController = async (req, res, next) => {
    try {
        const id = req.params.id;

        // req.user is full user object
        if (id !== req.user._id.toString()) {
            return new ErrorHandler("You cannot delete another user's profile", 401).send(res);
        }
        const profileImage = await uploadCloudinary.file.path

        await User.findByIdAndDelete(id);

        return new SuccessHandler(
            200,
            "Profile deleted successfully",
            null
        ).send(res);

    } catch (error) {
        next(error);
    }
};
