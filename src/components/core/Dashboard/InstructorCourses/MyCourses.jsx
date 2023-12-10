import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { TbPlus } from 'react-icons/tb'
import { useSelector } from 'react-redux'
import { CourseTable } from './CourseTable'
import IconBtn from '../../../common/IconBtn'
import { useNavigate } from 'react-router-dom'
import { CustomLoader } from '../../../common/CustomLoader'
import { fetchInstructorCourses } from '../../../../services/operations/courseAPI'

export const MyCourses = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.auth)

    const getInstructorCourses = async () => {
        setLoading(true)
        const result = await fetchInstructorCourses(token)
        if (result) {
            setCourses(result)
        }
        setLoading(false)
    }

    useEffect(() => {
        getInstructorCourses();
    }, [])

    return (
        <>
            {
                loading ? <CustomLoader /> :

                    <div className='w-11/12 mx-auto flex flex-col gap-10 my-10'>

                        {/* Heading */}
                        <div className='flex flex-wrap gap-2 justify-between py-6'>

                            <h1 className=' text-richblack-5 font-medium text-3xl tracking-wider'>

                                My Course

                            </h1>

                            <div>
                                <IconBtn text={"Add Course"}
                                    outline={true}
                                    onclick={() => navigate("/dashboard/add-course")}>
                                    <TbPlus fontSize={20} className='font-medium' />
                                </IconBtn>
                            </div>

                        </div>

                        {/* Instructor course table */}
                        <>
                            {courses.length > 0 &&
                                (
                                    loading ? <CustomLoader /> :
                                        <CourseTable courses={courses} setCourses={setCourses} />)
                            }
                        </>
                    </div>
            }
        </>
    )
}
