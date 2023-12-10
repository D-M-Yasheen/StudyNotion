import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import IconBtn from '../../../common/IconBtn';
import { IoIosArrowBack } from 'react-icons/io';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomLoader } from '../../../common/CustomLoader';
import { AddCourseSteps } from '../AddCourse/AddCourseSteps';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseAPI';

// className='pl-[222px] fixed inset-0 z-[40] !mt-0 grid h-screen
// w-screen place-items-center overflow-auto bg-transparent'

export const EditCourseIndex = () => {
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch(); const { courseId } = useParams();
    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true)
            const result = await getFullDetailsOfCourse(courseId, token)
            if (result?.courseDetails) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails))
            }
            setLoading(false)
        }
        fetchCourse();
    }, [])

    return (
        <>
            {loading ?
                <CustomLoader />
                :
                <div className='w-4/5 mx-auto flex flex-col gap-10 my-24'>

                    {/* Heading */}
                    <div className='py-6 flex flex-wrap gap-3 justify-between'>
                        <h1 className=' text-richblack-5 font-medium text-3xl tracking-wider'>
                            Edit Course
                        </h1>

                        <NavLink to={"/dashboard/my-courses"}>
                            <div>
                                <IconBtn outline={true}
                                    onclick={() => dispatch(setEditCourse(false))}>
                                    <IoIosArrowBack fontSize={20} />
                                    <p>Back To My Courses</p>
                                </IconBtn>
                            </div>
                        </NavLink>
                    </div>

                    <div className='w-full mx-auto justify-center items-center flex gap-10'>
                        {
                            course && <AddCourseSteps />
                        }
                    </div>
                </div>
            }
        </>
    )
}
