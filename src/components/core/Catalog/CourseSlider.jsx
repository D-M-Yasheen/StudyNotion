import { CourseCard } from './CourseCard'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

export const CourseSlider = ({ Courses }) => {
  return (
    <div>
      {
        Courses &&
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
            540: {
              // width: 768,
              slidesPerView: 2,
            },
            990: {
              slidesPerView: 3,
            }
          }}
          className="mySwiper cursor-move">
          {
            Courses?.map((course, index) => (
              <SwiperSlide key={index}>
                <CourseCard Course={course} />
              </SwiperSlide>
            ))
          }
        </Swiper>
      }
    </div>
  )
}
