import toast from 'react-hot-toast'
import React, { useEffect, useState } from 'react'
import { Footer } from '../components/common/Footer'
import { BiWorld, BiSolidPhone } from 'react-icons/bi'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'
import { ReviewSlider } from '../components/common/ReviewSlider'
import { ContantUsForm } from '../components/common/ContantUsForm'

export const ContactUs = () => {
    const [loading, setLoading] = useState(true);
    (() => {
        if (loading) {
            var toastId = toast.loading('Loading...')
        }
        else {
            toast.dismiss(toastId)
        }
    })();
    useEffect(() => {
        setLoading(false)
    }, [])
    return (
        <>
            {
                loading ? <div className='h-0'></div>
                    :
                    <>
                        <div className='w-10/12 flex lg:flex-row flex-col items-center 
                    lg:items-start justify-between mx-auto gap-10 mt-20'>

                            <div className='max-w-[600px] lg:w-2/5 h-fit flex flex-col gap-6 p-6
                 bg-richblack-800 rounded-3xl'>
                                <div className='w-full flex gap-[9px] p-3'>
                                    <div className='text-richblack-100'>
                                        <HiChatBubbleLeftRight fontSize={24} />
                                    </div>

                                    <div className='flex flex-col gap-[2px]'>
                                        <h1 className='text-richblack-5 text-lg font-semibold self-stretch'>
                                            Chat on us
                                        </h1>

                                        <p className='text-richblack-200 text-sm font-medium self-stretch'>
                                            Our friendly team is here to help.
                                        </p>

                                        <p className='text-richblack-200 text-sm font-semibold self-stretch'>
                                            @mail address
                                        </p>
                                    </div>

                                </div>

                                <div className='w-full flex gap-[9px] p-3'>

                                    <div className='text-richblack-100'>
                                        <BiWorld fontSize={24} />
                                    </div>

                                    <div className='flex flex-col gap-[2px]'>
                                        <h1 className='text-richblack-5 text-lg font-semibold self-stretch'>
                                            Visit us
                                        </h1>

                                        <p className='text-richblack-200 text-sm font-medium self-stretch'>
                                            Come and say hello at our office HQ.
                                        </p>

                                        <p className='text-richblack-200 text-sm font-semibold self-stretch'>
                                            Here is the location/ address
                                        </p>
                                    </div>

                                </div>

                                <div className='w-full flex gap-[9px] p-3'>

                                    <div className='text-richblack-100'>
                                        <BiSolidPhone fontSize={24} />
                                    </div>

                                    <div className='flex flex-col gap-[2px]'>

                                        <h1 className='text-richblack-5 text-lg font-semibold self-stretch'>
                                            Call us
                                        </h1>

                                        <p className='text-richblack-200 text-sm font-medium self-stretch'>
                                            Mon - Fri From 8am to 5pm
                                        </p>

                                        <p className='text-richblack-200 text-sm font-semibold self-stretch'>
                                            +123 456 7890
                                        </p>

                                    </div>

                                </div>


                            </div>

                            {/* contact form */}
                            <div className='lg:w-3/5 w-full p-[52px] flex flex-col gap-8
                        border-2 border-richblack-600 rounded-lg'>

                                <div className='flex flex-col gap-3'>
                                    <h1 className=' text-richblack-5 font-semibold text-4xl'>
                                        Got a Idea? We’ve got the skills. Let’s team up
                                    </h1>

                                    <p className='text-richblack-300 font-medium text-base'>
                                        Tall us more about yourself and what you’re got in mind.
                                    </p>
                                </div>

                                <ContantUsForm text={"Send Message"} />
                            </div>

                        </div>

                        {/* Review */}
                        <div>
                            <ReviewSlider />
                        </div>

                        <Footer />
                    </>
            }
        </>
    )
}
