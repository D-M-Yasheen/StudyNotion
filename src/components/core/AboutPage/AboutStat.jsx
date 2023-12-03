import React from 'react'

const statDetails = [
  {
    count: "5K",
    lable: "Active Students"
  },
  {
    count: "10+",
    lable: "Mentors"
  },
  {
    count: "200+",
    lable: "Courses"
  },
  {
    count: "50+",
    lable: "Awards"
  },

]


export const AboutStat = () => {
  return (
    <section className='bg-richblack-700'>

      <div className='w-10/12 mx-auto py-12 grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 
       place-items-center gap-10'>
        {
          statDetails.map((stat, index) => (
            <div key={index}
              className='w-1/4 flex flex-col justify-center items-center gap-3'>

              <p className='text-3xl font-bold text-richblack-5'>
                {stat.count}
              </p>

              <p className='text-richblack-500 font-semibold text-base'>
                {stat.lable}
              </p>

            </div>
          ))
        }
      </div>
    </section>
  )
}
