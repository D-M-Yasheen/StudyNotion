import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { avgRating } from '../../../../utils/avgRating'
import { RatingStars } from '../../../common/RatingStars'
import { removeFromCart } from '../../../../slices/cartSlice'

export const CartTable = ({ course }) => {

    const dispatch = useDispatch()
    const [avgRatingCount, setAvgRatingCount] = useState(0)
    useEffect(() => {
        const count = avgRating(course?.ratingAndReviews);
        setAvgRatingCount(count)
    }, [course])

    return (
        <section className='lg:w-full w-[20rem] flex gap-5 lg:flex-row md:flex-row 
        flex-col justify-between'>

            <div className='flex flex-wrap gap-6 lg:flex-row flex-col '>
                <img src={course.thumbnail} className='w-[12rem] rounded-lg' />

                <div className='flex flex-col gap-2'>
                    <p className=' items-stretch text-richblack-5 font-medium text-lg'>
                        {course?.courseName}
                    </p>
                    <p className=' items-stretch text-richblack-300 font-normal text-base'>
                        {course?.category?.name}
                    </p>
                    <div className='flex items-center gap-2 text-yellow-100 font-semibold text-base'>
                        {/* TODO */}
                        <p>{avgRatingCount}</p>
                        <RatingStars Review_Count={avgRatingCount || 0} />
                        <p className='text-richblack-400 font-normal'>{`(${course?.ratingAndReviews.length || 0} Ratings)`}</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-5'>

                <button onClick={() => dispatch(removeFromCart(course))}
                    className='w-fit flex items-center gap-2 p-3 text-pink-200 font-medium text-base
                    rounded-lg border-[1px] border-pink-700 bg-richblack-800'>
                    <RiDeleteBin6Line />
                    <p>Remove</p>
                </button>

                <p className='text-yellow-50 font-semibold text-2xl'>
                    Rs. {course?.price}
                </p>
            </div>
        </section>
    )
}
