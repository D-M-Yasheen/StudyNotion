import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../../../common/IconBtn';
import { useDispatch, useSelector } from 'react-redux'
import { COURSE_STATUS } from '../../../../../utils/constants';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { editCourseDetails } from '../../../../../services/operations/courseAPI';

export const CoursePublish = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const goBack = () => dispatch(setStep(2))
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.auth)
    const { course } = useSelector((state) => state.course);
    const { register, handleSubmit, setValue, getValues } = useForm()
    const goToCourses = () => {
        dispatch(resetCourseState())
        navigate("/dashboard/my-courses")
    }

    const onSubmit = async (data) => {
        if ((course.status === COURSE_STATUS.PUBLISHED &&
            data.public === true) ||
            (course.status === COURSE_STATUS.DRAFT &&
            data.public === false)) {
            goToCourses();
            return;
        }
        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = getValues("public") ?
            COURSE_STATUS.PUBLISHED :
            COURSE_STATUS.DRAFT;
        formData.append("status", courseStatus)
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        if (result) {
            goToCourses()
        }
        setLoading(false)
    }

    useEffect(() => {
        if (course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true)
        }
    }, [])

    return (

        <div className='h-screen '>
            <div className='h-fit flex flex-col p-6 gap-6 rounded-lg
                        border-richblack-700 bg-richblack-800'>

                <p className=' font-semibold text-2xl text-richblack-5'>
                    Publish Settings
                </p>

                <form onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col gap-6'>

                    <label htmlFor='public'
                        className='flex w-fit gap-2 items-center'>
                        <input
                            type='checkbox'
                            id='public'
                            {...register("public")}
                            className='text-richblack-400 w-4 h-4'/>

                        <span
                            className=' select-none text-base text-richblack-400 font-medium'>
                            Make this Course Public
                        </span>
                    </label>


                    <div className='flex justify-end w-full gap-x-2'>
                        <div>
                            <IconBtn
                                onclick={goBack}>
                                <AiOutlineLeft />
                                <p>Back</p>
                            </IconBtn>
                        </div>

                        <div className='w-fit'>
                            <IconBtn outline={true} text='Save Changes' type="Submit"></IconBtn>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
