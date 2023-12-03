import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { FaShareSquare } from 'react-icons/fa'
import IconBtn from '../../common/IconBtn';
import { AiFillCaretRight } from 'react-icons/ai'
import { FiCornerDownRight } from 'react-icons/fi'
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';


export const CourseDetailCard = ({ courseDetails, handlerBuyCourse, handleAddToCart }) => {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.profile)


    const handleShare = () => {
        copy(window.location.href)
        toast.success("link copied")
    }

    return (
        <section className='w-[22rem] lg:flex flex-col text-richblack-5
         bg-richblack-700 rounded-lg'>


            <div className='p-3'>
                <img src={courseDetails?.thumbnail}
                    className='w-full rounded-lg aspect-video' />

            </div>

            <div className='flex flex-col p-6 gap-4'>

                <p className=' items-stretch font-bold text-3xl'>
                    Rs. {courseDetails?.price}
                </p>

                <div className='flex flex-col gap-3'>


                    <IconBtn outline={true}
                        onclick={courseDetails?.studentsEnrolled.includes(user?._id) ? () => navigate("/dashboard/enrolled-courses") : handlerBuyCourse}>
                        {courseDetails?.studentsEnrolled.includes(user?._id) ? "Go To Course" : "Buy Now"}
                    </IconBtn>


                    {!courseDetails?.studentsEnrolled.includes(user?._id) &&
                        <IconBtn onclick={handleAddToCart}>
                            Add To Cart
                        </IconBtn>
                    }

                    <p className='text-richblack-25 text-center font-normal text-sm'>
                        30-Day Money-Back Guarantee
                    </p>
                </div>

                <div className='flex flex-col gap-2'>

                    <p className=' items-stretch text-base font-medium'>
                        This course includes:
                    </p>

                    <ul className='flex flex-col gap-2 text-caribbeangreen-100 '>

                        {
                            courseDetails?.instructions
                            &&
                            JSON.parse(courseDetails?.instructions).map((data, index) => (
                                <li key={index}
                                    className='w-full text-sm flex items-start gap-2'>
                                    <div className='p-1 h-fit'>
                                        <FiCornerDownRight fontSize={12}/>
                                    </div>
                                    <span>
                                        {data}
                                    </span>
                                </li>
                            ))
                        }




                    </ul>
                </div>

                <button className='flex gap-2 text-yellow-50 justify-center items-center'
                    onClick={handleShare}>
                    <FaShareSquare />
                    Share
                </button>

            </div>

        </section>
    )
}
