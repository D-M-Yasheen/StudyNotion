import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { ViewSectionSideBar } from './ViewSectionSideBar'

export const ViewCourseSideBar = ({setReviewModal}) => {

    const navigate = useNavigate()

    
    const {
        courseEntireData,
        completedLectures,
        totalNoOfLectures
    } = useSelector((state) => state.viewCourse)


    return (
        <div className={`relative h-full w-full 
        flex flex-col items-start gap-3 py-[30px] transition-all duration-200 `}>

            <div>
                <div className='w-full flex flex-col gap-3 py-2 px-6 justify-between items-start'>

                    <button className='text-richblack-100 flex gap-1 items-center py-2'
                        onClick={() => navigate('/dashboard/enrolled-courses')}>
                        <BiArrowBack fontSize={24} />
                        <p>Back to Course</p>

                    </button>

                    <button
                        onClick={() => setReviewModal(true)}
                        className='py-2 px-4 bg-yellow-50 rounded-lg text-richblack-900 
                                text-sm text-center font-medium'>
                        Add Review
                    </button>

                </div>

                <div className='flex flex-col items-start px-6 py-2 gap-2'>

                    <p className=' text-richblack-25 font-bold text-lg'>
                        {courseEntireData.courseName}
                    </p>

                    <p className=' text-caribbeangreen-100 font-semibold text-sm'>
                        {`Completed : ${completedLectures.length || 0}/${totalNoOfLectures}`}
                    </p>
                </div>
            </div>

            <div className='mx-auto w-11/12 h-[1px] bg-richblack-600'></div>

            <div className='w-full overflow-y-scroll py-6 scroll-smooth'>
                <ViewSectionSideBar />
            </div>

            

        </div>
    )
}
