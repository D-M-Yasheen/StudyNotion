import React from 'react'
import { HighLightText } from '../../common/HighLightText'
import aboutus1 from "../../../assets/Images/aboutus1.webp"
import aboutus2 from "../../../assets/Images/aboutus2.webp"
import aboutus3 from "../../../assets/Images/aboutus3.webp"

export const AboutHeader = () => {
  return (
    <>
      <div className='relative pt-20 lg:pb-64 md:pb-64 pb-36 w-full mx-auto 
              flex flex-col gap-[52px] bg-richblack-700'>

        {/* Upper Heading Section  */}

        <div className='lg:w-8/12 w-full flex flex-col mx-auto px-[5%] space-y-4'>

          <p className='text-richblack-5 lg:text-center md:text-center text-start font-semibold text-4xl'>

            Driving Innovation in Online Education for a
            <HighLightText>
              Brighter Future
            </HighLightText>
          </p>

          <p className='text-richblack-300 font-medium text-base lg:text-center md:text-center text-start'>
            Studynotion is at the forefront of driving innovation in online education.
            We're passionate about creating a brighter future by offering cutting-edge
            courses, leveraging emerging technologies, and nurturing a vibrant learning
            community.
          </p>

        </div>

        {/* Image Section */}
        <div className='absolute w-10/12 flex justify-center items-center
                lg:gap-10 md:gap-5 gap-3 bottom-0 left-[50%] translate-x-[-50%] 
                translate-y-[35%]'>

          <img src={aboutus1}
            className="w-1/3 aspect-auto" />

          <img src={aboutus2}
            className="w-1/3 aspect-auto" />

          <img src={aboutus3}
            className="w-1/3 aspect-auto" />

        </div>

      </div>

    </>
  )
}
