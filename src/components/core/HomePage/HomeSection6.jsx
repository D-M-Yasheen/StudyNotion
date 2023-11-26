import React from 'react'
import { CTAButton } from './CTAButton'
import { FaArrowRight } from "react-icons/fa"
import instructor from "../../../assets/Images/Instructor.png"
import "./HomeSection6.css"

export const HomeSection6 = () => {
    return (
        <div className='w-4/5 my-[90px] mx-auto gap-24 flex
         lg:flex-row flex-col justify-center lg:items-center items-start'>

            <div className='w-4/5 lg:hidden flex flex-col items-start'>
                <h1 className='text-white text-4xl font-semibold'>

                    Become an

                    <span className='custom-highligter'>

                        {" instructor "}

                    </span>

                </h1>

                <p className='text-richblack-300 font-inter 
                            py-3 font-medium text-base'>

                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.

                </p>

            </div>


            <div className='lg:w-1/2 lg:mx-auto flex items-start lg:items-center justify-center'>

                <img src={instructor}
                    className="custom-shadow" />

            </div>

            <div className='lg:w-1/2 flex flex-col items-start '>

                <div className='hidden lg:flex flex-col'>
                    <h1 className='text-white text-4xl font-semibold'>

                        Become an

                        <span className='custom-highligter'>

                            {" instructor "}

                        </span>

                    </h1>

                    <p className='text-richblack-300 font-inter 
                                py-3 font-medium text-base'>

                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.

                    </p>
                </div>

                <div className='h-14'> </div>

                <div className='text-start'>
                    <CTAButton active={true} linkto={"/signup"}>

                        <div className='flex justify-center items-center gap-2'>

                            <p> Start Teaching Today </p>

                            <FaArrowRight />

                        </div>

                    </CTAButton>

                </div>
            </div>

        </div>
    )
}
