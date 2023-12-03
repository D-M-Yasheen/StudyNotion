const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookie = require("cookie-parser");
const mailSender = require("../utils/mailSender")
const OTPGenerator = require("otp-generator");
const { response } = require("express");
require("dotenv").config();



exports.sendOTP = async (req, res) => {
    console.log("send otp controller is running..")
    try {
        const { email } = req.body;

        console.log(`SentOTP to ${email}`)

        if (!email) {
            return res.status(401).json({
                success: false,
                message: "Email Required."
            })
        }

        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already Registered."
            })
        }

        let otp = OTPGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })

        let result = await OTP.findOne({ otp: otp });

        while (result) {
            otp = OTPGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            })

            result = await OTP.findOne({ otp: otp });
        }

        console.log("Your OTP is : ", otp)

        const otpPayload = { email, otp }

        await OTP.findOneAndDelete({ email: email })

        const OTPBody = await OTP.create(otpPayload);

        return res.status(200).json({
            success: true,
            data: OTPBody,
            message: `OTP is send to ${email} successfully.`
        })

    } catch (errror) {
        return res.status(500).json({
            success: false,
            message: "Error occured while sending OTP."
        })
    }
}


exports.signUp = async (req, res) => {
    try {

        const { firstName, lastName, email, password, confirmPassword, otp, accountType } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(401).json({
                success: false,
                message: "All fields are required."
            })
        }

        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Password doesn't match."
            })
        }

        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            return res.status(401).json({
                success: false,
                message: "User already existed."
            })
        }

        const recentOTP = await OTP.findOne({ email }).sort({ createAt: -1 }).limit(1);

        if (recentOTP.length === 0) {
            return res.status(401).json({
                success: false,
                message: "OTP is not found."
            })
        }

        if (Number(otp) !== Number(recentOTP.otp)) {
            return res.status(401).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        console.log("your hash password ", hashPassword)

        let approved = accountType === "Instructor" ? false : true;

        const profileDetails = await Profile.create({
            gender: null,
            DOB: null,
            about: null,
            contact: null,
        })

        const createUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            accountType: accountType,
            approved: approved,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName[0]}${lastName[0]}`
        })

        console.log("user details : ", createUser)

        await OTP.findOneAndDelete({ otp: otp })

        return res.status(200).json({
            success: true,
            data: createUser,
            message: "User Profile is Create successfully."
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        })
    }
}


exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required."
            })
        }

        let user = await User.findOne({ email }).populate("additionalDetails").exec();

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered yet."
            })
        }

        // console.log(password, user.password)

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password"
            })
        }

        const payload = {
            id: user._id,
            email: user.email,
            accountType: user.accountType,
        }

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

        user = user.toObject();
        user.token = token;
        user.password = undefined;

        res.cookie("token", token, options).status(200).json({
            success: true,
            user,
            token,
            message: "Login successful."
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
