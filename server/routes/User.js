const express = require("express");
const router = express.Router();

const {
    login,
    signUp,
    sendOTP,
    changePassword
} = require("../controllers/Auth");

const {
    resetPassword,
    resetPasswordToken
} = require("../controllers/ResetPassword");

const { auth } = require("../middlewares/auth");



// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

router.post("/login", login);

router.post("/signup", signUp);

router.post("/sendotp", sendOTP);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

router.post("/reset-password-token", resetPasswordToken);

router.post("/reset-password", resetPassword);

module.exports = router;