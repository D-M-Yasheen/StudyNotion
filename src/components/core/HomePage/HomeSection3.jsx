import React from 'react'
import { CTAButton } from './CTAButton'
import progress from "../../../assets/Images/Know_your_progress.png"
import compare from "../../../assets/Images/Compare_with_others.png"
import lesson from "../../../assets/Images/Plan_your_lessons.png"

export const HomeSection3 = () => {
    return (
        <section className='bg-richblack-5 w-full'>
            <div className='w-11/12 mx-auto flex flex-col items-center py-[90px]'>
                <div className='flex flex-col items-center lg:px-56 mx-auto'>
                    <h1 className='text-4xl font-semibold text-center'>
                        Your swiss knife for
                        <span className='custom-highligter'>
                            {" learning any language "}
                        </span>
                    </h1>

                    <p className='pt-3 text-base font-medium text-center font-inter'>
                        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                    </p>
                </div>

                <div className='self-stretch flex lg:flex-row
                         flex-col items-center space-y-14 mx-auto'>
                    <div className='lg:translate-x-28 lg:translate-y-0 translate-y-[120px]'>
                        <img src={progress} />
                    </div>

                    <div className='translate-x-0 translate-y-0'>
                        <img src={compare} />
                    </div>

                    <div className='lg:-translate-x-32 lg:translate-y-0 -translate-y-[160px]'>
                        <img src={lesson} />
                    </div>

                </div>

                <div className='flex items-center justify-center'>
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                </div>
            </div>
        </section>
    )
}
