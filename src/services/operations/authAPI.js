import { authEndpoints } from "../apis";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../slices/profileSlice";
import { setLoading, setToken } from "../../slices/authSlice";


const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSWORD_API,
  RESETPASSWORD_TOKEN_API
} = authEndpoints;


export function sendOtp(email, navigate) {

  return async (dispatch) => {

    toast.loading("Loading...")

    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SENDOTP_API,
        {
          email,
          checkUserPresent: true,
        }
      )

      if (!response.data.success) {
        toast.error(response.data.message);
        return
      }

      toast.dismiss();

      toast.success("OTP sent successfully");

      navigate("/verify-email");
      

    } catch (error) {

      toast.dismiss();

      toast.error(error.response.data.message);

    }
    dispatch(setLoading(false));
  }
}


export const signUp = (userData, navigate) => {

  return async (dispatch) => {

    dispatch(setLoading(true));

    toast.loading("Loading...")

    try {

      const { firstName, lastName, email, password, otp,
        confirmPassword, accountType } = userData


      const response = await apiConnector("POST", SIGNUP_API, {
        accountType, firstName, lastName, email, otp, password, confirmPassword
      })

      toast.dismiss();

      toast.success("Signed in")

      navigate("/login");

    } catch (error) {

      toast.dismiss()

      // console.log("ERROR OCCURED... ", error)

      toast.error(error?.message)

    }

    dispatch(setLoading(false));
  }
}


export const login = (email, password, navigate) => {

  return async (dispatch) => {

    dispatch(setLoading(true));

    toast.loading("Loading...")

    try {

      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      if (!response?.data?.success) {
        throw new Error(response.data.message)
      }

      const token = response?.data?.token;


      dispatch(setToken(token));

      const userImage = response?.data?.user?.image ? response?.data?.user?.image :
        `https://api.dicebear.com/5.x/initials/svg?seed=${response?.data?.user?.firstName[0]}${response?.data?.user?.lastName[0]}`


      dispatch(setUser({ ...response?.data?.user, image: userImage }))

      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(response?.data?.user));

      navigate("/dashboard/my-profile");

      toast.dismiss();

      toast.success("Logged in");

    } catch (error) {

      toast.dismiss();

      toast.error(error?.response?.data?.message)
    }
    
    dispatch(setLoading(false));

  }
}


export const sendResetPasswordEmail = (email, setMailSend) => {
  return async (dispatch) => {

    dispatch(setLoading(true));

    try {

      toast.loading("Please wait for your email")

      const response = await apiConnector("POST",
        RESETPASSWORD_TOKEN_API, { email });

      setMailSend(true);

      toast.dismiss();

      toast.success("Mail send");

    } catch (error) {

      toast.dismiss();

      toast.error(error.response.data.message)
    }

    dispatch(setLoading(true));

  }
}


export const updatePassword = (password, confirmPassword, token, setPasswordUpdated) => {

  return async (dispatch) => {

    dispatch(setLoading(true));

    toast.loading("Loading...");

    try {

      const response = await apiConnector("POST", RESETPASSWORD_API,
        { password, confirmPassword, token })


      setPasswordUpdated(true)

      toast.dismiss();

      toast.success("Password Update Successfully.");

    } catch (error) {

      toast.dismiss();

      toast.error(error.response.data.message)

    }

    dispatch(setLoading(true));
  }
}


export const logout = (navigate) => {

  return async (dispatch) => {

    dispatch(setToken(null));

    dispatch(setUser(null));

    // dispatch(resetCart());

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    toast.success("Logged out");

    navigate("/");
  }
} 


