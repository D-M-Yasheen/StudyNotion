import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { avgRating } from '../../../utils/avgRating'
import { RatingStars } from '../../common/RatingStars';

export const CourseCard = ({ Course }) => {
  const [ratingCount, setRatingCount] = useState(0);

  useEffect(() => {

    const count = avgRating(Course?.ratingAndReviews)
    // console.log(Course?.ratingAndReviews)

    setRatingCount(count)

  }, [Course])

  return (
    <Link to={`/course/${Course?._id}`}>

      <div className='w-full flex flex-col gap-5 select-none rounded-xl
      px-3 py-4 hover:bg-richblack-800 transition-all duration-200'>

        <img src={Course.thumbnail} className='w-full aspect-video rounded-lg' />

        <div className='flex flex-col gap-2'>

          <p className=' items-stretch text-richblack-5 text-base font-medium font-inter'>
            {Course.courseName}
          </p>

          <p className=' items-stretch text-richblack-300 text-base font-normal font-inter'>
            {`${Course?.instructor?.firstName} ${Course?.instructor?.lastName}`}
          </p>

          <div className='flex lg:flex-row flex-col gap-2'>


            <div className='flex gap-2 text-yellow-100 font-semibold text-base
                    items-center justify-start'>

              <p>{`${ratingCount || 0}.0`}</p>
              <RatingStars Review_Count={ratingCount || 0} />
            </div>

            <p className=' items-stretch text-richblack-300 text-base font-normal font-inter'>
              {Course?.ratingAndReviews?.length} Reviews
            </p>

          </div>

          <p className=' items-stretch text-richblack-5 text-xl font-semibold font-inter'>
            Rs. {Course.price}
          </p>
        </div>

      </div>

    </Link>
  )
}
