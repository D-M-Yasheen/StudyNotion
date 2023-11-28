import React from 'react'
import { AddCourseSteps } from './AddCourseSteps'
import { CourseTips } from './CourseTips'


export const AddCourseIndex = () => {
  return (

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
  )
}
