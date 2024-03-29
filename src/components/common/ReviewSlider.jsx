import 'swiper/css';
import React from 'react';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useState } from 'react';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactStars from "react-rating-stars-component";
import { fetchAllReviewAndRatings } from '../../services/operations/courseAPI';

import { Autoplay } from 'swiper/modules';


export const ReviewSlider = () => {
    const [review, setReview] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        ; (async () => {
            setLoading(true)
            const result = await fetchAllReviewAndRatings()
            setReview(result)
            setLoading(false)
        })()
    }, [])


    return (
        <>
            {
                loading ?
                    <div className='h-16'>
                    </div>
                    :
                    <div className='w-4/5 mx-auto flex flex-col gap-20 my-32 text-richblack-5'>

                        <div className='text-center'>

                            <h1 className='text-4xl font-bold '>
                                Reviews from other learners
                            </h1>
                        </div>

                        <div>
                            {
                                review &&
                                <Swiper
                                    loop={true}
                                    slidesPerView={1}
                                    spaceBetween={30}
                                    autoplay={{
                                        delay: 2000,
                                        disableOnInteraction: false,
                                    }}
                                    modules={[Autoplay]}
                                    breakpoints={{
                                        400: {
                                            // width: 576,
                                            slidesPerView: 1,
                                        },
                                        640: {
                                            // width: 768,
                                            slidesPerView: 2,
                                        },
                                        990: {
                                            slidesPerView: 3,
                                        }
                                    }}
                                    className="mySwiper cursor-move">
                                    {
                                        review?.map((data, index) => (
                                            <SwiperSlide key={index}>
                                                <div className='flex flex-col gap-3 p-5
                                                        bg-richblack-800 justify-between 
                                                        rounded-lg max-w-[352px] '>

                                                    <div className=' select-none flex gap-3 
                                                    justify-start items-center'>

                                                        <div className='w-8 h-8'>
                                                            <img src={data?.user?.image}
                                                                className=' aspect-square rounded-full'
                                                            />
                                                        </div>

                                                        <div className='flex flex-col'>

                                                            <p className=' font-medium text-base'>
                                                                {data?.user?.firstName} {data?.user?.lastName}
                                                            </p>

                                                            <p className=' text-xs'>
                                                                {data?.course?.courseName}
                                                            </p>

                                                        </div>
                                                    </div>

                                                    <div>

                                                        <p className=' text-richblack-50 text-sm'>
                                                            {data?.review.split(" ").slice(0, 15).join(" ")}...
                                                        </p>

                                                    </div>

                                                    <div className=' select-none flex gap-2 justify-start items-center
                                                            text-yellow-100 font-semibold'>

                                                        <p>{data?.rating}.0</p>

                                                        <div>
                                                            <ReactStars
                                                                value={data?.rating}
                                                                edit={false} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            }
                        </div>
                    </div>
            }
        </>
    )
}
