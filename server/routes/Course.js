const express = require("express");
const router = express.Router();

const {
    createCourse,
    showAllCourses,
    getCourseDetails,
    deleteCourse,
    getFullCourseDetails,
    editCourse,
    getInstructorCourses
} = require("../controllers/Course");

const {
    createCategory,
    showAllCategorys,
    categoryPageDetails
} = require("../controllers/Category");

const {
    createSection,
    updateSection,
    deleteSection
} = require("../controllers/Section");

const {
    createSubSection,
    updateSubSection,
    deleteSubSection
} = require("../controllers/SubSection");

const {
    createRating,
    getAverageRating,
    getAllRating
} = require("../controllers/RatingAndReview");

const {
    auth,
    isInstructor,
    isStudent,
    isAdmin
} = require("../middlewares/auth")

const {
    updateCourseProgress
} = require("../controllers/CourseProgress")



// ******************************************************************************************
//                                 COURSE ROUTES (CRUD BY INSTURCTOR ONLY)
// ******************************************************************************************

router.post("/createCourse", auth, isInstructor, createCourse);

router.post("/addSection", auth, isInstructor, createSection);

router.post("/updateSection", auth, isInstructor, updateSection);

router.post("/deleteSection", auth, isInstructor, deleteSection);

router.post("/addSubSection", auth, isInstructor, createSubSection);

router.post("/updateSubSection", auth, isInstructor, updateSubSection);

router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

router.get("/getAllCourses", showAllCourses);

router.post("/getCourseDetails", getCourseDetails);

router.post("/getFullCourseDetails", auth, getFullCourseDetails)

router.post("/editCourse", auth, isInstructor, editCourse)

router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)

router.delete("/deleteCourse", auth, isInstructor, deleteCourse)


// ******************************************************************************************
//                                 CATEGORY ROUTES (CRUD BY ADMIN ONLY)
// ******************************************************************************************

router.post("/createCategory", auth, isAdmin, createCategory);

router.get("/showAllCategories", showAllCategorys);

router.post("/getCategoryPageDetails", categoryPageDetails);


// ******************************************************************************************
//                                 RATING AND REVIEW ROUTES 
// ******************************************************************************************

router.post("/createRating", auth, isStudent, createRating);

router.get("/getAverageRating", getAverageRating);

router.get("/getReviews", getAllRating);


// ******************************************************************************************
//                                updateCourseProgress ROUTES 
// ******************************************************************************************

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)



module.exports = router;