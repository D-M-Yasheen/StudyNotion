import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';
import IconBtn from './IconBtn';
import { createRating } from '../../services/operations/courseAPI';
import { useParams } from 'react-router-dom';

export const ReviewModal = ({ setReviewModal }) => {

    const { register, reset, setValue, getValues, handleSubmit, formState: { errors } } = useForm()
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const { courseEntireData } = useSelector((state) => state.viewCourse)

    const { courseId } = useParams();

    const onSubmit = async (data) => {
        console.log("review value : ", data.courseReview)
        console.log("rating value : ", data.courseRating)

        if (token) {

            const result = await createRating({
                rating: data.courseRating,
                review: data.courseReview,
                courseId: courseEntireData?._id

            }, token)

            console.log("rating result ", result)

        }

        setReviewModal(false)

    }

    const ratingChanged = (newRating) => {
        setValue('courseRating', newRating)
    };

    useEffect(() => {
        setValue('courseReview', '')
        setValue('courseRating', 0)
    }, [])

    return (
        <div className='fixed inset-0 z-[100] !mt-0 grid h-screen
        w-screen place-items-center overflow-auto transition-all duration-200
        bg-white bg-opacity-10 backdrop-blur-[1px]'>

            <div className='w-10/12 max-w-[40rem] rounded-lg 
            bg-richblack-800 border-[1px] border-richblack-600'>

                <div className='flex px-6 py-4 items-center gap-3 
                justify-between border-b-[1px] border-richblack-300 
                bg-richblack-700 rounded-t-lg text-richblack-50'>

                    <p className=' tracking-wide text-richblack-5 font-semibold text-lg'>
                        Add Review
                    </p>

                    <button onClick={() => setReviewModal(false)}>
                        <RxCross2 fontSize={24} />
                    </button>

                </div>



                <div className='p-8 flex flex-col gap-6'>
                    <div className='w-full flex gap-3 items-center justify-center'>

                        <div>
                            <img src={user?.image} className='w-[3.5rem] aspect-square rounded-full' />
                        </div>

                        <div className='flex flex-col gap-1 items-start'>

                            <p>{`${user?.firstName} ${user?.lastName}`}</p>
                            <p>Posting Publicly</p>

                        </div>

                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}
                        className='flex flex-col gap-6'>

                        <div className='mx-auto'>
                            <ReactStars

                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                activeColor="#ffd700"

                            />
                        </div>

                        <label htmlFor='courseReview'
                            className='w-full flex flex-col items-start gap-2'>
                            <p className='text-richblack-5 text-sm font-normal'>
                                Add Your Experience
                                <span className='text-pink-200 text-sm font-normal'>*</span>
                            </p>

                            <textarea
                                id="courseReview"
                                placeholder='Share Details of your own experience for this course'
                                className="w-full flex p-3 items-center gap-3 rounded-lg
                                            bg-richblack-700 border-b-[2px] border-richblack-500"
                                {...register("courseReview", {
                                    required: {
                                        value: true,
                                        message: "**this field is required"
                                    }
                                })}></textarea>
                            {
                                errors.courseReview &&
                                <span className='text-pink-200 text-xs'>{errors.courseReview.message}</span>
                            }
                        </label>



                        <div className='flex justify-end gap-5'>

                            <div>
                                <IconBtn
                                    onclick={() => setReviewModal(false)}>
                                    Cancel
                                </IconBtn>
                            </div>

                            <div>
                                <IconBtn
                                    outline={true}
                                    type='submit'>
                                    Submit
                                </IconBtn>
                            </div>

                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}