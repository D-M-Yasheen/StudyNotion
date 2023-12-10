const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        const token = req.body.token
            || req.cookies.token
            || req.header("Authorisation").replace("Bearer ", "");


        if (!token) {
            return res.status(401).json({
                success: true,
                message: "Token not found."
            })
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            req.payload = payload;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.isStudent = async (req, res, next) => {
    try {
        if (req.payload.accountType !== "Student") {
            return res.status(500).json({
                success: false,
                message: "This is protect route for Student."
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "This is protect route for Student."
        })
    }
}


exports.isInstructor = async (req, res, next) => {
    try {
        if (req.payload.accountType !== "Instructor") {
            return res.status(500).json({
                success: false,
                message: "This is protect route for Instructor."
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "This is protect route for Instructor."
        })
    }
}


exports.isAdmin = async (req, res, next) => {
    try {
        if (req.payload.accountType !== "Admin") {
            return res.status(500).json({
                success: false,
                message: "This is protect route for Admin."
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "This is protect route for Admin."
        })
    }
}