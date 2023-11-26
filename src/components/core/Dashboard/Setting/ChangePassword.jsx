import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { EditButton } from '../EditButton';
import { changePassword } from '../../../../services/operations/settingAPI';

export const ChangePassword = () => {

    const { user } = useSelector((state) => state.profile);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: {
            errors,
            isSubmitSuccessful
        }
    } = useForm();

    const changePasswordHandler = async (data) => {
        try {
            dispatch(changePassword(token, data));
            reset();

        } catch (error) {
            console.log("Error occurred while updating the password : ", error.message)
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({

            })
        }
    })


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
                    <label className='lg:w-1/2 w-full flex flex-col gap-[6px]'>

                        <p className='text-richblack-5 font-normal text-sm'>

                            Current Password

                        </p>

                        <div className='w-full relative'>

                            <input
                                type={showCurrentPassword ? `text` : `password`}
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

                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                            <g id="Group">
                                                <path id="Vector" d="M17.2799 6.6519C16.6965 5.80261 16.0019 5.03528 15.2148 4.37044L17.3387 
                                                2.24731C17.7675 1.79324 17.7471 1.07747 17.2931 0.648608C16.8567 0.236493 16.1745 0.236988 
                                                15.7388 0.649703L13.2915 3.09776C11.9592 2.43204 10.4885 2.09053 8.99924 2.10103C5.65044 
                                                2.13308 2.54079 3.84205 0.71863 6.6519C-0.239543 8.06109 -0.239543 9.91263 0.71863 11.3219C1.30201 
                                                12.1711 1.99654 12.9385 2.78369 13.6033L0.659822 15.7287C0.218021 16.1705 0.218021 16.8868 
                                                0.659822 17.3285C1.10162 17.7703 1.81792 17.7703 2.25969 17.3285L4.707 14.8805C6.03926 15.5462 
                                                7.50996 15.8877 8.99924 15.8772C12.348 15.8452 15.4577 14.1362 17.2799 11.3264C18.2401 9.91616 
                                                18.2401 8.06212 17.2799 6.6519ZM2.58391 10.0447C2.14974 9.40795 2.14974 8.57033 2.58391 
                                                7.93362C3.97417 5.72797 6.39204 4.38221 8.99924 4.36291C9.87786 4.35863 10.7502 4.51187 11.5747 
                                                4.81528L10.1769 6.21236C8.64378 5.56151 6.87328 6.27678 6.22247 7.80992C5.90278 8.56301 5.90278 
                                                9.41371 6.22247 10.1668L4.38511 12.0049C3.69197 11.4432 3.08512 10.7827 2.58391 10.0447ZM15.4146 
                                                10.0447C14.0243 12.2503 11.6064 13.5961 8.99924 13.6154C8.12062 13.6196 7.24833 13.4664 6.42374 
                                                13.163L7.82156 11.7652C9.3547 12.416 11.1252 11.7008 11.776 10.1676C12.0957 9.41453 12.0957 
                                                8.56382 11.776 7.81074L13.6134 5.97338C14.3065 6.53513 14.9133 7.19559 15.4145 7.93365C15.8487 
                                                8.57033 15.8487 9.40795 15.4146 10.0447Z" fill="#838894" />
                                            </g>
                                        </svg>

                                        :

                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                                            <g id="Group">
                                                <path id="Vector" d="M17.2786 4.66312C15.4573 1.85304 12.3478 0.143965 8.99922 0.112549C5.65068 
                                                0.143965 2.54118 1.85304 0.719861 4.66312C-0.239954 6.07171 -0.239954 7.92419 0.719861 9.33282C2.54015 
                                                12.1446 5.64983 13.8555 8.99926 13.8879C12.3478 13.8565 15.4573 12.1474 17.2787 9.33734C18.2405 7.92769 
                                                18.2405 6.07273 17.2786 4.66312ZM15.415 8.05569C14.0244 10.2613 11.6065 11.6069 8.99922 11.6262C6.39199 
                                                11.6069 3.97405 10.2613 2.58348 8.05569C2.14997 7.41881 2.14997 6.58162 2.58348 5.94477C3.97401 3.73921 
                                                6.39196 2.39359 8.99922 2.37426C11.6064 2.39356 14.0244 3.73921 15.415 5.94477C15.8485 6.58162 15.8485 
                                                7.41881 15.415 8.05569Z" fill="#838894" />
                                                <path id="Vector_2" d="M8.99998 10.0156C10.6655 10.0156 12.0156 8.66546 12.0156 6.99998C12.0156 5.33451 
                                                10.6655 3.98438 8.99998 3.98438C7.33451 3.98438 5.98438 5.33451 5.98438 6.99998C5.98438 8.66546 7.33451 
                                                10.0156 8.99998 10.0156Z" fill="#838894" />
                                            </g>
                                        </svg>

                                }

                            </div>

                        </div>



                    </label>

                    {/* Confirm Password */}
                    <label className='lg:w-1/2 w-full flex flex-col gap-[6px]'>

                        <p className='text-richblack-5 font-normal text-sm'>

                            Confirm Password

                        </p>

                        <div className='w-full flex flex-col relative'>

                            <input
                                type={showConfirmPassword ? `text` : `password`}
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
                                        if (value !== getValues("currentPassword"))
                                            return "*password not matched"
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

                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                            <g id="Group">
                                                <path id="Vector" d="M17.2799 6.6519C16.6965 5.80261 16.0019 5.03528 15.2148 4.37044L17.3387 
                                                2.24731C17.7675 1.79324 17.7471 1.07747 17.2931 0.648608C16.8567 0.236493 16.1745 0.236988 
                                                15.7388 0.649703L13.2915 3.09776C11.9592 2.43204 10.4885 2.09053 8.99924 2.10103C5.65044 
                                                2.13308 2.54079 3.84205 0.71863 6.6519C-0.239543 8.06109 -0.239543 9.91263 0.71863 11.3219C1.30201 
                                                12.1711 1.99654 12.9385 2.78369 13.6033L0.659822 15.7287C0.218021 16.1705 0.218021 16.8868 
                                                0.659822 17.3285C1.10162 17.7703 1.81792 17.7703 2.25969 17.3285L4.707 14.8805C6.03926 15.5462 
                                                7.50996 15.8877 8.99924 15.8772C12.348 15.8452 15.4577 14.1362 17.2799 11.3264C18.2401 9.91616 
                                                18.2401 8.06212 17.2799 6.6519ZM2.58391 10.0447C2.14974 9.40795 2.14974 8.57033 2.58391 
                                                7.93362C3.97417 5.72797 6.39204 4.38221 8.99924 4.36291C9.87786 4.35863 10.7502 4.51187 11.5747 
                                                4.81528L10.1769 6.21236C8.64378 5.56151 6.87328 6.27678 6.22247 7.80992C5.90278 8.56301 5.90278 
                                                9.41371 6.22247 10.1668L4.38511 12.0049C3.69197 11.4432 3.08512 10.7827 2.58391 10.0447ZM15.4146 
                                                10.0447C14.0243 12.2503 11.6064 13.5961 8.99924 13.6154C8.12062 13.6196 7.24833 13.4664 6.42374 
                                                13.163L7.82156 11.7652C9.3547 12.416 11.1252 11.7008 11.776 10.1676C12.0957 9.41453 12.0957 
                                                8.56382 11.776 7.81074L13.6134 5.97338C14.3065 6.53513 14.9133 7.19559 15.4145 7.93365C15.8487 
                                                8.57033 15.8487 9.40795 15.4146 10.0447Z" fill="#838894" />
                                            </g>
                                        </svg>

                                        :

                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                                            <g id="Group">
                                                <path id="Vector" d="M17.2786 4.66312C15.4573 1.85304 12.3478 0.143965 8.99922 0.112549C5.65068 
                                                0.143965 2.54118 1.85304 0.719861 4.66312C-0.239954 6.07171 -0.239954 7.92419 0.719861 9.33282C2.54015 
                                                12.1446 5.64983 13.8555 8.99926 13.8879C12.3478 13.8565 15.4573 12.1474 17.2787 9.33734C18.2405 7.92769 
                                                18.2405 6.07273 17.2786 4.66312ZM15.415 8.05569C14.0244 10.2613 11.6065 11.6069 8.99922 11.6262C6.39199 
                                                11.6069 3.97405 10.2613 2.58348 8.05569C2.14997 7.41881 2.14997 6.58162 2.58348 5.94477C3.97401 3.73921 
                                                6.39196 2.39359 8.99922 2.37426C11.6064 2.39356 14.0244 3.73921 15.415 5.94477C15.8485 6.58162 15.8485 
                                                7.41881 15.415 8.05569Z" fill="#838894" />
                                                <path id="Vector_2" d="M8.99998 10.0156C10.6655 10.0156 12.0156 8.66546 12.0156 6.99998C12.0156 5.33451 
                                                10.6655 3.98438 8.99998 3.98438C7.33451 3.98438 5.98438 5.33451 5.98438 6.99998C5.98438 8.66546 7.33451 
                                                10.0156 8.99998 10.0156Z" fill="#838894" />
                                            </g>
                                        </svg>

                                }

                            </div>


                        </div>



                    </label>



                </div>

                {/* <div className='flex flex-col gap-5'>
                    
                </div> */}


                {/* buttons */}
                <div className='flex lg:flex-row  flex-col gap-5 lg:justify-end'>

                    {/* New Password */}
                    <label className='lg:w-1/2 w-full flex flex-col gap-[6px]'>

                        <p className='text-richblack-5 font-normal text-sm'>

                            New Password

                        </p>

                        <div className='w-full relative'>

                            <input
                                type={showNewPassword ? `text` : `password`}
                                placeholder={"Enter Current Password"}
                                name="newPassword"
                                className='w-full flex p-3 items-center gap-3 border-richblack-5
                    self-stretch bg-richblack-700 rounded-lg border-b-[1px]
                    text-richblack-200 text-base font-medium'
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

                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                            <g id="Group">
                                                <path id="Vector" d="M17.2799 6.6519C16.6965 5.80261 16.0019 5.03528 15.2148 4.37044L17.3387 
                2.24731C17.7675 1.79324 17.7471 1.07747 17.2931 0.648608C16.8567 0.236493 16.1745 0.236988 
                15.7388 0.649703L13.2915 3.09776C11.9592 2.43204 10.4885 2.09053 8.99924 2.10103C5.65044 
                2.13308 2.54079 3.84205 0.71863 6.6519C-0.239543 8.06109 -0.239543 9.91263 0.71863 11.3219C1.30201 
                12.1711 1.99654 12.9385 2.78369 13.6033L0.659822 15.7287C0.218021 16.1705 0.218021 16.8868 
                0.659822 17.3285C1.10162 17.7703 1.81792 17.7703 2.25969 17.3285L4.707 14.8805C6.03926 15.5462 
                7.50996 15.8877 8.99924 15.8772C12.348 15.8452 15.4577 14.1362 17.2799 11.3264C18.2401 9.91616 
                18.2401 8.06212 17.2799 6.6519ZM2.58391 10.0447C2.14974 9.40795 2.14974 8.57033 2.58391 
                7.93362C3.97417 5.72797 6.39204 4.38221 8.99924 4.36291C9.87786 4.35863 10.7502 4.51187 11.5747 
                4.81528L10.1769 6.21236C8.64378 5.56151 6.87328 6.27678 6.22247 7.80992C5.90278 8.56301 5.90278 
                9.41371 6.22247 10.1668L4.38511 12.0049C3.69197 11.4432 3.08512 10.7827 2.58391 10.0447ZM15.4146 
                10.0447C14.0243 12.2503 11.6064 13.5961 8.99924 13.6154C8.12062 13.6196 7.24833 13.4664 6.42374 
                13.163L7.82156 11.7652C9.3547 12.416 11.1252 11.7008 11.776 10.1676C12.0957 9.41453 12.0957 
                8.56382 11.776 7.81074L13.6134 5.97338C14.3065 6.53513 14.9133 7.19559 15.4145 7.93365C15.8487 
                8.57033 15.8487 9.40795 15.4146 10.0447Z" fill="#838894" />
                                            </g>
                                        </svg>

                                        :

                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                                            <g id="Group">
                                                <path id="Vector" d="M17.2786 4.66312C15.4573 1.85304 12.3478 0.143965 8.99922 0.112549C5.65068 
                0.143965 2.54118 1.85304 0.719861 4.66312C-0.239954 6.07171 -0.239954 7.92419 0.719861 9.33282C2.54015 
                12.1446 5.64983 13.8555 8.99926 13.8879C12.3478 13.8565 15.4573 12.1474 17.2787 9.33734C18.2405 7.92769 
                18.2405 6.07273 17.2786 4.66312ZM15.415 8.05569C14.0244 10.2613 11.6065 11.6069 8.99922 11.6262C6.39199 
                11.6069 3.97405 10.2613 2.58348 8.05569C2.14997 7.41881 2.14997 6.58162 2.58348 5.94477C3.97401 3.73921 
                6.39196 2.39359 8.99922 2.37426C11.6064 2.39356 14.0244 3.73921 15.415 5.94477C15.8485 6.58162 15.8485 
                7.41881 15.415 8.05569Z" fill="#838894" />
                                                <path id="Vector_2" d="M8.99998 10.0156C10.6655 10.0156 12.0156 8.66546 12.0156 6.99998C12.0156 5.33451 
                10.6655 3.98438 8.99998 3.98438C7.33451 3.98438 5.98438 5.33451 5.98438 6.99998C5.98438 8.66546 7.33451 
                10.0156 8.99998 10.0156Z" fill="#838894" />
                                            </g>
                                        </svg>
                                }

                            </div>

                        </div>

                    </label>

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


