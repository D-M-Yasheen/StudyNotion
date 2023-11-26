import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice'
import { useForm } from 'react-hook-form';
import IconBtn from "../../../../common/IconBtn"
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
    updateSection,
    createSection,
} from '../../../../../services/operations/courseAPI'
import { NestedView } from './NestedView';
import { useEffect } from 'react';
import { AiOutlineRight, AiOutlineLeft, AiOutlinePlusCircle } from 'react-icons/ai'

export const CourseBuilder = () => {
    const { step, course, editCourse } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const [editSectionName, setEditSectionName] = useState(null)
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.auth)


    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true))
    }

    const goToNext = () => {
        if (course?.courseContent?.length === 0) {
            toast.error("Please add atleast one Section");
            return;
        }
        if (course.courseContent.some((section) => section.subSection.length === 0)) {
            toast.error("Please add atleast one lecture in each section");
            return;
        }
        //if everything is good
        dispatch(setStep(3));
    }

    const cancelEdit = () => {
        setEditSectionName(null);
        setValue('sectionName', '');
    }

    const onSubmit = async (data) => {
        setLoading(true)
        let result;


        if (editSectionName) {
            //we are editing the secgtion name
            result = await updateSection(
                {
                    sectionName: data.sectionName,
                    sectionId: editSectionName,
                    courseId: course._id,
                }, token
            )
        }
        else {
            result = await createSection({
                sectionName: data.sectionName,
                courseId: course._id,
            }, token)
        }

        if (result) {
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue('sectionName', '')
        }

        setLoading(false)
    }

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            cancelEdit();
            return;
        }

        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
    }

    useEffect(() => {
        console.log("UPDATED")
    }, [course])

    return (
        <div className='w-full flex flex-col p-6 gap-6 rounded-lg
                        border-richblack-700 bg-richblack-800'>

            <p className='w-full font-semibold text-2xl text-richblack-5'>
                Course Builder
            </p>

            <form onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-6'>

                <>

                    <label className='w-full flex flex-col items-start gap-2'>
                        <p className='text-richblack-5 text-sm font-normal'>
                            Section Name
                            <span className='text-pink-200 text-sm font-normal'>*</span>
                        </p>

                        <input
                            type='text'
                            placeholder='Add Section Name'
                            className="w-full flex p-3 items-center gap-3 rounded-lg
                         bg-richblack-700 border-b-[2px] border-richblack-500"

                            {...register("sectionName", {
                                required: {
                                    value: true,
                                    message: "**section name is required",
                                }
                            })} />
                        {
                            errors.sectionName &&
                            <span className='text-pink-200 text-xs'>{errors.sectionName.message}</span>
                        }
                    </label>

                </>

                <div className='flex items-end gap-6'>
                    <button className='flex items-center justify-center text-yellow-50
                    border-[1px] border-yellow-50 gap-2 rounded-lg lg:font-semibold
                    lg:text-lg md:text-base text-sm lg:py-3 md:py-2 py-1 lg:px-6 md:px-4 px-2'
                        type='Submit'>

                        <p>
                            {editSectionName ? 'Edit Section Name' : 'Create Section'}
                        </p>
                        <AiOutlinePlusCircle fontSize={20}/>

                    </button>

                    {
                        editSectionName && (
                            <button
                                type='button'
                                onClick={cancelEdit}
                                className=' underline text-richblack-400 text-sm'
                            >
                                Cancel Edit
                            </button>
                        )
                    }
                </div>
            </form>

            <>
                {course?.courseContent?.length > 0 && (
                    <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
                )}
            </>


            <div className='flex justify-end w-full gap-x-2'>

                <div className='w-fit'>
                    <IconBtn
                        onclick={goBack}>

                        <AiOutlineLeft />
                        <p>Back</p>

                    </IconBtn>
                </div>

                <div className='w-fit'>
                    <IconBtn
                        onclick={goToNext}
                        outline={true}>

                        <p>Next</p>
                        <AiOutlineRight />

                    </IconBtn>
                </div>

            </div>

        </div>
    )
}
