const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const bcrypt = require("bcrypt");
const { uploadImageToCloudinary } = require("../utils/imageUploader")
require("dotenv").config();


exports.updateProfile = async (req, res) => {
    try {
        const userId = req.payload.id;

        const { firstName, lastName, DOB, about = "", contact, gender } = req.body;

        if (!contact || !DOB || !gender || !userId) {
            return res.status(401).json({
                success: false,
                message: "All fields required."
            })
        }

        const userDetails = await User.findById({ _id: userId });

        const profileId = userDetails.additionalDetails;

        await Profile.findByIdAndUpdate(
            { _id: profileId },
            { DOB, about, contact, gender },
            { new: true })

        const updateProfileDetails = await User.findByIdAndUpdate({ _id: userId },
            { firstName, lastName },
            { new: true }).populate("additionalDetails").exec();

        return res.status(200).json({
            success: true,
            data: updateProfileDetails,
            message: "Profile details updated successfully."
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const id = req.payload.id;

        const userDetails = await User.findById({ _id: id });

        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails._id });

        await User.findByIdAndDelete({ _id: userDetails._id });

        return res.status(200).json({
            success: true,
            data: userDetails,
            message: "Account is deleted."
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occured while deleting a account."
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.payload.id;
        const userDetails = await User.findById(id)
            .populate("additionalDetails").exec();

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User Data fetching data failed."
            })
        }

        res.status(200).json({
            success: true,
            message: "User Data fetched successfully.",
            data: userDetails,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {

        const userId = req.payload.id;

        const displayPicture = req.files.displayPicture;

        const updatePic = await uploadImageToCloudinary(displayPicture,
            process.env.FOLDER_NAME, 100, 100);

        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: updatePic.secure_url },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Image Updated Successfully.",
            data: updatedProfile,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getEnrolledCourese = async (req, res) => {
    try {
        const userId = req.payload.id;

        const userDetails = await User.findOne({ _id: userId }).
            populate({
                path: 'courses',
                populate: {
                    path: 'courseContent',
                    populate: {
                        path: 'subSection'
                    }
                }
            })
            .populate('courseProgress')
            .exec();

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "Could not find user details."
            })
        }

        return res.status(200).json({
            success: true,
            data: userDetails,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.changeUserPassword = async (req, res) => {
    try {
        const userId = req.payload.id;

        const { currentPassword, confirmPassword, newPassword } = req.body;

        const userDetails = await User.findById({ _id: userId })

        if (newPassword !== confirmPassword) {
            return res.status(300).json({
                success: false,
                message: "New password and confirm password must be match"
            })
        }

        if (newPassword === currentPassword) {
            return res.status(300).json({
                success: false,
                message: "Current and New password should not be same"
            })
        }

        if (!await bcrypt.compare(currentPassword, userDetails.password)) {
            return res.status(300).json({
                success: false,
                message: "Current password is wrong"
            })
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        const updateUserPassword = await User.findByIdAndUpdate({ _id: userId },
            { password: hashedNewPassword },
            { new: true }).populate("additionalDetails").exec();

        updateUserPassword.password = undefined;
        updateUserPassword.token = undefined;

        return res.status(200).json({
            success: true,
            data: updateUserPassword,
            message: "Password changed successful."
        })

    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        })
    }
}


exports.getInstructorDashboard = async (req, res) => {
    try {

        const userId = req.payload.id

        const instructorCourses = await Course.find({ instructor: userId })


        let EntireAmountEarned = 0
        let EntireStudentEnrolled = 0

        const data = instructorCourses.map((course) => {

            const totalEnrolledStudent = course?.studentsEnrolled.length
            EntireStudentEnrolled += totalEnrolledStudent;

            const totalIncome = course?.price * totalEnrolledStudent
            EntireAmountEarned += totalIncome

            return {
                courseId: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalEnrolledStudent,
                totalIncome
            }
        })

        return res.status(200).json({
            success: true,
            data: {
                data,
                EntireAmountEarned,
                EntireStudentEnrolled
            },
            message: "Instructor dashboard data fetch successfully."
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}