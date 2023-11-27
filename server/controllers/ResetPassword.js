const User = require("../models/User");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const { resetPasswordEmail } = require("../mail/templates/resetPasswordEmail")
require("dotenv").config();


exports.resetPasswordToken = async (req, rest) => {
    try {
        const { email } = req.body;

        if (!email) {
            return rest.status(401).json({
                success: false,
                message: "Field is required."
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return rest.status(401).json({
                success: false,
                message: "User is not registered yet."
            })
        }

        const urlToken = crypto.randomUUID();

        // const url = `http://localhost:3000/update-password/${urlToken}`;
        // const url = `https://studynotion-edtech-project.vercel.app/update-password/${token}`
        const url = `${process.env.UPDATE_PASSWORD}${urlToken}`


        const userUpdate = await User.findOneAndUpdate(
            { email },
            {
                token: urlToken,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000
            }
        );

        await mailSender(email, "Password Reset Link", resetPasswordEmail(email, user?.firstName, url));

        return rest.status(200).json({
            success: true,
            message: "Mail is send for Password Reset."
        })

    } catch (error) {
        return rest.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.resetPassword = async (req, rest) => {
    try {
        const { password, confirmPassword, token } = req.body;

        const regLow = /[a-z]/
        const regUp = /[A-Z]/
        const regNum = /[0-9]/
        const regSpe = /[^A-Za-z 0-9]/;




        if (!regLow.test(password) ||
            !regUp.test(password) ||
            !regNum.test(password) ||
            !regSpe.test(password) ||
            password.length < 8) {

            return rest.status(401).json({
                success: false,
                message: "Weak password"
            })
        }

        // console.log(token)


        const user = await User.findOne({ token: token });

        if (!user) {
            return rest.status(401).json({
                success: false,
                message: "Link has been expired"
            })
        }

        if (user.resetPasswordExpires < Date.now()) {
            return rest.status(401).json({
                success: false,
                message: "Link has been expired."
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate(
            { token: token },
            { password: hashPassword },
            { new: true }
        )

        return rest.status(200).json({
            success: true,
            message: "Reset Password Successfully."
        })

    } catch (error) {
        return rest.status(500).json({
            success: false,
            message: "Error occured while reseting password."
        })
    }
}