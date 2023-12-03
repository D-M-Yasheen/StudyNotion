import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CourseTag } from './CourseTag';
import { CourseThumbnail } from './CourseThumbnail';
import { CourseRequirement } from './CourseRequirement';
import { AiOutlineRight } from 'react-icons/ai';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';

import { useDispatch, useSelector } from 'react-redux';
import { COURSE_STATUS } from '../../../../../utils/constants'
import { setStep, setCourse } from "../../../../../slices/courseSlice"
import {
    fetchCourseCategories,
    addCourseDetails,
    editCourseDetails
} from '../../../../../services/operations/courseAPI'
import toast from 'react-hot-toast';
import IconBtn from '../../../../common/IconBtn';


export const CourseInfo = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {
            errors,
        }
    } = useForm();

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth)
    const { course, editCourse } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false)
    const [courseCategories, setCourseCategories] = useState([])



    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const categories = await fetchCourseCategories();

            if (categories.length > 0) {
                setCourseCategories(categories)
            }
            setLoading(false);
        }

        if (editCourse) {
            // console.log("data populated", JSON.parse(course?.instructions[0]))

            setValue("courseTitle", course.courseName)
            setValue("courseDescription", course.courseDescription)
            setValue("price", course.price)
            setValue("tag", JSON.parse(course?.tag[0]))
            setValue("whatYouWillLearn", course.whatYouWillLearn)
            setValue("courseCategory", course?.category?._id)
            setValue("instructions", JSON.parse(course?.instructions[0]))
            setValue("thumbnailImage", course.thumbnail)
        } 

        getCategories();

    }, [])

    const isFormUpdated = () => {
        const currentValues = getValues();


        if (currentValues.courseCategory._id !== course?.category?._id) {
            // console.log("update current course category value ---> ", currentValues?.courseCategory)
            // console.log("update saved course Category value ---> ", course?.category?._id)

        }


        if (
            currentValues.courseTitle !== course?.courseName ||
            currentValues.courseDescription !== course?.courseDescription ||
            currentValues.price !== course?.price ||
            currentValues.tag.toString() !== JSON.parse(course?.tag).toString() ||
            currentValues.whatYouWillLearn !== course?.whatYouWillLearn ||
            currentValues.courseCategory !== course?.category?._id ||
            currentValues.instructions.toString() !== JSON.parse(course?.instructions).toString() ||
            currentValues.thumbnailImage !== course?.thumbnail
        ) {
            return true
        }
        return false

    }



    const courseInfoHandler = async (data) => {

        if (editCourse) {
            // const currentValues = getValues()
            // console.log("changes after editing form values:", currentValues)
            // console.log("now course:", course)
            // console.log("Has Form Changed:", isFormUpdated())
            if (isFormUpdated()) {
                const currentValues = getValues()
                const formData = new FormData()
                // console.log(data)
                formData.append("courseId", course._id)
                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle)
                }
                if (currentValues.courseDescription !== course.courseDescription) {
                    formData.append("courseDescription", data.courseDescription)
                }
                if (currentValues.price !== course.price) {
                    formData.append("price", data.price)
                }
                if (currentValues.tag.toString() !== course.tag.toString()) {
                    formData.append("tag", JSON.stringify(data.tag))
                }
                if (currentValues.whatYouWillLearn !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.whatYouWillLearn)
                }
                if (currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory)
                }
                if (
                    currentValues.instructions.toString() !==
                    course.instructions.toString()
                ) {
                    formData.append(
                        "instructions",
                        JSON.stringify(data.instructions)
                    )
                }
                if (currentValues.thumbnailImage !== course.thumbnailImage) {
                    formData.append("thumbnailImage", data.thumbnailImage)
                }

                setLoading(true)

                const result = await editCourseDetails(formData, token)

                setLoading(false)

                if (result) {
                    dispatch(setStep(2))
                    dispatch(setCourse(result))
                }
            } else {
                toast.error("No changes made to the form")
            }
            return
        }

        const formData = new FormData(this)

        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseDescription)
        formData.append("price", data.price)
        formData.append("tag", JSON.stringify(data.tag))
        formData.append("whatYouWillLearn", data.whatYouWillLearn)
        formData.append("category", data?.courseCategory)
        formData.append("status", COURSE_STATUS.DRAFT)
        formData.append("instructions", JSON.stringify(data.instructions))
        formData.append("thumbnailImage", data.thumbnailImage)

        setLoading(true)

        const result = await addCourseDetails(formData, token)

        if (result) {
            dispatch(setStep(2))
            dispatch(setCourse(result))
        }

        setLoading(false)
    }

    return (
        <>
            <form onSubmit={handleSubmit(courseInfoHandler)}
                className='w-full flex flex-col items-end gap-10 my-8'>

                <div className='w-full flex flex-col p-6 items-start gap-6
                                rounded-lg border-richblack-700 bg-richblack-800'>

                    {/* Course Title */}
                    <label className='w-full flex flex-col items-start gap-2'>
                        <p className='text-richblack-5 text-sm font-normal'>
                            Course Title
                            <span className='text-pink-200 text-sm font-normal'>*</span>
                        </p>

                        <input
                            type='text'
                            placeholder='Enter course title'
                            className="w-full flex p-3 items-center gap-3 rounded-lg
                         bg-richblack-700 border-b-[2px] border-richblack-500"

                            {...register("courseTitle", {
                                required: {
                                    value: true,
                                    message: "**title is required",
                                },
                                maxLength: {
                                    value: 200,
                                    message: "**title is too long"
                                },
                                minLength: {
                                    value: 2,
                                    message: "**title is too short"
                                }
                            })} />
                        {
                            errors.courseTitle &&
                            <span className='text-pink-200 text-xs'>{errors.courseTitle.message}</span>
                        }
                    </label>

                    {/* Course Description */}
                    <label className='w-full flex flex-col items-start gap-2'>
                        <p className='text-richblack-5 text-sm font-normal'>
                            Course Short Description
                            <span className='text-pink-200 text-sm font-normal'>*</span>
                        </p>
                        <textarea rows="10"
                            placeholder='Enter Course Description'
                            className="w-full flex p-3 items-center gap-3 rounded-lg
                     bg-richblack-700 border-b-[2px] border-richblack-500"

                            {...register("courseDescription", {
                                required: {
                                    value: true,
                                    message: "**description is required"
                                }
                            })}></textarea>
                        {
                            errors.courseDescription &&
                            <span className='text-pink-200 text-xs'>{errors.courseDescription.message}</span>
                        }
                    </label>

                    {/* Price */}
                    <label className='relative w-full flex flex-col items-start gap-2'>
                        <p className='text-richblack-5 text-sm font-normal'>
                            Price
                            <span className='text-pink-200 text-sm font-normal'>*</span>
                        </p>
                        <input
                            type='tel'
                            placeholder='Enter course price'
                            className=" pl-10 w-full flex p-3 items-center gap-3 rounded-lg
                                        bg-richblack-700 border-b-[2px] border-richblack-500"
                            {...register("price", {
                                required: {
                                    value: true,
                                    message: "**price is required"
                                },
                                valueAsNumber: {
                                    value: Number,
                                    message: "**numerical character is allowed"
                                }
                            })} />
                        {
                            errors.coursePrice &&
                            <span className='text-pink-200 text-xs'>
                                {errors.coursePrice.message}
                            </span>
                        }
                        <div className='absolute top-[54%] left-3'>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="22"
                                height="22" viewBox="0 0 22 22" fill="none">
                                <path d="M13.75 7.5625L8.25 7.5625M13.75 10.3125H8.25M11 15.8125L8.25 13.0625H9.625C11.1438 13.0625 12.375 11.8313 12.375 10.3125C12.375 8.79372 11.1438 7.5625 9.625 7.5625M19.25 11C19.25 15.5563 15.5563 19.25 11 19.25C6.44365 19.25 2.75 15.5563 2.75 11C2.75 6.44365 6.44365 2.75 11 2.75C15.5563 2.75 19.25 6.44365 19.25 11Z" stroke="#585D69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg> */}
                            <HiOutlineCurrencyRupee fontSize={20} className='text-richblack-500'/>
                        </div>
                    </label>

                    {/* Course Category */}
                    <label className='w-full flex flex-col items-start gap-2'>
                        <p className='text-richblack-5 text-sm font-normal'>
                            Category
                            <span className='text-pink-200 text-sm font-normal'>*</span>
                        </p>
                        <select
                            className="w-full flex p-3 items-center gap-3 rounded-lg
                                    bg-richblack-700 border-b-[2px] text-richblack-5
                                    border-richblack-500 font-medium"
                            {...register("courseCategory", {
                                required: {
                                    value: true,
                                    message: "**category is required"
                                }
                            })}
                        >
                            <option hidden value={editCourse ? course?.category?._id : ""}
                                className='text-richblack-500 text-sm font-normal'>
                                {course?.category?.name ? course?.category.name : "Choose a Category"}
                            </option>

                            {!loading &&
                                courseCategories?.map((category, indx) => (
                                    <option key={indx} value={category?._id}>
                                        {category?.name}
                                    </option>
                                ))}
                        </select>
                        {
                            errors.courseCategory &&
                            <span className='text-pink-200 text-xs'>
                                {errors.courseCategory.message}
                            </span>
                        }
                    </label>

                    <CourseTag
                        name="tag"
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        getValues={getValues}
                    />

                    <CourseThumbnail
                        name="thumbnailImage"
                        label={'Course Thumbnail'}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        getValues={getValues}
                        editData={editCourse ? course?.thumbnail : null}
                    />


                    {/* What You Will Learn */}
                    <label className='w-full flex flex-col items-start gap-2'>
                        <p className='text-richblack-5 text-sm font-normal'>
                            Benefits of the course
                            <span className='text-pink-200 text-sm font-normal'>*</span>
                        </p>
                        <textarea rows="10"
                            placeholder='Enter Benefits of the course'
                            className="w-full flex p-3 items-center gap-3 rounded-lg
                     bg-richblack-700 border-b-[2px] border-richblack-500"

                            {...register("whatYouWillLearn", {
                                required: {
                                    value: true,
                                    message: "**benefits are required"
                                }
                            })}></textarea>
                        {
                            errors.courseBenefits &&
                            <span className='text-pink-200 text-xs'>
                                {errors.courseBenefits.message}
                            </span>
                        }
                    </label>

                    <CourseRequirement
                        name="instructions"
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        getValues={getValues}
                    />

                    {/* submit button */}
                    <div className="flex justify-end w-full gap-3">
                        {editCourse && (
                            <div className='w-fit'>
                                <IconBtn
                                    onclick={() => dispatch(setStep(2))}>
                                    Continue Without Saving
                                </IconBtn>
                            </div>
                        )}

                        <div className='w-fit'>
                            <IconBtn
                                outline={true}
                                type='Submit'>

                                <p >{editCourse ? "Save Changes" : "Next"}</p>
                                <AiOutlineRight />

                            </IconBtn>
                        </div>

                    </div>

                </div>

            </form>
        </>
    )
}




