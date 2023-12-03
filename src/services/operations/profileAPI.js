import toast from 'react-hot-toast';
import { apiConnector } from '../apiconnector';

const { profileEndpoints } = require("../apis");
const {
    GET_USER_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_DETAILS_API
} = profileEndpoints;


export const fetchEnrolledStudentCourses = async (token) => {
    try {

        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null, {
            Authorisation: `Bearer ${token}`
        })

        console.log("GET USER ENROLLED COURSES API RESPONSE...........", response);

        if (!response?.data?.success) {
            throw new Error("Could not fetch enrolled courses")
        }

        return response?.data?.data

    } catch (error) {
        console.log("GET USER ENROLLED COURSES API ERROR...........", error);
        toast.error(error.message)
    }
}

export const fetchInstructorDetails = async (token) => {

    // const toastId = toast.loading("Loading...")
    let result = null
    try {

        const response = await apiConnector("GET", GET_INSTRUCTOR_DETAILS_API, null,
            {
                Authorisation: `Bearer ${token}`
            })

        console.log("GET_INSTRUCTOR_DASHBOARD_API_RESPONSE.........", response)

        if (!response?.data?.success) {
            throw new Error("Could not fetch enrolled courses")
        }

        result = response?.data?.data
    } catch (error) {
        console.log("GET_INSTRUCTOR_DASHBOARD_API_ERROR.........", error)
        toast.error("Could not fetch instructor details")
    }

    finally {
        // toast.dismiss(toastId)
        return result
    }

}