import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { StudentCourseTable } from './StudentCourseTable'
import { fetchEnrolledStudentCourses } from '../../../../services/operations/profileAPI'

export const EnrolledCourse = () => {
  const [loading, setLoading] = useState(false)
  const [coursesData, setCoursesData] = useState([])
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    const getStudentEnrolledCourses = async () => {

      setLoading(true)
      const result = await fetchEnrolledStudentCourses(token)
      if (result) {
        setCoursesData(result)
      }
      setLoading(false)
    }
    if (token) {
      getStudentEnrolledCourses();
    }
  }, [])

  return (
    <>
      {
        loading ?
          <div className='w-screen h-screen flex justify-center items-center -translate-x-[10%]'>
            < div className='custom-loader' >
            </div >
          </div>
          :
          <div className='w-11/12 mx-auto flex flex-col gap-10 my-10'>

            {/* Heading */}
            <div className='flex gap-2 justify-between py-6'>
              <h1 className=' text-richblack-5 font-medium text-3xl tracking-wider'>
                Enrolled Courses
              </h1>
            </div>

            {/* Instructor course table */}
            <>
              {
                coursesData.length <= 0 ?
                  <div className='flex justify-center items-center 
                          text-richblack-100 text-xl text-center'>
                    You have not enrolled in any course yet.
                  </div>
                  :
                  <>
                    {
                      loading ? <div className='custom-loader'></div> :
                        <StudentCourseTable coursesData={coursesData} setCoursesData={setCoursesData} />
                    }
                  </>
              }
            </>
          </div>
      }
    </>
  )
}
