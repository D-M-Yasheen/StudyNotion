import React from 'react'

export const CourseCard = ({ course }) => {
    return (
        <div className='w-full flex flex-col gap-3'>
            <div>
                <img
                    src={course?.thumbnail}
                    className=' w-full aspect-video rounded-lg'/>
            </div>

            <div className='flex flex-col'>
                <p className=' capitalize'>
                    {course?.courseName}
                </p>
                <div className='flex gap-2 text-richblack-100 text-xs'>
                    <p>{course?.studentsEnrolled?.length} students</p>
                    <p>|</p>
                    <p>Rs. {course?.price}</p>
                </div>
            </div> 
        </div>
    )
}
