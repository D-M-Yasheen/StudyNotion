import React, { useState } from 'react'
import { BsArrowLeft } from "react-icons/bs"
import { RxCountdownTimer } from "react-icons/rx"
import OTPInput from 'react-otp-input'
// import OTPInput from 'otp-input-react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'
import { signUp, sendOtp } from '../services/operations/authAPI'

export const VerifyEmail = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const { loading, signupData } = useSelector((state) => state.auth)

    function resentOtpHandler() {
        console.log("otp is going to send in this email again : ", signupData?.email)

        dispatch(sendOtp(signupData?.email, navigate))
    }

    function verfiyHandler() {

        console.log(signupData)

        const userData = {
            ...signupData,
            otp
        }

        dispatch(signUp(userData, navigate))
    }


    if (loading) {

    }

    return (
        <>
            {
                loading ?

                    <div className='flex justify-center items-center h-screen w-screen'>
                        <div class="custom-loader text-richblack-5"></div>
                    </div>

                    :

                    <div className='w-[510px] mt-40 mx-auto'>

                        <div className='flex flex-col justify-start items-center p-8 gap-y-6'>

                            <div className='w-full gap-y-3'>

                                <h1 className='text-start text-richblack-5 font-semibold text-3xl'>
                                    Verify email
                                </h1 >

                                <p className='text-start text-richblack-100 text-lg font-normal'>
                                    A verification code has been sent to you. Enter the code below
                                </p>

                            </div >

                            <div className='w-full'>

                                <OTPInput
                                    containerStyle={`w-full flex justify-between`}

                                    inputStyle={`bg-richblack-800 rounded-lg text-center py-1
                        text-richblack-5 text-4xl font-medium border-richblack-700 border-b-2
                        `}

                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    inputType='tel'
                                    renderInput={(props) => <input {...props} />}
                                />

                            </div>

                            <div className='w-full flex flex-col gap-y-3'>

                                <div className='text-center w-full bg-yellow-50 
                    text-richblack-9 p-3 mx-auto rounded-lg'
                                    onClick={verfiyHandler}>

                                    <button >

                                        <p className='text-richblack-900 font-medium text-base'>
                                            Verify email
                                        </p>

                                    </button>

                                </div>

                                <div className='flex justify-between items-center'>

                                    <NavLink to="/signup">

                                        <button className='flex justify-center items-center
                            p-3 gap-x-2 font-medium text-base  text-richblack-5'>

                                            <BsArrowLeft />

                                            <p>
                                                Back to login
                                            </p>

                                        </button>

                                    </NavLink>


                                    <button className='flex justify-center items-center
                         text-blue-100 p-3 gap-x-2 font-medium text-base'
                                        onClick={resentOtpHandler}>

                                        <RxCountdownTimer />

                                        <p>
                                            Resend it
                                        </p>

                                    </button>

                                </div>

                            </div>

                        </div >
                    </div >
            }
        </>
    )
}
