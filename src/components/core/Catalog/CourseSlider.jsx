import { CourseCard } from './CourseCard'
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


export const CourseSlider = ({ Courses }) => {

  // console.log("Course in Course Slider : ", Courses)

  return (
    <div>
      {
        Courses &&
        <Swiper 
        loop={true}
        slidesPerView={3}
        spaceBetween={24}
        breakpoints={{
          1024:{slidesPerView:3}
        }}>
          {
            Courses?.map((course, index) => (
              <SwiperSlide key={index}>
                  <CourseCard Course={course}/>
              </SwiperSlide>
            ))
          }
        </Swiper>
      }
    </div>
  )
}
