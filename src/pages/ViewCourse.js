import { useState } from 'react'
import React, { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ReviewModal } from '../components/common/ReviewModal'
import { getFullDetailsOfCourse } from '../services/operations/courseAPI'
import { ViewCourseSideBar } from '../components/core/ViewCourse/ViewCourseSideBar'
import {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures
} from '../slices/viewCourseSlice'

export const ViewCourse = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams()
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const [reviewModal, setReviewModal] = useState(false)

  useEffect(() => {
    const fetchEntireCourseDetails = async () => {
      setLoading(true)
      const result = await getFullDetailsOfCourse(courseId, token)
      dispatch(setCourseSectionData(result?.courseDetails?.courseContent))
      dispatch(setEntireCourseData(result?.courseDetails))
      dispatch(setCompletedLectures(result?.completedVideos))
      let total = 0;
      result?.courseDetails?.courseContent?.forEach((section) => (
        total += section?.subSection.length || 0
      ))
      dispatch(setTotalNoOfLectures(total))
      setLoading(false)
    }
    if (token) {
      fetchEntireCourseDetails();
    }
  }, [courseId])
  return (
    <>
      {loading ?
        <div className='h-screen w-screen flex justify-center items-center'>
          <div className='custom-loader'></div>
        </div>
        :
        <div className='flex text-white overflow-x-hidden overflow-y-auto '>
          <div className='select-none h-[100vh] w-[20rem] bg-richblack-800 fixed'>
            <ViewCourseSideBar setReviewModal={setReviewModal} />
          </div>

          <div className='w-full flex justify-end '>
            <div className={`w-[calc(100vw-20rem)]`}>
              <Outlet />
            </div>
            {reviewModal && <ReviewModal setReviewModal={setReviewModal} />}
          </div>
        </div>
      }
    </>
  )
}
