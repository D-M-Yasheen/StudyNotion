import React from 'react'

export const AboutSection1 = () => {
  return (
    <div className='w-full border-b-[1px] border-richblack-700'>

      <div className='w-10/12 lg:mt-20 md:mt-14 mt-4 mx-auto py-24'>

        <p className='text-richblack-5 text-center lg:text-4xl 
              font-semibold md:text-4xl text-lg'>
          <span >
            {`We are passionate about revolutionizing the way we learn.
                Our innovative platform`}
          </span>
          <span className='custom-text-blue'>
            {" combines technology"}
          </span>,
          <span className='custom-text-orange'>
            {" expertise"}
          </span>,
          and community to create an
          <span className='custom-text-yellow'>
            {" unparalleled educational experience."}
          </span>
        </p>

      </div>

    </div>
  )
}
