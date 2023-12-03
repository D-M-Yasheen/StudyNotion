import React, { useEffect } from 'react'
import { getFullDetailsOfCourse } from '../services/operations/courseAPI'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
} from '../slices/viewCourseSlice'
import { ViewCourseSideBar } from '../components/core/ViewCourse/ViewCourseSideBar'
import { ReviewModal } from '../components/common/ReviewModal'
import { useState } from 'react'

export const ViewCourse = () => {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false)
  const [loading, setLoading] = useState(false)




  useEffect(() => {
    const fetchEntireCourseDetails = async () => {

      setLoading(true)

      const result = await getFullDetailsOfCourse(courseId, token)
      // console.log("result we got ---> ", result)
      dispatch(setCourseSectionData(result?.courseDetails?.courseContent))
      dispatch(setEntireCourseData(result?.courseDetails))
      dispatch(setCompletedLectures(result?.completedVideos))

      let total = 0;
      result?.courseDetails?.courseContent?.forEach((section) => (
        total += section?.subSection.length || 0
      ))
      // console.log("total length ", total)
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
          <div className='custom-loader'>

          </div>
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
