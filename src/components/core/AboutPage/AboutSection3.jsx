import React from 'react'

export const AboutSection3 = () => {
  return (
    <div className='w-10/12 py-24 gap-24 flex lg:flex-row flex-col mx-auto'>

      <div className='lg:w-[50%] w-full flex flex-col gap-6 items-end'>

        <div className='lg:w-[90%] w-full '>

          <h1 className='text-4xl font-semibold self-stretch
          leading-[44px] -tracking-[0.72px] custom-text-yellow'>
            Our Vision
          </h1>

        </div>

        <div className='lg:w-[90%] w-full'>

          <p className='text-richblack-300 text-base font-medium'>
            With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
          </p>

        </div>

      </div>

      <div className='lg:w-[50%] w-full flex flex-col gap-6 items-center'>

        <div className='lg:w-[90%] w-full '>

          <h1 className='text-4xl font-semibold self-stretch 
          leading-[44px] -tracking-[0.72px] custom-text-blue'>
            Our Mission
          </h1>

        </div>

        <div className='lg:w-[90%] w-full '>

          <p className='text-richblack-300 text-base font-medium'>
            our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
          </p>

        </div>

      </div>

    </div>
  )
}
