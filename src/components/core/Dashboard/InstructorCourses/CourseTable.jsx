import React, { useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { AiFillCheckCircle, AiFillClockCircle } from 'react-icons/ai'
import { BiRupee } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { MdEdit } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../../common/Modal';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseAPI';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../../services/formatDate';

export const CourseTable = ({ courses, setCourses }) => {


    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const [confirmationModal, setConfirmationModal] = useState(null)
    const navigate = useNavigate()

    // console.log("instructor my course details : ", courses)

    const deleteCourseHandler = async (courseId) => {

        setLoading(true);

        const result = await deleteCourse({ courseId }, token);

        if (result) {
            // console.log("deleted course result : ", result)
            const ans = await fetchInstructorCourses(token);
            // console.log("ans : ", ans)
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
                                                ${course.status === 'Published' ? ' text-yellow-50' : ' text-pink-50'} `}>

                                                {course.status === 'Published' ?
                                                    <AiFillCheckCircle fontSize={16} /> :
                                                    <AiFillClockCircle fontSize={16} />}
                                                {course.status}
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
                                    <div className='flex items-center justify-center text-richblack-100 text-sm font-medium p-4'>
                                        <BiRupee fontSize={16} />
                                        {course?.price}

                                    </div>
                                </Td>

                                <Td>
                                    <div className='flex items-center justify-center gap-2 p-4 text-richblack-400 '>

                                        {/* Edit Button */}
                                        <button
                                            disabled={loading}
                                            onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}>

                                            <MdEdit fontSize={22} />
                                        </button>

                                        {/* Delete Button */}
                                        <button disabled={loading}
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

{/*
<Table className='flex '>

<Thead >
    <Tr className='lg:flex-row flex flex-col'>
        <Th className='text-start p-4 w-max-[48rem]
        text-richblack-100 font-normal text-sm uppercase'>
            {"Courses"}
        </Th>
        <Th className='text-start p-4 w-fit
        text-richblack-100 font-normal text-sm uppercase'>
            {"Duration"}
        </Th>

        <Th className='text-start p-4 w-fit
        text-richblack-100 font-normal text-sm uppercase'>
            {"Price"}
        </Th>
        <Th className='text-start p-4 w-fit
        text-richblack-100 font-normal text-sm uppercase'>
            {"Action"}
        </Th>
    </Tr>
</Thead>

<Tbody>
    {
        courses.length === 0 ?
            <div>
                No Course Found
            </div> :

            courses?.map((data) => (
                <Tr key={data?._id}
                className='flex lg:flex-row flex-col'>
                    <Td>
                        <div className='flex w-max-[48rem] p-4 gap-6'>

                            <img src={data?.thumbnail}
                                className='w-[14rem] rounded-lg' />
                            <div className='w-fit'>
                                <h1 className=' font-inter text-richblack-5 text-xl font-semibold'>
                                    {data?.courseName}:</h1>

                                <p className='pt-2 text-sm font-normal whitespace-wrap 
                                text-richblack-100 text-ellipsis overflow-hidden 
                                 '>
                                    {data?.courseDescription}
                                </p>

                                <p className=' py-3 text-richblack-25 font-medium text-xs'>
                                    Created: {"April 27, 2023 | 05:15 PM"}
                                </p>

                                <div className='w-fit py-1 px-[6px] flex justify-center items-center gap-[6px] 
                                rounded-full bg-richblack-700'>
                                    {
                                        data?.status === "Published" ?
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99961 14.3996C11.5342 14.3996 14.3996 11.5342 14.3996 7.99961C14.3996 4.46499 11.5342 1.59961 7.99961 1.59961C4.46499 1.59961 1.59961 4.46499 1.59961 7.99961C1.59961 11.5342 4.46499 14.3996 7.99961 14.3996ZM11.0849 6.55251C11.2798 6.28452 11.2205 5.90927 10.9525 5.71437C10.6845 5.51946 10.3093 5.57871 10.1144 5.84671L7.32736 9.67884L5.82387 8.17534C5.58956 7.94103 5.20966 7.94103 4.97535 8.17534C4.74103 8.40966 4.74103 8.78956 4.97535 9.02387L6.97535 11.0239C7.09942 11.148 7.2716 11.2115 7.44654 11.1978C7.62148 11.184 7.78164 11.0944 7.88485 10.9525L11.0849 6.55251Z" fill="#FFD60A" />
                                                </svg>
                                            </>
                                            :
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99961 14.3996C11.5342 14.3996 14.3996 11.5342 14.3996 7.99961C14.3996 4.46499 11.5342 1.59961 7.99961 1.59961C4.46499 1.59961 1.59961 4.46499 1.59961 7.99961C1.59961 11.5342 4.46499 14.3996 7.99961 14.3996ZM8.74961 3.99961C8.74961 3.5854 8.41382 3.24961 7.99961 3.24961C7.5854 3.24961 7.24961 3.5854 7.24961 3.99961V7.99961C7.24961 8.41382 7.5854 8.74961 7.99961 8.74961H11.1996C11.6138 8.74961 11.9496 8.41382 11.9496 7.99961C11.9496 7.5854 11.6138 7.24961 11.1996 7.24961H8.74961V3.99961Z" fill="#F79CB0" />
                                                </svg>
                                            </>
                                    }
                                    <p className={`${data?.status === 'Published' ? 'text-yellow-100' : 'text-pink-50'} text-xs font-medium`} >
                                        {data?.status}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </Td>

                    <Td>
                        <p className='flex items-center justify-center
                         text-richblack-100 text-sm font-medium p-4'>
                            2hr 30min
                        </p>
                    </Td>

                    <Td>
                        <div className='flex items-center justify-center
                         text-richblack-100 text-sm font-medium p-4'>
                            <BiRupee fontSize={16} />
                            {data?.price}

                        </div>
                    </Td>

                    <Td>
                        <div className='flex items-center justify-center gap-2 p-4'>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                    <path d="M2.96389 16.2376L1.57592 19.7075C1.39634 20.1565 1.84188 20.602 2.29085 20.4224L5.76077 19.0345C6.31403 18.8132 6.81657 18.4818 7.23792 18.0605L19.249 6.04986C20.1603 5.13859 20.1603 3.66113 19.249 2.74986C18.3378 1.83859 16.8603 1.83859 15.949 2.74986L3.93792 14.7605C3.51657 15.1818 3.18519 15.6844 2.96389 16.2376Z" fill="#6E727F" />
                                </svg>
                            </button>

                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                    <g clip-path="url(#clip0_11167_21031)">
                                        <path d="M21.0827 2.75H16.4994V2.29167C16.4994 1.68388 16.2579 1.10098 15.8281 0.671214C15.3984 0.241443 14.8155 0 14.2077 0L7.79102 0C7.18323 0 6.60033 0.241443 6.17056 0.671214C5.74079 1.10098 5.49935 1.68388 5.49935 2.29167V2.75H0.916016V5.5H2.74935V19.25C2.74935 19.9793 3.03908 20.6788 3.55481 21.1945C4.07053 21.7103 4.77 22 5.49935 22H16.4994C17.2287 22 17.9282 21.7103 18.4439 21.1945C18.9596 20.6788 19.2493 19.9793 19.2494 19.25V5.5H21.0827V2.75ZM16.4994 19.25H5.49935V5.5H16.4994V19.25Z" fill="#6E727F" />
                                        <path d="M10.084 8.25H7.33398V16.5H10.084V8.25Z" fill="#6E727F" />
                                        <path d="M14.666 8.25H11.916V16.5H14.666V8.25Z" fill="#6E727F" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_11167_21031">
                                            <rect width="22" height="22" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                        </div>
                    </Td>

                </Tr>
            ))
    }
</Tbody>
</Table>
*/}
