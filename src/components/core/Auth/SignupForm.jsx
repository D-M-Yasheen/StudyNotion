import { useEffect, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BsInfoCircleFill } from "react-icons/bs"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { Tab } from '../../common/Tab'
import { setSignupData } from '../../../slices/authSlice'
import { sendOtp } from '../../../services/operations/authAPI'
import { useForm } from 'react-hook-form'

export const SignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

    const Condition = () => {
        return (
            <div className='absolute group-hover:visible invisible 
            text-richblack-100 bg-richblack-800 bottom-0 text-xs 
            w-[250px] p-2 rounded-lg gap-2 z-10 opacity-0 scale-0
            origin-bottom-left transition-all duration-500 
            group-hover:opacity-100 group-hover:scale-100 '>

                <p>Password should contain atleast :</p>

                <ul>
                    <li>one uppercase</li>
                    <li>one lowercase</li>
                    <li>one special character</li>
                    <li>one numeric character</li>
                </ul>

            </div>
        )
    }

    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR,
        }
    ]

    const {
        register,
        handleSubmit,
        watch,
        formState: {
            errors
        }
    } = useForm();

    watch("password", "")


    const signupForm = (data) => {

        data = {
            ...data,
            accountType,
        }

        console.log(data)

        dispatch(setSignupData(data));

        dispatch(sendOtp(data.email, navigate))
    }

    useEffect(() => {

    })

    return (
        <div>

            <Tab tabData={tabData} accountType={accountType} setAccountType={setAccountType} />

            <form onSubmit={handleSubmit(signupForm)}
                className='w-full mt-9 flex flex-col gap-5'>

                {/* First and last name */}
                <div className='flex lg:flex-row flex-col gap-5'>

                    {/* First Name */}
                    <label className='w-full'>

                        <p className='text-sm font-normal text-richblack-5'>
                            First name
                            <sup className='mx-1 text-pink-200 text-xs'>
                                *
                            </sup>
                        </p>

                        <input
                            type='text'
                            name='firstName'
                            placeholder='Enter first name'
                            className='w-full text-richblack-5 
                                    text-base p-3 border-b-[1px] 
                                    border-richblack-400
                                    bg-richblack-700 rounded-lg'

                            {...register("firstName", {
                                required: {
                                    value: true,
                                    message: "*first name is required"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "*first name should be less then 20 characters"
                                }
                            })}
                        />
                        {
                            errors.firstName &&
                            <span className='text-pink-200 text-xs'>
                                {errors.firstName.message}
                            </span>
                        }
                    </label>

                    {/* Last Name */}
                    <label className='w-full'>
                        <p className='text-sm font-normal text-richblack-5'>
                            Last name
                            <sup className='mx-1 text-pink-200 text-xs'>
                                *
                            </sup>
                        </p>

                        <input
                            type='text'
                            name='lastName'
                            placeholder='Enter last name'
                            className='w-full text-richblack-5 
                                    text-base p-3 border-b-[1px] border-richblack-400
                                    bg-richblack-700 rounded-lg'
                            {...register("lastName", {
                                required: {
                                    value: true,
                                    message: "*last name is required"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "*last name should be less then 20 characters"
                                },

                            })}
                        />
                        {
                            errors.lastName &&
                            <span className='text-pink-200 text-xs'>
                                {errors.lastName.message}
                            </span>
                        }
                    </label>

                </div>

                {/* Email */}
                <div className='w-full'>

                    <label className='w-full flex flex-col gap-1'>

                        <p className='text-sm font-normal text-richblack-5'>
                            Email Address
                            <sup className='mx-1 text-pink-200 text-xs'>
                                *
                            </sup>
                        </p>

                        <input
                            type='email'
                            name='email'
                            placeholder='Enter email address'
                            className='w-full text-richblack-5 
                                    text-base p-3 border-b-[1px] 
                                    border-richblack-400
                                    bg-richblack-700 rounded-lg'
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "*email is required"
                                }
                            })}
                        />
                        {
                            errors.email &&
                            <span className='text-pink-200 text-xs'>
                                {errors.email.message}
                            </span>
                        }

                    </label>
                </div>

                {/* Password */}
                <div className='flex lg:flex-row flex-col gap-5'>

                    {/* Create Password */}
                    <label className='w-full flex flex-col gap-1'>

                        <div className='flex'>
                            <p className='text-sm font-normal text-richblack-5 
                                    flex items-center gap-1'>
                                Create Password
                                <sup className='mx-1 text-pink-200 text-xs'>
                                    *
                                </sup>

                            </p>
                            <div className='relative text-richblack-300 group 
                            cursor-pointer'>

                                <BsInfoCircleFill fontSize={14} />


                                <Condition />


                            </div>
                        </div>


                        <div className='w-full flex flex-col relative '>
                            <input
                                type={showPassword ? "text" : 'password'}
                                name='password'
                                placeholder='Enter Password'
                                className='w-full text-richblack-5 
                                    text-base p-3 border-b-[1px] border-richblack-400
                                    bg-richblack-700 rounded-lg'
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "*password is required"
                                    },
                                    maxLength: {
                                        value: 16,
                                        message: "*maximum 16 character required"
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "*maximum 8 character required"
                                    }
                                })}
                            />


                            {
                                showPassword ?
                                    <div className={`text-richblack-300 absolute 
                                            right-3 top-[50%] -translate-y-[50%]
                                            bg-richblack-700
                                            `}
                                        onClick={() => setShowPassword(false)}>
                                        <AiOutlineEyeInvisible fontSize={24} />
                                    </div>
                                    :
                                    <div className='text-richblack-300 absolute right-3 
                                        top-[50%] -translate-y-[50%] bg-richblack-700'
                                        onClick={() => setShowPassword(true)}>
                                        <AiOutlineEye fontSize={24} />
                                    </div>
                            }

                            {
                                errors.password &&
                                <span className='text-pink-200 mt-[1px] text-xs'>
                                    {errors.password.message}
                                </span>
                            }
                        </div>

                    </label>

                    {/* Confirm Password */}
                    <label className='w-full flex flex-col gap-1'>

                        <p className='text-sm font-normal text-richblack-5'>
                            Confirm Password
                            <sup className='mx-1 text-pink-200 text-xs'>
                                *
                            </sup>
                        </p>

                        <div className='flex flex-col relative '>
                            <input
                                type={showConfirmPassword ? "text" : 'password'}

                                name='confirmPassword'
                                placeholder='Confirm Password'

                                className='w-full text-richblack-5 
                                    text-base p-3 border-b-[1px] border-richblack-400
                                    bg-richblack-700 rounded-lg'
                                {...register("confirmPassword", {
                                    required: {
                                        value: true,
                                    },
                                    validate: (val) => {
                                        if (watch('password') !== val) {
                                            return "*passwords not match";
                                        }
                                    }

                                })}
                            />

                            {
                                showConfirmPassword ?
                                    <div className='text-richblack-300 absolute right-3 
                                                top-[50%] -translate-y-[50%] bg-richblack-700'
                                        onClick={() => setShowConfirmPassword(false)}>
                                        <AiOutlineEyeInvisible fontSize={24} />
                                    </div>
                                    :
                                    <div className={`text-richblack-300 absolute right-3 
                                                top-[50%] -translate-y-[50%] bg-richblack-700`}
                                        onClick={() => setShowConfirmPassword(true)}>
                                        <AiOutlineEye fontSize={24} />
                                    </div>
                            }

                            {
                                errors.confirmPassword &&
                                <span className='text-pink-200 mt-[1px] text-xs'>
                                    {errors.confirmPassword.message}
                                </span>
                            }
                        </div>

                    </label>

                </div>

                {/* Signup button */}
                <button type='submit'
                    className='text-richblack-900 w-full select-none mt-5
                        rounded-lg bg-yellow-50 px-3 py-2 self-stretch-
                        text-center text-base font-medium shadow-inner
                        hover:scale-95 transition-all duration-200'>

                    Create Account

                </button>

            </form>

        </div>
    )
}


