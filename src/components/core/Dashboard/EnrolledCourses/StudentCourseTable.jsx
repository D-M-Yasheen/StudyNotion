import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LectureCompletionBar } from './LectureCompletionBar';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

export const StudentCourseTable = ({ coursesData }) => {
    const navigate = useNavigate()

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

                </Tr>
            </Thead>
            <Tbody>
                {
                    coursesData?.courses?.map((course, index) => (
                        <Tr key={index}
                            className={` ${index < coursesData.courses.length - 1 && 'border-b-[1px] border-richblack-400'}`}>
                            
                            <Td className='cursor-pointer'
                                onClick={() => 
                                navigate(`/course/${course?._id}/section/${course?.courseContent?.[0]._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]?._id}`)}>
                                
                                <div className='items-start max-w-[40rem] p-4 flex flex-wrap justify-start gap-6'>

                                    <img src={course.thumbnail} className='w-[14rem] rounded-lg' />
                                    
                                    <div>
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
                                <p className='flex lg:items-center md:items-center items-start font-medium text-sm  
                                            lg:justify-center md:justify-center justify-start text-richblack-100 
                                            lg:p-4 md:p-4 px-4 pb-4'>
                                    2hr 30min
                                </p>
                            </Td>

                            <Td>
                                <div className='flex lg:items-center md:items-center items-start 
                                            lg:justify-center md:justify-center justify-start 
                                            lg:p-4 md:p-4 px-4 pb-4'>
                                    <LectureCompletionBar
                                        course={course?.courseContent}
                                        courseId={course?._id}
                                        completedVideo={coursesData?.courseProgress}
                                    />
                                </div>
                            </Td>
                        </Tr>
                    ))
                }
            </Tbody>
        </Table>

    )
}


