import React, { useState } from 'react'
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'
import frame from "../../../assets/Images/frame.png"

export const Template = ({ heading, description, highlightDescription, formType, img} ) => {
    return (
        <div className='w-full flex mt-2 mx-auto lg:flex-row flex-col-reverse
         text-richblack-5 justify-between items-center'>

            {/* Heading and toggle buttons */}
            <div className='lg:w-1/3 md:w-9/12 sm:w-10/12 mx-auto w-full p-8 flex flex-col'>


                <div className='space-y-9'>

                    {/* Heading */}
                    <div className='space-y-3'>

                        <h1 className='text-richblack-5 font-semibold
                                    text-3xl text-start'>
                            {heading}
                        </h1>

                        <p className='text-richblack-100 text-lg
                                    font-normal'>
                            {description}
                            <span className=' text-blue-100 font-edu-sa 
                                    text-base italic font-normal'>
                                {highlightDescription}
                            </span>
                        </p>
                    </div>

                    {formType === "login" ? <LoginForm /> : <SignupForm />}

                </div>
            </div>

            {/* Image section */}
            <div className='lg:w-1/3 md:w-9/12 sm:w-10/12 w-11/12 mx-auto p-8 select-none'>

                <div className='relative'>

                    <img src={frame}
                        width={558}
                        height={504}
                        className='absolute -z-1 top-3 left-3'
                        alt="" />

                    <img
                        width={558}
                        height={504}
                        src={img}
                        className='relative '
                    />

                </div>

            </div>

        </div>
    )
}
