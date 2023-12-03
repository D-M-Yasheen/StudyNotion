import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { EditButton } from '../EditButton';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { changePassword } from '../../../../services/operations/settingAPI';

export const ChangePassword = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth)
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: {
            errors
        }
    } = useForm();

    const changePasswordHandler = async (data) => {
        try {
            dispatch(changePassword(token, data));
            reset();

        } catch (error) {
            // console.log("Error occurred while updating the password : ", error.message)
        }
    }

    return (
        <div className=' bg-richblack-800 rounded-lg border-[1px]
                border-richblack-700 w-full mx-auto px-12
                items-center py-6 flex flex-col gap-5'>

            <div className='flex w-full items-center justify-between flex-wrap'>

                <h1 className='text-richblack-5 text-xl font-semibold'>
                    Change Password
                </h1>

            </div>

            <form onSubmit={handleSubmit(changePasswordHandler)}
                className='w-full flex flex-col gap-5'>

                {/* Current and New Password */}
                <div className='flex lg:flex-row flex-col gap-5'>

                    {/* Current Password */}
                    <label className='lg:w-1/3 w-full flex flex-col gap-[6px]'>

                        <p className='text-richblack-5 font-normal text-sm'>
                            Current Password
                        </p>

                        <div className='w-full relative'>

                            <input type={showCurrentPassword ? `text` : `password`}
                                placeholder={"Enter Current Password"}
                                name="cpassword"
                                className='w-full flex p-3 items-center gap-3 border-richblack-5
                                    self-stretch bg-richblack-700 rounded-lg border-b-[1px]
                                    text-richblack-200 text-base font-medium'

                                {...register("currentPassword", {
                                    required: {
                                        value: true,
                                        message: "*current password required."
                                    },
                                })}
                            />
                            {
                                errors.currentPassword &&
                                <span className='text-xs text-pink-300'>
                                    {errors.currentPassword.message}
                                </span>
                            }

                            <div className=' cursor-pointer absolute top-[50%] -translate-y-[50%] right-3'
                                onClick={() => setShowCurrentPassword((prev) => !prev)}>

                                {
                                    showCurrentPassword ?

                                        <div className={`text-richblack-300 absolute right-0 top-[50%] 
                                        -translate-y-[50%] bg-richblack-700`}>
                                            <AiOutlineEyeInvisible fontSize={24} />
                                        </div>
                                        :
                                        <div className='text-richblack-300 absolute right-0 
                                        top-[50%] -translate-y-[50%] bg-richblack-700'>
                                            <AiOutlineEye fontSize={24} />
                                        </div>
                                }
                            </div>
                        </div>
                    </label>

                    {/* New Password */}
                    <label className='lg:w-1/3 w-full flex flex-col gap-[6px]'>

                        <p className='text-richblack-5 font-normal text-sm'>
                            New Password
                        </p>

                        <div className='w-full relative'>

                            <input
                                type={showNewPassword ? `text` : `password`}
                                placeholder={"Enter Current Password"}
                                name="newPassword"
                                className='w-full flex p-3 items-center gap-3 
                                    border-richblack-5 self-stretch bg-richblack-700 
                                    rounded-lg border-b-[1px] text-richblack-200 text-base 
                                    font-medium'
                                {...register("newPassword", {
                                    required: {
                                        value: true,
                                        message: "*new password required"
                                    },
                                    maxLength: {
                                        value: 16,
                                        message: "*maximum 16 character required"
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "*minimun 8 character required"
                                    },
                                    validate: (value) => {
                                        if (value === getValues("currentPassword")) {
                                            return "*new password should be different"
                                        }
                                    }
                                })}
                            />
                            {
                                errors.newPassword &&
                                <span className='absolute -bottom-5 text-xs text-pink-300'>
                                    {errors.newPassword.message}
                                </span>
                            }

                            <div className=' cursor-pointer absolute top-[50%] -translate-y-[50%] right-3'
                                onClick={() => setShowNewPassword((prev) => !prev)}>
                                {
                                    showNewPassword ?
                                        <div className={`text-richblack-300 absolute 
                                                right-0 top-[50%] -translate-y-[50%]
                                                bg-richblack-700`}>
                                            <AiOutlineEyeInvisible fontSize={24} />
                                        </div>
                                        :
                                        <div className='text-richblack-300 absolute right-0
                                                top-[50%] -translate-y-[50%] bg-richblack-700'>
                                            <AiOutlineEye fontSize={24} />
                                        </div>
                                }
                            </div>
                        </div>
                    </label>

                    {/* Confirm New Password */}
                    <label className='lg:w-1/3 w-full flex flex-col gap-[6px]'>

                        <p className='text-richblack-5 font-normal text-sm'>
                            Confirm New Password
                        </p>

                        <div className='w-full flex flex-col relative'>

                            <input type={showConfirmPassword ? `text` : `password`}
                                placeholder={"Enter Current Password"}
                                name="confirmPassword"
                                className='w-full flex p-3 items-center gap-3 border-richblack-5
                                    self-stretch bg-richblack-700 rounded-lg border-b-[1px]
                                    text-richblack-200 text-base font-medium'

                                {...register("confirmPassword", {
                                    required: {
                                        value: true,
                                        message: "*current password required."
                                    },
                                    validate: (value) => {
                                        if (value !== getValues("newPassword")) {
                                            return "*confirm password must be match with new password"
                                        }
                                    }
                                })}
                            />
                            {
                                errors.confirmPassword &&
                                <span className='absolute -bottom-5 text-xs text-pink-300'>
                                    {errors.confirmPassword.message}
                                </span>
                            }

                            <div className=' cursor-pointer absolute top-[50%] -translate-y-[50%] right-3'
                                onClick={() => setShowConfirmPassword((prev) => !prev)}>

                                {
                                    showConfirmPassword ?

                                        <div className={`text-richblack-300 absolute right-0 top-[50%] 
                                                -translate-y-[50%] bg-richblack-700`}>
                                            <AiOutlineEyeInvisible fontSize={24} />
                                        </div>
                                        :
                                        <div className='text-richblack-300 absolute right-0
                                                    top-[50%] -translate-y-[50%] bg-richblack-700'>
                                            <AiOutlineEye fontSize={24} />
                                        </div>
                                }
                            </div>
                        </div>
                    </label>
                </div>

                {/* buttons */}
                <div className='flex lg:flex-row  flex-col gap-5 lg:justify-end'>

                    <div className='lg:w-1/2 w-full flex gap-5 justify-end items-end '>
                        <div className=''>
                            <EditButton type={"submit"} active={true}>
                                Save
                            </EditButton>
                        </div>

                        <div className=''>
                            <EditButton type={"reset"} active={false}>
                                Cancel
                            </EditButton>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}


