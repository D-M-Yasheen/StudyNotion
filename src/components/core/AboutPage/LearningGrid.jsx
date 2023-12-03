import React from 'react'
import { HighLightText } from '../../common/HighLightText'

const LearningGridDetails = [
  {
    heading: "World-Class Learning for",
    highlight: "Anyone, Anywhere",
    description: "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    btn: "Learn More"
  },
  {
    heading: "Curriculum Based on Industry Needs",
    description: "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    heading: "Our Learning Methods",
    description: "The learning process uses the namely online and offline.",
  },
  {
    heading: "Certification",
    description: "You will get a certificate that can be used as a certification during job hunting.",
  },
  {
    heading: 'Rating "Auto-grading"',
    description: "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
  },
  {
    heading: "Ready to Work",
    description: "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
  },
]

export const LearningGrid = () => {
  return (
    <>

      <div className='w-11/12 px-20 py-24 mx-auto grid place-items-center 
      lg:grid-cols-4 grid-cols-1'>
        {
          LearningGridDetails.map((element, index) => (
            index === 0 ?
              (
                <div key={index}
                  className='lg:w-full flex flex-col gap-4 lg:mb-0 mb-4 w-[400px] h-[300px] 
                  lg:col-span-2 lg:pr-[52px] '>

                  <h1 className='text-richblack-5 text-4xl font-bold
                   leading-[44px] -tracking-[0.72px]'>
                    
                    {element.heading}

                    <HighLightText>

                      {element.highlight}

                    </HighLightText>

                  </h1>

                  <p className='text-richblack-300 text-base
                   font-medium'>
                    {element.description}
                  </p>

                  <div className='w-fit'>
                    <button className='flex items-center px-6 py-3 gap-2 font-bold
                   bg-yellow-50 text-richblack-900 rounded-lg 
                   border-2 border-l border-t border-yellow-5
                   hover:scale-95 transition-all duration-200'>
                      {element.btn}
                    </button>
                  </div>

                </div>
              )
              :
              (
                <div key={index}
                  className={`p-8 h-[300px] flex flex-col gap-6 lg:w-full w-[400px]
                  ${index & 1 ? "bg-richblack-700" : "bg-richblack-800"}
                  ${index === 3 ? "lg:col-start-2" : ""}
                  `}>

                  <h1 className='h-[52px] text-richblack-5 text-lg font-semibold'>
                    {element.heading}
                  </h1>

                  <p className='text-richblack-300 text-base font-normal'>
                    {element.description}
                  </p>

                </div>
              )))
        }
      </div>
    </>
  )
}
