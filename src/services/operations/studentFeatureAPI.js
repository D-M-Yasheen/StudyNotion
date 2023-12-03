import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { removeFromCart, resetCart } from "../../slices/cartSlice";


const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

function loadScript(src) {

    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;

        script.onload = () => {
            resolve(true)
        }

        script.onerror = () => {
            resolve(false)
        }

        document.body.appendChild(script)
    })

}

export const buyCourse = async (token, courses, userDetails, navigate, dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        // console.log("course id array we got ---> ", courses)

        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API,
            { courses },
            {
                Authorisation: `Bearer ${token}`
            })

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        // console.log("PRINTING orderResponse", orderResponse);


        const option = {
            key: `rzp_test_vGn3V6nwq1cDWQ`,
            // key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id: orderResponse.data.message.id,
            name: "StudyNotion",
            description: "Thank You for Purchasing the Course",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email
            },
            handler: function (response) {
                //send successful wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);
                //verifyPayment
                verifyPayment({ ...response, courses }, token, navigate, dispatch);
            }
        }

        const paymentObject = new window.Razorpay(option);

        paymentObject.open();
        // paymentObject.on(payment.failed, function (response) {
        //     toast.error("oops, payment failed");
        //     console.log(response.error);
        // })

    } catch (error) {
        // console.log("PAYMENT API ERROR.....", error);
        toast.error(error.response.data.message);
    }
    finally{
        toast.dismiss(toastId);
    }
}


const sendPaymentSuccessEmail = async (response, amount, token) => {
    try {

        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API,
            {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount,
            }, {
            Authorisation: `Bearer ${token}`
        })

    } catch (error) {
        // console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

const verifyPayment = async (bodyData, token, navigate, dispatch) => {

    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true));

    try {
        // console.log("Go to verify payment .....", bodyData)
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorisation: `Bearer ${token}`,
        })

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Payment Successful")

        navigate("/dashboard/enrolled-courses");

        const { courses } = bodyData;

        courses.forEach((item) => {
            // console.log("item data : ", item)
            dispatch(removeFromCart(item))
        })

        // dispatch(resetCart());



    } catch (error) {
        // console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}