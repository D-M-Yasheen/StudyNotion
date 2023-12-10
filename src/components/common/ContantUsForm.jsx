import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import countryCodes from "../../data/countrycode.json"

export const ContantUsForm = (prop) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitSuccessful
        }
    } = useForm();


    const submitHandler = async (data) => {
        try {
            // const response = { status: true };
            // console.log("Your form data")
            // console.log(data)
        } catch (error) {
            // console.log("Error occured in form section", error);
        }
    }


    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                firstName: "",
                lastName: "",
                email: "",
                contactNumber: "",
                message: ""
            })
        }
    }, [isSubmitSuccessful, reset])

    return (
        <section className='text-black mb-3'>

            <form onSubmit={handleSubmit(submitHandler)}
                className='flex flex-col gap-8'>

                {/* First and Last Name */}
                <div className='w-full flex lg:flex-row flex-col gap-5'>

                    {/* First Name */}
                    <label className='lg:w-1/2 w-full flex flex-col gap-[6px]'>

                        <p className=' font-normal text-richblack-5 text-sm'>
                            First Name
                        </p>

                        <input type="text"
                            name="firstName"
                            placeholder='Enter first name'
                            {...register("firstName", {
                                required: {
                                    value: true,
                                    message: "First name is required"
                                }
                            })}

                            className='w-full flex p-3 self-stretch rounded-lg 
                                            bg-richblack-700 text-richblack-50 
                                            border-richblack-600 border-b-2'
                        />

                        {
                            errors.firstName &&

                            <span className='bg-white'>
                                First Name is required
                            </span>
                        }

                    </label>



                    {/* Last Name */}
                    <label className='lg:w-1/2 w-full flex flex-col gap-[6px]'>

                        <p className=' font-normal text-richblack-5 text-sm'>
                            Last Name
                        </p>

                        <input type="text"
                            name="lastName"
                            placeholder='Enter last name'
                            {...register("lastName",
                                { required: true }
                            )}
                            className='w-full flex p-3 self-stretch rounded-lg 
                                            bg-richblack-700 text-richblack-50 
                                            border-richblack-600 border-b-2'
                        />

                        {
                            errors.lastName &&

                            <span className='bg-white'>
                                Last Name is required
                            </span>
                        }

                    </label>

                </div>


                {/* email */}
                <label className='w-full flex flex-col gap-[6px]'>

                    <p className=' font-normal text-richblack-5 text-sm'>
                        Email
                    </p>

                    <input
                        type='email'
                        name="email"
                        placeholder='Enter email address'
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Email required"
                            },
                            pattern: {
                                value: "/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$/",
                                message: "Invalid email"
                            }
                        })}
                        // className='w-full flex p-3 self-stretch rounded-lg border-r-[1px]
                        //  bg-richblack-800 text-richblack-50 border-richblack-600 border-b-[1px]'
                        className='w-full flex p-3 self-stretch rounded-lg 
                                            bg-richblack-700 text-richblack-50 
                                            border-richblack-600 border-b-2'
                    />
                    {
                        errors.email &&

                        <span className='bg-white'>
                            Email is required
                        </span>
                    }

                </label>


                {/* contact Number */}
                <label htmlFor="contact"
                    className='flex flex-col gap-[6px] w-full'>

                    <p className=' font-normal text-richblack-5 text-sm'>
                        Phone Number
                    </p>

                    <div className='w-full flex gap-5'>

                        <select className='w-1/6 flex p-3 self-stretch rounded-lg 
                                            bg-richblack-700 text-richblack-50 
                                            border-richblack-600 border-b-2'>
                            {
                                countryCodes.map((code, index) => {

                                    if (code.country === "India") {
                                        return (
                                            <option className='' selected
                                                key={index} value={code.code}>
                                                {code.code} - {code.country}
                                            </option>
                                        )
                                    }
                                    return (
                                        <option className=''
                                            key={index} value={code.code}>
                                            {code.code} - {code.country}
                                        </option>
                                    )
                                })
                            }
                        </select>

                        <input
                            type="tel"
                            name="contactNumber"
                            placeholder='1234567890'

                            {...register("contactNumber", {
                                required: {
                                    value: true,
                                    message: "Phone number is require"
                                },
                                minLength: {
                                    value: 8,
                                    message: "Invalid phone number"
                                },
                                maxLength: {
                                    value: 10,
                                    message: "Invalid phone number"
                                }

                            })}
                            className='w-5/6 flex p-3 self-stretch rounded-lg 
                                            bg-richblack-700 text-richblack-50 
                                            border-richblack-600 border-b-2'
                        />

                        {
                            errors.contactNumber &&

                            <span className='bg-white'>
                                Phone Number is required
                            </span>
                        }

                    </div>

                </label>


                {/* message */}
                <label className='w-full flex flex-col gap-[6px]'>

                    <p className=' font-normal text-richblack-5 text-sm'>
                        Message
                    </p>

                    <textarea name="message" rows="10"
                        placeholder='Enter your message here'
                        {...register("message", {
                            required: {
                                value: true,
                                message: "Message is required"
                            }
                        })}
                        className='w-full flex p-3 self-stretch rounded-lg 
                                            bg-richblack-700 text-richblack-50 
                                            border-richblack-600 border-b-2'
                    />
                    {
                        errors.message &&

                        <span className='bg-white'>
                            Message is required
                        </span>
                    }

                </label>



                {/* button */}
                <button type='submit'
                    className='flex justify-center items-center gap-2 w-full
                bg-yellow-50 text-richblack-900 p-3 rounded-lg self-stretch
                 border-2 border-l border-t border-yellow-5 hover:scale-95 
                 transition-all duration-200 text-center font-semibold text-base'>

                    {prop.text ?? "Submit"}

                </button>

            </form>

        </section>
    )
}
