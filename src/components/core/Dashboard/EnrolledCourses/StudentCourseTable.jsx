import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { TbFileCheck } from 'react-icons/tb'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { LectureCompletionBar } from './LectureCompletionBar';


export const StudentCourseTable = ({ coursesData, setCoursesData }) => {
    const navigate = useNavigate()

    const [showDropDown, setShowDropDown] = useState(false)


    const handleProgress = (course) => {


        let totalLecture = 0
        course.forEach((section) => (
            totalLecture += section.subSection.length
        ))

        console.log("total lecture : ", totalLecture)

        // setProgress(totalLecture)
    }


    useEffect(() => {
        // setProgress(coursesData.courseProgress?.[0]?.completedVideos?.length)
    }, [])

    return (

        <Table>
            <Thead className='bg-richblack-700'>
                <Tr>
                    <Th className='text-start p-4 text-richblack-100 font-normal text-sm uppercase
                         max-w-[40rem] '>
                        Course
                    </Th>
                    <Th className='text-center p-4 text-richblack-100 font-normal text-sm uppercase'>
                        Duration
                    </Th>
                    <Th className='text-center p-4 text-richblack-100 font-normal text-sm uppercase'>
                        Progress
                    </Th>

                    <Th className='text-center p-4 text-richblack-100 font-normal text-sm uppercase'>

                    </Th>

                </Tr>
            </Thead>
            <Tbody>
                {
                    coursesData?.courses?.map((course, index) => (

                        // <NavLink 
                        // to={`/course/${course?._id}/section/${course?.courseContent?.[0]._id}/sub-section/${course?.courseContent?.subSection?.[0]?._id}`}>
                        <Tr key={index}
                            className={` ${index < coursesData.courses.length - 1 ?
                                'border-b-[1px] border-richblack-400' : ''}`}>

                            <Td className='cursor-pointer'
                                onClick={() => navigate(
                                    `/course/${course?._id}/section/${course?.courseContent?.[0]._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]?._id}`
                                )}
                            >
                                <div className='items-start max-w-[40rem] p-4 flex lg:flex-row flex-col justify-start gap-6'>

                                    <img src={course.thumbnail} className='w-[14rem] rounded-lg' />

                                    <div className='w-full'>
                                        <p className='font-inter text-richblack-5 lg:text-xl md:text-lg text-base font-semibold'>
                                            {course.courseName}
                                        </p>

                                        <p className='pt-2 text-sm font-normal whitespace-wrap 
                                                    text-richblack-100 text-ellipsis overflow-hidden '>
                                            {course.courseDescription}
                                        </p>

                                    </div>
                                </div>
                            </Td>

                            <Td>
                                <p className='flex items-center justify-center text-richblack-100 text-sm font-medium p-4'>
                                    2hr 30min
                                </p>
                            </Td>


                            <Td>
                                {/* {handleProgress(course?.courseContent)} */}
                                {/* <div className='flex flex-col items-center justify-center p-4 gap-2'>

                                    <p className='text-richblack-100 text-sm font-medium '>
                                        {`Progress:${progress || 0}%`}
                                    </p>

                                    <ProgressBar completed={progress}
                                        height={8}
                                        width={100}

                                        baseBgColor='#2C333F'
                                        isLabelVisible={false}

                                        bgColor={`${progress <= 40 ? '#E7C009'
                                            : progress <= 80 ? '#47A5C5'
                                                : '#06D6A0'}`}

                                    />



                                </div> */}

                                <LectureCompletionBar
                                    course={course?.courseContent}
                                    courseId ={course?._id}
                                    completedVideo={coursesData?.courseProgress}
                                />
                            </Td>

                            <Td>
                                <button onClick={() => setShowDropDown(!showDropDown)}
                                    className='relative flex flex-col items-center justify-center p-4 gap-2
                                text-richblack-200'>

                                    <BsThreeDotsVertical fontSize={24} />


                                </button>
                            </Td>

                        </Tr>
                        // </NavLink>
                    ))
                }
            </Tbody>
        </Table>

    )
}


