import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { EditButton } from '../EditButton';
import { updateUserInfo } from '../../../../services/operations/settingAPI';

export const ProfileInfoChange = () => {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitSuccessful
        }
    } = useForm();

    const infoUpdateHandler = (data) => {
        console.log("change info setting/profilechange : ", data)
        try {
            dispatch(updateUserInfo(token, data));
       

        } catch (error) {
            console.log("Error occured : ", error.message)
        }
    }

    return (
        <div className=' bg-richblack-800 rounded-lg border-[1px]
       border-richblack-700 w-full mx-auto
       items-center py-6 px-12 flex flex-col gap-5'>

            <div className='flex w-full items-center justify-between flex-wrap'>

                <h1 className='text-richblack-5 text-xl font-semibold'>

                    Profile Information

                </h1>

            </div>

            <form onSubmit={handleSubmit(infoUpdateHandler)}
                className='w-full flex flex-col gap-5'>

                {/* First and Last Name */}
                <div className='flex lg:flex-row flex-col gap-5'>

                    {/* First Name */}
                    <label className='w-full flex flex-col gap-[6px]'>

                        <p className='text-richblack-5 font-normal text-sm'>

                            First Name

                        </p>

                        <input
                            type="text"
                            placeholder={"Enter First Name"}
                            name="firstName"

                            className='flex p-3 items-center gap-3 border-richblack-5
                                self-stretch bg-richblack-700 rounded-lg border-b-[1px]
                                text-richblack-200 text-base font-medium'

                            {...register("firstName", {
                                required: {
                                    value: true,
                                    message: "*first name is requied"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "*first Name is too long",
                                },
                                minLength: {
                                    value: 4,
                                    message: "*first Name is too short",
                                }
                            })}
                            defaultValue={user?.firstName}

                        />
                        {
                            errors.firstName &&
                            <span className='text-xs text-pink-300'>
                                {errors.firstName.message}
                            </span>
                        }

                        <p className='text-richblack-500 text-xs font-normal'>

                            Name entered above will be used for all issued certifies.

                        </p>

                    </label>

                    {/* Last Name */}
                    <label className='w-full flex flex-col gap-[6px]'>

                        <p className='text-richblack-5 font-normal text-sm'>

                            Last Name

                        </p>

                        <input
                            type="text"
                            placeholder={"Enter Last Name"}
                            name="lastName"
                            className='flex p-3 items-center gap-3  border-richblack-5
                                self-stretch bg-richblack-700 rounded-lg border-b-[1px]
                                text-richblack-200 text-base font-medium'

                            {...register("lastName", {
                                required: {
                                    value: true,
                                    message: "*last Name is requied"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "*last Name is too long",
                                },
                                minLength: {
                                    value: 4,
                                    message: "*last Name is too short",
                                }
                            })}
                            defaultValue={user?.lastName}
                        />

                        {
                            errors.firstName &&
                            <span className='text-xs text-pink-300'>
                                {errors.lastName.message}
                            </span>
                        }



                        <p className='text-richblack-500 text-xs font-normal'>

                            Name entered above will be used for all issued certifies.

                        </p>

                    </label>


                </div>


                {/* DOB and Gender */}
                <div className='flex lg:flex-row flex-col gap-5'>

                    {/* DOB */}
                    <label className='w-full flex flex-col gap-[6px]'>

                        <p className='text-richblack-5 font-normal text-sm'>

                            Date of Birth

                        </p>

                        <input
                            type="date"
                            name="DOB"
                            
                            min="1970-01-01"
                            max="2070-12-31"
                            className='flex p-3 items-center gap-3  boder-richblack-5
                                self-stretch bg-richblack-700 rounded-lg border-b-[1px]
                                text-richblack-200 text-base font-medium'

                            {...register("DOB", {
                                required: {
                                    value: true,
                                    message: "*date of birth is required"
                                }
                            })}
                            defaultValue={user?.additionalDetails?.DOB}
                        />
                        {
                            errors.DOB &&
                            <span className='text-xs text-pink-300'>
                                {errors.DOB.message}
                            </span>
                        }

                    </label>

                    {/* Gender */}
                    <label className='w-full flex flex-col gap-[6px]'>

                        <p className='text-richblack-5 font-normal text-sm'>

                            Gender

                        </p>

                        <select
                            name='gender'
                            className='w-full flex p-3 items-center border-richblack-5
                                self-stretch bg-richblack-700 rounded-lg border-b-[1px]
                                text-richblack-200 text-base font-medium'
                            {...register("gender", { required: true })}
                            defaultValue={user?.additionalDetails?.gender}
                        >

                            <option hidden value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>

                        </select>
                        {
                            errors.gender &&
                            <span className='text-xs text-pink-300'>
                                {errors.gender.message}
                            </span>
                        }

                    </label>


                </div>


                {/* Phone Number and About */}
                <div className='flex lg:flex-row flex-col gap-5'>

                    {/* Phone Number */}
                    <label className='w-full flex flex-col gap-[6px]'>

                        <p className='text-richblack-5 font-normal text-sm'>

                            Phone Number

                        </p>

                        <input
                            type="tel"
                            placeholder={"Enter Phone Number"}
                            name="contact"
                            className='flex p-3 items-center gap-3  border-richblack-5 
                                self-stretch bg-richblack-700 rounded-lg border-b-[1px]
                                text-richblack-200 text-base font-medium'
                            {...register("contact", {
                                required: {
                                    value: true,
                                    message: "*contact details required"
                                },
                                maxLength: {
                                    value: 10,
                                    message: "*invalid phone number"
                                },
                                minLength: {
                                    value: 8,
                                    message: "*invalid phone number"
                                },
                                pattern: {
                                    value: '^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$',
                                    message: "*invalid phone number"
                                }
                            })}
                            defaultValue={user?.additionalDetails?.contact}

                        />
                        {
                            errors.contact &&
                            <span className='text-xs text-pink-300'>
                                {errors.contact.message}
                            </span>
                        }

                    </label>

                    {/* Bio Details */}
                    <label className='w-full flex flex-col gap-[6px]'>

                        <p className='text-richblack-5 font-normal text-sm'>

                            About

                        </p>

                        <textarea
                            type="text"
                            rows={1}
                            placeholder={user?.about ?? "Enter Bio Details"}
                            name="about"
                            className='flex p-3 items-center gap-3  
                                self-stretch bg-richblack-700 rounded-lg 
                                text-richblack-200 text-base font-medium
                                border-richblack-5 border-b-[1px]'

                            {...register("about", { required: false })}
                            defaultValue={user?.additionalDetails?.about}

                        />



                    </label>


                </div>

                {/* buttons */}
                <div className='flex gap-5 lg:justify-end'>

                    <div>

                        <EditButton type={"submit"} active={true}>
                            Save
                        </EditButton>

                    </div>


                    <div >

                        <EditButton type={"reset"} active={false}>
                            Cancel
                        </EditButton>

                    </div>

                </div>

            </form>

        </div>
    )
}
