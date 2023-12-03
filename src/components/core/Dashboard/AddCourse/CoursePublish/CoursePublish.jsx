import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { useForm } from 'react-hook-form';
import IconBtn from '../../../../common/IconBtn';
import { AiOutlineLeft } from 'react-icons/ai'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { useState } from 'react';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { useEffect } from 'react';
import { editCourseDetails } from '../../../../../services/operations/courseAPI';
import { useNavigate } from 'react-router-dom';

export const CoursePublish = () => {

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [check, setCheck] = useState(false)
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false
    )
    const goBack = () => {
        dispatch(setStep(2))
    }

    const goToCourses = () => {
        dispatch(resetCourseState())
        navigate("/dashboard/my-courses")
    }

    const onSubmit = async (data) => {
        if (course.status === COURSE_STATUS.PUBLISHED &&
            data.public === true ||
            course.status === COURSE_STATUS.DRAFT &&
            data.public === false) {

            // console.log("Not change in form")
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

        // console.log("EDIT COURSE DETAILS API is called....", data.public)

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
                        className='flex w-fit gap-2 items-center'
                    // onClick={() => setCheck((prev) => !prev)}
                    >
                        <input
                            type='checkbox'
                            id='public'
                            {...register("public")}
                            className='text-richblack-400 w-4 h-4'
                        />

                        {/* <div>
                        {check ?

                            <MdCheckBox fontSize={20}
                                className=' rounded-lg text-yellow-50'
                            />

                            :

                            <MdCheckBoxOutlineBlank fontSize={20}
                                className='text-richblack-400 rounded-lg '
                            />
                        }
                    </div> */}

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
