import React, { useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { BiRupee } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../../common/Modal';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri'
import { formatDate } from '../../../../services/formatDate';
import { AiFillCheckCircle, AiFillClockCircle } from 'react-icons/ai'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseAPI';
import { setStep } from '../../../../slices/courseSlice';

export const CourseTable = ({ courses, setCourses }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const [confirmationModal, setConfirmationModal] = useState(null)
    const deleteCourseHandler = async (courseId) => {
        setLoading(true);
        const result = await deleteCourse({ courseId }, token);
        if (result) {
            const ans = await fetchInstructorCourses(token);
            setCourses(ans);
        }
        setConfirmationModal(null)
        setLoading(false)
    }

    return (
        <div>
            <Table>
                <Thead className='lg:border-b-[1px] md:border-b-[1px] sm:border-b-[1px] border-richblack-300'>
                    <Tr>
                        <Th className='text-start p-4 text-richblack-100 font-normal text-sm uppercase
                         max-w-[40rem] '>
                            Course
                        </Th>
                        <Th className='text-center p-4 text-richblack-100 font-normal text-sm uppercase'>
                            Duration
                        </Th>
                        <Th className='text-center p-4 text-richblack-100 font-normal text-sm uppercase'>
                            Price
                        </Th>
                        <Th className='text-center p-4 text-richblack-100 font-normal text-sm uppercase'>
                            Action
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        courses?.map((course) => (
                            <Tr key={course._id}>

                                <Td>
                                    <div className=' max-w-[40rem] p-4 flex lg:flex-row flex-col justify-start lg:items-center items-start gap-6'>

                                        <img src={course.thumbnail} className='w-[14rem] rounded-lg' />

                                        <div className='w-full'>
                                            <p className='font-inter text-richblack-5 lg:text-xl md:text-lg text-base font-semibold'>
                                                {course.courseName}
                                            </p>

                                            <p className='pt-2 text-sm font-normal whitespace-wrap 
                                        text-richblack-100 text-ellipsis overflow-hidden '>
                                                {`${course.courseDescription.slice(0, 75)}... `}
                                            </p>

                                            <p className=' py-3 text-richblack-25 font-medium text-xs'>
                                                Created: {formatDate(course.createAt)}
                                            </p>


                                            <p className={`w-fit py-1 px-[6px] flex justify-center items-center gap-[6px] 
                                                rounded-full bg-richblack-700 text-xs 
                                                ${course.status === 'Published' ? 'text-yellow-50' : 'text-pink-300'}`}>

                                                {course.status === 'Published' ?
                                                    <AiFillCheckCircle fontSize={16} /> :
                                                    <AiFillClockCircle fontSize={16} />}
                                                {course.status}
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
                                    <div className='flex lg:items-center md:items-center items-start font-medium text-sm  
                                            lg:justify-center md:justify-center justify-start text-richblack-100 
                                            lg:p-4 md:p-4 px-4 pb-4'>
                                        <BiRupee fontSize={16} />
                                        {course?.price}

                                    </div>
                                </Td>

                                <Td>
                                    <div className='flex lg:items-center md:items-center items-start font-medium text-sm  
                                            lg:justify-center md:justify-center justify-start text-richblack-100 
                                            lg:p-4 md:p-4 px-4 pb-4 gap-2'>
                                        {/* Edit Button */}
                                        <button className=' text-richblack-5'
                                            disabled={loading}
                                            onClick={() => {
                                                navigate(`/edit-course/${course._id}`)
                                                dispatch(setStep(1))
                                            }}>

                                            <MdEdit fontSize={22} />
                                        </button>

                                        {/* Delete Button */}
                                        <button disabled={loading}
                                            className='text-pink-300'
                                            onClick={() => setConfirmationModal(
                                                {
                                                    text1: "Do you want to delete this course?",
                                                    text2: "All the data related to this course will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () => deleteCourseHandler(course._id),
                                                    btn2Handler: () => setConfirmationModal(null),

                                                })}>

                                            <RiDeleteBin6Line fontSize={22} />
                                        </button>
                                    </div>
                                </Td>

                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
            {confirmationModal && <Modal modalData={confirmationModal} />}
        </div>
    )
}
