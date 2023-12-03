const express = require("express");
const router = express.Router();

const {
    deleteAccount,
    updateProfile,
    updateDisplayPicture,
    getAllUserDetails,
    getEnrolledCourese,
    changeUserPassword,
    getInstructorDashboard
} = require("../controllers/Profile");

const { auth, isInstructor } = require("../middlewares/auth");

router.delete("/delete-profile", auth, deleteAccount);

router.put("/updateProfile", auth, updateProfile);

router.get("/getUserDetails", auth, getAllUserDetails);

router.get("/insturctorDashboard", auth, isInstructor, getInstructorDashboard);

router.get("/getEnrolledCourses", auth, getEnrolledCourese);

router.put("/updateDisplayPicture", auth, updateDisplayPicture);

router.put("/change-password", auth, changeUserPassword);

module.exports = router;