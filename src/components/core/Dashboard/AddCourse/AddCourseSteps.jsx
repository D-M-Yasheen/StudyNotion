import React from 'react'
import { BsCheckCircleFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { CourseInfo } from './CourseInfo/CourseInfo';
import { CourseBuilder } from './CourseBuilder/CourseBuilder';
import { CoursePublish } from './CoursePublish/CoursePublish';

export const AddCourseSteps = () => {

    const steps = [
        {
            id: 1,
            title: "Course Information",
        },
        {
            id: 2,
            title: "Course Builder",
        },
        {
            id: 3,
            title: "Publish",
        },
    ]

    const stepNumber = useSelector((state) => state.course.step)
    return (

        <div className='w-full flex flex-col gap-4'>

            <div className='w-full flex justify-center items-center'>
                {
                    steps.map((item) => (
                        <React.Fragment key={item.id}>

                            <div 
                                className='flex justify-center items-center'>

                                <div className={`flex text-center gap-2
                                                items-center justify-center`}>
                                    <>
                                        {
                                            item.id < stepNumber ?
                                                <BsCheckCircleFill fontSize={24} className='text-yellow-100' /> :

                                                <div className={`flex flex-col w-6 h-6 p-2 justify-center items-center 
                                                    border-2 rounded-full ${item.id <= stepNumber ?
                                                        'bg-yellow-900 border-yellow-100 text-yellow-100' :
                                                        'bg-richblack-700 border-richblack-600'}`}>

                                                    {item.id}

                                                </div>

                                        }
                                    </>

                                </div>

                            </div>

                            <>
                                {
                                    item.id !== steps.length && (

                                        <div className={`h-[calc(34px/2)] w-[30%] -translate-y-2 border-dashed border-b-2 
                                                    ${stepNumber > item.id ? "border-yellow-50" :
                                                "border-richblack-500"
                                            } `}>


                                        </div>


                                    )
                                }
                            </>

                        </React.Fragment>

                    ))
                }

            </div >


            <div className='w-full flex justify-center items-center'>
                {
                    steps.map((item) => (
                        (
                            <div key={item.id}
                                className='flex w-full justify-center items-center'>

                                <div className={`flex gap-2
                                                items-center justify-center`}>
                                    

                                    <p className={` text-sm ${item.id <= stepNumber ? 'text-yellow-100'
                                        : 'text-richblack-5'}`}>
                                        {item.title}
                                    </p>

                                </div>



                            </div>

                        )
                    ))
                }

            </div >

            <div>

                {stepNumber === 1 && <CourseInfo />}
                {stepNumber === 2 && <CourseBuilder />} 
                {stepNumber === 3 && <CoursePublish />}

            </div>

        </div>
    )
}
