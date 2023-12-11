import { CourseTips } from './CourseTips'
import { useDispatch } from 'react-redux'
import { AddCourseSteps } from './AddCourseSteps'
import React, { useEffect, useState } from 'react'
import { CustomLoader } from '../../../common/CustomLoader'
import { resetCourseState } from '../../../../slices/courseSlice'

export const AddCourseIndex = () => {
  const dispatch = useDispatch();
  dispatch(resetCourseState())
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <>
      {
        loading ?
          <CustomLoader />
          :
          <div className='w-11/12 mx-auto flex flex-col gap-10 my-10'>

            {/* Heading */}
            <div className='py-6'>
              <h1 className=' text-richblack-5 font-medium text-3xl tracking-wider'>
                Add Course
              </h1>
            </div>

            <div className='w-full flex gap-10'>
              <AddCourseSteps />
              <CourseTips />
            </div>
          </div>
      }
    </>
  )
}
