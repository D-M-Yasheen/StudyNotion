const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const authEndpoints = {
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
    RESETPASSWORD_TOKEN_API: BASE_URL + "/auth/reset-password-token",
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
}

// CATALOG PAGE DATA 
export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails"
}

// CATEGORIES API
export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories",
}

// CONTACT-US API
export const contactusEndpoints = {
    CONTACT_US_API: BASE_URL + "/react/contact"
}

// COURSE ENDPOINTS
export const courseEndpoints = {
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    CREATE_RATING_API: BASE_URL + "/course/createRating",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
    GET_ALL_RATING_API: BASE_URL + "/course/getReviews",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED:BASE_URL + "/course/getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
    GET_INSTRUCTOR_DETAILS_API: BASE_URL + "/profile/insturctorDashboard",
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
}

// SETTINGS PAGE API
export const settingEndpoints = {
    CHANGE_PASSWORD_API: BASE_URL + "/profile/change-password",
    DELETE_PROFILE_API: BASE_URL + "/profile/delete-profile",
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
}

// STUDENTS ENDPOINTS
export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verfiySignature",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessfulEmail",
}