import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { TbPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses } from '../../../../services/operations/courseAPI'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'
import { CourseTable } from './CourseTable'

export const MyCourses = () => {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth)

    const getInstructorCourses = async () => {
        setLoading(true)
        // console.log("token ", token)
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
                loading ?
                    <div className='w-full h-screen flex justify-center items-center -translate-x-[5%]'>
                        <div className='custom-loader'></div>
                    </div>
                    :

                    <div className='w-11/12 mx-auto flex flex-col gap-10 my-10'>

                        {/* Heading */}
                        <div className='flex gap-2 justify-between py-6'>

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
                                    loading ? <div className='custom-loader'></div> :
                                        <CourseTable courses={courses} setCourses={setCourses} />)
                            }
                        </>

                    </div>
            }
        </>
    )
}
