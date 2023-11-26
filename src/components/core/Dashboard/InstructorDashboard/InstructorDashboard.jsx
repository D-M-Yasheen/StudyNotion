import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchInstructorCourses } from '../../../../services/operations/courseAPI'
import { fetchInstructorDetails } from '../../../../services/operations/profileAPI'
import { InstructorCourseChart } from './InstructorCourseChart'
import { CourseCard } from './CourseCard'
import { useNavigate } from 'react-router-dom'
import { PiHandWavingFill } from 'react-icons/pi'
import WavingHand from '../../../../assets/Images/hand-waving.gif'



let statistics = [
    {
        heading: 'Total Courses',
        data: 0
    },
    {
        heading: 'Total Students',
        data: 0
    },
    {
        heading: 'Total Income',
        data: 0
    }
]

export const InstructorDashboard = () => {

    const navigate = useNavigate()
    const { token } = useSelector((state) => state.auth)
    const [instructorDetails, setInstructorDetails] = useState([])
    const [courseDetails, setCourseDetails] = useState([])
    const { user } = useSelector((state) => state.profile)
    const [statistics, setStatistics] = useState([])
    const [loading, setLoading] = useState([])

    useEffect(() => {

        ; (async () => {

            setLoading(true)

            const result = await fetchInstructorCourses(token);
            const instructorData = await fetchInstructorDetails(token)

            setCourseDetails([...result])
            setInstructorDetails([...(instructorData.data)])
            setStatistics([instructorData.data.length, instructorData.EntireStudentEnrolled, instructorData.EntireAmountEarned])

            // console.log("instructor data : ", instructorDetails)
            // console.log("instructor courses details : ", courseDetails)

            setLoading(false)

        })()

    }, [])

    return (

        <>
            {
            loading ?
                <div className='w-full h-screen flex justify-center items-center -translate-x-[5%]'>
                    <div className='custom-loader'></div>
                </div>
                :
                <div className='w-10/12 mx-auto flex flex-col gap-10 my-10'>

                    {/* Heading */}
                    <div className='w-full py-6'>

                        <h1 className=' text-richblack-5 font-medium text-3xl tracking-wider'>

                            Instructor Dashboard

                        </h1>

                    </div>


                    <div className='flex flex-col gap-4'>

                        <div className='flex flex-col gap-2'>

                            <h1 className='flex gap-2 items-center font-inter text-richblack-5 font-bold text-lg'>
                                <p>
                                    Hi! {user.firstName}
                                </p>

                                <PiHandWavingFill fontSize={20} className='text-yellow-50' />

                                {/* <img
                            src={WavingHand}
                            className='text-yellow-50 w-10 aspect-square' /> */}
                            </h1>

                            <p className=' text-richblack-100 text-sm'>
                                Let's start something new
                            </p>
                        </div>


                        {/* instructor chart and statistics */}
                        <section className='w-full flex lg:flex-row flex-col justify-between gap-4'>

                            <div className='w-full  bg-richblack-800 flex flex-col gap-5 p-6 rounded-lg'>

                                <p className='text-richblack-5 font-semibold text-lg'>
                                    Visualize
                                </p>

                                <div>
                                    <InstructorCourseChart instructorDetails={instructorDetails} />
                                </div>
                            </div>

                            <div className='lg:w-[16rem] w-full bg-richblack-800 flex flex-col gap-5 p-6 rounded-lg'>

                                <p className='text-richblack-5 font-semibold text-lg'>
                                    Statistics
                                </p>



                                <div className='flex lg:flex-col flex-row flex-wrap gap-5 justify-between'>
                                    <div className=''>
                                        <p className=' text-richblack-100 text-sm'>

                                            Total Courses
                                        </p>

                                        <p className=' text-richblack-50 font-semibold text-2xl'>
                                            {statistics[0]}
                                        </p>

                                    </div>

                                    <div>
                                        <p className=' text-richblack-100 text-sm'>

                                            Total Students
                                        </p>

                                        <p className=' text-richblack-50 font-semibold text-2xl'>
                                            {statistics[1]}
                                        </p>

                                    </div>

                                    <div>
                                        <p className=' text-richblack-100 text-sm'>

                                            Total Income
                                        </p>

                                        <p className=' text-richblack-50 font-semibold text-2xl'>
                                            Rs. {statistics[2]}
                                        </p>

                                    </div>
                                </div>


                            </div>

                        </section>


                        {/* Instructor any three course section */}
                        <section className='bg-richblack-800 flex flex-col gap-6 p-6 rounded-lg'>

                            <div className='flex justify-between'>

                                <p className='text-richblack-5 font-semibold text-lg'>
                                    Your Courses
                                </p>

                                <button className='px-2 py-1 capitalize text-yellow-50 font-medium text-xs'
                                    onClick={() => navigate('/dashboard/my-courses')}>
                                    view all
                                </button>
                            </div>

                            <div className={`grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4`}>
                                {
                                    courseDetails?.map((course, index) => (
                                        <div key={index}>
                                            {
                                                index < 3 &&
                                                <CourseCard course={course} />
                                            }
                                        </div>
                                    ))
                                }

                            </div>

                        </section>

                    </div>

                </div>
            }</>
    )
}
