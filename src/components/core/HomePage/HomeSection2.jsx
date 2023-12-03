import React from 'react'
import { CTAButton } from './CTAButton'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimeLineLogo from "../../../assets/Images/TimelineImage.png"

const timeLine = [
    {
        Logo: Logo1,
        Heading: "Leadership",
        Description: "Fully committed to the success company"
    },
    {
        Logo: Logo2,
        Heading: "Leadership",
        Description: "Fully committed to the success company"
    },
    {
        Logo: Logo3,
        Heading: "Leadership",
        Description: "Fully committed to the success company"
    },
    {
        Logo: Logo4,
        Heading: "Leadership",
        Description: "Fully committed to the success company"
    },
]

export const HomeSection2 = () => {
    return (
        <section className='bg-richblack-5 w-full'>
            <div className='w-11/12 mx-auto flex flex-col items-center py-[90px]'>

                {/* part-1 section 1*/}
                <div className='flex w-11/12 lg:flex-row flex-col justify-between gap-8 mb-14 mx-auto'>

                    <div className='lg:w-1/2'>
                        <p className='text-4xl font-semibold'>
                            Get the skills you need for a
                            <span className='custom-highligter'>
                                {" "}job that is in demand.
                            </span>
                        </p>
                    </div>

                    <div className='lg:w-1/2'>
                        <p className=' font-medium text-base font-inter mb-9 pr-12'>
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </p>

                        <CTAButton active={true} linkto={"/signup"} >
                            Learn More
                        </CTAButton>
                    </div>
                </div>

                {/* part-1 section 2*/}
                <div className='flex w-11/12 lg:flex-row flex-col justify-center gap-[76px] 
                    items-start lg:items-center mx-auto'>
                    <div className='flex flex-col'>
                        {
                            timeLine.map((element, index) => {
                                return (
                                    <div key={index}>
                                        <div className='flex py-4 px-3 gap-6'>
                                            <div className='bg-white rounded-full 
                                                flex items-center justify-center w-12 h-12'>

                                                <img src={element.Logo} width={24} height={24} />
                                            </div>

                                            <div>
                                                <p className='font-inter font-semibold text-lg'>
                                                    {element.Heading}
                                                </p>

                                                <p className='font-inter font-normal text-sm'>
                                                    {element.Description}
                                                </p>
                                            </div>
                                        </div>
                                        {
                                            timeLine.length - 1 > index &&

                                            <div className='mx-[34px] border-dotted border-l-2 border-richblack-100 w-[1px] h-[42px]'>

                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className='relative mx-auto'>
                        <div className='custom-shadow-blue'>
                            <img className=''
                                src={TimeLineLogo} />
                        </div>

                        <div className=' left-[50%] -translate-y-[50%] -translate-x-[50%]
                             flex absolute p-10 bg-caribbeangreen-700'>
                            <div className='flex gap-6'>
                                <h1 className=' text-white text-4xl font-bold font-inter'>
                                    10
                                </h1>

                                <p className=' text-caribbeangreen-300 text-sm font-medium font-inter'>
                                    YEARS <br />
                                    EXPERIENCES
                                </p>
                            </div>

                            <div className=' mx-10 w-[1px]  h-11 bg-[#037957]'></div>

                            <div className='flex gap-6'>
                                <h1 className=' text-white text-4xl font-bold font-inter'>
                                    250
                                </h1>

                                <p className=' text-caribbeangreen-300 text-sm font-medium font-inter'>
                                    TYPES OF <br />
                                    COURSES
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
