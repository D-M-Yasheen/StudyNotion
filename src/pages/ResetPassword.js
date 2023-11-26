import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendResetPasswordEmail } from '../services/operations/authAPI';
import { BsArrowLeft } from "react-icons/bs"


export const ResetPassword = () => {

    const [mailSend, setMailSend] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    function submitHandler(event) {
        console.log(email)
        dispatch(sendResetPasswordEmail(email, setMailSend));

    }


    return (
        <div className='w-[510px] mt-40 mx-auto'>

            <div className='w-full flex flex-col justify-start items-center p-8 gap-y-9'>

                <div className='w-full flex flex-col gap-y-3'>

                    <h1 className='text-start text-richblack-5 font-semibold text-3xl'>
                        {
                            !mailSend ?
                                ("Reset your password") : ("Check email")
                        }
                    </h1>

                    <p className='text-start text-richblack-100 text-lg font-normal'>
                        {
                            !mailSend ?
                                `Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery`
                                : `We have sent the reset email to ${email}`
                        }
                    </p>


                </div>

                {/* Render According to page  */}
                <div className='w-full'>

                    {
                        !mailSend &&

                        <div className='w-full'>

                            <label className='w-full flex flex-col gap-1'>

                                <p className='w-full text-sm font-normal text-richblack-5'>

                                    Email Address

                                    <span className='mx-[2px] text-pink-200 text-sm'> * </span>

                                </p>

                                <input
                                    type='email'
                                    value={email}
                                    name='email'
                                    placeholder='Enter email address'
                                    onChange={(event) => setEmail(event.target.value)}
                                    className='text-richblack-200 font-medium
                                    text-base p-3 border-b-2 border-richblack-400
                                bg-richblack-800 rounded-lg'
                                />

                            </label>

                        </div>

                    }

                </div>

                <div className='w-full flex flex-col gap-y-3'>

                    <button type='submit'
                        className='text-center w-full bg-yellow-50 
                    text-richblack-9 p-3 mx-auto rounded-lg'
                        onClick={submitHandler}>

                        <p className='text-richblack-900 font-medium text-base'>
                            {
                                !mailSend ?
                                    'Reset Password' :
                                    'Resend email'
                            }

                        </p>

                    </button>

                    <button className='flex items-center
                            p-3 gap-x-2 font-medium text-base  text-richblack-5'
                        onClick={
                            mailSend ?
                                () => setMailSend(false) :
                                () => navigate(-1)
                        }

                    >

                        <BsArrowLeft />

                        <p>
                            Back
                        </p>

                    </button>

                </div>

            </div>

        </div>
    )
}
