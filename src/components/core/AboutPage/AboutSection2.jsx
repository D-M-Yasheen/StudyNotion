import React from 'react'
import FoundingStory from "../../../assets/Images/FoundingStory.png"

export const AboutSection2 = () => {
  return (
    <div className='w-10/12 flex lg:flex-row flex-col 
    items-center justify-center mx-auto gap-[98px] my-[90px]'>

      <div className='lg:w-[50%] w-full flex flex-col gap-6 items-end'>

        <div className='lg:w-[90%] w-full '>

          <h1 className='text-4xl font-semibold self-stretch
          leading-[44px] -tracking-[0.72px] custom-text-red'>
            Our Founding Story
          </h1>

        </div>

        <div className='lg:w-[90%] w-full flex flex-col gap-4'>

          <p className='text-richblack-300 text-base font-medium'>
            Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
          </p>

          <p className='text-richblack-300 text-base font-medium'>
            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
          </p>

        </div>

      </div>

      <div className='lg:w-[50%] w-full mx-auto flex 
      justify-center lg:justify-start items-center'>

        <div className='relative lg:w-[90%] w-fit mx-auto z-0'>

          <div className='absolute custom-shadow-red -z-10'></div>

          <img src={FoundingStory} />

        </div>

      </div>

    </div>
  )
}
