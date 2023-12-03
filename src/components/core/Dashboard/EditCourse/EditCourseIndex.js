import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { AddCourseSteps } from '../AddCourse/AddCourseSteps'
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseAPI';
import IconBtn from '../../../common/IconBtn';

export const EditCourseIndex = () => {
    const dispatch = useDispatch();    const { courseId } = useParams();
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);

    // console.log("course id ", courseId)

    useEffect(() => {
        const fetchCourse = async () => {

            setLoading(true)

            const result = await getFullDetailsOfCourse(courseId, token)

            if (result?.courseDetails) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails))

            }

            // console.log("course Details ", course)

            setLoading(false)
        }

        fetchCourse();
    }, [])

    return (
        <>
            {loading ?
                <div className='w-full h-screen flex justify-center items-center -translate-x-[5%]'>
                    <div className='custom-loader'></div>
                </div>
                :
                <div className='pl-[222px] fixed inset-0 z-[5] !mt-0 grid h-screen
                    w-screen place-items-center overflow-auto bg-transparent'>

                    <div className='w-11/12 mx-auto flex flex-col gap-10 my-24'>

                        {/* Heading */}
                        <div className='py-6 flex gap-3 justify-between'>



                            <h1 className=' text-richblack-5 font-medium text-3xl tracking-wider'>

                                Edit Course

                            </h1>

                            <NavLink to={"/dashboard/my-courses"}>
                                <IconBtn outline={true}
                                    onclick={() => 
                                        // {navigate("/dashboard/my-courses"),dispatch(setEditCourse(false))}
                                            
                                        dispatch(setEditCourse(false))}>
                                    <IoIosArrowBack />
                                    <p>Back To My Courses</p>
                                </IconBtn>
                            </NavLink>

                        </div>

                        <div className='w-full justify-center items-center flex gap-10'>

                            <div className='lg:w-2/3 '>
                                {
                                    course && <AddCourseSteps />
                                }
                            </div>

                        </div>

                    </div>
                </div>
            }
        </>
    )
}
