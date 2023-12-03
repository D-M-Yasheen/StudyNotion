import toast from "react-hot-toast";
import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { logout } from "./authAPI"

const { settingEndpoints } = require("../apis");

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API
} = settingEndpoints;


export const updateProfilePic = (token, file) => {
    return async (dispatch) => {
        dispatch(setLoading(true));

        toast.loading("loading...");

        try {

            const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, file,
                {
                    "Content-Type": "multipart/form-data",
                    Authorisation: `Bearer ${token}`
                });

            // console.log("RESPONSE FROM UPDATE USER PROFILE PICTURE....", response?.data?.data);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            localStorage.setItem("user", JSON.stringify(response?.data?.data))


            dispatch(setUser(response?.data?.data))

            toast.success("Profile picture updated successfully")

        } catch (error) {
            // console.log("ERROR OCCURED : ", error);
            toast.error(error);
        }
        toast.dismiss();
        dispatch(setLoading(false));

    }
}


export const updateUserInfo = (token, data) => {
    return async (dispatch) => {
        toast.loading("loading...")
        try {
            // console.log("data we get : ", data)
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, data, {
                Authorisation: `Bearer ${token}`
            })

            // console.log("RESPONSE OF UPDATE USER INFO : ", response?.data);

            if (!response?.data?.success) {
                throw new Error(response?.data?.message);
            }

            dispatch(setUser(response?.data?.data));

            localStorage.setItem("user", JSON.stringify(response?.data?.data))
            toast.dismiss()
            toast.success("update successful");

        } catch (error) {
            // console.log("ERROR OCCURRED : ", error);
            toast.dismiss();
            toast.error("failed");
        }

    }
}


export const changePassword = (token, data) => {
    return async (dispatch) => {
        toast.loading("loading...");
        dispatch(setLoading(true));
        try {
            // console.log("password change data we got : ", data);

            await apiConnector("PUT", CHANGE_PASSWORD_API, data, {
                Authorisation: `Bearer ${token}`
            })

            // console.log("RESPONSE WE GOT AFTER CHANGING THE PASSWORD:", response?.data);

            toast.dismiss()
            toast.success("update successful");

        } catch (error) {
            // console.log("ERROR OCCURRED WHILE CHANGING THE PASSWORD : ", error);
            toast.dismiss();
            toast.error(error?.response?.data?.message);
        }
        dispatch(setLoading(false))
    }
}


export function deleteProfile(token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
          Authorisation: `Bearer ${token}`,
        })
        // console.log("DELETE_PROFILE_API API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Profile Deleted Successfully")
        dispatch(logout(navigate))
      } catch (error) {
        // console.log("DELETE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Delete Profile")
      }
      toast.dismiss(toastId)
    }
  }